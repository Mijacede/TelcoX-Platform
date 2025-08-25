# Plataforma de Autogestión TelcoX

## Estructura del Proyecto

telcox-app/
├── 📁 backend/           # API Flask + Python
│   ├── app.py           # Servidor principal
│   ├── test_backend.py  # Pruebas unitarias
│   └── requirements.txt # Dependencias
├── 📁 frontend/          # Aplicación Angular
│   ├── src/            # Código fuente
│   └── package.json    # Dependencias
└── docker-compose.yml   # Configuración Docker

### Requisitos previos:
- Docker instalado
- Docker Compose instalado

### Pasos de evaluación:

1. Ejecutar el proyecto:
   ```bash
   docker-compose up --build
   ```

2. Verificar que los servicios estén activos:
   ```bash
   docker-compose ps
   ```
   *Debería mostrar ambos contenedores (backend y frontend) en estado "Running"*

3. Probar la aplicación:
   - Abrir http://localhost:4200
   - Debería verse el dashboard de TelcoX con datos de consumo

4. Probar la API:
   - Abrir http://localhost:5000/api/customer/12345
   - Debería retornar un JSON con datos del cliente

5. Ejecutar pruebas unitarias:
   ```bash
   docker-compose exec backend python -m unittest test_backend.py
   ```
   *Resultado esperado: "OK" con 4 pruebas pasadas*

## Funcionalidades a Validar

### Frontend (http://localhost:4200):
- Dashboard con información del cliente
- Visualización de consumo de datos móviles
- Visualización de minutos consumidos
- Información de facturación
- Manejo de estados de carga y errores

### Backend (http://localhost:5000):
- API REST funcional
- Endpoints respondiendo correctamente
- Datos simulados de sistema BSS
- Configuración CORS adecuada

### Pruebas Unitarias:
- 4 pruebas unitarias passing
- Cobertura de funcionalidades críticas

## Comandos de Diagnóstico

### Ver logs en tiempo real:
```bash
docker-compose logs -f
```

### Ver estado de contenedores:
```bash
docker-compose ps
```

### Detener la aplicación:
```bash
docker-compose down
```


