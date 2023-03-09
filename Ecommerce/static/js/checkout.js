$(document).ready(function() {
	let totalItemPriceDigits = document.getElementsByClassName('total_item_price_digits');
	let itemQuantity = document.getElementsByClassName('item_quantity');
	fetch('/get_checkout_info/')
  	.then((response) => response.json())
  	.then((data) => {
  		for(let i = 0; i < totalItemPriceDigits.length; i++){
  			let totalItemPriceDigitsIds = totalItemPriceDigits[i].dataset.productid
  			if (totalItemPriceDigitsIds === `${data[i].id}`){
  				totalItemPriceDigits[i].innerText = data[i].total_item_price;
  			}
  		}
  		for(let i = 0; i < itemQuantity.length; i++){
  			let itemQuantityIds = itemQuantity[i].dataset.productid
  			if (itemQuantityIds === `${data[i].id}`){
  				itemQuantity[i].innerText = data[i].number_of_items;
  
  			}
  		}
  		let total = 0
	  	if ($('.number_of_items').text() === '0'){
	  		$('.total_price').hide()
	  	}else{
	  		for(let i = 0; i < data.length; i++){
	  			total += parseFloat(data[i].total_item_price);
	  			
	  		}
	  		$('.total_price_digits').text(`${total.toFixed(2)}`);
	  	}

  	});
})