/**
 * Object representation of an log record
 */
export interface ISerializedLogRecord {
    dt: Date;
    //uid: string;
    message: string;
    data: any;
    tags: string[];
    location: string;
}