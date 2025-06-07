import React, { useEffect, useCallback } from 'react'
import { RTE, Button, Input, Select } from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import storageService from '../../appwrite/database'
import PropTypes from 'prop-types'

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || '',
        slug: post?.$id || '',
        content: post?.content || '',
        status: post?.status || 'active',
      },
    })
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  // finding out wheter the post is sent to edit or a new post is being created

  // Uploading the file and creating/updating the post
  const submit = async (data) => {
    
    try {
      // Handle image upload
      const file = data.image[0]
        ? await storageService.uploadfile(data.image[0])
        : null
      
      // If updating a post
      if (post) {
        if (file) {
          await storageService.deleteFile(post.FeaturedImage)
        }
        const dbPost = await storageService.updatePost(post.$id, {
          ...data,
          FeaturedImage: file ? file.$id : undefined,
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      } else {
        // If creating a new post
        if (file) {

          const fileId = file.$id
          data.FeaturedImage = fileId
          // console.log(":",file)
console.log('file.$id', file.$id)
          const dbPost = await storageService.createDocument({
            ...data,
            userId: userData.userData.$id,
            
          })

          console.log('dbPost is:', dbPost)
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
          }
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  // slug transform for the routing
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
        .slice(0, 36) // trim to 36 characters
    }
    return ''
  }, [])

  // real time slug transformation
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      console.log("value:",value.slug)
      if (name === 'title') {
        // console.log("value of all fields",)
        
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue, slugTransform])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        {/* for the  title field */}
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        {/* for the slug field */}
        <Input
          title="Slug :"
          placeholder="Slug"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }}
          className="mb-4"
        />
        {/* the Rte component for content */}

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      {/* to upload the file */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />

        {/* if post is availble than show a preview */}
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageService.getFilePreview(post.FeaturedImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        {/* sending the active option */}
        <Select
          options={['active', 'inactive']}
          label="status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        {/* creating the button */}

        <Button
          type="submit"
          bgColor={post ? 'bg-green-500' : undefined}
          className="w-full"
        >
          {post ? 'Update' : 'Submit'}
          
        </Button>
      </div>
    </form>
  )
}

PostForm.propTypes = {
  post: PropTypes.shape({
    $id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.string,
    FeaturedImage: PropTypes.string,
  }),
}


export default PostForm
