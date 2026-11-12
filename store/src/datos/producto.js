/**
 * Variante vendible de un producto, identificada por un SKU.
 *
 * @typedef {Object} VarianteProducto
 * @property {string} sku Código único de la variante.
 * @property {string} talla Talla disponible para esta variante.
 * @property {string} color Color disponible para esta variante.
 * @property {number} unidadesDisponibles Unidades disponibles en inventario.
 */

/**
 * Información común de una prenda publicada en la tienda.
 *
 * @typedef {Object} Producto
 * @property {string} id Identificador único del producto.
 * @property {string} nombre Nombre visible de la prenda.
 * @property {string} categoria Categoría de la prenda.
 * @property {number} precioCLP Precio expresado en pesos chilenos.
 * @property {string[]} imagenes Rutas o URLs de las imágenes del producto.
 * @property {VarianteProducto[]} variantes Tallas y colores disponibles.
 * @property {boolean} publicado Indica si el producto aparece en la tienda.
 */
