import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import { Navbar } from './components';
import { Home, Footer, Gig, Gigs, MyGigs, Add, Orders, Message, Messages, Login, Register } from './pages';
import './App.scss'; 

const paths = [
  { path: '/', element: <Home /> },
  { path: '/gig/:_id', element: <Gig /> },
  { path: '/gigs', element: <Gigs /> },
  { path: '/orders', element: <Orders /> },
  { path: '/organize', element: <Add /> },
  { path: '/my-gigs', element: <MyGigs /> },
  { path: '/message/:_id', element: <Message /> },
  { path: '/messages', element: <Messages /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];


function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    )
  }
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
