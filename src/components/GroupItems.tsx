import type { Type } from '@/types/ProductRequest'
import { useState } from 'react'
import { ToggleGroup, ToggleItem } from './ui/toggle-group'

interface GroupProps {
  handleChangerValues: (value: string | string[], title: string) => void
  types: Type[]
  title: string
  quantLimit: number
}

export function GroupItems({
  title,
  quantLimit,
  handleChangerValues,
  types,
}: GroupProps) {
  const [values, setValues] = useState<string[]>([])

  function addvalueForm(value: string[]) {
    setValues(value)
    handleChangerValues(value, title)
  }

  return (
    <ToggleGroup onValueChange={addvalueForm} type="multiple">
      {types.map((type) => (
        <ToggleItem
          disabled={!values.includes(type.name) && values.length >= quantLimit}
          value={type.name}
          key={type.id}
          className="group relative"
        >
          <p className="text-base font-medium pb-1">{type.name}</p>
        </ToggleItem>
      ))}
    </ToggleGroup>
  )
}
