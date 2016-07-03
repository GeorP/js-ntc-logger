import { ILogRecord } from './ILogRecord';

/**
 * Interface of a Log Formatter
 */
export interface ILogFormatter {

    /**
     * Generate string with information of a Log Record
     */
    format (logRecord: ILogRecord):string;
}