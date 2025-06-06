import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    memberId: number | null;
    setTokens: (accessToken: string, refreshToken: string, memberId: number) => void;
    clearTokens: () => void;
    restoreTokens: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    memberId: null,
    setTokens: (accessToken, refreshToken, memberId) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('memberId', memberId.toString());
        set({ accessToken, refreshToken, memberId });
    },
    clearTokens: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('memberId');
        set({ accessToken: null, refreshToken: null, memberId: null });
    },
    restoreTokens: () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const memberIdStr = localStorage.getItem('memberId');
        const memberId = memberIdStr ? parseInt(memberIdStr) : null;

        if (accessToken && refreshToken && memberId) {
            set({ accessToken, refreshToken, memberId });
        }
    }
}));

export default useAuthStore;