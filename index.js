const { Cap, decoders } = require('cap')
const EventEmitter = require('events')

const BUFFER_SIZE = 10 * 1024 * 1024

module.exports = ({ interface, filter }) => {
  const that = new EventEmitter()
  const globalCapRawBuffer = Buffer.alloc(65535)
  const networkListener = new Cap()
  const linkType = networkListener.open(interface, filter, BUFFER_SIZE, globalCapRawBuffer)

  if (networkListener.setMinBytes) networkListener.setMinBytes(0) // Windows only. Recommended by cap.

  networkListener.on('packet', nbytes => {
    const packet = globalCapRawBuffer.slice(0, nbytes)
    const copyBuffer = Buffer.from(packet) // Expensive call, but guarantees that the buffer does not change

    that.emit('packet', copyBuffer)
  })

  that.linkType = linkType
  that.close = networkListener.close.bind(networkListener)
  that.send = networkListener.send.bind(networkListener)
  that.setMinBytes = networkListener.setMinBytes && networkListener.setMinBytes.bind(networkListener)

  return that
}

module.exports.decoders = decoders
module.exports.findDevice = Cap.findDevice
module.exports.deviceList = Cap.deviceList
