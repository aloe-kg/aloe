import { BASE_URL } from 'api'
import axios from 'axios'
import { ICategory } from 'interfaces'

export async function loadCategories() {
  const data: ICategory[] = await (await axios(`${BASE_URL}/categories`)).data

  const filteredData = data.filter((category) => category.url_path)

  const categories: ICategory[] = []
  const subcategories: ICategory[] = []

  filteredData.forEach((category) => {
    if (category.id === category.parent) {
      categories.push(category)
    } else {
      subcategories.push(category)
    }
  })

  return {
    categories,
    subcategories,
  }
}
