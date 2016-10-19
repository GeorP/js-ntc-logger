import test from 'ava';
import { LogRecord } from '../dist/es6/core/LogRecord';

import {joinLocation, mergeTags,
	LOG_EMERGENCY, LOG_ALERT, LOG_CRITICAL, LOG_ERROR, LOG_WARNING, LOG_NOTICE, LOG_INFORMATIONAL, LOG_DEBUG} from '../dist/es6/core/utils';


test('LogRecord should been instantiated without errors', t => {
	t.notThrows(() => {
		const l = new LogRecord([], ".", "test_message", function(){});
	});
});

test('LogRecord\'s method tags should return list if no tags passed', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const tags = l.tags;
	t.true(Array.isArray(tags) && tags.length === 0)
});

test('LogRecord\'s method tags should return list with one tag if one tag passed', t => {
	const tag1 = 'tag1';
	const l = new LogRecord([tag1], ".", "test_message", function(){});
	const tags = l.tags;
	t.true(Array.isArray(tags) && tags.length === 1 && tags[0] === tag1)
});

test('LogRecord\'s method tags should return list with two tag if two tag passed', t => {
	const tag1 = 'tag1';
	const tag2 = 'tag2';
	const l = new LogRecord([tag1, tag2], ".", "test_message", function(){});
	const tags = l.tags;
	t.true(
		   Array.isArray(tags)
		&& tags.length === 2
		&& tags.indexOf(tag1) > -1
		&& tags.indexOf(tag2) > -1
	);
});

test('LogRecord\'s method tags should return list of tags by value not by reference', t => {
	const tag1 = 'tag1';
	const l = new LogRecord([], ".", "test_message", function(){});
	const tags = l.tags;
	tags.push(tag1);
	const newTags = l.tags;
	t.true(Array.isArray(newTags ) && newTags .length === 0)
});

test('LogRecord\'s method data should attach data to log record', t => {
	const d = 'test_data';
	const l = new LogRecord([], ".", "test_message", function(){});
	l.data(d);
	t.true(l.toObject().data === d)
});

test('LogRecord\'s method data should replace previously added data', t => {
	const tmpData = 'tmp_data';
	const d = 'test_data';
	const l = new LogRecord([], ".", "test_message", function(){});
	l.data(tmpData);
	l.data(d);
	t.true(l.toObject().data === d)
});

test('LogRecord\'s method data should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.data('test_data');
	t.true(dataReturn === l)
});

test('LogRecord\'s method tag should attach list with one tags to record', t => {
	const tag1 = 'tag1';
	const l = new LogRecord([], ".", "test_message", function(){});
	l.tag([tag1]);
	const tags = l.tags;
	t.true(Array.isArray(tags) && tags.length === 1 && tags[0] === tag1)
});

test('LogRecord\'s method tag should attach list with two tags to record', t => {
	const tag1 = 'tag1';
	const tag2 = 'tag2';
	const l = new LogRecord([], ".", "test_message", function(){});
	l.tag([tag1, tag2]);
	const tags = l.tags;
	t.true(
		Array.isArray(tags)
		&& tags.length === 2
		&& tags.indexOf(tag1) > -1
		&& tags.indexOf(tag2) > -1
	);
});

test('LogRecord\'s method tag should attach list with two tags to record with already existing tags', t => {
	const tag1 = 'tag1';
	const tag2 = 'tag2';
	const tag3 = 'tag3';
	const l = new LogRecord([tag1], ".", "test_message", function(){});
	l.tag([tag2, tag3]);
	const tags = l.tags;
	t.true(
		Array.isArray(tags)
		&& tags.length === 3
		&& tags.indexOf(tag1) > -1
		&& tags.indexOf(tag2) > -1
		&& tags.indexOf(tag3) > -1
	);
});

test('LogRecord\'s method tag can be called more than once and should merge tags ', t => {
	const tag1 = 'tag1';
	const tag2 = 'tag2';
	const l = new LogRecord([], ".", "test_message", function(){});
	l.tag([tag1]);
	l.tag([tag2]);
	const tags = l.tags;
	t.true(
		Array.isArray(tags)
		&& tags.length === 2
		&& tags.indexOf(tag1) > -1
		&& tags.indexOf(tag2) > -1
	);
});

