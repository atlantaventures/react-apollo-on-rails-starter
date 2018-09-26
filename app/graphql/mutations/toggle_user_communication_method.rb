class Mutations::ToggleUserCommunicationMethod < GraphQL::Schema::Mutation
  argument :user_id, ID, "User by ID", required: true
  argument :communication_method_id, ID, "Communication Method ID", required: true

  field :communication_method, Types::CommunicationMethodType, null: true
  field :enabled, Boolean, null: true
  field :errors, String, null: true  # as json

  def resolve(user_id:, communication_method_id:)
    user = User.includes(:communication_methods).find(user_id)
    UserPolicy.new(context[:current_user], user).update?
    communication_method = CommunicationMethod.find(communication_method_id)

    if user.communication_methods.exists?(communication_method_id)
      enabled = false if user.communication_methods.delete(communication_method_id)
    else
      enabled = true if user.communication_methods.push(communication_method)
    end
    if user.save
      # Successful creation, return the created object with no errors
      {
        communication_method: communication_method,
        errors: nil,
        enabled: enabled,
      }
    else
      errors = user.errors.as_json(full_messages: true).to_json
      {
        communication_method: nil,
        errors: errors
      }
    end
  end
end
