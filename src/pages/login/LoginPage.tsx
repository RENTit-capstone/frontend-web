import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/requests';
import useAuthStore from '../../stores/useAuthStore';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login payload:', { email, password });
        try {
            const res = await login(email, password);
            const { accessToken, refreshToken, memberId } = res.data;
            useAuthStore.getState().setTokens(accessToken, refreshToken, memberId);
            navigate('/dashboard');
        } catch (err) {
            console.error('로그인 실패: ', err);
            setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rouded shadow-md w-96 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center">RENTit 관리자 로그인</h2>
                
                {errorMsg && (
                    <div className="text-red-600 text-sm text-center">{errorMsg}</div>
                )}

                <input 
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 roudned"
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hever:bg-blue-700"
                >
                    로그인
                </button>
            </form>
        </div>
    );
};

export default LoginPage;