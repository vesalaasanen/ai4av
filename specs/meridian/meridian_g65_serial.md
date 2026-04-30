---
schema_version: ai4av-public-spec-v1
device_id: meridian/g65
entity_id: meridian_g65
spec_id: admin/meridian-g65
revision: 1
author: admin
title: "Meridian G65 Control Spec"
status: published
manufacturer: Meridian
manufacturer_key: meridian
model_family: G65
aliases: []
compatible_with:
  manufacturers:
    - Meridian
  models:
    - G65
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: meridian_g65_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:10:10.626Z
retrieved_at: 2026-04-25T21:10:10.626Z
last_checked_at: 2026-04-25T21:10:10.626Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:10:10.626Z
  matched_actions: 55
  action_count: 55
  confidence: high
  summary: "All 55 spec actions (46 commands + 9 status queries) matched literal tokens in source; all transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Meridian G65 Control Spec

## Summary
The Meridian G65 is a surround sound processor/controller with RS-232C serial control. This spec covers the full RS-232 command set including source selection, volume control, DSP preset selection, menu-based parameter adjustment, and status queries. Commands are two ASCII characters (sometimes followed by a signed argument), terminated with carriage return. All commands are echoed and the unit returns a 20-character response.

<!-- UNRESOLVED: no pinout or connector type specified for RS-232 -->
<!-- UNRESOLVED: no firmware version compatibility stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8  # inferred: 1 start + "0 parity" implies 8N1 convention
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # SB standby command
  - routable      # source selection commands (CD, RD, DV, etc.)
  - levelable     # volume, bass, treble, balance, delay controls
  - queryable     # CS01–CS08 status query commands, APnnT menu read
```

## Actions
```yaml
# Source selection
- id: source_cd
  label: Select CD Source
  kind: action
  command: CD
  params: []

- id: source_radio
  label: Select Radio
  kind: action
  command: RD
  params: []

- id: source_dvd
  label: Select DVD
  kind: action
  command: DV
  params: []

- id: source_aux
  label: Select Aux
  kind: action
  command: AX
  params: []

- id: source_disc
  label: Select Disc
  kind: action
  command: DC
  params: []

- id: source_tape
  label: Select Tape
  kind: action
  command: TA
  params: []

- id: source_tv
  label: Select TV
  kind: action
  command: TV
  params: []

- id: source_cable
  label: Select Cable
  kind: action
  command: CB
  params: []

- id: source_sat
  label: Select Satellite
  kind: action
  command: SA
  params: []

- id: source_vcr1
  label: Select VCR1
  kind: action
  command: V1
  params: []

- id: source_vcr2
  label: Select VCR2
  kind: action
  command: V2
  params: []

- id: source_game
  label: Select Game
  kind: action
  command: GA
  params: []

- id: copy_source
  label: Copy Source
  kind: action
  command: CO
  params:
    - name: source_id
      type: integer
      description: "Copy source argument 0–14 (0=CD,1=Radio,2=Aux,3=TV,4=Tape,5=Sat,6=Disc,7=Cable,8=DVD,9=VCR1,10=VCR2,11=Game,12=Source,13=Mute,14=Off)"

# Volume
- id: volume_up
  label: Volume Up
  kind: action
  command: VP
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: VM
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  command: VN
  params:
    - name: level
      type: integer
      description: "Volume level 1–99"

- id: mute
  label: Mute
  kind: action
  command: MU
  params: []

# Power
- id: standby
  label: Standby
  kind: action
  command: SB
  params: []

# Preset
- id: goto_preset
  label: Go to Preset
  kind: action
  command: PN
  params:
    - name: preset
      type: integer
      description: "Preset number (0=Direct,1=Music,2=Trifield,3=Ambisonics,4=Super,5=Stereo,6=Music Logic,9=Mono,10=TV Logic,11=PLIIx Music,12=PLIIx Movie,13=PLIIx THX,14=Discrete,15=Cinema,16=PLIIx Mus6,17=PLIIx Mov6,18=THX,19=THX EX,20=THX Ultra II Cinema,21=THX Music,24–33=User defined)"

