import { convertePrice } from '@/utils/convertePrice'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Info, Warning } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Item } from '@/hooks/useCart'
import { converterOrderInText } from '@/utils/converterOrderInText'
import { Toggle } from '@/components/ui/toggle'
import { api } from '@/lib/api'
import { toast } from '@/components/ui/use-toast'

const regions = [
  {
    id: 1,
    price: 500,
    title: 'Realengo',
  },

  {
    id: 2,
    price: 550,
    title: 'Piraquara',
  },

  {
    id: 3,
    price: 900,
    title: 'Bangu',
  },
]

const schemaForm = z.object({
  road: z.string().min(1, 'Rua não pode ser vazio'),
  house: z.string().min(1, 'Casa não pode ser vazio'),
  complement: z.string(),
  region: z.string({ required_error: 'Região não pode ser vazio' }),
  paymentType: z.enum(['Credit card', 'Debit card', 'Money'], {
    required_error: 'Método de pagamento não pode ser vazio',
  }),
  changeMoney: z.string(),
  isChangeMoney: z.boolean(),
})

type CartForm = z.infer<typeof schemaForm>

interface FormMakeRequestProps {
  quantItemsCart: number
  totalCart: number
  items: Item[]
}

async function removeAllItemsCart(userId: string) {
  try {
    const bodyFormData = new FormData()

    bodyFormData.append('userId', userId)

    await api.post('/remove-all-items-cart', bodyFormData)
  } catch (error) {
    console.log(error)
  }
}

