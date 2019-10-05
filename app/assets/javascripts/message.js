$(function() {

  function buildHTML(message) {
    var content = message.content ? message.content : "";
    var img = message.img ? `<img src="${message.img}">` : "";
    var html = `<div class="message" data="${message.id}">
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
    var last_message_id = $('.message:last').data('id')
    $.ajax({
      url: '/api_messages',
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      var insertHTML = "";
      debugger;
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.message').append(insertHTML);
        $('.message').animate({scrollTop: $('.message')[0].scrolHeight}, 'fast');
      });
    })
    .fail(function() {
      alert("自動更新に失敗しました")
    });
  };
  setInterval(reloadMessages, 5000);
});

