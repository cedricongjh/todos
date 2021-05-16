class User < ApplicationRecord
    has_secure_password
    has_many :todos
    has_many :categories
    has_many :priorities

    validates :email, uniqueness: true
end
