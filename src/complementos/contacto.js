import { contactoContenido } from '../datos/contacto.js'

export function Contacto() {
  const { fotos, nombre, biografia, contacto } = contactoContenido

  return `
    <section class="content-section content-section--dark founder-section" id="contacto" aria-labelledby="contact-title">
      <div class="founder-gallery" role="group" aria-label="Camilo en la naturaleza y entrenando">
        ${fotos.map((foto) => `
          <figure class="founder-photo ${foto.clase}">
            <img src="${foto.src}" alt="${foto.alt}" loading="lazy" />
            <figcaption>${foto.pie}</figcaption>
          </figure>
        `).join('')}
      </div>

      <div class="founder-story">
        <p class="eyebrow">04 / Detrás de Dharma</p>
        <h2 id="contact-title">Una historia de movimiento y naturaleza.</h2>
        <p class="founder-story__lead">Soy ${nombre}, fundador de Dharma.</p>
        ${biografia.map((parrafo) => `<p>${parrafo}</p>`).join('')}

        <div class="founder-contact" aria-label="Contactar a Camilo">
          <a class="button" href="https://wa.me/${contacto.telefono.slice(1)}" target="_blank" rel="noopener noreferrer">
            Hablemos por WhatsApp
          </a>
          <a class="founder-contact__social" href="${contacto.instagramUrl}" target="_blank" rel="noopener noreferrer">
            Instagram <span>@${contacto.instagram}</span>
          </a>
        </div>
        <p class="founder-phone">${contacto.telefonoVisible}</p>
      </div>
    </section>
  `
}
