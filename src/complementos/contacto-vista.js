const clasesBoton = 'inline-flex min-h-[3.1rem] items-center justify-center rounded-sm border border-dharma-gold/75 px-5 py-3 text-[0.82rem] font-semibold tracking-wide text-dharma-text no-underline transition-colors hover:bg-dharma-gold hover:text-dharma-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold'

export function plantillaContacto({ fotos, nombre, biografia, contacto }) {
  return `
    <section class="relative z-10 mx-auto mb-8 grid w-full max-w-6xl scroll-mt-20 grid-cols-1 items-center gap-7 border border-white/15 bg-dharma-ink/80 p-5 shadow-2xl backdrop-blur-xl md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-12 md:p-10 lg:p-14 max-[700px]:ml-16 max-[700px]:mr-0 max-[700px]:w-auto" id="contacto" aria-labelledby="contact-title">
      <span class="absolute left-[-1.55rem] top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-dharma-ink bg-dharma-gold shadow-[0_0_0_4px_rgb(199_164_91_/_24%),0_0_1rem_rgb(199_164_91_/_65%)] max-[700px]:left-[-3.15rem]" aria-hidden="true"></span>

      <div class="grid min-h-[34rem] grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] grid-rows-2 gap-3 max-[700px]:min-h-0 max-[700px]:grid-cols-2 max-[700px]:grid-rows-[15rem_9rem]" role="group" aria-label="Camilo en la naturaleza y entrenando">
        ${fotos.map((foto) => `
          <figure class="group relative m-0 min-h-0 min-w-0 overflow-hidden bg-dharma-surface ${foto.clase}">
            <img class="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" src="${foto.src}" alt="${foto.alt}" loading="lazy" />
            <figcaption class="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgb(0_0_0_/_76%))] px-4 pb-4 pt-10 text-xs leading-relaxed text-white max-[700px]:px-2 max-[700px]:pb-2 max-[700px]:pt-8 max-[700px]:text-[0.66rem]">${foto.pie}</figcaption>
          </figure>
        `).join('')}
      </div>

      <div class="min-w-0">
        <p class="mb-5 text-[0.72rem] font-bold uppercase leading-6 tracking-[0.2em] text-dharma-gold">04 / Detrás de Dharma</p>
        <h2 class="mb-5 font-display text-[clamp(2rem,3.5vw,3.2rem)] font-normal leading-[1.08] tracking-[-0.035em] max-[700px]:text-[clamp(2rem,9vw,3rem)]" id="contact-title">Una historia de movimiento y naturaleza.</h2>
        <p class="mb-4 text-[1.05rem] font-semibold leading-[1.75] text-dharma-text">Soy ${nombre}, fundador de Dharma.</p>
        ${biografia.map((parrafo) => `<p class="mb-4 text-[0.92rem] leading-[1.75] text-dharma-muted">${parrafo}</p>`).join('')}

        <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4" aria-label="Contactar a Camilo">
          <a class="${clasesBoton}" href="https://wa.me/${contacto.telefono.slice(1)}" target="_blank" rel="noopener noreferrer">
            Hablemos por WhatsApp
          </a>
          <a class="text-[0.82rem] text-dharma-muted underline decoration-dharma-gold/65 underline-offset-4 hover:text-dharma-gold" href="${contacto.instagramUrl}" target="_blank" rel="noopener noreferrer">
            Instagram <span class="text-dharma-gold">@${contacto.instagram}</span>
          </a>
        </div>
        <a class="mt-4 inline-block text-xs tracking-wide text-dharma-muted no-underline hover:text-dharma-gold" href="tel:${contacto.telefono}">${contacto.telefonoVisible}</a>
      </div>
    </section>
  `
}
