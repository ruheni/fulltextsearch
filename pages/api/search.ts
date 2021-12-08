import type { NextApiRequest, NextApiResponse } from 'next'
import { URL, URLSearchParams } from 'url';
import { serialize } from 'v8';
import prisma from '../../utils/prisma'

type QueryRequest = {
  q: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let requestQuery = req.query as QueryRequest

  let AND, NOT, OR, FOLLOWS
  // const param = new URL()
  let query = new URLSearchParams(requestQuery).get('q') as string


  if (query !== undefined) {

    /**
     * TODO: add switch case for different types of queries
     */


    // let searchQuery
    // switch (query) {
    //   case AND:
    //     searchQuery = query.replaceAll(' ', ' & ')
    //     break;
    //   case NOT:
    //     break;
    //   case OR:
    //     break;
    //   case FOLLOWS:
    //     break;
    //   default:
    //     break;
    // }

    if (query.includes(' ')) {

    }
    let searchQuery = query.replaceAll(' ', ' & ')

    try {
      const results = await prisma.film.findMany({
        where: {
          description: {
            search: searchQuery
          },
        }
      })
      console.log(results.length)

      res.status(200).send(results)
    } catch (error) {
      res.status(500).send({ message: "Oops, something went wrong" })
    }
  }
}
