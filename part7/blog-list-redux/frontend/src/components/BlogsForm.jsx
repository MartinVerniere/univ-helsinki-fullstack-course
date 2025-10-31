import { TextField } from '@mui/material'
import { useState } from 'react'

const BlogsForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setURL] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url,
		})

		setTitle('')
		setAuthor('')
		setURL('')
	}
	return (
		<form onSubmit={addBlog}>
			<div><TextField label="title" variant="filled" value={title} onChange={({ target }) => setTitle(target.value)} /></div>
			<div><TextField label="author" variant="filled" value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
			<div><TextField label="url" variant="filled" value={url} onChange={({ target }) => setURL(target.value)} /></div>
			<button type="submit">create</button>
		</form>
	)
}

export default BlogsForm
