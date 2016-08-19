import { ILogFilter } from '../core/i/ILogFilter';
import { ILogRecord } from '../core/i/ILogRecord';

/**
 * Filter that pass all log records
 *
 */
export class FilterAny implements ILogFilter {

    /**
     * Check if log record match current filter
     */
    match (logRecord: ILogRecord): boolean {
        return true;
    }
}