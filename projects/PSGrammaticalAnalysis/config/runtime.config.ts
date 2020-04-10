const BASE_URL = process.env.BASE_URL
const IS_DEV = process.env.NODE_ENV === 'development'
const BD_APP_ID = process.env.BD_APP_ID || ""
const BD_KEY = process.env.BD_KEY || ""

export {
  BASE_URL,
  IS_DEV,
  BD_APP_ID,
  BD_KEY
}
