class Types::MutationType < Types::BaseObject
  field :updateUser, mutation: Mutations::UpdateUser do
    authorize!(:update, Types::UserType::AUTHORIZE_ARGS)
  end
end
