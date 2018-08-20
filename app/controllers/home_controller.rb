class HomeController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  def show
    respond_to do |f|
      f.json { render json: { errors: ['not_found'] }, status: :not_found }
      f.js   { render head: :ok }
      f.all  { render formats: ['html'] }
    end
  end
end
