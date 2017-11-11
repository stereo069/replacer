  var text;
  var index = 0;
  var isHide = true;
  var isEncode = true;
  var beforeClickItem;
  var frequencyArray = [];
  var countLetter = 0;
  $(document).ready(function() {
    getCodText();
    getFrequence();
    $('.hideFrequence').click(function() {
      if (isHide) {
        $('.frequence').css('margin-top', '50vh');
        $('#frequenceArrow').css('transform', 'rotate(0deg)');
        isHide = false;
      } else {
        $('.frequence').css('margin-top', '94vh');
        $('#frequenceArrow').css('transform', 'rotate(180deg)');
        isHide = true;
      }
    });
    $('.hideEncoder').click(function() {
      if (isEncode) {
        $('.encoderBlock').css('top', '0vh');
        $('#encoderArrow').css('transform', 'rotate(180deg)');
        isEncode = false;
      } else {
        $('.encoderBlock').css('top', '-44vh');
        $('#encoderArrow').css('transform', 'rotate(0deg)');
        isEncode = true;
      }
    });

    $('.sendEncod').click(function() {
      var sText = $('#sourceText').val();
      $.get("encodejef.php", {
        text: sText
      }, function(data) {
        text = data;
        $('#coderText').html(data);
      })
    });

    $('.hideFrequence,.hideEncoder,.frequence').hover(function() {
      $(this).css('opacity', '1');
    }, function() {
      $(this).css('opacity', '0.5');
    });

    $('#apply').click(function() {
      var codLetter = $('#CLetter').val();
      var replaceletter = $('#RLetter').val();
      $('.letter-' + codLetter).html(replaceletter);
      $('.letter-' + codLetter).css('color', '#f16950');
      //$('#coderText').html(text);
      var li = document.createElement('li');
      li.className = "liReplace";
      var id = "#item-" + index;
      li.setAttribute("id", "item-" + index);
      index++;
      li.innerHTML = $('#templateHistory').html();
      $('.listHistory').prepend(li);
      $(id + ' .codeReplace').val($('#CLetter').val());
      $(id + ' .letterReplace').val($('#RLetter').val());
      $(id + ' .itemReplaceBar #reply').click(function() {
        var replaceletter = $(id + ' .itemReplaceBar .letterReplace').val();
        var codLetter = $(id + ' .itemReplaceBar .codeReplace').val();
        $('.letter-' + codLetter).html(codLetter);
        $('.letter-' + codLetter).css('color', '#008fff');
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
    $.get("getText.php", function(data) {
      text = data;
      var arrData = data.split(";");
      arrData.forEach(function callback(currentValue, index, array) {

        var span = document.createElement('span');
        span.className = "letter letter-" + currentValue;
        span.innerHTML = currentValue;
        $('#coderTextBlock').append(span);

        if (currentValue != '' && currentValue != '.' && currentValue != ',' && currentValue != ' ') {
          countLetter++;
          var index = 0;
          if (currentValue[0] == '0'){
            index = currentValue[1];
          }else {
            index = currentValue;
          }
          if (frequencyArray[index] == null) {
            frequencyArray[index] = new Array();
            console.log(index);
            frequencyArray[index][0] = 1;
          } else {
            frequencyArray[index][0]++;
          }
        }

        if (index == array.length - 1) {
          updateFrequency();
          $(".letter").click(function(e) {
            if ($(this).html() != '.' && $(this).html() != ',' && $(this).html() != ' ') {
              if (beforeClickItem != null) {
                var beforeClass = "." + beforeClickItem.className.split(" ")[1];
                $(beforeClass).css('background-color', 'white');
                if ($(beforeClickItem).html() != beforeClass.split("-")[1]) {
                  $(beforeClass).css('color', '#f16950');
                } else {
                  $(beforeClass).css('color', '#008fff');
                }
              }

              var className = "." + this.className.split(" ")[1];
              $(className).css('background-color', '#008fff');

              if (className.split("-")[1] == $(this).html()) {
                $('#CLetter').val($(this).html());
                $(className).css('color', 'white');
                var index = 0;
                if($(this).html()[0]=='0')
                index = $(this).html()[1];
                else {
                  index = $(this).html();
                }
                $('.letterFreq').html($(this).html());
                $('.Freq').html(Math.round(frequencyArray[index][1]*10000)/100+"%");
              } else {


                $(className).css('color', '#f16950');
              }

              beforeClickItem = this;
            }
          });
        }
      });

    })
  }
  function updateFrequency() {

    frequencyArray.forEach(function callback(currentValue, index, array) {

      currentValue[1] = currentValue[0] / countLetter;
      console.log(index + "-" + currentValue[1]);
    });
  }

  function getFrequence() {
    $.get("getFrequence.php", function(data) {

      var arrData = data.split('\n');
      arrData.forEach(function callback(currentValue, index, array) {
        $('.frequenceText').append("<p>" + currentValue + "</p>");
      });

    })
  }
