---
spec_id: admin/sharp-electronics-pn-e759
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-E759 Control Spec"
manufacturer: Sharp
model_family: PN-E869
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - PN-E869
    - PN-E759
    - PN-E659
    - PN-E559
    - PN-E509
    - PN-E439
    - PN-E329
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-exx9_s-format_command_manual_english.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pne869-e759-e659-e559-e509-e439-e329_operation-manual.pdf
retrieved_at: 2026-08-03T12:08:53.676Z
last_checked_at: 2026-10-01T06:45:26.235Z
generated_at: 2026-10-01T06:45:26.235Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Voltage/current/power specs not in refined excerpt."
  - "token/credential format beyond username+password not described"
  - "source describes no unsolicited notifications. Responses are synchronous to commands."
  - "full interlock / power-on sequencing procedures for installation not in refined excerpt."
  - "firmware version compatibility not stated."
  - "full command set outside S-Format (e.g. any other \"Command Format\" modes) not in refined excerpt."
  - "response timeout upper bound beyond \">= 10 s\" not stated."
  - "voltage / current / power specifications not present in refined excerpt."
  - "auth credential format constraints (length, charset) for LAN login not described beyond default \"ADMIN\"."
verification:
  verdict: verified
  checked_at: 2026-10-01T06:45:26.235Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 action units map to documented S-Format commands; transport (9600 8N1, port 10008, login) is supported and every source command is represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-03
---

# Sharp Electronics PN-E759 Control Spec

## Summary
Sharp PN-E series LCD monitor (covers PN-E869/E759/E659/E559/E509/E439/E329) controlled via RS-232C or LAN (TCP). Uses S-Format commands: a 4-character command field plus 4-character parameter field, terminated by return code (0DH 0AH). Power, input, picture, system, tile-matrix, audio, and telemetry query commands are documented.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Voltage/current/power specs not in refined excerpt. -->

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
  port: 10008  # LAN data port stated for TCP control
auth:
  type: basic  # username + password required over LAN; default username/password is "ADMIN", must be changed
  # UNRESOLVED: token/credential format beyond username+password not described
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWR power on/off commands
  - routable     # inferred from INPS input-mode selection
  - queryable    # inferred from R-direction query commands (POWR?, VOLM?, DSTA, ERRT, PXCK, INF1, SRNO)
  - levelable    # inferred from level-set commands (VLMP, CRTR, CRTG, CRTB, VOLM, MINT)
```

## Actions
```yaml
# S-Format command: 4-char command + 4-char parameter, terminated by return code (0DH 0AH or 0DH).
# Parameter field MUST be 4 characters, padded with spaces. e.g. "VOLM 30", not "VOLM30". EXCEPTION: DATE takes a 10-character parameter AABBCCDDEE (see set_date_time).
# Commands marked "●" usable in standby; "○" usable in input-signal-wait or power-on; "-" power-on only.
# Commands POWR/INPS/BOMD/WIDE return "WAIT" while executing; do not send other commands until value returned.

- id: power_standby
  label: Power Standby
  kind: action
  command: "POWR0000"
  params: []
  notes: "Switches monitor to standby state. ● usable in standby."

- id: power_on
  label: Power On
  kind: action
  command: "POWR0001"
  params: []
  notes: "Returns from standby state. After power Off, wait >= 10s before next command."

- id: power_query
  label: Power State Query
  kind: query
  command: "POWR????"
  params: []
  notes: "Reply 0=Standby, 1=Normal mode, 2=Input signal waiting state."

- id: input_select_toggle
  label: Input Mode Toggle
  kind: action
  command: "INPS0000"
  params: []
  notes: "Toggle change for input mode. ○ usable in waiting/power-on."

- id: input_select_hdmi1
  label: Select Input HDMI1
  kind: action
  command: "INPS0010"
  params: []

- id: input_select_media_player
  label: Select Input Media Player
  kind: action
  command: "INPS0011"
  params: []

- id: input_select_hdmi2
  label: Select Input HDMI2
  kind: action
  command: "INPS0013"
  params: []

- id: input_select_usb_c
  label: Select Input USB-C
  kind: action
  command: "INPS0027"
  params: []

