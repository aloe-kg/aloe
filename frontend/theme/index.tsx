import { useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'

import componentsOverride from './overrides'
import palette from './palette'
import shadows, { customShadows } from './shadows'
import sizes from './sizes'
import typography from './typography'

type GREY0 = '#FFFFFF'
type GREY100 = '#F9FAFB'
type GREY200 = '#F4F6F8'
type GREY300 = '#DFE3E8'
type GREY400 = '#C4CDD5'
type GREY500 = '#919EAB'
type GREY600 = '#637381'
type GREY700 = '#454F5B'
type GREY800 = '#212B36'
type GREY900 = '#161C24'

declare module '@mui/material/styles' {
  interface Theme {
    sizes: {
      app_bar_desktop: 92
      app_bar_mobile: 64
      side_bar_width: 280
    }
    palette: {
      common: {
        black: '#000'
        white: '#fff'
      }
      primary: {
        light: '#2fa747'
        main: '#2a9540'
        dark: '#247f36'
        contrastText: '#fff'
      }
      secondary: {
        light: '#ff884d'
        main: '#ff7834'
        dark: '#ff661a'
        contrastText: '#fff'
      }
      info: {
        light: '#74CAFF'
        main: '#1890FF'
        dark: '#0C53B7'
        contrastText: '#fff'
      }
      success: {
        light: '#AAF27F'
        main: '#54D62C'
        dark: '#229A16'
        contrastText: GREY800
      }
      warning: {
        light: '#FFE16A'
        main: '#FFC107'
        dark: '#B78103'
        contrastText: GREY800
      }
      error: {
        light: '#FFA48D'
        main: '#FF4842'
        dark: '#B72136'
        contrastText: '#fff'
      }
      svg: {
        green: '#92e3a9'
        darkBlue: '#263238'
        white: '#fff'
        grey: '#ccc'
      }
      grey: {
        0: GREY0
        100: GREY100
        200: GREY200
        300: GREY300
        400: GREY400
        500: GREY500
        600: GREY600
        700: GREY700
        800: GREY800
        900: GREY900
        500_8: string
        500_12: string
        500_16: string
        500_24: string
        500_32: string
        500_48: string
        500_56: string
        500_80: string
      }
      gradients: {
        primary: string
        info: string
        success: string
        warning: string
        error: string
      }
      chart: {
        violet: string[]
        blue: string[]
        green: string[]
        yellow: string[]
        red: string[]
      }
      text: {
        primary: GREY800
        secondary: GREY600
        disabled: GREY500
      }
      background: {
        paper: '#fff'
        default: GREY100
        neutral: GREY200
      }
      action: {
        active: string
        hover: string
        selected: string
        disabled: string
        disabledBackground: string
        focus: string
        hoverOpacity: number
        disabledOpacity: number
      }
    }
  }
}

export default function ThemeProvider({ children }: any) {
  const themeOptions: any = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
      sizes,
    }),
    []
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}
