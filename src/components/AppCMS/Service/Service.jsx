
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import {
  Box,
  Container,
  Grid,
  Switch,
  TextField,
  Button,
  FormControl,
  Radio,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  FormGroup,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import useService from "./useService";
import { useState, useEffect } from "react";


export default function Service() {
  const { formik, getKeyName } = useService();
  const [serviceType, setServiceType] = useState();
  const [selectedValues, setSelectedValues] = useState();
  const [domainNames, setdomainNames] = useState();

  let dataFilter = domainNames?.filter(e => e)//domainNames?.filter((value) => value !== null ) ;
  useEffect(() => {
    setServiceType(formik.values?.serviceType);
  }, [formik.values?.serviceType]);

  useEffect(() => {
    setSelectedValues(formik.values?.serviceTypes);
  }, [formik.values?.serviceTypes]);

  useEffect(() => {
    setdomainNames(formik.values?.domainName);
  }, [formik.values?.domainName]);

  const [htmlElements, setDomainFields] = useState([]);
  const addDomainName = () => {
    setDomainFields([...htmlElements, <div key={htmlElements.length} style={{ width: '94%', float: 'right' }}>
      <TextField
        sx={{
          width: "100%",
          margin: "0 0 24px 0",
        }}
        size="small"
        type="text"
        name="domainName"
        placeholder="Enter domain Name"
        onClick={() => getKeyName('domainName')}
        onChange={formik.handleChange('domainName')}
      // onClick={e => {
      //   formik.setFieldValue(`domainName.${lastIndex}`)
      //   getKeyName('domainName')
      // }}
      />

    </div>]);
  };

  const deleteDomainName = (index) => {
    const updatedElements = htmlElements.filter((_, i) => i !== index);
    setDomainFields(updatedElements);
  };

  return (
    <>
      {" "}
      {formik.initialValues ? <>
        <Container>
          <Typography
            variant="h5"
            color="primary"
            align="center"
            sx={{
              m: 2,
            }}
          >
            Service
          </Typography>
          <Divider />
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <Grid
              xs={6}
              sx={{
                padding: 2,
                margin: "0 auto",
              }}
            >
              <Typography sx={{ mb: 1 }} color="primary">Company Name</Typography>
              <TextField
                sx={{
                  width: "100%",
                  margin: "0 0 19px 0",
                }}
                size="small"
                type="text"
                name="companyName"
                id="companyName"
                value={formik.values?.companyName}
                placeholder="Enter Company Name"
                onChange={formik.handleChange}
              />
              <Typography sx={{ mb: 1 }}>Service Name</Typography>
              <TextField
                sx={{
                  width: "100%",
                  margin: "0 0 19px 0",
                }}
                size="small"
                type="text"
                name="serviceName"
                value={formik.values?.serviceName}
                placeholder="Enter Service Name"
                onChange={formik.handleChange}
              />
              <Typography sx={{ mb: 1 }} color="primary">Service Types</Typography>
              <Grid
                sx={{
                  display: "flow-root",
                  margin: "0px 0 19px 0px",
                  border: "1px solid #ccc",
                }}
              >
                <FormControl
                  sx={{ display: "inline-block", margin: "5px 0 5px 10px" }}
                >
                  {serviceType && (
                    <>
                      <RadioGroup
                        defaultValue={serviceType}
                        name="radio-buttons-group"

                      >
                        <FormControlLabel
                          value="subscription"
                          control={<Radio />}
                          label="Subscription (SVOD)"
                          name="serviceType"
                          onChange={formik.handleChange}
                        />
                        <FormControlLabel
                          value="Transaction"
                          control={<Radio />}
                          label="Transaction (TVOD)"
                          name="serviceType"
                          onChange={formik.handleChange}
                        />
                        <FormControlLabel
                          value="Advertisement"
                          control={<Radio />}
                          label="Advertisement (AVOD)"
                          name="serviceType"
                          onChange={formik.handleChange}
                        />
                        <FormControlLabel
                          value="TV Everywhere"
                          control={<Radio />}
                          label="'TV Everywhere (TVE)"
                          name="serviceType"
                          onChange={formik.handleChange}
                        />

                      </RadioGroup>
                    </>)}
                </FormControl>
              </Grid>
              <Typography sx={{ mb: 1 }} color="primary">Monetization Types</Typography>
              <Grid
                sx={{
                  display: "flow-root",
                  border: "1px solid #ccc",
                  margin: "0px 0 19px 0px",
                }}
              >
                <FormControl sx={{ display: "flex", margin: "5px 0 5px 10px" }}>
                  {selectedValues && (
                    <>
                      <FormGroup onClick={() => getKeyName("serviceTypes")}>
                        <FormControlLabel
                          value="SVOD"
                          control={
                            <Checkbox
                              checked={formik.values?.serviceTypes?.includes(
                                "SVOD"
                              )}
                              name="serviceTypes"
                              onChange={formik.handleChange}
                            />
                          }
                          label="Subscription (SVOD)"
                        />
                        <FormControlLabel
                          value="AVOD"
                          control={
                            <Checkbox
                              checked={formik.values?.serviceTypes?.includes(
                                "AVOD"
                              )}
                              onChange={formik.handleChange}
                              name="serviceTypes"
                            />
                          }
                          label="Advertisement (AVOD)"
                        />
                        <FormControlLabel
                          value="TVOD"
                          control={
                            <Checkbox
                              checked={formik.values?.serviceTypes?.includes(
                                "TVOD"
                              )}
                              onChange={formik.handleChange}
                              name="serviceTypes"
                            />
                          }
                          label="Transaction (TVOD)"
                        />
                        <FormControlLabel
                          value="TVE"
                          control={
                            <Checkbox
                              checked={formik.values?.serviceTypes?.includes(
                                "TVE"
                              )}
                              name="serviceTypes"
                              onChange={formik.handleChange}
                            />
                          }
                          label="TV Everywhere (TVE)"
                        />
                      </FormGroup>
                    </>
                  )}
                </FormControl>
              </Grid>
              <Typography sx={{ mb: 1 }} color="primary">Hardwall</Typography>

              <Grid
                sx={{
                  display: "flow-root",
                  border: "1px solid #ccc",
                  margin: "0px 0 19px 0px",
                  padding: "11px 11px 0 11px",
                }}
              >Enable hardwall to force users to log in to access content
                <Switch
                  sx={{
                    float: "right",
                    margin: "0",
                  }}
                  checked={formik.values?.forceLogin}
                  name='forceLogin'
                  onChange={formik.handleChange('forceLogin')}
                />
              </Grid>
              <Typography sx={{ mb: 1 }} color="primary">Domain Name</Typography>
              {dataFilter && (
                <Grid
                  sx={{
                    display: "flow-root",
                    margin: "0px 0 19px 0px",
                  }}
                >

                  {dataFilter?.map((domain, index) => (
                    <>
                      {/* <DeleteIcon color="primary" 
                onClick={event => {
                  formik.setFieldValue(`domainName.${index}`)
                  getKeyName('domainName')
                }}

                /> */}
                      <TextField
                        key={index}
                        sx={{
                          width: "100%",
                          margin: "0 0 24px 0",
                        }}
                        size="small"
                        type="text"
                        name='domainName'
                        value={domain}
                        onChange={formik.handleChange}
                      />
                    </>
                  ))}

                  {htmlElements.map((element, index) => (
                    <div key={index} style={{
                      display: "flex",
                    }} >
                      <DeleteIcon color="primary"
                        onClick={() => {
                          //   formik.setFieldValue(`domainName.${index}`)
                          deleteDomainName(index)
                        }}

                      />
                      {element}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      width: 245,
                      height: '49px',
                      display: 'block',
                      margin: '0 auto',
                    }}
                    onClick={addDomainName}
                  >
                    + Add More
                  </Button>
                </Grid>
              )}

            </Grid>
          </Box>
          <Divider />
          <Button variant="contained" color="primary" type="submit" sx={{
            width: 235,
            height: '49px',
            display: 'block',
            float: 'right',
            margin: '29px 0 30px 0'
          }}>
            Save
          </Button>
        </Container>
      </> : <>
        <VLLoaderWrapper loading={'loading'} />
      </>}

    </>
  );
}
