import { IProduct } from './IProduct'

export interface IProductsByCategory {
  name: string
  ten_products: IProduct[]
  url_path: string
}
