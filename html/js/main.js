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
      $('#frequenceArrow').css('color','white');
      $('.frequence').css('background-color','#33abe5');
      $('.hideFrequence').css('opacity','0.5');
      $('.frequence').css('opacity','1');
      isHide = false;
    }
    else{
      $('.frequence').css('margin-top','94vh');
      $('#frequenceArrow').css('transform','rotate(180deg)');
      $('.frequence').css('background-color','#33abe5');
      $('#frequenceArrow').css('color','black');
      $('.hideFrequence').css('opacity','0.5');
      $('.frequence').css('opacity','0.5');
      isHide = true;
    }
  });
  $('.hideEncoder').click(function(){
    if(isEncode){
      $('.encoderBlock').css('top','0vh');
      $('#encoderArrow').css('transform','rotate(180deg)');
      $(this).css('opacity','1');
      isEncode = false;
    }else{
      $('.encoderBlock').css('top','-44vh');
      $('#encoderArrow').css('transform','rotate(0deg)');
      $(this).css('opacity','0.5');
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
    text = text.replaceAll(codLetter,replaceletter);
    text = text.replaceAll(codLetter,replaceletter);
    $('#coderText').html(text);
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
      text = text.replaceAll(replaceletter,codLetter);
      text = text.replaceAll(replaceletter,codLetter);
      $('#coderText').html(text);
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
    $('#coderText').html(data);
  })
}

function getFrequence() {
  $.get("getFrequence.php",function(data){
    $('.frequenceText').html(data);
  })
}
