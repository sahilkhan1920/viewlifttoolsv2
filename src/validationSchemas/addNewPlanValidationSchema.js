import * as yup from 'yup'

export const addNewaddNewPlanValidationSchemaPlanSvod = yup.object({
  name: yup.string().required('Title is required.'),
  description: yup.string().required('Description is required.'),
  identifier: yup.string().required('identifier is required'),
  renewalCycleType: yup.string().required('Billing Frequnecy is Required'),
  featureSetting: yup.object().shape({
    numberOfAllowedStreams: yup
      .number()
      .required('numberOfAllowedStreams is required'),
    numberOfAllowedDevices: yup
      .number()
      .required('numberOfAllowedDevices is required'),
  }),
  planDetails: yup.array().of(
    yup.object().shape({
      countryCode: yup.string().required('country is required.'),
      recurringPaymentAmount: yup
        .number()
        .required('Cost Per Billing Periods:.'),
    })
  ),
})

export const addNewaddNewPlanValidationSchemaPlanFree = yup.object({
  name: yup.string().required('Title is required.'),
  description: yup.string().required('Description is required.'),
  identifier: yup.string().required(),
  // .test((val) => val == val?.toLowerCase()),
})

export const addNewaddNewPlanValidationSchemaPlanTve = yup.object({
  name: yup.string().required('Title is required.'),
  description: yup.string().required('Description is required.'),
  providerId: yup.string().required('TV Provider Id is required.'),
  identifier: yup.string().required(),
  // .test((val) => val == val?.toLowerCase()),

  planDetails: yup.array().of(
    yup.object().shape({
      countryCode: yup.string().required('country is required.'),
    })
  ),
})
export const addNewaddNewPlanValidationSchemaPlanTvod = yup.object({
  name: yup.string().required('Title is required.'),
  description: yup.string().required('Description is required.'),
  identifier: yup.string().required(),
  // .test((val) => val == val?.toLowerCase()),
  featureSetting: yup.object().shape({
    numberOfAllowedStreams: yup.number().required(),
    numberOfAllowedDevices: yup.number().required(),
  }),
  planDetails: yup.array().of(
    yup.object().shape({
      countryCode: yup.string().required('country is required.'),
      purchaseAmount: yup.string().when('isPurchaseEnabled', {
        is: (isPurchaseEnabled) => {
          return isPurchaseEnabled === true
        },
        then: yup
          .string()
          .required('I am required now the purchase is checked'),
      }),
      rentAmount: yup.string().when('isRentEnabled', {
        is: (isRentEnabled) => {
          return isRentEnabled === true
        },
        then: yup.string().required('I am required now the rent is checked'),
      }),
      startingPeriodValue: yup.string().when('isRentEnabled', {
        is: (isRentEnabled) => {
          return isRentEnabled === true
        },
        then: yup.string().required('I am required now the rent is checked'),
      }),
      rentalPeriodValue: yup.string().when('isRentEnabled', {
        is: (isRentEnabled) => {
          return isRentEnabled === true
        },
        then: yup.string().required('I am required now the rent is checked'),
      }),
    })
  ),
})
export const addNewaddNewPlanValidationSchemaPlanAvod = yup.object({
  name: yup.string().required('Title is required.'),
  description: yup.string().required('Description is required.'),
  identifier: yup.string().required(),
  // .test((val) => val == val?.toLowerCase()),

  planDetails: yup.array().of(
    yup.object().shape({
      countryCode: yup.string().required('country is required.'),
    })
  ),
})

// .test((val) => val && val.toString().length === 6),
// .test((val) => val && val.toString().length > 3),
