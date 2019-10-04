$(function() {
  var search_list = $('#user-search-result');
  var member_list = $('#chat-group-users');

  function appendUser(user){
    var html = 
                `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= "${user.id}" data-user-name= "${user.name}" >追加</a>
                  </div>`;
                search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = 
                `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
                search_list.append(html);
  }

  function appendUserToMemberList(name, user_id) {
    var html = 
                `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                  <p class='chat-group-user__name'>${ name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
                member_list.append(html);
  }

  $('#user-search-field').on('keyup', function(e) {
    var input = $('#user-search-field').val();
    var group_id = $('.chat__group_id').val();

    $.ajax({
      type: 'GET',
      url: '/users', 
      data: { keyword: input, group_id: group_id },
      dataType: 'json'
    })

    .done(function(users){
      if (input.length !== 0) {
        $('#user-search-result').empty();
        users.forEach(function(user){
          appendUser(user)
        });
      } else {
        $('#user-search-result').empty();
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }      
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(function(){
    $(document).on('click', '.user-search-add', function() {
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      appendUserToMemberList(name, user_id);
    });

    $(document).on('click', '.user-search-remove', function() {
      $(this).parent().remove();
    })
  });


});