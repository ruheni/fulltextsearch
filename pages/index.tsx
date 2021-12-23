import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import type { NextPage } from 'next'
import type { Book } from '@prisma/client'

import SearchBar from '../components/Search'
import BookCover from '../components/BookCover'
import BookSearch from '../components/BookSearch'

type BookApiResponse = Exclude<Book, 'content'>[] | Book[]

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const [response, setResponse] = useState<BookApiResponse>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const router = useRouter()

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    /** do nothing when searchQuery is empty */
    if (searchQuery === '') return

    setLoading(true)

    router.push(`?q=${searchQuery}`)

    await fetch(`/api/search?q=${searchQuery}`)
      .then((response) => response.json())
      .then((response) => {
        setLoading(false)
        setResponse(response)
      })
      .catch(setError)
  }

  useEffect(() => {
    /**
     * clear router query on page (re)load
     */
    setSearchQuery('')
    if (router.query) {
      router.replace({ query: null })
    }

    fetch('/api')
      .then((response) => response.json())
      .then((response) => {
        setResponse(response)
      })
      .catch((error) => {
        setError(error)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="top-0 sticky backdrop-blur-sm bg-slate/30 px-10 ">
        <SearchBar
          searchQuery={searchQuery}
          loading={loading}
          onSubmit={onSubmit}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {error && error !== undefined ? (
        <pre className="prose">{JSON.stringify(error, null)}</pre>
      ) : null}

      {/** if book contains no content property from API response */}
      <section className="mx-20 mx-auto pb-20">

        {response.every((book) => book.content != typeof undefined) ? (
          // books with no content property
          <>
            {response && response.length && (
              <section className="books">
                {response.map(
                  (book) =>
                    book.content === undefined && (
                      <BookCover
                        id={book.id}
                        title={book.title}
                        cover={book.cover}
                      />
                    )
                )}
              </section>
            )}
          </>
        ) : (
          // books with content property
          <>
            {response && response.length && (
              <section>
                <p className="text-xl my-4">
                  <span className="font-semibold">{response.length}</span>
                  <span>{response.length > 1 ? 'books' : 'book'}</span>
                </p>

                {response.map((book) =>
                  book.content !== undefined ? (
                    <BookSearch
                      id={book.id}
                      title={book.title}
                      content={book.content}
                      cover={book.cover}
                    />
                  ) : null
                )}
              </section>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default Home
