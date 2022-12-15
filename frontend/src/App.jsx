import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from './templates/Logo';
import Nav from './templates/Nav';
import Routes from './Routes.jsx';
import Footer from './templates/Footer';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="app" id='app'>
      <Logo />
      <Nav />
      <Routes />
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
