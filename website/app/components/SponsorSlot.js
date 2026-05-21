'use client';

import { useEffect, useRef } from 'react';

// Footer sponsor slot. Renders one of three providers depending on the
// NEXT_PUBLIC_SPONSOR_PROVIDER env var. Renders NOTHING until the
// provider and its required ids are set, so the site stays clean
// until the publisher accounts exist.
//
// Vercel env vars:
//   NEXT_PUBLIC_SPONSOR_PROVIDER     ethicalads | carbon | adsense
//   NEXT_PUBLIC_ETHICALADS_PUBLISHER <publisher slug>
//   NEXT_PUBLIC_CARBON_SERVE         <serve id>
//   NEXT_PUBLIC_CARBON_PLACEMENT     <placement id>
//   NEXT_PUBLIC_ADSENSE_CLIENT       ca-pub-XXXXXXXXXXXXXXXX
//   NEXT_PUBLIC_ADSENSE_SLOT         <slot id>

const PROVIDER  = process.env.NEXT_PUBLIC_SPONSOR_PROVIDER || '';
const EA_PUB    = process.env.NEXT_PUBLIC_ETHICALADS_PUBLISHER || '';
const CARBON_S  = process.env.NEXT_PUBLIC_CARBON_SERVE || '';
const CARBON_P  = process.env.NEXT_PUBLIC_CARBON_PLACEMENT || '';
const ADS_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
const ADS_SLOT   = process.env.NEXT_PUBLIC_ADSENSE_SLOT || '';

export default function SponsorSlot() {
  const ref = useRef(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    if (PROVIDER === 'ethicalads' && EA_PUB) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
      host.appendChild(s);
      return () => { try { host.removeChild(s); } catch { /* ignore */ } };
    }

    if (PROVIDER === 'carbon' && CARBON_S && CARBON_P) {
      const s = document.createElement('script');
      s.async = true;
      s.type = 'text/javascript';
      s.id = '_carbonads_js';
      s.src = `//cdn.carbonads.com/carbon.js?serve=${encodeURIComponent(CARBON_S)}&placement=${encodeURIComponent(CARBON_P)}`;
      host.appendChild(s);
      return () => { try { host.removeChild(s); } catch { /* ignore */ } };
    }

    if (PROVIDER === 'adsense' && ADS_CLIENT && ADS_SLOT) {
      // The loader script is added once via <head>; here we just push.
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch { /* ignore */ }
    }
  }, []);

  // Nothing configured → render nothing. Site stays clean.
  const configured =
    (PROVIDER === 'ethicalads' && EA_PUB) ||
    (PROVIDER === 'carbon' && CARBON_S && CARBON_P) ||
    (PROVIDER === 'adsense' && ADS_CLIENT && ADS_SLOT);
  if (!configured) return null;

  return (
    <div className="sponsor-wrap">
      <div className="sponsor-rule" aria-hidden />
      <div className="sponsor-inner" ref={ref}>
        <span className="sponsor-tag mono">sponsored</span>

        {PROVIDER === 'ethicalads' && (
          <div
            data-ea-publisher={EA_PUB}
            data-ea-type="text"
            data-ea-style="stickybox"
            className="sponsor-ea"
          />
        )}

        {PROVIDER === 'carbon' && <div className="sponsor-carbon" />}

        {PROVIDER === 'adsense' && (
          <ins
            className="adsbygoogle sponsor-adsense"
            style={{ display: 'block' }}
            data-ad-client={ADS_CLIENT}
            data-ad-slot={ADS_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
}
