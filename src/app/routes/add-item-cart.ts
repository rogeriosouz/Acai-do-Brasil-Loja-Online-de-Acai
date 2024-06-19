import { prisma } from '@/services/prisma'
import { type ActionFunctionArgs } from '@remix-run/node'
import { z } from 'zod'

export async function action({ request }: ActionFunctionArgs) {
  try {
    const bodyStream = await request.formData()

    const schema = z.object({
      userId: z.string().uuid(),
      idProduct: z.string().uuid(),
      values: z.string(),
      quant: z.string().transform((quant) => Number(quant)),
    })

    const { quant, idProduct, userId, values } = schema.parse({
      userId: bodyStream.get('userId') ?? '',
      idProduct: bodyStream.get('idProduct') ?? '',
      values: bodyStream.get('values') ?? '',
      quant: bodyStream.get('quant') ?? '',
    })

    let cart = await prisma.cart.findUnique({
      where: {
        idUserBrowser: userId,
      },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          idUserBrowser: userId,
          total: 0,
        },
      })
    }

    const product = await prisma.products.findUnique({
      where: {
        id: idProduct,
      },
    })

    if (!product) {
      throw new Error('product not found')
    }

    const itemCart = await prisma.itemCart.findFirst({
      where: {
        name: product.name,
        AND: {
          complementsAdd: JSON.stringify(values),
        },
      },
    })

    if (itemCart) {
      await prisma.itemCart.update({
        where: {
          id: itemCart.id,
        },
        data: {
          price: itemCart.price * (itemCart.quant + 1),
          quant: itemCart.quant + 1,
          Cart: {
            update: {
              total: itemCart.price * (itemCart.quant + 1) + cart.total,
            },
          },
        },
      })
    } else {
      const price = product?.price * Number(quant)

      await prisma.itemCart.create({
        data: {
          price,
          name: product?.name,
          complementsAdd: JSON.stringify(values),
          quant: Number(quant),
          Cart: {
            connect: {
              id: cart?.id,
            },
          },
        },
      })

      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          total: price + cart.total,
        },
      })
    }

    return true
  } catch (error) {
    // const zodError = error as ZodError

    // const errors = zodError.errors.map((err) => {
    //   return { campo: err.path[0], message: err.message }
    // })

    throw new Error('Erro body')
  }
}
