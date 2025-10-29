import Blog from './Blog'

const BlogList = ({ result, likeBlog, user, deleteBlog }) => {

	if (result.isLoading) return <div>loading data...</div>
	if (result.isError) return <div>error getting blogs from backend</div>

	const sortComparison = (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes

	const blogs = result.data.sort(sortComparison)

	return (
		<div>
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					likeBlog={likeBlog}
					user={user}
					deleteBlog={deleteBlog}
				/>
			))}
		</div>
	)
}

export default BlogList
