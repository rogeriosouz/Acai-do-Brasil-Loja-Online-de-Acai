import { useCart } from '@/hooks/useCart'
import { CaretLeft } from '@phosphor-icons/react'
import { Link } from '@remix-run/react'

import { Item } from './components/Item'
import { FormMakeRequest } from './components/FormMakeRequest'
import { LoadingItem } from './components/LoadingItem'

export default function Cart() {
  const {
    querryCart: { data, status },
    isEmptyCart,
    quantItemsCart,
  } = useCart()

  return (
    <main>
      <div className="w-full h-20 px-4 flex relative items-center justify-between">
        <Link to={'/'} className="w-7 h-7 flex items-center justify-center">
          <CaretLeft className="w-7 h-7 text-primary" />
        </Link>

        <h1 className="font-semibold text-xl absolute left-1/2 -translate-x-1/2">
          Resumo do pedido
        </h1>

        <div></div>
      </div>

      <div className="w-full">
        {isEmptyCart ? (
          <div className="w-full flex items-center justify-center flex-col">
            <h1 className="text-lg font-medium">
              Você não possui item no carrinho
            </h1>

            <Link to={'/'}>Ver produtos</Link>
          </div>
        ) : (
          <div className="w-full bg-primary py-2 px-4 text-secondary">
            <h2 className="text-secondary text-lg font-medium">Items</h2>
          </div>
        )}

        {status === 'loading' && (
          <>
            <LoadingItem />
            <LoadingItem />
            <LoadingItem />
          </>
        )}

        {status === 'success' && data && (
          <>
            {data?.items.map((item) => (
              <Item
                id={item.id}
                key={item.id}
                name={item.name}
                price={item.price}
                complementsAdd={item.complementsAdd}
                quant={item.quant}
              />
            ))}
          </>
        )}

        {!isEmptyCart && data && quantItemsCart && (
          <>
            <div className="w-full bg-primary py-2 px-4 text-secondary mt-8 ">
              <h2 className="text-secondary text-lg font-medium">Endereço</h2>
            </div>

            <FormMakeRequest
              totalCart={data.total}
              quantItemsCart={quantItemsCart}
              items={data.items}
            />
          </>
        )}
      </div>
    </main>
  )
}
