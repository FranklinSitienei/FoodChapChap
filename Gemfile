source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }



# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.3', '>= 6.1.3.2'
# Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1.7'
gem 'wdm', platforms: [:mingw, :mswin]
gem 'faker'

gem 'devise'
gem 'actionmailer'

gem 'rack-cors'
gem 'jwt'
# gem 'google_auth'
gem 'carrierwave', '~> 2.0'
gem 'mini_magick'

gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'

gem 'mutex_m'
gem 'bigdecimal'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '~> 3.3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

group :development do
  gem 'foreman', '~> 0.87'
end

group :development, :test do
  gem 'rspec-rails', '~> 5.0.0'
end

group :test do
  gem 'rspec-json_expectations'
  gem 'shoulda-matchers', '~> 4.0'
end

gem "active_model_serializers", "~> 0.10.12"