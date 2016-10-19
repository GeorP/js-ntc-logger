"use strict";
// Syslog levels: https://en.wikipedia.org/wiki/Syslog
//_______________________________________________________________________________________________________
//| Value |   Severity	   |  Keyword  |	Description	                                                 |
//|=======|================|===========|=================================================================|
exports.LOG_EMERGENCY = '__emerg'; //|  0    | Emergency      | emerg     | System is unusable                                              |
exports.LOG_ALERT = '__alert'; //|  1    | Alert          | alert     | Should be corrected immediately                                 |
exports.LOG_CRITICAL = '__crit'; //|  2    | Critical       | crit      | Critical conditions                                             |
exports.LOG_ERROR = '__err'; //|  3    | Error          | err       | Error conditions                                                |
exports.LOG_WARNING = '__warning'; //|  4    | Warning        | warning   | May indicate that an error will occur if action is not taken    |
exports.LOG_NOTICE = '__notice'; //|  5    | Notice         | notice    | Events that are unusual, but not error conditions               |
exports.LOG_INFORMATIONAL = '__info'; //|  6    | Informational  | info      | Normal operational messages that require no action              |
exports.LOG_DEBUG = '__debug'; //|  7    | Debug          | debug     | Information useful to developers for debugging the application  |
//|_______|________________|___________|_________________________________________________________________|
exports.LOG_INFO = exports.LOG_INFORMATIONAL; // Alias for LOG_INFORMATIONAL
/**
 * Merge locations
 */
function joinLocation(base, addition) {
    if (!addition) {
        return base;
    }
    return [base, addition].join('.');
}
exports.joinLocation = joinLocation;
/**
 * Modify base array adding all tag from addition
 */
function mergeTags(base, addition) {
    Array.prototype.push.apply(base, addition);
    return base;
}
exports.mergeTags = mergeTags;
/**
 * Get label by syslog level tag
 */
function logLevelLabel(logLevel) {
    switch (logLevel) {
        case exports.LOG_EMERGENCY: return 'emergency';
        case exports.LOG_ALERT: return 'alert';
        case exports.LOG_CRITICAL: return 'critical';
        case exports.LOG_ERROR: return 'error';
        case exports.LOG_WARNING: return 'warning';
        case exports.LOG_NOTICE: return 'notice';
        case exports.LOG_INFORMATIONAL: return 'info';
        case exports.LOG_DEBUG: return 'debug';
        default: return '';
    }
}
exports.logLevelLabel = logLevelLabel;
/**
 * Check if list of tags has log level from searchLogLevels array
 * Returns first met tag or empty string if log level not found
 */
function hasLogLevel(tags, searchLogLevels) {
    var logLevel = tags.filter(function (tag) { return searchLogLevels.indexOf(tag) !== -1; });
    return logLevel.length ? logLevel[0] : '';
}
exports.hasLogLevel = hasLogLevel;
//# sourceMappingURL=utils.js.map