import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, TextField } from '@mui/material';
import ContentLoader from './ContentLoader';
import fetchHelper from 'src/helpers/fetchHelper'
import {
    CONTENT_BASE_URL
  } from 'src/constants/urlConstants'
import { useCookies } from 'react-cookie'
import VideoItem from './DraggableVideo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DroppableContainer } from './VideoDropTarget';
import update from 'immutability-helper';

export default function VideoPlaylist({videoplaylist, setVideoplaylist, setFailedAutosave, handleAutosave, handleVideoplaylistDeletion}) {
    const [cookies] = useCookies();
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [videoListData, setVideoListData] = React.useState([]);

    React.useEffect(()=>{
        if(expanded == "videoplaylist"){
          onVideoSearch()
          setLoading(true)
        }
        // eslint-disable-next-line
    },[expanded])

    const onVideoSearch = async(e) => {
        if(e && e.target.value){
          var url = CONTENT_BASE_URL + 'video' + '?offset=' + 0 + '&max=10&orderBy=lastUpdated&order=DESC&keywordValue=' + e.target.value
        } else {
          url = CONTENT_BASE_URL + 'video' + '?offset=' + 0 + '&max=10&orderBy=lastUpdated&order=DESC'
        }
        const result = await fetchHelper({
            url: url,
            method: "GET",
            headers: {
              xApiKey: cookies.managementXApiKey,
              Authorization:  cookies.accessToken,
            },
        })
        if(result && result.status == 200){
            setVideoListData(result.content)
            setLoading(false)
        }
    }

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    // const moveItem = (fromIndex, toIndex) => {
    //   const reorderedItems = [...videoplaylist];
    //   const [movedItem] = reorderedItems.splice(fromIndex, 1);
    //   reorderedItems.splice(toIndex, 0, movedItem);
  
    //   setVideoplaylist(reorderedItems);
    // };
    const moveItem = React.useCallback((dragIndex, hoverIndex) => {
      const dragCard = videoplaylist[dragIndex];
      setVideoplaylist(update(videoplaylist, {
          $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
          ],
      }));
    }, [videoplaylist]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{paddingTop: "40px"}}>
        <Accordion 
          expanded={expanded === 'videoplaylist'} 
          onChange={handleChange('videoplaylist')}
          sx={{
              backgroundColor: "white"
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="videoplaylist"
            sx={{
              minHeight: "70px"
            }}
          >
            <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "20px", fontWeight: 500, color: "#6f7276" }}>
              VIDEO PLAYLIST
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
              <Box
                  sx={{
                      display: 'flex',
                      alignItems: 'start',
                      justifyContent: 'center',
                      gap: '20px',
                      marginTop: '30px',
                      minWidth: 500,
                      height: 450,
                  }}
              > 
                {/* <DroppableContainer videoplaylist={videoplaylist} setVideoplaylist={setVideoplaylist} moveItem={moveItem} setFailedAutosave={setFailedAutosave}
                  handleAutosave={handleAutosave} handleVideoplaylistDeletion={handleVideoplaylistDeletion}
                /> */}
                <Box
                  sx={{
                    width: "600px",
                    height: "100%",
                    border: "1px dotted #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    overflowY: "auto"
                  }}
                >    
                {videoplaylist.length > 0 ? 
                  <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "7.5px"}}>
                    {videoplaylist.map((item, index) => (
                      <DroppableContainer key={item.id} item={item} id={item.id} index={index} videoplaylist={videoplaylist} setVideoplaylist={setVideoplaylist} moveItem={moveItem} setFailedAutosave={setFailedAutosave} isReordering={true} handleAutosave={handleAutosave} handleVideoplaylistDeletion={handleVideoplaylistDeletion}/>
                    ))}
                  </Box> : 
                  <DroppableContainer videoplaylist={videoplaylist} setVideoplaylist={setVideoplaylist} moveItem={moveItem} setFailedAutosave={setFailedAutosave} isReordering={true} handleAutosave={handleAutosave} handleVideoplaylistDeletion={handleVideoplaylistDeletion}/>
                }         
                </Box>
                <Box
                  sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position:'relative',
                      height: "100%",
                      width: 600,
                      overflowY: "auto"
                  }}
                >
                  <TextField 
                      id="searchVideos" 
                      label="Search Videos" 
                      variant="outlined" 
                      sx={
                          {
                              width: 600,
                              
                          }
                      }
                      onChange={(e) => {
                          setLoading(true)
                          setTimeout(() => {
                              onVideoSearch(e)
                          }, 1000)
                      }}
                      
                  />
                  {loading ? <Box><ContentLoader top="40%" left="45%"/></Box> : 
                    <Box sx={{width: "90%", display: "flex", flexDirection: "column", gap: "7.5px", marginTop: "10px"}}>
                        {videoListData.map((video,index) => (
                            <VideoItem key={index} videoId={video.guid} videoTitle={video.title} isReordering={false} />
                        ))}
                    </Box>
                  }
                </Box>                    
              </Box>
          </AccordionDetails>
        </Accordion>
      </div>
    </DndProvider>
  );
}