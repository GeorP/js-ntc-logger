import { ILogWriter } from '../core/i/ILogWriter';


/**
 * Writes logs to console
 */
export class WriterToConsole implements ILogWriter {

    /**
     * Save log record
     */
    save (item: string): void {
        console.log(item);
    }
}