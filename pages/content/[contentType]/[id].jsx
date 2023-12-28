import { Box } from '@mui/material'
import ContentLoader from 'src/components/Content/ContentLoader'
import ContentEditHeader from 'src/components/Content/ContentEditHeader'
import ContentImage from 'src/components/Content/ContentImage'
import ContentDetails from 'src/components/Content/ContentDetails'
import ContentTextfield from 'src/components/Content/ContentTextfield'
import ContentMultilineField from 'src/components/Content/ContentMultilineField'
import ContentSelect2 from 'src/components/Content/ContentSelect2'
import ContentManageImages from 'src/components/Content/ContentManageImages'
import ContentLanguageList from 'src/components/Content/ContentLanguageList'
import useContentSettings from 'src/hooks/Content/useContentSettings'
import ContentAvailableDates from 'src/components/Content/ContentAvailableDates'
import CKEditor from 'src/components/Content/CKEditor'
import ContentSeo from 'src/components/Content/ContentSeo'
import ContentVersionHistory from 'src/components/Content/ContentVersionHistory'
import CastAndCrew from '../../../src/components/Content/CastAndCrew'
import VideoPlaylist from '../../../src/components/Content/VideoPlaylist'
import AdditionalMetadata from '../../../src/components/Content/AdditionalMetadata'
import ContentAirDate from '../../../src/components/Content/AirDateTime'
import LicenseBlock from '../../../src/components/Content/LicenseBlock'
import TrailersBlock from '../../../src/components/Content/Trailers'
import EmbedCode from '../../../src/components/Content/EmbedCode'
import RelatedVideos from '../../../src/components/Content/RelatedVideos'
import PromoVideos from '../../../src/components/Content/PromoVideos'
import CustomField from '../../../src/components/Content/CustomField'
import SeasonAirDate from '../../../src/components/Content/SeasonAirDate'
import AdvancedOptions from '../../../src/components/Content/AdvancedOptions'
import LiveStreams from '../../../src/components/Content/LiveStreams'
import GameInfo from '../../../src/components/Content/GameInfo'
import GameStates from '../../../src/components/Content/GameStates'
import ScheduleSection from '../../../src/components/Content/ScheduleSection'
import EventInfo from '../../../src/components/Content/EventInfo'
import SelectRatingComponent from '../../../src/components/selectRatingOption/selectRating'

