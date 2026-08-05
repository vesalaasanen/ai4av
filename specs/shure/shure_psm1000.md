---
spec_id: admin/shure-psm1000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure PSM1000 Control Spec"
manufacturer: Shure
model_family: PSM1000
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - PSM1000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pubs.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/PSM1000/en-US
retrieved_at: 2026-07-16T14:03:43.473Z
last_checked_at: 2026-07-22T01:10:15.440Z
generated_at: 2026-07-22T01:10:15.440Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off commands not present in source"
  - "no standalone settable parameters distinct from actions found in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "no serial/RS-232 config (TCP only per source)"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:10:15.440Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions (10 SET, 10 GET) matched verbatim in source; transport parameters (TCP, port 2202) verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Shure PSM1000 Control Spec

## Summary
Shure PSM1000 wireless in-ear monitor transmitter. Controlled via Ethernet (TCP/IP) on port 2202. ASCII message protocol with `<...>` envelope and CRLF terminator. Supports SET/GET/REPORT command pattern for channel and box parameters.

<!-- UNRESOLVED: power on/off commands not present in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202  # stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: GET commands present returning REPORT responses
- levelable  # inferred: AUDIO_IN_LVL, RF_TX_LVL support SET level commands
```

## Actions
```yaml
# --- SET commands (channel = x; box params have no channel) ---
- id: set_device_name
  label: Set Device Name
  kind: action
  command: "< SET DEVICE_NAME {name} >"  # box parameter: no channel number
  params:
    - name: name
      type: string
      description: New device name (box parameter, no channel number)

- id: set_channel_name
  label: Set Channel Name
  kind: action
  command: "< SET {channel} CHAN NAME {name} >"  # source SET row uses "CHAN NAME" (two words)
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: name
      type: string
      description: New channel name

- id: set_audio_level
  label: Set Audio Level
  kind: action
  command: "< SET {channel} AUDIO_IN_LVL {level} >"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: level
      type: string
      description: Audio level value

- id: set_group_channel
  label: Set Transmitter Group & Channel
  kind: action
  command: "< SET {channel} GROUP_CHAN {group_channel} >"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group_channel
      type: string
      description: Format "gg,cc" (group, channel)

- id: set_frequency
  label: Set Transmitter Frequency
  kind: action
  command: "< SET {channel} FREQUENCY {frequency} >"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: frequency
      type: string
      description: Frequency value in Hz

- id: set_rf_tx_level
  label: Set RF Tx Level
  kind: action
  command: "< SET {channel} RF_TX_LVL {level} >"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: level
      type: string
      description: RF transmission power level

- id: set_rf_mute
  label: Set RF Mute
  kind: action
  command: "< SET {channel} RF_MUTE {mute} >"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: mute
      type: integer
      description: "1 = mute, 0 = unmute"

- id: set_audio_tx_mode
  label: Set Audio Tx Mode
  kind: action
  command: "< SET {channel} AUDIO_TX_MODE {mode} >"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: mode
      type: integer
      description: "1 = mono, 2 = point to point, 3 = stereo"

- id: set_audio_input_line_level
  label: Set Audio Input Line Level
  kind: action
  command: "< SET {channel} AUDIO_IN_LINE_LVL {level} >"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: level
      type: integer
      description: "0 = off (Aux), 1 = on (Line)"

- id: set_metering_rate
  label: Set Metering Rate
  kind: action
  command: "< SET {channel} METER_RATE {rate} >"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: rate
      type: string
      description: "0 = off, value in milliseconds"

# --- GET query commands (added in upgrade pass: previously missing) ---
- id: get_device_name
  label: View Transmitter Name
  kind: query
  command: "< GET DEVICE_NAME >"  # box parameter: no channel number
  params: []

