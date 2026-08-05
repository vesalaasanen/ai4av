---
spec_id: admin/optoma-5862rk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 5862Rk Control Spec"
manufacturer: Optoma
model_family: 5862Rk
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 5862Rk
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/b51d1d54-5e45-4520-8e45-91f4c5b92f96.pdf
  - https://www.optoma.com
retrieved_at: 2026-07-13T19:39:55.716Z
last_checked_at: 2026-07-22T00:28:10.834Z
generated_at: 2026-07-22T00:28:10.834Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact marketing model name not printed in the protocol source; \"5862Rk\" taken from the device name supplied with this artefact. Regulatory model name example in source is \"SLUGRK\"."
  - "no multi-step sequences described in source"
  - "source notes an over-temperature auto event (INFO7) but no explicit"
  - "marketing model name not stated in the protocol document; \"5862Rk\" taken from supplied device name."
  - "firmware version compatibility not stated in source."
  - "protocol version not stated in source."
  - "voltage / current / power specifications not in this source."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:28:10.834Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions matched literally to source protocol; complete bidirectional coverage with correct transport parameters. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Optoma 5862Rk Control Spec

## Summary
The Optoma 5862Rk is an Interactive Flat Panel (IFP) that supports RS-232 serial control and RJ45 LAN (TCP) control on port 23. This spec covers the documented SET and GET command set: power, display, audio, input source, picture, OSD lock, and status query commands.

<!-- UNRESOLVED: exact marketing model name not printed in the protocol source; "5862Rk" taken from the device name supplied with this artefact. Regulatory model name example in source is "SLUGRK". -->

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
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

Command framing (documented in source): lead code `~` (0x7E), 2-char device ID (`xx`; `00` = device 1), command ID, space (0x20), variable value, carriage return CR (0x0D). Hex payloads in source use device ID `00` (e.g. power on = `7E 30 30 30 30 20 31 0D`). SET commands return `P` (success) or `F` (failed).

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/restart commands present
  - queryable    # inferred: many GET query commands return state
  - levelable    # inferred: volume/brightness/contrast/treble/bass ranges 0-100
```

## Actions
```yaml
# Command notation follows the source CMD column: ~xx{command_id} {value}
# xx = 2-char device ID (default "00"); all frames terminated by CR (0x0D).
# SET responses: P = success, F = failed.

# ---- SET commands ----

- id: power_set
  label: Power Set
  kind: action
  command: "~xx00 {n}"
  params:
    - name: n
      type: integer
      enum: [0, 1, 3]
      values: {0: "Power off", 1: "Power on", 3: "Restart"}
      description: "Hex examples: off=7E 30 30 30 30 20 30 0D, on=7E 30 30 30 30 20 31 0D, restart=7E 30 30 30 30 20 33 0D"

- id: power_mode_standby_set
  label: Power Mode (Standby) Set
  kind: action
  command: "~xx114 {n}"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      values: {0: "Eco.", 1: "Active"}
      description: "Remote/LAN power-on only works when Active is selected"

- id: treble_set
  label: Treble Set
  kind: action
  command: "~xx95 {n}"
  params:
    - name: n
      type: integer
      range: [0, 100]

- id: bass_set
  label: Bass Set
  kind: action
  command: "~xx96 {n}"
  params:
    - name: n
      type: integer
      range: [0, 100]

- id: balance_set
  label: Balance Set
  kind: action
  command: "~xx99 {n}"
  params:
    - name: n
      type: integer
      range: [0, 100]

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "~xx22 {n}"
  params:
    - name: n
      type: integer
      range: [0, 100]

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "~xx21 {n}"
  params:
    - name: n
      type: integer
      range: [0, 100]

- id: sound_mode_set
  label: Sound Mode Set
  kind: action
  command: "~xx252 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5]
      values: {1: "Standard", 2: "User", 3: "Classroom", 4: "Meeting", 5: "Movie"}

- id: volume_set
  label: Volume Set
  kind: action
  command: "~xx81 {n}"
  params:
    - name: n
      type: integer
      range: [0, 100]

- id: video_mute_set
  label: Video Mute Set
  kind: action
  command: "~xx13 {n}"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      values: {0: "Off", 1: "On"}

- id: mute_set
  label: Mute Set
  kind: action
  command: "~xx80 {n}"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      values: {0: "Off", 1: "On"}

- id: input_source_set
  label: Input Source Set
  kind: action
  command: "~xx12 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 5, 15, 16, 24, 25, 27]
      values: {1: "HDMI1", 5: "VGA", 15: "HDMI2", 16: "HDMI3", 24: "Android", 25: "Slot in PC", 27: "USB Type C"}

