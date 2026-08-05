---
spec_id: admin/optoma-3653rk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 3653Rk Control Spec"
manufacturer: Optoma
model_family: 3653Rk
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 3653Rk
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/f44df515-4251-4840-9eef-d9ee0d757cb3.pdf
retrieved_at: 2026-07-14T01:52:56.098Z
last_checked_at: 2026-07-22T00:20:37.917Z
generated_at: 2026-07-22T00:20:37.917Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device electrical/voltage specs not in this document; firmware version range not stated."
  - "no multi-step sequences described in source"
  - "no explicit safety/interlock procedures stated in source."
  - "firmware version compatibility range not stated in source."
  - "device electrical/power specs not in this document."
  - "exact password encoding for OSD lock beyond 4-digit PIN not fully detailed."
  - "baud/serial details beyond the single stated configuration not given."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:20:37.917Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions matched literally in source with correct command opcodes, parameter ranges, and enum values; transport parameters verified; auto-send notifications represented in Feedbacks. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Optoma 3653Rk Control Spec

## Summary
Optoma 3653Rk is an Interactive Flat Panel (IFP) controllable via RS-232C serial and RJ45 LAN (TCP, port 4023). The spec covers power, audio, video, input source, picture, OSD, and status query commands using the ASCII `~xx{code} {value}` framing with device-ID addressing and CR termination.

<!-- UNRESOLVED: device electrical/voltage specs not in this document; firmware version range not stated. -->

## Transport
```yaml
# Source states both RS-232C and RJ45 (port 23 / 4023). LAN port = 4023.
# xx = 2-digit ASCII device ID (default "01"; source hex examples use "00").
# Framing: "~" + xx + 2/3-digit opcode + " " + value + CR (0x0D).
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
  port: 4023
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/restart commands present
  - levelable    # inferred: volume/treble/bass/brightness/contrast/color/backlight set commands
  - queryable    # inferred: extensive GET command set returns state
```

