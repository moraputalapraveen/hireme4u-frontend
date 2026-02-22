import { BrowserRouter } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <JobProvider>
        <AppRoutes />
      </JobProvider>
    </BrowserRouter>
  );
}

export default App;