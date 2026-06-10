---
spec_id: admin/shure-mxw-apxd2-next2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXW APXD2 neXt2 Control Spec"
manufacturer: Shure
model_family: MXWAPXD2
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXWAPXD2
    - MXW1X
    - MXW2X
    - MXW6X
    - MXW8X
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
  - pubs.shure.com
  - content-files.shure.com
  - techportal.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXWneXt
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://content-files.shure.com/Pubs2/files/259490.pdf
  - https://techportal.shure.com
retrieved_at: 2026-05-13T21:35:04.425Z
last_checked_at: 2026-06-10T00:58:55.430Z
generated_at: 2026-06-10T00:58:55.430Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial control not documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "RS-232 serial configuration (baud rate, data bits, parity, stop bits) not stated in source"
  - "power on/off commands not present in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:58:55.430Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 action-units match source SET commands with exact parameter names, ranges, and enum values. No drift or fabrication. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Shure MXW APXD2 neXt2 Control Spec

## Summary
Shure MXW neXt 2-channel access point dock supporting wireless microphone transmitters (bodypack, handheld, boundary, gooseneck). Controlled via TCP/IP on port 2202 using ASCII command strings (GET/SET/REP pattern). Acts as gateway for transmitter commands; commands sent to MXWAPX IP address are forwarded to linked transmitters.

<!-- UNRESOLVED: RS-232 serial control not documented in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # GET commands for device state, firmware, serial, channel status
- levelable       # audio gain control (INPUT_CH_GAIN, OUTPUT_CH_GAIN, AUDIO_GAIN)
- routable        # audio routing via REMOTE_LINK, mute states
```

## Actions
```yaml
- id: set_flash
  label: Device Identify
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: Flash identification lights

- id: set_device_id
  label: Set Device ID
  kind: action
  params:
    - name: device_id
      type: string
      description: 1-31 alphanumeric characters (A-Z, a-z, 0-9, -)

- id: set_system_operation_mode
  label: Set System Operation Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [PRESENTATION, CONFERENCE, DIRECT, CUSTOM]

- id: set_reboot
  label: Reboot Device
  kind: action
  params: []

- id: set_meter_rate
  label: Set Meter Rate
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: rate_ms
      type: integer
      description: Metering speed in milliseconds

- id: set_audio_gain
  label: Set Audio Gain (Legacy-Compatible)
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: gain_value
      type: integer
      description: "000-040 = -25 dB to +15 dB; 025 = 0 dB default"

- id: set_input_ch_gain
  label: Set Input Channel Gain
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number: 1-19=Dante, 21-39=wireless mic, 41=analog (APXD2), 51=USB"
    - name: gain_value
      type: integer
      description: "0-1400 representing -110.0 dB to +30.0 dB (gain = y/10 - 110)"

- id: set_input_ch_mute
  label: Set Input Channel Mute State
  kind: action
  params:
    - name: input
      type: integer
      description: Input number
    - name: state
      type: enum
      values: [MUTED, ACTIVE]

- id: set_output_ch_gain
  label: Set Output Channel Gain
  kind: action
  params:
    - name: output
      type: integer
      description: "Output number: 1-N=Dante (APXD2: N=4), 41=analog (APXD2), 42=analog, 51=USB, 61=back-channel"
    - name: gain_value
      type: integer
      description: "0-1400 representing -110.0 dB to +30.0 dB"

- id: set_output_ch_mute
  label: Set Output Channel Mute State
  kind: action
  params:
    - name: output
      type: integer
      description: Output number
    - name: state
      type: enum
      values: [MUTED, ACTIVE]

- id: set_automix_out_mute
  label: Set Automixer Output Mute State
  kind: action
  params:
    - name: state
      type: enum
      values: [MUTED, ACTIVE]

- id: set_channel_name
  label: Set Channel Name
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-8)
    - name: name
      type: string
      description: Up to 31 characters from permitted ASCII set

- id: set_remote_link
  label: Link Docked Microphone to Audio Channel
  kind: action
  params:
    - name: apx_channel
      type: integer
      description: APX channel number (1-8)
    - name: ndx_channel
      type: integer
      description: NDX bay number
    - name: apx_ip
      type: string
      description: IP address of MXWAPX (zzz.zzz.zzz.zzz)

- id: set_unlink
  label: Unlink Transmitter from Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: APX channel number (1-8); 0 not allowed

- id: set_tx_status
  label: Set Transmitter Status
  kind: action
  params:
    - name: target_type
      type: enum
      values: [BAY, CH]
      description: Bay or channel targeting
    - name: index
      type: integer
      description: Bay or channel number
    - name: status
      type: enum
      values: [OFF]

- id: set_tx_device_id
  label: Set Transmitter Device ID
  kind: action
  params:
    - name: target_type
      type: enum
      values: [BAY, CH]
    - name: index
      type: integer
      description: Bay or channel number
    - name: device_id
      type: string
      description: 1-12 alphanumeric characters

- id: set_bp_mic_select
  label: Set Bodypack Input Source
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: source
      type: enum
      values: [INT, EXT, AUTO]

