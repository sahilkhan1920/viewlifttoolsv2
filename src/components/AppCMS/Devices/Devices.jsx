import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from "@mui/icons-material/Apple";
import BarChartIcon from "@mui/icons-material/BarChart";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import VLLoaderWrapper from "src/components/common/VLLoaderWrapper";
import styles from "../../../../styles/devices.module.css";
import AddmoreDevices from "./AddmoreDevices";
import Ios from "./Ios";
import AppleTv from "./AppleTv";
import Android from "./Android";
import { Box, Container, Grid, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import useDevices from "./useDevices";

 

export default function Devices() {
  let { formik } = useDevices();

 
  return (
    <>
      {" "}
      {formik.initialValues ? (
        <>
          <Container>
            <Typography
              variant="h4"
              color="primary"
              align="center"
              sx={{
                m: 2,
              }}
            >
              Devices
            </Typography>
            <Divider color="primary" />
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <Grid
                xs={12}
                sx={{
                  padding: 0,
                }}
              >
                <Accordion className={`${styles.acordionBackground}`}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={`${styles.ios}`}
                  >
                    <AppleIcon className={`${styles.appleIcon}`} />
                    <Grid xs={2}>
                      iOS - <span>pad, phone</span>
                      <br />
                      <small>App Status : NA</small>
                    </Grid>
                    <Grid xs={5}>
                      <div className={`${styles.buildStatus}`}>
                        Build Status (Automatic Release <b>0%</b>)
                      </div>
                      <div className={`${styles.buildMessage}`}>
                        Message : Build Added To Queue. Will Start Shortly
                      </div>
                    </Grid>
                    <Grid
                      xs={2}
                      className={`${styles.buildActions}`}
                      sx={{
                        paddingTop: 1,
                      }}
                    >
                      <BarChartIcon
                        className={`${styles.barIcon}`}
                        sx={{
                          paddingTop: 1,
                        }}
                      />
                      <AvTimerIcon className={`${styles.time}`} />
                    </Grid>
                    <Grid
                      xs={3}
                      sx={{
                        paddingTop: 1,
                      }}
                      className={`${styles.buildCta}`}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: 158,
                          display: "block",
                          float: "right",
                          marginRight: "9px",
                        }}
                      >
                        IN PROGRESS
                      </Button>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails className={`${styles.expendedBackground}`}>
                    <Ios />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={`${styles.ios}`}
                  >
                    <AppleIcon className={`${styles.appleIcon}`} />
                    <Grid xs={2}>
                      Apple TV - <span>pad, phone</span>
                      <br />
                      <small>App Status : NA</small>
                    </Grid>
                    <Grid xs={5}>
                      <div className={`${styles.buildStatus}`}>
                        Build Status (Automatic Release <b>0%</b>)
                      </div>
                      <div className={`${styles.buildMessage}`}>
                        Message : Build Added To Queue. Will Start Shortly
                      </div>
                    </Grid>
                    <Grid
                      xs={2}
                      className={`${styles.buildActions}`}
                      sx={{
                        paddingTop: 1,
                      }}
                    >
                      <BarChartIcon
                        className={`${styles.barIcon}`}
                        sx={{
                          paddingTop: 1,
                        }}
                      />
                      <AvTimerIcon className={`${styles.time}`} />
                    </Grid>
                    <Grid
                      xs={3}
                      sx={{
                        paddingTop: 1,
                      }}
                      className={`${styles.buildCta}`}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: 158,
                          display: "block",
                          float: "right",
                          marginRight: "9px",
                        }}
                      >
                        IN PROGRESS
                      </Button>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails className={`${styles.expendedBackground}`}>
                    <AppleTv />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={`${styles.ios}`}
                  >
                    <AndroidIcon className={`${styles.appleIcon}`} />
                    <Grid xs={2}>
                      ANDROID - <span>pad, phone</span>
                      <br />
                      <small>App Status : NA</small>
                    </Grid>
                    <Grid xs={5}>
                      <div className={`${styles.buildStatus}`}>
                        Build Status (Automatic Release <b>0%</b>)
                      </div>
                      <div className={`${styles.buildMessage}`}>
                        Message : Build Added To Queue. Will Start Shortly
                      </div>
                    </Grid>
                    <Grid
                      xs={2}
                      className={`${styles.buildActions}`}
                      sx={{
                        paddingTop: 1,
                      }}
                    >
                      <BarChartIcon
                        className={`${styles.barIcon}`}
                        sx={{
                          paddingTop: 1,
                        }}
                      />
                      <AvTimerIcon className={`${styles.time}`} />
                    </Grid>
                    <Grid
                      xs={3}
                      sx={{
                        paddingTop: 1,
                      }}
                      className={`${styles.buildCta}`}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: 158,
                          display: "block",
                          float: "right",
                          marginRight: "9px",
                        }}
                      >
                        IN PROGRESS
                      </Button>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails className={`${styles.expendedBackground}`}>
                    <Android />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Box>

            <AddmoreDevices />
            <Divider />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                width: 235,
                height: "49px",
                display: "block",
                float: "right",
                margin: "29px 0 30px 0",
              }}
            >
              Save
            </Button>
          </Container>
        </>
      ) : (
        <>
          <VLLoaderWrapper loading={"loading"} />
        </>
      )}
    </>
  );
}
