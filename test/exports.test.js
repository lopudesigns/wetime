import
{
	default as WithTooltip,
	TimeAgo as ReactTimeAgo
}
from '../index'

import javascript_time_ago from 'wetimejs'
javascript_time_ago.locale(require('wetimejs/locale/en'))

describe(`exports`, function()
{
	it(`should export ES6`, function()
	{
		new ReactTimeAgo({ locale: 'en-US' }, {})
		WithTooltip({ locale: 'en-US', children: new Date() })
	})

	it(`should export CommonJS`, function()
	{
		const Library = require('../index.commonjs')

		new Library.TimeAgo({ locale: 'en-US' }, {})
		Library.default({ locale: 'en-US', children: new Date() })
		Library({ locale: 'en-US', children: new Date() })
	})
})