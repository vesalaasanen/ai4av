---
spec_id: admin/christie-dhd800
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie DHD800 Control Spec"
manufacturer: Christie
model_family: DHD800
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - DHD800
    - PDG-DHT8000L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - github.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000581-01-christie-lit-tech-ref-dhd800-rs232-bsc.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000246-01-dhd800-network-and-operation-user-manual.pdf
  - https://github.com/aidenappl/Christie-DHD800-Projector-Commands
retrieved_at: 2026-07-22T00:20:53.754Z
last_checked_at: 2026-07-22T00:56:40.014Z
generated_at: 2026-07-22T00:56:40.014Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source names \"DHD800\" on cover and \"PDG-DHT8000L\" in body; treated as compatible family. Exact power/voltage specs, fault-recovery sequences, and firmware compatibility ranges not stated."
  - "no settable parameter ranges (e.g. keystone degree, zoom step, focus step) are stated in source."
  - "source describes no unsolicited notifications. All state is read via Status Read commands (CR0-CR7)."
  - "source does not define multi-step sequences."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:56:40.014Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions matched literally in source; transport values verified; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Christie DHD800 Control Spec

## Summary
RS-232C serial control spec for the Christie DHD800 projector (also documented as PDG-DHT8000L). Defines Basic Functional Execution Commands ("Cxx") and Status Read Commands ("CRx") terminated by carriage return (0x0D), plus an optional address-prefixed command form ("A###...") for multi-projector buses. Initial serial config: 9600 or 19200 baud, 8N1, no flow control.

<!-- UNRESOLVED: source names "DHD800" on cover and "PDG-DHT8000L" in body; treated as compatible family. Exact power/voltage specs, fault-recovery sequences, and firmware compatibility ranges not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # initial setting value; 9600 also supported (selectable in Service Mode)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from C00 POWER ON, C01 POWER OFF
- routable    # inferred from C05-C08 INPUT 1-4 select
- queryable   # inferred from CR0-CR7 status read commands
```

## Actions
```yaml
- id: power_on
  label: Power ON
  kind: action
  command: "C00\r"   # source: "C00" [CR]; CR literalized as \r
  params: []

- id: power_off
  label: Power OFF (Immediate)
  kind: action
  command: "C01\r"
  params: []

- id: input_1
  label: Select Input 1
  kind: action
  command: "C05\r"
  params: []

- id: input_2
  label: Select Input 2
  kind: action
  command: "C06\r"
  params: []

- id: input_3
  label: Select Input 3
  kind: action
  command: "C07\r"
  params: []

- id: input_4
  label: Select Input 4
  kind: action
  command: "C08\r"
  params: []

- id: video_mute_on
  label: Video Mute ON
  kind: action
  command: "C0D\r"
  params: []

- id: video_mute_off
  label: Video Mute OFF
  kind: action
  command: "C0E\r"
  params: []

- id: screen_normal
  label: Screen Normal Size
  kind: action
  command: "C0F\r"
  params: []

- id: screen_full
  label: Screen Full Size
  kind: action
  command: "C10\r"
  params: []

- id: menu_on
  label: Menu ON (OSD)
  kind: action
  command: "C1C\r"
  params: []

- id: menu_off
  label: Menu OFF (OSD)
  kind: action
  command: "C1D\r"
  params: []

- id: display_clear
  label: Display Clear (OSD)
  kind: action
  command: "C1E\r"
  params: []

- id: image
  label: Image (cycle image preset)
  kind: action
  command: "C27\r"
  params: []

- id: dzoom_plus
  label: D.ZOOM +
  kind: action
  command: "C30\r"
  params: []

- id: dzoom_minus
  label: D.ZOOM -
  kind: action
  command: "C31\r"
  params: []

- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A\r"
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B\r"
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C\r"   # source typo "POINITERUP" - opcode is C3C
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D\r"   # source typo "POINITER DOWN" - opcode is C3D
  params: []

- id: enter
  label: Enter / Select
  kind: action
  command: "C3F\r"
  params: []

- id: freeze_on
  label: Freeze ON
  kind: action
  command: "C43\r"
  params: []

- id: freeze_off
  label: Freeze OFF
  kind: action
  command: "C44\r"
  params: []

- id: zoom_minus
  label: Zoom -
  kind: action
  command: "C46\r"
  params: []

- id: zoom_plus
  label: Zoom +
  kind: action
  command: "C47\r"
  params: []

- id: focus_minus
  label: Focus -
  kind: action
  command: "C4A\r"   # source typo "FOUCS -"
  params: []

- id: focus_plus
  label: Focus +
  kind: action
  command: "C4B\r"   # source typo "FOUCS+"
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "C5D\r"
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "C5E\r"
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "C5F\r"
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "C60\r"
  params: []

- id: auto_pc_adj
  label: Auto PC Adjust
  kind: action
  command: "C89\r"
  params: []

- id: presentation_timer
  label: Presentation Timer
  kind: action
  command: "C8A\r"
  params: []

- id: keystone_up
  label: Keystone Up
  kind: action
  command: "C8E\r"
  params: []

- id: keystone_down
  label: Keystone Down
  kind: action
  command: "C8F\r"
  params: []

- id: keystone_right
  label: Keystone Right
  kind: action
  command: "C90\r"
  params: []

- id: keystone_left
  label: Keystone Left
  kind: action
  command: "C91\r"
  params: []

- id: status_read
  label: Status Read (projector state)
  kind: query
  command: "CR0\r"
  params: []

- id: input_mode_read
  label: Input Mode Read
  kind: query
  command: "CR1\r"
  params: []

- id: lamp_time_read
  label: Lamp Time Read (multi-lamp)
  kind: query
  command: "CR3\r"
  params: []

