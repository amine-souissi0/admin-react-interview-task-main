import { Card } from 'antd'
import {
  BulbOutlined,
  CloudOutlined,
  PoweroffOutlined,
} from '@ant-design/icons'
import type { FC } from 'react'

interface StatCardProps {
  title: string
  value: number
  description: string
  icon?: 'cloud' | 'bulb' | 'power'
}

const iconMap = {
  cloud: CloudOutlined,
  bulb: BulbOutlined,
  power: PoweroffOutlined,
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  const IconComponent = icon ? iconMap[icon] : null

  return (
    <Card
      className="tw:h-full tw:rounded-lg tw:shadow-sm tw:border tw:border-gray-200 tw:transition-all tw:duration-200 hover:tw:shadow-md hover:tw:border-gray-300"
      bodyStyle={{ padding: '24px' }}
    >
      <div className="tw:flex tw:flex-col tw:h-full tw:relative">
        {IconComponent && (
          <div className="tw:absolute tw:top-0 tw:right-0 tw:text-gray-300">
            <IconComponent className="tw:text-2xl" />
          </div>
        )}
        <h3 className="tw:text-base tw:font-medium tw:text-gray-700 tw:mb-4 tw:pr-8">
          {title}
        </h3>
        <p className="tw:text-4xl tw:font-bold tw:text-gray-900 tw:mb-3 tw:leading-tight">
          {value.toLocaleString()}
        </p>
        <p className="tw:text-sm tw:text-gray-500 tw:mt-auto tw:leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  )
}

