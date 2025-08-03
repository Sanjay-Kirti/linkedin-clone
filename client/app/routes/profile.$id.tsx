import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import PrivateRoute from "../components/PrivateRoute";
import Navbar from "../components/Navbar";

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture?: string;
  createdAt: string;
}

interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  createdAt: string;
  likes: string[];
}

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", bio: "" });

  const isOwnProfile = currentUser?._id === id;

  useEffect(() => {
    if (id) {
      fetchUserProfile();
      fetchUserPosts();
    }
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await api.get(`/users/${id}`);
      setUser(data);
      setEditForm({ name: data.name, bio: data.bio || "" });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const { data } = await api.get(`/users/${id}/posts`);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/users/profile", editForm);
      setUser({ ...user!, ...data });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) {
    return (
      <PrivateRoute>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </PrivateRoute>
    );
  }

  if (!user) {
    return (
      <PrivateRoute>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="text-center py-8">
              <p className="text-gray-500">User not found</p>
            </div>
          </div>
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-6">
                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="text-2xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                        required
                      />
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        placeholder="Add a bio..."
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                      <p className="text-gray-600">{user.email}</p>
                      {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
                      <p className="text-sm text-gray-500 mt-2">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {isOwnProfile && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Posts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isOwnProfile ? "Your Posts" : `${user.name}'s Posts`}
            </h2>
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {isOwnProfile ? "You haven't posted anything yet." : "No posts to show."}
              </p>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{post.author.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👍 {post.likes.length} likes</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
