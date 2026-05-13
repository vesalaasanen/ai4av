---
spec_id: admin/lg-55um7300pua-smarttv
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55UM7300PUA SmartTV Control Spec"
manufacturer: LG
model_family: 55UM7300PUA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55UM7300PUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:06:22.317Z
generated_at: 2026-04-25T21:06:22.317Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:06:22.317Z
  matched_actions: 29
  action_count: 29
  confidence: high
  summary: "All 29 spec actions match source commands with correct parameters and enums; transport values verified verbatim; full command catalogue coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55UM7300PUA SmartTV Control Spec

## Summary
LG 55UM7300PUA smart TV supporting both RS-232C serial control and TCP/IP network control via Telnet on port 9761. The TV exposes standard AV control commands for power, volume, input routing, picture adjustment, channel tuning, and 3D mode. Control is ASCII-based with acknowledgement responses.

<!-- UNRESOLVED: Wake-on-LAN and Mobile TV On are mentioned but no MAC address or WOL protocol details provided -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source for IP control; serial requires no login
```

## Traits
```yaml
- powerable       # Power on/off commands present (ka / POWER)
- routable        # Input/source routing commands present (xb / INPUT_SELECT)
- queryable       # Read commands via FF data value return status
- levelable       # Volume, brightness, contrast, tint, sharpness, color, balance, treble, bass adjustable
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00: Power Off, 01: Power On"
  notes: "Serial: works in any power state. USB-to-Serial: only when TV is on."
  examples:
    - serial: "ka 01" (Set ID 01 to power on)
      tcp: "POWER on"
    - serial: "ka 00" (Set ID 01 to power off)
      tcp: "POWER off"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "01"
        - "02"
        - "04"
        - "05"
        - "06"
        - "07"
        - "09"
        - "0B"
        - "0C"
        - "10"
        - "11"
        - "12"
        - "13"
        - "14"
        - "15"
        - "16"
        - "17"
        - "1F"
      description: "01:Normal, 02:Wide, 04:Zoom, 05:Zoom2, 06:Original, 07:14:9, 09:Just Scan, 0B:Full Wide, 0C:21:9, 10-1F:Cinema Zoom 1-16"
  examples:
    - serial: "kc 02" (Set ID 01 to 16:9)
      tcp: "ASPECT_RATIO 16by9"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - "01"
        - "10"
      description: "00:Off, 01:Screen mute on (picture off), 10:Video mute on"
  examples:
    - serial: "kd 01"
      tcp: "SCREEN_MUTE screenmuteon"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:Mute on, 01:Mute off"
  examples:
    - serial: "ke 00"
      tcp: "VOLUME_MUTE on"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Volume level (serial: 0-64, TCP: 0-100)"
  examples:
    - serial: "kf 32" (level 50)
      tcp: "VOLUME_CONTROL 50"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Contrast level (serial: 0-64, TCP: 0-100)"
  examples:
    - serial: "kg 32"
      tcp: "PICTURE_CONTRAST 50"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Brightness level (serial: 0-64, TCP: 0-100)"
  examples:
    - serial: "kh 32"
      tcp: "PICTURE_BRIGHTNESS 50"

- id: color_colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Color level (serial: 0-64, TCP: 0-100)"
  examples:
    - serial: "ki 32"
      tcp: "PICTURE_COLOUR 50"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Tint level Red 0 to Green 64 (serial), 0-100 (TCP)"
  examples:
    - serial: "kj 20" (towards red)
      tcp: "PICTURE_TINT 50"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-50
      description: "Sharpness level (serial: 0-32, TCP: 0-50)"
  examples:
    - serial: "kk 16"
      tcp: "PICTURE_SHARPNESS 25"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:OSD off, 01:OSD on"
  examples:
    - serial: "kl 00"
      tcp: "OSD_SELECT off"

- id: remote_control_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"
        - "01"
      description: "00:Lock off, 01:Lock on"
  notes: "When locked, TV will not respond to IR or front panel buttons. Lock released when main power cycled or after DC off by off timer."
  examples:
    - serial: "km 01"
      tcp: "REMOTECONTROLER_LOCK on"

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: 0-64
      description: "Treble level"
  examples:
    - serial: "kr 32"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: 0-64
      description: "Bass level"
  examples:
    - serial: "ks 32"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Balance level (serial: 0-64 center, TCP: 0-100)"
  examples:
    - serial: "kt 32"
      tcp: "AUDIO_BALANCE 50"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Color temperature (serial: 0-64, TCP: 0-100)"
  examples:
    - serial: "xu 32"
      tcp: "PICTURE_COLOUR_TEMPERATURE 50"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
      description: "00:Off, 01:Minimum, 02:Medium, 03:Maximum, 04:Auto, 05:Screen off"
  examples:
    - serial: "jq 05"
      tcp: "ENERGY_SAVING screenoff"