- id: picture_mode_standard
  label: Picture Mode Standard
  kind: action
  command: "BMOD0000"
  params: []

- id: picture_mode_high_bright
  label: Picture Mode High Bright
  kind: action
  command: "BMOD0004"
  params: []

- id: picture_mode_custom
  label: Picture Mode Custom
  kind: action
  command: "BMOD0008"
  params: []

- id: picture_mode_retail
  label: Picture Mode Retail
  kind: action
  command: "BMOD0022"
  params: []

- id: picture_mode_conferencing
  label: Picture Mode Conferencing
  kind: action
  command: "BMOD0023"
  params: []

- id: picture_mode_transportation
  label: Picture Mode Transportation
  kind: action
  command: "BMOD0025"
  params: []

- id: backlight_set
  label: Set Backlight
  kind: action
  command: "VLMP{level:04d}"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "Backlight level 0-100, 4-char zero-padded."
  notes: "Direction WR; readable via VLMP????"

- id: aspect_wide
  label: Aspect Wide
  kind: action
  command: "WIDE0001"
  params: []

- id: aspect_normal
  label: Aspect Normal
  kind: action
  command: "WIDE0002"
  params: []

- id: aspect_1to1
  label: Aspect 1:1
  kind: action
  command: "WIDE0003"
  params: []

- id: aspect_full
  label: Aspect Full
  kind: action
  command: "WIDE0011"
  params: []

- id: color_temp_thru
  label: Color Temperature THRU
  kind: action
  command: "CTMP0000"
  params: []

- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  command: "CTMP0008"
  params: []

- id: color_temp_normal
  label: Color Temperature Normal
  kind: action
  command: "CTMP0013"
  params: []

- id: color_temp_cool
  label: Color Temperature Cool
  kind: action
  command: "CTMP0022"
  params: []

- id: color_temp_custom
  label: Color Temperature Custom
  kind: action
  command: "CTMP0099"
  params: []

- id: r_gain_set
  label: Set R Gain
  kind: action
  command: "CRTR{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: "R gain value when COLOR TEMPERATURE = CUSTOM. Error if CTMP != CUSTOM."

- id: g_gain_set
  label: Set G Gain
  kind: action
  command: "CRTG{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: "G gain value when COLOR TEMPERATURE = CUSTOM."

- id: b_gain_set
  label: Set B Gain
  kind: action
  command: "CRTB{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: "B gain value when COLOR TEMPERATURE = CUSTOM."

- id: set_date_time
  label: Set Date and Time
  kind: action
  command: "DATE{AABBCCDDEE}"
  params:
    - name: AA
      type: integer
      description: "Year"
    - name: BB
      type: integer
      description: "Month"
    - name: CC
      type: integer
      description: "Day"
    - name: DD
      type: integer
      description: "Hour"
    - name: EE
      type: integer
      description: "Minute"
  notes: "Direction WR; parameter field is 10 characters AABBCCDDEE (exception to the 4-character parameter rule); AA=Year, BB=Month, CC=Day, DD=Hour, EE=Minute. Power-on only."

- id: thermal_sensor_orientation
  label: Thermal Sensor Setting
  kind: action
  command: "STDR{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=LANDSCAPE, 1=PORTRAIT"

- id: model_info_query
  label: Model Info Query
  kind: query
  command: "INF1????"
  params: []
  notes: "● Returns model name."

- id: serial_no_query
  label: Serial Number Query
  kind: query
  command: "SRNO????"
  params: []
  notes: "Returns serial number."

- id: key_lock
  label: Key Lock Setting
  kind: action
  command: "ALCM{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=UNLOCKED, 1=LOCK ALL"

- id: ir_lock
  label: IR Lock Setting
  kind: action
  command: "ALCR{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 3]
      description: "0=UNLOCKED, 1=LOCK ALL, 2=LOCK EXCEPT VOLUME, 3=LOCK EXCEPT POWER"

- id: motion_set
  label: Motion Setting
  kind: action
  command: "SCSV{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=OFF, 1=ON"

- id: motion_interval_set
  label: Motion Interval
  kind: action
  command: "MINT{value:04d}"
  params:
    - name: value
      type: integer
      range: [10, 600]
      description: "Valid values are multiples of 10 (10..600)."

