import { useDrop } from 'react-dnd';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const DropTarget3x4 = ({targetId,imgSrc3x4,imgId3x4,handleImageDrop,handleImageDeletion}) => {
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
      {imgSrc3x4 ? (
        <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
        >
          <img
            src={imgSrc3x4}
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
            id='delete3x4'
            data-imageid={imgId3x4}
            onClick={handleImageDeletion}
          >
            <DeleteIcon />
          </div>
        </div>
      ) : (
        <label style={{fontSize: "12px"}}>1070 x 1585 images here</label>
      )}
    </div>
  );
};

export default DropTarget3x4