class Types::UserType < Types::BaseObject
  description 'A User'

  field :id, ID, null: false
  field :username, String, null: false, description: "Used for login"
  field(:first_name, String, null: true)
  field(:last_name, String, null: true)
  field(:email, String, null: true)
  field(:communication_preferences, [Types::CommunicationPreferenceType], null: true)
  field(:communication_methods, [Types::CommunicationMethodType], null: false)

  def self.authorized?(object, context)
    # only allow viewership from the current user
    super && UserPolicy.new(context[:current_user], object).personal_info?
  end
end
