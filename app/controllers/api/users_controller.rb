class Api::UsersController < Api::APIController
    def index
        @users = User.all
        render :index
    end
end