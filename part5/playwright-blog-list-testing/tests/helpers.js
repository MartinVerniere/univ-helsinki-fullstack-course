const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, url, author) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(url)
    await page.getByLabel('url').fill(author)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText('test title test author').waitFor()
}

export { loginWith, createBlog }