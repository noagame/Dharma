import './tienda.css'
import {
  actualizarCantidad,
  agregarItem,
  obtenerCarrito,
  quitarItem,
  vaciarCarrito,
} from './servicios/carrito.js'
import { listarProductosDemo } from './servicios/productos-demo.js'
import { paginaTienda } from './paginas/tienda.js'

const app = document.querySelector('#app')
app.innerHTML = paginaTienda()

const listaProductos = app.querySelector('[data-product-list]')
const estadoCatalogo = app.querySelector('[data-catalog-status]')
const contadorCarrito = app.querySelector('[data-cart-count]')
const enlaceCarrito = app.querySelector('[data-cart]')
const estadoCarrito = app.querySelector('[data-cart-status]')
const listaCarrito = app.querySelector('[data-cart-items]')
const resumenCarrito = app.querySelector('[data-cart-summary]')
const subtotalCarrito = app.querySelector('[data-cart-subtotal]')
const botonVaciar = app.querySelector('[data-clear-cart]')

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function elemento(tag, clase, texto) {
  const nodo = document.createElement(tag)
  if (clase) nodo.className = clase
  if (texto !== undefined) nodo.textContent = texto
  return nodo
}

function renderCatalogo() {
  listaProductos.replaceChildren()

  let productos
  try {
    productos = listarProductosDemo().filter((producto) => producto.publicado)
  } catch (error) {
    estadoCatalogo.textContent =
      error.message || 'No se pudo leer el catálogo de esta demo.'
    contadorCarrito.textContent = '—'
    enlaceCarrito.setAttribute('aria-label', 'Carrito no disponible')
    return
  }

  if (productos.length === 0) {
    estadoCatalogo.textContent =
      'El catálogo está vacío. Cuando la colección esté definida, podrás agregar aquí los productos aprobados.'
    return
  }

  estadoCatalogo.textContent = 'Productos cargados para esta demo.'

  for (const producto of productos) {
    const tarjeta = elemento('article', 'product-card')
    const categoria = elemento('p', 'product-category', producto.categoria)
    const nombre = elemento('h3', 'product-name', producto.nombre)
    const precio = elemento(
      'p',
      'product-price',
      formatoCLP.format(producto.precioCLP)
    )
    const formulario = elemento('div', 'product-controls')
    const etiqueta = elemento('label', 'field-label', 'Talla y color')
    const selector = document.createElement('select')
    selector.className = 'store-select'

    for (const variante of producto.variantes) {
      const opcion = document.createElement('option')
      opcion.value = variante.sku
      opcion.textContent = `${variante.talla} · ${variante.color}`
      opcion.dataset.unidades = String(variante.unidadesDisponibles)
      selector.append(opcion)
    }

    etiqueta.append(selector)
    const disponibilidad = elemento('p', 'product-stock')
    const botonAgregar = elemento('button', 'store-button', 'Agregar al carrito')
    botonAgregar.type = 'button'

    function actualizarDisponibilidad() {
      const unidades = Number(selector.selectedOptions[0]?.dataset.unidades ?? 0)
      disponibilidad.textContent = `Disponibilidad indicada para la demo: ${unidades}`
      botonAgregar.disabled = unidades < 1
    }

    selector.addEventListener('change', actualizarDisponibilidad)
    botonAgregar.addEventListener('click', () => {
      try {
        agregarItem({
          productId: producto.id,
          variantSku: selector.value,
          quantity: 1,
        })
        estadoCarrito.textContent = 'Producto agregado al carrito de esta demo.'
        renderCarrito()
      } catch (error) {
        estadoCarrito.textContent =
          error.message || 'No se pudo actualizar el carrito.'
        contadorCarrito.textContent = '—'
        enlaceCarrito.setAttribute('aria-label', 'Carrito no disponible')
      }
    })

    actualizarDisponibilidad()
    formulario.append(etiqueta, disponibilidad, botonAgregar)
    tarjeta.append(categoria, nombre, precio, formulario)
    listaProductos.append(tarjeta)
  }
}

