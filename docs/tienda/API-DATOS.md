# Propuesta de API y datos para la primera tienda

**Estado:** propuesta para la tienda real; el backend y la base de datos aún no están implementados.

La demo de frontend ya permite administrar productos y usar un carrito en `localStorage`. Esa persistencia es local al navegador y no cumple el contrato de producción descrito aquí. El panel de ventas no tiene conexión y no hay cobros ni ventas generados.

La demo actual tiene un catálogo editable en el panel que persiste en `localStorage`. Esos datos son locales al navegador y no equivalen a una API, inventario confiable o administración protegida. El panel de ventas sigue sin conexión.

**Alcance:** tienda separada de la landing, carrito, inicio de cobro desde servidor e historial administrativo por ID y fecha.

## 1. Separación propuesta

Mantener el repositorio Git actual y agregar `api/` en su raíz, al mismo nivel que `src/` y `store/`. La raíz actual es `/home/fabian/proyecto-personal/front` (contiene `package.json` y `.git`). El navegador sirve la landing y la tienda; la API valida reglas, crea pedidos, habla con la pasarela y protege el panel. Se puede publicar bajo el mismo dominio (`/`, `/store/`, `/api/`) aunque frontend y API se desplieguen como servicios distintos.

Esta es una propuesta de estructura, no una decisión de framework:

```text
<raíz-del-repositorio>/
  index.html
  src/                         # landing institucional
  store/
    index.html                 # tienda
    admin/index.html           # interfaz administrativa
    src/servicios/             # carrito local y llamadas a API
  api/                         # backend; puede tener despliegue separado
    src/
      rutas/                   # catálogo, checkout, webhook, ventas
      servicios/               # pedidos y pasarela
      seguridad/               # autenticación y permisos del panel
    migrations/                # esquema versionado de base de datos
```

## 2. Modelo conceptual

| Entidad | Datos que necesita | Razón |
| --- | --- | --- |
| Producto | ID, nombre, categoría, `precioCLP`, imágenes, variantes y publicado | Coincide con el contrato JSDoc existente en `store/src/datos/producto.js`; permite mostrar solo artículos aprobados por Dharma. |
| Variante | SKU, talla, color y unidades disponibles | Identifica la combinación vendible. En la demo, las unidades son un dato local ingresado manualmente y no acreditan inventario real. En producción, el servidor validará stock desde una fuente acordada. El precio está en el producto según el contrato actual; no asumir sincronización con un proveedor de dropshipping. |
| Pedido | ID interno, `createdAt`, `paidAt` nullable, estado, total y moneda | Registrar el intento y guardar cuándo se confirmó la venta para filtrar el panel. `paidAt` lo asigna el backend tras validar al proveedor. |
| Línea de pedido | Producto, variante, nombre, talla/color, precio unitario CLP al momento de compra y cantidad | Conservar una fotografía de la compra aunque cambie el catálogo. |
| Intento/evento de pago | Proveedor, ID externo, estado, monto y fecha de evento | Conciliar pagos y evitar procesar dos veces una misma notificación. |

Este esquema es conceptual. No se agregan datos de cliente ni despacho hasta definir qué información es necesaria para vender y enviar ropa. Nunca se guardan números de tarjeta ni códigos de seguridad.

## 3. Contrato HTTP propuesto

### `GET /api/products`

Devuelve solo artículos publicados. Hoy no hay registros; la respuesta debe ser `200` con `items: []` y la tienda debe mostrar el estado de colección en preparación, sin productos de ejemplo. El contrato final debe conservar los nombres y tipos definidos en `store/src/datos/producto.js`; la API no debe exponer `publicado: false`. Cuando exista catálogo, solo se publica disponibilidad sustentada por una fuente de inventario acordada y actualizada; dropshipping por sí solo no demuestra stock ni sincronización.

Forma de la respuesta, sin valores de catálogo reales:

```json
{
  "items": []
}
```

### Administración de productos (API futura)

La demo permite administrar productos solo en el navegador. En producción, la gestión debe pasar por rutas protegidas con sesión y rol de administrador:

| Ruta | Uso |
| --- | --- |
| `GET /api/admin/products` | Listar publicados, borradores y archivados para gestión. |
| `POST /api/admin/products` | Crear producto con `nombre`, `categoria`, `precioCLP`, imágenes y variantes. |
| `PATCH /api/admin/products/:id` | Editar los campos permitidos y publicar u ocultar. |
| `DELETE /api/admin/products/:id` | Archivar lógicamente el producto; conservar referencias usadas por pedidos anteriores. |