test('LogRecord\'s method tag should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.tag(['test_tag']);
	t.true(dataReturn === l);
});


test('LogRecord\'s method loc should add location', t => {
	const baseLoc = "root";
	const loc = 'test';
	const l = new LogRecord([], baseLoc, "test_message", function(){});
	l.loc(loc);
	t.true(l.toObject().location === joinLocation(baseLoc, loc));
});

test('LogRecord\'s method loc should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.loc('test_loc');
	t.true(dataReturn === l);
});

test('LogRecord\'s method emerg should attach emergency tag', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	l.emerg();
	t.true(l.tags[0] === LOG_EMERGENCY);
});

test('LogRecord\'s method emerg should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.emerg();
	t.true(dataReturn === l);
});

test('LogRecord\'s method alert should attach emergency tag', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	l.alert();
	t.true(l.tags[0] === LOG_ALERT);
});

test('LogRecord\'s method alert should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.alert();
	t.true(dataReturn === l);
});

test('LogRecord\'s method crit should attach emergency tag', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	l.crit();
	t.true(l.tags[0] === LOG_CRITICAL);
});

test('LogRecord\'s method crit should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.crit();
	t.true(dataReturn === l);
});

test('LogRecord\'s method error should attach emergency tag', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	l.error();
	t.true(l.tags[0] === LOG_ERROR);
});

test('LogRecord\'s method error should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.error();
	t.true(dataReturn === l);
});

test('LogRecord\'s method warning should attach emergency tag', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	l.warning();
	t.true(l.tags[0] === LOG_WARNING);
});

test('LogRecord\'s method warning should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.warning();
	t.true(dataReturn === l);
});

test('LogRecord\'s method notice should attach emergency tag', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	l.notice();
	t.true(l.tags[0] === LOG_NOTICE);
});

test('LogRecord\'s method notice should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.notice();
	t.true(dataReturn === l);
});

test('LogRecord\'s method info should attach emergency tag', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	l.info();
	t.true(l.tags[0] === LOG_INFORMATIONAL);
});

test('LogRecord\'s method info should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.info();
	t.true(dataReturn === l);
});

test('LogRecord\'s method debug should attach emergency tag', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	l.debug();
	t.true(l.tags[0] === LOG_DEBUG);
});

test('LogRecord\'s method debug should return object itself', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const dataReturn = l.debug();
	t.true(dataReturn === l);
});

test('LogRecord\'s method toObject should return object', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	t.true(typeof l.toObject() === "object");
});

test('LogRecord\'s method toObject should return object with certain list of keys', t => {
	const l = new LogRecord([], ".", "test_message", function(){});
	const objectKeys = Object.keys(l.toObject());
	t.true(
		objectKeys.length === 5
		&& objectKeys.indexOf('dt') > -1
		&& objectKeys.indexOf('message') > -1
		&& objectKeys.indexOf('data') > -1
		&& objectKeys.indexOf('tags') > -1
		&& objectKeys.indexOf('location') > -1
	);
});

test('LogRecord\'s method toObject should return object', t => {
	const msg = 'test_message';
	const dtBefor = new Date();
	const l = new LogRecord([], ".", msg, function(){});
	const dtAfter = new Date();
	const obj = l.toObject();
	t.true(
		(obj.dt instanceof Date) && dtBefor <= obj.dt && obj.dt <= dtAfter
		&& obj.message === msg
		&& obj.data === null
		&& Array.isArray(obj.tags) && obj.tags.length === 0
		&& obj.location === '.'
	);
});

test('LogRecord\'s method log should call passed save func', t => {
	let counter = 0;
	const saveFunc = () => counter++;
	const l = new LogRecord([], ".", "test_message", saveFunc);
	l.log();
	t.true(counter === 1);
});

test('LogRecord\'s method log should call save func and pass link to itself', t => {
	let data = 0;
	const saveFunc = (d) => data = d;
	const l = new LogRecord([], ".", "test_message", saveFunc);
	l.log();
	t.true(data === l);
});