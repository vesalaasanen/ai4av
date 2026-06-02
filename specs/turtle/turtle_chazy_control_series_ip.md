---
spec_id: admin/turtle-chazy-control-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Turtle Chazy Control Series Control Spec"
manufacturer: Turtle
model_family: "Chazy Control"
aliases: []
compatible_with:
  manufacturers:
    - Turtle
  models:
    - "Chazy Control"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - turtleav.com
source_urls:
  - https://turtleav.com/wp-content/uploads/2025/04/Chazy-Control-API-.pdf
retrieved_at: 2026-04-30T04:31:30.813Z
last_checked_at: 2026-06-02T07:06:47.021Z
generated_at: 2026-06-02T07:06:47.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SSH TCP port not stated in source. Authentication credentials for TELNET / SSH not stated in source."
  - "source says \"log in to the corresponding terminal\" but documents no credentials or auth procedure"
  - "source documents no unsolicited notifications or async event stream"
  - "source documents no multi-step macro sequences; reset/reboot are atomic SET commands"
  - "SSH port not stated. Firmware version compatibility ranges not stated. HTTPS port / base path for web GUI not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:47.021Z
  matched_actions: 152
  action_count: 152
  confidence: medium
  summary: "All 152 spec commands match verbatim in the source; transport port 23 and serial 57600/8N1 confirmed; source catalogue is fully represented by the spec. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Turtle Chazy Control Series Control Spec

## Summary
The Chazy Control is a Turtle AV-over-IP controller that manages a fleet of TX (encoder) and RX (decoder) endpoints plus video walls and Dante audio devices. Control is exposed as a line-oriented ASCII API accessible over TELNET (TCP port 23) or SSH; an equivalent console is available on the rear-panel serial port at 57600 baud, 8 data bits, no parity, 1 stop bit.

<!-- UNRESOLVED: SSH TCP port not stated in source. Authentication credentials for TELNET / SSH not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TELNET default; configurable via SET NETWORK TELNET PORT (max 65535)
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # UNRESOLVED: source says "log in to the corresponding terminal" but documents no credentials or auth procedure
```

## Traits
```yaml
- routable   # inferred: video/audio/IR/RS-232/USB/CEC switch commands
- queryable  # inferred: GET STATUS, GET DEC STATUS, GET ENC STATUS, GET GPIO STATUS, GET WALL STATUS, GET DANTE DEV STATUS
- powerable  # inferred: SET REBOOT, SET DEC REBOOT, SET ENC REBOOT, SET RESET family
- levelable  # inferred: GPIO LEVEL, IO OUT, IR VOL, IO VOL commands
```

## Actions
```yaml
- id: help
  label: Print Help
  kind: action
  command: "HELP"
  params: []

- id: help_short
  label: Print Help (short)
  kind: action
  command: "?"
  params: []

- id: get_status
  label: Get Controller Status
  kind: query
  command: "GET STATUS"
  params: []

- id: set_gpio_dir
  label: Set GPIO Direction
  kind: action
  command: "SET GPIO {gpio} DIR {dir}"
  params:
    - name: gpio
      type: integer
      description: GPIO number (1-4)
    - name: dir
      type: enum
      values: [IN, OUT]

- id: set_gpio_level
  label: Set GPIO Output Level
  kind: action
  command: "SET GPIO {gpio} LEVEL {level}"
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
  command: "GET GPIO {gpio} LEVEL"
  params:
    - name: gpio
      type: integer
      description: GPIO number (1-4)

- id: get_gpio_status
  label: Get GPIO Status
  kind: query
  command: "GET GPIO {gpio} STATUS"
  params:
    - name: gpio
      type: integer
      description: GPIO number (1-4); optional to get all

- id: set_rs232_baudrate
  label: Set RS-232 Baud Rate
  kind: action
  command: "SET RS232BAUDRATE {a}"
  params:
    - name: a
      type: enum
      description: 0:115200, 1:57600, 2:38400, 3:19200, 4:9600

- id: set_reset_system
  label: Reset System Configuration
  kind: action
  command: "SET RESET"
  params: []

- id: set_reset_network
  label: Reset Network Configuration
  kind: action
  command: "SET RESET NETWORK"
  params: []

- id: set_reset_all
  label: Reset All Configuration
  kind: action
  command: "SET RESET ALL"
  params: []

- id: set_reboot
  label: Restart Controller
  kind: action
  command: "SET REBOOT"
  params: []

- id: set_dec_id
  label: Set RX ID
  kind: action
  command: "SET DEC {dec} ID {id}"
  params:
    - name: dec
      type: integer
      description: Current RX ID (001-762)
    - name: id
      type: integer
      description: Target ID (001-762)

- id: set_dec_name
  label: Set RX Name
  kind: action
  command: "SET DEC {dec} NAME {name}"
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: name
      type: string
      description: RX name

- id: set_dec_switch_all
  label: Set RX Routing (All Signals)
  kind: action
  command: "SET DEC {dec} SWITCH {enc} ALL"
  params:
    - name: dec
      type: integer
      description: RX ID (001-762)
    - name: enc
      type: integer
      description: TX ID (001-762); 0 to cancel route

- id: set_dec_switch_video
  label: Lock RX Video Route
  kind: action
  command: "SET DEC {dec} SWITCH {enc} VIDEO"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: enc
      type: integer
      description: TX ID; 0 to unlock

- id: set_dec_switch_audio
  label: Lock RX Audio Route
  kind: action
  command: "SET DEC {dec} SWITCH {enc} AUDIO"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: enc
      type: integer
      description: TX ID; 0 to unlock

- id: set_dec_switch_ir
  label: Lock RX IR Route
  kind: action
  command: "SET DEC {dec} SWITCH {enc} IR"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: enc
      type: integer
      description: TX ID; 0 to unlock

- id: set_dec_switch_rs232
  label: Lock RX RS-232 Route
  kind: action
  command: "SET DEC {dec} SWITCH {enc} RS232"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: enc
      type: integer
      description: TX ID; 0 to unlock

