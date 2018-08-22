require 'test_helper'

class CommunicationChannelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
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
