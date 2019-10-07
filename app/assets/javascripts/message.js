$(function() {

  function buildHTML(message) {
    //三項演算子を使ってtrueなら取得した値、falseなら空の値を代入
    var content = message.content ? message.content : "";
    var image = message.image ? `<img src=${message.image}>` : "";
                            //data-idが反映されるようにしている
    var html = `<div class="message" data-message-id="${message.id}"> 

                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${content}
                      </p>
                      ${img}
                  </div>
                </div>`
    return html;
  }

  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 200, 'swing');
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      scrollBottom();
    })
    .fail(function() {
      alert('エラーのためメッセージが送信できませんでした');
    })
  })

  var reloadMessages = function() {
    //今いるページのリンクが/groups/グループID/messagesのパスとマッチした場合、以下の処理を実行
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得し、左辺へ代入
      var last_message_id = $('.message:last').data('message-id');
      //ajax通信で以下の処理を実行
      $.ajax({
        //api/message_controllerに処理を飛ばす
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'GET',
        //データはjson形式
        dataType: 'json',
        ///飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためidとする
        data: {id: last_message_id}
      })
      //通信成功したら、controllerから受け取ったデータ（messages)を引数にとり、以下の処理を実行
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = "";
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          //メッセージが入ったHTMLを取得
          insertHTML = buildHTML(message);
          //メッセージを追加
          $('.messages').append(insertHTML);
          //最新のメッセージが一番下に表示されようにスクロールする
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
      })
      //失敗時のアラート
      .fail(function() {
        alert("自動更新に失敗しました")
      });
    }; 
  };
  setInterval(reloadMessages, 5000);
});
