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

let addToCartBtn = document.getElementsByClassName('atc-btn');
let namesOfCartItems = []

if ($('.header').hasClass('True') === true){
    fetch('/cart_items/')
        .then(response => response.json())
        .then(json => {
        	$('.counter').text(json[0]);
        	for(let i = 0; i < json[1].length; i++){
        		namesOfCartItems.push(json[1][i].name);
        	}
        	for (let i = 0; i < addToCartBtn.length; i++) {
        		if (namesOfCartItems.includes(addToCartBtn[i].dataset.productname)){
        			addToCartBtn[i].style.display = 'none';
        		}
        	}
        	for (var i = 0; i < $('.added_to_cart').length; i++) {
        		if (namesOfCartItems.includes(addToCartBtn[i].dataset.productname)){
        			$('.added_to_cart')[i].style.display = 'block';
        		}
        	}
        }) 
        .catch(err => console.log('Request Failed', err));
}

for(let i = 0; i < addToCartBtn.length; i++){
    addToCartBtn[i].addEventListener('click', function() {
		if ($('.header').hasClass('True') === true) {

			let productId = this.dataset.productid;
			let productName = this.dataset.productname;

			const data = { 'productId': productId };

			fetch('/add_to_cart/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken,
			},
			body: JSON.stringify(data),
			})
			.then((response) => response.json())
			.then((data) => {
				$('.counter').text(data);
				for(let i = 0; i < $('.atc-btn').length; i++) {
					if ($('.atc-btn')[i].dataset.productid === productId) {
						addToCartBtn[i].style.display = 'none';
					}
				}
				for (var i = 0; i < $('.added_to_cart').length; i++) {
					if ($('.added_to_cart')[i].dataset.productname === productName){
						$('.added_to_cart')[i].style.display = 'block';
				}
			}
				
			})
			.catch((error) => {
				$('.dark').show(300);
				$('.form-section').show(400);
			});
		}else{
			$('.dark').show(300);
			$('.form-section').show(400);
		}
    	
    })
}
