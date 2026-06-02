---
spec_id: admin/sharp-lcle757-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCLE757 Series Control Spec"
manufacturer: Sharp
model_family: "LCLE757 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCLE757 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:29:37.952Z
last_checked_at: 2026-05-31T21:11:55.716Z
generated_at: 2026-05-31T21:11:55.716Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN IP address configuration not detailed in source; default DHCP=on stated"
  - "flow control not stated in source"
  - "Variables list is a summary; full VCP code table exceeds scope - see source section 8"
  - "No unsolicited event descriptions found in source."
  - "No explicit multi-step macros described in source."
  - "no safety warnings or interlock procedures stated in source"
  - "voltage/current/power specifications not in source"
  - "firmware compatibility range not stated"
  - "error recovery sequences not detailed"
  - "port number for TCP control (port 7142 stated, but DHCP default means IP must be read from OSD or DHCP server)"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:11:55.716Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions (13 CTL commands plus generic VCP-get and VCP-set) have verbatim command-code matches in the source; transport values confirmed; VCP table entries are parameters to the generic set/get pair, not separate wire commands. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCLE757 Series Control Spec

## Summary
Sharp LCLE757 Series commercial LCD display controlled via RS-232C (9600/8/N/1) or TCP/IP (port 7142). Protocol uses VCP-style get/set commands and CTL-style control commands with a 4-part packet structure: Header, Message, BCC check code, CR delimiter. Packet interval must exceed 600msec.

<!-- UNRESOLVED: LAN IP address configuration not detailed in source; default DHCP=on stated -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142  # stated for LAN control
auth:
  type: none  # inferred: no auth procedure in source
timing:
  packet_interval_ms: 600
```

## Traits
```yaml
- powerable       # inferred: power on/off commands documented (CTL-C203-D6)
- queryable       # inferred: get param commands, power status read, timing report
- levelable       # inferred: backlight, contrast, brightness VCP commands present
- routable        # inferred: input select VCP commands present
```

## Actions
```yaml
- id: power_control
  label: Power Control
  kind: action
  params:
    - name: mode
      type: string
      description: Power mode - "0001"=ON, "0002"=Do not set, "0003"=Do not set, "0004"=OFF
  command_code: C203D6
  direction: both

- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []
  command_code: "0C"

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []
  command_code: "07"

- id: serial_no_read
  label: Serial Number Read
  kind: action
  params: []
  command_code: C216

- id: model_name_read
  label: Model Name Read
  kind: action
  params: []
  command_code: C217

- id: mac_address_read
  label: MAC Address Read
  kind: action
  params: []
  command_code: C220

- id: direct_tv_channel_read
  label: Direct TV Channel Read
  kind: action
  params: []
  command_code: C22C

- id: direct_tv_channel_write
  label: Direct TV Channel Write
  kind: action
  params:
    - name: major_high
      type: string
      description: Major channel high bytes (4 ASCII chars)
    - name: major_low
      type: string
      description: Major channel low bytes (4 ASCII chars)
    - name: minor
      type: string
      description: Minor channel bytes (4 ASCII chars)
  command_code: C22D

- id: remote_control_data_send
  label: Remote Control Data Send
  kind: action
  params:
    - name: data_code
      type: string
      description: RC data code upper byte - "1D"=PICTURE, "29"=ASPECT, "43"=SOUND, "08"-"10"=1-9, "44"=DASH, "12"=0, "19"=INFO, "20"=MENU, "1F"=EXIT, "15"=UP, "14"=DOWN, "21"=LEFT, "22"=RIGHT, "23"=OK, "17"=VOL+, "16"=VOL-, "33"=CH+, "32"=CH-, "1B"=MUTE, "27"=FREEZE, "2C"=CC, "1A"=MTS
    - name: repeat
      type: string
      description: Repeat times (HL format)
  command_code: C210

- id: firmware_version_read
  label: Firmware Version Read
  kind: action
  params:
    - name: fw_type
      type: string
      description: "00"=F/W Revision
  command_code: CA02

- id: input_name_read
  label: Input Name Read
  kind: action
  params:
    - name: terminal
      type: string
      description: "01"=VGA(RGB), "05"=AV, "09"=Tuner, "0C"=VGA(YPbPr), "11"=HDMI1, "12"=HDMI2, "82"=HDMI3, "87"=MP
  command_code: CA04-03

- id: input_name_write
  label: Input Name Write
  kind: action
  params:
    - name: terminal
      type: string
    - name: name
      type: string
      description: Max 14 chars
  command_code: CA04-04

- id: input_name_reset
  label: Input Name Reset
  kind: action
  params:
    - name: terminal
      type: string
      description: "00"=ALL Terminal, "01"=VGA(RGB), "05"=AV, "09"=Tuner, "0C"=VGA(YPbPr), "11"=HDMI1, "12"=HDMI2, "82"=HDMI3, "87"=MP
  command_code: CA04-05

- id: vcP_set
  label: VCP Set Parameter
  kind: action
  params:
    - name: page
      type: string
      description: OP code page (2 ASCII hex digits)
    - name: code
      type: string
      description: OP code (2 ASCII hex digits)
    - name: value
      type: string
      description: 4 ASCII hex digits (16-bit big-endian)
  note: "VCP format: STX + page(2) + code(2) + value(4) + ETX"

