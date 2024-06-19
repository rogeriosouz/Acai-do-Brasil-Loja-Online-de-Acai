import { Button } from './ui/button'
import { Link } from '@remix-run/react'
import { convertePrice } from '@/utils/convertePrice'

interface CardProductProps {
  id: string
  name: string
  imageUrl: string
  price: number
}

export function CardProduct({ id, name, imageUrl, price }: CardProductProps) {
  return (
    <div key={id} className="grid grid-cols-1 gap-2 px-4 border-t border-b">
      <div className="w-full py-5 flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <img
            className="w-24 h-24 rounded overflow-hidden object-cover"
            src={imageUrl}
            alt={name}
          />

          <div className="space-y-3">
            <p className="text-base font-normal">{name}</p>
            <span className="text-sm">{convertePrice(price)}</span>
          </div>
        </div>

        <Button asChild>
          <Link to={`/item/${id}`}>Adicionar item</Link>
        </Button>
      </div>
    </div>
  )
}
