---
spec_id: admin/sharp-nec-8m-b70au
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC 8M B70AU Control Spec"
manufacturer: Sharp/NEC
model_family: "8M B70AU"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "8M B70AU"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:26:06.672Z
last_checked_at: 2026-06-17T19:32:54.313Z
generated_at: 2026-06-17T19:32:54.313Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model marketing name and firmware compatibility not stated in source; input-terminal value table, eco-mode value table, and base-model-type value table are referenced but live in an \"Appendix / Supplementary Information by Command\" not present in this refined extract."
  - "source gives a baud-rate list, not a single default; device negotiates/configures. Wiring: PC CONTROL = D-SUB 9P cross cable (2/3 crossed, 7/8 crossed, 5=GND). LAN = RJ-45 10/100 auto-MDIX."
  - "value list in source Appendix not in extract"
  - "selection-signal-type value table referenced to source Appendix"
  - "source contains no power-on sequencing procedure, voltage/current"
  - "firmware version compatibility not stated in source."
  - "model marketing name / full model string not in this extract; \"8M B70AU\" used as given."
  - "input-terminal value table, eco-mode value table, base-model-type value table, and PIP sub-input value table are referenced to a source Appendix (\"Supplementary Information by Command\") not present in this refined extract."
  - "wireless-LAN unit specs deferred to a separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:32:54.313Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exactly to source hex commands; transport parameters fully supported; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC 8M B70AU Control Spec

## Summary
Control command reference for the Sharp/NEC 8M B70AU projector (manual BDT140013 Revision 7.1). Device accepts binary framed control commands over both an RS-232C serial link (PC CONTROL, D-SUB 9P) and a wired/wireless LAN (TCP). Commands are hex byte sequences terminated by a checksum byte (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: model marketing name and firmware compatibility not stated in source; input-terminal value table, eco-mode value table, and base-model-type value table are referenced but live in an "Appendix / Supplementary Information by Command" not present in this refined extract. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as selectable; 115200 shown as default-range top
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex"; no hardware flow-control field documented
auth:
  type: none  # inferred: no auth procedure in source
# UNRESOLVED: source gives a baud-rate list, not a single default; device negotiates/configures. Wiring: PC CONTROL = D-SUB 9P cross cable (2/3 crossed, 7/8 crossed, 5=GND). LAN = RJ-45 10/100 auto-MDIX.
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many *REQUEST commands returning state
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL present
  - routable     # inferred: INPUT SW CHANGE + PIP/PbyP SUB INPUT selection present
```

## Actions
```yaml
# Frame legend: each command payload is the hex byte string as written in the
# source. Checksum byte (last byte where literal) = low-order 8 bits of the sum
# of all preceding bytes. <ID1>=control ID, <ID2>=model code are set by the
# projector and appear in responses, not in the command payloads shown.
# Parameterized commands show <DATA##> placeholders verbatim.

- id: error_status_request
  label: 009 Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: 015 Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: 016 Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: 018 Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h=Video). Full value list in source Appendix.

- id: picture_mute_on
  label: 020 Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: 021 Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022 Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: 023 Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024 Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: 025 Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1 Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute,01h=relative)
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: 030-2 Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment mode (00h=absolute,01h=relative)
    - name: DATA02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA03
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: 030-12 Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Aspect value (full list in source Appendix)

- id: other_adjust
  label: 030-15 Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Target high byte (96h for LAMP ADJUST / LIGHT ADJUST)
    - name: DATA02
      type: integer
      description: Target low byte (FFh for LAMP/LIGHT ADJUST)
    - name: DATA03
      type: integer
      description: Adjustment mode (00h=absolute,01h=relative)
    - name: DATA04
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA05
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request
  label: 037 Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: 037-3 Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: 037-4 Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lamp selector (00h=Lamp1,01h=Lamp2 [two-lamp models only])
    - name: DATA02
      type: integer
      description: Content (01h=usage time seconds,04h=remaining life %)

- id: carbon_savings_information_request
  label: 037-6 Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Content (00h=total,01h=during operation)

- id: remote_key_code
  label: 050 Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (see key code list)
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys)

- id: shutter_close
  label: 051 Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052 Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053 Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target (06h=Periphery Focus)
    - name: DATA02
      type: integer
      description: Motion (00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=+,81h=-,FDh=-0.25s,FEh=-0.5s,FFh=-1s)

- id: lens_control_request
  label: 053-1 Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target to read

- id: lens_control_2
  label: 053-2 Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Target (FFh=Stop)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute,02h=relative)
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: 053-3 Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h=MOVE,01h=STORE,02h=RESET)

