type PlaceholderProps = {
  componentName: string
}

export default Placeholder
export function Placeholder({ componentName }: PlaceholderProps): JSX.Element {
  return (
    <p>
      The component <strong>{componentName}</strong> has not been created yet.
    </p>
  )
}
