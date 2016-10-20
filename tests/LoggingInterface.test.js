import test from 'ava';
import { LoggingInterface } from '../dist/es6/src/core/LoggingInterface';

import {joinLocation, mergeTags,
    LOG_EMERGENCY, LOG_ALERT, LOG_CRITICAL, LOG_ERROR, LOG_WARNING, LOG_NOTICE, LOG_INFORMATIONAL, LOG_DEBUG} from '../dist/es6/src/core/utils';

class logRecordFactoryMock { //used as log record factory
    constructor () {
        this.createCounter = 0;
        this.dataCounter = 0;
        this.locCounter = 0;
        this.tagCounter = 0;
        this.logCounter = 0;
    }

    create (tags, loc, message, saveLogFunc) {
        this.data_tags = tags;
        this.data_loc = loc;
        this.data_message = message;
        this.data_saveLogFunc = saveLogFunc;
        this.createCounter++;
        return this;
    }

    data (data) {
        this.method_data_data = data;
        this.dataCounter++;
        return this;
    }

    loc (loc) {
        this.method_data_loc = loc;
        this.locCounter++;
        return this;
    }

    tag(tags) {
        this.method_data_tag = tags;
        this.tagCounter++;
        return this;
    }

    log() {
        this.logCounter++;
    }
}

function mockLogMethodOfLoggingIterface (li) {
    li.log = function (message, data=null, loc=null, tags=[]) {
        li.__mockData = {
            message: message,
            data: data,
            loc: loc,
            tags: tags
        }
    }
}

const newFactory = function () { return new logRecordFactoryMock(); } // alias for new logRecordFactoryMock instance
const emptyOpts = {tags:[], location: ''}; // used as initialization object for logging interface
                                            // that contains empty tags list and empty location

const noop = function(){}; // used as save func for logging interface that doing nothing

test('LoggingInterface should been instantiated without errors', t => {
    t.notThrows(() => {
        const i = new LoggingInterface(newFactory(), emptyOpts, noop);
    });
});


test('LoggingInterface should use Log Record Factory to create new log record', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.l('test_message');
    t.true(f.createCounter === 1);
});

test('LoggingInterface should pass message to Log Record Factory', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.l('test_message');
    t.true(f.data_message === 'test_message');
});

test('LoggingInterface should pass tags to Log Record Factory', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, {tags:['one'], location:''}, noop);
    i.l('test_message');
    t.true(f.data_tags[0] === 'one');
});

test('LoggingInterface should pass location to Log Record Factory', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, {tags:[''], location:'root'}, noop);
    i.l('test_message');
    t.true(f.data_loc === 'root');
});

test('LoggingInterface should pass save function to Log Record Factory', t => {
    const f = newFactory();
    const saveFunc = function () {};
    const i = new LoggingInterface(f, {tags:[''], location:'root'}, saveFunc);
    i.l('test_message');
    t.true(f.data_saveLogFunc === saveFunc);
});

test('LoggingInterface log method should use Log Record Factory to create new log record', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.log('test_message');
    t.true(f.createCounter === 1);
});

test('LoggingInterface log method should call data method of Log Record', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.log('test_message');
    t.true(f.dataCounter === 1);
});

test('LoggingInterface log method should pass data to Log\'s Record data method ', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.log('test_message', {test: true});
    t.true(f.method_data_data.test);
});

test('LoggingInterface log method should call loc method of Log Record', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.log('test_message');
    t.true(f.locCounter === 1);
});

test('LoggingInterface log method should pass location to Log\'s Record loc method ', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.log('test_message', null, 'root');
    t.true(f.method_data_loc === 'root');
});

test('LoggingInterface log method should call tags method of Log Record', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.log('test_message');
    t.true(f.tagCounter === 1);
});

test('LoggingInterface log method should pass tags to Log\'s Record tag method ', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.log('test_message', null, '', ['one']);
    t.true(f.method_data_tag[0] === 'one');
});

