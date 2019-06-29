$(function(){

  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html =`<div class="Message" id="${message.id}">
                <div class="Message__upper-info">
                <p class="Message__upper-info__talker">
                ${message.user_name}
                </p>
                <p class="Message__upper-info__date">
                ${message.date}
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
})
});