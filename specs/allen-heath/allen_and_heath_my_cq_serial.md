---
spec_id: admin/allen-heath-my-cq
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath CQ MIDI Control Spec"
manufacturer: "Allen & Heath"
model_family: CQ
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - CQ
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/CQ_MIDI_Protocol_V1_2_0_iss4.pdf
  - https://www.allen-heath.com/content/uploads/2024/06/CQ_MIDI_Protocol_V1_2_0_iss1.pdf
retrieved_at: 2026-07-13T19:00:50.435Z
last_checked_at: 2026-07-21T20:11:35.271Z
generated_at: 2026-07-21T20:11:35.271Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "operator-supplied \"Known protocol\" was RS-232C, but source describes MIDI over USB / TCP/IP only. No RS-232 / serial parameters are documented. Firmware version (referenced in source header as \"V1.2 Issue 4\") not pinned in compatible_with."
  - "response byte format / response-on-get echo structure not given in source."
  - "source states CQ transmits NRPN messages on parameter change but does"
  - "no macro / sequence definitions in source."
  - "no explicit safety warnings, interlocks, or power-on sequencing in source."
  - "firmware compatibility range not stated per-device; full SoftKey note table beyond SK1-SK3 not present in refined excerpt; exact response byte layout on Get-value queries not documented."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:11:35.271Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions have literal hex-code matches in source with correct parameter structure. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Allen & Heath CQ MIDI Control Spec

## Summary
The Allen & Heath CQ is a digital mixer controllable via MIDI over USB-B or MIDI over TCP/IP (network port 51325). This spec covers the MIDI messaging surface documented for scene recall, Soft Key trigger, mute, level, pan/balance, and value-query functions using NRPN messages on MIDI Channel 1.

<!-- UNRESOLVED: operator-supplied "Known protocol" was RS-232C, but source describes MIDI over USB / TCP/IP only. No RS-232 / serial parameters are documented. Firmware version (referenced in source header as "V1.2 Issue 4") not pinned in compatible_with. -->

## Transport
```yaml
# Source describes two physical transports: USB-B (MIDI device) and TCP/IP (MIDI over
# TCP/IP). USB MIDI uses the OS MIDI driver stack (no baud/serial params). TCP/IP MIDI
# listens on port 51325. No login / handshake / auth procedure is documented.
protocols:
  - tcp
  - udp  # inferred: MIDI over TCP/IP can be carried via UDP per RTP-MIDI; source only states TCP/IP framing
# NOTE: source explicitly names "MIDI over TCP/IP". Listed as `tcp` per Tier 1 mapping.
addressing:
  port: 51325
auth:
  type: none  # inferred: no auth procedure in source
```

**Worked note — USB transport:** MIDI-over-USB-B requires no port or addressing fields; the host enumerates the CQ as a USB MIDI class device. Baud rate, parity, data bits not applicable.

## Traits
```yaml
- queryable       # inferred from "Getting values" NRPN get pattern (B0 60 7F)
- levelable       # absolute + relative level NRPN control documented
- routable        # panning / balance NRPN control documented
```

