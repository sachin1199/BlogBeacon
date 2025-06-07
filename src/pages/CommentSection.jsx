import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import storageService from '../appwrite/database'
import PropTypes from 'prop-types'


export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editedContent, setEditedContent] = useState('')
  const user = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (postId) fetchComments()
  }, [postId])

  const fetchComments = async () => {
    const res = await storageService.getComments(postId)
    if (res) setComments(res.documents)
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return
    const commentData = {
      content: newComment,
      postId,
      userId: user?.userData?.$id,
      username: user?.userData?.name,
    }
    const result = await storageService.createComment(commentData)
    if (result) {
      setComments([result, ...comments])
      setNewComment('')
    }
  }

  const handleEdit = (id, content) => {
    setEditingId(id)
    setEditedContent(content)
  }

  const saveEdit = async (id) => {
    const updated = await storageService.updateComment(id, {
      content: editedContent,
    })
    if (updated) {
      setComments((prev) =>
        prev.map((c) => (c.$id === id ? { ...c, content: editedContent } : c))
      )
      setEditingId(null)
      setEditedContent('')
    }
  }

  const handleDelete = async (id) => {
    await storageService.deleteComment(id)
    setComments((prev) => prev.filter((c) => c.$id !== id))
  }

  return (
    <div className="mt-10 bg-white/90 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Comments
      </h2>

      {/* Input */}
      <div className="mb-4 flex gap-2 items-start">
        <img
          src="https://i.pravatar.cc/32"
          alt="User"
          className="w-8 h-8 rounded-full mt-1"
        />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="2"
            className="w-full text-sm p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-amber-600 text-sm text-white px-4 py-1.5 rounded-xl hover:bg-amber-700 transition"
          >
            Post
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.$id}
            className="flex gap-2 items-start bg-gray-100 dark:bg-gray-700 p-3 rounded-xl shadow-sm"
          >
            {/* <img
              src="https://via.placeholder.com/150"
              alt="User"
              className="w-8 h-8 rounded-full"
            /> */}
            <div className="flex-1 text-sm">
              <p className="font-semibold text-gray-800 dark:text-white">
                {comment.username}
              </p>

              {editingId === comment.$id ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full mt-1 p-1 text-sm border rounded focus:outline-none"
                  />
                  <div className="mt-1 flex gap-2 text-xs">
                    <button
                      onClick={() => saveEdit(comment.$id)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {comment.content}
                </p>
              )}

              {user?.userData?.$id === comment.userId &&
                editingId !== comment.$id && (
                  <div className="flex gap-3 text-xs text-blue-600 mt-1">
                    <button
                      onClick={() => handleEdit(comment.$id, comment.content)}
                      className="hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.$id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
}