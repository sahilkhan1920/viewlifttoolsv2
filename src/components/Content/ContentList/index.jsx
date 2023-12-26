import React from 'react'
import ContentTile from 'src/components/Content/ContentTile'
import ContentFilters from 'src/components/Content/ContentFilters'
import ContentLoader from 'src/components/Content/ContentLoader'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import icon from 'public/cms2/icon-article.png'
import { Box, Typography } from '@mui/material'
import useContentList from 'src/hooks/Content/useContentList'
import { getApiType, getTagName } from 'src/helpers/contentHelper'
import { formatDate } from '../../../helpers/contentHelper'
import { useAppContext } from 'src/contexts/AppContext'
import useSettingsClick from 'src/hooks/Content/useSettingsClick'
import ScheduleModal from '../Modals/ScheduleModal'

const ContentList = () => {
  const {
    loading,
    // data,
    count,
    page,
    handlePageChange,
    contentFilterStatus,
    handleContentFilterStatus,
    handleSelectAll,
    handleSelect,
    selected,
    handleContentSelect,
  } = useContentList()
  const { modalData, openScheduleModal, closeModalBox, handleSettingsClick } = useSettingsClick()
  const pageCount = Math.ceil(count / 20)
  const {
    data: { listData }
  } = useAppContext()

  return (
    <>
      {openScheduleModal && <ScheduleModal open={openScheduleModal} close={closeModalBox} schedule={modalData} listTemplate="PATCH" />}
      <Box>
        <ContentFilters
          contentFilterStatus={contentFilterStatus}
          handleContentFilterStatus={handleContentFilterStatus}
          handleSelectAll={handleSelectAll}
          selected={selected}
          handleContentSelect={handleContentSelect}
        />
        {loading ? (
          <ContentLoader />
        ) : (
          <Box sx={{ padding: '0 40px 40px 40px' }}>
            {listData?.length > 0 &&
              listData.map((ele) => (
                <Box sx={{ margin: 0 }} key={ele.guid}>
                  <ContentTile
                    id={ele.id}
                    name={ele.title}
                    checked={selected.includes(ele.id)}
                    handleSelect={handleSelect}
                    tag={getTagName(ele)}
                    updatedDate={ele?.updatedDate ? formatDate(ele?.updatedDate) : "-"}
                    updateDate={ele?.updateDate ? formatDate(ele?.updateDate) : "-"}
                    publishedDate={ele?.publishDate ? formatDate(ele?.publishDate) : "-"}
                    addedDate={(ele.addedDate || ele.uploadedDate) ? formatDate(ele.addedDate || ele.uploadedDate) : "-"}
                    archivedDate={ele?.archivedDate ? formatDate(ele?.archivedDate) : "-"}
                    contentStatus={ele.contentStatus || ele.status}
                    isActive={ele?.isActive}
                    reviewStatus={ele?.reviewStatus}
                    icon={icon}
                    guid={ele.guid}
                    apiType={getApiType(ele)}
                    handleSettingsClick={handleSettingsClick}
                  />
                </Box>
              ))}
            {listData?.length === 0 && (
              <Typography variant="h5" color="primary" align="center">
                No data available!
              </Typography>
            )}
          </Box>
        )}
        {!loading && (
          <Stack
            spacing={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '20px',
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        )}
      </Box>
    </>
  )
}

export default ContentList