test('LoggingInterface log method should call log method of Log Record', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    i.log('test_message');
    t.true(f.logCounter === 1);
});

test('LoggingInterface emerg method should call log method of LoggingInterface and pass message without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const message = 'test_message';
    i.emerg(message);
    t.true(i.__mockData.message === message);
});

test('LoggingInterface emerg method should call log method of LoggingInterface and pass data without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const data = 'test_data';
    i.emerg('test message', data);
    t.true(i.__mockData.data === data);
});

test('LoggingInterface emerg method should call log method of LoggingInterface and pass location without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const loc = 'test_scenario';
    i.emerg('test message', 'test_data', loc);
    t.true(i.__mockData.loc === loc);
});

test('LoggingInterface emerg method should call log method of LoggingInterface and pass emergency tag', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    i.emerg('test message');
    t.true(i.__mockData.tags.length === 1);
    t.true(i.__mockData.tags[0] === LOG_EMERGENCY);
});

test('LoggingInterface emerg method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.emerg('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_EMERGENCY) > -1);
});

test('LoggingInterface alert method should call log method of LoggingInterface and pass message without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const message = 'test_message';
    i.alert(message);
    t.true(i.__mockData.message === message);
});

test('LoggingInterface alert method should call log method of LoggingInterface and pass data without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const data = 'test_data';
    i.alert('test message', data);
    t.true(i.__mockData.data === data);
});

test('LoggingInterface alert method should call log method of LoggingInterface and pass location without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const loc = 'test_scenario';
    i.alert('test message', 'test_data', loc);
    t.true(i.__mockData.loc === loc);
});

test('LoggingInterface alert method should call log method of LoggingInterface and pass emergency tag', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    i.alert('test message');
    t.true(i.__mockData.tags.length === 1);
    t.true(i.__mockData.tags[0] === LOG_ALERT);
});

test('LoggingInterface alert method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.alert('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_ALERT) > -1);
});

test('LoggingInterface crit method should call log method of LoggingInterface and pass message without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const message = 'test_message';
    i.crit(message);
    t.true(i.__mockData.message === message);
});

test('LoggingInterface crit method should call log method of LoggingInterface and pass data without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const data = 'test_data';
    i.crit('test message', data);
    t.true(i.__mockData.data === data);
});

test('LoggingInterface crit method should call log method of LoggingInterface and pass location without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const loc = 'test_scenario';
    i.crit('test message', 'test_data', loc);
    t.true(i.__mockData.loc === loc);
});

test('LoggingInterface crit method should call log method of LoggingInterface and pass emergency tag', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    i.crit('test message');
    t.true(i.__mockData.tags.length === 1);
    t.true(i.__mockData.tags[0] === LOG_CRITICAL);
});

test('LoggingInterface crit method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.crit('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_CRITICAL) > -1);
});

test('LoggingInterface error method should call log method of LoggingInterface and pass message without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const message = 'test_message';
    i.error(message);
    t.true(i.__mockData.message === message);
});

test('LoggingInterface error method should call log method of LoggingInterface and pass data without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const data = 'test_data';
    i.error('test message', data);
    t.true(i.__mockData.data === data);
});

test('LoggingInterface error method should call log method of LoggingInterface and pass location without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const loc = 'test_scenario';
    i.error('test message', 'test_data', loc);
    t.true(i.__mockData.loc === loc);
});

test('LoggingInterface error method should call log method of LoggingInterface and pass emergency tag', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    i.error('test message');
    t.true(i.__mockData.tags.length === 1);
    t.true(i.__mockData.tags[0] === LOG_ERROR);
});

test('LoggingInterface error method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.error('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_ERROR) > -1);
});

test('LoggingInterface warning method should call log method of LoggingInterface and pass message without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const message = 'test_message';
    i.warning(message);
    t.true(i.__mockData.message === message);
});

