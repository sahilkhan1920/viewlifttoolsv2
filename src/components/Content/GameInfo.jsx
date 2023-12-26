import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/material'
import ContentSelect2 from './ContentSelect2'
import ContentTextfield from 'src/components/Content/ContentTextfield'

export default function GameInfo({
  formik,
  handleAutosave,
  leagueOptions,
  leagueInputValue,
  homeTeamOptions,
  homeTeamInputValue,
  awayTeamOptions,
  awayTeamInputValue,
  handleFocusAutocomplete,
  handleInputChangeAutocomplete,
  handleAutocompleteClose,
  handleSelectChange,
}) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'gameInfo'}
        onChange={handleChange('gameInfo')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="gameInfo"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>GAME INFO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <ContentTextfield
                value={formik?.values?.sportsRadarId}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="sportsRadarId"
                label="Sport Radar ID"
                width="100%"
                marginTop="0px"
                name="sportsRadarId"
                required={false}
              />
              <ContentTextfield
                value={formik?.values?.sportsRadarSeasonId}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="sportsRadarSeasonId"
                label="Season ID"
                width="100%"
                marginTop="0px"
                name="sportsRadarSeasonId"
                required={false}
              />
              <ContentTextfield
                value={formik?.values?.sportsRadarWidgetType}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="sportsRadarWidgetType"
                label="Widget Type"
                width="100%"
                marginTop="0px"
                name="sportsRadarWidgetType"
                required={false}
              />
            </Box>
            <Box
              sx={{
                width: '100%',
                marginTop: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                }}
              >
                League
                <ContentSelect2
                  value={formik.values.league}
                  handleInputChange={handleInputChangeAutocomplete}
                  handleFocus={handleFocusAutocomplete}
                  handleChange={handleSelectChange}
                  options={leagueOptions}
                  id="league"
                  placeholder="Select League"
                  name="league"
                  autocompleteInputValue={leagueInputValue}
                  handleAutocompleteClose={handleAutocompleteClose}
                  height="60px"
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                }}
              >
                Home Team
                <ContentSelect2
                  value={formik.values.homeTeam}
                  handleInputChange={handleInputChangeAutocomplete}
                  handleFocus={handleFocusAutocomplete}
                  handleChange={handleSelectChange}
                  options={homeTeamOptions}
                  id="homeTeam"
                  placeholder="Select Home Team"
                  name="homeTeam"
                  autocompleteInputValue={homeTeamInputValue}
                  handleAutocompleteClose={handleAutocompleteClose}
                  height="60px"
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                }}
              >
                Away Team
                <ContentSelect2
                  value={formik.values.awayTeam}
                  handleInputChange={handleInputChangeAutocomplete}
                  handleFocus={handleFocusAutocomplete}
                  handleChange={handleSelectChange}
                  options={awayTeamOptions}
                  id="awayTeam"
                  placeholder="Select Away Team"
                  name="awayTeam"
                  autocompleteInputValue={awayTeamInputValue}
                  handleAutocompleteClose={handleAutocompleteClose}
                  height="60px"
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginTop: '20px',
              }}
            >
              <ContentTextfield
                value={formik?.values?.ticketUrl}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="ticketUrl"
                label="Ticketmaster URL"
                width="100%"
                marginTop="0px"
                name="ticketUrl"
                required={false}
              />
              <ContentTextfield
                value={formik?.values?.ticketMasterId}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="ticketMasterId"
                label="Ticketmaster ID"
                width="100%"
                marginTop="0px"
                name="ticketMasterId"
                required={false}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
