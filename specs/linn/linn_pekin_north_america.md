---
spec_id: admin/linn-pekin-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Pekin Control Spec"
manufacturer: Linn
model_family: Pekin
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - Pekin
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
source_urls:
  - http://docs.linn.co.uk/wiki/images/7/79/Pekin_rs232_commands.pdf
retrieved_at: 2026-05-04T15:18:41.189Z
last_checked_at: 2026-06-02T17:23:15.043Z
generated_at: 2026-06-02T17:23:15.043Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial data_bits, parity, stop_bits, flow_control not stated in source"
  - "not stated in source"
  - "source has no explicit safety warnings or interlock procedures"
  - "serial data_bits/parity/stop_bits/flow_control not stated; firmware version compatibility ranges not stated; status codes 25 (0x1A) and 26–47 reserved but not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:15.043Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions matched literals in source; transport parameters verified; spec fully represents all source command families. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Linn Pekin Control Spec

## Summary
RS-232 ASCII control spec for Linn Pekin AM/FM tuner (North America region). Slave device — replies only after host command. Messages wrapped in `$...$` delimiters, terminated CR+LF. Initial response within 10 ms, then final response. Supports device/group/destination identifiers and polling for daisy-chained links.

<!-- UNRESOLVED: serial data_bits, parity, stop_bits, flow_control not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; settable to 2400/4800/9600/19200/38400 via $BAUD$
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

Message framing: line-terminated ASCII. Each command enclosed in `$...$`, terminated with CR LF (0x0D 0x0A). Optional prefix identifiers: `#source_id#` `&group_id&` `@destination_id@` (each ≤20 alnum chars, no spaces inside).

## Traits
```yaml
- queryable  # inferred from query commands (TUNE?, BAND?, etc.)
```

