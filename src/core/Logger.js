"use strict";
var LoggingInterface_1 = require('./LoggingInterface');
var LogHandler_1 = require('./LogHandler');
/**
 * Provides log functionality
 */
var Logger = (function () {
    function Logger() {
        var _this = this;
        this._handlers = [];
        /**
         * Default logging interface
         * @type {LoggingInterface}
         * @protected
         */
        this._loggingInterface = new LoggingInterface_1.LoggingInterface({ tags: [], location: '' }, function (record) { return _this.save(record); });
    }
    /**
     * Process log record
     * @param {LogRecord} logRecord
     */
    Logger.prototype.save = function (logRecord) {
        this._handlers.forEach(function (handler) { return setTimeout(// execute our handlers async
        handler.handle(logRecord), 0); });
    };
    /**
     * Get interface that inherits tag and location from current one
     */
    Logger.prototype.getInterface = function (loc, tags) {
        if (loc === void 0) { loc = ''; }
        if (tags === void 0) { tags = []; }
        return this._loggingInterface.getInterface(loc, tags);
    };
    /**
     * Register new log handler
     */
    Logger.prototype.registerHandler = function (filter, formatter, writer) {
        this._handlers.push(new LogHandler_1.LogHandler(filter, formatter, writer));
        return this;
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map