Todas requieren autenticación y autorización de administrador. El servidor valida precio entero positivo, variantes, SKUs únicos y campos permitidos; nunca acepta propiedades internas o totales de compra enviados por el cliente. Una modificación de precio rige para nuevos checkouts. Cada pedido conserva la fotografía del nombre, SKU, variante y precio comprado. El inventario escrito en el panel local no se convierte en stock confiable: la sincronización y reserva dependen de decidir primero la fuente de abastecimiento.

El modelo persistente del servidor debe guardar `archivedAt` como campo interno nullable para el archivado lógico. No se devuelve en el catálogo público; `GET /api/products` excluye productos archivados.

### `POST /api/checkout-sessions`

El navegador envía identificadores y unidades. No envía un total confiable ni credenciales de pago.

Validación propuesta: `items` debe ser una lista no vacía; cada línea debe tener `productId` y `variantSku` como texto, y `quantity` como entero mayor que cero. El backend confirma que el SKU pertenece al producto publicado y que existe disponibilidad suficiente. Si una variante aparece repetida en varias líneas, el servidor la consolida antes de comprobar y reservar stock.

Para que un doble clic o reintento de red no cree pedidos o cobros duplicados, cada intento deliberado de checkout lleva una clave única:

```http
Idempotency-Key: <uuid-del-intento>
```

Un reintento del mismo intento reutiliza la clave; un nuevo intento de compra usa otra. El backend registra la clave y una huella de la solicitud antes de iniciar la operación externa. Si la misma clave llega con otro contenido, la rechaza. La pasarela también debe recibir la clave idempotente que su propia documentación exija; esa protección no sustituye la de Dharma.

```json
{
  "items": [
    {
      "productId": "<id-producto>",
      "variantSku": "<sku-variante>",
      "quantity": 1
    }
  ]
}
```

El servidor carga los datos actuales, valida que la prenda esté publicada y tenga stock, calcula el importe, crea un pedido pendiente y solicita el checkout al proveedor elegido. Si se crea la sesión, la propuesta es responder `201 Created` con el ID interno y la URL de pago:

```json
{
  "orderId": "<id-pedido>",
  "checkoutUrl": "<url-proveedor>"
}
```

Estos cuerpos son ejemplos de forma; los valores entre `< >` son marcadores, no datos reales. El endpoint no debe habilitar ventas hasta que el precio de prendas y el costo total para el cliente estén definidos.

Errores propuestos para el checkout: `400 INVALID_REQUEST` para una solicitud mal formada, `409 STOCK_CHANGED` si cambió la disponibilidad, `422 ITEM_UNAVAILABLE` si el artículo o variante ya no se puede vender y `503 CHECKOUT_UNAVAILABLE` si el proveedor no responde. Se usa un formato estable para que la interfaz muestre el mensaje y conserve las líneas del carrito:

```json
{
  "error": {
    "code": "STOCK_CHANGED",
    "message": "La disponibilidad cambió. Revisa el carrito e inténtalo nuevamente."
  }
}
```

El `code` no depende del texto visible. La API nunca devuelve credenciales, stack traces ni respuestas internas del proveedor. El endpoint administrativo usa `401` si falta una sesión válida, `403` si la cuenta no tiene permiso y `400 INVALID_FILTER` ante fechas o filtros inválidos. Estas convenciones quedan como propuesta antes de integrar la interfaz.

La pasarela debe regresar al comprador a una pantalla de resultado de Dharma. Esa pantalla no puede afirmar que el pago fue aprobado por el hecho de recibir un query string o volver al navegador. En Mercado Pago Orders, el backend puede consultar la order con su Access Token y debe esperar el webhook antes de acciones irreversibles. En Webpay Plus, el backend confirma o consulta el `token_ws` con Transbank y valida `status` y `response_code`; el retorno del navegador no basta por sí solo. Los flujos y fuentes oficiales están resumidos en `PASARELAS-CHILE.md`.

La interfaz debe consultar un estado normalizado del pedido desde Dharma. El ID interno, por sí solo, no autoriza esa consulta; el diseño deberá usar una referencia de retorno aleatoria, de alcance mínimo y vinculada al pedido. Su formato, caducidad y consumo de un solo uso se definen al elegir la pasarela.

### `POST /api/payments/webhook`

