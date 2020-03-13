import React from 'react'
import { useSession } from '../Session'

import { Dropdown } from '../UI/Dropdown'
import { Button, Icon } from '../UI'
import { useFlash, logoutFlash } from '../Flash'
export default function UserMenu() {
  const [session, , removeSession] = useSession()
  const flash = useFlash()
  const handleRemoveSession = () => {
    flash.add(logoutFlash)
    removeSession()
  }

  return (
    <Dropdown
      buttonText={
        session.first_name
          ? `${session.first_name} ${session.last_name}`
          : 'Account'
      }
      menuClass={'mt-5'}
    >
      <Button
        onClick={handleRemoveSession}
        link
        flat
        full
        className="text-left"
      >
        <Icon icon="sign-out-alt" className="mr-2" />
        Log out
      </Button>
      {/* <DropdownItem>Action</DropdownItem>
      <DropdownItem>Another action</DropdownItem> */}
      {/* <DropdownDivider /> */}

      {/* <div className="dropdown-item cursor-pointer" >
        Log out
      </div> */}
    </Dropdown>
  )
}
