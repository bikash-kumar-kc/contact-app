// ImageGallery.jsx
import React, { useEffect, useState } from "react";
import { Client, Storage } from "appwrite";
import config from "../../config/config";

// 1️⃣ Appwrite Client Setup
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Change if using self-hosted
  .setProject(config.appwriteProjectid); // Your Appwrite project ID

const storage = new Storage(client);

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2️⃣ Fetch images when component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Get all files from the bucket
        const res = await storage.listFiles(config.appwriteBucketid);

        // Map files to include direct URL
        const filesWithUrls = res.files.map(file => ({
          id: file.$id,
          name: file.name,
          // url: storage.getFilePreview(file.bucketId, file.$id).href
        //  url: storage.getFileView(file.bucketId, file.$id).href
        url: `https://cloud.appwrite.io/v1/storage/buckets/${file.bucketId}/files/${file.$id}/view?project=${config.appwriteProjectid}`

        }));

        setImages(filesWithUrls);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // 3️⃣ Render
  if (loading) return <p>Loading images...</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {images.length > 0 ? (
        images.map(img => (
          <div key={img.id}>
            <img
              src={img.url}
              alt={img.name}
              style={{
                width: "200px",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)"
              }}
            />
            <p style={{ textAlign: "center" }}>{img.name}</p>
          </div>
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}
