import { convertePrice } from '@/utils/convertePrice'
import { CircleNotch, Trash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useMutation } from 'react-query'
import type { Complement } from '@/hooks/useCart'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/querryClient'
import { useState } from 'react'

interface ItemProps {
  id: string
  quant: number
  price: number
  name: string
  complementsAdd: Complement
}

export function Item({ id, name, price, quant, complementsAdd }: ItemProps) {
  const [loadingRemoveItem, setLoadingRemoveItem] = useState(false)

  const removeItemCartMutation = useMutation<
    any,
    any,
    { idItemProduct: string }
  >(
    async ({ idItemProduct }) => {
      setLoadingRemoveItem(true)
      const bodyFormData = new FormData()
      bodyFormData.append('idItemProduct', idItemProduct)

      await api.post('/remove-item-cart', bodyFormData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cart']).finally(() => {
          setLoadingRemoveItem(false)
        })
      },
    },
  )

  function removeItemCart(idItemProduct: string) {
    removeItemCartMutation.mutate({ idItemProduct })
  }

  return (
    <div className="grid grid-cols-1 gap-2 px-4 border-t border-b">
      <div className="w-full py-5 flex items-center justify-between">
        <div className="flex flex-col gap-3 w-full">
          <div className="w-full flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-lg font-semibold">{name}</p>
              <span className="text-sm font-semibold">
                {quant} items {convertePrice(price)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                disabled={loadingRemoveItem}
                onClick={() => removeItemCart(id)}
                size={'icon'}
              >
                {loadingRemoveItem ? (
                  <CircleNotch className="animate-spin w-5 h-5" />
                ) : (
                  <Trash className="w-5 h-5" weight="fill" />
                )}
              </Button>
            </div>
          </div>

          <div className="w-full space-y-1">
            {complementsAdd.caldas && (
              <div className="w-full">
                <h2 className="text-base font-medium text-primary">Calda</h2>
                <p className="text-sm text-zinc-900">{complementsAdd.caldas}</p>
              </div>
            )}

            {complementsAdd.condimentos && (
              <div className="w-full">
                <h2 className="text-base font-medium text-primary">
                  Condimentos
                </h2>

                {complementsAdd.condimentos.map((condimento) => (
                  <p className="text-sm text-zinc-900" key={condimento}>
                    {condimento}
                  </p>
                ))}
              </div>
            )}

            {complementsAdd.frutas && (
              <div className="w-full">
                <h2 className="text-base font-medium text-primary">Frutas</h2>

                {complementsAdd.frutas.map((fruta) => (
                  <p className="text-sm text-zinc-900" key={fruta}>
                    {fruta}
                  </p>
                ))}
              </div>
            )}

            {complementsAdd.especial && (
              <div className="w-full">
                <h2 className="text-base font-medium text-primary">Especial</h2>

                <p className="text-sm text-zinc-900">
                  {complementsAdd.especial}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
