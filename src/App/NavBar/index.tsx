import React from 'react'
import './NavBar.scss'
import { Button } from 'App/components/Button'

type Props = React.HTMLAttributes<HTMLDivElement>

export const NavBar: React.FC<Props> = props => {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <div className='navbar'>
      {isOpened ? (
        <div className='navbar__items-container'>
          <div className='navbar__item'>
            <Button
              variant='icon'
              className='navbar__close-button'
              onClick={() => setIsOpened(false)}>
              X
            </Button>
          </div>
          <div className='navbar__item'>
            <Button variant='danger'>Log out</Button>
          </div>
        </div>
      ) : null}
      <p className='navbar__heading'>mfc</p>

      <Button variant='icon' className='navbar__button' onClick={() => setIsOpened(true)}>
        ☰
      </Button>
    </div>
  )
}
