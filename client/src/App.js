import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
// import Main from './components/main';
import ReCAPTCHA from './components/RecaptchaForm';
import TermsAndConditionsPage from './components/TermsAndConditionPage.js'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

// import LoyaltyPoints from './components/LoyaltyPoints';


import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Restaurants from './components/Restaurants'

import LoginForm from './components/auth/LoginForm'
import ResetForm from './components/auth/ResetForm'
import RegisterForm from './components/auth/RegisterForm'

import Restaurantdash from './components/Restaurantdash'
import RiderDashboard from './components/rider/RiderDashboard.js';
import RiderLogin from './components/rider/riderLogin.js';
import RiderProfile from './components/rider/riderProfile.js';
import RiderRegistration from './components/rider/riderRegistration.js';
import BlogProfile from './components/BlogProfile.js';
import { useEffect, useState } from 'react';
import Customer from './components/Customer';
 import LoyaltyPoints from './components/LoyaltyPoints';
import RestaurantsMenu from './components/RestaurantsMenu';
import AdminDash from './components/admindash';
import CustomerOrders from './components/CustomerOrders';
import CustomerProfile from './components/CustomerProfile';
import CustomerReviews from './components/CustomerReviews';
import CustomerBookings from './components/CustomerBookings';
import CustomerStatements from './components/CustomerStatements';
import RestaurantProfile from './components/RestaurantProfile';
import RestaurantFoods from './components/RestaurantFoods';
import RestaurantAddfood from './components/RestaurantAddfood';
import RestaurantReviews from './components/RestaurantReviews';
import RestaurantSettlements from './components/RestaurantSettlements';
import RestaurantBookings from './components/RestaurantBookings';
import RestaurantPassword from './components/RestaurantPassword';
import AdminProfile from './components/AdminProfile';
import AdminSettlements from './components/AdminSettlements';
import AdminPassword from './components/AdminPassword';
import CreateBlog from './components/blog/CreateBlog';
import ContactMe from './components/ContactUs';
import UserProfile from './components/UserProfile';
import BlogDetail from './components/blog/BlogDetail';
import RegisterRestaurant from './components/auth/RegisterRestaurant';
import RestaurantSignup from './components/auth/SignUp';
import BlogList from './components/BlogList';
import BlogFollowingList from './components/BlogFollowingList.js'
import BlogDetails from './components/BlogDetails';
import RiderDash from './components/RiderDash.js';
import BlogForm from './components/BlogForm.js';
import RestaurantLogin from './components/auth/RestaurantLogin.js'


