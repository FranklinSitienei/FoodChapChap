import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogForm.css';
import BlogSidebar from './BlogSidebar';

function BlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image_url: ''
  });
  const [tags, setTags] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image_url: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData, tags: tags.join(' ') })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Blog could not be created');
        }
      })
      .then((data) => {
        setIsSuccess(true);
        setMessage('Blog Post Added successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        setIsSuccess(false);
        setMessage(error.message);
      });
  };

  return (
    <div className="main-section">
      <div className="page-section account-header buyer-logged-in">
        <div className="container">
          <div className="row">
            <BlogSidebar />
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <div className="user-dashboard loader-holder">
                <div className="user-holder">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="element-title has-border right-filters-row">
                        <h5>Add Blog Post</h5><br />
                        {message && (
                          <p
                            style={{
                              backgroundColor: isSuccess ? 'green' : 'red',
                              color: 'white',
                              padding: '10px',
                              marginBottom: '10px',
                              borderRadius: '5px',
                            }}
                          >
                            {message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit}>
                    <div className="form-fields-set">
                      <ul>
                        <li>
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="restaurant-info">
                                <div className="img-holder">
                                  <ul className="foodbakery-gallery-holder">
                                    <li className="gal-img">
                                      <div className="drag-list">
                                        <div className="item-thumb">
                                          <img className="thumbnail" src={formData.image_url || `${process.env.PUBLIC_URL}/assets/extra-images/one.jpg`} alt="Blog" />
                                        </div>
                                        <div className="item-assts">
                                          <ul className="list-inline pull-right">
                                            <li className="close-btn"><a href="#"><i className="icon-cross-out"></i></a></li>
                                          </ul>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="text-holder">
                                  <strong>Blog Image</strong>
                                  <div className="upload-gallery">
                                    <input className="foodbakery-dev-gallery-uploader" style={{ display: "none" }} type="file" onChange={handleImageChange} />
                                    <a href="#" className="upload-btn foodbakery-dev-featured-upload-btn" onClick={(e) => { e.preventDefault(); document.querySelector('.foodbakery-dev-gallery-uploader').click(); }}>Upload Image</a>
                                  </div>
                                  <span>Max Upload Size: 10MB.</span>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="field-holder">
                                <label>Title*</label>
                                <input
                                  type="text"
                                  name="title"
                                  className="foodbakery-dev-req-field"
                                  placeholder="Blog Title"
                                  value={formData.title}
                                  onChange={handleFormChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="field-holder">
                                <label>Content</label>
                                <textarea
                                  name="content"
                                  className="foodbakery-dev-req-field"
                                  placeholder="Blog Content"
                                  value={formData.content}
                                  onChange={handleFormChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="field-holder">
                                <label>Author</label>
                                <input
                                  type="text"
                                  name="author"
                                  className="foodbakery-dev-req-field"
                                  placeholder="Author Name"
                                  value={formData.author}
                                  onChange={handleFormChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="field-holder">
                                <label>Tags (Press Enter to add)</label>
                                <input
                                  type="text"
                                  className="foodbakery-dev-req-field"
                                  placeholder="Add a tag"
                                  onKeyDown={handleTagInput}
                                />
                                <div className="tag-container">
                                  {tags.map((tag, index) => (
                                    <span key={index} className="tag">#{tag}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div>
                        <div className="field-holder">
                          <div className="payment-holder input-button-loader">
                            <input className="update-restaurant" type="submit" value="Add Blog Post" />
                          </div>
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
  );
}

export default BlogForm;
