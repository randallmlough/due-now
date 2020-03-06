
class UserSession
    attr_accessor :sub, :iat
    alias_method :id, :sub
    attr_reader :invoices

    
    include ActiveModel::Model
    include Jwt

    def self.new_from_jwt(jwt_token)
       begin
            payload = Jwt.decode_jwt(jwt_token)[0].symbolize_keys
            return UserSession.new(payload.slice(:sub, :iat, :invoices))
        rescue => exception
            puts exception.message
        end
        nil
    end
    
    def user
        User.find_by(id: self.sub)
    end
    
    
    
    validates :sub, presence: true
    
    
    def invoices=(value)
        @invoices = value.symbolize_keys
    end

    # TODO ROLE BASED PERMISSION
    # def has_role(someRole [organization, invoices], opperation [create, update,delete])

end 