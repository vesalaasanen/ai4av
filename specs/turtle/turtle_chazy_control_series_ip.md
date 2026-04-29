---
schema_version: ai4av-public-spec-v1
device_id: turtle/chazy-control-series
entity_id: turtle_chazy_control_series
spec_id: admin/turtle-chazy-control-series
revision: 1
author: admin
title: "Turtle Chazy Control Series Control Spec"
status: published
manufacturer: Turtle
manufacturer_key: turtle
model_family: "Chazy Control Series"
aliases: []
compatible_with:
  manufacturers:
    - Turtle
  models:
    - "Chazy Control Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: turtle_chazy_control_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:34:49.925Z
retrieved_at: 2026-04-27T10:34:49.925Z
last_checked_at: 2026-04-27T10:34:49.925Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:34:49.925Z
  matched_actions: 220
  action_count: 220
  confidence: high
  summary: "All 220 spec actions match source command semantics; transport parameters verified verbatim; semantic-id convention applied consistently across the catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# Turtle Chazy Control Series Control Spec

## Summary
The Turtle Chazy Control Series is an AV distribution control system managing TX (encoder) and RX (decoder) endpoints over IP and RS-232. Control is via plaintext TELNET command-line API on TCP port 23 (default). No authentication is required. The system supports signal routing, device discovery, video wall management, Dante audio transport, and per-device configuration.

<!-- UNRESOLVED: device power specifications (voltage/current) not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default TELNET port; configurable via SET NETWORK TELNET PORT
serial:
  baud_rate: 57600  # default; configurable via SET RS232BAUDRATE
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: GET STATUS, GET DEC/ENC STATUS, GET GPIO, GET WALL, GET SEARCH STATUS commands present
- routable   # inferred: SET DEC [dec] SWITCH [enc] commands for VIDEO/AUDIO/IR/RS232/USB/CEC routing
```

## Actions
```yaml
# System (Section 2)
- id: help
  label: Help
  kind: action
  params: []
- id: get_status
  label: Get Status
  kind: query
  params: []
- id: set_gpio_dir
  label: Set GPIO Direction
  kind: action
  params:
    - name: gpio
      type: integer
      description: GPIO number (1-4)
    - name: direction
      type: enum
      values: [IN, OUT]
- id: set_gpio_level
  label: Set GPIO Output Level
  kind: action
  params:
    - name: gpio
      type: integer
      description: GPIO number (1-4)
    - name: level
      type: enum
      values: [Low, High]
- id: get_gpio_level
  label: Get GPIO Input Level
  kind: query
  params:
    - name: gpio
      type: integer
      description: GPIO number (1-4)
- id: get_gpio_status
  label: Get GPIO Status
  kind: query
  params:
    - name: gpio
      type: integer
      description: GPIO number (1-4); omit for all
- id: set_rs232_baudrate
  label: Set RS232 Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: "0:115200 1:57600 2:38400 3:19200 4:9600"
- id: set_reset
  label: Reset System Config
  kind: action
  params: []
- id: set_reset_network
  label: Reset Network Config
  kind: action
  params: []
- id: set_reset_all
  label: Reset All Config
  kind: action
  params: []
- id: set_reboot
  label: Reboot System
  kind: action
  params: []

# RX / Decoder (Section 3)
- id: set_dec_id
  label: Set RX ID Number
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: id
      type: integer
      description: Target ID (001-762)
- id: set_dec_name
  label: Set RX Name
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: name
      type: string
      description: New name
- id: set_dec_switch_all
  label: Set RX All Signals Routing
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to cancel
- id: set_dec_switch_video
  label: Set RX Video Routing
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to unlock
- id: set_dec_switch_audio
  label: Set RX Audio Routing
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to unlock
- id: set_dec_switch_ir
  label: Set RX IR Routing
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to unlock
- id: set_dec_switch_rs232
  label: Set RX RS-232 Routing
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to unlock
- id: set_dec_switch_usb
  label: Set RX USB Routing
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to unlock
- id: set_dec_switch_cec
  label: Set RX CEC Routing
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to unlock
- id: set_dec_led
  label: Set RX Power LED
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
    - name: duration
      type: integer
      description: Optional flash duration in seconds (e.g., 90)