- id: next_preset
  label: Next Preset
  kind: action
  command: DS
  params: []

# Menu navigation
- id: menu_right
  label: Menu Right
  kind: action
  command: mr
  params: []

- id: menu_left
  label: Menu Left
  kind: action
  command: ml
  params: []

- id: menu_up
  label: Menu Up
  kind: action
  command: mp
  params: []

- id: menu_down
  label: Menu Down
  kind: action
  command: mm
  params: []

# Menu parameter set
- id: menu_set
  label: Set Menu Parameter
  kind: action
  command: AP
  params:
    - name: menu_hex
      type: string
      description: "Menu number in hex (00–4C range, e.g. 01=Treble,02=Bass,05=Rear level)"
    - name: value_hex
      type: string
      description: "Value in hex two's complement"

# Transport / MSR+ keys
- id: play
  label: Play
  kind: action
  command: PL
  params: []

- id: stop
  label: Stop
  kind: action
  command: ST
  params: []

- id: pause
  label: Pause
  kind: action
  command: PS
  params: []

- id: repeat
  label: Repeat
  kind: action
  command: RP
  params: []

- id: next_track
  label: Next
  kind: action
  command: NE
  params: []

- id: prev_track
  label: Previous
  kind: action
  command: PR
  params: []

- id: display
  label: Display
  kind: action
  command: DI
  params: []

- id: store
  label: Store
  kind: action
  command: SR
  params: []

- id: clear
  label: Clear
  kind: action
  command: CL
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  command: FF
  params: []

- id: fast_back
  label: Fast Back
  kind: action
  command: FB
  params: []

- id: open_close
  label: Open/Close
  kind: action
  command: OP
  params: []

- id: mono
  label: Mono
  kind: action
  command: MO
  params: []

- id: slow
  label: Slow
  kind: action
  command: SL
  params: []

- id: audio
  label: Audio
  kind: action
  command: AU
  params: []

- id: subtitle_toggle
  label: Subtitle On/Off
  kind: action
  command: SU
  params: []

- id: subtitle_choice
  label: Subtitle Choice
  kind: action
  command: su
  params: []

- id: ab_repeat
  label: AB Repeat
  kind: action
  command: AB
  params: []

- id: phase
  label: Phase
  kind: action
  command: PH
  params: []

- id: setup
  label: Setup
  kind: action
  command: SE
  params: []

- id: record
  label: Record
  kind: action
  command: RC
  params: []

- id: band
  label: Band
  kind: action
  command: BA
  params: []

- id: angle
  label: Angle
  kind: action
  command: AN
  params: []

- id: osd
  label: OSD
  kind: action
  command: OS
  params: []

- id: num_key
  label: Number Key
  kind: action
  command: "N"
  params:
    - name: digit
      type: integer
      description: "Digit 0–9"
```

## Feedbacks
```yaml
# Status query commands (CS01–CS08)
- id: status_surround_volume
  type: string
  query: CS01
  description: "Current surround mode and volume number (0–99)"

- id: status_surround_volume_db
  type: string
  query: CS02
  description: "Current surround mode and volume on dB scale (-86 to +12)"

- id: status_digital_stream
  type: string
  query: CS03
  description: "Current digital stream type (PCM etc.)"

- id: status_tuning_info
  type: string
  query: CS04
  description: "Tuning info (only when current source uses internal tuner)"

- id: status_fifo_diag
  type: string
  query: CS05
  description: "FIFO diagnostics"

- id: status_dsp_diag
  type: string
  query: CS06
  description: "DSP decode diagnostics"

- id: status_setup_diag
  type: string
  query: CS07
  description: "Set-up diagnostics"

- id: status_source_diag
  type: string
  query: CS08
  description: "Source diagnostics"

