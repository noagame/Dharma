const clasesBoton = 'inline-flex min-h-[3.1rem] items-center justify-center rounded-sm border border-dharma-gold/75 px-5 py-3 text-[0.82rem] font-semibold tracking-wide text-dharma-text no-underline transition-colors hover:bg-dharma-gold hover:text-dharma-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold'

export function Cierre() {
  return `
    <section class="closing-fade relative z-10 flex min-h-[min(46rem,90svh)] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center" id="cierre" aria-labelledby="closing-title">
      <p class="mb-5 text-[0.72rem] font-bold uppercase leading-6 tracking-[0.2em] text-dharma-gold">El camino continúa</p>
      <h2 class="mb-6 font-display text-[clamp(3.5rem,9vw,7.5rem)] font-normal leading-[0.98] tracking-[-0.055em]" id="closing-title">Construye<br><span class="font-display italic text-dharma-gold">tu camino.</span></h2>
      <p class="mb-8 max-w-[34rem] text-[clamp(1rem,2vw,1.15rem)] leading-[1.8] text-dharma-muted">
        Muévete con intención. Explora a tu manera. Dharma te acompaña en cada paso.
      </p>
      <a class="${clasesBoton}" href="#producto">Descubre lo que viene</a>
    </section>
  `
}