- id: channel_tune_analog
  label: Channel Tune (Analog)
  kind: action
  params:
    - name: channel
      type: integer
      range: 0-199
      description: "Physical channel number"
    - name: source
      type: enum
      values:
        - "00"
        - "80"
      description: "00:Antenna TV, 80:Cable TV"
  examples:
    - serial: "ma 00 00 0a 00" (channel 10, antenna)
      tcp: "CHANNEL_SETTING_ATSC_ATV 10 antenna"

- id: channel_tune_digital
  label: Channel Tune (Digital)
  kind: action
  params:
    - name: major
      type: integer
      range: 1-9999
      description: "Major channel number"
    - name: minor
      type: integer
      range: 0-9999
      description: "Minor/Branch channel number"
    - name: source
      type: enum
      values:
        - "02"
        - "06"
        - "22"
        - "26"
        - "46"
        - "66"
      description: "02:DTV antenna, 06:CADTV antenna, 22:DTV not phy, 26:CADTV not phy, 46:CADTV major only, 66:CADTV major only"
  examples:
    - serial: "ma 00 00 00 1e 00 03 22" (ATSC 30-3 antenna)
      tcp: "CHANNEL_SETTING_ATSC_DTV 30 3 antennanotphy"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values:
        - "00"
        - "01"
      description: "00:Delete/Skip, 01:Add"
  examples:
    - serial: "mb 01" (add channel)
      tcp: "CHANNEL_ADD_DELETE add"

- id: send_key
  label: Send Key
  kind: action
  params:
    - name: keycode
      type: string
      description: "Key code from remote control key code table (hex)"
  notes: "Sends IR remote key code to TV. See key code table for available codes."
  examples:
    - serial: "mc 44" (OK key)
      tcp: "KEY_ACTION ok"
    - tcp: "KEY_ACTION volumeup"
    - tcp: "KEY_ACTION channeldown"

- id: backlight_control
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
      description: "Backlight level (serial: 0-64, TCP: 0-100)"
  notes: "TCP requires Energy Saving to be off"
  examples:
    - serial: "mg 32"
      tcp: "PICTURE_BACKLIGHT 50"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "10"
        - "11"
        - "20"
        - "21"
        - "40"
        - "41"
        - "60"
        - "90"
        - "91"
        - "92"
        - "93"
      description: "00:DTV, 01:CADTV, 02:Satellite, 03:ISDB-CS1, 04:ISDB-CS2, 10:ATV, 11:CATV, 20:AV/AV1, 21:AV2, 40:Component1, 41:Component2, 60:RGB, 90:HDMI1, 91:HDMI2, 92:HDMI3, 93:HDMI4"
  examples:
    - serial: "xb 90" (HDMI1)
      tcp: "INPUT_SELECT hdmi1"

- id: picture_3d
  label: 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "off"
        - "on"
        - "3dto2d"
        - "2dto3d"
      description: "3D mode control"
    - name: format
      type: enum
      values:
        - "topandbottom"
        - "sidebyside"
        - "checkboard"
        - "framesequential"
        - "columninterleaving"
        - "rowinterleaving"
      description: "3D format (when mode is on)"
    - name: direction
      type: enum
      values:
        - "righttoleft"
        - "lefttoright"
      description: "Eye direction"
    - name: effect
      type: integer
      range: 0-20
      description: "3D effect/depth"
  notes: "Only for 3D models. Command varies significantly between serial and TCP interfaces."
  examples:
    - serial: "xt 00 00 00 00" (3D on, top/bottom, R>L, effect 0)
    - tcp: "PICTURE_3D on topandbottom righttoleft 0"
    - tcp: "PICTURE_3D 3dto2d"

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values:
        - "picturecorrection"
        - "colorcorrection"
        - "sound"
        - "normal"
        - "depth"
        - "viewpoint"
        - "genre"
      description: "3D option to adjust"
    - name: value
      type: mixed
      description: "Value depends on option type"
  notes: "Only for 3D models. Precondition: 3D mode must be on."
  examples:
    - tcp: "PICTURE_3D_EXTENSION picturecorrection 0"
    - tcp: "PICTURE_3D_EXTENSION genre 2" (Cinema mode)

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: enum
      values:
        - "01"
      description: "Execute auto configure"
  notes: "Only works in RGB (PC) mode. Adjusts picture position and minimizes shaking."
  examples:
    - serial: "ju 01"