- id: vcP_get
  label: VCP Get Parameter
  kind: action
  params:
    - name: page
      type: string
      description: OP code page (2 ASCII hex digits)
    - name: code
      type: string
      description: OP code (2 ASCII hex digits)
  note: "VCP format: STX + page(2) + code(2) + ETX"
```

## Feedbacks
```yaml
- id: power_status_reply
  type: object
  fields:
    - name: result_code
      type: string
      description: "00"=No Error, "01"=Unsupported
    - name: power_mode
      type: string
      description: "0001"=ON, "0002"=Stand-by, "0003"=Reserved, "0004"=OFF
    - name: max
      type: integer
      description: Max value (0004 = 4 power modes)
    - name: current
      type: integer
      description: Current power mode value

- id: get_param_reply
  type: object
  fields:
    - name: result_code
      type: string
    - name: op_page
      type: string
    - name: op_code
      type: string
    - name: type
      type: string
      description: "00"=Set parameter, "01"=Momentary
    - name: max_value
      type: integer
    - name: current_value
      type: integer

- id: set_param_reply
  type: object
  fields:
    - name: result_code
      type: string
    - name: op_page
      type: string
    - name: op_code
      type: string
    - name: type
      type: string
    - name: max_value
      type: integer
    - name: requested_value
      type: integer

- id: timing_report_reply
  type: object
  fields:
    - name: command
      type: string
      description: "4E" for timing report
    - name: ss
      type: object
      description: Timing status - bit7=sync out of range, bit6=unstable, bit1=h-polarity, bit0=v-polarity
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units

- id: serial_no_reply
  type: string
  description: Serial number string (up to 30 ASCII chars)

- id: model_name_reply
  type: string
  description: Model name string (up to 36 ASCII chars)

- id: mac_address_reply
  type: string
  description: MAC address hex string (up to 12 ASCII chars)

- id: firmware_version_reply
  type: object
  fields:
    - name: result_code
      type: string
    - name: fw_type
      type: string
    - name: version_string
      type: string
      description: Format R.MM.MMM.BB e.g. "R1.002.003.AB"

- id: input_name_reply
  type: string
  description: Input name string (max 14 chars)

- id: null_message
  type: string
  description: Returned on timeout, unsupported message, BCC error, or monitor busy
  note: "Monitor busy during: Power ON/OFF, Auto Setup, Input, PIP Input, Factory reset"
```

## Variables
```yaml
# VCP Read/Write parameters documented in OSD table (section 8):
# Format: VCP-{page}-{code} for get/set
# Common VCP codes:
# VCP-00-10: Backlight (0-100)
# VCP-00-12: Contrast (0-100)
# VCP-00-0C: Color Temperature (Warm/Normal/Cool)
# VCP-00-14: Color Temperature Native/Custom
# VCP-02-1A: Picture Mode (HighBright/Standard/Custom/Dynamic/EnergySavings/HDR Video/Conferencing)
# VCP-02-70: Aspect Ratio (NORMAL/FULL/ZOOM/1:1)
# VCP-00-60: Input Select (VGA/Video1/Tuner/DVD/HDMI1/HDMI2/HDMI3/MP)
# VCP-11-4E: Dimming Setting (OFF/Dynamic Backlight/Local Dimming)
# VCP-10-3E: Control Interface (RS-232C/LAN)
# VCP-00-FB: Key Lock Settings
# VCP-02-3F: IR Lock Settings
# VCP-11-75: Power supply (ON/OFF)
# VCP-02-BE: LED Indicator (ON/OFF)
# Full table in section 8 of source
UNRESOLVED: Variables list is a summary; full VCP code table exceeds scope - see source section 8
```

## Events
```yaml
# UNRESOLVED: No unsolicited event descriptions found in source.
# Monitor may send NULL message (section 5.5.3) during long operations.
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step macros described in source.
# Typical backlight change procedure (6.1) illustrates Get→Set→Save pattern.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Protocol is NEC-derived (document states "control of the NEC LCD monitor") — same command structure
- Controller must wait >600msec between packets
- LAN connection auto-disconnects after 15min idle; must reconnect after
- BCC (Block Check Code) calculated as XOR of bytes D1-D16
- Delimiter is CR (0Dh) for all messages
- Message types: A=Command, B=Command reply, C=Get param, D=Get param reply, E=Set param, F=Set param reply
- VCP and CTL command sets coexist; CTL overrides for special operations (power, serial no., firmware, input names)
- Temperature sensor readout uses 2's complement (section 6.2.4)
- Default DHCP=on for LAN; IP config not detailed in this document
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: error recovery sequences not detailed -->
<!-- UNRESOLVED: port number for TCP control (port 7142 stated, but DHCP default means IP must be read from OSD or DHCP server) -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:29:37.952Z
last_checked_at: 2026-05-31T21:11:55.716Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:11:55.716Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions (13 CTL commands plus generic VCP-get and VCP-set) have verbatim command-code matches in the source; transport values confirmed; VCP table entries are parameters to the generic set/get pair, not separate wire commands. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN IP address configuration not detailed in source; default DHCP=on stated"
- "flow control not stated in source"
- "Variables list is a summary; full VCP code table exceeds scope - see source section 8"
- "No unsolicited event descriptions found in source."
- "No explicit multi-step macros described in source."
- "no safety warnings or interlock procedures stated in source"
- "voltage/current/power specifications not in source"
- "firmware compatibility range not stated"
- "error recovery sequences not detailed"
- "port number for TCP control (port 7142 stated, but DHCP default means IP must be read from OSD or DHCP server)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
