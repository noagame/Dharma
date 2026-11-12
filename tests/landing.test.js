import test from 'node:test'
import assert from 'node:assert/strict'

import { Historia } from '../src/complementos/historia.js'
import { Enfoque } from '../src/complementos/enfoque.js'
import { Producto } from '../src/complementos/productos.js'
import { Cierre } from '../src/complementos/cierre.js'
import { Footer } from '../src/complementos/footer.js'
import { Petalos } from '../src/complementos/petalos.js'
import { plantillaContacto } from '../src/complementos/contacto-vista.js'

test('la historia presenta el primer paso del recorrido', () => {
  const html = Historia()

  assert.match(html, /id="historia"/)
  assert.match(html, /01 \/ La intención/)
  assert.match(html, /Conecta con lo que te mueve/)
})

test('el enfoque incluye sus dos áreas principales', () => {
  const html = Enfoque()

  assert.match(html, /id="enfoque"/)
  assert.match(html, /Entrenamiento/)
  assert.match(html, /Aventura/)
})

test('el lanzamiento está identificado como próximo', () => {
  const html = Producto()

  assert.match(html, /id="producto"/)
  assert.match(html, /primer lanzamiento de Dharma/)
})

test('el contacto renderiza fotos accesibles y enlaces del dueño', () => {
  const html = plantillaContacto({
    fotos: [{ src: '/camilo.png', alt: 'Camilo entrenando', pie: 'En movimiento.', clase: '' }],
    nombre: 'Camilo Velásquez',
    biografia: ['Fundador de Dharma.'],
    contacto: {
      telefono: '+56912345678',
      telefonoVisible: '+56 9 1234 5678',
      instagram: 'camilo.velz',
      instagramUrl: 'https://www.instagram.com/camilo.velz/',
    },
  })

  assert.match(html, /alt="Camilo entrenando"/)
  assert.match(html, /Camilo Velásquez/)
  assert.match(html, /href="https:\/\/wa\.me\/56912345678"/)
  assert.match(html, /href="tel:\+56912345678"/)
  assert.match(html, /@camilo\.velz/)
})

test('el cierre invita a construir el propio camino', () => {
  const html = Cierre()

  assert.match(html, /id="cierre"/)
  assert.match(html, /Construye<br><span/)
  assert.match(html, /href="#producto"/)
})

test('los pétalos son decorativos y el pie muestra solo iconos de Instagram y WhatsApp', () => {
  const petals = Petalos()
  const footer = Footer()

  assert.match(petals, /aria-hidden="true"/)
  assert.equal((petals.match(/class="petal"/g) ?? []).length, 7)
  assert.match(footer, /https:\/\/www\.instagram\.com\/camilo\.velz\//)
  assert.match(footer, /https:\/\/wa\.me\/56989609739/)
  assert.match(footer, /aria-label="Instagram de Camilo/)
  assert.match(footer, /aria-label="Contactar a Dharma por WhatsApp/)
  assert.equal((footer.match(/<svg /g) ?? []).length, 2)
  assert.doesNotMatch(footer, /LinkedIn|@camilo\.velz/)
})
