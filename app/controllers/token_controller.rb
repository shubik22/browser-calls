class TokenController < ApplicationController
  skip_before_action :verify_authenticity_token

  def generate
    token = ::TwilioCapability.generate
    render json: { token: token }
  end
end
