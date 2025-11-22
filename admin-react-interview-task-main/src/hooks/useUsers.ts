import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@/api/users'
import type { UserListParams, User, UserStatus } from '@/types/user'

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  })
}

export function useUserStats() {
  // Fetch stats by making filtered queries for each status
  // This is more efficient than fetching all users
  return useQuery({
    queryKey: ['users', 'stats'],
    queryFn: async () => {
      // Get total count
      const totalResponse = await fetchUsers({
        page: 1,
        pageSize: 1,
      })
      const total = totalResponse.pagination.total

      // Fetch counts for each status using filters
      const [activeResponse, inactiveResponse, pendingResponse] =
        await Promise.all([
          fetchUsers({ page: 1, pageSize: 1, status: 'active' }),
          fetchUsers({ page: 1, pageSize: 1, status: 'inactive' }),
          fetchUsers({ page: 1, pageSize: 1, status: 'pending' }),
        ])

      return {
        total,
        active: activeResponse.pagination.total,
        inactive: inactiveResponse.pagination.total,
        pending: pendingResponse.pagination.total,
      }
    },
  })
}

export function useLatestActiveUsers(limit: number = 5) {
  return useQuery({
    queryKey: ['users', 'latest-active', limit],
    queryFn: async () => {
      // Fetch active users sorted by createdAt DESC
      const response = await fetchUsers({
        page: 1,
        pageSize: limit,
        status: 'active',
        sortBy: 'createdAt',
        direction: 'DESC',
      })
      
      return response.items
    },
  })
}

