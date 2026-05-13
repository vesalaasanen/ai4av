---
spec_id: admin/linn-pekin-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Pekin (North America) Control Spec"
manufacturer: Linn
model_family: "Linn Pekin (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Linn Pekin (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
retrieved_at: 2026-05-04T15:18:41.189Z
last_checked_at: 2026-05-04T06:06:39.404Z
generated_at: 2026-05-04T06:06:39.404Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T06:06:39.404Z
  matched_actions: 59
  action_count: 59
  confidence: high
  summary: "All 59 spec actions matched to explicit source commands; complete bidirectional coverage of documented command set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Linn Pekin (North America) Control Spec

## Summary
Linn Pekin is an RS-232 controlled tuner. Communication is ASCII over serial at configurable baud rates (2400–38400, default 9600). Host sends enclosed commands (`$command$`) with optional source/group/destination identifiers; device replies with initial acknowledgement followed by final response. Supports polling for multi-device daisy-chain detection.

<!-- UNRESOLVED: no power on/off commands found in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; configurable: 2400, 4800, 9600, 19200, 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Add only traits supported by evidence from source:
# - powerable       UNRESOLVED: no power on/off commands in source
# - routable        UNRESOLVED: not a routing device
# - queryable       present: TUNE?, SCAN?, BAND?, STEREO?, MONO?, COUNTRY?, STORE?, PRESET?, MUTETHR?, SIGNAL?, MUTE?, IR?, OPTION?, VERSION?, CHECKSUM?, COUNTER POWER?
# - levelable       present: MUTETHR (threshold 0-31), MUTE
```

## Actions
```yaml
# System commands (from section 2)
- id: id_write
  label: ID Write
  kind: action
  params:
    - name: identifier
      type: string
      description: Product identifier (max 20 alphanumeric chars)

- id: id_remove
  label: ID Remove
  kind: action
  params:
    - name: identifier
      type: string

- id: id_query
  label: ID Query
  kind: action
  params: []

- id: gid_write
  label: GID Write
  kind: action
  params:
    - name: identifier
      type: string
      description: Group identifier (max 20 alphanumeric chars)

- id: gid_remove
  label: GID Remove
  kind: action
  params:
    - name: identifier
      type: string

- id: gid_query
  label: GID Query
  kind: action
  params: []

- id: baud
  label: BAUD
  kind: action
  params:
    - name: baudrate
      type: integer
      description: Baud rate from [2400, 4800, 9600, 19200, 38400]

- id: baud_query
  label: BAUD Query
  kind: action
  params: []

- id: reset
  label: RESET
  kind: action
  params: []

- id: echo
  label: ECHO
  kind: action
  params:
    - name: text
      type: string

- id: poll_start
  label: POLL START
  kind: action
  params: []

- id: poll_id
  label: POLL ID
  kind: action
  params: []

- id: poll_sleep
  label: POLL SLEEP
  kind: action
  params: []

- id: poll_done
  label: POLL DONE
  kind: action
  params: []

- id: status
  label: STATUS
  kind: action
  params: []

# Linn Pekin commands (section 3)
- id: tune
  label: TUNE
  kind: action
  params:
    - name: value
      type: integer
      description: Frequency in MHz × 10 (e.g., 9780 for 97.8 MHz); +/− to adjust by 1

- id: tune_plus
  label: TUNE+
  kind: action
  params: []

- id: tune_minus
  label: TUNE-
  kind: action
  params: []

- id: tune_query
  label: TUNE Query
  kind: action
  params: []

- id: scan_mode_query
  label: SCAN MODE Query
  kind: action
  params: []

- id: scan_mode_search
  label: SCAN MODE SEARCH
  kind: action
  params: []

- id: scan_mode_scan
  label: SCAN MODE SCAN
  kind: action
  params: []

- id: scan_minus
  label: SCAN-
  kind: action
  params: []

