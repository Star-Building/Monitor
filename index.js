// download.js
import fs from 'fs'
import https from 'https'
import http from 'http'
import { exec as execCb } from "node:child_process";
import { promisify } from "node:util";
const exec = promisify(execCb);

import {
    basename
} from 'path'
import {
    URL
} from 'url'

const TIMEOUT = 10000

deletableFile("video1.mp4");
deletableFile("./windows-amd64/data/video1.mp4");
download('https://ohanastar.com/wp-content/uploads/2024/10/video1.mp4', './windows-amd64/data/video1.mp4').then(() => {
    console.log('Downloaded video1.mp4')
}).catch((err) => {
    console.error(err)
})


deletableFile("video2.mp4");
deletableFile("./windows-amd64/data/video2.mp4");
deletableFile("video2nosound.mp4");
deletableFile("./windows-amd64/data/video2nosound.mp4");
download('https://ohanastar.com/wp-content/uploads/2024/10/video2.mp4', './windows-amd64/data/video2.mp4').then(() => {
    console.log('Downloaded video2.mp4')

    // console.log(`${new Date()} : CHILD STARTED`);
    const { error, stdout, stderr } = exec("ffmpeg -i ./windows-amd64/data/video2.mp4 -c copy -an ./windows-amd64/data/video2nosound.mp4");

}).catch((err) => {
    console.error(err)
})

function download(url, dest) {
    const uri = new URL(url)
    if (!dest) {
        dest = basename(uri.pathname)
    }
    const pkg = url.toLowerCase().startsWith('https:') ? https : http

    return new Promise((resolve, reject) => {
        const request = pkg.get(uri.href).on('response', (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest, {
                    flags: 'wx'
                })
                res
                    .on('end', () => {
                        file.end()
                        // console.log(`${uri.pathname} downloaded to: ${path}`)
                        resolve()
                    })
                    .on('error', (err) => {
                        file.destroy()
                        fs.unlink(dest, () => reject(err))
                    }).pipe(file)
            } else if (res.statusCode === 302 || res.statusCode === 301) {
                // Recursively follow redirects, only a 200 will resolve.
                download(res.headers.location, dest).then(() => resolve())
            } else {
                reject(new Error(`Download request failed, response status: ${res.statusCode} ${res.statusMessage}`))
            }
        })
        request.setTimeout(TIMEOUT, function () {
            request.abort()
            reject(new Error(`Request timeout after ${TIMEOUT / 1000.0}s`))
        })
    })
}

function deletableFile(deleteFile) {
    // const deleteFile = './docs/deleteme.txt'
    if (fs.existsSync(deleteFile)) {
        fs.unlink(deleteFile, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('deleted');
        })
    }
}

export default download