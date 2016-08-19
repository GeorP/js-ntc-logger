import { ILogFormatter } from '../core/i/ILogFormatter';
import { ISerializedLogRecord } from '../core/i/ISerializedLogRecord';
import { serializeError } from '../core/utils';

export class FormatterSingleLine  implements ILogFormatter {

    format (logData: ISerializedLogRecord):string {
        const result =[];

        result.push(`[${logData.dt.toLocaleString()}]`);
        result.push(logData.message);
        result.push(logData.location);
        let attachedData = logData.data;
        if (attachedData instanceof Error) {
            attachedData = serializeError(attachedData);
        }
        if (typeof attachedData === 'object' && attachedData !== null) {
            if ('toObject' in attachedData) {
                attachedData = JSON.stringify(attachedData.toObject());
            } else {
                attachedData = JSON.stringify(attachedData);
            }
        }
        result.push(attachedData);
        result.push(logData.tags);
        result.push('\n');

        return result.join('\t');
    }
}