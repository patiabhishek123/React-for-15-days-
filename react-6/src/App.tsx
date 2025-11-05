
import UserContextProvider from './context/UserContextProvider'
import { Login, Profile } from './components/index'
function App() {

  return (
    <UserContextProvider>
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h1>React with chai is important !</h1>
          <Login></Login>
          <Profile></Profile>
        </div>
      </div>

    </UserContextProvider>
  )
}

export default App
