export default async function exitPreview(): Promise<void> {
  await fetch('/api/preview-exit', {
    method: 'POST',
  })
}
