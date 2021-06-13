import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import NavigationBar from './pages/navBar/navigationBar';
import UnAuthenticatedLanding from './pages/UnAuthenticatedLanding/UnAuthenticatedLanding.jsx';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Employees from './pages/Employees/employees';
import EmployeeDetails from './pages/Employees/employeeDetails';

function App() {
  return (
    <Provider store={store}>
    <div className="container-fluid">
      <Router>
      <NavigationBar></NavigationBar>
      <Route exact path = "/" component = {UnAuthenticatedLanding}></Route>
      <Route exact path = "/employees" component = {Employees}></Route>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