## Actions
```yaml
# Notes: xx = 2-digit ASCII device ID. All commands end with CR (0x0D).
# Hex example for device ID 00 shown in source; here command uses mnemonic template.
# "P" = success response, "F" = failed response.

# ---------- SET: Power ----------
- id: set_power
  label: Power Set
  kind: action
  command: "~xx00 {value}"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on, 3=restart"
  response_success: "P"
  response_failed: "F"

- id: set_power_mode_standby
  label: Power Mode (Standby) Set
  kind: action
  command: "~xx114 {value}"
  params:
    - name: value
      type: integer
      description: "0=Eco, 1=Active"
  response_success: "P"
  response_failed: "F"

# ---------- SET: Audio ----------
- id: set_treble
  label: Treble Set
  kind: action
  command: "~xx95 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"
  response_success: "P"
  response_failed: "F"

- id: set_bass
  label: Bass Set
  kind: action
  command: "~xx96 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"
  response_success: "P"
  response_failed: "F"

- id: set_balance
  label: Balance Set
  kind: action
  command: "~xx99 {value}"
  params:
    - name: value
      type: integer
      description: "0-100 (50 = center)"
  response_success: "P"
  response_failed: "F"

- id: set_volume
  label: Volume Set
  kind: action
  command: "~xx81 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"
  response_success: "P"
  response_failed: "F"

- id: set_mute
  label: Mute Set
  kind: action
  command: "~xx80 {value}"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"
  response_success: "P"
  response_failed: "F"

- id: set_sound_mode
  label: Sound Mode Set
  kind: action
  command: "~xx252 {value}"
  params:
    - name: value
      type: integer
      description: "1=Standard, 2=User, 3=Classroom, 4=Meeting, 5=Movie"
  response_success: "P"
  response_failed: "F"

# ---------- SET: Video / Picture ----------
- id: set_contrast
  label: Contrast Set
  kind: action
  command: "~xx22 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"
  response_success: "P"
  response_failed: "F"

- id: set_brightness
  label: Brightness Set
  kind: action
  command: "~xx21 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"
  response_success: "P"
  response_failed: "F"

- id: set_color
  label: Color Set
  kind: action
  command: "~xx45 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"
  response_success: "P"
  response_failed: "F"

- id: set_backlight
  label: Backlight Set
  kind: action
  command: "~xx251 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"
  response_success: "P"
  response_failed: "F"

- id: set_video_mute
  label: Video Mute Set
  kind: action
  command: "~xx13 {value}"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"
  response_success: "P"
  response_failed: "F"

- id: set_picture_mode
  label: Picture Mode Set
  kind: action
  command: "~xx20 {value}"
  params:
    - name: value
      type: integer
      description: "1=Presentation, 2=Bright, 3=Cinema, 5=User, 13=DICOM SIM., 21=HDR"
  response_success: "P"
  response_failed: "F"

- id: set_color_temp
  label: Color Temperature Set
  kind: action
  command: "~xx36 {value}"
  params:
    - name: value
      type: integer
      description: "1=Standard, 2=Cool, 4=Warm"
  response_success: "P"
  response_failed: "F"

- id: set_freeze
  label: Freeze Set
  kind: action
  command: "~xx04 {value}"
  params:
    - name: value
      type: integer
      description: "0=Unfreeze, 1=Freeze"
  response_success: "P"
  response_failed: "F"

- id: set_pixel_shift_interval
  label: Pixel Shift Interval Set (min)
  kind: action
  command: "~xx250 {value}"
  params:
    - name: value
      type: integer
      description: "0=off, 2, 3, 5, 30, 60"
  response_success: "P"
  response_failed: "F"

# ---------- SET: Input Source ----------
- id: set_input_source
  label: Input Source Set
  kind: action
  command: "~xx12 {value}"
  params:
    - name: value
      type: integer
      description: "1=HDMI1, 5=VGA, 15=HDMI2, 20=DisplayPort, 24=Android, 25=Slot in PC, 26=HDMI Front, 31=Type-C Front, 32=Type-C"
  response_success: "P"
  response_failed: "F"

# ---------- SET: Language ----------
- id: set_language
  label: Language Set
  kind: action
  command: "~xx70 {value}"
  params:
    - name: value
      type: integer
      description: "1=English, 2=German, 3=Français, 4=Italian, 5=Español, 6=Português, 7=Polish, 8=Dutch, 9=Swedish, 10=Norge, 11=Finnish, 13=Traditional Chinese, 14=Simplified Chinese, 17=Russian, 18=Hungarian, 19=Czech, 20=Arabic, 22=Turkish, 24=Danish, 27=Romanian"
  response_success: "P"
  response_failed: "F"

# ---------- SET: Remote Control Emulation ----------
- id: remote_control_command
  label: Remote Control Command
  kind: action
  command: "~xx140 {value}"
  params:
    - name: value
      type: integer
      description: "10=UP, 11=LEFT, 12=OK, 13=RIGHT, 14=DOWN, 17=Vol+, 18=Vol-, 20=Menu, 47=Input source, 74=Exit"
  response_success: "P"
  response_failed: "F"

# ---------- SET: OSD / System ----------
- id: display_osd_message
  label: Display Message on OSD
  kind: action
  command: "~xx210 {message}"
  params:
    - name: message
      type: string
      description: "ASCII message text"
  response_success: "P"
  response_failed: "F"

- id: reset_to_default
  label: Reset To Default
  kind: action
  command: "~xx112 1"
  params: []
  response_success: "P"
  response_failed: "F"

- id: set_osd_lock
  label: OSD Lock Set
  kind: action
  command: "~xx239 {mode} {password}"
  params:
    - name: mode
      type: integer
      description: "1=On, 2=Off"
    - name: password
      type: string
      description: "4-digit PIN, e.g. 0000-9999"
  response_success: "P"
  response_failed: "F"

# ---------- GET: Queries ----------
- id: query_power
  label: Power Status Query
  kind: query
  command: "~xx124 1"
  params: []
  response: "OK0=off, OK1=on"

- id: query_contrast
  label: Contrast Query
  kind: query
  command: "~xx126 1"
  params: []
  response: "OK0-100"

- id: query_brightness
  label: Brightness Query
  kind: query
  command: "~xx125 1"
  params: []
  response: "OK0-100"

- id: query_volume
  label: Volume Query
  kind: query
  command: "~xx120 1"
  params: []
  response: "OK0-100"

- id: query_video_mute
  label: Video Mute Query
  kind: query
  command: "~xx363 1"
  params: []
  response: "OK0=off, OK1=on"

- id: query_mute
  label: Mute Query
  kind: query
  command: "~xx356 1"
  params: []
  response: "OK0=off, OK1=on"

- id: query_sound_mode
  label: Sound Mode Query
  kind: query
  command: "~xx139 1"
  params: []
  response: "OK1=Standard, OK2=User, OK3=Classroom, OK4=Meeting, OK5=Movie"

- id: query_input_source
  label: Input Source Query
  kind: query
  command: "~xx121 1"
  params: []
  response: "OK7=HDMI1, OK8=HDMI2, OK22=HDMI Front, OK28=Type-C Front, OK2=VGA, OK20=Android, OK21=Slot in PC, OK29=Type-C, OK15=DisplayPort"

- id: query_aspect_ratio
  label: Aspect Ratio Query
  kind: query
  command: "~xx127 1"
  params: []
  response: "OK1=4:3, OK2=16:9, OK14=PTP"

- id: query_picture_mode
  label: Picture Mode Query
  kind: query
  command: "~xx123 1"
  params: []
  response: "OK1=Presentation, OK2=Bright, OK3=Cinema, OK5=User, OK10=DICOM SIM., OK21=HDR"

- id: query_color_temp
  label: Color Temperature Query
  kind: query
  command: "~xx128 1"
  params: []
  response: "OK1=Cool, OK0=Standard, OK3=Warm"

- id: query_wlan
  label: WLAN Status / IP Query
  kind: query
  command: "~xx451 {value}"
  params:
    - name: value
      type: integer
      description: "1=status (OK0=Disconnected, OK1=Connected), 2=IP address"
  response: "OK0/OK1 status, or IP string"

- id: query_mac_address
  label: MAC Address Query
  kind: query
  command: "~xx555 {value}"
  params:
    - name: value
      type: integer
      description: "1=LAN MAC, 2=WLAN MAC"
  response: "MAC address string nn:nn:nn:nn:nn:nn"

- id: query_lan
  label: LAN Status / IP Query
  kind: query
  command: "~xx87 {value}"
  params:
    - name: value
      type: integer
      description: "1=status (OK0=Disconnected, OK1=Connected), 3=IP address"
  response: "OK0/OK1 status, or IP string"

- id: query_fw_version
  label: Firmware Version Query
  kind: query
  command: "~xx122 1"
  params: []
  response: "version string e.g. 20190926164814"

- id: query_usage_hour
  label: Usage Hour Query
  kind: query
  command: "~xx108 1"
  params: []
  response: "OKnnnnn hours"

- id: query_device_type
  label: Device Type Query
  kind: query
  command: "~xx149 1"
  params: []
  response: "OK2 = IFP"

- id: query_information
  label: Information String Query
  kind: query
  command: "~xx150 {value}"
  params:
    - name: value
      type: integer
      description: "1=info string, 2=native resolution, 3=input source, 4=source resolution, 16=power mode standby, 17=DHCP, 18=system temp, 19=source refresh rate"
  response: "OK + value per param"

- id: query_regulatory_model
  label: Regulatory Model Name Query
  kind: query
  command: "~xx151 3"
  params: []
  response: "OKnnn e.g. SLUGRK"

- id: query_osd_lock
  label: OSD Lock Query
  kind: query
  command: "~xx229 1"
  params: []
  response: "OK0=Off, OK1=On"

- id: query_serial_number
  label: Serial Number Query
  kind: query
  command: "~xx353 1"
  params: []
  response: "serial number string"
```

