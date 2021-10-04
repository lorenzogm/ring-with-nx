import type { NextApiRequest, NextApiResponse } from 'next'

export default async function previewExit(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { slug = '' } = req.query
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // set the cookies to None
  const cookies = res.getHeader('Set-Cookie') as Array<string>
  res.setHeader(
    'Set-Cookie',
    cookies.map((cookie: string) =>
      cookie.replace('SameSite=Lax', 'SameSite=None;Secure'),
    ),
  )

  // Redirect the user back to the index page.
  res.redirect(`/${slug as string}`)
}
