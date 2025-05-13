import { createBrowserRouter } from 'react-router-dom';
import { BirdsPage } from './pages/birds';
import App from './App';
import { BirdPage } from './pages/bird-page';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <BirdsPage />,
      },
      {
        path: "/birds/:id",
        element: <BirdPage />,
      }
    ],
  },
]);

