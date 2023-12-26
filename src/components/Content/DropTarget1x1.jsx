import { useDrop } from 'react-dnd';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const DropTarget1x1 = ({targetId,imgSrc1x1,imgId1x1,handleImageDrop,handleImageDeletion}) => {
  const [, drop] = useDrop(() => ({
    accept: 'IMAGE',
    drop: (item) => {
      // Do something with the dropped image item (e.g., handle the dropped image URL)
      handleImageDrop(targetId,item)
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {imgSrc1x1 ? (
        <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
        >
          <img
            src={imgSrc1x1}
            alt="Dropped Image"
            width= '100%'
            height= '100%'
          />
          <div
            style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              zIndex: 999,
              width: '30px',
              height: '30px',
              padding: '3px',
              backgroundColor: 'white',
              textAlign: 'center',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            id='delete1x1'
            data-imageid={imgId1x1}
            onClick={handleImageDeletion}
          >
            <DeleteIcon />
          </div>
        </div>
      ) : (
        <label style={{fontSize: "12px"}}>1080 x 1080 images here</label>
      )}
    </div>
  );
};

export default DropTarget1x1