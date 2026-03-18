import { useState } from 'react';
import './index.css';
import { Link, Navigate } from 'react-router-dom';
import { authRepository } from '../../modules/auth/auth.repository';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../modules/auth/current-user.state';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const signup = async () => {
    setIsLoading(true);
    try {
      const { user, token } = await authRepository.signup(
        name,
        email,
        password,
      );
      setCurrentUser(user);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
      window.alert('ユーザー登録に失敗しました');
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
          <h1 className="auth-title">アカウント作成</h1>
          <p className="auth-subtitle">MapExplorer に参加する</p>
        </div>

        <div className="auth-form">
          <div className="form-field">
            <label htmlFor="username">ユーザー名</label>
            <input
              id="username"
              type="text"
              placeholder="山田太郎"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="8文字以上"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="auth-submit-btn"
            type="button"
            onClick={signup}
            disabled={
              !name || !email || !password || isLoading || password.length < 8
            }
          >
            アカウント作成
          </button>
        </div>

        <div className="auth-footer">
          既にアカウントをお持ちの方は
          <Link to="/signin">ログイン</Link>
        </div>
      </div>
    </div>
  );
}
