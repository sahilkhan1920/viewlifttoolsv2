interface useCsvGeneratorPropType<T> {
  data: T[]
}
/**
 * The `useCsvGenerator` function is a TypeScript React hook that provides functionality to generate
 * and download CSV files from an array of objects.
 * @param  - The `useCsvGenerator` function takes in a generic type `T` and an object `data` as its
 * parameter. The `data` object is an array of objects of type `T`.
 * @returns The function `useCsvGenerator` returns an object with a single property `downloadAsCsv`,
 * which is a function.
 */
const useCsvGenerator = <T extends object>({ data }: useCsvGeneratorPropType<T>) => {
  /**
   * The function prepares CSV data by converting an array of objects into a comma-separated string.
   * @param {T[]} data - An array of objects of type T.
   * @returns The function `prepareCsvData` returns a string that represents the CSV data.
   */
  const prepareCsvData = (data: T[]) => {
    if (data.length === 0) return
    const csvData = []
    const _headers = Object.keys(data[0])
    csvData.push(_headers)
    data.map((_item) => csvData.push(Object.values(_item)))
    let _content = ''
    csvData.forEach((row) => (_content += row.join(',') + '\n'))
    return _content
  }

  /**
   * The function `downloadAsCsv` prepares CSV data, creates a download link for the CSV file, and
   * triggers a click event on the link to initiate the download.
   */
  const downloadAsCsv = (elementId: string, filename: string) => {
    if (data.length === 0) return
    const _parsed = prepareCsvData(data)
    if (!_parsed) return
    const _blob = new Blob([_parsed], { type: 'text/csv' })
    const _url = URL.createObjectURL(_blob)
    console.log(_url)
    const _a = document.getElementById(elementId) as HTMLAnchorElement
    _a.setAttribute('href', _url)
    _a.setAttribute('download', `${filename}.csv`)
    _a.click()
  }

  return { downloadAsCsv }
}

export default useCsvGenerator
