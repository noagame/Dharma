export function paginaAdministracion() {
  return `
    <div class="store-shell admin-shell">
      <header class="store-header">
        <a class="store-brand" href="/" aria-label="Dharma, volver a la página principal">Dharma</a>
        <nav class="store-nav" aria-label="Navegación de administración">
          <a href="/store/">Ver tienda</a>
          <span class="admin-label">Panel demo</span>
        </nav>
      </header>

      <main class="store-main admin-main">
        <p class="store-eyebrow">Área de gestión · Demo local</p>
        <h1>Administración de la tienda</h1>
        <p class="demo-notice demo-notice--warning" role="note">
          Este panel no tiene autenticación. Los cambios se guardan solo en este navegador
          y no deben usarse como catálogo oficial ni con datos de clientes.
        </p>

        <section class="admin-section" aria-labelledby="product-form-title">
          <div class="section-heading">
            <p class="store-empty__index">CATÁLOGO LOCAL</p>
            <h2 id="product-form-title">Agregar producto</h2>
          </div>
          <p class="admin-help">
            Ingresa datos aprobados por Dharma. La demo no incluye carga de imágenes,
            costos, despacho ni sincronización de inventario.
          </p>
          <form class="admin-form" data-product-form>
            <input type="hidden" name="id" />
            <div class="admin-form-grid">
              <label class="field-label">
                Nombre de la prenda
                <input class="store-input" name="nombre" required maxlength="100" autocomplete="off" />
              </label>
              <label class="field-label">
                Categoría
                <select class="store-select" name="categoria" required>
                  <option value="">Selecciona una categoría</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Deportiva">Deportiva</option>
                  <option value="Trekking">Trekking</option>
                </select>
              </label>
              <label class="field-label">
                Precio de venta (CLP)
                <input class="store-input" name="precioCLP" type="number" min="1" step="1" required inputmode="numeric" />
              </label>
            </div>

            <fieldset class="variant-fieldset">
              <legend>Variantes</legend>
              <p class="admin-help">Agrega una fila por combinación de talla y color. Cada SKU debe ser único.</p>
              <div class="variant-list" data-variant-list></div>
              <button class="text-button" type="button" data-add-variant>Agregar otra variante</button>
            </fieldset>

            <label class="publish-toggle">
              <input type="checkbox" name="publicado" checked />
              Mostrar en la tienda de demo
            </label>
            <p class="admin-form-status" data-form-status role="status" aria-live="polite"></p>
            <div class="admin-form-actions">
              <button class="store-button" type="submit" data-save-product>Guardar producto</button>
              <button class="text-button" type="button" data-cancel-edit hidden>Cancelar edición</button>
            </div>
          </form>
        </section>

        <section class="admin-section" aria-labelledby="product-list-title">
          <div class="section-heading">
            <p class="store-empty__index">PRODUCTOS</p>
            <h2 id="product-list-title">Catálogo de esta demo</h2>
          </div>
          <p class="store-status" data-admin-product-status role="status">
            Aún no hay productos ingresados.
          </p>
          <div class="admin-product-list" data-admin-product-list></div>
        </section>

        <section class="admin-section sales-section" aria-labelledby="sales-title">
          <div class="section-heading">
            <p class="store-empty__index">VENTAS</p>
            <h2 id="sales-title">Historial de ventas</h2>
          </div>
          <p>
            La consulta real por identificador y fecha necesita la API y acceso protegido.
            Esta demo no procesa pagos ni crea ventas.
          </p>
          <p class="empty-sales">No hay ventas registradas.</p>
        </section>
      </main>

      <footer class="store-footer">
        <span>Dharma</span>
        <a href="/store/">Volver a la tienda</a>
      </footer>
    </div>
  `
}
