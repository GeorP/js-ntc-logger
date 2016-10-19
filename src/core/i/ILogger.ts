import { ILogHandler } from './ILogHandler';
import { ILoggingInterface } from './ILoggingInterface';
import { ILogRecord } from './ILogRecord';


export interface ILogger {
    handlers: string[];

    save (logRecord: ILogRecord): void;
    getInterface (loc?:string, tags?:string[]): ILoggingInterface;
    registerHandler (handler: ILogHandler): ILogger;
    removeHandler (name: string): void;
}