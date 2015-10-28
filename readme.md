# csv-to-rewrite

> Convert CSV to URL rewrites


## Install

```
$ npm install --save csv-to-rewrite
```


## Usage

```js
const csvToRewrite = require('csv-to-rewrite');

csvToRewrite('name,from,to\nUnicorns,http://foo.com,http://bar.com').then(data => {
	console.log(data[0]);
	/*
		<rule>
			<name>Unicorns</name>
			<from>http://foo.com</from>
			<to>http://bar.com</to>
		</rule>
	 */
});
```


## CLI

```
$ npm install --global csv-to-rewrite
```

```
$ csv-to-rewrite --help

  Example
    $ csv-to-rewrite --out unicorn.xml unicorn.csv
    $ cat unicorn.csv | csv-to-rewrite > unicorn.xml
```


## License

MIT © [Kevin Martensson](http://github.com/kevva)
