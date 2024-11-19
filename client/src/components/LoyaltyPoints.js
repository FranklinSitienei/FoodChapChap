import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function LoyaltyPoints({ restaurants }) { // Update the component name
    const [userr, setUserr] = useState(null);
	const [userOrders, setUserOrders] = useState([]);


    // <img src="assets/extra-images/main-logo.png" alt=""
    // style={{ marginLeft: '-200', marginRight: '0px', height: '50px'}} />
  
	useEffect(() => {
	  // Fetch user information
	  fetch("/me")
		.then((response) => response.json())
		.then((user) => setUserr(user));
	}, []);
  
	useEffect(() => {
	  // Fetch user's orders when userr changes
	  if (userr) {
		fetch(`/ordersuser/${userr.id}`)
		  .then((response) => response.json())
		  .then((orders) => setUserOrders(orders));
	  }
	}, [userr]);

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
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="row">
												<div className="element-title has-border right-filters-row">
													<h5>Yummy Points</h5> {/* Update title */}
													<div className="right-filters row pull-right">
														<div className="col-lg-6 col-md-6 col-xs-6">
															<div className="input-field">
																<select className="chosen-select-no-single" style={{display: "none"}}>
																	<option selected="selected" value="">Select Redeem Points</option>
																	{/* <option value="Processing">Processing</option>
																	<option value="Cancelled">Cancelled</option>
																	<option value="Completed">Completed</option> */}
																</select><div className="chosen-container chosen-container-single chosen-container-single-nosearch" style={{width: "190px"}} title=""><a className="chosen-single" tabindex="-1"><span>Redeem Points</span><div><b></b></div></a><div className="chosen-drop"><div className="chosen-search"><input type="text" autocomplete="off" readonly=""/></div><ul className="chosen-results"></ul></div></div>
															</div>
														</div>
														<div className="col-lg-6 col-md-6 col-xs-6">
															<div className="input-field">
																<i className="icon-angle-down"></i>
																<input type="text" data-id="daterange223" id="daterange" value="" placeholder="Select Date Range"/>
												
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div className="user-orders-list">
													<div className="row">
													
	{/* Loyalty Points List  */}

	{/* Replace the order-related code with Loyalty Points-related code */}
	{/* You can display the user's loyalty points here */}
	{/* Example: */}
	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
	  <div className="order-list" style={{height: "272px"}}>
	      <div className="author-info">
	          <div className="img-holder">
	              <figure>
	                  <a href="#"><i style={{fontSize: "51px"}}class="icon-coins"></i></a>
	              </figure>
	          </div>
	          <div className="text-holder">
	              <h6>Yummy Points</h6>
	          </div>
	      </div>
	      <div className="post-time">
				<span style={{fontSize: "46px"}} >{userr.yummypoints} points</span>
	      </div>

	  </div>
	</div>
	{/* End of Loyalty Points List */}

													</div>
												</div>
											</div>
										</div>
										<ul className="pagination">
											<li className="active"><a>1</a></li>
											<li><a href="#">2</a></li>
											<li><a href="#">3</a></li>
											<li><span className="page-numbers dots">…</span></li>
											<li><a href="#">24</a></li>
											<li><a href="#">Next </a></li>
										</ul>
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

export default LoyaltyPoints; 
