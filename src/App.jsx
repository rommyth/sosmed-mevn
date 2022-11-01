import Login from './pages/login/Login';
import Register from './pages/register/Register';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';

import './style.scss';
function App() {
  const currentUser = true;

  const Layout = () => {
    return (
      <div className="theme-dark">
        <Navbar />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRouter = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRouter>
          <Layout />
        </ProtectedRouter>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile:id',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
