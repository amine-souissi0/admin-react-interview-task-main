import type { Address, User } from '@/types/user'

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatAddress(address: Address): string {
  return `${address.street}, ${address.city}, ${address.zip}, ${address.country}`
}

export function formatFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`
}

export function getInitials(user: User): string {
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
}

