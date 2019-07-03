$(function(){

  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html =`<div class="Message" data-message-id="${message.id}">
                <div class="Message__upper-info">
                <p class="Message__upper-info__talker">
                ${message.user_name}
                </p>
                <p class="Message__upper-info__date">
                ${message.created_at}
                </p>
                </div>
                <p class="Message__text">
                </p><p class="lower-message__content">
                ${content}
                </p>
                ${img}
                <p></p>
                </div>`
  return html;
  }

  function scroll() {
    $('.Messages').animate({scrollTop: $('.Messages')[0].scrollHeight});
}

function scrollBottom(){
  var target = $('.Message').last();
  var position = target.offset().top + $('.Messages').scrollTop();
  $('.Messages').animate({
    scrollTop: position
  }, 300, 'swing');
}

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var message = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({  
    url: url,
    type: 'POST',
    data: message,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.Messages').append(html);
    $('#new_message.new_message')[0].reset();
    scroll()
  })
  .fail(function(data){
    alert('エラーが発生したためメッセージは送信できませんでした。');
  })
  .always(function(data){
    $('.submit-btn').prop('disabled', false);
  });
})

  function reloadMessages() {
    if (window.location.href.match(/\/group\/\d+\/messages/)){
    var last_message_id = $('.Message').last().data('message-id');

  var group_id_url = $('h2.Main-header__left-box__current-group').data('groups-id')
  var url = "/groups/" + group_id_url + "/api/messages"



  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    data: {id: last_message_id}
  })
    .done(function(messages){
    messages.forEach(function(message){
    var insertHTML = buildHTML(message);
    $('.Messages').append(insertHTML);
    scrollBottom();
    });
  })
  .fail(function(){
    alert('自動更新に失敗しました。');
})
  }
}
  setInterval(reloadMessages, 5000)
});
