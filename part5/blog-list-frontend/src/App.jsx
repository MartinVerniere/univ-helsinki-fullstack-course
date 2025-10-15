import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import Togglable from '../../notes-frontend/src/components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      console.log(error);
      setMessage("invalid username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogService.setToken(null);
    setUser(null);
  }

  const createBlog = async (blogObject) => {
    try {
      const blogAdded = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(blogAdded));
      setMessage(`a new blog ${blogAdded.title} by ${blogAdded.author} added`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setMessage(`Blog '${blogObject.title}' couldnt be added to the list`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={null}>
      <LoginForm login={login} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>Create new</h2>
      <BlogsForm createBlog={createBlog} />
    </Togglable>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {message && <Notification message={message} />}

      {!user && loginForm()}

      {user &&
        <div>
          <div>{user.name} logged in</div>
          <button onClick={() => handleLogout()}>logout</button>
          <h2>blogs</h2>
          {blogForm()}
          <BlogList blogs={blogs} />
        </div>
      }
    </div >
  )
}

export default App;