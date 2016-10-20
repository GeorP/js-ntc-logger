import test from 'ava';
import { Logger } from '../dist/es6/src/core/Logger';

const logRecordFactoryMock = {};

class LoggingInterfaceSpy {

    getInterface (loc, tags) {
        const l = new LoggingInterfaceSpy();
        l.tags = tags;
        l.loc = loc;
        return l;
    }
}

class LogHandlerSpy {
    constructor (name) {
        this.name = name;
        this.handledLogRecords = [];
    }

    handle (logRecord) {
        this.handledLogRecords.push(logRecord);
    }
}

function getNewLogger() {
    return new Logger(logRecordFactoryMock, LoggingInterfaceSpy);
}

test('Logger should been instantiated without errors', t => {
    t.notThrows(() => {
        const l = getNewLogger();
    });
});

test('Logger should create new interface during instantiation', t => {
    t.notThrows(() => {
        let counter = 0;
        const LoggingInterfaceSpyCounter = function () {
            counter++;
        }
        const l = new Logger(logRecordFactoryMock, LoggingInterfaceSpyCounter);
        t.true(counter === 1);
    });
});

test('Logger should return new interface', t => {
    const l = getNewLogger().getInterface();
    t.true(l instanceof LoggingInterfaceSpy);
});

test('Logger should pass empty tags list to new interface', t => {
    const l = getNewLogger().getInterface();
    t.true(l.tags.length === 0);
});

test('Logger should pass empty location to new interface', t => {
    const l = getNewLogger().getInterface();
    t.true(l.loc === '');
});

test('Logger should pass location to new interface', t => {
    const l = getNewLogger().getInterface('root');
    t.true(l.loc === 'root');
});

test('Logger should pass tags to new interface', t => {
    const l = getNewLogger().getInterface('', ['one']);
    t.true(l.tags[0] === 'one');
});

test('Logger should register handler', t => {
    const l = getNewLogger().registerHandler(new LogHandlerSpy('test_handler'));
    t.true(l.handlers.length === 1);
});

test('Logger should return list of registered handlers name', t => {
    const l = getNewLogger().registerHandler(new LogHandlerSpy('test_handler'));
    t.true(l.handlers[0] === 'test_handler');
});


test('Logger should remove existed handler by it\'s name if 1 handler registered', t => {
    const l = getNewLogger().registerHandler(new LogHandlerSpy('test_handler'));
    l.removeHandler('test_handler')
    t.true(l.handlers.length === 0);
});

test('Logger should remove existed handler by it\'s name if more then one handler registered', t => {
    const l = getNewLogger()
        .registerHandler(new LogHandlerSpy('test_handler'))
        .registerHandler(new LogHandlerSpy('another_test_handler'));
    l.removeHandler('test_handler')
    t.true(l.handlers.length === 1);
});

test('Logger shouldn\'t  throw error if your try to remove not registered handler', t => {
    const l = getNewLogger();
    t.notThrows(
        () => {
            l.removeHandler('test_handler');
        }
    );
});

test.cb('Logger should should execute handle method for registered log handler during save operation', t => {
    t.plan(1);

    const h = new LogHandlerSpy('test_handler');
    const l = getNewLogger().registerHandler(h);
    const logRecord = {
        erase: function (){}
    };

    l.save(logRecord);

    setTimeout(() => {
        t.true(h.handledLogRecords.length === 1);
        t.end();
    }, 0);
});

test.cb('Logger should should execute handle method for each registered log handler during save operation', t => {
    t.plan(2);

    const h1 = new LogHandlerSpy('test_handler');
    const h2 = new LogHandlerSpy('another_test_handler');
    const l = getNewLogger()
        .registerHandler(h1)
        .registerHandler(h2);
    const logRecord = {
        erase: function (){}
    };

    l.save(logRecord);

    setTimeout(() => {
        t.true(h1.handledLogRecords.length === 1);
        t.true(h2.handledLogRecords.length === 1);
        t.end();
    }, 0);
});

test.cb('Logger should pass log record to the registered handler during save', t => {
    t.plan(1);

    const h = new LogHandlerSpy('test_handler');
    const l = getNewLogger().registerHandler(h);
    const logRecord = {
        data: true,
        erase: function (){}
    };

    l.save(logRecord);

    setTimeout(() => {
        t.true(h.handledLogRecords[0].data === true);
        t.end();
    }, 0);
});
