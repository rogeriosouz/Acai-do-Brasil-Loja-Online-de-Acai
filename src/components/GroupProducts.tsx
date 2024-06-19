import { CardProduct } from './CardProduct'

interface GroupProductsProps {
  id: string
  title: string
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export function GroupProducts({ id, title, products }: GroupProductsProps) {
  return (
    <section id={title} key={id} className="w-full">
      <div className="bg-primary w-full h-12 px-4 sticky top-[55px] flex items-center">
        <h1 className="text-2xl text-secondary font-semibold">{title}</h1>
      </div>

      {products.map((product) => (
        <CardProduct
          key={product.id}
          id={product.id}
          name={product.name}
          imageUrl={product.imageUrl}
          price={product.price}
        />
      ))}
    </section>
  )
}
