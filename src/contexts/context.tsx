import React, { useContext, useState } from 'react'

export type CurrentTabContext = {
  currentTab: number
  setCurrentTab: (c: number) => void
}

export const UserContext = React.createContext<CurrentTabContext>({
  currentTab: 0, // set a default value
  setCurrentTab: () => {},
})

export const useGlobalContext = () => useContext(UserContext)

export default function GlobalProvider() {
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <UserContext.Provider
      value={{ currentTab, setCurrentTab }}
    ></UserContext.Provider>
  )
}
