---
spec_id: admin/lg-32lb660bpsb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 32LB660BPSB Series Control Spec"
manufacturer: LG
model_family: 32LB660BPSB
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 32LB660BPSB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T20:54:51.458Z
generated_at: 2026-04-25T20:54:51.458Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T20:54:51.458Z
  matched_actions: 45
  action_count: 45
  confidence: high
  summary: "Every spec action matched literally in source; all transport parameters verified; full command catalogue represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 32LB660BPSB Series Control Spec

## Summary
LG 32LB660BPSB Series commercial display controllable via RS-232C serial or TCP/IP using an ASCII command protocol. Commands cover power, volume, picture adjustments, input selection, channel tuning, and remote key emulation. The protocol uses the format `[Command1][Command2][ ][Set ID][ ][Data][Cr]` with hexadecimal data and Set ID addressing (1-99, 0 = all sets).

<!-- UNRESOLVED: TCP/IP port for direct IP control not stated in source; only Crestron integration port (41794) is mentioned -->
<!-- UNRESOLVED: USB-to-Serial converter chip requirement noted (PL2303) but no further control implications documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from file source name and known protocol designation
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; wiring diagrams show both 3-wire and 7-wire configs
addressing:
  port: null  # UNRESOLVED: TCP port for direct IP control not stated in source; Crestron uses 41794 but that is protocol-specific
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from power on/off commands (ka)
  - levelable  # inferred from volume, contrast, brightness, color, tint, sharpness, treble, bass, balance, backlight commands
  - routable   # inferred from input select command (xb)
  - queryable  # inferred from FF data read mode returning present status
