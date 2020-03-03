class Api::APIController < ApplicationController
    before_action :require_session!

    def require_session!
      unless authenticated?
        cookies.delete :sever_session
        # render :nothing => true, :status => 401
        head 401, content_type: "application/json"
      end
    end
end