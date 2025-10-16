const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:5173/api/testing/reset')
        await request.post('http://localhost:5173/api/users', {
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
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill("mluukkai")
            await page.getByLabel('password').fill("salainen")
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('mluukkai logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByLabel('username').fill("mluukkai")
            await page.getByLabel('password').fill("wrong")
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('invalid username or password')).toBeVisible()
            await expect(page.getByText('mluukkai logged in')).not.toBeVisible()
        })
    })
})