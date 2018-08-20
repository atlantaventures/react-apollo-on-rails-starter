class Mutations::SignOutUser < GraphQL::Schema::Mutation
  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve()
    user = context[:current_user]
    if context[:controller].sign_out(context[:current_user])
      # Successful creation, return the created object with no errors
      {
        user: user,
        errors: [],
      }
    end
  end
end
