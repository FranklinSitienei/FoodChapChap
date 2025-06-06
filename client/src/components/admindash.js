import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

function AdminDash() {
	const [userr, setUserr] = useState(null);
	const [orders, setOrders] = useState([]);
  
	useEffect(() => {
	  fetch("https://foodchapchap-qq3a.onrender.com/me")
		.then((response) => response.json())
		.then((user) => setUserr(user));
	}, []);
  
	useEffect(() => {
        if (userr) {
            fetch(`https://foodchapchap-qq3a.onrender.com/orders`)
                .then((response) => response.json())
                .then((orders) => setOrders(orders));
        }
    }, [userr]);

if (userr) {
	if (userr.user_type !== "admin") {
		window.location.href = "../";
	  }
}

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
								<div className="user-holder">
									<div className="user-message" style={{ height: '110px', display: 'none' }}>
										<a className="close" href="#"><i className="icon-cross-out"></i></a>
										<h2>Welcome to your Restaurant.</h2>
										<p>
                                          
                                            Restaurant Dashboard gives you quick access to settings and tools for managing your Account like [Change address] and [Change password] . You can [manage Restaurant] Build Menu , Manage Orders, Bookings, Reviews, Memberships, Withdrawals, Earnings, Statements, Change Password, Location and if you are you Restaurant Owner can also [Manage Team]. 
                                            
                                            </p>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
											<div className="element-title has-border right-filters-row">
												<h5>Recent Orders</h5>
												<div className="right-filters row pull-right">
													<div className="col-lg-6 col-md-6 col-xs-6">
														<div className="input-field">
															<select className="chosen-select-no-single">
																<option selected="selected" value="">Select Orders Status</option>
																<option value="Processing">Processing</option>
																<option value="Cancelled">Cancelled</option>
																<option value="Completed">Completed</option>
															</select>
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
												<div className="responsive-table">
													<ul className="table-generic">
														<li className="order-heading-titles">
															<div>Order id</div>
															<div>Date</div>
															<div>Total Price</div>
															{/* <div>Charges</div>
															<div>Received</div> */}
															<div>Status</div>
															<div>Detail</div>
														</li>
													
													
														{Array.isArray(orders) && orders.map((order, index) => (

<>
														<li key={index} className="order-heading-titles">
															<div><a href="#" data-toggle="modal" data-target={`#order-det-${order.id}`}>order-{order.id}</a></div>
															<div>{order.created_at}</div>
															<div>ksh {order.price}</div>
															{/* <div>£ 3.90</div>
															<div>£ 35.09</div> */}
															<div><span className="order-status" style={{ backgroundColor: '#047a06' }} >Completed</span></div>
															<div><a href="#" data-toggle="modal" data-target={`#order-det-${order.id}`}><i className="icon-plus2 text-color"></i></a></div>
														</li>
	<div className="modal fade menu-order-detail order-detail"  id={`order-det-${order.id}`} tabindex="-1" role="dialog" style={{ display: 'none' }}>
	<div className="modal-dialog">
		<div className="modal-content">
			<div className="modal-header">
				<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
				<h2>Order Detail</h2>
				<button className="btn-print"><i className="icon-printer"></i><span>Receipt</span></button>
			</div>
			<div className="modal-body">
				<div className="order-detail-inner">
					<div className="description-holder">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="list-detail-options has-checkbox">
									<h3>
										{order.restaurant.name} </h3>
									<ul className="order-detail-options">
										<li className="order-number">
											<strong>Order ID:</strong>
											<span>{order.id}</span>
										</li>
										<li className="req-delivery">
											<strong>Delivery Time:</strong>
											<span>10 Minutes </span>
										</li>
										<li className="created-date">
											<strong>Delivery Date:</strong>
											<span>
											{order.created_at} </span>
										</li>
										<li className="order-type">
											<strong>Type:</strong>
											<span>order</span>
										</li>
										<li className="order-type">
											<strong>Payment Status:</strong>
											<span>Approved</span>
										</li>

									</ul>
								</div>

							</div>
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="customer-detail-holder">
									<h3>Customer Detail</h3>
									<ul className="customer-detail">
										<li>
											<strong>Name :</strong>
											<span>{order.user.username}</span>
										</li>
										<li>
											<strong>Phone Number :</strong>
											<span>{order.user.phone}</span>
										</li>
										<li>
											<strong>Email :</strong>
											<span>{order.user.email}</span>
										</li>
										<li>
											<strong>Address :</strong>
											<span>{order.user.address}</span>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="order-status-holder">
									<div className="row">
										<div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
											<h3>Order Status </h3>
										</div>
										<div className="col-lg-9 col-md-8 col-sm-8 col-xs-12">
											<div className="input-field">
												<select className="chosen-select-no-single">
													<option value="Processing">Processing</option>
													<option value="Cancelled">Cancelled</option>
													<option selected="selected" value="Completed">Completed</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<h2 className="heading">Food Menu</h2>
								<div className="responsive-table">
									<ul className="categories-order table-generic">
										<li className="order-heading-titles">
											<div>Products</div>
											<div>Price per</div>
										</li>
									
									{/* {console.log('foods', order.foods)} */}
										{
										order.orderitems && order.orderitems.map((foods, index) => (
										<li className="order-heading-titles">
											<div>
												<h4>{foods.food.name}</h4>
												<h5>{foods.food.description}</h5>
											</div>
											<div><span className="category-price">Ksh {foods.food.price}</span></div>
										</li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="row">
									<div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
										<h3>Order Total</h3>
									</div>
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
										<ul className="order-detail-options order-total">
											{/* <li className="created-date">
												<strong>Subtotal:</strong>
												<span>£24.50</span>
											</li>
											<li className="order-type">
												<strong>
													Pick Up Fee: </strong>
												<span>£10.00</span>
											</li>
											<li className="order-type">
												<strong>VAT (13%)</strong>
												<span>£4.48</span>
											</li> */}
											<li className="order-type total-price">
												<strong>Total:</strong>
												<span>Ksh {order.price}</span>
											</li>
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
</>

														))}			
													
												
													</ul>

												</div>
												<div className="print-order-detail menu-order-detail order-detail" style={{ display: 'none' }}>
													<div className="logo"><img src="assets/extra-images/main-logo.png" alt=""/></div>
													<h2>Order Detail</h2>
													<div className="order-detail-inner">
														<div className="description-holder">
															<div className="row">
																<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																	<div className="list-detail-options has-checkbox">
																		<h3>Restaurant Demo </h3>
																		<ul className="order-detail-options">
																			<li className="order-number">
																				<strong>Order ID:</strong>
																				<span>22606</span>
																			</li>
																			<li className="req-delivery">
																				<strong>Delivery Time:</strong>
																				<span>10 Minutes </span>
																			</li>
																			<li className="created-date">
																				<strong>Delivery Date:</strong>
																				<span>Apr 9, 2019 06:38 AM </span>
																			</li>
																			<li className="order-type">
																				<strong>Type:</strong>
																				<span>order</span>
																			</li>
																			<li className="order-type">
																				<strong>Payment Status:</strong>
																				<span>Approved</span>
																			</li>
																		</ul>
																	</div>
																</div>
																<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																	<div className="customer-detail-holder">
																		<h3>Customer Detail</h3>
																		<ul className="customer-detail">
																			<li>
																				<strong>Name :</strong>
																				<span>Buyer Demo</span>
																			</li>
																			<li>
																				<strong>Phone Number :</strong>
																				<span>0123456789</span>
																			</li>
																			<li>
																				<strong>Email :</strong>
																				<span>dum4@foodchapchap.com</span>
																			</li>
																			<li>
																				<strong>Address :</strong>
																				<span>London</span>
																			</li>
																		</ul>
																	</div>
																</div>
																<div className="row">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<div className="order-status-holder">
																			<h3> Order Status:</h3>
																			<div className="order-status-process order-status">
																				<p>Completed</p>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<h2 className="heading">Food Menu</h2>
																	<div className="responsive-table">
																		<ul className="categories-order table-generic">
																			<li className="order-heading-titles">
																				<div>Products</div>
																				<div>Price per</div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Pizzas</h4>
																					<h5>Foodbakery Special 9" Deep Pan</h5>
																				</div>
																				<div><span className="category-price">£4.80</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Pizzas</h4>
																					<h5>Foodbakery Special 9" Deep Pan</h5>
																				</div>
																				<div><span className="category-price">£4.80</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Pizzas</h4>
																					<h5>Foodbakery Special 12" Deep Pan</h5>
																				</div>
																				<div><span className="category-price">£3.90</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Garlic Bread</h4>
																					<h5>Garlic Bread 12" Deep</h5>
																				</div>
																				<div><span className="category-price">£3.50</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Kebabs</h4>
																					<h5>Kebabs With Naan</h5>
																				</div>
																				<div><span className="category-price">£4.50</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Burgers</h4>
																					<h5>Quarter Pounder</h5>
																				</div>
																				<div><span className="category-price">£3.00</span></div>
																			</li>
																		</ul>
																	</div>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="row">
																		<div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
																			<h3>Order Total</h3>
																		</div>
																		<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
																			<ul className="order-detail-options order-total">
																				<li className="created-date">
																					<strong>Subtotal:</strong>
																					<span>£24.50</span>
																				</li>
																				<li className="order-type">
																					<strong>
																						Pick Up Fee: </strong>
																					<span>£10.00</span>
																				</li>
																				<li className="order-type">
																					<strong>VAT (13%)</strong>
																					<span>£4.48</span>
																				</li>
																				<li className="order-type total-price">
																					<strong>Total:</strong>
																					<span>£38.99</span>
																				</li>
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
									<ul className="pagination">
										<li className="active"><a>1</a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
										<li><span className="page-numbers dots">…</span></li>
										<li><a href="#">5</a></li>
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

export default AdminDash