- id: refresh_mode_set
  label: Refresh Mode
  kind: action
  command: "PREF{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 2]
      description: "0=OFF, 1=MODE1, 2=MODE2"

- id: tile_matrix_enable
  label: Tile Matrix Enable
  kind: action
  command: "ENLG{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=OFF, 1=ON"

- id: tile_matrix_mode_set
  label: Tile Matrix Mode
  kind: action
  command: "EMHV{value:04d}"
  params:
    - name: value
      type: integer
      enum: [12, 13, 22, 21, 31]
      description: "m x n expressed as mn; m,n = longest, shortest monitor counts."

- id: tile_position_set
  label: Tile Matrix Position
  kind: action
  command: "EPOS{value:04d}"
  params:
    - name: value
      type: integer
      range: [1, 4]

- id: tile_mode_position_set
  label: Tile Matrix Mode and Position
  kind: action
  command: "ESPG{XXYY}"
  params:
    - name: XX
      type: integer
      description: "ENLARGE MODE (same values as EMHV)"
    - name: YY
      type: integer
      description: "SCREEN POSITION (same values as EPOS, 1-4)"

- id: bezel_adjust_set
  label: Bezel Adjust
  kind: action
  command: "BZCO{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=OFF, 1=ON"

- id: volume_set
  label: Set Volume
  kind: action
  command: "VOLM{level:04d}"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "Volume level 0-100, 4-char zero-padded. Example: VOLM0030 = VOL 30."

- id: mute_set
  label: Mute Audio
  kind: action
  command: "MUTE{value:04d}"
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=OFF, 1=ON"

- id: temperature_state_query
  label: Temperature Sensor State Query
  kind: query
  command: "DSTA????"
  params: []
  notes: "Reply: 0=normal, 1=abnormal+standby, 2=abnormal (clear by turning off main power), 3=abnormal+backlight dimmed, 4=sensor abnormal."

- id: temperature_value_query
  label: Temperature Acquisition Query
  kind: query
  command: "ERRT????"
  params: []
  notes: "Returns temperature at sensor. 126 indicates sensor abnormality."

- id: resolution_query
  label: Resolution Query
  kind: query
  command: "PXCK????"
  params: []
  notes: "Returns current resolution in form hhh, vvv."

- id: lan_disconnect
  label: LAN Disconnect (BYE)
  kind: action
  command: "BYE\\r"
  params: []
  notes: "LAN-only. Response 'Goodbye' then connection is closed."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, normal, input_signal_waiting]
  query_command: "POWR????"
  notes: "From POWR? reply: 0/1/2."

- id: ok_ack
  type: literal
  values: ["OK"]
  notes: "Returned when a command is executed correctly. Terminated by 0DH 0AH."

- id: err_ack
  type: literal
  values: ["ERR"]
  notes: "Returned when command not recognized or cannot be used in current state."

- id: wait_ack
  type: literal
  values: ["WAIT"]
  notes: "Returned for POWR, INPS, BOMD, WIDE while executing. Wait for value; do not send other commands."

- id: temperature_state
  type: enum
  values: [normal, abnormal_standby, abnormal, abnormal_dimmed, sensor_abnormal]
  query_command: "DSTA????"
  notes: "From DSTA reply: 0/1/2/3/4."
```

## Variables
```yaml
- id: backlight_level
  type: integer
  range: [0, 100]
  read_command: "VLMP????"
  write_command: "VLMP{level:04d}"

- id: volume_level
  type: integer
  range: [0, 100]
  read_command: "VOLM????"
  write_command: "VOLM{level:04d}"

- id: r_gain
  type: integer
  range: [0, 255]
  read_command: "CRTR????"
  write_command: "CRTR{value:04d}"

- id: g_gain
  type: integer
  range: [0, 255]
  read_command: "CRTG????"
  write_command: "CRTG{value:04d}"

- id: b_gain
  type: integer
  range: [0, 255]
  read_command: "CRTB????"
  write_command: "CRTB{value:04d}"

- id: motion_interval
  type: integer
  range: [10, 600]
  read_command: "MINT????"
  write_command: "MINT{value:04d}"

