import { useDispatch } from 'react-redux'
import { removeBlog, voteForBlog } from '../reducers/blogReducer'
import { notifyAction, notifyAnError } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import CommentsForm from './CommentsForm'

const Blog = ({ selectedBlog, user }) => {
	const dispatch = useDispatch()

	const like = (event) => {
		event.preventDefault()
		likeBlog({
			id: selectedBlog.id,
			user: selectedBlog.user.id,
			likes: selectedBlog.likes,
			author: selectedBlog.author,
			title: selectedBlog.title,
			url: selectedBlog.url,
		})
	}

	const remove = (event) => {
		event.preventDefault()
		deleteBlog({
			id: selectedBlog.id,
			user: selectedBlog.user.id,
			likes: selectedBlog.likes,
			author: selectedBlog.author,
			title: selectedBlog.title,
			url: selectedBlog.url,
		})
	}

	const likeBlog = async (blogObject) => {
		try {
			await dispatch(voteForBlog(blogObject))
			await dispatch(notifyAction(`blog '${blogObject.title}' by ${blogObject.author} has been liked`, 5))
		} catch (error) {
			console.log(error)
			dispatch(notifyAnError(`blog '${blogObject.title}' couldn't be liked`, 5))
		}
	}

	const deleteBlog = async (blogObject) => {
		if (
			window.confirm(`Remove selectedBlog '${blogObject.title}' by ${blogObject.author}?`)
		) {
			try {
				await dispatch(removeBlog(blogObject))
				await dispatch(notifyAction(`blog '${blogObject.title}' by ${blogObject.author} has been deleted`, 5))
			} catch (error) {
				console.log(error)
				dispatch(notifyAnError(`blog '${blogObject.title}' couldn't be deleted`, 5))
			}
		} else {
			console.log('Delete canceled')
			return
		}
	}

	if (!selectedBlog) return <div>Loading selectedBlog details...</div>

	console.log('User in Blog component:', user)

	return (
		<div>
			<div className="general-info">
				<h1>{selectedBlog.title} {selectedBlog.author}</h1>
				<Link to={selectedBlog.url}>{selectedBlog.url}</Link>
				<div className="likes">
					likes: {selectedBlog.likes} <button onClick={like}>like</button>
				</div>
				<div className="user">added by {selectedBlog.user.name}</div>
				<div className="delete">
					{selectedBlog.user && selectedBlog.user.username === user.username && (
						<button onClick={remove}>delete</button>
					)}
				</div>
				<div className="comments">
					<h2>comments</h2>
					<CommentsForm blog={selectedBlog} />
					{selectedBlog.comments && selectedBlog.comments.length > 0 ? (
						<ul>
							{selectedBlog.comments.map((comment, index) => (
								<li key={index}>{comment}</li>
							))}
						</ul>
					) : (
						<p>No comments exist for blog</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Blog
