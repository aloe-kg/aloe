import React, { FC } from 'react'
import cn from 'clsx'

import s from './SearchbarIcon.module.scss'

type SearchBarIconProps = {
  isLoading?: boolean
}

export const SearchbarIcon: FC<SearchBarIconProps> = ({ isLoading }) => {
  return (
    <div className={cn(s.root, { [s.loading]: isLoading })}>
      <span>
        <svg viewBox='0 0 40 40'>
          <path d='M3,3 L37,37'></path>
        </svg>
      </span>
    </div>
  )
}
