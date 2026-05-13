---
spec_id: admin/lg-49uk7550pla-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49UK7550PLA Series Control Spec"
manufacturer: LG
model_family: 49UK7550PLA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49UK7550PLA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:01:19.609Z
generated_at: 2026-04-25T21:01:19.609Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - jp
  - xt
  - xv
verification:
  verdict: verified
  checked_at: 2026-04-25T21:01:19.609Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions match source commands; transport parameters verified verbatim; model-specific variants (ISM, 3D) noted as optional in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49UK7550PLA Series Control Spec

## Summary
LG 49UK7550PLA is a 4K UHD smart TV supporting both RS-232C serial control and wired IP control via Telnet (port 9761). The source documents ASCII-based command protocol for both transport methods, covering power, picture, audio, channel tuning, input selection, and 3D modes.

<!-- UNRESOLVED: USB-to-Serial converter cable is PL2303 chip-based (VID 0x0557, PID 0x2008), but no other cable specifications stated -->

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
  port: 9761  # IP control port; RS-232C has no stated port
auth:
  type: password  # IP control requires password (default 828); RS-232C has no auth
  password_default: "828"  # UNRESOLVED: only default stated, actual may be changed
```

## Traits
```yaml
- powerable       # power on/off commands present
- queryable       # read commands (FF data) return status
- levelable       # volume, brightness, contrast, etc. support 0-64/100 ranges
- routable        # input select command present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: string
      enum: [off, on]
      description: "Data: 00=off, 01=on"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      enum: [01, 02, 04, 05, 06, 07, 09, 0B, 0C, 10-1F]
      description: "01=normal, 02=wide, 04=zoom, 05=zoom2, 06=original, 07=14:9, 09=justscan, 0B=fullwide, 0C=21:9, 10-1F=cinemazoom1-16"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: string
      enum: [00, 01, 10]
      description: "00=pictureon, 01=screenmute(pictureoff), 10=videomute"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: string
      enum: [00, 01]
      description: "00=mute on, 01=mute off"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "0-64 (RS-232); IP accepts 0-100"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "00=red to 64=green"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 32]

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: string
      enum: [00, 01]
      description: "00=OSD off, 01=OSD on"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: string
      enum: [00, 01]
      description: "00=lock off, 01=lock on. Note: lock released 20-30s after power cycle"

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: string
      enum: [00, 01, 02, 03, 04, 05]
      description: "00=off, 01=minimum, 02=medium, 03=maximum, 04=auto, 05=screenoff"

- id: equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: [1, 5]
      description: "Frequency band (RS-232); IP uses AUDIO_EQUALIZER [band] [step]"
    - name: step
      type: integer
      range: [0, 20]
      description: "Step value"

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: array
      items: {type: integer}
      description: "Channel tuning for antenna/cable/satellite sources. Format varies by region and signal type. See ma command documentation for multi-byte channel data encoding."

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: action
      type: string
      enum: [00, 01]
      description: "00=delete/skip, 01=add"

- id: key
  label: Key (Remote Control)
  kind: action
  params:
    - name: keycode
      type: string
      description: "Hex key code from key code table (e.g. 08=power, 0B=input, 43=menu). Full table in source pp.2-3."

- id: backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: string
      enum: [00, 01, 02, 03, 04, 10, 11, 20, 21, 40, 41, 60, 90, 91, 92, 93]
      description: "00=DTV, 01=CADTV, 02=Satellite, 10=ATV, 11=CATV, 20=AV1, 21=AV2, 40=Component1, 41=Component2, 60=RGB, 90-93=HDMI1-4"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      const: 1
      description: "Auto picture adjustment (RGB/PC mode only)"
```

## Feedbacks
```yaml
- id: command_ack
  label: Command Acknowledgement
  type: object
  properties:
    - name: status
      type: string
      enum: [OK, NG]
    - name: data
      type: string
      description: "Present status data if read mode (FF); write mode returns PC data"

- id: error_ack
  label: Error Acknowledgement
  type: object
  properties:
    - name: error_code
      type: string
      description: "00=illegal code"

- id: power_state
  label: Power State Query
  type: enum
  values: [on, off]

- id: volume_mute_state
  label: Volume Mute State Query
  type: enum
  values: [on, off]
```

## Variables
```yaml
# UNRESOLVED: variables that can be read via FF data mode
# All write actions can be read back by transmitting FF in place of data
```

## Events
```yaml
# UNRESOLVED: device does not initiate unsolicited notifications per source
```

## Macros
```yaml
# No explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "External control lock (ka 01) is released 20-30 seconds after power cycle (plug-off/plug-in)"
    source: "When main power is off & on (plug-off and plug-in, after 20 - 30 seconds), external control lock is released."
  - description: "During media playback or recording, all commands except Power (ka) and Key (mc) are rejected as NG"
    source: "During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG."
```

## Notes
- Serial protocol format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr=0x0D, space=0x20
- IP/Telnet uses ASCII text commands (e.g., `VOLUME_MUTE on`, `POWER off`) on port 9761
- IP control default password is 828; changed via Password Change menu
- RS-232C requires a crossed (reverse) cable
- Set ID range: 1-99 (decimal), transmitted as hex 0x01-0x63; 0x00 targets all devices
- Channel tune (ma) uses two-byte hexadecimal for channel numbers; maps to decimal 0-9999
- USB-to-Serial converter must use PL2303 chip (VID 0x0557, PID 0x2008)
- With RS-232C cable, power command works in both on and off states; with USB-to-Serial, power command only works when TV is on
<!-- UNRESOLVED: voltage/current/power specifications not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: network protocol (Wake-on-LAN) details not fully specified -->
<!-- UNRESOLVED: 3D commands only apply to 3D model variants -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:01:19.609Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:01:19.609Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions match source commands; transport parameters verified verbatim; model-specific variants (ISM, 3D) noted as optional in source."
```

## Known Gaps

```yaml
- jp
- xt
- xv
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
