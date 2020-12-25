class TodosController < ApplicationController
    def index
        todos = Todo
        render json: {status: 'SUCCESS', message: 'fetched todos', data: todos}
    end 
end