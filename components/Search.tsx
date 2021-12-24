type Props = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (e: React.SyntheticEvent) => Promise<void>
  loading: boolean
}

const SearchBar = ({
  onSubmit,
  searchQuery,
  setSearchQuery,
  loading
}: Props) => (
  <form
    onSubmit={onSubmit}
    className="rounded mb-4 pb-8 pt-10 flex mx-auto max-w-screen-lg "
  >
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
)

export default SearchBar
