export interface ICategory {
  id: number
  image: string
  name: string
  order: number
  description: string
  url_path: string
  parent: number
}

export interface ICategoryWithChild extends ICategory {
  children: ICategory[]
}
