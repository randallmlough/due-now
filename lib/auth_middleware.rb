class AuthMiddleware
    def initialize(app)
        @app = app
    end

    def call(env)
        @status, @headers, @response = @app.call(env)
        puts "AUTH MIDDLEWARE TRIGGERED"
        [@status, @headers, @response]
    end
end