from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from .views import registro

urlpatterns = [
    path('', views.home_view, name='index'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('login/', views.login_view, name='login'),
    path('merch/', views.merch, name='merch'),
    path('registro/', registro, name='registro'),
    path('socio/', views.socio, name='socio'),
    path('checkout-merch/', views.checkout_merch, name='checkout-merch'),
    path('checkout-socio/', views.checkout_socio, name='checkout-socio'),
    path('donaciones/', views.donaciones, name='donaciones'),
    path('acercade/', views.acercade, name='acercade'),
    path('contactanos/', views.contactanos, name='contactanos'),
    path('animales/', views.animales, name='animales'),
    path('info_animal/<str:pk>', views.info_animal, name='info_animal'),
    path('agendaVisita/', views.agendaVisita, name='agendaVisita'),
]