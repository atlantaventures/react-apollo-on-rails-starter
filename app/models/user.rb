class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, authentication_keys: [:username]

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: false, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }

  has_many :communication_preferences, dependent: :destroy
  accepts_nested_attributes_for :communication_preferences, allow_destroy: true
  has_many :communication_methods, through: :communication_preferences

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if username = conditions.delete(:username)
      where(conditions.to_h).where(["lower(username) = :value", { :value => username.downcase }]).first
    elsif conditions.has_key?(:username)
      where(conditions.to_h).first
    end
  end

  def email_required?
    false
  end

end

# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  email                  :string           default("")
#  encrypted_password     :string           default(""), not null
#  first_name             :string
#  last_name              :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  superuser              :boolean          default(FALSE)
#  username               :string           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_username              (username) UNIQUE
#
