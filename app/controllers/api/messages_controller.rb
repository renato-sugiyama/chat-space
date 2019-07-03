class Api::MessagesController < ApplicationController
  def index
    @messages = Message.includes(:user).where("group_id = ? AND id > ? ", params[:group_id], params[:id])
  end
end