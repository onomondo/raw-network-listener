const rnl = require('./')
const test = require('tape')
const cap = require('cap')
const dgram = require('dgram')

test('Has the right methods exposed', t => {
  t.plan(3)
  t.equals(rnl.decoders, cap.decoders, 'decoders exposed correctly')
  t.equals(rnl.findDevice, cap.Cap.findDevice, 'findDevice() exposed correctly')
  t.equals(rnl.deviceList, cap.Cap.deviceList, 'deviceList() exposed correctly')
})

test('Listen for packets on loopback', t => {
  t.plan(3)

  const loopback = rnl({
    interface: 'lo0',
    filter: 'udp'
  })

  t.ok(loopback.send, 'send() exposed')
  t.equals(loopback.linkType, 'NULL', 'linkType is NULL for loopback')

  loopback.on('packet', packet => {
    const udpData = packet.slice(32).toString()

    if (udpData !== 'hello world!') return // Since there's a lot of other packets, ignore these

    t.ok(true, 'Received hello world!')
    loopback.close()
    udpSocket.close()
  })

  const udpSocket = dgram.createSocket('udp4')
  udpSocket.send(Buffer.from('hello world!'), 12345, '127.0.0.1')
})
