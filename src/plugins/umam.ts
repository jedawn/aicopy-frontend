import type { Router } from 'vue-router';

interface Umami {
  track: (eventName: string, data?: Record<string, unknown>) => void;
  trackView: (url: string, referrer?: string) => void;
}

declare global {
  interface Window {
    umami?: Umami;
  }
}

interface UmamiConfig {
  url: string;
  websiteId: string;
}

function getConfig(): UmamiConfig | null {
  const umamiUrl = import.meta.env.VITE_UMAMI_URL;
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  if (!umamiUrl || !websiteId) return null;
  return { url: umamiUrl, websiteId };
}

export function loadUmamiScript(): Promise<void> {
  return new Promise((resolve) => {
    const config = getConfig();
    if (!config) { resolve(); return; }
    const script = document.createElement('script');
    script.src = `${config.url}/script.js`;
    script.setAttribute('data-website-id', config.websiteId);
    script.setAttribute('data-auto-track', 'true');
    script.setAttribute('data-do-not-track', 'true');
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export function useUmami(router?: Router) {
  const isEnabled = !!getConfig();
  const track = (eventName: string, data?: Record<string, unknown>) => {
    if (isEnabled && window.umami) window.umami.track(eventName, data);
  };
  const trackView = (url: string, referrer?: string) => {
    if (isEnabled && window.umami) window.umami.trackView(url, referrer);
  };
  const initRouterTracking = (routerInstance: Router) => {
    if (!isEnabled) return;
    routerInstance.afterEach((to) => trackView(to.path));
  };
  if (router) initRouterTracking(router);
  return { track, trackView, isEnabled, initRouterTracking };
}

export async function setupUmami(router: Router) {
  await loadUmamiScript();
  const { initRouterTracking } = useUmami();
  initRouterTracking(router);
}