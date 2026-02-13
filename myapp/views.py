from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import Animal
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import RegistroForm
from django.http import JsonResponse

def index(request):
    return render(request, 'myapp/index.html')

def merch(request):
    return render(request, 'myapp/merch.html')

def socio(request):
    return render(request, 'myapp/socio.html')

@login_required
def checkout_merch(request):
    return render(request, 'myapp/checkout-merch.html')

@login_required
def checkout_socio(request):
    return render(request, 'myapp/checkout-socio.html')

def donaciones(request):
    return render(request, 'myapp/donaciones.html')

def acercade(request):
    return render(request, 'myapp/acercade.html')

def contactanos(request):
    return render(request, 'myapp/contactanos.html')

@login_required
def agendaVisita(request):
    return render(request, 'myapp/agendaVisita.html')

def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            login(request, user)
            return redirect('index')
    else:
        form = RegistroForm()
    return render(request, 'myapp/registro.html', {'form': form})



def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            if user is not None:
                login(request, user)
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False})
        else:
            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                return render(request, 'myapp/login.html', {'form': request.POST, 'errors': 'Invalid username or password'})
    else:
        return render(request, 'myapp/login.html')

def logout_view(request):
    logout(request)
    return redirect('index')

def home_view(request):
    return render(request, 'myapp/index.html')

def animales(request):
    animales = Animal.objects.all()
    context = { "animales" : animales }
    return render(request, 'myapp/animales.html', context)


def info_animal(request,pk):
    context = {}
    if pk != '':
        animal = Animal.objects.get(id_animal = pk)

        context = {"animal":animal}
        if animal:
            return render(request,'myapp/info-animal.html',context)
    else:
        context={"mensaje":"Error"}
        return render(request,'myapp/animales.html',context)