import config from 'config'
import logger from 'pino'

const level = config.get<string>('pinoLogLevel')
const log = logger({
	level,
	transport: {
		target: 'pino-pretty',
		options: {
			levelFirst: false,
			translateTime: true,
			colorize: true,
			colorizeObjects: true,
		},
	},
	base: {
		pid: false,
	},
});

export default log
