/* eslint-disable @typescript-eslint/no-unused-vars */
import { CATEGORY_LIST, UPLOAD_FILE_URL } from 'src/constants/urlConstants'
import countries from 'src/json/countries.json'
import devices from 'src/json/devices.json'

const settings = [
  {
    title: 'FEATURES',
    key: 'features',
    items: [
      {
        key: 'casting',
        fields: [
          {
            id: 'features.casting',
            type: 'switch',
            title: 'Casting',
          },
        ],
        description: 'When you enable casting, this allows video streaming to devices via Chromecast or AirPlay.',
      },
      {
        key: 'mobile_app_downloads',
        fields: [
          {
            id: 'features.mobile_app_downloads',
            type: 'switch',
            title: 'Enable video downloads for offline viewing',
          },
        ],
        description:
          "Clicking on Enabling Video Downloads, you allow downloading of videos on user's devices for later consumption, even when there’s no usable network connection.",
      },
      {
        key: 'user_content_rating',
        fields: [
          {
            id: 'features.user_content_rating',
            title: 'User Content Rating',
            type: 'switch',
          },
        ],
        description:
          'When you enable User Content Rating, it allows users to classify or rank the content based on a comparative assessment of its quality, standard or performance. Users can rank the content by clicking the star icons displayed.',
      },
      {
        key: 'trick_play',
        fields: [
          {
            id: 'features.trick_play',
            title: 'Trick Play',
            type: 'switch',
          },
        ],
        description:
          'When you enable Trick Play, the application plays the video directly, if a user taps on video thumbnail in any of video grids/trays. With this functionality, no video detail page opens.',
      },
      {
        key: 'enable_mini_player',
        fields: [
          {
            id: 'features.enable_mini_player',
            title: 'Enable Mini Player',
            type: 'switch',
          },
        ],
        switch: true,
        description:
          'When you enable Mini Player, this allows the video player in a hero module to minimize, continue playing and be displayed at the bottom right of the screen following you as you scroll down. Scrolling back to the top will make the mini player disappear and playback continues on the hero. This functionality ONLY applies to LIVE content.',
      },
      {
        key: 'hls',
        fields: [
          {
            id: 'features.hls',
            title: 'Live Streaming',
            type: 'switch',
          },
        ],
        description: 'When you enable Live Streaming, this allows hosting of live events that have an HLS endpoint in the CMS.',
      },
      {
        key: 'login_module',
        fields: [
          {
            id: 'features.login_module',
            title: 'Splash Module Mobile',
            type: 'switch',
          },
        ],
        description: '',
      },
      {
        key: 'showDetailToggle',
        fields: [
          {
            id: 'features.showDetailToggle',
            title: 'Open Episode in Show Detail Page',
            type: 'switch',
          },
        ],
        description: '',
      },
      {
        key: 'enable_contact_us_email',
        fields: [
          {
            id: 'features.enable_contact_us_email',
            title: 'Contact us Email',
            type: 'switch',
          },
        ],
        description:
          'When you enable Contact Us Email, this adds the functionality to launch an email client and prefill a message to an email address associated with the service.',
      },
      {
        key: 'login_module_enabled',
        fields: [
          {
            id: 'features.login_module_enabled',
            title: 'Login Module',
            type: 'switch',
          },
        ],
        description:
          'When you enable Login Module, this will generate a login functionality and button in the hero navigation. This is related to Hardwall settings where content is only accessed after registration. Navigation can be surfaced according to user state.',
      },
      {
        key: 'signup_module_enabled',
        fields: [
          {
            id: 'features.signup_module_enabled',
            title: 'Signup Module',
            type: 'switch',
          },
        ],
        description:
          'When you enable Signup, this will generate a subscription flow functionality and button in the hero navigation. This is related to Hardwall settings where content is only accessed after subscription. Navigation can be surfaced according to user state.',
      },
      {
        key: 'tve_login_enabled',
        fields: [
          {
            id: 'features.tve_login_enabled',
            title: 'Show TVE Login',
            type: 'switch',
          },
        ],
        description: '',
      },
      {
        key: 'hideWatchlist',
        fields: [
          {
            id: 'features.hideWatchlist',
            title: 'Remove Watchlist Feature',
            type: 'switch',
          },
        ],
        description: 'When you enable this toggle, this will remove the Watchlist feature from the apps.',
      },
      {
        key: 'enableStreamConcurrency',
        fields: [
          {
            id: 'features.enableStreamConcurrency',
            title: 'Enable Stream Concurrency',
            type: 'switch',
          },
        ],
        description: 'Enable Stream Concurrency for users.',
      },
      {
        key: 'web_subscription_only',
        fields: [
          {
            id: 'features.web_subscription_only',
            title: 'Web Subscription Only',
            type: 'switch',
          },
        ],
        description:
          'When you enable Web Subscription Only, this will limit subscription flow functionality strictly to Web. This stops Apps/OTT from allowing subscription, driving traffic to Web. This is related to Hardwall settings where content is only accessed after registration or subscription. Navigation can be surfaced according to user state.',
      },
      {
        key: 'enablePWA',
        fields: [
          {
            id: 'features.enablePWA',
            title: 'Enable PWA',
            type: 'switch',
          },
        ],
        description: 'Enable Progressive Web App (PWA) and respective features',
      },
      {
        key: 'enableSubscribeNow',
        fields: [
          {
            id: 'features.enableSubscribeNow',
            title: 'Show Subscribe Now (in Mobile Webview Masthead)',
            type: 'switch',
          },
        ],
        description: 'Enable subscribe now on the header beside the logo.',
      },
      {
        key: 'tabsLimit',
        fields: [
          {
            id: 'features.tabsLimit',
            title: 'Number of tabs in bottom navigation (For Web PWA only)',
            type: 'number',
            props: {
              inputProps: {
                min: 3,
                max: 5,
              },
            },
          },
        ],
        description: '',
      },
      {
        key: 'enableOldPlayerUI',
        fields: [
          {
            id: 'features.enableOldPlayerUI',
            title: 'Switch to Old Video Player UI',
            type: 'switch',
          },
        ],
        description: 'Enable this toggle to switch to legacy Video Player UI.',
      },
      {
        key: 'enable_article_hardwall',
        fields: [
          {
            id: 'features.enable_article_hardwall',
            title: 'Article Hardwall',
            type: 'switch',
          },
        ],
        description: 'Enable article hardwall for unsubscribed users.',
      },
      {
        key: 'add_site_level_mini_player',
        fields: [
          {
            id: 'features.add_site_level_mini_player',
            title: 'Add Site Level Mini Player (Web only)',
            type: 'switch',
          },
        ],
        description: 'Add a mini live player on all pages which will play the same live stream as the standalone video player on home page.',
      },
      {
        key: 'disableAutoPlay',
        fields: [
          {
            id: 'features.disableAutoPlay',
            title: 'Disable Content Auto Play',
            type: 'switch',
          },
        ],
        description: 'When you switch the Disable Auto Play, this prevents a video or audio file to play automatically.',
      },
      {
        key: 'enableSSAI',
        fields: [
          {
            id: 'features.enableSSAI',
            title: 'Enable SSAI Support',
            type: 'switch',
          },
        ],
      },
      {
        key: 'parental_control',
        fields: [
          {
            id: 'features.parental_control',
            title: 'Parental Control',
            type: 'switch',
          },
        ],
        description:
          'Enable Parental Control settings on platforms, which limit access to age inappropriate content or forbidding certain types of usage.',
      },
      {
        key: 'portrait_viewing',
        fields: [
          {
            id: 'features.portrait_viewing',
            title: 'Portrait Viewing',
            type: 'switch',
          },
        ],
        description:
          'When you enable Portrait Viewing, this allows a video to play in Portrait mode before turning your device and the player expanding to full screen / landscape mode.',
      },
      {
        key: 'extendSubscriptionBanner',
        fields: [
          {
            id: 'features.extendSubscriptionBanner',
            title: 'Extend Subscription Banner',
            type: 'switch',
          },
        ],
        description:
          'When you enable Extend Subscription Banner, users whose subscription status is Suspended or Cancelled will see a banner below Header which will inform them that their subscription has ended.',
      },
      {
        key: 'navigation',
        fields: [
          {
            id: 'features.navigation',
            title: 'Navigation',
            type: 'select',
            options: [
              {
                value: 'top',
                label: 'Top',
              },
              {
                value: 'left',
                label: 'Left',
              },
            ],
          },
        ],
        description: 'This module enables the selection to have a Top or Side Navigation menu.',
      },
      {
        key: 'sticky_navigation',
        fields: [
          {
            id: 'features.sticky_navigation',
            title: 'Stick Navigation',
            type: 'switch',
          },
        ],
        description: 'This feature enables the navigation to be sticky (Only for TVE Apps).',
      },
      {
        key: 'math_problem',
        fields: [
          {
            id: 'features.math_problem',
            title: 'Math Problem',
            type: 'switch',
          },
        ],
        description: '',
      },
      {
        key: 'weather_widget',
        fields: [
          {
            id: 'features.weather_widget',
            title: 'Weather Widget',
            type: 'switch',
          },
        ],
        description: 'When you enable Weather Widget, this adds a weather widget to the masthead navigation.',
      },
      {
        key: 'showDetailOnlyOnApps',
        fields: [
          {
            id: 'features.showDetailOnlyOnApps',
            title: 'Show Detail Only On App',
            type: 'switch',
          },
        ],
        description: '',
      },
      {
        key: 'app_download_suggestion',
        fields: [
          {
            id: 'features.app_download_suggestion',
            title: 'App Download Suggestion Popup on mWeb',
            type: 'switch',
          },
        ],
        description:
          'When you enable App Download Suggestion Pop Up on mWeb, this triggers the mobile app download callout box when accessing the site on mobile web. Ths pop up contains a direct link to download the app from Google Play or iTunes App Store.',
      },
      {
        key: 'legal_verbiage',
        fields: [
          {
            id: 'features.legal_verbiage',
            title: 'Show Legal Verbiage on Sign Up',
            type: 'switch',
          },
        ],
        description: 'Will enable the display and input fields for legal verbiage in the Subscription flow screens.',
      },
      {
        key: 'legal_verbiage_copy',
        fields: [
          {
            id: 'features.legal_verbiage_title',
            title: 'Legal Verbiage Copy',
          },
          {
            id: 'features.legal_verbiage_copy',
            type: 'textarea',
          },
        ],
        description: 'Legal text to be displayed on subscription terms. Can be made mandatory in order to continue.',
      },
      {
        key: 'legal_verbiage_error',
        fields: [
          {
            id: 'features.legal_verbiage_error_label',
            title: 'Legal Verbiage Error',
          },
          {
            id: 'features.legal_verbiage_error',
            type: 'textarea',
          },
        ],
        description: 'Error text to be displayed if legal verbiage is made mandatory and the user has not accepted the terms.',
      },
      {
        key: 'free_preview',
        fields: [
          {
            id: 'features.free_preview.isFreePreview',
            title: 'Free Preview',
            type: 'switch',
          },
          {
            id: 'features.free_preview.allow_recurring_plays',
            title: 'Allow Recurring Plays?',
            type: 'switch',
          },
          {
            id: 'features.free_preview.per_video',
            title: 'Per Video?',
            type: 'switch',
          },
          {
            id: 'features.free_preview.length',
            title: 'Length',
            type: 'combo',
            items: [
              {
                id: 'features.free_preview.length.multiplier',
                type: 'number',
              },
              {
                id: 'features.free_preview.length.unit',
                type: 'select',
                options: [
                  {
                    value: 'Minutes',
                    label: 'Minutes',
                  },
                  {
                    value: 'Percent',
                    label: 'Percent',
                  },
                  {
                    value: 'Videos',
                    label: 'Videos',
                  },
                ],
              },
            ],
          },
        ],
        description:
          'When you enable Free Preview, this allows users to view video content at no cost for a specific duration of time. You can adjust the duration or length of the preview by the number of minutes, percentage of the content, or the number of videos.',
      },
      {
        key: 'audio_preview',
        fields: [
          {
            id: 'features.audio_preview.isAudioPreview',
            title: 'Audio Preview',
            type: 'switch',
          },
          {
            id: 'features.audio_preview.length',
            title: 'Length',
            type: 'combo',
            items: [
              {
                id: 'features.audio_preview.length.multiplier',
                type: 'number',
              },
              {
                id: 'features.audio_preview.length.unit',
                type: 'select',
                options: [
                  {
                    value: 'Seconds',
                    label: 'Seconds',
                  },
                  {
                    value: 'Minutes',
                    label: 'Minutes',
                  },
                ],
              },
            ],
          },
        ],
        description:
          'When you enable Audio Preview, this allows users to listen to audio content at no cost for a specific duration of time. You can adjust the length of the audio preview by the total number of seconds or minutes.',
      },
      {
        key: 'analytics_beacon',
        fields: [
          {
            id: 'features.analytics_beacon.enable',
            title: 'Enable Analytics Beacon',
            type: 'switch',
          },
          {
            id: 'features.analytics_beacon.interval',
            title: 'Capture Interval (Seconds)',
            type: 'number',
            props: {
              inputProps: {
                min: 30,
              },
            },
          },
        ],
        description: 'Enable Analytics Beacon and set an interval to capture the events.',
      },
      {
        key: 'enable_qos',
        fields: [
          {
            id: 'features.enableQOS',
            title: 'Enable QOS',
            type: 'switch',
          },
          {
            id: 'features.analytics_beacon.bufferInterval',
            title: 'Buffer Event Interval (Seconds)',
            type: 'number',
            props: {
              inputProps: {
                min: 1,
              },
            },
          },
        ],
        description: 'Enable Quality of Service Reports and Metrics.',
      },
      {
        key: 'watched_history',
        fields: [
          {
            id: 'features.watched_history.enable',
            title: 'Enable Watched History',
            type: 'switch',
          },
          {
            id: 'features.watched_history.interval',
            title: 'Capture Interval (Seconds)',
            type: 'number',
            props: {
              inputProps: {
                min: 30,
              },
            },
          },
        ],
        description: "Enable Watched history to track user's viewing history and set an interval to capture the events.",
      },
      {
        key: 'disableSkeleton',
        fields: [
          {
            id: 'features.disableSkeleton',
            title: 'Disable Skeleton Loader',
            type: 'switch',
          },
          {
            id: 'features.defaultModuleLimit',
            title: 'Number of modules to load',
            type: 'number',
            props: {
              inputProps: {
                min: 4,
              },
            },
          },
        ],
        description: 'Controls the number of minimum modules to be loaded on initial page load and on consecutive loads by scrolling.',
      },
      {
        key: 'auto_play',
        fields: [
          {
            id: 'features.auto_play',
            title: 'Auto Play Next',
            type: 'switch',
          },
          {
            id: 'features.autoplay_timer',
            title: 'Timer',
            type: 'number',
          },
          {
            id: 'features.mute_sound',
            title: 'Mute Sound',
            type: 'switch',
          },
        ],
        description:
          'When you enable Auto Play Next, it lets you to automatically play the next video in the queue or next episode once you reaches the end of the current video.',
      },
      {
        key: 'ratings',
        fields: [
          {
            id: 'features.ratings.ratings_enabled',
            title: 'Ratings',
            type: 'switch',
          },
          {
            id: 'features.ratings.appVisit',
            title: 'Number of visits',
            type: 'number',
          },
          {
            id: 'features.ratings.videoCount',
            title: 'Number of videos',
            type: 'number',
          },
        ],
        description: 'Enable Rating prompt settings on platforms.',
      },
      {
        key: 'embeddedCode',
        span: 8,
        fields: [
          {
            id: 'features.embeddedCodeLabel',
            title: 'Embedded Code',
          },
          {
            id: 'features.embeddedCode',
            type: 'textarea',
          },
        ],
        description: 'Allows for custom JavaScript code insertion to be populated at a site level.',
      },
      {
        key: 'embeddedStyles',
        span: 6,
        fields: [
          {
            id: 'features.embeddedStylesLabel',
            title: 'Embedded Styles',
          },
          {
            id: 'features.embeddedStyles',
            type: 'textarea',
          },
        ],
        description: 'Allows for custom CSS code insertion to be populated at a site level.',
      },
      {
        key: 'customReceiverId',
        span: 6,
        fields: [
          {
            id: 'features.embeddedStylesLabel',
            title: 'Custom Receiver Id',
          },
          {
            id: 'features.customReceiverId',
            type: 'number',
          },
        ],
        description:
          'Add Chromecast Custom Receiver App ID if you may need to create a Custom Receiver if your app wants to display content other than audio/video media or if the Styled Media Receiver does not support the media types your app requires.',
      },
      {
        key: 'profileRequired',
        span: 6,
        fields: [
          {
            id: 'features.profileRequired',
            title: 'User Profile Details Required?',
            type: 'switch',
          },
        ],
        description: 'Logged In user must fill in their profile details in user/settings to be able to explore the site.',
      },
      {
        key: 'whatsappConsent',
        span: 6,
        fields: [
          {
            id: 'features.whatsappConsent.enableWhatsappConsent',
            title: 'Enable Whatsapp Consent',
            type: 'switch',
          },
        ],
        description:
          'WhatsApp requires that companies have explicit consent from a customer before any communication between the two parties. WhatsApp Business further states – A user must first consent to receive messages in WhatsApp by opting into them via a third-party channel.',
      },
      {
        key: 'whatsappConsentMessage',
        span: 6,
        show: 'features.whatsappConsent.enableWhatsappConsent',
        fields: [
          {
            title: 'Whatsapp Consent Message',
          },
          {
            id: 'features.whatsappConsent.whatsappConsentMessage',
            type: 'text',
          },
        ],
      },
      {
        key: 'isWhatsappChecked',
        span: 6,
        show: 'features.whatsappConsent.enableWhatsappConsent',
        fields: [
          {
            id: 'features.whatsappConsent.isWhatsappChecked',
            title: 'Enable Checked State',
            type: 'switch',
          },
        ],
      },
      {
        key: 'orientation',
        span: 12,
        fields: [
          {
            id: 'orientation',
            type: 'divider',
            title: 'Orientation Support',
          },
        ],
      },
      {
        key: 'orientationSupport',
        span: 12,
        fields: [
          {
            title: 'Tablet',
          },
          {
            id: 'features.orientation.portrait',
            title: 'Potrait',
            type: 'switch',
          },
          {
            id: 'features.orientation.landscape',
            title: 'Landscape',
            type: 'switch',
          },
        ],
        description: '',
      },
      {
        key: 'tataPlay',
        span: 12,
        fields: [
          {
            id: 'tataPlay',
            type: 'divider',
            title: 'Tata Play Credentials',
          },
        ],
      },
      {
        key: 'tataPlayDetails',
        span: 6,
        fields: [
          {
            title: 'Tata Play Partner Key',
          },
          {
            id: 'features.tataplay.tataplayPartnerKey',
            type: 'text',
          },
        ],
        description: '',
      },
      {
        key: 'tataPlayName',
        span: 6,
        fields: [
          {
            title: 'Tata Play Partner Name',
          },
          {
            id: 'features.tataplay.tataplayPartnerName',
            type: 'text',
          },
        ],
        description: '',
      },
      {
        key: 'amazonCatalogue',
        span: 12,
        fields: [
          {
            id: 'amazonCatalogue',
            type: 'divider',
            title: 'Amazon Catalog Integration',
          },
        ],
      },
      {
        key: 'amazonCatalogBucket',
        span: 6,
        fields: [
          {
            title: 'Amazon Catalog Bucket',
          },
          {
            id: 'features.amazonCatalogBucket',
            type: 'text',
          },
        ],
        description: '',
      },
      {
        key: 'amazonCatalogBucket',
        span: 6,
        fields: [
          {
            title: 'Amazon Catalog Key',
          },
          {
            id: 'features.amazonCatalogKey',
            type: 'text',
          },
        ],
        description: '',
      },
      {
        key: 'amazonCatalogSecret',
        span: 6,
        fields: [
          {
            title: 'Amazon Catalog Secret',
          },
          {
            id: 'features.amazonCatalogSecret',
            type: 'text',
          },
        ],
        description: '',
      },
      {
        key: 'amazonCatalogRegion',
        span: 6,
        fields: [
          {
            title: 'Amazon Catalog Region',
          },
          {
            id: 'features.amazonCatalogRegion',
            type: 'text',
          },
        ],
        description: '',
      },
    ],
  },
  {
    title: 'OTP',
    key: 'otp',
    items: [
      {
        key: 'otpEnabled',
        fields: [
          {
            id: 'features.otp_value.otp_enabled',
            title: 'OTP Enabled',
            type: 'switch',
          },
        ],
        description:
          'When you enable OTP (One Time Password), this enables the ability for the user to receive a One Time Password, sent via text, to validate the account during the registry, subscription or login process.',
      },
      {
        key: 'manageProfile',
        show: 'features.otp_value.otp_enabled',
        fields: [
          {
            id: 'features.otp_value.manageProfile',
            title: 'Show Edit Profile',
            type: 'switch',
          },
        ],
        description: 'Enable this toggle to show Edit profile option in User Settings, in case OTP is enabled.',
      },
      {
        key: 'hideCloseButtonOnAddPhoneNumber',
        show: 'features.otp_value.otp_enabled',
        fields: [
          {
            id: 'features.otp_value.hideCloseButtonOnAddPhoneNumber',
            title: 'Hide Close button on Add Phone Number Screen',
            type: 'switch',
          },
        ],
        description: 'Enable this toggle to hide close button on Add Phone Number Screen, in case OTP is enabled.',
      },
      {
        key: 'primary_provider',
        show: 'features.otp_value.otp_enabled',
        span: 6,
        fields: [
          {
            id: 'features.otp_value.primary_provider',
            title: 'Primary Provider',
            type: 'select',
            options: [
              {
                value: 'msg91',
                label: 'MSG91',
              },
              {
                value: 'ssl',
                label: 'SSL',
              },
              {
                value: 'kaleyra',
                label: 'KALEYRA',
              },
            ],
          },
        ],
        description: 'Add a primary OTP sender provider.',
      },
      {
        key: 'secondary_provider',
        show: 'features.otp_value.otp_enabled',
        span: 6,
        fields: [
          {
            id: 'features.otp_value.secondary_provider',
            title: 'Secondary Provider',
            type: 'select',
            options: [
              {
                value: 'msg91',
                label: 'MSG91',
              },
              {
                value: 'ssl',
                label: 'SSL',
              },
              {
                value: 'kaleyra',
                label: 'KALEYRA',
              },
            ],
          },
        ],
        description: 'Add a secondary OTP sender provider.',
      },
      {
        key: 'MSG91Inputs',
        span: 6,
        show: 'features.otp_value.otp_enabled',
        fields: [
          {
            id: 'features.otp_value.msg91Inputs',
            title: 'MSG91 inputs',
          },
          {
            id: 'features.otp_value.flowId',
            label: 'FLOW ID',
            type: 'text',
          },
          {
            id: 'features.otp_value.msgApiKey',
            label: 'MSG91 API Key',
            type: 'text',
          },
        ],
        description:
          'MSG91 is a cloud communication platform that helps businesses communicate with their customers through SMS or OTP. Configure this if you want to use it as your OTP provider.',
      },
      {
        key: 'SSLInputs',
        span: 6,
        show: 'features.otp_value.otp_enabled',
        fields: [
          {
            id: 'features.otp_value.SSLInputs',
            title: 'SSL inputs',
          },
          {
            id: 'features.otp_value.sslAccountSid',
            label: 'Enter SSL Account Sid',
            type: 'text',
          },
          {
            id: 'features.otp_value.sslAccountUserName',
            label: 'Enter SSL Account Username',
            type: 'text',
          },
          {
            id: 'features.otp_value.sslAccountPassword',
            label: 'Enter SSL Account Password',
            type: 'text',
          },
          {
            id: 'features.otp_value.sslAPIToken',
            label: 'Enter SSL API Token',
            type: 'text',
          },
        ],
        description:
          'MSG91 is a cloud communication platform that helps businesses communicate with their customers through SMS or OTP. Configure this if you want to use it as your OTP provider.',
      },
      {
        key: 'KALEYRAInputs',
        show: 'features.otp_value.otp_enabled',
        span: 6,
        fields: [
          {
            id: 'KALEYRAInputs',
            title: 'KALEYRA inputs',
          },
          {
            id: 'features.otp_value.kaleyraAccountSid',
            label: 'KALEYRA Account Sid',
            type: 'text',
          },
          {
            id: 'features.otp_value.kaleyraAccountSenderId',
            label: 'KALEYRA Account Sender ID',
            type: 'text',
          },
          {
            id: 'features.otp_value.kaleyraAccountApiKey',
            label: 'KALEYRA API Key',
            type: 'text',
          },
        ],
        description:
          'MSG91 is a cloud communication platform that helps businesses communicate with their customers through SMS or OTP. Configure this if you want to use it as your OTP provider.',
      },
      {
        key: 'KALEYRAVoiceInputs',
        span: 6,
        show: 'features.otp_value.otp_enabled',
        fields: [
          {
            id: 'KALEYRAVoiceInputs',
            title: 'KALEYRA Voice inputs',
          },
          {
            id: 'features.otp_value.kaleyraVoiceSmsApiKey',
            label: 'KALEYRA Voice SMS Sid',
            type: 'text',
          },
          {
            id: 'features.otp_value.kaleyraVoiceSmsMethod',
            label: 'KALEYRA Voice SMS Method',
            type: 'text',
          },
          {
            id: 'features.otp_value.kaleyraVoiceSmsReceiver',
            label: 'KALEYRA Voice SMS Receiver',
            type: 'text',
          },
        ],
        description:
          'MSG91 is a cloud communication platform that helps businesses communicate with their customers through SMS or OTP. Configure this if you want to use it as your OTP provider.',
      },
      {
        key: 'commonInputs',
        span: 12,
        show: 'features.otp_value.otp_enabled',
        fields: [
          {
            id: 'commonInputs',
            title: 'Common inputs',
          },
          {
            id: 'features.otp_value.email_required',

            title: 'Email Required',
            type: 'switch',
          },
          {
            id: 'features.otp_value.otpMsg',
            span: 3,
            label: 'OTP Message',
            type: 'text',
          },
          {
            id: 'features.otp_value.dltTemplateId',
            label: 'DLT Template ID',
            type: 'text',
          },
          {
            id: 'features.otp_value.dltEntityId',
            label: 'DLT Entity ID',
            type: 'text',
          },
          {
            id: 'features.otp_value.msgSenderKey',
            label: 'Sender Key',
            type: 'text',
          },
          {
            id: 'features.otp_value.msgRouteValue',
            label: 'Enter Route Value',
            type: 'text',
          },
        ],
        description:
          'MSG91 is a cloud communication platform that helps businesses communicate with their customers through SMS or OTP. Configure this if you want to use it as your OTP provider.',
      },
      {
        key: 'otpAllowedPerDayPerUser',
        span: 6,
        show: 'features.otp_value.otp_enabled',
        fields: [
          {
            id: 'features.otp_value.otpAllowedPerDayPerUser',
            title: 'OTP allowed (per user per day)',
            type: 'number',
          },
        ],
        description: '',
      },
      {
        key: 'otpAllowedPerDayPerIp',
        span: 6,
        show: 'features.otp_value.otp_enabled',
        fields: [
          {
            id: 'features.otp_value.otpAllowedPerDayPerIp',
            title: 'OTP allowed (per IP per day)',
            type: 'number',
          },
        ],
        description: '',
      },
      {
        key: 'otpExcludedCountries',
        show: 'features.otp_value.excludedCountry',
        span: 12,
        fields: [
          {
            id: 'features.otp_value.excludedCountry',
            title: 'Excluded Countries',
            type: 'multiSelect',
            options: countries,
          },
        ],
        description: '',
      },
      {
        key: 'countrySpecificProviders',
        show: 'features.otp_value.otp_enabled',
        span: 12,
        fields: [
          {
            id: 'countrySpecificProviders',
            title: 'Country Specific Providers',
          },
          {
            id: 'features.otp_value.countrySpecificProviders',
            type: 'array',
            addButtonText: 'Add Country Specific Provider',
            defaultItem: {
              countryCode: '',
              primary_provider: 'msg91',
              secondary_provider: 'msg91',
            },
            items: [
              {
                id: 'countryCode',
                label: 'Country Code',
                type: 'text',
              },
              {
                id: 'primary_provider',
                label: 'Primary Provider',
                type: 'select',
                options: [
                  {
                    value: 'msg91',
                    label: 'MSG91',
                  },
                  {
                    value: 'ssl',
                    label: 'SSL',
                  },
                  {
                    value: 'kaleyra',
                    label: 'KALEYRA',
                  },
                ],
              },
              {
                id: 'secondary_provider',
                label: 'Secondary Provider',
                type: 'select',
                options: [
                  {
                    value: 'msg91',
                    label: 'MSG91',
                  },
                  {
                    value: 'ssl',
                    label: 'SSL',
                  },
                  {
                    value: 'kaleyra',
                    label: 'KALEYRA',
                  },
                ],
              },
            ],
          },
        ],
        description: '',
      },
    ],
  },
  {
    title: 'App Store',
    key: 'appStore',
    items: [
      {
        key: 'itunes_connect_username',
        span: 6,
        fields: [
          {
            id: 'appStore.itunes_connect_username',
            type: 'password',
            title: 'iTunes Connect User Name',
          },
        ],
        description: 'Be sure to double-check for spelling in both username and password fields for validation.',
      },
      {
        key: 'itunes_connect_password',
        span: 6,
        fields: [
          {
            id: 'appStore.itunes_connect_password',
            type: 'password',
            title: 'iTunes Connect Password',
          },
        ],
        description: 'Be sure to double-check for spelling in both username and password fields for validation.',
      },
      {
        key: 'google_dev_account_username',
        span: 6,
        fields: [
          {
            id: 'appStore.google_dev_account_username',
            type: 'password',
            title: 'Google Dev account Username',
          },
        ],
        description: 'Be sure to double-check for spelling in both username and password fields for validation.',
      },
      {
        key: 'google_dev_account_password',
        span: 6,
        fields: [
          {
            id: 'appStore.google_dev_account_password',
            type: 'password',
            title: 'Google Dev account Password',
          },
        ],
        description: 'Be sure to double-check for spelling in both username and password fields for validation.',
      },
      {
        key: 'microsoft_dev_account_username',
        span: 6,
        fields: [
          {
            id: 'appStore.microsoft_dev_account_username',
            type: 'password',
            title: 'Microsoft Dev account Username',
          },
        ],
        description: 'Be sure to double-check for spelling in both username and password fields for validation.',
      },
      {
        key: 'microsoft_dev_account_password',
        span: 6,
        fields: [
          {
            id: 'appStore.microsoft_dev_account_password',
            type: 'password',
            title: 'Microsoft Dev account Password',
          },
        ],
        description: 'Be sure to double-check for spelling in both username and password fields for validation.',
      },
      {
        key: 'app_name',
        span: 6,
        fields: [
          {
            id: 'appStore.app_name',
            type: 'text',
            title: 'App Name',
          },
        ],
        description: 'Your App Name is the label used to identify your application.',
      },
      {
        key: 'short_app_name',
        span: 6,
        fields: [
          {
            id: 'appStore.short_app_name',
            type: 'text',
            title: 'Short App Name',
          },
        ],
        description:
          'Your Short App Name is an abbreviated version of the app name for a full label display. Up to 12 characters, including spaces, is considered the best practice across app stores.',
      },
      {
        key: 'bundle',
        span: 12,
        fields: [
          {
            id: 'bundle',
            type: 'divider',
            title: 'Bundle',
          },
        ],
      },
      {
        key: 'app_bundle_id_ios',
        span: 4,
        fields: [
          {
            title: 'App BundleID for iOS',
          },
          {
            id: 'appStore.app_bundle_id_ios',
            type: 'text',
          },
        ],
      },
      {
        key: 'dev_ios_file',
        span: 4,
        fields: [
          {
            title: 'Development Certificate',
          },
          {
            id: 'appStore.dev_ios_file',
            type: 'file',
            accept: '.p12',
            fileUploadUrl: UPLOAD_FILE_URL,
          },
        ],
      },
      {
        key: 'prod_ios_file',
        span: 4,
        fields: [
          { title: 'Production Certificate' },
          {
            id: 'appStore.prod_ios_file',
            type: 'file',
            accept: '.p12',
          },
        ],
      },
      {
        key: 'app_bundle_id_android',
        span: 4,
        fields: [
          {
            title: 'App BundleID for Android',
          },
          {
            id: 'appStore.app_bundle_id_android',
            type: 'text',
          },
        ],
      },
      {
        key: 'dev_android_file',
        span: 4,
        fields: [
          { title: 'Development Certificate' },
          {
            id: 'appStore.dev_android_file',
            type: 'file',
            accept: '.jks. .keystore',
          },
        ],
      },
      {
        key: 'prod_android_file',
        span: 4,
        fields: [
          { title: 'Production Certificate' },
          {
            id: 'appStore.prod_android_file',
            type: 'file',
            accept: '.jks. .keystore',
          },
        ],
      },
      {
        key: 'bundle-other',
        span: 12,
        fields: [
          {
            id: 'bundle-other',
            type: 'divider',
          },
        ],
      },
      {
        key: 'minimum_app_version',
        span: 4,
        fields: [
          {
            id: 'minimum_app_version',
            title: 'Minimum App Version',
          },
          {
            id: 'appStore.minimum_app_version.ios',
            type: 'text',
            label: 'Minimum App Version for iOS',
          },
          {
            id: 'appStore.minimum_app_version.android',
            type: 'text',
            label: 'Minimum App Version for Android',
          },
          {
            id: 'appStore.minimum_app_version.androidtv',
            type: 'text',
            label: 'Minimum App Version for Android TV',
          },
          {
            id: 'appStore.minimum_app_version.roku',
            type: 'text',
            label: 'Minimum App Version for Roku',
          },
          {
            id: 'appStore.minimum_app_version.appletv',
            type: 'text',
            label: 'Minimum App Version for Apple TV',
          },
          {
            id: 'appStore.minimum_app_version.firetv',
            type: 'text',
            label: 'Minimum App Version for Fire TV',
          },
          {
            id: 'appStore.minimum_app_version.xbox',
            type: 'text',
            label: 'Minimum App Version for Xbox One',
          },
          {
            id: 'appStore.minimum_app_version.lgtv',
            type: 'text',
            label: 'Minimum App Version for LG TV',
          },
          {
            id: 'appStore.minimum_app_version.vizioTv',
            type: 'text',
            label: 'Minimum App Version for Vizio TV',
          },
          {
            id: 'appStore.minimum_app_version.samsungtv',
            type: 'text',
            label: 'Minimum App Version for Samsung TV',
          },
          {
            id: 'appStore.minimum_app_version.windows10_desktop',
            type: 'text',
            label: 'Minimum App Version for Win10 Desktop',
          },
          {
            id: 'appStore.minimum_app_version.tivo',
            type: 'text',
            label: 'Minimum App Version for Tivo',
          },
          {
            id: 'appStore.minimum_app_version.metrological',
            type: 'text',
            label: 'Minimum App Version for Metrological',
          },
          {
            id: 'appStore.minimum_app_version.jiostb',
            type: 'text',
            label: 'Minimum App Version for Jio TV',
          },
        ],
      },
      {
        key: 'latest_app_version',
        span: 4,
        fields: [
          {
            id: 'latest_app_version',
            title: 'Latest App Version',
          },
          {
            id: 'appStore.latest_app_version.ios',
            type: 'text',
            label: 'Latest App Version for iOS',
          },
          {
            id: 'appStore.latest_app_version.android',
            type: 'text',
            label: 'Latest App Version for Android',
          },
          {
            id: 'appStore.latest_app_version.androidtv',
            type: 'text',
            label: 'Latest App Version for Android TV',
          },
          {
            id: 'appStore.latest_app_version.roku',
            type: 'text',
            label: 'Latest App Version for Roku',
          },
          {
            id: 'appStore.latest_app_version.appletv',
            type: 'text',
            label: 'Latest App Version for Apple TV',
          },
          {
            id: 'appStore.latest_app_version.firetv',
            type: 'text',
            label: 'Latest App Version for Fire TV',
          },
          {
            id: 'appStore.latest_app_version.xbox',
            type: 'text',
            label: 'Latest App Version for Xbox One',
          },
          {
            id: 'appStore.latest_app_version.lgtv',
            type: 'text',
            label: 'Latest App Version for LG TV',
          },
          {
            id: 'appStore.latest_app_version.vizioTv',
            type: 'text',
            label: 'Latest App Version for Vizio TV',
          },
          {
            id: 'appStore.latest_app_version.samsungtv',
            type: 'text',
            label: 'Latest App Version for Samsung TV',
          },
          {
            id: 'appStore.latest_app_version.windows10_desktop',
            type: 'text',
            label: 'Latest App Version for Win10 Desktop',
          },
          {
            id: 'appStore.latest_app_version.tivo',
            type: 'text',
            label: 'Latest App Version for Tivo',
          },
          {
            id: 'appStore.latest_app_version.metrological',
            type: 'text',
            label: 'Latest App Version for Metrological',
          },
          {
            id: 'appStore.latest_app_version.jiostb',
            type: 'text',
            label: 'Latest App Version for Jio TV',
          },
        ],
      },
      {
        key: 'update_url',
        span: 4,
        fields: [
          {
            id: 'update_url',
            title: 'Update App store Url',
          },
          {
            id: 'appStore.update_url.ios',
            type: 'text',
            label: 'App Store URL for iOS',
          },
          {
            id: 'appStore.update_url.android',
            type: 'text',
            label: 'App Store URL for Android',
          },
          {
            id: 'appStore.update_url.androidtv',
            type: 'text',
            label: 'App Store URL for Android TV',
          },
          {
            id: 'appStore.update_url.roku',
            type: 'text',
            label: 'App Store URL for Roku',
          },
          {
            id: 'appStore.update_url.appletv',
            type: 'text',
            label: 'App Store URL for Apple TV',
          },
          {
            id: 'appStore.update_url.firetv',
            type: 'text',
            label: 'App Store URL for Fire TV',
          },
          {
            id: 'appStore.update_url.xbox',
            type: 'text',
            label: 'App Store URL for Xbox One',
          },
          {
            id: 'appStore.update_url.lgtv',
            type: 'text',
            label: 'App Store URL for LG TV',
          },
          {
            id: 'appStore.update_url.vizioTv',
            type: 'text',
            label: 'App Store URL for Vizio TV',
          },
          {
            id: 'appStore.update_url.samsungtv',
            type: 'text',
            label: 'App Store URL for Samsung TV',
          },
          {
            id: 'appStore.update_url.windows10_desktop',
            type: 'text',
            label: 'App Store URL for Win10 Desktop',
          },
          {
            id: 'appStore.update_url.tivo',
            type: 'text',
            label: 'App Store URL for Tivo',
          },
          {
            id: 'appStore.update_url.metrological',
            type: 'text',
            label: 'App Store URL for Metrological',
          },
          {
            id: 'appStore.update_url.jiostb',
            type: 'text',
            label: 'App Store URL for Jio TV',
          },
        ],
      },
    ],
  },
  {
    title: 'CSAI Tracking',
    key: 'csaiTracking',
    items: [
      {
        key: 'enableCSAITracking',
        fields: [
          {
            id: 'csaiTracking.enableCSAITracking',
            title: 'Enable CSAI',
            type: 'switch',
          },
        ],
      },
      {
        key: 'enablePalSDK',
        fields: [
          {
            id: 'csaiTracking.enablePalSDK',
            title: 'Enable Pal SDK',
            type: 'switch',
          },
        ],
      },
      {
        key: 'enableOmSdk',
        fields: [
          {
            id: 'csaiTracking.enableOmSdk',
            title: 'Enable OM SDK',
            type: 'switch',
          },
        ],
      },
      {
        key: 'enableWTA',
        fields: [
          {
            id: 'csaiTracking.enableWTA',
            title: 'Enable WTA',
            type: 'switch',
          },
        ],
      },
      {
        key: 'omidPartnerName',
        fields: [
          {
            id: 'csaiTracking.omidPartnerName',
            title: 'Omid Partner Name',
            type: 'text',
          },
        ],
      },
      {
        key: 'omidPartnerVersion',
        fields: [
          {
            id: 'csaiTracking.omidPartnerVersion',
            title: 'Omid Partner Version',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    title: 'Payment Configs',
    key: 'subscriptions',
    items: [
      {
        key: 'enablePlatformPayments',
        span: 12,
        fields: [
          {
            title: 'Select platform(s) to enable payments',
          },
          {
            id: 'subscriptions.enablePlatformPayments',
            type: 'multiSelect',
            options: [
              { value: 'android', label: 'Android App' },
              { value: 'lgTv', label: 'LG TV' },
              { value: 'samsungTv', label: 'Samsung TV' },
              { value: 'metrological', label: 'Metrological' },
              { value: 'jiostb', label: 'Jio TV' },
              { value: 'fireTv', label: 'Fire TV' },
              { value: 'web', label: 'Website' },
              { value: 'roku', label: 'Roku' },
              { value: 'ios', label: 'iOS App' },
              { value: 'appleTv', label: 'Apple TV' },
              { value: 'windows10Desktop', label: 'Windows10' },
              { value: 'xbox', label: 'Xbox One' },
              { value: 'tivo', label: 'Tivo' },
              { value: 'androidTv', label: 'Android TV' },
              { value: 'miTv', label: 'MiTV' },
              { value: 'corpus', label: 'Corpus' },
              { value: 'vizioTv', label: 'Vizio TV' },
            ],
          },
        ],
      },
      {
        key: 'paymentStripe',
        span: 12,
        fields: [
          {
            id: 'paymentStripe',
            type: 'divider',
            title: 'Payment Provider: Stripe',
          },
        ],
      },
      {
        key: 'publishKey',
        fields: [
          {
            id: 'subscriptions.stripe.publishKey',
            type: 'text',
            title: 'Publish Key',
          },
        ],
      },
      {
        key: 'secretKey',
        fields: [
          {
            id: 'subscriptions.stripe.secretKey',
            type: 'text',
            title: 'Secret Key',
          },
        ],
      },
      {
        key: 'apiKey',
        fields: [
          {
            id: 'subscriptions.stripe.apiKey',
            type: 'text',
            title: 'API Key',
          },
        ],
      },
      {
        key: 'country',
        fields: [
          {
            id: 'subscriptions.stripe.country',
            type: 'text',
            title: 'Country',
          },
        ],
      },
      {
        key: 'transactionalPayment',
        fields: [
          {
            id: 'subscriptions.stripe.transactionalPayment',
            type: 'switch',
            title: 'Transactional Payment',
          },
        ],
      },
      {
        key: 'allowOffers',
        fields: [
          {
            id: 'subscriptions.stripe.allowOffers',
            type: 'switch',
            title: 'Allow Offers',
          },
        ],
      },
      {
        key: 'enableiDeal',
        fields: [
          {
            id: 'subscriptions.stripe.enableiDeal',
            type: 'switch',
            title: 'Enable iDeal for Netherlands',
          },
        ],
      },
      {
        key: 'isActive',
        fields: [
          {
            id: 'subscriptions.stripe.isActive',
            type: 'switch',
            title: 'Enable Stripe',
          },
        ],
      },
      {
        key: 'avalara',
        span: 12,
        fields: [
          {
            id: 'avalara',
            type: 'divider',
            title: 'Tax Provider: Avalara',
          },
        ],
      },
      {
        key: 'accountName',
        fields: [
          {
            id: 'subscriptions.avalara.accountName',
            type: 'text',
            title: 'Account Name',
          },
        ],
      },
      {
        key: 'accountNumber',
        fields: [
          {
            id: 'subscriptions.avalara.accountNumber',
            type: 'text',
            title: 'Account Number',
          },
        ],
      },
      {
        key: 'licenseKey',
        fields: [
          {
            id: 'subscriptions.avalara.licenseKey',
            type: 'text',
            title: 'License Key',
          },
        ],
      },
      {
        key: 'webserviceUrl',
        fields: [
          {
            id: 'subscriptions.avalara.webserviceUrl',
            type: 'text',
            title: 'Web Service URL',
          },
        ],
      },
      {
        key: 'firstChargeRetry',
        span: 12,
        fields: [
          {
            id: 'firstChargeRetry',
            type: 'divider',
            title: 'Dunning / Retry Config',
          },
        ],
      },
      {
        key: 'active',
        span: 12,
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.active',
            type: 'switch',
            title: 'First Charge Retry',
          },
        ],
      },
      {
        key: 'Stripe',
        span: 12,
        fields: [
          {
            id: 'Stripe',
            type: 'divider',
            title: 'Stripe',
          },
        ],
      },
      {
        key: 'backoffMultiplier',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.STRIPE_ERROR.backoffMultiplier',
            type: 'text',
            title: 'Backoff Multiplier',
          },
        ],
      },
      {
        key: 'retryAllCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.STRIPE_ERROR.retryAllCodes',
            type: 'switch',
            title: 'Retry All Codes',
          },
        ],
      },
      {
        key: 'maxAllowedRetries',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.STRIPE_ERROR.maxAllowedRetries',
            type: 'text',
            title: 'Max Allowed Retries',
          },
        ],
      },
      {
        key: 'retryType',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.STRIPE_ERROR.retryType',
            type: 'text',
            title: 'Retry Type',
          },
        ],
      },
      {
        key: 'declineCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.STRIPE_ERROR.declineCodes',
            type: 'textarea',
            title: 'Enter Decline Codes (Comma Separated)',
          },
        ],
      },
      {
        key: 'retryInterval',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.STRIPE_ERROR.retryInterval',
            type: 'text',
            title: 'Enter Retry Interval (Comma Separated)',
          },
        ],
      },
      {
        key: 'PayGate',
        span: 12,
        fields: [
          {
            id: 'PayGate',
            type: 'divider',
            title: 'PayGate',
          },
        ],
      },
      {
        key: 'backoffMultiplier',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYGATE_ERROR.backoffMultiplier',
            type: 'text',
            title: 'Backoff Multiplier',
          },
        ],
      },
      {
        key: 'retryAllCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYGATE_ERROR.retryAllCodes',
            title: 'Retry All Codes',
            type: 'switch',
          },
        ],
      },
      {
        key: 'maxAllowedRetries',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYGATE_ERROR.maxAllowedRetries',
            type: 'text',
            title: 'Max Allowed Retries',
          },
        ],
      },
      {
        key: 'retryType',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYGATE_ERROR.retryType',
            type: 'text',
            title: 'Retry Type',
          },
        ],
      },
      {
        key: 'declineCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYGATE_ERROR.declineCodes',
            type: 'textarea',
            title: 'Enter Decline Codes (Comma Separated)',
          },
        ],
      },
      {
        key: 'retryInterval',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYGATE_ERROR.retryInterval',
            type: 'text',
            title: 'Enter Retry Interval (Comma Separated)',
          },
        ],
      },
      {
        key: 'Paypal',
        span: 12,
        fields: [
          {
            id: 'Paypal',
            type: 'divider',
            title: 'Paypal',
          },
        ],
      },
      {
        key: 'backoffMultiplier',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYPAL_ERROR.backoffMultiplier',
            type: 'text',
            title: 'Backoff Multiplier',
          },
        ],
      },
      {
        key: 'retryAllCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYPAL_ERROR.retryAllCodes',
            type: 'switch',
            title: 'Retry All Codes',
          },
        ],
      },
      {
        key: 'maxAllowedRetries',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYPAL_ERROR.maxAllowedRetries',
            type: 'text',
            title: 'Max Allowed Retries',
          },
        ],
      },
      {
        key: 'retryType',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYPAL_ERROR.retryType',
            type: 'text',
            title: 'Retry Type',
          },
        ],
      },
      {
        key: 'declineCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYPAL_ERROR.declineCodes',
            type: 'textarea',
            title: 'Enter Decline Codes (Comma Separated)',
          },
        ],
      },
      {
        key: 'retryInterval',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.PAYPAL_ERROR.retryInterval',
            type: 'text',
            title: 'Enter Retry Interval (Comma Separated)',
          },
        ],
      },
      {
        key: 'Juspay',
        span: 12,
        fields: [
          {
            id: 'Juspay',
            type: 'divider',
            title: 'Juspay',
          },
        ],
      },
      {
        key: 'backoffMultiplier',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.backoffMultiplier',
            title: 'Backoff Multiplier',
            type: 'text',
          },
        ],
      },
      {
        key: 'retryAllCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.retryAllCodes',
            type: 'switch',
            title: 'Retry All Codes',
          },
        ],
      },
      {
        key: 'maxAllowedRetries',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.maxAllowedRetries',
            type: 'text',
            title: 'Max Allowed Retries',
          },
        ],
      },
      {
        key: 'retryType',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.retryType',
            type: 'text',
            title: 'Retry Type',
          },
        ],
      },
      {
        key: 'declineCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.declineCodes',
            type: 'textarea',
            title: 'Enter Decline Codes (Comma Separated)',
          },
        ],
      },
      {
        key: 'retryInterval',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.retryInterval',
            type: 'text',
            title: 'Enter Retry Interval (Comma Separated)',
          },
        ],
      },
      {
        key: 'active',
        span: 12,
        fields: [
          {
            id: 'subscriptions.renewalRetry.active',
            type: 'switch',
            title: 'Renewal Retry',
          },
        ],
      },
      {
        key: 'Stripe',
        span: 12,
        fields: [
          {
            id: 'Stripe',
            type: 'divider',
            title: 'Stripe',
          },
        ],
      },
      {
        key: 'backoffMultiplier',
        fields: [
          {
            id: 'subscriptions.renewalRetry.STRIPE_ERROR.backoffMultiplier',
            type: 'text',
            title: 'Backoff Multiplier',
          },
        ],
      },
      {
        key: 'retryAllCodes',
        fields: [
          {
            id: 'subscriptions.renewalRetry.STRIPE_ERROR.retryAllCodes',
            type: 'switch',
            title: 'Retry All Codes',
          },
        ],
      },
      {
        key: 'maxAllowedRetries',
        fields: [
          {
            id: 'subscriptions.renewalRetry.STRIPE_ERROR.maxAllowedRetries',
            type: 'text',
            title: 'Max Allowed Retries',
          },
        ],
      },
      {
        key: 'retryType',
        fields: [
          {
            id: 'subscriptions.renewalRetry.STRIPE_ERROR.retryType',
            type: 'text',
            title: 'Retry Type',
          },
        ],
      },
      {
        key: 'declineCodes',
        fields: [
          {
            id: 'subscriptions.renewalRetry.STRIPE_ERROR.declineCodes',
            type: 'textarea',
            title: 'Enter Decline Codes (Comma Separated)',
          },
        ],
      },
      {
        key: 'retryInterval',
        fields: [
          {
            id: 'subscriptions.renewalRetry.STRIPE_ERROR.retryInterval',
            type: 'text',
            title: 'Enter Retry Interval (Comma Separated)',
          },
        ],
      },
      {
        key: 'PayGate',
        span: 12,
        fields: [
          {
            id: 'PayGate',
            type: 'divider',
            title: 'PayGate',
          },
        ],
      },
      {
        key: 'backoffMultiplier',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYGATE_ERROR.backoffMultiplier',
            type: 'text',
            title: 'Backoff Multiplier',
          },
        ],
      },
      {
        key: 'retryAllCodes',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYGATE_ERROR.retryAllCodes',
            type: 'switch',
            title: 'Retry All Codes',
          },
        ],
      },
      {
        key: 'maxAllowedRetries',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYGATE_ERROR.maxAllowedRetries',
            type: 'text',
            title: 'Max Allowed Retries',
          },
        ],
      },
      {
        key: 'retryType',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYGATE_ERROR.retryType',
            type: 'text',
            title: 'Retry Type',
          },
        ],
      },
      {
        key: 'declineCodes',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYGATE_ERROR.declineCodes',
            type: 'textarea',
            title: 'Enter Decline Codes (Comma Separated)',
          },
        ],
      },
      {
        key: 'retryInterval',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYGATE_ERROR.retryInterval',
            type: 'text',
            title: 'Enter Retry Interval (Comma Separated)',
          },
        ],
      },
      {
        key: 'Paypal',
        span: 12,
        fields: [
          {
            id: 'Paypal',
            type: 'divider',
            title: 'Paypal',
          },
        ],
      },
      {
        key: 'backoffMultiplier',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYPAL_ERROR.backoffMultiplier',
            type: 'text',
            title: 'Backoff Multiplier',
          },
        ],
      },
      {
        key: 'retryAllCodes',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYPAL_ERROR.retryAllCodes',
            type: 'switch',
            title: 'Retry All Codes',
          },
        ],
      },
      {
        key: 'maxAllowedRetries',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYPAL_ERROR.maxAllowedRetries',
            type: 'text',
            title: 'Max Allowed Retries',
          },
        ],
      },
      {
        key: 'retryType',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYPAL_ERROR.retryType',
            type: 'text',
            title: 'Retry Type',
          },
        ],
      },
      {
        key: 'declineCodes',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYPAL_ERROR.declineCodes',
            type: 'textarea',
            title: 'Enter Decline Codes (Comma Separated)',
          },
        ],
      },
      {
        key: 'retryInterval',
        fields: [
          {
            id: 'subscriptions.renewalRetry.PAYPAL_ERROR.retryInterval',
            type: 'text',
            title: 'Enter Retry Interval (Comma Separated)',
          },
        ],
      },
      {
        key: 'Juspay',
        span: 12,
        fields: [
          {
            id: 'Juspay',
            type: 'divider',
            title: 'Juspay',
          },
        ],
      },
      {
        key: 'backoffMultiplier',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.backoffMultiplier',
            type: 'text',
            title: 'Backoff Multiplier',
          },
        ],
      },
      {
        key: 'retryAllCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.retryAllCodes',
            type: 'switch',
            title: 'Retry All Codes',
          },
        ],
      },
      {
        key: 'maxAllowedRetries',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.maxAllowedRetries',
            type: 'text',
            title: 'Max Allowed Retries',
          },
        ],
      },
      {
        key: 'retryType',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.retryType',
            type: 'text',
            title: 'Retry Type',
          },
        ],
      },
      {
        key: 'declineCodes',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.declineCodes',
            type: 'textarea',
            title: 'Enter Decline Codes (Comma Separated)',
          },
        ],
      },
      {
        key: 'retryInterval',
        fields: [
          {
            id: 'subscriptions.firstChargeRetry.JUSPAY_ERROR.retryInterval',
            type: 'text',
            title: 'Enter Retry Interval (Comma Separated)',
          },
        ],
      },
      {
        key: 'MoreProviders',
        span: 12,
        fields: [
          {
            id: 'MoreProviders',
            type: 'divider',
            title: 'More Providers',
          },
        ],
      },
      {
        key: 'payPal',
        span: 6,
        fields: [
          {
            title: 'PayPal',
          },
          {
            id: 'subscriptions.payPal.payerId',
            label: 'Payer ID',
            type: 'text',
          },
          {
            id: 'subscriptions.payPal.clientSecret',
            label: 'Client Secret',
            type: 'text',
          },
          {
            id: 'subscriptions.payPal.clientId',
            label: 'Client ID',
            type: 'text',
          },
          {
            id: 'subscriptions.payPal.country',
            label: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.payPal.isActive',
            title: 'Enable Paypal',
            type: 'switch',
          },
          {
            id: 'subscriptions.payPal.transactionalPayment',
            title: 'Transactional Payment',
            type: 'switch',
          },
        ],
      },
      {
        key: 'amazon',
        span: 6,
        fields: [
          {
            title: 'Amazon Payments',
          },
          {
            id: 'subscriptions.amazon.platformId',
            label: 'Platform ID',
            type: 'text',
          },
          {
            id: 'subscriptions.amazon.clientId',
            label: 'Client ID',
            type: 'text',
          },
          {
            id: 'subscriptions.amazon.merchantId',
            label: 'Merchant ID',
            type: 'text',
          },
          {
            id: 'subscriptions.amazon.accessKey',
            label: 'Access Key',
            type: 'text',
          },
          {
            id: 'subscriptions.amazon.secretKey',
            label: 'Secret Key',
            type: 'text',
          },
          {
            id: 'subscriptions.amazon.country',
            label: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.amazon.transactionalPayment',
            title: 'Transactional Payment',
            type: 'switch',
          },
          {
            id: 'subscriptions.amazon.isActive',
            title: 'Enable Amazon Payments',
            type: 'switch',
          },
        ],
      },
      {
        key: 'ccavenue',
        span: 6,
        fields: [
          {
            title: 'CCAvenue',
          },
          {
            id: 'subscriptions.ccavenue.merchantId',
            label: 'Merchant ID',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.accessCode',
            label: 'Access Code',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.accessCodeMobile',
            label: 'Access Code Mobile',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.accessCodeWeb',
            label: 'Access Code Web',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.apiUrl',
            label: 'API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.orderStatusTimeout',
            label: 'Order Status Timeout',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.country',
            title: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.redirectUrl',
            title: 'Redirect URL',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.rsaUrl',
            title: 'RSA URL',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.siStatusTimeout',
            title: 'SI Status Timeout',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.workingKey',
            title: 'Working Key',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.transactionalPayment',
            title: 'Transactional Payment',
            type: 'text',
          },
          {
            id: 'subscriptions.ccavenue.isActive',
            title: 'Enable CCAvenue',
            type: 'switch',
          },
        ],
      },
      {
        key: 'sslcommerz',
        span: 6,
        fields: [
          {
            title: 'SSLCommerz',
          },
          {
            id: 'subscriptions.sslcommerz.storeId',
            label: 'Store ID',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.storePassword',
            label: 'Store Password',
            type: 'password',
          },
          {
            id: 'subscriptions.sslcommerz.country',
            label: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.cancelUrl',
            label: 'Cancel URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.environment',
            label: 'Environment',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.failUrl',
            label: 'Fail URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.refundApiUrl',
            title: 'Refund API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.sessionApiUrl',
            title: 'Session API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.successUrl',
            title: 'Success URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.transactionStatusApiUrl',
            title: 'Transaction API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.validationApiUrl',
            title: 'Validation API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxStoreId',
            title: 'Sandbox Store ID',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxStorePassword',
            title: 'Sandbox Store Password',
            type: 'password',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxSuccessUrl',
            title: 'Sandbox Success URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxFailUrl',
            title: 'Sandbox Fail URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxCancelUrl',
            title: 'Sandbox Cancel URL',
            type: 'switch',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxSessionApiUrl',
            title: 'Sandbox Session API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxValidationApiUrl',
            title: 'Sandbox Validation API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxTransactionStatusApiUrl',
            title: 'Sandbox Status API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.sandboxRefundApiUrl',
            title: 'Sandbox Refund API URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslcommerz.transactionalPayment',
            title: 'Transactional Payment',
            type: 'switch',
          },
          {
            id: 'subscriptions.sslcommerz.isActive',
            title: 'Enable SSLCommerz',
            type: 'switch',
          },
          {
            id: 'subscriptions.sslcommerz.bypassCheckoutScreen',
            title: 'Bypass Checkout Screen',
            type: 'switch',
          },
        ],
      },
      {
        key: 'juspay',
        span: 6,
        fields: [
          {
            title: 'JusPay',
          },
          {
            id: 'subscriptions.juspay.merchantId',
            label: 'Merchant ID',
            type: 'text',
          },
          {
            id: 'subscriptions.juspay.country',
            label: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.juspay.return_url',
            label: 'Callback URL',
            type: 'text',
          },
          {
            id: 'subscriptions.juspay.mandateMaxAmount',
            label: 'Mandate Max Amount',
            type: 'text',
          },
          {
            id: 'subscriptions.juspay.merchantKey',
            label: 'Merchant Key',
            type: 'text',
          },
          {
            id: 'subscriptions.juspay.isActive',
            label: 'Enable JusPay',
            type: 'switch',
          },
          {
            id: 'subscriptions.juspay.bypassCheckoutScreen',
            title: 'Bypass Checkout Screen',
            type: 'switch',
          },
        ],
      },
      {
        key: 'bKash',
        span: 6,
        fields: [
          {
            title: 'BKash Payment',
          },
          {
            id: 'subscriptions.bKash.app_key',
            label: 'App Key',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.app_secret',
            label: 'App Secret',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.country',
            label: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.createPaymentUrl',
            label: 'Create Payment URL',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.grantTokenUrl',
            label: 'Grant Token URL',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.paymentStatusCheckUrl',
            title: 'Payment Status Check URL',
            type: 'switch',
          },
          {
            id: 'subscriptions.bKash.redirectUrl',
            title: 'Redirect URL',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.executeUrl',
            title: 'Execute URL',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.callbackUrl',
            title: 'Callback URL',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.username',
            title: 'Username',
            type: 'text',
          },
          {
            id: 'subscriptions.bKash.password',
            title: 'Password',
            type: 'password',
          },
          {
            id: 'subscriptions.bKash.isActive',
            title: 'Enable bKash',
            type: 'switch',
          },
        ],
      },
      {
        key: 'bango',
        span: 12,
        fields: [
          {
            title: 'Bango',
          },
          {
            id: 'subscriptions.bango.authUserName',
            label: 'Username Provided to Bango Client',
            type: 'text',
          },
          {
            id: 'subscriptions.bango.authPassword',
            label: 'Password Provided to Bango Client',
            type: 'text',
          },
          {
            id: 'subscriptions.bango.authServerUserName',
            label: 'Server Username Received from Bango',
            type: 'text',
          },
          {
            id: 'subscriptions.bango.authServerPassword',
            label: 'Server Password received from Bango',
            type: 'text',
          },
          {
            id: 'subscriptions.bango.baseUrl',
            label: 'Base URL',
            type: 'text',
          },
          {
            id: 'subscriptions.bango.isActive',
            title: 'Enable Bango',
            type: 'switch',
          },
        ],
      },
      {
        key: 'dataBundleConfig',
        span: 12,
        fields: [
          {
            id: 'dataBundleConfig',
            type: 'divider',
            title: 'Data Bundle Configuration',
          },
        ],
      },
      {
        key: 'dataBundle',
        span: 12,
        fields: [
          {
            title: 'GP Data Bundle Config',
          },
          {
            id: 'subscriptions.dataBundle.gpConfiguration.checkOfferEndpoint',
            label: 'Enter Check Offer Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.dataBundle.gpConfiguration.clientId',
            label: 'Enter Client ID',
            type: 'text',
          },
          {
            id: 'subscriptions.dataBundle.gpConfiguration.clientSecret',
            label: 'Enter Client Secret Key',
            type: 'text',
          },
          {
            id: 'subscriptions.dataBundle.gpConfiguration.configOfferId',
            label: 'Enter Config Offer ID',
            type: 'text',
          },
          {
            id: 'subscriptions.dataBundle.gpConfiguration.tokenEndpoint',
            label: 'Enter Token Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.dataBundle.gpConfiguration.isActive',
            title: 'Enable GP Data Bundle',
            type: 'switch',
          },
        ],
      },
      {
        key: 'careerBilling',
        span: 12,
        fields: [
          {
            id: 'careerBilling',
            type: 'divider',
            title: 'Carrier Billing With SSL Configuration',
          },
        ],
      },
      {
        key: 'dataBundle',
        span: 12,
        fields: [
          {
            id: 'subscriptions.sslConfiguration.username',
            label: 'Enter SSL User Name',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.password',
            label: 'Enter SSL Password',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.tokenApi',
            label: 'Enter SSL Token API URL',
            type: 'text',
          },
          {
            title: 'Grameen Phone Config',
          },
          {
            id: 'subscriptions.sslConfiguration.gpConfiguration.dailySubscriptionEndPoint',
            label: 'Enter Daily Subscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.gpConfiguration.dailyUnsubscriptionEndPoint',
            label: 'Enter Daily Unsubscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.gpConfiguration.weeklySubscriptionEndPoint',
            label: 'Enter Weekly Subscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.gpConfiguration.weeklyUnsubscriptionEndPoint',
            label: 'Enter Weekly Unsubscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.gpConfiguration.monthlySubscriptionEndPoint',
            label: 'Enter Monthly Subscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.gpConfiguration.monthlyUnsubscriptionEndPoint',
            label: 'Enter Monthly Unsubscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.gpConfiguration.otpApiEndPoint',
            label: 'Enter OTP Endpoint URL',
            type: 'text',
          },
          {
            title: 'ROBI Config',
          },
          {
            id: 'subscriptions.sslConfiguration.robiConfiguration.dailySubscriptionEndPoint',
            label: 'Enter Daily Subscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.robiConfiguration.dailyUnsubscriptionEndPoint',
            label: 'Enter Daily Unsubscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.robiConfiguration.weeklySubscriptionEndPoint',
            label: 'Enter Weekly Subscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.robiConfiguration.weeklyUnsubscriptionEndPoint',
            label: 'Enter Weekly Unsubscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.robiConfiguration.monthlySubscriptionEndPoint',
            label: 'Enter Monthly Subscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.robiConfiguration.monthlyUnsubscriptionEndPoint',
            label: 'Enter Monthly Unsubscription Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.robiConfiguration.otpApiEndPoint',
            label: 'Enter OTP Endpoint URL',
            type: 'text',
          },
          {
            id: 'subscriptions.sslConfiguration.robiConfiguration.validateOtpEndPoint',
            label: 'Enter Validate OTP Endpoint URL',
            type: 'text',
          },
        ],
      },
      {
        key: 'careerBillingWithTIMWE',
        span: 12,
        fields: [
          {
            id: 'careerBillingWithTIMWE',
            type: 'divider',
            title: 'Carrier Billing With TIMWE Configuration',
          },
        ],
      },
      {
        key: 'dataBundle',
        span: 12,
        fields: [
          {
            id: 'subscriptions.timweConfiguration.contentUrl',
            label: 'Enter Content URL',
            type: 'text',
          },
          {
            title: 'Ooredoo Config',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.apiKey',
            label: 'Enter API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.largeAccount',
            label: 'Enter Large Account',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.mcc',
            label: 'Enter MCC',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.mnc',
            label: 'Enter MNC',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.optinApiEndPoint',
            label: 'Enter Optin API End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.optinConfirmApiEndPoint',
            label: 'Enter Optin Confirm API End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.optoutApiEndPoint',
            label: 'Enter Optout API End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.productId',
            label: 'Enter Product ID',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.sendMTApiKey',
            label: 'Enter Send MT API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.sendMTEndPoint',
            label: 'Enter Send MT End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.sendMTSharedKey',
            label: 'Enter Send MT Shared Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.sharedKey',
            label: 'Enter Shared Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.ooredooConfiguration.sharedServiceId',
            label: 'Enter Shared Service ID',
            type: 'text',
          },
          {
            title: 'DU Config',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.apiKey',
            label: 'Enter API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.cgURL',
            label: 'Enter CG URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.countryId',
            label: 'Enter Country ID',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.largeAccount',
            label: 'Enter Large Account',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.mcc',
            label: 'Enter MCC',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.mnc',
            label: 'Enter MNC',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.opId',
            label: 'Enter OP ID',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.productId',
            label: 'Enter Product ID',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.roleId',
            label: 'Enter Role ID',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.sendMTApiKey',
            label: 'Enter Send MT API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.sendMTEndPoint',
            label: 'Enter Send MT End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.sendMTSharedKey',
            label: 'Enter Send MT Shared Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.sharedKey',
            label: 'Enter Shared Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.duConfiguration.sharedServiceId',
            label: 'Enter Shared Service ID',
            type: 'text',
          },
          {
            title: 'Bahrain Config',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.apiKey',
            label: 'Enter API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.largeAccount',
            label: 'Enter Large Account',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.mcc',
            label: 'Enter MCC',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.mnc',
            label: 'Enter MNC',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.optinApiEndPoint',
            label: 'Enter Optin API End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.optinConfirmApiEndPoint',
            label: 'Enter Optin Confirm API End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.optoutApiEndPoint',
            label: 'Enter Optout API End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.productId',
            label: 'Enter Product ID',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.sendMTApiKey',
            label: 'Enter Send MT API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.sendMTEndPoint',
            label: 'Enter Send MT End Point URL',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.sendMTSharedKey',
            label: 'Enter Send MT Shared Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.sharedKey',
            label: 'Enter Shared Key',
            type: 'text',
          },
          {
            id: 'subscriptions.timweConfiguration.bahrainConfiguration.sharedServiceId',
            label: 'Enter Shared Service ID',
            type: 'text',
          },
        ],
      },
      {
        key: 'Jio',
        span: 12,
        fields: [
          {
            id: 'Jio',
            type: 'divider',
          },
        ],
      },
      {
        key: 'TIMWE',
        span: 12,
        fields: [
          {
            title: 'JIO',
          },
          {
            id: 'subscriptions.jioconfiguration.appName',
            label: 'App Name',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.bucketPath',
            label: 'Bucket Path',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.certName',
            label: 'Cert Name',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.keyName',
            label: 'Key Name',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.clientSecret',
            label: 'Client Secret Key',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.elasticSearchApi',
            label: 'Elastic Search API',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.jioPassphrase',
            label: 'Jio Passphrase',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.xApiKey',
            label: 'X API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.subscribeApi',
            label: 'Subscribe API',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.usersLimit',
            text: 'Users Limit',
            type: 'number',
          },
          {
            id: 'subscriptions.jioconfiguration.special_plan_identifier',
            label: 'Special Plan Identifier',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.isActive',
            label: 'Enable Jio',
            type: 'switch',
          },
        ],
      },
      {
        key: 'MercadoPagoDivider',
        span: 12,
        fields: [
          {
            id: 'MercadoPagoDivider',
            type: 'divider',
          },
        ],
      },
      {
        key: 'MercadoPago',
        span: 12,
        fields: [
          {
            title: 'Mercado Pago',
          },
          {
            id: 'subscriptions.mercadopago.country',
            label: 'Active Country',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.apikey',
            label: 'API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.jioconfiguration.isActive',
            label: 'Enable Mercado',
            type: 'switch',
          },
        ],
      },
      {
        key: 'PayGate',
        span: 12,
        fields: [
          {
            id: 'PayGate',
            type: 'divider',
          },
        ],
      },
      {
        key: 'PayGate',
        span: 12,
        fields: [
          {
            title: 'PayGate',
          },
          {
            id: 'subscriptions.paygate.encryptionKey',
            label: 'Encryption Key',
            type: 'text',
          },
          {
            id: 'subscriptions.paygate.payHostEncryptionKey',
            label: 'PayHost Encryption Key',
            type: 'text',
          },
          {
            id: 'subscriptions.paygate.payBatchEncryptionKey',
            label: 'PayBatch Encryption Key',
            type: 'text',
          },
          {
            id: 'subscriptions.paygate.paygateId',
            label: 'PayGate ID For MOTO Account',
            type: 'text',
          },
          {
            id: 'subscriptions.paygate.country',
            label: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.paygate.paygateNonMotoId',
            label: 'PayGate ID For Non MOTO Account (website transaction)',
            type: 'text',
          },
          {
            id: 'subscriptions.paygate.isActive',
            label: 'Enable Paygate',
            type: 'switch',
          },
        ],
      },
      {
        key: 'Vantiv',
        span: 12,
        fields: [
          {
            id: 'Vantiv',
            type: 'divider',
          },
        ],
      },
      {
        key: 'Vantiv',
        span: 12,
        fields: [
          {
            title: 'Vantiv',
          },
          {
            id: 'subscriptions.vantiv.user',
            label: 'User',
            type: 'text',
          },
          {
            id: 'subscriptions.vantiv.password',
            label: 'Password',
            type: 'password',
          },
          {
            id: 'subscriptions.vantiv.paypageId',
            label: 'PayPage Id',
            type: 'text',
          },
          {
            id: 'subscriptions.vantiv.reportGroup',
            label: 'Report Group',
            type: 'text',
          },
          {
            id: 'subscriptions.vantiv.url',
            label: 'URL',
            type: 'text',
          },
          {
            id: 'subscriptions.vantiv.country',
            label: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.vantiv.isActive',
            label: 'Enable Vantiv',
            type: 'switch',
          },
        ],
      },
      {
        key: 'android',
        span: 12,
        fields: [
          {
            id: 'android',
            type: 'divider',
          },
        ],
      },
      {
        key: 'android',
        span: 12,
        fields: [
          {
            title: 'ANDROID',
          },
          {
            id: 'subscriptions.android.minimumChargeAmount',
            label: 'Minimum Charge Amount',
            type: 'text',
          },
          {
            id: 'subscriptions.android.packageName',
            label: 'Package Name',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.authProviderx509CertUrl',
            label: 'Auth Provider x509 Cert Url',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.authUri',
            label: 'Auth Uri',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.clientEmail',
            label: 'Client Email',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.clientId',
            label: 'Client Id',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.clientx509CertUrl',
            label: 'Client x509 Cert Url',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.privateKey',
            label: 'Private Key',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.privateKeyId',
            label: 'Private Key Id',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.projectId',
            label: 'Project Id',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.tokenUri',
            label: 'Token Uri',
            type: 'text',
          },
          {
            id: 'subscriptions.android.serviceAccountJson.type',
            label: 'Type',
            type: 'text',
          },
          {
            id: 'subscriptions.android.restrictedCountry',
            label: 'Restricted Country',
            type: 'text',
          },
          {
            id: 'subscriptions.android.isActive',
            label: 'Enable Android',
            type: 'switch',
          },
        ],
      },
      {
        key: 'ios',
        span: 12,
        fields: [
          {
            id: 'ios',
            type: 'divider',
          },
        ],
      },
      {
        key: 'ios',
        span: 12,
        fields: [
          {
            title: 'IOS',
          },
          {
            id: 'subscriptions.ios.minimumChargeAmount',
            label: 'Minimum Charge Amount',
            type: 'text',
          },
          {
            id: 'subscriptions.ios.sharedSecret',
            label: 'Shared Secret',
            type: 'text',
          },
          {
            id: 'subscriptions.ios.verifyReceiptApiEndpoint',
            label: 'Verify Receipt API Endpoint',
            type: 'text',
          },
          {
            id: 'subscriptions.ios.verifyReceiptSandboxApiEndpoint',
            label: 'Verify Receipt Sandbox API Endpoint',
            type: 'text',
          },
          {
            id: 'subscriptions.ios.isNewStorekitApisEnabled',
            label: 'Enable new Storekit APIs',
            type: 'switch',
          },
          {
            id: 'subscriptions.ios.isActive',
            label: 'Enable IOS',
            type: 'switch',
          },
        ],
      },
      {
        key: 'AMAZONIAP',
        span: 12,
        fields: [
          {
            id: 'AMAZONIAP',
            type: 'divider',
          },
        ],
      },
      {
        key: 'AMAZONIAP',
        span: 12,
        fields: [
          {
            title: 'AMAZONIAP',
          },
          {
            id: 'subscriptions.amazonIap.sharedSecret',
            label: 'Shared Secret',
            type: 'text',
          },
          {
            id: 'subscriptions.amazonIap.isActive',
            label: 'Enable AmazonIAP',
            type: 'switch',
          },
          {
            id: 'subscriptions.amazonIap.verifyReceiptApiEndpoint',
            label: 'Verify Receipt API Endpoint',
            type: 'text',
          },
        ],
      },
      {
        key: 'ROKU',
        span: 12,
        fields: [
          {
            id: 'ROKU',
            type: 'divider',
          },
        ],
      },
      {
        key: 'ROKU',
        span: 12,
        fields: [
          {
            title: 'ROKU',
          },
          {
            id: 'subscriptions.roku.apiKey',
            label: 'API Key',
            type: 'text',
          },
          {
            id: 'subscriptions.roku.channelIds',
            label: 'Enter comma separated list of Channel Ids',
            type: 'switch',
          },
          {
            id: 'subscriptions.roku.minimumChargeAmount',
            label: 'Minimum Charge Amount',
            type: 'number',
          },
          {
            id: 'subscriptions.roku.verifyReceiptApiEndpoint',
            label: 'Verify Receipt API Endpoint',
            type: 'text',
          },
          {
            id: 'subscriptions.roku.isActive',
            label: 'Enable Roku',
            type: 'switch',
          },
        ],
      },
      {
        key: 'Vizio',
        span: 12,
        fields: [
          {
            id: 'Vizio',
            type: 'divider',
          },
        ],
      },
      {
        key: 'Vizio',
        span: 12,
        fields: [
          {
            title: 'Vizio',
          },
          {
            id: 'subscriptions.vizioTv.keyId',
            label: 'Key Id',
            type: 'text',
          },
          {
            id: 'subscriptions.vizioTv.keySecret',
            label: 'Key Secret',
            type: 'text',
          },
          {
            id: 'subscriptions.vizioTv.webhookSigningKey',
            label: 'Webhook Signing Key',
            type: 'number',
          },
          {
            id: 'subscriptions.vizioTv.webhookId',
            label: 'Webhook Id',
            type: 'text',
          },
          {
            id: 'subscriptions.vizioTv.partnerId',
            label: 'Partner Id',
            type: 'text',
          },
          {
            id: 'subscriptions.vizioTv.appId',
            label: 'App Id',
            type: 'text',
          },
          {
            id: 'subscriptions.vizioTv.vizioBaseUrl',
            label: 'Vizio Base Url',
            type: 'text',
          },
          {
            id: 'subscriptions.vizioTv.xTykKey',
            label: 'XTYK Key',
            type: 'text',
          },
          {
            id: 'subscriptions.vizioTv.isActive',
            label: 'Enable Vizio',
            type: 'switch',
          },
        ],
      },
      {
        key: 'PayTMPayment',
        span: 12,
        fields: [
          {
            id: 'PayTMPayment',
            type: 'divider',
          },
        ],
      },
      {
        key: 'PayTMPayment',
        span: 12,
        fields: [
          {
            title: 'PayTM Payment',
          },
          {
            id: 'subscriptions.paytm.country',
            label: 'Country',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.merchantKey',
            label: 'Merchant Key',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.isActive',
            label: 'Enable PayTM',
            type: 'switch',
          },
          {
            id: 'subscriptions.paytm.qrCodeEnabled',
            label: 'Enable QR Code',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.MID',
            label: 'MID',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.clientId',
            label: 'Client Id',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.qrCodeUrl',
            label: 'QR Code Url',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.businessType',
            label: 'Business Type',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.paytmQRCodeDefautExpirationTime',
            label: 'PayTM QR Code Expiration Time in Minute',
            type: 'number',
          },
          {
            id: 'subscriptions.paytm.displayName',
            label: 'Display Name',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.transactionStatusUrl',
            label: 'Transaction Status URL',
            type: 'text',
          },
          {
            id: 'subscriptions.paytm.platforms',
            label: 'Platforms',
            type: 'multiSelect',
            options: [],
          },
        ],
      },
      {
        key: 'subscription_overlay_content',
        span: 12,
        fields: [
          {
            id: 'subscription_overlay_content',
            type: 'divider',
            title: 'Subscription overlay Content',
          },
        ],
      },
      {
        key: 'subscription_overlay_content',
        span: 6,
        fields: [
          {
            title: 'Subscription overlay Content For Video',
          },
          {
            id: 'subscriptions.subscription_overlay_content.overlay_message',
            label: 'Enter Subscription overlay message',
            type: 'textarea',
          },
          {
            id: 'subscriptions.subscription_overlay_content.subscription_button_text',
            label: 'Enter subscription button text',
            type: 'text',
          },
          {
            id: 'subscriptions.subscription_overlay_content.login_button_text',
            label: 'Enter login button text',
            type: 'text',
          },
          {
            id: 'subscriptions.subscription_overlay_content.subscription_button_url',
            label: 'Enter subscription button Url',
            type: 'text',
          },
        ],
      },
      {
        key: 'subscription_overlay_audio_content',
        span: 6,
        fields: [
          {
            title: 'Subscription overlay Content For Audio',
          },
          {
            id: 'subscriptions.subscription_overlay_audio_content.overlay_message',
            label: 'Enter Subscription overlay message',
            type: 'textarea',
          },
          {
            id: 'subscriptions.subscription_overlay_audio_content.subscription_button_text',
            label: 'Enter subscription button text',
            type: 'text',
          },
          {
            id: 'subscriptions.subscription_overlay_audio_content.login_button_text',
            label: 'Enter login button text',
            type: 'text',
          },
          {
            id: 'subscriptions.subscription_overlay_audio_content.subscription_button_url',
            label: 'Enter subscription button Url',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    title: 'ADVERTISING',
    key: 'advertising',
    items: [
      {
        key: 'ad_provider',
        span: 12,
        fields: [
          {
            id: 'advertising.ad_provider',
            type: 'select',
            title: 'Ad Tag Provider',
            options: [
              {
                value: 'googleAdTags',
                label: 'Google Ads',
              },
              {
                value: 'spotxAdTags',
                label: 'Spotx',
              },
            ],
          },
        ],
      },
      {
        key: 'advertising',
        span: 6,
        fields: [
          {
            id: 'minimum_app_version',
            title: 'Google Ad Tags',
          },
          {
            id: 'advertising.ad_video_tags.web.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Web',
          },
          {
            id: 'advertising.ad_video_tags.ios.value',
            type: 'text',
            label: 'Enter Ads Video Tag for iOS',
          },
          {
            id: 'serviceData.settings.advertising.ad_video_tags.apple_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Apple Tv',
          },
          {
            id: 'advertising.ad_video_tags.android.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Android',
          },
          {
            id: 'advertising.ad_video_tags.android_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Android TV',
          },
          {
            id: 'advertising.ad_video_tags.amazon_fire.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Amazon Fire',
          },
          {
            id: 'advertising.ad_video_tags.fire_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Fire TV',
          },
          {
            id: 'advertising.ad_video_tags.fire_stick.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Fire Stick',
          },
          {
            id: 'advertising.ad_video_tags.metrological.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Metrological',
          },
          {
            id: 'advertising.ad_video_tags.jiostb.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Jio TV',
          },
          {
            id: 'serviceData.settings.advertising.ad_video_tags.roku.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Roku',
          },
          {
            id: 'serviceData.settings.advertising.ad_video_tags.roku_fallback.value',
            type: 'text',
            label: 'Enter Ads Fallback URL for Roku',
          },
          {
            id: 'advertising.ad_video_tags.windows10_desktop.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Windows 10 Desktop',
          },
          {
            id: 'advertising.ad_video_tags.lg_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for LG TV',
          },
          {
            id: 'advertising.ad_video_tags.samsung_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Samsung TV',
          },
          {
            id: 'advertising.ad_video_tags.xbox.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Xbox',
          },
          {
            id: 'serviceData.settings.advertising.ad_video_tags.tivo.value',
            type: 'text',
            label: 'Enter Ads Fallback URL for Tivo',
          },
          {
            id: 'advertising.ad_video_tags.tivo.value',
            type: 'text',
            label: 'Enter Ads Video Tag for TiVo',
          },
          {
            id: 'advertising.ad_video_tags.vizioTv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Vizio TV',
          },
        ],
      },
      {
        key: 'spotx_video_tags',
        span: 6,
        fields: [
          {
            id: 'spotx_video_tags',
            title: 'Spotx Ad Tags',
          },
          {
            id: 'advertising.spotx_video_tags.web.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Web',
          },
          {
            id: 'advertising.spotx_video_tags.ios.value',
            type: 'text',
            label: 'Enter Ads Video Tag for iOS',
          },
          {
            id: 'serviceData.settings.advertising.spotx_video_tags.apple_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Apple Tv',
          },
          {
            id: 'advertising.spotx_video_tags.android.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Android',
          },
          {
            id: 'advertising.spotx_video_tags.android_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Android TV',
          },
          {
            id: 'advertising.spotx_video_tags.amazon_fire.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Amazon Fire',
          },
          {
            id: 'advertising.spotx_video_tags.metrological.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Metrological',
          },
          {
            id: 'advertising.spotx_video_tags.jiostb.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Jio TV',
          },
          {
            id: 'serviceData.settings.advertising.spotx_video_tags.roku.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Roku',
          },
          {
            id: 'serviceData.settings.advertising.spotx_video_tags.roku_fallback.value',
            type: 'text',
            label: 'Enter Ads Fallback URL for Roku',
          },
          {
            id: 'advertising.spotx_video_tags.windows10_desktop.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Windows 10 Desktop',
          },
          {
            id: 'advertising.spotx_video_tags.lg_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for LG TV',
          },
          {
            id: 'advertising.spotx_video_tags.samsung_tv.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Samsung TV',
          },
          {
            id: 'advertising.spotx_video_tags.xbox.value',
            type: 'text',
            label: 'Enter Ads Video Tag for Xbox',
          },
          {
            id: 'serviceData.settings.advertising.spotx_video_tags.tivo.value',
            type: 'text',
            label: 'Enter Ads Fallback URL for Tivo',
          },
          {
            id: 'advertising.spotx_video_tags.tivo.value',
            type: 'text',
            label: 'Enter Ads Video Tag for TiVo',
          },
        ],
      },
    ],
  },
  {
    key: 'analytics',
    title: 'ANALYTICS',
    span: 6,
    items: [
      {
        key: 'google_GTM',
        span: 6,
        fields: [
          {
            id: 'google_GTM',
            title: 'Google Tag Manager Tracking ID',
          },
          {
            id: 'analytics.google_GTM.web',
            type: 'text',
            label: 'Enter GTM for Web',
          },
          {
            id: 'analytics.google_GTM.ios',
            type: 'text',
            label: 'Enter GTM for iOS',
          },
          {
            id: 'analytics.google_GTM.android',
            type: 'text',
            label: 'Enter GTM for android',
          },
          {
            id: 'analytics.google_GTM.lgTv',
            type: 'text',
            label: 'Enter GTM for LG TV',
          },
          {
            id: 'analytics.google_GTM.vizioTv',
            type: 'text',
            label: 'Enter GTM for Vizio TV',
          },
          {
            id: 'analytics.google_GTM.samsungTv',
            type: 'text',
            label: 'Enter GTM for SamsungTV',
          },
        ],
      },
      {
        key: 'google_analytics',
        span: 6,
        fields: [
          {
            id: 'google_analytics',
            title: 'Google Analytics Tracking ID',
          },
          {
            id: 'analytics.google_analytics.web',
            type: 'text',
            label: 'Enter GA for Web',
          },
          {
            id: 'analytics.google_analytics.android',
            type: 'text',
            label: 'Enter GA for Android',
          },
          {
            id: 'analytics.google_analytics.roku',
            type: 'text',
            label: 'Enter GA for Roku',
          },
          {
            id: 'analytics.google_analytics.tivo',
            type: 'text',
            label: 'Enter GA for Tivo',
          },
          {
            id: 'analytics.google_analytics.appletv',
            type: 'text',
            label: 'Enter GA for Apple TV',
          },
          {
            id: 'analytics.google_analytics.firetv',
            type: 'text',
            label: 'Enter GA for FireTV',
          },
          {
            id: 'analytics.google_analytics.metrological',
            type: 'text',
            label: 'Enter GA for Metrological',
          },
          {
            id: 'analytics.google_analytics.jiostb',
            type: 'text',
            label: 'Enter GA for Jio TV',
          },
          {
            id: 'analytics.google_analytics.xbox',
            type: 'text',
            label: 'Enter GA for Xbox One',
          },
          {
            id: 'analytics.google_analytics.lgtv',
            type: 'text',
            label: 'Enter GA for LG TV',
          },
          {
            id: 'analytics.google_analytics.vizioTv',
            type: 'text',
            label: 'Enter GA for Vizio TV',
          },
          {
            id: 'analytics.google_analytics.samsungtv',
            type: 'text',
            label: 'Enter GA for Samsung TV',
          },
          {
            id: 'analytics.google_analytics.windows10_desktop',
            type: 'text',
            label: 'Enter GA for Windows 10 Desktop',
          },
        ],
      },
      {
        key: 'third_party_analytics',
        span: 6,
        fields: [
          {
            id: 'third_party_analytics',
            title: 'Third Party Analytics',
          },
          {
            id: 'analytics.third_party_analytics.firebasePropertyId',
            type: 'text',
            label: 'Firebase Property ID',
          },
        ],
      },
      {
        key: 'google_analytics_app_id',
        span: 6,
        fields: [
          {
            id: 'google_analytics_app_id',
            title: 'Google Analytics App ID',
          },
          {
            id: 'google_analytics_keys',
            title: 'Other Google Analytics Keys',
          },
          {
            id: 'analytics.google_analytics_keys.googleAdwordsID',
            type: 'text',
            label: 'Enter Google Adwords ID',
          },
          {
            id: 'analytics.google_analytics_keys.googleAdsRemarketingID',
            type: 'text',
            label: 'Enter Google Ads Remarketing ID',
          },
          {
            id: 'analytics.google_analytics_keys.googleAnalyticsAppWebID',
            type: 'text',
            label: 'Enter Google Analytics App Web ID',
          },
        ],
      },
      {
        key: 'reCaptcha_keys',
        span: 6,
        fields: [
          {
            id: 'reCaptcha_keys',
            title: 'reCAPTCHA Keys',
          },
          {
            id: 'analytics.reCaptcha_keys.siteKey',
            type: 'text',
            label: 'Site Key',
          },
          {
            id: 'analytics.reCaptcha_keys.secretKey',
            type: 'text',
            label: 'Secret Key',
          },
          {
            id: 'analytics.reCaptcha_keys.recatpchaV2SiteKey',
            type: 'text',
            label: 'Recapthca V2 Site Key',
          },
          {
            id: 'analytics.reCaptcha_keys.thresholdValue',
            type: 'text',
            label: 'Threshold Value',
          },
          {
            id: 'analytics.reCaptcha_keys.enableRecaptcha',
            type: 'switch',
            title: 'Enable Recaptcha',
          },
        ],
      },
      {
        key: 'conversionApi',
        span: 6,
        fields: [
          {
            id: 'conversionApi',
            title: 'Facebook Conversion Keys',
          },
          {
            id: 'analytics.conversionApi.conversionApi',
            type: 'switch',
            title: 'Conversion Api',
          },
          {
            id: 'analytics.conversionApi.accessToken',
            type: 'text',
            label: 'Access Token',
          },
          {
            id: 'analytics.conversionApi.pixelID',
            type: 'text',
            label: 'Pixel ID',
          },
          {
            id: 'analytics.conversionApi.testId',
            type: 'text',
            label: 'Test Token',
          },
        ],
      },
      {
        key: 'appflyer_credentials',
        span: 6,
        fields: [
          {
            id: 'appflyer_credentials',
            title: 'AppsFlyer Credentials',
          },
          {
            id: 'analytics.appflyer_credentials.username',
            type: 'text',
            label: 'Enter AppsFlyer User Name',
          },
          {
            id: 'analytics.appflyer_credentials.password',
            type: 'password',
            label: 'Enter AppsFlyer User Password',
          },
        ],
      },
      {
        key: 'appflyer_dev_key',
        span: 6,
        fields: [
          {
            id: 'appflyer_dev_key',
            title: 'AppsFlyer DevKey',
          },
          {
            id: 'analytics.appflyer_dev_key.ios',
            type: 'text',
            title: 'Enter AppsFlyer DevKey for iOS',
          },
          {
            id: 'analytics.appflyer_dev_key.android',
            type: 'text',
            title: 'Enter AppsFlyer DevKey for Android',
          },
          {
            id: 'analytics.appflyer_dev_key.xbox',
            type: 'text',
            title: 'Enter AppsFlyer DevKey for Xbox One',
          },
          {
            id: 'analytics.appflyer_dev_key.amazon',
            type: 'text',
            title: 'Enter AppsFlyer DevKey for FireTV',
          },
        ],
      },
      {
        key: 'appflyer_prod_key',
        span: 6,
        fields: [
          {
            id: 'appflyer_prod_key',
            title: 'AppsFlyer ProdKey',
          },
          {
            id: 'analytics.appflyer_prod_key.ios',
            type: 'text',
            title: 'Enter AppsFlyer ProdKey for iOS',
          },
          {
            id: 'analytics.appflyer_prod_key.android',
            type: 'text',
            title: 'Enter AppsFlyer ProdKey for Android',
          },
          {
            id: 'analytics.appflyer_prod_key.xbox',
            type: 'text',
            title: 'Enter AppsFlyer ProdKey for Xbox One',
          },
          {
            id: 'analytics.appflyer_prod_key.amazon',
            type: 'text',
            title: 'Enter AppsFlyer ProdKey for FireTV',
          },
        ],
      },
      {
        key: 'appflyer_app_id',
        span: 6,
        fields: [
          {
            id: 'appflyer_app_id',
            title: 'AppFlyer App ID',
          },
          {
            id: 'analytics.appflyer_app_id.ios',
            type: 'text',
            title: 'Enter AppFlyer App ID for iOS',
          },
          {
            id: 'analytics.appflyer_app_id.android',
            type: 'text',
            title: 'Enter AppFlyer App ID for Android',
          },
          {
            id: 'analytics.appflyer_app_id.xbox',
            type: 'text',
            title: 'Enter AppFlyer App ID for Xbox One',
          },
        ],
      },
      {
        key: 'distribution_certificate',
        span: 6,
        fields: [
          {
            id: 'distribution_certificate',
            title: 'Distribution certificate',
          },
          {
            id: 'analytics.distribution_certificate.ios',
            type: 'text',
            title: 'iOS',
          },
          {
            id: 'analytics.distribution_certificate.android',
            type: 'text',
            title: 'Android',
          },
        ],
      },
      {
        key: 'apns_certificate',
        span: 6,
        fields: [
          {
            id: 'apns_certificate',
            title: 'APNS certificate',
          },
          {
            id: 'analytics.apns_certificate.ios',
            type: 'text',
            title: 'iOS',
          },
          {
            id: 'analytics.apns_certificate.android',
            type: 'text',
            title: 'Android',
          },
        ],
      },
      {
        key: 'provisioning_profile',
        span: 4,
        fields: [
          {
            id: 'provisioning_profile',
            title: 'Provisioning Profile',
          },
          {
            id: 'analytics.clever_tap.cleverTapAnalyticsId',
            type: 'text',
            label: 'Clevertap Analytics ID',
          },
          {
            id: 'analytics.clever_tap.cleverTapToken',
            type: 'text',
            label: 'Clevertap Token',
          },
          {
            id: 'analytics.clever_tap.appInbox',
            type: 'switch',
            title: 'CleverTap AppInbox',
          },
          {
            id: 'analytics.clever_tap.cleverMIPushAppId',
            type: 'text',
            label: 'Clevertap MI PUSH APP ID',
          },
          {
            id: 'analytics.clever_tap.cleverTapMIPushAppKey',
            type: 'text',
            label: 'Clevertap MI PUSH APP KEY',
          },
          {
            id: 'analytics.google_analytics_keys.googleAdwordsConversionLabel',
            type: 'text',
            label: 'Google Adwords Conversion Label',
          },
          {
            id: 'analytics.comscore_credentials.publisherId',
            type: 'text',
            label: 'Comscore Credentials',
          },
          {
            id: 'nielsen_credentials',
            title: 'Nielsen Credentials',
          },
          {
            id: 'analytics.nielsen_credentials.appId',
            type: 'text',
            label: 'Enter App ID',
          },
          {
            id: 'analytics.nielsen_credentials.sfcode',
            type: 'text',
            label: 'Enter sfcode',
          },
        ],
      },
      {
        key: 'adjust_sdk',
        span: 8,
        fields: [
          {
            id: 'adjust_sdk',
            title: 'Adjust SDK',
          },
          {
            id: 'analytics.adjust_sdk.tokenID',
            type: 'text',
            title: 'Enter Token ID',
          },
          {
            id: 'adjustSdkEventData',
            title: 'Adjust SDK Events',
          },
          {
            id: 'analytics.adjustEventsData',
            type: 'array',
            addButtonText: 'Add more event',
            defaultItem: {
              adjust_event_name: '',
              adjust_event_id: '',
            },
            items: [
              {
                id: 'adjust_event_name',
                label: 'Enter Event Name',
                type: 'text',
              },
              {
                id: 'adjust_event_id',
                label: 'Enter Event ID',
                type: 'text',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'SOCIAL MEDIA',
    key: 'socialMedia',
    items: [
      {
        key: 'Facebook',
        fields: [
          {
            id: 'socialMedia.facebook',
            type: 'text',
            title: 'Facebook',
            label: 'Enter Facebook Link',
          },
        ],
        description: 'Enter your company Facebook URL.',
      },
      {
        key: 'Twitter',
        fields: [
          {
            id: 'socialMedia.twitter',
            type: 'text',
            title: 'Twitter',
            label: 'Enter Twitter Link',
          },
        ],
        description: 'Enter your company Twitter URL.',
      },
      {
        key: 'YouTube',
        fields: [
          {
            id: 'socialMedia.youtube',
            type: 'text',
            title: 'YouTube',
            label: 'Enter YouTube Link',
          },
        ],
        description: 'Enter your company YouTube URL.',
      },
      {
        key: 'Vimeo',
        fields: [
          {
            id: 'socialMedia.vimeo',
            type: 'text',
            title: 'Vimeo',
            label: 'Enter Vimeo Link',
          },
        ],
        description: 'Enter your company Vimeo URL.',
      },
      {
        key: 'Instagram',
        fields: [
          {
            id: 'socialMedia.instagram',
            type: 'text',
            title: 'Instagram',
            label: 'Enter Instagram Link',
          },
        ],
        description: 'Enter your company Instagram URL.',
      },
      {
        key: 'googlePlus',
        fields: [
          {
            id: 'socialMedia.googlePlus',
            type: 'text',
            title: 'Enter Google Plus Url',
            label: 'Enter your company Google Plus URL',
          },
        ],
        description: 'Enter your company Google Plus URL.',
      },
      {
        key: 'facebook_app_id',
        fields: [
          {
            id: 'socialMedia.facebook_app_id',
            type: 'text',
            title: 'Facebook AppID',
            label: 'Enter Facebook AppID',
          },
        ],
        description: 'Facebook AppID is a unique number that identifies your app when you request ads from Audience Network.',
      },
      {
        key: 'facebook_secret_key',
        fields: [
          {
            id: 'socialMedia.facebook_secret_key',
            type: 'text',
            title: 'Facebook SecretKey',
            label: 'Enter Facebook SecretKey',
          },
        ],
        description:
          'Facebook SecretKey identifies which application is asking the request. To access this, go to https://developers.facebook.com/apps and view the settings page for your application.',
      },
      {
        key: 'facebook_pixel_id',
        fields: [
          {
            id: 'socialMedia.facebook_pixel_id',
            type: 'text',
            title: 'Facebook Pixel ID',
            label: 'Enter Facebook Pixel ID',
          },
        ],
        description: 'Facebook Pixel ID.',
      },
      {
        key: 'facebook_client_token',
        fields: [
          {
            id: 'socialMedia.facebook_client_token',
            type: 'text',
            title: 'Facebook Client Token',
            label: 'Enter Facebook Client Token',
          },
        ],
        description: 'Facebook Client Token.',
      },
      {
        key: 'clientId',
        fields: [
          {
            id: 'socialMedia.appleSignin.clientId',
            type: 'text',
            title: 'Apple Service ID',
            label: 'Enter Service ID',
          },
        ],
        description: 'Apple Service ID.',
      },
      {
        key: 'twitter_consumer_secret',
        fields: [
          {
            id: 'socialMedia.twitter_consumer_secret',
            type: 'text',
            title: 'Twitter ConsumerSecret',
            label: 'Enter ConsumerSecret',
          },
        ],
        description: 'Twitter ConsumerSecret is the value which identifies your application to Twitter.',
      },
      {
        key: 'twitter_consumer_key',
        fields: [
          {
            id: 'socialMedia.twitter_consumer_key',
            type: 'text',
            title: 'Twitter ConsumerKey',
            label: 'Enter Twitter ConsumerKey',
          },
        ],
        description:
          'Twitter ConsumerKey identifies which application is asking the request. To access this, go to https://developer.twitter.com/en/apps and view the settings page for your application.',
      },
      {
        key: 'google_auth',
        span: 8,
        fields: [
          {
            id: 'google_auth',
            title: 'Google Auth Credentials',
          },
          {
            id: 'socialMedia.google_auth.web',
            label: 'Enter Google Auth for Web',
            type: 'text',
          },
          {
            id: 'socialMedia.google_auth.ios',
            label: 'Enter Google Auth for ios',
            type: 'text',
          },
          {
            id: 'socialMedia.google_auth.android',
            label: 'Enter Google Auth for Android',
            type: 'text',
          },
          {
            id: 'socialMedia.google_auth.amazon',
            label: 'Enter Google Auth for Amazon',
            type: 'text',
          },
          {
            id: 'socialMedia.google_auth.roku',
            label: 'Enter Google Auth for Roku',
            type: 'text',
          },
          {
            id: 'socialMedia.google_auth.tivo',
            label: 'Enter Google Auth for TiVo',
            type: 'text',
          },
          {
            id: 'socialMedia.google_auth.windows10_desktop',
            label: 'Enter Google Auth for Win10 Desktop',
            type: 'text',
          },
          {
            id: 'socialMedia.google_auth.smartTv',
            label: 'Enter Google Auth for smart tv',
            type: 'text',
          },
        ],
      },
      {
        key: 'use_facebook_auth',
        span: 6,
        fields: [
          {
            id: 'socialMedia.use_facebook_auth',
            type: 'switch',
            title: 'Hide Facebook Login Authentication',
          },
        ],
        description:
          'Facebook Login Authentication will allow users to create or log in to their accounts using Facebook credentials. Enable this toggle to hide the Facebook login option.',
      },
      {
        key: 'enable_google_signin',
        span: 6,
        fields: [
          {
            id: 'socialMedia.enable_google_signin',
            type: 'switch',
            title: 'Enable Google Signin',
          },
        ],
        description: 'Enabling Google Signin will allow users to create or log in to their accounts using Google credentials.',
      },
    ],
  },
  {
    title: 'CUSTOMER SERVICE',
    key: 'customerService',
    items: [
      {
        key: 'customerService',
        span: 6,
        fields: [
          {
            id: 'customerService.email',
            type: 'text',
            title: 'Email',
            label: 'Enter Email',
          },
        ],
        description: 'Enter the Customer Service Email associated with your business.',
      },
      {
        key: 'customerService',
        span: 6,
        fields: [
          {
            id: 'customerService.phone_number',
            type: 'text',
            title: 'Phone Number',
            label: 'Enter Phone Number',
          },
        ],
        description: 'Enter the Customer Service Phone Number associated with your business.',
      },
      {
        key: 'customerService',
        span: 6,
        fields: [
          {
            id: 'customerService.apptentive_app_id.ios',
            type: 'text',
            title: 'Apptentive App ID for IOS',
            label: 'Enter Apptentive app id for iOS',
          },
        ],
        description: 'Enter the Customer Service Phone Number associated with your business.',
      },
      {
        key: 'customerService',
        span: 6,
        fields: [
          {
            id: 'customerService.apptentive_app_id.android',
            type: 'text',
            title: 'Apptentive App ID for ANDROID',
            label: 'Enter Apptentive app id for ANDROID',
          },
        ],
        description: 'Enter the Customer Service Phone Number associated with your business.',
      },
      {
        key: 'customerService',
        span: 6,
        fields: [
          {
            id: 'customerService.apptentive_app_key.ios',
            type: 'text',
            title: 'Apptentive App Key for IOS',
            label: 'Enter Apptentive App Key for iOS',
          },
        ],
        description: 'Enter the Customer Service Phone Number associated with your business.',
      },
      {
        key: 'customerService',
        span: 6,
        fields: [
          {
            id: 'customerService.apptentive_app_key.android',
            type: 'text',
            title: 'Apptentive App Key for ANDROID',
            label: 'Enter Apptentive App Key for ANDROID',
          },
        ],
        description: 'Enter the Customer Service Phone Number associated with your business.',
      },
      {
        key: 'customerService',
        span: 6,
        fields: [
          {
            id: 'customerService.apptentive_app_signature.ios',
            type: 'text',
            title: 'Apptentive App Signature for IOS',
            label: 'Enter Apptentive App Signature for iOS',
          },
        ],
        description: 'Enter the Customer Service Phone Number associated with your business.',
      },
      {
        key: 'customerService',
        span: 6,
        fields: [
          {
            id: 'customerService.apptentive_app_signature.android',
            type: 'text',
            title: 'Apptentive App Signature for ANDROID',
            label: 'Enter Apptentive App Signature for ANDROID',
          },
        ],
        description: 'Enter the Customer Service Phone Number associated with your business.',
      },
      {
        key: 'freshChat',
        span: 6,
        fields: [
          {
            title: 'FreshChat',
          },
          {
            id: 'customerService.freshChat.appID',
            title: 'FreshChat App ID',
            label: 'FreshChat App ID',
            type: 'text',
          },
          {
            id: 'customerService.freshChat.key',
            title: 'FreshChat Key',
            label: 'FreshChat Key',
            type: 'text',
          },
          {
            id: 'customerService.freshChat.hashKey',
            title: 'FreshChat Token',
            label: 'FreshChat Token',
            type: 'text',
          },
          {
            id: 'customerService.freshChat.enableFreshChat',
            title: 'Enable FreshChat',
            label: 'Enable FreshChat',
            type: 'switch',
          },
          {
            id: 'customerService.freshChat.url',
            title: 'FreshChat Base Url',
            label: 'FreshChat Base Url',
            type: 'text',
          },
        ],
      },
      {
        key: 'zendesk',
        span: 6,
        fields: [
          {
            title: 'Zendesk',
          },
          {
            id: 'customerService.zendesk.appID',
            title: 'Zendesk App ID',
            label: 'Zendesk App ID',
            type: 'text',
          },
          {
            id: 'customerService.freshChat.key',
            title: 'Zendesk Client Id',
            label: 'Zendesk Client Id',
            type: 'text',
          },
          {
            id: 'customerService.zendesk.url',
            title: 'Zendesk Url',
            label: 'Zendesk Url',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    title: 'NOTIFICATIONS & ENGAGEMENT CHANNELS',
    key: 'notificationEngagementChannels',
    items: [
      {
        key: 'notificationEngagementChannels',
        span: 6,
        fields: [
          {
            id: 'notifications.mandril_apikey',
            type: 'text',
            title: 'Mandril ApiKey',
            label: 'Mandril ApiKey',
          },
        ],
        description:
          'Mandrill is a transactional email platform built by Mailchimp, is a powerful delivery service that can be used for personalized, one-to-one e-commerce emails, and automated transactional emails like password resets, order confirmations, and welcome messages.',
      },
      {
        key: 'notificationEngagementChannels',
        span: 6,
        fields: [
          {
            id: 'notifications.mailchimp_apikey',
            type: 'text',
            title: 'Mailchimp ApiKey',
            label: 'Enter Mailchimp ApiKey',
          },
        ],
        description:
          'Mailchimp is a web-based email marketing service. It helps you design email newsletters, share them on social networks, integrate with services you already use, and track your results.',
      },
      {
        key: 'mailchimp_list_unique_id',
        span: 6,
        fields: [
          {
            id: 'notifications?.mailchimp_list_unique_id',
            type: 'text',
            title: 'Mailchimp List Unique Id',
            label: 'Enter Mailchimp List Unique Id',
          },
        ],
        description:
          'Mailchimp is a web-based email marketing service. It helps you design email newsletters, share them on social networks, integrate with services you already use, and track your results.',
      },
      {
        key: 'urbanAirship_username',
        span: 6,
        fields: [
          {
            id: 'notifications?.urbanAirship_username',
            type: 'text',
            title: 'Airship Username',
            label: 'Enter Airship Username',
          },
        ],
        description:
          'Urban Airship is trusted by thousands of businesses to drive growth with digital customer engagement. Every day, marketers and developers depend on Urban Airship to deliver billions of personalized, interactive notifications that inspire interest and drive action across all digital channels.',
      },
      {
        key: 'urbanAirship_username',
        span: 12,
        fields: [
          {
            id: 'notifications?.urbanAirship_password',
            type: 'password',
            title: 'Airship Password',
            label: 'Enter Airship Password',
          },
        ],
        description: '',
      },
      {
        key: 'urbanAirship_dev_key',
        span: 6,
        fields: [
          {
            title: 'Airship: Key Dev',
          },
          {
            id: 'notifications.urbanAirship_dev_key.ios',
            type: 'text',
            label: 'Enter Airship: Key Dev for iOS',
          },
          {
            id: 'notifications.urbanAirship_dev_key.android',
            type: 'text',
            label: 'Enter Airship: Key Dev for Android',
          },
        ],
        description: '',
      },
      {
        key: 'urbanAirship_dev_secret',
        span: 6,
        fields: [
          {
            title: 'Airship: Secret Dev',
          },
          {
            id: 'notifications.urbanAirship_dev_secret.ios',
            type: 'text',
            label: 'Enter Airship: Secret Dev for iOS',
          },
          {
            id: 'notifications.urbanAirship_dev_secret.android',
            type: 'text',
            label: 'Enter Airship: Secret Dev for Android',
          },
        ],
        description: '',
      },
      {
        key: 'urbanAirship_prod_key',
        span: 6,
        fields: [
          {
            title: 'Airship: Key Prod',
          },
          {
            id: 'notifications.urbanAirship_prod_key.ios',
            type: 'text',
            label: 'Enter Airship: Key Prod for iOS',
          },
          {
            id: 'notifications.urbanAirship_prod_key.android',
            type: 'text',
            label: 'Enter Airship: Key Prod for Android',
          },
        ],
        description: '',
      },
      {
        key: 'urbanAirship_prod_secret',
        span: 6,
        fields: [
          {
            title: 'Airship: Secret Prod',
          },
          {
            id: 'notifications.urbanAirship_prod_secret.ios',
            type: 'text',
            label: 'Enter Airship: Secret Prod for iOS',
          },
          {
            id: 'notifications.urbanAirship_prod_secret.android',
            type: 'text',
            label: 'Enter Airship: Secret Prod for Android',
          },
        ],
        description: '',
      },
      {
        key: 'hubspot_apiKey',
        span: 6,
        fields: [
          {
            id: 'notifications.hubspot_apiKey',
            type: 'text',
            title: 'Hubspot API Key',
          },
        ],
        description: '',
      },
      {
        key: 'hubspot_listId',
        span: 6,
        fields: [
          {
            id: 'notifications.hubspot_listId',
            type: 'text',
            title: 'Enter Hubspot List ID',
          },
        ],
        description: '',
      },
      {
        key: 'clevertap',
        span: 6,
        fields: [
          {
            id: 'notifications.clevertap.accountId',
            type: 'text',
            title: 'CleverTap Account ID',
            label: 'Enter CleverTap Account ID',
          },
        ],
        description: '',
      },
      {
        key: 'clevertap_secretKey',
        span: 6,
        fields: [
          {
            id: 'notifications.clevertap.secretKey',
            type: 'text',
            title: 'CleverTap Secret Key',
            label: 'Enter CleverTap Secret Key',
          },
        ],
        description: '',
      },
      {
        key: 'clevertap_secretKey',
        span: 6,
        fields: [
          {
            id: 'notifications.whatcounts.accountName',
            type: 'password',
            title: 'Whatcount Account Name',
            label: 'Enter Whatcount Account Name',
          },
        ],
        description: '',
      },
      {
        key: 'clevertap_Whatcount_Api_Password',
        span: 6,
        fields: [
          {
            id: 'notifications.whatcounts.apiPassword',
            type: 'password',
            title: 'Whatcount Api Password',
            label: 'Enter Whatcount Api Password',
          },
        ],
        description: '',
      },
      {
        key: 'notifications?.cookiebotKey',
        span: 6,
        fields: [
          {
            id: 'notifications.cookiebotKey',
            type: 'password',
            title: 'Cookiebot Registration Key',
            label: 'Enter Cookiebot Registration Key',
          },
        ],
        description: '',
      },
      {
        key: 'notifications?.cookiebotKey',
        span: 6,
        fields: [
          {
            id: 'notifications.getSocialAppId',
            type: 'text',
            title: 'GetSocial App ID',
            label: 'Enter GetSocial App ID',
          },
        ],
        description:
          'GetSocial is a features include referral marketing, push notifications, activity feeds. User segmentation and targeting, marketing automation, attribution, deeplinking and more.',
      },
      {
        key: 'notifications_getSocialSecretKey',
        span: 6,
        fields: [
          {
            id: 'notifications.getSocialSecretKey',
            type: 'text',
            title: 'GetSocial Secret Key',
            label: 'Enter GetSocial Secret Key',
          },
        ],
        description:
          'GetSocial is a features include referral marketing, push notifications, activity feeds. User segmentation and targeting, marketing automation, attribution, deeplinking and more.',
      },
      {
        key: 'notifications_churnTag',
        span: 6,
        fields: [
          {
            id: 'notifications.churn_tag',
            type: 'switch',
            title: 'Churn Tag',
          },
        ],
        description:
          'Churn Tag enables notifications indicating clients who might be in a churn pattern given their account usage data. This is a feature associated with Clevertap.',
      },
      {
        key: 'urbanAirship_dev_master_key',
        span: 6,
        fields: [
          {
            id: 'notifications.urbanAirship_dev_master_key',
            type: 'text',
            title: 'Urban Airship: Master Key Dev',
            label: 'Enter Urban Airship: Key Prod',
          },
        ],
        description: '',
      },
      {
        key: 'urbanAirship_prod_master_key',
        span: 6,
        fields: [
          {
            id: 'notifications.urbanAirship_prod_master_key',
            type: 'text',
            title: 'Urban Airship: Master Key Prod',
            label: 'Enter Urban Airship: Secret Prod',
          },
        ],
        description: '',
      },
      {
        key: 'tooltip_enable_webpush',
        span: 6,
        fields: [
          {
            id: 'notifications.enableWebPushNotification',
            type: 'switch',
            title: 'Enable Web Push Notification',
          },
        ],
        description:
          'Enable Web Push Notification allows notifications to be received on desktop browsers. This is a feature associated with Clevertap.',
      },
      {
        key: 'tooltip_anonymous_user_enable_webpush',
        span: 6,
        fields: [
          {
            id: 'notifications.enableAnonymousUserWebPushNotification',
            type: 'switch',
            title: 'Enable Anonymous User Web Push Notification',
          },
        ],
        description:
          'Enable Anonymous User Web Push Notification allows notifications to be received on desktop browsers. This is a feature associated with Clevertap.',
      },
      {
        key: 'clevertap_region',
        span: 6,
        fields: [
          {
            id: 'notifications.region',
            type: 'text',
            title: 'Clevertap Region',
          },
        ],
        description:
          "For CleverTap we have the 'Region' parameter which needs to be set if the account lies on a different domain. For some clients their account is in the US and so you need to set region as 'us1'.",
      },
      {
        key: 'WebPushData',
        span: 6,
        fields: [
          {
            id: 'WebPushDataTitle',
            title: 'Web Push Notification Settings',
          },
          {
            id: 'notifications.webPush.gcm_sender_id',
            type: 'text',
            label: 'Enter GCM Sender ID',
          },
          {
            id: 'notifications.webPush.titleText',
            type: 'text',
            label: 'Enter Title Text for User Permission Request',
          },
          {
            id: 'notifications.webPush.bodyText',
            type: 'text',
            label: 'Enter Body Text for User Permission Request',
          },
          {
            id: 'notifications.webPush.okButtonText',
            type: 'text',
            label: 'Ok Button Text',
          },
          {
            id: 'notifications.webPush.rejectButtonText',
            type: 'text',
            label: 'Reject Button Text',
          },
        ],
        description: '',
      },
      {
        key: 'AnonymousUserWebPushData',
        span: 6,
        fields: [
          {
            id: 'AnonymousUserWebPushDataTitle',
            title: 'Anonymous User Web Push Notification Settings',
          },
          {
            id: 'notifications.anonymousUserWebPush.gcm_sender_id',
            type: 'text',
            label: 'Enter GCM Sender ID',
          },
          {
            id: 'notifications.anonymousUserWebPush.titleText',
            type: 'text',
            label: 'Enter Title Text for User Permission Request',
          },
          {
            id: 'notifications.anonymousUserWebPush.bodyText',
            type: 'text',
            label: 'Enter Body Text for User Permission Request',
          },
          {
            id: 'notifications.anonymousUserWebPush.okButtonText',
            type: 'text',
            label: 'Ok Button Text',
          },
          {
            id: 'notifications.anonymousUserWebPush.rejectButtonText',
            type: 'text',
            label: 'Reject Button Text',
          },
        ],
        description: '',
      },
      {
        key: 'segmentDetails',
        span: 6,
        fields: [
          {
            id: 'segmentWebKeyCred',
            title: 'Segment Credentials',
          },
          {
            id: 'analytics.segmentDetails.segmentWebKey',
            type: 'text',
            label: 'Enter Segment Web Key',
          },
          {
            id: 'analytics.segmentDetails.segmentAndroidKey',
            type: 'text',
            label: 'Enter Segment Android Key',
          },
          {
            id: 'analytics.segmentDetails.segmentBackendKey',
            type: 'text',
            label: 'Enter Segment Backend Key',
          },
        ],
        description: '',
      },
      {
        key: 'segmentDetails',
        span: 6,
        fields: [
          {
            id: 'segmentWebKeyCred',
            title: 'Segment Credentials',
          },
          {
            id: 'analytics.segmentDetails.segmentWebKey',
            type: 'text',
            label: 'Enter Segment Web Key',
          },
          {
            id: 'analytics.segmentDetails.segmentAndroidKey',
            type: 'text',
            label: 'Enter Segment Android Key',
          },
          {
            id: 'analytics.segmentDetails.segmentBackendKey',
            type: 'text',
            label: 'Enter Segment Backend Key',
          },
        ],
        description: '',
      },
      {
        span: 12,
        fields: [
          {
            title: 'Segment Source Record',
          },
          {
            id: 'notifications.segmentRecordData',
            type: 'array',
            addButtonText: 'Add More Record',
            defaultItem: {
              recordTypeId: '',
              apiWriteKey: '',
              source: '',
            },
            items: [
              {
                id: 'recordTypeId',
                label: 'Record type id',
                type: 'text',
              },
              {
                id: 'apiWriteKey',
                label: 'API Write Key',
                type: 'text',
              },
              {
                id: 'source',
                label: 'Source',
                type: 'text',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'LOCALIZATION LANGUAGES',
    key: 'languages',
    items: [
      {
        span: 12,
        fields: [
          {
            id: 'languages',
            type: 'localizationLanguages',
          },
        ],
      },
    ],
  },
  {
    title: 'EMAIL CONSENT',
    key: 'emailConsent',
    items: [
      {
        span: 4,
        fields: [
          {
            id: 'emailConsent.enableEmailConsent',
            type: 'switch',
            title: 'Enable Email Consent',
          },
        ],
      },
      {
        span: 4,
        fields: [
          {
            id: 'emailConsent.defaultMessage',
            type: 'text',
            label: 'Enter Default Email Consent Message',
          },
        ],
      },
      {
        span: 4,
        fields: [
          {
            id: 'emailConsent.defaultChecked',
            type: 'switch',
            title: 'Default Message Checked State',
          },
        ],
      },
      {
        span: 12,
        fields: [
          {
            id: 'emailConsent.messages',
            type: 'array',
            addButtonText: 'Add Country',
            defaultItem: {
              countryCode: '',
              consentMessage: '',
              'Checked State': false,
            },
            items: [
              {
                id: 'countryCode',
                label: 'Enter Country Code',
                type: 'text',
              },
              {
                id: 'consentMessage',
                label: 'Enter Email Consent Message',
                type: 'text',
              },
              {
                id: 'checkedState',
                title: 'Checked State',
                type: 'switch',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'CACHING',
    key: 'caching',
    items: [
      {
        span: 6,
        fields: [
          {
            id: 'caching.cacheUrl',
            type: 'text',
            title: 'Cache Url',
          },
        ],
      },
      {
        span: 6,
        fields: [
          {
            id: 'caching.cachedAPIToken',
            type: 'text',
            title: 'Cache API Token',
          },
        ],
      },
      {
        span: 6,
        fields: [
          {
            id: 'caching.cacheInterval',
            type: 'text',
            title: 'Cache Interval',
          },
        ],
      },
    ],
  },
  {
    title: 'TOKENIZATION',
    key: 'tokenization',
    items: [
      {
        span: 3,
        fields: [
          {
            id: 'tokenization.anvato',
            type: 'switch',
            title: 'Anvato',
          },
        ],
      },
      {
        span: 3,
        fields: [
          {
            id: 'tokenization.akamaiHls',
            type: 'switch',
            title: 'Akamai HLS',
          },
        ],
      },
      {
        span: 3,
        fields: [
          {
            id: 'tokenization.akamaiMp4',
            type: 'switch',
            title: 'Akamai MP4',
          },
        ],
      },
      {
        span: 3,
        fields: [
          {
            id: 'tokenization.cloudfront',
            type: 'switch',
            title: 'Cloudfront',
          },
        ],
      },
      {
        span: 3,
        fields: [
          {
            id: 'tokenization.anvatoApiKey',
            type: 'text',
            title: 'Anvato Api Key',
          },
        ],
      },
      {
        span: 3,
        fields: [
          {
            id: 'tokenization.akamaiHlsApiKey',
            type: 'switch',
            title: 'HLS Akamai Api Key',
          },
        ],
      },
      {
        span: 3,
        fields: [
          {
            id: 'tokenization.akamaiMp4ApiKey',
            type: 'switch',
            title: 'MP4 Akamai Api Key',
          },
        ],
      },
      {
        span: 3,
        fields: [
          {
            id: 'tokenization.cloudfrontApiKey',
            type: 'switch',
            title: 'Cloudfront Api Key',
          },
        ],
      },
    ],
  },
  {
    title: 'GEO RESTRICT',
    key: 'geoRestrict',
    items: [
      {
        span: 4,
        fields: [
          {
            id: 'emailConsent.defaultChecked',
            type: 'switch',
            title: 'Default Message Checked State',
          },
        ],
      },
    ],
  },
  {
    title: 'RECOMMENDATION',
    key: 'recommendation',
    items: [
      {
        span: 6,
        fields: [
          {
            id: 'recommendation.isRecommendation',
            type: 'switch',
            title: 'Enable Recommendation',
          },
        ],
      },
      {
        span: 6,
        fields: [
          {
            id: 'recommendation.isRecommendationAutoPlay',
            type: 'switch',
            title: 'Enable Recommendation AutoPlay',
          },
        ],
      },
      {
        span: 6,
        fields: [
          {
            id: 'recommendation.isPersonalization',
            type: 'switch',
            title: 'Enable Personalization',
          },
        ],
      },
      {
        span: 6,
        fields: [
          {
            id: 'recommendation.isSubscribed',
            type: 'switch',
            title: 'Enable Only for Subscribed',
          },
        ],
      },
      {
        span: 6,
        fields: [
          {
            id: 'recommendation.showPersonalizationForLoggedIn',
            type: 'switch',
            title: 'Show Personalization for Logged-in Users',
          },
        ],
      },
      {
        span: 6,
        fields: [
          {
            id: 'recommendation.disablePesonalizationSkip',
            type: 'switch',
            title: 'Disable skip on personalization screen',
          },
        ],
      },
      {
        span: 12,
        fields: [
          {
            id: 'recommendation.recommendCategories',
            type: 'asyncAutocomplete',
            title: 'Personalization Categories',
            url: CATEGORY_LIST,
            objKey: 'metadataList',
            valueKey: 'imgUrl',
            labelKey: 'title',
          },
        ],
      },
    ],
  },
  {
    title: 'TVE SETTINGS',
    key: 'tveSettings',
    items: [],
  },
  {
    title: 'DRM SETTINGS',
    key: 'drm',
    items: [
      {
        key: 'drm.widevineLicUrl',
        span: 6,
        fields: [
          {
            id: 'drm.widevineLicUrl',
            type: 'text',
            title: 'Widevine License URL',
          },
        ],
      },
      {
        key: 'drm.playReadyLicUrl',
        span: 6,
        fields: [
          {
            id: 'drm.playReadyLicUrl',
            type: 'text',
            title: 'PlayReady License URL',
          },
        ],
      },
      {
        key: 'drm.fairPlayLicUrl',
        span: 6,
        fields: [
          {
            id: 'drm.fairPlayLicUrl',
            type: 'text',
            title: 'FairPlay License URL',
          },
        ],
      },
      {
        key: 'drm.fairPlayCertUrl',
        span: 6,
        fields: [
          {
            id: 'drm.fairPlayCertUrl',
            type: 'text',
            title: 'FairPlay Cert URL',
          },
        ],
      },
      {
        key: 'drm.communicationKeyId',
        span: 6,
        fields: [
          {
            id: 'drm.communicationKeyId',
            type: 'text',
            title: 'Communication Key ID',
          },
        ],
      },
      {
        key: 'drm.communicationKey',
        span: 6,
        fields: [
          {
            id: 'drm.communicationKey',
            type: 'text',
            title: 'Communication Key',
          },
        ],
      },
      {
        key: 'drm.tenantId',
        span: 6,
        fields: [
          {
            id: 'drm.tenantId',
            type: 'text',
            title: 'Tenant ID',
          },
        ],
      },
      {
        key: 'drm.managementKey',
        span: 6,
        fields: [
          {
            id: 'drm.managementKey',
            type: 'text',
            title: 'Management Key',
          },
        ],
      },
      {
        key: 'drm.isDrmForVod',
        span: 6,
        fields: [
          {
            id: 'drm.isDrmForVod',
            type: 'switch',
            title: 'DRM for Video on Demand',
          },
        ],
      },
      {
        key: 'drm.isDrmForAudio',
        span: 6,
        fields: [
          {
            id: 'drm.isDrmForAudio',
            type: 'switch',
            title: 'DRM for Audio',
          },
        ],
      },
      {
        key: 'drm.divider',
        span: 12,
        fields: [
          {
            id: 'drm.divider',
            type: 'divider',
            title: 'Download Rules',
          },
        ],
      },
      {
        key: 'drm.daysToPlay',
        span: 6,
        fields: [
          {
            id: 'drm.daysToPlay',
            type: 'text',
            title: 'Days to Play',
          },
        ],
      },
      {
        key: 'drm.hoursToFinish',
        span: 6,
        fields: [
          {
            id: 'drm.hoursToFinish',
            type: 'text',
            title: 'Hours to Finish',
          },
        ],
      },
      {
        key: 'drm.deviceLimit',
        span: 6,
        fields: [
          {
            id: 'drm.deviceLimit',
            type: 'text',
            title: 'Device Limit Assosciated to One User Account',
          },
        ],
      },
    ],
  },
  {
    title: 'COMPLIANCE',
    key: 'compliance',
    items: [
      {
        key: 'compliance.gdpr',
        fields: [
          {
            id: 'compliance.gdpr',
            type: 'switch',
            title: 'GDPR',
          },
        ],
      },
      {
        key: 'compliance.coppa',
        fields: [
          {
            id: 'compliance.coppa',
            type: 'switch',
            title: 'Coppa',
          },
        ],
      },
      {
        key: 'compliance.euPortability',
        fields: [
          {
            id: 'compliance.euPortability',
            type: 'switch',
            title: 'EU Cross Border Portability',
          },
        ],
      },
      {
        key: 'compliance.dcCompliance',
        fields: [
          {
            id: 'compliance.dcCompliance',
            type: 'switch',
            title: 'DC Compliance',
          },
        ],
      },
    ],
  },
  {
    title: 'EMBED PLAYER',
    key: 'embedPlayer',
    items: [],
  },
  {
    title: 'SMART HUB PREVIEW',
    key: 'edne',
    items: [
      {
        key: 'edne.enableEdne',
        span: 12,
        fields: [
          {
            id: 'edne.enableEdne',
            type: 'switch',
            title: 'Enable Smart Hub Preview',
          },
        ],
      },
      {
        key: 'edne',
        show: 'edne.enableEdne',
        span: 12,
        fields: [
          {
            id: 'edne',
            type: 'smartHubPreview',
            span: 12,
          },
        ],
      },
    ],
  },
  {
    title: 'SEARCH CONFIG',
    key: 'searchConfig',
    items: [
      {
        key: 'searchConfig.isEnabled',
        fields: [
          {
            id: 'searchConfig.isEnabled',
            type: 'switch',
            title: 'Enable Search Config',
          },
        ],
      },
      {
        key: 'searchConfig.config',
        span: 12,
        show: 'searchConfig.isEnabled',
        fields: [
          {
            id: 'searchConfig.config',
            type: 'configTable',
          },
        ],
      },
    ],
  },
  {
    title: 'VIDEO PLAYBACK & DOWNLOAD QUALITY',
    key: 'videoPlaybackAndQuality',
    items: [
      {
        key: 'videoPlaybackAndDownloadQuality',
        span: 12,
        fields: [
          {
            id: 'videoPlaybackQualityTitle',
            title: 'Video Playback Quality',
          },
          {
            id: 'videoQuality.playbackData',
            type: 'array',
            span: 12,
            addButtonText: 'Add more Playback Quality',
            defaultItem: {
              resolutionKey: '',
              resolutionValue: '',
            },
            items: [
              {
                id: 'resolutionKey',
                label: 'Enter Resolution Key. Eg. 1080/720/480/360/270',
                type: 'text',
              },
              {
                id: 'resolutionValue',
                label: 'Enter Resolution Value. Eg. Best/High/Medium/Low/VeryLow',
                type: 'text',
              },
            ],
          },
          {
            id: 'videoDownloadQualityTitle',
            title: 'Video Download Quality',
          },
          {
            id: 'downloadQuality.downloadQualityData',
            type: 'array',
            addButtonText: 'Add more Download Quality',
            defaultItem: {
              resolutionKey: '',
              resolutionValue: '',
            },
            items: [
              {
                id: 'resolutionKey',
                label: 'Enter Resolution Key. Eg. 1080/720/480/360/270',
                type: 'text',
              },
              {
                id: 'resolutionValue',
                label: 'Enter Resolution Value. Eg. Best/High/Medium/Low/VeryLow',
                type: 'text',
              },
            ],
          },
        ],
      },
      // {
      //   title: 'Video Playback Quality',
      // },
      // {
      //   type: 'text',
      // },
    ],
  },
  {
    title: 'CONTENT FILTER',
    key: 'contentFilter',
    items: [
      {
        key: 'contentFilter',
        fields: [
          {
            id: 'contentFilter.enable',
            type: 'switch',
            title: 'Enable Content Filters',
          },
        ],
      },
      {
        key: 'icon',
        fields: [
          {
            id: 'contentFilter.icon',
            type: 'select',
            title: 'Choose Icon',
            options: [
              {
                label: 'Term Conditions',
                value: 'icon-termconditions',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 84.0105 107.243'><title>Terms Conditions</title><path d='M24.8287,3.6H68.4373v52.12a1.8,1.8,0,1,0,3.6005,0V1.8a1.8,1.8,0,0,0-1.8-1.8H24.8287a1.8,1.8,0,0,0,0,3.6ZM12.1527,33.561H50.2575a1.8,1.8,0,0,0,0-3.6005H12.1527a1.8,1.8,0,0,0,0,3.6005Zm0,9.0827H50.2575a1.8,1.8,0,0,0,0-3.6H12.1527a1.8,1.8,0,1,0,0,3.6Zm0,9.0815H50.2575a1.8,1.8,0,0,0,0-3.6H12.1527a1.8,1.8,0,0,0,0,3.6Zm27.0034,5.4811H12.1527a1.8,1.8,0,0,0,0,3.6005H39.1561a1.8,1.8,0,0,0,0-3.6005Zm-7.4505,9.0816H12.1527a1.8,1.8,0,1,0,0,3.6H31.7056a1.8,1.8,0,0,0,0-3.6ZM68.975,72.9367l-12.47,14.6958-7.9677-6.3392A1.8,1.8,0,1,0,46.297,84.11l9.3311,7.4265a1.8018,1.8018,0,0,0,2.494-.2436L71.72,75.2662a1.8,1.8,0,1,0-2.7447-2.3295Zm-5.5639-15.52v-46.99a1.8009,1.8009,0,0,0-1.8-1.8H16.9041a1.8044,1.8044,0,0,0-1.1689.4308L.6313,21.96A1.7979,1.7979,0,0,0,0,23.33V91.7442a1.8,1.8,0,0,0,1.8,1.8H35.97a1.7953,1.7953,0,0,0,.5221-.0852A25.1123,25.1123,0,1,0,63.4111,57.4164ZM33.7554,82.1142a24.9629,24.9629,0,0,0,1.2662,7.8286H3.6V24.159L17.5678,12.2271H59.8107V57.0335c-.3109-.012-.6145-.0468-.9266-.0468A25.1565,25.1565,0,0,0,33.7554,82.1142Zm25.1275,21.5283A21.5283,21.5283,0,1,1,80.41,82.1142,21.5527,21.5527,0,0,1,58.8829,103.6425Z'/></svg>",
              },
              {
                label: 'Settings',
                value: 'icon-settings',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 109.3533 109.3526'><title>Settings</title><path d='M103.7527,43.1926,96.077,41.89a43.3218,43.3218,0,0,0-3.0839-7.4451l4.5234-6.326a6.7376,6.7376,0,0,0-.73-8.7051L89.9774,12.605a6.7079,6.7079,0,0,0-4.7754-1.9862,6.6389,6.6389,0,0,0-3.9041,1.2557l-6.3516,4.5234a42.8073,42.8073,0,0,0-7.7227-3.1736L65.9465,5.6426A6.7463,6.7463,0,0,0,59.2745,0H49.66a6.7529,6.7529,0,0,0-6.672,5.6426L41.6634,13.408A42.0222,42.0222,0,0,0,34.24,16.539l-6.2833-4.5234a6.7525,6.7525,0,0,0-8.7052.73l-6.83,6.8087a6.7675,6.7675,0,0,0-.73,8.7051l4.57,6.42a42.41,42.41,0,0,0-3.037,7.4707L5.6426,43.4276A6.7461,6.7461,0,0,0,0,50.1v9.6149a6.7529,6.7529,0,0,0,5.6426,6.672l7.7654,1.3241a42.0222,42.0222,0,0,0,3.131,7.4237L12.0369,81.392a6.7378,6.7378,0,0,0,.73,8.7051l6.8087,6.8087a6.7085,6.7085,0,0,0,4.7754,1.9862,6.6381,6.6381,0,0,0,3.9041-1.2558l6.42-4.57a43.4049,43.4049,0,0,0,7.2187,2.9686l1.2772,7.6756a6.7462,6.7462,0,0,0,6.672,5.6426h9.6406a6.753,6.753,0,0,0,6.672-5.6426l1.3027-7.6756a43.3269,43.3269,0,0,0,7.4451-3.084l6.326,4.5234a6.7525,6.7525,0,0,0,8.7052-.73l6.8087-6.8087a6.7675,6.7675,0,0,0,.73-8.7051L92.9506,74.878a43.1751,43.1751,0,0,0,3.0839-7.445l7.6757-1.2772a6.7463,6.7463,0,0,0,5.6426-6.672v-9.615a6.6752,6.6752,0,0,0-5.6-6.6762ZM103.2273,59.48a.59.59,0,0,1-.504.5937L93.13,61.6712a3.0757,3.0757,0,0,0-2.4689,2.26,36.458,36.458,0,0,1-3.9766,9.5722,3.0891,3.0891,0,0,0,.1366,3.3574l5.6426,7.949a.6265.6265,0,0,1-.0683.7774l-6.8087,6.8087a.5881.5881,0,0,1-.4357.1836.5568.5568,0,0,1-.3417-.1153l-7.9277-5.6426a3.0874,3.0874,0,0,0-3.3573-.1367,36.7489,36.7489,0,0,1-9.5722,3.9767,3.0257,3.0257,0,0,0-2.26,2.4689l-1.6232,9.5935a.5935.5935,0,0,1-.5937.504H49.86a.59.59,0,0,1-.5937-.504L47.6692,93.13A3.0757,3.0757,0,0,0,45.41,90.6611a38.1076,38.1076,0,0,1-9.3672-3.8357,3.17,3.17,0,0,0-1.5548-.41,3.0093,3.0093,0,0,0-1.7812.5724L24.71,92.6772a.6807.6807,0,0,1-.3417.1153.6126.6126,0,0,1-.4357-.1836L17.1244,85.8a.6234.6234,0,0,1-.0684-.7774l5.6212-7.8807a3.1252,3.1252,0,0,0,.1367-3.3786,36.1959,36.1959,0,0,1-4.02-9.5467,3.1211,3.1211,0,0,0-2.4688-2.26L6.6637,60.3128a.5935.5935,0,0,1-.504-.5937v-9.615a.59.59,0,0,1,.504-.5937l9.5252-1.5975a3.0949,3.0949,0,0,0,2.49-2.2852,36.6253,36.6253,0,0,1,3.904-9.5935,3.0609,3.0609,0,0,0-.158-3.336l-5.6895-7.9961a.6266.6266,0,0,1,.0683-.7774l6.8087-6.8086a.588.588,0,0,1,.4357-.1837.5574.5574,0,0,1,.3417.1153l7.8807,5.6212a3.1253,3.1253,0,0,0,3.3787.1367,36.1939,36.1939,0,0,1,9.5466-4.0195,3.1211,3.1211,0,0,0,2.26-2.4688L49.1,6.6554a.5935.5935,0,0,1,.5938-.504h9.6149a.59.59,0,0,1,.5938.504L61.5,16.1806a3.0949,3.0949,0,0,0,2.2852,2.49A37.0387,37.0387,0,0,1,73.5836,22.69a3.0887,3.0887,0,0,0,3.3573-.1367L84.8217,16.89a.68.68,0,0,1,.3417-.1153.6125.6125,0,0,1,.4357.1837l6.8086,6.8086a.6234.6234,0,0,1,.0684.7774l-5.6426,7.9277a3.0871,3.0871,0,0,0-.1367,3.3574,36.7475,36.7475,0,0,1,3.9767,9.5722,3.0255,3.0255,0,0,0,2.4688,2.26l9.5936,1.6232a.5935.5935,0,0,1,.504.5937v9.615Z'/><path className='a' d='M54.6872,31.0615A23.5951,23.5951,0,1,0,78.2823,54.6566,23.6107,23.6107,0,0,0,54.6872,31.0615Zm0,41.0274A17.4279,17.4279,0,1,1,72.1151,54.661,17.4406,17.4406,0,0,1,54.6872,72.0889Z'/></svg>",
              },
              {
                label: 'Policy',
                value: 'icon-ppolicy',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 91.3945 114.2389'><title>Privacy Policy</title><path d='M31.3376.0036a3.8174,3.8174,0,0,0-3.0147,2.1023c-.5454,1.0909-.9173,2.1619-1.5471,3.61a33.6954,33.6954,0,0,1-2.38,4.6014c-1.8991,2.9851-3.9965,4.9188-6.6246,4.9188H3.8081A3.8092,3.8092,0,0,0,0,19.0441v38.081c0,17.0223,7.9435,30.1221,17.3345,39.35a84.47,84.47,0,0,0,26.9347,17.4932v-.005a3.8421,3.8421,0,0,0,2.8561,0A84.4889,84.4889,0,0,0,74.06,96.4706c9.392-9.2274,17.3345-22.3231,17.3345-39.3453V19.0442a3.8092,3.8092,0,0,0-3.8081-3.8081H73.6233c-2.6279,0-4.7255-1.9337-6.6246-4.9188a33.6889,33.6889,0,0,1-2.38-4.6014c-.63-1.4479-1.0016-2.519-1.5471-3.61A3.8145,3.8145,0,0,0,59.66.0037H31.7341c-.1339-.0049-.2628-.0049-.3967,0ZM34.2333,7.62H57.1606c.2033.481.2232.57.4761,1.15a41.1907,41.1907,0,0,0,2.9354,5.6328c2.5437,3.9965,6.7931,8.4492,13.05,8.4492h10.155V57.1251c0,14.6866-6.6543,25.6844-15.0344,33.9162a75.9124,75.9124,0,0,1-23.0466,15.1131A75.9067,75.9067,0,0,1,22.65,91.0413C14.27,82.8053,7.6153,71.8079,7.6153,57.1251V22.8522H17.77c6.2576,0,10.5069-4.4527,13.05-8.4492A41.1907,41.1907,0,0,0,33.756,8.77c.2529-.58.2728-.6694.4761-1.15ZM45.6972,36.8153a14.022,14.022,0,0,0-13.963,13.963,13.034,13.034,0,0,0,3.8081,8.846V69.8188a7.6827,7.6827,0,0,0,7.6162,7.6162H48.236a7.6827,7.6827,0,0,0,7.6162-7.6162V59.6243a13.0344,13.0344,0,0,0,3.8081-8.846A14.022,14.022,0,0,0,45.6972,36.8153Zm0,7.6162a6.29,6.29,0,0,1,6.3469,6.3468,5.4455,5.4455,0,0,1-2.38,4.6411,3.8022,3.8022,0,0,0-1.428,2.9751V69.8188H43.1585V58.3945a3.8024,3.8024,0,0,0-1.428-2.9751,5.452,5.452,0,0,1-2.38-4.6411A6.29,6.29,0,0,1,45.6972,44.4315Z'/></svg>",
              },
              {
                label: 'Parental Control',
                value: 'icon-parental_control',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 102'><title>Parental Control</title><path d='M51,0a51,51,0,0,0,0,102,50.53,50.53,0,0,0,30-9.8437V99a3.1181,3.1181,0,0,0,3,3h33a3.118,3.118,0,0,0,3-3V75a3.1127,3.1127,0,0,0-2.7187-3H92.9993V67.5a7.2273,7.2273,0,0,1,2.1093-5.5782A7.6965,7.6965,0,0,1,100.4993,60c3.75,0,6.3457,1.7637,7.2187,5.25a3.0015,3.0015,0,1,0,5.8125-1.5,12.9849,12.9849,0,0,0-11.625-9.6562c.0645-1.0313.0938-2.0508.0938-3.0938a51.0455,51.0455,0,0,0-51-51Zm0,6A44.9512,44.9512,0,0,1,96,51c0,1.26-.0879,2.5137-.1875,3.75a12.6951,12.6951,0,0,0-4.8282,2.8125A13.4832,13.4832,0,0,0,87,67.5V72H85.5c0-6.5274-4.4532-11.9766-10.7343-15.516S60.1641,51,51,51s-17.484,1.9454-23.766,5.4843S16.4994,65.4723,16.4994,72v7.9218A45.0216,45.0216,0,0,1,50.9994,6Zm0,6A18,18,0,1,0,69,30,18.0423,18.0423,0,0,0,51,12Zm0,6A12,12,0,1,1,39,30,11.9559,11.9559,0,0,1,51,18Zm0,39c8.2851,0,15.7035,1.8575,20.8125,4.7343S79.5,68.1855,79.5,72V85.8282a45.0125,45.0125,0,0,1-57,0V72c0-3.8145,2.5782-7.3887,7.6875-10.2657S42.7149,57,51,57ZM87,78h27V96H87Z'/></svg>",
              },
              {
                label: 'Logout',
                value: 'icon-logout',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 102.4097 117.2105'><title>Logout</title><path d='M53.6392,66.0574V92.1885l2.7535-2.7535H39.57c-3.5494,0-3.5494,5.507,0,5.507H56.3927a2.8016,2.8016,0,0,0,2.7535-2.7535V66.0574c0-3.5548-5.507-3.5548-5.507,0Z'/><path className='a' d='M5.507,92.1563V2.7535L2.7535,5.507h54.02L54.02,2.7535V28.8846c0,3.5493,5.507,3.5493,5.507,0V2.7535A2.8015,2.8015,0,0,0,56.7739,0H2.7535A2.8015,2.8015,0,0,0,0,2.7535V92.1563C0,95.711,5.507,95.711,5.507,92.1563Z'/><path className='a' d='M1.4635,5.1738q16.11,8.01,32.213,16.0266c1.4842.7422,3.0008,1.4843,4.4905,2.2319-.4679-.796-.9089-1.5973-1.3768-2.3664V114.437c1.3768-.7959,2.7535-1.5973,4.13-2.3663q-16.11-9.7449-32.213-19.4685c-1.5435-.9357-3.0816-1.8715-4.5981-2.78-3.0277-1.8446-5.8082,2.92-2.78,4.7647q16.11,9.7449,32.213,19.4685c1.5435.9358,3.0815,1.8716,4.598,2.78a2.7669,2.7669,0,0,0,4.13-2.3664V21.098a2.7075,2.7075,0,0,0-1.3767-2.3663q-16.11-8.01-32.213-16.0267C7.1964,1.9629,5.68,1.2208,4.19.4732c-3.1138-1.63-5.8941,3.103-2.7266,4.7Z'/><path className='a' d='M76.851,37.5547q9.3738,5.8646,18.7526,11.7292c.882.5485,1.7909,1.1293,2.6728,1.678.4679-1.7049.9358-3.415,1.3768-5.12H56.8071c-3.5494,0-3.5494,5.507,0,5.507H99.6532a2.7669,2.7669,0,0,0,1.3767-5.12Q91.6561,40.3647,82.2773,34.5c-.8819-.5485-1.7908-1.1293-2.6728-1.6779-2.974-1.9306-5.7544,2.8341-2.7535,4.7325Z'/><path className='a' d='M98.27,46.202c-6.2492,4.4045-12.4982,8.7821-18.78,13.1866-.882.6346-1.7639,1.2369-2.6728,1.8716a2.8265,2.8265,0,0,0-.99,3.77,2.7769,2.7769,0,0,0,3.77.9895c6.2492-4.4045,12.4982-8.7821,18.78-13.1865.8819-.6346,1.7638-1.237,2.6728-1.8716a2.8266,2.8266,0,0,0,.99-3.77A2.768,2.768,0,0,0,98.27,46.202Z'/></svg>",
              },
              {
                label: 'Language',
                value: 'icon-lang1',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110.4661 100.4298'><title>Language</title><path className='a' d='M90.384,57.7469V12.5549A12.5728,12.5728,0,0,0,77.8291,0H12.55A12.5657,12.5657,0,0,0,0,12.5549v45.192a12.5659,12.5659,0,0,0,12.55,12.555H30.128v12.55a2.51,2.51,0,0,0,4.0155,2.01l19.4132-14.56H77.8291A12.5729,12.5729,0,0,0,90.384,57.7469Zm-37.66,7.532a2.48,2.48,0,0,0-1.5064.5037L35.1461,77.8338V67.7881a2.5074,2.5074,0,0,0-2.5091-2.5092H12.55a7.542,7.542,0,0,1-7.532-7.532V12.5549a7.542,7.542,0,0,1,7.532-7.532H77.829a7.542,7.542,0,0,1,7.532,7.532v45.192a7.542,7.542,0,0,1-7.532,7.532Z'/><path className='a' d='M97.916,15.064a2.5114,2.5114,0,1,0,0,5.0228,7.542,7.542,0,0,1,7.532,7.532v45.192a7.542,7.542,0,0,1-7.532,7.532H77.8291A2.5074,2.5074,0,0,0,75.32,82.852V92.893L59.2484,80.8465A2.5087,2.5087,0,0,0,56.24,84.8621l20.0869,15.064h-.0047a2.5078,2.5078,0,0,0,4.0156-2.01v-12.55H97.916a12.5657,12.5657,0,0,0,12.55-12.5549V27.6189a12.5659,12.5659,0,0,0-12.55-12.555Z'/><path className='a' d='M20.3138,34.8976H42.4125A11.1261,11.1261,0,0,1,38.62,31.1705a9.6769,9.6769,0,0,1-1.2467-4.9866,7.722,7.722,0,0,1,2.31-5.4722,8.6735,8.6735,0,0,1,2.73-1.7978,9.1585,9.1585,0,0,1,3.6219-.6823,8.7217,8.7217,0,0,1,2.7951.4725,11.4191,11.4191,0,0,1,2.7164,1.3516,12.5544,12.5544,0,0,1,2.4408,2.1652,14.44,14.44,0,0,1,1.9685,2.9132,16.442,16.442,0,0,1,1.3255,3.5827,17.2265,17.2265,0,0,1,.4855,4.16,16.3108,16.3108,0,0,1-1.1154,6.2991,14.8,14.8,0,0,1-2.9658,4.6059,16.2534,16.2534,0,0,1-4.2387,3.1759,26.0347,26.0347,0,0,1-4.921,1.9684,30.5733,30.5733,0,0,1-5.026.9972,41.85,41.85,0,0,1-4.5668.2757q-2.0735,0-4.5667-.2494a32.2171,32.2171,0,0,1-5.026-.9187,26.143,26.143,0,0,1-4.9211-1.85A15.513,15.513,0,0,1,16.18,44.11a14.2663,14.2663,0,0,1-2.9658-4.58,16.5494,16.5494,0,0,1-1.1155-6.3645,15.6379,15.6379,0,0,1,.4856-3.9106,15.9631,15.9631,0,0,1,1.3648-3.5431A15.27,15.27,0,0,1,16.062,22.68a14.3164,14.3164,0,0,1,2.7033-2.362,12.8754,12.8754,0,0,1,3.1364-1.5353,10.9191,10.9191,0,0,1,3.4512-.5512,7.8944,7.8944,0,0,1,3.2808.63,6.9452,6.9452,0,0,1,2.31,1.64,6.77,6.77,0,0,1,1.3779,2.2965,7.61,7.61,0,0,1,.4594,2.5721,6.36,6.36,0,0,1-.5119,2.48A6.9989,6.9989,0,0,1,30.812,30.042a7.2355,7.2355,0,0,1-2.27,1.5617,7.1119,7.1119,0,0,1-2.9264.5905,7.3272,7.3272,0,0,1-2.782-.5118,6.7113,6.7113,0,0,1-2.1784-1.404,6.4947,6.4947,0,0,1-1.43-2.0471,6.02,6.02,0,0,1-.5117-2.4673,5.7254,5.7254,0,0,1,.0524-.761q.0524-.3936.105-.7349a10.5356,10.5356,0,0,0-2.5458,3.635,12.8147,12.8147,0,0,0-.8661,4.9734,12.5327,12.5327,0,0,0,.8661,4.8556A11.4808,11.4808,0,0,0,18.66,41.3275a12.8706,12.8706,0,0,0,3.4118,2.52A21.1308,21.1308,0,0,0,26.18,45.4351a27.7521,27.7521,0,0,0,4.4224.8267,41.66,41.66,0,0,0,4.33.2361,41.2954,41.2954,0,0,0,4.3174-.2361,27.4442,27.4442,0,0,0,4.3962-.8267,20.5719,20.5719,0,0,0,4.068-1.5879,12.6248,12.6248,0,0,0,3.3595-2.52A11.5183,11.5183,0,0,0,53.37,37.7188a12.7318,12.7318,0,0,0,.853-4.8423,14.3064,14.3064,0,0,0-.7611-4.8816,11.4769,11.4769,0,0,0-1.9553-3.5168,8.1283,8.1283,0,0,0-2.6509-2.1258,6.4337,6.4337,0,0,0-2.8213-.7089,6.52,6.52,0,0,0-2.0735.3151,4.5311,4.5311,0,0,0-1.6271.9317,4.3032,4.3032,0,0,0-1.063,1.4829,4.8453,4.8453,0,0,0-.3806,1.9684,7.307,7.307,0,0,0,1.9816,5.0521,15.1849,15.1849,0,0,0,6.2333,3.7138v2.9658H20.3138Zm5.2491-6.0627a3.5986,3.5986,0,0,0,1.4173-.2888,3.6766,3.6766,0,0,0,1.181-.7873,3.8611,3.8611,0,0,0,.8-1.1811,3.5954,3.5954,0,0,0,.302-1.47,3.4406,3.4406,0,0,0-.315-1.4829,3.3747,3.3747,0,0,0-.8923-1.1548,4.3417,4.3417,0,0,0-1.3517-.7612,5.0144,5.0144,0,0,0-1.6929-.2755,7.8914,7.8914,0,0,0-1.0891.0787,5.5917,5.5917,0,0,0-1.1418.2888,6.8528,6.8528,0,0,0-.84,3.1493,4.0457,4.0457,0,0,0,.3018,1.6009,3.9323,3.9323,0,0,0,.8,1.22,3.52,3.52,0,0,0,2.52,1.0631Z'/><path className='a' d='M34.9325,50.4505c-1.3818,0-2.9266-.0843-4.5917-.2506a32.6132,32.6132,0,0,1-5.0653-.9258,26.5048,26.5048,0,0,1-4.9684-1.8678A15.8357,15.8357,0,0,1,16,44.2857a14.5829,14.5829,0,0,1-3.0186-4.66,16.8745,16.8745,0,0,1-1.1346-6.4609,15.9612,15.9612,0,0,1,.4935-3.9733,16.2875,16.2875,0,0,1,1.3864-3.5987,15.6,15.6,0,0,1,2.1473-3.0812,14.6353,14.6353,0,0,1,2.7509-2.4033,13.19,13.19,0,0,1,3.1974-1.565,11.2141,11.2141,0,0,1,3.53-.564,8.179,8.179,0,0,1,3.3847.6523,7.23,7.23,0,0,1,2.392,1.7,7.057,7.057,0,0,1,1.4288,2.3812,7.9,7.9,0,0,1,.4739,2.6569,6.6407,6.6407,0,0,1-.5314,2.5774,7.2823,7.2823,0,0,1-1.5083,2.27,7.5168,7.5168,0,0,1-2.3482,1.6159,7.3922,7.3922,0,0,1-3.029.6125,7.6094,7.6094,0,0,1-2.8769-.53,6.9907,6.9907,0,0,1-2.259-1.4569,6.7742,6.7742,0,0,1-1.4852-2.1256,6.2984,6.2984,0,0,1-.5333-2.5693,6.0047,6.0047,0,0,1,.0529-.7819,10.2476,10.2476,0,0,0-1.9573,3.0187,12.6274,12.6274,0,0,0-.8463,4.8757,12.3392,12.3392,0,0,0,.8466,4.7584,11.2822,11.2822,0,0,0,2.2846,3.5175,12.6742,12.6742,0,0,0,3.3457,2.4707,20.9663,20.9663,0,0,0,4.0588,1.569,27.6483,27.6483,0,0,0,4.3823.8193,41.6178,41.6178,0,0,0,4.3042.2347,41.2488,41.2488,0,0,0,4.2911-.2347,27.3185,27.3185,0,0,0,4.3559-.8193,20.409,20.409,0,0,0,4.0182-1.5683,12.4191,12.4191,0,0,0,3.2931-2.47,11.3138,11.3138,0,0,0,2.246-3.5308,12.5379,12.5379,0,0,0,.8343-4.7468,14.1252,14.1252,0,0,0-.746-4.7958,11.2752,11.2752,0,0,0-1.9111-3.44,7.9189,7.9189,0,0,0-2.5685-2.0617,6.2132,6.2132,0,0,0-2.7111-.6835,6.3009,6.3009,0,0,0-1.9938.302,4.3037,4.3037,0,0,0-1.538.88,4.0756,4.0756,0,0,0-1.0012,1.3973,4.62,4.62,0,0,0-.3593,1.8671,7.0938,7.0938,0,0,0,1.9165,4.8831A15.0167,15.0167,0,0,0,49.19,34.87l.167.06v3.395H20.062V34.6457h21.52a10.9466,10.9466,0,0,1-3.1789-3.3478,9.9684,9.9684,0,0,1-1.2812-5.114,7.9736,7.9736,0,0,1,2.3844-5.6513,8.9627,8.9627,0,0,1,2.8078-1.85,9.449,9.449,0,0,1,3.7207-.7025,9.0125,9.0125,0,0,1,2.8754.4855,11.7245,11.7245,0,0,1,2.7763,1.3811,12.8762,12.8762,0,0,1,2.49,2.2082,14.7557,14.7557,0,0,1,2.003,2.9639,16.7811,16.7811,0,0,1,1.3462,3.6375,17.5572,17.5572,0,0,1,.4929,4.2205,16.6322,16.6322,0,0,1-1.1349,6.396,15.1189,15.1189,0,0,1-3.0165,4.6834,16.5728,16.5728,0,0,1-4.3038,3.2248,26.4215,26.4215,0,0,1-4.9686,1.9874,30.9949,30.9949,0,0,1-5.0673,1.0052A42.286,42.286,0,0,1,34.9325,50.4505Zm-9.58-31.967a10.7233,10.7233,0,0,0-3.3722.5384,12.6768,12.6768,0,0,0-3.0752,1.5056A14.1189,14.1189,0,0,0,16.25,22.8481a15.08,15.08,0,0,0-2.078,2.9818,15.7861,15.7861,0,0,0-1.3432,3.4875,15.4577,15.4577,0,0,0-.4777,3.8479,16.3774,16.3774,0,0,0,1.0963,6.2681,14.0846,14.0846,0,0,0,2.913,4.5,15.3351,15.3351,0,0,0,4.17,3.0212,26.0061,26.0061,0,0,0,4.8738,1.8324,32.1149,32.1149,0,0,0,4.9867.9115c1.6485.1648,3.1765.2482,4.5416.2482a41.7747,41.7747,0,0,0,4.5391-.2742,30.47,30.47,0,0,0,4.9847-.9891,25.8841,25.8841,0,0,0,4.8734-1.95,16.0682,16.0682,0,0,0,4.1735-3.1269,14.6143,14.6143,0,0,0,2.9151-4.5284,16.1376,16.1376,0,0,0,1.096-6.2022,17.05,17.05,0,0,0-.4781-4.099,16.2607,16.2607,0,0,0-1.3048-3.528,14.2682,14.2682,0,0,0-1.934-2.8626,12.3654,12.3654,0,0,0-2.3917-2.1219,11.2036,11.2036,0,0,0-2.6565-1.322,8.5041,8.5041,0,0,0-2.7148-.46,8.9532,8.9532,0,0,0-3.5232.6621A8.4613,8.4613,0,0,0,39.86,20.8907a7.4707,7.4707,0,0,0-2.2349,5.2932,9.4735,9.4735,0,0,0,1.2121,4.8592,10.9284,10.9284,0,0,0,3.7092,3.6412l.74.4652h-22.72v2.6718H48.8533V35.2842a15.3031,15.3031,0,0,1-6.1683-3.7216,7.5829,7.5829,0,0,1-2.0466-5.2211,5.1154,5.1154,0,0,1,.4019-2.07,4.5762,4.5762,0,0,1,1.1246-1.5686,4.804,4.804,0,0,1,1.7163-.9836,6.8042,6.8042,0,0,1,2.1532-.3281,6.7112,6.7112,0,0,1,2.9315.7342,8.4205,8.4205,0,0,1,2.7333,2.19,11.7783,11.7783,0,0,1,1.9994,3.5932,14.6185,14.6185,0,0,1,.7763,4.9675,13.0406,13.0406,0,0,1-.8717,4.9375,11.8207,11.8207,0,0,1-2.3469,3.6869,12.93,12.93,0,0,1-3.4259,2.57,20.9109,20.9109,0,0,1-4.1176,1.6074,27.8216,27.8216,0,0,1-4.4366.8343,41.732,41.732,0,0,1-4.3437.2376,42.1,42.1,0,0,1-4.3566-.2376,28.149,28.149,0,0,1-4.4625-.8341,21.4981,21.4981,0,0,1-4.1563-1.6068,13.1846,13.1846,0,0,1-3.478-2.5689,11.791,11.791,0,0,1-2.3871-3.6732,12.84,12.84,0,0,1-.8854-4.9527,13.1212,13.1212,0,0,1,.8857-5.071,10.8342,10.8342,0,0,1,2.6057-3.7212l.5332-.5-.112.7222q-.0525.3387-.1043.73a5.5076,5.5076,0,0,0-.05.7278,5.8009,5.8009,0,0,0,.49,2.3652A6.2778,6.2778,0,0,0,20.83,30.0976a6.4862,6.4862,0,0,0,2.0978,1.3513,7.1091,7.1091,0,0,0,2.6872.4934,6.8934,6.8934,0,0,0,2.8238-.5686,7.0208,7.0208,0,0,0,2.1923-1.5073,6.7842,6.7842,0,0,0,1.4048-2.1133,6.14,6.14,0,0,0,.4923-2.3826,7.3962,7.3962,0,0,0-.4447-2.4875,6.5475,6.5475,0,0,0-1.3271-2.2116,6.7276,6.7276,0,0,0-2.2271-1.58A7.6832,7.6832,0,0,0,25.3529,18.4835Zm.21,10.6032a3.7707,3.7707,0,0,1-2.7-1.1393A4.1966,4.1966,0,0,1,22.011,26.65a4.3163,4.3163,0,0,1-.3219-1.7,7.131,7.131,0,0,1,.8679-3.2649l.0453-.0874.0925-.0337a5.856,5.856,0,0,1,1.1931-.3015,6.137,6.137,0,0,1,2.9012.2088,4.6131,4.6131,0,0,1,1.4292.8058,3.6384,3.6384,0,0,1,.9582,1.24,3.7044,3.7044,0,0,1,.3389,1.59A3.8625,3.8625,0,0,1,29.192,26.68a4.1289,4.1289,0,0,1-.8528,1.2573,3.9411,3.9411,0,0,1-1.2609.8412A3.8628,3.8628,0,0,1,25.5629,29.0867ZM22.96,22.005a6.576,6.576,0,0,0-.7668,2.9454,3.8151,3.8151,0,0,0,.2816,1.5021,3.6973,3.6973,0,0,0,.7492,1.1434,3.2356,3.2356,0,0,0,1.0719.731,3.3315,3.3315,0,0,0,2.5863-.0128,3.4421,3.4421,0,0,0,1.1012-.7334,3.6285,3.6285,0,0,0,.7482-1.1049,3.3609,3.3609,0,0,0,.28-1.3678,3.2046,3.2046,0,0,0-.291-1.3756,3.1421,3.1421,0,0,0-.8267-1.0695,4.1121,4.1121,0,0,0-1.2739-.7165,5.6407,5.6407,0,0,0-2.6627-.1847A5.3058,5.3058,0,0,0,22.96,22.005Z'/><path className='a' d='M70.39,31.5643a6.1531,6.1531,0,0,1-2.4672-.4986,6.3138,6.3138,0,0,1-3.3594-3.36,6.2886,6.2886,0,0,1,0-4.9077,6.3138,6.3138,0,0,1,3.3594-3.36A6.1633,6.1633,0,0,1,70.39,18.94a6.1,6.1,0,0,1,2.4407.4985,6.3138,6.3138,0,0,1,3.3594,3.36,6.2851,6.2851,0,0,1,0,4.9077,6.3138,6.3138,0,0,1-3.3594,3.36A6.09,6.09,0,0,1,70.39,31.5643Zm0,18.5294a6.1633,6.1633,0,0,1-2.4672-.4986,6.3138,6.3138,0,0,1-3.3594-3.36,6.2893,6.2893,0,0,1,0-4.908,6.3119,6.3119,0,0,1,3.3594-3.3593A6.1616,6.1616,0,0,1,70.39,37.47a6.0988,6.0988,0,0,1,2.4407.4986A6.3119,6.3119,0,0,1,76.19,41.3275a6.2858,6.2858,0,0,1,0,4.908,6.3138,6.3138,0,0,1-3.3594,3.36A6.1005,6.1005,0,0,1,70.39,50.0937Zm0-28.03a2.9616,2.9616,0,0,0-1.2337.2492,3.1074,3.1074,0,0,0-.9578.6692,2.9292,2.9292,0,0,0-.63.9974,3.32,3.32,0,0,0-.2231,1.2074,3.2167,3.2167,0,0,0,.2231,1.1942,2.9491,2.9491,0,0,0,.63.9841,3.0906,3.0906,0,0,0,.9578.6692,2.9538,2.9538,0,0,0,1.2337.2494,2.9176,2.9176,0,0,0,1.1942-.2494,3.0535,3.0535,0,0,0,.9711-.6692,3.3433,3.3433,0,0,0,.6559-.9841,2.9208,2.9208,0,0,0,.2494-1.1942,3.0137,3.0137,0,0,0-.2494-1.2074,3.308,3.308,0,0,0-.6559-.9974,3.07,3.07,0,0,0-.9711-.6692A2.9256,2.9256,0,0,0,70.39,22.0635Zm0,18.5294a2.9631,2.9631,0,0,0-1.2337.2491,3.106,3.106,0,0,0-.9578.6693,2.9282,2.9282,0,0,0-.63.9974,3.32,3.32,0,0,0-.2231,1.2074,3.2162,3.2162,0,0,0,.2231,1.1941,2.9471,2.9471,0,0,0,.63.9841,3.0892,3.0892,0,0,0,.9578.6693,2.9554,2.9554,0,0,0,1.2337.2494,2.9192,2.9192,0,0,0,1.1942-.2494,3.0521,3.0521,0,0,0,.9711-.6693,3.3406,3.3406,0,0,0,.6559-.9841,2.92,2.92,0,0,0,.2494-1.1941,3.0133,3.0133,0,0,0-.2494-1.2074,3.3068,3.3068,0,0,0-.6559-.9974,3.0683,3.0683,0,0,0-.9711-.6693A2.9271,2.9271,0,0,0,70.39,40.5929Z'/><path className='a' d='M70.39,50.3455a6.4408,6.4408,0,0,1-2.5671-.5192,6.566,6.566,0,0,1-3.4907-3.491,6.54,6.54,0,0,1,0-5.1076,6.5641,6.5641,0,0,1,3.4907-3.4907,6.4408,6.4408,0,0,1,2.5671-.5192,6.3749,6.3749,0,0,1,2.54.5192,6.5633,6.5633,0,0,1,3.491,3.4907,6.5367,6.5367,0,0,1,0,5.1076,6.566,6.566,0,0,1-3.4907,3.491A6.3774,6.3774,0,0,1,70.39,50.3455Zm0-12.624a5.94,5.94,0,0,0-2.3673.4779,6.06,6.06,0,0,0-3.2281,3.228,5.8735,5.8735,0,0,0-.4779,2.3411,5.9326,5.9326,0,0,0,.4779,2.3671,6.0622,6.0622,0,0,0,3.2281,3.2283,5.942,5.942,0,0,0,2.3673.4779,5.88,5.88,0,0,0,2.3411-.4779,6.063,6.063,0,0,0,3.2278-3.2283,5.9343,5.9343,0,0,0,.4781-2.3671,5.8742,5.8742,0,0,0-.4781-2.3411,6.0606,6.0606,0,0,0-3.228-3.228A5.8768,5.8768,0,0,0,70.39,37.7215Zm0,9.3434a3.2215,3.2215,0,0,1-1.3377-.2718,3.3556,3.3556,0,0,1-1.0348-.7236,3.21,3.21,0,0,1-.6833-1.067,3.4809,3.4809,0,0,1-.24-1.2864,3.585,3.585,0,0,1,.24-1.2982,3.1937,3.1937,0,0,1,.684-1.082,3.3745,3.3745,0,0,1,1.0346-.7234A3.2267,3.2267,0,0,1,70.39,40.341a3.1917,3.1917,0,0,1,1.2958.27,3.3392,3.3392,0,0,1,1.05.7244,3.5681,3.5681,0,0,1,.7064,1.0726,3.281,3.281,0,0,1,.27,1.3076,3.1871,3.1871,0,0,1-.2708,1.296,3.6138,3.6138,0,0,1-.7057,1.0576,3.3242,3.3242,0,0,1-1.05.7244A3.1884,3.1884,0,0,1,70.39,47.0649Zm0-6.22a2.727,2.727,0,0,0-1.13.2268,2.87,2.87,0,0,0-.8808.6151,2.6925,2.6925,0,0,0-.5758.9126,3.0882,3.0882,0,0,0-.2061,1.1169,2.9789,2.9789,0,0,0,.2054,1.1014,2.71,2.71,0,0,0,.5765.9015,2.8493,2.8493,0,0,0,.8808.6151,2.7179,2.7179,0,0,0,1.13.227,2.6823,2.6823,0,0,0,1.0924-.228,2.8138,2.8138,0,0,0,.8921-.6141,3.11,3.11,0,0,0,.6065-.9106,2.6876,2.6876,0,0,0,.2278-1.0923,2.7793,2.7793,0,0,0-.2288-1.1076,3.068,3.068,0,0,0-.6058-.9221,2.8283,2.8283,0,0,0-.8921-.6142A2.6938,2.6938,0,0,0,70.39,40.8447Zm0-9.0285a6.4325,6.4325,0,0,1-2.5671-.5193,6.5654,6.5654,0,0,1-3.4907-3.4909,6.54,6.54,0,0,1,0-5.1074,6.566,6.566,0,0,1,3.4907-3.491,6.4408,6.4408,0,0,1,2.5671-.5192,6.3749,6.3749,0,0,1,2.54.5192,6.5652,6.5652,0,0,1,3.491,3.491,6.5362,6.5362,0,0,1,0,5.1074,6.5654,6.5654,0,0,1-3.4907,3.4909A6.3686,6.3686,0,0,1,70.39,31.8162Zm0-12.6241a5.942,5.942,0,0,0-2.3673.4779,6.0622,6.0622,0,0,0-3.2281,3.2283,5.871,5.871,0,0,0-.4779,2.3408,5.9331,5.9331,0,0,0,.4779,2.3672,6.0625,6.0625,0,0,0,3.2281,3.2282,5.9329,5.9329,0,0,0,2.3673.4779,5.87,5.87,0,0,0,2.3409-.4779,6.0627,6.0627,0,0,0,3.228-3.2282,5.9351,5.9351,0,0,0,.4781-2.3672,5.8731,5.8731,0,0,0-.4781-2.3408,6.0625,6.0625,0,0,0-3.228-3.2283A5.8786,5.8786,0,0,0,70.39,19.1921Zm0,9.3434a3.2215,3.2215,0,0,1-1.3377-.2718,3.3522,3.3522,0,0,1-1.0348-.7236,3.208,3.208,0,0,1-.6833-1.067,3.4809,3.4809,0,0,1-.24-1.2864,3.5854,3.5854,0,0,1,.24-1.2982,3.1942,3.1942,0,0,1,.684-1.0819,3.3711,3.3711,0,0,1,1.0346-.7234,3.2267,3.2267,0,0,1,1.3377-.2716,3.19,3.19,0,0,1,1.2958.2706,3.3376,3.3376,0,0,1,1.05.7244,3.5669,3.5669,0,0,1,.7064,1.0726,3.28,3.28,0,0,1,.27,1.3075,3.1871,3.1871,0,0,1-.2708,1.296,3.6125,3.6125,0,0,1-.7057,1.0576,3.3226,3.3226,0,0,1-1.05.7244A3.1867,3.1867,0,0,1,70.39,28.5355Zm0-6.22a2.7269,2.7269,0,0,0-1.13.2267,2.87,2.87,0,0,0-.8808.6152,2.6911,2.6911,0,0,0-.5758.9125,3.0882,3.0882,0,0,0-.2061,1.1169,2.98,2.98,0,0,0,.2054,1.1015,2.7108,2.7108,0,0,0,.5765.9014,2.85,2.85,0,0,0,.8808.6152,2.72,2.72,0,0,0,1.13.227,2.6839,2.6839,0,0,0,1.0924-.228,2.8157,2.8157,0,0,0,.8921-.6142,3.11,3.11,0,0,0,.6065-.91,2.6881,2.6881,0,0,0,.2278-1.0924,2.7788,2.7788,0,0,0-.2288-1.1075,3.0684,3.0684,0,0,0-.6058-.9222,2.83,2.83,0,0,0-.8921-.6141A2.6921,2.6921,0,0,0,70.39,22.3154Z'/></svg>",
              },
              {
                label: 'History',
                value: 'icon-history',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 116.3853 106.6503'><title>History</title><path className='a' d='M62.4051,0A53.9523,53.9523,0,0,0,11.1,36.6616L6.1008,27.7742A3.2207,3.2207,0,0,0,2.869,26.1079,3.2354,3.2354,0,0,0,.4452,30.9556l8.8874,15.856a3.2344,3.2344,0,0,0,4.2922,1.313L29.43,40.045a3.2323,3.2323,0,1,0-2.9288-5.7567l-9.3924,4.7973A47.4854,47.4854,0,0,1,62.4045,6.4637c26.315,0,47.5173,20.9632,47.5173,46.8613S88.72,100.1862,62.4045,100.1862a47.4329,47.4329,0,0,1-46.2553-36.054,3.2323,3.2323,0,1,0-6.2617,1.4644A53.9451,53.9451,0,0,0,62.4044,106.65c29.7617,0,53.9809-23.8911,53.9809-53.3249S92.1661.0006,62.4044.0006ZM52.1688,78.05a4.3358,4.3358,0,0,1-4.3434-4.3763V34.7873a4.3461,4.3461,0,0,1,1.2689-3.0947,4.5037,4.5037,0,0,1,3.1292-1.27l.019,0a4.31,4.31,0,0,1,2.117.6133L89.1127,50.4552a4.36,4.36,0,0,1,2.1717,3.1834,4.3049,4.3049,0,0,1-2.1662,4.3881l-34.82,19.4579A4.25,4.25,0,0,1,52.1688,78.05Zm.2277-4.3557v0Zm-.3515-.1864-.0067.0034Zm.3515-38.3338V73.3108L86.5191,54.2424Zm0-.419v0Z'/></svg>",
              },
              {
                label: 'Help',
                value: 'icon-help',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 107.3025 102.1142'><title>Help</title><path className='a' d='M14.6483.0052A14.6981,14.6981,0,0,0,0,14.6792v50.723A14.6765,14.6765,0,0,0,14.6483,80.0505H61.78l21.0615,21.0862.0042.0042a3.354,3.354,0,0,0,5.717-2.3806V80.05h4.0614a14.7023,14.7023,0,0,0,14.6784-14.6484V14.6784A14.7248,14.7248,0,0,0,92.6241,0Zm0,6.7061H92.62a7.8872,7.8872,0,0,1,7.9719,7.9719v50.723A7.8626,7.8626,0,0,1,92.62,73.3487l-7.3977-.0042A3.3557,3.3557,0,0,0,81.8563,76.71V90.6461L65.5148,74.3335a3.3617,3.3617,0,0,0-2.3513-.9891H14.6487a7.8405,7.8405,0,0,1-7.9425-7.9425V14.6789A7.8652,7.8652,0,0,1,14.6487,6.707Zm37.8472,9.3718A15.4917,15.4917,0,0,0,38.1108,31.172h.0042a3.356,3.356,0,1,0,6.71.1426,8.7681,8.7681,0,0,1,15.118-5.8427,8.4633,8.4633,0,0,1,1.7353,9.4556c-1.6849,3.3489-3.5752,4.317-5.7966,5.4487a15.403,15.403,0,0,0-3.6129,2.1752,7.3463,7.3463,0,0,0-2.3514,5.2266v4.7236h.0042a3.3573,3.3573,0,1,0,6.7145,0V47.778c0-.4023-.1634.0336.0461-.1508a17.5481,17.5481,0,0,1,2.255-1.2658,18.7505,18.7505,0,0,0,8.7347-8.4163A15.1085,15.1085,0,0,0,64.8012,20.844a15.4956,15.4956,0,0,0-12.306-4.7614Zm.788,42.19v-.0042a3.6454,3.6454,0,1,0,3.638,3.6422,3.6472,3.6472,0,0,0-3.638-3.6422Z'/></svg>",
              },
              {
                label: 'Genre',
                value: 'icon-generees',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 92.549 107.6383'><title>Genre</title><path d='M61.3679,22.5663a7.8467,7.8467,0,0,1-15.6934,0,2.2746,2.2746,0,1,1,4.5491,0,3.2988,3.2988,0,0,0,6.5976,0,2.2734,2.2734,0,1,1,4.5467,0ZM74.5762,30.413a7.8547,7.8547,0,0,0,7.8467-7.8455,2.2746,2.2746,0,1,0-4.5491,0,3.2982,3.2982,0,0,1-6.5964,0,2.2746,2.2746,0,1,0-4.5491,0A7.8588,7.8588,0,0,0,74.5762,30.413ZM92.549,2.277V43.802c0,16.78-11.7186,28.5-28.5,28.5A27.7193,27.7193,0,0,1,57,71.2955v7.8431c0,16.78-11.7187,28.5-28.5,28.5A28.5325,28.5325,0,0,1,0,79.1386V37.6148a2.2741,2.2741,0,0,1,3.6589-1.8031C3.7714,35.8966,15,44.3751,28.5,44.3751a35.53,35.53,0,0,0,7.05-.7358V2.277A2.2738,2.2738,0,0,1,36.8179.2382a2.2545,2.2545,0,0,1,2.3906.2357c.1125.085,11.3406,8.5634,24.8408,8.5634C77.6034,9.0373,88.7764.56,88.8877.4739A2.2742,2.2742,0,0,1,92.549,2.277ZM52.4515,41.8361c-4.7466,2.82-13.6319,7.087-23.9518,7.087s-19.204-4.2656-23.9518-7.087V79.1386A23.9789,23.9789,0,0,0,28.5,103.09c16.5454,0,23.9518-12.03,23.9518-23.9518ZM88.0011,6.5c-4.7466,2.82-13.6319,7.087-23.9518,7.087-10.3175,0-19.204-4.2656-23.9518-7.087V42.45a48.5071,48.5071,0,0,0,13.2406-6.6382A2.2742,2.2742,0,0,1,57,37.6148v3.0607a19.6829,19.6829,0,0,1,7.0486-1.3461c7.9425,0,14.4647,4.9129,17.92,9.51a2.274,2.274,0,0,1-3.6362,2.7317c-2.7963-3.7176-8.0167-7.6924-14.2852-7.6924a15.83,15.83,0,0,0-7.0486,1.7337V66.5728a23.613,23.613,0,0,0,7.05,1.1822C80.5935,67.755,88,55.7252,88,43.8032V6.5ZM14.217,77.3331a2.274,2.274,0,1,0-3.6362,2.7316c3.4543,4.597,9.9753,9.51,17.92,9.51,7.9377,0,14.46-4.9081,17.9154-9.5a2.2745,2.2745,0,0,0-3.6338-2.7365c-2.7975,3.7176-8.0166,7.6888-14.2816,7.6888C22.2336,85.0266,17.012,81.053,14.217,77.3331ZM33.4545,65.6408a2.2737,2.2737,0,0,0,2.2746-2.2746,3.2988,3.2988,0,0,1,6.5975,0,2.2746,2.2746,0,0,0,4.5492,0,7.8468,7.8468,0,0,0-15.6935,0A2.27,2.27,0,0,0,33.4545,65.6408Zm-21.0574,0a2.2737,2.2737,0,0,0,2.2745-2.2746,3.2988,3.2988,0,0,1,6.5976,0,2.2746,2.2746,0,1,0,4.5491,0,7.8467,7.8467,0,0,0-15.6934,0A2.2716,2.2716,0,0,0,12.3971,65.6408Z'/></svg>",
              },
              {
                label: 'Favourites',
                value: 'icon-favourites',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 113.0999 103.1865'><title>Favourites</title><path d='M113.0956,33.5034a32.1407,32.1407,0,0,1-7.6678,21.1129l5.5282.7547a2.271,2.271,0,0,1,2.0113,1.63,2.6186,2.6186,0,0,1-.63,2.5132L95.126,76.3556l4.0189,23.7469a2.7135,2.7135,0,0,1-1.0076,2.5132,3.0581,3.0581,0,0,1-1.5056.5018,3.7711,3.7711,0,0,1-1.1283-.249L74.1414,91.6837l-21.362,11.1848a2.5,2.5,0,0,1-2.6414-.1283A2.7466,2.7466,0,0,1,49.13,100.227l1.3849-7.7923-38.9542-33.8A33.6087,33.6087,0,0,1,.0028,33.3826V31.6242A33.9877,33.9877,0,0,1,56.5492,8.6283a33.9813,33.9813,0,0,1,56.5464,23.1166Zm-13.69,19.9809a27.3242,27.3242,0,0,0,8.6678-20.1054V31.87A28.8721,28.8721,0,0,0,58.436,13.6508a2.5781,2.5781,0,0,1-3.6415,0,28.9679,28.9679,0,0,0-20.86-8.7961,10.6364,10.6364,0,0,0-2.015.1283,29.24,29.24,0,0,0-26.89,27.0148v1.5056a27.5536,27.5536,0,0,0,9.8,21.1129l36.69,31.792,1.6377-10.0527L35.9419,59.5144a2.3491,2.3491,0,0,1-.63-2.5132,2.8427,2.8427,0,0,1,2.015-1.7547L61.202,51.7258l10.6791-21.611a2.5432,2.5432,0,0,1,4.5282,0l10.6791,21.611ZM90.6091,73.7217,105.175,59.5144,85.07,56.6238a2.3964,2.3964,0,0,1-1.883-1.3773l-9.049-18.2224L65.0925,55.2465a2.6216,2.6216,0,0,1-1.883,1.3811L43.1041,59.5219l14.5772,14.2a2.5448,2.5448,0,0,1,.7547,2.2641L55.0436,95.9629l17.9733-9.4263a3.5973,3.5973,0,0,1,1.1283-.249,3.7718,3.7718,0,0,1,1.1283.249L93.243,95.9629,89.8506,75.9858A2.537,2.537,0,0,1,90.6091,73.7217Z'/><path className='a' d='M33.9306,12.5226a2.5132,2.5132,0,1,1,0,5.0263A16.3012,16.3012,0,0,0,17.595,33.8845a2.5132,2.5132,0,1,1-5.0263,0A21.345,21.345,0,0,1,33.9306,12.5226Z'/></svg>",
              },
              {
                label: 'Download',
                value: 'icon-download',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 107.3025 107.243'><title>Download</title><path d='M53.5923,0a3.8334,3.8334,0,0,0-3.7717,3.83v67.376L25.7275,47.1133A3.83,3.83,0,1,0,20.313,52.532L50.94,83.1587a.4066.4066,0,0,0,.0419.0377l.0084.0084a1.459,1.459,0,0,0,.1173.109l.0042.0042c.05.0461.1048.0922.1593.1383l.0083.0083c.0252.021.0629.0461.1006.0755l.0084.0084c.05.0377.1132.0838.18.1257l.0168.0084a1.2005,1.2005,0,0,0,.1383.0838l.0167.0084a1.7165,1.7165,0,0,0,.1593.088l.0209.0083a1.147,1.147,0,0,0,.1383.0629l.0252.0084c.0335.0168.0922.0419.155.0712l.0252.0084c.0377.0168.1048.0377.1718.0587l.0252.0084c.0251.0084.08.0293.1341.0461l.0251.0084c.0377.0083.1048.0293.1718.0419l.0252.0042a1.4615,1.4615,0,0,0,.1592.0335l.0252.0042c.0377.0083.1006.0167.1634.0251l.021.0042a1.769,1.769,0,0,0,.18.0168h.0084c.0586.0042.1257.0083.1969.0083h.0042c.0252,0,.0587.0042.0922.0042a.7724.7724,0,0,0,.0964-.0042H53.76a3.0539,3.0539,0,0,0,.3437-.0251l-.0168.0042c.0293-.0042.0377-.0084.0461-.0084l-.0251.0042c.1-.0126.18-.0251.26-.0419l-.0252.0042c.0881-.0168.1467-.0293.21-.0419l-.0252.0084c.0755-.0168.1258-.0294.1719-.0419l-.0252.0083c.1048-.0293.18-.0544.2557-.0754l-.0252.0084c.0755-.0252.1174-.0419.1635-.0587l-.0252.0084c.0922-.0377.1593-.0629.2263-.0964l-.0251.0084c.1257-.0587.2179-.1048.31-.1551l-.021.0084a.08.08,0,0,0,.0252-.0168l-.0126.0084c.0922-.05.1593-.0964.2305-.1425l-.0126.0084c.0629-.0419.1132-.0754.1593-.1089l-.0084.0083c.0922-.0712.176-.1341.2515-.2011l-.0042.0042.0251-.0252a2.2207,2.2207,0,0,0,.176-.1592L86.9852,52.553a3.8291,3.8291,0,0,0-2.67-6.5754,1.0968,1.0968,0,0,0-.1174.0042h.0084a3.8215,3.8215,0,0,0-2.6318,1.1525L57.486,71.2273V3.8555a3.8293,3.8293,0,0,0-3.83-3.83h-.0544ZM3.8849,99.5822H3.83a3.83,3.83,0,1,0,0,7.6608h99.6417a3.83,3.83,0,1,0,0-7.6608H3.8849Z'/></svg>",
              },
              {
                label: 'Chat',
                value: 'icon-chat',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100.2345 103.5322'><title>Chat</title><path d='M83.484,34.5341V17.1251A17.2637,17.2637,0,0,0,66.1063,0H17.1247A17.14,17.14,0,0,0,0,17.125v49.49a2.4061,2.4061,0,0,0,1.5953,2.2622,2.3614,2.3614,0,0,0,.8112.14,2.4088,2.4088,0,0,0,1.8612-.8833l12.4828-15.26v16.53a17.19,17.19,0,0,0,17.377,17.377h48.86l12.9789,15.8677a2.4114,2.4114,0,0,0,1.8657.8833,2.357,2.357,0,0,0,.8067-.14,2.4063,2.4063,0,0,0,1.5953-2.2623V51.64A17.1378,17.1378,0,0,0,83.484,34.5332ZM16.1117,47.4587a2.4024,2.4024,0,0,0-1.8613.8833L4.8092,59.8834V17.1258A12.3306,12.3306,0,0,1,17.1259,4.8092H66.1075A12.3121,12.3121,0,0,1,78.6762,17.1256V34.89a3.3393,3.3393,0,0,1-.1262,1.2664,2.2248,2.2248,0,0,0-.1127.5137,12.2,12.2,0,0,1-12.33,10.7887Zm79.32,46.9361L85.99,82.8581a2.4121,2.4121,0,0,0-1.8612-.8788h-50A12.442,12.442,0,0,1,21.56,69.406V52.2681H66.1069a17.5808,17.5808,0,0,0,2.7941-.2343c.0856-.0135.1712-.018.2568-.0361a17.1274,17.1274,0,0,0,2.5147-.64c.1172-.0406.2389-.0721.356-.1172a17.5618,17.5618,0,0,0,2.2714-1c.1217-.0631.2433-.1262.365-.1938H74.66a16.9185,16.9185,0,0,0,2.0414-1.3385c.1037-.0811.2073-.1622.3065-.2434A17.15,17.15,0,0,0,78.82,46.7971c.0721-.0766.14-.1577.2073-.2388a16.4908,16.4908,0,0,0,1.5683-2.01c.027-.0406.05-.0812.0721-.1217A17.3362,17.3362,0,0,0,81.9114,42.11c.0135-.036.036-.0676.05-.1036a16.2663,16.2663,0,0,0,.8292-2.5012c.0135-.0631.045-.1171.0585-.18H83.11A12.3248,12.3248,0,0,1,95.4268,51.6419Z'/><path d='M19.37,18.0492a8.2936,8.2936,0,1,0,8.2921,8.2966A8.2933,8.2933,0,0,0,19.37,18.0492Zm0,11.78a3.4861,3.4861,0,1,1,3.4836-3.4836A3.4823,3.4823,0,0,1,19.37,29.8294Z'/><path d='M41.744,18.0492a8.2936,8.2936,0,1,0,8.2921,8.2966A8.2933,8.2933,0,0,0,41.744,18.0492Zm0,11.78a3.4861,3.4861,0,1,1,3.4836-3.4836,3.4823,3.4823,0,0,1-3.4836,3.4836Z'/><path d='M72.411,26.3464a8.292,8.292,0,1,0-8.292,8.2921,8.2892,8.2892,0,0,0,8.292-8.2921ZM64.1145,29.83h.0045a3.4849,3.4849,0,1,1,3.4881-3.4836A3.4842,3.4842,0,0,1,64.119,29.83Z'/></svg>",
              },
              {
                label: 'About Us',
                value: 'icon-ab_us',
                icon: "<svg height='24px' width='24px' fill='#000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 109.7575 109.7575'><title>About Us</title><path className='a' d='M69.0556,24.8959a6.31,6.31,0,1,1-1.8483-4.4637,6.3162,6.3162,0,0,1,1.8483,4.4637ZM54.7931,75.9444l8.713-32.5128c1.61-6.0119-7.6268-8.4987-13.6-5.6118a23.2254,23.2254,0,0,0-9.2037,8.0365c3.7538-1.6483,12.1333-5.3784,9.0845,5.9976L41.0785,84.3618c-1.61,6.0167,7.6269,8.4987,13.5954,5.6118a23.1779,23.1779,0,0,0,9.2037-8.0317C60.1237,83.59,51.7442,87.32,54.793,75.9442Zm54.9644-65.1877V99.0009a10.7692,10.7692,0,0,1-10.7566,10.7566H10.7566A10.7692,10.7692,0,0,1,0,99.0009V10.7566A10.7692,10.7692,0,0,1,10.7566,0H99.0009a10.7692,10.7692,0,0,1,10.7566,10.7566Zm-4.3923,0a6.3636,6.3636,0,0,0-6.3645-6.3645H10.7565A6.3636,6.3636,0,0,0,4.392,10.7567V99.0009a6.3636,6.3636,0,0,0,6.3645,6.3645H99.0007a6.3636,6.3636,0,0,0,6.3645-6.3645Z'/></svg>",
              },
              {
                label: 'Refer and Earn',
                value: 'icon-refer-earn',
                icon: "<svg height='24px' width='24px' fill='#000000' data-label='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 483.03'><title>Refer and Earn</title><path class='cls-1' d='M211.49,109.5a8,8,0,0,0,7.68-10.27,141.07,141.07,0,0,0-29.06-53.06,44.51,44.51,0,0,0-42.27-12.94,8,8,0,0,0-4.61,4.62,20.27,20.27,0,0,0-1,3.69,31,31,0,0,0-.4,4.51v.13a48.33,48.33,0,0,0,14.3,33.94,141.21,141.21,0,0,0,53,29A8.55,8.55,0,0,0,211.49,109.5Zm-44-40.71a33,33,0,0,1-7.33-11.16v-.08c-.35-.89-.66-1.78-.92-2.63-.14-.47-.23-.9-.35-1.36s-.23-.8-.31-1.2-.09-.56-.15-.85A31.31,31.31,0,0,1,158,47.9a33,33,0,0,1,20.9,9.6,108.55,108.55,0,0,1,19,30.32,108.56,108.56,0,0,1-30.35-19Z' transform='translate(-17 0.03)'/><path class='cls-1' d='M457,115H333.51a111.6,111.6,0,0,0,15-12.27c28.61-28.7,29.55-72.22,11.27-90.5S298-5.13,269.25,23.52A157,157,0,0,0,241,66.87,156.75,156.75,0,0,0,212.73,23.5C184-5.12,140.51-6.06,122.23,12.22S104.88,74,133.5,102.73a112.23,112.23,0,0,0,15,12.27H25a8,8,0,0,0-8,8v80a8,8,0,0,0,8,8H41V443a40.05,40.05,0,0,0,40,40H401a40,40,0,0,0,40-40V211h16a8,8,0,0,0,8-8V123A8,8,0,0,0,457,115ZM280.69,34.83c23-22.92,56.52-22.66,67.89-11.29s11.64,44.88-11.28,67.88A133.87,133.87,0,0,1,301.8,115H254a56.11,56.11,0,0,0-.31-6c-.07-.61-.14-1.22-.21-1.85-.18-1.53-.41-3.06-.68-4.59l-.27-1.6c-.39-2-.8-4-1.28-5.85-.07-.27-.14-.51-.2-.8-.49-1.88-1-3.61-1.5-5.45v0A152.56,152.56,0,0,1,280.69,34.83ZM273,195H209V131h64ZM144.84,91.46c-22.92-23-22.65-56.51-11.28-67.89s44.88-11.64,67.86,11.27a153.52,153.52,0,0,1,32,56.38c.9,2.81,1.6,5.51,2.26,8.12.18.75.33,1.48.49,2.22.44,2,.78,3.82,1.05,5.6.08.61.19,1.23.26,1.82a48.57,48.57,0,0,1,.41,6H180.33A134.09,134.09,0,0,1,144.84,91.46ZM33,131H193v64H33ZM57,443V211H209V467H81A24,24,0,0,1,57,443Zm168,24V211h32V467Zm176,0H273V211H425V443A24,24,0,0,1,401,467Zm48-272H289V131H449Z' transform='translate(-17 0.03)'/><path class='cls-1' d='M270.51,109.53a7.94,7.94,0,0,0,2.27-.33,140.55,140.55,0,0,0,53.07-29.09,45.29,45.29,0,0,0,13-42.3,8,8,0,0,0-4.6-4.59,45.26,45.26,0,0,0-42.3,13,140.69,140.69,0,0,0-29.09,53.07,8,8,0,0,0,7.68,10.28Zm32.72-52a33.19,33.19,0,0,1,20.91-9.6,33.11,33.11,0,0,1-9.59,20.91,108.15,108.15,0,0,1-30.4,19.08A107.81,107.81,0,0,1,303.23,57.49Z' transform='translate(-17 0.03)'/></svg>",
              },
              {
                label: 'News Clap',
                value: 'icon-news-clap',
                icon: "<svg fill='#000000' width='24px' height='24px' viewBox='0 0 53 55' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'><g id='Page-1' stroke='none' stroke-width='1' fill-rule='evenodd'><g id='Group-2' transform='translate(0.000000, 0.423264)'><path d='M11.0092316,20.9796906 L7.78564453,27.9085846 L14.6438599,27.9085846 L18.5575562,20.9796906 L25.0607147,20.9796906 L22.1377716,27.9085846 L29.5,27.9085846 L33.0513306,20.9796906 L40.1363983,20.9796906 L37.119278,27.9085846 L43.8997803,27.9085846 L47.6416168,20.9796906 L53,20.9796906 L53,54.5767365 L1.8422513,54.5767365 L1.8422513,20.9796906 L11.0092316,20.9796906 Z M22.0662994,34.04776 L22.0662994,46.9566498 L32.3639221,40.0820312 L22.0662994,34.04776 Z' id='Combined-Shape'></path><polygon id='Path-2' points='1.8422513 20.9796906 0 14.7254486 5.39727783 12.3631668 10.7664185 18.1324463'></polygon><polygon id='Path-3' points='12.9681702 10.3570633 19.0379333 8.06395721 24.4074707 13.7822342 17.3422546 16.6714287'></polygon><polygon id='Path-4' points='26.5 5.90292358 32.7031097 3.79536438 38.2278442 10.2593079 32.3639221 12.3631668'></polygon><polygon id='Path-5' points='40.2139282 2.28256226 48.4424438 0 50.2014771 6.46127319 45.2077026 8.06395721'></polygon></g></g></svg>",
              },
              {
                label: 'Content Filter',
                value: 'icon-contentFilter',
                icon: "<svg width='24px' height='24px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><title>Content Filter</title><g id='Mobile-Apps' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='1.-Mobile_Homepage_Default' transform='translate(-23.000000, -64.000000)' fill='#000000' fill-rule='nonzero'><g id='Group' transform='translate(16.000000, 55.000000)'><g id='tune_black_24dp' transform='translate(4.000000, 7.000000)'><path d='M3,15.3333333 L3,17.1666667 L8.5,17.1666667 L8.5,15.3333333 L3,15.3333333 Z M3,4.33333333 L3,6.16666667 L12.1666667,6.16666667 L12.1666667,4.33333333 L3,4.33333333 Z M12.1666667,19 L12.1666667,17.1666667 L19.5,17.1666667 L19.5,15.3333333 L12.1666667,15.3333333 L12.1666667,13.5 L10.3333333,13.5 L10.3333333,19 L12.1666667,19 Z M6.66666667,8 L6.66666667,9.83333333 L3,9.83333333 L3,11.6666667 L6.66666667,11.6666667 L6.66666667,13.5 L8.5,13.5 L8.5,8 L6.66666667,8 Z M19.5,11.6666667 L19.5,9.83333333 L10.3333333,9.83333333 L10.3333333,11.6666667 L19.5,11.6666667 Z M14,8 L15.8333333,8 L15.8333333,6.16666667 L19.5,6.16666667 L19.5,4.33333333 L15.8333333,4.33333333 L15.8333333,2.5 L14,2.5 L14,8 Z' id='Shape'/></g></g></g></g></svg>",
              },
            ],
          },
        ],
      },
      {
        key: 'contentFilter.noOfVisits',
        fields: [
          {
            id: 'contentFilter.noOfVisits',
            type: 'text',
            title: 'Number of Visits',
          },
        ],
      },
      {
        key: 'contentFilter.hideFilterIconFromApps',
        fields: [
          {
            id: 'contentFilter.hideFilterIconFromApps',
            type: 'switch',
            title: 'Hide Filter Icon from Apps',
          },
        ],
      },
      {
        key: 'contentFilter.applyFilterToModularPage',
        fields: [
          {
            id: 'contentFilter.applyFilterToModularPage',
            type: 'switch',
            title: 'Apply Filter to Modular Pages',
          },
        ],
      },
      {
        key: 'contentFilter.applyFilterToSearch',
        fields: [
          {
            id: 'contentFilter.applyFilterToSearch',
            type: 'switch',
            title: 'Apply Filter to Search Result',
          },
        ],
      },
      {
        key: 'contentFilter.requireFilterSelection',
        span: 6,
        fields: [
          {
            id: 'contentFilter.requireFilterSelection',
            type: 'switch',
            title: 'Require Filter Selection',
          },
        ],
      },
      {
        key: 'contentFilter.showRemainingContent',
        span: 6,
        fields: [
          {
            id: 'contentFilter.showRemainingContent',
            type: 'switch',
            title: 'Show Remaining Content Below filtered Content',
          },
        ],
      },
      {
        id: 'contentFilter.filterOptions',
        span: 12,
        fields: [
          {
            id: 'contentFilter.filterOptions',
            type: 'array',
            addButtonText: 'Add More Filter',
            defaultItem: {
              name: '',
              imageUrl: '',
              tags: [],
              categories: [],
            },
            items: [
              {
                title: 'Filter Option 1',
              },
              {
                id: 'name',
                label: 'Name',
                type: 'text',
              },
              {
                id: 'imageUrl',
                label: 'Image URL',
                type: 'text',
              },
              {
                id: 'tags',
                label: 'Related Tags Provider',
                type: 'asyncAutocomplete',
                url: `${process.env.NEXT_PUBLIC_V1_API_URL}/msndev/content/metadata?type=tag&start=0&limit=20`,
                objKey: 'metadataList',
                valueKey: 'imgUrl',
                labelKey: 'title',
              },
              {
                id: 'categories',
                label: 'Related Categories',
                type: 'asyncAutocomplete',
                url: `${process.env.NEXT_PUBLIC_V1_API_URL}/msndev/content/metadata?type=category&start=0&limit=20`,
                objKey: 'metadataList',
                valueKey: 'imgUrl',
                labelKey: 'title',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'MEDIA CONFIG',
    key: 'mediaConfig',
    items: [
      {
        key: 'mediaConfig.apiKey',
        span: 6,
        fields: [
          {
            id: 'mediaConfig.apiKey',
            type: 'text',
            title: 'API Key',
          },
        ],
      },
      {
        key: 'mediaConfig.endpoint',
        span: 6,
        fields: [
          {
            id: 'mediaConfig.endpoint',
            type: 'text',
            title: 'END POINT',
          },
        ],
      },
    ],
  },
  {
    title: 'TICKET CONFIG',
    key: 'ticketConfig',
    items: [
      {
        key: 'ticketConfig.IOS',
        span: 6,
        fields: [
          {
            id: 'ticketConfig.ticketMaster.ios',
            type: 'text',
            title: 'IOS',
          },
        ],
      },
      {
        key: 'ticketConfig.android',
        span: 6,
        fields: [
          {
            id: 'ticketConfig.ticketMaster.android',
            type: 'text',
            title: 'ANDRIOD',
          },
        ],
      },
    ],
  },
  {
    title: 'SECURITY',
    key: 'security',
    items: [
      {
        key: 'playIntegrityEnabled',
        fields: [
          {
            id: 'security.playIntegrityEnabled',
            type: 'switch',
            title: 'Enable Play Integrity Process',
          },
        ],
        description:
          'The Play Integrity API helps protect your apps and games from potentially risky and fraudulent interactions, such as cheating and unauthorized access, allowing you to respond with appropriate actions to prevent attacks and reduce abuse.',
      },
      {
        key: 'firebaseUrl',
        show: 'security.playIntegrityEnabled',
        span: 8,
        fields: [
          {
            title: 'Select firebase authentication file',
          },
          {
            id: 'security.firebaseUrl',
            type: 'file',
            accept: '.p12',
            fileUploadUrl: UPLOAD_FILE_URL,
          },
        ],
      },
    ],
  },
  {
    title: 'SPORTS CONFIG',
    key: 'sportsConfig',
    items: [
      {
        key: 'enableSportsEngagement',
        fields: [
          {
            id: 'sportConfig.enabled',
            type: 'switch',
            title: 'Enable Sports Engagement',
          },
        ],
      },
    ],
  },
  {
    title: 'VERSION HISTORY',
    key: 'versionHistory',
    items: [
      {
        span: 12,
        key: 'versionHistory',
        fields: [
          {
            span: 12,
            id: 'versionHistoryTable',
            type: 'versionHistoryTable',
          },
        ],
      },
    ],
  },
]

export default settings
