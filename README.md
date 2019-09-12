# Local Environment

**tl;dr** Create environment variables at runtime from a JSON configuration file, _if one exists_.

## Usage

This module loads environment variables from a configuration file, _if the file exists_. Each attribute will be assigned to the `process.env` object. If the file does not exist, it does nothing (i.e. won't break the script). 

As of version 1.1.0, the module looks for `env.json`, `.env.json`, and `.env` (expects JSON content). It is also possible to look for a file with a different name (see Custom Config section below). It only loads the first file it finds.

Using the module is extremely simple (one line of JavaScript). Consider the following project directory:

```sh
> dir
  - env.json
  - index.js
```

The `env.json` may look like:

```json
{
  "MY_VARIABLE_1": "abc",
  "MY_VARIABLE_2": "def"
}
```

The `index.js` file would look like:

```javascript
require('localenvironment') // <-- This is all the code you need.

console.log(process.env.MY_VARIABLE_1)
console.log(process.env.MY_VARIABLE_2)
```

_Here's what's happening..._

Running this code would output the following:

```sh
abc
def
```

The module reads the `env.json` file and applies the variables in such a manner that they are accessible just like any other environment variable.

Now consider the exact same `index.js` file run in a Docker container _without a config file_:

```sh
docker run -e "MY_VARIABLE_1=ghi" -e "MY_VARIABLE_2=jkl" node index.js
```
_(This is pseduo code, for illustration purposes)_

The output would be:

```sh
ghi
jkl
```

The only difference between these examples is the first was configured through a local JSON file and the second was configured through Docker environment variables. The **JavaScript didn't change** from one environment to the other.

## Custom File

As of version 1.1.0, it is possible to tell localenvironment to search for a custom filename. The name of the file can be passed to the module as an argument.

For example:

```javascript
let myEnvironment = require('localenvironment')
myEnvironment.load('/path/to/myconfig.json')
```

## Additional Features

The module will return an object of the variables it injected into the environment.

```javascript
let myEnvironment = require('localenvironment)

console.log(myEnvironment)
```

This would output the following:

```json
{
  "MY_VARIABLE_1": "abc",
  "MY_VARIABLE_2": "def"
}
```

This feature can be useful for understanding what was configured by the module and what wasn't.

---

#### Intended Use

It's common practice to use a different configurations for development and production. For example, many people use Development API keys when creating on †heir workstation, but Production API keys when running the code on a live server.

This module allows developers to write one line of code that will run predictably in any environment.

**The developer's responsibility is to configure environment variables correctly, _not to write conditional logic that manipulates the envionrment_.**

There are also programs written that function differently _if an environment variable exists_. This module won't fire an error if it doesn't find the `env.json`, so it's easy to manipulate the environment simply by commenting out some code or changing a file name.

Your mileage will vary, but I've found this to be much simpler than writing shell/batch files and other wrappers to manage environment variables. The pattern is used so often I even [ported it to Golang](https://github.com/coreybutler/go-localenvironment).

If you came here looking for ways to force-require or detect local environment variables, have a look
at [musthave](https://github.com/coreybutler/musthave) instead.
