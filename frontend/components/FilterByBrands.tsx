import { Box, Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

const ButtonBrand = styled(Button)(() => ({
  borderRadius: '20px',
  boxShadow: '0px 1px 12px rgb(0 0 0 / 10%)',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  minWidth: 'auto',
  fontSize: 14,
}))

type BrandsProps = { name: string; toggled: boolean }[]

interface FilterButtonProps {
  name: string
  toggled: boolean
  setBrands: (data: (prev: BrandsProps) => BrandsProps) => void
}

const FilterButton = ({ name, toggled, setBrands }: FilterButtonProps) => {
  const brandToggle = () => {
    setBrands((prev) => prev.map((el) => (el.name === name ? { ...el, toggled: !el.toggled } : el)))
  }
  return (
    <ButtonBrand
      variant={toggled ? 'contained' : 'outlined'}
      color={toggled ? 'primary' : 'inherit'}
      onClick={brandToggle}
    >
      {name}
    </ButtonBrand>
  )
}

type Meta = { total: number; page: number; limit: number }

interface FilterByBrandsProps {
  brands: BrandsProps
  setBrands: any
  setMeta: (value: (prev: Meta) => Meta) => void
}

export const FilterByBrands = ({ brands, setBrands }: FilterByBrandsProps) => {
  return (
    <Box sx={{ padding: '0 15px' }}>
      <Stack direction='row' flexWrap='wrap' gap={1} alignItems='center' mb={1.6}>
        {brands?.map((brand) => (
          <FilterButton
            name={brand.name}
            toggled={brand.toggled}
            setBrands={setBrands}
            key={brand.name}
          />
        ))}
      </Stack>
    </Box>
  )
}