- id: set_dec_output_osd
  label: Set RX OSD Switch
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_dec_output
  label: Set RX HDMI Output
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_dec_output_mute
  label: Set RX HDMI Output Mute
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_dec_output_resolution
  label: Set RX Output Resolution
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: res
      type: integer
      description: "00:Bypass 01:1080p@50 02:1080p@60 03:720p@50 04:720p@60 05:2160p@24 06:2160p@30 07:2160p@50 08:2160p@60 09:1280x1024@60 10:1360x768@60 11:1440x900@60 12:1680x1050@60 13:1920x1200@60"
- id: set_dec_output_rotate
  label: Set RX Screen Rotate
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: rtt
      type: integer
      description: "0:0° 1:90° 2:180° 3:270°"
- id: set_dec_output_flip
  label: Set RX Screen Flip
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: mode
      type: enum
      values: [HOR, VER, OFF]
- id: set_dec_ir_vol
  label: Set RX IR Level
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: vol
      type: enum
      values: [5V, 12V]
- id: set_dec_io_vol
  label: Set RX IO Level
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: vol
      type: enum
      values: [5V, 12V]
- id: set_dec_io_dir
  label: Set RX IO Direction
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: io_num
      type: integer
      description: IO number (1-2)
    - name: direction
      type: enum
      values: [IN, OUT]
- id: set_dec_io_out
  label: Set RX IO Output Level
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: io_num
      type: integer
      description: IO number (1-2)
    - name: level
      type: integer
      description: "0: low 1: high"
- id: set_dec_relay
  label: Set RX Relay Switch
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: relay_num
      type: integer
      description: Relay number (1-2)
    - name: state
      type: enum
      values: [OPEN, CLOSE]
- id: set_dec_mode
  label: Set RX Image Output Mode
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: mode
      type: enum
      values: [MX, VW]
- id: set_dec_sac
  label: Set RX CEC/ARC Switch
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: mode
      type: enum
      values: [ARC, CEC, OFF]
- id: set_dec_arp
  label: Set RX Audio Return
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: mode
      type: enum
      values: [ARC, SPDIF]
- id: set_dec_earc_downgrade
  label: Set RX eARC Downgrade to ARC
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_dec_net
  label: Set RX Copper/Fiber Mode
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: mode
      type: enum
      values: [FIBER, COPPER]
- id: set_dec_usb_data
  label: Set RX USB Disk/Camera Switch
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_dec_multicast
  label: Set RX Multicast Mode
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); 0 = all RX
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_dec_dante_bridge
  label: Set RX Dante Bridge
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); 0 = all RX
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_dec_dante_vlan
  label: Set RX Dante VLAN
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); 0 = all RX
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_dec_dante_vlan_tag
  label: Set RX Dante VLAN Tag
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); 0 = all RX
    - name: tag
      type: integer
      description: VLAN tag (1-4095)
- id: set_dec_cec_send
  label: Send CEC Data to RX
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: data
      type: string
      description: 16 decimal CEC instruction code
- id: set_dec_ir_send
  label: Send IR Data to RX
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: data
      type: string
      description: 16 decimal IR instruction code (CCF format)
- id: set_dec_guest_serial
  label: Set RX Serial Port Parameters
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
    - name: br
      type: integer
      description: "0:300 1:600 2:1200 3:2400 4:4800 5:9600 6:19200 7:38400 8:57600 9:115200"
    - name: bit
      type: string
      description: Format like 8N1 (data bits 5-8, parity n/o/e, stop bits 1-2)
