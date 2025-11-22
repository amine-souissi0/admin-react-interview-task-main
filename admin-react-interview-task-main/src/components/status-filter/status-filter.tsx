import { Select } from 'antd'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserStatus } from '@/types/user'

interface StatusFilterProps {
  value?: UserStatus | 'all'
  onChange?: (value: UserStatus | 'all') => void
}

export const StatusFilter: FC<StatusFilterProps> = ({
  value = 'all',
  onChange,
}) => {
  const { t } = useTranslation()

  const options = [
    { label: t('usersList.all'), value: 'all' },
    { label: t('usersList.active'), value: 'active' },
    { label: t('usersList.inactive'), value: 'inactive' },
    { label: t('usersList.pending'), value: 'pending' },
  ]

  return (
    <div className="tw:mb-6">
      <label className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-2">
        {t('usersList.filterByStatus')}
      </label>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        className="tw:w-full sm:tw:w-64"
        size="large"
        style={{ borderRadius: '6px' }}
      />
    </div>
  )
}

