class Restaurant < ApplicationRecord
    has_secure_password
    mount_uploader :permit_file, PermitFileUploader
    
  
    validates :firstname, :lastname, :email, :brand, :location, :phone_number, presence: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  
    has_many :orders
    
end
  