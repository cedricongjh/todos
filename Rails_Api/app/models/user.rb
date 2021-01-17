class User < ApplicationRecord
    has_secure_password
    has_many :todos
    has_many :categories

    validates :email, uniqueness: true
end
