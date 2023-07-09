import { ChangeEventHandler, useEffect, useState } from 'react'
import { FoundItems, SearchbarIcon } from '@components'
import { useDebounce } from '@hooks'
import { IProduct } from '@interfaces'
import { Clear } from '@mui/icons-material'
import {
  Button,
  ClickAwayListener,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  MenuList,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { useAppDispatch } from '@redux/hooks'
import { searchValueUpdated } from '@redux/searchBarSlice'
import { BASE_URL } from 'api'
import axios from 'axios'
import { useRouter } from 'next/router'

const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const SearchbarStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  height: APPBAR_MOBILE,
  display: 'flex',
  alignItems: 'center',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
  },
}))

const FoundItemsStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: APPBAR_MOBILE,
  left: 0,
  zIndex: 99,
  width: '100%',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: `0 8px 16px 0 ${alpha('#919EAB', 0.2)}`,
  backgroundColor: `${alpha(theme.palette.background.default, 0.95)}`,

  [theme.breakpoints.up('md')]: {
    top: APPBAR_DESKTOP,
  },
}))

const MenuListStyle = styled(MenuList)({
  maxHeight: 348,
  overflowY: 'scroll',
})

const TypographyStyle = styled((props: any) => <Typography {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  padding: '6px 16px',
}))

const MenuItemStyle = styled((props: any) => <MenuItem {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  whiteSpace: 'break-spaces',
}))

export const Searchbar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isOpen, setOpen] = useState(false)
  const [foundList, setFoundList] = useState([])

  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const debValue = useDebounce(inputValue.trim(), 300)

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    setInputValue(value)

    if (!isLoading && value.length >= 2) setIsLoading(true)
    else {
      setFoundList([])
      setIsLoading(false)
    }
  }

  const searchReset = () => {
    if (inputValue.length > 0) {
      setInputValue('')
      setFoundList([])
      setNotFound(false)
      setIsLoading(false)
      // setOpen(false)
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    setOpen(false)
    setFoundList([])
    setInputValue('')

    if (!inputValue) return
    dispatch(searchValueUpdated(inputValue.trim()))
    router.push('/search')
  }

  useEffect(() => {
    if (!isOpen) {
      setNotFound(false)
      setIsLoading(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    if (debValue.length < 2) return

    axios(`${BASE_URL}/products/search/?limit=20&query=${debValue}`)
      .then(({ data }) => {
        if (data?.results?.length) {
          setNotFound(false)
        } else setNotFound(true)

        setFoundList(data?.results || [])
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.warn(err))
      .finally(() => setIsLoading(false))
  }, [debValue, isOpen])

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <form onSubmit={onSubmit}>
        {!isOpen && (
          <Stack
            direction='row'
            alignItems='center'
            onClick={() => setOpen(true)}
            sx={{ cursor: 'text' }}
          >
            <IconButton>
              <SearchbarIcon isLoading={false} />
            </IconButton>
            <Typography sx={{ color: 'text.disabled', fontWeight: 'fontWeightBold' }}>
              Поиск...
            </Typography>
          </Stack>
        )}
        <Slide
          direction='down'
          in={isOpen}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          mountOnEnter
          unmountOnExit
        >
          <SearchbarStyle>
            <Input
              value={inputValue}
              onChange={handleSearch}
              autoFocus
              fullWidth
              disableUnderline
              placeholder='Поиск…'
              startAdornment={
                <InputAdornment position='start'>
                  <SearchbarIcon isLoading={isLoading} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Stack direction='row' alignItems='center' spacing={1}>
              <IconButton type='button' onClick={searchReset}>
                <Clear fontSize='small' />
              </IconButton>
              <Button type='submit' color='primary' variant='contained'>
                Поиск
              </Button>
            </Stack>
          </SearchbarStyle>
        </Slide>
        <Slide
          direction='down'
          in={(foundList.length > 0 || notFound) && isOpen}
          mountOnEnter
          unmountOnExit
        >
          <FoundItemsStyle>
            <MenuListStyle>
              {notFound ? (
                <MenuItemStyle py={1}>
                  <TypographyStyle>По вашему запросу ничего не найдено</TypographyStyle>
                </MenuItemStyle>
              ) : (
                foundList?.map((el: IProduct) => (
                  <FoundItems onClose={() => setOpen(false)} {...el} key={el.id} />
                ))
              )}
            </MenuListStyle>
          </FoundItemsStyle>
        </Slide>
      </form>
    </ClickAwayListener>
  )
}
