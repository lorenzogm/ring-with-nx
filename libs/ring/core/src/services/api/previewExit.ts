export async function previewExit(): Promise<void> {
  await fetch('/api/preview-exit', {
    method: 'POST',
  })
}
