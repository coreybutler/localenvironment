var assert = require('assert');

suite('localenvironment',function(){
  test('Load JSON attributes from recognized files.',function(){
    var vars = require('../')

    assert.ok(process.env.env_test === "test", "Failed. Expected to find process.env.env_test with a value of \"test\".")
    assert.ok(vars.hasOwnProperty('env_test'), "Failed. Expected to find env_test in the result of the require statement.")
  })

  test('Load JSON attributes from custom JSON file.', function () {
    var local = require('../')
    local.load('./test/custom.json')

    assert.ok(process.env.customized === "custom test", "Failed. Expected to find process.env.customized with a value of \"custom test\".")
    assert.ok(local.hasOwnProperty('customized'), "Failed. Expected to find customized in the result of the require statement.")
  })
})
