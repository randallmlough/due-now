class Api::APIController < ApplicationController
    before_action :require_session!

    def require_session!
      unless authenticated?
        delete_auth_cookie()
        # render :nothing => true, :status => 401
        head 401, content_type: "application/json"
      end
    end

    def delete_auth_cookie
      cookies.signed[:server_session] = { value: "", expires: 1.days.ago, httponly: true, secure: Rails.env.production? }
    end
end