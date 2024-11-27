require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"

Bundler.require(*Rails.groups)

module Phase4RailsPuttingItAllTogetherAuth
  class Application < Rails::Application
    # Adding cookies and session middleware
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    # Use SameSite=Strict for all cookies to help protect against CSRF
    config.action_dispatch.cookies_same_site_protection = :strict

    config.webpacker.check_yarn_integrity = false

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    config.assets.enabled = true
    config.assets.compile = true
    config.assets.version = '1.0'

    # Only loads a smaller set of middleware suitable for API only apps.
    # config.api_only = true # Comment this line if you need the full asset pipeline
  end
end