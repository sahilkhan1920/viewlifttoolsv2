import * as yup from 'yup'

const settingsSchema = yup.object({
  features: {
    casting: yup.bool(),
  },
})

export const settingInitialValues = {
  features: {},
}

export default settingsSchema
