import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import type { NextPage } from 'next'
import { Book } from '@prisma/client'

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const [response, setResponse] = useState<Exclude<Book, 'content'>[]>([])

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
     * clear router query on page reload
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
    <div className="px-10">
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        {/* {loading && <Loading />} */}
        <h1></h1>
        <form onSubmit={onSubmit} className="rounded px-8 pt-6 pb-8 mb-4 flex">
          <label htmlFor="search ">
            <span className="hidden">Search</span>
          </label>
          <input
            type="text"
            className="form-search shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-3xl placeholder:text-gray-400 text-3xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for your favorite title"
            id="search"
            name="book"
          />
          <button
            type="submit"
            className="ml-2 p-4 text-3xl bg-violet-800 text-white rounded focus:ring-2 focus:bg-violet-700"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/** if book contains no content property from API response */}
      {response && response.length && (
        <section className="books">
          {response.map(
            (book) =>
              book.content === undefined && (
                <div
                  key={book.id}
                  className="border p-2 rounded h-72 grid place-items-end  bg-slate-50  text-slate-900"
                >
                  <h2 className="text-xl text-right">
                    {book.title.length <= 100
                      ? book.title
                      : `${book.title.slice(0, 100)}...`}
                  </h2>
                </div>
              )
          )}
        </section>
      )}

      {response && response.length && (
        <section>
          {response.map((book) =>
            book.content !== undefined ? (
              <div key={book.id} className="text-slate-900 flex">
                <h2 className="text-xl  border p-2 rounded h-72  bg-slate-50 w-48 max-w-52 p-2">
                  {book.title}
                </h2>
                {/* TODO: pass marked segment down to browser to do highlighing
                  on the frontend. 
                  * [DISCLAIMER]: only works with one word search queries
                  */}
                <p
                  className="text-base px-4 py-6"
                  dangerouslySetInnerHTML={{ __html: book.content }}
                />
              </div>
            ) : null
          )}
        </section>
      )}
    </div>
  )
}

export default Home
