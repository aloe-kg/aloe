import { ICategory } from 'interfaces'

export const filterSubCategories = (
  subCategories: ICategory[],
  path: string
) => {
  return subCategories.filter((subCategory) =>
    subCategory.url_path.includes(path)
  )
}
