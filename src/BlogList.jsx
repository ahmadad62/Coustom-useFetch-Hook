
export default function BlogList({blogs,title,handelDelete}) {

  return (
    <div>
      <h1>{title}</h1>
      <>
      {blogs.map((blog)=>(
        <div className='blog-preview' key={blog.id}>
          <h2>{blog.name}</h2>
          <span>Email: {blog.email}</span>
        </div>
      ))}
      </>
    </div>
  )
}
