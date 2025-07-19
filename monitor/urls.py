from django.urls import path
from .views import scada_view, leer_variables_scada

app_name = 'monitor'

urlpatterns = [
    path('', scada_view, name='scada'),
    path("api/lectura/", leer_variables_scada, name="lectura_scada"),
]

