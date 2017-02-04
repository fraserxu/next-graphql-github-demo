import withData from '../lib/withData'
import App from '../components/app'
import Header from '../components/header'
import Login from '../components/login'

const HomePage = () => (
  <App>
    <Header />
    <Login />
  </App>
)

export default withData(HomePage)
