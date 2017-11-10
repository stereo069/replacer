  var text;
  var index=0;
  var isHide = false;
  var isEncode = true;
$(document).ready(function() {
  getCodText();
  getFrequence();
  $('.hideFrequence').click(function(){
    if(isHide){
      $('.frequence').css('margin-top','50vh');
      $('#frequenceArrow').css('transform','rotate(0deg)');
      isHide = false;
    }
    else{
      $('.frequence').css('margin-top','94vh');
      $('#frequenceArrow').css('transform','rotate(180deg)');
      isHide = true;
    }
  });
  $('.hideEncoder').click(function(){
    if(isEncode){
      $('.encoderBlock').css('top','0vh');
      $('#encoderArrow').css('transform','rotate(180deg)');
      isEncode = false;
    }else{
      $('.encoderBlock').css('top','-44vh');
      $('#encoderArrow').css('transform','rotate(0deg)');
      isEncode = true;
    }
  });

  $('.sendEncod').click(function(){
    var sText = $('#sourceText').val();
    $.get("encodejef.php",{text: sText},function(data){
      text=data;
      $('#coderText').html(data);
    })
  });

  $('.hideFrequence,.hideEncoder,.frequence').hover(function() {
    $(this).css('opacity','1');
  }, function () {
    $(this).css('opacity','0.5');
  });

  $('#apply').click(function() {
    var codLetter = $('#CLetter').val();
    var replaceletter = $('#RLetter').val();
    $('.letter-'+codLetter).html(replaceletter);
    $('.letter-'+codLetter).css('color','red');
    //$('#coderText').html(text);
    var li = document.createElement('li');
    li.className = "liReplace";
    var id = "#item-"+index;
    li.setAttribute("id", "item-"+index);
    index++;
    li.innerHTML = $('#templateHistory').html();
    $('.listHistory').prepend(li);
    $(id+' .codeReplace').val($('#CLetter').val());
    $(id+' .letterReplace').val($('#RLetter').val());
    $(id+' .itemReplaceBar #reply').click(function() {
      var replaceletter = $(id+' .itemReplaceBar .letterReplace').val();
      var codLetter = $(id+' .itemReplaceBar .codeReplace').val();
      $('.letter-'+codLetter).html(codLetter);
      $('.letter-'+codLetter).css('color','#008fff');
      //text = text.replaceAll(replaceletter,codLetter);
      //text = text.replaceAll(replaceletter,codLetter);
      //$('#coderText').html(text);
      $(id).remove();
    });
  });

})

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getCodText() {
  $.get("getText.php",function(data){
    text=data;
    var arrData = data.split(";");
    arrData.forEach(function callback(currentValue, index, array) {
      $('#coderTextBlock').append("<span class =\"letter letter-"+currentValue+"\">"+currentValue+"</span>");
    });

  })
}

function getFrequence() {
  $.get("getFrequence.php",function(data){

    var arrData = data.split('\n');
    arrData.forEach(function callback(currentValue, index, array) {
      $('.frequenceText').append("<p>"+currentValue+"</p>");
    });

  })
}