function App() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState(0);
  const [orders, setOrders] = useState([]);
  const [allorders, setAllOrders] = useState([]);
  const [restaurants, SetRestaurants] = useState([]);
  const [reviews, SetReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
	const [showReset, setShowReset] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  

  useEffect(() => {
    // auto-login
    fetch("https://foodchapchap-qq3a.onrender.com/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);

          if (user && user.id) {
            fetch(`https://foodchapchap-qq3a.onrender.com/orders/${user.id}`)
              .then((r) => r.json())
              .then((orders) => setOrders(orders));

              fetch("https://foodchapchap-qq3a.onrender.com/Points")
              .then((r) => r.json())
              .then((points) => setFoods(points));





            fetch("https://foodchapchap-qq3a.onrender.com/blogs")
              .then((r) => r.json())
              .then((blogs) => setBlogs(blogs));

            fetch("https://foodchapchap-qq3a.onrender.com/users")
              .then((r) => r.json())
              .then((users) => setUsers(users));

            fetch("https://foodchapchap-qq3a.onrender.com/orders")
              .then((r) => r.json())
              .then((allorders) => setAllOrders(allorders));
          } else {
            // Set modal to true if there is no logged-in user
            setModal(true);
          }
        });
      }
    });
  }, []);


  useEffect(() => {
    fetch("https://foodchapchap-qq3a.onrender.com/blogs")
              .then((r) => r.json())
              .then((blogs) => setBlogs(blogs));
 }, []);


  useEffect(() => {
    fetch("https://foodchapchap-qq3a.onrender.com/restaurants")
              .then((r) => r.json())
              .then((restaurants) => SetRestaurants(restaurants));
 }, []);


 useEffect(() => {
  fetch("https://foodchapchap-qq3a.onrender.com/reviews")
            .then((r) => r.json())
            .then((reviews) => SetReviews(reviews));
}, []);


 useEffect(() => {
  fetch("https://foodchapchap-qq3a.onrender.com/orders")
            .then((r) => r.json())
            .then((orders) => setOrders(orders));
}, []);



  function handleAddFood(newFood) {
    setFoods([...foods, newFood]);
  }

  function handleDeleteFood(id) {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
  }

  function handleLogout() {
    setUser(null);
    window.location.href = "../";
  }

  const handleUpdateCart = (value) => {
    setCart(value);
  };

  // if (!user) return <Main onLogin={setUser} />;
  return (
    <>
                  <GoogleOAuthProvider clientId="625530136605-nhp0iglntmb39ikg14qjep5j2mpistbj.apps.googleusercontent.com">
    
	<div className="wrapper">
			<Header user={user} onLogout={handleLogout} cart={cart}/>
      <Routes> 
      <Route path="/termsandconditions" element={ <TermsAndConditionsPage />} />
     
{/* customers */}
<Route path="/" element={<Home />} />
<Route path="/customerdash" element={<Customer restaurants= {restaurants} user={user}/>} />
<Route path="/customerdash/orders" element={<CustomerOrders restaurants= {restaurants} orders={orders}/>} />
<Route path="/customerdash/profile" element={<CustomerProfile restaurants= {restaurants} orders={orders}/>} />
<Route path="/customerdash/loyalty_points" element={<LoyaltyPoints />} />
<Route path="/customerdash/reviews" element={<CustomerReviews reviews= {reviews} restaurants= {restaurants} orders={orders}/>} />
<Route path="/customerdash/bookings" element={<CustomerBookings restaurants= {restaurants} orders={orders}/>} />
<Route path="/customerdash/statements" element={<CustomerStatements restaurants= {restaurants} orders={orders}/>} />

{/* admin  */}
<Route path="/admindash" element={<AdminDash/>} />
<Route path="/admindash/profile" element={<AdminProfile />} />
<Route path="/admindash/settlements" element={<AdminSettlements />} />
<Route path="/admindash/password/termsandconditions" element={<AdminPassword />} />

{/* blogs  */}
<Route path="/blogs" element={<BlogList  blogs={blogs}  />}/>
<Route path="/blogs/following" element={<BlogFollowingList  blogs={blogs}  />}/>
<Route path="/blogs/:id" element={<BlogDetails blogs={blogs} />} />
<Route path="/blogs/addblog" element={<BlogForm blogs={blogs} />} />
<Route path="/blogs/profile" element={<BlogProfile blogs={blogs} />} />

{/* riders  */}
<Route path="/rider" element={<RiderRegistration />} />
<Route path="/riderlogin" element={<RiderLogin />} />
<Route path="/rider-profile" element={<RiderProfile />} />

{/* riders dashboard */}
<Route path="/riderdash" element={<RiderDash />} />

{/* <Route path="/blogs/createblog" element={<CreateBlog/>} />
<Route path="/blogs" element={<BlogPage blogs={blogs}  />} />

 <Route path="/blogprofile/:id" element={<BlogProfile users={users} blogs={blogs} />} />

<Route path="/blog/fullcontent/:id" element={<BlogDetail blogs={blogs}  />} /> */}

<Route path="/contactus" element={<ContactMe />} />
<Route path="/restaurant/login" element={<RestaurantLogin />} />
<Route path="/restaurant/register" element={<RegisterRestaurant />} />
<Route path="/restaurantdash" element={<Restaurantdash />} />
<Route path="/restaurantdash/profile" element={<RestaurantProfile/>} />
<Route path="/restaurantdash/addfood" element={<RestaurantAddfood />} />
<Route path="/restaurantdash/foods" element={<RestaurantFoods />} />
<Route path="/restaurantdash/reviews" element={<RestaurantReviews />} />
<Route path="/restaurantdash/settlements" element={<RestaurantSettlements />} />
<Route path="/restaurantdash/bookings" element={<RestaurantBookings />} />
<Route path="/restaurantdash/password" element={<RestaurantPassword />} />
<Route
            path="/register+your=restaurant"
            element={<RestaurantSignup />}
          />
<Route
            path="/register+your=restaurant/create+restaurant=form"
            element={<RegisterRestaurant />}
          />
<Route path="/restaurants/:id" element={<RestaurantsMenu restaurants= {restaurants} foods={foods} username={user} updateCart={handleUpdateCart}/>} />
<Route path="/restaurants" element={<Restaurants restaurants= {restaurants} />}/>
<Route path="/me" element={<UserProfile />} />
</Routes>
<Footer />
	</div>
	<div className="modal fade in" id="sign-in" aria-labelledby="myModalLabel">
		<div className="modal-dialog">
			<div className="login-form">
				<div className="modal-content">
					<div className="tab-content">
						<div id="user-login-tab" className="tab-pane fade in active">
							
						{showLogin && showReset ? (
              
        <>
          <LoginForm onLogin={setUser} />
          <ReCAPTCHA/>
         



    
          
									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
										New Here?
										<span    onClick={() => {
                setShowReset(false);
                setShowLogin(false);
              }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}> Sign Up</span><br/>
									</div>
	   
									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Forgot your password?
										<span    onClick={() => {
                setShowReset(true);
                setShowLogin(false);
              }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}> Reset Password</span>
									</div>


        </>
   

      ) : showReset && !showLogin ? (
        <>
          <ResetForm onLogin={setUser} />
    
		  <div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Have an Account?
										<span    onClick={() => {
                  setShowReset(true);
                  setShowLogin(true);
                    }
                  }
              data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}> Login</span>
									</div>




        </>
      ) : (
        <>
          <RegisterForm onLogin={setUser} />
		  <div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Have an Account?
                  <span    onClick={() => {
                  setShowReset(true);
                  setShowLogin(true);
                    }
                  }
              data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}>  Login</span>


									</div>
     


									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Forgot your password?
										<span    onClick={() => {
                setShowReset(true);
                setShowLogin(false);
              }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch" style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}>  Reset Password</span>
									</div>
        </>
      )}


						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  </GoogleOAuthProvider>;
    </>
  );
}

export default App;
