$(function(){
 
  var search_list = $("#user-search-result");

  function appendUsers(user) {
    var html = `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${ user.name }</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加<div>
              </div>`
              search_list.append(html);
  }

  var selected_list = $(".chat-group-users.js-add-user")

  function appendUser(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
                <input name='group[user_ids][]' type='hidden' value=${ user_id }>
                <p class='chat-group-user__name'>${ user_name }</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`

              selected_list.append(html);
  }

 $("#user-search-field").on('keyup', function(e){
  e.preventDefault();
  var input = $("#user-search-field").val();
  $.ajax({
    url: "/users",
    type: 'GET',
    data: { keyword: input },
    dataType: 'json'
  })

  .done(function(users) {
    $("#user-search-result").empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        appendUsers(user);
      });
      if (input.length === 0) {
        $("#user-search-result").empty();
      };
    }
    else {
      alert('該当する名前がありません');
    }
  })
  .fail(function(data){
    alert('名前検索に失敗しました。');
    })
  });

  $("#user-search-result").on('click', '.chat-group-user__btn--add', function(){
  var user_id = $(this).data("user-id");
  var user_name = $(this).data("user-name");
  $(this).parent().remove();
  appendUser(user_id, user_name);
  })
  
  $(".chat-group-users.js-add-user").on('click', '.chat-group-user__btn--remove', function(){
  $(".chat-group-user").remove();
  })

});
