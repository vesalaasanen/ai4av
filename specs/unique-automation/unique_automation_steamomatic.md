---
spec_id: admin/unique-automation-steamomatic
schema_version: ai4av-public-spec-v1
revision: 1
title: "Unique Automation SteamOmatic Control Spec"
manufacturer: "Unique Automation"
model_family: SteamOmatic
aliases: []
compatible_with:
  manufacturers:
    - "Unique Automation"
  models:
    - SteamOmatic
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - uniqueautomation.eu
  - applicationmarket.crestron.com
source_urls:
  - https://uniqueautomation.eu/wp-content/uploads/2021/05/steamomatic_protocol.pdf
  - https://applicationmarket.crestron.com/content/Help/Unique_Automation/uniqueautomationsteamomaticv1.0help.pdf
  - https://applicationmarket.crestron.com/unique-automation-steamomatic/
retrieved_at: 2026-04-29T19:58:45.047Z
last_checked_at: 2026-06-02T07:06:47.765Z
generated_at: 2026-06-02T07:06:47.765Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the \"Bathomatic\" device family (device ID `BOM`) in the UADDS examples. The SteamOmatic is presumed to share the BOM2 protocol but is not explicitly named in the BOM2 protocol section."
  - "no safety warnings, interlocks, or power-on sequencing procedures documented in the source."
  - "positional offsets 9-11, 15, 18-19, 21-22, 29, 31-32, 34 are"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility range not stated for SteamOmatic."
  - "device family ID prefix for SteamOmatic in UADDS responses (source only shows Bathomatic `BOM`/`BOME`)."
  - "power-on default state and recovery behavior after TCP reconnect not documented."
  - "max concurrent TCP connections on ports 23/24 not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:47.765Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 spec actions matched exactly in source commands and queries lists; transport parameters verified in protocol section. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Unique Automation SteamOmatic Control Spec

## Summary
The Unique Automation SteamOmatic is a steam/shower control unit that uses the BOM2 protocol over TCP (ports 23, 24) for command/response control. A companion UDP-based Unique Automation Discovery Device Service (UADDS) on ports 30303/30304 supports LAN device discovery. Frame format: `STI2_NNN[!|?]<0x0d>` for client frames, `OK_NNN[... ]<0x0d>` for device responses.

<!-- UNRESOLVED: source describes the "Bathomatic" device family (device ID `BOM`) in the UADDS examples. The SteamOmatic is presumed to share the BOM2 protocol but is not explicitly named in the BOM2 protocol section. -->
<!-- UNRESOLVED: no safety warnings, interlocks, or power-on sequencing procedures documented in the source. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 23        # stated in source "Ports 23, 24"
  # Port 24 also stated; both available for client connections
auth:
  type: none  # inferred: no auth procedure in source
```

### UADDS discovery (UDP)
```yaml
# Distinct from command/response channel. Documented separately because
# the protocol differs (UDP broadcast, single-string query/response).
udp_discovery:
  basic:
    port: 30303
    query: "uadisc"
    # Response: HH H vvvvvv MMMMMMMMMMMM <hostnamestring\0>
    # HH = device family ID (BOM = Bathomatic per source example)
  extended:
    port: 30304
    query: "uadisc"
    # Response: HHHE vvvvvv MMMMMMMMMMMM IIIIIIII p1p2p3p4p5 <hostnamestring\0>
```

### Frame structure
All command/response frames on TCP are ASCII terminated by `<0x0d>` (carriage return).
- Command: `STI2_NNN[!|<params>!]` where NNN = command number
- Query: `STI2_NNN[?|<params>?]`
- Response: `OK_NNN[<params>]` (params present for queries 001, 002, 003; absent for command acks)

## Traits
```yaml
- queryable  # inferred: query commands 001, 002, 003 present
- levelable  # inferred: volume / treble / bass / brightness control present
- routable   # inferred: audio port input switching (cmd 005) present
```

## Actions
```yaml
# Each entry below corresponds to one row in the source "Commands List" or
# "Queries List" table. 8 commands + 3 queries = 11 actions.

# --- Commands (set operations) ---

- id: set_desired_values
  label: Desired Values
  kind: action
  command: "STI2_001_{temperature_4d}{time_1d}!"
  description: >
    Set desired temperature (°F, 4 digits) and run time (minutes, 1 digit).
    Example from source: STI2_001_08807! → 88°F, 7 min.
  params:
    - name: temperature_4d
      type: integer
      description: Desired temperature in °F, 4 digits (range starts at 39°F per source)
    - name: time_1d
      type: integer
      description: Run time in minutes, 1 digit
  notes: >
    Per source, temperature is ALWAYS sent in Fahrenheit. To leave a numeric
    parameter unchanged, send a non-digit character in its slot and the
    parameter is ignored (e.g. STI2_001_025AA! changes only the temperature).

