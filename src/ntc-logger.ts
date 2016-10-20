import { LoggerFactory } from './core/LoggerFactory';
import { FilterAny } from './filters/FilterAny';
import { FormatterSingleLine } from './formatters/FormatterSingleLine';
import { WriterToConsole } from './writers/WriterToConsole';


const NtcLogger = new LoggerFactory();

NtcLogger.registerFilter(FilterAny);
NtcLogger.registerFormatter(FormatterSingleLine);
NtcLogger.registerWriter(WriterToConsole);

export {NtcLogger}