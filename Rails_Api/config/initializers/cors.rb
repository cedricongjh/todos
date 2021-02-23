Rails.application.config.middleware.insert_before 0, Rack::Cors, debug: true do
    allow do
      origins 'https://todos-cvwo.netlify.app', 'http://localhost:5000', 'https://todos-cvwo.herokuapp.com'  
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true
    end
  end