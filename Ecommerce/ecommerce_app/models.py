from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
	image = models.ImageField(upload_to='product_images', max_length=1000)
	name = models.CharField(max_length=100)
	price = models.DecimalField(max_digits=7, decimal_places=2)

	def __str__(self):
		return self.name


class Cart(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	image = models.ImageField(upload_to='cart_product_images', max_length=1000)
	name = models.CharField(max_length=100)
	price = models.DecimalField(max_digits=7, decimal_places=2)
	
	class Meta:
		ordering = ['-id']


class CheckoutOrder(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	total_item_price = models.DecimalField(max_digits=10, decimal_places=2)
	number_of_items = models.IntegerField()

	class Meta:
		ordering = ['-id']
