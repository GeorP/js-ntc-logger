import { ILogWriter, ILogWriterFactory } from '../core/i/ILogWriter';


/**
 * Writes logs to console
 */
export class WriterToConsole implements ILogWriter {

    // We need it for es5 compilation. Because in es5 we dont have classes and we can't just access WriterToConsole.name
    static get entityName (): string {
        return 'WriterToConsole';
    }

    static create (): ILogWriter {
        return new WriterToConsole();
    }

    /**
     * Save log record
     */
    save (item: string): void {
        console.log(item);
    }
}