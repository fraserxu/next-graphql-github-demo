import withData from '../lib/withData'

import App from '../components/app'
import Header from '../components/header'
import Repos from '../components/repos'

const HomePage = () => (
  <App>
    <Header />
    <Repos />
  </App>
)

export default withData(HomePage)
