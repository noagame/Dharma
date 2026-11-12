export function Enfoque() {
  return `
    <section class="relative z-10 ml-auto mb-8 flex min-h-96 w-[min(46%,32rem)] scroll-mt-20 flex-col justify-center border border-white/15 bg-dharma-ink/80 p-8 shadow-2xl backdrop-blur-xl lg:p-14 max-[700px]:mb-6 max-[700px]:ml-16 max-[700px]:min-h-0 max-[700px]:w-auto max-[700px]:p-6" id="enfoque" aria-labelledby="focus-title">
      <span class="absolute left-[-1.55rem] top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-dharma-ink bg-dharma-gold shadow-[0_0_0_4px_rgb(199_164_91_/_24%),0_0_1rem_rgb(199_164_91_/_65%)] max-[700px]:left-[-3.15rem]" aria-hidden="true"></span>
      <p class="mb-5 text-[0.72rem] font-bold uppercase leading-6 tracking-[0.2em] text-dharma-gold">02 / Tu ritmo</p>
      <h2 class="mb-5 max-w-[44rem] font-display text-[clamp(2.2rem,5vw,4rem)] font-normal leading-[1.08] tracking-[-0.035em]" id="focus-title">Movimiento en distintas disciplinas</h2>
      <p class="max-w-[45rem] text-base leading-[1.9] text-dharma-muted">
        Una misma actitud para distintas disciplinas: entrenar con intención,
        salir a explorar y disfrutar cada desafío.
      </p>

      <div class="mt-10 grid grid-cols-2 gap-4 max-[700px]:mt-7 max-[700px]:grid-cols-1">
        <article class="border border-white/10 bg-white/[0.02] p-6">
          <h3 class="mb-2 text-base font-semibold text-dharma-gold">Entrenamiento</h3>
          <p class="m-0 leading-[1.8] text-dharma-muted">Comodidad y libertad para acompañar tu práctica diaria.</p>
        </article>

        <article class="border border-white/10 bg-white/[0.02] p-6">
          <h3 class="mb-2 text-base font-semibold text-dharma-gold">Aventura</h3>
          <p class="m-0 leading-[1.8] text-dharma-muted">Una invitación a conectar con la naturaleza y seguir avanzando.</p>
        </article>
      </div>
    </section>
  `
}
