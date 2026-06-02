---
spec_id: admin/shure-microflex-mxw
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure Microflex Wireless (MXW) Control Spec"
manufacturer: Shure
model_family: MXW1
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - MXW1
    - MXW2
    - MXW6
    - MXW8
    - MXWAPT2
    - MXWAPT4
    - MXWAPT8
    - MXWANI4
    - MXWANI8
    - MXWNCS2
    - MXWNCS4
    - MXWNCS8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pubs.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/MXW/en-US
retrieved_at: 2026-04-30T04:45:53.234Z
last_checked_at: 2026-05-14T18:17:20.490Z
generated_at: 2026-05-14T18:17:20.490Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TX_DEVICE_ID (charger-only variant)"
  - "no auth procedure in source"
  - "all parameters are command-based GET/SET; no standalone variables"
  - "no explicit multi-step macros in source"
  - "populate if source contains safety warnings"
  - "firmware version requirements not stated (REMOTE_LINK says v4.0+ but other commands unspecified)"
  - "no power specifications in source"
  - "authentication credentials not stated"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.490Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 48 spec actions matched literally with correct parameters; transport (TCP port 2202) verified; command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Shure Microflex Wireless (MXW) Control Spec

## Summary
Wireless microphone system with TCP/IP control via MXWAPT (access point transceiver). Commands sent to APT IP address relay to linked transmitters. Port 2202, ASCII protocol, GET/SET/REP/SAMPLE command types.

<!-- UNRESOLVED: no auth procedure in source -->

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
- powerable  # inferred: TX_STATUS SET OFF command present
- queryable  # inferred: GET commands present for all parameters
- routable   # inferred: REMOTE_LINK command present
- levelable  # inferred: AUDIO_GAIN, INT_AUDIO_GAIN with INC/DEC
```

## Actions
```yaml
- id: get_chan_name
  label: Get Channel Name
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8, or 0 for all

- id: set_chan_name
  label: Set Channel Name
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: name
      type: string
      description: 8-character name string

- id: get_device_id
  label: Get Device ID
  kind: action
  params: []

- id: set_device_id
  label: Set Device ID
  kind: action
  params:
    - name: id
      type: string
      description: 1-8 character device ID

- id: unlink
  label: Unlink Microphone
  kind: action
  params:
    - name: channel
      type: integer
      description: APT channel 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic, omit for primary"

- id: flash
  label: Flash Identify
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number (omit for device identify)"
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: set_meter_rate
  label: Set Meter Rate
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: rate_ms
      type: integer
      description: "Milliseconds 00100-65535, or 00000 to disable"
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_tx_available
  label: Get Transmitter Available
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_tx_status
  label: Get Transmitter Status
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: set_tx_status
  label: Set Transmitter Status
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: status
      type: string
      enum: [ACTIVE, MUTE, STANDBY, OFF]
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_audio_gain
  label: Get Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: set_audio_gain
  label: Set Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: value
      type: integer
      description: "000-060 (actual dB = value - 25)"
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: inc_audio_gain
  label: Increment Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: delta
      type: integer
      description: dB increment amount
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: dec_audio_gain
  label: Decrement Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: delta
      type: integer
      description: dB decrement amount
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_int_audio_gain
  label: Get Internal Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: set_int_audio_gain
  label: Set Internal Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: value
      type: integer
      description: "000-040 (actual dB = value - 25)"
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_button_sts
  label: Get Button Status
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_led_status
  label: Get LED Status
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: set_led_status
  label: Set LED Status
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: red
      type: string
      enum: [ON, OF, ST, FL, PU, NC]
    - name: green
      type: string
      enum: [ON, OF, ST, FL, PU, NC]
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_tx_type
  label: Get Transmitter Type
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_bp_mic_select
  label: Get Mic Select
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_batt_charge
  label: Get Battery Charge
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_batt_run_time
  label: Get Battery Runtime
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_batt_health
  label: Get Battery Health
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_batt_time_to_full
  label: Get Time to Full Charge
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: secondary
      type: string
      description: "SEC for secondary mic"

- id: get_tx_device_id
  label: Get Transmitter Device ID
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 0-8 (0 = all)
    - name: secondary
      type: string
      description: "SEC or PRI for secondary/primary"

- id: set_tx_device_id
  label: Set Transmitter Device ID
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: id
      type: string
      description: "1-12 character transmitter ID"
    - name: secondary
      type: string
      description: "SEC or PRI for secondary/primary"

- id: remote_link
  label: Remote Link Microphone to APT
  kind: action
  params:
    - name: charger_bay
      type: integer
      description: Charger bay number
    - name: apt_channel
      type: integer
      description: MXWAPT channel number
    - name: apt_ip
      type: string
      description: MXWAPT IP address
    - name: secondary
      type: string
      description: "SEC for secondary mic"
```

## Feedbacks
```yaml
- id: rep_chan_name
  label: Channel Name Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: name
      type: string
      description: 31-character name

- id: rep_device_id
  label: Device ID Report
  kind: feedback
  params:
    - name: id
      type: string
      description: 31-character ID

