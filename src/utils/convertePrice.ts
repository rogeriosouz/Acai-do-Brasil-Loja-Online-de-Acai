export function convertePrice(price: number) {
  const newPrice = price / 100

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(newPrice)
}
