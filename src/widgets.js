// Curated selector list for third-party widgets that pollute extractions.
// Enabled via --ignore-widgets; appended to user-supplied --ignore selectors.
//
// Criteria for inclusion: widget renders on tens of thousands of sites, uses a
// stable ID/attr hook, and its styles would skew token extraction (chat bubbles
// with off-brand radii/shadows, cookie banners with alarm colors, etc.).

export const WIDGET_SELECTORS = [
  // Live chat / support
  '#intercom-container', '#intercom-frame', 'iframe[name*="intercom"]',
  '#drift-widget', '#drift-frame-controller', '#drift-frame-chat',
  '#hubspot-messages-iframe-container',
  '#crisp-chatbox', '.crisp-client',
  'iframe[title*="Messaging"]', '#launcher', '[data-product="web_widget"]', // Zendesk
  '#tawk-default', 'iframe[title*="chat window"]',
  '#chat-widget-container', '#livechat-compact-container', // LiveChat
  '#helpshift-iframe',
  'iframe[src*="freshchat"]', '#fc_frame',
  'iframe[src*="olark"]', '#olark-wrapper',

  // Cookie / consent banners
  '#CybotCookiebotDialog', '#CybotCookiebotDialogBody',
  '#onetrust-banner-sdk', '#onetrust-consent-sdk', '#onetrust-pc-sdk',
  '.termly-banner-top', '.termly-styles-banner',
  '#cookiebanner', '#cookie-banner', '#cookie-notice',
  '.cc-window', '.cc-banner', // Cookieconsent by Insites
  '#usercentrics-root',
  '#iubenda-cs-banner',

  // reCAPTCHA / anti-bot (visible v2 badge)
  '.grecaptcha-badge', 'iframe[src*="recaptcha"]',

  // Analytics / pixel iframes (invisible but can leak tokens)
  'iframe[src*="doubleclick"]', 'iframe[src*="googletagmanager"]',
  'iframe[src*="facebook.com/tr"]',

  // Social share floating bars
  '.addthis_floating_style', '#addthis-smartlayers',
  '.sharethis-inline-share-buttons',

  // Generic catch-alls (last so specific IDs take priority in logs)
  '[id^="chat-widget"]', '[class*="chat-widget"]',
  '[aria-label*="cookie" i][role="dialog"]',
];

export function widgetIgnoreList() {
  return [...WIDGET_SELECTORS];
}
