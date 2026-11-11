import './style.css'
import heroImg from './assets/dharma-forest-gate.png'
import { Enfoque } from './complementos/enfoque.js'
import { Historia } from './complementos/historia.js'
import { Producto } from './complementos/productos.js'
import { Contacto } from './complementos/contacto.js'
import { Footer } from './complementos/footer.js'

document.querySelector('#app').innerHTML = `
  <div class="site-atmosphere" style="--scene-image: url('${heroImg}')">
    <div class="petal-layer" aria-hidden="true">
      <span class="petal"></span>
      <span class="petal"></span>
      <span class="petal"></span>
      <span class="petal"></span>
      <span class="petal"></span>
      <span class="petal"></span>
      <span class="petal"></span>
    </div>

    <header class="site-header">
      <a class="brand" href="#inicio" aria-label="Dharma, inicio">Dharma</a>

      <nav class="site-nav" aria-label="Navegación principal">
        <a href="#historia">La marca</a>
        <a href="#enfoque">Nuestro enfoque</a>
        <a href="#producto">Próximo lanzamiento</a>
        <a hrfe="#contacto">Contacto</a>
      </nav>
    </header>

    <main>
      <section class="hero" id="inicio" aria-labelledby="hero-title">
        <div class="hero__content">
          <p class="eyebrow">Ropa para moverte con propósito</p>
          <h1 id="hero-title">Dharma</h1>
          <p class="hero__intro">
            Una marca para acompañarte en el gimnasio, en la montaña y en cada
            desafío que te conecta con el movimiento.
          </p>
          <a class="button" href="#historia">Conoce nuestra esencia</a>
        </div>

        <a class="scroll-cue" href="#historia" aria-label="Desplazarse a la sección La marca">
          <span>Descubre Dharma</span>
          <span class="scroll-cue__arrow" aria-hidden="true">↓</span>
        </a>
      </section>

      ${Historia()}
      ${Enfoque()}
      ${Producto()}
      ${Contacto()}
    </main>

    ${Footer()}
  </div>
`
