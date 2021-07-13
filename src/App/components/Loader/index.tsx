import React from 'react'
import './Loader.scss'

export const Loader: React.FC = () => {
  return (
    <section className='app-loader'>
      <div className='app-loader__wrapper'>
        <div className='app-loader__dot'></div>
        <div className='app-loader__dot'></div>
        <div className='app-loader__dot'></div>
      </div>
    </section>
  )
}
