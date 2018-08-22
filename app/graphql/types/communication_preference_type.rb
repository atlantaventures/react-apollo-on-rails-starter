class Types::CommunicationPreferenceType < Types::BaseObject
  description 'Opt-in status for a user for a specific communication channel/type'

  field :id, ID, null: false
  field :user, Types::UserType, null: false
  field :communication_method, Types::CommunicationMethodType, null: false
end
