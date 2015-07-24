"use strict";

var assert = require('assert');

suite('localenvironment',function(){

  test('loads env.json attributes as environment variables',function(){
    var vars = require('../');

    assert.ok(process.env.env_test === "test", "Failed. Expected to find process.env.env_test with a value of \"test\".");
    assert.ok(vars.hasOwnProperty('env_test'), "Failed. Expected to find env_test in the result of the require statement.");

  });

});
