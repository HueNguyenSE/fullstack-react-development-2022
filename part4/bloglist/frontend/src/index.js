import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const blogs = [
  {
    id: 1,
    title: "Goodbye NodeJS",
    author: "Appiahyoogie",
    url: "https://medium.com/@appiahyoofi/goodbye-node-js-9e2f71f5e430",
    likes: 5,
  },
  {
    id: 2,
    title: "NodeJS 18 is HERE! 3 Features that will blow your mind",
    author: "Luna Rojas",
    url: "https://medium.com/@Luna-Rojas/nodejs-18-is-here-3-features-that-will-blow-your-mind-7c2b86e1d13",
    likes: 5,
  },
  {
    id: 3,
    title: "11 Amazing New JavaScript Features in ES13",
    author: "Coding Beauty",
    url: "https://medium.com/javascript-in-plain-english/es13-javascript-features-eed7ed2f1497?source=explore---------2-99--------------------82f2e6ed_6890_43eb_9024_4d866fb1f73a-------15",
    likes: 5,
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App blogs={blogs} />
)