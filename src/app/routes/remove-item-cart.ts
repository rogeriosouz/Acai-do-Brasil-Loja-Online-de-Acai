import { prisma } from '@/services/prisma'
import { type ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'

export async function action({ request }: ActionFunctionArgs) {
  try {
    const bodyStream = await request.formData()

    const schema = z.object({
      idItemProduct: z.string().uuid(),
    })

    const { idItemProduct } = schema.parse({
      idItemProduct: bodyStream.get('idItemProduct') ?? '',
    })

    const itemProduct = await prisma.itemCart.findUnique({
      where: {
        id: idItemProduct,
      },
    })

    if (!itemProduct) {
      throw new Error('Error item not found')
    }

    await prisma.itemCart.delete({
      where: {
        id: idItemProduct,
      },
    })

    const cart = await prisma.cart.findUnique({
      where: {
        id: itemProduct.cartId as string,
      },
    })

    if (!cart) {
      throw new Error('Erro cart not found')
    }

    await prisma.cart.update({
      where: {
        id: itemProduct.cartId as string,
      },
      data: {
        total: cart.total - itemProduct.price,
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
