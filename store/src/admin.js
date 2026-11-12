import './tienda.css'
import {
  eliminarProductoDemo,
  ErrorProductosDemo,
  guardarProductoDemo,
  listarProductosDemo,
} from './servicios/productos-demo.js'
import { paginaAdministracion } from './paginas/administracion.js'

const app = document.querySelector('#app')
app.innerHTML = paginaAdministracion()

const formulario = app.querySelector('[data-product-form]')
const listaVariantes = app.querySelector('[data-variant-list]')
const estadoFormulario = app.querySelector('[data-form-status]')
const listaProductos = app.querySelector('[data-admin-product-list]')
const estadoProductos = app.querySelector('[data-admin-product-status]')
const botonGuardar = app.querySelector('[data-save-product]')
const botonCancelar = app.querySelector('[data-cancel-edit]')

function elemento(tag, clase, texto) {
  const nodo = document.createElement(tag)
  if (clase) nodo.className = clase
  if (texto !== undefined) nodo.textContent = texto
  return nodo
}

function crearFilaVariante(variante = {}) {
  const fila = elemento('div', 'variant-row')
  fila.innerHTML = `
    <label class="field-label">SKU
      <input class="store-input" name="sku" required maxlength="60" autocomplete="off" />
    </label>
    <label class="field-label">Talla
      <input class="store-input" name="talla" required maxlength="30" autocomplete="off" />
    </label>
    <label class="field-label">Color
      <input class="store-input" name="color" required maxlength="40" autocomplete="off" />
    </label>
    <label class="field-label">Unidades indicadas para demo
      <input class="store-input" name="unidadesDisponibles" type="number" min="0" step="1" required inputmode="numeric" />
    </label>
    <button class="text-button remove-variant" type="button">Quitar variante</button>
  `

  fila.querySelector('[name="sku"]').value = variante.sku ?? ''
  fila.querySelector('[name="talla"]').value = variante.talla ?? ''
  fila.querySelector('[name="color"]').value = variante.color ?? ''
  fila.querySelector('[name="unidadesDisponibles"]').value =
    variante.unidadesDisponibles ?? ''

  fila.querySelector('.remove-variant').addEventListener('click', () => {
    if (listaVariantes.children.length > 1) fila.remove()
    actualizarQuitarVariantes()
  })

  listaVariantes.append(fila)
  actualizarQuitarVariantes()
}

function actualizarQuitarVariantes() {
  const filas = [...listaVariantes.querySelectorAll('.variant-row')]
  for (const fila of filas) {
    fila.querySelector('.remove-variant').disabled = filas.length === 1
  }
}

function limpiarFormulario() {
  formulario.reset()
  formulario.elements.id.value = ''
  listaVariantes.replaceChildren()
  crearFilaVariante()
  estadoFormulario.textContent = ''
  botonGuardar.textContent = 'Guardar producto'
  botonCancelar.hidden = true
}

function mostrarError(error) {
  estadoFormulario.textContent =
    error instanceof ErrorProductosDemo
      ? error.message
      : 'No se pudo guardar. Revisa los datos e inténtalo nuevamente.'
}

