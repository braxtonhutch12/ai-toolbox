/* One measurement ID and click tracking across the site. */
(() => {
  'use strict';
  const measurementId = 'G-1YT9WVWFDY';
  let internal = false;
  try { internal = localStorage.getItem('aitoolbox_internal') === '1'; } catch (_) {}
  // Owner visits on this browser are excluded before loading Google Analytics.
  if (internal) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
  document.addEventListener('click', (event) => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    let destination;
    try { destination = new URL(link.href, location.href); } catch (_) { return; }
    if (!/^https?:$/.test(destination.protocol)) return;
    if (destination.origin === location.origin) return;
    const affiliate = link.rel.split(/\s+/).includes('sponsored');
    // Query values (including affiliate IDs) are intentionally excluded from event fields.
    window.gtag('event', affiliate ? 'affiliate_click' : 'tool_click', {
      tool_name: link.dataset.tool || destination.hostname.replace(/^www\./, ''),
      link_domain: destination.hostname,
      link_path: destination.pathname,
      page_path: location.pathname,
      link_position: link.dataset.position || 'article',
      transport_type: 'beacon'
    });
  });
})();
