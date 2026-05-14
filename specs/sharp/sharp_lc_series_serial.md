---
spec_id: admin/sharp-lc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LC Series Control Spec"
manufacturer: Sharp
model_family: "LC Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LC Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_B501_B401_Operation_Manual.pdf
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-04-30T09:49:36.743Z
generated_at: 2026-04-30T09:49:36.743Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:49:36.743Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched to source CTL/VCP commands; all transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Sharp LC Series Control Spec

## Summary
Sharp LC Series LCD monitor control protocol via RS-232C and TCP/IP. Supports VCP (Virtual Control Panel) get/set operations and CTL (Control) commands for power, timing, input selection, and configuration. Both serial (9600bps 8N1) and LAN (TCP port 7142) interfaces defined.

<!-- UNRESOLVED: specific LC Series model numbers not stated in source -->

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
  port: 7142  # TCP port for LAN control (fixed)
auth:
  type: none  # inferred: no auth procedure in source
timing:
  packet_interval_ms: 600  # minimum between commands
```

## Traits
```yaml
- powerable       # CTL-01D6 power status read, CTL-C203-D6 power control
- queryable       # VCP get parameter commands, CTL-07 timing report
- routable        # input select commands (VCP-00-60, CTL-CA04)
- levelable       # backlight, contrast, brightness, volume via VCP
```

## Actions
```yaml
# Power Control
- id: power_control
  label: Power Control
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # ON
        - "0004"  # OFF (same as IR power off)
      description: Power mode code

- id: power_status_read
  label: Power Status Read
  kind: action
  params: []

# System Commands
- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []
  description: Stores adjusted values to non-volatile memory

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []
  description: Returns displayed image timing (H/V frequency, sync status)

# Input/Output
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: enum
      values:
        - "0000"  # No mean
        - "0001"  # VGA(RGB)
        - "0005"  # Video1(AV)
        - "0009"  # Tuner1(TV)
        - "000C"  # DVD/HD1 (VGA(YPbPr))
        - "0011"  # HDMI1
        - "0012"  # HDMI2
        - "0082"  # HDMI3
        - "0087"  # MP(Media Player)

# Remote Control Simulation (RS-232C only)
- id: remote_control_code
  label: Remote Control Data Code
  kind: action
  params:
    - name: code
      type: string
      description: 4-char hex remote control code (e.g. "1D"=PICTURE, "08"=1)
    - name: repeat
      type: integer
      description: Repeat count

# Device Information
- id: read_serial_number
  label: Read Serial Number
  kind: action
  params: []

- id: read_model_name
  label: Read Model Name
  kind: action
  params: []

- id: read_mac_address
  label: Read MAC Address
  kind: action
  params: []

- id: read_firmware_version
  label: Read Firmware Version
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "00"  # F/W Revision

# Input Name Management
- id: read_input_name
  label: Read Input Name
  kind: action
  params:
    - name: terminal
      type: enum
      values:
        - "00"  # No mean
        - "01"  # VGA(RGB)
        - "05"  # AV
        - "09"  # Tuner
        - "0C"  # VGA(YPbPr)
        - "11"  # HDMI1
        - "12"  # HDMI2
        - "82"  # HDMI3
        - "87"  # MP(Media player)

- id: write_input_name
  label: Write Input Name
  kind: action
  params:
    - name: terminal
      type: enum
      values: [see read_input_name]
    - name: name
      type: string
      description: Max 14 characters

- id: reset_input_name
  label: Reset Input Name
  kind: action
  params:
    - name: terminal
      type: enum
      values:
        - "00"  # ALL Terminal
        - "01"  # VGA(RGB)
        - "05"  # AV
        - "09"  # Tuner
        - "0C"  # VGA(YPbPr)
        - "11"  # HDMI1
        - "12"  # HDMI2
        - "82"  # HDMI3
        - "87"  # MP(Media player)

# TV Channel (US tuner models only)
- id: read_tv_channel
  label: Read TV Channel
  kind: action
  params: []

- id: write_tv_channel
  label: Write TV Channel
  kind: action
  params:
    - name: major_high
      type: integer
    - name: major_low
      type: integer
    - name: minor
      type: integer

# VCP Get Parameter
- id: get_vcp_parameter
  label: Get VCP Parameter
  kind: action
  params:
    - name: page
      type: string
      description: 2-char hex VCP page (e.g. "00", "02", "10")
    - name: code
      type: string
      description: 2-char hex VCP code

