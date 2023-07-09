export const FlagFr = () => {
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
        <use fill='#fff' xlinkHref='#a' />
        <path d='m19 0h9v20h-9z' fill='#f44653' mask='url(#b)' />
        <path d='m0 0h9v20h-9z' fill='#1035bb' mask='url(#b)' />
      </g>
    </svg>
  )
}
