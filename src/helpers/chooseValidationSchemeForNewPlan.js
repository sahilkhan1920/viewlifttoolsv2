import {
  addNewaddNewPlanValidationSchemaPlanSvod,
  addNewaddNewPlanValidationSchemaPlanFree,
  addNewaddNewPlanValidationSchemaPlanTvod,
  addNewaddNewPlanValidationSchemaPlanTve,
  addNewaddNewPlanValidationSchemaPlanAvod,
} from '../validationSchemas/addNewPlanValidationSchema'

export const chooseValidationSchemeForNewPlan = (type) => {
  switch (type) {
    case 'SVOD':
      return addNewaddNewPlanValidationSchemaPlanSvod
    case 'FREE':
      return addNewaddNewPlanValidationSchemaPlanFree
    case 'TVOD':
      return addNewaddNewPlanValidationSchemaPlanTvod
    case 'TVE':
      return addNewaddNewPlanValidationSchemaPlanTve
    case 'AVOD':
      return addNewaddNewPlanValidationSchemaPlanAvod
    default:
      return
  }
}

export default chooseValidationSchemeForNewPlan
