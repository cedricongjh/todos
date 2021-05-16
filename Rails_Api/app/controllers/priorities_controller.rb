class PrioritiesController < ApplicationController

    def index
        priorities = @user.priorities.all
        render json: {status: 'SUCCESS', message: 'fetched priorities', data: priorities}, status: :ok        
    end

    def show
        priority = @user.priorities.find(params[:id])
        render json: {status: 'SUCCESS', message: 'Loaded priority', data: priority}, status: :ok
    end

    def create
        priority = @user.priorities.new(priority_params)

        if priority.save
            render json: {status: 'SUCCESS', message: 'priority saved', data: priority}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: 'priority not saved', data: priority.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        priority = @user.priorities.find(params[:id])
        priority.destroy
        render json: {status: 'SUCCESS', message: 'priority deleted', data: priority}, status: :ok
    end

    def update
        priority = @user.priorities.find(params[:id])
        if priority.update(priority_params)
            render json: {status: 'SUCCESS', message: 'priority updated', data: priority}, status: :ok
        else
            render json: {status: 'ERROR', mesaage: "priority not updated", data: priority.errors}, status: :unprocessable_entity
        end
    end

    private

    def priority_params
        params.permit(:level, :color)
    end

end
