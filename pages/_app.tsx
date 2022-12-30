import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../src/components/layout/Layout";
import "../styles/globals.css";

const reactQueryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