export function FormMakeRequest({
  quantItemsCart,
  totalCart,
  items,
}: FormMakeRequestProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  } = useForm<CartForm>({
    resolver: zodResolver(schemaForm),
    defaultValues: {
      changeMoney: 'R$ 0,00',
      isChangeMoney: false,
    },
  })

  const formatMoney = (value: string) => {
    const floatValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100

    return floatValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  async function submit(data: CartForm) {
    const order = {
      address: { ...data, region: regions[Number(data.region)] },
      payment: {
        type: data.paymentType,
        changeMoney: data.changeMoney,
        isChangeMoney: data.isChangeMoney,
      },
      items: items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quant,
        complements: {
          calda: item.complementsAdd.caldas ? item.complementsAdd.caldas : null,
          condimentos: item.complementsAdd.condimentos
            ? item.complementsAdd.condimentos
            : null,
          especial: item.complementsAdd.especial
            ? item.complementsAdd.especial
            : null,
          frutas: item.complementsAdd.frutas
            ? item.complementsAdd.frutas
            : null,
        },
      })),
    }

    const testOrder = converterOrderInText({ order, totalCart })

    const userId = localStorage.getItem('token-user-id')

    if (!userId) {
      toast({
        title:
          'Error ao fazer pedido verifique se você possui items no carinho',
        variant: 'destructive',
      })

      return
    }

    // await removeAllItemsCart(userId)

    window.location.href = `https://wa.me/5521982692350/?text=${testOrder}`
  }

  const totalWithDelivery = watch('region')
    ? regions[Number(watch('region'))].price + totalCart
    : totalCart

  const shippingPrice = watch('region')
    ? regions[Number(watch('region'))].price
    : null

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex px-4 border-t justify-center mb-10 items-center w-full gap-3 flex-col py-5"
    >
      <div className="w-full flex flex-col gap-2">
        <label className="w-full block space-y-1">
          <p className="text-primary">Região</p>
          <Controller
            name="region"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full h-[36px]">
                    <SelectValue placeholder="Escolha a região" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region, index) => (
                      <SelectItem key={region.id} value={String(index)}>{`${
                        region.title
                      }: ${convertePrice(region.price)}`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {error && (
                  <div className="flex items-center gap-2 w-full bg-red-200 py-1 px-2  rounded-full">
                    <Warning
                      className="w-5 h-5 text-destructive"
                      weight="fill"
                    />
                    <span className="text-destructive text-sm">
                      {errors.region?.message}
                    </span>
                  </div>
                )}
              </>
            )}
          />
        </label>

        <label className="w-full block space-y-1">
          <p className="text-primary">N: Rua</p>
          <Input placeholder="Ex: Rua 200" {...register('road')} />

          {errors.road && (
            <div className="flex items-center gap-2 w-full bg-red-200 py-1 px-2  rounded-full">
              <Warning className="w-5 h-5 text-destructive" weight="fill" />
              <span className="text-destructive text-sm">
                {errors.road.message}
              </span>
            </div>
          )}
        </label>

        <label className="w-full block space-y-1">
          <p className="text-primary">Casa</p>
          <Input placeholder="Ex: casa 10" {...register('house')} />

          {errors.house && (
            <div className="flex items-center gap-2 w-full bg-red-200 py-1 px-2  rounded-full">
              <Warning className="w-5 h-5 text-destructive" weight="fill" />
              <span className="text-destructive text-sm">
                {errors.house.message}
              </span>
            </div>
          )}
        </label>

        <label className="w-full block space-y-1">
          <p className="text-primary">Complemento</p>
          <Input placeholder="Complemento" {...register('complement')} />

          {errors.complement && (
            <span className="text-destructive text-sm">
              {errors.complement.message}
            </span>
          )}
        </label>

        <Separator className="my-2" />

        <label className="w-full block space-y-1">
          <p className="text-primary">Método de pagamento</p>
          <Controller
            control={control}
            name="paymentType"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full h-[36px] mb-1">
                    <SelectValue placeholder="Escolha o método de pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit card">
                      Cartão de crédito
                    </SelectItem>
                    <SelectItem value="Debit card">Cartão de debito</SelectItem>
                    <SelectItem value="Money">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>

                {error && (
                  <div className="flex items-center gap-2 w-full bg-red-200 py-1 px-2  rounded-full">
                    <Warning
                      className="w-5 h-5 text-destructive"
                      weight="fill"
                    />
                    <span className="text-destructive text-sm">
                      {error.message}
                    </span>
                  </div>
                )}
              </>
            )}
          />
          <div className="mt-2 bg-yellow-700/20 py-1 px-2 rounded-full flex items-center gap-1 text-yellow-700">
            <Info className="w-5 h-5" weight="fill" />
            <p className="text-sm">
              O pagamento sera feito na entrega do açaí/lanche
            </p>
          </div>
        </label>

        {watch('paymentType') === 'Money' && (
          <label className="w-full block space-y-1">
            <p className="text-primary">Troco para quanto</p>
            <div className="flex items-center gap-2">
              <Controller
                name="changeMoney"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    disabled={watch('isChangeMoney')}
                    value={value}
                    type="text"
                    className="flex-1"
                    onChange={(e) => {
                      onChange(formatMoney(e.target.value))
                    }}
                  />
                )}
              />

              <Controller
                name="isChangeMoney"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Toggle
                    onPressedChange={onChange}
                    value={value ? 'on' : 'off'}
                    variant={'outline'}
                    className="w-[45%]"
                  >
                    Não precisa de troco
                  </Toggle>
                )}
              />
            </div>

            {errors.changeMoney && (
              <div className="flex items-center gap-2 w-full bg-red-200 py-1 px-2  rounded-full">
                <Warning className="w-5 h-5 text-destructive" weight="fill" />
                <span className="text-destructive text-sm">
                  {errors.changeMoney.message}
                </span>
              </div>
            )}
          </label>
        )}
      </div>

      <Separator />

      <div className="w-full flex flex-col gap-2 px-1">
        <div className="w-full flex items-center justify-between">
          <h2 className="font-normal text-base">Quantidade</h2>
          <span>{quantItemsCart}</span>
        </div>

        {watch('region') && shippingPrice && (
          <div className="w-full flex items-center justify-between">
            <h2 className="font-normal text-base">Entrega</h2>
            <span>{convertePrice(shippingPrice)}</span>
          </div>
        )}

        <div className="w-full flex items-center justify-between">
          <h2 className="font-semibold text-lg">Total</h2>
          <span className="font-bold">{convertePrice(totalWithDelivery)}</span>
        </div>
      </div>

      <Separator />

      <Button type="submit" className="w-full mt-2">
        fazer pedido
      </Button>

      <div className="mt-2 w-full bg-yellow-700/20 py-1 px-2 rounded flex items-center gap-1 text-yellow-700">
        <Info className="w-5 h-5" weight="fill" />

        <p className="text-sm block flex-1">
          Assim que você clicar em fazer pedido você sera enviado para o
          Whatsapp com o pedido clique em enviar mensagem, qualquer duvida sobre
          o pedido fale com esse mesmo contado.
        </p>
      </div>
    </form>
  )
}
