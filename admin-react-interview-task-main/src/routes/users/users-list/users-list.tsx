import { Badge, Breadcrumb, Spin, Table } from 'antd'
import { HomeOutlined, TeamOutlined } from '@ant-design/icons'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { StatusFilter } from '@/components/status-filter/status-filter'
import { useUsers } from '@/hooks/useUsers'
import {
  formatAddress,
  formatCurrency,
  formatDate,
  formatFullName,
} from '@/utils/formatting'
import type { User, UserStatus } from '@/types/user'
import type { ColumnType } from 'antd/es/table'

const searchSchema = z.object({
  status: z.enum(['all', 'active', 'inactive', 'pending']).optional().catch('all'),
  page: z.number().int().min(1).optional().catch(1),
  pageSize: z.number().int().min(1).max(100).optional().catch(10),
})

const UsersList: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const search = useSearch({ from: '/users/list' })
  
  const status = search.status || 'all'
  const page = search.page || 1
  const pageSize = search.pageSize || 10

  const statusFilter: UserStatus | undefined =
    status === 'all' ? undefined : (status as UserStatus)

  const { data, isLoading, error } = useUsers({
    page,
    pageSize,
    status: statusFilter,
    sortBy: 'createdAt',
    direction: 'DESC',
  })

  const handleStatusChange = (newStatus: UserStatus | 'all') => {
    navigate({
      to: '/users/list',
      search: {
        status: newStatus,
        page: 1, // Reset to first page when filter changes
        pageSize,
      },
    })
  }

  const handleTableChange = (newPage: number, newPageSize: number) => {
    navigate({
      to: '/users/list',
      search: {
        status,
        page: newPage,
        pageSize: newPageSize,
      },
    })
  }

  const getStatusBadge = (status: UserStatus) => {
    const statusConfig = {
      active: { color: 'green', text: t('usersList.active') },
      inactive: { color: 'red', text: t('usersList.inactive') },
      pending: { color: 'orange', text: t('usersList.pending') },
    }
    const config = statusConfig[status]
    return <Badge color={config.color} text={config.text} />
  }

  const columns: ColumnType<User>[] = [
    {
      title: t('usersList.columns.name'),
      dataIndex: 'firstName',
      key: 'name',
      render: (_: unknown, record: User) => formatFullName(record),
      sorter: false,
    },
    {
      title: t('usersList.columns.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('usersList.columns.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus) => getStatusBadge(status),
    },
    {
      title: t('usersList.columns.address'),
      dataIndex: 'address',
      key: 'address',
      render: (address: User['address']) => formatAddress(address),
    },
    {
      title: t('usersList.columns.balance'),
      dataIndex: 'account',
      key: 'balance',
      render: (account: User['account']) =>
        formatCurrency(account.balance, account.currency),
      align: 'right',
    },
    {
      title: t('usersList.columns.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
  ]

  return (
    <div className="tw:p-6 tw:bg-gray-50 tw:min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumb
        className="tw:mb-6"
        items={[
          {
            href: '/',
            title: (
              <span>
                <HomeOutlined />
                <span className="tw:ml-2">Home</span>
              </span>
            ),
          },
          {
            title: (
              <span>
                <TeamOutlined />
                <span className="tw:ml-2">{t('usersList.title')}</span>
              </span>
            ),
          },
        ]}
      />

      {/* Page Title */}
      <h1 className="tw:text-3xl tw:font-bold tw:text-gray-900 tw:mb-6">
        {t('usersList.title')}
      </h1>

      {/* Status Filter */}
      <StatusFilter value={status} onChange={handleStatusChange} />

      {/* Error State */}
      {error && (
        <div className="tw:bg-red-50 tw:border tw:border-red-200 tw:text-red-700 tw:px-4 tw:py-3 tw:rounded-lg tw:mb-4 tw:shadow-sm">
          {t('usersList.error')}
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="tw:flex tw:justify-center tw:py-12">
          <Spin size="large" />
        </div>
      ) : data ? (
        <div className="tw:bg-white tw:rounded-lg tw:shadow-sm tw:border tw:border-gray-200 tw:overflow-hidden">
          <Table
            columns={columns}
            dataSource={data.items}
            rowKey="id"
            pagination={{
              current: page,
              pageSize: pageSize,
              total: data.pagination.total,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} users`,
              pageSizeOptions: ['10', '20', '50', '100'],
              onChange: handleTableChange,
              onShowSizeChange: (_current, size) =>
                handleTableChange(1, size),
            }}
            scroll={{ x: 'max-content' }}
            className="tw:rounded-lg"
            rowClassName="hover:tw:bg-gray-50 tw:transition-colors tw:duration-150"
          />
        </div>
      ) : (
        <div className="tw:text-gray-500 tw:py-8 tw:text-center">
          {t('usersList.noUsers')}
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/users/list')({
  component: UsersList,
  validateSearch: searchSchema,
})
