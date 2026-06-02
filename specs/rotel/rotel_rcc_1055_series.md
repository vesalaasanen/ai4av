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
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
retrieved_at: 2026-04-30T04:31:55.596Z
last_checked_at: 2026-06-02T10:14:11.748Z
generated_at: 2026-06-02T10:14:11.748Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no query (status) commands documented; only unsolicited feedback strings when front-panel display state changes"
  - "explicit power-state feedback encoding not isolated in source;"
  - "source documents no settable parameters beyond discrete key commands"
  - "no multi-step sequences described in source"
  - "no explicit status-query commands documented; power/transport state is observable only via unsolicited feedback strings when the front panel changes."
verification:
  verdict: verified
  checked_at: 2026-06-02T10:14:11.748Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec hex commands match verbatim in source Section 1; disc_4 fix to 45 08 confirmed correct; transport values confirmed; source has exactly 37 commands. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rotel RCC-1055 Control Spec

## Summary
RS-232 HEX control protocol for the Rotel RCC-1055 5-disc CD changer. Covers power, CD transport, disc selection, numeric track entry, and front-display commands. Two serial configurations exist depending on unit serial number (see Transport).

<!-- UNRESOLVED: no query (status) commands documented; only unsolicited feedback strings when front-panel display state changes -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # units AFTER serial # 077-7121001 (Black) / 977-7121001 (Silver); earlier units use 2400 - see Notes
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from Power On/Off/Toggle commands
- routable        # inferred from Disc 1-5 / Next Disc / Drawer commands
```

## Actions
```yaml
# All commands share the standard format: FE 03 B0 10 {KEY} {CHK}
# Checksum computed over ID + Type + Key bytes only; do not include Start or Checksum.
# Meta-encoding rule: any FD or FE byte in the data stream must be escaped (FD → FD 00; FE → FD 01) so the Start byte is unambiguous.

# --- POWER ---
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

# --- CD TRANSPORT ---
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

- id: track_previous
  label: Track <<
  kind: action
  command: "FE 03 B0 10 0E D1"
  params: []

- id: search_forward
  label: Search >>
  kind: action
  command: "FE 03 B0 10 1E E1"
  params: []

- id: search_reverse
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
  command: "FE 03 B0 10 10 D3"  # source row labelled "Drawer Open/Close" - bytes identical to Disc 4 row; see Notes
  params: []

# --- ADDITIONAL ---
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
# Feedback string mirrors the front-panel display.
#
# Pre-serial-cut units (BEFORE 077-7121001 Black / 977-7121001 Silver):
#   FE 0E B0 20 F1 F2 F3 F4 F5 C1 C2 C3 C4 C5 C6 C7 {CHK}     (14 bytes payload)
#
# Post-serial-cut units (AFTER 077-7121001 Black / 977-7121001 Silver):
#   FE 0E B0 20 F1 F2 F3 F4 F5 F6 C1 C2 C3 C4 C5 C6 C7 C8 {CHK} (16 bytes payload)
#
# F1..F5/F6 = icon flags (one bit per front-panel icon; see Notes for bit map)
# C1..C7/C8 = ASCII display characters (C1=DISC, C2-3/C2-4=TRACK, C4-5/C5-6=MIN, C6-7/C7-8=SEC)

- id: display_state
  type: object
  description: >
    Full 14- or 16-byte feedback payload representing front-panel icon flags
    and current disc/track/time ASCII readout. Bit decoding of F1..F5 (and F6
    on newer units) is device-specific; see Notes.

- id: power_state
  type: enum
  values: [on, off, standby]
  # UNRESOLVED: explicit power-state feedback encoding not isolated in source;
  # inferred from front-panel POWER icon bit (Bit7 of F5) on the newer-unit map.
```

## Variables
```yaml
# UNRESOLVED: source documents no settable parameters beyond discrete key commands
```

## Events
```yaml
- id: front_panel_change
  description: >
    The unit emits a feedback string (Section 2 format) whenever the
    front-panel display state changes, mirroring that change. Sent
    unsolicited - no polling required.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Two production variants documented by serial-number cut:

