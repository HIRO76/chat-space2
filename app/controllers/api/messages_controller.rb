class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    binding.pry
    @messages = group.messages.includes(:user).where('id > #{last_message_id}')
  end
end