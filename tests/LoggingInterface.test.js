import test from 'ava';
import { LoggingInterface } from '../dist/core/LoggingInterface';

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