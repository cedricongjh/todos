class CategoriesController < ApplicationController

    def index
        categories = @user.categories.all
        render json: {status: 'SUCCESS', message: 'fetched categories', data: categories}, status: :ok
    end

    def show
        category = @user.categories.find(params[:id])
        render json: {status: 'SUCCESS', message: 'Loaded category', data: category}, status: :ok
    end

    def create
        category = @user.categories.new(category_params)

        if category.save
            render json: {status: 'SUCCESS', message: 'category saved', data: category}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'category not saved', data: category.errors}, status: :unprocessable_entity
        end
    end

    def update
        category = @user.categories.find(params[:id])
        if category.update(category_params)
            render json: {status: 'SUCCESS', message: 'category updated', data: category}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'category not updated', data: category.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        category = @user.categories.find(params[:id])
        category.destroy
        render json: {status: 'SUCCESS', message: 'category deleted', data: category}, status: :ok
    end

    private

    def category_params
        params.permit(:name, :color)
    end

end

