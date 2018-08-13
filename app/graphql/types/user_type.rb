class Types::UserType < Types::BaseObject
  authorize_args = { policy: UserPolicy, record: ->(obj, args, ctx) { ctx[:current_user] } }

  description 'User'
  field :id, ID, null: false
  field(:firstName, String, null: true) { authorize(:personal_info, authorize_args) }
  field(:lastName, String, null: true) { authorize(:personal_info, authorize_args) }
  field(:email, String, null: true) { authorize(:personal_info, authorize_args) }
  field :username, String, null: false
end