- id: set_led_status
  label: Set Microphone LED Status
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: red
      type: enum
      values: [ON, OF, ST, FL, PU, NC]
      description: Red LED setting
    - name: green
      type: enum
      values: [ON, OF, ST, FL, PU, NC]
      description: Green LED setting
- id: set_int_audio_gain
  label: Set Bodypack Internal Microphone Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: gain_value
      type: integer
      description: "000-060 = -25.0 dB to +35.0 dB in steps of 0.1 dB; 025 = 0 dB default (yyy = gain - 25)"
```

## Feedbacks
```yaml
- id: all
  label: Get All
  type: string
  description: Returns all REP strings from device for all available commands

- id: flash_state
  label: Flash State
  type: enum
  values: [ON, OFF]

- id: device_model
  label: Device Model
  type: string
  description: Device model name, up to 31 characters

- id: system_operation_mode
  label: System Operation Mode
  type: enum
  values: [PRESENTATION, CONFERENCE, DIRECT, CUSTOM]

- id: fw_ver
  label: Firmware Version
  type: string
  description: "24-character padded string; format Maj.Min.Pack.Build; * = self test failed"

- id: serial_num
  label: Serial Number
  type: string
  description: 11-character alphanumeric string

- id: device_id
  label: Device ID
  type: string
  description: 1-31 alphanumeric characters

- id: meter_rate
  label: Meter Rate
  type: object
  properties:
    - name: channel
      type: integer
    - name: rate_ms
      type: integer
      description: Metering speed in milliseconds

- id: sample
  label: Audio/RF Sample
  type: object
  properties:
    - name: channel
      type: integer
    - name: rf_level
      type: integer
      description: "000-127 representing -110 dBm to +17 dBm (dBm = aaa - 110)"
    - name: audio_level
      type: integer
      description: "000-120 representing -120 dB to 0 dB (dB = eee - 120)"

- id: audio_gain
  label: Audio Gain (Legacy-Compatible)
  type: object
  properties:
    - name: channel
      type: integer
    - name: gain_value
      type: integer
      description: "000-040 = -25 dB to +15 dB; 025 = 0 dB; 255=Unknown; 253=Error"

- id: input_ch_gain
  label: Input Channel Gain
  type: object
  properties:
    - name: input
      type: integer
    - name: gain_value
      type: integer
      description: "0-1400 representing -110.0 dB to +30.0 dB (gain = y/10 - 110)"

- id: input_ch_mute
  label: Input Channel Mute State
  type: object
  properties:
    - name: input
      type: integer
    - name: state
      type: enum
      values: [MUTED, ACTIVE, ERR]

- id: output_ch_gain
  label: Output Channel Gain
  type: object
  properties:
    - name: output
      type: integer
    - name: gain_value
      type: integer
      description: "0-1400 representing -110.0 dB to +30.0 dB"

- id: output_ch_mute
  label: Output Channel Mute State
  type: object
  properties:
    - name: output
      type: integer
    - name: state
      type: enum
      values: [MUTED, ACTIVE, ERR]

- id: automix_out_mute
  label: Automixer Output Mute State
  type: enum
  values: [MUTED, ACTIVE]

- id: chan_name
  label: Channel Name
  type: object
  properties:
    - name: channel
      type: integer
    - name: name
      type: string
      description: Up to 31 characters

- id: dect_channel_count
  label: DECT Channel Count
  type: integer
  description: "Number of DECT audio channels: APXD2=2, APX4=4, APX8=8"

- id: remote_link
  label: Remote Link Result
  type: object
  properties:
    - name: apx_channel
      type: integer
    - name: ndx_channel
      type: integer
    - name: apx_ip
      type: string
    - name: result
      type: enum
      values: [SUCCESS, ERR]

- id: unlink
  label: Unlink Result
  type: object
  properties:
    - name: channel
      type: integer
    - name: result
      type: enum
      values: [SUCCESS, ERROR]

- id: tx_status
  label: Transmitter Status
  type: object
  properties:
    - name: target_type
      type: enum
      values: [BAY, CH]
    - name: index
      type: integer
    - name: status
      type: enum
      values: [ACTIVE, MUTED, OFF, ON_CHARGER, UNKNOWN]

- id: tx_available
  label: Transmitter Available
  type: enum
  values: [YES, NO]
  description: Whether microphone is available (not off, unlinked, or still establishing link)

- id: tx_device_id
  label: Transmitter Device ID
  type: object
  properties:
    - name: target_type
      type: enum
      values: [BAY, CH]
    - name: index
      type: integer
    - name: device_id
      type: string
      description: 1-12 alphanumeric; UNKNOWN if no transmitter linked; ERR if invalid index

- id: tx_type
  label: Transmitter Model (Legacy)
  type: object
  properties:
    - name: target_type
      type: enum
      values: [BAY, CH]
    - name: index
      type: integer
    - name: model
      type: enum
      values: [MXW1X, MXW2X, MXW6X, MXW8X, UNKNOWN]

- id: tx_model
  label: Transmitter Model
  type: object
  properties:
    - name: target_type
      type: enum
      values: [BAY, CH]
    - name: index
      type: integer
    - name: model
      type: enum
      values: [MXW1X, MXW2X, MXW6X, MXW8X, UNKNOWN]