- id: aspect_ratio_set
  label: Aspect Ratio Set
  kind: action
  command: "~xx60 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 2, 14]
      values: {1: "4:3", 2: "16:9", 14: "PTP"}

- id: language_set
  label: Language Set
  kind: action
  command: "~xx70 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 17, 18, 19, 20, 22, 24, 27]
      values: {1: "English", 2: "German", 3: "Français", 4: "Italian", 5: "Español", 6: "Português", 7: "Polish", 8: "Dutch", 9: "Swedish", 10: "Norge", 11: "Finnish", 13: "Traditional Chinese", 14: "Simplified Chinese", 17: "Russia", 18: "Hungarian", 19: "Czech", 20: "Arabic", 22: "Turkish", 24: "Danish", 27: "Romanian"}

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: "~xx20 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 5, 21]
      values: {1: "Presentation", 2: "Bright", 3: "Cinema", 5: "User", 21: "HDR"}

- id: color_set
  label: Color Set
  kind: action
  command: "~xx45 {n}"
  params:
    - name: n
      type: integer
      range: [0, 100]

- id: backlight_set
  label: Backlight Set
  kind: action
  command: "~xx251 {n}"
  params:
    - name: n
      type: integer
      range: [0, 100]

- id: color_temp_set
  label: Color Temperature Set
  kind: action
  command: "~xx36 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 2, 4]
      values: {1: "Standard", 2: "Cool", 4: "Warm"}

- id: freeze_set
  label: Freeze Set
  kind: action
  command: "~xx04 {n}"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      values: {0: "Unfreeze", 1: "Freeze"}

- id: pixel_shift_interval_set
  label: Pixel Shift Interval (min) Set
  kind: action
  command: "~xx250 {n}"
  params:
    - name: n
      type: integer
      enum: [0, 2, 3, 5, 30, 60]
      values: {0: "Off", 2: "2", 3: "3", 5: "5", 30: "30", 60: "60"}

- id: remote_control_command
  label: Remote Control Command
  kind: action
  command: "~xx140 {n}"
  params:
    - name: n
      type: integer
      enum: [10, 11, 12, 13, 14, 17, 18, 20, 47, 74]
      values: {10: "Remote UP", 11: "Remote LEFT", 12: "Remote OK", 13: "Remote RIGHT", 14: "Remote DOWN", 17: "Vol +", 18: "Vol -", 20: "Remote Menu Key", 47: "Remote Input source", 74: "Remote Exit"}

- id: display_message_osd
  label: Display Message On OSD
  kind: action
  command: "~xx210 {message}"
  params:
    - name: message
      type: string
      description: "Message text (nn…n); hex example 7E 30 30 32 31 30 20 nn…n 0D"

- id: reset_to_default
  label: Reset To Default
  kind: action
  command: "~xx112 1"
  params: []

- id: osd_lock_set
  label: OSD Lock Set
  kind: action
  command: "~xx239 {n} {password}"
  params:
    - name: n
      type: integer
      enum: [1, 2]
      values: {1: "OSD lock On with password", 2: "OSD lock Off with password"}
    - name: password
      type: string
      description: "Password (~nnnn); hex example 7E 30 30 32 33 39 20 {n} 20 {password} 0D"

# ---- GET commands (queries) ----

- id: power_query
  label: Power Status Query
  kind: query
  command: "~xx124 1"
  params: []
  # Hex: 7E 30 30 31 32 34 20 31 0D ; response Ok0=off, OK1=on

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "~xx126 1"
  params: []
  # Hex: 7E 30 30 31 32 36 20 31 0D ; response OK0-100

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "~xx125 1"
  params: []
  # Hex: 7E 30 30 31 32 35 20 31 0D ; response OK0-100

- id: volume_query
  label: Volume Query
  kind: query
  command: "~xx120 1"
  params: []
  # Hex: 7E 30 30 31 32 30 20 31 0D ; response OK0-100

- id: video_mute_query
  label: Video Mute Query
  kind: query
  command: "~xx363 1"
  params: []
  # Hex: 7E 30 30 33 36 33 20 31 0D ; response OK0=Off, OK1=On

- id: mute_query
  label: Mute Query
  kind: query
  command: "~xx356 1"
  params: []
  # Hex: 7E 30 30 33 35 36 20 31 0D ; response OK0=Off, OK1=On

