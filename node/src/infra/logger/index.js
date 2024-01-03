import { createLogger, format, transports } from 'winston'

const upperCaseLevelFormat = format((info) => {
  info.level = info.level.toUpperCase()
  return info
})

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level} | ${message}`
})

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    upperCaseLevelFormat(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.colorize(),
    customFormat,
  ),
  defaultMeta: { service: 'node-nginx-challenge' },
  transports: [
    new transports.Console(),
  ],
})

export default logger