- id: set_dec_switch_usb
  label: Lock RX USB Route
  kind: action
  command: "SET DEC {dec} SWITCH {enc} USB"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: enc
      type: integer
      description: TX ID; 0 to unlock

- id: set_dec_switch_cec
  label: Lock RX CEC Route
  kind: action
  command: "SET DEC {dec} SWITCH {enc} CEC"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: enc
      type: integer
      description: TX ID; 0 to unlock

- id: set_dec_led
  label: Control RX Power LED Flash
  kind: action
  command: "SET DEC {dec} LED {mode}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: mode
      type: enum
      values: [ON, OFF, "ON 90"]
      description: ON flashes; ON 90 flashes for 90 seconds; OFF steady on

- id: set_dec_output_osd
  label: Set RX OSD Switch
  kind: action
  command: "SET DEC {dec} OUTPUT OSD {state}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_dec_output_hdmi
  label: Set RX HDMI OUTPUT Switch
  kind: action
  command: "SET DEC {dec} OUTPUT {state}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_dec_output_mute
  label: Set RX HDMI OUTPUT Mute
  kind: action
  command: "SET DEC {dec} OUTPUT MUTE {state}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_dec_output_resolution
  label: Set RX Output Resolution
  kind: action
  command: "SET DEC {dec} OUTPUT RESOLUTION {res}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: res
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
      description: 00:Bypass, 01:1080p@50, 02:1080p@60, 03:720p@50, 04:720p@60, 05:2160p@24, 06:2160p@30, 07:2160p@50, 08:2160p@60, 09:1280x1024@60, 10:1360x768@60, 11:1440x900@60, 12:1680x1050@60, 13:1920x1200@60

- id: set_dec_output_rotate
  label: Set RX Screen Rotation
  kind: action
  command: "SET DEC {dec} OUTPUT ROTATE {rtt}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: rtt
      type: enum
      values: ["0", "1", "2", "3"]
      description: 0:0°, 1:90°, 2:180°, 3:270°

- id: set_dec_output_flip
  label: Set RX Screen Flip
  kind: action
  command: "SET DEC {dec} OUTPUT FLIP {mode}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: mode
      type: enum
      values: [HOR, VER, OFF]
      description: HOR flip horizontal; VER flip vertical; OFF normal

- id: set_dec_ir_vol
  label: Set RX IR Voltage Level
  kind: action
  command: "SET DEC {dec} IR VOL {vol}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: vol
      type: enum
      values: ["5V", "12V"]

- id: set_dec_io_vol
  label: Set RX IO Voltage Level
  kind: action
  command: "SET DEC {dec} IO VOL {vol}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: vol
      type: enum
      values: ["5V", "12V"]

- id: set_dec_io_dir
  label: Set RX IO Direction
  kind: action
  command: "SET DEC {dec} IO {io} DIR {dir}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: io
      type: enum
      values: ["1", "2"]
      description: IO number
    - name: dir
      type: enum
      values: [IN, OUT]

- id: set_dec_io_out
  label: Set RX IO Output Level
  kind: action
  command: "SET DEC {dec} IO {io} OUT {level}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: io
      type: enum
      values: ["1", "2"]
    - name: level
      type: enum
      values: ["0", "1"]

- id: set_dec_relay
  label: Set RX Relay Switch
  kind: action
  command: "SET DEC {dec} RELAY {rly} {state}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: rly
      type: enum
      values: ["1", "2"]
    - name: state
      type: enum
      values: [OPEN, CLOSE]

- id: set_dec_mode
  label: Set RX Image Output Mode
  kind: action
  command: "SET DEC {dec} MODE {mode}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: mode
      type: enum
      values: [MX, VW]
      description: MX matrix mode; VW video-wall mode

- id: set_dec_sac
  label: Set RX CEC/ARC Switch
  kind: action
  command: "SET DEC {dec} SAC {mode}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: mode
      type: enum
      values: [ARC, CEC, OFF]
      description: Note: decoder will reboot if setting changed

- id: set_dec_arp
  label: Set RX Audio Return Path
  kind: action
  command: "SET DEC {dec} ARP {path}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: path
      type: enum
      values: [ARC, SPDIF]
      description: Only valid when ARC is on

- id: set_dec_earc_downgrade
  label: Set RX eARC Downgrade to ARC
  kind: action
  command: "SET DEC {dec} EARC DOWNGRADE {state}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: state
      type: enum
      values: [ON, OFF]
      description: Only valid when ARC is on

- id: set_dec_net
  label: Set RX Network Mode (Fiber/Copper)
  kind: action
  command: "SET DEC {dec} NET {mode}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: mode
      type: enum
      values: [FIBER, COPPER]

- id: set_dec_usb_data
  label: Set RX USB Disk/Camera Switch
  kind: action
  command: "SET DEC {dec} USB DATA {state}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_dec_multicast
  label: Set RX Multicast Mode
  kind: action
  command: "SET DEC {dec} MULTICAST {state}"
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); 0 for all RX
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_dec_dante_bridge
  label: Set RX Dante Bridge
  kind: action
  command: "SET DEC {dec} DANTE BRIDGE {state}"
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); 0 for all RX
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_dec_dante_vlan
  label: Set RX Dante VLAN
  kind: action
  command: "SET DEC {dec} DANTE VLAN {state}"
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); 0 for all RX
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_dec_dante_vlan_tag
  label: Set RX Dante VLAN Tag
  kind: action
  command: "SET DEC {dec} DANTE VLAN TAG {tag}"
  params:
    - name: dec
      type: integer
      description: RX ID (001-762); 0 for all RX
    - name: tag
      type: integer
      description: VLAN tag (1-4095)

- id: set_dec_cec_send
  label: Send CEC Data to RX (Guest)
  kind: action
  command: "SET DEC {dec} CEC SEND {b1} {b2}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: b1
      type: integer
      description: CEC opcode byte 1 (decimal)
    - name: b2
      type: integer
      description: CEC opcode byte 2 (decimal)

- id: set_dec_ir_send
  label: Send IR Data to RX (Guest)
  kind: action
  command: "SET DEC {dec} IR SEND {ccf}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: ccf
      type: string
      description: IR instruction code, CCF format

