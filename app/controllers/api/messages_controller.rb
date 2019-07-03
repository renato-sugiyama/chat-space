class Api::MessagesController < ApplicationController
  def index
    @messages = Message.includes(:user).where('id > ?', params[:id])
  end
end

