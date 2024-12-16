import { Badge } from '@/components/ui/badge/badge'

const Status = ({ value, ...props }: { value: string; className?: string }) => {
  return <Badge status={value} {...props} />
}

export default Status
