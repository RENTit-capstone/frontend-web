export const loadRuntimeEnv = async () => {
    if (import.meta.env.MODE === 'development') {
        window.__ENV__ = {
            VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL
        };
        console.log('[ENV] Development mode loaded:', window.__ENV__);
        return;
    }

    try {
        const res = await fetch('/env.json');
        const data = await res.json();
        window.__ENV__ = data;
        console.log("[ENV] Production mode loaded:", data);
    } catch (e) {
        console.error('[ENV] Failed to load env.json:', e);
    }
};