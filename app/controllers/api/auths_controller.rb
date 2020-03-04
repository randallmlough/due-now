require "jwt"
require "base64"
class Api::AuthsController < Api::APIController
    skip_before_action :require_session!, only: [:register,:authenticate, :check]
    def register

        @user = User.new(auth_params)
        if @user.save
            @jwt = @user.generate_jwt
            
            # @session_token = Base64.urlsafe_encode64(@jwt.split('.')[1])
            add_auth_cookie()
            render :registered
            
        else
            errors = @user.errors.messages
            if errors[:email]
                errors[:email].include?("has already been taken")
                render json: { error: "email already in use or invalid"}, status: 409
            else
                render json: { error: "bad request"}, status: 400
            end
        end
    end

    def authenticate
        @user = User.find_by_credentials(params[:email], params[:password])
        if @user
            @jwt = @user.generate_jwt
            add_auth_cookie()
            render :authenticated
        else
            delete_auth_cookie()
            head 401, content_type: "application/json"
        end
    end

    def logout
        delete_auth_cookie()
        head 200, content_type: "application/json"
    end

    def check
        if !jwt_token.nil?
            @jwt = jwt_token
            render :json => {:token => @jwt }.to_json
        else
            delete_auth_cookie()
            head 204, content_type: "application/json"
        end
    end

    private
    def add_auth_cookie
        cookies.signed[:server_session] = { value: @jwt, expires: 7.days.from_now, httponly: true, secure: Rails.env.production? }
    end

    def auth_params
        params.permit(:first_name, :last_name, :email, :password)
    end

end
