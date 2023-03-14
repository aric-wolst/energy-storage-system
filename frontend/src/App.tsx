import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/App.scss"
import Header from './components/Header';
import Battery from './views/Battery';

function App() {
  return (
    <div className="app">
      <Header/>
      <Battery batteryId={"12000020f51bb4362eee2abe"}/>
    </div>
  );
}

export default App;
