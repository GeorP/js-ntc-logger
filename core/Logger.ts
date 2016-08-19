import { ILogHandler } from './i/ILogHandler';
import { ILoggingInterface, ILoggingInterfaceConstructor } from './i/ILoggingInterface';
import { ILogRecord, ILogRecordFactory } from './i/ILogRecord';

/**
 * Provides log functionality
 */
export class Logger {

    /**
     * List of handlers registered in Logger
     */
    protected _handlers: ILogHandler[];
    protected _loggingInterface: ILoggingInterface;

    constructor (logRecordFactory: ILogRecordFactory, LoggingInterface: ILoggingInterfaceConstructor) {
        this._handlers = [];

        /**
         * Default logging interface
         * @type {LoggingIntersface}
         * @protected
         */
        this._loggingInterface = new LoggingInterface(
            logRecordFactory,
            {location: '', tags: []},
            (record: ILogRecord) => this.save(record)
        );
    }

    /**
     * Get list of Log Handlers names registered in logger
     * @returns {string[]}
     */
    get handlers () {
        return this._handlers.map(h => h.name);
    }

    /**
     * Process log record
     * @param {LogRecord} logRecord
     */
    save (logRecord: ILogRecord): void {
        this._handlers.forEach(
            handler => handler.handle(logRecord)
        );
        logRecord.erase();
    }

    /**
     * Get interface that inherits tag and location from current one
     */
    getInterface (loc:string = '', tags:string[] = []): ILoggingInterface {
        return this._loggingInterface.getInterface(loc, tags);
    }

    /**
     * Register new log handler
     */
    registerHandler (handler: ILogHandler): Logger {
        this._handlers.push(handler);
        return this;
    }

    /**
     * Remove registered handler by it's name
     * @param name
     */
    removeHandler (name: string) {
        this._handlers.map((h, i) => h.name === name ? i : null )
            .filter(i => i !== null)
            .forEach(i => this._handlers.splice(i, 1));
    }

}