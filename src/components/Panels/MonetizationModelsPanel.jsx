/* eslint-disable react/no-unescaped-entities */
import { Box } from '@mui/material'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'
import modelJsonStatic from 'src/json/modelJsonStatic.json'
import AddMonetizationModel from '../Modals/AddMonetizationModel'
import { monetizationModelIntialValues } from 'src/validationSchemas/monetizationModelSchema'
import useModels from 'src/hooks/useModels'
import { useEffect, useState } from 'react'

const MonetizationModelsPanel = () => {
  const { loading, data } = useModels()
  const [modelInfoDynamic, setModelInfoDynamic] = useState([])
  const [showAddModel, setShowAddModel] = useState(false)
  const [editItemId, setEditItemId] = useState('')
  const [
    monetizationModelIntialValuesState,
    setMonetizationModelIntialValuesState,
  ] = useState(monetizationModelIntialValues)

  useEffect(() => {
    if (data?.length > 0) {
      setModelInfoDynamic(data)
    }
  }, [data])

  const contentModelListBoxItemHeadTextStyles = {
    fontSize: '15px',
    fontWeight: 'bolder',
    lineHeight: 1,
  }

  return (
    <Box
      padding={2}
      marginTop={2}
      sx={{ border: 1, borderColor: '#cfcfcf', borderRadius: '10px' }}
    >
      {showAddModel && (
        <AddMonetizationModel
          setShowAddModel={setShowAddModel}
          setModelInfoDynamic={setModelInfoDynamic}
          modelInfoDynamic={modelInfoDynamic}
          monetizationModelIntialValuesState={
            monetizationModelIntialValuesState
          }
          editItemId={editItemId}
        />
      )}
      <Box className="content-ModelTabPanelHeader">
        <Typography sx={{ fontWeight: 'bold' }} variant="h6">
          Monetization Models
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '20px' }} marginTop={2}>
        <Box className="content-model-list" sx={{ width: '340px' }}>
          {loading === true && (
            <VLLoaderWrapper loading={loading}></VLLoaderWrapper>
          )}

          {loading === false &&
            modelInfoDynamic &&
            modelInfoDynamic.length > 0 &&
            modelInfoDynamic.map((item) => {
              return (
                <Box
                  key={item.id}
                  className="content-model-list-box"
                  sx={{
                    border: '1px solid #d5d5d5',
                    background: '#f0f0f0',
                    padding: '10px',
                    marginBottom: '15px',
                    boxShadow: '0 0 5px 0 #ccc',
                    borderRadius: '4px',
                  }}
                >
                  <Box
                    className="content-model-list-box-head"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <Box className="content-model-list-box-head-title">
                      <Box
                        sx={{
                          display: 'inline',
                          fontWeight: 'normal',
                          fontSize: '15px',
                          textTransform: 'capitalize',
                          marginRight: '10px',
                        }}
                      >
                        {item.name}
                      </Box>
                      <Box sx={{ display: 'inline' }}></Box>
                    </Box>
                    <Box
                      className="content-model-list-box-head-type"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Box
                        sx={{
                          marginRight: '10px',
                          fontSize: '16px',
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.type}
                      </Box>
                      <Box
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          setMonetizationModelIntialValuesState({
                            name: item.name,
                            type: item.type,
                            default: item.default,
                            contentTypeVideo: true,
                          })
                          setEditItemId(item.id)
                          setShowAddModel(true)
                        }}
                      >
                        <EditIcon
                          sx={{
                            color: '#9b9b9b',
                            height: '19px',
                            width: '22px',
                            position: 'relative',
                            top: '1.4px',
                            marginLeft: '10px',
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {item?.videoPricing && (
                    <Box
                      className="content-model-list-box-item-head"
                      sx={{ marginBottom: '10px' }}
                    >
                      <Typography
                        variant="h3"
                        color="primary.main"
                        sx={contentModelListBoxItemHeadTextStyles}
                        className="content-model-list-box-item-head-text"
                      >
                        Video Pricing
                      </Typography>
                      <Box
                        className="content-model-list-box-item-detail"
                        sx={{ fontSize: '13px' }}
                      >
                        {' '}
                        {item?.videoPricing?.rent && (
                          <Box sx={{ display: 'inline' }}>
                            Rent:{' '}
                            {item?.currency.toLowerCase() === 'usd' && '$'}
                            {item?.videoPricing?.rent?.sd}
                          </Box>
                        )}
                        {item?.videoPricing.rent && item.purchase && ' , '}
                        {item.purchase && (
                          <Box sx={{ display: 'inline' }}>
                            Purchase:{' '}
                            {item.currency.toLowerCase() === 'usd' && '$'}
                            {item.videoPricing.purchase?.sd}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                  {item?.rentalPeriod && (
                    <Box
                      className="content-model-list-box-item-head"
                      sx={{ marginBottom: '10px' }}
                    >
                      <Typography
                        variant="h3"
                        sx={contentModelListBoxItemHeadTextStyles}
                        color="primary.main"
                        className="content-model-list-box-item-head-text"
                      >
                        Options
                      </Typography>
                      <Box
                        className="content-model-list-box-item-detail"
                        sx={{ fontSize: '13px' }}
                      >
                        {item?.rentalPeriod?.value / 24}days/
                        {item.rentalPeriod.value}
                        {item.rentalPeriod.unit}
                      </Box>
                    </Box>
                  )}
                  {item?.contentTypes && (
                    <Box
                      className="content-model-list-box-item-head"
                      sx={{ marginBottom: '10px' }}
                    >
                      <Typography
                        variant="h3"
                        sx={contentModelListBoxItemHeadTextStyles}
                        color="primary.main"
                        className="content-model-list-box-item-head-text"
                      >
                        Content Types
                      </Typography>
                      <Box
                        className="content-model-list-box-item-detail"
                        sx={{ fontSize: '13px' }}
                      >
                        {Object.values(item.contentTypes).map((val, i) => {
                          if (val) {
                            return (
                              <Box key={i} sx={{ display: 'inline' }}>
                                {Object.keys(item.contentTypes)[i]}
                              </Box>
                            )
                          }
                        })}
                      </Box>
                    </Box>
                  )}
                </Box>
              )
            })}

          <Button
            sx={{ width: '100%' }}
            variant="contained"
            onClick={() => {
              setShowAddModel(true)
              setMonetizationModelIntialValuesState({
                name: '',
                type: '',
                default: false,
                contentTypeVideo: true,
              })
              setEditItemId('')
            }}
          >
            Add new model
          </Button>
        </Box>
        <Box
          padding={1.5}
          sx={{
            flexGrow: 1,
            border: '2px solid #d2d2d2',
            boxShadow: '0 0 5px 0 #ccc',
            background: '#f0f0f0',
          }}
          className="content-models-info"
        >
          <Box
            className="content-models-info-header"
            sx={{ marginBottom: '10px', borderBottomColor: '#d8d8d8' }}
          >
            <Typography
              color="primary.main"
              sx={{
                fontWeight: 'bold',

                fontStyle: 'italic',
                fontSize: '19px',
              }}
              variant="h6"
              className="content-models-info-header-text"
            >
              How can you monetize your content?
            </Typography>
            <Typography
              sx={{ fontSize: '14px' }}
              className="content-models-info-para"
            >
              Create Monetization Models that you can assign to your content.
              When editing your content, you can override your default to assign
              any other models you've created. You can also override pricing at
              the content level.
            </Typography>
          </Box>
          <Box className="content-model-info-list" sx={{ marginTop: '15px' }}>
            {modelJsonStatic &&
              modelJsonStatic.map((item, i) => {
                return (
                  <Box key={i}>
                    <Typography
                      color="primary.main"
                      sx={{
                        fontWeight: 'bold',

                        fontStyle: 'italic',
                        fontSize: '18px',
                        marginTop: '15px',
                      }}
                      variant="h6"
                      className="content-models-info-header-text"
                    >
                      {item.name}
                    </Typography>
                    <Box
                      className="content-model-info-list-header-text"
                      sx={{ fontSize: '14px', marginTop: '-5px' }}
                    >
                      {item.text}
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MonetizationModelsPanel
