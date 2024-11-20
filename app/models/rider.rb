
class Rider < ApplicationRecord
  has_secure_password
  mount_uploader :profile_pic, ProfilePicUploader
 
  validates :first_name, :last_name, :phone_number, :email, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  has_many :orders
 
  def self.authenticate(email, password)
   rider = find_by(email: email)
 
   if rider && rider.authenticate(password)
     rider
   else
     nil
   end
  end
 end
 