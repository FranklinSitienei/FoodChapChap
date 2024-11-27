import React, { useEffect, useState } from 'react';
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantHeader from './RestaurantHeader';

function RestaurantAddfood() {
  const [userr, setUserr] = useState(null);
  const [restaurant, setRestaurant] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [token, setToken] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    cuisine_id: '',
    foodtype: '',
    restaurant_id: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('restaurant');
    console.log('Token from localStorage:', token); // Debugging token
    setToken(token);

    if (token) {
      fetch('/restaurants/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Unauthorized');
          }
          return response.json();
        })
        .then((user) => {
          console.log('User:', user); // Debugging user
          setUserr(user);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, []);

  useEffect(() => {
    fetch('/cuisines')
      .then((response) => response.json())
      .then((cuisines) => setCuisines(cuisines));
  }, []);

  useEffect(() => {
    if (userr) {
      fetch(`/restaurants/${userr.id}`)
        .then((response) => response.json())
        .then((rest) => {
          setRestaurant(rest);
          setFormData((prevFormData) => ({
            ...prevFormData,
            restaurant_id: rest.id,
            quantity: 10,
          }));
        });
    }
  }, [userr]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send POST request with authentication token
    fetch('/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the headers
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setIsSuccess(true);
          setMessage('Food added successfully!');
        } else {
          setIsSuccess(false);
          setMessage('Failed to add food. Please try again.');
        }
        return response.json(); // Ensure that the response is returned as JSON
      })
      .then((data) => {
        // Handle response data if needed
        console.log('Response data:', data); // Debugging response data
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  return (
    <>
      {userr && (
        <div className="main-section">
          <RestaurantHeader userr={userr} />
          <div className="page-section account-header buyer-logged-in">
            <div className="container">
              <div className="row">
                <RestaurantSidebar />
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="user-dashboard loader-holder">
                    <div className="user-holder">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="element-title has-border right-filters-row">
                            {/* Title  */}
                            <h5>Add Food</h5>
                            <br />
                            {message && (
                              <p
                                style={{
                                  backgroundColor: isSuccess
                                    ? 'green'
                                    : 'red',
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
                                              <img
                                                className="thumbnail"
                                                src={`${process.env.PUBLIC_URL}/assets/extra-images/${restaurant.image}`}
                                                alt=""
                                              />
                                            </div>
                                            <div className="item-assts">
                                              <ul className="list-inline pull-right">
                                                <li className="close-btn">
                                                  <a href="#">
                                                    <i className="icon-cross-out"></i>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="text-holder">
                                      <strong>Food Image</strong>
                                      <div className="upload-gallery">
                                        <input
                                          className="foodbakery-dev-gallery-uploader"
                                          style={{ display: 'none' }}
                                          type="file"
                                        />
                                        <a
                                          href="#"
                                          className="upload-btn foodbakery-dev-featured-upload-btn"
                                        >
                                          Upload Image
                                        </a>
                                      </div>
                                      <span>. Max Upload Size: 10MB.</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Name*</label>
                                    <input
                                      type="text"
                                      name="name"
                                      className="foodbakery-dev-req-field"
                                      placeholder="Food Name"
                                      value={formData.name}
                                      onChange={handleFormChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Description</label>
                                    <input
                                      type="text"
                                      name="description"
                                      className="foodbakery-dev-req-field"
                                      placeholder="Food Description"
                                      value={formData.description}
                                      onChange={handleFormChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Price</label>
                                    <input
                                      type="text"
                                      name="price"
                                      className="foodbakery-dev-req-field"
                                      placeholder="Food price"
                                      value={formData.price}
                                      onChange={handleFormChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Discount Price</label>
                                    <input
                                      type="number"
                                      name="discount_price"
                                      className="foodbakery-dev-req-field"
                                      placeholder="Food price"
                                      value={formData.discount_price}
                                      onChange={handleFormChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>cuisine</label>
                                    <select
                                      name="cuisine_id"
                                      className="chosen-select"
                                      value={formData.cuisine_id}
                                      onChange={handleFormChange}
                                    >
                                      <option value="">Select Cuisine</option>
                                      {cuisines &&
                                        cuisines.map((cuisine, index) => (
                                          <option
                                            key={index}
                                            value={cuisine.id}
                                          >
                                            {cuisine.name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <div className="field-holder">
                                    <label>Food Type</label>
                                    <select
                                      name="foodtype"
                                      className="chosen-select"
                                      value={formData.foodtype}
                                      onChange={handleFormChange}
                                      required
                                    >
                                      <option value="">Select Food Type</option>
                                      <option value="0">Fast Food</option>
                                      <option value="1">Others</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <div>
                            <div className="field-holder">
                              <div className="payment-holder input-button-loader">
                                <input
                                  className="update-restaurant"
                                  type="submit"
                                  value="Add Food"
                                />
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
      )}
    </>
  );
}

export default RestaurantAddfood;
