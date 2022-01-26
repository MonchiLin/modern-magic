const axios = require('axios')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const child_process = require('child_process')
const rimraf = require('rimraf')

'https://cm15-c110-2.play.bokecc.com/flvs/FC811B3AFE595DA3/2020-10-10/A95EEE12AF4D96439C33DC5901307461-20.ts?video=0&t=1612794594&key=26CBB3BB77521C266BDFBA1457392292&tpl=10&tpt=222&upid=2656701612787394388&version=ios_3.2.0'
'https://cm15-c110-2.play.bokecc.com/flvs/FC811B3AFE595DA3/2020-10-10/A95EEE12AF4D96439C33DC5901307461-20.ts?video=4893&t=1612794594&key=26CBB3BB77521C266BDFBA1457392292&tpl=10&tpt=222&upid=2656701612787394388&version=ios_3.2.0'

const getVideoUrl = ({ video }) => {
  return `https://cm15-c110-2.play.bokecc.com/flvs/FC811B3AFE595DA3/2020-10-10/A95EEE12AF4D96439C33DC5901307461-20.ts?video=${video}&t=1612794594&key=26CBB3BB77521C266BDFBA1457392292&tpl=10&tpt=222&upid=2656701612787394388&version=ios_3.2.0`
}

const getVideo = ({ fileName, url, rootDir }) => {
  return axios({
    method: 'get',
    url: url,
    responseType: 'stream'
  }).then(res => {
    res.data.pipe(fs.createWriteStream(path.join(rootDir, fileName + '.ts')))
  })
}

const downloadTSs = ({ rootDir, startPart, endPart }) => {
  _.range(startPart, endPart, 5)
    .forEach(index => {

    })

  return _.range(startPart, endPart, 5)
    .map(index => {
      return getVideo({ fileName: index, url: getVideoUrl({ video: index }) })
    })
}

const mergeTSs = ({ rootDir, folder, outdir }) => {
  const index = path.join(rootDir, folder, 'index')
  if (!fs.existsSync(index)) {
    return Promise.reject('未找到索引文件')
  }
  child_process.exec(`cd ${rootDir} &&  ffmpeg -i ${index}.txt -acodec copy -vcodec copy -absf aac_adtstoasc ${resultFile}`)
}

const main = async () => {
  const rootDir = path.join(__dirname, 'wtk')
  rimraf.sync(rootDir)
  fs.mkdirSync(rootDir)
  await Promise.all(downloadTSs({ rootDir, startPart: 0, endPart: 4893 }))
}

main()
