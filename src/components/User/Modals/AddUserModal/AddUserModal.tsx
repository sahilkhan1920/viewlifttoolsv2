import { Box, Typography, Button, Modal, ModalProps, TextField, useTheme, Autocomplete } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'

import CONFIG from '../../../../../pages/users/config.json'
import COUNTRIES from '../../../../json/countries.json'
import useAddUserHandler, { AddUserDataType } from 'src/hooks/Users/useAddUserHandler'

const Popup = dynamic(() => import('src/components/common/Popup'))

export type AddUserModalPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
}
export default function AddUserModal({ open, onClose, onCancel }: AddUserModalPropType) {
  const { values, setFieldValue, setFieldError, handleSubmit } = useAddUserHandler()
  const { palette } = useTheme()

  const { title, cta, fields, confirmation } = CONFIG.addUserModal
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <>
      <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ background: 'white' }} flex={1} maxWidth={'30rem'}>
          <Box p={1} bgcolor={palette.primary.dark}>
            <Typography variant="h6" color={palette.primary.contrastText}>
              {title}
            </Typography>
          </Box>
          <Box paddingY={3} paddingX={2} display="flex" flexDirection="column">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <Box id="modal-form" display="flex" flexDirection="column" gap={2}>
                {fields.map((field) =>
                  field.fieldtype === 'select' ? (
                    <Autocomplete
                      size="small"
                      key={field.id}
                      id={field.id}
                      options={COUNTRIES}
                      getOptionLabel={({ label }) => label}
                      openOnFocus={false}
                      renderInput={(args) => (
                        <TextField {...args} name={field.name} value={values[field.name as keyof AddUserDataType]} placeholder={field.placeholder} />
                      )}
                      onChange={(e, value) => {
                        setFieldError(field.name as keyof AddUserDataType, '')
                        setFieldValue(field.name as keyof AddUserDataType, value?.value)
                      }}
                    />
                  ) : (
                    <TextField
                      key={field.id}
                      {...field}
                      id={field.id}
                      type={field.fieldtype}
                      value={values[field.name as keyof AddUserDataType]}
                      onChange={(e) => {
                        setFieldError('name', '')
                        setFieldValue(field.name as keyof AddUserDataType, e.target.value)
                      }}
                      size="small"
                    />
                  )
                )}
              </Box>
              <Box display="flex" gap={5} id="modal-actions">
                <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
                  {cta.cancel.label}
                </Button>
                <Button fullWidth variant="contained" type="submit">
                  {cta.add.label}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
      {showConfirmation ? (
        <Popup popUpOpen={showConfirmation} setPopup={setShowConfirmation} heading={confirmation.title}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Typography>{confirmation.text}</Typography>
            <Button variant="contained" onClick={() => setShowConfirmation(false)} sx={{ margin: '0 0 0 auto' }}>
              Close
            </Button>
          </Box>
        </Popup>
      ) : (
        false
      )}
    </>
  )
}