## Actions
```yaml
# --- System / Identity (Section 2) ---
- id: id_write
  label: Write Product Identifier
  kind: action
  command: "$ID identifier$"
  params:
    - name: identifier
      type: string
      description: Unique product id, ≤20 alnum chars

- id: id_remove
  label: Remove Product Identifier
  kind: action
  command: "$ID ~ identifier$"
  params:
    - name: identifier
      type: string

- id: id_query
  label: Return Product Identifier
  kind: query
  command: "$ID ?$"
  params: []

- id: gid_write
  label: Write Group Identifier
  kind: action
  command: "$GID identifier$"
  params:
    - name: identifier
      type: string

- id: gid_remove
  label: Remove From Group
  kind: action
  command: "$GID ~ identifier$"
  params:
    - name: identifier
      type: string

- id: gid_query
  label: Return Group Identifiers
  kind: query
  command: "$GID ?$"
  params: []

- id: baud_set
  label: Set Baud Rate
  kind: action
  command: "$BAUD baudrate$"
  params:
    - name: baudrate
      type: enum
      values: [2400, 4800, 9600, 19200, 38400]

- id: baud_query
  label: Return Baud Rate
  kind: query
  command: "$BAUD ?$"
  params: []

- id: reset
  label: Reset Communications Buffer
  kind: action
  command: "$RESET$"
  params: []

- id: echo
  label: Echo Text
  kind: action
  command: "$ECHO text$"
  params:
    - name: text
      type: string

- id: poll_start
  label: Poll Start
  kind: action
  command: "$POLL START$"
  params: []

- id: poll_id
  label: Poll ID
  kind: query
  command: "$POLL ID$"
  params: []

- id: poll_sleep
  label: Poll Sleep
  kind: action
  command: "@destination_id@$POLL SLEEP$"
  params:
    - name: destination_id
      type: string

- id: poll_done
  label: Poll Done
  kind: action
  command: "$POLL DONE$"
  params: []

- id: status_query
  label: Last Command Status
  kind: query
  command: "$STATUS$"
  params: []

# --- Command Help (Section 1.4.1.1) ---
- id: help_command
  label: Command Help (specific command)
  kind: query
  command: "$? cmnd$"
  params:
    - name: cmnd
      type: string

- id: help_commandset
  label: Command Set Help
  kind: query
  command: "$? ?$"
  params: []

# --- TUNE (Section 3.3.1) ---
- id: tune_decrease
  label: Decrease Frequency
  kind: action
  command: "$TUNE -$"
  params: []

- id: tune_increase
  label: Increase Frequency
  kind: action
  command: "$TUNE +$"
  params: []

- id: tune_select
  label: Select Frequency
  kind: action
  command: "$TUNE n$"
  params:
    - name: n
      type: integer
      description: Frequency in 10 kHz units, e.g. 97.8 MHz = 9780

- id: tune_query
  label: Return Current Frequency
  kind: query
  command: "$TUNE ?$"
  params: []

# --- SCAN (Section 3.3.2) ---
- id: scan_mode_query
  label: Return Scan Mode
  kind: query
  command: "$SCAN MODE ?$"
  params: []

- id: scan_mode_search
  label: Select Single Scan Mode
  kind: action
  command: "$SCAN MODE SEARCH$"
  params: []

- id: scan_mode_scan
  label: Select Repeat Scan Mode
  kind: action
  command: "$SCAN MODE SCAN$"
  params: []

- id: scan_decrease
  label: Scan Down
  kind: action
  command: "$SCAN -$"
  params: []

- id: scan_increase
  label: Scan Up
  kind: action
  command: "$SCAN +$"
  params: []

- id: scan_stop
  label: Stop Scan
  kind: action
  command: "$SCAN STOP$"
  params: []

- id: scan_status
  label: Return Scan Status
  kind: query
  command: "$SCAN ?$"
  params: []

# --- BAND (Section 3.3.3) ---
- id: band_am
  label: Select AM Band
  kind: action
  command: "$BAND AM$"
  params: []

- id: band_fm
  label: Select FM Band
  kind: action
  command: "$BAND FM$"
  params: []

- id: band_query
  label: Return Current Band
  kind: query
  command: "$BAND ?$"
  params: []

# --- STEREO (Section 3.3.4) ---
- id: stereo_query
  label: Return Stereo Status
  kind: query
  command: "$STEREO ?$"
  params: []

# --- MONO (Section 3.3.5) ---
- id: mono_enable
  label: Enable Mono
  kind: action
  command: "$MONO Y$"
  params: []

- id: mono_disable
  label: Disable Mono
  kind: action
  command: "$MONO N$"
  params: []

- id: mono_query
  label: Return Mono Status
  kind: query
  command: "$MONO ?$"
  params: []

# --- COUNTRY (Section 3.3.6) ---
- id: country_query
  label: Return Country of Operation
  kind: query
  command: "$COUNTRY ?$"
  params: []

# --- STORE (Section 3.3.7) ---
- id: store_preset
  label: Store Preset
  kind: action
  command: "$STORE n$"
  params:
    - name: n
      type: integer
      description: Preset number (1 to 80)

- id: store_query
  label: Return Empty Preset
  kind: query
  command: "$STORE ?$"
  params: []

- id: store_all
  label: Store All Presets
  kind: action
  command: "$STORE ALL$"
  params: []

# --- PRESET (Section 3.3.8) ---
- id: preset_clear
  label: Clear Preset
  kind: action
  command: "$PRESET CLEAR n$"
  params:
    - name: n
      type: integer
      description: Preset number (1 to 80)

- id: preset_clear_all
  label: Clear All Presets
  kind: action
  command: "$PRESET CLEAR ALL$"
  params: []

- id: preset_previous
  label: Previous Preset
  kind: action
  command: "$PRESET -$"
  params: []

- id: preset_next
  label: Next Preset
  kind: action
  command: "$PRESET +$"
  params: []

- id: preset_select
  label: Select Preset
  kind: action
  command: "$PRESET n$"
  params:
    - name: n
      type: integer
      description: Preset number (1 to 80)

- id: preset_query
  label: Return Current Preset
  kind: query
  command: "$PRESET ?$"
  params: []

# --- MUTETHR (Section 3.3.9) ---
- id: mutethr_decrease
  label: Decrease Mute Threshold
  kind: action
  command: "$MUTETHR -$"
  params: []

- id: mutethr_increase
  label: Increase Mute Threshold
  kind: action
  command: "$MUTETHR +$"
  params: []

- id: mutethr_set
  label: Set Mute Threshold
  kind: action
  command: "$MUTETHR n$"
  params:
    - name: n
      type: integer
      description: Mute threshold value (0 to 31)

- id: mutethr_query
  label: Return Mute Threshold
  kind: query
  command: "$MUTETHR ?$"
  params: []

# --- SIGNAL (Section 3.3.10) ---
- id: signal_query
  label: Return Signal Strength
  kind: query
  command: "$SIGNAL ?$"
  params: []

# --- MUTE (Section 3.3.11) ---
- id: mute_enable
  label: Enable Mute
  kind: action
  command: "$MUTE Y$"
  params: []

- id: mute_disable
  label: Disable Mute
  kind: action
  command: "$MUTE N$"
  params: []

- id: mute_query
  label: Return Mute Status
  kind: query
  command: "$MUTE ?$"
  params: []

# --- IR (Section 3.3.12) ---
- id: ir_enable
  label: Enable IR Control
  kind: action
  command: "$IR Y$"
  params: []

- id: ir_disable
  label: Disable IR Control
  kind: action
  command: "$IR N$"
  params: []

- id: ir_query
  label: Return IR Control Status
  kind: query
  command: "$IR ?$"
  params: []

# --- INIT (Section 3.3.13) ---
- id: init_factory_defaults
  label: Factory Defaults Reset
  kind: action
  command: "$INIT$"
  params: []

# --- OPTION (Section 3.3.14) ---
- id: option_query_all
  label: Return All Options
  kind: query
  command: "$OPTION ?$"
  params: []

- id: option_query_one
  label: Return Specific Option
  kind: query
  command: "$OPTION number ?$"
  params:
    - name: number
      type: integer

- id: option_set
  label: Set Option
  kind: action
  command: "$OPTION number setting$"
  params:
    - name: number
      type: integer
    - name: setting
      type: string
      description: Product will restart after option change

# --- VERSION (Section 3.3.15) ---
- id: version_software
  label: Return Software Version
  kind: query
  command: "$VERSION SOFTWARE ?$"
  params: []

- id: version_hardware
  label: Return Hardware Version
  kind: query
  command: "$VERSION HARDWARE ?$"
  params: []

# --- CHECKSUM (Section 3.3.16) ---
- id: checksum_query
  label: Return Software Checksum
  kind: query
  command: "$CHECKSUM ?$"
  params: []

# --- COUNTER (Section 3.3.17) ---
- id: counter_power_query
  label: Return Total Powered Time
  kind: query
  command: "$COUNTER POWER ?$"
  params: []
```