function renderCarrito() {
  listaCarrito.replaceChildren()
  resumenCarrito.hidden = true

  let lineas
  let productos
  try {
    lineas = obtenerCarrito()
    productos = listarProductosDemo()
  } catch (error) {
    estadoCarrito.textContent =
      error.message || 'No se pudo leer el carrito de esta demo.'
    contadorCarrito.textContent = '—'
    enlaceCarrito.setAttribute('aria-label', 'Carrito no disponible')
    return
  }

  const unidadesEnCarrito = lineas.reduce(
    (total, linea) => total + linea.quantity,
    0
  )
  contadorCarrito.textContent = String(unidadesEnCarrito)
  enlaceCarrito.setAttribute(
    'aria-label',
    unidadesEnCarrito === 0
      ? 'Carrito vacío'
      : `Carrito con ${unidadesEnCarrito} ${unidadesEnCarrito === 1 ? 'unidad' : 'unidades'}`
  )

  if (lineas.length === 0) {
    estadoCarrito.textContent = 'Tu carrito está vacío.'
    return
  }

  estadoCarrito.textContent = 'Artículos guardados en este navegador.'
  resumenCarrito.hidden = false
  let subtotal = 0
  let tieneLineasNoDisponibles = false

  for (const linea of lineas) {
    const producto = productos.find((item) => item.id === linea.productId)
    const variante = producto?.variantes.find(
      (item) => item.sku === linea.variantSku
    )
    const productoDisponible = Boolean(producto?.publicado && variante)
    const articulo = elemento('article', 'cart-line')
    const detalles = elemento('div', 'cart-line-details')
    const nombre = elemento(
      'h3',
      'cart-line-name',
      productoDisponible ? producto.nombre : 'Producto no disponible'
    )
    const descripcion = elemento(
      'p',
      'cart-line-variant',
      productoDisponible
        ? `${variante.talla} · ${variante.color} · SKU ${variante.sku}`
        : 'El producto o la variante ya no están publicados en el catálogo.'
    )
    const precioLinea = productoDisponible
      ? producto.precioCLP * linea.quantity
      : null

    if (precioLinea !== null) subtotal += precioLinea
    else tieneLineasNoDisponibles = true

    const precio = elemento(
      'p',
      'cart-line-price',
      precioLinea === null
        ? 'Precio no disponible'
        : formatoCLP.format(precioLinea)
    )
    const acciones = elemento('div', 'cart-line-actions')
    const etiquetaCantidad = elemento('label', 'field-label', 'Cantidad')
    const cantidad = document.createElement('input')
    cantidad.className = 'store-input quantity-input'
    cantidad.type = 'number'
    cantidad.min = '1'
    cantidad.step = '1'
    cantidad.value = String(linea.quantity)
    cantidad.setAttribute(
      'aria-label',
      `Cantidad de ${producto?.nombre ?? 'producto no disponible'}`
    )
    etiquetaCantidad.append(cantidad)

    cantidad.addEventListener('change', () => {
      const nuevaCantidad = Number(cantidad.value)
      try {
        actualizarCantidad(linea.productId, linea.variantSku, nuevaCantidad)
        renderCarrito()
      } catch (error) {
        estadoCarrito.textContent =
          error.message || 'No se pudo cambiar la cantidad.'
        cantidad.value = String(linea.quantity)
      }
    })

    const botonQuitar = elemento('button', 'text-button', 'Quitar')
    botonQuitar.type = 'button'
    botonQuitar.addEventListener('click', () => {
      try {
        quitarItem(linea.productId, linea.variantSku)
        renderCarrito()
      } catch (error) {
        estadoCarrito.textContent =
          error.message || 'No se pudo quitar el artículo.'
      }
    })

    detalles.append(nombre, descripcion, precio)
    acciones.append(etiquetaCantidad, botonQuitar)
    articulo.append(detalles, acciones)
    listaCarrito.append(articulo)
  }

  subtotalCarrito.textContent = formatoCLP.format(subtotal)
  if (tieneLineasNoDisponibles) {
    estadoCarrito.textContent =
      'Hay artículos que ya no están publicados. Quítalos para actualizar el carrito.'
  }
}

botonVaciar.addEventListener('click', () => {
  try {
    vaciarCarrito()
    renderCarrito()
  } catch (error) {
    estadoCarrito.textContent =
      error.message || 'No se pudo vaciar el carrito.'
  }
})

renderCatalogo()
renderCarrito()
