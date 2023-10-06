import type { LinksFunction, MetaFunction } from '@remix-run/node'
import stylesheet from '@/app/tailwind.css'
import { Link, useLoaderData } from '@remix-run/react'
import { Button } from '@/components/ui/button'
import { prisma } from '@/services/prisma'
import { convertePrice } from '@/utils/convertePrice'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export type Type = {
  id: string
  name: string
  sectionsTypesProductId: string
  create_at: Date
}

export type SectionsTypesProducts = {
  id: string
  title: string
  maximumQuantity: number
  create_at: Date
  productsId: string
  types: Type[]
}

export type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  sectionsProductsId: string | null
  create_at: Date
  sectionsTypesProducts: SectionsTypesProducts[]
}

type SectionsProducts = {
  title: string
  id: string
  create_at: Date
  products: Product[]
}

export async function loader() {
  const sectionsProducts = await prisma.sectionsProducts.findMany({
    select: {
      id: true,
      title: true,
      products: true,
      create_at: true,
    },
  })

  return sectionsProducts
}

export default function Index() {
  const data = useLoaderData<SectionsProducts[]>()

  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full h-min py-16 fundo relative">
        <div className="absolute inset-0 bg-zinc-900/50 z-[99]"></div>

        <div className="w-[200px] h-[200px] rounded bg-white z-[999]"></div>
        <div className="w-full text-center space-y-2 mt-4 z-[999]">
          <h1 className="text-white text-xl font-normal">Name restaurante</h1>
          <div className="w-max text-white text-xl font-bold px-20 mx-auto py-1 rounded bg-green-500">
            Aberto agora
          </div>
        </div>
      </div>

      <div className="px-2 mb-4 sticky top-0 z-[9999]  h-14 bg-secondary gap-5 flex items-center w-full border-b border">
        {data.map((sectionProduct) => (
          <Link
            key={sectionProduct.id}
            to={`#${sectionProduct.title}`}
            className="text-primary flex items-center px-4 text-lg h-full border-b-2 border-primary"
          >
            {sectionProduct.title}
          </Link>
        ))}
      </div>

      {data.map((sectionProduct) => (
        <section
          key={sectionProduct.id}
          id={sectionProduct.title}
          className="w-full"
        >
          <div className="bg-primary w-full h-12 px-4 sticky top-[55px] flex items-center">
            <h1 className="text-2xl text-secondary font-semibold">
              {sectionProduct.title}
            </h1>
          </div>

          {sectionProduct.products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-1 gap-2 px-4 border-t border-b"
            >
              <div className="w-full py-5 flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <img
                    className="w-24 h-24 rounded overflow-hidden object-cover"
                    src={product.imageUrl}
                    alt={product.name}
                  />

                  <div className="space-y-3">
                    <p className="text-base font-normal">{product.name}</p>
                    <span className="text-sm">
                      {convertePrice(product.price)}
                    </span>
                  </div>
                </div>
                <Button asChild>
                  <Link to={`/item/${product.id}`}>adicionar item</Link>
                </Button>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