## Feedbacks
```yaml
# Each query/response enumerated in source.
- id: baud_rate
  type: enum
  values: [2400, 4800, 9600, 19200, 38400]

- id: scan_mode
  type: enum
  values: [SEARCH, SCAN]

- id: scan_status
  type: enum
  values: [STOP, PAUSED, SCANNING]

- id: band
  type: enum
  values: [AM, FM]

- id: stereo_state
  type: enum
  values: [ON, OFF]

- id: mono_state
  type: enum
  values: [ON, OFF]

- id: country
  type: enum
  values: [EUROPE, USA, JAPAN]

- id: preset_index
  type: integer
  description: Preset number 1 to 80

- id: mute_threshold
  type: integer
  description: 0 to 31

- id: signal_strength
  type: integer

- id: mute_state
  type: enum
  values: [ON, OFF]

- id: ir_state
  type: enum
  values: [ON, OFF]

- id: frequency_tune
  type: integer
  description: Frequency in 10 kHz units (decimal point removed)

- id: option_settings
  type: string
  description: number:setting pairs separated by spaces

- id: software_version
  type: string
  description: Format SpppMMmm (ppp=product, MM=major, mm=minor)

- id: hardware_version
  type: string
  description: Format PCAShhhLr (hhh=board, r=revision)

- id: software_checksum
  type: string
  description: 4-digit hex

- id: power_on_time
  type: string
  description: Format days:hours:minutes:seconds

- id: status_code
  type: integer
  description: See Section 2.4.1.1 (0x00 = no error, 0x01-0x17 = specific errors)

- id: product_identifier
  type: string

- id: group_identifiers
  type: string
  description: List of currently defined group ids
```

