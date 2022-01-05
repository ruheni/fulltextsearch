import type { NextApiRequest, NextApiResponse } from 'next'
import { URLSearchParams } from 'url'

import prisma from '../../utils/prisma'
type QueryRequest = {
  q: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let requestQuery = req.query as QueryRequest

  let query = new URLSearchParams(requestQuery).get('q')
  if (query && query !== undefined) {
    /**
     * TODO: add switch case for different types of queries
     */
    let searchQuery = query.split(' ').join(' & ')

    try {
      console.time('query')

      const results = await prisma.book.findMany({
        where: {
          content: {
            search: searchQuery
          }
        }
      })

      for (let result of results) {
        result.content =
          await prisma.$queryRaw`SELECT ts_headline('english', ${result.content}, to_tsquery('english',${searchQuery}))`
        // @ts-ignore
        result.content = result.content[0].ts_headline
      }

      console.timeEnd('query')
      console.log('results count ', results.length)
      res.status(200).send(results)
    } catch (error) {
      console.log({ error })
      res.status(500).send({ message: 'Oops, something went wrong', error })
    }
  }
}
