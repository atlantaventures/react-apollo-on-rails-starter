class Mutations::UpdateUser < GraphQL::Schema::Mutation
  argument :user_id, ID, "User by ID", required: true
  argument :email, String, required: false
  argument :first_name, String, required: false
  argument :last_name, String, required: false
  argument :username, String, required: false
  argument :password, String, required: false

  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(user_id:, **args)
    user = User.find(user_id)
    update_args = args.slice(:first_name, :last_name, :email, :username, :password)

    if user.update_attributes(update_args)
      # Successful creation, return the created object with no errors
      {
        user: user,
        errors: [],
      }
    else
      # Failed save, return the errors to the client
      {
        user: nil,
        errors: user.errors.full_messages
      }
    end
  end
end
