export function Footer() {
  return `
    <footer class="relative z-10 flex justify-center border-t border-white/10 bg-dharma-ink px-6 py-6">
      <nav class="flex items-center gap-5" aria-label="Redes sociales">
        <a class="rounded-full p-2 text-dharma-muted transition-colors hover:bg-white/5 hover:text-dharma-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold" href="https://www.instagram.com/camilo.velz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Camilo, se abre en una nueva pestaña">
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a class="rounded-full p-2 text-dharma-muted transition-colors hover:bg-white/5 hover:text-dharma-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dharma-gold" href="https://wa.me/56989609739" target="_blank" rel="noopener noreferrer" aria-label="Contactar a Dharma por WhatsApp, se abre en una nueva pestaña">
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.9a8.2 8.2 0 1 1 16-3.4Z" />
            <path d="M8.3 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .4-.1.6l-.6.7c-.2.2-.2.4 0 .6.4.7 1 1.3 1.7 1.7.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.3.3.3.5 0 .4-.2 1-.5 1.3-.4.4-1 .6-1.5.6-1 0-2.3-.5-3.7-1.8-1.2-1.1-2.1-2.5-2.3-3.4-.2-.8 0-1.6.4-2.1Z" />
          </svg>
        </a>
      </nav>
    </footer>
  `
}
