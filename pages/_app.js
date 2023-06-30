import { StoreProvider } from '@/utils/Store';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  );
}

export default App;