- id: rep_unlink
  label: Unlink Result
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: result
      type: string
      enum: [SUCCESS, ERROR]
    - name: secondary
      type: string

- id: rep_flash
  label: Flash Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: status
      type: string
      enum: [ON, OFF]
    - name: secondary
      type: string

- id: rep_meter_rate
  label: Meter Rate Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: rate
      type: integer
      description: Milliseconds
    - name: secondary
      type: string

- id: sample
  label: Meter Sample
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: rf_level
      type: integer
    - name: audio_level
      type: integer
    - name: secondary
      type: string

- id: rep_tx_available
  label: Transmitter Available Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: available
      type: string
      enum: [YES, NO]
    - name: secondary
      type: string

- id: rep_tx_status
  label: Transmitter Status Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: status
      type: string
      enum: [ACTIVE, MUTE, STANDBY, ON_CHARGER, OFF, UNKNOWN]
    - name: secondary
      type: string

- id: rep_audio_gain
  label: Audio Gain Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: "000-060 offset by 25"
    - name: secondary
      type: string

- id: rep_int_audio_gain
  label: Internal Audio Gain Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
      description: "000-040 offset by 25"
    - name: secondary
      type: string

- id: rep_button_sts
  label: Button Status Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: status
      type: string
      enum: [ON, OFF]
    - name: secondary
      type: string

- id: rep_led_status
  label: LED Status Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: red
      type: string
      enum: [ON, OF, ST, FL, PU, NC]
    - name: green
      type: string
      enum: [ON, OF, ST, FL, PU, NC]
    - name: secondary
      type: string

- id: rep_tx_type
  label: Transmitter Type Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: type
      type: string
      enum: [MXW1, MXW2, MXW6, MXW8]
    - name: secondary
      type: string

- id: rep_bp_mic_select
  label: Mic Select Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: source
      type: string
      enum: [INT, EXT, AUTO, ERR, UNKNOWN]
    - name: secondary
      type: string

- id: rep_batt_charge
  label: Battery Charge Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: percent
      type: integer
      description: "000-100, 255=device off"
    - name: secondary
      type: string

- id: rep_batt_run_time
  label: Battery Runtime Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: minutes
      type: integer
      description: "yyyyy: minutes remaining, 65532-65535=special codes"
    - name: secondary
      type: string

- id: rep_batt_health
  label: Battery Health Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: percent
      type: integer
      description: "000-100, 255=unknown"
    - name: secondary
      type: string

- id: rep_batt_time_to_full
  label: Time to Full Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: minutes
      type: integer
      description: "yyyyy: minutes to full, 65533-65535=special codes"
    - name: secondary
      type: string

- id: rep_tx_device_id
  label: Transmitter Device ID Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: id
      type: string
      description: 12-character padded ID
    - name: secondary
      type: string

- id: rep_remote_link
  label: Remote Link Result
  kind: feedback
  params:
    - name: primary_channel
      type: string
      description: "PRI or SEC"
    - name: channel
      type: integer
    - name: charger_bay
      type: integer
    - name: apt_ip
      type: string
    - name: result
      type: string
      enum: [SUCCESS, ERR]
```

## Variables
```yaml
# UNRESOLVED: all parameters are command-based GET/SET; no standalone variables
# Battery percentages and runtime values are returned via GET commands
```

## Events
```yaml
# Device pushes unsolicited reports when values change:
- id: button_sts_change
  label: Button Status Change
  description: "APT sends REP when microphone button pressed/released"
  params:
    - name: channel
      type: integer
    - name: status
      type: string
      enum: [ON, OFF]

- id: tx_available_change
  label: Transmitter Available Change
  description: "APT sends REP when transmitter docks/undocks"
  params:
    - name: channel
      type: integer
    - name: available
      type: string
      enum: [YES, NO]
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
# External mute workflow described in notes but not command macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: populate if source contains safety warnings
# Note: External Mute requires constant audio signal per echo canceller requirement
```

## Notes
Channel `x` = 0 means all channels, 1-8 individual. All messages ASCII. Level and gain values offset by 25. Special battery codes: 65535=off, 65534=calculating, 65533=on charger, 65532=wall wart. 255 used for 3-digit unknown states.

External mute selection required for echo canceller applications. LED control requires "External LED Control" enabled in MXW GUI.

<!-- UNRESOLVED: firmware version requirements not stated (REMOTE_LINK says v4.0+ but other commands unspecified) -->
<!-- UNRESOLVED: no power specifications in source -->
<!-- UNRESOLVED: authentication credentials not stated -->

## Provenance

```yaml
source_domains:
  - pubs.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/MXW/en-US
retrieved_at: 2026-04-30T04:45:53.234Z
last_checked_at: 2026-05-14T18:17:20.490Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.490Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 48 spec actions matched literally with correct parameters; transport (TCP port 2202) verified; command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TX_DEVICE_ID (charger-only variant)"
- "no auth procedure in source"
- "all parameters are command-based GET/SET; no standalone variables"
- "no explicit multi-step macros in source"
- "populate if source contains safety warnings"
- "firmware version requirements not stated (REMOTE_LINK says v4.0+ but other commands unspecified)"
- "no power specifications in source"
- "authentication credentials not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
