import { useState } from "react";

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false);

  //const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    event.preventDefault();
    likeBlog({
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const remove = (event) => {
    event.preventDefault();
    deleteBlog({
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        url: {blog.url} <br />
        likes: {blog.likes} <button onClick={like}>like</button> <br />
        user: {blog.user && blog.user.name} <br />
        {blog.user && (blog.user.username === user.username) && <button onClick={remove}>delete</button>}
      </div>
    </div >
  )
}

export default Blog