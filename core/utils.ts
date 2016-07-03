                                            // Syslog levels: https://en.wikipedia.org/wiki/Syslog
                                            //_______________________________________________________________________________________________________
                                            //| Value |   Severity	   |  Keyword  |	Description	                                                 |
                                            //|=======|================|===========|=================================================================|
export const LOG_EMERGENCY = '__emerg';     //|  0    | Emergency      | emerg     | System is unusable                                              |
export const LOG_ALERT = '__alert';         //|  1    | Alert          | alert     | Should be corrected immediately                                 |
export const LOG_CRITICAL = '__crit';       //|  2    | Critical       | crit      | Critical conditions                                             |
export const LOG_ERROR = '__err';           //|  3    | Error          | err       | Error conditions                                                |
export const LOG_WARNING = '__warning';     //|  4    | Warning        | warning   | May indicate that an error will occur if action is not taken    |
export const LOG_NOTICE = '__notice';       //|  5    | Notice         | notice    | Events that are unusual, but not error conditions               |
export const LOG_INFORMATIONAL = '__info';  //|  6    | Informational  | info      | Normal operational messages that require no action              |
export const LOG_DEBUG = '__debug';         //|  7    | Debug          | debug     | Information useful to developers for debugging the application  |
                                            //|_______|________________|___________|_________________________________________________________________|

export const LOG_INFO = LOG_INFORMATIONAL; // Alias for LOG_INFORMATIONAL

/**
 * Merge locations
 */
export function joinLocation (base:string, addition: string): string {
    if (!addition) {
        return base;
    }
    return [base, addition].join('.');
}

/**
 * Modify base array adding all tag from addition
 */
export function mergeTags (base: string[], addition: string[]): string[] {
    Array.prototype.push.apply(base, addition);
    return base;
}

/**
 * Get label by syslog level tag
 */
export function logLevelLabel (logLevel: string): string {
    switch (logLevel) {
        case LOG_EMERGENCY: return 'emergency';
        case  LOG_ALERT: return 'alert';
        case  LOG_CRITICAL: return 'critical';
        case  LOG_ERROR: return 'error';
        case  LOG_WARNING: return 'warning';
        case  LOG_NOTICE: return 'notice';
        case LOG_INFORMATIONAL: return 'info';
        case LOG_DEBUG: return 'debug';
        default: return '';
    }
}

/**
 * Check if list of tags has log level from searchLogLevels array
 * Returns first met tag or empty string if log level not found 
 */
export function hasLogLevel (tags: string[], searchLogLevels: string[]): string {
    const logLevel = tags.filter(tag => searchLogLevels.indexOf(tag) !== -1);
    return logLevel.length ? logLevel[0] : '';
}