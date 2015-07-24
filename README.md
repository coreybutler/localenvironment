# Local Environment

**tl;dr** Apply environment variables if they exist in env.json.

**Install** `npm install localenvironment`

**Usage** `require('localenvironment');`

#### Overview

This is yet another environment variable management approach, based on a ridiculously simple approach.
This module looks for a file called `env.json` and loads each key as an environment variable,
accessible via the `process.env` object.

For example, the directory structure might look like:

```sh
> dir
  - index.js
  - env.json
```

The `index.js` file would look like:

```js
require('localenvironment');

... your app ...
```

The `env.json` may look like:

```js
{
  "MY_VARIABLE_1": "abc",
  "MY_VARIABLE_2": "def"
}
```

This makes your variables available in the traditional manner, i.e. `process.env.MY_VARIABLE_1`
and `process.env.MY_VARIABLE_2`.

---

#### Why?

We use Linux, Windows, and OSX in my companies. We don't want to push sensitive configuration data
to git. Furthermore, different users may have different configuration values for the same variables
(think API keys, secrets, usernames, etc). As a result, we provide an `env.json` for each project
and developers fill in with the appropriate information. This allows us to synchronize our code
independently of the configuration.

There are also programs written that function differently _if an environment variable exists_. This
module won't fire an error if it doesn't find the `env.json`, so it's easy to manipulate the environment
simply by commenting out some code or changing a file name.

Your mileage will vary, but we've found this to be much simpler than writing shell/batch files and other
wrappers to manage environment variables.

If you came here looking for ways to force-require or detect environment variables, have a look
at [musthave](https://github.com/coreybutler/musthave).

---

#### Child Process

We use [gulp](https://gulpjs.com) alot, and sometimes it's nice to wrap this into a gulp launcher
instead of requiring it directly in your code. To accomplish this, we bootstrap it with a `start.js`
file that looks like:

```js
var le = require('localenvironment');
var exec = require('child_process').exec;

// Print out what we've loaded
Object.keys(le).forEach(function(key){
  console.log('Loaded env var:',key);
});

// Pass the environment vars to the child process
var child = exec('node index.js',{env:process.env},function(){});

child.stdout.on('data',function(data){
  console.log(data);
});
child.stderr.on('data',function(data){
  console.log(data);
});
```
