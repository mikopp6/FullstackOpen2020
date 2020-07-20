
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

const mostBlogs = (blogs) => {
  let tally = []
  const authorsBlogs = blogs.map(blog => {return {author:blog.author, blogs:1}})

  authorsBlogs.forEach(element => {
    const index = tally.findIndex(e => e.author === element.author)
    if (index === -1) {
      tally.push({author:element.author, blogs:element.blogs})
    } else {
      tally[index].blogs += element.blogs
    }
  })

  return tally.reduce((max, elem) => (max && max.blogs > elem.blogs) ? max : elem, null) 
}

const mostLikes = (blogs) => {
  let tally = []
  const authorLikes = blogs.map(blog => {return {author:blog.author, likes:blog.likes}})
  
  authorLikes.forEach(element => {
    const index = tally.findIndex(e => e.author === element.author)
    if (index === -1) {
      tally.push({author:element.author, likes:element.likes})
    } else {
      tally[index].likes += element.likes
    }
  })

  return tally.reduce((max, elem) => (max && max.likes > elem.likes) ? max : elem, null) 
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}