- BEFORE serial # 077-7121001 (Black) / 977-7121001 (Silver): 2400 baud, feedback payload is 14 bytes (F1..F5 + C1..C7).
- AFTER  serial # 077-7121001 (Black) / 977-7121001 (Silver): 9600 baud, feedback payload is 16 bytes (F1..F6 + C1..C8). F6 adds icon bits; C8 adds one extra SEC digit.

Command KEY bytes are identical across both variants; only the serial settings and feedback payload length differ. Spec assumes post-cut (9600) defaults.

Checksum: 1 byte, computed over the three payload bytes ID + Type + Key (i.e. 0xB0 + 0x10 + 0xKEY). Start (0xFE) and Checksum are NOT included in the sum. No carriage return / line feed after the packet.

Meta-encoding: any byte value 0xFD or 0xFE occurring anywhere in the data stream must be escaped as FD 00 (for FD) and FD 01 (for FE) so that the Start byte 0xFE is unambiguous. Apply this to outgoing commands and to inbound feedback parsing.

Source anomaly: rows for "Disc 4" and "Drawer Open/Close" both list bytes `FE 03 B0 10 10 D3`. The source clearly intended two distinct commands; the duplicate bytes may be a documentation error. Implementer should verify against a live unit before relying on the Disc 4 / Drawer mapping.

Front-panel icon bit maps (from source):

Pre-cut (F1..F5, MSB at Bit7):
- Flag1 (Bit0..Bit7): 16, 15, 14, 13, 12, 11, 10
- Flag2 (Bit0..Bit7): 9, 8, 7, 6, 5, 4, 3, 2
- Flag3: REMAIN(Bit0), 1(Bit1), (Bit2), REPT-DISC(Bit3), REPT-1(Bit4), REPT-ALL(Bit5), REPEAT(Bit6), (Bit7)
- Flag4: RANDOM(Bit0), PROGRAM(Bit1), INTRO(Bit2), :(Bit3), DISC(Bit4), TRACK(Bit5), MIN(Bit6), SEC(Bit7)
- Flag5: 5/(Bit0), 4/(Bit1), 3/(Bit2), 2/(Bit3), 1/(Bit4), PLAY(Bit5), PAUSE(Bit6), DISP OFF(Bit7)

Post-cut (F1..F6, MSB at Bit7):
- Flag1 (Bit0..Bit7): 20, 19, 18, 17, 16, 15, 14, 13
- Flag2 (Bit0..Bit7): 12, 11, 10, 9, 8, 7, 6, 5
- Flag3: 4(Bit0), 3(Bit1), 2(Bit2), 1(Bit3), (Bit4), RANDOM(Bit5), (Bit6), PROGRAM(Bit7)
- Flag4: :(Bit0), REMAIN(Bit1), EACH(Bit2), TOTAL(Bit3), SEC(Bit4), MIN(Bit5), TRACK(Bit6), DISC(Bit7)
- Flag5: CD(Bit0), HDCD(Bit1), MP3(Bit2), 1/(Bit3), 2/(Bit4), 3/(Bit5), 4/(Bit6), 5/(Bit7)
- Flag6: PAUSE(Bit0), INTRO(Bit1), PLAY(Bit2), REP-ALL(Bit3), REP-DISC(Bit4), REP-1(Bit5), REPEAT(Bit6), DISP OFF(Bit7)

ASCII fields: pre-cut C1=DISC, C2-3=TRACK, C4-5=MIN, C6-7=SEC; post-cut C1=DISC, C2-4=TRACK, C5-6=MIN, C7-8=SEC.

<!-- UNRESOLVED: no explicit status-query commands documented; power/transport state is observable only via unsolicited feedback strings when the front panel changes. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
retrieved_at: 2026-04-30T04:31:55.596Z
last_checked_at: 2026-06-02T10:14:11.748Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T10:14:11.748Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec hex commands match verbatim in source Section 1; disc_4 fix to 45 08 confirmed correct; transport values confirmed; source has exactly 37 commands. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no query (status) commands documented; only unsolicited feedback strings when front-panel display state changes"
- "explicit power-state feedback encoding not isolated in source;"
- "source documents no settable parameters beyond discrete key commands"
- "no multi-step sequences described in source"
- "no explicit status-query commands documented; power/transport state is observable only via unsolicited feedback strings when the front panel changes."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
