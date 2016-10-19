import { ILogFilter, ILogFilterFactory } from '../core/i/ILogFilter';
import { ILogRecord } from '../core/i/ILogRecord';

/**
 * Filter that pass all log records
 *
 */
export class FilterAny implements ILogFilter {

    // We need it for es5 compilation. Because in es5 we dont have classes and we can't just access FilterAny.name
    static get entityName (): string {
        return 'FilterAny';
    }

    static create (): ILogFilter {
        return new FilterAny();
    }

    /**
     * Check if log record match current filter
     */
    match (logRecord: ILogRecord): boolean {
        return true;
    }
}