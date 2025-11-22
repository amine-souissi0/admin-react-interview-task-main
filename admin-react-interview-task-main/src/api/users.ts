import type {
  User,
  UserListParams,
  UserListResponse,
} from '@/types/user'

const API_BASE_URL = 'http://localhost:50000'

function buildQueryString(params: UserListParams): string {
  const searchParams = new URLSearchParams()
  
  searchParams.append('page', params.page.toString())
  searchParams.append('pageSize', params.pageSize.toString())
  
  if (params.sortBy) {
    searchParams.append('sortBy', params.sortBy)
  }
  if (params.direction) {
    searchParams.append('direction', params.direction)
  }
  if (params.status) {
    searchParams.append('status', params.status)
  }
  if (params.email) {
    searchParams.append('email', params.email)
  }
  if (params.balanceFrom !== undefined) {
    searchParams.append('balanceFrom', params.balanceFrom.toString())
  }
  if (params.balanceTo !== undefined) {
    searchParams.append('balanceTo', params.balanceTo.toString())
  }
  
  return searchParams.toString()
}

export async function fetchUsers(
  params: UserListParams,
): Promise<UserListResponse> {
  const queryString = buildQueryString(params)
  const url = `${API_BASE_URL}/users?${queryString}`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(error.message || `Failed to fetch users: ${response.statusText}`)
  }
  
  return response.json()
}

export async function fetchUserById(id: number): Promise<User> {
  const url = `${API_BASE_URL}/users/${id}`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found')
    }
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(error.message || `Failed to fetch user: ${response.statusText}`)
  }
  
  return response.json()
}

