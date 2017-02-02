import withData from '../lib/withData'

import App from '../components/app'
import Header from '../components/header'

const HowPage = () => (
  <App>
    <Header />
    <span>Magic</span>
  </App>
)

export default withData(HowPage)
