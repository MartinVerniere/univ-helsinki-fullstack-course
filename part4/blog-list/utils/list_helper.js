const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  });

  return likes
}

const favouriteBlog = (blogs) => {
  let currentBlog = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > currentBlog.likes) currentBlog = blog
  })

  return currentBlog
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}