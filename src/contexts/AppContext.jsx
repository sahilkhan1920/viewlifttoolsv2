import { createContext, useState, useContext } from 'react'

const AppContext = createContext() // Provide an empty object as default value

const AppProvider = ({ children }) => {
  const [data, setData] = useState({
    currentTab: 0,
    contentSearchKeyword: '',
    selectedContent: 'video',
    listData: []
  })

  const updateData = (newData) => {
    setData(prev => ({
      ...prev,
      ...newData,
    }))
  }

  return (
    <AppContext.Provider value={{ data, updateData }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext }
