import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import useTabs from 'src/hooks/useTabs'
import IconsMap from 'src/helpers/menuIconsMap'
import { useRouter } from 'next/router'

export default function NestedList() {
  const {
    activeTab: { items },
    checkIfSelected,
  } = useTabs()
  const [activeMenu, setActiveMenu] = useState(null)
  const router = useRouter()
  const handleClick = (key, route) => {
    route && router.push(route)
    setActiveMenu(activeMenu ? '' : key)
  }

  const handleItemClick = (key, route) => {
    router.push(route)
  }

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        height: '100%',
      }}
      component="nav"
    >
      {items?.map(({ key, title, items: tabItems, route }) => {
        const isSelected =
          activeMenu === null ? checkIfSelected(tabItems) : activeMenu === key
        return (
          <div key={`menu-${key}`}>
            <ListItemButton
              onClick={() => handleClick(key, route)}
              sx={{
                color: route === router.pathname ? 'primary.main' : '',
              }}
            >
              <ListItemIcon>
                {React.createElement(
                  IconsMap[title || ''],
                  {
                    color: route === router.pathname ? 'primary' : 'secondary',
                  },
                  null
                )}
              </ListItemIcon>
              <ListItemText
                primary={title}
                sx={{
                  color:
                    route === router.pathname ? 'primary.main' : 'secondary',
                }}
              />
              {tabItems && (isSelected ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={isSelected} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {tabItems?.map(({ key, title, route }) => {
                  return (
                    <ListItemButton
                      key={key}
                      sx={{
                        pl: 4,
                        color:
                          route === router.pathname
                            ? 'primary.main'
                            : 'secondary',
                      }}
                      onClick={() => handleItemClick(key, route)}
                    >
                      <ListItemText primary={title} />
                    </ListItemButton>
                  )
                })}
              </List>
            </Collapse>
          </div>
        )
      })}
    </List>
  )
}
