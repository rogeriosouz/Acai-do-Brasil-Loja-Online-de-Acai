import { prisma } from '@/services/prisma'
import type { ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'

export async function loader({ request, params }: ActionFunctionArgs) {
  try {
    const schema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = schema.parse({
      userId: params.userId,
    })

    const cart = await prisma.cart.findUnique({
      where: {
        idUserBrowser: userId,
      },
      include: {
        items: true,
      },
    })

    const data = {
      id: cart?.id,
      total: cart?.total,
      idUserBrowser: cart?.idUserBrowser,
      create_at: cart?.create_at,
      items: cart?.items.map((item) => {
        return {
          ...item,
          complementsAdd: JSON.parse(JSON.parse(item.complementsAdd)),
        }
      }),
    }

    return data
  } catch (error) {
    // const zodError = error as ZodError

    // const errors = zodError.errors.map((err) => {
    //   return { campo: err.path[0], message: err.message }
    // })

    throw new Error('Error body')
  }
}
