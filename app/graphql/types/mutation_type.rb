class Types::MutationType < Types::BaseObject
  field :update_user, mutation: Mutations::UpdateUser
  field :toggle_user_communication_method, mutation: Mutations::ToggleUserCommunicationMethod
  field :sign_out_user, mutation: Mutations::SignOutUser
end
