Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    # todo: add controllers
    get 'ping', action: :ping, controller: 'healths'
    resource :auth, only: [:register, :authenticate, :logout, :check] do
      post :register
      post :authenticate
      delete :logout
      get :check
    end

    resources :users, only: [:index]
    resources :invoices, only: [:create, :index, :show, :update, :destroy]
    get '/invoice/:uuid', to: 'invoices#preview'
  end

  get '*path', to: "application#react_index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
