class TodosController < ApplicationController
    def index
        todos = Todo.order('due ASC')
        render json: {status: 'SUCCESS', message: 'fetched todos', data: todos}
    end 
end