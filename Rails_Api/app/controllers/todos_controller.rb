class TodosController < ApplicationController

    def index
        todos = @user.todos.order('due ASC')
        render json: {status: 'SUCCESS', message: 'fetched todos', data: todos}, status: :ok
    end 

    def show
        todo = @user.todos.find(params[:id])
        render json: {status: 'SUCCESS', message: 'Loaded todo', data: todo}, status: :ok
    end
    
    def create
        todo = @user.todos.new(todo_params)

        if todo.save
            render json: {status: 'SUCCESS', message: 'todo saved', data: todo}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'Todo not saved', data: todo.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        todo = @user.todos.find(params[:id])
        todo.destroy
        render json: {status: 'SUCCESS', message: 'todo deleted', data: todo}, status: :ok
    end

    def update
        todo = @user.todos.find(params[:id])
        if todo.update(todo_params)
            render json: {status: 'SUCCESS', message: 'todo updated', data: todo}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'Todo not updated', data: todo.errors}, status: :unprocessable_entity
        end
    end

    private

    def todo_params
        params.permit(:text, :category, :due, :completed)
    end

end