class CommunicationPreferencePolicy < ApplicationPolicy
  def index
    true
  end
  # def update?
  #   user.superuser? || (user == record)
  # end
  #
  # def index?
  #   user.superuser? ||
  # end
  #
  # def show?
  #   user.superuser? || super
  # end
end
