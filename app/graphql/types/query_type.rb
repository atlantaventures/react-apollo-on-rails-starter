class Types::QueryType < Types::BaseObject
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :users, [Types::UserType], null: false, description: "all users" do
    authorize!(:index, policy: UserPolicy)
  end
  def users
    User.all
  end

  field :user, Types::UserType, null: true, description: "A user" do
    argument(:id, ID, "User by ID", required: true)
    authorize!(:show, policy: UserPolicy)
  end
  def user(id:)
    User.find(id)
  end

  field :current_user, Types::UserType, null: true, description: "The current logged in user"
  def current_user
    context[:current_user]
  end
end
