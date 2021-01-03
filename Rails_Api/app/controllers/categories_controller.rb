class CategoriesController < ApplicationController

    def index
        categories = Category.all
        render json: {status: 'SUCCESS', message: 'fetched categories', data: categories}, status: :ok
    end

    def show
        category = Category.find(params[:id])
        render json: {status: 'SUCCESS', message: 'Loaded category', data: category}, status: :ok
    end

    def create
        category = Category.new(category_params)

        if category.save
            render json: {status: 'SUCCESS', message: 'category saved', data: category}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'category not saved', data: category.errors}, status: :unprocessable_entity
        end
    end

    def update
        category = Category.find(params[:id])
        if category.update(category_params)
            render json: {status: 'SUCCESS', message: 'category updated', data: category}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'category not updated', data: category.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        category = Category.find(params[:id])
        category.destroy
        render json: {status: 'SUCCESS', message: 'category deleted', data: category}, status: :ok
    end

    private

    def category_params
        params.permit(:name)
    end

end

