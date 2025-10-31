import { useState } from 'react'
import { notifyAction, notifyAnError } from '../reducers/notificationReducer'
import { commentOnBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@mui/material'

const CommentsForm = ({ blog }) => {
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const addBlogComment = (event) => {
		event.preventDefault()
		addComment({
			id: blog.id,
			user: blog.user.id,
			likes: blog.likes,
			author: blog.author,
			title: blog.title,
			url: blog.url,
			comments: blog.comments,
			commentToAdd: comment
		})
		setComment('')
	}

	const addComment = async (blogObject) => {
		try {
			await dispatch(commentOnBlog(blogObject))
			await dispatch(notifyAction(`blog '${blogObject.title}' by ${blogObject.author} has a new comment '${blogObject.commentToAdd}'`, 5))
		} catch (error) {
			console.log(error)
			dispatch(notifyAnError(`comment '${blogObject.commentToAdd}' couldn't be added`, 5))
		}
	}

	return (
		<form onSubmit={addBlogComment}>
			<div>
				<TextField label="comment" variant="filled" value={comment} onChange={({ target }) => setComment(target.value)} />
			</div>
			<Button variant="contained" color="primary" type="submit">create</Button>
		</form>
	)
}

export default CommentsForm
