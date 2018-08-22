class CommunicationChannel < ApplicationRecord
  enum category: { email: 0, call: 1, sms: 2}
  has_many :communication_methods, dependent: :destroy
end

# == Schema Information
#
# Table name: communication_channels
#
#  id         :bigint(8)        not null, primary key
#  category   :integer          default("email"), not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
