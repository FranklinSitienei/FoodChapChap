import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
function AdminPassword() {
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
		fetch(`https://foodchapchap-qq3a.onrender.com/restaurants`)
		  .then((response) => response.json())
		  .then((rest) => setRestaurant(rest));
	  }
	}, [userr]);

if (userr) {
	
	if (userr.user_type !== "admin") {
		window.location.href = "../";
	  }
}

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
<AdminHeader userr={userr}/>
			<div className="page-section account-header buyer-logged-in">
				<div className="container">
					<div className="row">
					<AdminSidebar />
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

export default AdminPassword