import { ISerializedLogRecord } from './ISerializedLogRecord';

export interface ILogRecordFactory {
    create (tags: string[], loc: string, message: string, saveLogFunc: Function): ILogRecord;
}

export interface ILogRecord {
    /**
     * Get list of tags, should return copy of array of tags not the reference
     */
    tags: string[];

    /**
     * Attach data related to the log record
     */
    data (value: any): ILogRecord;

    /**
     * Attach new tags to log record
     */
    tag (value: string[]): ILogRecord;

    /**
     * Specify location of a log record
     */
    loc (value: string): ILogRecord;

    /**
     * Add Emergency tag
     */
    emerg (): ILogRecord;

    /**
     * Add Alert tag
     */
    alert (): ILogRecord;

    /**
     * Add Critical tag
     */
    crit (): ILogRecord;

    /**
     * Add Error tag
     */
    error (): ILogRecord;

    /**
     * Add Warning tag
     */
    warning (): ILogRecord;

    /**
     * Add Notice tag
     */
    notice (): ILogRecord;

    /**
     * Add Info tag
     */
    info (): ILogRecord;

    /**
     * Add Debug tag
     */
    debug (): ILogRecord;

    /**
     * Serialize log record to object
     */
    toObject (): ISerializedLogRecord;

    /**
     * Process log record and erase log record
     */
    log (): void;

    /**
     * Erase all data of the log record, to prevent memory leaks
     */
    erase (): void;
}
