class ApplicationController < ActionController::API
    before_action :authorised
    include ActionController::Cookies
    
    def encode_JWT(payload)
        JWT.encode(payload, Rails.application.credentials.secret_key_base)
    end

    def auth_header
        request.authorization
    end

    def decode_JWT
        if auth_header
            token = auth_header
            begin
              JWT.decode(token, Rails.application.credentials.secret_key_base, false, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def user_logged_in
        if decode_JWT
            user_id = decode_JWT[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end

    def logged_in?
        !!user_logged_in
    end

    def authorised
        render json: { status: 'UNAUTHORISED', message: 'Please log in' }, status: :unauthorized unless logged_in?
    end

end
