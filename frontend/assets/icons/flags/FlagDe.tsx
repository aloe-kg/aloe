export const FlagDe = () => {
  return (
    <svg
      height='20'
      viewBox='0 0 28 20'
      width='28'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <path id='a' d='m0 6.667h28v6.667h-28z' />
        <filter id='b' height='145%' width='110.7%' x='-5.4%' y='-22.5%'>
          <feMorphology
            in='SourceAlpha'
            operator='dilate'
            radius='.5'
            result='shadowSpreadOuter1'
          />
          <feOffset in='shadowSpreadOuter1' result='shadowOffsetOuter1' />
          <feColorMatrix
            in='shadowOffsetOuter1'
            values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.06 0'
          />
        </filter>
        <path id='c' d='m0 13.333h28v6.667h-28z' />
        <filter id='d' height='145%' width='110.7%' x='-5.4%' y='-22.5%'>
          <feMorphology
            in='SourceAlpha'
            operator='dilate'
            radius='.5'
            result='shadowSpreadOuter1'
          />
          <feOffset in='shadowSpreadOuter1' result='shadowOffsetOuter1' />
          <feColorMatrix
            in='shadowOffsetOuter1'
            values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.06 0'
          />
        </filter>
        <mask id='e' fill='#fff'>
          <rect fill='#fff' fillRule='evenodd' height='20' rx='3' width='28' />
        </mask>
      </defs>
      <g fill='none' fillRule='evenodd'>
        <path d='m0 0h28v6.667h-28z' fill='#262626' mask='url(#e)' />
        <g mask='url(#e)'>
          <use fill='#000' filter='url(#b)' xlinkHref='#a' />
          <use fill='#f01515' xlinkHref='#a' />
        </g>
        <g mask='url(#e)'>
          <use fill='#000' filter='url(#d)' xlinkHref='#c' />
          <use fill='#ffd521' xlinkHref='#c' />
        </g>
      </g>
    </svg>
  )
}
