export const FlagEn = () => {
  return (
    <svg
      height='20'
      viewBox='0 0 28 20'
      width='28'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <rect id='a' height='20' rx='3' width='28' />
        <mask id='b' fill='#fff'>
          <use fill='#fff' fillRule='evenodd' xlinkHref='#a' />
        </mask>
      </defs>
      <g fill='none' fillRule='evenodd'>
        <use fill='#0a17a7' xlinkHref='#a' />
        <path
          d='m29.2824692-1.91644623 1.4911811 2.21076686-9.4483006 6.37223314 6.6746503.0001129v6.66666663l-6.6746503-.0007795 9.4483006 6.3731256-1.4911811 2.2107668-11.9501195-8.0608924.0009836 7.4777795h-6.6666666l-.000317-7.4777795-11.9488189 8.0608924-1.49118107-2.2107668 9.448-6.3731256-6.67434973.0007795v-6.66666663l6.67434973-.0001129-9.448-6.37223314 1.49118107-2.21076686 11.9488189 8.06.000317-7.4768871h6.6666666l-.0009836 7.4768871z'
          fill='#fff'
          mask='url(#b)'
        />
        <g stroke='#db1f35' strokeLinecap='round' strokeWidth='.667'>
          <path d='m18.668 6.332 12.665-8.332' mask='url(#b)' />
          <path
            d='m20.013 21.35 11.354-7.652'
            mask='url(#b)'
            transform='matrix(1 0 0 -1 0 35.048)'
          />
          <path d='m8.006 6.31-11.843-7.981' mask='url(#b)' />
          <path
            d='m9.29 22.31-13.127-8.705'
            mask='url(#b)'
            transform='matrix(1 0 0 -1 0 35.915)'
          />
        </g>
        <path
          d='m0 12h12v8h4v-8h12v-4h-12v-8h-4v8h-12z'
          fill='#e6273e'
          mask='url(#b)'
        />
      </g>
    </svg>
  )
}