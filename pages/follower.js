import withData from '../lib/withData'

import App from '../components/app'
import Header from '../components/header'
import Followers from '../components/followers'

const FollwerPage = () => (
  <App>
    <Header />
    <Followers />
  </App>
)

export default withData(FollwerPage)
