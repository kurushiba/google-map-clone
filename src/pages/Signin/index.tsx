import { useState } from 'react';
import './index.css';
import { Link, Navigate } from 'react-router-dom';
import { authRepository } from '../../modules/auth/auth.repository';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const signin = async () => {
    setIsLoading(true);
    try {
      const { user, token } = await authRepository.signin(email, password);
      setCurrentUser(user);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
      window.alert('ログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">M</div>
          <h1 className="auth-title">ログイン</h1>
          <p className="auth-subtitle">MapExplorer へようこそ</p>
        </div>

        <div className="auth-form">
          <div className="form-field">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="auth-submit-btn"
            type="button"
            onClick={signin}
            disabled={!email || !password || isLoading}
          >
            ログイン
          </button>
        </div>

        <div className="auth-footer">
          アカウントをお持ちでない方は
          <Link to="/signup">新規登録</Link>
        </div>
      </div>
    </div>
  );
}
