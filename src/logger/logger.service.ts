import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'



@Injectable()
export class LoggerService extends ConsoleLogger{
    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle:'short',
            timeStyle: 'short',
            timeZone: 'Asia/Kolkata'
        }).format(new Date())}\t${entry}\n`

        const logDirectoryLocation = path.join(__dirname, '..', '..', 'logs')

        try {
            if (!fs.existsSync(logDirectoryLocation)) {
                await fs.promises.mkdir(logDirectoryLocation)
            }

            await fs.promises.appendFile(path.join(logDirectoryLocation, 'myLogFile.log'),formattedEntry)
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
            }
        }
    }

    log(message: any, context?: string) {
        const entry = `${context}\t ${message}`
        this.logToFile(entry)
        super.log(message, context)
    }


    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t ${message}`
        this.logToFile(entry)
        super.error(message, stackOrContext)
    }
}
