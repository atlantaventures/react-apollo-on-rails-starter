class CommunicationPreference < ApplicationRecord
  belongs_to :user
  belongs_to :communication_method

end

# == Schema Information
#
# Table name: communication_preferences
#
#  id                      :bigint(8)        not null, primary key
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  communication_method_id :bigint(8)
#  user_id                 :bigint(8)
#
# Indexes
#
#  index_communication_preferences_on_communication_method_id  (communication_method_id)
#  index_communication_preferences_on_user_id                  (user_id)
#
