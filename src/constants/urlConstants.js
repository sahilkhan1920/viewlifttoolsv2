export const LOGIN = `${process.env.NEXT_PUBLIC_V2_API_URL}/auth/login`
export const GENERATE_OTP = `${process.env.NEXT_PUBLIC_V1_API_URL}/generate/user/otp`
export const VERIFY_OTP = `${process.env.NEXT_PUBLIC_V2_API_URL}/auth/otp/verify`
export const FORGOT_PASSWORD = `${process.env.NEXT_PUBLIC_V1_API_URL}/admin/user/forgot-password`
export const RESET_PASSWORD = `${process.env.NEXT_PUBLIC_V1_API_URL}/admin/user/reset-password`
export const USER_INFO = `${process.env.NEXT_PUBLIC_V2_API_URL}/auth/login/info`
export const CONTENT_BASE_URL = `${process.env.NEXT_PUBLIC_V2_API_URL}/content/`
export const CONTENT_LIVE_URL = `${process.env.NEXT_PUBLIC_V2_API_URL}/live/video`
export const CMS_DETAILS = `${process.env.NEXT_PUBLIC_V2_API_URL}/auth/login/getCmsDetails`
export const USER_BASE = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v2/user_base`
export const USER_PAYMENTS = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/payment_summary_report`
export const CHANGE_IN_USER_BASE = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v2/change_in_user_base`
export const USER_BEHAVIOUR = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v2/user_behavior`
export const VIDEO_ENGAGEMENT = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/video_engagement`
export const REALTIME_CONTENT = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/realtime_content`
export const REALTIME_CONTENT_ENHANCED = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/realtime_content_enhanced`
export const DTL_VIDEO_ENGAGEMENT = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/dtl_video_engagement`
export const COHORT_ANALYSIS = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/cohort_analysis`
export const QOS = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/qos`
export const QOS_BUCKET = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/qos_bucket_metric_report`
export const QOS_VIDEO_LEVEL_REPORT = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/qos_video_level_report`
export const LTV_ENHANCED = `${process.env.NEXT_PUBLIC_REPORTING_API_URL}/appcms/v1/ltv_enhanced`
export const GET_SERVICE_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/service`
export const SAVE_SERVICE_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/settings`
export const SAVE_BRAND_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/brand`
export const GET_S3_IMAGES = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/brand/s3/assets`
export const DELETE_S3_IMAGES = `${process.env.NEXT_PUBLIC_V1_API_URL}/appcms/s3image/delete`
export const UPLOAD_FILE_URL = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/signingkey`
export const GA_DATA_URL =
  'https://at4f7pwmrf.execute-api.us-east-1.amazonaws.com/staging/get-ga-data'
export const MONETIZATIONMODELS = `${process.env.NEXT_PUBLIC_PROD_INTERNAL_API_URL}/models`
export const ADD_MODELS = `${process.env.NEXT_PUBLIC_PROD_INTERNAL_API_URL}/models`
export const INVOKE_V2_API = `${process.env.NEXT_PUBLIC_V1_API_URL}/invokeApi`
export const CONTENT_LIST = `${process.env.NEXT_PUBLIC_V1_API_URL}/msndev/content/list?mediaType=true&max=5&start=0&limit=20`
export const LANGUAGE_LIST = `${process.env.NEXT_PUBLIC_V1_API_URL}/msndev/content/language?start=0&offset=0&max=20`
export const CATEGORY_LIST = `${process.env.NEXT_PUBLIC_V1_API_URL}/msndev/content/metadata?type=category&start=0&limit=20`

export const RESTORE_VERSION = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/settings/restore`
export const GET_VERSION_HISTORY = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/settings/versions`

export const GET_SERVICE_PAGE_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/service`
export const SAVE_SERVICE_PAGE_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/service`
export const SAVE_DEVICES_PAGE_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/msndev/appcms/build/settings`
export const GET_DEVICES_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/service`
export const SAVE_ADD_DEVICES_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/appcms/device`
export const SAVE_DEVICES_PAGE_APPLETV_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/msndev/appcms/build/appleTv/settings`
export const SAVE_DEVICES_PAGE_ANDROID_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/msndev/appcms/build/android/settings`
export const SAVE_DEVICES_PAGE_IOS_DATA = `${process.env.NEXT_PUBLIC_V2_API_URL}/msndev/appcms/build/ios/settings`
