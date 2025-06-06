import React, { useEffect, useState } from 'react'
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantHeader from './RestaurantHeader';

function RestaurantPassword() {
	const [userr, setUserr] = useState(null);
	const [restaurant, setRestaurant] = useState([]);
  
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
		  .then((rest) => setRestaurant(rest));
	  }
	}, [userr]);

	// useEffect(() => {
	// 	fetch(`/restaurants/${userr.id}`)
	// 	  .then((r) => r.json())
	// 	  .then((restaurant) => setRestaurant(restaurant))
	// 	  .catch((error) => {
	// 		console.error("Error fetching user:", error);
	// 	  });
	//   }, [userr]);

	
	const orders = restaurant.orders
	


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
							<div className="user-dashboard loader-holder">
                            <div class="user-holder">
									<div class="row">
										<form>
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="element-title has-border">
													<h5>Change Password</h5>
												</div>
											</div>
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="field-holder">
													<label> Current Password*</label>
													<input type="password" class="foodbakery-dev-req-field"/>
												</div>
											</div>
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="field-holder">
													<label> New Password*</label>
													<input type="password" class="foodbakery-dev-req-field"/>
												</div>
											</div>
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="field-holder">
													<label> Confirm New Password* </label>
													<input type="password" class="foodbakery-dev-req-field"/>
												</div>
											</div>
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="field-holder">
													<button name="button" type="button" class="btn-submit">Save</button>
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
	   )}
    </>
  )
}

export default RestaurantPassword