import * as React from 'react'

const TABLET_BREAKPOINT = 1024
const MOBILE_BREAKPOINT = 768

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${
        TABLET_BREAKPOINT - 1
      }px)`
    )
    const onChange = () => {
      setIsTablet(
        window.innerWidth >= MOBILE_BREAKPOINT &&
          window.innerWidth < TABLET_BREAKPOINT
      )
    }
    mql.addEventListener('change', onChange)
    setIsTablet(
      window.innerWidth >= MOBILE_BREAKPOINT &&
        window.innerWidth < TABLET_BREAKPOINT
    )
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isTablet
}
