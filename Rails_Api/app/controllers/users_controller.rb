class UsersController < ApplicationController
    before_action :authorised, only: [:auto_login]

    def create
        @user = User.create(user_params)
        if @user.save
            token = encode_JWT({user_id: @user.id})
            cookies.signed[:Authorized] = {value: token}
            render json: {status: 'SUCCESS', message: 'user signed up', data: @user, cookie: token}, status: :ok
        else
            render json: {status: 'ERROR', message: 'failed to sign up', data: @user.errors}, status: :unprocessable_entity
        end
    end

    def index
        authorised
        if @user
            if @user.date_sort_ascending
                todos = @user.todos.order('due ASC')
            else
                todos = @user.todos.order('due DESC')
            end
            categories = @user.categories.all
            priorities = @user.priorities.all
            render json: {
                status: 'SUCCESS', message: 'fetched user data', 
                data: {
                    todos: todos, 
                    categories: categories, 
                    priorities: priorities, 
                    date_sort_ascending: @user.date_sort_ascending
                    priority: @user.priority
                }
            }, status: :ok
        end
    end

    def login
        
        @user = User.find_by(email: params[:email])
        
        if @user && @user.authenticate(params[:password])
            token = encode_JWT({user_id: @user.id})
            cookies.signed[:Authorized] = {value: token}
            render json: {status: 'SUCCESS', message: 'user logged in', data: @user, cookie: token}, status: :ok
        else
            render json: {status: 'ERROR', message: 'failed to log in', data: []}, status: :unprocessable_entity
        end
    end

    def update
        authorised
        if @user.update(user_data_params)
            render json: {status: 'SUCCESS', message: 'sort order updated', data: @user}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'sort order not updated', data: @user.errors}, status: :unprocessable_entity
        end
    end

    def auto_login
        render json: {status: 'SUCCESS', message: 'user logged in', data: @user}, status: :ok
    end

    def logout
        render json: {status: 'SUCCESS', message: 'user logged out', data: @user}, status: :ok
    end

    private

    def user_params
        params.permit(:email, :password, :date_sort_ascending)
    end

    def user_data_params
        params.permit(:date_sort_ascending, :priority)
    end

end