## Actions
```yaml
# Source uses MIDI Channel 1 (0xB0 for CC/NRPN). All commands below carry status byte 0xB0.
# Each NRPN is a 4-message sequence: MSB (B0 63 MB), LSB (B0 62 LB), data entry coarse or
# data increment/decrement (B0 06 VC / B0 26 VF / B0 60 00 / B0 61 00).

# --- Scene change ---
- id: scene_recall
  label: Scene Recall
  kind: action
  command: "B0 00 00 C0 {PG}"
  params:
    - name: PG
      type: integer
      description: Program change value 00-7F (selects scenes 1-128; CQ offset is -1 vs MIDI)
  notes: |
    Bank change B0 00 00 should be sent first (always bank 1 = 00). Blank scenes cannot
    be recalled. Examples: Scene 1 = `B0 00 00 C0 00`; Scene 7 = `B0 00 00 C0 06`;
    Scene 64 = `B0 00 00 C0 3F`.

# --- Soft Key trigger ---
- id: softkey_press
  label: Soft Key Press
  kind: action
  command: "90 {SK} 7F"
  params:
    - name: SK
      type: integer
      description: Soft Key note number (SoftKey 1 = 0x30 / C3, +1 per key)
  notes: Note-on with velocity 0x7F.

- id: softkey_release
  label: Soft Key Release
  kind: action
  command: "80 {SK} 00"
  params:
    - name: SK
      type: integer
      description: Soft Key note number (SoftKey 1 = 0x30 / C3, +1 per key)
  notes: Note-off; CQ also accepts note-on with zero velocity as release.

# --- Mute On/Off (NRPN) ---
- id: mute_on
  label: Mute On
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 00 B0 26 01"
  params:
    - name: MB
      type: integer
      description: Mute MSB parameter number (see Mute Parameter table)
    - name: LB
      type: integer
      description: Mute LSB parameter number (see Mute Parameter table)
  notes: NRPN = (MB, LB). Examples: Ip1 Mute On = `B0 63 00 B0 62 00 B0 06 00 B0 26 01`.

- id: mute_off
  label: Mute Off
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 00 B0 26 00"
  params:
    - name: MB
      type: integer
      description: Mute MSB parameter number
    - name: LB
      type: integer
      description: Mute LSB parameter number
  notes: Example: Main LR Mute Off = `B0 63 00 B0 62 44 B0 06 00 B0 26 00`.

- id: mute_toggle_increment
  label: Mute Toggle (Increment)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: MB
      type: integer
      description: Mute MSB parameter number
    - name: LB
      type: integer
      description: Mute LSB parameter number
  notes: |
    Increment with data byte 0x00 toggles mute state. Source states this cannot currently
    be used with DCA Mute and Mute Group Mute. Example: Ip3 Mute Toggle =
    `B0 63 00 B0 62 02 B0 60 00`.

# --- Level (absolute) ---
- id: level_set_absolute
  label: Set Level (Absolute)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 {VC} B0 26 {VF}"
  params:
    - name: MB
      type: integer
      description: Level MSB parameter number (see Level Parameter table)
    - name: LB
      type: integer
      description: Level LSB parameter number
    - name: VC
      type: integer
      description: Value coarse (see Example Level Values table)
    - name: VF
      type: integer
      description: Value fine (see Example Level Values table)
  notes: |
    Examples: Ip1 to Main LR 0dB = `B0 63 40 B0 62 00 B0 06 62 B0 26 00`;
    Ip1 to Main LR -20dB = `B0 63 40 B0 62 00 B0 06 2E B0 26 40`;
    Out 5/6 (overall) +5dB = `B0 63 4F B0 62 05 B0 06 73 B0 26 40`.

# --- Level (relative) ---
- id: level_increment_1db
  label: Level Increment (+1dB)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: MB
      type: integer
      description: Level MSB parameter number
    - name: LB
      type: integer
      description: Level LSB parameter number
  notes: NRPN Fader Law setting has no effect on relative control.

- id: level_decrement_1db
  label: Level Decrement (-1dB)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 61 00"
  params:
    - name: MB
      type: integer
      description: Level MSB parameter number
    - name: LB
      type: integer
      description: Level LSB parameter number

# --- Pan/Balance (absolute) ---
- id: pan_set_absolute
  label: Set Pan/Balance (Absolute)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 {VC} B0 26 {VF}"
  params:
    - name: MB
      type: integer
      description: Pan MSB parameter number (see Pan/Balance Parameter table)
    - name: LB
      type: integer
      description: Pan LSB parameter number
    - name: VC
      type: integer
      description: Value coarse, 00 00 (L100%) to 7F 7F (R100%), 40 00 = center
    - name: VF
      type: integer
      description: Value fine
  notes: |
    Examples: Ip1 to LR Center = `B0 63 50 B0 62 00 B0 06 40 B0 26 00`;
    Ip1 to LR L100% = `B0 63 50 B0 62 00 B0 06 00 B0 26 00`;
    Ip1 to LR R100% = `B0 63 50 B0 62 00 B0 06 7F B0 26 7F`.

# --- Pan/Balance (relative) ---
- id: pan_increment_right
  label: Pan Right One Step (Increment)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: MB
      type: integer
      description: Pan MSB parameter number
    - name: LB
      type: integer
      description: Pan LSB parameter number

- id: pan_decrement_left
  label: Pan Left One Step (Decrement)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 61 00"
  params:
    - name: MB
      type: integer
      description: Pan MSB parameter number
    - name: LB
      type: integer
      description: Pan LSB parameter number
  notes: Increment moves right; decrement moves left.

# --- Get value (query) ---
- id: value_get
  label: Get Parameter Value
  kind: query
  command: "B0 63 {MB} B0 62 {LB} B0 60 7F"
  params:
    - name: MB
      type: integer
      description: Parameter MSB (mute / level / pan as appropriate)
    - name: LB
      type: integer
      description: Parameter LSB
  notes: |
    CQ responds with current value of mute, level, or pan/balance parameter.
    Examples: Ip1 Mute = `B0 63 00 B0 62 00 B0 60 7F`;
    Ip1 to LR Level = `B0 63 40 B0 62 00 B0 60 7F`;
    ST1 to Out 1/2 Pan = `B0 63 52 B0 62 64 B0 60 7F`.
```

## Feedbacks
```yaml
# CQ transmits MIDI when UI/app changes any NRPN-controlled parameter (Section 1.2).
# No explicit unsolicited event structure is documented beyond the same NRPN
# form used to send - values are echoed back as standard NRPN messages.
# UNRESOLVED: response byte format / response-on-get echo structure not given in source.
```