- id: sound_mode_query
  label: Sound Mode Query
  kind: query
  command: "~xx139 1"
  params: []
  # Hex: 7E 30 30 31 33 39 20 31 0D ; response OK1-5

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "~xx121 1"
  params: []
  # Hex: 7E 30 30 31 32 31 20 31 0D ; response OK2=VGA,7=HDMI1,8=HDMI2,9=HDMI3,20=Android,21=Slot in PC,23=USB Type C

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "~xx127 1"
  params: []
  # Hex: 7E 30 30 31 32 37 20 31 0D ; response OK1=4:3, OK2=16:9, OK14=PTP

- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "~xx123 1"
  params: []
  # Hex: 7E 30 30 31 32 33 20 31 0D ; response OK1=Presentation,2=Bright,3=Cinema,5=User,10=DICOM SIM.,21=HDR

- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "~xx128 1"
  params: []
  # Hex: 7E 30 30 31 32 38 20 31 0D ; response OK0=Standard, OK1=Cool, OK3=Warm

- id: wlan_info_query
  label: WLAN Info Query
  kind: query
  command: "~xx451 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 2]
      values: {1: "WLAN status", 2: "WLAN IP address"}
  # n=1 hex 7E 30 30 34 35 31 20 31 0D -> OK0=Disconnected,OK1=Connected
  # n=2 hex 7E 30 30 34 35 31 20 32 0D -> Oknnn:nnn:nnn:nnn (IP)

- id: mac_address_query
  label: MAC Address Query
  kind: query
  command: "~xx555 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 2]
      values: {1: "LAN MAC address", 2: "WLAN MAC address"}
  # n=1 hex 7E 30 30 35 35 35 20 31 0D ; n=2 hex 7E 30 30 35 35 35 20 32 0D
  # response Oknn:nn:nn:nn:nn:nn

- id: lan_info_query
  label: LAN Info Query
  kind: query
  command: "~xx87 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 3]
      values: {1: "LAN status", 3: "LAN IP address"}
  # n=1 hex 7E 30 30 38 37 20 31 0D -> OK0=Disconnected,OK1=Connected
  # n=3 hex 7E 30 30 38 37 20 33 0D -> Oknnn:nnn:nnn:nnn (IP)

- id: fw_version_query
  label: Firmware Version Query
  kind: query
  command: "~xx122 1"
  params: []
  # Hex: 7E 30 30 31 32 32 20 31 0D ; response Oknnnnnnnnnnnnnn (ex. 20190926164814)

- id: usage_hour_query
  label: Usage Hour Query
  kind: query
  command: "~xx108 1"
  params: []
  # Hex: 7E 30 30 31 30 38 20 31 0D ; response Oknnnnn (usage hours)

- id: device_type_query
  label: Device Type Query
  kind: query
  command: "~xx149 1"
  params: []
  # Hex: 7E 30 30 31 34 39 20 31 0D ; response OK2 = Device type IFP

- id: information_string_query
  label: Information String Query
  kind: query
  command: "~xx150 {n}"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 16, 17, 18, 19]
      values: {1: "Information string (Power/Usage/Input/FW/Display Mode)", 2: "Device native resolution", 3: "Input source", 4: "Source resolution", 16: "Power mode (standby)", 17: "DHCP state", 18: "System temperature", 19: "Source refresh rate"}
  # n=1 hex 7E 30 30 31 35 30 20 31 0D ... ; see Notes for format of n=1

- id: regulatory_model_name_query
  label: Regulatory Model Name Query
  kind: query
  command: "~xx151 3"
  params: []
  # Hex: 7E 30 30 31 35 31 20 33 0D ; response Oknnn (ex. SLUGRK)

- id: osd_lock_query
  label: OSD Lock Query
  kind: query
  command: "~xx229 1"
  params: []
  # Hex: 7E 30 30 32 32 39 20 31 0D ; response OK0=Off, OK1=On
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source_query: power_query
  response_format: "Ok0=off, OK1=on"

- id: set_ack
  type: enum
  values: [P, F]
  description: "SET command acknowledgement: P=success, F=failed"

- id: contrast_level
  type: integer
  range: [0, 100]
  source_query: contrast_query

- id: brightness_level
  type: integer
  range: [0, 100]
  source_query: brightness_query

- id: volume_level
  type: integer
  range: [0, 100]
  source_query: volume_query

- id: video_mute_state
  type: enum
  values: [off, on]
  source_query: video_mute_query

- id: mute_state
  type: enum
  values: [off, on]
  source_query: mute_query

