import { contactoContenido } from '../datos/contacto.js'
import { plantillaContacto } from './contacto-vista.js'

export function Contacto() {
  return plantillaContacto(contactoContenido)
}
