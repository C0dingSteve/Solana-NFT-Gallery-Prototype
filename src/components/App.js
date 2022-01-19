import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Game from "./Game"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Candymint from "./candymint/App"
import '../styles/global.css'

function App(){
  return(
    <Container id="scene-container"
      className='d-flex align-items-center justify-content-center'
      style={{minHeight:'100vh'}}
      >
      <div className='w-100' style={{maxWidth:'400px'}}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Game} />
              <PrivateRoute path='/candymint' component={Candymint} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/forgot-password' component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
)};
export default App