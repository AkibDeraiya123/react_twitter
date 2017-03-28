$( document ).ready(function(){
  $(window).load(function(){
    $('#loader-wrapper').fadeOut('slow',function(){$(this).remove();});
  });
   $(".button-collapse").sideNav();
 });
 $(document).ready(function(){
    $('ul.tabs').tabs('select_tab', 'Timeline');
    $('.modal').modal();
    // Materialize.toast('I am a toast!', 4000)
  });
 $(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.dropify').dropify();
  });


 /*$('#onoff').change(function(){
  var a = $('#onoff').val();
  alert("Hello it's change :-   " + a);
 })*/
function abcd(){
  // alert("Hello");
  var useremail = $('#foremail').val();
  // alert(useremail);
  var formdata = {
      'emailforgot': useremail,
    };
  $.ajax({
    url: "/forgot",
    type: "post",
    data: formdata,
    success: function(response){
      // alert(response);
      if(response == '0')
      {
        $('#msgresponse').html('Sorry ! No Record Found With This E-Mail');
      }
      else if(response === '1')
      {
        $('#successresponse').html('Thanks ! Your Link Is Sent In This E-Mail Address');
        $('#login-form123').css('display','none');
      }
    }
  });
  return false;
}
$('.with-gap').on('change', function() {
    //alert( $('.with-gap:checked').val() );
    var action = $('.with-gap:checked').val();
    if(action == "show")
    {
      $('#show').css('display','block');
      $('#edit').css('display','none');
    }
    else if(action == "edit")
    {
      $('#show').css('display','none');
      $('#edit').css('display','block');
    }
    // $('.gold_color').val();
});

$("#formValidate").validate({
        rules: {
            fname: {
                required: true,
             },
             lname: {
                required: true,
             },
             phone: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10,
             },
             cemail: {
                required: true,
                email:true
             },
             password: {
                required: true,
             },
             cpassword: {
                required: true,
                equalTo: "#password"
              },
        },
        //For custom messages
        messages: {
            fname:{
                required: "Enter a firstname",
            },
            lname:{
                required: "Enter a lastname",
            },
            phone:{
                required: "Enter a Phone Number",
                minlength: "Enter VAlid 10 Digit Mobile Number",
                maxlength: "Enter valid Mobile Number",
            },
            cemail:{
                required: "Enter a e-malil",
            },
            password:{
                required: "Enter a password",
            },
            cpassword:{
                required: "Enter a confirm password",
            },


        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }
     });

$("#user_tweet").validate({
        rules: {
            ccomment: {
                required: true,
                maxlength: 140,
             },

        },
        //For custom messages
        messages: {

            ccomment:{
                required: "Enter a Message",
                maxlength: "Max 140 Charcter Allowed",
            },

        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }
     });
$("#login").validate({
        rules: {
            email: {
                required: true,
             },
             pas: {
                required: true,
             },

        },
        //For custom messages
        messages: {

            email:{
                required: "Enter a E-Mail",
            },
            pas:{
                required: "Enter a Password",
            },

        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }
     });
