
import "./App.scss"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash";
import AppRoutes from './routes/AppRoutes';
import NavHeader from './components/navigation/NavHeader';
import Footer from './components/footer/Footer';


function App() {


  return (
    <div className="App">
      <div className='app-header'>
        <NavHeader />
      </div>
      <AppRoutes />
      <div className='app-footer'>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
