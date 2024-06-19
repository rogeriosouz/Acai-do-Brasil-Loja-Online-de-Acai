/* eslint-disable jsx-a11y/img-redundant-alt */
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { prisma } from '@/services/prisma'
import { ShoppingCart } from '@phosphor-icons/react'
import type { Product } from '@/types/ProductRequest'
import stylesheet from '@/app/tailwind.css'
import imageHero from '@/assets/hero-image.jpg'
import { CardProduct } from '@/components/CardProduct'
import { GroupProducts } from '@/components/GroupProducts'

export const meta: MetaFunction = () => {
  return [
    { title: 'Açaí do Brasil' },
    {
      name: 'Açaí do Brasil',
      content:
        '"Bem-vindo ao Açaí do Brasil, o seu destino online para o verdadeiro sabor da Amazônia! Oferecemos uma seleção premium de açaí 100% natural, diretamente das florestas tropicais para a sua mesa. Explore nossas deliciosas combinações de açaí com frutas frescas, granolas crocantes e outros ingredientes nutritivos que vão energizar o seu dia. Experimente a essência autêntica do Brasil e sinta o poder revitalizante do açaí em cada colherada. Faça seu pedido agora e descubra por que o nosso açaí é o favorito dos amantes de saúde e sabor!"',
    },
  ]
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

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
    <div className="w-full mb-20">
      <div className="flex items-center flex-col justify-center w-full h-min py-16 fundo z-[-2] relative">
        <div className="absolute inset-0 bg-zinc-900/50 z-[-1]"></div>

        <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
          <img src={imageHero} alt="Açai image" className="w-full h-full" />
        </div>

        <div className="w-full text-center space-y-2 mt-4">
          <h1 className="text-white text-xl font-normal"></h1>
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

      <Link
        to={`/cart`}
        className="fixed bottom-0 px-5 flex items-center justify-center left-0 right-0 w-full border-t py-3"
      >
        <div className="w-full flex items-center justify-center gap-2 bg-primary text-secondary rounded-full py-2">
          <ShoppingCart className="w-6 h-6 text-secondary" weight="fill" />
          Ver carinho
        </div>
      </Link>

      {data.map((groupProduct) => (
        <GroupProducts
          key={groupProduct.id}
          id={groupProduct.id}
          title={groupProduct.title}
          products={groupProduct.products}
        />
      ))}
    </div>
  )
}