# VCP Set Parameter
- id: set_vcp_parameter
  label: Set VCP Parameter
  kind: action
  params:
    - name: page
      type: string
      description: 2-char hex VCP page
    - name: code
      type: string
      description: 2-char hex VCP code
    - name: value
      type: string
      description: 4-char hex value
```

## Feedbacks
```yaml
# Power Status Response
- id: power_status_reply
  type: object
  fields:
    - name: result
      type: enum
      values: ["00", "01"]
    - name: mode
      type: enum
      values:
        - "0001"  # ON
        - "0002"  # Stand-by (power save)
        - "0003"  # Reserved
        - "0004"  # OFF

# Timing Report Reply
- id: timing_reply
  type: object
  fields:
    - name: status
      type: object
      description: Bitfield - sync out-of-range, unstable, polarities
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units

# Serial/Model/MAC Reply
- id: serial_reply
  type: string
  description: ASCII serial number (max 30 chars)

- id: model_name_reply
  type: string
  description: ASCII model name (max 36 chars)

- id: mac_address_reply
  type: string
  description: Hex MAC address (max 12 hex chars)

# Firmware Version Reply
- id: firmware_version_reply
  type: object
  fields:
    - name: result
      type: enum
      values: ["00", "01"]
    - name: version
      type: string
      description: Format Rx.x.xxxx (ASCII string)

# VCP Get Reply
- id: vcp_get_reply
  type: object
  fields:
    - name: result
      type: enum
      values: ["00", "01"]
    - name: page
      type: string
    - name: code
      type: string
    - name: type
      type: enum
      values: ["00", "01"]
    - name: max
      type: integer
    - name: current
      type: integer

# VCP Set Reply
- id: vcp_set_reply
  type: object
  fields:
    - name: result
      type: enum
      values: ["00", "01"]
    - name: page
      type: string
    - name: code
      type: string
    - name: type
      type: enum
      values: ["00", "01"]
    - name: max
      type: integer
    - name: requested
      type: integer

# NULL Reply (error condition)
- id: null_reply
  type: enum
  values:
    - timeout_error
    - unsupported_message
    - bcc_error
    - not_ready
    - operation_in_progress
```

## Variables
```yaml
# Commonly used VCP codes documented in the spec
- id: backlight
  label: Backlight
  type: range
  min: 0
  max: 100
  vcp: "00-10"

- id: contrast
  label: Contrast
  type: range
  min: 0
  max: 100
  vcp: "00-12"

- id: brightness
  label: Brightness
  type: range
  min: 0
  max: 100
  vcp: "00-10"

- id: color_temperature
  label: Color Temperature
  type: enum
  values:
    - "0023"  # Warm
    - "003F"  # Normal
    - "005A"  # Cool
    - "0002"  # Native
  vcp: "00-0C"

- id: volume
  label: Volume
  type: range
  min: 0
  max: 100
  vcp: "00-93"  # balance - UNRESOLVED: actual volume VCP code not specified

- id: power_mode
  label: Power Mode
  type: enum
  values:
    - "0001"  # ON
    - "0002"  # Stand-by
    - "0003"  # Reserved
    - "0004"  # OFF
  vcp: "01-D6"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications defined in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on/off operations require 600ms minimum packet interval between commands"
  - description: "Auto Setup, Input Change, PIP Input, Factory Reset return NULL message during execution"
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Protocol supports both VCP (Virtual Control Panel) and CTL (Control) command sets
- LAN port is fixed at 7142 (TCP); no login/authentication required
- Monitor disconnects TCP connection after 15 minutes of inactivity
- VCP codes vary by model; refer to OSD menu table (section 8) for supported features
- TV tuner commands (channel, audio language) are US model only
- Some VCP codes listed in spec marked N/A or not fully documented

<!-- UNRESOLVED: complete VCP code table not included - only subset shown in section 8 -->
<!-- UNRESOLVED: specific model numbers within LC Series not specified -->
<!-- UNRESOLVED: DHCP default state only; static IP configuration commands not documented -->

## Provenance

```yaml
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_B501_B401_Operation_Manual.pdf
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-04-30T09:49:36.743Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:49:36.743Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched to source CTL/VCP commands; all transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
