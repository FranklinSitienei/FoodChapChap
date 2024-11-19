class User < ApplicationRecord
  has_secure_password
  mount_uploader :profile_pic, ProfilePicUploader
  validates :username, uniqueness: true
  validates :email, uniqueness: true
  has_many :orders
  has_many :comments
  has_many :replies
  has_many :reviews, dependent: :destroy
  has_many :blogs

  # Associations for following functionality
  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower

  # Methods for following functionality
  def follow(other_user)
    following << other_user unless self == other_user
  end

  def unfollow(other_user)
    following.delete(other_user)
  end

  def following?(other_user)
    following.include?(other_user)
  end
end
