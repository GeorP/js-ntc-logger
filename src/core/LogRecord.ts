import { ILogRecord, ILogRecordFactory } from './i/ILogRecord';
import { ISerializedLogRecord } from './i/ISerializedLogRecord';
import {joinLocation, mergeTags,
    LOG_EMERGENCY, LOG_ALERT, LOG_CRITICAL, LOG_ERROR, LOG_WARNING, LOG_NOTICE, LOG_INFORMATIONAL, LOG_DEBUG} from './utils';

//TODO: implement uid
export class LogRecord implements ILogRecord {

    protected _dt: Date;
    protected  _tags: string[];
    protected _location: string;
    protected _saveLogFunc: Function;
    protected _message: string;
    protected _data: any;

    static create (tags: string[], loc: string, message: string, saveLogFunc: Function): LogRecord {
        return new LogRecord(tags, loc, message, saveLogFunc);
    }

    constructor (tags: string[], loc: string, message: string, saveLogFunc: Function) {
        this._dt = new Date();
        this._tags = tags;
        this._location = loc;
        this._saveLogFunc = saveLogFunc;
        this._message = message;
        this._data = null;
    }

    /**
     * Get list of tags, should return copy of array of tags not the reference
     */
    get tags(): string[] {
        return this._tags.slice();
    }

    /**
     * Attach data related to the log record
     */
    data (value: any):ILogRecord {
        this._data = value;
        return this;
    }

    /**
     * Attach new tags to log record
     */
    tag (value: string[]):ILogRecord {
        mergeTags(this._tags, value);
        return this;
    }

    /**
     * Specify location of a log record
     */
    loc (value: string):ILogRecord {
        this._location = joinLocation(this._location, value);
        return this;
    }

    /**
     * Add Emergency tag
     */
    emerg ():ILogRecord {
        mergeTags(this._tags, [LOG_EMERGENCY]);
        return this;
    }

    /**
     * Add Alert tag
     */
    alert ():ILogRecord {
        mergeTags(this._tags, [LOG_ALERT]);
        return this;
    }

    /**
     * Add Critical tag
     */
    crit ():ILogRecord {
        mergeTags(this._tags, [LOG_CRITICAL]);
        return this;
    }

    /**
     * Add Error tag
     */
    error ():ILogRecord {
        mergeTags(this._tags, [LOG_ERROR]);
        return this;
    }

    /**
     * Add Warning tag
     */
    warning ():ILogRecord {
        mergeTags(this._tags, [LOG_WARNING]);
        return this;
    }

    /**
     * Add Notice tag
     */
    notice ():ILogRecord {
        mergeTags(this._tags, [LOG_NOTICE]);
        return this;
    }

    /**
     * Add Info tag
     */
    info () {
        mergeTags(this._tags, [LOG_INFORMATIONAL]);
        return this;
    }

    /**
     * Add Debug tag
     */
    debug ():ILogRecord {
        mergeTags(this._tags, [LOG_DEBUG]);
        return this;
    }

    /**
     * Serialize log record to object
     */
    toObject (): ISerializedLogRecord {
        //TODO: implement uid
        return {
            dt: this._dt,
            //uid: this._uid,
            message: this._message,
            data: this._data,
            tags: this._tags,
            location: this._location
        }
    }

    /**
     * Process log record and erase log record
     */
    log () {
        this._saveLogFunc(this);
    }

    /**
     * Erase all data of the log record, to prevent memory leaks
     */
    erase () {
        this._dt = null;
        this._tags = null;
        this._location = null;
        this._saveLogFunc = null;
        this._message = null;
        this._data = null;
        //TODO: implement uid
        //this._uid = null;
    }
}