- id: scan_plus
  label: SCAN+
  kind: action
  params: []

- id: scan_stop
  label: SCAN STOP
  kind: action
  params: []

- id: scan_query
  label: SCAN Query
  kind: action
  params: []

- id: band_am
  label: BAND AM
  kind: action
  params: []

- id: band_fm
  label: BAND FM
  kind: action
  params: []

- id: band_query
  label: BAND Query
  kind: action
  params: []

- id: mono_on
  label: MONO ON
  kind: action
  params: []

- id: mono_off
  label: MONO OFF
  kind: action
  params: []

- id: mono_query
  label: MONO Query
  kind: action
  params: []

- id: store
  label: STORE
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-80

- id: store_query
  label: STORE Query
  kind: action
  params: []

- id: store_all
  label: STORE ALL
  kind: action
  params: []

- id: preset_clear
  label: PRESET CLEAR
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-80

- id: preset_clear_all
  label: PRESET CLEAR ALL
  kind: action
  params: []

- id: preset_minus
  label: PRESET-
  kind: action
  params: []

- id: preset_plus
  label: PRESET+
  kind: action
  params: []

- id: preset
  label: PRESET
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-80

- id: preset_query
  label: PRESET Query
  kind: action
  params: []

- id: mutethr_minus
  label: MUTETHR-
  kind: action
  params: []

- id: mutethr_plus
  label: MUTETHR+
  kind: action
  params: []

- id: mutethr
  label: MUTETHR
  kind: action
  params:
    - name: value
      type: integer
      description: Mute threshold value (0-31)

- id: mutethr_query
  label: MUTETHR Query
  kind: action
  params: []

- id: signal_query
  label: SIGNAL Query
  kind: action
  params: []

- id: mute_on
  label: MUTE ON
  kind: action
  params: []

- id: mute_off
  label: MUTE OFF
  kind: action
  params: []

- id: mute_query
  label: MUTE Query
  kind: action
  params: []

- id: ir_on
  label: IR ON
  kind: action
  params: []

- id: ir_off
  label: IR OFF
  kind: action
  params: []

- id: ir_query
  label: IR Query
  kind: action
  params: []

- id: init
  label: INIT
  kind: action
  params: []

- id: option_query_all
  label: OPTION Query All
  kind: action
  params: []

- id: option_query
  label: OPTION Query
  kind: action
  params:
    - name: number
      type: integer
      description: Option number

- id: option_set
  label: OPTION Set
  kind: action
  params:
    - name: number
      type: integer
      description: Option number
    - name: setting
      type: string
      description: Setting value

- id: version_software_query
  label: VERSION SOFTWARE Query
  kind: action
  params: []

- id: version_hardware_query
  label: VERSION HARDWARE Query
  kind: action
  params: []

- id: checksum_query
  label: CHECKSUM Query
  kind: action
  params: []

- id: counter_power_query
  label: COUNTER POWER Query
  kind: action
  params: []
```

## Feedbacks
```yaml
# Responses are structured: (Source_ID) (Group_ID) (Destination_ID) !<Response> NL
# Initial response: ! for ack, !$FAIL n$ for invalid command
# Final response: !$Status_String$
- id: initial_ack
  type: string
  description: "! response - command received and understood"
- id: initial_fail
  type: string
  description: "!$FAIL n$ - invalid command; n is status code (see Status Codes)"
- id: final_response
  type: string
  description: "!$<status>$ - final response after task completion"
- id: final_fail
  type: string
  description: "!$FAIL n$ - task could not be completed; n is status code"
- id: status_code
  type: integer
  description: Status code 0-47, general use codes 0-23, product-specific 24-47
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
```

## Variables
```yaml
# Settable parameters not discrete actions:
- id: baud_rate
  type: integer
  values: [2400, 4800, 9600, 19200, 38400]
  default: 9600
  description: Serial baud rate - set via $BAUD n$, query via $BAUD ?$

