import '../styles/styles.css'
import Head from "next/head";
 
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
            <link rel="icon" href="favicon.png" sizes="any" />
        </Head>
        <Component {...pageProps} />
    </>
  )
  
}


