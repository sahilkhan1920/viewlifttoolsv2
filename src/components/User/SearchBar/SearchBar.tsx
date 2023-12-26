import { ChangeEventHandler, ReactNode, useState } from 'react'

import { Button, Container, InputAdornment, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'

import styles from './SearchBar.module.css'
import { SearchBarPropType } from 'src/types/SearchType'

export default function SearchBar({
  showClearButton = false,
  showDownloadCsvButton = false,
  showAddUserButton = false,
  dropdownListConfig,
  placeholder,
  buttonConfig,
  clearCb,
  style,
}: SearchBarPropType) {
  const { replace, query } = useRouter()
  const { keyword: _keyword, filter: _filter } = query as {
    keyword: string
    filter: string
  }
  const [keyword, setKeyword] = useState(_keyword?.trim().length > 0 ? _keyword : '')
  const [dropdownValue, setDropdownValue] = useState(_filter?.trim().length > 0 ? _filter : '')

  const onSearch = () => {
    if (!keyword.length || !dropdownValue.length) return
    replace(`/users/search?keyword=${keyword}&filter=${dropdownValue}`)
  }

  const onKeywordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target
    setKeyword(value.trim())
  }

  const onDropdownChange = (e: SelectChangeEvent<HTMLSelectElement>, child: ReactNode) => {
    const { props } = child as { props: { value: unknown; children: string } }
    setDropdownValue((props.children as string).toLowerCase())
  }

  const clearSearchInput = () => {
    if (clearCb) clearCb()
    setKeyword('')
    setDropdownValue('')
  }

  const SearchByDropdown = () => {
    return (
      <Select
        size="small"
        value={dropdownValue as unknown as HTMLSelectElement}
        onChange={onDropdownChange}
        variant="outlined"
        native={false}
        sx={{
          width: '170px',
        }}
      >
        <MenuItem disabled value="none">
          <em>Select one</em>
        </MenuItem>
        {dropdownListConfig.map(({ key, label, value }) => (
          <MenuItem key={key} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    )
  }

  return (
    <Container style={style} data-id="search-container" className={`${styles.searchContainer}`}>
      <OutlinedInput
        name="searchKeyword"
        id="searchKeyword"
        size="small"
        fullWidth
        type="text"
        placeholder={placeholder ?? 'Search...'}
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        }
        sx={{ width: '275px' }}
        value={keyword}
        onChange={onKeywordChange}
      />
      <SearchByDropdown />
      <Button
        variant="contained"
        size="large"
        sx={{
          minWidth: '90px',
        }}
        disabled={keyword.length && dropdownValue.length ? false : true}
        onClick={onSearch}
      >
        {buttonConfig?.searchButton?.label ?? 'Search'}
      </Button>
      {showClearButton ? (
        <Button variant="text" size="large" disabled={!keyword.length && !dropdownValue.length ? true : false} onClick={clearSearchInput}>
          {buttonConfig?.clearButton?.label ?? 'Clear'}
        </Button>
      ) : (
        false
      )}
      {showDownloadCsvButton ? (
        <>
          <Button variant="outlined" size="large" onClick={buttonConfig?.downloadCsvButton?.onClick}>
            {buttonConfig?.downloadCsvButton?.label ?? 'DOWNLOAD CSV'}
          </Button>
          <a id="searchbar_downloadCsvButton" hidden></a>
        </>
      ) : (
        false
      )}
      {showAddUserButton ? (
        <Button variant="contained" size="large" onClick={buttonConfig?.addNewUserButton?.onClick}>
          {buttonConfig?.addNewUserButton?.label ?? 'ADD NEW USER'}
        </Button>
      ) : (
        false
      )}
    </Container>
  )
}
