import React from 'react'
import ContentHeader from 'src/components/Content/ContentHeader'
import { Box } from '@mui/material'
import ContentTabPanel from 'src/components/common/ContentTabPanel'
import ContentList from 'src/components/Content/ContentList/index'
import contentData from 'src/json/contentData.json'
import UserProvider from 'src/components/common/UserProvider'

const Content = () => {
  return (
    <UserProvider>
      <Box className="content">
        <ContentHeader />
        <ContentTabPanel tabs={contentData.tabs} name="content">
          {contentData.tabs.map((item, i) => (
            <ContentList key={`item-${i}`} />
          ))}
        </ContentTabPanel>
      </Box>
    </UserProvider>
  )
}

export default Content
