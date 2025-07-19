from django.http import JsonResponse
from django.shortcuts import render
import win32com.client, pythoncom
import traceback
import logging

from .scada_config import SCADA_VARIABLES

def scada_view(request):
    return render(request, 'scada.html')

logger = logging.getLogger("scada.monitor")

def leer_variables_scada(request):
    response = {"meta": {}, "variables": {}}
    try:
        pythoncom.CoInitialize()
        eros = win32com.client.Dispatch("ErosNet.ErosClient")
        eros.Host = "127.0.0.1"
        eros.Port = 1235
        eros.Connected = True

        if not eros.Connected:
            logger.error("No se pudo conectar a EROS")
            return JsonResponse({"error": "No se pudo conectar"}, status=500)

        for var, meta in SCADA_VARIABLES.items():
            try:
                valor = eros.ReadByName(var)
            except Exception as e:
                logger.warning(f"Fallo lectura {var}: {e}")
                valor = None
            response["variables"][var] = {
                "value": valor,
                "meta": meta,
            }

        response["meta"]["status"] = "OK"
        response["meta"]["timestamp"] = request.timestamp if hasattr(request, "timestamp") else None
        return JsonResponse(response)

    except Exception:
        logger.exception("Excepción general SCADA EROS")
        return JsonResponse({
            "error": "Excepción general",
            "detalle": traceback.format_exc()
        }, status=500)
    finally:
        pythoncom.CoUninitialize()