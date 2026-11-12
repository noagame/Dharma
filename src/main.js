import './style.css'
import heroImg from './assets/dharma-forest-gate.png'
import { Enfoque } from './complementos/enfoque.js'
import { Historia } from './complementos/historia.js'
import { Producto } from './complementos/productos.js'
import { Contacto } from './complementos/contacto.js'
import { Cierre } from './complementos/cierre.js'
import { Footer } from './complementos/footer.js'
import { Petalos } from './complementos/petalos.js'

document.querySelector('#app').innerHTML = `
  <div class="site-atmosphere min-h-screen bg-dharma-ink font-sans text-dharma-text antialiased" style="--scene-image: url('${heroImg}')">
    ${Petalos()}

    <header class="sticky top-0 z-20 border-b border-white/10 bg-dharma-ink/90 backdrop-blur-xl">
      <div class="mx-auto flex min-h-[4.25rem] w-full max-w-6xl items-center justify-between gap-8 px-6 py-3 max-[700px]:min-h-0 max-[700px]:flex-wrap max-[700px]:gap-x-4 max-[700px]:gap-y-2 max-[700px]:px-5">
        <a class="shrink-0 text-base font-bold uppercase tracking-[0.2em] text-dharma-gold no-underline" href="#inicio" aria-label="Dharma, inicio">Dharma</a>

        <nav class="flex items-center gap-x-8 max-[700px]:w-full max-[700px]:flex-wrap max-[700px]:justify-start max-[700px]:gap-x-4 max-[700px]:gap-y-2" aria-label="Navegación principal">
          <a class="whitespace-nowrap text-[0.82rem] tracking-wide text-dharma-text/80 no-underline transition-colors hover:text-dharma-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold max-[700px]:text-xs" href="#historia">La marca</a>
          <a class="whitespace-nowrap text-[0.82rem] tracking-wide text-dharma-text/80 no-underline transition-colors hover:text-dharma-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold max-[700px]:text-xs" href="#enfoque">Nuestro enfoque</a>
          <a class="whitespace-nowrap text-[0.82rem] tracking-wide text-dharma-text/80 no-underline transition-colors hover:text-dharma-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold max-[700px]:text-xs" href="#producto">Próximo lanzamiento</a>
          <a class="whitespace-nowrap text-[0.82rem] tracking-wide text-dharma-gold no-underline transition-colors hover:text-dharma-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold max-[700px]:text-xs" href="/store/">Tienda</a>
          <a class="whitespace-nowrap text-[0.82rem] tracking-wide text-dharma-text/80 no-underline transition-colors hover:text-dharma-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold max-[700px]:text-xs" href="#contacto">Contacto</a>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero-scene relative flex min-h-[min(48rem,calc(100svh_-_4.25rem))] items-center overflow-hidden px-6 pb-32 pt-24 lg:px-12 max-[700px]:min-h-[min(42rem,calc(100svh_-_6rem))] max-[700px]:items-end max-[700px]:px-5 max-[700px]:pb-28 max-[700px]:pt-16" id="inicio" aria-labelledby="hero-title">
        <div class="relative z-10 mx-auto w-full max-w-6xl">
          <div class="w-full max-w-[39rem] pb-4">
            <p class="mb-5 text-[0.72rem] font-bold uppercase leading-6 tracking-[0.2em] text-dharma-gold">Ropa para moverte con propósito</p>
            <h1 class="mb-5 font-display text-[clamp(4rem,10vw,8rem)] font-normal leading-[0.95] tracking-[-0.065em] max-[700px]:text-[clamp(4.5rem,18vw,7rem)]" id="hero-title">Dharma</h1>
            <p class="mb-8 max-w-[33rem] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.75] text-dharma-text/85">
              Una marca para acompañarte en el gimnasio, en la montaña y en cada
              desafío que te conecta con el movimiento.
            </p>
            <a class="inline-flex min-h-[3.1rem] items-center justify-center rounded-sm border border-dharma-gold/75 px-5 py-3 text-[0.82rem] font-semibold tracking-wide text-dharma-text no-underline transition-colors hover:bg-dharma-gold hover:text-dharma-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold" href="#historia">Conoce nuestra esencia</a>
          </div>
        </div>

        <a class="group absolute bottom-9 right-6 z-10 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-dharma-text/75 no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold lg:right-12 max-[700px]:bottom-6 max-[700px]:right-5" href="#historia" aria-label="Desplazarse a la sección La marca">
          <span>Descubre Dharma</span>
          <span class="grid size-8 place-items-center rounded-full border border-dharma-gold/65 text-base text-dharma-gold transition-transform group-hover:translate-y-1" aria-hidden="true">↓</span>
        </a>
      </section>

      <div class="journey relative isolate overflow-hidden px-6 py-8 max-[700px]:px-4 max-[700px]:py-6" role="group" aria-label="El camino Dharma">
        <svg class="journey-path pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible" viewBox="0 0 1000 1800" preserveAspectRatio="none" aria-hidden="true">
          <path class="journey-path__base" d="M500 0 C470 80 350 100 360 210 S650 310 640 430 S350 530 360 650 S650 760 640 870 S350 980 360 1100 S650 1210 640 1330 S450 1450 500 1600" />
          <path class="journey-path__flow" d="M500 0 C470 80 350 100 360 210 S650 310 640 430 S350 530 360 650 S650 760 640 870 S350 980 360 1100 S650 1210 640 1330 S450 1450 500 1600" />
        </svg>

        ${Historia()}
        ${Enfoque()}
        ${Producto()}
        ${Contacto()}
      </div>

      ${Cierre()}
    </main>

    ${Footer()}
  </div>
`
