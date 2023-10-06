import React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import type * as Radix from '@radix-ui/react-primitive'
import { CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils/utils'

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  Radix.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ children, ...restProps }, forwardedRef) => (
  <ToggleGroupPrimitive.Root
    className="bg-gray-50 border border-gray-200 rounded divide-x divide-gray-200"
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = 'ToggleGroup'

type ToggleItemProps = ToggleGroupPrimitive.ToggleGroupItemProps

const ToggleItem: React.FC<ToggleItemProps> = (props) => {
  return (
    <ToggleGroupPrimitive.Item
      {...props}
      className={cn(
        'w-full group flex items-center justify-start px-3 gap-2 py-2 border-b border-t',
        props.className,
      )}
    >
      <div className="border w-5 h-5 flex items-center justify-center rounded border-primary group-data-[state=on]:bg-primary">
        <CheckIcon className="hidden group-data-[state=on]:block text-white" />
      </div>

      {props.children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleItem }
