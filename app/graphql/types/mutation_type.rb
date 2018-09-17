class Types::MutationType < Types::BaseObject
  field :update_user, mutation: Mutations::UpdateUser do
    authorize!(:update, Types::UserType::AUTHORIZE_ARGS)
  end

  field :toggle_user_communication_method, mutation: Mutations::ToggleUserCommunicationMethod do
    authorize!(:update, Types::UserType::AUTHORIZE_ARGS)
  end

  field :sign_out_user, mutation: Mutations::SignOutUser
end
