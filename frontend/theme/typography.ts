function pxToRem(value: number) {
  return `${value / 16}rem`
}

function responsiveFontSizes({ sm, md, lg }: any) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  }
}

const FONT_PRIMARY = 'Public Sans, sans-serif'

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 1.25,
    fontSize: pxToRem(26),
    ...responsiveFontSizes({ sm: 28, md: 30, lg: 32 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 1.25,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 22, md: 24, lg: 26 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.25,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 22 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.25,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ sm: 14, md: 16, lg: 18 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ sm: 12, md: 14, lg: 16 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(8),
    ...responsiveFontSizes({ sm: 10, md: 12, lg: 14 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 1.5,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    textDecoration: 'line-through',
    textTransform: 'none',
  },
  button: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    textTransform: 'none',
  },
}

export default typography