- id: set_dec_guest
  label: Start RX Serial Guest Mode
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
- id: exit_guest
  label: Exit Serial Guest Mode
  kind: action
  params: []
- id: set_dec_ipmode
  label: Set RX IP Mode
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: mode
      type: enum
      values: [DHCP, STATIC]
- id: set_dec_static_ip
  label: Set RX Static IP Address
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: ip
      type: string
      description: IP address
- id: set_dec_static_mask
  label: Set RX Subnet Mask
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: mask
      type: string
      description: Subnet mask
- id: set_dec_static_gateway
  label: Set RX Gateway Address
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: gw
      type: string
      description: Gateway IP address
- id: set_dec_network_reboot
  label: Restart RX Network Card
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
- id: set_dec_delete
  label: Remove RX from System
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
- id: set_dec_reboot
  label: Restart RX
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
- id: set_dec_reset
  label: Reset RX to Default
  kind: action
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
- id: get_dec_status
  label: Get RX Status
  kind: query
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); omit for all
- id: set_dec_preset_ipmode
  label: Set RX Preset IP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0:AUTOIP 1:DHCP 2:STATIC"
- id: set_dec_preset_start_ip
  label: Set RX Preset IP Start Address
  kind: action
  params:
    - name: ip
      type: string
      description: Start IP address
- id: set_dec_preset_end_ip
  label: Set RX Preset IP End Address
  kind: action
  params:
    - name: ip
      type: string
      description: End IP address
- id: set_dec_preset_sm
  label: Set RX Preset Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
      description: Subnet mask
- id: set_dec_preset_gw
  label: Set RX Preset Gateway Address
  kind: action
  params:
    - name: gw
      type: string
      description: Gateway address
- id: set_dec_preset_apply
  label: Save RX Preset Configuration
  kind: action
  params: []

# TX / Encoder (Section 4)
- id: set_enc_id
  label: Set TX ID Number
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: id
      type: integer
      description: Target ID (001-762)
- id: set_enc_name
  label: Set TX Name
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: name
      type: string
      description: New name
- id: set_enc_switch_arc
  label: Set TX ARC Routing
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: dec
      type: integer
      description: RX ID (001-762) or 0 to unlock
- id: set_enc_led
  label: Set TX Power LED
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
    - name: duration
      type: integer
      description: Optional flash duration in seconds (e.g., 90)
- id: set_enc_audio_input
  label: Set TX Audio Source
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: source
      type: enum
      values: [HDMI, ANA]
- id: set_enc_edid_default
  label: Set TX EDID
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: edid
      type: integer
      description: "00-08:1080p/3D modes 09-11:4K30_444 12-14:4K60_420 15-17:4K60_444 18-20:4K60_444HDR 21-23:DVI 25:User1 26:User2"
- id: set_enc_edid_copy
  label: Copy RX EDID to TX
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: dec
      type: integer
      description: RX ID (001-762)
- id: set_enc_ir_vol
  label: Set TX IR Level
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: vol
      type: enum
      values: [5V, 12V]
- id: set_enc_io_vol
  label: Set TX IO Level
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: vol
      type: enum
      values: [5V, 12V]
- id: set_enc_io_dir
  label: Set TX IO Direction
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: io_num
      type: integer
      description: IO number (1-2)
    - name: direction
      type: enum
      values: [IN, OUT]
- id: set_enc_io_out
  label: Set TX IO Output Level
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: io_num
      type: integer
      description: IO number (1-2)
    - name: level
      type: integer
      description: "0: low 1: high"
- id: set_enc_relay
  label: Set TX Relay Switch
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: relay_num
      type: integer
      description: Relay number (1-2)
    - name: state
      type: enum
      values: [OPEN, CLOSE]
- id: set_enc_sac
  label: Set TX CEC/ARC Switch
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: mode
      type: enum
      values: [ARC, CEC, OFF]
- id: set_enc_net
  label: Set TX Electric Mode
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: mode
      type: enum
      values: [FIBER, COPPER]
