# Desafío Roommates
Este desafío es parte del curso de Desafio Latam, Desarrollo de aplicaciones Full Stack Js, en el cual validaremos nuestros conocimientos del modulo 8, unidad 1.


# Descripción del desafío
En esta prueba deberás crear un servidor con Node que sirva una interfaz HTML se tiene a disposición en el Apoyo Desafío - Roommates y cuya temática está basada en el registro de gastos entre roommates. 

Se deberá servir una API REST que permita hacer lo siguiente:
- Almacenar roommates nuevos ocupando random user.
- Devolver todos los roommates almacenados.
- Registrar nuevos gastos.
- Devolver el historial de gastos registrados.
- Modificar la información correspondiente a un gasto.
- Eliminar gastos del historial.

# Visuales



| Un gasto | Dos gastos realizados |
| --- | --- |
| ![vista_1](/assets/vista_1.png)| ![vista_2](/assets/vista_2.png) |


La vista principal del proyecto, nos muestra 3 secciones:
- Un botón que registra nuevos usuarios, llamando a la api [random user](https://randomuser.me/api), que registra uno a la vez, imprimiendo debajo la lista de los usuarios agregados.
- Formulario para ingresar el gasto de un roommate.
- Tabla que muestra un listado de los gastos, con posibilidad de editar y eliminar el gasto.


## Empezando 🚀

Estas instrucciones te guiarán para obtener una copia de este proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

- Sistema Operativo: puedes usar Ubuntu o Windows 10 o superior.
- Se trabajo con Javascript.
- Se utilizo express, uuid, axios y fs.
- Para este proyecto se utiliza nodemon.

### Instalación 🔧

1. Para utilizar este proyecto debes clonar este repositorio en tu máquina, utilizando git.

```
git clone git@github.com:jesbell/roommates_.git
```

2. Una vez allí puedes abrir el proyecto donde te sea más comodo. Pero dentro de la carpeta del proyecto deberas realizar las instalación de las dependencias, con el siguiente comando.

```
npm install
```

3. Después debes levantar el servidor (index.js) con el siguiente comando en tu consola
```
npm start
```

Este te dará el enlace para que puedas ingresar directamente al localhost
```
http://localhost:3000
```

Una vez allí, puedes agregar más usuarios, otros gastos, modificar y eliminar los gastos. Dichos datos (roommates y gastos), se guardan y leen en la carpeta api, en archivos json.

## Soporte

Si tienes algún problema o sugerencia, por favor abre un problema [aquí](https://github.com/jesbell/roommates_/issues).

## Versionado  📌

Usamos [Git](https://git-scm.com) para el versionado.

## Expresiones de Gratitud 🎁

Si encontraste cualquier valor en este proyecto o quieres contribuir, aquí está lo que puedes hacer:

- Comparte este proyecto con otros
- Invítanos un café ☕
- Inicia un nuevo problema o contribuye con un PR
- Muestra tu agradecimiento diciendo gracias en un nuevo problema.

---

⌨️ con ❤️ por [Joselyn Gonzalez](https://github.com/jesbell) 😊
