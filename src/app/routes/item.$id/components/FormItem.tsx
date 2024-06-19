import { Button } from '@/components/ui/button'
import { SectionItemForm } from './SectionItemForm'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { convertePrice } from '@/utils/convertePrice'
import { useState, type FormEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from '@remix-run/react'
import type { SectionsTypesProducts } from '@/types/ProductRequest'
import { useToast } from '@/components/ui/use-toast'
import { CircleNotch } from '@phosphor-icons/react'
import { api } from '@/lib/api'

interface FormItemProps {
  sectionsTypesProducts: SectionsTypesProducts[]
  productId: string
  price: number
}

export function FormItem({
  sectionsTypesProducts,
  productId,
  price,
}: FormItemProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({})
  const [quant, setQuant] = useState(1)

  const navigate = useNavigate()

  function handleChangerValues(value: string | string[], name: string) {
    setValues((valueAnt) => ({ ...valueAnt, [name]: value }))
  }

  async function submitForm(e: FormEvent) {
    setLoading(true)
    e.preventDefault()

    let id = localStorage.getItem('token-user-id')

    if (!id) {
      id = uuidv4()
      localStorage.setItem('token-user-id', id)
    }

    const bodyFormData = new FormData()

    bodyFormData.append('userId', id)
    bodyFormData.append('idProduct', productId)
    bodyFormData.append('values', JSON.stringify(values))
    bodyFormData.append('quant', `${quant}`)

    await api.post('/add-item-cart', bodyFormData)

    navigate('/')

    toast({
      title: 'Item adicionado com sucesso ao carinho',
    })
  }

  return (
    <form onSubmit={submitForm}>
      {sectionsTypesProducts.map((section) => (
        <SectionItemForm
          key={section.id}
          id={section.id}
          handleChangerValues={handleChangerValues}
          title={section.title}
          maximumQuantity={section.maximumQuantity}
          types={section.types}
        />
      ))}

      <div className="flex h-12 px-2 border-t items-center w-full gap-3 mt-8 py-8 ">
        <div className="w-full flex-1 flex items-center gap-2">
          <Button
            type="button"
            disabled={quant <= 1 || loading}
            onClick={() => setQuant((v) => v - 1)}
            size={'icon'}
          >
            <MinusIcon />
          </Button>

          <span className="text-lg">{quant}</span>

          <Button
            type="button"
            disabled={quant >= 6 || loading}
            onClick={() => setQuant((v) => v + 1)}
            size={'icon'}
          >
            <PlusIcon />
          </Button>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <CircleNotch className="animate-spin w-5 h-5" />
          ) : (
            `Adicionar ${convertePrice(price * quant)}`
          )}
        </Button>
      </div>
    </form>
  )
}
