from django.shortcuts import render, redirect
from .models import Product, Cart, CheckoutOrder
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required

def logout_user(request):
	logout(request)
	return redirect('home')

def login_user(request):
	m = ''
	data = json.loads(request.body)
	full_name = data.get('full_name')
	password = data.get('password')
	user = authenticate(request, username=full_name, password=password)
	if user is not None:
		login(request, user)
		m = 'success'
	else:
		m = 'failed'
	return JsonResponse(m, safe=False)

def home(request):
	products = Product.objects.all()
	context = {'products': products}
	return render(request, 'ecommerce_app/home.html', context)


def add_to_cart(request):
	data = json.loads(request.body)
	product_id = data['productId']
	prodcut_to_add_to_cart = Product.objects.get(id=product_id)
	Cart.objects.update_or_create(user=request.user,
						image=prodcut_to_add_to_cart.image,
						name=prodcut_to_add_to_cart.name,
						price=prodcut_to_add_to_cart.price,
						)
	count_cart_items = str(Cart.objects.filter(user=request.user).count())
	return JsonResponse(count_cart_items, safe=False)

def cart_items(request):
	count_cart_items = str(Cart.objects.filter(user=request.user).count())
	cart_items = list(Cart.objects.filter(user=request.user).values())
	cart_items_response = [count_cart_items, cart_items]
	return JsonResponse(cart_items_response, safe=False)

def cart(request):
	if request.method == 'POST':
		item_id = request.POST.get('delete_item')
		Cart.objects.filter(id=item_id).delete()
	cart = Cart.objects.filter(user=request.user)
	items = Cart.objects.count()
	context = {'cart_items': cart, 'items': items}
	return render(request, 'ecommerce_app/cart.html', context)

def checkout_orders(request):
	data = json.loads(request.body)
	if CheckoutOrder.objects.filter(user=request.user).count() > 0:
		CheckoutOrder.objects.filter(user=request.user).delete()
	for items in data:
		CheckoutOrder.objects.create(id=items.get('id'), user=request.user, total_item_price=items.get('itemTotalPrices'), number_of_items=items.get('quantityCounter'))
	return JsonResponse('checkout_items', safe=False)

def get_checkout_info(request):
	items = list(CheckoutOrder.objects.filter(user=request.user).values())
	return JsonResponse(items, safe=False)

@login_required(login_url='home')
def checkout(request):
	cart_items = Cart.objects.filter(user=request.user)
	order = CheckoutOrder.objects.filter(user=request.user)
	count_items = Cart.objects.filter(user=request.user).count()
	context = {'cart_items': cart_items, 'count_items': count_items}
	return render(request, 'ecommerce_app/checkout.html', context)

def create_account(request):
	error_msg = ''
	full_name = request.POST.get('full-name')
	email = request.POST.get('email')
	password = request.POST.get('password')
	confirm_password = request.POST.get('confirm-password')
	if request.method == 'POST' and full_name and email and password and confirm_password:
		user = authenticate(username=full_name, email=email, password=password)
		if user == None:
			if password == confirm_password:
				user = User.objects.create_user(full_name, email, password)
				login(request, user)
				return redirect('home')
		else:
			error_msg = 'This account already exists.'
	context = {'error_msg': error_msg}
	return render(request, 'ecommerce_app/create-account.html', context)
