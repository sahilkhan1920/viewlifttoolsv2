import { QuestionMark } from '@mui/icons-material'
import { Box, Tooltip, Typography } from '@mui/material'
import { ReactNode } from 'react'

export type FieldGroupPropType = {
  showHelperIcon?: boolean
  field: ReactNode
  fieldTitle: string
  fieldSubText?: string
  helperText?: string
}
export default function FieldGroup({ fieldSubText, helperText, field, fieldTitle, showHelperIcon }: FieldGroupPropType) {
  return (
    <Box id="field-container" display="flex" alignItems="center" gap={2}>
      <Box id="help-icon" maxWidth={'10rem'} sx={{ width: '100%' }}>
        {showHelperIcon ? (
          <Tooltip title={helperText}>
            <Box
              role="button"
              sx={{ width: '1.5rem', height: '1.5rem', border: '1px solid black', cursor: 'help', borderRadius: '50%' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <QuestionMark sx={{ height: '1rem', width: '1rem' }} />
            </Box>
          </Tooltip>
        ) : (
          false
        )}
      </Box>
      <Box display="flex" gap={0.5} width={'100%'} alignItems="center">
        <Box flex={1}>
          <Typography flex={'0 0 auto'} minWidth={'10rem'} width={'100%'}>
            {fieldTitle}
          </Typography>
          {fieldSubText ? (
            <Typography variant="caption" flex={'0 0 auto'} minWidth={'10rem'} width={'100%'}>
              {fieldSubText}
            </Typography>
          ) : (
            false
          )}
        </Box>
        {field}
      </Box>
    </Box>
  )
}
