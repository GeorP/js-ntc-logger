import { Logger } from './core/Logger';
import { LogRecord } from './core/LogRecord';
import { LoggingInterface } from './core/LoggingInterface';
import { LogHandler } from './core/LogHandler';
import { LoggerFactory } from './core/LoggerFactory';
import { FilterAny } from './filters/FilterAny';
import { FormatterSingleLine } from './formatters/FormatterSingleLine';
import { WriterToConsole } from './writers/WriterToConsole';


const NtcLogger = new LoggerFactory();

NtcLogger.registerFilter(FilterAny);
NtcLogger.registerFormatter(FormatterSingleLine);
NtcLogger.registerWriter(WriterToConsole);

export { NtcLogger, LoggerFactory, Logger, LogRecord, LoggingInterface, LogHandler,
    FilterAny, FormatterSingleLine, WriterToConsole }