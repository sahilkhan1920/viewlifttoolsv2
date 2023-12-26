import { useDrag } from 'react-dnd';

const ImageItem = ({ imageId, imageSrc }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'IMAGE',
    item: { imageSrc,imageId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={imageSrc}
      alt="Draggable Image"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      width="150px"
      height="110px"
    />
  );
};

export default ImageItem

