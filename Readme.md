# Plataforma de Autogestión TelcoX

# Clonar repositorio
git clone https://github.com/tu-usuario/telcox-platform.git

cd telcox-platform

# Ejecutar con Docker
docker-compose up --build

## Verificar que los servicios estén activos:
   docker-compose ps
   *Debería mostrar ambos contenedores (backend y frontend) en estado "Running"*

## Probar la aplicación:
   - Abrir http://localhost:4200
   - Debería verse el dashboard de TelcoX con datos de consumo

## Probar la API:
   - Abrir http://localhost:5000/api/customer/12345
   - Debería retornar un JSON con datos del cliente

## Ejecutar pruebas unitarias:
   docker-compose exec backend python -m unittest test_backend.py
   *Resultado esperado: "OK" con 4 pruebas pasadas*


### Detener la aplicación:
```bash
docker-compose down
```


