
class UserSession
    include ActiveModel::Model
    include Jwt
    
    def self.new_from_jwt(jwt_token)
       begin
            return UserSession.new(Jwt.decode_jwt(jwt_token)[0])
        rescue => exception
            puts exception.message
        end
        nil
    end

    attr_accessor :sub, :first_name, :last_name, :iat, :avatar
    validates :sub, presence: true
   
    def user
        User.find_by(id: self.sub)
    end
end