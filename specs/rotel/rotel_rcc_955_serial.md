---
spec_id: admin/rotel-rcc-1055
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RCC-1055 Control Spec"
manufacturer: Rotel
model_family: RCC-1055
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RCC-1055
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
retrieved_at: 2026-06-30T22:50:10.178Z
last_checked_at: 2026-07-07T12:32:44.037Z
generated_at: 2026-07-07T12:32:44.037Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source device name is RCC-1055 throughout the document; the input \"Device name: Rotel Rcc 955\" and entity_id rotel_rcc_955 do not match the documented product. Operator must confirm whether this spec targets the RCC-1055 or a RCC-955 unit, and whether the RCC-955 (if it exists) shares this protocol."
  - "Checksum computation algorithm for the trailing byte is not described in source. Documented commands include the literal checksum byte verbatim, but the formula to recompute it for arbitrary frames is unknown."
  - "No explicit query/status-request command is documented. Feedback strings are unsolicited and mirror front-panel changes; it is not stated whether polling is possible."
  - "no settable variables documented in source."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "checksum computation formula not described; only literal checksum bytes are given per documented command."
  - "input device name (RCC-955) vs documented product (RCC-1055) mismatch — operator must confirm target unit and protocol applicability."
  - "no explicit query/poll command documented; feedback strings are unsolicited status mirrors only."
  - "flag-bit (F1-F5 / F1-F6) and ASCII (C1-C7 / C1-C8) byte semantics are tabulated in source but not encoded here as structured fields; implementer should consult source tables for bit-to-icon mapping."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:32:44.037Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions match verbatim in source command table with correct hex codes and descriptions. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Rotel RCC-1055 Control Spec

## Summary
RS-232C HEX-based control protocol for the Rotel RCC-1055 CD changer. Communication uses fixed 6-byte command frames and returns front-panel-mirroring feedback strings. All payloads are raw hex bytes.

<!-- UNRESOLVED: Source device name is RCC-1055 throughout the document; the input "Device name: Rotel Rcc 955" and entity_id rotel_rcc_955 do not match the documented product. Operator must confirm whether this spec targets the RCC-1055 or a RCC-955 unit, and whether the RCC-955 (if it exists) shares this protocol. -->
<!-- UNRESOLVED: Checksum computation algorithm for the trailing byte is not described in source. Documented commands include the literal checksum byte verbatim, but the formula to recompute it for arbitrary frames is unknown. -->
<!-- UNRESOLVED: No explicit query/status-request command is documented. Feedback strings are unsolicited and mirror front-panel changes; it is not stated whether polling is possible. -->

## Transport
```yaml
protocols:
  - serial
serial:
  # Two hardware revisions exist, split by unit serial number:
  #   BEFORE serial # 077-7121001 (Black) / 977-7121001 (Silver) -> 2400 baud
  #   AFTER  serial # 077-7121001 (Black) / 977-7121001 (Silver) -> 9600 baud
  baud_rate: 9600  # newer units; older units use 2400 (see Notes)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (power toggle/on/off commands present)
traits:
  - powerable
```

