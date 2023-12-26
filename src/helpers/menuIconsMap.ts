import AppsIcon from '@mui/icons-material/Apps'
import BarChartIcon from '@mui/icons-material/BarChart'
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import MovieIcon from '@mui/icons-material/Movie'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PortraitIcon from '@mui/icons-material/Portrait'
import SettingsIcon from '@mui/icons-material/Settings'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import SecurityIcon from '@mui/icons-material/Security'
import FlagIcon from '@mui/icons-material/Flag'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import DevicesIcon from '@mui/icons-material/Devices'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'

interface Type {
  [key: string]: OverridableComponent<SvgIconTypeMap<object, 'svg'>>
}

const IconsMap: Type = {
  'Dashboard 360': AppsIcon,
  DASHBOARD: AppsIcon,
  'REAL-TIME': BarChartIcon,
  AUDIENCE: GroupIcon,
  BEHAVIOUR: PersonIcon,
  CONTENT: MovieIcon,
  Content: MovieIcon,
  Monetization: AttachMoneyIcon,
  MONETIZATION: AttachMoneyIcon,
  'QUALITY OF SERVICE': PortraitIcon,
  CONVERSIONS: PortraitIcon,
  AppCMS: SettingsIcon,
  LIBRARY: VideoLibraryIcon,
  'CREATE NEW': VideoCallIcon,
  'VIDEO LICENSE': SecurityIcon,
  'COUNTRY GROUP': FlagIcon,
  TEMPLATE: FormatAlignCenterIcon,
  BRAND: AppsIcon,
  SETTINGS: SettingsIcon,
  DEVICES: DevicesIcon,
  SERVICE: PortraitIcon,
  Users: GroupIcon,
}

export default IconsMap
