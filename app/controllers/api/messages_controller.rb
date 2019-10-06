class Api::MessagesController < ApplicationController
  def index
    #groupデータをparamsを元にDBから取得し、左辺へ代入
    group = Group.find(params[:group_id])
    #groupが所有しているmessageの中から、params[:id]よりも大きいidがないかMessageから検索し、左辺へ代入
    last_message_id = params[:id].to_i
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
  end
end