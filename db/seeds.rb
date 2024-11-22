require 'faker'
require 'open-uri'


User.destroy_all
Food.destroy_all
Orderitem.destroy_all
Order.destroy_all
Restaurant.destroy_all
Cuisine.destroy_all
Booking.destroy_all
Review.destroy_all
Yummypoint.all
Followed.all
puts 'started ##########'


rider1 = Rider.create!(first_name: "rider1", last_name: "Meshack", email: "rider1@gmail.com", phone_number: "0783565522", password: "rider1", location: "Nakuru", bike_type: "motorcycle", profile_pic: File.open(Rails.root.join("public/assets/rider1.jpeg"))) 
rider2 = Rider.create!(first_name: "rider2", last_name: "James", email: "rider2@gmail.com", phone_number: "0745678345", password: "rider2", location: "Nyeri", bike_type: "motorcycle", profile_pic: File.open(Rails.root.join("public/assets/rider1.jpeg"))) 
rider3 = Rider.create!(first_name: "rider3", last_name: "Denis", email: "rider3@gmail.com", phone_number: "0783565785", password: "rider3", location: "Nairobi", bike_type: "bicycle", profile_pic: File.open(Rails.root.join("public/assets/rider1.jpeg"))) 


user1 = User.create( username: "customer1", email: "Meshack@gmail.com",address: "Nairobi",password: "customer1",phone: "0722123223",yummypoints:0, location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user1.jpeg"))) 
user2 = User.create( username: "customer2", email: "denis@gmail.com",address: "Nyeri",password: "customer2",phone: "0725555223",yummypoints:0,location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user2.jpeg")))
user3 = User.create( username: "customer3", email: "Meshack@gmail.com",address: "Nairobi",password: "restaurant1",phone: "0722123223",yummypoints:0,location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user3.jpeg")))
user5 = User.create(username: "admin", email: "charity@gmail.com",address: "Kisumu",password: "charity",phone: "076666223",yummypoints:0,location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user4.jpeg")))
user6 = User.create( username: "customer4", email: "denis@gmail.com",address: "Mombasa",password: "restaurant2",phone: "072255523",yummypoints:0,location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user3.jpeg")))
user7 = User.create( username: "customer5", email: "denis@gmail.com",address: "Mombasa",password: "restaurant3",phone: "072255523",yummypoints:0,location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user2.jpeg")))
user8 = User.create( username: "customer6", email: "denis@gmail.com",address: "Mombasa",password: "restaurant4",phone: "072255523",yummypoints:0,location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user1.jpeg")))
user9 = User.create( username: "Philo", email: "denis@gmail.com",address: "Nakuru",password: "12345678",phone: "072255523",yummypoints:0,location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user4.jpeg")))
user4 = User.create(username: "charity", email: "charity@gmail.com",address: "Kisumu",password: "charity",phone: "076666223",yummypoints:0,location: "kinoo", profile_pic: File.open(Rails.root.join("public/assets/user3.jpeg")))

# Creating relationships (follow/unfollow)
Relationship.create(follower_id: user1.id, followed_id: user2.id)
Relationship.create(follower_id: user1.id, followed_id: user3.id)
Relationship.create(follower_id: user2.id, followed_id: user1.id)
Relationship.create(follower_id: user2.id, followed_id: user3.id)
Relationship.create(follower_id: user3.id, followed_id: user1.id)
Relationship.create(follower_id: user3.id, followed_id: user2.id)
Relationship.create(follower_id: user5.id, followed_id: user6.id)
Relationship.create(follower_id: user5.id, followed_id: user7.id)
Relationship.create(follower_id: user6.id, followed_id: user5.id)
Relationship.create(follower_id: user6.id, followed_id: user7.id)
Relationship.create(follower_id: user7.id, followed_id: user6.id)
Relationship.create(follower_id: user7.id, followed_id: user8.id)
Relationship.create(follower_id: user8.id, followed_id: user6.id)
Relationship.create(follower_id: user8.id, followed_id: user7.id)
Relationship.create(follower_id: user9.id, followed_id: user1.id)
Relationship.create(follower_id: user9.id, followed_id: user2.id)

Yummypoint1 = Yummypoint.create(user_id: user1.id, point: 2)
Yummypoint2 = Yummypoint.create(user_id: user2.id, point: 3)
Yummypoint3 = Yummypoint.create(user_id: user3.id, point: 6)
Yummypoint4 = Yummypoint.create(user_id: user9.id, point: 3)
Yummypoint5 = Yummypoint.create(user_id: user5.id, point: 3)
Yummypoint6 = Yummypoint.create(user_id: user6.id, point: 1)

# Ensure you have the necessary files in your Rails.root (usually under /public) and adjust the paths accordingly.
# Define the path to the permit file
permit_file_path = Rails.root.join('public', 'assets', 'permit.pdf')

# Seed data for restaurants with images
restaurant1 = Restaurant.create(
  firstname: "Erick", lastname: "Senior", brand: "Chicken Inn",
  location: "Nairobi Ngong Road",
  phone_number: "020345333", email: "support@chickenInn.com", password: "12345678",
  image:  'restaurant1.png',
  permit_file: File.open(permit_file_path)
)

restaurant2 = Restaurant.create(
  firstname: "Frank", lastname: "Junior", brand: "Burger King",
  location: "Nairobi Ngong Road",
  phone_number: "020345333", email: "support@burgerKing.com", password: "12345678",
  image:  'restaurant3.png',
  permit_file: File.open(permit_file_path)
)

restaurant3 = Restaurant.create(
  firstname: "Phillip", lastname: "Kadet", brand: "Pizza Inn",
  location: "Nairobi Ngong Road",
  phone_number: "020345333", email: "support@pizzaInn.com", password: "12345678",
  image:  'restaurant4.png',
  permit_file: File.open(permit_file_path)
)

restaurant4 = Restaurant.create(
  firstname: "Shannon", lastname: "Mwongo", brand: "Ankole Grill",
  location: "Nairobi Ngong Road",
  phone_number: "020345333", email: "support@ankoleGrill.com", password: "12345678",
  image:  'restaurant5.png',
  permit_file: File.open(permit_file_path)
)

restaurant5 = Restaurant.create(
  firstname: "Collins", lastname: "Jaba", brand: "KFC",
  location: "Nairobi Ngong Road",
  phone_number: "020345333", email: "support@kfc.com", password: "12345678",
  image: 'restaurant6.png',
  permit_file: File.open(permit_file_path)
)

cuisine1 = Cuisine.create(name: "Pizza")
cuisine2 = Cuisine.create(name: "Italian Food")
cuisine3 = Cuisine.create(name: "Chinese Food")
cuisine4 = Cuisine.create(name: "Japanese Food")
cuisine5 = Cuisine.create(name: "Burger")
cuisine6 = Cuisine.create(name: "Fries")
cuisine7 = Cuisine.create(name: "Noddles")
cuisine8 = Cuisine.create(name: "Chicken")
cuisine9 = Cuisine.create(name: "Wine")
cuisine10 = Cuisine.create(name: "Whisky")
cuisine11 = Cuisine.create(name: "SoftDrinks")
cuisine12 = Cuisine.create(name: "Meat")
cuisine13 = Cuisine.create(name: "vegetables")
cuisine14 = Cuisine.create(name: "Accompaniments")

# food1 = Food.create(name: "Chicken Inn Pizza", restaurant_id: "30"  ,cuisine_id: "30", foodtype: "0", quantity: "10", description: "Order fine Pizza Here", price: "1000" ,image: "one.jpg")


food1 = Food.create(name: "Chicken Inn Pizza", restaurant_id: restaurant1.id  ,cuisine_id: cuisine1.id, foodtype: "0", quantity: "10", description: "Order fine Pizza Here", price: "1000" ,image: "one.jpg", category: "Pizzas" )
food2 = Food.create(name: "Burger King Burger", restaurant_id: restaurant2.id , cuisine_id: cuisine5.id, foodtype: "0", quantity: "5", description: "Order fine Beef Here", price: "500",image: "two.jpg", category: "Calzone")
food3 = Food.create(name: "Chicken Inn Fries", restaurant_id: restaurant3.id  , cuisine_id: cuisine6.id,foodtype: "0",quantity: "7", description: "Order fine Chicken Here", price: "400",image: "three.jpg", category: "Garlic Bread")
food4 = Food.create(name: "Lizzania",  restaurant_id: restaurant4.id , cuisine_id: cuisine7.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "four.jpg", category: "Kebab")
food5 = Food.create(name: "Red Sauce Pasta",  restaurant_id: restaurant5.id  ,cuisine_id: cuisine2.id,  foodtype: "0", quantity: "7", description: "Order fine Chicken Here", price: "400",image: "five.jpg", category: "Wraps")
food6 = Food.create(name: "Garlic Bread",  restaurant_id: restaurant1.id , cuisine_id: cuisine14.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "six.jpg", category: "Garlic Bread")
food7 = Food.create(name: "Chicken nuggets", restaurant_id: restaurant2.id ,  cuisine_id: cuisine8.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "seven.jpg", category: "Starters")
food8 = Food.create(name: "Sushi",  restaurant_id: restaurant3.id , cuisine_id: cuisine3.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "eight.jpg", category: "Vegeterian")
food9 = Food.create(name: "Pasta",  restaurant_id: restaurant4.id , cuisine_id: cuisine2.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "nine.jpg", category: "Jacket Potatoes")
food10 = Food.create(name: "Goat Meat",  restaurant_id: restaurant5.id , cuisine_id: cuisine12.id,  foodtype:'1', quantity: "9", description: "Order fine Stale Here", price: "300",image: "ten.jpg", category: "Garlic Bread")
food12 = Food.create(name: "Four Cousines Red Wine", restaurant_id: restaurant1.id , cuisine_id: cuisine9.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "one.jpg", category: "Sauces")
food13 = Food.create(name: "Celacast White Wine", restaurant_id: restaurant2.id , cuisine_id: cuisine9.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "two.jpg", category: "Rice")
food14 = Food.create(name: "Belaire Red Wine 750ml", restaurant_id: restaurant3.id , cuisine_id: cuisine9.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "three.jpg", category: "Soft Drinks")
food15 = Food.create(name: "Martel 1 litre", restaurant_id: restaurant4.id  ,cuisine_id: cuisine10.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "four.jpg", category: "Wines")
food16 = Food.create(name: "Jack Daniels 750ml", restaurant_id: restaurant5.id , cuisine_id: cuisine10.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "five.jpg", category: "Traditional Curries")
food17 = Food.create(name: "coke 500ml", restaurant_id: restaurant1.id  ,cuisine_id: cuisine11.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "six.jpg", category: "White Meat")
food18 = Food.create(name: "Fanta 500ml", restaurant_id: restaurant2.id  ,cuisine_id: cuisine11.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "seven.jpg", category: "Red Meat")
food19 = Food.create(name: "Pepsi Drink", restaurant_id: restaurant3.id  ,cuisine_id: cuisine11.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "eight.jpg", category: "Paninis")
food21 = Food.create(name: "Monster Drink", restaurant_id: restaurant4.id  ,cuisine_id: cuisine11.id, foodtype: "0",  quantity: "9", description: "Order fine Stale Here", price: "300",image: "nine.jpg", category: "Biriyani Dishes")
food22 = Food.create(name: "Chapati", restaurant_id: restaurant5.id , cuisine_id: cuisine14.id,  foodtype: "1", quantity: "9", description: "Order fine Stale Here", price: "300",image: "ten.jpg", category: "Biriyani Dishes")
food23 = Food.create(name: "Rice", restaurant_id: restaurant1.id  ,cuisine_id: cuisine14.id, foodtype: "1",  quantity: "9", description: "Order fine Stale Here", price: "300",image: "one.jpg", category: "Japanise Dishes")
food24 = Food.create(name: "White Ugali", restaurant_id: restaurant2.id , cuisine_id: cuisine14.id,  foodtype: "1", quantity: "9", description: "Order fine Stale Here", price: "300",image: "two.jpg", category: "Chinise Dishes")
food24 = Food.create(name: "Ugali", restaurant_id: restaurant3.id , cuisine_id: cuisine14.id,  foodtype: "1", quantity: "9", description: "Order fine Stale Here", price: "300",image: "three.jpg", category: "Italian Dishes")
food25 = Food.create(name: "Lentiles", restaurant_id: restaurant4.id , cuisine_id: cuisine13.id,  foodtype: "1", quantity: "9", description: "Order fine Stale Here", price: "300",image: "four.jpg", category: "Spanish Dishes")
food26 = Food.create(name: "Monster Drink", restaurant_id: restaurant5.id , cuisine_id: cuisine11.id,  foodtype: "0", quantity: "9", description: "Order fine Stale Here", price: "300",image: "five.jpg", category: "Kenyan Dishes")


order1 = Order.create(user_id: user1.id, restaurant_id: restaurant1.id, quantity: "2", price: "4806", status: 'pending', order_type: "delivery")
order2 = Order.create(user_id: user2.id, restaurant_id: restaurant2.id, quantity: "4", price: "480", status: 'pending', order_type: "dining")
order3 = Order.create(user_id: user9.id, restaurant_id: restaurant3.id, quantity: "3", price: "4440", status: 'pending', order_type: "delivery")
order4 = Order.create(user_id: user1.id, restaurant_id: restaurant4.id, quantity: "6", price: "4055",  status: 'pending', order_type: "dining")
order5 = Order.create(user_id: user2.id, restaurant_id: restaurant1.id, quantity: "2", price: "4806",  status: 'pending', order_type: "delivery")
order6 = Order.create(user_id: user9.id, restaurant_id: restaurant2.id, quantity: "4", price: "480",  status: 'canceled', order_type: "dining")
order7 = Order.create(user_id: user1.id, restaurant_id: restaurant3.id, quantity: "3", price: "4440",  status: 'delivered', order_type: "delivery")
order8 = Order.create(user_id: user2.id, restaurant_id: restaurant4.id, quantity: "6", price: "4055",  status: 'pending', order_type: "dining")

orderitem1 = Orderitem.create(order_id: order1.id, food_id: food1.id, quantity: "1", price: "4055" )
orderitem2 = Orderitem.create(order_id: order2.id, food_id: food2.id, quantity: "1", price: "2440")
orderitem3 = Orderitem.create(order_id: order3.id, food_id: food1.id, quantity: "1", price: "4044")
orderitem4 = Orderitem.create(order_id: order4.id, food_id: food5.id, quantity: "1", price: "5044")
orderitem5 = Orderitem.create(order_id: order5.id, food_id: food6.id, quantity: "1", price: "6400")
orderitem6 = Orderitem.create(order_id: order6.id, food_id: food7.id, quantity: "1", price: "3500")
orderitem7 = Orderitem.create(order_id: order7.id, food_id: food8.id, quantity: "1", price: "5500")


# Create sample data for blog posts
blog1 = Blog.create(
  title: 'Delicious Pasta Recipe',
  content: 'In this post, we share our favorite pasta recipe that is both easy to make and incredibly tasty. You won\'t want to miss it!',
  author: 'ChefFoodie',
  user_id: user1.id,
  category: 'Recipes',
  image_url: 'https://d4t7t8y8xqo0t.cloudfront.net/resized/750X436/eazytrendz%2F2832%2Ftrend20200515161910.jpg',
  like_count: 42,
  comment_count: 2,
  reply_count: 3,
  created_at: Time.now
)

blog2 = Blog.create(
  title: 'Exploring Street Food',
  content: 'Join us on a culinary adventure as we explore the vibrant world of street food. From tacos to samosas, we have got it all covered!',
  author: 'FoodExplorer',
  user_id: user2.id,
  category: 'Street Food',
  image_url: 'https://www.mnarani.net/Blog-MnaraniTales/wp-content/uploads/2019/11/shutterstock_403183810-6-1024x681.jpg',
  like_count: 30,
  comment_count: 1,
  reply_count: 2,
  created_at: Time.now
)

blog3 = Blog.create(
  title: 'International Food Tour',
  content: 'Embark on a culinary journey around the world with our International Food Tour. Explore diverse cuisines and flavors!',
  author: 'FoodExplorer',
  user_id: user3.id,
  category: 'Travel and Food',
  image_url: 'https://tastet.ca/wp-content/uploads/2020/12/32--164-2020-09-29-0.jpg',
  like_count: 45,
  comment_count: 1,
  reply_count: 1,
  created_at: Time.now
)

# Create sample data for comments
comment1 = Comment.create(
  content: 'This pasta recipe is amazing! I tried it last night, and it was a hit with my family.',
  user_id: user9.id,
  blog_id: blog1.id,
  like_count: 15,
  reply_count: 2,
  created_at: Time.now
)

comment2 = Comment.create(
  content: 'I love street food, and this post has me craving some right now!',
  user_id: user8.id,
  blog_id: blog2.id,
  like_count: 8,
  reply_count: 2,
  created_at: Time.now
)

comment3 = Comment.create(
  content: 'The pictures in this post are making me hungry!',
  user_id: user7.id,
  blog_id: blog3.id,
  like_count: 12,
  reply_count: 1,
  created_at: Time.now
)

# Create sample data for replies
Reply.create(
  content: 'I tried it too, and my family loved it as well!',
  user_id: user1.id,
  comment_id: comment1.id,
  like_count: 5,
  created_at: Time.now
)

Reply.create(
  content: 'I have to try this recipe soon.',
  user_id: user2.id,
  comment_id: comment1.id,
  like_count: 7,
  created_at: Time.now
)

Reply.create(
  content: 'Street food is the best!',
  user_id: user3.id,
  comment_id: comment2.id,
  like_count: 4,
  created_at: Time.now
)

Reply.create(
  content: 'Nothing beats this.',
  user_id: user9.id,
  comment_id: comment2.id,
  like_count: 10,
  created_at: Time.now
)

Reply.create(
  content: 'Agreed, those pictures are fantastic!',
  user_id: user4.id,
  comment_id: comment3.id,
  like_count: 2,
  created_at: Time.now
)

# Seed data for bookings
bookings_data = [
  { firstname: 'John', lastname: 'Doe', email: 'john@example.com', guests: 4, date: '2023-09-30', time: '13:00', instruction: 'No allergies' },
  { firstname: 'Jane', lastname: 'Smith', email: 'jane@example.com', guests: 2, date: '2023-10-01', time: '18:30', instruction: 'Vegetarian' },
  # Add more booking data here
]

bookings_data.each do |booking_data|
  date = DateTime.parse(booking_data[:date])
  time = Time.parse(booking_data[:time])
  
  Booking.create(
    firstname: booking_data[:firstname],
    lastname: booking_data[:lastname],
    email: booking_data[:email],
    guests: booking_data[:guests],
    date: date,
    time: time,
    instruction: booking_data[:instruction],
    user_id: user1.id,
    restaurant_id: restaurant1.id
  )
end

# Seed data for the "reviews" table
Review.create(user_id: 1, restaurant_id: 1, review: "Great food and service!", rate: 5, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 2, restaurant_id: 1, review: "I had a wonderful dining experience here.", rate: 4, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 3, restaurant_id: 2, review: "The food was average, but the ambiance was nice.", rate: 3, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 4, restaurant_id: 2, review: "Not impressed with the service.", rate: 2, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 5, restaurant_id: 3, review: "The best restaurant in town!", rate: 5, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 6, restaurant_id: 3, review: "I would highly recommend this place.", rate: 5, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 7, restaurant_id: 4, review: "Decent food, but a bit overpriced.", rate: 3, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 8, restaurant_id: 4, review: "The desserts were amazing!", rate: 4, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 9, restaurant_id: 5, review: "I didn't like the menu options.", rate: 2, created_at: Time.now, updated_at: Time.now)
Review.create(user_id: 9, restaurant_id: 5, review: "Service was slow, but the food was good.", rate: 3, created_at: Time.now, updated_at: Time.now)




Followed.create(follower_id: user1.id, followed_user_id: user2.id)
Followed.create(follower_id: user1.id, followed_user_id:  user3.id)
Followed.create(follower_id:  user6.id, followed_user_id:  user1.id)
Followed.create(follower_id:  user5.id, followed_user_id:  user7.id)
Followed.create(follower_id:  user2.id, followed_user_id:  user8.id)
Followed.create(follower_id:  user3.id, followed_user_id:  user2.id)
Followed.create(follower_id:  user6.id, followed_user_id:  user5.id)
Followed.create(follower_id:  user7.id, followed_user_id:  user5.id)
Followed.create(follower_id:  user9.id, followed_user_id:  user1.id)
  

  puts 'Seed data created successfully.'


puts 'End #####################################'