- id: get_channel_name
  label: Get Channel Name
  kind: query
  command: "< GET {channel} CHAN NAME >"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: get_audio_level
  label: View Audio Level
  kind: query
  command: "< GET {channel} AUDIO_IN_LVL >"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: get_group_channel
  label: View Transmitter Group & Channel
  kind: query
  command: "< GET {channel} GROUP_CHAN >"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: get_frequency
  label: View Transmitter Frequency
  kind: query
  command: "< GET {channel} FREQUENCY >"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: get_rf_tx_level
  label: View RF Tx Level
  kind: query
  command: "< GET {channel} RF_TX_LVL >"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: get_rf_mute
  label: View RF Mute
  kind: query
  command: "< GET {channel} RF_MUTE >"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: get_audio_tx_mode
  label: View Audio Tx Mode
  kind: query
  command: "< GET {channel} AUDIO_TX_MODE >"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: get_audio_input_line_level
  label: View Audio Input Line Level
  kind: query
  command: "< GET {channel} AUDIO_IN_LINE_LVL >"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: get_metering_rate
  label: View Metering Rate
  kind: query
  command: "< GET {channel} METER_RATE >"
  params:
    - name: channel
      type: integer
      description: Channel number
```

## Feedbacks
```yaml
- id: device_name_report
  label: Device Name Report
  kind: feedback
  params:
    - name: name
      type: string

- id: channel_name_report
  label: Channel Name Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: name
      type: string

- id: audio_level_report
  label: Audio Level Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: level
      type: string

- id: group_channel_report
  label: Group & Channel Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: group_channel
      type: string

- id: frequency_report
  label: Frequency Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: frequency
      type: string

- id: rf_tx_level_report
  label: RF Tx Level Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: level
      type: string

- id: rf_mute_report
  label: RF Mute Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: mute
      type: integer

- id: audio_tx_mode_report
  label: Audio Tx Mode Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: mode
      type: integer

- id: audio_input_line_level_report
  label: Audio Input Line Level Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: level
      type: integer

- id: metering_rate_report
  label: Metering Rate Report
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: rate
      type: string

- id: audio_meter_level
  label: Audio Meter Level
  kind: feedback
  params:
    - name: channel
      type: integer
    - name: left
      type: string
    - name: right
      type: string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters distinct from actions found in source
```

## Events
```yaml
# REPORT strings are also sent unsolicited when a parameter changes on the device itself,
# but source documents no separate event/notification command set beyond REPORT.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Message syntax: ASCII enclosed in `<`...`>` with space after opening bracket and before closing bracket. Terminated by CRLF (`0x0D0A`). Channel parameters include channel number (e.g., `< SET 1 FREQUENCY 578000 >`). Box parameters (DEVICE_NAME) have no channel number.

REPORT sent in response to SET or GET, and also when parameter changed on device.

Audio meter level sends left and right channel values as separate REPORT messages (mnemonics AUDIO_IN_LVL_L and AUDIO_IN_LVL_R per source).

Source SET row uses the two-word mnemonic `CHAN NAME` for Set Channel Name; the corresponding REPORT uses the underscore form `CHAN_NAME`. Both forms verbatim from source.

Setting GROUP_CHAN also yields a FREQUENCY REPORT (source row returns both REPORT x FREQUENCY and REPORT x GROUP_CHAN); setting FREQUENCY likewise yields a GROUP_CHAN REPORT (`--,--` placeholder). Implementers should expect the paired response.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: power on/off commands not present in source -->
<!-- UNRESOLVED: no serial/RS-232 config (TCP only per source) -->
````

Changes:
- Added `command:` payloads (verbatim, incl. `< >` envelope) to all 10 existing SET actions
- Added 10 new `get_*` query actions — previously absent, closes coverage gap
- Preserved all existing IDs, params, feedbacks, transport
- Noted CHAN NAME vs CHAN_NAME discrepancy + paired FREQUENCY/GROUP_CHAN REPORT behavior in Notes

## Provenance

```yaml
source_domains:
  - pubs.shure.com
source_urls:
  - https://pubs.shure.com/command-strings/PSM1000/en-US
retrieved_at: 2026-07-16T14:03:43.473Z
last_checked_at: 2026-07-22T01:10:15.440Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:10:15.440Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions (10 SET, 10 GET) matched verbatim in source; transport parameters (TCP, port 2202) verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off commands not present in source"
- "no standalone settable parameters distinct from actions found in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "no serial/RS-232 config (TCP only per source)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