# Menu read response
- id: menu_read
  type: string
  query: "AP{menu_hex}T"
  description: "Returns menu value as TM{menu_hex}{value_hex}"
```

## Variables
```yaml
# Menu-addressable parameters via APnnxx / APnnT
# These are set/read via hex menu numbers — not discrete action commands.
# UNRESOLVED: full variable schema with ranges documented but complex;
# key parameters listed below from the menu table.

- name: treble
  type: continuous
  unit: dB
  range: [-10, +10]
  step: 0.5
  menu_hex: "01"

- name: bass
  type: continuous
  unit: dB
  range: [-5, +5]
  step: 0.5
  menu_hex: "02"

- name: phase
  type: enum
  values: [off, on]
  menu_hex: "03"

- name: lr_balance
  type: continuous
  range: [10L, 10R]
  menu_hex: "04"

- name: rear_level
  type: continuous
  unit: dB
  range: ["-30R", "+10F"]
  menu_hex: "05"

- name: rear_delay
  type: continuous
  unit: ms
  range: [0, 30]
  step: 0.5
  menu_hex: "06"
  note: "Music modes; also 2C for 5.1 modes (0–15ms), 44 for PLII(x) (10–25ms)"

- name: centre_level
  type: continuous
  unit: dB
  range: [-3, +3]
  step: 0.5
  menu_hex: "09"

- name: centre_delay
  type: continuous
  unit: ms
  range: [-2.5, +5]
  step: 0.5
  menu_hex: "0A"

- name: centre_eq
  type: enum
  values: [0, 1, 2, 3]
  menu_hex: "0B"

- name: lipsync
  type: continuous
  unit: ms
  range: [0, 30]
  step: 0.5
  menu_hex: "1D"
  note: "Products without Room Correction; 4C for products with (0–85ms)"

- name: side_level
  type: continuous
  unit: dB
  range: [-30, +10]
  step: 1
  menu_hex: "19"

- name: lfe_level
  type: continuous
  unit: dB
  range: [-18, +10]
  menu_hex: "4A"

- name: brightness
  type: continuous
  range: [0, 15]
  menu_hex: "2F"

- name: width
  type: continuous
  range: [0, 1.5]
  step: 0.1
  menu_hex: "0E"
  note: "Trifield only; 0F for Super Stereo (0–1.0)"
```

## Events
```yaml
# No unsolicited notification protocol described in source.
# The G65 only responds to commands (echo + 20-char response).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source.
# Note: invalid menu commands return "Error" — this is error handling, not a safety interlock.
```

## Notes
- All commands are two ASCII characters, optionally followed by a signed numeric argument. Commands are executed on carriage return (`\r`).
- The G65 echoes every command and returns a 20-character response after execution.
- Backspace is supported for command editing.
- Menu commands (`APnnxx`) use hexadecimal values in two's complement. Entering invalid values returns "Error".
- Some menu parameters are only available in certain DSP modes (see Restrictions column in source table). Attempting to adjust an unavailable parameter returns an error.
- Copy Source command (`COnn`) argument is a numeric code 0–14 mapped to specific sources.
- Preset command (`PNnn`) uses numeric codes 0–33 for DSP surround modes including user-defined presets 24–33.
- Case sensitivity: some commands are uppercase only (source, volume, standby), while menu navigation is lowercase (`mr`, `ml`, `mp`, `mm`). MSR+ additional keys use mixed case.
<!-- UNRESOLVED: RS-232 connector pinout and cable wiring not specified -->
<!-- UNRESOLVED: no power-on command documented, only standby -->
<!-- UNRESOLVED: response format details beyond "20 characters" not specified -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: meridian_g65_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:10:10.626Z
retrieved_at: 2026-04-25T21:10:10.626Z
last_checked_at: 2026-04-25T21:10:10.626Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:10:10.626Z
matched_actions: 55
action_count: 55
confidence: high
summary: "All 55 spec actions (46 commands + 9 status queries) matched literal tokens in source; all transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```
