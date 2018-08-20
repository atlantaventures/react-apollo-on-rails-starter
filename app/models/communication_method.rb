class CommunicationMethod < ApplicationRecord
  enum channel: { email: 0, call: 1, sms: 2}
end

# == Schema Information
#
# Table name: communication_methods
#
#  id          :bigint(8)        not null, primary key
#  channel     :integer          not null
#  description :text             not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
