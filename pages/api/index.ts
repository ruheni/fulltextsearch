import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../utils/prisma'

type QueryRequest = {
  q: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = await prisma.book.findMany({
      select: { title: true, url: true, id: true }
    })

    res.status(200).send(results)
  } catch (error) {
    res.status(500).send({ message: 'Oops, something went wrong' })
  }
}
