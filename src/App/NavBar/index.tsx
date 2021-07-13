import React from 'react'
import './NavBar.scss'
import { Button } from 'App/components/Button'
import { auth } from 'lib/firebase'

type Props = React.HTMLAttributes<HTMLDivElement>

export const NavBar: React.FC<Props> = props => {
  const [isOpened, setIsOpened] = React.useState(false)

  const handleLogOut = () => auth.signOut()

  return (
    <div className='navbar'>
      {isOpened ? (
        <div className='navbar__items-container'>
          <div className='navbar__item'>
            <Button
              variant='icon'
              className='navbar__close-button'
              onClick={() => setIsOpened(false)}>
              <span className='far fa-times-circle'></span>
            </Button>
          </div>
          <div className='navbar__item'>
            <Button variant='icon' onClick={handleLogOut}>
              <span className='fas fa-sign-out-alt'></span>
            </Button>
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
