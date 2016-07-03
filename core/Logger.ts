import { ILogHandler } from './i/ILogHandler';
import { ILoggingInterface } from './i/ILoggingInterface';
import { ILogRecord, ILogRecordFactory } from './i/ILogRecord';
import { ILogFilter } from './i/ILogFilter';
import { ILogFormatter } from './i/ILogFormatter';
import { ILogWriter } from './i/ILogWriter';

/**
 * Provides log functionality
 */
export class Logger {

    /**
     * List of handlers registered in Logger
     */
    protected _handlers: ILogHandler[];
    protected _loggingInterface: ILoggingInterface;

    constructor (logRecordFactory: ILogRecordFactory, LoggingInterface) {
        this._handlers = [];

        /**
         * Default logging interface
         * @type {LoggingIntersface}
         * @protected
         */
        this._loggingInterface = new LoggingInterface(
            logRecordFactory,
            {location: '', tags: []},
            record => this.save(record)
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
            handler => setTimeout( // execute our handlers async
                () => handler.handle(logRecord), 0
            )
        );
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