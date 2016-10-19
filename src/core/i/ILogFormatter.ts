import { ISerializedLogRecord } from './ISerializedLogRecord';

/**
 * Interface of a Log Formatter
 */
export interface ILogFormatter {

    /**
     * Generate string with information of a Log Record
     */
    format (logData: ISerializedLogRecord):string;
}

export interface ILogFormatterFactory {
    entityName: string;

    create (): ILogFormatter;
}