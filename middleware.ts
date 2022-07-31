import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextRequest, NextResponse } from "next/server";

import { GEOLOCATION } from "./src/lib/const";
// import { CHANNELS, DEFAULT_CHANNEL, DEFAULT_LOCALE, LOCALES } from "@/lib/regions";


const DEFAULT_LOCALE = 'en-US';

const LOCALES = [
  { slug: 'en-US', code: 'EN_US', name: 'American English' },
  { slug: 'pl-PL', code: 'PL_PL', name: 'Polski' },
  { slug: 'ua-UA', code: 'UA_UA', name: 'Ukrainian' },
];


export function LocaleRedirectionMiddleware({
  nextUrl,
  headers,
  geo,
}: NextRequest): NextMiddlewareResult | Promise<NextMiddlewareResult> {


  if (nextUrl.pathname !== "/") {
    // redirect should only be applied on homepage, without any region/locale chosen
    return null;
  }
  if (!GEOLOCATION) {
    console.log('middleware', {
      nextUrl,
      headers,
      geo,
    })
    // redirection middleware can be turned on by setting the NEXT_PUBLIC_GEOLOCATION
    // env variable. If it's turned off we redirect to the default region
    const url = nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }
  const requestLocale = headers.get("accept-language")?.split(",")?.[0] || DEFAULT_LOCALE;
  let locale = DEFAULT_LOCALE;
  if (LOCALES.find((l) => l.slug === requestLocale)) {
    // Redirect to the request language if supported by the application
    locale = requestLocale;
  }

  const requestCountry = geo?.country?.toLowerCase() || "us";


  const url = nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export default LocaleRedirectionMiddleware;
