import React, { useEffect, useState } from 'react'
import storageService from '../appwrite/database'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    storageService.getposts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
        console.log(posts)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className="w-full py-12 mt-4 text-center bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        <Container>
          <div className="flex flex-col items-center justify-center p-8 bg-white/90 dark:bg-gray-800 rounded-2xl shadow-lg">
            <img
              src="/logged-in-icon-7.jpg"
              alt="not logged in"
              className="w-20 h-20 mb-4"
            />
            <Link
              to={`/login`}
              className="text-2xl font-bold text-gray-800 dark:text-white hover:text-amber-500 transition duration-200"
            >
              Login to read posts
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl duration-300"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
