// ----------------------------------------------------------------------

import { Theme } from '@mui/material/styles'

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        overline: {
          color: theme.palette.text.disabled,
        },
      },
    },
  }
}
