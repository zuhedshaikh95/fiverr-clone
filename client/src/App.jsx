import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Navbar } from './components';
import { Home, Footer, Gig, Gigs, MyGigs, Add, Orders, Message, Messages } from './pages';
import './App.scss';

const paths = [
  { path: '/', element: <Home /> },
  { path: '/gig/:id', element: <Gig /> },
  { path: '/gigs', element: <Gigs /> },
  { path: '/orders', element: <Orders /> },
  { path: '/organize', element: <Add /> },
  { path: '/my-gigs', element: <MyGigs /> },
  { path: '/message/:id', element: <Message /> },
  { path: '/messages', element: <Messages /> },
];

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>

  )
};

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: paths.map(({ path, element }) => ({ path, element }))
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
