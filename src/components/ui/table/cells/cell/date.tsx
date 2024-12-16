import { cn } from '@/lib/utils'
import moment from 'moment'

const Date = ({
  className,
  value,
  format,
  withTime = false,
}: {
  className?: string
  value?: string | Date
  format?: string
  withTime?: boolean
}) => {
  if (!value) {
    return <>-</>
  }
  return (
    <div className={cn('plabs-caption-regular-sm text-text-black flex flex-col gap-1', className)}>
      <div>{moment(value).format(format ?? 'DD MMMM YYYY')}</div>
      {withTime && <div>{moment(value).format('HH:mm')}</div>}
    </div>
  )
}

export default Date
