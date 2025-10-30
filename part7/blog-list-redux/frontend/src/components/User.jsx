const UserData = ({ selectedUser }) => {
	if (!selectedUser) return null

	console.log('Selected User:', selectedUser)

	return (
		<div>
			<h2>{selectedUser.name}</h2>
			<h3>Added blogs</h3>
			<ul>
				{selectedUser.blogs.length === 0
					? <p>No blogs added</p>
					: selectedUser.blogs.map((blog) => (
						<li key={blog.id}>{blog.title}</li>
					))}
			</ul>
		</div>
	)
}

export default UserData