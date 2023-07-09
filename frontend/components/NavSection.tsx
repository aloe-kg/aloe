import { FC, useEffect, useState } from 'react'
import { Iconify } from '@components'
import { ICategory } from '@interfaces'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAppSelector } from '@redux/hooks'
import { ICategoryWithChild } from 'interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ParentListItemStyle = styled((props: any) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    paddingLeft: 8,
    paddingRight: 8,
    height: 48,
    position: 'relative',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  })
)

const ChildListItemStyle = styled((props: any) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    paddingLeft: 8,
    paddingRight: 8,
    height: 48,
    position: 'relative',
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  })
)

interface NavItemProps {
  item: ICategoryWithChild
  openedCategory: string
  setOpenedCategory: (value: string) => void
  asPath: string
  onClose: () => void
}

const NavItem: FC<NavItemProps> = ({
  item,
  openedCategory,
  setOpenedCategory,
  asPath,
  onClose,
}) => {
  const { children, name, url_path: parentPath } = item

  const open = openedCategory === parentPath

  const handleOpen = () => {
    if (open) setOpenedCategory('')
    else setOpenedCategory(parentPath ?? '')
  }

  const activeRootStyle = {
    color: 'secondary.main',
  }

  const activeSubStyle = {
    color: 'primary.main',
  }

  if (children.length > 0) {
    return (
      <>
        <ParentListItemStyle onClick={handleOpen}>
          <ListItemText
            disableTypography
            primary={name}
            sx={{
              ...(open && activeRootStyle),
            }}
          />
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ParentListItemStyle>

        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding sx={{ paddingLeft: 2 }}>
            {children.map(({ id, name, url_path }: ICategory) => {
              const open = asPath.includes(`/${parentPath}/${url_path}`)

              return (
                <Link key={id} href={`/${parentPath}/${url_path}`}>
                  <a onClick={onClose}>
                    <ChildListItemStyle key={id}>
                      <ListItemText
                        disableTypography
                        primary={name}
                        sx={{
                          ...(open && activeSubStyle),
                        }}
                      />
                    </ChildListItemStyle>
                  </a>
                </Link>
              )
            })}
          </List>
        </Collapse>
      </>
    )
  }

  return (
    <ParentListItemStyle>
      <ListItemText disableTypography primary={name} />
    </ParentListItemStyle>
  )
}

interface NavSectionProps {
  onClose: () => void
}

export const NavSection: FC<NavSectionProps> = ({ onClose }) => {
  const { categories } = useAppSelector((s) => s.categories)

  const [openedCategory, setOpenedCategory] = useState('')

  const { asPath, query } = useRouter()

  useEffect(() => {
    if (asPath === '/') return setOpenedCategory('')

    if (query?.category) return setOpenedCategory(query?.category.toString())
  }, [asPath, query])

  return (
    <List disablePadding sx={{ p: 1, overflowY: 'scroll', flex: 1 }}>
      {categories.map((item: ICategoryWithChild) => (
        <NavItem
          key={item.id}
          item={item}
          setOpenedCategory={setOpenedCategory}
          openedCategory={openedCategory}
          asPath={asPath}
          onClose={onClose}
        />
      ))}
    </List>
  )
}