Recibe eventos del proveedor. El backend comprueba la firma o mecanismo oficial de autenticidad, consulta el estado definitivo cuando corresponda y registra el evento de forma idempotente. Solo una confirmación válida puede marcar un pedido como pagado. Volver desde la página de pago no confirma por sí solo una venta.

### `GET /api/admin/sales?id=&from=&to=`

Requiere sesión de administrador validada en el servidor. Para este endpoint, “venta” significa pedido con pago confirmado; los pedidos pendientes, rechazados o vencidos no aparecen como ventas. Acepta ID exacto, rango de fechas o ambos y, para la primera versión, devuelve lo solicitado para el historial:

```json
{
  "items": [
    {
      "id": "<id-pedido>",
      "paidAt": "<fecha-hora-ISO-8601>"
    }
  ]
}
```

No hay ventas de ejemplo. La interfaz nunca obtiene todos los pedidos sin filtro/autorización.

La salida inicial del panel se limita a `id` y `paidAt`, como se pidió; no incluye cliente, dirección, monto ni medio de pago. El rango de fechas filtra por `paidAt`, no por creación del pedido.

**Propuesta de contrato de fechas, pendiente de confirmar antes de programar:** `from` y `to` reciben fechas `YYYY-MM-DD` en la zona `America/Santiago`. Cada límite es inclusivo como día calendario; el backend transforma el rango a instantes UTC usando el inicio local de `from` y el inicio del día siguiente a `to` como límite exclusivo. Se permite usar un límite solo o ambos; si vienen ambos, `from` no puede ser posterior a `to`. Si se combina `id` con fechas, se aplican todos los filtros. Debe existir al menos un filtro. Los resultados se ordenan por `paidAt` descendente. El `paidAt` de respuesta se entrega ISO 8601 en UTC y la interfaz lo muestra en formato local chileno.

## 4. Estados que debe mostrar la interfaz

- **Tienda:** diferencia carga, catálogo vacío y error. Solo `200` con `items: []` significa que no hay prendas publicadas; error de red/API ofrece reintentar y no presenta el catálogo como vacío.
- **Carrito:** diferencia vacío real, líneas guardadas, almacenamiento no disponible (`STORAGE_UNAVAILABLE`) y datos guardados inválidos (`CART_DATA_INVALID`). El cliente puede validar que la cantidad sea un entero positivo y conservar `productId`/`variantSku`, pero el stock guardado o recibido previamente es solo informativo: el servidor debe volver a validar disponibilidad y precio al iniciar checkout. Los dos errores se muestran como error, nunca como carrito vacío. No borra ni sobrescribe los datos automáticamente; el usuario puede pedir explícitamente vaciar el carrito para recuperarse. Ante error de red/API, stock cambiado o pago rechazado, no borra las líneas `productId`, `variantSku` y `quantity`. No trata precio o stock guardados por el navegador como autoridad.
- **Retorno del pago:** muestra pendiente hasta que Dharma consulte una confirmación válida. Solo al recibir estado `paid` desde el backend puede vaciarse el carrito; un error o retorno sin confirmar lo mantiene.
- **Administración:** una sesión ausente (`401`) no muestra ventas; una cuenta sin permiso (`403`) tampoco. Después de autenticarse, distingue carga, resultados, consulta vacía y error. No envía la búsqueda hasta tener al menos un filtro válido.

## 5. Estados del pedido propuestos

```text
pending_payment -> paid
pending_payment -> payment_failed
pending_payment -> expired
paid             -> refunded   (cuando exista flujo de reembolso)
```

Los nombres y transiciones se revisan al elegir la pasarela. El usuario no puede cambiar estos estados directamente desde el navegador.

La capa de pagos convierte estados del proveedor a estos estados de Dharma; el mapeo inicial está en `PASARELAS-CHILE.md`. `paidAt` se escribe en el servidor al validar por primera vez una transición a `paid` y no se reemplaza cuando se reintenta el mismo webhook. Solo los pedidos en `paid` aparecen en el endpoint del historial de ventas.

## 6. Reglas de seguridad

- Las credenciales privadas viven solo en el backend.
- El backend recalcula total y verifica stock al crear checkout.
- Cada intento de checkout y evento de webhook debe tolerar reintentos sin duplicar pedidos o cobros.
- Todas las rutas `/api/admin/*` requieren autenticación/autorización del lado servidor.
- Se recolectan y conservan solo datos necesarios para el alcance confirmado.
- No se abre la venta real hasta tener catálogo real, precios y total final de despacho claros.

## 7. Decisiones pendientes y momento en que se necesitan

### Opciones de framework para la API