- id: mute_threshold
  type: integer
  range: [0, 31]
  description: Mute threshold - set via $MUTETHR n$, query via $MUTETHR ?$

- id: mono_state
  type: enum
  values: [on, off]
  description: Mono state - set via $MONO Y/N/ON/OFF$, query via $MONO ?$

- id: mute_state
  type: enum
  values: [on, off]
  description: Mute state - set via $MUTE Y/N/ON/OFF$, query via $MUTE ?$

- id: ir_state
  type: enum
  values: [on, off]
  description: IR control state - set via $IR Y/N/ON/OFF$, query via $IR ?$

- id: scan_mode
  type: enum
  values: [SEARCH, SCAN]
  description: Scan mode - set via $SCAN MODE SEARCH/SCAN$, query via $SCAN MODE ?$

- id: scan_status
  type: enum
  values: [STOP, PAUSED, SCANNING]
  description: Scan status - query via $SCAN ?$

- id: frequency
  type: integer
  description: Current frequency in MHz × 10 - query via $TUNE ?$

- id: band
  type: enum
  values: [AM, FM]
  description: Frequency band - set via $BAND AM/FM$, query via $BAND ?$

- id: stereo_status
  type: enum
  values: [ON, OFF]
  description: Stereo status - query via $STEREO ?$

- id: country
  type: enum
  values: [EUROPE, USA, JAPAN]
  description: Country of operation - query via $COUNTRY ?$

- id: signal_strength
  type: integer
  description: Signal strength value - query via $SIGNAL ?$

- id: product_id
  type: string
  description: Product identifier - set/removed via $ID identifier$, query via $ID ?$

- id: group_id
  type: string
  description: Group identifier - set/removed via $GID identifier$, query via $GID ?$
```

## Events
```yaml
# UNRESOLVED: Linn Pekin is a slave device - it does not transmit unsolicited messages
# except: power_up_message feature toggled via front panel - !$PEKIN$ on power-up
# (activated by holding RECORD key and switching on)
```

## Macros
```yaml
# Polling sequence (section 2.3.2) - auto-detect devices on daisy-chain:
# 1. $POLL START$      - opens return path switches
# 2. $POLL ID$        - read first device ID
# 3. @id1@$POLL SLEEP$ - put first device to sleep
# 4. $POLL ID$        - read second device ID
# 5. @id2@$POLL SLEEP$ - put second device to sleep
# ... repeat until timeout ...
# N. $POLL DONE$       - resync all devices
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POLL SLEEP must be used with the product identifier returned by POLL ID - otherwise all products stop responding and polling fails"
  - "In group mode, products do not acknowledge commands to avoid comms clash from all responding simultaneously"
  - "If a product in the daisy-chain is switched off, the chain is broken; removed product requires re-establishment via joining cable"
# UNRESOLVED: power-on sequencing, voltage/current specs not in source
```

## Notes
- Commands are ASCII, enclosed in `$` delimiters: `$COMMAND param$`
- Line terminator: carriage return (0x0D) + line feed (0x0A)
- Host should wait for final response before sending next command (initial response within 10 ms)
- Source, group, and destination identifiers use `#source_id#`, `&group_id&`, `@destination_id@` syntax — all optional (see section 1.3 for combination rules)
- Power-up message: `!$PEKIN$` — can be enabled/disabled via front panel RECORD key + power toggle
- Product default baud: 9600; BAUD change takes effect on final response
- Factory reset: `$INIT$`
- Command help: `$? cmnd$` returns parameter syntax; `$? ?$` returns full command list

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: binary command encodings not applicable — ASCII only -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
retrieved_at: 2026-05-04T15:18:41.189Z
last_checked_at: 2026-05-04T06:06:39.404Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T06:06:39.404Z
matched_actions: 59
action_count: 59
confidence: high
summary: "All 59 spec actions matched to explicit source commands; complete bidirectional coverage of documented command set."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
