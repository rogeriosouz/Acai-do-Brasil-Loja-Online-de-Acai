import { prisma } from '@/services/prisma'
import { useLoaderData } from 'react-router'
import type { Product } from '@/types/ProductRequest'

import { convertePrice } from '@/utils/convertePrice'
import { FormItem } from './components/FormItem'
import { Link } from '@remix-run/react'
import { CaretLeft } from '@phosphor-icons/react'

export async function loader({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      sectionsTypesProducts: {
        include: {
          types: true,
        },
      },
    },
  })

  return product
}

export default function Item() {
  const data = useLoaderData() as Product

  return (
    <main className="w-full relative">
      <Link
        to={'/'}
        className="w-7 h-7 absolute top-3 left-3 flex items-center justify-center"
      >
        <CaretLeft className="w-7 h-7 text-primary" />
      </Link>

      <div className="w-full h-[40vh] my-3">
        <img
          className="w-full h-full object-contain"
          src={data.imageUrl}
          alt={data.name}
        />
      </div>

      <div className="w-full flex items-center justify-center flex-col my-3">
        <h1 className="text-center text-lg font-bold">{data.name}</h1>
        <span className="text-center text-base font-semibold">
          {convertePrice(data.price)}
        </span>
      </div>

      <FormItem
        sectionsTypesProducts={data.sectionsTypesProducts}
        price={data.price}
        productId={data.id}
      />
    </main>
  )
}