- id: set_dec_guest_params
  label: Set RX Serial Port Parameters (Guest)
  kind: action
  command: "SET DEC {dec} GUEST {state} BR {br} BIT {bit}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: state
      type: enum
      values: [ON, OFF]
      description: Open/close serial port Guest mode
    - name: br
      type: enum
      description: 0:300, 1:600, 2:1200, 3:2400, 4:4800, 5:9600, 6:19200, 7:38400, 8:57600, 9:115200
    - name: bit
      type: string
      description: Data bits+parity+stop bits, e.g. 8N1; data [5-8], parity [n|o|e], stop [1-2]

- id: set_dec_guest_start
  label: Start RX Serial Port Guest Mode
  kind: action
  command: "SET DEC {dec} GUEST"
  params:
    - name: dec
      type: integer
      description: RX ID

- id: exit_guest
  label: Exit Guest Mode
  kind: action
  command: "EXITGUEST"
  params: []

- id: set_dec_ipmode
  label: Set RX IP Mode
  kind: action
  command: "SET DEC {dec} IPMODE {mode}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: mode
      type: enum
      values: [DHCP, STATIC]
      description: Requires SET DEC xx NETWORK REBOOT to apply

- id: set_dec_static_ip
  label: Set RX Static IP Address
  kind: action
  command: "SET DEC {dec} STATIC IP {ip}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: ip
      type: string
      description: IP address
      # Requires SET DEC xx NETWORK REBOOT to apply

- id: set_dec_static_mask
  label: Set RX Static Subnet Mask
  kind: action
  command: "SET DEC {dec} STATIC MASK {mask}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: mask
      type: string
      description: Subnet mask
      # Requires SET DEC xx NETWORK REBOOT to apply

- id: set_dec_static_gateway
  label: Set RX Static Gateway
  kind: action
  command: "SET DEC {dec} STATIC GATEWAY {gw}"
  params:
    - name: dec
      type: integer
      description: RX ID
    - name: gw
      type: string
      description: Gateway address
      # Requires SET DEC xx NETWORK REBOOT to apply

- id: set_dec_network_reboot
  label: Restart RX Network Card
  kind: action
  command: "SET DEC {dec} NETWORK REBOOT"
  params:
    - name: dec
      type: integer
      description: RX ID

- id: set_dec_delete
  label: Remove RX from System
  kind: action
  command: "SET DEC {dec} DELETE"
  params:
    - name: dec
      type: integer
      description: RX ID

- id: set_dec_reboot
  label: Restart RX
  kind: action
  command: "SET DEC {dec} REBOOT"
  params:
    - name: dec
      type: integer
      description: RX ID

- id: set_dec_reset
  label: Reset RX
  kind: action
  command: "SET DEC {dec} RESET"
  params:
    - name: dec
      type: integer
      description: RX ID

- id: get_dec_status
  label: Get RX Status
  kind: query
  command: "GET DEC {dec} STATUS"
  params:
    - name: dec
      type: integer
      description: RX ID (0 = all RX)

- id: set_dec_preset_ipmode
  label: Set RX Preset IP Mode
  kind: action
  command: "SET DEC PRESET IPMODE {mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]
      description: 0:AUTOIP, 1:DHCP, 2:STATIC

- id: set_dec_preset_start_ip
  label: Set RX Preset IP Start Address
  kind: action
  command: "SET DEC PRESET START IP {ip}"
  params:
    - name: ip
      type: string
      description: Start IP for RX preset range

- id: set_dec_preset_end_ip
  label: Set RX Preset IP End Address
  kind: action
  command: "SET DEC PRESET END IP {ip}"
  params:
    - name: ip
      type: string
      description: End IP for RX preset range (must be > start, same subnet)

- id: set_dec_preset_sm
  label: Set RX Preset Subnet Mask
  kind: action
  command: "SET DEC PRESET SM {mask}"
  params:
    - name: mask
      type: string
      description: Subnet mask

- id: set_dec_preset_gw
  label: Set RX Preset Gateway
  kind: action
  command: "SET DEC PRESET GW {gw}"
  params:
    - name: gw
      type: string
      description: Gateway

- id: set_dec_preset_apply
  label: Save RX Preset Configuration
  kind: action
  command: "SET DEC PRESET APPLY"
  params: []

- id: set_enc_id
  label: Set TX ID
  kind: action
  command: "SET ENC {enc} ID {id}"
  params:
    - name: enc
      type: integer
      description: Current TX ID (001-762)
    - name: id
      type: integer
      description: Target ID (001-762)

- id: set_enc_name
  label: Set TX Name
  kind: action
  command: "SET ENC {enc} NAME {name}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: name
      type: string
      description: TX name

- id: set_enc_switch_arc
  label: Lock TX ARC Route
  kind: action
  command: "SET ENC {enc} SWITCH {dec} ARC"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: dec
      type: integer
      description: RX ID; 0 to unlock

- id: set_enc_led
  label: Control TX Power LED Flash
  kind: action
  command: "SET ENC {enc} LED {mode}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: mode
      type: enum
      values: [ON, OFF, "ON 90"]
      description: ON flashes; ON 90 flashes for 90s; OFF steady on

- id: set_enc_audio_input
  label: Set TX Audio Source
  kind: action
  command: "SET ENC {enc} AUDIO INPUT {src}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: src
      type: enum
      values: [HDMI, ANA]
      description: HDMI from HDMI IN; ANA from analog AUDIO IN L/R

- id: set_enc_edid_default
  label: Set TX Default EDID
  kind: action
  command: "SET ENC {enc} EDID DEFAULT {edid}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: edid
      type: enum
      description: "00:1080P,2.0SDR 01:1080P,DD5.1SDR 02:1080P,HD7.1SDR 03:1080I,2.0SDR 04:1080I,DD5.1SDR 05:1080I,HD7.1SDR 06:3D,2.0SDR 07:3D,DD5.1SDR 08:3D,HD7.1SDR 09:4K2K30_444,2.0SDR 10:4K2K30_444,DD5.1SDR 11:4K2K30_444,HD7.1SDR 12:4K2K60_420,2.0SDR 13:4K2K60_420,DD5.1SDR 14:4K2K60_420,HD7.1SDR 15:4K2K60_444,2.0SDR 16:4K2K60_444,DD5.1SDR 17:4K2K60_444,HD7.1SDR 18:4K2K60_444,2.0HDR 19:4K2K60_444,DD5.1HDR 20:4K2K60_444,HD7.1HDR 21:DVI1280x1024 22:DVI1920x1080 23:DVI1920x1200 25:User1 26:User2"

