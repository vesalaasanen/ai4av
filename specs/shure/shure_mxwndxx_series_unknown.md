---
spec_id: admin/shure-mxwndxx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure MXWNDXx Series Control Spec"
manufacturer: Shure
model_family: "MXWNDXx Series"
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - "MXWNDXx Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
  - content-files.shure.com
  - pubs.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXN5-C
  - https://content-files.shure.com/KnowledgeBaseFiles/dfr22_rs232.pdf
  - https://content-files.shure.com/KnowledgeBaseFiles/p4800_rs232_commands.pdf
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://www.shure.com/en-US/docs/commandstrings/P300
retrieved_at: 2026-04-30T13:38:16.296Z
last_checked_at: 2026-05-18T17:06:28.853Z
generated_at: 2026-05-18T17:06:28.853Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T17:06:28.853Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All 9 spec actions matched their source commands with correct shapes; transport parameters verified; feedbacks account for all GET/query variants."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Shure MXWNDXx Series Control Spec

## Summary
Shure MXW wireless microphone system controlled via Ethernet TCP/IP. Control commands sent to the APT (Access Point) IP address on port 2202. ASCII message format with angle-bracket delimiters. GET/SET/REPORT command pattern. Supports metering, transmitter status, audio gain, LED control, and battery monitoring across up to 8 channels.

<!-- UNRESOLVED: MXWAPT GUI mute preference, external mute detailed configuration not fully documented -->

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
- queryable       # GET commands for status, battery, audio gain
- powerable       # TX_STATUS ACTIVE/MUTE/STANDBY/OFF commands
- levelable       # AUDIO_GAIN with INC/DEC delta commands
```

## Actions
```yaml
- id: flash_apt
  label: Flash APT Lights
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
      description: Flash auto-off after 60 seconds

- id: start_metering
  label: Start Metering
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8, or 0 for all channels
    - name: rate_ms
      type: integer
      description: Metering interval in milliseconds. Minimum 100. 0 turns metering off.

- id: set_tx_status
  label: Set Transmitter Status
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: status
      type: enum
      values:
        - ACTIVE
        - MUTE
        - STANDBY
        - OFF

- id: set_audio_gain
  label: Set Audio Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: value
      type: string
      description: 3-digit ASCII value 000-040 (yyy minus 25 equals GUI value), or INCn/DECn for delta change where n is 1-40 dB

- id: set_led_status
  label: Set Microphone LED Status
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: red
      type: string
      description: Red LED state - ON/OF/ST/FL/PU/NC
    - name: green
      type: string
      description: Green LED state - ON/OF/ST/FL/PU/NC
  note: Only applicable when MXWAPT GUI set to "External LED Control"

- id: flash_microphone
  label: Flash Microphone Lights
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
      description: Flash auto-off after 60 seconds

- id: set_channel_name
  label: Set Channel Name
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 1-8
    - name: name
      type: string
      description: 1-31 character channel name

- id: set_device_id
  label: Set Device ID
  kind: action
  params:
    - name: device_id
      type: string
      description: 1-31 character device ID

- id: flash_charger
  label: Flash Charger Lights
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
      description: Flash auto-off after 60 seconds. Send to MXWNCS charger IP address.
```

## Feedbacks
```yaml
- id: chan_name_report
  label: Channel Name Report
  type: string
  description: 31-character channel name

- id: device_id_report
  label: Device ID Report
  type: string
  description: 31-character device ID

- id: flash_report
  label: Flash Report
  type: enum
  values: ["ON", "OFF"]

- id: meter_rate_report
  label: Meter Rate Report
  type: integer
  description: Metering interval in milliseconds

- id: metering_sample
  label: Metering Sample
  type: string
  description: "SAMPLEx aaa eee - aaa=RF level 000-096, eee=audio level 000-098"

- id: tx_available
  label: Transmitter Available
  type: enum
  values: [YES, NO]
  description: YES when microphone available, NO when off/unlinked/connecting

- id: tx_status
  label: Transmitter Status
  type: enum
  values: [ACTIVE, MUTE, STANDBY, ON_CHARGER, UNKNOWN]
  description: ACTIVE=undocked/powered on/unmuted. MUTE=undocked/powered on/muted. STANDBY=undocked/in standby/muted. ON_CHARGER=docked.

- id: audio_gain_report
  label: Audio Gain Report
  type: integer
  description: ASCII 000-040, subtract 25 for GUI value

- id: button_sts
  label: Microphone Button Status
  type: enum
  values: [ON, OFF]
  description: ON=pressed, OFF=released. Sent unsolicited when button state changes.

- id: led_status_report
  label: LED Status Report
  type: string
  description: 4-character rrgg - red LED state and green LED state. Values: ON/OF/ST/FL/PU/NC

- id: tx_type
  label: Transmitter Type
  type: enum
  values: [MXW1, MXW2, MXW6, MXW8]

- id: batt_charge
  label: Battery Charge Percent
  type: integer
  description: 0-100 percentage. 255 when microphone is off.

- id: batt_run_time
  label: Battery Run Time
  type: integer
  description: Minutes until microphone turns off. Special values: 65532=wall wart charger, 65533=on charger, 65534=calculating, 65535=off.

- id: batt_health
  label: Battery Health
  type: integer
  description: Percentage of factory original capacity. 255 when transmitter is off.

- id: batt_time_to_full
  label: Battery Time To Full
  type: integer
  description: Minutes until fully charged. 65535=off, 65533=on and not on charger, 65534=fully charged.

- id: error_report
  label: Error Report
  type: string
  description: "< REP ERR >" - command not implementable (typo or non-existent command)
