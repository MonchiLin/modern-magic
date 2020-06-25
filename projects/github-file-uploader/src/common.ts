import path from 'path'
import fs from 'fs-extra'

const toBase64ForNode = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const toBase64ForJS = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

type FileRecord = {
  name: string;
  ext: string;
  uploading: boolean;
  uploaded: boolean;
  error: Error | null | boolean;
  base64: string;
  uri: string;
  size: number,
  mineType: string;
}

const MINE_TYPES = {
  'png': 'data:image/png;base64',
  'jpg': 'data:image/jpg;base64',
  'jpeg': 'data:image/jpeg;base64',
}

function getFileRecord(fileOrPath: string | File): FileRecord {
  const fileRecord: FileRecord = {
    name: '',
    ext: '',
    uploading: false,
    uploaded: false,
    error: false,
    base64: '',
    size: 0,
    uri: '',
    mineType: 'data;base64',
  }

  if (fileOrPath instanceof File) {
    fileRecord.name = fileOrPath.name
    fileRecord.ext = path.extname(fileOrPath.name)
    fileRecord.base64 = fs.readFileSync(fileOrPath.path, {encoding: 'base64'})
    fileRecord.size = fileOrPath.size
  } else {
    fileRecord.name = path.basename(fileOrPath)
    fileRecord.ext = path.extname(fileOrPath)
    fileRecord.base64 = fs.readFileSync(fileOrPath, {encoding: 'base64'})
    fileRecord.size = fs.statSync(fileOrPath).size
  }

  if (MINE_TYPES[fileRecord.ext]) {
    fileRecord.mineType = MINE_TYPES[fileRecord.ext]
  }

  return fileRecord
}

const isValidURL = (url) => {
  try {
    return new URL(url)
  } catch (e) {
    return null
  }
}

export {
  isValidURL,
  FileRecord,
  getFileRecord,
  toBase64ForJS,
  toBase64ForNode
}