## Variables
```yaml
# None - all settable parameters are modeled as discrete actions above.
```

## Events
```yaml
- id: power_up_message
  description: |
    Transmitted on power-up when feature is enabled. Toggled by holding
    RECORD key on front panel while switching product on. Front panel shows
    'rS232 - on' (enabled) or 'rS232 - oFF' (disabled).
  payload: "!$PEKIN$"

- id: initial_response
  description: |
    Acknowledges valid command receipt. Format:
    (Source_ID) (Group_ID) (Destination_ID) !NL
    Expected within 10 ms of command.

- id: initial_response_failure
  description: |
    Returned for invalid command. Format:
    (Source_ID) (Group_ID) (Destination_ID) !$FAIL n$NL
    No final response follows.

- id: final_response
  description: |
    Returned on task completion. Format:
    (Source_ID) (Group_ID) (Destination_ID) !$Status_String$NL

- id: final_response_failure
  description: |
    Returned when task could not complete. Format:
    (Source_ID) (Group_ID) (Destination_ID) !$FAIL n$NL
```

## Macros
```yaml
# Polling sequence (Section 2.3.2) - explicit multi-step example from source.
- id: poll_enumerate
  description: |
    Auto-detect all devices on daisy-chained RS-232 link. Open all return
    path switches, then iteratively identify and put each device to sleep
    until none respond. Close with POLL DONE to resync.
  steps:
    - command: "$POLL START$"
      description: Open return path switches; only first device in chain can respond
    - command: "$POLL ID$"
      description: Read first product identifier (pid)
    - command: "@dest_1_id@$POLL SLEEP$"
      description: Put first device to sleep using id from previous step
    - command: "$POLL ID$"
      description: Read second product identifier
    - command: "@dest_2_id@$POLL SLEEP$"
      description: Put second device to sleep
    - command: "$POLL ID$"
      description: Repeat until no response (timeout)
    - command: "$POLL DONE$"
      description: Resync all products on link
```

## Safety
```yaml
confirmation_required_for:
  - $INIT$  # factory defaults reset
  - $PRESET CLEAR n$
  - $PRESET CLEAR ALL$
  - $OPTION number setting$  # triggers product restart
interlocks: []
<!-- UNRESOLVED: source has no explicit safety warnings or interlock procedures -->
```

## Notes
Baud rate defaults to 9600 on init. `$BAUD$` issues initial response at current rate, final response at new rate. Group mode: products sharing a group id do not acknowledge commands (avoids response clash). A product may be a member of at most 5 groups. On power-up all return-path switches are closed. If a chained product is powered off or removed, the chain breaks. Commands and parameters must be separated by at least one space. `Y`/`ON` enables a feature, `N`/`OFF` disables. Status codes 0–47 reserved; 25–47 marked reserved in source.

<!-- UNRESOLVED: serial data_bits/parity/stop_bits/flow_control not stated; firmware version compatibility ranges not stated; status codes 25 (0x1A) and 26–47 reserved but not enumerated in source -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
source_urls:
  - http://docs.linn.co.uk/wiki/images/7/79/Pekin_rs232_commands.pdf
retrieved_at: 2026-05-04T15:18:41.189Z
last_checked_at: 2026-06-02T17:23:15.043Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:15.043Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions matched literals in source; transport parameters verified; spec fully represents all source command families. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial data_bits, parity, stop_bits, flow_control not stated in source"
- "not stated in source"
- "source has no explicit safety warnings or interlock procedures"
- "serial data_bits/parity/stop_bits/flow_control not stated; firmware version compatibility ranges not stated; status codes 25 (0x1A) and 26–47 reserved but not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