- id: set_enc_multicast
  label: Set TX Multicast Mode
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_enc_dante_bridge
  label: Set TX Dante Bridge
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_enc_dante_vlan
  label: Set TX Dante VLAN
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_enc_dante_vlan_tag
  label: Set TX Dante VLAN Tag
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: tag
      type: integer
      description: VLAN tag (1-4095)
- id: set_enc_cec_send
  label: Send CEC Data to TX
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: data
      type: string
      description: 16 decimal CEC instruction code
- id: set_enc_ir_send
  label: Send IR Data to TX
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: data
      type: string
      description: 16 decimal IR instruction code (CCF format)
- id: set_enc_guest_serial
  label: Set TX Serial Port Parameters
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
    - name: br
      type: integer
      description: "0:300 1:600 2:1200 3:2400 4:4800 5:9600 6:19200 7:38400 8:57600 9:115200"
    - name: bit
      type: string
      description: Format like 8N1
- id: set_enc_guest
  label: Start TX Serial Guest Mode
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: set_enc_ipmode
  label: Set TX IP Mode
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: mode
      type: enum
      values: [DHCP, STATIC]
- id: set_enc_static_ip
  label: Set TX Static IP Address
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: ip
      type: string
      description: IP address
- id: set_enc_static_mask
  label: Set TX Subnet Mask
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: mask
      type: string
      description: Subnet mask
- id: set_enc_static_gateway
  label: Set TX Gateway Address
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: gw
      type: string
      description: Gateway IP address
- id: set_enc_network_reboot
  label: Restart TX Network Card
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: set_enc_delete
  label: Remove TX from System
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: set_enc_reboot
  label: Restart TX
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: set_enc_reset
  label: Reset TX to Default
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: get_enc_status
  label: Get TX Status
  kind: query
  params:
    - name: enc
      type: integer
      description: TX ID (001-762); omit for all
- id: set_enc_preset_ipmode
  label: Set TX Preset IP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0:AUTOIP 1:DHCP 2:STATIC"
- id: set_enc_preset_start_ip
  label: Set TX Preset IP Start Address
  kind: action
  params:
    - name: ip
      type: string
      description: Start IP address
- id: set_enc_preset_end_ip
  label: Set TX Preset IP End Address
  kind: action
  params:
    - name: ip
      type: string
      description: End IP address
- id: set_enc_preset_sm
  label: Set TX Preset Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
      description: Subnet mask
- id: set_enc_preset_gw
  label: Set TX Preset Gateway Address
  kind: action
  params:
    - name: gw
      type: string
      description: Gateway address
- id: set_enc_preset_apply
  label: Save TX Preset Configuration
  kind: action
  params: []

# Dante (Section 5)
- id: dante_dev_search
  label: Search Dante Devices
  kind: query
  params: []
- id: set_dante_dev_name
  label: Set Dante Device Name
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: name
      type: string
      description: New name
- id: set_dante_dev_srate
  label: Set Dante Audio Sample Rate
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: rate
      type: integer
      description: Sample rate (e.g., 44100, 48000, 88200, 96000)
- id: set_dante_dev_enc
  label: Set Dante Audio Encoding
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: enc
      type: integer
      description: Encoding (16: PCM16, 24: PCM24, 32: PCM32)
- id: set_dante_dev_audio_txchn_name
  label: Set Dante TX Audio Channel Name
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: chn
      type: integer
      description: TX channel number
    - name: name
      type: string
      description: Channel name
- id: set_dante_dev_video_txchn_name
  label: Set Dante TX Video Channel Name
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: chn
      type: integer
      description: TX channel number
    - name: name
      type: string
      description: Channel name
- id: set_dante_dev_audio_txflow
  label: Set Dante TX Audio Flow
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: chn
      type: integer
      description: TX channel number
    - name: id
      type: integer
      description: Flow ID
    - name: slot
      type: string
      description: TX channels (e.g., 1:2)
