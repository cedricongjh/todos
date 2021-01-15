class User < ApplicationRecord
    has_secure_password
    has_many :todos
    has_many :categories
end