- id: set_colour_values
  label: Colour Values
  kind: action
  command: "STI2_002_{colour_index_2d}{brightness_2d}!"
  description: Change colour and brightness.
  params:
    - name: colour_index_2d
      type: integer
      description: Colour index (2 digits); real colour mapping in source appendix
    - name: brightness_2d
      type: integer
      description: Brightness value (2 digits)
  notes: Same ignore-non-digit rule as command 001.

- id: set_audio_settings
  label: Audio Settings
  kind: action
  command: "STI2_003_{volume_3d}{treble_2d}{bass_2d}{balance_sign_1c}{balance_2d}!"
  description: Change volume, treble, bass, balance.
  params:
    - name: volume_3d
      type: integer
      description: Volume (3 digits)
    - name: treble_2d
      type: integer
      description: Treble (2 digits)
    - name: bass_2d
      type: integer
      description: Bass (2 digits)
    - name: balance_sign_1c
      type: string
      description: Balance sign, single character '+' or '-'
    - name: balance_2d
      type: integer
      description: Balance magnitude (2 digits)

- id: audio_ipod_cmd
  label: Audio iPod Cmd
  kind: action
  command: "STI2_004_{cmd_1d}!"
  description: Play/pause/forward/backward for iPod audio.
  params:
    - name: cmd_1d
      type: integer
      enum: [0, 1, 2]
      description: "0 = forward, 1 = back, 2 = play/pause (per source)"

- id: set_audio_port
  label: Audio Port
  kind: action
  command: "STI2_005_{port_1d}!"
  description: Change input for audio device.
  params:
    - name: port_1d
      type: integer
      enum: [0, 1, 2]
      description: "0 = Input_A, 1 = Input_B, 2 = iPod (per source)"

- id: start_preset
  label: Start Preset
  kind: action
  command: "STI2_006_{preset_1d}!"
  description: Start preset.
  params:
    - name: preset_1d
      type: integer
      range: [1, 5]
      description: Preset index, range 1-5

- id: stop_steam_system
  label: Stop Steam System
  kind: action
  command: "STI2_100!"
  description: Stop heater and set time to 0. No parameters.

- id: change_unit
  label: Change Unit
  kind: action
  command: "STI2_200_{unit_1d}!"
  description: Change °C to °F or °F to °C.
  params:
    - name: unit_1d
      type: integer
      enum: [0, 1]
      description: "0 = °C, 1 = °F (per source)"

# --- Queries ---

- id: query_current_values
  label: Current Values
  kind: query
  command: "STI2_001?"
  description: Query current device state. Response carries 35 fields.
  # Response fields per source (position : meaning):
  # 0       : Current state (code; state mapping in appendix)
  # 1       : Room temp
  # 2       : Desired temp
  # 3 4 5 6 : Time
  # 7       : Aroma
  # 8       : Aroma rate
  # 9 10 11 : (reserved/continuation per source)
  # 12      : Colour Index
  # 13 14   : Brightness
  # 15      : (reserved)
  # 16 17   : Audio Cmd
  # 18 19   : (reserved)
  # 20      : Volume
  # 21 22   : (reserved)
  # 23 24   : Bass
  # 25      : Treble
  # 26      : Balance sign
  # 27 28   : Balance
  # 29      : (reserved)
  # 30      : Port
  # 31 32   : (reserved)
  # 33      : Total Color
  # 34      : (reserved)
  # UNRESOLVED: positional offsets 9-11, 15, 18-19, 21-22, 29, 31-32, 34 are
  # shown in the source table but their semantic meaning is not labeled.

- id: query_preset_values
  label: Preset Values
  kind: query
  command: "STI2_002_{preset_1d}?"
  description: Query a preset's stored values.
  params:
    - name: preset_1d
      type: integer
      range: [1, 5]
      description: Preset number, range 1-5
  notes: >
    Response field layout per source:
    0-3   = Time in seconds (4 digits)
    4-6   = Temperature (3 digits)
    7..n  = Preset name (max 15 characters, per source)

- id: query_temperature_unit
  label: Temperature Unit
  kind: query
  command: "STI2_003?"
  description: Query active temperature unit.
  # Response: OK_003_C<0x0d> or OK_003_F<0x0d>
