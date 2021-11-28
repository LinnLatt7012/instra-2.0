import Head from 'next/head'
import Feed from '../Components/Feed'
import Header from '../Components/Header'
import Modal from '../Components/Modal'
export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Feed */}
      <Feed />


      {/* Modal */}
      <Modal />
    </div>
  )
}
