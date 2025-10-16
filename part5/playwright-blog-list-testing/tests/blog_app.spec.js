const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const username = page.getByLabel('username')
        const password = page.getByLabel('username')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(username).toBeVisible()
        await expect(password).toBeVisible()
    })
})