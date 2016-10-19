import { ILogHandlerOptions, ILoggerFactory } from './src/core/i/ILoggerFactory';
import { Logger, LoggingInterface, LogRecord, LogHandler } from './src/core/index';
import { FilterAny } from './src/filters/FilterAny';
import { FormatterSingleLine } from './src/formatters/FormatterSingleLine';
import { WriterToConsole } from './src/writers/WriterToConsole';
import { ILogger } from "./src/core/i/ILogger";
import { ILogFilter, ILogFilterFactory } from "./src/core/i/ILogFilter";
import { ILogFormatter, ILogFormatterFactory } from "./src/core/i/ILogFormatter";
import { ILogWriter, ILogWriterFactory } from "./src/core/i/ILogWriter";

class LoggerFactoryClass implements ILoggerFactory {
    _filters: any = {};
    _formatters: any = {};
    _writers: any = {};

    applyLogHandler (l: ILogger, o: ILogHandlerOptions): void {
        if (!this._filters[o.filter]) {
            throw new Error(`Unknown filter '${o.filter}'`);
        }
        if (!this._formatters[o.formatter]) {
            throw new Error(`Unknown formatter '${o.formatter}'`);
        }
        if (!this._writers[o.writer]) {
            throw new Error(`Unknown writer '${o.writer}'`);
        }
        const FilterFactory = this._filters[o.filter];
        const Formatter = this._formatters[o.formatter];
        const Writer = this._writers[o.writer];

        const logHandler = new LogHandler(
            o.name,
            FilterFactory.create(),
            Formatter.create(),
            Writer.create()
        );

        l.registerHandler(logHandler);
    }

    createEmptyLogger (): ILogger {
        return new Logger(LogRecord, LoggingInterface);
    }

    createDefaultLogger (): ILogger {
        const l = new Logger(LogRecord, LoggingInterface);
        this.applyLogHandler(l, {
                name: 'any_to_console_as_single_line',
                filter: 'FilterAny',
                formatter: 'FormatterSingleLine',
                writer: 'WriterToConsole'
            });
        return l;
    }

    createLogger (logHandlers: ILogHandlerOptions[]): ILogger {
        const l = new Logger(LogRecord, LoggingInterface);
        logHandlers.forEach(handlerOptions => this.applyLogHandler(l, handlerOptions));
        return l;
    }

    registerFilter (entity: ILogFilterFactory): void {
        this._filters[entity.entityName] = entity;
    }

    registerFormatter (entity: ILogFormatterFactory): void {
        this._formatters[entity.entityName] = entity;
    }

    registerWriter (entity: ILogWriterFactory): void {
        this._writers[entity.entityName] = entity;
    }
}
const LoggerFactory = new LoggerFactoryClass();

LoggerFactory.registerFilter(FilterAny);
LoggerFactory.registerFormatter(FormatterSingleLine);
LoggerFactory.registerWriter(WriterToConsole);

export {LoggerFactory}