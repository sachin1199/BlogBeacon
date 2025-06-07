import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import storageService from '../appwrite/database'
import { Container, PostForm } from '../components'

function EditPost() {
    const [post, setPosts] = useState(null)

    const navigate=useNavigate()
    
    const { slug } = useParams()
    useEffect(() => {
        if (slug) {
            storageService.getpost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }
        else{navigate('/')}
        

    },[slug,navigate])




    return post ? (<div className=' py-8'>
        <Container>
            <PostForm post={post} />
      </Container>
  </div>):null
}

export default EditPost