import React, { useEffect, useState } from 'react'
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantHeader from './RestaurantHeader';

function RestaurantReviews() {
	const [userr, setUserr] = useState(null);
	const [restaurant, setRestaurant] = useState([]);
	const [reviews, setReviews] = useState([]);


	useEffect(() => {
	  // Fetch user information
	  fetch("https://foodchapchap-qq3a.onrender.com/me")
		.then((response) => response.json())
		.then((user) => setUserr(user));
	}, []);
  
	useEffect(() => {
	  // Fetch user's orders when userr changes
	  if (userr) {
		fetch(`https://foodchapchap-qq3a.onrender.com/restaurants/${userr.id}`)
		  .then((response) => response.json())
		  .then((rest) => {
		
			fetch(`/reviews/${rest.id}`)
			.then((response) => response.json())
			.then((reviews) => setReviews(reviews));
		});
	  }
	}, [userr]);

	
console.log('reviews',reviews.length);
console.log("reviews[0]", reviews[0])

	// useEffect(() => {
	// 	fetch(`/restaurants/${userr.id}`)
	// 	  .then((r) => r.json())
	// 	  .then((restaurant) => setRestaurant(restaurant))
	// 	  .catch((error) => {
	// 	https://meet.google.com/uaz-cnct-iiy
	// console.error("Error fetching user:", error);
	// 	  });
	//   }, [userr]);

	
	


	return (
	  <>
	   {userr && (
    		<div className="main-section">
		<RestaurantHeader userr={userr}/>
			<div className="page-section account-header buyer-logged-in">
				<div className="container">
					<div className="row">
					<RestaurantSidebar />
						<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                        <div class="user-dashboard loader-holder">
								<div class="user-holder">
									<div class="dashbard-user-reviews-list">
										<div class="row">
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="element-title has-border reviews-header right-filters-row">
													<h5>
														<span>Reviews Given</span>
														<span class="element-slogan">(4)</span>
													</h5>
													<div class="right-filters row pull-right">
														<div class="col-lg-6 col-md-6 col-xs-6">
															<div class="sort-by">
																<ul class="reviews-sortby">
																	<li class="reviews-sortby-active">
																		<small>Sort by:</small>
																		<span><strong class="active-sort">Newest Reviews </strong></span>
																		<div class="reviews-sort-dropdown">
																			<form>
																				<div class="input-reviews">
																					<div class="radio-field">
																						<input name="review" id="check-1" type="radio" value="newest" checked="checked"/>
																						<label for="check-1">Newest Reviews</label>
																					</div>
																					<div class="radio-field">
																						<input name="review" id="check-2" type="radio" value="highest"/>
																						<label for="check-2">Highest Rating</label>
																					</div>
																					<div class="radio-field">
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
														<div class="col-lg-6 col-md-6 col-xs-6 pull-right">
															<div class="input-field">
																<i class="icon-angle-down"></i>
																<input type="text" data-id="daterange223" id="daterange" value="" placeholder="Select Date Range"/>
												
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="user-reviews-list">
													<div class="review-listing">
														<ul>
															
															
														{reviews.length > 0 ? (

  reviews.map((review) => {
    const amount = review.rate * 20;

    return (
      <li key={review.id} className="alert">
        <div className="list-holder">
          <div className="review-text">
            <div className="review-title">
              <h6><a href="#"> Restaurant: {review.user.username}</a></h6>
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
  })
) : (
  <p>No reviews available</p>
)}


														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="dashboard-add-new-review-holder add-new-review-holder" style={{display:"none"}} >
										<div class="row">
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="elements-title">
													<h3>Rate and Write a Review</h3>
													<a href="#" class="dashboard-close-post-new-reviews-btn close-post-new-reviews-btn">Close</a>
												</div>
											</div>
											<div class="foodbakery-add-review-data">
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div class="form-element">
														<i class="icon-edit2"></i>
														<input type="text" placeholder="Title of your Comment *" value=""/>
													</div>
												</div>
												<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<div class="form-element">
														<i class="icon-user4"></i>
														<input type="text" placeholder="Name *" value="resturant-demo" disabled="disabled"/>
													</div>
												</div>
												<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<div class="form-element">
														<i class="icon-envelope3"></i>
														<input type="text" placeholder="Email *" value="dum32@chimpgroup.com"/>
													</div>
												</div>
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div class="form-element">
														<i class="icon-message"></i>
														<textarea placeholder="Tell about your experience or leave a tip for others" cols="30" rows="10" maxlength="0"></textarea>
													</div>
												</div>
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div class="form-element message-length">
														<span class="min_char">Min characters: 0</span>
														<span class="max_char">Max characters: 0</span>
														<div id="textarea_feedback"></div>
													</div>
												</div>
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div class="form-element">
														<div class="review-reply-button input-button-loader">
															<input type="button" value="Submit your Review"/>
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
			</div>
		</div>
	   )}
    </>
  )
}

export default RestaurantReviews