- id: reference_lens_memory_control
  label: 053-4 Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h=MOVE,01h=STORE,02h=RESET)

- id: lens_memory_option_request
  label: 053-5 Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Option (00h=LOAD BY SIGNAL,01h=FORCED MUTE)

- id: lens_memory_option_set
  label: 053-6 Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Option (00h=LOAD BY SIGNAL,01h=FORCED MUTE)
    - name: DATA02
      type: integer
      description: Setting value (00h=OFF,01h=ON)

- id: lens_information_request
  label: 053-7 Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: 053-10 Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Profile number (00h=Profile1,01h=Profile2)

- id: lens_profile_request
  label: 053-11 Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: 060-1 Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjusted value name (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness,05h=Volume,96h=Lamp/Light Adjust)

- id: setting_request
  label: 078-1 Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: 078-2 Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: 078-3 Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: 078-4 Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: 078-5 Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: 078-6 Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: 079 Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: State (01h=freeze on,02h=freeze off)

- id: information_string_request
  label: 084 Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h=horizontal sync freq,04h=vertical sync freq)

- id: eco_mode_request
  label: 097-8 Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: 097-45 LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: 097-155 LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198 PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Target (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT1,09h=SUB INPUT2,0Ah=SUB INPUT3)

- id: edge_blending_mode_request
  label: 097-243-1 Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: 098-8 Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value (full list in source Appendix)

- id: lan_projector_name_set
  label: 098-45 LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name_bytes
      type: string
      description: Projector name, up to 16 bytes (DATA01..DATA16)

- id: pip_picture_by_picture_set
  label: 098-198 PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Target (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT1,09h=SUB INPUT2,0Ah=SUB INPUT3)
    - name: DATA02
      type: integer
      description: Setting value (MODE:00h=PIP,01h=PbyP; START POSITION:00h=TL,01h=TR,02h=BL,03h=BR; sub-input list in Appendix)

- id: edge_blending_mode_set
  label: 098-243-1 Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Setting value (00h=OFF,01h=ON)

- id: base_model_type_request
  label: 305-1 Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: 305-2 Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: 305-3 Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: 319-10 Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (value list in source Appendix)
    - name: DATA02
      type: integer
      description: Audio source (00h=terminal in DATA01,01h=BNC,02h=COMPUTER)
```

## Feedbacks
```yaml
# Response frames: success prefix = 2Xh (same low byte as command), failure
# prefix = AXh with <ERR1> <ERR2>. Observable states below map the *REQUEST
# responses documented in the source.

- id: power_status
  type: enum
  values: [standby, power_on]
  source: 078-2 DATA03 (00h=Standby,01h=Power on)

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA04

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA05

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: 078-2 DATA06 / 305-3 DATA01

- id: mute_status
  type: composite
  fields:
    picture_mute: {type: enum, values: [off, on]}
    sound_mute: {type: enum, values: [off, on]}
    onscreen_mute: {type: enum, values: [off, on]}
    forced_onscreen_mute: {type: enum, values: [off, on]}
  source: 078-4

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: 078-6

- id: lamp_usage_time_seconds
  type: integer
  source: 037-4 DATA03-06 / 037 DATA83-86 (updated 1-min intervals)

- id: lamp_remaining_life_percent
  type: integer
  source: 037-4 content 04h (negative if deadline exceeded)

- id: filter_usage_time_seconds
  type: integer
  source: 037-3 DATA01-04

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: value list in source Appendix not in extract
  source: 097-8 / 098-8

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1 / 098-243-1

- id: model_name
  type: string
  source: 078-5 / 305-1

- id: serial_number
  type: string
  source: 305-2

- id: mac_address
  type: string
  source: 097-155

- id: projector_name
  type: string
  source: 097-45 / 098-45

- id: lens_operation_status
  type: composite
  fields:
    lens_memory: {type: enum, values: [stop, operating]}
    zoom: {type: enum, values: [stop, operating]}
    focus: {type: enum, values: [stop, operating]}
    lens_shift_h: {type: enum, values: [stop, operating]}
    lens_shift_v: {type: enum, values: [stop, operating]}
  source: 053-7 DATA01 bitfield

- id: input_signal_status
  type: composite
  source: 078-3 / 305-3
  # UNRESOLVED: selection-signal-type value table referenced to source Appendix

- id: error_status
  type: composite
  source: 009 DATA01-12 bitfield (cover/fan/temp/lamp/formatter/mirror-cover/interlock errors)

