$(document).ready(function() {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
    }
    }
    return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    $('.login-btn').on('click', function() {
        $('.dark').show(300);
        $('.form-section').show(400);
    })
    $('.dark').on('click', function() {
        $('.dark').hide(200);
        $('.form-section').hide(300);
        $('.full-name').val('');
        $('.password').val('');
        $('.invalid_fullname').hide();
        $('.invalid_password').hide();
    })
    $('.form-login-btn').on('click', function(e) {
        e.preventDefault();
        let fullName = $('.full-name').val();
        let password = $('.password').val();
        const data = { 'full_name': fullName, 'password': password };
        if (fullName === ''){
            $('.invalid_fullname').show();
        }
        else{
            $('.invalid_fullname').hide();
        }
        if (password === ''){
            $('.invalid_password').show();
        }
        else{
            $('.invalid_password').hide();
        }
        if (fullName !== '' && password !== '') {
            fetch('/login_user/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data === 'success'){
                    location.reload();
                }
                else if (data === 'failed'){
                    e.preventDefault();
                    $('.form-section').hide();
                    $('.user_does_not_exist_msg').show();
                    $('.dark').on('click', function() {
                        $('.dark').hide();
                        $('.user_does_not_exist_msg').hide();
                    })
                }
              })
              .catch((error) => {
                location.reload();
              });
      }

});

    $('.create-btn').on('click', function(e) {
        if ($('.fullname_input').val() === '') {
            e.preventDefault()
            $('.invalid_fullname_msg').show()

        }else{
            $('.invalid_fullname_msg').hide()
        }
        if ($('.email_input').val() === '') {
            e.preventDefault()
            $('.invalid_email_msg').show()

        }else{
            $('.invalid_email_msg').hide()
        }
        if ($('.password_input').val() === '') {
            e.preventDefault()
            $('.invalid_password_msg').show()

        }else{
            $('.invalid_password_msg').hide()
        }
        if ($('.confirm_password_input').val() === '') {
            e.preventDefault()
            $('.invalid_confirm_password_msg').show()

        }else{
            $('.invalid_confirm_password_msg').hide()
        }

        if($('.password_input').val() !== $('.confirm_password_input').val() && $('.password_input').val() !== '' && $('.confirm_password_input').val() !== ''){
            e.preventDefault()
            $('.passwords_does_not_match_msg').show()

        }else{
            $('.passwords_does_not_match_msg').hide()

        }
    })
    $('.checkbox1').on('click', function() {
        if ($('.checkbox1').prop('checked') === true) {
            $('.password_input').attr('type', 'text')
        }else{
            $('.password_input').attr('type', 'password')
        }
    })
    $('.checkbox2').on('click', function() {
        if ($('.checkbox2').prop('checked') === true) {
            $('.confirm_password_input').attr('type', 'text')
        }else{
            $('.confirm_password_input').attr('type', 'password')
        }
    })
    let upBtns = document.getElementsByClassName('up_btn');
    let downBtns = document.getElementsByClassName('down_btn');
    let quantityCounter = document.getElementsByClassName('quantity_counter');
    let itemTotalPrices = document.getElementsByClassName('item_total_price');
    let cartItemPrices = document.getElementsByClassName('cart_item_price');
    let total = 0;
    let counter = 0;
    for(let i = 0; i < itemTotalPrices.length; i++){
        total = total + parseFloat(itemTotalPrices[i].innerText);
    }
    total = total.toFixed(2);
    $('.items_total_digits').text(`${total}`);
    for(let i = 0; i < upBtns.length; i++){
        upBtns[i].addEventListener('click', function() {
            counter++
            let upBtnsID = this.dataset.productid;
            for(let i = 0; i < quantityCounter.length; i++){
                if(quantityCounter[i].dataset.productid === upBtnsID){
                    if (quantityCounter[i].innerText === '20'){
                            quantityCounter[i].innerText = '20';
                        }else{
                            quantityCounter[i].innerText = `${++quantityCounter[i].innerText}`;
                    }
                }
            }
            for(let i = 0; i < itemTotalPrices.length; i++){
                if (itemTotalPrices[i].dataset.productid === upBtnsID){
                    if (quantityCounter[i].innerText === '20'){
                        let itemPriceMaxIncrement = cartItemPrices[i].innerText * 20;
                        itemTotalPrices[i].innerText = itemPriceMaxIncrement.toFixed(2);

                    }else{
                            let itemPriceIncrement = parseFloat(itemTotalPrices[i].innerText) + parseFloat(cartItemPrices[i].innerText);
                            itemTotalPrices[i].innerText = itemPriceIncrement.toFixed(2);
                    }
            }
            }
            let total = 0;
            for(let i = 0; i < itemTotalPrices.length; i++){
                total = parseFloat(total) + parseFloat(itemTotalPrices[i].innerText);
            }
            $('.items_total_digits').text(total.toFixed(2));        
        })

    }
    for(let i = 0; i < downBtns.length; i++){
        downBtns[i].addEventListener('click', function() {
            counter--
            let downBtnsID = this.dataset.productid;
            for(let i = 0; i < quantityCounter.length; i++){
                if(quantityCounter[i].dataset.productid === downBtnsID){
                    if (quantityCounter[i].innerText === '1'){
                        quantityCounter[i].innerText = '1';
                    }else{
                        quantityCounter[i].innerText = `${--quantityCounter[i].innerText}`;
                    }
            }
            }
            for(let i = 0; i < itemTotalPrices.length; i++){
                if (itemTotalPrices[i].dataset.productid === downBtnsID){
                    if (quantityCounter[i].innerText === '1'){
                        let itemPriceMinDecrement = parseFloat(cartItemPrices[i].innerText);
                        itemTotalPrices[i].innerText = itemPriceMinDecrement.toFixed(2);
                    }else{
                        let itemPriceDecrement = parseFloat(itemTotalPrices[i].innerText) - parseFloat(cartItemPrices[i].innerText);
                        itemTotalPrices[i].innerText = itemPriceDecrement.toFixed(2);
                    }
            }

            }
            let total = 0;
            if(quantityCounter[i].innerText === '1'){
                for(let i = 0; i < itemTotalPrices.length; i++){
                    total = total + parseFloat(itemTotalPrices[i].innerText);
                }
                $('.items_total_digits').text(total.toFixed(2))
                

            }else{
                total = parseFloat($('.items_total_digits').text()) - parseFloat(cartItemPrices[i].innerText);
                $('.items_total_digits').text(total.toFixed(2));  
            }
    })


    }
    if ($('.header').hasClass('False') === true){
        $('.cart').on('click', function(e){
            e.preventDefault();
            $('.dark').show(300);
            $('.form-section').show(400);
            
        })
    }

    $('.checkout').on('click', function(){
        let data = [];
        for(let i = 0; i < quantityCounter.length; i++){
            data.push({'id': itemTotalPrices[i].dataset.productid,'productname': itemTotalPrices[i].dataset.productname, 'itemTotalPrices':itemTotalPrices[i].innerText, 'quantityCounter': quantityCounter[i].innerText});
        }
        fetch('/checkout_orders/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            location.replace('/checkout/')
            
          })
          .catch((error) => {
            location.reload();
          });
    })

});