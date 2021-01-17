Rails.application.config.middleware.insert_before 0, Rack::Cors, debug: true do
    allow do
      origins 'http://localhost:5000'
      resource '*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end