test('LoggingInterface warning method should call log method of LoggingInterface and pass data without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const data = 'test_data';
    i.warning('test message', data);
    t.true(i.__mockData.data === data);
});

test('LoggingInterface warning method should call log method of LoggingInterface and pass location without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const loc = 'test_scenario';
    i.warning('test message', 'test_data', loc);
    t.true(i.__mockData.loc === loc);
});

test('LoggingInterface warning method should call log method of LoggingInterface and pass emergency tag', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    i.warning('test message');
    t.true(i.__mockData.tags.length === 1);
    t.true(i.__mockData.tags[0] === LOG_WARNING);
});

test('LoggingInterface warning method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.warning('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_WARNING) > -1);
});

test('LoggingInterface notice method should call log method of LoggingInterface and pass message without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const message = 'test_message';
    i.notice(message);
    t.true(i.__mockData.message === message);
});

test('LoggingInterface notice method should call log method of LoggingInterface and pass data without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const data = 'test_data';
    i.notice('test message', data);
    t.true(i.__mockData.data === data);
});

test('LoggingInterface notice method should call log method of LoggingInterface and pass location without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const loc = 'test_scenario';
    i.notice('test message', 'test_data', loc);
    t.true(i.__mockData.loc === loc);
});

test('LoggingInterface notice method should call log method of LoggingInterface and pass emergency tag', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    i.notice('test message');
    t.true(i.__mockData.tags.length === 1);
    t.true(i.__mockData.tags[0] === LOG_NOTICE);
});

test('LoggingInterface notice method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.notice('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_NOTICE) > -1);
});

test('LoggingInterface info method should call log method of LoggingInterface and pass message without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const message = 'test_message';
    i.info(message);
    t.true(i.__mockData.message === message);
});

test('LoggingInterface info method should call log method of LoggingInterface and pass data without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const data = 'test_data';
    i.info('test message', data);
    t.true(i.__mockData.data === data);
});

test('LoggingInterface info method should call log method of LoggingInterface and pass location without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const loc = 'test_scenario';
    i.info('test message', 'test_data', loc);
    t.true(i.__mockData.loc === loc);
});

test('LoggingInterface info method should call log method of LoggingInterface and pass emergency tag', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    i.info('test message');
    t.true(i.__mockData.tags.length === 1);
    t.true(i.__mockData.tags[0] === LOG_INFORMATIONAL);
});

test('LoggingInterface info method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.info('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_INFORMATIONAL) > -1);
});

test('LoggingInterface debug method should call log method of LoggingInterface and pass message without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const message = 'test_message';
    i.debug(message);
    t.true(i.__mockData.message === message);
});

test('LoggingInterface debug method should call log method of LoggingInterface and pass data without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const data = 'test_data';
    i.debug('test message', data);
    t.true(i.__mockData.data === data);
});

test('LoggingInterface debug method should call log method of LoggingInterface and pass location without changes', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const loc = 'test_scenario';
    i.debug('test message', 'test_data', loc);
    t.true(i.__mockData.loc === loc);
});

test('LoggingInterface debug method should call log method of LoggingInterface and pass emergency tag', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    i.debug('test message');
    t.true(i.__mockData.tags.length === 1);
    t.true(i.__mockData.tags[0] === LOG_DEBUG);
});

test('LoggingInterface debug method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.debug('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_DEBUG) > -1);
});

test('LoggingInterface debug method should call log method of LoggingInterface and and emergency tag to passed', t => {
    const f = newFactory();
    const i = new LoggingInterface(f, emptyOpts, noop);
    mockLogMethodOfLoggingIterface(i);
    const tag = 'test_tag';
    i.debug('test message', null, null, [tag]);
    t.true(i.__mockData.tags.length === 2);
    t.true(i.__mockData.tags.indexOf(tag) > -1);
    t.true(i.__mockData.tags.indexOf(LOG_DEBUG) > -1);
});