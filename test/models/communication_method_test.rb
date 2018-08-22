require 'test_helper'

class CommunicationMethodTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: communication_methods
#
#  id                       :bigint(8)        not null, primary key
#  description              :text             not null
#  name                     :string           not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  communication_channel_id :bigint(8)
#
# Indexes
#
#  index_communication_methods_on_communication_channel_id  (communication_channel_id)
#
