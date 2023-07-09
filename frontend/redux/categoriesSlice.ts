import { ICategory, ICategoryWithChild } from '@interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialStateProps {
  all: ICategory[]
  categories: ICategoryWithChild[]
  subcategories: ICategory[]
}

const initialState: InitialStateProps = {
  all: [],
  categories: [],
  subcategories: [],
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    allAdded(state: InitialStateProps, action: PayloadAction<ICategory[]>) {
      const all = action.payload.sort((a, b) => {
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
        return 0
      })

      const categories = action.payload
        .filter((el) => el.id === el.parent)
        .sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })
        .map((el, idx) => ({
          ...el,
          order: idx + 1,
          children: <any>[],
        }))

      const subcategories = action.payload
        .filter((el) => el.id !== el.parent)
        .sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })

      subcategories.forEach((el) =>
        categories.find((item) => item.id === el.parent)?.children.push(el)
      )

      let totalChildrenCount = 0
      const allChildren: ICategory[] = []

      const categoriesWithOrderedChildren = categories.map((category, idx, arr) => {
        const prevChildrenCount = arr[idx - 1]?.children?.length || 0
        totalChildrenCount += prevChildrenCount

        const children = category.children.map((child: ICategory, idx: number) => {
          const orderChild = {
            ...child,
            order: idx + 1 + totalChildrenCount,
          }
          allChildren.push(orderChild)
          return orderChild
        })

        return {
          ...category,
          children,
        }
      })

      state.all = all
      state.categories = categoriesWithOrderedChildren
      state.subcategories = allChildren
    },
  },
})

export const { allAdded } = categoriesSlice.actions
export default categoriesSlice.reducer
