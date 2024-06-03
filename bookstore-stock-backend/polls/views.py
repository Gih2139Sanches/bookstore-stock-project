from django.http import HttpResponse
from django.http import JsonResponse
from polls.models import Customer, Book, PurchasesHistoric
from django.views.decorators.csrf import csrf_exempt
from polls.serializers import CustomerSerializer, BookSerializer, PurchasesHistoricSerializer
from rest_framework.renderers import JSONRenderer
import json
# Create your views here.

@csrf_exempt
def customer(request):
    try:
        if(request.method == "GET"):
            data = Customer.objects.filter(excluded=False)
            data_serialized = CustomerSerializer(data, many=True)

            return JsonResponse(JSONRenderer().render(data_serialized.data).decode(), safe=False)

        if(request.method == "POST"):
            body = json.loads(request.body.decode('utf-8'))
            new_customer = Customer.objects.create(**body)
            # response = CustomerSerializer(new_customer)
            # return JsonResponse(True, safe=False)
            return HttpResponse(new_customer, 'application/json')

        if(request.method == "PUT"):
            body = json.loads(request.body.decode('utf-8'))
            customer = Customer(**body)
            Customer.objects.filter(pk=customer.id, excluded=False).update(**body)
            return JsonResponse(True, safe=False)

    except Exception as e:
        print(e)
        return JsonResponse(False, safe=False)

@csrf_exempt
def customerDelete(request, id):
    try:
        Customer.objects.filter(pk=id).update(excluded=True)
        return JsonResponse(True, safe=False)

    except Exception as e:
        print(e)
        return JsonResponse(False, safe=False)


@csrf_exempt
def book(request):

    try:
        if(request.method == "GET"):
            data = Book.objects.filter(excluded=False)
            data_serialized = BookSerializer(data, many=True)

            return JsonResponse(JSONRenderer().render(data_serialized.data).decode(), safe=False)

        if(request.method == "POST"):
            body = json.loads(request.body.decode('utf-8'))
            new_Book = Book.objects.create(**body)

            # response = BookSerializer(new_Book)
            return JsonResponse(True, safe=False)

        if(request.method == "PUT"):
            body = json.loads(request.body.decode('utf-8'))
            book = Book(**body)
            Book.objects.filter(pk=book.id, excluded=False).update(**body)
            return JsonResponse(True, safe=False)



    except Exception as e:
        print(e)
        return JsonResponse(False, safe=False)

@csrf_exempt
def bookDelete(request, id):
    try:
        Book.objects.filter(pk=id).update(excluded=True)
        return JsonResponse(True, safe=False)

    except Exception as e:
        print(e)
        return JsonResponse(False, safe=False)


@csrf_exempt
def purchases_historic(request):

    try:
        if(request.method == "GET"):
            data = PurchasesHistoric.objects.filter(excluded=False)
            data_serialized = PurchasesHistoricSerializer(data, many=True)
            return JsonResponse(JSONRenderer().render(data_serialized.data).decode(), safe=False)

        if(request.method == "POST"):
            body = json.loads(request.body.decode('utf-8'))

            book = Book.objects.get(id=body['book_id'])
            customer = Customer.objects.get(id=body['customer_id'])

            # Atualize a quantidade de livros disponíveis
            if book.quantity >= body['quantity']:
                book.quantity -= body['quantity']
                book.save()

                PurchasesHistoric.objects.create(
                    book_fk=book,
                    customer_fk=customer,
                    price=body['price'],
                    purchase_date=body['purchase_date'],
                    quantity=body['quantity'],
                    method_payment=body['method_payment']
                )
                # Book.objects.update(book=book)
                return JsonResponse({"success": True, "message": "Quantidade de livro atualizada com sucesso", "updated_quantity": book.quantity})
            else:
                return JsonResponse({"error": "Quantidade de livros insuficiente"}, status=400)



            return JsonResponse(True, safe=False)

            # body = json.loads(request.body.decode('utf-8'))

            # book = Book.objects.get(id=body['book_id'])
            # customer = Customer.objects.get(id=body['customer_id'])
            # new_purchases_historic = PurchasesHistoric.objects.create(
            #     book_fk=book,
            #     customer_fk=customer,
            #     price=body['price'],
            #     purchase_date=body['purchase_date'],
            #     quantity=body['quantity'],
            #     method_payment=body['method_payment']
            # )

            # # new_purchases_historic.save()
            # return JsonResponse(True, safe=False)

        if(request.method == "PUT"):
            body = json.loads(request.body.decode('utf-8'))

            book = Book.objects.get(id=body['book_id'])
            customer = Customer.objects.get(id=body['customer_id'])
            # purchases_historic = PurchasesHistoric.objects.create(
            #     book_fk=book,
            #     customer_fk=customer,
            #     price=body['price'],
            #     purchase_date=body['purchase_date'],
            #     quantity=body['quantity']
            # )

            # purchases_historic

            PurchasesHistoric.objects.filter(pk=body['id'], excluded=False).update(
                book_fk=book,
                customer_fk=customer,
                price=body['price'],
                purchase_date=body['purchase_date'],
                quantity=body['quantity'],
                method_payment=body['method_payment']
            )

            return JsonResponse(True, safe=False)

    except Exception as e:
        print(e)
        return JsonResponse(False, safe=False)

@csrf_exempt
def purchases_historic_delete(request, id):
    try:
        PurchasesHistoric.objects.filter(pk=id).update(excluded=True)
        return JsonResponse(True, safe=False)

    except Exception as e:
        print(e)
        return JsonResponse(False, safe=False)

