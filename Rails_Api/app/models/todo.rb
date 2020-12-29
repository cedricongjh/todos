class Todo < ApplicationRecord
    validates :text, presence: true
    validates :category, presence: false
    validates :due, presence: true
    validates :completed, presence: false
end
