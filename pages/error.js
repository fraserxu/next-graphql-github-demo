import App from '../components/app'
import cowsay from 'cowsay-browser'

const ErrorPage = () => (
  <App>
    <pre>{ cowsay.say({ text: 'Authentication error!' }) }</pre>
  </App>
)

export default ErrorPage
