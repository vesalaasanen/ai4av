---
spec_id: admin/sharp-pn-r-u-v-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN R U V Series Control Spec"
manufacturer: Sharp
model_family: "PN-RU-V Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "PN-RU-V Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
  - assets.sharpnecdisplays.us
  - business.sharpusa.com
  - manua.ls
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://business.sharpusa.com/product-downloads
  - https://sharp-displays.jp.sharp/dl/en/pj_soft/lineup.html
  - https://www.manua.ls/sharp
retrieved_at: 2026-05-13T20:42:25.950Z
last_checked_at: 2026-06-02T22:14:20.293Z
generated_at: 2026-06-02T22:14:20.293Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TV tuner commands (US-only), specific model variants not differentiated"
  - "full VCP table is extensive; see section 8 of source"
  - "monitor does not send unsolicited events;"
  - "no explicit safety warnings found in source"
  - "full VCP code table not included; section 8 lists OSD-to-command mappings only"
  - "port number for RS-232 not applicable (serial-only)"
  - "Ethernet cable type (crossover vs straight) not specified for TCP"
  - "IP address configuration details beyond DHCP default"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:20.293Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Sharp PN R U V Series Control Spec

## Summary
Sharp PN-RU-V Series commercial LCD monitor. Supports RS-232C and TCP/IP control via proprietary binary protocol. VCP (Virtual Control Protocol) and CTL (Control) command sets cover picture, audio, power, input routing, and system settings. 600ms packet interval required between commands.

<!-- UNRESOLVED: TV tuner commands (US-only), specific model variants not differentiated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP only; RS-232 has no port
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: power_control
  label: Power Control
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # ON
        - "0004"  # OFF
      description: Power mode (hex string)

- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []

- id: power_status_read
  label: Read Power Status
  kind: action
  params: []

- id: serial_number_read
  label: Read Serial Number
  kind: action
  params: []

- id: model_name_read
  label: Read Model Name
  kind: action
  params: []

- id: mac_address_read
  label: Read MAC Address
  kind: action
  params:
    - name: device
      type: string
      default: "00"
      description: Device selector (fixed "00")

- id: tv_channel_read
  label: Read TV Channel
  kind: action
  params: []

- id: tv_channel_write
  label: Write TV Channel
  kind: action
  params:
    - name: major_high
      type: string
      description: Major channel high (hex)
    - name: major_low
      type: string
      description: Major channel low (hex)
    - name: minor
      type: string
      description: Minor channel (hex)

- id: remote_control_code_send
  label: Send Remote Control Code
  kind: action
  params:
    - name: data_code
      type: string
      description: Remote control data code (e.g., "1D" for PICTURE)
    - name: repeat
      type: string
      description: Repeat count (hex, HL byte order)

- id: firmware_version_read
  label: Read Firmware Version
  kind: action
  params:
    - name: type
      type: string
      default: "00"
      description: Firmware type "00" = F/W Revision

- id: input_name_read
  label: Read Input Name
  kind: action
  params:
    - name: terminal
      type: string
      description: |
        Terminal code:
        "01"=VGA(RGB), "05"=AV, "09"=Tuner, "0C"=VGA(YPbPr),
        "11"=HDMI1, "12"=HDMI2, "82"=HDMI3, "87"=MP

- id: input_name_write
  label: Write Input Name
  kind: action
  params:
    - name: terminal
      type: string
      description: Terminal code (see input_name_read)
    - name: name
      type: string
      description: Input name string (max 14 chars)

- id: input_name_reset
  label: Reset Input Name
  kind: action
  params:
    - name: terminal
      type: string
      description: |
        Terminal code:
        "00"=ALL, "01"=VGA(RGB), "05"=AV, "09"=Tuner,
        "0C"=VGA(YPbPr), "11"=HDMI1, "12"=HDMI2, "82"=HDMI3, "87"=MP

- id: vcp_set
  label: VCP Set Parameter
  kind: action
  params:
    - name: page
      type: string
      description: VCP page (hex, 2 chars)
    - name: code
      type: string
      description: VCP code (hex, 2 chars)
    - name: value
      type: string
      description: Set value (hex, up to 4 chars)

- id: vcp_get
  label: VCP Get Parameter
  kind: action
  params:
    - name: page
      type: string
      description: VCP page (hex, 2 chars)
    - name: code
      type: string
      description: VCP code (hex, 2 chars)
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values:
    - "0001"  # ON
    - "0002"  # Stand-by
    - "0003"  # Reserved
    - "0004"  # OFF

- id: timing_report
  type: object
  properties:
    - name: status
      type: string
      description: |
        Bit 7=Sync out of range, Bit 6=Unstable,
        Bit 1=H sync polarity, Bit 0=V sync polarity
    - name: h_freq
      type: integer
      description: Horizontal frequency × 0.01kHz
    - name: v_freq
      type: integer
      description: Vertical frequency × 0.01Hz

- id: serial_number
  type: string
  description: ASCII serial number (max 30 chars)

- id: model_name
  type: string
  description: ASCII model name (max 36 chars)

- id: mac_address
  type: string
  description: MAC address hex (max 12 chars)

- id: firmware_version
  type: string
  description: Format Rx.xxxxx (e.g., R1.00000)

- id: input_name
  type: string
  description: Input name string (max 14 chars)

