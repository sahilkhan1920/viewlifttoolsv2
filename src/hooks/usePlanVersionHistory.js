/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { GET_VERSION_HISTORY } from '../constants/urlConstants'
import fetchHelper from '../helpers/fetchHelper'

const usePlanVersionHistory = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getVersionHistory = async({
    //     site = 'staging-motv',
    //     max = 10,
    //     offset = 0,
    //     orderBy = 'lastUpdated',
    //     order = 'DESC',
    //   }) => {
    //     setLoading(true)
    //     const url = GET_VERSION_HISTORY
    //     const result = await fetchHelper({
    //       url:
    //         url +
    //         `?site=${site}&max=${max}&offset=${offset}&orderBy=${orderBy}&order=${order}`,
    //       method: 'GET',
    //       headers: {
    //         Authorization:
    //           'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaXRlIjoic3RhZ2luZy1tb3R2IiwiaWQiOiJkNDVlMmU5ZjFhZGQwYTMxMTA2YmY1YzIzMGQ1NTExYTgzZDk2NGNhMDlkZDQzZGYxYmZjZTkxYzg4MjE1ZjJiIiwiaXBhZGRyZXNzIjoiMTAwLjI0LjIzMC4xODciLCJjb3VudHJ5Q29kZSI6IldPUkxEV0lERSIsInByb3ZpZGVyIjoidmlld2xpZnQiLCJpYXQiOjE2NzYyMjAwNzMsImV4cCI6MTY3NjMwNjQ3M30.p-RjV5q0UqvRM0WTwrywjQPL3cubwGNcz6Mf_Sxchzo',
    //         'x-api-key': 'BxLjMn5Z3f5Vq1xJ29KAz2wSXRLtSXIE14CbIGmw',
    //       },
    //     })
    //     setLoading(false)
    //     setData(result?.plans)
  })

  return { loading, data, getVersionHistory }
}

export default usePlanVersionHistory
