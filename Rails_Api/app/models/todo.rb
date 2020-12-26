class Todo < ApplicationRecord
    validates :text, presence: true
    validates :category, presence: true
    validates :due, presence: true
    validates :completed, presence: false
end
