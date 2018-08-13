class Types::UserType < Types::BaseObject
  AUTHORIZE_ARGS = { policy: UserPolicy, record: ->(obj, args, ctx) { obj.object } }

  description 'A User'

  field :id, ID, null: false
  field :username, String, null: false, description: "Used for login"
  field(:first_name, String, null: true) { authorize(:personal_info, AUTHORIZE_ARGS) }
  field(:last_name, String, null: true)  { authorize(:personal_info, AUTHORIZE_ARGS) }
  field(:email, String, null: true)      { authorize(:personal_info, AUTHORIZE_ARGS) }
end
