import Head from 'next/head'
    import dynamic from 'next/dynamic'

    const ThreeScene = dynamic(() => import('../components/ThreeScene'), { 
      ssr: false,
      loading: () => <div>Loading 3D Scene...</div>
    })

    export default function Home() {
      return (
        <>
          <Head>
            <title>Interactive 3D Hero</title>
            <meta name="description" content="Interactive 3D hero page with model switching" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ThreeScene />
        </>
      )
    }
