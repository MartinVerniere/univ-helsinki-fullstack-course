const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helpers')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'mluukkai',
                username: 'mluukkai',
                password: 'salainen'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const username = page.getByLabel('username')
        const password = page.getByLabel('username')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(username).toBeVisible()
        await expect(password).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')

            await expect(page.getByText('mluukkai logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'wrong')

            await expect(page.getByText('invalid username or password')).toBeVisible()
            await expect(page.getByText('mluukkai logged in')).not.toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'test title', 'test author', 'test url')

            await expect(page.getByText('a new blog test title by test author added')).toBeVisible()
            await expect(page.getByText('test title test author')).toBeVisible()
        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'test title', 'test author', 'test url')
            })

            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'like' }).click()

                await expect(page.getByText('url: test url likes: 1 like')).toBeVisible()
            })

            test('a blog can be deleted', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                page.on('dialog', dialog => dialog.accept());
                await page.getByRole('button', { name: 'delete' }).click()

                await expect(page.getByText('blog test title by test author has been deleted')).toBeVisible()
                await expect(page.getByText('test title test author')).not.toBeVisible()
            })
        })
    })
})