import './style.css'
import heroImg from './assets/heroD.jpeg'
import { Enfoque } from './complementos/enfoque.js'
import { Historia } from './complementos/historia.js'
import { Producto } from './complementos/productos.js'
import { Contacto } from './complementos/contacto.js'
import { Footer } from './complementos/footer.js'

document.querySelector('#app').innerHTML= `

<header class="site-header sticky top-0 z-50 border-b border-white/15 px-5 py-4">
  <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4">
    <a class="brand flex items-center gap-x-3" href="#inicio" aria-label="Dharma, inicio">
      <span class="brand_name">Dharma</span>
    </a>

    <nav aria-label="Navegación principal" class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium leading-6 text-stone-700">
        <a href="#historia" class="transition hover:text-emerald-800">¿Qué es Dharma?</a>
        <a href="#enfoque" class="transition hover:text-emerald-800">Nuestro enfoque</a>
        <a href="#producto" class="transition hover:text-emerald-800">Producto inicial</a>
    </nav>
  
  </div>
</header>

<main id="inicio">
  <section class= "hero">
    <div class="hero__content">
        
      <img
        class="hero__logo" 
        src="${heroImg}" 
        alt="Logotipo principal de Dharma con un loto dorado sobre fondo negro"
        />

      <a class="brand__name" aria-label="Dharma, inicio" href="#inicio">
        <h2><span class="brand__name">Dharma</span></h2>
      </a>

      ${Historia()}
      ${Enfoque()}
      ${Producto()}
      ${Contacto()}

    </div>
  </section>
  
  ${Footer()}
</main>
`