function renderProductos() {
  listaProductos.replaceChildren()

  let productos
  try {
    productos = listarProductosDemo()
  } catch (error) {
    estadoProductos.textContent =
      error.message || 'No se pudieron leer los productos de esta demo.'
    return
  }

  if (productos.length === 0) {
    estadoProductos.textContent = 'Aún no hay productos ingresados en este navegador.'
    return
  }

  estadoProductos.textContent = `${productos.length} producto${productos.length === 1 ? '' : 's'} en el catálogo local.`

  for (const producto of productos) {
    const tarjeta = elemento('article', 'admin-product-card')
    const encabezado = elemento('div', 'admin-product-heading')
    const titulo = elemento('h3', 'product-name', producto.nombre)
    const publicacion = elemento(
      'span',
      producto.publicado ? 'status-pill status-pill--published' : 'status-pill',
      producto.publicado ? 'Publicado en demo' : 'Borrador'
    )
    const categoria = elemento('p', 'admin-product-meta', producto.categoria)
    const precio = elemento(
      'p',
      'admin-product-meta',
      `Precio ingresado: ${new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
      }).format(producto.precioCLP)}`
    )
    const variantes = elemento('ul', 'admin-variant-summary')

    for (const variante of producto.variantes) {
      variantes.append(
        elemento(
          'li',
          '',
          `${variante.talla} · ${variante.color} · SKU ${variante.sku} · ${variante.unidadesDisponibles} unidades indicadas`
        )
      )
    }

    const acciones = elemento('div', 'admin-card-actions')
    const editar = elemento('button', 'text-button', 'Editar')
    editar.type = 'button'
    editar.addEventListener('click', () => cargarEdicion(producto))

    const publicar = elemento(
      'button',
      'text-button',
      producto.publicado ? 'Ocultar en demo' : 'Publicar en demo'
    )
    publicar.type = 'button'
    publicar.addEventListener('click', () => {
      try {
        guardarProductoDemo({ ...producto, publicado: !producto.publicado })
        estadoFormulario.textContent = 'Estado del producto actualizado.'
        renderProductos()
      } catch (error) {
        estadoFormulario.textContent = error.message
      }
    })

    const eliminar = elemento('button', 'text-button text-button--danger', 'Eliminar')
    eliminar.type = 'button'
    eliminar.addEventListener('click', () => {
      if (!window.confirm(`¿Eliminar “${producto.nombre}” de este navegador?`)) return
      try {
        eliminarProductoDemo(producto.id)
        if (formulario.elements.id.value === producto.id) limpiarFormulario()
        estadoFormulario.textContent = 'Producto eliminado de esta demo.'
        renderProductos()
      } catch (error) {
        estadoFormulario.textContent = error.message
      }
    })

    encabezado.append(titulo, publicacion)
    acciones.append(editar, publicar, eliminar)
    tarjeta.append(encabezado, categoria, precio, variantes, acciones)
    listaProductos.append(tarjeta)
  }
}

function cargarEdicion(producto) {
  formulario.elements.id.value = producto.id
  formulario.elements.nombre.value = producto.nombre
  formulario.elements.categoria.value = producto.categoria
  formulario.elements.precioCLP.value = String(producto.precioCLP)
  formulario.elements.publicado.checked = producto.publicado
  listaVariantes.replaceChildren()
  for (const variante of producto.variantes) crearFilaVariante(variante)
  botonGuardar.textContent = 'Guardar cambios'
  botonCancelar.hidden = false
  estadoFormulario.textContent = `Editando ${producto.nombre}.`
  formulario.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

app.querySelector('[data-add-variant]').addEventListener('click', () => {
  crearFilaVariante()
})

botonCancelar.addEventListener('click', limpiarFormulario)

formulario.addEventListener('submit', (event) => {
  event.preventDefault()

  const variantes = [...listaVariantes.querySelectorAll('.variant-row')].map(
    (fila) => ({
      sku: fila.querySelector('[name="sku"]').value.trim(),
      talla: fila.querySelector('[name="talla"]').value.trim(),
      color: fila.querySelector('[name="color"]').value.trim(),
      unidadesDisponibles: Number(
        fila.querySelector('[name="unidadesDisponibles"]').value
      ),
    })
  )

  const producto = {
    id: formulario.elements.id.value || crypto.randomUUID(),
    nombre: formulario.elements.nombre.value.trim(),
    categoria: formulario.elements.categoria.value,
    precioCLP: Number(formulario.elements.precioCLP.value),
    imagenes: [],
    variantes,
    publicado: formulario.elements.publicado.checked,
  }

  try {
    guardarProductoDemo(producto)
    estadoFormulario.textContent = 'Producto guardado en este navegador.'
    limpiarFormulario()
    estadoFormulario.textContent = 'Producto guardado en este navegador.'
    renderProductos()
  } catch (error) {
    mostrarError(error)
  }
})

crearFilaVariante()
renderProductos()
