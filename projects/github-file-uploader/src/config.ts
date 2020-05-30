const platform = process.platform
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const FileWarningSize = 50 * 1000 * 1000
const FileMaxSize = FileWarningSize * 2

export {
  platform,
  ACCESS_TOKEN,
  FileWarningSize,
  FileMaxSize,
}
