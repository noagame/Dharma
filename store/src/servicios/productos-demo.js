const CLAVE_PRODUCTOS = 'dharma:productos:v1'

export class ErrorProductosDemo extends Error {
  constructor(codigo, mensaje) {
    super(mensaje)
    this.name = 'ErrorProductosDemo'
    this.codigo = codigo
  }
}

function obtenerStorage() {
  try {
    return window.localStorage
  } catch {
    throw new ErrorProductosDemo(
      'STORAGE_UNAVAILABLE',
      'El almacenamiento local no está disponible.'
    )
  }
}

function validarProducto(producto) {
  if (
    producto === null ||
    typeof producto !== 'object' ||
    typeof producto.id !== 'string' ||
    producto.id.trim() === '' ||
    typeof producto.nombre !== 'string' ||
    producto.nombre.trim() === '' ||
    typeof producto.categoria !== 'string' ||
    producto.categoria.trim() === '' ||
    !Number.isSafeInteger(producto.precioCLP) ||
    producto.precioCLP < 1 ||
    !Array.isArray(producto.imagenes) ||
    !producto.imagenes.every((imagen) => typeof imagen === 'string') ||
    !Array.isArray(producto.variantes) ||
    producto.variantes.length === 0 ||
    typeof producto.publicado !== 'boolean'
  ) {
    return false
  }

  const skus = new Set()
  return producto.variantes.every((variante) => {
    const valida =
      variante !== null &&
      typeof variante === 'object' &&
      typeof variante.sku === 'string' &&
      variante.sku.trim() !== '' &&
      typeof variante.talla === 'string' &&
      variante.talla.trim() !== '' &&
      typeof variante.color === 'string' &&
      variante.color.trim() !== '' &&
      Number.isSafeInteger(variante.unidadesDisponibles) &&
      variante.unidadesDisponibles >= 0 &&
      !skus.has(variante.sku)

    if (valida) skus.add(variante.sku)
    return valida
  })
}

function leerProductos() {
  let contenido
  try {
    contenido = obtenerStorage().getItem(CLAVE_PRODUCTOS)
  } catch (error) {
    if (error instanceof ErrorProductosDemo) throw error
    throw new ErrorProductosDemo(
      'STORAGE_UNAVAILABLE',
      'No se pudieron leer los productos de esta demo.'
    )
  }

  if (contenido === null) return []

  let productos
  try {
    productos = JSON.parse(contenido)
  } catch {
    throw new ErrorProductosDemo(
      'PRODUCT_DATA_INVALID',
      'Los productos guardados no tienen un formato válido.'
    )
  }

  if (
    !Array.isArray(productos) ||
    !productos.every(validarProducto) ||
    new Set(productos.map((producto) => producto.id)).size !== productos.length
  ) {
    throw new ErrorProductosDemo(
      'PRODUCT_DATA_INVALID',
      'Los productos guardados no tienen un formato válido.'
    )
  }

  return productos
}

function guardarProductos(productos) {
  try {
    obtenerStorage().setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
  } catch (error) {
    if (error instanceof ErrorProductosDemo) throw error
    throw new ErrorProductosDemo(
      'STORAGE_UNAVAILABLE',
      'No se pudieron guardar los productos de esta demo.'
    )
  }
}

export function listarProductosDemo() {
  return leerProductos()
}

export function guardarProductoDemo(producto) {
  if (!validarProducto(producto)) {
    throw new ErrorProductosDemo(
      'PRODUCT_INVALID',
      'Revisa los datos del producto y sus variantes.'
    )
  }

  const productos = leerProductos()
  const otrosProductos = productos.filter((actual) => actual.id !== producto.id)
  const skusExistentes = new Set(
    otrosProductos.flatMap((actual) => actual.variantes.map((variante) => variante.sku))
  )

  if (producto.variantes.some((variante) => skusExistentes.has(variante.sku))) {
    throw new ErrorProductosDemo(
      'SKU_ALREADY_EXISTS',
      'Cada variante debe tener un SKU distinto.'
    )
  }

  guardarProductos([...otrosProductos, producto])
  return producto
}

export function eliminarProductoDemo(id) {
  const productos = leerProductos()
  const restantes = productos.filter((producto) => producto.id !== id)

  if (restantes.length !== productos.length) guardarProductos(restantes)
  return restantes
}
