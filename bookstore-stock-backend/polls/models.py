from django.utils import timezone
from django.db import models
from datetime import datetime
class ModelBase(models.Model):
    excluded = models.BooleanField(default=False)
    inclusion_date = models.DateField(default=datetime.now())
    change_date = models.DateField(default=datetime.now())

# Create your models here.
class Customer(ModelBase):
    name = models.CharField(max_length=200)
    birth_date = models.DateField(default=timezone.now)
    email = models.CharField(max_length=200)
    phone = models.CharField(max_length=14)

class Book(ModelBase):
    title = models.CharField(max_length=200)
    sub_title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    publisher = models.CharField(max_length=200)
    editon = models.CharField(max_length=5)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)

class PurchasesHistoric(ModelBase):
    purchase_date = models.DateField(default=datetime.now())
    book_fk = models.ForeignKey(Book, on_delete=models.PROTECT)
    customer_fk = models.ForeignKey(Customer, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.IntegerField()
    method_payment = models.CharField(max_length=60)
