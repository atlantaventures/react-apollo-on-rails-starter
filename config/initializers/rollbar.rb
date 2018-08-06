Rollbar.configure do |config|
  # Without configuration, Rollbar is enabled in all environments.
  # To disable in specific environments, set config.enabled=false.

  config.access_token = ENV['ROLLBAR_ACCESS_TOKEN']

  # Here we'll disable in 'test':
  if Rails.env.test?
    config.enabled = false
  end

  # By default, Rollbar will try to call the `current_user` controller method
  # to fetch the logged-in user object, and then call that object's `id`
  # method to fetch this property. To customize:
  # config.person_method = "my_current_user"
  # config.person_id_method = "my_id"

  # Additionally, you may specify the following:
  # config.person_username_method = "username"
  # config.person_email_method = "email"

  config.environment = ENV['ROLLBAR_ENV'].presence || Rails.env
  config.js_enabled = true
  config.js_options = {
    accessToken: ENV['ROLLBAR_ACCESS_TOKEN'],
    captureUncaught: true,
    payload: {
      environment: ENV['ROLLBAR_ENV'].presence || Rails.env
    }
  }
end
