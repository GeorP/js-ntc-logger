import { ILogRecord } from './ILogRecord';

export interface ILogHandler {
    name: string;
    handle (logRecord: ILogRecord): void;
}