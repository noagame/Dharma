# Dharma

Landing de la marca Dharma y demo local de su tienda de ropa outdoor, deportiva y trekking. La tienda y la landing son páginas distintas dentro de la misma aplicación Vite.

## Estado de la demo

- `/` presenta la marca.
- `/store/` muestra el catálogo. Empieza vacío y se llena con productos ingresados desde el panel.
- `/store/admin/` permite crear, editar, publicar, ocultar y eliminar productos y sus variantes.
- La tienda mantiene el carrito en el navegador y permite cambiar cantidades o quitar artículos.
- El panel incluye una sección de historial, pero todavía no puede consultar ventas.
- El cobro está desactivado. La demo no crea pagos ni ventas.

Los productos y el carrito se guardan en `localStorage` del navegador. Por eso solo aparecen en el mismo navegador, perfil y origen, como `http://localhost:5173`. No existe una base de datos compartida ni una API conectada. El panel no tiene autenticación: `noindex` solo evita pedir indexación a buscadores y no protege la ruta. Usa esta demo localmente; no la publiques como administración real ni ingreses datos de clientes.

## Requisitos

- Node.js `20.19+` o `22.12+`.
- pnpm.

El requisito de Node coincide con el rango declarado por la versión de Vite instalada en este proyecto.

## Iniciar la aplicación

Desde la raíz del repositorio (`front/`):

```bash
pnpm install
pnpm dev
```

Vite muestra la dirección local en la terminal, normalmente `http://localhost:5173`. Abre:

- Landing: <http://localhost:5173/>
- Tienda: <http://localhost:5173/store/>
- Panel demo: <http://localhost:5173/store/admin/>

Mantén abierta la terminal mientras usas la demo. Para detener el servidor, presiona `Ctrl+C` en esa terminal.

## Agregar productos desde el panel

Sí. En esta demo el panel puede agregar y editar productos, administrar sus variantes, publicarlos u ocultarlos y eliminarlos. Sigue estos pasos:

1. Abre `/store/admin/` en el mismo navegador donde revisarás `/store/`.
2. Escribe el nombre y selecciona una categoría: Outdoor, Deportiva o Trekking.
3. Ingresa el precio de venta aprobado en pesos chilenos. El campo no acepta valores vacíos ni menores que 1.
4. Completa una variante por cada combinación de talla y color. Cada variante necesita un SKU distinto y una cantidad entera de unidades indicada para la demo. Usa **Agregar otra variante** para incluir más combinaciones.
5. Deja marcada **Mostrar en la tienda de demo** para que el producto aparezca en `/store/`, o desmárcala para guardarlo como borrador.
6. Presiona **Guardar producto**. Vuelve a la tienda y actualízala si ya estaba abierta antes de guardar.

En la lista del panel puedes editar, ocultar/publicar o eliminar cada producto. El precio y las unidades son valores de demostración ingresados por la persona que opera el panel; no representan precios o inventario validados por Dharma. El formulario aún no admite imágenes, costos, despacho ni sincronización con proveedores. El SKU identifica cada variante y debe ser único.

## Probar la tienda

1. Agrega productos desde el panel demo y publícalos.
2. En `/store/`, elige una talla/color y agrégala al carrito.
3. Cambia cantidades o quita artículos en la sección **Carrito**. El contador del encabezado muestra las unidades guardadas.
4. El botón de cobro permanece desactivado. La demo no crea pedidos, pagos ni registros falsos de venta.

El valor de unidades de la demo solo sirve para mostrar el flujo local. La venta real requerirá que un servidor valide el precio y la disponibilidad contra una fuente de inventario acordada.

## Qué hace falta para vender y operar el panel

- Backend/API y base de datos para catálogo, pedidos y ventas.
- Autenticación y permisos de administración del lado servidor.
- Colección aprobada, precios reales, variantes, imágenes y fuente de inventario.
- Proveedor de pago y credenciales privadas guardadas solo en el servidor.
- Datos de despacho, costos y condiciones para calcular el total antes de cobrar.
- Confirmación de pago del lado servidor antes de registrar una venta.
- Consulta segura del historial por identificador y fecha. La primera versión prevista muestra solo ID y fecha de venta.

La estructura y el contrato propuesto están en [`docs/tienda/API-DATOS.md`](docs/tienda/API-DATOS.md), la comparación inicial de pasarelas en [`docs/tienda/PASARELAS-CHILE.md`](docs/tienda/PASARELAS-CHILE.md), y el avance actual en [`docs/tienda/ESTADO.md`](docs/tienda/ESTADO.md).

Para producción también se necesitan rutas protegidas para crear, editar, publicar y archivar productos; la propuesta está en `API-DATOS.md`. El panel de ventas se conectará a otra ruta protegida y seguirá mostrando solo identificador y fecha de venta.

## Compilar y revisar

```bash
pnpm build
pnpm preview
```

`pnpm build` genera la versión estática en `dist/`. `pnpm preview` la sirve localmente para revisar el build; no implementa backend, pagos ni autenticación.

`pnpm test` ejecuta las pruebas actuales de componentes de la landing. Todavía no hay pruebas automatizadas de la tienda o del panel demo.

## Solución de problemas

### Vite no inicia

- Confirma que estás en la raíz `front/` (la carpeta que contiene `package.json`).
- Comprueba `node --version` y `pnpm --version`.
- Si faltan dependencias, ejecuta `pnpm install` y luego `pnpm dev`.
- Si el puerto indicado está ocupado, Vite puede ofrecer otro; usa la dirección que aparece en la terminal.

### El catálogo aparece vacío

- Confirma que guardaste el producto con **Mostrar en la tienda de demo** marcado.
- Comprueba que abriste el panel y la tienda en el mismo navegador y origen.
- Actualiza `/store/` después de guardar.

### Los datos locales no se guardan o aparece un error de almacenamiento

El navegador puede bloquear `localStorage`, estar en modo privado con restricciones o quedarse sin espacio. La demo no borra automáticamente datos que detecte como inválidos. Si quieres reiniciar manualmente los datos de esta demo, abre las herramientas de desarrollo del navegador, selecciona **Consola**, ejecuta solo las líneas de los datos que quieras borrar y actualiza la página:

```js
localStorage.removeItem('dharma:productos:v1')
localStorage.removeItem('dharma:carrito:v1')
```

La primera línea borra el catálogo local y la segunda el carrito. Esta acción no puede deshacerse. También puedes borrar esos valores desde **Application/Almacenamiento > Local Storage** del navegador.

### La página carga en blanco

Revisa la terminal de Vite y la consola del navegador. Confirma que abriste las rutas con sus barras finales, `/store/` y `/store/admin/`, y que `pnpm dev` sigue activo.

## Estructura principal

```text
front/
├── index.html                  entrada de la landing
├── src/                        secciones y estilos de la marca
├── store/
│   ├── index.html              entrada de la tienda
│   ├── admin/index.html        entrada del panel demo
│   └── src/
│       ├── datos/              contrato JSDoc de productos
│       ├── paginas/            plantillas de tienda y administración
│       ├── servicios/          carrito y persistencia local demo
│       ├── admin.js            comportamiento del panel
│       ├── main.js             comportamiento de la tienda
│       └── tienda.css          estilos de ambas páginas
├── docs/tienda/                decisiones, API propuesta y estado
└── vite.config.ts              entradas de build para las tres páginas
```