## Variables
```yaml
# Parameter number tables from source. These are read-only reference data; treat as
# documentation rather than settable device variables.
- name: mute_parameter_numbers
  description: |
    MSB/LSB pairs for mute control. Channels: Ip1-Ip16 (00 00-00 0F), St1/St2 (00 18, 00 1A),
    USB (00 1C), BT (00 1E), FX1-FX4 (00 51-00 54), Main LR (00 44), Out1-Out6 (00 45-00 4A),
    Out1/2 (00 45), Out3/4 (00 47), Out5/6 (00 49), DCA1-DCA4 (02 00-02 03),
    MGRP1-MGRP4 (04 00-04 03).

- name: level_parameter_numbers
  description: |
    MSB/LSB pairs for level control. Inputs/FX -> outputs table (Section 3) gives
    one row per (source, destination) pair; Outputs/FX/DCA overall use MSB 4F with
    varying LSB (e.g. Main LR 4F 00, Out1 4F 01, DCA1 4F 20).

- name: pan_balance_parameter_numbers
  description: |
    MSB/LSB pairs for pan/balance. Inputs/FX -> LR/Out1/2/Out3/4/Out5/6. Examples:
    Ip1->LR 50 00, Ip1->Out1/2 50 44, Ip1->Out3/4 50 46, Ip1->Out5/6 50 48.

- name: level_value_table
  description: |
    Linear-taper dB -> (VC, VF) coarse/fine byte pairs. Range -inf (00 00) to +10dB (7F 40).
    See "Example Level Values" table in source.

- name: pan_value_table
  description: |
    Pan coarse/fine byte pairs. L100% = 00 00; CTR = 40 00; R100% = 7F 7F.

- name: softkey_notes
  description: |
    SoftKey note numbers. SoftKey 1 = C3 = 0x30; increments by 1 per key.
    Source documents SK1=30, SK2=31, SK3=32; full list UNRESOLVED in refined doc.
```

## Events
```yaml
# UNRESOLVED: source states CQ transmits NRPN messages on parameter change but does
# not document a distinct event/notification message format separate from regular NRPN.
```

## Macros
```yaml
# UNRESOLVED: no macro / sequence definitions in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source warning: "Avoid creating a MIDI feedback loop by sending the CQ MIDI output
# back to the CQ when recording MIDI data." - operational note, not a device interlock.
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing in source.
```

## Notes
- Source describes MIDI Channel 1 for all control messaging (Section 1.3).
- Source header states "Firmware V1.2 Issue 4"; not pinned in `compatible_with.firmware` because the operator did not supply it and the refined doc treats it as a doc revision label rather than a per-device firmware gate.
- Operator-supplied "Known protocol: RS-232C" conflicts with source content (MIDI over USB-B / TCP/IP only). RS-232 framing, baud rate, parity not documented in source.
- Only one TCP/IP MIDI connection permitted at a time (Section 1.1).
- MIDI-over-TCP/IP port: 51325.
- Bank change `B0 00 00` should precede program change for scene recall; blank scenes cannot be recalled.
- Mute Toggle (increment variant) cannot currently be used with DCA Mute or Mute Group Mute.
- NRPN Fader Law setting does not affect relative level control.
- "Follow Main LR Pan" must be set to Off for MIDI control of panning to Linked Stereo Outputs.
- The CQ does not send note on/off messages when a Soft Key is pressed (receive-only for SoftKeys).

<!-- UNRESOLVED: firmware compatibility range not stated per-device; full SoftKey note table beyond SK1-SK3 not present in refined excerpt; exact response byte layout on Get-value queries not documented. -->

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/10/CQ_MIDI_Protocol_V1_2_0_iss4.pdf
  - https://www.allen-heath.com/content/uploads/2024/06/CQ_MIDI_Protocol_V1_2_0_iss1.pdf
retrieved_at: 2026-07-13T19:00:50.435Z
last_checked_at: 2026-07-21T20:11:35.271Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:11:35.271Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions have literal hex-code matches in source with correct parameter structure. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "operator-supplied \"Known protocol\" was RS-232C, but source describes MIDI over USB / TCP/IP only. No RS-232 / serial parameters are documented. Firmware version (referenced in source header as \"V1.2 Issue 4\") not pinned in compatible_with."
- "response byte format / response-on-get echo structure not given in source."
- "source states CQ transmits NRPN messages on parameter change but does"
- "no macro / sequence definitions in source."
- "no explicit safety warnings, interlocks, or power-on sequencing in source."
- "firmware compatibility range not stated per-device; full SoftKey note table beyond SK1-SK3 not present in refined excerpt; exact response byte layout on Get-value queries not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