- id: set_enc_edid_copy
  label: Copy EDID from RX to TX
  kind: action
  command: "SET ENC {enc} EDID COPY {dec}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: dec
      type: integer
      description: Source RX ID (001-762)

- id: set_enc_ir_vol
  label: Set TX IR Voltage Level
  kind: action
  command: "SET ENC {enc} IR VOL {vol}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: vol
      type: enum
      values: ["5V", "12V"]

- id: set_enc_io_vol
  label: Set TX IO Voltage Level
  kind: action
  command: "SET ENC {enc} IO VOL {vol}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: vol
      type: enum
      values: ["5V", "12V"]

- id: set_enc_io_dir
  label: Set TX IO Direction
  kind: action
  command: "SET ENC {enc} IO {io} DIR {dir}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: io
      type: enum
      values: ["1", "2"]
    - name: dir
      type: enum
      values: [IN, OUT]

- id: set_enc_io_out
  label: Set TX IO Output Level
  kind: action
  command: "SET ENC {enc} IO {io} OUT {level}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: io
      type: enum
      values: ["1", "2"]
    - name: level
      type: enum
      values: ["0", "1"]

- id: set_enc_relay
  label: Set TX Relay Switch
  kind: action
  command: "SET ENC {enc} RELAY {rly} {state}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: rly
      type: enum
      values: ["1", "2"]
    - name: state
      type: enum
      values: [OPEN, CLOSE]

- id: set_enc_sac
  label: Set TX CEC/ARC Switch
  kind: action
  command: "SET ENC {enc} SAC {mode}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: mode
      type: enum
      values: [ARC, CEC, OFF]
      description: TX reboots if changed

- id: set_enc_net
  label: Set TX Network Mode (Fiber/Copper)
  kind: action
  command: "SET ENC {enc} NET {mode}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: mode
      type: enum
      values: [FIBER, COPPER]

- id: set_enc_multicast
  label: Set TX Multicast Mode
  kind: action
  command: "SET ENC {enc} MULTICAST {state}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_enc_dante_bridge
  label: Set TX Dante Bridge
  kind: action
  command: "SET ENC {enc} DANTE BRIDGE {state}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_enc_dante_vlan
  label: Set TX Dante VLAN
  kind: action
  command: "SET ENC {enc} DANTE VLAN {state}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: state
      type: enum
      values: [ON, OFF]

- id: set_enc_dante_vlan_tag
  label: Set TX Dante VLAN Tag
  kind: action
  command: "SET ENC {enc} DANTE VLAN TAG {tag}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: tag
      type: integer
      description: VLAN tag (1-4095)

- id: set_enc_cec_send
  label: Send CEC Data to TX (Guest)
  kind: action
  command: "SET ENC {enc} CEC SEND {b1} {b2}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: b1
      type: integer
      description: CEC opcode byte 1 (decimal)
    - name: b2
      type: integer
      description: CEC opcode byte 2 (decimal)

- id: set_enc_ir_send
  label: Send IR Data to TX (Guest)
  kind: action
  command: "SET ENC {enc} IR SEND {ccf}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: ccf
      type: string
      description: IR instruction code, CCF format

- id: set_enc_guest_params
  label: Set TX Serial Port Parameters (Guest)
  kind: action
  command: "SET ENC {enc} GUEST {state} BR {br} BIT {bit}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: state
      type: enum
      values: [ON, OFF]
    - name: br
      type: enum
      description: "0:300,1:600,2:1200,3:2400,4:4800,5:9600,6:19200,7:38400,8:57600,9:115200"
    - name: bit
      type: string
      description: "Data bits+parity+stop, e.g. 8N1; data [5-8], parity [n|o|e], stop [1-2]"

- id: set_enc_guest_start
  label: Start TX Serial Port Guest Mode
  kind: action
  command: "SET ENC {enc} GUEST"
  params:
    - name: enc
      type: integer
      description: TX ID

- id: set_enc_ipmode
  label: Set TX IP Mode
  kind: action
  command: "SET ENC {enc} IPMODE {mode}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: mode
      type: enum
      values: [DHCP, STATIC]
      # Requires SET ENC xx NETWORK REBOOT to apply

- id: set_enc_static_ip
  label: Set TX Static IP Address
  kind: action
  command: "SET ENC {enc} STATIC IP {ip}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: ip
      type: string
      description: IP address
      # Requires SET ENC xx NETWORK REBOOT to apply

- id: set_enc_static_mask
  label: Set TX Static Subnet Mask
  kind: action
  command: "SET ENC {enc} STATIC MASK {mask}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: mask
      type: string
      description: Subnet mask
      # Requires SET ENC xx NETWORK REBOOT to apply

- id: set_enc_static_gateway
  label: Set TX Static Gateway
  kind: action
  command: "SET ENC {enc} STATIC GATEWAY {gw}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: gw
      type: string
      description: Gateway
      # Requires SET ENC xx NETWORK REBOOT to apply

- id: set_enc_network_reboot
  label: Restart TX Network Card
  kind: action
  command: "SET ENC {enc} NETWORK REBOOT"
  params:
    - name: enc
      type: integer
      description: TX ID

- id: set_enc_delete
  label: Remove TX from System
  kind: action
  command: "SET ENC {enc} DELETE"
  params:
    - name: enc
      type: integer
      description: TX ID

- id: set_enc_reboot
  label: Restart TX
  kind: action
  command: "SET ENC {enc} REBOOT"
  params:
    - name: enc
      type: integer
      description: TX ID

- id: set_enc_reset
  label: Reset TX
  kind: action
  command: "SET ENC {enc} RESET"
  params:
    - name: enc
      type: integer
      description: TX ID

