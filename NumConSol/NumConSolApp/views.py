from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def manual_template(request):
    return render(request, 'manual_template.html', {})