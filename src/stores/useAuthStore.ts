import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    memberId: number | null;
    setTokens: (accessToken: string, refreshToken: string, memberId: number) => void;
    clearTokens: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    memberId: null,
    setTokens: (accessToken, refreshToken, memberId) => set({ accessToken, refreshToken, memberId }),
    clearTokens: () => set({ accessToken: null, refreshToken: null, memberId: null })
}))

export default useAuthStore;