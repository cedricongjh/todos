class CategoriesController < ApplicationController

    def index
        categories = Category.all
        render json: {status: 'SUCCESS', message: 'fetched categories', data: categories}, status: :ok
    end

    def create
        todo = Category.new(category_params)

        if todo.save
            render json: {status: 'SUCCESS', message: 'category saved', data: todo}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'category not saved', data: todo.errors}, status: :unprocessable_entity
        end
    end

    private

    def category_params
        params.permit(:name)
    end

end