- id: get_enc_status
  label: Get TX Status
  kind: query
  command: "GET ENC {enc} STATUS"
  params:
    - name: enc
      type: integer
      description: TX ID (0 = all TX)

- id: set_enc_preset_ipmode
  label: Set TX Preset IP Mode
  kind: action
  command: "SET ENC PRESET IPMODE {mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2"]
      description: 0:AUTOIP, 1:DHCP, 2:STATIC

- id: set_enc_preset_start_ip
  label: Set TX Preset IP Start Address
  kind: action
  command: "SET ENC PRESET START IP {ip}"
  params:
    - name: ip
      type: string
      description: Start IP for TX preset range

- id: set_enc_preset_end_ip
  label: Set TX Preset IP End Address
  kind: action
  command: "SET ENC PRESET END IP {ip}"
  params:
    - name: ip
      type: string
      description: End IP for TX preset range

- id: set_enc_preset_sm
  label: Set TX Preset Subnet Mask
  kind: action
  command: "SET ENC PRESET SM {mask}"
  params:
    - name: mask
      type: string
      description: Subnet mask

- id: set_enc_preset_gw
  label: Set TX Preset Gateway
  kind: action
  command: "SET ENC PRESET GW {gw}"
  params:
    - name: gw
      type: string
      description: Gateway

- id: set_enc_preset_apply
  label: Save TX Preset Configuration
  kind: action
  command: "SET ENC PRESET APPLY"
  params: []

- id: dante_dev_search
  label: Search Dante Devices
  kind: query
  command: "DANTE DEV SEARCH"
  params: []

- id: set_dante_dev_name
  label: Set Dante Device Name
  kind: action
  command: "SET DANTE DEV {devname} NAME {name}"
  params:
    - name: devname
      type: string
      description: Current Dante device name
    - name: name
      type: string
      description: New name

- id: set_dante_dev_srate
  label: Set Dante Audio Sample Rate
  kind: action
  command: "SET DANTE DEV {devname} SRATE {rate}"
  params:
    - name: devname
      type: string
    - name: rate
      type: integer
      description: Sample rate (Hz)

- id: set_dante_dev_enc
  label: Set Dante Audio Encoding
  kind: action
  command: "SET DANTE DEV {devname} ENC {enc}"
  params:
    - name: devname
      type: string
    - name: enc
      type: integer
      description: Encoding bits (e.g. 16, 24, 32)

- id: set_dante_txchn_name
  label: Set Dante TX Channel Name
  kind: action
  command: "SET DANTE DEV {devname} {stream} TXCHN {chn} NAME {name}"
  params:
    - name: devname
      type: string
    - name: stream
      type: enum
      values: [AUDIO, VIDEO]
    - name: chn
      type: integer
      description: Channel number
    - name: name
      type: string
      description: Channel name

- id: set_dante_txflow
  label: Set Dante TX Flow
  kind: action
  command: "SET DANTE DEV {devname} {stream} TXFLOW {flow} ID {id} SLOT {slot}"
  params:
    - name: devname
      type: string
    - name: stream
      type: enum
      values: [AUDIO, VIDEO]
    - name: flow
      type: string
      description: Flow name
    - name: id
      type: integer
      description: Flow ID
    - name: slot
      type: string
      description: TX channels (e.g. 1:2)

- id: delete_dante_txflow
  label: Delete Dante TX Flow
  kind: action
  command: "SET DANTE DEV {devname} {stream} TXFLOW {id} DELETE"
  params:
    - name: devname
      type: string
    - name: stream
      type: enum
      values: [AUDIO, VIDEO]
    - name: id
      type: integer
      description: Flow ID to delete

- id: set_dante_rxchn_name
  label: Set Dante RX Channel Name
  kind: action
  command: "SET DANTE DEV {devname} {stream} RXCHN {chn} NAME {name}"
  params:
    - name: devname
      type: string
    - name: stream
      type: enum
      values: [AUDIO, VIDEO]
    - name: chn
      type: integer
      description: Channel number
    - name: name
      type: string
      description: Channel name

- id: set_dante_subscribe
  label: Set Dante Subscribe (RX Channel Source)
  kind: action
  command: "SET DANTE DEV {devname} {stream} RXCHN {chn} SOURCE {txdev} CHN {txchn}"
  params:
    - name: devname
      type: string
      description: RX Dante device name
    - name: stream
      type: enum
      values: [AUDIO, VIDEO]
    - name: chn
      type: integer
      description: RX channel number
    - name: txdev
      type: string
      description: TX Dante device name
    - name: txchn
      type: integer
      description: TX channel number

- id: set_dante_latency
  label: Set Dante Latency
  kind: action
  command: "SET DANTE DEV {devname} LATENCY {latency}"
  params:
    - name: devname
      type: string
    - name: latency
      type: integer
      description: Latency value (e.g. 5000 = 5ms)

- id: get_dante_status
  label: Get Dante Device Status
  kind: query
  command: "GET DANTE DEV {devname} STATUS"
  params:
    - name: devname
      type: string
      description: Dante device name

- id: get_enc_ss_status
  label: Get TX SS Module Status
  kind: query
  command: "GET ENC {enc} SS STATUS"
  params:
    - name: enc
      type: integer
      description: TX ID (0 = all TX)

- id: get_enc_ss_msurl
  label: Get TX SS Mainstream URL
  kind: query
  command: "GET ENC {enc} SS MSURL"
  params:
    - name: enc
      type: integer
      description: TX ID
      # Gen 1: RTSP; Gen 2: MJPG (http://IP:8080/?action=stream)

- id: get_enc_ss_ssurl
  label: Get TX SS Substream URL
  kind: query
  command: "GET ENC {enc} SS SSURL"
  params:
    - name: enc
      type: integer
      description: TX ID
      # Gen 1: RTSP; Gen 2 not supported

- id: set_enc_ss_reboot
  label: Restart TX SS Module
  kind: action
  command: "SET ENC {enc} SS REBOOT"
  params:
    - name: enc
      type: integer
      description: TX ID
      # Gen 2 not supported

