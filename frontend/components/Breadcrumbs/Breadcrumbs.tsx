import { useTheme } from '@mui/material/styles'
import { useAppSelector } from '@redux/hooks'
import BreadcrumbsNext from 'nextjs-breadcrumbs'

import s from './Breadcrumbs.module.scss'

type Arr = {
  url_path: string
  name: string
}

interface BreadcrumbsProps {
  replaceList?: Arr
}

export const Breadcrumbs = ({
  replaceList = {
    url_path: '',
    name: '',
  },
}: BreadcrumbsProps) => {
  const theme = useTheme()

  const { categories, subcategories } = useAppSelector((s) => s.categories)

  const replaceCharacterList = [...categories, ...subcategories, replaceList].map((route) => ({
    from: route.url_path,
    to: route.name,
  }))

  return (
    <BreadcrumbsNext
      rootLabel='Главная'
      containerStyle={{ padding: '1.5rem 1rem' }}
      listStyle={{ display: 'flex', listStyle: 'none' }}
      activeItemStyle={{
        color: theme.palette.secondary.light,
      }}
      inactiveItemStyle={{ color: theme.palette.secondary.main }}
      replaceCharacterList={replaceCharacterList}
      inactiveItemClassName={s.inactiveItem}
      activeItemClassName={s.activeItem}
      listClassName={s.ul}
    />
  )
}