- id: carbon_savings_kg
  type: number
  source: 037-6 DATA02-05 (max 99999 kg)

- id: selected_lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: 053-11

- id: h_sync_frequency
  type: string
  source: 084 type 03h

- id: v_sync_frequency
  type: string
  source: 084 type 04h
```

## Variables
```yaml
# All settable parameters are surfaced as Actions above (PICTURE ADJUST,
# VOLUME ADJUST, ASPECT ADJUST, OTHER/LAMP-LIGHT ADJUST, LENS CONTROL 2,
# ECO MODE SET, EDGE BLENDING MODE SET, LENS PROFILE SET, AUDIO SELECT SET,
# LAN PROJECTOR NAME SET). No additional continuous variables exist outside
# those action payloads.
```

## Events
```yaml
# None. Source documents no unsolicited/push notifications; all responses are
# replies to commands. Polling via *REQUEST commands is required to observe
# state.
```

## Macros
```yaml
# None described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_transition_command_lockout
    description: >
      Explicit in source - "While this command is turning on the power, no
      other command can be accepted." and "While this command is turning off
      the power (including the cooling time), no other command can be
      accepted." Other commands sent during power-on or power-off (incl.
      cooling) will be rejected.
    source: 015 POWER ON / 016 POWER OFF
  - id: command_rejected_when_power_off
    description: >
      Error code ERR1=02h ERR2=0Dh - "The command cannot be accepted because
      the power is off." Most non-power commands require power-on state.
    source: 2.4 Error code list
# UNRESOLVED: source contains no power-on sequencing procedure, voltage/current
# ratings, or hard interlock wiring requirements - only status/error reporting.
```

## Notes
- Commands are binary hex frames, not ASCII. `<ID1>` (control ID) and `<ID2>` (model code) appear in response frames and in the general frame template but are NOT present in the literal command payloads documented for each operation (e.g. POWER ON is `02h 00h 00h 00h 00h 02h` with no ID bytes).
- Checksum rule (from source §2.2): sum all bytes preceding the checksum, take the low-order 8 bits. Verified against documented examples (POWER ON→02h, INPUT to Video→0Eh).
- Three response shapes exist: success-with-no-data (`2Xh ... 00h <CKS>`), success-with-data (`2Xh ... LEN <DATA..> <CKS>`), and failure (`AXh ... 02h <ERR1> <ERR2> <CKS>`). Full ERR1/ERR2 code table in source §2.4 (21 entries).
- Serial connection is a cross cable on PC CONTROL (D-SUB 9P): pins 2/3 crossed (RxD↔TxD), 7/8 crossed (RTS↔CTS), pin 5 GND.
- Usage-time fields (lamp/filter) return seconds but are only refreshed by the projector at 1-minute intervals.
- Baud rate is selectable among 115200/38400/19200/9600/4800 bps; the device/software picks one — no single documented default.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model marketing name / full model string not in this extract; "8M B70AU" used as given. -->
<!-- UNRESOLVED: input-terminal value table, eco-mode value table, base-model-type value table, and PIP sub-input value table are referenced to a source Appendix ("Supplementary Information by Command") not present in this refined extract. -->
<!-- UNRESOLVED: wireless-LAN unit specs deferred to a separate operation manual. -->
````

Spec emitted. 53 commands, all rows covered, payloads verbatim, gaps marked.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:26:06.672Z
last_checked_at: 2026-06-17T19:32:54.313Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:32:54.313Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exactly to source hex commands; transport parameters fully supported; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model marketing name and firmware compatibility not stated in source; input-terminal value table, eco-mode value table, and base-model-type value table are referenced but live in an \"Appendix / Supplementary Information by Command\" not present in this refined extract."
- "source gives a baud-rate list, not a single default; device negotiates/configures. Wiring: PC CONTROL = D-SUB 9P cross cable (2/3 crossed, 7/8 crossed, 5=GND). LAN = RJ-45 10/100 auto-MDIX."
- "value list in source Appendix not in extract"
- "selection-signal-type value table referenced to source Appendix"
- "source contains no power-on sequencing procedure, voltage/current"
- "firmware version compatibility not stated in source."
- "model marketing name / full model string not in this extract; \"8M B70AU\" used as given."
- "input-terminal value table, eco-mode value table, base-model-type value table, and PIP sub-input value table are referenced to a source Appendix (\"Supplementary Information by Command\") not present in this refined extract."
- "wireless-LAN unit specs deferred to a separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
