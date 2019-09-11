# raw-network-listener

Wrapper around [cap](https://github.com/mscdex/cap) that listens for packets on network interfaces.

Uses [pcap filters](https://www.tcpdump.org/manpages/pcap-filter.7.html).

```
$ npm install raw-network-listeners
```

## Usage

``` js
const rnl = require('raw-network-listener')

const loopback = rnl({
  interface: 'lo0',
  filter: '(icmp) and (src net 9.8.7.6)' // https://www.tcpdump.org/manpages/pcap-filter.7.html
})

console.log('Link type:', loopback.linkType)

loopback.on('packet', packet => {
  console.log('New packet received:', packet.toString('hex'))
})
```

## API

### .decoders

From [cap.decoders](https://github.com/mscdex/cap#decoders-static-methods)

### .findDevice()

From [cap.Cap.findDevice](https://github.com/mscdex/cap#cap-static-methods)

### .deviceList()

From [cap.Cap.deviceList](https://github.com/mscdex/cap#cap-static-methods)

### ({ interface, fitler })

Create listener on the `interface` (e.g. `lo0` or `eth0`) with the filter. Filters are based on [pcap filters](https://www.tcpdump.org/manpages/pcap-filter.7.html).

#### .on('packet', packet => ...)

Is emitted when a new packet is registered on the interface. `packet` is a buffer.

#### .linkType

The link type of the interface

#### .send()

From [cap.Cap().send](https://github.com/mscdex/cap#cap-methods)

#### .close()

From [cap.Cap().close](https://github.com/mscdex/cap#cap-methods)

#### .setMinBytes()

From [cap.Cap().setMinBytes](https://github.com/mscdex/cap#cap-methods)
