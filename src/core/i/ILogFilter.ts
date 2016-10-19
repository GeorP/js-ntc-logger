import { ILogRecord } from './ILogRecord';


/**
 * Interface of a Log Filter
 */
export interface ILogFilter {

    /**
     * Check if log record match current filter
     */
    match (logRecord:ILogRecord):boolean;
}

export interface ILogFilterFactory {
    entityName: string;

    create (): ILogFilter;
}