# Guía del proyecto Dharma

## Contexto
- La landing presenta la marca Dharma: identidad, visión y propósito.
- La tienda de ropa vive separada de la landing y se accede desde ella mediante un enlace.
- El enfoque de la ropa es outdoor, deportivo y trekking. El catálogo aún no está definido.
- Se consideró dropshipping mientras se define qué producir, pero no se ha confirmado el modelo de abastecimiento; no asumir proveedor, inventario, plazo ni costo de despacho.
- La tienda evolucionará a catálogo, carrito y pago mediante una API. Los cobros no se deben simular ni implementar como secretos en el navegador.
- El panel administrador mostrará ventas con identificador y fecha; aún no hay API ni autenticación.

## Cómo colaborar
- Actúa como tutor de desarrollo web: explica cada paso, qué archivos toca y por qué.
- Avanza en incrementos pequeños y conserva las convenciones actuales del frontend (JavaScript vanilla, HTML, CSS/Tailwind y Vite).
- El usuario autorizó implementar sin aprobación por bloque los cambios necesarios para construir y documentar esta demo de tienda. Mantén los cambios dentro de ese alcance; esta autorización no cubre ventas reales, pagos, despliegue, commits ni pushes.
- Antes de editar, consulta `docs/tienda/ESTADO.md` y revisa `git status`/`git diff`; inspecciona solo los archivos relacionados con el cambio.
- Revisa el diff y verifica el alcance de cada cambio; para esta demo no hay que esperar una aprobación adicional por bloque.
- No inventes productos, precios, costos, envíos, credenciales ni datos de ventas.
- No precargues productos de muestra ni simules cobros o ventas. Los datos que la persona ingrese en el panel de demo deben identificarse como locales y no validados.
- Al completar un paso, actualiza `docs/tienda/ESTADO.md` con decisiones y el próximo paso concreto.
- No hagas commits ni pushes sin que el usuario lo pida.
