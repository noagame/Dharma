import './style.css'
import heroImg from './assets/heroD.jpeg'
import { Enfoque } from './complementos/enfoque.js'
import { Historia } from './complementos/historia.js'
import { Producto } from './complementos/productos.js'
import { Contacto } from './complementos/contacto.js'
import { Footer } from './complementos/footer.js'

document.querySelector('#app').innerHTML= `

<header class="sticky top-0 z-50 border-b border-stone-200 bg-white/95 between backdrop gap-x-8 gap-3 px-5 py-4">
  <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4">
    <a class="brand flex items-center gap-x-3" href="#inicio" aria-label="Dhrama, inicio> 
      <span class="brand_name">Dharma</span>
    </a>

    <nav arial-label="Navegación Prinpial" class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm   font-medium leading-6 text-stone-700">
        <a href="#historia" class="hover:text-stone-700" transition hover:text-esmerald-800>¿Que es Dhrama?</a>
        <a href="#enfoque" class="hover:text-stone-700" transition hover:text-esmerald-800 >Nuestro Enfoque</a>
        <a href="#producto" class="hover:text-stone-700" transition hover:text-esmerald-800 >Producto Inicial</a>
        <a href="#producto" class="hover:text-stone-700" transition hover:text-esmerald-800 >Producto Inicial</a>
        <a href="#producto" class="hover:text-stone-700" transition hover:text-esmerald-800 >Producto Inicial</a>
    </nav>
  
  </div>
</header>

<main id="inicio">
  <section class= "hero">
    <div class="hero__content">
      <a class="bran__name" arial-label="Dhrama, inicio" href="#inicio"> 
        <h2><span class="brand_name">Dharma</span></h2> 
      </a>

      ${Historia()}
      ${Enfoque()}
      ${Producto()}
      ${Contacto()}
      <img class="hero_img" src="${heroImg}" alt="Imagen de la marca Dharma" />
    </div>
  </section>
  
  ${Footer()}
</main>
`

