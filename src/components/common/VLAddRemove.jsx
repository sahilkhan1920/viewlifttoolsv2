import ControlPointIcon from '@mui/icons-material/ControlPoint'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IconButton } from '@mui/material'

const VLAddRemove = ({ index, total, onAdd, onRemove }) => {
  const isLast = index === total - 1
  const singleItem = total === 1
  const showAdd = singleItem || isLast

  return (
    <>
      {showAdd && (
        <IconButton
          size="large"
          aria-label="Add Section"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          // onClick={handleOpenNavMenu}
          color="primary"
          onClick={onAdd}
        >
          <ControlPointIcon />
        </IconButton>
      )}

      <IconButton
        size="large"
        aria-label="Remove Section"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onRemove}
        color="primary"
      >
        <RemoveCircleOutlineIcon />
      </IconButton>
    </>
  )
}

export default VLAddRemove
