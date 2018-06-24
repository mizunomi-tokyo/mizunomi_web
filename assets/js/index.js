//画面の描画よりも先に呼ばれる可能性があるため
window.onload = function(){
  var qrcode = new QRCode("qrcode");
  var elText = document.getElementById("text");
  var elWord = document.getElementById("word");

var isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
var eventType = (isTouchDevice) ? 'touchend' : 'click';

  $('#send').on(eventType, function (e) {
          if (elWord.value == "ikki") {
            scanDataFromDB();
          } else {
            alert("マジックワードが間違っています。メールをもう一度確認してください。")
          }
      });

    function scanDataFromDB(){
      var ref = firebase.database().ref("/phone2hashMap/" + "x" + elText.value)
      .on('value', function(snapshot) {
        var value = snapshot.val();
        if(value != null){
          var hash = value.hash;
          makeCode(hash);
          appendTicketData();
        } else {
          alert("データベースにデータがありません。チケットを購入してください。購入したのにもかかわらずこのメッセージが表示される場合は、mizunomi.tokyo@gmail.comまでご連絡ください。");
        }
      });
    }

    function makeCode (str) {
      qrcode.makeCode(str);
    }
    function appendTicketData () {
      $('#title').append('<h1 class="subtitle white">TICKET GENERATE SUCCESS!!</h1>');
      $('#notice').append('<div><p class=" white">スクリーンショットで保存してください。</p></div>');
    }
}
