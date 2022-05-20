import 'antd/dist/antd.css';
import '../sass/app.scss';

import { SessionProvider } from "next-auth/react"


export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

