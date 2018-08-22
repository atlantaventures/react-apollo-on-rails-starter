class Types::CommunicationMethodCategory < Types::BaseEnum
  value "EMAIL", "electronic mail", value: :email
  value "CALL", "phone call", value: :call
  value "SMS", "text message", value: :sms
end
