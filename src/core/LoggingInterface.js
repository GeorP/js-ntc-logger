"use strict";
var LogRecord_1 = require('./LogRecord');
var utils_1 = require('./utils');
/**
 * Provides logging interface
 */
var LoggingInterface = (function () {
    function LoggingInterface(_a, saveFunc) {
        var _b = _a.tags, tags = _b === void 0 ? [] : _b, _c = _a.location, location = _c === void 0 ? '' : _c;
        console.log('gere');
        this._saveFunc = saveFunc;
        this._tags = tags;
        this._location = location;
    }
    Object.defineProperty(LoggingInterface.prototype, "tags", {
        get: function () {
            return this._tags.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoggingInterface.prototype, "location", {
        get: function () {
            return this._location;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get new log record
     * @param message Text message that should be logged
     * @returns Returns instance of log record, that can be modified before processing
     */
    LoggingInterface.prototype.l = function (message) {
        var _this = this;
        return new LogRecord_1.LogRecord(this._tags, this._location, message, function (record) {
            _this._saveFunc(record);
        });
    };
    /**
     * Creates new Log record and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.log = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.l(message).data(data).loc(loc).tag(tags).log();
    };
    /**
     * Creates new Log record with Emergency tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.emerg = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.log(message, data, loc, utils_1.mergeTags(tags, [utils_1.LOG_EMERGENCY]));
    };
    /**
     * Creates new Log record with Alert tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.alert = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.log(message, data, loc, utils_1.mergeTags(tags, [utils_1.LOG_ALERT]));
    };
    /**
     * Creates new Log record with Critical tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.crit = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.log(message, data, loc, utils_1.mergeTags(tags, [utils_1.LOG_CRITICAL]));
    };
    /**
     * Creates new Log record with Error tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.error = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.log(message, data, loc, utils_1.mergeTags(tags, [utils_1.LOG_ERROR]));
    };
    /**
     * Creates new Log record with Warning tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.warning = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.log(message, data, loc, utils_1.mergeTags(tags, [utils_1.LOG_WARNING]));
    };
    /**
     * Creates new Log record with Notice tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.notice = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.log(message, data, loc, utils_1.mergeTags(tags, [utils_1.LOG_NOTICE]));
    };
    /**
     * Creates new Log record with Info tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.info = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.log(message, data, loc, utils_1.mergeTags(tags, [utils_1.LOG_INFORMATIONAL]));
    };
    /**
     * Creates new Log record with Debug tag and process it
     * @param message Text message that describes log record
     * @param data Data attached to the log record
     * @param loc Location, where this log done
     * @param tags List of tags attached for this specific log record
     */
    LoggingInterface.prototype.debug = function (message, data, loc, tags) {
        if (data === void 0) { data = null; }
        if (loc === void 0) { loc = null; }
        if (tags === void 0) { tags = []; }
        this.log(message, data, loc, utils_1.mergeTags(tags, [utils_1.LOG_DEBUG]));
    };
    /**
     * Serialize error to object
     */
    LoggingInterface.prototype.serializeError = function (error) {
        return {
            type: error.name,
            msg: error.message,
            stack: error.stack
        };
    };
    /**
     * Get new logging interface that inherits tag and location
     * @param loc Location that will be added to location of the current logging interface
     * @param tags List of tags that will be merged with tags of the current logging interface
     */
    LoggingInterface.prototype.getInterface = function (loc, tags) {
        return new LoggingInterface({
            tags: utils_1.mergeTags(this._tags.slice(), tags),
            location: utils_1.joinLocation(this._location, loc)
        }, this._saveFunc);
    };
    return LoggingInterface;
}());
exports.LoggingInterface = LoggingInterface;
//# sourceMappingURL=LoggingInterface.js.map