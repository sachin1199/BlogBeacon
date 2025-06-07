import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/database'
import PropTypes from 'prop-types'

function PostCard({ $id, title, FeaturedImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="w-full mb-4 overflow-hidden rounded-xl">
          <img
            src={storageService.getFilePreview(FeaturedImage)}
            alt={title}
            className="w-full h-48 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
          {title}
        </h2>
      </div>
    </Link>
  )
}

PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  FeaturedImage: PropTypes.string.isRequired,
}

export default PostCard
