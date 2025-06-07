import { Client, Databases, Storage, Query, ID } from 'appwrite'
import conf from '../conf/conf'
class StorageService {
  client = new Client()
  databases
  bucket
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  // create document
  async createDocument({
    title,
    slug,
    content,
    FeaturedImage,
    status,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          FeaturedImage,
          status,
          userId,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  // updating the Post

  async updatePost(slug, { title, content, FeaturedImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          FeaturedImage,
          status,
          userId,
        }
      )
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // get a document
  async getpost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log(error)
      return false
    }
  }

  // delete post
  async deletePost(fileId) {
    try {
      return this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        fileId
      )
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // getting the posts
  async getposts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log(error)
    }
  }

  // create the storage service for images

  // uploading the file
  async uploadfile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteStrorageId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // deleting a file

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteStrorageId, fileId)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // creating the comment section

  // createComment.js
  async createComment({ postId, userId, username, content }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCommentsid, // New collection ID for comments
        'unique()',
        {
          postId,
          userId,
          username,
          content,
        }
      )
    } catch (error) {
      console.log('Error creating comment:', error)
    }
  }

  // get the comments
  getComments(postId) {
    return this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCommentsid,
      [Query.equal('postId', postId), Query.orderDesc('$createdAt')]
    )
  }

  // update the comment section
  updateComment(commentId, data) {
    return this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCommentsid,
      commentId,
      data
    )
  }

  // delete the comment

  deleteComment(commentId) {
    return this.databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCommentsid,
      commentId
    )
  }

  // getting the preveiw for thumbnail
  getFilePreview(fileId) {
    try {
      return this.bucket.getFileView(conf.appwriteStrorageId, fileId)
    } catch (error) {
      console.log(error)
    }
  }
}

const storageService = new StorageService()
export default storageService
