class Todo < ApplicationRecord
    belongs_to :user

    validates :text, presence: true
    validates :category, presence: false
    validates :due, presence: true
    validates :completed, presence: false
end
