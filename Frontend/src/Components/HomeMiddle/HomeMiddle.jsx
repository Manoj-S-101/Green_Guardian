import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaShareAlt } from "react-icons/fa"; // Import icons
import "./HomeMiddle.css";
import BASE_URL from "../../services/Baseaddress";

const HomeMiddle = () => {
  const [posts, setPosts] = useState([]);
  //   id: 0,
  //   username: "GreenThumb",
  //   userPhoto: "profile_photo.jpg",
  //   text: "Started my new herb garden today! 🌱 Can't wait to see these little guys grow.",
  //   media: ["photo2.jpeg","photo4.jpeg","photo5.jpeg","photo6.jpeg"],
  //   likes: 34,
  //   isLiked: false,
  // },
  // {
  //   id: 1,
  //   username: "NatureLover",
  //   userPhoto: "profile_photo.jpg",
  //   text: "Urban gardening tips: Use vertical space for your plants! 🪴 #VerticalGarden",
  //   media: ["video1.mp4"],
  //   likes: 56,
  //   isLiked: false,
  // },
  // {
  //   id: 2,
  //   username: "PlantParent",
  //   userPhoto: "profile_photo.jpg",
  //   text: "My monstera finally unfurled a new leaf! 🍃 Feeling like a proud plant parent.",
  //   media: ["photo3.jpeg","photo1.jpeg","photo7.jpeg","photo8.jpeg"],
  //   likes: 78,
  //   isLiked: false,
  // },
  // {
  //   id: 3,
  //   username: "EcoInspo",
  //   userPhoto: "profile_photo.jpg",
  //   text: "Did you know? Plants improve air quality indoors. Time to add more greens to your space! 🌿",
  //   media: [],
  //   likes: 45,
  //   isLiked: false,
  // },
  // {
  //   id: 4,
  //   username: "GreenJourney",
  //   userPhoto: "profile_photo.jpg",
  //   text: "Repotted my snake plant and it's looking happier than ever. 🪴 #PlantCare",
  //   media: ["video1.mp4"],
  //   likes: 62,
  //   isLiked: false,
  // },]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/post/", {
          method: "GET",
        });
        const data = await response.json();
        
        let i=0;
        // Initialize isLiked property for each post
        const postsWithLikes = data.map(post => ({
          ...post,
          id:i++,
          isLiked: false, // Initialize isLiked
        }));

        console.log("Fetched posts:", postsWithLikes); // Log fetched posts
        
        if (response.ok) {
          setPosts(postsWithLikes);
        } else {
          alert("There was an error in fetching posts.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error in fetching posts.");
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (b) => {
    console.log(b);
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === b
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleShare = (postId) => {
    console.log(`Post ${postId} shared!`);
  };

  return (
    <div className="home-middle">
      <h2 className="feed-heading">Explore Eco Thoughts & Inspirations</h2>
      {Array.isArray(posts) &&
        posts.map((post) => (
          <div key={post.id} className="post-card"> {/* Post card */}
            <div className="post-header">
              <img
                src={post.userPhoto !== "profile_photo.jpg" ? `${BASE_URL}${post.userPhoto}` : 'profile_photo.jpg'}
                alt={`${post.username}'s profile`}
                className="user-photo"
              />
              <div className="user-info">
                <span className="username">{post.username}</span>
                <button className="follow-btn">Follow</button>
              </div>
            </div>
            <hr className="divider" />
            <div className="post-content">
              <p>{post.text}</p>
            </div>

            <div className="post-media">
              {post.media.map((media, index) => (
                media.endsWith(".mp4") ? (
                  <video key={`${post.id}-media-${index}`} controls className="post-video">
                    <source src={`${BASE_URL}${media}`} type="video/mp4" />
                    {/* <source src={media} type="video/mp4" /> */}
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    key={`${post.id}-media-${index}`} // Unique key for images
                    src={`${BASE_URL}${media}`}
                    // src={media}
                    alt="Post media"
                    className="post-image"
                  />
                )
              ))}
            </div>

            <div className="post-actions">
              <button className="like-btn" onClick={() => handleLike(post.id)}>
                {post.isLiked ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
                {post.likes}
              </button>
              <button className="comment-btn">
                <FaComment /> Comment
              </button>
              <button className="share-btn" onClick={() => handleShare(post.id)}>
                <FaShareAlt /> Share
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomeMiddle;