- id: set_enc_ss_reset
  label: Reset TX SS Module
  kind: action
  command: "SET ENC {enc} SS RESET"
  params:
    - name: enc
      type: integer
      description: TX ID
      # Gen 2 not supported

- id: set_enc_ss_mainencattr
  label: Set TX SS Mainstream Encoding Attributes
  kind: action
  command: "SET ENC {enc} SS MAINENCATTR E {etype} H {mhor} V {mver} B {mbr}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: etype
      type: enum
      values: ["0", "1"]
      description: "0:h264, 1:h265"
    - name: mhor
      type: integer
      description: Image width 960-1920 (must be even)
    - name: mver
      type: integer
      description: Image height 540-1080 (must be even)
    - name: mbr
      type: enum
      description: "0:1Mb 1:2Mb 2:4Mb 3:6Mb 4:8Mb 5:10Mb 6:12Mb 7:16Mb 8:20Mb"
      # Gen 2 not supported

- id: set_enc_ss_subencattr
  label: Set TX SS Substream Encoding Attributes
  kind: action
  command: "SET ENC {enc} SS SUBENCATTR E {etype} H {shor} V {sver} B {sbr}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: etype
      type: enum
      values: ["0", "1"]
      description: "0:h264, 1:h265"
    - name: shor
      type: integer
      description: Image width 320-960 (must be even)
    - name: sver
      type: integer
      description: Image height 180-540 (must be even)
    - name: sbr
      type: enum
      description: "0:128kb 1:256kb 2:512kb 3:1Mb 4:2Mb"
      # Gen 2 not supported

- id: set_enc_ss_workmode
  label: Set TX SS Operating Mode
  kind: action
  command: "SET ENC {enc} SS WORKMODE {mode}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: mode
      type: enum
      values: ["0", "1", "2"]
      description: "0:FOLLOW, 1:DHCP, 2:STATIC"
      # Gen 2 not supported

- id: set_enc_ss_network
  label: Set TX SS IP/Subnet/Gateway
  kind: action
  command: "SET ENC {enc} SS NETWORK IP {ip} MASK {mask} GATEWAY {gw}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: ip
      type: string
      description: IP address
    - name: mask
      type: string
      description: Subnet mask
    - name: gw
      type: string
      description: Gateway
      # Only valid when WORKMODE is DHCP or STATIC; Gen 2 not supported

- id: set_enc_ss_vltag
  label: Set TX SS VLAN Tag
  kind: action
  command: "SET ENC {enc} SS VLTAG {state} {id}"
  params:
    - name: enc
      type: integer
      description: TX ID
    - name: state
      type: enum
      values: [ON, OFF]
    - name: id
      type: integer
      description: VLAN ID 1-4094 (only with ON)
      # Gen 2 not supported

- id: create_wall
  label: Create Video Wall
  kind: action
  command: "CREATE WALL HANDLE {hdl}"
  params:
    - name: hdl
      type: integer
      description: Wall handle ID

- id: delete_wall
  label: Delete Video Wall
  kind: action
  command: "DELETE WALL HANDLE {hdl}"
  params:
    - name: hdl
      type: integer
      description: Wall handle ID

- id: set_wall_name
  label: Set Video Wall Name
  kind: action
  command: "SET WALL {hdl} NAME {name}"
  params:
    - name: hdl
      type: integer
      description: Wall handle ID
    - name: name
      type: string
      description: Wall name (max 16 chars)

- id: set_wall_size
  label: Set Video Wall Size (Columns x Rows)
  kind: action
  command: "SET WALL {hdl} C {c} R {r}"
  params:
    - name: hdl
      type: integer
    - name: c
      type: integer
      description: Number of columns
    - name: r
      type: integer
      description: Number of rows

- id: set_wall_assign_dec
  label: Assign RX to Video Wall Position
  kind: action
  command: "SET WALL {hdl} DEC {dec} H {h} V {v}"
  params:
    - name: hdl
      type: integer
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
  command: "CREATE WALL {hdl} PRESET {prs}"
  params:
    - name: hdl
      type: integer
    - name: prs
      type: integer
      description: Preset number; preset 1 auto-creates a new wall

- id: delete_wall_preset
  label: Delete Video Wall Preset
  kind: action
  command: "DELETE WALL {hdl} PRESET {prs}"
  params:
    - name: hdl
      type: integer
    - name: prs
      type: integer

- id: set_wall_preset_name
  label: Set Video Wall Preset Name
  kind: action
  command: "SET WALL {hdl} PRESET {prs} NAME {name}"
  params:
    - name: hdl
      type: integer
    - name: prs
      type: integer
    - name: name
      type: string
      description: Preset name (max 16 chars)

- id: apply_wall_preset
  label: Apply (Start) Video Wall Preset
  kind: action
  command: "APPLY WALL {hdl} PRESET {prs}"
  params:
    - name: hdl
      type: integer
    - name: prs
      type: integer

- id: set_wall_preset_class
  label: Set Video Wall Preset Class
  kind: action
  command: "SET WALL {hdl} PRESET {prs} CLASS {cls} H {h} V {v}"
  params:
    - name: hdl
      type: integer
    - name: prs
      type: integer
    - name: cls
      type: enum
      values: [A, B, C, D, E, F, G]
      description: Group ID; default group A on preset creation
    - name: h
      type: integer
    - name: v
      type: integer

- id: set_wall_preset_class_source
  label: Set Video Wall Preset Class Signal Source
  kind: action
  command: "SET WALL {hdl} PRESET {prs} CLASS {cls} SOURCE {enc}"
  params:
    - name: hdl
      type: integer
    - name: prs
      type: integer
    - name: cls
      type: enum
      values: [A, B, C, D, E, F, G]
    - name: enc
      type: integer
      description: TX ID (001-762); 0 to cancel

- id: set_wall_preset_matrix
  label: Set Video Wall Preset Matrix Group
  kind: action
  command: "SET WALL {hdl} PRESET {prs} MATRIX H {h} V {v}"
  params:
    - name: hdl
      type: integer
    - name: prs
      type: integer
    - name: h
      type: integer
    - name: v
      type: integer

