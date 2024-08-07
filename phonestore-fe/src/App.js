
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash";
import AppRoutes from './routes/AppRoutes';
import NavHeader from './components/navigation/NavHeader';

function App() {


  return (
    <div className="App">
      <div className='app-header'>
        <NavHeader />
      </div>
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
