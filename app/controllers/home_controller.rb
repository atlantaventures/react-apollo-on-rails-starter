class HomeController < ApplicationController
  #before_action :require_user

  def show
    respond_to do |f|
      f.json { render json: { errors: ['not_found'] }, status: :not_found }
      f.js   { render head: :ok }
      f.all  { render formats: ['html'] }
    end
  end

  private

  def require_user
    #user = authenticate
    #redirect_to login_path and return unless user
  end
end
