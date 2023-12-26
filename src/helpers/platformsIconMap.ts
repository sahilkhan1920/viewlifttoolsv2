import DevicesIcon from '@mui/icons-material/Devices'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import WebsiteIcon from '@mui/icons-material/Language'
import TvIcon from '@mui/icons-material/Tv'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface PlatformMap {
  [key: string]: OverridableComponent<SvgIconTypeMap<object, 'svg'>>
}

const PlatformIconsMap: PlatformMap = {
  All: DevicesIcon,
  Android: PhoneAndroidIcon,
  WEBSITE: WebsiteIcon,
  samsungTv: TvIcon,
  SAMSUNG_TV: TvIcon,
  iOS: PhoneIphoneIcon,
  AndroidTV: TvIcon,
  'Android-MiTV': TvIcon,
  FireTV: TvIcon,
}

export default PlatformIconsMap
