import { GroupItems } from '@/components/GroupItems'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { Type } from '@/types/ProductRequest'

interface SectionItemFormProps {
  id: string
  title: string
  maximumQuantity: number
  types: Type[]
  handleChangerValues: (value: string | string[], name: string) => void
}

export function SectionItemForm({
  id,
  title,
  types,
  maximumQuantity,
  handleChangerValues,
}: SectionItemFormProps) {
  return (
    <div className="w-full">
      <div className="w-full text-white flex items-center justify-between px-2 bg-primary py-2">
        <h2 className="font-medium text-lg capitalize">{title}</h2>
        <span>Máximo {maximumQuantity} opção</span>
      </div>

      {maximumQuantity > 1 ? (
        <GroupItems
          handleChangerValues={handleChangerValues}
          quantLimit={maximumQuantity}
          title={title}
          types={types}
        />
      ) : (
        <>
          <RadioGroup
            onValueChange={(value) => {
              handleChangerValues(value, title)
            }}
            defaultValue="option-one"
          >
            {types.map((type) => (
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
  )
}
