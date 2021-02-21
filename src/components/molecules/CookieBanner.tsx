import { ReactElement } from 'react'
import ReactCookieBanner from 'react-cookie-banner'

export default function CookieBanner(): ReactElement {
  return (
    <ReactCookieBanner
      message="Hola, usamos cookies. Si sigues navegando significa que aceptas el uso de cookies."
      buttonMessage="Ok"
      cookie="user-has-accepted-cookies"
      styles={{ banner: { height: '100%' }, message: { lineHeight: 1.5 } }}
      dismissOnScroll
      dismissOnClick
    />
  )
}