const ContentType = () => {
  const {
    loading,
    apiType,
    contentId,
    pageData,
    imageCount,
    formik,
    tagOptions,
    categoryOptions,
    handleFocusAutocomplete,
    handleInputChangeAutocomplete,
    handleAutosave,
    successAutosave,
    setSucessAutosave,
    failedAutosave,
    setFailedAutosave,
    handleSelectChange,
    ckEditorDataSave,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    handleAsyncDateChange,
    timeZoneList,
    timezone,
    seoKeywords,
    handleSeoKeywordsAddition,
    handleSeoKeywordsDeletion,
    contentButtonsAction,
    archiveContent,
    updateContent,
    imgSrc32x9,
    imgSrc16x9,
    imgSrc3x4,
    imgSrc1x1,
    imgSrc9x16,
    imgId32x9,
    imgId16x9,
    imgId3x4,
    imgId1x1,
    imgId9x16,
    images32x9,
    images16x9,
    images3x4,
    images1x1,
    images9x16,
    handleImageDrop,
    handleImageDeletion,
    openManageImageModal,
    closeManageImageModal,
    manageImagesModal,
    imageListData,
    setImageListData,
    handleImgCarousel,
    showImage,
    director,
    handleDirectorAddition,
    handleDirectorDeletion,
    starring,
    handleStarringAddition,
    handleStarringDeletion,
    videoplaylist,
    setVideoplaylist,
    handleVideoplaylistDeletion,
    additionalMetadata,
    setAdditionalMetadata,
    handleAdditionalMetadata,
    airDateTime,
    setAirDateTime,
    airTimezone,
    licenseOptions,
    trailerOptions,
    relatedVideoOptions,
    promoVideoOptions,
    embedCode,
    optionalTagOptions,
    seasonAirDateTime,
    setSeasonAirDateTime,
    seasonAirTimezone,
    modelOptions,
    planOptions,
    personOptions,
    personInputValue,
    tagInputValue,
    optionalTagInputValue,
    planInputValue,
    trailerInputValue,
    relatedVideosInputValue,
    promoVideosInputValue,
    categoryInputValue,
    handleAutocompleteClose,
    cloudfrontProgress,
    startLiveStream,
    stopLiveStream,
    showChooseArchive,
    showPrimaryInput,
    showSecondaryInput,
    primaryLiveInput,
    secondaryLiveInput,
    channelState,
    isDVR,
    publishDisabled,
    liveWorkflowStatus,
    liveWorkflowMessage,
    handleEditViewClose,
    startLiveDisabled,
    stopLiveDisabled,
    showDVR,
    stopLiveEvent,
    startLiveEvent,
    mediaLiveAlerts,
    showDuplicateContent,
    thirdPartyLive,
    livestreamOptions,
    livestreamInputValue,
    highlightOptions,
    highlightInputValue,
    previewVideoOptions,
    previewVideoInputValue,
    leagueOptions,
    leagueInputValue,
    homeTeamOptions,
    homeTeamInputValue,
    awayTeamOptions,
    awayTeamInputValue,
    currentGameState,
    setCurrentGameState,
    defaultGameState,
    setDefaultGameState,
    preGameState,
    setPreGameState,
    liveGameState,
    setLiveGameState,
    postGameState,
    setPostGameState,
    endGameState,
    setEndGameState,
    showScheduleButton,
    setShowScheduleButton,
    createScheduleButton,
    setCreateScheduleButton,
    selectedRating,
    setSelectedRating,

  } = useContentSettings()

  return loading ? (
    <ContentLoader />
  ) : (
    <Box component="form">
      <ContentEditHeader
        headerData={pageData}
        successAutosave={successAutosave}
        failedAutosave={failedAutosave}
        setSucessAutosave={setSucessAutosave}
        setFailedAutosave={setFailedAutosave}
        contentButtonsAction={contentButtonsAction}
        archiveContent={archiveContent}
        updateContent={updateContent}
        publishDisabled={publishDisabled}
        handleEditViewClose={handleEditViewClose}
        showDuplicateContent={showDuplicateContent}
      />
      <Box
        sx={{
          paddingTop: '70px',
          borderBottom: '1px solid #ccc',
          background: '#fff',
        }}
      >
        <Box
          sx={{
            width: '85%',
            margin: '0 auto',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ContentDetails contentDetails={pageData} />
        </Box>
        <Box
          sx={{
            width: '85%',
            margin: '0 auto',
            paddingBottom: '15px',
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '30%',
                    height: '120px',
                    overflow: 'hidden',
                  }}
                >
                  <ContentImage contentImage={showImage} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '70%',
                  }}
                >
                  <ContentTextfield
                    value={formik.values.title}
                    handleChange={formik.handleChange}
                    handleAutosave={handleAutosave}
                    id="title"
                    label="Title"
                    width="100%"
                    marginTop="0px"
                    name="title"
                    required={true}
                  />
                  <ContentTextfield
                    value={formik.values.author && formik.values.author.name}
                    handleChange={formik.handleChange}
                    handleAutosave={handleAutosave}
                    id="author"
                    label="Author"
                    width="100%"
                    marginTop="0px"
                    name="author"
                    required={false}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: '100%',
                }}
              >
                {apiType == 'article' && (
                  <Box
                    sx={{
                      width: '100%',
                      marginTop: '7.5px',
                    }}
                  >
                    Lead
                    <ContentMultilineField
                      value={formik.values.summaryText}
                      handleChange={formik.handleChange}
                      handleAutosave={handleAutosave}
                      id="summaryText"
                      label=""
                      width="100%"
                      marginTop=""
                      name="summaryText"
                      rows={2}
                    />
                  </Box>
                )}
                {apiType == 'game' && (
                  <Box
                    sx={{
                      width: '100%',
                      marginTop: '7.5px',
                    }}
                  >
                    Broadcaster
                    <ContentMultilineField
                      value={formik.values.broadcaster}
                      handleChange={formik.handleChange}
                      handleAutosave={handleAutosave}
                      id="broadcaster"
                      label=""
                      width="100%"
                      marginTop=""
                      name="broadcaster"
                      rows={2}
                    />
                  </Box>
                )}
                <ContentMultilineField
                  value={formik.values.description}
                  handleChange={formik.handleChange}
                  handleAutosave={handleAutosave}
                  id="description"
                  label="Description"
                  width="100%"
                  marginTop="15px"
                  name="description"
                  rows={4}
                />
                <ContentManageImages
                  imageCount={imageCount}
                  openCreateModal={openManageImageModal}
                  closeCreateModal={closeManageImageModal}
                  manageImagesModal={manageImagesModal}
                  imgSrc32x9={imgSrc32x9}
                  imgSrc16x9={imgSrc16x9}
                  imgSrc3x4={imgSrc3x4}
                  imgSrc1x1={imgSrc1x1}
                  imgSrc9x16={imgSrc9x16}
                  imgId32x9={imgId32x9}
                  imgId16x9={imgId16x9}
                  imgId3x4={imgId3x4}
                  imgId1x1={imgId1x1}
                  imgId9x16={imgId9x16}
                  handleImgCarousel={handleImgCarousel}
                  images32x9={images32x9}
                  images16x9={images16x9}
                  images3x4={images3x4}
                  images1x1={images1x1}
                  images9x16={images9x16}
                  handleImageDrop={handleImageDrop}
                  handleImageDeletion={handleImageDeletion}
                  imageListData={imageListData}
                  setImageListData={setImageListData}
                />
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                marginLeft: '20px',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <ContentTextfield
                  value={formik.values.permalink}
                  handleChange={formik.handleChange}
                  handleAutosave={handleAutosave}
                  id="permalink"
                  label="Permalink"
                  width="100%"
                  marginTop="0px"
                  name="permalink"
                  required={true}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15px',
                    gap: '15px',
                  }}
                >
                  <Box
                    sx={{
                      width: '300px',
                      flex: 1,
                    }}
                  >
                    Tags
                    <ContentSelect2
                      value={formik.values.tags}
                      handleInputChange={handleInputChangeAutocomplete}
                      handleFocus={handleFocusAutocomplete}
                      handleChange={handleSelectChange}
                      options={tagOptions}
                      id="tags"
                      placeholder="Select Tags"
                      name="tag"
                      autocompleteInputValue={tagInputValue}
                      handleAutocompleteClose={handleAutocompleteClose}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: '300px',
                      flex: 1,
                    }}
                  >
                    Categories
                    <ContentSelect2
                      value={formik.values.mergedCategories}
                      handleInputChange={handleInputChangeAutocomplete}
                      handleFocus={handleFocusAutocomplete}
                      handleChange={handleSelectChange}
                      options={categoryOptions}
                      id="mergedCategories"
                      placeholder="Select Categories"
                      name="category"
                      autocompleteInputValue={categoryInputValue}
                      handleAutocompleteClose={handleAutocompleteClose}
                    />
                  </Box>
                </Box>
                {(apiType == 'video' ||
                  apiType == 'live' ||
                  apiType == 'series' ||
                  apiType == 'bundle' ||
                  apiType == 'videoplaylist' ||
                  apiType == 'article') && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '15px',
                        gap: '15px',
                      }}
                    >
                      <Box
                        sx={{
                          width: '300px',
                          flex: 1,
                        }}
                      >
                        Monetization Models
                        <ContentSelect2
                          value={formik.values.monetizationModels}
                          handleFocus={handleFocusAutocomplete}
                          handleChange={handleSelectChange}
                          options={modelOptions}
                          id="monetizationModels"
                          placeholder="Select Models"
                          name="models"
                        />
                      </Box>
                      <Box
                        sx={{
                          width: '300px',
                          flex: 1,
                        }}
                      >
                        Monetization Plans
                        <ContentSelect2
                          value={formik.values.monetizationPlans}
                          handleInputChange={handleInputChangeAutocomplete}
                          handleChange={handleSelectChange}
                          options={planOptions}
                          id="monetizationPlans"
                          placeholder="Select Plans"
                          name="plans"
                          autocompleteInputValue={planInputValue}
                          handleAutocompleteClose={handleAutocompleteClose}
                        />
                      </Box>
                    </Box>
                  )}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15px',
                    gap: '15px',
                  }}
                >
                  {(apiType == 'series') && (<Box
                    sx={{
                      width: '300px',
                      flex: 1,
                    }}
                  >
                    Person
                    <ContentSelect2
                      value={formik.values.person}
                      handleInputChange={handleInputChangeAutocomplete}
                      handleFocus={handleFocusAutocomplete}
                      handleChange={handleSelectChange}
                      options={personOptions}
                      id="person"
                      placeholder="Select Person"
                      name="person"
                      autocompleteInputValue={personInputValue}
                      handleAutocompleteClose={handleAutocompleteClose}
                    />
                  </Box>)}

                  {(apiType == 'series') && (
                    <Box
                      sx={{
                        width: '100%',
                        flex: 1,
                      }}
                    >
                      <SelectRatingComponent
                      value={formik.values.parentalRating}
                      formik={formik}
                      selectedRating ={selectedRating}
                      setSelectedRating={setSelectedRating}
                        name='parentalRating'
                        id='parentalRating'
                        handleAutosave={handleAutosave} />
                    </Box>)}
                </Box>

                {(apiType == 'game' || apiType == 'event') && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '15px',
                      gap: '15px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '300px',
                        flex: 1,
                      }}
                    >
                      Livestreams
                      <ContentSelect2
                        value={formik.values.livestreams}
                        handleInputChange={handleInputChangeAutocomplete}
                        handleFocus={handleFocusAutocomplete}
                        handleChange={handleSelectChange}
                        options={livestreamOptions}
                        id="livestreams"
                        placeholder="Select Livestreams"
                        name="livestreams"
                        autocompleteInputValue={livestreamInputValue}
                        handleAutocompleteClose={handleAutocompleteClose}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: '300px',
                        flex: 1,
                      }}
                    >
                      Highlights
                      <ContentSelect2
                        value={formik.values.highlights}
                        handleInputChange={handleInputChangeAutocomplete}
                        handleFocus={handleFocusAutocomplete}
                        handleChange={handleSelectChange}
                        options={highlightOptions}
                        id="highlights"
                        placeholder="Select Highlights"
                        name="highlights"
                        autocompleteInputValue={highlightInputValue}
                        handleAutocompleteClose={handleAutocompleteClose}
                      />
                    </Box>
                  </Box>
                )}
                {(apiType == 'game' || apiType == 'event') && (
                  <Box
                    sx={{
                      width: '100%',
                      flex: 1,
                      marginTop: '15px',
                    }}
                  >
                    Preview Video
                    <ContentSelect2
                      value={formik.values.previewVideo}
                      handleInputChange={handleInputChangeAutocomplete}
                      handleFocus={handleFocusAutocomplete}
                      handleChange={handleSelectChange}
                      options={previewVideoOptions}
                      id="previewVideo"
                      placeholder="Select Preview Video"
                      name="previewVideo"
                      autocompleteInputValue={previewVideoInputValue}
                      handleAutocompleteClose={handleAutocompleteClose}
                      height="60px"
                    />
                  </Box>
                )}
              </Box>
            </Box>
            {(apiType == 'video' || apiType == 'series' || apiType == 'article') && (
              <Box
                sx={{
                  marginLeft: '20px',
                }}
              >
                <ContentLanguageList />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          paddingBottom: '40px',
          background: '#f9fcfe',
        }}
      >
        <Box
          sx={{
            width: '85%',
            margin: '0 auto',
            paddingBottom: '15px',
          }}
        >
          {(apiType == 'article' || apiType == 'venue' || apiType == 'person' || apiType == 'team' || apiType == 'event') && (
            <CKEditor value={pageData.articleContent || pageData.details || pageData.body} ckEditorDataSave={ckEditorDataSave} />
          )}
          {apiType == 'live' && (
            <LiveStreams
              cloudfrontProgress={cloudfrontProgress}
              startLiveStream={startLiveStream}
              stopLiveStream={stopLiveStream}
              showChooseArchive={showChooseArchive}
              showPrimaryInput={showPrimaryInput}
              showSecondaryInput={showSecondaryInput}
              primaryLiveInput={primaryLiveInput}
              secondaryLiveInput={secondaryLiveInput}
              channelState={channelState}
              isDVR={isDVR}
              liveWorkflowStatus={liveWorkflowStatus}
              liveWorkflowMessage={liveWorkflowMessage}
              startLiveDisabled={startLiveDisabled}
              stopLiveDisabled={stopLiveDisabled}
              showDVR={showDVR}
              stopLiveEvent={stopLiveEvent}
              startLiveEvent={startLiveEvent}
              mediaLiveAlerts={mediaLiveAlerts}
              handleAutosave={handleAutosave}
              thirdPartyLive={thirdPartyLive}
            />
          )}
          {(apiType == 'video' ||
            apiType == 'live' ||
            apiType == 'series' ||
            apiType == 'audio' ||
            apiType == 'article' ||
            apiType == 'sport' ||
            apiType == 'photogallery') && (
              <ContentAvailableDates
                startDateTime={startDateTime}
                setStartDateTime={setStartDateTime}
                endDateTime={endDateTime}
                setEndDateTime={setEndDateTime}
                timeZoneList={timeZoneList}
                timezone={timezone}
                handleAsyncDateChange={handleAsyncDateChange}
              />
            )}
          {(apiType == 'video' || apiType == 'live') && (
            <ContentAirDate
              airDateTime={airDateTime}
              setAirDateTime={setAirDateTime}
              timeZoneList={timeZoneList}
              airTimezone={airTimezone}
              handleAsyncDateChange={handleAsyncDateChange}
            />
          )}
          {apiType == 'video' && (
            <SeasonAirDate
              seasonAirDateTime={seasonAirDateTime}
              setSeasonAirDateTime={setSeasonAirDateTime}
              timeZoneList={timeZoneList}
              seasonAirTimezone={seasonAirTimezone}
              handleAsyncDateChange={handleAsyncDateChange}
            />
          )}
          {(apiType == 'video' || apiType == 'live' || apiType == 'series' || apiType == 'bundle' || apiType == 'fastchannel') && (
            <LicenseBlock formik={formik} handleFocus={handleFocusAutocomplete} handleSelectChange={handleSelectChange} options={licenseOptions} />
          )}
          {apiType == 'game' && (
            <GameInfo
              formik={formik}
              handleAutosave={handleAutosave}
              leagueOptions={leagueOptions}
              leagueInputValue={leagueInputValue}
              homeTeamOptions={homeTeamOptions}
              homeTeamInputValue={homeTeamInputValue}
              awayTeamOptions={awayTeamOptions}
              awayTeamInputValue={awayTeamInputValue}
              handleFocusAutocomplete={handleFocusAutocomplete}
              handleInputChangeAutocomplete={handleInputChangeAutocomplete}
              handleAutocompleteClose={handleAutocompleteClose}
              handleSelectChange={handleSelectChange}
            />
          )}
          {apiType == 'event' && <EventInfo formik={formik} handleAutosave={handleAutosave} />}
          {apiType == 'game' && (
            <GameStates
              handleAutosave={handleAutosave}
              currentGameState={currentGameState}
              setCurrentGameState={setCurrentGameState}
              defaultGameState={defaultGameState}
              setDefaultGameState={setDefaultGameState}
              preGameState={preGameState}
              setPreGameState={setPreGameState}
              liveGameState={liveGameState}
              setLiveGameState={setLiveGameState}
              postGameState={postGameState}
              setPostGameState={setPostGameState}
              endGameState={endGameState}
              setEndGameState={setEndGameState}
              handleAsyncDateChange={handleAsyncDateChange}
            />
          )}
          {(apiType == 'game' || apiType == 'event') && (
            <ScheduleSection
              apiType={apiType}
              showScheduleButton={showScheduleButton}
              setShowScheduleButton={setShowScheduleButton}
              createScheduleButton={createScheduleButton}
              setCreateScheduleButton={setCreateScheduleButton}
              pageData={pageData}
            />
          )}
          {(apiType == 'venue' ||
            apiType == 'sport' ||
            apiType == 'videoplaylist' ||
            apiType == 'person' ||
            apiType == 'team' ||
            apiType == 'league' ||
            apiType == 'game' ||
            apiType == 'video' ||
            apiType == 'live') && (
              <AdditionalMetadata
                additionalMetadata={additionalMetadata}
                setAdditionalMetadata={setAdditionalMetadata}
                handleAdditionalMetadata={handleAdditionalMetadata}
                handleAutosave={handleAutosave}
              />
            )}
          {(apiType == 'video' || apiType == 'live') && <EmbedCode embedCode={embedCode} />}
          <ContentSeo
            formik={formik}
            handleAutosave={handleAutosave}
            seoKeywords={seoKeywords}
            handleSeoKeywordsAddition={handleSeoKeywordsAddition}
            handleSeoKeywordsDeletion={handleSeoKeywordsDeletion}
          />
          {(apiType == 'video' ||
            apiType == 'live' ||
            apiType == 'series' ||
            apiType == 'audio' ||
            apiType == 'article' ||
            apiType == 'event' ||
            apiType == 'photogallery' ||
            apiType == 'fastchannel') && <ContentVersionHistory apiType={apiType} contentId={contentId} />}
          {(apiType == 'video' || apiType == 'videoplaylist') && (
            <CastAndCrew
              director={director}
              handleDirectorAddition={handleDirectorAddition}
              handleDirectorDeletion={handleDirectorDeletion}
              starring={starring}
              handleStarringAddition={handleStarringAddition}
              handleStarringDeletion={handleStarringDeletion}
            />
          )}
          {apiType == 'videoplaylist' && (
            <VideoPlaylist
              videoplaylist={videoplaylist}
              setVideoplaylist={setVideoplaylist}
              setFailedAutosave={setFailedAutosave}
              handleAutosave={handleAutosave}
              handleVideoplaylistDeletion={handleVideoplaylistDeletion}
            />
          )}
          {(apiType == 'video' || apiType == 'live' || apiType == 'series' || apiType == 'bundle') && (
            <TrailersBlock
              formik={formik}
              handleFocus={handleFocusAutocomplete}
              handleInputChange={handleInputChangeAutocomplete}
              handleSelectChange={handleSelectChange}
              options={trailerOptions}
              autocompleteInputValue={trailerInputValue}
              handleAutocompleteClose={handleAutocompleteClose}
            />
          )}
          {(apiType == 'video' || apiType == 'game' || apiType == 'event') && (
            <RelatedVideos
              formik={formik}
              handleFocus={handleFocusAutocomplete}
              handleInputChange={handleInputChangeAutocomplete}
              handleSelectChange={handleSelectChange}
              options={relatedVideoOptions}
              autocompleteInputValue={relatedVideosInputValue}
              handleAutocompleteClose={handleAutocompleteClose}
            />
          )}
          {apiType == 'video' && (
            <PromoVideos
              formik={formik}
              handleFocus={handleFocusAutocomplete}
              handleInputChange={handleInputChangeAutocomplete}
              handleSelectChange={handleSelectChange}
              options={promoVideoOptions}
              autocompleteInputValue={promoVideosInputValue}
              handleAutocompleteClose={handleAutocompleteClose}
            />
          )}
          {(apiType == 'video' || apiType == 'live') && (
            <CustomField
              formik={formik}
              handleAutosave={handleAutosave}
              handleFocus={handleFocusAutocomplete}
              handleInputChange={handleInputChangeAutocomplete}
              handleSelectChange={handleSelectChange}
              options={optionalTagOptions}
              autocompleteInputValue={optionalTagInputValue}
              handleAutocompleteClose={handleAutocompleteClose}
            />
          )}
          {apiType == 'video' && <AdvancedOptions formik={formik} handleAutosave={handleAutosave} />}
        </Box>
      </Box>
    </Box>
  )
}

export default ContentType