- id: temperature_value
  type: integer
  read_command: "ERRT????"
  notes: "126 indicates sensor abnormality."

- id: model_name
  type: string
  read_command: "INF1????"

- id: serial_number
  type: string
  read_command: "SRNO????"

- id: current_resolution
  type: string
  read_command: "PXCK????"
  notes: "Returns hhh, vvv form."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. Responses are synchronous to commands.
```

## Macros
```yaml
# LAN login sequence (3-step, documented in source):
#   1. Connect TCP to monitor IP:10008 -> monitor sends "Login: "
#   2. Send "<username>\r" -> monitor sends "Password: "
#   3. Send "<password>\r" -> monitor sends "OK\r"
# Default username and password is "ADMIN"; source requires they be changed when PC CONTROL is on.
# Disconnect: send "BYE\r" -> monitor sends "Goodbye\r" and closes connection.
# Auto-logout after configured idle period.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_off_cooldown
    description: "After a power Off command, wait at least 10 seconds before sending the next command."
    source: "Communication interval TIPS section."
  - id: command_interval
    description: "Provide >= 100 ms between command response and the next command transmission."
    source: "Communication interval section."
  - id: wait_state_holdoff
    description: "When 'WAIT' is returned (POWR, INPS, BOMD, WIDE), do not send any command until the value is returned."
    source: "Response code format section."
  - id: temperature_standby
    description: "Temperature abnormality may force standby state or dim backlight; clearing state 2 requires turning off main power."
    source: "DSTA reply semantics."
# UNRESOLVED: full interlock / power-on sequencing procedures for installation not in refined excerpt.
```

## Notes
- S-Format command = 4-character command field + 4-character parameter field + return code (0DH 0AH or 0DH). Parameter MUST be exactly 4 characters, space-padded, except DATE, whose parameter is the 10-character string AABBCCDDEE. Example: `VOLM 30` (with the 4-char parameter being "  30") — the source shows "VOLM0030" but also `VOLM 30`/`VOLM ? ? ? ?` notation indicating space padding within the 4-char parameter field.
- "R" direction commands accept `?` (or `????`) in the parameter field to read the current value.
- After OK/ERR, set a command-response timeout of >= 10 seconds.
- If no communication is established (bad cable/connection), nothing is returned — not even ERR. Application must handle silence as a transport error and resend.
- "ERR" may also be returned when interference corrupts a command; resend on ERR.
- LAN mode: requires "PC CONTROL" set to ON in CONTROL SETTINGS (SYSTEM menu). When PC CONTROL is on, default username/password ADMIN must be changed.
- LAN commands are identical to RS-232C commands; only the transport and login wrapping differ.
- "●" = usable in standby, input-signal-waiting, or power-on. "○" = usable in input-signal-waiting or power-on. "-" = power-on only.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: full command set outside S-Format (e.g. any other "Command Format" modes) not in refined excerpt. -->
<!-- UNRESOLVED: response timeout upper bound beyond ">= 10 s" not stated. -->
<!-- UNRESOLVED: voltage / current / power specifications not present in refined excerpt. -->
<!-- UNRESOLVED: auth credential format constraints (length, charset) for LAN login not described beyond default "ADMIN". -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-exx9_s-format_command_manual_english.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pne869-e759-e659-e559-e509-e439-e329_operation-manual.pdf
retrieved_at: 2026-08-03T12:08:53.676Z
last_checked_at: 2026-10-01T06:45:26.235Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:45:26.235Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 action units map to documented S-Format commands; transport (9600 8N1, port 10008, login) is supported and every source command is represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Voltage/current/power specs not in refined excerpt."
- "token/credential format beyond username+password not described"
- "source describes no unsolicited notifications. Responses are synchronous to commands."
- "full interlock / power-on sequencing procedures for installation not in refined excerpt."
- "firmware version compatibility not stated."
- "full command set outside S-Format (e.g. any other \"Command Format\" modes) not in refined excerpt."
- "response timeout upper bound beyond \">= 10 s\" not stated."
- "voltage / current / power specifications not present in refined excerpt."
- "auth credential format constraints (length, charset) for LAN login not described beyond default \"ADMIN\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
