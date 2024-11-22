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
    // Fetch current user data
    fetch("/me", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user")}`
      }
    })
      .then((response) => response.json())
      .then((userData) => setUser(userData));

    const blog = blogs.find((blog) => blog.id == id);
    if (blog) {
      // Fetch blog comments
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

      // Check follow status
      fetch(`/blogs/likes/followed`, {
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
    fetch(`/blogs/${id}/comments/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCommentObj),
    })
      .then((response) => response.json())
      .then((commentsData) => {
        setComments(commentsData);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleLikeComment = (commentId) => {
    fetch(`/blogs/${id}/comments/${commentId}/like`, {
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
    fetch(`/blogs/${id}/comments/${commentIdForReply}/replies/create`, {
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
          <div className="blog-content">
            <div className="author-info">
              <figure>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/extra-images/avatar-01.jpeg`}
                  alt="Author"
                />
              </figure>
              <div className="text-holder">
                <span className="name">{author}</span>
                <span className="date">Oct 28, 2016</span>
              </div>
              <button
                onClick={isFollowing ? handleUnfollow : handleFollow}
                className={isFollowing ? "btn-danger" : "btn-primary"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>

            <div className="title-area">
              <h2>{title}</h2>
              <p>{content}</p>
              <img src={image_url} alt="Blog" className="blog-image" />
            </div>

            <div className="tags-list">
              <h6>Tags:</h6>
              <ul>
                {["Roll", "Home", "Blog", "Lists"].map((tag) => (
                  <li key={tag}>
                    <a href="#">{tag}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="views-likes">
              <div>Views: 494 Likes: 1</div>
              <div>Comments</div>
            </div>

            <div className="comments-section">
              <h3>Comments</h3>
              {Array.isArray(comments) && comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="user-info">
                    <span className="name">{comment.user.username}</span>
                    <span className="date">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="content">{comment.content}</p>
                  <div className="comment-actions">
                    <button onClick={() => handleLikeComment(comment.id)}>Like</button>
                    <button onClick={() => setCommentIdForReply(comment.id)}>
                      Reply
                    </button>
                  </div>

                  {showAllReplies[comment.id] &&
                    comment.replies.map((reply) => (
                      <div className="reply-section" key={reply.id}>
                        <div className="user-info">
                          <span className="name">{reply.user.username}</span>
                          <span className="date">
                            {new Date(reply.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="content">{reply.content}</p>
                        <div className="comment-actions">
                          <button>Like</button>
                        </div>
                      </div>
                    ))}

                  <button
                    onClick={() => toggleReplies(comment.id)}
                  >
                    {showAllReplies[comment.id] ? "Hide replies" : "Show replies"}
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="comment-form">
              <input
                type="text"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Post</button>
            </form>

            {commentIdForReply && (
              <form onSubmit={handleAddReply} className="reply-form">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <button type="submit">Reply</button>
              </form>
            )}
          </div>

          </div>
          
            <BlogRightSide />
          
        </div>
    </>
  );
}

export default BlogDetails;
