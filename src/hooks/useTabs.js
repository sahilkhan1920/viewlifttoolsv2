import { useRouter } from 'next/router'
import tabsData from 'src/json/tabs.json'

const useMenus = () => {
  const router = useRouter()
  const tab = tabsData.find((item) => router.pathname.includes(item.route))

  const checkIfSelected = (tabItems = []) => {
    // console.log('tabItems ==>', tabItems, router.pathname)
    const selected = tabItems.find((item) => {
      // console.log(item.route, router.pathname, item.route === router.pathname)
      return item.route === router.pathname
    })
    // console.log(selected)
    return Boolean(selected)
  }

  return {
    allTabs: tabsData,
    activeTab: tab,
    activeTabItem: {},
    checkIfSelected,
  }
}

export default useMenus
