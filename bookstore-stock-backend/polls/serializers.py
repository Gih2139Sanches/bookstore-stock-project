from rest_framework import serializers
from polls.models import Customer, Book, PurchasesHistoric


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class PurchasesHistoricSerializer(serializers.ModelSerializer):
    customer_fk = CustomerSerializer(read_only=True)
    book_fk = BookSerializer(read_only=True)

    class Meta:
        model = PurchasesHistoric
        fields = '__all__'