- id: set_dante_dev_video_txflow
  label: Set Dante TX Video Flow
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: chn
      type: integer
      description: TX channel number
    - name: id
      type: integer
      description: Flow ID
    - name: slot
      type: string
      description: TX channels
- id: delete_dante_dev_txflow
  label: Delete Dante TX Flow
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: flow_type
      type: enum
      values: [AUDIO, VIDEO]
    - name: id
      type: integer
      description: Flow ID
- id: set_dante_dev_audio_rxchn_name
  label: Set Dante RX Audio Channel Name
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: chn
      type: integer
      description: RX channel number
    - name: name
      type: string
      description: Channel name
- id: set_dante_dev_video_rxchn_name
  label: Set Dante RX Video Channel Name
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: chn
      type: integer
      description: RX channel number
    - name: name
      type: string
      description: Channel name
- id: set_dante_dev_audio_rxchn_source
  label: Set Dante RX Audio Subscribe
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name (subscriber)
    - name: chn
      type: integer
      description: RX channel number
    - name: txdev
      type: string
      description: TX Dante device name
    - name: txchn
      type: integer
      description: TX channel number
- id: set_dante_dev_video_rxchn_source
  label: Set Dante RX Video Subscribe
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name (subscriber)
    - name: chn
      type: integer
      description: RX channel number (always 1 for video)
    - name: txdev
      type: string
      description: TX Dante device name
    - name: txchn
      type: integer
      description: TX channel number
- id: set_dante_dev_latency
  label: Set Dante Latency
  kind: action
  params:
    - name: devname
      type: string
      description: Dante device name
    - name: latency
      type: integer
      description: Latency in microseconds (e.g., 5000 = 5ms)
- id: get_dante_dev_status
  label: Get Dante Device Status
  kind: query
  params:
    - name: devname
      type: string
      description: Dante device name

# TX Secondary Stream / SS (Section 6)
- id: get_enc_ss_status
  label: Get TX SS Status
  kind: query
  params:
    - name: enc
      type: integer
      description: TX ID (001-762); 0 = all
- id: get_enc_ss_msurl
  label: Get TX SS Mainstream URL
  kind: query
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: get_enc_ss_ssurl
  label: Get TX SS Substream URL
  kind: query
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: set_enc_ss_reboot
  label: Restart TX SS Module
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: set_enc_ss_reset
  label: Reset TX SS to Default
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
- id: set_enc_ss_mainencattr
  label: Set TX SS Mainstream Parameters
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: etype
      type: integer
      description: "0:h264 1:h265"
    - name: mhor
      type: integer
      description: Width (960-1920, even)
    - name: mver
      type: integer
      description: Height (540-1080, even)
    - name: mbr
      type: integer
      description: "0:1Mb 1:2Mb 2:4Mb 3:6Mb 4:8Mb 5:10Mb 6:12Mb 7:16Mb 8:20Mb"
- id: set_enc_ss_subencattr
  label: Set TX SS Substream Parameters
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: etype
      type: integer
      description: "0:h264 1:h265"
    - name: shor
      type: integer
      description: Width (320-960, even)
    - name: sver
      type: integer
      description: Height (180-540, even)
    - name: sbr
      type: integer
      description: "0:128kb 1:256kb 2:512kb 3:1Mb 4:2Mb"
- id: set_enc_ss_workmode
  label: Set TX SS Operating Mode
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: mode
      type: integer
      description: "0:FOLLOW 1:DHCP 2:STATIC"
- id: set_enc_ss_network
  label: Set TX SS IP Configuration
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: ip
      type: string
      description: SS IP address
    - name: mask
      type: string
      description: Subnet mask
    - name: gw
      type: string
      description: Gateway address
- id: set_enc_ss_vltag
  label: Set TX SS VLAN Tag
  kind: action
  params:
    - name: enc
      type: integer
      description: TX ID (001-762)
    - name: state
      type: enum
      values: [ON, OFF]
    - name: id
      type: integer
      description: VLAN ID (1-4094); only when ON

