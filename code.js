$(document).ready(function(){
  var buzzer = $('#buzzer')[0];
  var cuenta = parseInt($("#num").html());
  var breakCuenta = parseInt($('#breakNum').html());
  $('#reset').hide();

  $('#sessionMenos').click(function(){
    if(cuenta>5){
      cuenta -= 5;
      console.log(cuenta);
      $('#num').html(cuenta);
    }
  });
  $('#sessionMas').click(function(){
      cuenta += 5;
      $('#num').html(cuenta);
      console.log(cuenta);
  });
  $('#breakMenos').click(function(){
    if(breakCuenta>1){
      breakCuenta -= 1;
      $('#breakNum').html(breakCuenta);
    }
  });
  $('#breakMas').click(function(){
      breakCuenta += 1;
      $('#breakNum').html(breakCuenta);
  });
  $('#start, #reset').on("click", function(){
    $('#sessionMas,#sessionMenos,#breakMenos,#breakMas,#reset').hide();
    console.log(cuenta);
    var time = cuenta;
    time*= 60;
    var timeBreak = breakCuenta;
    timeBreak*= 60;
    $('#session').html('Session Time:')
    var interval = setInterval(timeIt, 1000);
    function timeIt() {
      time -=1;
      if(time==0){
        var startBreak = setInterval(breakTime, 1000);
        clearInterval(interval);
        buzzer.play();
        $('#session').html('Break Time: ');
      }
      if(time%60>=10){
        $('#temps').html(Math.floor(time/60)+':'+time%60);
      }
      else{
        $('#temps').html(Math.floor(time/60)+':0'+time%60);
      }
      function breakTime(){
        timeBreak -=1;
        if(timeBreak==0){
          buzzer.play();
          clearInterval(startBreak);
          $('#reset,#sessionMas,#sessionMenos,#breakMenos,#breakMas').show();
          $('#session').hide();
        }
        if(timeBreak%60>=10){
          $('#temps').html(Math.floor(timeBreak/60)+':'+timeBreak%60);
        }
        else{
          $('#temps').html(Math.floor(timeBreak/60)+':0'+timeBreak%60);
        }
      }
    }

  });
});
