require 'jwt'

class ApplicationController < ActionController::Base

  attr_reader :user_session

  before_action :set_csrf_cookie, :read_auth_cookie

  # protect_from_forgery unless: -> { request.format.json? }
  # protect_from_forgery


  def read_auth_cookie
    auth_token = cookies.signed[:server_session]
    if auth_token
      @user_session = UserSession.new_from_jwt(auth_token)
    end
  end

  def decode_token(token)
    hmac_secret = Rails.application.credentials.jwt_secret

    JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
  end

  def authenticated?
    !user_session.nil?
  end

  def react_index
    render :file => 'public/index.html'
  end

  private
  def set_csrf_cookie
    cookies["CSRF-TOKEN"] = form_authenticity_token
  end
end
