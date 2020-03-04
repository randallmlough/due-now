import React from 'react'
import { useSession } from '../Session'

import { Dropdown, Button as DropdownButton, Menu, Item } from '../UI/Dropdown'
import { Button } from '../UI'
export default function UserMenu() {
  const [session, , removeSession] = useSession()
  return (
    <Dropdown
      buttonText={
        session.first_name
          ? `${session.first_name} ${session.last_name}`
          : 'Account'
      }
    >
      <Button onClick={removeSession} link flat full className="text-left">
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
