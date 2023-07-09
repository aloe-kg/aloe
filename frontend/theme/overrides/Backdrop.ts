import { alpha, Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function Backdrop(theme: Theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: ['rgb(22,28,36)', alpha(theme.palette.grey[900], 0.48)],
          '&.MuiBackdrop-invisible': {
            background: 'transparent',
          },
        },
      },
    },
  }
}
