import Image from 'next/image'

type Props = {
  id: number
  title: string
  cover: string
}
const BookCover = ({ id, title, cover }: Props) => (
  <div
    key={id}
    className="border p-2 rounded h-72 grid place-items-end bg-slate-50 text-slate-900"
  >
    {/* <Image src={cover} alt={title} height={288} width={208} /> */}
    <h2 className="text-xl text-right line-clamp-4">{title}</h2>
  </div>
)

export default BookCover
