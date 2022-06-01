import type {NextPage} from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={"text-white flex flex-col"}>
      <Link href={"/arts/13star"}>13star</Link>
      <Link href={"/explorer/math/primary/slop"}>math/primary/slop</Link>
    </div>
  )
}

export default Home
