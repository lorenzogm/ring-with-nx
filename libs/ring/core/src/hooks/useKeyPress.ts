import { useEffect, useState } from 'react'

export const useKeyPress = (): { isToggled: boolean } => {
  const [toggle, setToggle] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onKeydownHandle = (e: any) => {
    const event = e || window.event

    // shift + a
    if (e.keyCode === 65 && event.shiftKey) {
      setToggle(!toggle)
    }
  }

  // does not work so well with empty dependencies array, why?
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      document.addEventListener('keydown', onKeydownHandle)
    }
    return () => document.removeEventListener('keydown', onKeydownHandle)
  })

  return {
    isToggled: toggle,
  }
}
