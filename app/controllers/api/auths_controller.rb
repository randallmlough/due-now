require "jwt"
class Api::AuthsController < Api::APIController
    skip_before_action :require_session!, only: [:register,:authenticate]
    def register

        @user = User.new(auth_params)
        if @user.save
            @session_token = generate_jwt.split(".")[1]
            add_session_cookies
            render :register
            
        else
            render json: { error: "failed to create user"}
        end
    end

    def authenticate
        @user = User.find_by_credentials(params[:email], params[:password])
        if @user
            @session_token = generate_jwt.split(".")[1]
            add_session_cookies
            render :authenticated
        else
            render :json => {}, :status => 401
        end
    end

    private
    def generate_jwt
        hmac_secret = Rails.application.credentials.jwt_secret

        payload = { 
            sub: @user.id.to_s,
            iat: Time.now.to_i,
            first_name: @user.first_name,
            last_name: @user.last_name
        }

        @jwt = JWT.encode payload, hmac_secret, "HS256"
    end

    def add_session_cookies
        cookies.signed[:server_session] = { value: @jwt, expires: 7.days.from_now, httponly: true, secure: Rails.env.production? }
        cookies[:client_session] = @session_token
    end
    def auth_params
        p params
        params.permit(:first_name, :last_name, :email, :password)
    end

end
