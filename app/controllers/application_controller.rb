require 'jwt'

class ApplicationController < ActionController::Base

  protect_from_forgery unless: -> { request.format.json? }

  before_action :read_session_cookies

  def read_session_cookies
    session[:current_user] = nil

    @auth_token = cookies.signed[:server_session]
    @client_token = cookies[:client_session] 
    if @auth_token && @client_token
      token_parts = @auth_token.split('.')

      session[:current_user] = decode_token(@auth_token)[0] if token_parts[1] == @client_token 
    end
  end

  def decode_token(token)
    hmac_secret = Rails.application.credentials.jwt_secret

    JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
  end

  def require_user!
    redirect_to "/login" unless authenticated?
  end

  def authenticated?
    !session[:current_user].nil?
  end


  def react_index
    render :file => 'public/index.html'
  end

end
