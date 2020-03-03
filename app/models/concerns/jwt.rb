require 'jwt'

module Jwt
    @HMAC_SECRET = Rails.application.credentials.jwt_secret

    def self.decode_jwt(jwt_token)
        JWT.decode jwt_token, @HMAC_SECRET, true, { algorithm: 'HS256' }
    end

    def self.generate_jwt(user)
        payload = { 
            sub: user.id,
            iat: Time.now.to_i,
            first_name: user.first_name,
            last_name: user.last_name
        }

        JWT.encode payload, @HMAC_SECRET, "HS256"
    end
end