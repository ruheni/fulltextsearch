import React, { useState } from 'react'
import { useRouter } from 'next/router'

import type { NextPage, InferGetServerSidePropsType } from 'next'
import { Book } from '@prisma/client'

import prisma from '../utils/prisma'

export const getServerSideProps = async () => {
  const results = await prisma.book.findMany({
    select: { title: true, url: true, id: true }
  })

  return {
    props: {
      data: results
    }
  }
}

const Home: NextPage = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [response, setResponse] = useState<Book[]>([])

  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()

    router.push(`?q=${searchQuery}`)

    await fetch(`/api/search?q=${searchQuery}`)
      .then((response) => response.json())
      .then(setResponse)
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        <label htmlFor="search ">
          <span className="hidden">Search</span>
        </label>
        <input
          type="text"
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for your favorite title"
          id="search"
          name="book"
        />
        <button type="submit">Search</button>
      </form>

      {response && response.length ? (
        <section>
          {response.map((book) => (
            <div key={book.id}>
              <h2>{book.title}</h2>
              {/* TODO: pass marked segments down to browser to do highlighing
                  on the frontend. */}
              <p dangerouslySetInnerHTML={{ __html: book.content }} />
            </div>
          ))}
        </section>
      ) : null}
      <pre>{/* {JSON.stringify(data, null, 2)} */}</pre>
    </div>
  )
}

export default Home
