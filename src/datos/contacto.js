import fotoNaturaleza from '../assets/contacto/camilo-naturaleza-columpio.png'
import fotoCosta from '../assets/contacto/camilo-costa.png'
import fotoGimnasio from '../assets/contacto/camilo-gimnasio.png'

// Contenido inicial; más adelante podrá llegar desde el panel administrador.
export const contactoContenido = {
  fotos: [
    {
      src: fotoCosta,
      alt: 'Camilo de pie sobre rocas junto al mar',
      pie: 'Explorar también es parte del camino.',
      clase: 'founder-photo--principal',
    },
    {
      src: fotoNaturaleza,
      alt: 'Camilo de espaldas en un columpio, frente a un paisaje verde y un lago',
      pie: 'Una vida conectada con la naturaleza.',
      clase: 'founder-photo--secundaria',
    },
    {
      src: fotoGimnasio,
      alt: 'Camilo en el gimnasio, frente a un espejo y junto a pesas',
      pie: 'La fuerza también se construye entrenando.',
      clase: 'founder-photo--secundaria',
    },
  ],
  nombre: 'Camilo Velásquez',
  biografia: [
    'Nací en Temuco y crecí en Chiloé. Vivir cerca de la naturaleza me enseñó a encontrar en ella un motor para avanzar y a valorar cómo influye en nuestro bienestar.',
    'También aprendí que muchas personas deben salir de la isla para encontrar nuevas oportunidades. Ese arraigo y esas ganas de seguir adelante son parte de la historia que quiero contar con Dharma.',
    'Soy preparador físico y profesor, practico powerlifting y trabajo en Elysium acompañando a personas en sus procesos de entrenamiento. Además, tengo formación en antropometría ISAK Nivel 1.',
    'Dharma comenzó como una simple idea entre hermanos y fue creciendo hasta reunir lo que nos mueve: entrenar, hacer trekking y disfrutar de naturaleza con libertad.',
  ],
  contacto: {
    telefono: '+56989609739',
    telefonoVisible: '+56 9 8960 9739',
    instagram: 'camilo.velz',
    instagramUrl: 'https://www.instagram.com/camilo.velz/',
  },
}