# Video Wall (Section 7)
- id: create_wall_handle
  label: Create Video Wall
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
- id: delete_wall_handle
  label: Remove Video Wall
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
- id: set_wall_name
  label: Modify Video Wall Name
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: name
      type: string
      description: New name (up to 16 characters)
- id: set_wall_size
  label: Set Video Wall Size
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: c
      type: integer
      description: Number of columns
    - name: r
      type: integer
      description: Number of rows
- id: set_wall_dec
  label: Assign RX to Video Wall
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: h
      type: integer
      description: Column position
    - name: v
      type: integer
      description: Row position
- id: create_wall_preset
  label: Create Video Wall Preset
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: prs
      type: integer
      description: Preset number
- id: delete_wall_preset
  label: Delete Video Wall Preset
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: prs
      type: integer
      description: Preset number
- id: set_wall_preset_name
  label: Modify Video Wall Preset Name
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: prs
      type: integer
      description: Preset number
    - name: name
      type: string
      description: New name (up to 16 characters)
- id: apply_wall_preset
  label: Start Video Wall Preset
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: prs
      type: integer
      description: Preset number
- id: set_wall_preset_class
  label: Set Video Wall Preset Class
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: prs
      type: integer
      description: Preset number
    - name: cls
      type: string
      description: Group ID (A-G)
    - name: h
      type: integer
      description: Number of columns in group
    - name: v
      type: integer
      description: Number of rows in group
- id: set_wall_preset_class_source
  label: Set Signal Source for Video Wall Preset Class
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: prs
      type: integer
      description: Preset number
    - name: cls
      type: string
      description: Group ID (A-G)
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to cancel
- id: set_wall_preset_matrix
  label: Set Video Wall Preset Matrix Group
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: prs
      type: integer
      description: Preset number
    - name: h
      type: integer
      description: Column position
    - name: v
      type: integer
      description: Row position
- id: set_wall_preset_matrix_source
  label: Set Signal Source for Video Wall Preset Matrix Group
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: prs
      type: integer
      description: Preset number
    - name: h
      type: integer
      description: Column position
    - name: v
      type: integer
      description: Row position
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 to cancel
- id: set_wall_bezel_width
  label: Set Video Wall Width Direction Bezel
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: h
      type: integer
      description: Column position
    - name: v
      type: integer
      description: Row position
    - name: b
      type: integer
      description: Raw image width (100-1000)
    - name: i
      type: integer
      description: Visible image width (100-1000), must be <= b
- id: set_wall_bezel_height
  label: Set Video Wall Height Direction Bezel
  kind: action
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID
    - name: h
      type: integer
      description: Column position
    - name: v
      type: integer
      description: Row position
    - name: b
      type: integer
      description: Raw image height (100-1000)
    - name: i
      type: integer
      description: Visible image height (100-1000), must be <= b
- id: get_wall_status
  label: Get Video Wall Status
  kind: query
  params:
    - name: hdl
      type: integer
      description: Video wall handle/ID

# System Management (Section 8)
- id: search
  label: Search Online Devices
  kind: query
  params: []
- id: get_search_status
  label: View Device Search Results
  kind: query
  params: []
- id: search_reset
  label: Clear Device Search Results
  kind: action
  params: []
- id: add_auto_all
  label: Auto Add New Devices
  kind: action
  params: []
- id: add_dev_enc
  label: Add TX Device
  kind: action
  params:
    - name: dev
      type: integer
      description: Search result index for new encoder
    - name: enc
      type: integer
      description: TX ID (001-762) or 0 for auto-assign
- id: add_dev_dec
  label: Add RX Device
  kind: action
  params:
    - name: dev
      type: integer
      description: Search result index for new decoder
    - name: dec
      type: integer
      description: RX ID (001-762) or 0 for auto-assign
