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
      <pre>{ cowsay.say({ text: 'hi next graphql github demo!' }) }</pre>
    </header>
    <Repos />
  </main>
)
