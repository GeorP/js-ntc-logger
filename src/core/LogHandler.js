"use strict";
/**
 * Stores pair of filter and writer and coordinate them to handle log records
 */
var LogHandler = (function () {
    function LogHandler(filter, formatter, writer) {
        this._filter = filter;
        this._formatter = formatter;
        this._writer = writer;
    }
    /**
     * Process log record, if it match filter than pass it to writer
     */
    LogHandler.prototype.handle = function (logRecord) {
        if (!this._filter.match(logRecord)) {
            return;
        }
        this._writer.save(this._formatter.format(logRecord));
    };
    return LogHandler;
}());
exports.LogHandler = LogHandler;
//# sourceMappingURL=LogHandler.js.map