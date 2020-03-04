require 'jwt'

class ApplicationController < ActionController::Base

  attr_reader :user_session, :jwt_token

  before_action :set_csrf_cookie, :read_auth_cookie


  def read_auth_cookie
    token = cookies.signed[:server_session]
    if token
      @jwt_token = token
      @user_session = UserSession.new_from_jwt(@jwt_token)
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
