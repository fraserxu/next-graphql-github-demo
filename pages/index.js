import withData from '../lib/withData'

import Header from '../components/header'
import Repos from '../components/repos'

const App = () => (
  <main>
    <Header />
    <Repos />
  </main>
)

export default withData(App)
