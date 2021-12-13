import type { NextApiRequest, NextApiResponse } from 'next'
import { URL, URLSearchParams } from 'url'
import prisma from '../../utils/prisma'

type QueryRequest = {
  q: string
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
    let searchQuery = query.split(' ').join('&')

    try {
      console.time('query')
      const results = await prisma.book.findMany({
        where: {
          content: {
            search: searchQuery
          }
        },
        select: {
          id: true,
          title: true,
          content: true
        }
      })
      // Trim content and highlight query. Use word boundaries (\b) and capture
      // the query
      //
      // TODO: For the query "great", how do we highlight "greatest"? Ask
      // Flavian. This might be something we need to add to the Prisma Client.
      const highlighter = new RegExp(`\\b(${query})\\b`, 'g')
      for (let result of results) {
        const i = result.content.indexOf(query)
        result.content = result.content.slice(i - 100, i + 100)
        result.content = result.content.replace(
          highlighter,
          '<strong>$1</strong>'
        )
      }

      console.timeEnd('query')
      res.status(200).send(results)
    } catch (error) {
      res.status(500).send({ message: 'Oops, something went wrong' })
    }
  }
}
