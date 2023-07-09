import { useAppSelector } from '@redux/hooks'

interface useGetProductLinkProps {
  root_category: number
  category: number
  id: number
}

export const useGetProductLink = ({ root_category, category, id }: useGetProductLinkProps) => {
  const { categories } = useAppSelector((s) => s.categories)
  const categoryObj = categories.find((el) => el.id === root_category)
  const categoryPath = `${categoryObj?.url_path}/`
  const subcategoryPath = `${categoryObj?.children.find((el) => el.id === category)?.url_path}/`

  return `/${categoryPath}${subcategoryPath}${id}`
}