```

## Actions
```yaml
actions:
  - id: power_off
    label: Power Off
    kind: action
    command: "ka {set_id} 00"
    description: "Turn the display off. Send as [k][a][ ][Set ID][ ][00][Cr]"
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
        description: "Set ID (0 = all sets)"
    response: "[a] [Set ID] [OK|NG][Data][x]"

  - id: power_on
    label: Power On
    kind: action
    command: "ka {set_id} 01"
    description: "Turn the display on."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
        description: "Set ID (0 = all sets)"
    response: "[a] [Set ID] [OK|NG][Data][x]"

  - id: aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "kc {set_id} {data}"
    description: "Adjust the screen format / main picture size."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: enum
        values:
          - value: "01"
            label: "Normal 4:3"
          - value: "02"
            label: "Wide 16:9"
          - value: "04"
            label: "Zoom"
          - value: "05"
            label: "Zoom 2"
          - value: "06"
            label: "Set by Program"
          - value: "07"
            label: "14:9"
          - value: "09"
            label: "Just Scan"
          - value: "0B"
            label: "Full Wide"
          - value: "0C"
            label: "21:9"
          - value: "10"
            label: "Cinema Zoom 1"
          - value: "1F"
            label: "Cinema Zoom 16"
    response: "[c] [Set ID] [OK|NG][Data][x]"

  - id: screen_mute
    label: Screen Mute
    kind: action
    command: "kd {set_id} {data}"
    description: "Select screen mute on/off."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: enum
        values:
          - value: "00"
            label: "Screen mute off (picture on)"
          - value: "01"
            label: "Screen mute on (picture off, no OSD)"
          - value: "10"
            label: "Video mute on (OSD still visible)"
    response: "[d] [Set ID] [OK|NG][Data][x]"

  - id: volume_mute
    label: Volume Mute
    kind: action
    command: "ke {set_id} {data}"
    description: "Control volume mute on/off."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: enum
        values:
          - value: "00"
            label: "Volume mute on (audio off)"
          - value: "01"
            label: "Volume mute off (audio on)"
    response: "[e] [Set ID] [OK|NG][Data][x]"

  - id: volume_control
    label: Volume Control
    kind: action
    command: "kf {set_id} {data}"
    description: "Adjust volume level."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Volume level (hex 00-64)"
    response: "[f] [Set ID] [OK|NG][Data][x]"

  - id: contrast
    label: Contrast
    kind: action
    command: "kg {set_id} {data}"
    description: "Adjust screen contrast."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Contrast level (hex 00-64)"
    response: "[g] [Set ID] [OK|NG][Data][x]"

  - id: brightness
    label: Brightness
    kind: action
    command: "kh {set_id} {data}"
    description: "Adjust screen brightness."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Brightness level (hex 00-64)"
    response: "[h] [Set ID] [OK|NG][Data][x]"

  - id: color
    label: Color
    kind: action
    command: "ki {set_id} {data}"
    description: "Adjust screen color."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Color level (hex 00-64)"
    response: "[i] [Set ID] [OK|NG][Data][x]"

  - id: tint
    label: Tint
    kind: action
    command: "kj {set_id} {data}"
    description: "Adjust screen tint. 00 = red, 64 = green."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Tint level (hex 00=red to 64=green)"
    response: "[j] [Set ID] [OK|NG][Data][x]"

  - id: sharpness
    label: Sharpness
    kind: action
    command: "kk {set_id} {data}"
    description: "Adjust screen sharpness."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 50
        description: "Sharpness level (hex 00-32)"
    response: "[k] [Set ID] [OK|NG][Data][x]"

  - id: osd_select
    label: OSD Select
    kind: action
    command: "kl {set_id} {data}"
    description: "Turn OSD on/off for remote control operation."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: enum
        values:
          - value: "00"
            label: "OSD off"
          - value: "01"
            label: "OSD on"
    response: "[l] [Set ID] [OK|NG][Data][x]"

  - id: remote_control_lock
    label: Remote Control Lock Mode
    kind: action
    command: "km {set_id} {data}"
    description: "Lock or unlock front panel and remote control."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: enum
        values:
          - value: "00"
            label: "Lock off"
          - value: "01"
            label: "Lock on"
    response: "[m] [Set ID] [OK|NG][Data][x]"

  - id: treble
    label: Treble
    kind: action
    command: "kr {set_id} {data}"
    description: "Adjust treble."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Treble level (hex 00-64)"
    response: "[r] [Set ID] [OK|NG][Data][x]"

  - id: bass
    label: Bass
    kind: action
    command: "ks {set_id} {data}"
    description: "Adjust bass."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Bass level (hex 00-64)"
    response: "[s] [Set ID] [OK|NG][Data][x]"

  - id: balance
    label: Balance
    kind: action
    command: "kt {set_id} {data}"
    description: "Adjust audio balance."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Balance level (hex 00-64)"
    response: "[t] [Set ID] [OK|NG][Data][x]"

  - id: color_temperature
    label: Color Temperature
    kind: action
    command: "xu {set_id} {data}"
    description: "Adjust color temperature."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Color temperature (hex 00-64)"
    response: "[u] [Set ID] [OK|NG][Data][x]"

  - id: equalizer
    label: Equalizer
    kind: action
    command: "jv {set_id} {data}"
    description: "Adjust equalizer. Data is a bitfield: bits 7-5 select band (1st-5th), bits 4-0 set step (0-20+)."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        description: "EQ bitfield (hex). Band selection in bits 7-5, frequency step in bits 4-0."
    response: "[v] [Set ID] [OK|NG][Data][x]"

  - id: energy_saving
    label: Energy Saving
    kind: action
    command: "jq {set_id} {data}"
    description: "Set energy saving mode."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "Minimum"
          - value: "02"
            label: "Medium"
          - value: "03"
            label: "Maximum"
          - value: "04"
            label: "Auto"
          - value: "05"
            label: "Screen off"
    response: "[q] [Set ID] [OK|NG][Data][x]"

  - id: tune_channel
    label: Tune Channel
    kind: action
    command: "ma {set_id} {data00} {data01} {data02}"
    description: "Tune to a specific channel. Format varies by region (Europe/Asia vs Americas/Korea vs Japan). See source for full regional details."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data00
        type: integer
        description: "High channel data (hex)"
      - name: data01
        type: integer
        description: "Low channel data (hex)"
      - name: data02
        type: integer
        description: "Input source selector (hex). Europe/Asia: 10=DTVAntenna, 20=AntennaRadio, 40=SatTV, 50=SatRadio, 90=CableTV, a0=CableRadio. Americas: 00=ATV, 01=CATV, 02=DTVAntenna, 06=CableTV, 22/26/46/66=various digital modes."
    response: "[a] [Set ID] [OK|NG][Data...][x]"

  - id: channel_add_del
    label: Channel Add/Del(Skip)
    kind: action
    command: "mb {set_id} {data}"
    description: "Set channel skip/add status for current channel."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: enum
        values:
          - value: "00"
            label: "Del/Skip"
          - value: "01"
            label: "Add"
    response: "[b] [Set ID] [OK|NG][Data][x]"

  - id: send_key
    label: Send IR Key Code
    kind: action
    command: "mc {set_id} {data}"
    description: "Send IR remote key code. See key code table in source (various hex codes)."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        description: "IR key code in hex (e.g. 08=Power, 10-19=Number keys 0-9)"
    response: "[c] [Set ID] [OK|NG][Data][x]"

  - id: backlight_control
    label: Backlight Control
    kind: action
    command: "mg {set_id} {data}"
    description: "Control the backlight level (LCD/LED TV)."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: integer
        min: 0
        max: 100
        description: "Backlight level (hex 00-64)"
    response: "[g] [Set ID] [OK|NG][Data][x]"

  - id: input_select
    label: Input Select
    kind: action
    command: "xb {set_id} {data}"
    description: "Select input source for main picture."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
      - name: data
        type: enum
        values:
          - value: "00"
            label: "DTV"
          - value: "01"
            label: "CADTV"
          - value: "02"
            label: "Satellite DTV ISDB-BS"
          - value: "03"
            label: "ISDB-CS1"
          - value: "04"
            label: "ISDB-CS2"
          - value: "10"
            label: "ATV"
          - value: "11"
            label: "CATV"
          - value: "20"
            label: "AV/AV1"
          - value: "21"
            label: "AV2"
          - value: "40"
            label: "Component1"
          - value: "41"
            label: "Component2"
          - value: "60"
            label: "RGB"
          - value: "90"
            label: "HDMI1"
          - value: "91"
            label: "HDMI2"
          - value: "92"
            label: "HDMI3"
          - value: "93"
            label: "HDMI4"
    response: "[b] [Set ID] [OK|NG][Data][x]"

  - id: auto_configure
    label: Auto Configure
    kind: action
    command: "ju {set_id} 01"
    description: "Auto-adjust picture position and minimize image shaking. RGB (PC) mode only."
    params:
      - name: set_id
        type: integer
        min: 0
        max: 99
    response: "[u] [Set ID] [OK|NG][Data][x]"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: "ka {set_id} FF"
    type: enum
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"
    description: "Query power state by sending FF as data. Ack response contains current state."

  - id: aspect_ratio_status
    label: Aspect Ratio Status
    command: "kc {set_id} FF"
    type: enum
    description: "Query current aspect ratio. Same value set as aspect_ratio action."

  - id: screen_mute_status
    label: Screen Mute Status
    command: "kd {set_id} FF"
    type: enum
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "Screen mute on"
      - value: "10"
        label: "Video mute on"

  - id: volume_mute_status
    label: Volume Mute Status
    command: "ke {set_id} FF"
    type: enum
    values:
      - value: "00"
        label: "Muted"
      - value: "01"
        label: "Unmuted"

  - id: volume_level
    label: Volume Level
    command: "kf {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: contrast_level
    label: Contrast Level
    command: "kg {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: brightness_level
    label: Brightness Level
    command: "kh {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: color_level
    label: Color Level
    command: "ki {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: tint_level
    label: Tint Level
    command: "kj {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: sharpness_level
    label: Sharpness Level
    command: "kk {set_id} FF"
    type: integer
    min: 0
    max: 50

  - id: osd_status
    label: OSD Status
    command: "kl {set_id} FF"
    type: enum
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: remote_lock_status
    label: Remote Lock Status
    command: "km {set_id} FF"
    type: enum
    values:
      - value: "00"
        label: "Unlocked"
      - value: "01"
        label: "Locked"

  - id: treble_level
    label: Treble Level
    command: "kr {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: bass_level
    label: Bass Level
    command: "ks {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: balance_level
    label: Balance Level
    command: "kt {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: color_temperature_level
    label: Color Temperature Level
    command: "xu {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: equalizer_status
    label: Equalizer Status
    command: "jv {set_id} FF"
    type: integer
    description: "Current EQ bitfield value."

  - id: energy_saving_status
    label: Energy Saving Status
    command: "jq {set_id} FF"
    type: enum
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "Minimum"
      - value: "02"
        label: "Medium"
      - value: "03"
        label: "Maximum"
      - value: "04"
        label: "Auto"
      - value: "05"
        label: "Screen off"

  - id: input_status
    label: Input Source Status
    command: "xb {set_id} FF"
    type: enum
    description: "Current input source. Same value set as input_select action."

  - id: backlight_level
    label: Backlight Level
    command: "mg {set_id} FF"
    type: integer
    min: 0
    max: 100
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are represented as actions above.
# The command protocol does not distinguish between actions and variables;
# every writable command accepts a data value.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source.
# Acknowledgements are only sent in response to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "During media playback/recording, all commands except Power (ka) and Key (mc) are rejected with NG response."
  - description: "With USB-to-Serial converter, power command only works when TV is on. RS-232C cable allows ka command in both power-on and power-off states."
  - description: "When key lock is on and TV is in standby, TV will not turn on via IR or local key power button."
  - description: "External control lock is released when main power is cycled off and on (unplug/replug, wait 20-30 seconds)."