- id: bp_mic_select
  label: Bodypack Input Source
  type: object
  properties:
    - name: channel
      type: integer
    - name: source
      type: enum
      values: [INT, EXT, AUTO, ERR, UNKNOWN]

- id: led_status
  label: Microphone LED Status
  type: object
  properties:
    - name: channel
      type: integer
    - name: red
      type: enum
      values: [ON, OF, ST, FL, PU, NC]
    - name: green
      type: enum
      values: [ON, OF, ST, FL, PU, NC]

- id: button_sts
  label: Microphone Button Status
  type: object
  properties:
    - name: channel
      type: integer
    - name: state
      type: enum
      values: [ON, OFF]
  description: Unsolicited report sent when microphone button pressed/released

- id: batt_health
  label: Transmitter Battery Health
  type: object
  properties:
    - name: channel
      type: integer
    - name: percent
      type: integer
      description: "000-100 = percentage of factory capacity; 255=Unknown; 253=Error"

- id: batt_run_time
  label: Battery Run Time
  type: object
  properties:
    - name: channel
      type: integer
    - name: minutes
      type: integer
      description: "Minutes until shutdown; 65532=wall wart; 65533=on charger; 65534=calculating; 65535=off"

- id: batt_time_to_full
  label: Time to Full Charge
  type: object
  properties:
    - name: channel
      type: integer
    - name: minutes
      type: integer
      description: "Minutes to full; 65533=not on charger; 65534=fully charged; 65535=off"

- id: batt_charge
  label: Transmitter Battery Charge
  type: object
  properties:
    - name: channel
      type: integer
    - name: percent
      type: integer
      description: "000-100 = battery percent; 255=Unknown; 253=Error"
```

## Variables
```yaml
# Audio gain, mute, and routing parameters are settable via Actions.
# Battery, device ID, channel name, meter rate, operation mode, and LED status
# are all readable and settable via GET/SET/REP pairs.
# No discrete variable-only parameters identified beyond those in Actions/Feedbacks.
```

## Events
```yaml
- id: button_sts
  label: Microphone Button Press/Release
  type: enum
  values: [ON, OFF]
  description: Unsolicited - device sends when microphone button state changes

- id: sample
  label: Audio/RF Meter Sample
  type: object
  properties:
    - name: channel
      type: integer
    - name: rf_level
      type: integer
      description: "000-127 = -110 dBm to +17 dBm"
    - name: audio_level
      type: integer
      description: "000-120 = -120 dB to 0 dB"
  description: Unsolicited periodic sample sent at METER_RATE interval

- id: tx_status_change
  label: Transmitter Status Change
  type: enum
  values: [ACTIVE, MUTED, ON_CHARGER, UNKNOWN]
  description: Unsolicited - device sends when transmitter status changes

- id: audio_gain_report
  label: Audio Gain Report
  type: object
  description: Unsolicited - additional REP from INPUT_CH_GAIN when AUDIO_GAIN is set

- id: error
  label: Error Response
  type: string
  description: Device returns ERROR or ERR for invalid commands
```

## Macros
```yaml
# No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for:
  - REBOOT  # no acknowledgement sent; device restarts immediately
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source
```

## Notes
- Transmitter commands are sent to the MXWAPX IP address; the MXWAPX forwards to linked transmitter.
- MXW neXt supports MXW Legacy command strings except where noted.
- MXW neXt transmitters do not support Mic Identify (channel index on FLASH returns ERROR).
- Metering is OFF (00000) when device is offline, out of range, or first powered on.
- Setting transmitter to OFF yields UNKNOWN on subsequent status queries.
- All messages use ASCII-7 printable characters.
- LED_STATUS requires External Mute preference set in control software or command returns ERR.
- REBOOT command sends no acknowledgement.
- INPUT_CH_GAIN index 41 = analog input (APXD2 only); index 51 = USB input.
- OUTPUT_CH_GAIN index 41 = analog output (APXD2 only); index 61 = back-channel audio.
- Gain encoding: y = gain × 10 + 1100 (range 0–1400 = -110.0 dB to +30.0 dB).
- Legacy AUDIO_GAIN encoding: z = gain + 25 (range 000–040 = -25 dB to +15 dB).
<!-- UNRESOLVED: RS-232 serial configuration (baud rate, data bits, parity, stop bits) not stated in source -->
<!-- UNRESOLVED: power on/off commands not present in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - shure.com
  - pubs.shure.com
  - content-files.shure.com
  - techportal.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXWneXt
  - https://pubs.shure.com/command-strings/MXA310/en-US
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://content-files.shure.com/Pubs2/files/259490.pdf
  - https://techportal.shure.com
retrieved_at: 2026-05-13T21:35:04.425Z
last_checked_at: 2026-06-10T00:58:55.430Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:58:55.430Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 action-units match source SET commands with exact parameter names, ranges, and enum values. No drift or fabrication. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial control not documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "RS-232 serial configuration (baud rate, data bits, parity, stop bits) not stated in source"
- "power on/off commands not present in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
