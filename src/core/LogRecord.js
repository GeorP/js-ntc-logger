"use strict";
var utils_1 = require('./utils');
//TODO: implement uid
var LogRecord = (function () {
    function LogRecord(tags, loc, message, saveLogFunc) {
        this._dt = new Date();
        this._tags = tags.slice();
        this._location = loc;
        this._saveLogFunc = saveLogFunc;
        this._message = message;
        this._data = null;
    }
    Object.defineProperty(LogRecord.prototype, "tags", {
        /**
         * Get list of tags, should return copy of array of tags not the reference
         */
        get: function () {
            return this._tags.slice();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attach data related to the log record
     */
    LogRecord.prototype.data = function (value) {
        this._data = value;
        return this;
    };
    /**
     * Attach new tags to log record
     */
    LogRecord.prototype.tag = function (value) {
        utils_1.mergeTags(this._tags, value);
        return this;
    };
    /**
     * Specify location of a log record
     */
    LogRecord.prototype.loc = function (value) {
        this._location = utils_1.joinLocation(this._location, value);
        return this;
    };
    /**
     * Add Emergency tag
     */
    LogRecord.prototype.emerg = function () {
        utils_1.mergeTags(this._tags, [utils_1.LOG_EMERGENCY]);
        return this;
    };
    /**
     * Add Alert tag
     */
    LogRecord.prototype.alert = function () {
        utils_1.mergeTags(this._tags, [utils_1.LOG_ALERT]);
        return this;
    };
    /**
     * Add Critical tag
     */
    LogRecord.prototype.crit = function () {
        utils_1.mergeTags(this._tags, [utils_1.LOG_CRITICAL]);
        return this;
    };
    /**
     * Add Error tag
     */
    LogRecord.prototype.error = function () {
        utils_1.mergeTags(this._tags, [utils_1.LOG_ERROR]);
        return this;
    };
    /**
     * Add Warning tag
     */
    LogRecord.prototype.warning = function () {
        utils_1.mergeTags(this._tags, [utils_1.LOG_WARNING]);
        return this;
    };
    /**
     * Add Notice tag
     */
    LogRecord.prototype.notice = function () {
        utils_1.mergeTags(this._tags, [utils_1.LOG_NOTICE]);
        return this;
    };
    /**
     * Add Info tag
     */
    LogRecord.prototype.info = function () {
        utils_1.mergeTags(this._tags, [utils_1.LOG_INFORMATIONAL]);
        return this;
    };
    /**
     * Add Debug tag
     */
    LogRecord.prototype.debug = function () {
        utils_1.mergeTags(this._tags, [utils_1.LOG_DEBUG]);
        return this;
    };
    /**
     * Serialize log record to object
     */
    LogRecord.prototype.toObject = function () {
        //TODO: implement uid
        return {
            dt: this._dt,
            //uid: this._uid,
            message: this._message,
            data: this._data,
            tags: this._tags,
            location: this._location
        };
    };
    /**
     * Process log record and erase log record
     */
    LogRecord.prototype.log = function () {
        this._saveLogFunc(this);
        this.erase();
    };
    /**
     * Erase all data of the log record, to prevent memory leaks
     */
    LogRecord.prototype.erase = function () {
        this._dt = null;
        this._tags = null;
        this._location = null;
        this._saveLogFunc = null;
        this._message = null;
        this._data = null;
        //TODO: implement uid
        //this._uid = null;
    };
    return LogRecord;
}());
exports.LogRecord = LogRecord;
//# sourceMappingURL=LogRecord.js.map