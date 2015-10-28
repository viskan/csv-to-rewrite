import redent from 'redent';
import test from 'ava';
import trimNewlines from 'trim-newlines';
import fn from'./';

test('simple', async t => {
	const data = await fn('name,from,to\nUnicorn,http://foo.com,http://bar.com');
	const str = redent(trimNewlines(`
		<rule>
		    <name>Unicorn</name>
		    <from>http://foo.com</from>
		    <to>http://bar.com</to>
		</rule>
	`));

	t.is(data[0].trim(), str.trim());
});

test('opts', async t => {
	const data = await fn('from,to\nhttp://foo.com,http://bar.com', {
		strict: true,
		attributes: {
			last: true,
			type: 'permanent-redirect'
		}
	});

	const str = redent(trimNewlines(`
		<rule>
		    <from>^http://foo.com$</from>
		    <to last="true" type="permanent-redirect">http://bar.com</to>
		</rule>
	`));

	t.is(data[0].trim(), str.trim());
});
