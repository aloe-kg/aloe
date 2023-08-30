import { FC } from 'react'
import { ProductCard } from '@components'
import { IProduct } from '@interfaces'
import Grid from '@mui/material/Unstable_Grid2'

interface ProductListProps {
  productList: IProduct[]
}

export const ProductList: FC<ProductListProps> = ({ productList }) => {
  return (
    <Grid container>
      {productList?.map((product) => (
        <Grid xs={12} sm={4} md={3} lg={2.4} xl={2} key={product.id}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  )
}
