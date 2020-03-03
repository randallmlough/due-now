class Api::APIController < ApplicationController
    before_action :require_session!

    def require_session!
      unless authenticated?
        cookies.delete :sever_session
        cookies.delete :client_session
        render :nothing => true, :status => 401
      end
    end
end