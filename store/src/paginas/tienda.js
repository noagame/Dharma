export function paginaTienda() {
  return `
    <div class="store-shell">
      <header class="store-header">
        <a class="store-brand" href="/" aria-label="Dharma, volver a la página principal">Dharma</a>
        <nav class="store-nav" aria-label="Navegación de la tienda">
          <a href="/">La marca</a>
          <a class="store-cart" data-cart href="#carrito" aria-label="Carrito vacío">
            Carrito <span data-cart-count aria-live="polite">0</span>
          </a>
        </nav>
      </header>

      <main class="store-main">
        <p class="store-eyebrow">Dharma · outdoor, deporte y trekking</p>
        <h1>El camino también se viste.</h1>
        <p class="store-intro">
          Una tienda en preparación para prendas que acompañen tus entrenamientos,
          escapadas y próximos caminos.
        </p>
        <p class="demo-notice" role="note">
          Demo local: los productos y el carrito se guardan solo en este navegador.
          No se procesan pagos ni se registran ventas.
        </p>

        <section class="catalog-section" aria-labelledby="catalog-title">
          <div class="section-heading">
            <p class="store-empty__index">PRIMERA COLECCIÓN</p>
            <h2 id="catalog-title">Colección Dharma</h2>
          </div>
          <p class="store-status" data-catalog-status role="status">
            Estamos definiendo las primeras prendas.
          </p>
          <div class="product-grid" data-product-list></div>
        </section>

        <section class="cart-section" id="carrito" aria-labelledby="cart-title">
          <div class="section-heading">
            <p class="store-empty__index">TU SELECCIÓN</p>
            <h2 id="cart-title">Carrito</h2>
          </div>
          <p class="store-status" data-cart-status role="status">Tu carrito está vacío.</p>
          <div class="cart-items" data-cart-items></div>
          <div class="cart-summary" data-cart-summary hidden>
            <p>Subtotal de demo <span data-cart-subtotal></span></p>
            <p class="cart-disclaimer">No incluye despacho. El precio final y el stock requieren validación en servidor.</p>
            <button class="store-button" type="button" disabled aria-describedby="checkout-note">
              Cobro no disponible en esta demo
            </button>
            <p id="checkout-note" class="cart-disclaimer">
              No se creará un cobro ni una venta. La integración de pagos está pendiente.
            </p>
            <button class="text-button" type="button" data-clear-cart>Vaciar carrito</button>
          </div>
        </section>
      </main>

      <footer class="store-footer">
        <span>Dharma</span>
        <a href="/">Volver a la página principal</a>
        <a href="/store/admin/">Administración de demo</a>
      </footer>
    </div>
  `
}
