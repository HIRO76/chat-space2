class Api::MessagesController < ApplicationController
  def index
    # binding.pry
    #groupデータをparamsを元にDBから取得し、左辺へ代入
    group = Group.find(params[:group_id])
    #groupが所有しているmessageの中から、params[:id]よりも大きいidがないかMessageから検索し、左辺へ代入
    last_message_id = params[:id].to_i
    # binding.pry
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
    # binding.pry
      # respond_to do |format|
    #     format.html
    #     format.json
    # end
  end
end