Consulta de documentación oficial realizada el 12 de noviembre de 2026. El entorno local usa Node.js `v24.14.1` y el proyecto declara módulos ES (`"type": "module"`); el runtime de producción todavía no se ha elegido.

| Opción | Requisito y aporte confirmado | Ajuste para Dharma |
| --- | --- | --- |
| Express 5 | Requiere Node.js 18 o superior y ofrece el modelo de rutas y middleware de Express. [Soporte de versiones](https://expressjs.com/en/support/) | Familiar para aprender; hay que escoger y configurar aparte la validación de esquemas para checkout y filtros administrativos. |
| Fastify 5 | Requiere Node.js 20 o superior. Admite esquemas JSON para validar solicitudes y serializar respuestas mediante Ajv y `fast-json-stringify`. [Migración a v5](https://fastify.dev/docs/latest/Guides/Migration-Guide-V5/) · [Validación y serialización](https://fastify.dev/docs/v5.8.x/Reference/Validation-and-Serialization/) | Encaja bien con los contratos de checkout y administración; los esquemas deben definirse como código confiable y las reglas de autenticación siguen siendo responsabilidad de la aplicación. |
| Hono 5 | Su guía de Node usa `@hono/node-server`; la migración a Hono 5 requiere Node.js 22.12 o superior y el paquete es ESM. [Guía para Node.js](https://hono.dev/docs/getting-started/nodejs) · [Migración a v5](https://hono.dev/docs/guides/migrating-to-v5) | Tiene sentido si se prioriza reutilizar una API basada en Web Standards entre runtimes; añade un adaptador Node y no evita definir validación y permisos. |

**Recomendación técnica pendiente de aprobación:** Fastify 5. Es una inferencia basada en los endpoints ya propuestos: checkout, filtros de ventas y respuestas necesitan validación explícita, y Fastify integra el patrón de esquemas JSON. Node.js local cumple su requisito mínimo, pero se debe fijar una versión compatible también en el alojamiento antes de crear y desplegar `api/`. Ninguna de estas opciones, por sí sola, protege el panel ni configura pagos seguros.

| Decisión | Se necesita antes de | Se puede diferir hasta |
| --- | --- | --- |
| Elegir framework, base de datos y alojamiento | Crear y desplegar la API base. | La demo frontend puede seguir evolucionando; estas decisiones se requieren para implementar el servidor. |
| Modo invitado o cuenta de comprador | Diseñar qué datos pide checkout y cómo se consulta un pedido. | Antes de conectar el checkout con compradores reales. |
| Proveedor de pago y afiliación de Dharma | Implementar el adaptador de pagos, webhook, idempotencia específica y retorno. | Antes de programar el flujo de cobro; la API pública y la interfaz pueden prepararse sin proveedor. |
| Autenticación y recuperación del administrador | Exponer consultas de ventas reales. | Antes de conectar o publicar datos de ventas; una pantalla vacía puede seguir preparándose. |
| Formato, zona y combinación de fechas del panel | Implementar `GET /api/admin/sales`. | Antes de ese endpoint; la vista vacía no depende de esta decisión. La propuesta está arriba. |
| Referencia segura y caducidad para el retorno del comprador | Implementar consulta pública del estado de un pedido. | Antes de conectar el retorno al pago; se define junto al proveedor. |
| Códigos/forma de error del checkout | Conectar la interfaz del carrito a la API. | Antes de esa integración; la propuesta establece códigos estables y el carrito se conserva ante cualquier error. |
| Modelo de abastecimiento (dropshipping temporal o producción/stock propio) | Definir la fuente de inventario, disponibilidad real, plazos y responsabilidades de despacho. | Antes de prometer stock o plazos y de habilitar ventas reales; el storefront y el carrito pueden avanzar sin esa decisión. |
| Datos reales de prendas, variantes, stock y `precioCLP` | Publicar el catálogo y aceptar compras. | Hasta que Dharma apruebe la colección y los precios. No crear productos de ejemplo. |
| Datos de comprador, despacho y costo final | Mostrar el total definitivo y habilitar ventas reales. | Hasta que se definan las formas de envío; no se capturan datos personales innecesarios. |

Estas decisiones no impiden preparar la demo frontend. Sí son requisitos previos para las integraciones de producción señaladas y para cualquier venta real. La implementación de la demo está autorizada; este documento sigue siendo una propuesta técnica y no confirma proveedor de pago, abastecimiento, inventario, base de datos ni alojamiento.
