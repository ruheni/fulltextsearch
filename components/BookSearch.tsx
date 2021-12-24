type Props = {
  id: number
  title: string
  content: string
  cover: string
}

const BookSearch = ({ id, title, content }: Props) => (
  <div key={id} className="text-slate-900 flex my-5">
    <div className="grid place-items-end  border p-2 rounded h-72  bg-slate-50 w-52 p-2 flex-none">
      <h2 className="line-clamp-4 text-xl text-right">{title}</h2>
    </div>

    {/* TODO: pass marked segment down to browser to do highlighing
    on the frontend. 
    * [DISCLAIMER]: only works with one word search queries
    */}
    <p
      className="text-base px-4 py-6"
      dangerouslySetInnerHTML={{ __html: `...${content}...` }}
    />
  </div>
)

export default BookSearch