```

## Variables
```yaml
# No discrete settable parameters separate from Actions - all parameters
# are Action params. Remove section if not applicable.
```

## Events
```yaml
# Unsolicited notifications the device sends.
# The MXWAPT sends REPORT commands when parameters change via front panel or GUI.
# Key unsolicited events:
- id: button_state_change
  label: Button State Change
  description: "< REP x BUTTON_STS ON/OFF >" - sent when microphone button pressed/released
  unsolicited: true

- id: tx_available_change
  label: Transmitter Available Change
  description: "< REP x TX_AVAILABLE YES/NO >" - sent when mic becomes available/unavailable
  unsolicited: true

- id: parameter_change
  label: Parameter Change
  description: Most parameters send REPORT when changed via front panel or GUI. No need to continuously poll battery or button status.
  unsolicited: true
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.

- id: monitor_mic_after_availability
  label: Monitor Microphone After Availability Change
  description: |
    When TX_AVAILABLE changes from NO to YES, query all relevant mic parameters:
    1. Control System sends: < GET 1 TX_STATUS >
    2. Control System sends: < GET 1 AUDIO_GAIN >
    3. Control System sends: < GET 1 BATT_RUN_TIME >
    4. Control System sends: < GET 1 BATT_CHARGE >
    5. Control System sends: < GET 1 BATT_HEALTH >
    6. Control System sends: < GET 1 BUTTON_STS >
    7. Control System sends: < GET 1 LED_STATUS >
    8. Control System sends: < GET 1 TX_TYPE >

- id: external_mute_momentary
  label: External Mute - Momentary Push to Talk
  description: |
    Requires MXWAPT GUI "Preferences" tab "Mute Preference" set to "External Mute".
    1. User pushes Mic button → APT sends < REP 1 BUTTON_STS ON >
    2. Control System sends command to Mixer to unmute channel 1
    3. Mixer confirms unmuted to Control System
    4. Control System sends < SET 1 LED_STATUS OF ON > (Red off, Green on for Mic #1)
    5. User releases button → APT sends < REP 1 BUTTON_STS OFF >
    6. Control System sends command to Mixer to mute channel 1
    7. Mixer confirms muted to Control System
    8. Control System sends < SET 1 LED_STATUS ON OF > (Red on, Green off for Mic #1)
  note: Switch Behavior (toggle vs latching) determined by Crestron/AMX code when using External Mute.

- id: external_mute_latching
  label: External Mute - Latching Switch
  description: |
    Requires MXWAPT GUI "Preferences" tab "Mute Preference" set to "External Mute".
    1. User pushes and releases Mic button → APT sends < REP 1 BUTTON_STS ON > then < REP 1 BUTTON_STS OFF >
    2. Control System sends command to Mixer to mute channel 1
    3. Mixer confirms muted to Control System
    4. Control System sends < SET 1 LED_STATUS ON OF > (Red on, Green off for Mic #1)
    5. User pushes and releases Mic button again → APT sends < REP 1 BUTTON_STS ON > then < REP 1 BUTTON_STS OFF >
    6. Control System sends command to Mixer to unmute channel 1
    7. Mixer confirms unmuted to Control System
    8. Control System sends < SET 1 LED_STATUS OF ON > (Red off, Green on for Mic #1)
  note: Switch Behavior (toggle vs latching) determined by Crestron/AMX code when using External Mute.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: charger_ip_before_apt
    description: Set Charger IP address before setting APT IP address. Required for static IP configuration.
    procedure: "MXW User Guide - set Charger IP first, then APT IP"
  - id: external_led_control
    description: "To control LED on microphone, ensure 'External LED Control' is selected in MXW GUI. Gooseneck mics have separate selection for MX400 Series Bi-color LED vs MX400R Series Red LED."
  - id: echo_canceller_audio
    description: Echo canceller/mixer applications require constant audio signal. Microphone must supply audio continuously for proper audio signal path processing.
# UNRESOLVED: power voltage specifications, fault recovery sequences, firmware compatibility ranges not stated in source
```

## Notes
Channel number `x` in commands is ASCII 1-8. Using 0 reports all channels. All messages are ASCII with angle-bracket delimiters `< >`. `yyyyyyyy` placeholders are 31-character strings for device/channel names. Special battery codes: 65532=wall wart charger power, 65533=on charger/not charging, 65534=calculating run time/fully charged, 65535=transmitter off. LED state values: ON=On, OF=Off, ST=Strobe, FL=Flash, PU=Pulse, NC=No Change. Metering minimum interval is 100ms, off by default. Flash auto-off after 60 seconds. Codes 255, 254, 253, 252 are special codes for 3-digit numbers; 65535, 65534, 65533, 65532 are special codes for 5-digit numbers — indicate device unavailable.

<!-- UNRESOLVED: detailed mute preference GUI configuration steps, echo canceller mixer model compatibility, fault error recovery sequences, firmware version compatibility -->

## Provenance

```yaml
source_domains:
  - shure.com
  - content-files.shure.com
  - pubs.shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/MXN5-C
  - https://content-files.shure.com/KnowledgeBaseFiles/dfr22_rs232.pdf
  - https://content-files.shure.com/KnowledgeBaseFiles/p4800_rs232_commands.pdf
  - https://pubs.shure.com/command-strings/MXW/en-US
  - https://www.shure.com/en-US/docs/commandstrings/P300
retrieved_at: 2026-04-30T13:38:16.296Z
last_checked_at: 2026-05-18T17:06:28.853Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T17:06:28.853Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All 9 spec actions matched their source commands with correct shapes; transport parameters verified; feedbacks account for all GET/query variants."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