- id: add_dev_reset
  label: Clear All Devices
  kind: action
  params: []

# Network Configuration (Section 9)
- id: set_network_dhcp
  label: Set Network IP Mode
  kind: action
  params:
    - name: lan
      type: enum
      values: [LAN1, LAN2]
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_network_static_ip
  label: Set Network Static IP
  kind: action
  params:
    - name: lan
      type: enum
      values: [LAN1, LAN2]
    - name: ip
      type: string
      description: IP address
- id: set_network_static_gateway
  label: Set Network Gateway
  kind: action
  params:
    - name: lan
      type: enum
      values: [LAN1, LAN2]
    - name: gw
      type: string
      description: Gateway address
- id: set_network_static_mask
  label: Set Network Subnet Mask
  kind: action
  params:
    - name: lan
      type: enum
      values: [LAN1, LAN2]
    - name: mask
      type: string
      description: Subnet mask
- id: set_network_reboot
  label: Restart Network Card
  kind: action
  params: []
- id: set_network_telnet_port
  label: Set TELNET Port Number
  kind: action
  params:
    - name: port
      type: integer
      description: TELNET port number (1-65535)
- id: set_network_https
  label: Set HTTPS Switch
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: set_network_dns
  label: Set Domain Name
  kind: action
  params:
    - name: hostname
      type: string
      description: Domain name
```

## Feedbacks
```yaml
# UNRESOLVED: no explicit feedback enumeration table in source; responses are
# [SUCCESS] and [ERROR] prefixed strings returned over TELNET
```

## Variables
```yaml
# UNRESOLVED: no discrete tunable parameters beyond actions; all configuration
# is command-driven via the Actions above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source;
# all communication is command/response over TELNET
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - set_reset      # requires typing "Yes" at confirmation prompt
  - set_reset_network  # requires typing "Yes" at confirmation prompt
  - set_reset_all   # requires typing "Yes" at confirmation prompt
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing
# requirements stated in source
```

## Notes
The Chazy Control API is a plaintext command-line protocol delivered over TELNET (TCP port 23 by default, configurable). Commands follow a structured format: `VERB [subject] KEY VALUE`. Responses are prefixed with `[SUCCESS]` or `[ERROR]` followed by a description.

Key command groups: System (GET STATUS, GPIO, RS232 baud), RX/decoders (001-762), TX/encoders (001-762), Dante devices, TX Secondary Streams (Gen1 only), Video Walls, System management (SEARCH, ADD DEV), and Network configuration.

All reset commands (`SET RESET`, `SET RESET NETWORK`, `SET RESET ALL`) require interactive confirmation by typing `Yes` at the prompt. The `SET REBOOT` and `SET NETWORK REBOOT` commands cause RS232 to be disabled during the ~40 second restart window.

GEN1 vs GEN2 differences: SS reboot/reset/mainencattr/subencattr/workmode/network/vltag are not supported on Gen2 devices. Gen2 SS uses MJPG for mainstream; Gen1 uses RTSP.

<!-- UNRESOLVED: SSH access method and credentials not described (document mentions TELNET/SSH for login but only TELNET commands detailed) -->
<!-- UNRESOLVED: HTTPS port number not stated (only that it can be switched on/off via SET NETWORK HTTPS) -->
<!-- UNRESOLVED: Dante latency supported values not fully enumerated in source -->
<!-- UNRESOLVED: actual Dante encoding bit depths not enumerated (only implied by PCM16/24/32) -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: turtle_chazy_control_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:34:49.925Z
retrieved_at: 2026-04-27T10:34:49.925Z
last_checked_at: 2026-04-27T10:34:49.925Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:34:49.925Z
matched_actions: 220
action_count: 220
confidence: high
summary: "All 220 spec actions match source command semantics; transport parameters verified verbatim; semantic-id convention applied consistently across the catalogue."
```

## Known Gaps

```yaml
[]
```