- id: set_wall_preset_matrix_source
  label: Set Video Wall Preset Matrix Group Signal Source
  kind: action
  command: "SET WALL {hdl} PRESET {prs} MATRIX H {h} V {v} SOURCE {enc}"
  params:
    - name: hdl
      type: integer
    - name: prs
      type: integer
    - name: h
      type: integer
    - name: v
      type: integer
    - name: enc
      type: integer
      description: TX ID (001-762); 0 to cancel

- id: set_wall_width_bezel
  label: Set Video Wall Width-Direction Bezel
  kind: action
  command: "SET WALL {hdl} H {h} V {v} WIDTH BEZEL BW {b} IW {i}"
  params:
    - name: hdl
      type: integer
    - name: h
      type: integer
    - name: v
      type: integer
    - name: b
      type: integer
      description: Original image width 100-1000
    - name: i
      type: integer
      description: Visible image width 100-1000 (i <= b)

- id: set_wall_height_bezel
  label: Set Video Wall Height-Direction Bezel
  kind: action
  command: "SET WALL {hdl} H {h} V {v} HEIGHT BEZEL BH {b} IH {i}"
  params:
    - name: hdl
      type: integer
    - name: h
      type: integer
    - name: v
      type: integer
    - name: b
      type: integer
      description: Raw image height 100-1000
    - name: i
      type: integer
      description: Visible image height 100-1000 (i <= b)

- id: get_wall_status
  label: Get Video Wall Status
  kind: query
  command: "GET WALL {hdl} STATUS"
  params:
    - name: hdl
      type: integer
      description: Wall handle ID

- id: search
  label: Search for Online Devices
  kind: query
  command: "SEARCH"
  params: []

- id: get_search_status
  label: Get Device Search Results
  kind: query
  command: "GET SEARCH STATUS"
  params: []

- id: search_reset
  label: Clear Device Search Results
  kind: action
  command: "SEARCH RESET"
  params: []

- id: add_auto_all
  label: Auto-Add New Devices to System
  kind: action
  command: "ADD AUTO ALL"
  params: []

- id: add_dev_enc
  label: Add New TX to System
  kind: action
  command: "ADD DEV {dev} ENC {enc}"
  params:
    - name: dev
      type: integer
      description: SEARCH result index of the new encoder
    - name: enc
      type: integer
      description: "TXID (001-762); 0 = auto-assign"

- id: add_dev_dec
  label: Add New RX to System
  kind: action
  command: "ADD DEV {dev} DEC {dec}"
  params:
    - name: dev
      type: integer
      description: SEARCH result index of the new decoder
    - name: dec
      type: integer
      description: "RXID (001-762); 0 = auto-assign"

- id: add_dev_reset
  label: Clear All Equipment in System
  kind: action
  command: "ADD DEV RESET"
  params: []

- id: set_network_dhcp
  label: Set Controller LAN DHCP
  kind: action
  command: "SET NETWORK {lan} DHCP {state}"
  params:
    - name: lan
      type: enum
      values: [LAN1, LAN2]
      description: "LAN1: VIDEO LAN; LAN2: CONTROL LAN"
    - name: state
      type: enum
      values: [ON, OFF]
      description: ON enable DHCP; OFF static IP
      # Requires SET NETWORK REBOOT or repower

- id: set_network_static_ip
  label: Set Controller LAN Static IP
  kind: action
  command: "SET NETWORK {lan} STATIC IP {ip}"
  params:
    - name: lan
      type: enum
      values: [LAN1, LAN2]
    - name: ip
      type: string
      description: IP address
      # Requires SET NETWORK REBOOT or repower

- id: set_network_static_gateway
  label: Set Controller LAN Static Gateway
  kind: action
  command: "SET NETWORK {lan} STATIC GATEWAY {gw}"
  params:
    - name: lan
      type: enum
      values: [LAN1, LAN2]
    - name: gw
      type: string
      description: Gateway
      # Requires SET NETWORK REBOOT or repower

- id: set_network_static_mask
  label: Set Controller LAN Static Subnet Mask
  kind: action
  command: "SET NETWORK {lan} STATIC MASK {mask}"
  params:
    - name: lan
      type: enum
      values: [LAN1, LAN2]
    - name: mask
      type: string
      description: Subnet mask
      # Requires SET NETWORK REBOOT or repower

- id: set_network_reboot
  label: Restart Controller Network Card
  kind: action
  command: "SET NETWORK REBOOT"
  params: []

- id: set_network_telnet_port
  label: Set Controller TELNET Port
  kind: action
  command: "SET NETWORK TELNET PORT {port}"
  params:
    - name: port
      type: integer
      description: "TCP port 1-65535 (default 23)"

- id: set_network_https
  label: Set Controller HTTPS Switch
  kind: action
  command: "SET NETWORK HTTPS {state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: HTTPS off by default

- id: set_network_dns
  label: Set Controller Domain Name
  kind: action
  command: "SET NETWORK DNS {hostname}"
  params:
    - name: hostname
      type: string
      description: Domain name (letters, digits, _, .); default controller.local
      # System restarts on change
```

## Feedbacks
```yaml
- id: power_led_flash
  type: enum
  values: [flashing, steady, "flashing_90s"]
  description: RX/TX power LED state set by SET ... LED
- id: hdmi_output_state
  type: enum
  values: [on, off]
- id: hdmi_mute
  type: enum
  values: [on, off]
- id: osd_state
  type: enum
  values: [on, off]
- id: arc_state
  type: enum
  values: [ARC, CEC, OFF]
- id: route_signal
  type: enum
  values: [locked, unlocked]
  description: Per-signal routing (VIDEO/AUDIO/IR/RS-232/USB/CEC)
- id: relay_state
  type: enum
  values: [open, close]
- id: io_level
  type: enum
  values: [low, high]
- id: ip_mode
  type: enum
  values: [AUTOIP, DHCP, STATIC]
- id: net_mode
  type: enum
  values: [FIBER, COPPER]
- id: dante_bridge
  type: enum
  values: [on, off]
- id: dante_vlan
  type: enum
  values: [on, off]
