export type VendorStatus = "pending" | "approved" | "rejected" | "suspended"
export type StoreType =
  | "any"
  | "groceries"
  | "fashion"
  | "electronics"
  | "home"
  | "beauty"
  | "sports"
  | "books"
  | "toys"
  | "health"
  | "automotive"
  | "jewelry"
  | "pets"
  | "baby"

export interface VendorUser {
  _id: string
  username: string
  email: string
}

export interface Vendor {
  _id: string
  user: VendorUser
  storeName: string
  storeDescription: string
  phoneNumber: string
  storeType: StoreType
  status: VendorStatus
  createdAt: string
  updatedAt: string
}

export interface VendorsResponse {
  message: string
  vendors: Vendor[]
}

export interface VendorStatusResponse {
  message: string
  vendor: Vendor
}
