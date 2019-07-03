class Api::MessagesController < ApplicationController
  def index
    @messages = Message.includes(:user).where("group_id = ?", params[:group_id]).where('id > ?', params[:id])
  end
end