- id: sound_mode
  type: enum
  values: [Standard, User, Classroom, Meeting, Movie]
  source_query: sound_mode_query

- id: input_source
  type: enum
  values: [HDMI1, HDMI2, HDMI3, VGA, Android, "Slot in PC", "USB Type C"]
  source_query: input_source_query

- id: aspect_ratio
  type: enum
  values: ["4:3", "16:9", PTP]
  source_query: aspect_ratio_query

- id: picture_mode
  type: enum
  values: [Presentation, Bright, Cinema, User, "DICOM SIM.", HDR]
  source_query: picture_mode_query

- id: color_temp
  type: enum
  values: [Standard, Cool, Warm]
  source_query: color_temp_query

- id: osd_lock_state
  type: enum
  values: [off, on]
  source_query: osd_lock_query

- id: fw_version
  type: string
  source_query: fw_version_query

- id: usage_hours
  type: integer
  source_query: usage_hour_query

- id: wlan_status
  type: enum
  values: [Disconnected, Connected]
  source_query: wlan_info_query

- id: lan_status
  type: enum
  values: [Disconnected, Connected]
  source_query: lan_info_query
```

## Variables
```yaml
# All settable parameters are represented as Actions (parameterized SET commands).
# No additional variables required.
```

## Events
```yaml
# Unsolicited system auto-send notifications (no query required)
- id: standby_mode_event
  signal: "INFO0"
  description: "Standby Mode"

- id: warming_up_event
  signal: "INFO1"
  description: "Warming up"

- id: cooling_down_event
  signal: "INFO2"
  description: "Cooling down"

- id: over_temperature_event
  signal: "INFO7"
  description: "Over temperature"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Remote/LAN power-on (OMS) only works when Power Mode (Standby) is set to Active. Active Standby keeps the mainboard powered to listen for wake commands."
# UNRESOLVED: source notes an over-temperature auto event (INFO7) but no explicit
# interlock procedure or power-on sequencing requirement is documented beyond the
# standby-mode precondition above.
```

## Notes
- Device ID byte: commands use `xx` as a 2-digit ASCII device ID placeholder. The source's example legend cites device ID `01`; all hex code examples in the tables use `00`. Default device ID for single-device control is `00`.
- Frame structure: `~` (0x7E) + device ID (2 ASCII digits) + command ID (ASCII digits) + space (0x20) + variable + CR (0x0D).
- SET commands return a single character: `P` = success, `F` = failed.
- GET commands return `OK{value}` / `Ok{value}` on success or `F` on failure.
- Information string query (`~xx150 1`) returns `OKabbbbbccddddee` where: `a`=Power (0=Off,1=On), `bbbbb`=Running time (usage hours), `cc`=Input Source (02=VGA1, 08=HDMI2, 10=Component, 14=HDMI3, 15=DisplayPort, 18=Android, 19=Slot in PC, 21=USB Type C), `dddd`=Firmware Version, `ee`=Display Mode (01=Presentation, 02=Bright, 03=Cinema, 05=User, 10=DICOM SIM., 21=HDR).
- LED indicator reference: Solid Red = Standby, Solid White = Power on, Flash Red then Blue continuously = Backlight off.
- Picture Mode GET returns an extra value OK10 (DICOM SIM.) not present in the SET table.
- Color Temp GET returns OK3=Warm whereas SET uses n=4 for Warm.

<!-- UNRESOLVED: marketing model name not stated in the protocol document; "5862Rk" taken from supplied device name. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version not stated in source. -->
<!-- UNRESOLVED: voltage / current / power specifications not in this source. -->
````

Spec above. 24 SET actions + 20 GET queries, all opcodes covered, events + feedbacks populated from source. Gaps marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/b51d1d54-5e45-4520-8e45-91f4c5b92f96.pdf
  - https://www.optoma.com
retrieved_at: 2026-07-13T19:39:55.716Z
last_checked_at: 2026-07-22T00:28:10.834Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:28:10.834Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions matched literally to source protocol; complete bidirectional coverage with correct transport parameters. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact marketing model name not printed in the protocol source; \"5862Rk\" taken from the device name supplied with this artefact. Regulatory model name example in source is \"SLUGRK\"."
- "no multi-step sequences described in source"
- "source notes an over-temperature auto event (INFO7) but no explicit"
- "marketing model name not stated in the protocol document; \"5862Rk\" taken from supplied device name."
- "firmware version compatibility not stated in source."
- "protocol version not stated in source."
- "voltage / current / power specifications not in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
