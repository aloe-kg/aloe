import { FC } from 'react'
import { useGetProductLink } from '@hooks'
import { IProduct } from '@interfaces'
import { MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

const MenuItemStyle = styled((props: any) => <MenuItem {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  whiteSpace: 'break-spaces',
}))

interface FoundItemsProps extends IProduct {
  route?: string
  onClose: () => void
}

export const FoundItems: FC<FoundItemsProps> = (props: FoundItemsProps) => {
  const { id, title, category, root_category, onClose } = props

  const link = useGetProductLink({
    category,
    root_category,
    id,
  })

  return (
    <Link href={link}>
      <a onClick={onClose}>
        <MenuItemStyle>{title}</MenuItemStyle>
      </a>
    </Link>
  )
}
