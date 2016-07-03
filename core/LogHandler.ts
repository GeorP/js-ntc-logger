import { ILogFilter } from './i/ILogFilter';
import { ILogFormatter } from './i/ILogFormatter';
import { ILogWriter } from './i/ILogWriter';
import { ILogRecord } from './i/ILogRecord';

/**
 * Stores pair of filter and writer and coordinate them to handle log records
 */
export class LogHandler {

    protected _name: string;
    protected _filter: ILogFilter;
    protected _formatter: ILogFormatter;
    protected _writer: ILogWriter;

    constructor (name: string, filter: ILogFilter, formatter: ILogFormatter, writer: ILogWriter) {
        this._name = name;
        this._filter = filter;
        this._formatter = formatter;
        this._writer = writer;
    }

    get name () {
        return this._name;
    }

    /**
     * Process log record, if it match filter than pass it to writer
     */
    handle (logRecord: ILogRecord) {
        if (!this._filter.match(logRecord)) {
            return;
        }
        this._writer.save(this._formatter.format(logRecord));
    }
}