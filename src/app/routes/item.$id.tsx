import { prisma } from '@/services/prisma'
import { useLoaderData } from 'react-router'
import type { Product } from './_index'
import { ToggleGroup, ToggleItem } from '@/components/ui/toggle-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'

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

  console.log(product)
  return product
}

export default function Item() {
  const data = useLoaderData() as Product
  const [values, setValues] = useState({})

  function handleChangerValues(value: string | string[], name: string) {
    setValues((valueAnt) => ({ ...valueAnt, [name]: value }))
  }

  return (
    <main className="w-full">
      <section className="w-full h-[40vh]">
        <img
          className="w-full h-full object-contain"
          src={data.imageUrl}
          alt={data.name}
        />
      </section>
      <h1 className="text-center text-lg font-bold my-3">{data.name}</h1>

      <form>
        {data.sectionsTypesProducts.map((section) => (
          <div className="w-full" key={section.id}>
            <div className="w-full text-white flex items-center justify-between px-2 bg-primary py-2">
              <h2 className=" font-medium text-lg">{section.title}</h2>
              <span>Ate - {section.maximumQuantity}</span>
            </div>

            {section.maximumQuantity > 1 ? (
              <ToggleGroup
                onValueChange={(value) => {
                  handleChangerValues(value, section.title)
                }}
                type="multiple"
              >
                {section.types.map((type) => (
                  <ToggleItem
                    value={type.name}
                    key={type.id}
                    className="group relative"
                  >
                    <p className="text-base font-medium pb-1">{type.name}</p>
                  </ToggleItem>
                ))}
              </ToggleGroup>
            ) : (
              <>
                <RadioGroup
                  onValueChange={(value) => {
                    handleChangerValues(value, section.title)
                  }}
                  defaultValue="option-one"
                >
                  {section.types.map((type) => (
                    <label
                      key={type.id}
                      className="flex px-3 cursor-pointer py-2 border-y items-center space-x-2"
                    >
                      <RadioGroupItem value={type.name} id={type.name} />
                      <p className="text-base font-medium pb-1">{type.name}</p>
                    </label>
                  ))}
                </RadioGroup>
              </>
            )}
          </div>
        ))}

        <div className="flex h-12 px-2 border-t items-center w-full gap-3 mt-8 py-8 ">
          <div className="w-full flex-1 flex items-center gap-2">
            <Button type="button" size={'icon'}>
              <PlusIcon />
            </Button>

            <span className="text-lg">0</span>

            <Button type="button" size={'icon'}>
              <MinusIcon />
            </Button>
          </div>
          <Button type="submit" className="w-full">
            Adicionar no carinho
          </Button>
        </div>
      </form>
    </main>
  )
}
