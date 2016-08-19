import { ILogRecord } from './ILogRecord';
import { ISerializedError } from './ISerializedError';
import { ILogRecordFactory } from './ILogRecord';
import { ILoggerInterfaceOptions } from './ILoggerInterfaceOptions';


export interface ILoggingInterfaceConstructor {
    new (logRecordFactory: ILogRecordFactory, options: ILoggerInterfaceOptions, saveFunc: Function):ILoggingInterface
}

export interface ILoggingInterface {

    tags: string[];
    location: string;
    
    /**
     * Get new log record
     * @param message Text message that should be logged
     * @returns Returns instance of log record, that can be modified before processing
     */
    l (message: string): ILogRecord;


    /**
     * Creates new Log record and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    log (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Creates new Log record with Emergency tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    emerg (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Creates new Log record with Alert tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    alert (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Creates new Log record with Critical tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    crit (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Creates new Log record with Error tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    error (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Creates new Log record with Warning tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    warning (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Creates new Log record with Notice tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    notice (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Creates new Log record with Info tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    info (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Creates new Log record with Debug tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    debug (message: string, data?:any, loc?:string, tags?:string[]):void

    /**
     * Serialize error to object
     */
    serializeError (error: Error): ISerializedError;

    /**
     * Get new logging interface that inherits tag and location
     * @param loc Location that will be added to location of the current logging interface
     * @param tags List of tags that will be merged with tags of the current logging interface
     */
    getInterface (loc: string, tags: string[]): ILoggingInterface;
}