// const axios = require('axios').default;
import prisma from '../utils/prisma'
import axios from 'axios'
import { htmlToText } from 'html-to-text'

type Author = {
  name: string;
  birth_year: number;
  death_year: number;
}
type Translator = {
  name: string;
  birth_year?: number;
  death_year?: number;
}
type Formats = {
  "application/epub+zip": string;
  "application/rdf+xml": string;
  "application/x-mobipocket-ebook": string;
  "application/zip": string;
  "image/jpeg": string;
  "text/plain; charset=utf-8": string;
  "text/html; charset=utf-8": string;
  "text/html": string;
  "text/plain": string;
  "text/plain; charset=us-ascii": string;
  "application/octet-stream": string;
  "text/html; charset=iso-8859-1": string;
  "text/html; charset=us-ascii": string;
}
type Book = {
  id: number;
  title: string;
  authors: Author[];
  translators: Translator[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Formats;
  download_count: number;
}

async function main() {

  try {
    /**
     * No need to scrape https://www.gutenberg.org/ when you have this API
     * Limitation: starts from page 2, and returns 32 books for every response
     * 63 books will be seeded because one url is 'undefined'  🎉 
     */
    for (let i = 2; i < 4; i++) {
      axios.get(`https://gutendex.com/books/?page=${i}`).then((response) => {
        const books: Book[] = response.data.results

        books.map(async (book: Book) => {

          /**
           * Use the html version of the book instead of 'text/plain' because some books don't have 'text/plain' version
           * This ternary operator reduces or running into an 'undefined' url
           */
          const url = book.formats['text/html'] === undefined ? book.formats['text/html; charset=utf-8'] : book.formats['text/html']

          // One URL returns an undefined, so skip that
          if (url === undefined) return

          /**
           * A HTML document is returned here
           */
          const response = await axios.get(url)

          const result = await prisma.book.create({
            data: {
              title: book.title,
              url,
              /**
               * convert html response to text format
               */
              content: htmlToText(response.data),
              authors: book.authors.map(({ name }) => name)
            }
          })

          console.log(result.title)

        })
      })

    }

  } catch (error) {
    console.log("Ooops, something went wrong")
    throw new Error(JSON.stringify(error))
  }

}

main()
