import React from 'react'
import { ICategory, ICategoryWithChild } from '@interfaces'
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt'
import { Box, Paper, Typography } from '@mui/material'
import { useAppSelector } from '@redux/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const NextSubcategory = () => {
  const { subcategories, categories } = useAppSelector((s) => s.categories)
  const { query } = useRouter()

  const category = categories.find((el: ICategoryWithChild) => el.url_path === query.category)

  const subcategory = category?.children.find((el: ICategory) => el.url_path === query.subcategory)
  const currentOrder = subcategory?.order || 0
  const isLastSubcategory = currentOrder === subcategories.length
  const nextSubcategory = isLastSubcategory
    ? subcategories[0]
    : subcategories.find((el: ICategory) => el.order === currentOrder + 1)
  const subcategoryPath = nextSubcategory?.url_path
  const categoryPath = categories.find(
    (el: ICategoryWithChild) => el.id === nextSubcategory?.parent
  )?.url_path

  return (
    <>
      <Box p={2}>
        <Link href={`/${categoryPath}/${subcategoryPath}`}>
          <a>
            <Paper sx={{ p: 3, display: 'inline-block' }}>
              <Typography
                variant='body1'
                color='secondary'
                sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
              >
                {isLastSubcategory ? 'Перейти в начало' : 'Перейти в следующий раздел'}
                <ArrowRightAlt />
              </Typography>
              <Typography variant='h3'>{nextSubcategory?.name}</Typography>
            </Paper>
          </a>
        </Link>
      </Box>
    </>
  )
}
