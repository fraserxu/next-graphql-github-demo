import React from 'react'
import cowsay from 'cowsay-browser'
import Link from 'next/prefetch'

import Repos from './repos'

export default () => (
  <main>
    <header>
      <Link href='/how'>
        <a>How it works</a>
      </Link>
      <Link href='/issue'>
        <a>Issue</a>
      </Link>
      <pre>{ cowsay.say({ text: 'hi next graphql github demo!' }) }</pre>
      <pre>{ cowsay.say({ text: 'LOL!' }) }</pre>
      <pre>{ cowsay.say({ text: 'Developmet experience!' }) }</pre>
    </header>
    <Repos />
  </main>
)
