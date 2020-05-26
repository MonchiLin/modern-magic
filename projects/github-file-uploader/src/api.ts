import {AxiosRequestConfig} from 'axios'
import {ACCESS_TOKEN} from "src/config";

const GITHUB_BASEURL = 'https://api.github.com'

const githubApi = {
  // eslint-disable-next-line max-params
  createFile(
    owner,
    repo,
    path,
    body: {
      message: string,
      content: string,
      sha?: string,
      branch?: string,
      committer?: {
        name: string,
        email: string,
      },
      author?: {
        name: string,
        email: string,
      },
    }
  ): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `token ${ACCESS_TOKEN}`
      },
      baseURL: GITHUB_BASEURL,
      method: "put",
      url: `/repos/${owner}/${repo}/contents/${path}`,
      data: body
    }
  },
  ping(): AxiosRequestConfig {
    return {
      method: "get",
      url: "https://www.github.com",
      timeout: 6000
    }
  }
}

const commonApi = {
  mineIp(): AxiosRequestConfig {
    return {
      url: "http://myip.ipip.net",
    }
  }
}

export {
  githubApi,
  commonApi
}
