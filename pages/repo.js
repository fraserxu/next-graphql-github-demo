import withData from '../lib/withData'

import App from '../components/app'
import Header from '../components/header'
import Repos from '../components/repos'

const RepoPage = () => (
  <App>
    <Header />
    <Repos />
  </App>
)

export default withData(RepoPage)
