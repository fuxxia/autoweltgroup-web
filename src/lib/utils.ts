export function formatARS(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)
}

export const WHATSAPP_NUMBER = '541156072460'

export function buildWhatsAppUrl(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
}

export function buildWhatsAppSimulador(nombre: string, marca: string, modelo: string, cuota: number): string {
  const mensaje = `Hola, soy ${nombre}. Simulé el plan adjudicado de ${marca} ${modelo} y me dio una cuota de $${cuota.toLocaleString('es-AR')}/mes. ¿Podemos hablar?`
  return buildWhatsAppUrl(mensaje)
}

export function buildWhatsAppAdjudicado(modelo: string, marca: string, precio: number): string {
  const mensaje = `Hola, vi el ${marca} ${modelo} en autoweltgroup.com.ar con precio de cesión ${formatARS(precio)} y me interesa. ¿Me podés dar más información?`
  return buildWhatsAppUrl(mensaje)
}