## Actions
```yaml
# Standard command frame: Start(0xFE) Count(0x03) DeviceID(0xB0) Type(0x10) Key(0xXX) Checksum(0xXX).
# Count byte covers only ID+Type+Key (excludes Start and Checksum).
# Hex bytes shown with spaces for clarity; send raw bytes with NO spaces, delimiters, CR, or LF.
# Last byte is the checksum; value is given verbatim from source. Recomputation formula: UNRESOLVED.

# --- POWER COMMANDS ---
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "FE 03 B0 10 49 0C"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "FE 03 B0 10 4A 0D"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "FE 03 B0 10 4B 0E"
  params: []

# --- CD TRANSPORT COMMANDS ---
- id: play
  label: Play
  kind: action
  command: "FE 03 B0 10 13 D6"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "FE 03 B0 10 0F D2"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "FE 03 B0 10 0B CE"
  params: []

- id: track_next
  label: Track >>
  kind: action
  command: "FE 03 B0 10 1A DD"
  params: []

- id: track_prev
  label: Track <<
  kind: action
  command: "FE 03 B0 10 0E D1"
  params: []

- id: search_fwd
  label: Search >>
  kind: action
  command: "FE 03 B0 10 1E E1"
  params: []

- id: search_rev
  label: Search <<
  kind: action
  command: "FE 03 B0 10 0A CD"
  params: []

- id: number_1
  label: Number 1
  kind: action
  command: "FE 03 B0 10 09 CC"
  params: []

- id: number_2
  label: Number 2
  kind: action
  command: "FE 03 B0 10 1D E0"
  params: []

- id: number_3
  label: Number 3
  kind: action
  command: "FE 03 B0 10 1F E2"
  params: []

- id: number_4
  label: Number 4
  kind: action
  command: "FE 03 B0 10 0D D0"
  params: []

- id: number_5
  label: Number 5
  kind: action
  command: "FE 03 B0 10 19 DC"
  params: []

- id: number_6
  label: Number 6
  kind: action
  command: "FE 03 B0 10 1B DE"
  params: []

- id: number_7
  label: Number 7
  kind: action
  command: "FE 03 B0 10 11 D4"
  params: []

- id: number_8
  label: Number 8
  kind: action
  command: "FE 03 B0 10 15 D8"
  params: []

- id: number_9
  label: Number 9
  kind: action
  command: "FE 03 B0 10 17 DA"
  params: []

- id: number_10
  label: Number 10
  kind: action
  command: "FE 03 B0 10 12 D5"
  params: []

- id: number_plus_10
  label: Number +10
  kind: action
  command: "FE 03 B0 10 16 D9"
  params: []

- id: next_disc
  label: Next Disc
  kind: action
  command: "FE 03 B0 10 41 04"
  params: []

- id: disc_1
  label: Disc 1
  kind: action
  command: "FE 03 B0 10 42 05"
  params: []

- id: disc_2
  label: Disc 2
  kind: action
  command: "FE 03 B0 10 43 06"
  params: []

- id: disc_3
  label: Disc 3
  kind: action
  command: "FE 03 B0 10 44 07"
  params: []

- id: disc_4
  label: Disc 4
  kind: action
  command: "FE 03 B0 10 45 08"
  params: []

- id: disc_5
  label: Disc 5
  kind: action
  command: "FE 03 B0 10 46 09"
  params: []

- id: drawer_open_close
  label: Drawer Open/Close
  kind: action
  command: "FE 03 B0 10 10 D3"
  params: []

# --- ADDITIONAL COMMANDS ---
- id: random
  label: Random
  kind: action
  command: "FE 03 B0 10 00 C3"
  params: []

- id: repeat
  label: Repeat
  kind: action
  command: "FE 03 B0 10 01 C4"
  params: []

- id: time
  label: Time
  kind: action
  command: "FE 03 B0 10 02 C5"
  params: []

- id: program
  label: Program
  kind: action
  command: "FE 03 B0 10 03 C6"
  params: []

- id: scan
  label: Scan
  kind: action
  command: "FE 03 B0 10 04 C7"
  params: []

- id: review
  label: Review
  kind: action
  command: "FE 03 B0 10 07 CA"
  params: []

- id: release_key
  label: Release Key
  kind: action
  command: "FE 03 B0 10 4F 12"
  params: []

- id: front_display_on
  label: Front Display On
  kind: action
  command: "FE 03 B0 10 47 0A"
  params: []

- id: front_display_off
  label: Front Display Off
  kind: action
  command: "FE 03 B0 10 48 0B"
  params: []
```

## Feedbacks
```yaml
# The unit emits a response string mirroring its front-panel display. Any front-panel
# status change prompts a feedback string. Two frame variants exist by unit serial number.

- id: response_string_pre
  type: frame
  description: >-
    Response frame for units BEFORE serial # 077-7121001 (Black) / 977-7121001 (Silver).
    Layout: Start(0xFE) Count(0x0E) ID(0xB0) Type(0x20) F1 F2 F3 F4 F5 C1 C2 C3 C4 C5 C6 C7 Checksum.
    F1-F5: front-panel icon flag bytes (bitmapped). C1-C7: ASCII disc/track/time text
    (C1=DISC, C2-3=TRACK, C4-5=MIN, C6-7=SEC).

- id: response_string_post
  type: frame
  description: >-
    Response frame for units AFTER serial # 077-7121001 (Black) / 977-7121001 (Silver).
    Layout: Start(0xFE) Count(0x0E) ID(0xB0) Type(0x20) F1 F2 F3 F4 F5 F6 C1 C2 C3 C4 C5 C6 C7 C8 Checksum.
    F1-F6: front-panel icon flag bytes (bitmapped). C1-C8: ASCII disc/track/time text
    (C1=DISC, C2-4=TRACK, C5-6=MIN, C7-8=SEC).
```

