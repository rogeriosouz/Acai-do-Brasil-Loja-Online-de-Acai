export type Type = {
  id: string
  name: string
  sectionsTypesProductId: string
  create_at: Date
}

export type SectionsTypesProducts = {
  id: string
  title: string
  maximumQuantity: number
  create_at: Date
  productsId: string
  types: Type[]
}

export type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  sectionsProductsId: string | null
  create_at: Date
  sectionsTypesProducts: SectionsTypesProducts[]
}
