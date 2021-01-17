class UsersController < ApplicationController
    before_action :authorised, only: [:auto_login]

    def create
        @user = User.create(user_params)
        if @user.save
            token = encode_JWT({user_id: @user.id})
            render json: {status: 'SUCCESS', message: 'user signed up', data: @user, token: token}, status: :ok
        else
            render json: {status: 'ERROR', message: 'failed to sign up', data: @user.errors}, status: :unprocessable_entity
        end
    end

    def index
        authorised
        if @user 
            todos = @user.todos.order('due ASC')
            categories = @user.categories.all
            render json: {status: 'SUCCESS', message: 'fetched user data', data: {todos: todos, categories: categories}}, status: :ok
        end
    end

    def login
        
        @user = User.find_by(email: params[:email])
        
        if @user && @user.authenticate(params[:password])
            token = encode_JWT({user_id: @user.id})
            cookies.signed[:Authorized] = {value: token, httponly: true}
            render json: {status: 'SUCCESS', message: 'user logged in', data: @user, token: token}, status: :ok
        else
            render json: {status: 'ERROR', message: 'failed to log in', data: []}, status: :unprocessable_entity
        end
    end

    def auto_login
        render json: {status: 'SUCCESS', message: 'user logged in', data: @user}, status: :ok
    end

    def logout
        cookies.delete :Authorized
        render json: {status: 'SUCCESS', message: 'user logged out', data: @user}, status: :ok
    end

    private

    def user_params
        params.permit(:email, :password)
    end

end
