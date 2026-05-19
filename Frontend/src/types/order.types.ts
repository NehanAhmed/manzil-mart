export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentMethod = 'COD' | 'CARD'

export interface OrderCustomer {
  _id: string
  username: string
  email: string
}

export interface OrderProduct {
  _id: string
  name: string
  images: string[]
}

export interface OrderItem {
  _id: string
  product: OrderProduct
  vendor: string
  quantity: number
  price: number
  status: OrderStatus
}

export interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  city: string
}

export interface Order {
  _id: string
  customer: OrderCustomer
  status: OrderStatus
  paymentMethod: PaymentMethod
  totalAmount: number
  items: OrderItem[]
  shippingAddress: ShippingAddress
  createdAt: string
  updatedAt: string
}