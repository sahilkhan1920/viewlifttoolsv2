import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import useGoogleFonts from './useGoogleFonts'
import { MenuItem, Select, TextField } from '@mui/material'
import FontStyleSelector from './FontStyleSelector'
import BorderWidthSelector from './BorderWidthSelector'
import { isEmpty } from 'lodash'

const WebContent = ({ type, fieldKey, formik, handleInputChange }) => {
  const { fonts } = useGoogleFonts()
  if (isEmpty(formik.values)) return

  const defaultColor = '#ffffff'

  const showFields =
    Boolean(formik?.values[fieldKey]?.useDefault) || type === 'default'

  return (
    <Grid container spacing={2}>
      {type !== 'default' && (
        <Grid item xs={4}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Use Default</Typography>
            <Switch
              data-type="switch"
              name={`${fieldKey}.useDefault`}
              checked={Boolean(formik?.values[fieldKey]?.useDefault)}
              onChange={handleInputChange}
            />
          </Stack>
        </Grid>
      )}
      {showFields && (
        <>
          <Grid item xs={12}>
            <Divider>Metadata</Divider>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Display Duration</Typography>
              <Switch
                data-type="switch"
                name={`${fieldKey}.metadata.displayDuration`}
                checked={Boolean(
                  formik?.values[fieldKey]?.metadata?.displayDuration
                )}
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Display Publish Date</Typography>
              <Switch
                name={`${fieldKey}.metadata.displayPublishDate`}
                checked={Boolean(
                  formik?.values[fieldKey]?.metadata?.displayPublishDate
                )}
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Display Author</Typography>
              <Switch
                name={`${fieldKey}.metadata.displayAuthor`}
                checked={Boolean(
                  formik?.values[fieldKey]?.metadata?.displayAuthor
                )}
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Display Hover State</Typography>
              <Switch
                name={`${fieldKey}.metadata.displayHoverState`}
                checked={Boolean(
                  formik?.values[fieldKey]?.metadata?.displayHoverState
                )}
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider>Player</Divider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name={`${fieldKey}.player.progressBarBackgroundColor`}
              value={
                formik?.values[fieldKey]?.player?.progressBarBackgroundColor ||
                defaultColor
              }
              type="color"
              label="Progress Bar Background Color"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name={`${fieldKey}.player.progressBarColor`}
              value={
                formik?.values[fieldKey]?.player?.progressBarColor ||
                defaultColor
              }
              type="color"
              label="Progress Bar Color"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>Tray Glow</Divider>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Tray Glow</Typography>
              <Switch
                name={`${fieldKey}.trayGlow.isTrayGlow`}
                checked={Boolean(
                  formik?.values[fieldKey]?.trayGlow?.isTrayGlow
                )}
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name={`${fieldKey}.trayGlow.trayGlowColor`}
              value={
                formik?.values[fieldKey]?.trayGlow?.trayGlowColor ||
                defaultColor
              }
              type="color"
              label="Tray Glow Color"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>Font Family</Divider>
          </Grid>
          <Grid item xs={12}>
            <Select
              name={`${fieldKey}.general.fontFamily`}
              value={formik?.values[fieldKey]?.general?.fontFamily}
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            >
              {fonts?.map((item, index) => (
                <MenuItem key={`item-${index}`} value={item.family}>
                  {item.family}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Divider>General</Divider>
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.general.backgroundColor`}
              value={
                formik?.values[fieldKey]?.general?.backgroundColor ||
                defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.general.backgroundColor`}
              value={
                formik?.values[fieldKey]?.general?.textColor || defaultColor
              }
              type="color"
              label="Text"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid
            xs={3}
            item
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              name={`${fieldKey}.link.textColor`}
              value={formik?.values[fieldKey]?.link?.textColor || defaultColor}
              type="color"
              label="Link"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <FontStyleSelector
              name={`${fieldKey}.link.style`}
              value={formik?.values[fieldKey]?.link?.style}
              setFieldValue={formik.setFieldValue}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              name={`${fieldKey}.link--hover.textColor`}
              value={
                formik?.values[fieldKey]['link--hover']?.textColor ||
                defaultColor
              }
              type="color"
              label="Link Hover"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <FontStyleSelector
              name={`${fieldKey}.link--hover.style`}
              value={formik?.values[fieldKey]?.['link--hover']?.style}
              setFieldValue={formik.setFieldValue}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.general.pageTitleColor`}
              value={
                formik?.values[fieldKey]?.general?.pageTitleColor ||
                defaultColor
              }
              type="color"
              label="Page Title"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.general.blockTitleColor`}
              value={
                formik?.values[fieldKey]?.general?.blockTitleColor ||
                defaultColor
              }
              type="color"
              label="Block Title"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.general.boxShadow`}
              value={
                formik?.values[fieldKey]?.general?.boxShadow || defaultColor
              }
              type="color"
              label="Box Shadow"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.general.skeletonColor`}
              value={
                formik?.values[fieldKey]?.general?.skeletonColor || defaultColor
              }
              type="color"
              label="Page Skeleton Color"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>CTA</Divider>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Primary</Typography>
            <TextField
              name={`${fieldKey}.cta.primary.backgroundColor`}
              value={
                formik?.values[fieldKey]?.cta?.primary?.backgroundColor ||
                defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <Stack direction="row">
              <TextField
                name={`${fieldKey}.cta.primary.textColor`}
                value={
                  formik?.values[fieldKey]?.cta?.primary?.textColor ||
                  defaultColor
                }
                type="color"
                label="Text"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <FontStyleSelector
                name={`${fieldKey}.cta.primary.style`}
                value={formik?.values[fieldKey]?.cta?.primary?.style}
                setFieldValue={formik.setFieldValue}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                name={`${fieldKey}.cta.primary.border.color`}
                value={
                  formik?.values[fieldKey]?.cta?.primary?.border?.color ||
                  defaultColor
                }
                type="color"
                label="Border"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <BorderWidthSelector
                name={`${fieldKey}.cta.primary.border.width`}
                value={formik?.values[fieldKey]?.cta?.primary?.border?.width}
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Primary Hover</Typography>
            <TextField
              name={`${fieldKey}.cta.primary--hover.backgroundColor`}
              value={
                formik?.values[fieldKey]?.cta?.['primary--hover']
                  ?.backgroundColor || defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />

            <Stack direction="row">
              <TextField
                name={`${fieldKey}.cta.primary--hover.textColor`}
                value={
                  formik?.values[fieldKey]?.cta?.['primary--hover']
                    ?.textColor || defaultColor
                }
                type="color"
                label="Text"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <FontStyleSelector
                name={`${fieldKey}.cta.primary--hover.style`}
                value={formik?.values[fieldKey]?.cta['primary--hover']?.style}
                setFieldValue={formik.setFieldValue}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                name={`${fieldKey}.cta.primary--hover.border.color`}
                value={
                  formik?.values[fieldKey]?.cta?.['primary--hover']?.border
                    ?.color || defaultColor
                }
                type="color"
                label="Border"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <BorderWidthSelector
                name={`${fieldKey}.cta.primary--hover.border.width`}
                value={
                  formik?.values[fieldKey]?.cta?.['primary--hover']?.border
                    ?.width
                }
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Secondary</Typography>
            <TextField
              name={`${fieldKey}.cta.secondary.backgroundColor`}
              value={
                formik?.values[fieldKey]?.cta?.secondary?.backgroundColor ||
                defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <Stack direction="row">
              <TextField
                name={`${fieldKey}.cta.secondary.textColor`}
                value={
                  formik?.values[fieldKey]?.cta?.secondary?.textColor ||
                  defaultColor
                }
                type="color"
                label="Text"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <FontStyleSelector
                name={`${fieldKey}.cta.secondary.style`}
                value={formik?.values[fieldKey]?.cta.secondary?.style}
                setFieldValue={formik.setFieldValue}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                name={`${fieldKey}.cta.secondary.border.color`}
                value={
                  formik?.values[fieldKey]?.cta?.secondary?.border?.color ||
                  defaultColor
                }
                type="color"
                label="Border"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <BorderWidthSelector
                name={`${fieldKey}.cta.secondary.border.width`}
                value={formik?.values[fieldKey]?.cta?.secondary?.border?.width}
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Secondary Hover</Typography>
            <TextField
              name={`${fieldKey}.cta.secondary--hover.backgroundColor`}
              value={
                formik?.values[fieldKey]?.cta?.['secondary--hover']
                  .backgroundColor || defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <Stack direction="row">
              <TextField
                name={`${fieldKey}.cta.secondary--hover.textColor`}
                value={
                  formik?.values[fieldKey]?.cta?.['secondary--hover']
                    .textColor || defaultColor
                }
                type="color"
                label="Text"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <FontStyleSelector
                name={`${fieldKey}.cta.secondary--hover.style`}
                value={formik?.values[fieldKey]?.cta['secondary--hover']?.style}
                setFieldValue={formik.setFieldValue}
              />
            </Stack>
            <Stack direction="row">
              <TextField
                name={`${fieldKey}.cta.secondary--hover.border.color`}
                value={
                  formik?.values[fieldKey]?.cta?.['secondary--hover'].border
                    .color || defaultColor
                }
                type="color"
                label="Border"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <BorderWidthSelector
                name={`${fieldKey}.cta.secondary--hover.border.width`}
                value={
                  formik?.values[fieldKey]?.cta?.['secondary--hover'].border
                    .width
                }
                onChange={handleInputChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider>Navigation</Divider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={`${fieldKey}.navigation.backgroundColor`}
              value={
                formik?.values[fieldKey]?.navigation?.backgroundColor ||
                defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: 200,
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Link</Typography>
            <TextField
              name={`${fieldKey}.navigation.link.backgroundColor`}
              value={
                formik?.values[fieldKey]?.navigation?.link?.backgroundColor ||
                defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <Stack direction="row">
              <TextField
                name={`${fieldKey}.navigation.link.textColor`}
                value={
                  formik?.values[fieldKey]?.navigation?.link?.textColor ||
                  defaultColor
                }
                type="color"
                label="Text"
                onChange={handleInputChange}
                sx={{
                  width: '100%',
                }}
              />
              <FontStyleSelector
                name={`${fieldKey}.navigation.style`}
                value={formik?.values[fieldKey]?.navigation?.link?.style}
                setFieldValue={formik.setFieldValue}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Link Hover</Typography>
            <TextField
              name={`${fieldKey}.navigation.link--hover.backgroundColor`}
              value={
                formik?.values[fieldKey]?.navigation?.['link--hover']
                  ?.backgroundColor || defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <TextField
              name={`${fieldKey}.navigation.link--hover.textColor`}
              value={
                formik?.values[fieldKey]?.navigation?.['link--hover']
                  ?.textColor || defaultColor
              }
              type="color"
              label="Text"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Link Active</Typography>
            <TextField
              name={`${fieldKey}.navigation.link--active.backgroundColor`}
              value={
                formik?.values[fieldKey]?.navigation?.['link--active']
                  ?.backgroundColor || defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <TextField
              name={`${fieldKey}.navigation.['link--active'].textColor`}
              value={
                formik?.values[fieldKey]?.navigation?.['link--active']
                  ?.textColor || defaultColor
              }
              type="color"
              label="Text"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Dropdown Link</Typography>
            <TextField
              name={`${fieldKey}.navigation.dropdown.backgroundColor`}
              value={
                formik?.values[fieldKey]?.navigation?.dropdown
                  ?.backgroundColor || defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <TextField
              name={`${fieldKey}.navigation.dropdown.textColor`}
              value={
                formik?.values[fieldKey]?.navigation?.dropdown.textColor ||
                defaultColor
              }
              type="color"
              label="Text"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Dropdown Link Hover</Typography>
            <TextField
              name={`${fieldKey}.navigation.dropdown--hover.backgroundColor`}
              value={
                formik?.values[fieldKey]?.navigation?.['dropdown--hover']
                  ?.backgroundColor || defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <TextField
              sx={{
                width: '100%',
              }}
              type="color"
              value={
                formik?.values[fieldKey]?.navigation?.['dropdown--hover']
                  ?.textColor || defaultColor
              }
              name={`${fieldKey}.navigation.dropdown--hover.textColor`}
              label="Text"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Dropdown Link Active</Typography>
            <TextField
              name={`${fieldKey}.navigation.dropdown--active.backgroundColor`}
              value={
                formik?.values[fieldKey]?.navigation?.['dropdown--active']
                  ?.backgroundColor || defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <TextField
              name={`${fieldKey}.navigation.dropdown--active.textColor`}
              value={
                formik?.values[fieldKey]?.navigation?.['dropdown--active']
                  ?.textColor || defaultColor
              }
              type="color"
              sx={{
                width: '100%',
              }}
              label="Text"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>Footer</Divider>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <TextField
              name={`${fieldKey}.footer.backgroundColor`}
              value={
                formik?.values[fieldKey]?.footer?.backgroundColor ||
                defaultColor
              }
              type="color"
              label="Background"
              onChange={handleInputChange}
              sx={{
                width: '100%',
              }}
            />
            <TextField
              name={`${fieldKey}.footer.textColor`}
              value={
                formik?.values[fieldKey]?.footer?.textColor || defaultColor
              }
              type="color"
              label="Text"
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
            }}
          >
            <Typography variant="h6">Text Links</Typography>
            <TextField
              name={`${fieldKey}.footer.link.textColor`}
              value={
                formik?.values[fieldKey]?.footer?.link?.textColor ||
                defaultColor
              }
              type="color"
              label="Link"
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              name={`${fieldKey}.footer.link--hover.textColor`}
              value={
                formik?.values[fieldKey]?.footer?.['link--hover'].textColor ||
                defaultColor
              }
              type="color"
              label="Link Hover"
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            />
            <FontStyleSelector
              name={`${fieldKey}.footer.link--hover.style`}
              value={formik?.values[fieldKey]?.footer?.['link--hover'].style}
              setFieldValue={formik.setFieldValue}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              sx={{
                width: '100%',
              }}
              type="color"
              value={
                formik?.values[fieldKey]?.footer?.['link--active'].textColor ||
                defaultColor
              }
              name={`${fieldKey}.footer.link--active.textColor`}
              label="Link Active"
              onChange={handleInputChange}
            />
            <FontStyleSelector
              value={formik?.values[fieldKey]?.footer?.['link--active'].style}
              name={`${fieldKey}.footer.link--active.style`}
              setFieldValue={formik.setFieldValue}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider>Schedule cards</Divider>
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.schedule.states.live`}
              value={
                formik?.values[fieldKey]?.schedule?.states?.live || defaultColor
              }
              type="color"
              label="Live"
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.schedule.states.pre`}
              value={
                formik?.values[fieldKey]?.schedule?.states?.pre || defaultColor
              }
              type="color"
              label="Pre"
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.schedule.states.default`}
              value={
                formik?.values[fieldKey]?.schedule?.states?.default ||
                defaultColor
              }
              type="color"
              label="Default"
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.schedule.states.post`}
              value={
                formik?.values[fieldKey]?.schedule?.states?.post || defaultColor
              }
              type="color"
              label="Post"
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name={`${fieldKey}.schedule.states.losingTeam`}
              value={
                formik?.values[fieldKey]?.schedule?.states?.losingTeam ||
                defaultColor
              }
              type="color"
              label="Losing Team Color"
              sx={{
                width: '100%',
              }}
              onChange={handleInputChange}
            />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default WebContent