- id: sac_mode
  type: enum
  values: [ARC, CEC, OFF]
- id: arp_mode
  type: enum
  values: [ARC, SPDIF]
- id: earc_downgrade
  type: enum
  values: [on, off]
- id: usb_data
  type: enum
  values: [on, off]
- id: multicast
  type: enum
  values: [on, off]
- id: output_mode
  type: enum
  values: [MX, VW]
- id: rotation
  type: enum
  values: ["0", "90", "180", "270"]
- id: flip_mode
  type: enum
  values: [HOR, VER, OFF]
- id: resolution
  type: enum
  values: ["Bypass", "1080p@50", "1080p@60", "720p@50", "720p@60", "2160p@24", "2160p@30", "2160p@50", "2160p@60", "1280x1024@60", "1360x768@60", "1440x900@60", "1680x1050@60", "1920x1200@60"]
- id: ir_voltage
  type: enum
  values: ["5V", "12V"]
- id: io_voltage
  type: enum
  values: ["5V", "12V"]
- id: https_state
  type: enum
  values: [on, off]
- id: dante_latency_us
  type: integer
  description: Microseconds (e.g. 5000 = 5ms)
- id: edid
  type: enum
  description: 24 default EDIDs (00-23) plus User1/2 (25/26); see SET ENC EDID DEFAULT
- id: rs232_baud_index
  type: enum
  description: Baud rate index 0:115200 1:57600 2:38400 3:19200 4:9600
- id: audio_input
  type: enum
  values: [HDMI, ANA]
- id: aes67
  type: enum
  description: Aes67 support / enable / prefix read from GET DANTE DEV STATUS
- id: sample_rate
  type: integer
  description: 44100/48000/88200/96000
- id: encoding_bits
  type: enum
  description: PCM16/PCM24/PCM32
- id: ss_url
  type: string
  description: RTSP or http://IP:8080/?action=stream URL from GET ENC SS MSURL/SSURL
- id: ss_workmode
  type: enum
  description: 0:FOLLOW 1:DHCP 2:STATIC
- id: ss_enc_type
  type: enum
  values: [h264, h265]
```

## Variables
```yaml
- id: rs232_baud_rate
  type: integer
  description: Current RS-232 baud rate (default 57600; settable via SET RS232BAUDRATE)
- id: telnet_port
  type: integer
  description: Current TELNET TCP port (default 23)
- id: domain_name
  type: string
  description: Controller DNS hostname (default controller.local)
- id: edid_default
  type: integer
  description: Currently selected default EDID (00-26)
- id: dante_latency
  type: integer
  description: Current Dante latency in microseconds
- id: ip_address
  type: string
  description: Per-device static IP (controller LAN1/LAN2, RX, TX)
- id: subnet_mask
  type: string
- id: gateway
  type: string
- id: vlan_tag
  type: integer
  description: "1-4095"
- id: ss_bit_rate
  type: enum
  description: Mainstream 0:1Mb..8:20Mb; substream 0:128kb..4:2Mb
- id: wall_bezel
  type: object
  description: "Per-screen BW/IW and BH/IH (100-1000)"
- id: wall_size
  type: object
  description: "Columns x Rows"
- id: name
  type: string
  description: Per-device user-assigned name (RX, TX, wall, preset)
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications or async event stream
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences; reset/reboot are atomic SET commands
```

## Safety
```yaml
[]
```

## Notes
- The controller operates a line-oriented ASCII CLI. Each command is a token sequence; parameter values use spaces (no `=` or quoting). Commands return either a `[SUCCESS]...` / `[ERROR]...` line for setters, or a multi-line block (delimited by `====...`) for status queries.
- Network parameter changes on the controller (LAN1/LAN2 DHCP/IP/gateway/mask) and on each RX/TX (STATIC IP/MASK/GATEWAY/IPMODE) do NOT take effect immediately: the source explicitly says you must follow up with `SET NETWORK REBOOT` (controller) or `SET DEC/ENC xx NETWORK REBOOT` (endpoints).
- `SET DEC/ENC xx SAC ARC|CEC|OFF` will reboot the decoder/encoder if the setting changes.
- Reset/reboot actions (`SET RESET`, `SET RESET NETWORK`, `SET RESET ALL`, `SET REBOOT`, `SET DEC/ENC xx RESET`, `SET DEC/ENC xx REBOOT`, `ADD DEV RESET`) clear equipment and configuration; the source warns that these will take ~40 seconds and that RS-232 will be disabled during that time.
- TX SS module features (`SET ENC xx SS ...`) are documented as not supported on Gen 2 devices.
- DANTE subscribe channel count scales per-device (stereo uses 1-2; 8/16/64-channel devices use the appropriate range). For VIDEO streams the channel number is always 1.
- The default TELNET port is 23, but the source provides `SET NETWORK TELNET PORT` (max 65535) to change it; treat the `port: 23` in Transport as the out-of-the-box default rather than a fixed value.
- Authentication: the source describes no credential exchange, but TELNET/SSH logins are normally credentialed. Operators should expect default or undocumented credentials until vendor-supplied.
<!-- UNRESOLVED: SSH port not stated. Firmware version compatibility ranges not stated. HTTPS port / base path for web GUI not stated. -->

## Provenance

```yaml
source_domains:
  - turtleav.com
source_urls:
  - https://turtleav.com/wp-content/uploads/2025/04/Chazy-Control-API-.pdf
retrieved_at: 2026-04-30T04:31:30.813Z
last_checked_at: 2026-06-02T07:06:47.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:47.021Z
matched_actions: 152
action_count: 152
confidence: medium
summary: "All 152 spec commands match verbatim in the source; transport port 23 and serial 57600/8N1 confirmed; source catalogue is fully represented by the spec. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SSH TCP port not stated in source. Authentication credentials for TELNET / SSH not stated in source."
- "source says \"log in to the corresponding terminal\" but documents no credentials or auth procedure"
- "source documents no unsolicited notifications or async event stream"
- "source documents no multi-step macro sequences; reset/reboot are atomic SET commands"
- "SSH port not stated. Firmware version compatibility ranges not stated. HTTPS port / base path for web GUI not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
