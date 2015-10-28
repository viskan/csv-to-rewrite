# csv-to-rewrite

> Convert CSV to URL rewrites


## Install

```
$ npm install --save csv-to-rewrite
```


## Usage

```js
const csvToRewrite = require('csv-to-rewrite');

csvToRewrite('name,from,to\Unicorns,http://foo.com,http://bar.com');
/*
	<rule>
		<name>Unicorns</name>
		<from>http://foo.com</from>
		<to>http://bar.com</to>
	</rule>
 */
```


## License

MIT © [Kevin Martensson](http://github.com/kevva)
