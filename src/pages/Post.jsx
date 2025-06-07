import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import storageService from '../appwrite/database'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import CommentSection from './CommentSection'

export default function Post() {
  const [post, setPost] = useState(null)

  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor =
    post && userData ? post.userId === userData.userData.$id : false;



  useEffect(() => {
    if (slug) {
     storageService.getpost(slug)
        .then((post) => {
          if (post) setPost(post)
          else navigate('/') // Redirect if post not found
        })
        .catch((error) => {
          console.error('Error fetching post:', error)
          navigate('/') // Redirect on error
        })
    } else {
      navigate('/') // Redirect if slug is invalid
    }
  }, [slug, navigate])

  const deletePost = () => {
   storageService
      .deletePost(post.$id)
      .then((status) => {
        if (status) {
         storageService.deleteFile(post.FeaturedImage)
          navigate('/') // Redirect after deletion
        }
      })
      .catch((error) => {
        console.error('Error deleting post:', error)
      })
  }

  


  if (!post) return null // Return nothing if post is not available

  return (
    <div className="py-8">
      <Container className="bg-blue-200 rounded-2xl" >
        <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2">
          <img
            src={storageService.getFilePreview(post.FeaturedImage)}
            alt={post.title}
            className="w-full max-w-4xl mx-auto  h-auto rounded-xl"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">{post.title}</h1>
        </div>
        <div className="browser-css">
          {parse(post.content || '')} {/* Ensure content is a string */}
        </div>
        {/* 🔽 Comment Section goes here */}
        <CommentSection postId={post.$id} />
      </Container>
    </div>
  )
}
