import React from 'react'
import cowsay from 'cowsay-browser'
import Link from 'next/prefetch'

export default () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href='/'>
            <a>Repos</a>
          </Link>
        </li>
        <li>
          <Link href='/follower'>
            <a>Followers</a>
          </Link>
        </li>
        <li>
          <Link href='/how'>
            <a>How it works</a>
          </Link>
        </li>
      </ul>
    </nav>
    <pre>{ cowsay.say({ text: 'hi next graphql github demo!' }) }</pre>
  </header>
)
