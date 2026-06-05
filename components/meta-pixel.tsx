"use client"

import Script from "next/script"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// Manual Meta Pixel base-code install. Loads fbq, fires the initial PageView,
// and re-fires PageView on client-side route changes.
export function MetaPixel() {
  const pathname = usePathname()

  useEffect(() => {
    if (!PIXEL_ID) return
    // Fire PageView on every route change after the first load.
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname])

  if (!PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
