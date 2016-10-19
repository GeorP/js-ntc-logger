/**
 * Interface of the Log Writer
 */
export interface ILogWriter {

    /**
     * Write formatted log record to output channel (it can be file, database, console output or any other channel)
     */
    save (item: string): void;
}


export interface ILogWriterFactory {
    entityName: string;

    create (): ILogWriter;
}