class Types::CommunicationMethodType < Types::BaseObject
  description 'A method of Communication from system to users'

  field :id, ID, null: false
  field :description, String, null: false
  field :name, String, null: false
end
