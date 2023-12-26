import React from 'react';
import { useDrop,useDrag } from 'react-dnd';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// eslint-disable-next-line
// const DraggableItem = ({ item, index, moveItem, isReordering, handleVideoplaylistDeletion }) => {
//   const [{ isDragging }, dragRef] = useDrag({
//     type: 'ITEM',
//     item: { index, isReordering },
//     collect: monitor => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <Box
//       ref={dragRef} 
//       sx={{
//         width: "90%", height: 40, padding: "5px 10px", border: "1px solid #ccc", color: "#6f7276",
//         overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", borderRadius: "3px",
//         opacity: isDragging ? 0.5 : 1, cursor: 'move', display: "flex", alignItems: "center", justifyContent: "space-between"
//       }}
//       id={item.id}
//     >
//       <Box>
//         {item.title}
//       </Box>
//       <div
//         data-videoid={item.id}
//         style={{
//           cursor: "pointer"
//         }}
//         onClick={handleVideoplaylistDeletion}
//       >
//         <DeleteIcon />
//       </div>
//     </Box>
//   );
// };
  
export const DroppableContainer = ({ item, id, index, videoplaylist, setVideoplaylist, moveItem, setFailedAutosave, isReordering, handleAutosave, handleVideoplaylistDeletion }) => {
  const ref = React.useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'ITEM',
    collect(monitor) {
      return {
          handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if(item.isReordering){
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        moveItem(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      }
    },
    drop: (draggedItem) => {
      // Handle the drop event, provide feedback, or perform side effects
      if(!draggedItem.isReordering){
        let invalid = videoplaylist.find(function (element) {
          if(draggedItem.videoId === element.id){
            let autosaveFailedBox = document.getElementById("autosaveFailed");
            autosaveFailedBox.innerText = "Video is already added!"
            setFailedAutosave(true)
            setTimeout(() => {
              setFailedAutosave(false)
              autosaveFailedBox.innerText = "Autosave Failed!"
            }, 2000)
            return true
          };
        });
        if(invalid){
          return;
        } else {
          const updatedVideoplaylist = [...videoplaylist, {id: draggedItem.videoId, title: draggedItem.videoTitle}]
          handleAutosave(null,'videoList',updatedVideoplaylist)
          setVideoplaylist(prev => [...prev, {id: draggedItem.videoId, title: draggedItem.videoTitle}])
        }
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: () => {
      return { id, index, isReordering };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref))

  return (
    // <Box
    //   ref={dropRef}
    //   sx={{
    //     width: "600px",
    //     height: "100%",
    //     border: "1px dotted #ccc",
    //     borderRadius: "5px",
    //     padding: "10px",
    //     overflowY: "auto"
    //   }}
    // >
    //   {videoplaylist.length > 0 ?
    //     <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "7.5px"}}>
    //       {videoplaylist.map((item, index) => (
    //         <DraggableItem key={index} item={item} index={index} moveItem={moveItem} isReordering={true} handleVideoplaylistDeletion={handleVideoplaylistDeletion}/>
    //       ))}
    //     </Box>
    //     : <Box sx={{textAlign: "center", color: "#6f7276"}}>Drop videos here</Box>
    //   }
    // </Box>
    // <DraggableItem key={index} item={item} index={index} moveItem={moveItem} isReordering={isReordering} handleVideoplaylistDeletion={handleVideoplaylistDeletion}/>
    <div style={{width: "100%"}}>
      {videoplaylist.length > 0 ? 
        <div
          ref={ref} 
          style={{
            width: "100%", height: 40, padding: "5px 10px", border: "1px solid #ccc", color: "#6f7276",
            overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", borderRadius: "3px",
            opacity: isDragging ? 0.5 : 1, cursor: 'move', display: "flex", alignItems: "center", justifyContent: "space-between"
          }}
          id={item.id}
          data-handler-id={handlerId}
        >
          <Box>
            {item.title}
          </Box>
          <div
            data-videoid={item.id}
            style={{
              cursor: "pointer"
            }}
            onClick={handleVideoplaylistDeletion}
          >
            <DeleteIcon />
          </div>
        </div> : 
        <div ref={ref} style={{width: "100%", height: "440px"}}></div>
      }
    </div>
  );
};