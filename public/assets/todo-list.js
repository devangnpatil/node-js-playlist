$(document).ready(function(){

  function generateRandomId(){
    return parseInt(Math.floor(Math.random()*500).toFixed(0))
  }

  $('form').on('submit', function(){

      var item = $('form input');
      var id = generateRandomId();
      var todo = {item: item.val(), id:id};
      
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).data('attr');
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
