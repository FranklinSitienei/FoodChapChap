class Devise::Mailer < Devise.parent_mailer.constantize
    default template_path: 'devise/mailer'
end
