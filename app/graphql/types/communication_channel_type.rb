class Types::CommunicationChannelType < Types::BaseObject
  description 'A chanel of Communication from system to users'

  field :id, ID, null: false
  field :category, String, null: false
  field :name, String, null: false
end
