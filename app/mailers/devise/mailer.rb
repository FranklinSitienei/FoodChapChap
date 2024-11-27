module Devise
    class Mailer < ::ActionMailer::Base
      default from: 'sitieneifranklin@gmail.com' 
      layout 'mailer'
  
      # Add Devise-specific mailers here
    end
  end
  
    