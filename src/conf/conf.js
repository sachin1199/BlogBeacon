const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteStrorageId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  tinymiceApiKey: String(import.meta.env.VITE_TINY_MICE_API_KEY),
  appwriteCommentsid: String(import.meta.env.VITE_APPWRITE_COMMENTS_ID),
}
export default conf