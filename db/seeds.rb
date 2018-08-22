# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

channels = [
  {
    category: :email,
    name: 'Email'
  },
  {
    category: :call,
    name: 'Phone Call'
  },
  {
    category: :sms,
    name: 'Text Message (SMS)'
  },
]

CommunicationChannel.create(channels)

CommunicationMethod.create({
  communication_channel: CommunicationChannel.email.first,
  name: 'Weekly Summary',
  description: "A summary of your week's performance",
})

CommunicationMethod.create({
  communication_channel: CommunicationChannel.sms.first,
  name: 'SMS Alerts',
  description: "Text message with time-sensitive information",
})
