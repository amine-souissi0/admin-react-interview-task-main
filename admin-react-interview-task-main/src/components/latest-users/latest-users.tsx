import { Link } from '@tanstack/react-router'
import { Avatar, Spin } from 'antd'
import type { FC } from 'react'
import { useLatestActiveUsers } from '@/hooks/useUsers'
import { formatDate, getInitials } from '@/utils/formatting'
import type { User } from '@/types/user'

const UserItem: FC<{ user: User }> = ({ user }) => {
  const initials = getInitials(user)
  
  return (
    <div className="tw:flex tw:items-center tw:justify-between tw:py-4 tw:px-2 tw:border-b tw:border-gray-100 last:tw:border-b-0 tw:transition-colors tw:duration-150 hover:tw:bg-gray-50 tw:rounded tw:-tw:mx-2 tw:px-2">
      <div className="tw:flex tw:items-center tw:gap-4 tw:flex-1 tw:min-w-0">
        <Avatar
          size={44}
          className="tw:bg-blue-500 tw:text-white tw:flex tw:items-center tw:justify-center tw:flex-shrink-0 tw:shadow-sm"
          style={{ fontSize: '16px', fontWeight: 600 }}
        >
          {initials}
        </Avatar>
        <div className="tw:flex-1 tw:min-w-0">
          <p className="tw:font-medium tw:text-gray-900 tw:text-base tw:mb-1 tw:truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="tw:text-sm tw:text-gray-500 tw:truncate">{user.email}</p>
        </div>
      </div>
      <p className="tw:text-sm tw:text-gray-500 tw:ml-4 tw:flex-shrink-0">{formatDate(user.createdAt)}</p>
    </div>
  )
}

export const LatestUsers: FC = () => {
  const { data: users, isLoading, error } = useLatestActiveUsers(5)

  if (isLoading) {
    return (
      <div className="tw:flex tw:justify-center tw:py-8">
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="tw:text-red-500 tw:py-4">
        Failed to load latest users. Please try again later.
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div className="tw:text-gray-500 tw:py-4">
        No active users found.
      </div>
    )
  }

  return (
    <div className="tw:bg-white tw:rounded-lg tw:shadow-sm tw:border tw:border-gray-200 tw:p-6">
      <div className="tw:flex tw:items-center tw:justify-between tw:mb-6">
        <h2 className="tw:text-xl tw:font-semibold tw:text-gray-900">
          Last active users
        </h2>
        <Link
          to="/users/list"
          className="tw:text-blue-600 hover:tw:text-blue-700 tw:font-medium tw:transition-colors tw:duration-150 tw:flex tw:items-center tw:gap-1"
        >
          All users
          <span className="tw:text-lg tw:leading-none">&gt;</span>
        </Link>
      </div>
      <div>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

