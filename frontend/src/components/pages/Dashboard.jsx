import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Home,
  Compass,
  Heart as HeartIcon,
  Mail,
  Bookmark,
  MoreHorizontal,
  PlusSquare,
  X,
  Upload,
} from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  const allposts = async () => {
    try {
      const response = await axios.get(
        `${process.env.PORT}/api/posts/posts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };
  useEffect(() => {
    allposts();
  }, []);
  const handleCreatePost = () => {
    setIsModalOpen(true);
  };

  const handleSavePost = async () => {
    if (!image) return alert("Please select an image first");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${process.env.PORT}/api/posts/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
      if (response.data.success) {
        setIsModalOpen(false);
        setImage(null);
        allposts();
      }
    } catch (error) {
      console.error("Post creation failed:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlelike = async (post) => {
    try {
      const response = await axios.post(
        `${process.env.PORT}/api/likes/${post._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        allposts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );
      return JSON.parse(jsonPayload).id;
    } catch (e) {
      return null;
    }
  };

  const currentUserId = getUserId();

  
  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 fixed bg-white border-r border-gray-200 p-4 hidden md:flex flex-col">
        <div className="text-2xl font-bold text-pink-600 mb-8">Instagram</div>

        <nav className="space-y-4 flex-1">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Home size={24} />
            <span className="text-lg">Home</span>
          </div>
          <div
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={handleCreatePost}
          >
            <PlusSquare size={24} />
            <span className="text-lg">Create</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Search size={24} />
            <span className="text-lg">Explore</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Heart size={24} />
            <span className="text-lg">Notifications</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Mail size={24} />
            <span className="text-lg">Messages</span>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Bookmark size={24} />
            <span className="text-lg">Saved</span>
          </div>
        </nav>

        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer border-t pt-4">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full"></div>
          <span className="text-lg">Profile</span>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 max-w-2xl mx-auto">
        {/* Stories */}
        <div className="bg-white border-b border-gray-200 p-4 overflow-x-auto">
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 p-1 mb-2">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`}
                      alt={`User ${i}`}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-600">user{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4 p-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg border border-gray-200"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      post.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author?.name}`
                    }
                    alt={post.author?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">{post.author?.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Post Image */}
              <img
                src={post.image}
                alt="post"
                className="w-full aspect-square object-cover"
              />

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handlelike(post)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={24}
                        className={`${
                          post.likes?.includes(currentUserId)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-600 hover:text-red-500"
                        }`}
                      />
                    </button>
                    <button className="hover:text-gray-500 transition">
                      <MessageCircle
                        size={24}
                        className="text-gray-600 hover:text-blue-600"
                      />
                    </button>
                    <button className="hover:text-gray-500 transition">
                      <Share2
                        size={24}
                        className="text-gray-600 hover:text-blue-600"
                      />
                    </button>
                  </div>
                  <button className="hover:text-gray-500 transition">
                    <Bookmark size={24} className="text-gray-600" />
                  </button>
                </div>

                <p className="font-semibold text-sm mb-2">
                  {post.likes.length.toLocaleString()} likes
                </p>

                <div className="mb-2">
                  <span className="font-semibold text-sm">
                    {post.author?.name}
                  </span>
                  {/* <span className="text-sm ml-2">{post.caption}</span> */}
                </div>

                <p className="text-gray-500 text-sm mb-4">
                  {/* View all {post.comments} comments */}
                </p>

                {/* <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 text-sm outline-none placeholder-gray-500"
                    />
                    <button className="text-pink-600 font-semibold text-sm hover:text-pink-700">
                      Post
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl scale-in-center">
            {/* Header */}
            <div className="border-b border-gray-100 p-4 flex items-center justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
              <h2 className="font-bold text-lg">Create New Post</h2>
              <button
                onClick={handleSavePost}
                className="text-pink-600 font-bold hover:text-pink-700 disabled:opacity-50"
              >
                Share
              </button>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-600">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="text-xl font-medium">
                  Select a photo for your post
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Upload a high-quality image from your device
                </p>
              </div>

              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />

              <label
                htmlFor="fileInput"
                className="bg-pink-600 text-white px-6 py-2.5 rounded-full font-semibold cursor-pointer hover:bg-pink-700 transition shadow-lg shadow-pink-200"
              >
                Select from computer
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
