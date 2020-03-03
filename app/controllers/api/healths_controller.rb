class Api::HealthsController < Api::APIController
    def ping
        head :ok, content_type: "application/json"
      end
end