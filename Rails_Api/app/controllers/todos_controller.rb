class TodosController < ApplicationController

    def index
        todos = Todo.order('due ASC')
        render json: {status: 'SUCCESS', message: 'fetched todos', data: todos}
    end 
    
    def create
        todo = Todo.new(todo_params)

        if todo.save
            render json: {status: 'SUCCESS', message: 'todo saved', data: todo}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'Todo not saved', data: todo.errors}, status: :unprocessable_entity
        end
    end

    private

    def todo_params
        params.permit(:text, :category, :due, :completed)
    end

end