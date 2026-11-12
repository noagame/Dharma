const CLAVE_STORAGE = 'dharma:carrito:v1'

export class ErrorCarrito extends Error {
  constructor(codigo, mensaje) {
    super(mensaje)
    this.name = 'ErrorCarrito'
    this.codigo = codigo
  }
}

function obtenerStorage() {
  try {
    return window.localStorage
  } catch {
    throw new ErrorCarrito(
      'STORAGE_UNAVAILABLE',
      'El almacenamiento local no está disponible.'
    )
  }
}

function validarLinea(linea) {
  return (
    linea !== null &&
    typeof linea === 'object' &&
    typeof linea.productId === 'string' &&
    linea.productId.trim() !== '' &&
    typeof linea.variantSku === 'string' &&
    linea.variantSku.trim() !== '' &&
    Number.isSafeInteger(linea.quantity) &&
    linea.quantity > 0
  )
}

function leerLineas() {
  let contenido

  try {
    contenido = obtenerStorage().getItem(CLAVE_STORAGE)
  } catch (error) {
    if (error instanceof ErrorCarrito) throw error
    throw new ErrorCarrito(
      'STORAGE_UNAVAILABLE',
      'No se pudo leer el carrito guardado.'
    )
  }

  if (contenido === null) return []

  let lineas
  try {
    lineas = JSON.parse(contenido)
  } catch {
    throw new ErrorCarrito(
      'CART_DATA_INVALID',
      'Los datos guardados del carrito no son válidos.'
    )
  }

  if (!Array.isArray(lineas) || !lineas.every(validarLinea)) {
    throw new ErrorCarrito(
      'CART_DATA_INVALID',
      'Los datos guardados del carrito no son válidos.'
    )
  }

  return lineas
}

function guardarLineas(lineas) {
  try {
    obtenerStorage().setItem(CLAVE_STORAGE, JSON.stringify(lineas))
  } catch (error) {
    if (error instanceof ErrorCarrito) throw error
    throw new ErrorCarrito(
      'STORAGE_UNAVAILABLE',
      'No se pudo guardar el carrito.'
    )
  }
}

function validarClave(productId, variantSku) {
  if (
    typeof productId !== 'string' ||
    productId.trim() === '' ||
    typeof variantSku !== 'string' ||
    variantSku.trim() === ''
  ) {
    throw new TypeError('Se requiere el ID del producto y el SKU de variante.')
  }
}

export function obtenerCarrito() {
  return leerLineas()
}

export function agregarItem({ productId, variantSku, quantity = 1 }) {
  validarClave(productId, variantSku)

  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    throw new TypeError('La cantidad debe ser un entero positivo.')
  }

  const lineas = leerLineas()
  const existente = lineas.find(
    (linea) =>
      linea.productId === productId && linea.variantSku === variantSku
  )

  if (existente) {
    const nuevaCantidad = existente.quantity + quantity

    if (!Number.isSafeInteger(nuevaCantidad)) {
      throw new TypeError('La cantidad supera el valor permitido.')
    }

    existente.quantity = nuevaCantidad
  } else {
    lineas.push({ productId, variantSku, quantity })
  }

  guardarLineas(lineas)
  return lineas
}

export function actualizarCantidad(productId, variantSku, quantity) {
  validarClave(productId, variantSku)

  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    throw new TypeError('La cantidad debe ser un entero positivo.')
  }

  const lineas = leerLineas()
  const linea = lineas.find(
    (item) => item.productId === productId && item.variantSku === variantSku
  )

  if (!linea) {
    throw new ErrorCarrito('ITEM_NOT_FOUND', 'El artículo no está en el carrito.')
  }

  linea.quantity = quantity
  guardarLineas(lineas)
  return lineas
}

export function quitarItem(productId, variantSku) {
  validarClave(productId, variantSku)

  const lineas = leerLineas()
  const restantes = lineas.filter(
    (linea) =>
      linea.productId !== productId || linea.variantSku !== variantSku
  )

  if (restantes.length !== lineas.length) guardarLineas(restantes)
  return restantes
}

export function vaciarCarrito() {
  // Acción explícita del usuario; también permite recuperarse de datos inválidos.
  guardarLineas([])
  return []
}
