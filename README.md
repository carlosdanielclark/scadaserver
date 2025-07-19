# Manual de Arranque del Proyecto SCADA EROS

Este archivo README describe cómo **levantar el proyecto SCADA EROS** en Windows, desde la obtención del código hasta su ejecución. Se incluyen todas las configuraciones necesarias para un entorno típico de desarrollo o pruebas.

## 1. Requisitos Previos

- **Sistema Operativo:** Windows 10/11 (recomendado 64 bits)
- **Python:** 3.9 o superior (descargue desde [python.org](https://www.python.org/downloads/))
- **Git:** [Descargar Git para Windows](https://git-scm.com/download/win)
- **Visual Studio Code:** [VSCode](https://code.visualstudio.com/)
- **Navegador web compatible:** Chrome, Edge, Firefox

Opcionales:

- Controladores específicos de tu hardware PLC, si vas a comunicar con equipos físicos.


## 2. Clona el proyecto desde GitHub

Abre VSCode, presiona `Ctrl+Shift+P` y selecciona **Git: Clone...**.
Pega la URL de tu repositorio, elige la carpeta destino.

O desde terminal de Windows:

```bash
git clone https://github.com/tuusuario/mi-scadaserver.git
```

Cambia al directorio del proyecto:

```bash
cd mi-scadaserver
```


## 3. Crea y activa un entorno virtual (recomendado)

En la terminal integrada de VSCode, ejecuta:

```bash
python -m venv env
.\env\Scripts\activate
```


## 4. Instala las dependencias del proyecto

Instala los paquetes necesarios utilizando `pip`:

```bash
pip install -r requirements.txt
```

Si el archivo `requirements.txt` no existe, instala manualmente (común en proyectos Django):

```bash
pip install django
# Agrega aquí otros paquetes necesarios (ejemplo: requests, djangorestframework, etc.)
```


## 5. Configuración Inicial

### a) Variables de entorno

Crea un archivo `.env` en la raíz si tu proyecto lo utiliza:

```
DEBUG=True
SECRET_KEY=tu_clave_secreta
ALLOWED_HOSTS=localhost,127.0.0.1
```

Ajusta los valores según tu entorno y la documentación interna del proyecto.

### b) Configuración de Base de Datos

Por defecto se usa `db.sqlite3` (no requiere configuración extra).
Si usas PostgreSQL o MySQL, ajusta el bloque `DATABASES` en `settings.py`.

## 6. Migración de la Base de Datos

Ejecuta los siguientes comandos para preparar el esquema:

```bash
python manage.py makemigrations
python manage.py migrate
```


## 7. Crear un superusuario administrativo

```bash
python manage.py createsuperuser
```

Sigue las instrucciones para usuario y password.

## 8. Ejecuta el Servidor de Desarrollo

```bash
python manage.py runserver
```

Verás algo similar a:

```
Starting development server at http://127.0.0.1:8000/
```

Abre tu navegador y accede a `http://127.0.0.1:8000/`.

## 9. Configuración de Firewall y Puertos

Asegúrate de tener abierto el puerto `8000` (o el que uses) en el firewall de Windows si accedes desde otro PC.

## 10. Acceso a la Interfaz SCADA

- Accede a la interfaz web para monitoreo en:
`http://localhost:8000/monitor/scada/`
- Ingresa con el usuario/admi creado previamente si la app está protegida.


## 11. Conexión a Dispositivos EROS

Ajusta las variables de entorno/red según tu infraestructura. Verifica la configuración de drivers en caso de conectar con PLCs o sistemas de campo.

## 12. Tareas Opcionales y Consejos

- Ajusta el archivo `.gitignore` para no subir tu base local ni archivos temporales.
- Reinicia VSCode si no detecta el entorno Python recién creado.
- Usa la consola administrativa (`/admin`) para agregar/editando variables, usuarios, etc.


## 💡 Notas Importantes

- Al modificar código fuente, un simple **refresh** de la página debería reflejar los cambios. Para cambios en dependencias o entorno, considera reiniciar el servidor.
- Si comunicas con EROS NET o hardware externo, asegúrate de tener permisos de red adecuados y drivers instalados.
- Ante errores, revisa el archivo `settings.py` y la consola de terminal para pistas de configuración incorrecta.


### Checklist de Arranque Rápido

- [ ] Python instalado y en PATH
- [ ] Git y VSCode listos
- [ ] Repositorio clonado y entorno virtual creado
- [ ] Dependencias instaladas
- [ ] Migraciones aplicadas
- [ ] Servidor corriendo, acceso web comprobado

**¡Listo! Ahora tienes todo lo necesario para levantar y probar tu SCADA EROS en Windows.** Para despliegues industriales, consulta la guía avanzada y refuerza seguridad y respaldos según tu infraestructura.

