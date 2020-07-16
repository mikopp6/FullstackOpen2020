// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0

  if (blogs.length === 0){
    return total
  }

  blogs.forEach(element => {
    total += element.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => (max && max.likes > blog.likes) ? max : blog, null)
}

//const mostBlogs = (blogs) => {
//  return {author: '', blogs: }
//}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  //mostBlogs
}