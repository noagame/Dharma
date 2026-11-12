# Comparación inicial de pasarelas para Chile

**Consultado:** 12 de noviembre de 2026

**Alcance:** Checkout alojado y cobro online para una tienda propia. Esta comparación no crea una cuenta comercial ni selecciona un proveedor por Dharma.

## Resumen

Las dos opciones evaluadas cumplen el requisito de iniciar el cobro desde una API del servidor y derivar al comprador a un checkout del proveedor. La elección depende de la afiliación de Dharma, medios de pago deseados, comisión real ofrecida, tiempos de abono y experiencia de soporte. Esos datos se deben confirmar en las cuentas comerciales antes de comprometerse.

## Comparación

| Aspecto | Mercado Pago Checkout Pro (Orders API) | Transbank Webpay Plus |
| --- | --- | --- |
| Checkout | El servidor crea una order y recibe `checkout_url`; el comprador paga en el entorno de Mercado Pago y vuelve a la tienda. Permite pagar como invitado. [Overview](https://www.mercadopago.cl/developers/es/docs/checkout-pro-orders/overview?scope=prod) | El comercio crea una transacción y redirige al formulario de Webpay Plus. Después recibe el token y confirma la transacción desde el comercio. [Documentación](https://transbankdevelopers.com/documentacion/webpay-plus) |
| Medios indicados por el proveedor | Tarjetas de crédito, débito, prepago, transferencia bancaria y saldo de Mercado Pago para Checkout Pro. [Checkout](https://www.mercadopago.cl/herramientas-para-vender/check-out) | Tarjetas de crédito, débito y prepago. [Webpay Plus](https://publico.transbank.cl/es/productos-y-servicios/soluciones-para-ventas-internet/webpay-plus) |
| Confirmación de pago | Webhooks HTTPS; la documentación del producto describe firma secreta para validar el origen. Debe procesarse el evento en backend y protegerse contra duplicados. [Webhooks](https://www.mercadopago.cl/developers/es/docs/checkout-pro-orders/notifications?scope=prod) | La documentación describe el retorno con token y la operación server-side de confirmación; el código de respuesta debe indicar aprobación antes de marcar el pedido pagado. [Flujo Webpay Plus](https://transbankdevelopers.com/documentacion/webpay-plus) |
| Idempotencia | La creación de una order requiere `X-Idempotency-Key` único por intento. [Crear order](https://www.mercadopago.cl/developers/es/docs/checkout-pro-orders/create-order?scope=prod) | El comercio debe generar órdenes de compra únicas y controlar reintentos/confirmaciones en su propia aplicación; seguir el SDK/API oficial vigente. [Documentación](https://transbankdevelopers.com/documentacion/webpay-plus) |
| Comisión publicada | La página consultada publica 3,19% + IVA con disponibilidad al instante y 2,89% + IVA con disponibilidad en 10 días; muestra tasas reducidas para cuentas nuevas. La oferta visible no reemplaza una cotización para la cuenta de Dharma. [Tarifas](https://www.mercadopago.cl/herramientas-para-vender/check-out) | Transbank indica que no cobra mensualidad fija por Webpay Plus y que aplica comisión por transacción. El monto depende del negocio y debe calcularse con su simulador o la tarifa de la cuenta. No se inventa un porcentaje aquí. [Webpay Plus](https://publico.transbank.cl/es/productos-y-servicios/soluciones-para-ventas-internet/webpay-plus), [tarifas](https://publico.transbank.cl/es/web/centro-de-ayuda/tarifas-y-comisiones) |
| Abono publicado | La disponibilidad depende de la modalidad elegida. Confirmar los plazos y condiciones que muestre la cuenta de Dharma antes de contratar. [Tarifas](https://www.mercadopago.cl/herramientas-para-vender/check-out) | La página de producto indica abono en 24 horas hábiles para débito/prepago y 48 horas hábiles para crédito. Verificar condiciones vigentes de afiliación. [Webpay Plus](https://publico.transbank.cl/es/productos-y-servicios/soluciones-para-ventas-internet/webpay-plus) |
| Consideraciones de alta | Requiere cuenta de vendedor, aplicación y configuración de ambiente; la documentación lista el certificado SSL para producción. [Overview](https://www.mercadopago.cl/developers/es/docs/checkout-pro-orders/overview?scope=prod) | Se debe solicitar/activar Webpay Plus para el comercio y completar la validación de la integración indicada por Transbank. [Solicitud](https://ayuda.transbank.cl/ya-soy-cliente-transbank-como-solicito-webpay-plus), [activación](https://ayuda.transbank.cl/activar-webpay-plus) |

## Lectura para Dharma

- **Mercado Pago Checkout Pro** es un candidato para un primer prototipo porque su flujo publicado crea la order en servidor y entrega una URL alojada de checkout; además permite invitado y publica varios medios de pago. La comisión y disponibilidad exactas se deben verificar en la cuenta de Dharma.
- **Webpay Plus** es un candidato si Dharma prioriza la aceptación de tarjetas en una pasarela chilena conocida y su liquidación local. Transbank no publica un porcentaje único aplicable a todos: debe consultarse el simulador o la tarifa particular del comercio.
- **No se selecciona un ganador en este documento.** Primero hay que confirmar que Dharma puede afiliarse, comparar la comisión y el abono reales, revisar reembolsos/contracargos y comprobar la operación de prueba.
- La API de Dharma debe esconder los detalles del proveedor detrás de un servicio de pagos. El frontend solicita iniciar checkout y recibe una URL; nunca recibe el secreto de servidor ni define el total final.

## Recomendación de prueba

1. Crear cuenta/aplicación de prueba de cada opción sin procesar cobros reales.
2. Probar inicio de checkout, cancelación, pago aprobado/rechazado y notificación repetida.
3. Medir cuánto código y configuración exige cada integración en el backend elegido.
4. Solicitar o revisar la tarifa exacta, plazo de abono, condiciones de afiliación y soporte para Dharma.
5. Elegir después de revisar los resultados con el usuario; pasar a producción solo tras la validación del comercio.

## Retorno del checkout y confirmación del pedido

| Proveedor | Qué vuelve al comercio | Validación del backend |
| --- | --- | --- |
| Mercado Pago Checkout Pro con Orders API | Las URLs `success`, `failure` y `pending` configuradas en la order pueden recibir al comprador con parámetros GET. Esos parámetros ayudan a mostrar una pantalla, pero no son una confirmación confiable por sí solos. | El servidor consulta la order con su Access Token y procesa el webhook autenticado. La documentación indica esperar la notificación de order antes de acciones irreversibles. [Crear una order](https://www.mercadopago.cl/developers/es/docs/checkout-pro-orders/create-order?scope=prod), [URLs de retorno](https://www.mercadopago.cl/developers/es/docs/checkout-pro-orders/web-integration/configure-back-urls?scope=prod), [estado y webhooks](https://www.mercadopago.cl/developers/es/docs/checkout-pro-orders/payment-management/status/order-status) |
| Transbank Webpay Plus | En el flujo normal, Transbank devuelve el `token_ws` a la URL de retorno. Si la persona aborta el pago, el flujo entrega `TBK_TOKEN` y otros identificadores de sesión/orden. | El servidor procesa el token con el método oficial de confirmación/consulta y solo trata como aprobada la respuesta con `status = AUTHORIZED` y `response_code = 0`. El retorno por sí solo no marca la venta como pagada. [Flujo Webpay Plus](https://transbankdevelopers.com/documentacion/webpay-plus) |

Para Dharma, la página de retorno debe mostrar un estado normalizado (`pendiente`, `pagado` o `fallido`) obtenido desde el backend. El identificador interno del pedido no debe bastar como autorización para consultarlo: se debe usar una referencia de retorno aleatoria y de alcance mínimo, o un mecanismo equivalente del proveedor. La implementación exacta depende de la pasarela elegida. No se exponen tokens de proveedor en la interfaz ni datos de cliente en esta consulta.

Normalización inicial para el dominio de Dharma:

- **Mercado Pago:** `created` y `action_required` no son una venta; se mantienen pendientes. `processed` con detalle `accredited` se normaliza a pagado. `failed` no es venta y `canceled` puede normalizarse como vencido/cancelado. Un reembolso total se registra después como reembolsado; los reembolsos parciales quedan fuera de la primera versión. [Estados de Orders](https://www.mercadopago.cl/developers/es/docs/checkout-pro-orders/payment-management/status/order-status)
- **Transbank:** solo se normaliza como pagado cuando la confirmación del servidor devuelve `status = AUTHORIZED` y `response_code = 0`. El rechazo, aborto o timeout se registra según el resultado oficial consultado; no se infiere desde la URL de retorno. [Flujo Webpay Plus](https://transbankdevelopers.com/documentacion/webpay-plus)

Este mapeo es una propuesta independiente del proveedor. La API conserva los estados propios de Dharma y mantiene los detalles originales del pago para conciliación; no expone esos detalles en la lista mínima del panel.

## Notas de vigencia

Las comisiones, condiciones comerciales, disponibilidad de medios de pago y pasos de afiliación pueden cambiar. Los datos de precio anteriores son los publicados por el proveedor en la fecha de consulta; confirmar nuevamente antes de contratar o vender. Esta comparación no es asesoría contable, legal ni financiera.
