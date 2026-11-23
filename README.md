
# Pulso Abierto

Aplicación web desarrollada con React y TypeScript que permite consultar cotizaciones actualizadas de criptomonedas en dólares estadounidenses (USD).

El proyecto fue desarrollado como parte de las actividades de Programación Web de Teclab, aplicando conceptos de componentes reutilizables, consumo de APIs REST, validación de formularios, manejo de estado global, pruebas automatizadas y despliegue en producción.

## Aplicación publicada

**Sitio web:** https://pulso-abierto-rgam151.vercel.app

**Repositorio GitHub:** https://github.com/rgam151/pulso-abierto-react

## Funcionalidades

- Consulta de cotizaciones de Bitcoin, Ethereum y Solana.
- Consumo de datos de la API de CoinGecko.
- Búsqueda de criptomonedas por nombre o símbolo.
- Filtrado mediante selector de criptomonedas.
- Validación de formularios con Zod.
- Visualización de estados de carga, resultados y errores.
- Navegación entre listado y páginas de detalle con React Router.
- Gestión de criptomonedas favoritas con Zustand.
- Persistencia de favoritos mediante localStorage.
- Diseño responsive para computadoras y dispositivos móviles.
- Pruebas automatizadas con Vitest y Testing Library.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Zustand
- Zod
- CoinGecko API
- Vitest
- React Testing Library
- ESLint
- Git y GitHub
- Vercel

## Instalación

Para ejecutar el proyecto localmente, es necesario tener instalados Node.js y npm.

Clonar el repositorio:

```bash
git clone https://github.com/rgam151/pulso-abierto-react.git
```

Ingresar a la carpeta:

```bash
cd pulso-abierto-react
```

Instalar las dependencias:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Vite mostrará una dirección local para abrir la aplicación en el navegador.

**Nota:** el frontend consulta `/api/precios`, una función de servidor que se ejecuta en Vercel. El servidor de desarrollo de Vite no ejecuta esa función automáticamente, por lo que las cotizaciones requieren una configuración adicional de API para funcionar fuera de Vercel.

## Ejecutar las pruebas

```bash
npx vitest run
```

El proyecto incluye 17 pruebas automatizadas distribuidas en cuatro archivos.

Se verifican:

- Respuestas correctas y errores de la API.
- Validación de datos recibidos.
- Gestión y persistencia de favoritos.
- Comportamiento de las tarjetas de criptomonedas.
- Estados de carga, error y recuperación de la aplicación.

## Generar la versión de producción

```bash
npm run build
```

Este comando ejecuta la comprobación de TypeScript y genera los archivos de producción en la carpeta `dist`.

## Vista previa de producción

```bash
npm run preview
```

Permite visualizar localmente la versión compilada.

La vista previa no ejecuta las funciones de servidor de Vercel, por lo que la consulta de precios requiere un entorno compatible.

## Verificar el código

```bash
npm run lint
```

Ejecuta ESLint para comprobar la calidad del código.

## Integración con CoinGecko

La aplicación utiliza la API pública de CoinGecko para obtener cotizaciones en USD.

En producción, las solicitudes se realizan mediante una función de servidor ubicada en:

`api/precios.ts`

Esta función consulta CoinGecko y devuelve los datos al frontend.

La solución permite mantener una ruta de consulta propia dentro del proyecto desplegado en Vercel.

No se requieren variables de entorno para la configuración actual.

## Mejora de mantenibilidad

Durante la Actividad 4 se identificó una duplicación de información entre los archivos `App.tsx` y `CryptoDetailPage.tsx`.

Ambos contenían datos sobre las criptomonedas, como nombres, símbolos, íconos y clases CSS.

### Modificación realizada

Se creó el archivo:

`src/data/criptomonedas.ts`

Este archivo centraliza la información compartida de Bitcoin, Ethereum y Solana.

También contiene la función `crearCriptomonedas`, encargada de transformar los precios obtenidos desde la API en los datos utilizados por la interfaz.

### Beneficios

- Eliminación de información duplicada.
- Mayor facilidad de mantenimiento.
- Mejor organización del código.
- Reutilización de datos entre componentes y páginas.
- Conservación del comportamiento original de la aplicación.

### Verificación de la mejora

Después de realizar la refactorización se ejecutaron nuevamente las pruebas automatizadas, la compilación de producción y ESLint.

Los tres controles finalizaron correctamente, sin detectar regresiones en las pruebas existentes.

## Despliegue en Vercel

La aplicación está publicada en Vercel mediante integración con el repositorio de GitHub.

Configuración utilizada:

- Framework: Vite.
- Rama principal: master.
- Comando de compilación: `npm run build`.
- Directorio de salida: `dist`.
- Directorio raíz: `./`.

La configuración de rutas se encuentra en `vercel.json`.

Durante la verificación inicial se detectó un error HTTP 403 en la consulta a CoinGecko a través de una redirección externa.

Para resolverlo, se implementó una función de servidor en Vercel que realiza la consulta a CoinGecko.

Después del nuevo despliegue se comprobó que las cotizaciones se mostraban correctamente.

## Verificación final

**Fecha de verificación:** 23 de noviembre de 2026.

| Verificación | Resultado |
|---|---|
| Pruebas automatizadas | 17 de 17 aprobadas |
| Archivos de pruebas | 4 aprobados |
| Compilación de producción | Correcta |
| ESLint | Sin errores |
| Vista previa local | Servidor iniciado correctamente |
| Despliegue en Vercel | Correcto |
| Consulta a CoinGecko en producción | Correcta |
| Navegación entre listado y detalle | Correcta |
| Gestión de favoritos | Correcta |
| Persistencia después de actualizar | Correcta |
| Búsqueda y filtros | Correctos |
| Diseño responsive | Verificado |

**URL de producción:** https://pulso-abierto-rgam151.vercel.app

El proyecto quedó publicado y se verificaron sus funcionalidades principales en el entorno de producción.

---

Proyecto académico desarrollado para Teclab.

