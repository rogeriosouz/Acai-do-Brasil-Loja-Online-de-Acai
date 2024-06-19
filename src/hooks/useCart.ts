import { api } from '@/lib/api'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'

export interface Complement {
  caldas?: string
  condimentos?: string[]
  frutas?: string[]
  especial?: string
}

export interface Item {
  id: string
  name: string
  price: number
  quant: number
  complementsAdd: Complement
  cartId: string
  create_at: string
}

export interface Cart {
  id: string
  total: number
  idUserBrowser: string
  create_at: string
  items: Item[]
}

export function useCart() {
  const [isAmount, setIsAmount] = useState(false)

  const [id, setId] = useState('')

  const querryCart = useQuery<Cart>(
    ['cart', id],
    async () => {
      const response = await api.get(`/cart/${id}`)

      return response.data
    },
    {
      enabled: isAmount,
    },
  )

  useEffect(() => {
    setIsAmount(true)
    let id = localStorage.getItem('token-user-id')

    if (!id) {
      id = uuidv4()
      localStorage.setItem('token-user-id', id)
    }

    setId(id)
  }, [])

  const isEmptyCart = !(
    querryCart.status === 'success' &&
    querryCart.data &&
    querryCart.data.items.length >= 1
  )

  const quantItemsCart = useMemo(() => {
    if (querryCart.data) {
      const quant = querryCart.data.items.reduce(
        (ac, item) => ac + item.quant,
        0,
      )

      return quant
    } else {
      return null
    }
  }, [querryCart])

  return {
    id,
    querryCart,
    quantItemsCart,
    isEmptyCart,
  }
}
