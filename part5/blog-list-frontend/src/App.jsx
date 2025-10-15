import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from '../../notes-frontend/src/components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
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

  const handleAddNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = { title: title, author: author, url: url };
    console.log("New blog to add:", newBlog);

    try {
      const response = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(response));
      setTitle('');
      setAuthor('');
      setURL('');
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setMessage(`Blog '${newBlog.title}' couldnt be added to the list`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={null}>
      <LoginForm
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>Create new</h2>
      <CreateBlogForm
        title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor}
        url={url} setURL={setURL}
        handleAddNewBlog={handleAddNewBlog}
      />
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