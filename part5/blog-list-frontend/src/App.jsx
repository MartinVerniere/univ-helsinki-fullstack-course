import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const [message, setMessage] = useState(null);

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
      {!user &&
        <div>
          <h2>Login to application</h2>
          {message && <Notification message={message} />}
          <LoginForm
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      }
      {user &&
        <div>
          <h2>blogs</h2>
          {message && <Notification message={message} />}
          <div>{user.name} logged in</div>
          <button onClick={() => handleLogout()}>logout</button>
          <div>
            <h2>Create new</h2>
            <CreateBlogForm
              title={title} setTitle={setTitle}
              author={author} setAuthor={setAuthor}
              url={url} setURL={setURL}
              handleAddNewBlog={handleAddNewBlog}
            />
          </div>
          <BlogList blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App;