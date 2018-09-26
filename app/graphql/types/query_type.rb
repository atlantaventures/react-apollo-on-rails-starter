class Types::QueryType < Types::BaseObject
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :current_user, Types::UserType, null: true, description: "The current logged in user"
  def current_user
    context[:current_user]
  end

  field :communication_methods, [Types::CommunicationMethodType], null: true, description: "Communication methods from system to user"
  def communication_methods
    CommunicationMethod.all
  end
end
