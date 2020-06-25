import {AxiosRequestConfig} from 'axios'
import {ACCESS_TOKEN} from 'src/config';
import {ipcRenderer} from 'electron';

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
      method: 'put',
      url: `/repos/${owner}/${repo}/contents/${path}`,
      data: body
    }
  }
}

const commonApi = {
  pingIP(): Promise<string> {
    ipcRenderer.send('ping-ip')
    return new Promise((resolve, reject) => {
      ipcRenderer.on('pong-ip', (event, {isSuccess, res}) => {
        if (isSuccess) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  pingGithub(): Promise<boolean> {
    ipcRenderer.send('ping-github')
    return new Promise((resolve, reject) => {
      ipcRenderer.on('pong-github', (event, message) => {
        if (message) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }
}

export {
  githubApi,
  commonApi
}
