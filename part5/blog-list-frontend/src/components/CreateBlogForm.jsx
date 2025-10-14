const CreateBlogForm = ({ title, setTitle, author, setAuthor, url, setURL, handleAddNewBlog }) => {
    return (
        <form onSubmit={handleAddNewBlog}>
            <div>
                <label>
                    title
                    <input
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    author
                    <input
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    url
                    <input
                        type="text"
                        value={url}
                        onChange={({ target }) => setURL(target.value)}
                    />
                </label>
            </div>
            <button type="submit">create</button>
        </form>
    );
}

export default CreateBlogForm