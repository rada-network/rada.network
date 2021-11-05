import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
import { dir } from 'console'

const getFiles = (dirRelativeFolder) => {
    const { serverRuntimeConfig } = getConfig()
    const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, './pages', dirRelativeFolder);
    const filenames = fs.readdirSync(dir);
    const files = []
    const folders = []
    // const images = filenames.map(name => path.join('/', dirRelativeFolder, name))
    filenames.forEach(name => {
        const p = path.join(dir, name)
        const uri = path.join('/', dirRelativeFolder, name)
        // check if file or fodler
        if (fs.lstatSync(p).isDirectory()) {
            folders.push(uri)
        } else {
            if (name.match(/\.js$/)) {
                if (name == 'index.js') files.push(path.join('/', dirRelativeFolder))
                else files.push(uri.substr(0, uri.length-3))
            }
        }
    })

    return {files, folders}
}

export default (req, res) => {
    let dirs = ['concepts']
    let paths = []
    let d
    while (dirs.length) {
        d = dirs.pop()
        const {files, folders} = getFiles(d)
        dirs = dirs.concat(folders)
        paths = paths.concat(files)
    }

  res.statusCode = 200
  res.json(paths);
}
