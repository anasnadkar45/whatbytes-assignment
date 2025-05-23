export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  brand: string
  rating: number
  availabilityStatus: string
  dimensions: {
    width: number
    height: number
    depth: number
  }
  discountPercentage: number
  images: string[]
  thumbnail: string
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  minimumOrderQuantity: number
  returnPolicy: string
  reviews: any[] // You can define a `Review` type if review structure is known
  shippingInformation: string
  sku: string
  stock: number
  tags: string[]
  warrantyInformation: string
  weight: number
}
