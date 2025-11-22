import { Breadcrumb, Col, Row, Spin } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { StatCard } from '@/components/stat-card/stat-card'
import { LatestUsers } from '@/components/latest-users/latest-users'
import { useUserStats } from '@/hooks/useUsers'

const Dashboard: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const { data: stats, isLoading, error } = useUserStats()

  return (
    <div className="tw:p-8 tw:bg-gray-50 tw:min-h-screen">
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
        ]}
      />

      {/* Welcome Message */}
      <h1 className="tw:text-4xl tw:font-bold tw:text-gray-900 tw:mb-8 tw:leading-tight">
        {t('dashboard.welcome')}
      </h1>

      {/* Error State */}
      {error && (
        <div className="tw:bg-red-50 tw:border tw:border-red-200 tw:text-red-700 tw:px-4 tw:py-3 tw:rounded-lg tw:mb-6 tw:shadow-sm">
          {t('dashboard.error')}
        </div>
      )}

      {/* Statistics Cards */}
      {isLoading ? (
        <div className="tw:flex tw:justify-center tw:py-8 tw:mb-8">
          <Spin size="large" />
        </div>
      ) : stats ? (
        <Row gutter={[24, 24]} className="tw:mb-10">
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <StatCard
              title={t('dashboard.totalUsers')}
              value={stats.total}
              description={t('dashboard.totalUsersDesc')}
              icon="cloud"
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <StatCard
              title={t('dashboard.activeUsers')}
              value={stats.active}
              description={t('dashboard.activeUsersDesc')}
              icon="bulb"
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <StatCard
              title={t('dashboard.inactiveUsers')}
              value={stats.inactive}
              description={t('dashboard.inactiveUsersDesc')}
              icon="power"
            />
          </Col>
        </Row>
      ) : null}

      {/* Last Active Users Section */}
      <LatestUsers />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Dashboard,
})
