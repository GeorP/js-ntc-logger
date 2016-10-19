import { ILogger } from "./ILogger";
import { ILogFilter, ILogFilterFactory } from "./ILogFilter";
import { ILogFormatter, ILogFormatterFactory } from "./ILogFormatter";
import { ILogWriter, ILogWriterFactory } from "./ILogWriter";

export interface ILogHandlerOptions {
    name: string;
    filter: string;
    formatter: string;
    writer: string;
}

export interface ILoggerFactory {
    createEmptyLogger (): ILogger;
    createDefaultLogger (): ILogger;
    createLogger (logHandlers: ILogHandlerOptions[]): ILogger;
    applyLogHandler (l: ILogger, o: ILogHandlerOptions): void;
    registerFilter (entity: ILogFilterFactory): void;
    registerFormatter (entity: ILogFormatterFactory): void;
    registerWriter (entity: ILogWriterFactory): void;
}