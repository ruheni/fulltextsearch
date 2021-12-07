import type { NextApiRequest, NextApiResponse } from 'next'
import { URL, URLSearchParams } from 'url';
import prisma from '../../utils/prisma'

type QueryRequest = {
  q: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let requestQuery = req.query as QueryRequest

  // const param = new URL()
  let query = new URLSearchParams(requestQuery).get('q') as string


  if (query && query !== undefined) {

    /**
     * TODO: add switch case for different types of queries
     */
    let searchQuery = query.replaceAll(' ', ' & ')

    try {
      const results = await prisma.book.findMany({
        where: {
          content: {
            search: searchQuery
          },
        }, select: {
          title: true,
        }
      })

      res.status(200).send(results)
    } catch (error) {
      res.status(500).send({ message: "Oops, something went wrong" })
    }
  }
}
