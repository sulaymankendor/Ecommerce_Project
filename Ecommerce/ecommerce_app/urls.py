from django.urls import path
from . import views
urlpatterns = [
	path('', views.home, name='home'),
	path('cart/', views.cart, name='cart'),
	path('checkout/', views.checkout, name='checkout'),
	path('create-account/', views.create_account, name='create-account'),
	path('logout_user/', views.logout_user, name='logout_user'),
	path('login_user/', views.login_user, name='login_user'),
	path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
	path('cart_items/', views.cart_items, name='cart_items'),
	path('checkout_orders/', views.checkout_orders, name='checkout_orders'),
	path('get_checkout_info/', views.get_checkout_info, name='get_checkout_info'),

]