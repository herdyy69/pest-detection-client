import { cn } from '@/lib/utils'
import Link from 'next/link'

const Text = ({ className = '', value, ...rest }: React.HTMLAttributes<HTMLDivElement> & { value: any }) => {
  return (
    <div className={cn('flex flex-col gap-1 w-full plabs-caption-regular-sm text-text-black', className)} {...rest}>
      {value}
    </div>
  )
}

const HTML = ({ className = '', value, ...rest }: React.HTMLAttributes<HTMLDivElement> & { value: any }) => {
  return (
    <div
      className={cn('flex flex-col gap-1 w-full plabs-caption-regular-sm text-text-black', className)}
      {...rest}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

const Description = ({ className = '', value, ...rest }: React.HTMLAttributes<HTMLDivElement> & { value: any }) => {
  return (
    <div className={cn('flex flex-col gap-1 w-full plabs-caption-regular-xs text-text-black', className)} {...rest}>
      {value}
    </div>
  )
}

const TextLink = ({
  className = '',
  href = '#',
  value,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { value: any }) => {
  return (
    <Link
      href={href}
      className={cn('flex-col gap-1 w-full plabs-caption-regular-sm text-text-black hover:underline inline', className)}
      {...rest}
    >
      {value}
    </Link>
  )
}

const TableLink = ({
  className = '',
  text,
  description,
  href,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { text: any; description: any }) => (
  <div className={cn('flex flex-col gap-1', className)}>
    <TextLink href={href} {...rest} value={text} />
    <Description className='capitalize text-text-grey' value={description} />
  </div>
)

const TableText = ({
  className = '',
  text,
  description,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { text: any; description: any }) => (
  <div className={cn('flex flex-col gap-1', className)}>
    <Text {...rest} value={text} />
    <Description className='text-text-grey' value={description} />
  </div>
)

export { Text, HTML, Description, TextLink, TableLink, TableText }
