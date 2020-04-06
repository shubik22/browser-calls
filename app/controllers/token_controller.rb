class TokenController < ApplicationController
  skip_before_action :verify_authenticity_token

  DEFAULT_ROLE = 'default'

  def generate
    token = ::TwilioCapability.generate(DEFAULT_ROLE)
    render json: { token: token }
  end
end
