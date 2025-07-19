# monitor/scada_config.py
SCADA_VARIABLES = {
    "Solar_kW": {
        "description": "Producción fotovoltaica",
        "unit": "kW", "type": "float", "category": "energy", "color": "#4CAF50"
    },
    "Gen_rpm": {
        "description": "Velocidad del generador",
        "unit": "rpm", "type": "float", "category": "mecánica", "color": "#03A9F4"
    },
    "Grid_Volt": {
        "description": "Voltaje de red",
        "unit": "V", "type": "float", "category": "eléctrica", "color": "#FF9800"
    },
    "estado": {
        "description": "Estado general", "unit": "", "type": "bool",
        "category": "estado", "color": "#8E24AA"
    },
    "fin": {
        "description": "Fin de ciclo", "unit": "", "type": "bool",
        "category": "estado", "color": "#8E24AA"
    }
}