- id: setting_read
  label: Screen Setting Read (Ceiling/Rear)
  kind: query
  command: "CR4\r"
  params: []

- id: temp_read
  label: Internal Temperature Read (4 sensors)
  kind: query
  command: "CR6\r"
  params: []

- id: lamp_mode_read
  label: Lamp Mode Read (multi-lamp)
  kind: query
  command: "CR7\r"
  params: []
```

## Feedbacks
```yaml
- id: ack
  label: ACK (command accepted)
  type: enum
  values: [ack, error]
  notes: |
    Functional Execution Commands return "ACK [CR]" (0x06 0x0D) on accept, "?[CR]" on decode error.
    Address-prefixed form ("A###Cxx") yields same ACK; broadcast address "FFF" returns no response.

- id: projector_status
  label: Projector Status (CR0 response)
  type: enum
  values:
    - power_on              # "00"
    - standby               # "80"
    - countdown             # "40"
    - cooling_down          # "20"
    - power_failure         # "10"
    - cooling_abnormal_temp # "28"
    - rs232_busy            # "02"
    - power_mgmt_cooling    # "24"
    - power_management      # "04"
    - cooling_lamp_fail     # "21"
    - standby_lamp_fail     # "81"
    - standby_abnormal_temp # "88"
    - cooling_shutter_mgmt  # "2C"
    - standby_shutter_mgmt  # "8C"

- id: selected_input
  label: Selected Input (CR1 response)
  type: enum
  values: ["1", "2", "3", "4"]

- id: lamp_hours
  label: Lamp Running Hours (CR3 response)
  type: string
  notes: |
    "%1_%2" [CR] - %1 = lamp 1 hours, %2 = lamp 2 hours; space-separated.
    Example: "00410_00410" → both lamps 410 hours.

- id: screen_setting
  label: Screen Setting (CR4 response)
  type: enum
  values:
    - normal       # "11"
    - rear_ceiling # "10"  (top/bottom reversed)
    - rear         # "01"  (left/right reversed)
    - ceiling      # "00"  (top/bottom + left/right reversed)

- id: internal_temps
  label: Internal Temperatures (CR6 response)
  type: string
  notes: |
    "%1_%2_%3_%4" [CR] - 4 sensor readings, format "00.0".
    Negative temps prefixed "-" (e.g. "-05.5"); sensor error returns "E00.0".
    Example: "_31.5__35.2__33.4__33.4".

- id: lamp_mode
  label: Lamp Mode (CR7 response)
  type: string
  notes: |
    2-digit hex "0F" [CR] form.
    Digit 1 (mode): 0=2-lamp, 1=1-lamp using lamp 1, 2=1-lamp using lamp 2.
    Digit 2 (per-lamp state, 4-bit): 0=ALL OFF, 1=lamp1 ON, 2=lamp2 ON, 3=ALL ON.
```

## Variables
```yaml
# UNRESOLVED: no settable parameter ranges (e.g. keystone degree, zoom step, focus step) are stated in source.
# Each lens/zoom/focus/keystone command is a discrete pipelined direction action, not a parameterized level.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All state is read via Status Read commands (CR0-CR7).
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off   # C01 is "immediate" power off; source flags it as distinct from front-panel power
interlocks: []
# Source describes operational states during which Functional Execution Commands are blocked:
# - Cooling Down (incl. abnormal temp, lamp fail, shutter management, power management)
# - Abnormal Temperature / Abnormal Power status
# - Input switching (5s lockout)
# - Power-on initialization (~7s after AC plug-in)
# During blocked states projector still returns ACK, but does not execute (except Status Read).
# Source does not define interlock procedures or recovery sequences - populate only from explicit text.
```

## Notes
- Command syntax: `"Cxx" [CR]` for functional, `"CRx" [CR]` for status read. CR = 0x0D. Source uses lowercase prohibition — senders must use uppercase A-Z.
- Address-prefixed form: `"A" Address "C" Command [CR]` or `"A" Address "CR" Command [CR]`; address = "001"–"999"; broadcast = "FFF" (executes but no response); initial unit address = "001" (set in Service Mode).
- Baud rate selectable in Service Mode between 9600 and 19200; initial default is 19200.
- Pipelining rules: zoom/focus/lens-shift commands 100 ms interval; other commands 500 ms interval; status read 500 ms; reply timeout 5 s before next send.
- Source has typos in command table ("FOUCS", "POINITER", "KEYSTON E"); opcodes C4A/C4B, C3C/C3D, C8E–C91 are the authoritative mnemonics.
- Cable: dedicated D-Sub 9-pin serial cable (PC COM → Projector SERIAL PORT IN).
- AC initialization window: ~7 s after power plug-in where no commands are processed; during POWER ON countdown (~7 s) only Status Read works (500 ms after ACK).
- "C01" POWER OFF is **immediate** (distinct from front-panel ON/STAND-BY which shows "Power Off" UI then enters countdown).
- During input switch, ~5 s lockout; Status Read works 500 ms after ACK.

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - github.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000581-01-christie-lit-tech-ref-dhd800-rs232-bsc.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000246-01-dhd800-network-and-operation-user-manual.pdf
  - https://github.com/aidenappl/Christie-DHD800-Projector-Commands
retrieved_at: 2026-07-22T00:20:53.754Z
last_checked_at: 2026-07-22T00:56:40.014Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:56:40.014Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions matched literally in source; transport values verified; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source names \"DHD800\" on cover and \"PDG-DHT8000L\" in body; treated as compatible family. Exact power/voltage specs, fault-recovery sequences, and firmware compatibility ranges not stated."
- "no settable parameter ranges (e.g. keystone degree, zoom step, focus step) are stated in source."
- "source describes no unsolicited notifications. All state is read via Status Read commands (CR0-CR7)."
- "source does not define multi-step sequences."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
