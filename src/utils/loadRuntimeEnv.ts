export const loadRuntimeEnv = async () => {
    if (import.meta.env.MODE === 'development') {
        window.__ENV__ = {
            VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
            VITE_MONITORING_URL: import.meta.env.VITE_MONITORING_URL
        };
        return;
    }

    try {
        const res = await fetch('/env.json');
        const data = await res.json();
        window.__ENV__ = data;
    } catch (e) {
        console.error('[ENV] Failed to load env.json:', e);
    }
};