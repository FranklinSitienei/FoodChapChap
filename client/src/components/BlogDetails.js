import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogRightSide from "./BlogRightSide";
import './BlogDetails.css'

function BlogDetails({ blogs }) {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [commentIdForReply, setCommentIdForReply] = useState(null);
  const [showAllReplies, setShowAllReplies] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    fetch("/me", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user")}`
      }
    })
      .then((response) => response.json())
      .then((userData) => setUser(userData));

    const blog = blogs.find((blog) => blog.id == id);
    if (blog) {
      fetch(`/blogs/${id}/comments`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user")}`
        }
      })
        .then((response) => response.json())
        .then((commentsData) => setComments(commentsData))
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setComments([]);
        });
      
      fetch(`/users/${blog.user_id}/is_following`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user")}`
        }
      })
        .then((response) => response.json())
        .then((data) => setIsFollowing(data.is_following))
        .catch((error) => console.error("Error checking follow status:", error));
    } else {
      history("/blogs");
    }
  }, [id, blogs, history]);

  const handleAddComment = (e) => {
    e.preventDefault();
    const newCommentObj = {
      content: newComment,
      user_id: user.id,
      blog_id: id,
    };
    fetch(`/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("user")}`
      },
      body: JSON.stringify(newCommentObj),
    })
      .then((response) => response.json())
      .then((comment) => {
        setComments([...comments, comment]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleLikeComment = (commentId) => {
    fetch(`/comments/${commentId}/like`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user")}`
      }
    })
      .then((response) => response.json())
      .then((updatedComment) => {
        setComments(
          comments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          )
        );
      })
      .catch((error) => {
        console.error("Error liking comment:", error);
      });
  };

  const handleAddReply = (e) => {
    e.preventDefault();
    const newReplyObj = {
      content: newReply,
      user_id: user.id,
      comment_id: commentIdForReply,
    };
    fetch(`/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("user")}`
      },
      body: JSON.stringify(newReplyObj),
    })
      .then((response) => response.json())
      .then((reply) => {
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentIdForReply) {
            return {
              ...comment,
              replies: [...comment.replies, reply],
            };
          }
          return comment;
        });
        setComments(updatedComments);
        setNewReply("");
        setCommentIdForReply(null);
      })
      .catch((error) => {
        console.error("Error adding reply:", error);
      });
  };

  const handleFollow = () => {
    fetch(`/users/${user.id}/follow`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user")}`
      }
    })
      .then((response) => response.json())
      .then(() => setIsFollowing(true))
      .catch((error) => console.error("Error following user:", error));
  };

  const handleUnfollow = () => {
    fetch(`/users/${user.id}/unfollow`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user")}`
      }
    })
      .then((response) => response.json())
      .then(() => setIsFollowing(false))
      .catch((error) => console.error("Error unfollowing user:", error));
  };

  const toggleReplies = (commentId) => {
    setShowAllReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  const { author, category, content, dislikes, image_url, likes, title, user_id } = blogs.find((blog) => blog.id == id);

  return (
    <>
      <div className="main-section">
        <div
          className="page-section nopadding cs-nomargin"
          style={{
            marginTop: "0px",
            paddingTop: "80px",
            paddingBottom: "60px",
            marginBottom: "0px",
            background: `url(${process.env.PUBLIC_URL}/assets/extra-images/banner-img-2.jpg) no-repeat scroll 0 0 / cover`,
          }}
        >
          <div className="container ">
            <div className="row">
              <div className="section-fullwidth col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="row">
                      <div className="listing-main-search">
                        <div className="main-search">
                          <form action="#">
                            <div className="restaurant-search-element-container row">
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="field-holder">
                                  {" "}
                                  <span className="restaurant-element-search-btn">
                                    <i className="icon-search5"></i>{" "}
                                  </span>
                                  <input
                                    placeholder="Restaurant name"
                                    name="search_title"
                                    value=""
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="field-holder">
                                  {" "}
                                  <span>
                                    {" "}
                                    <i className="icon-location search-by-location-icon"></i>
                                  </span>
                                  <ul>
                                    <li className="select-location">
                                      <div className="foodbakery-locations-fields-group foodbakery-focus-out">
                                        <span
                                          id="foodbakery_radius_location_open333"
                                          className="foodbakery-radius-location"
                                        >
                                          <i className="icon-target5"></i>
                                        </span>
                                        <input
                                          type="text"
                                          className="location-field-text filter"
                                          placeholder="All Locations"
                                        />
                                      </div>
                                      <div
                                        className="select-location"
                                        id="foodbakery-radius-range333"
                                        style={{ display: "none" }}
                                      >
                                        <div className="select-popup popup-open">
                                          <a
                                            id="location_close_popup333"
                                            href="javascript:0;"
                                            className="location-close-popup"
                                          >
                                            <i className="icon-times"></i>
                                          </a>
                                          <input
                                            type="hidden"
                                            className="foodbakery-radius"
                                            name="foodbakery_radius"
                                            value="10"
                                          />
                                          <p>Show within</p>
                                          <input
                                            id="ex16b333"
                                            type="text"
                                            data-value="10"
                                            value="10"
                                            style={{ display: "none" }}
                                          />
                                          <span>
                                            Miles:{" "}
                                            <span id="ex16b333CurrentSliderValLabel">
                                              10
                                            </span>
                                          </span>
                                          <br />
                                          <p className="my-location">
                                            of{" "}
                                            <i className="cs-color icon-location-arrow"></i>
                                            <a
                                              id="foodbakery-geo-location-all"
                                              className="cs-color foodbakery-geo-location313324"
                                              href="javascript:void(0)"
                                            >
                                              My location
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Blog content */}
        <div className="container">
          <div className="row">
            <div className="page-content col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="page-section">
                <div className="blog-detail">
                  <div className="row">
                    {/* Blog details */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="author-info">
                        <figure>
                          <img
                            alt="#"
                            src={`${process.env.PUBLIC_URL}/assets/extra-images/avatar-01.jpeg`}
                          />
                        </figure>
                        <div className="text-holder">
                          <p>
                            Posted by{" "}
                            <span className="name">
                              <a href="#">{user.username}</a>
                            </span>
                          </p>
                          <ul className="post-options">
                            <li>
                              <i className="icon-clock"></i>
                              <span className="date">Oct 28, 2016</span>
                            </li>
                            <li>
                              <i className="icon-eye4"></i>
                              <span>494</span>
                            </li>
                            <li>
                              <span>
                                <a href="#">
                                  <i className="icon-heart-outlined"></i>1
                                </a>
                              </span>
                            </li>
                          </ul>
                          {/* Follow/Unfollow Button */}
                          {isFollowing ? (
                            <button onClick={handleUnfollow} className="btn-danger" >
                              Unfollow
                            </button>
                          ) : (
                            <button onClick={handleFollow} className="btn-primary">
                              Follow
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="title-area">
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <img
                          src={image_url}
                          alt="Blog Image"
                          className="blog-image"
                          style={{
                            width: "100%",
                            height: "auto",
                            
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="tags-list mt-4">
                        <h6>Tags:</h6>
                        <ul>
                          <li><a href="#">Roll</a></li>
                          <li><a href="#">Home</a></li>
                          <li><a href="#">Blog</a></li>
                          <li><a href="#">Lists</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="comment-form mt-4">
                        <h4 className="text-2xl font-semibold">Post your Comment</h4>
                        <form onSubmit={handleAddComment} className="flex flex-col">
                          <textarea
                            id="comment_mes"
                            name="comment"
                            placeholder="Text here.."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                          ></textarea>
                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Post Comment
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="comments-list mt-4">
                        {Array.isArray(comments) &&
                          comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="comment border-b-2 border-gray-300 pb-4 mb-4 relative"
                            >
                              <div className="flex items-start mb-2">
                                <img
                                  src={comment.user.profile_picture || `${process.env.PUBLIC_URL}/assets/extra-images/avatar-01.jpeg`}
                                  alt="Profile"
                                  className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                  <p className="font-semibold">{comment.user.username}</p>
                                  <p>{comment.content}</p>
                                  <button
                                    onClick={() => handleLikeComment(comment.id)}
                                    className="text-blue-500 mt-2 inline-flex items-center"
                                  >
                                    <i className={`icon-heart ${comment.likedByUser ? "text-red-500" : "text-gray-400"}`}></i>
                                    <span className="ml-1">{comment.likes}</span>
                                  </button>
                                  <button
                                    onClick={() => setCommentIdForReply(comment.id)}
                                    className="ml-4 text-blue-500"
                                  >
                                    Reply
                                  </button>
                                  {/* Pin Comment Button */}
                                  <button
                                    className="ml-4 text-blue-500"
                                    // Add functionality for pinning if needed
                                  >
                                    Pin
                                  </button>
                                </div>
                              </div>
                              {commentIdForReply === comment.id && (
                                <form onSubmit={handleAddReply} className="reply-form mt-4">
                                  <textarea
                                    placeholder="Reply here.."
                                    value={newReply}
                                    onChange={(e) => setNewReply(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                  ></textarea>
                                  <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                  >
                                    Post Reply
                                  </button>
                                </form>
                              )}

                              {comment.replies && (
                                <>
                                  <button
                                    onClick={() => toggleReplies(comment.id)}
                                    className="mt-2 text-blue-500"
                                  >
                                    {showAllReplies[comment.id] ? "Show Less Replies" : "Show All Replies"}
                                  </button>
                                  {showAllReplies[comment.id] && (
                                    <div className="replies mt-4 pl-4 border-l-2 border-gray-300">
                                      {comment.replies.map((reply) => (
                                        <div
                                          key={reply.id}
                                          className="reply flex items-start mb-2"
                                        >
                                          <img
                                            src={reply.user.profile_picture || `${process.env.PUBLIC_URL}/assets/extra-images/avatar-01.jpeg`}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full mr-2"
                                          />
                                          <div>
                                            <p className="font-semibold">{reply.user.username}</p>
                                            <p>{reply.content}</p>
                                            <button
                                              onClick={() => handleLikeComment(reply.id)}
                                              className="text-blue-500 mt-2 inline-flex items-center"
                                            >
                                              <i className={`icon-heart ${reply.likedByUser ? "text-red-500" : "text-gray-400"}`}></i>
                                              <span className="ml-1">{reply.likes}</span>
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BlogRightSide />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
