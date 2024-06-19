import { prisma } from '@/services/prisma'
import { type ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'

export async function action({ request }: ActionFunctionArgs) {
  try {
    const bodyStream = await request.formData()

    const schema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = schema.parse({
      userId: bodyStream.get('userId') ?? '',
    })

    const cart = await prisma.cart.findFirst({
      where: {
        idUserBrowser: userId,
      },
    })

    if (!cart) {
      throw new Error('Erro cart not found')
    }

    await prisma.itemCart.deleteMany({
      where: {
        Cart: {
          id: cart.id,
        },
      },
    })

    return true
  } catch (error) {
    // const zodError = error as ZodError

    // const errors = zodError.errors.map((err) => {
    //   return { campo: err.path[0], message: err.message }
    // })

    throw new Error('Erro body')
  }
}
