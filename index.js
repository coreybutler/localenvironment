let environment = {}
const fs = require('fs')
const loadEnvironment = json => {
  try {
    let env = require(json)
    
    Object.keys(env).forEach(function (key) {
      environment[key] = env[key].toString()
      process.env[key] = env[key].toString()
    })

    return null
  } catch (e) {
    return e
  }
}

for (let route of ['env.json', '.env.json', '.env']) {
  filepath = require('path').join(process.cwd(), route)

  if (fs.existsSync(filepath)) {
    let err = loadEnvironment(filepath)
    if (err !== null) {
      console.log('WARNING --> Configuration Problem: ' + e.message)
    } else {
      break
    }
  }
}

environment.load = (filename = null) => {
  if (filename === null) {
    return
  }

  let filepath = require('path').join(process.cwd(), filename)
  
  if (fs.existsSync(filepath)) {
    loadEnvironment(filepath)
  }
}

module.exports = environment