```

## Feedbacks
```yaml
# Observable states surfaced by query responses. Derived from source.

- id: current_state
  type: integer
  description: >
    Current operating state code (0..n). State-to-meaning mapping is in
    the vendor appendix, not included in this spec.

- id: room_temp
  type: integer
  description: Current room temperature reading.

- id: desired_temp
  type: integer
  description: Currently configured target temperature.

- id: time_remaining
  type: string
  description: Remaining run time (4-digit seconds field per source).

- id: aroma
  type: integer
  description: Aroma state code.

- id: aroma_rate
  type: integer
  description: Aroma rate value.

- id: colour_index
  type: integer
  description: Active colour index. Real-colour mapping in vendor appendix.

- id: brightness
  type: integer
  description: Active brightness value.

- id: volume
  type: integer
  description: Current volume.

- id: bass
  type: integer
  description: Current bass setting.

- id: treble
  type: integer
  description: Current treble setting.

- id: balance_sign
  type: string
  description: Balance sign ('+' or '-').

- id: balance
  type: integer
  description: Balance magnitude.

- id: audio_port
  type: integer
  description: Active audio input port (0=A, 1=B, 2=iPod).

- id: total_color
  type: integer
  description: Aggregate colour value.

- id: temperature_unit
  type: string
  enum: [C, F]
  description: Active temperature unit reported by query 003.

- id: preset_name
  type: string
  description: Preset name returned by query 002 (max 15 characters per source).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. No values populated.
```

## Notes
- The source is the BOM2 protocol manual. It explicitly names the "Bathomatic" device family (device ID `BOM` / `BOME`) in UADDS examples. The SteamOmatic is assumed to share the BOM2 wire protocol but is not explicitly named in the BOM2 protocol section. Treat the device-family match as inferred.
- All command/response frames on TCP are terminated by a single carriage return byte (`0x0d`). The spec templates above use `!` and `?` as written in the source; clients must append `0x0d` to every frame.
- The "ignore non-digit" rule for commands 001 and 002 allows partial updates: send a non-digit character in a parameter slot to leave that field unchanged.
- Source examples:
  - `STI2_002_5?` → `OK_002_0120097Preset5` (preset 5, time=0120 s, temp=097, name="Preset5")
  - `STI2_001_08807!` → `OK_001` (88°F, 7 min)
  - `STI2_200_0!` → `OK_200` (change unit to °C)
- TCP port 24 is documented as an alternative command/response port alongside port 23. No source guidance on when to prefer one over the other.
- UADDS responses identify device family by a 2-character (basic) or 4-character (extended) prefix; the SteamOmatic's prefix is not stated in the source (only `BOM` / `BOME` for Bathomatic is shown).

<!-- UNRESOLVED: firmware version compatibility range not stated for SteamOmatic. -->
<!-- UNRESOLVED: device family ID prefix for SteamOmatic in UADDS responses (source only shows Bathomatic `BOM`/`BOME`). -->
<!-- UNRESOLVED: power-on default state and recovery behavior after TCP reconnect not documented. -->
<!-- UNRESOLVED: max concurrent TCP connections on ports 23/24 not stated. -->

## Provenance

```yaml
source_domains:
  - uniqueautomation.eu
  - applicationmarket.crestron.com
source_urls:
  - https://uniqueautomation.eu/wp-content/uploads/2021/05/steamomatic_protocol.pdf
  - https://applicationmarket.crestron.com/content/Help/Unique_Automation/uniqueautomationsteamomaticv1.0help.pdf
  - https://applicationmarket.crestron.com/unique-automation-steamomatic/
retrieved_at: 2026-04-29T19:58:45.047Z
last_checked_at: 2026-06-02T07:06:47.765Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:47.765Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 spec actions matched exactly in source commands and queries lists; transport parameters verified in protocol section. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the \"Bathomatic\" device family (device ID `BOM`) in the UADDS examples. The SteamOmatic is presumed to share the BOM2 protocol but is not explicitly named in the BOM2 protocol section."
- "no safety warnings, interlocks, or power-on sequencing procedures documented in the source."
- "positional offsets 9-11, 15, 18-19, 21-22, 29, 31-32, 34 are"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility range not stated for SteamOmatic."
- "device family ID prefix for SteamOmatic in UADDS responses (source only shows Bathomatic `BOM`/`BOME`)."
- "power-on default state and recovery behavior after TCP reconnect not documented."
- "max concurrent TCP connections on ports 23/24 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
