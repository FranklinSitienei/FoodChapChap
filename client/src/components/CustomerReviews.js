import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function CustomerReviews({ restaurants }) {


	// console.log(reviews);
    const [userr, setUserr] = useState(null);
	const [userReviews, setuserReviews] = useState([]);

	
	const [formData, setFormData] = useState({
		restaurant_id: '',
		review: '',
		rate: '',
	  });
  
	  const [isSuccess, setIsSuccess] = useState(false);
	  const [message, setMessage] = useState('');
	


	useEffect(() => {
	  // Fetch user information
	  fetch("/me")
		.then((response) => response.json())
		.then((user) => setUserr(user));
	}, []);
  
	useEffect(() => {
	  // Fetch user's orders when userr changes
	  if (userr) {
		fetch(`/reviewsuser/${userr.id}`)
		  .then((response) => response.json())
		  .then((reviews) => setuserReviews(reviews));
	  }
	}, [userr]);
	
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
		  ...prevFormData,
		  [name]: value
		}));
	  };
	
	  const handleFormSubmit = (e) => {
		e.preventDefault();
		// Send POST request
		const data = {
			user_id: userr ? userr.id : '',
			...formData 
		  };
	  
		  console.log(data);

		fetch('/reviews', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(
			data
			
			)
		})
		  .then((response) => {
			if (response.ok) {
		   
			setIsSuccess(true);
			setMessage('Review Added successfully!');
			} else {
			setIsSuccess(false);
			setMessage('Failed to add review. Please try again.');
			}
		  })
		  .then((data) => {
			// Handle response data if needed
		  })
		  .catch((error) => {
			// Handle errors
		  });
	  };
	
  return (
    <>
	 {userr && (
    	<div className="main-section">

			{/* user header */}
			<CustomerHeader userr ={userr} />
	
			<div className="page-section account-header buyer-logged-in">
				<div className="container">
					<div className="row">
						
                        
                        {/* user sidebar */}
                        
                        <CustomerSidebar />
              
						<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
							<div className="user-dashboard">
							
                            
                            
                            
                            
                            
                            <div className="user-holder">
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="element-title has-border reviews-header right-filters-row">
												<h5>
													<span>Reviews Given</span>
													<span className="element-slogan">(2)</span>

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
										
												</h5>
												<div className="right-filters row pull-right">
													<div className="col-lg-6 col-md-6 col-xs-6">
														<div className="sort-by">
															<ul className="reviews-sortby">
																<li>
																	<small>Sort by:</small>
																	<span><strong className="active-sort">Newest Reviews </strong></span>
																	<div className="reviews-sort-dropdown">
																		<form>
																			<div className="input-reviews">
																				<div className="radio-field">
																					<input name="review" id="check-1" type="radio" value="newest" checked="checked"/>
																					<label for="check-1">Newest Reviews</label>
																				</div>
																				<div className="radio-field">
																					<input name="review" id="check-2" type="radio" value="highest"/>
																					<label for="check-2">Highest Rating</label>
																				</div>
																				<div className="radio-field">
																					<input name="review" id="check-3" type="radio" value="lowest"/>
																					<label for="check-3">Lowest Rating</label>
																				</div>
																			</div>
																		</form>
																	</div>
																</li>
															</ul>
														</div>
													</div>
													<div className="col-lg-6 col-md-6 col-xs-6 pull-right">
														<div className="input-field">
															<i className="icon-angle-down"></i>
															<input type="text" data-id="daterange223" id="daterange" value="" placeholder="Select Date Range"/>
														
														</div>
													</div>
												</div>
											</div>
										</div>
									
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="user-reviews-list">
												<div className="review-listing">
													

												<div id="form">
												<form onSubmit={handleFormSubmit}>
        <div className="form-group">
            <label htmlFor="restaurant">Restaurant</label>
            <select 
		

			name="restaurant_id"
			class="chosen-select"
			value={formData.restaurant_id}
			onChange={handleFormChange}
			required
			>
				 <option value="">Select a Restaurant</option>
                {restaurants.map(restaurant => (
                    <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                    </option>
                ))}
				
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="review">Review</label>
            <textarea 
			
			rows="4" cols="50"
			
			name="review"
			class="chosen-select"
			value={formData.review}
			onChange={handleFormChange}
			
			></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="rate">Rating</label>
            <select 
			name="rate"
			class="chosen-select"
			value={formData.rate}
			onChange={handleFormChange}
			
			
			required
			>
				 <option value="">Select a Rating</option>
                {Array.from({ length: 5 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </select>
        </div>
        <button type="submit">Submit Review</button>
    </form>
</div>


												</div>
											</div>
										</div>
									
									
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="user-reviews-list">
												<div className="review-listing">
													<ul>
													{userReviews.map((review) => {
  const amount = review.rate * 20;

  return (
    <li key={review.id} className="alert">
      <div className="list-holder">
        <div className="review-text">
          <div className="review-title">
            <h6><a href="#"> Restaurant: {review.restaurant.name}</a></h6>
            <div className="rating-holder">
              <div className="rating-star">
                <span className="rating-box" style={{ width: `${amount}%` }}></span>
              </div>
            </div>
          </div>
          <p className="more">{review.review}</p>
        </div>
        <a href="#" className="delete-this-user-review close"><i className="icon-close2"></i></a>
      </div>
    </li>
  );
})}

													</ul>
												</div>
											</div>
										</div>
							
									</div>
								</div>
                            
            
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	 )}
    </>
  )
}

export default CustomerReviews