- id: equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: 1-5
      description: "Frequency band (1-5)"
    - name: step
      type: integer
      range: 0-20
      description: "Step level"
  notes: "Only when sound mode is set to EQ adjustable value"
  examples:
    - serial: "jv [msb][lsb]" (MSB=band<<5, LSB=step)
    - tcp: "AUDIO_EQUALIZER 2 10"

- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "02"
        - "08"
        - "20"
      description: "02:Orbiter, 08:Normal, 20:Color Wash"
  notes: "Only for Plasma TV"
  examples:
    - serial: "jp 08"

- id: quit
  label: Quit Telnet Session
  kind: action
  params: []
  notes: "TCP only. Closes the Telnet connection."
  examples:
    - tcp: "quit"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"
    - "01"
  description: "00:Off, 01:On"
  query: "Send FF data to read current state"

- id: command_ack
  label: Command Acknowledgement
  type: enum
  values:
    - "OK"
    - "NG"
  description: "OK:Acknowledgement received normally, NG:Error or unsupported function"

- id: error_code
  label: Error Code
  type: enum
  values:
    - "00"
  description: "00:Illegal Code"
  notes: "Returned with NG acknowledgement when data is invalid"

- id: volume_level
  label: Volume Level
  type: integer
  range: 0-100
  query: "VOLUME_CONTROL FF (serial), VOLUME_CONTROL? (TCP)"

- id: input_state
  label: Input State
  type: enum
  values:
    - "00"
    - "01"
    - "02"
    - "03"
    - "04"
    - "10"
    - "11"
    - "20"
    - "21"
    - "40"
    - "41"
    - "60"
    - "90"
    - "91"
    - "92"
    - "93"
  description: "Current input source"
  query: "INPUT_SELECT FF (serial)"
```

## Variables
```yaml
# UNRESOLVED: The protocol supports reading most parameters via FF data,
# but a dedicated Variables section with read/write parameters is not explicitly defined.
# Suggest treating Actions with data ranges as also having GET capability via FF query.
```

## Events
```yaml
# UNRESOLVED: No unsolicited event notifications documented.
# TV does not appear to push status changes to the control host.
```

## Macros
```yaml
# No explicit multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Remote control lock (km) - When enabled, TV front panel and IR remote are disabled. Lock is released only when main power is cycled (unplug 20-30 seconds) or DC off by off timer."
    source: "Remote Control Lock Mode section"
  - description: "During media playback or recording - All commands except Power (ka) and Key (mc) are rejected as NG."
    source: "Command reference list note"
```

## Notes

**Protocol Variants**: This device supports two control interfaces:
1. **RS-232C Serial**: ASCII commands via 3-wire connection, 9600/8/N/1. Set ID 0 broadcasts to all TVs.
2. **TCP/IP (Telnet)**: Port 9761. ASCII text commands. Same command names as serial but different syntax.

**Serial Format**: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D.

**TCP Format**: Space-separated ASCII, e.g., `POWER on` or `VOLUME_CONTROL 50`.

**IP Control Setup**: User must hold Settings button 5+ seconds, enter password 828, enable "Network IP Control", reboot. Default password is 828.

**Data Range Translation**: Serial uses 0-64 ranges for most parameters while TCP uses 0-100 ranges. TCP uses 0-50 for sharpness vs serial's 0-32.

<!-- UNRESOLVED: Wake-on-LAN requires 'Mobile TV On' setting to be enabled and a WOL app on mobile device. MAC address not provided in source. -->

<!-- UNRESOLVED: ISM Method (jp) documented for Plasma TV but 55UM7300PUA is an LCD/LED TV - applicability unclear. -->

<!-- UNRESOLVED: 3D commands - this model (55UM7300PUA) may not support 3D; commands present in protocol spec but 3D-specific features may not be available on non-3D variants. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:06:22.317Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:06:22.317Z
matched_actions: 29
action_count: 29
confidence: high
summary: "All 29 spec actions match source commands with correct parameters and enums; transport values verified verbatim; full command catalogue coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
