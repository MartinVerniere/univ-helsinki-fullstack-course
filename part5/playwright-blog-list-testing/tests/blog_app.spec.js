const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helpers')

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
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'unauthorized_delete_user',
                username: 'second_user',
                password: 'password'
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
                const blog = page.locator('.detailed-info')
                await likeBlog(page, blog, 'test title', 'test author')

                await expect(page.getByText('likes: 1 like')).toBeVisible()
            })

            test('a blog can be deleted', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                page.on('dialog', dialog => dialog.accept());
                await page.getByRole('button', { name: 'delete' }).click()

                await expect(page.getByText('blog test title by test author has been deleted')).toBeVisible()
                await expect(page.getByText('test title test author')).not.toBeVisible()
            })

            test('a blog can only be deleted by user who created it', async ({ page }) => {
                await page.getByRole('button', { name: 'logout' }).click()
                await loginWith(page, 'second_user', 'password')

                await page.getByRole('button', { name: 'view' }).click()

                await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
            })
        })

        describe('and multiple blogs exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'first title', 'first author', 'first url')
                await createBlog(page, 'second title', 'second author', 'second url')
                await createBlog(page, 'third title', 'third author', 'third url')
            })

            describe('and have likes', () => {
                beforeEach(async ({ page }) => {
                    const viewButtons = await page.getByRole('button', { name: 'view' }).all()

                    await viewButtons[0].click()
                    await viewButtons[0].click()
                    await viewButtons[0].click()

                    const blogs = await page.locator('.detailed-info').all()
                    console.log("blogs:", blogs)

                    await likeBlog(page, blogs[0], 'first title', 'first author')
                    await page.waitForTimeout(5000); // Wait until notification dissapears
                    await likeBlog(page, blogs[0], 'first title', 'first author')
                    await likeBlog(page, blogs[1], 'second title', 'second author')
                    await page.waitForTimeout(5000); // Wait until notification dissapears
                    await likeBlog(page, blogs[1], 'second title', 'second author')
                    await page.waitForTimeout(5000); // Wait until notification dissapears
                    await likeBlog(page, blogs[1], 'second title', 'second author')
                    await likeBlog(page, blogs[2], 'third title', 'third author')
                })

                test('blogs are arranged in order of likes', async ({ page }) => {
                    const blogs = await page.locator('.detailed-info').all()
                    await expect(blogs[0].locator('.likes').getByText('likes: 3 like')).toBeVisible()
                    await expect(blogs[1].locator('.likes').getByText('likes: 2 like')).toBeVisible()
                    await expect(blogs[2].locator('.likes').getByText('likes: 1 like')).toBeVisible()
                })
            })
        })
    })
})