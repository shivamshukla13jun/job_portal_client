import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'

// const root = ReactDOM.createRoot(document.getElementById('root'))

// const render = () => {
//   root.render(
//     <React.Suspense fallback={<div>Loading...</div>}>
//       <App />
//     </React.Suspense>
//   )
// }

// render()

// if (import.meta.hot) {
//   import.meta.hot.accept('./App.jsx', () => {
//     console.log('HMR update')
//     render()
//   })
// }