import React from 'react'
import VLTable from './common/VLTable'
import columns from '../json/versonHistoryCol.json'

const VersionHistory = () => {
  const data = []
  return <VLTable data={data} columns={columns} />
}

export default VersionHistory