## Feedbacks
```yaml
# System auto-send (unsolicited status notifications from device)
- id: standby_mode_notify
  type: string
  values: ["INFO0"]

- id: warming_up_notify
  type: string
  values: ["INFO1"]

- id: cooling_down_notify
  type: string
  values: ["INFO2"]

- id: over_temperature_notify
  type: string
  values: ["INFO7"]
```

## Variables
```yaml
# Settable numeric parameters also exposed as variables:
- id: volume
  type: integer
  range: [0, 100]
- id: treble
  type: integer
  range: [0, 100]
- id: bass
  type: integer
  range: [0, 100]
- id: balance
  type: integer
  range: [0, 100]
- id: contrast
  type: integer
  range: [0, 100]
- id: brightness
  type: integer
  range: [0, 100]
- id: color
  type: integer
  range: [0, 100]
- id: backlight
  type: integer
  range: [0, 100]
```

## Events
```yaml
# Unsolicited auto-send events from device (see Feedbacks):
- id: system_info
  trigger: auto-sent by device on state change
  payload: "INFO0 (Standby), INFO1 (Warming up), INFO2 (Cooling down), INFO7 (Over temperature)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source lists over-temperature auto-notify (INFO7) but no explicit interlock
# procedure or power-on sequencing requirement.
# UNRESOLVED: no explicit safety/interlock procedures stated in source.
```

## Notes
- Device-ID addressing: commands use `xx` = 2-digit ASCII device ID. Source example default = 01; hex examples in the table use device ID 00.
- Framing: lead code `~` (0x7E) + device ID + opcode + space + variable + CR (0x0D).
- LED indicators (from source): Solid Red = Standby; Solid White = Power on; Flash White continuously = Backlight off.
- GET input-source codes differ from SET codes (e.g. SET HDMI2=15, GET HDMI2=8). Both documented above.
- Source labels itself "IFP" (Interactive Flat Panel); device type query returns OK2.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: device electrical/power specs not in this document. -->
<!-- UNRESOLVED: exact password encoding for OSD lock beyond 4-digit PIN not fully detailed. -->
<!-- UNRESOLVED: baud/serial details beyond the single stated configuration not given. -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/f44df515-4251-4840-9eef-d9ee0d757cb3.pdf
retrieved_at: 2026-07-14T01:52:56.098Z
last_checked_at: 2026-07-22T00:20:37.917Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:20:37.917Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions matched literally in source with correct command opcodes, parameter ranges, and enum values; transport parameters verified; auto-send notifications represented in Feedbacks. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device electrical/voltage specs not in this document; firmware version range not stated."
- "no multi-step sequences described in source"
- "no explicit safety/interlock procedures stated in source."
- "firmware version compatibility range not stated in source."
- "device electrical/power specs not in this document."
- "exact password encoding for OSD lock beyond 4-digit PIN not fully detailed."
- "baud/serial details beyond the single stated configuration not given."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
