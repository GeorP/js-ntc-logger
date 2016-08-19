import { ILoggingInterface } from './i/ILoggingInterface';
import { ILogRecordFactory, ILogRecord } from './i/ILogRecord';
import { IError } from './i/IError';
import { ILoggerInterfaceOptions } from './i/ILoggerInterfaceOptions';

import {joinLocation, mergeTags, serializeError,
    LOG_EMERGENCY, LOG_ALERT, LOG_CRITICAL, LOG_ERROR, LOG_WARNING, LOG_NOTICE, LOG_INFORMATIONAL, LOG_DEBUG} from './utils';

/**
 * Provides logging interface
 */
export class LoggingInterface implements ILoggingInterface {

    protected _saveFunc: Function;
    protected _tags: string[];
    protected _location: string;
    protected _logRecordFactory: ILogRecordFactory;

    constructor (logRecordFactory: ILogRecordFactory, {tags = [], location = ''}: ILoggerInterfaceOptions, saveFunc: Function) {
        this._saveFunc = saveFunc;
        this._tags = tags;
        this._location = location;
        this._logRecordFactory = logRecordFactory;
    }

    get tags ():string[] {
        return this._tags.slice();
    }

    get location ():string {
        return this._location;
    }

    /**
     * Get new log record
     * @param message Text message that should be logged
     * @returns Returns instance of log record, that can be modified before processing
     */
    l (message: string):ILogRecord  {
        return this._logRecordFactory.create(this.tags, this.location, message, this._saveFunc);
    }

    /**
     * Creates new Log record and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    log (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.l(message).data(data).loc(loc).tag(tags).log();
    }

    /**
     * Creates new Log record with Emergency tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    emerg (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.log(message, data, loc, mergeTags(tags, [LOG_EMERGENCY]));
    }

    /**
     * Creates new Log record with Alert tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    alert (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.log(message, data, loc, mergeTags(tags, [LOG_ALERT]));
    }

    /**
     * Creates new Log record with Critical tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    crit (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.log(message, data, loc, mergeTags(tags, [LOG_CRITICAL]));
    }

    /**
     * Creates new Log record with Error tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    error (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.log(message, data, loc, mergeTags(tags, [LOG_ERROR]));
    }

    /**
     * Creates new Log record with Warning tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    warning (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.log(message, data, loc, mergeTags(tags, [LOG_WARNING]));
    }

    /**
     * Creates new Log record with Notice tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    notice (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.log(message, data, loc, mergeTags(tags, [LOG_NOTICE]));
    }

    /**
     * Creates new Log record with Info tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    info (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.log(message, data, loc, mergeTags(tags, [LOG_INFORMATIONAL]));
    }

    /**
     * Creates new Log record with Debug tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    debug (message: string, data:any = null, loc:string = null, tags:string[] = []) {
        this.log(message, data, loc, mergeTags(tags, [LOG_DEBUG]));
    }

    /**
     * Serialize error to object
     */
    serializeError (error: IError) {
        return serializeError(error);
    }

    /**
     * Get new logging interface that inherits tag and location
     * @param loc Location that will be added to location of the current logging interface
     * @param tags List of tags that will be merged with tags of the current logging interface
     */
    getInterface (loc: string, tags: string[]) {
        return new LoggingInterface(this._logRecordFactory,
            {
                tags: mergeTags(this._tags.slice(), tags),
                location: joinLocation(this._location, loc)
            },
            this._saveFunc
        );
    }
}