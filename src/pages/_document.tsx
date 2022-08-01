import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document';
import { i18n } from '../../next-i18next.config';

class MyDocument extends Document<{ lang?:string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, lang: ctx?.query.locale };
  }

  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale || i18n.defaultLocale
    // @ts-ignore
    const uri: string = process.env.NEXT_PUBLIC_API_URI;
    const { hostname } = new URL(uri);

    return (
      // <Html lang={this.props.lang}>
      <Html lang={currentLocale}>
        <Head>
          <link rel="preconnect" href={`//${hostname}`} crossOrigin="true" />
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