- id: temperature_sensor
  type: object
  properties:
    - name: sensor_count
      type: integer
    - name: sensor_id
      type: integer
    - name: temperature
      type: number
      description: Celsius (2's complement readout, see table)

- id: tv_channel
  type: object
  properties:
    - name: major_high
      type: string
    - name: major_low
      type: string
    - name: minor
      type: string

- id: vcp_reply
  type: object
  properties:
    - name: result
      type: enum
      values: ["00", "01"]
      description: "00=No Error, 01=Unsupported"
    - name: page
      type: string
    - name: code
      type: string
    - name: type
      type: string
    - name: max
      type: string
    - name: current
      type: string

- id: command_reply
  type: object
  properties:
    - name: result
      type: enum
      values: ["00", "01"]
      description: "00=No Error, 01=Error"
    - name: message
      type: string
      description: Echoed command code

- id: null_message
  type: string
  description: Indicates timeout, unsupported message, BCC error, or monitor busy

- id: remote_control_reply
  type: object
  properties:
    - name: data_code
      type: string
      description: Echoed remote control data code
```

## Variables
```yaml
# VCP Read/Write parameters (selected common ones)
# UNRESOLVED: full VCP table is extensive; see section 8 of source

- id: backlight
  type: integer
  range: [0, 100]
  description: VCP-00-10

- id: contrast
  type: integer
  range: [0, 100]
  description: VCP-00-12

- id: brightness
  type: integer
  range: [0, 100]
  description: VCP-00-10

- id: color_temperature
  type: enum
  values: ["0023", "003F", "005A"]
  description: VCP-00-0C - Warm/Normal/Cool

- id: input_select
  type: enum
  values:
    - "0001"  # VGA(RGB)
    - "0005"  # Video1(AV)
    - "0009"  # Tuner1(TV)
    - "000C"  # DVD/HD1(VGA(YPbPr))
    - "0011"  # HDMI1
    - "0012"  # HDMI2
    - "0082"  # HDMI3
    - "0087"  # MP(Media Player)
  description: VCP-00-60

- id: picture_mode
  type: enum
  values:
    - "0003"  # HighBright
    - "0004"  # Standard
    - "0008"  # Custom
    - "0017"  # Dynamic
    - "0018"  # Energy Savings
    - "001B"  # HDR Video
    - "001D"  # Conferencing
  description: VCP-02-1A

- id: aspect_ratio
  type: enum
  values:
    - "0001"  # NORMAL
    - "0002"  # FULL
    - "0004"  # ZOOM
    - "0007"  # 1:1
  description: VCP-02-70

- id: power_mode
  type: enum
  values:
    - "0001"  # ON
    - "0002"  # Stand-by
    - "0004"  # OFF
  description: VCP-11-75 power supply control
```

## Events
```yaml
# UNRESOLVED: monitor does not send unsolicited events;
# all communication is request/response
```

## Macros
```yaml
# Multi-step sequences documented in source:

- id: set_and_save_backlight
  label: Set Backlight and Save
  description: |
    1. GET current backlight (VCP-00-10)
    2. SET new backlight value
    3. SAVE current settings (CTL-0C)

- id: read_temperature
  label: Read Temperature Sensor
  description: |
    1. SELECT sensor (VCP-02-78, page 2, code 78h)
    2. GET temperature (VCP-02-79, page 2, code 79h)
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: |
      600ms packet interval required between consecutive commands.
      Monitor returns NULL message if command received during
      power-on/power-off/auto-setup/input-switch execution.
  - description: |
      15-minute TCP connection timeout - controller must
      reconnect after idle period.
# UNRESOLVED: no explicit safety warnings found in source
```

## Notes
- Command packet structure: SOH + Header + STX + Message + ETX + BCC + CR
- BCC (Block Check Code) = XOR of all bytes from D1 to D16
- ASCII encoding for all data; byte values encoded as ASCII hex character pairs
- Monitor ID range: 1–100; broadcast address = '*' (2Ah)
- DHCP default; IP address must be changed via OSD if needed
- Temperature readout is 2's complement; see lookup table in source (section 6.2.4)
- TV tuner commands are US-only model variants
- NULL message (CTL-BE) returned for: timeout (10s default), unsupported msg, BCC error, or monitor busy

<!-- UNRESOLVED: full VCP code table not included; section 8 lists OSD-to-command mappings only -->
<!-- UNRESOLVED: port number for RS-232 not applicable (serial-only) -->
<!-- UNRESOLVED: Ethernet cable type (crossover vs straight) not specified for TCP -->
<!-- UNRESOLVED: IP address configuration details beyond DHCP default -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
  - assets.sharpnecdisplays.us
  - business.sharpusa.com
  - manua.ls
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://business.sharpusa.com/product-downloads
  - https://sharp-displays.jp.sharp/dl/en/pj_soft/lineup.html
  - https://www.manua.ls/sharp
retrieved_at: 2026-05-13T20:42:25.950Z
last_checked_at: 2026-06-02T22:14:20.293Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:20.293Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TV tuner commands (US-only), specific model variants not differentiated"
- "full VCP table is extensive; see section 8 of source"
- "monitor does not send unsolicited events;"
- "no explicit safety warnings found in source"
- "full VCP code table not included; section 8 lists OSD-to-command mappings only"
- "port number for RS-232 not applicable (serial-only)"
- "Ethernet cable type (crossover vs straight) not specified for TCP"
- "IP address configuration details beyond DHCP default"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
