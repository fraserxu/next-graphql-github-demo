import withData from '../lib/withData'

import Header from '../components/header'
import Followers from '../components/followers'

const IssuePage = () => (
  <main>
    <Header />
    <Followers />
  </main>
)

export default withData(IssuePage)