import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import Script from "next/script";
import { i18n } from '../../next-i18next.config';
import * as process from "process";

class MyDocument extends Document<{ lang?:string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, lang: ctx?.query.locale };
  }

  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale || i18n.defaultLocale;
    // @ts-ignore
    const uri: string = process.env.NEXT_PUBLIC_API_URI;
    const { hostname } = new URL(uri);

    return (
      <Html lang={currentLocale}>
        <Head>
          {/* Google tag (gtag.js) */}
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />

          <Script strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
           `}
          </Script>

          <link rel="dns-prefetch" href={`//${hostname}`} />
        </Head>
        <body>
          <Main />
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
