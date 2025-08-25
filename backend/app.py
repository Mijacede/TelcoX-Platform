from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

# Configuración de la base de datos (simulada para este ejemplo)
def get_db_connection():
    # En un caso real, aquí conectarías a una base de datos MySQL
    # return mysql.connector.connect(...)
    # Para este ejemplo, simulamos una conexión
    return None

# Datos de ejemplo para simular la respuesta del sistema BSS
def get_customer_data(customer_id):
    # Simulamos datos de un cliente
    customers = {
        "12345": {
            "name": "Juan Pérez",
            "balance": 150.50,
            "data_usage": {
                "used": 12.5,
                "total": 20,
                "unit": "GB"
            },
            "minutes_usage": {
                "used": 250,
                "total": 500,
                "unit": "minutos"
            },
            "last_invoice": {
                "date": "2023-10-15",
                "amount": 89.99,
                "status": "Pagada"
            }
        },
        "67890": {
            "name": "María García",
            "balance": -45.75,
            "data_usage": {
                "used": 8.2,
                "total": 15,
                "unit": "GB"
            },
            "minutes_usage": {
                "used": 120,
                "total": 300,
                "unit": "minutos"
            },
            "last_invoice": {
                "date": "2023-10-10",
                "amount": 75.50,
                "status": "Pendiente"
            }
        }
    }
    
    return customers.get(customer_id, None)

# Rutas de la API
@app.route('/api/customer/<customer_id>', methods=['GET'])
def get_customer_info(customer_id):
    try:
        customer_data = get_customer_data(customer_id)
        
        if customer_data:
            return jsonify(customer_data)
        else:
            return jsonify({"error": "Cliente no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/usage/<customer_id>', methods=['GET'])
def get_usage_info(customer_id):
    try:
        customer_data = get_customer_data(customer_id)
        
        if customer_data:
            # Devolvemos solo la información de consumo
            usage_data = {
                "data_usage": customer_data["data_usage"],
                "minutes_usage": customer_data["minutes_usage"]
            }
            return jsonify(usage_data)
        else:
            return jsonify({"error": "Cliente no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/invoice/<customer_id>', methods=['GET'])
def get_invoice_info(customer_id):
    try:
        customer_data = get_customer_data(customer_id)
        
        if customer_data:
            # Simulamos historial de facturación
            invoices = []
            base_date = datetime.now()
            
            for i in range(6):  # Últimos 6 meses
                invoice_date = (base_date - timedelta(days=30*i)).strftime("%Y-%m-%d")
                invoices.append({
                    "date": invoice_date,
                    "amount": round(random.uniform(50, 100), 2),
                    "status": "Pagada" if i > 0 else customer_data["last_invoice"]["status"]
                })
                
            return jsonify({"invoices": invoices})
        else:
            return jsonify({"error": "Cliente no encontrado"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint no encontrado"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Error interno del servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)