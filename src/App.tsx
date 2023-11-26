import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import Router from './lib/routes/router';
import { ConfigProvider } from './lib/utils/provider/configProvider';
import "bootstrap/dist/css/bootstrap.min.css"
import '/src/styles/main.css';
import { UserProvider } from './lib/utils/provider/userProvider';
import { TimerProvider } from './lib/utils/provider/timerProvider';


const queryClient = new QueryClient();

export default function App() {
  return (
    <ConfigProvider>
      <UserProvider>
        <TimerProvider>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={Router} />
          </QueryClientProvider>
        </TimerProvider>
      </UserProvider>
    </ConfigProvider>
  )
}
