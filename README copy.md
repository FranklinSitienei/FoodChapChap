
## Project Title: Food ChapChap

## Authors Mathew Kipkoech , Eric Kariuki, Aisha Hussein, Steven karanja and Fuad Hussein

## Project Descrition
FoodChapChap is an On-Demand platform connecting Restaurants and Customers, prioritizing convenience and efficiency. They aim to reduce wait times by offering a Pre-Order Service for dine-in and take-away meals. The platform automates the ordering process, from SEO interaction to sign-up, ensuring a seamless and time-saving dining experience.

 ## Project Vision
  To automate the food ordering process and make it simple, convenient and efficient for the parties involved, the restaurants, customers and the admin.
  The desired outcomes; to make the ordering process simple, engaging and easy to navigate through.

 ##  User Research
  Why is there a need to have such a platform?
  To solve a gap left by food delivery giants. The gap being on Dine in and take away customers who wait around in queues for food preparation and waiting on the bill.
  Currently, when customers go to a restaurant, they will find queues and will make a line to wait their turn to make an order. Then they wait for some few minutes for food preparation. The restaurants will often get overwhelmed by many orders.
  What happens to both the restaurant and customers when the queue is long? Dissatisfaction.
  A Food Pre Ordering platform will benefit both parties involved.

# setup instruction
        bundle install -on ruby folder
        rails db:migrate db:seed
        rails s

        npm install -on react folder
        npm start -on react folder

# Docker setup instruction
Ensure docker is installed on your system, navigate to root folder then run:

        docker-compose up --build



##  Summary
      perform all CRUD operations
     to create dashboards customers, admin, restaurant
Custom  sort Restaurants
Email integration

     customers can order

      user can order food
      user can view his/her orders
      admin can add/delete fooods and view all orders


## For the Onboarding of Restaurants; 
      1. Provide an easy sign-up process:
      2. Streamlining menu integration: 
      3. Customizing settings and preferences to Allow restaurants to set their availability, operating hours, delivery zones, and pricing preferences.
      4. Train and support:
      5. Test transactions:
      6. Marketing and promotion:


##### domain model

  https://drive.google.com/file/d/1u57YHkQCuCA2QnoY1-DIa0GFKmmkDhH5/view?usp=sharing

####   schema
   create_table "cuisines", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "foods", force: :cascade do |t|
    t.string "name"
    t.integer "quantity"
    t.text "description"
    t.integer "price"
    t.integer "foodtype"
    t.integer "restaurant_id"
    t.integer "cuisine_id"
    t.string "image", default: "one.jpg"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "orderitems", force: :cascade do |t|
    t.integer "order_id"
    t.integer "food_id"
    t.integer "quantity"
    t.integer "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "orders", force: :cascade do |t|
    t.integer "user_id"
    t.integer "restaurant_id"
    t.integer "quantity"
    t.integer "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.integer "user_id"
    t.integer "phone"
    t.string "latitude"
    t.string "longitude"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.integer "user_type"
    t.string "username"
    t.string "email"
    t.string "phone"
    t.string "address"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end