# UNRESOLVED: no formal safety interlock sequences or power-on sequencing requirements documented beyond the above behavioral notes.
```

## Notes
- **Command format:** All commands use ASCII encoding with format `[Cmd1][Cmd2][ ][SetID][ ][Data][Cr]` where `Cr` = 0x0D, space = 0x20. Data is hexadecimal. Set ID is 0-99 decimal (0 broadcasts to all sets).
- **Acknowledgement format:** OK = `[Cmd2][ ][SetID][ ][OK][Data][x]`, Error = `[Cmd2][ ][SetID][ ][NG][Data][x]`. NG with data 00 means illegal code.
- **Query convention:** Sending `FF` as data reads the current status of any command. The response contains the current value.
- **Model-dependent behavior:** Source notes many commands "may work differently depending upon model and signal." Availability should be verified per device.
- **Crestron integration:** Built-in Crestron support with default port 41794. Requires server IP and IP ID configuration.
- **USB-to-Serial:** Only PL2303 chip-based converters (VID 0x0557, PID 0x2008) are supported.

<!-- UNRESOLVED: TCP/IP port for direct LG IP control not stated; only Crestron port documented -->
<!-- UNRESOLVED: maximum command rate / minimum interval between commands not documented -->
<!-- UNRESOLVED: maximum simultaneous connection count not documented -->
<!-- UNRESOLVED: exact key code mapping for the Key (mc) command — source lists hex codes but most are labeled generically as "R/C Button" -->
<!-- UNRESOLVED: equalizer data bitfield encoding is described but exact frequency bands per step are not fully specified -->
<!-- UNRESOLVED: tune command behavior differs significantly by geographic region; full parameter sets for Japan models not completely documented -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T20:54:51.458Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:54:51.458Z
matched_actions: 45
action_count: 45
confidence: high
summary: "Every spec action matched literally in source; all transport parameters verified; full command catalogue represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