## Variables
```yaml
# Flag-byte bitmaps (front-panel icons). Source documents bit-per-icon maps; not settable
# parameters, so represented here as read-only flag definitions rather than Variables.
# UNRESOLVED: no settable variables documented in source.
```

## Events
```yaml
# Unsolicited feedback strings are emitted on any front-panel status change. See Feedbacks
# section for frame layouts (response_string_pre / response_string_post).
# F1-F5 (pre) / F1-F6 (post) bitmaps encode which icons are lit, e.g. PLAY, PAUSE, RANDOM,
# PROGRAM, REPEAT / REPT-ALL / REPT-DISC / REPT-1, REMAIN, TOTAL, TIME-MIN, TIME-SEC,
# DISP OFF, disc/track digit segments.
# Meta encoding applies to feedback data bytes: FD -> FD 00, FE -> FD 01.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- HEX protocol. Send raw bytes only — no spaces, delimiters, CR, or LF after commands.
- Standard command frame: `FE 03 B0 10 {key} {checksum}`. Count byte (0x03) counts only ID+Type+Key.
- Two unit revisions split on serial # 077-7121001 (Black) / 977-7121001 (Silver):
  - Before: 2400 baud. Feedback frame has F1-F5 + C1-C7 (14 data bytes incl. checksum region).
  - After: 9600 baud. Feedback frame has F1-F6 + C1-C8 (extended).
- Meta encoding (byte stuffing): any FD in the payload becomes `FD 00`; any FE becomes `FD 01`. Keeps 0xFE unique as the start byte. Applies to both command and response data bytes.
- "Release Key" command (`FE 03 B0 10 4F 12`) likely terminates a held/keypress command — semantics not elaborated in source.

<!-- UNRESOLVED: checksum computation formula not described; only literal checksum bytes are given per documented command. -->
<!-- UNRESOLVED: input device name (RCC-955) vs documented product (RCC-1055) mismatch — operator must confirm target unit and protocol applicability. -->
<!-- UNRESOLVED: no explicit query/poll command documented; feedback strings are unsolicited status mirrors only. -->
<!-- UNRESOLVED: flag-bit (F1-F5 / F1-F6) and ASCII (C1-C7 / C1-C8) byte semantics are tabulated in source but not encoded here as structured fields; implementer should consult source tables for bit-to-icon mapping. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
retrieved_at: 2026-06-30T22:50:10.178Z
last_checked_at: 2026-07-07T12:32:44.037Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:32:44.037Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions match verbatim in source command table with correct hex codes and descriptions. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source device name is RCC-1055 throughout the document; the input \"Device name: Rotel Rcc 955\" and entity_id rotel_rcc_955 do not match the documented product. Operator must confirm whether this spec targets the RCC-1055 or a RCC-955 unit, and whether the RCC-955 (if it exists) shares this protocol."
- "Checksum computation algorithm for the trailing byte is not described in source. Documented commands include the literal checksum byte verbatim, but the formula to recompute it for arbitrary frames is unknown."
- "No explicit query/status-request command is documented. Feedback strings are unsolicited and mirror front-panel changes; it is not stated whether polling is possible."
- "no settable variables documented in source."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "checksum computation formula not described; only literal checksum bytes are given per documented command."
- "input device name (RCC-955) vs documented product (RCC-1055) mismatch — operator must confirm target unit and protocol applicability."
- "no explicit query/poll command documented; feedback strings are unsolicited status mirrors only."
- "flag-bit (F1-F5 / F1-F6) and ASCII (C1-C7 / C1-C8) byte semantics are tabulated in source but not encoded here as structured fields; implementer should consult source tables for bit-to-icon mapping."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
