import { Item } from '@radix-ui/react-select'
import { convertePrice } from './convertePrice'

const paymentTypeTranslation = {
  Money: 'Dinheiro',
  'Credit card': 'Cartão de credito',
  'Debit card': 'Cartão de debito',
}

interface converterOrderInTextType {
  order: {
    payment: {
      type: 'Credit card' | 'Debit card' | 'Money'
      changeMoney: string | undefined
      isChangeMoney: boolean
    }
    address: {
      region: {
        id: number
        price: number
        title: string
      }
      road: string
      house: string
      complement: string
    }
    items: {
      name: string
      price: number
      quantity: number
      complements: {
        calda: string | null
        condimentos: string[] | null
        especial: string | null
        frutas: string[] | null
      }
    }[]
  }
  totalCart: number
}

export function converterOrderInText({
  order,
  totalCart,
}: converterOrderInTextType) {
  const changeMoney =
    order.payment.type === 'Money'
      ? !order.payment.isChangeMoney
        ? `Troco para ${order.payment.changeMoney}`
        : 'Não precisa de troco'
      : ''

  const items = order.items.map((item, index) => {
    return `Item ${index + 1}%0A
- ${item.name}%0A
  - Quantidade: ${item.quantity}%0A
  - Preço: ${convertePrice(item.price)}%0A
  Complementos%0A
  - Calda: ${item.complements.calda ? item.complements.calda : 'Nenhum'}%0A
  - Condimentos: ${
    item.complements.condimentos ? item.complements.condimentos : 'Nenhum'
  }%0A
  - Especial: ${
    item.complements.especial ? item.complements.especial : 'Nenhum'
  }%0A
  - Frutas: ${item.complements.frutas ? item.complements.frutas : 'Nenhum'}%0A
`
  })

  const text = `
□ Pedido%0A

${items}
  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0A

□ Endereço%0A
- Local: ${order.address.region.title}%0A
- Rua: ${order.address.road}%0A
- Casa: ${order.address.house}%0A
- Complemento: ${order.address.complement}%0A

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0A

□ Método de pagamento%0A
- ${paymentTypeTranslation[order.payment.type]}%0A
- ${changeMoney}%0A%0A%0A

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0A

□ Frete: ${convertePrice(order.address.region.price)}%0A
□ Total: ${convertePrice(totalCart)}%0A

`

  return text
}
