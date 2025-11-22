export type UserStatus = 'active' | 'inactive' | 'pending'

export interface Address {
  street: string
  city: string
  zip: string
  country: string
}

export interface Account {
  balance: number
  currency: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  address: Address
  account: Account
}

export interface UserListParams {
  page: number
  pageSize: number
  sortBy?: 'createdAt' | 'updatedAt'
  direction?: 'ASC' | 'DESC'
  status?: UserStatus
  email?: string
  balanceFrom?: number
  balanceTo?: number
}

export interface Pagination {
  total: number
  page: number
  pageSize: number
}

export interface UserListResponse {
  items: User[]
  pagination: Pagination
}

