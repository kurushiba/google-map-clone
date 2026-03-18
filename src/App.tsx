import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { currentUserAtom } from './modules/auth/current-user.state';
import { authRepository } from './modules/auth/auth.repository';

function App() {
  const [isLoading, setIsloading] = useState(true);
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  if (isLoading) return <div />;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
