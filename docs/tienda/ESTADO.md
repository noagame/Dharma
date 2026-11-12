# Estado de la tienda Dharma

## Objetivo

Desarrollar una tienda de ropa separada de la landing de Dharma, con catálogo, carrito, cobro delegado a una API y panel administrador. La primera versión administrativa de producción debe consultar ventas pagadas por identificador y fecha. El enfoque de ropa previsto es outdoor, deportivo y trekking.

## Decisiones y datos confirmados

- La landing presenta la marca; la tienda está en `/store/`.
- Se consideró dropshipping mientras se define la colección, pero el abastecimiento no está confirmado.
- No hay productos, precios, costos, despacho, proveedor de pago ni ventas reales ingresados o aprobados.
- No se precargan artículos, inventario ni ventas inventados.
- El usuario autorizó los cambios necesarios para preparar esta demo sin aprobación por bloque. Esto no habilita cobros reales, despliegue, publicación segura ni commits.

## Demo implementada

- La raíz Git es `/home/fabian/proyecto-personal/front/`; el frontend usa Vite, JavaScript vanilla y Tailwind CSS 4.
- Landing: `index.html` y `src/`; enlaza la tienda.
- Tienda `/store/`: catálogo inicialmente vacío; muestra productos publicados ingresados en el panel, variantes, precio, suma de unidades en el carrito y subtotal referencial sin despacho. Permite cambiar cantidades, quitar artículos y vaciar el carrito.
- Panel `/store/admin/`: permite crear y editar productos con múltiples variantes, publicarlos u ocultarlos y eliminarlos. Un producto requiere nombre, categoría, precio de venta CLP y al menos una variante con SKU, talla, color y unidades declaradas para demo.
- `store/src/servicios/productos-demo.js` valida y guarda catálogo en `localStorage` bajo `dharma:productos:v1`. `store/src/servicios/carrito.js` guarda solo ID, SKU de variante y cantidad bajo `dharma:carrito:v1`.
- No hay productos precargados. Las pruebas del flujo usaron productos temporales de QA; se borraron y el carrito se vació al terminar.
- Catálogo y carrito solo existen en el mismo navegador, perfil y origen. No hay API, base de datos, sincronización o autenticación. Los valores de disponibilidad declarados no son inventario real.
- El cobro está desactivado y no genera pedidos ni ventas. El historial está vacío y requiere API y acceso protegido.
- El formulario no incluye imágenes, costo de producto, despacho ni sincronización de inventario. Los productos ingresados sirven para una demostración local.
- `README.md` explica ejecución, rutas, guía de alta/edición, límites, recuperación y arquitectura.

## Documentación técnica

- El plan PDF está en `output/pdf/plan-desarrollo-tienda-dharma.pdf`, 13 páginas; su anexo final separa la demo local de los requisitos para producción.
- `docs/tienda/API-DATOS.md` contiene el contrato futuro de catálogo, administración de productos, checkout, pagos, webhook e historial. Aún no hay backend ni base de datos.
- `docs/tienda/PASARELAS-CHILE.md` compara Mercado Pago Checkout Pro y Transbank Webpay Plus; no hay proveedor seleccionado.
- Fastify 5 es una recomendación técnica documentada, no una decisión aprobada ni dependencia instalada.

## Verificación de la demo

- `pnpm build` compiló landing, tienda y administración; la suite `pnpm test` no se ejecutó en esta revisión. Las pruebas existentes solo cubren componentes de la landing.
- El navegador recorrió alta de producto con varias variantes, edición, publicación/ocultamiento, visualización en tienda, agregar al carrito, cambio de cantidad y borrado. Los datos temporales se eliminaron al final.
- A 320 px, tienda y panel tienen `documentWidth=320`; la landing tampoco se desborda. El contacto mide 240 px y el botón de WhatsApp ocupa una línea. Se revisaron además 360, 375, 390 y 430 px sin desbordamiento horizontal.
- Capturas: `output/playwright/tienda-demo-vacia.png`, `output/playwright/panel-admin-demo.png` y `output/playwright/contacto-movil-320.png`.

## Próximos pasos para producción

1. Confirmar la colección, precios, variantes, abastecimiento y una fuente de inventario confiable.
2. Definir despacho, costos para el comprador, proveedor de pago, framework, base de datos y alojamiento.
3. Implementar API y persistencia de catálogo/pedidos; el servidor debe validar precios e inventario en checkout y confirmar pagos mediante webhook.
4. Añadir autenticación y autorización, además de rutas protegidas de gestión de productos. La propuesta incluye `GET/POST /api/admin/products`, `PATCH /api/admin/products/:id` y archivado lógico.
5. Conectar el historial del panel con `/api/admin/sales?id=&from=&to=`; mostrar solo el ID y fecha de pago confirmada.
6. Probar errores, seguridad y operación antes de habilitar cualquier compra real.

## Límites

- `localStorage` es para demo, no para operar catálogo o stock real.
- El panel demo no está protegido; no usarlo para datos de clientes ni publicarlo como panel real.
- Nunca guardar credenciales de pago en el navegador.
- No aceptar compras reales hasta tener precio final y despacho definidos, inventario validado por servidor y confirmación de pago verificada.
