import { useState } from 'react'
import { notifyAnError, notifyVoted } from '../reducers/notificationReducer'
import { commentOnBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

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

	const addComment = (blogObject) => {
		try {
			dispatch(commentOnBlog(blogObject))
			dispatch(notifyVoted(`blog '${blogObject.title}' by ${blogObject.author} has a new comment '${blogObject.commentToAdd}'`, 5))
		} catch (error) {
			console.log(error)
			dispatch(notifyAnError(`comment '${blogObject.commentToAdd}' couldn't be added`, 5))
		}
	}

	return (
		<form onSubmit={addBlogComment}>
			<div>
				<label>
					comment
					<input
						type="text"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>
				</label>
			</div>
			<button type="submit">create</button>
		</form>
	)
}

export default CommentsForm
