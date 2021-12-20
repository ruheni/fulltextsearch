type Props = {
  id: number
  title: string
}
const BookCover = ({ id, title }: Props) => (
  <div
    key={id}
    className="border p-2 rounded h-72 grid place-items-end bg-slate-50 text-slate-900"
  >
    <h2 className="text-xl text-right line-clamp-4">{title}</h2>
  </div>
)

export default BookCover
