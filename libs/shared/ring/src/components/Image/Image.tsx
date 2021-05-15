import { ImageProps } from './index.d'

export default Image
export function Image({ alt, as, src, width, height }: ImageProps) {
  if (as) {
    const Component = as
    return <Component src={src} alt={alt} width={width} height={height} />
  }
  return <img src={src} alt={alt} width={width} height={height} />
}
