---
spec_id: admin/sharp-nec-pn-hs501
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-HS501 Projector Control Spec"
manufacturer: Sharp/NEC
model_family: PN-HS501
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-HS501
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:03:44.692Z
last_checked_at: 2026-06-18T09:07:08.282Z
generated_at: 2026-06-18T09:07:08.282Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is generic \"Projector Control Command Reference Manual\" — model PN-HS501 supplied by operator, not stated verbatim in doc body. Firmware compat, voltage/power specs, exact full enumeration of LENS CONTROL DATA01 targets (only 06h Periphery Focus shown) not in source."
  - "source lists multiple (115200/38400/19200/9600/4800) - no single value stated"
  - "flow_control not stated (RTS/CTS pins wired per pin table, mode unstated)"
  - "appendix not in source."
  - "appendix not in source)."
  - "other target values (zoom/focus/shift) not enumerated in source.\""
  - "enumeration incomplete in source."
  - "full response schema for queries 037, 037-3, 037-4, 037-6, 053-7, 060-1, 078-1/2/3, 084, 097-*, 305-* are documented in source but only the major observable states are enumerated above as feedbacks."
  - "none documented."
  - "source documents no multi-step command sequences."
  - "no explicit confirmation/interlock procedures documented in source."
  - "(1) Appendix \"Supplementary Information by Command\" referenced for input terminal, aspect, eco mode, sub input, base model type values — not present in refined source. (2) Full DATA01 enumeration for LENS CONTROL (053) missing — only 06h Periphery Focus shown. (3) Model PN-HS501 not named verbatim in doc body — sourced from operator. (4) Baud rate multiple options, no default stated. (5) Flow control mode unstated despite RTS/CTS wiring."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:07:08.282Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-HS501 Projector Control Spec

## Summary
Sharp/NEC PN-HS501 large-format display/projector. Binary hex control protocol over RS-232C serial and TCP/IP LAN (port 7142). Frames carry command opcode, data bytes, and trailing low-byte checksum. Manual revision BDT140013 Rev 7.1.

<!-- UNRESOLVED: source is generic "Projector Control Command Reference Manual" — model PN-HS501 supplied by operator, not stated verbatim in doc body. Firmware compat, voltage/power specs, exact full enumeration of LENS CONTROL DATA01 targets (only 06h Periphery Focus shown) not in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists multiple (115200/38400/19200/9600/4800) - no single value stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not stated (RTS/CTS pins wired per pin table, mode unstated)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: many *REQUEST queries returning state
  - levelable      # inferred: PICTURE ADJUST / VOLUME ADJUST continuous params
  - routable       # inferred: INPUT SW CHANGE / AUDIO SELECT SET routing commands
```

## Actions
```yaml
# Frame layout: <first> <cmd> 00h 00h <LEN> <DATA...> <CKS>
# CKS = low byte of sum of all preceding bytes. CKS shown verbatim from source.
# For LAN/TCP frames, <ID1> <ID2> are inserted after byte[1] in responses; command
# payloads below are the literal serial-form bytes from the source. Developers must
# recompute CKS when DATA placeholder is filled.

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: No other command accepted during power-on transition.

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: No other command accepted during power-off incl. cooling time.

- id: input_sw_change
  label: Input Switch Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal byte (e.g. 06h = video port). Full list in Appendix "Supplementary Information by Command" - UNRESOLVED: appendix not in source.
  notes: Example for video port - 02h 03h 00h 00h 02h 01h 06h 0Eh.

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Cleared on input/video switch.

- id: picture_mute_off
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Cleared on input/video switch or volume adjust.

- id: sound_mute_off
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Cleared on input/video switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness
    - name: DATA02
      type: integer
      description: Mode - 00h absolute, 01h relative
    - name: DATA03_DATA04
      type: integer
      description: Adjustment value (DATA03 low 8 bits, DATA04 high 8 bits)
  notes: Example brightness=+10 → 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. brightness=-10 → ...00h F6h FFh 0Ch.

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Mode - 00h absolute, 01h relative
    - name: DATA02_DATA03
      type: integer
      description: Adjustment value (DATA02 low 8 bits, DATA03 high 8 bits)
  notes: Example volume=10 → 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h.

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value - see Appendix (UNRESOLVED: appendix not in source).

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01_DATA02
      type: integer
      description: Target - 96h/FFh = LAMP ADJUST / LIGHT ADJUST
    - name: DATA03
      type: integer
      description: Mode - 00h absolute, 01h relative
    - name: DATA04_DATA05
      type: integer
      description: Adjustment value (DATA04 low, DATA05 high)

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (D01-49), lamp usage sec (D83-86), filter usage sec (D87-90).

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage seconds (D01-04) and filter alarm start seconds (D05-08). -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)
    - name: DATA02
      type: integer
      description: 01h usage seconds, 04h remaining life %
  notes: Example lamp1 usage → 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining-life returned if past deadline.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h Total, 01h During operation

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "Key code (WORD). Examples: 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO"
  notes: Example AUTO → 02h 0Fh 00h 00h 02h 05h 00h 18h.

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. Source lists only 06h = Periphery Focus. UNRESOLVED: other target values (zoom/focus/shift) not enumerated in source."
    - name: DATA02
      type: integer
      description: "00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +, 81h drive -, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s"
  notes: Send 00h to stop after 7Fh/81h continuous drive. Same command may be issued without stop during lens motion.

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target (see 053 DATA01) - UNRESOLVED: enumeration incomplete in source.

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: FFh = Stop, else lens target
    - name: DATA02
      type: integer
      description: Mode - 00h absolute, 02h relative
    - name: DATA03_DATA04
      type: integer
      description: Adjustment value (low/high 8 bits)

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h MOVE, 01h STORE, 02h RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h MOVE, 01h STORE, 02h RESET
  notes: Operates on profile selected via 053-10 LENS PROFILE SET.

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h LOAD BY SIGNAL, 01h FORCED MUTE

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h LOAD BY SIGNAL, 01h FORCED MUTE
    - name: DATA02
      type: integer
      description: 00h OFF, 01h ON

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns bitmask - Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) op state (0=stop,1=operating).

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h Profile 1, 01h Profile 2

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"
  notes: Example brightness → 03h 05h 00h 00h 03h 00h 00h 00h 0Bh.

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (D01-03), sound function (D04), profile/clock function (D05).

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 01h freeze ON, 02h freeze OFF

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 03h Horizontal sync freq, 04h Vertical sync freq

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request
  label: PIP / Picture-by-Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value - see Appendix (UNRESOLVED: appendix not in source).

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_pbp_set
  label: PIP / Picture-by-Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3
    - name: DATA02
      type: integer
      description: "Value - for MODE: 00h PIP, 01h PBP; for START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; for SUB INPUT: see Appendix (UNRESOLVED)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h OFF, 01h ON

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal - see Appendix (UNRESOLVED: appendix not in source).
    - name: DATA02
      type: integer
      description: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: 078-2 DATA03 / DATA06; 305-3 DATA01

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA04

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA01

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA02

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA03

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: 078-6 DATA01

- id: freeze_state
  type: enum
  values: [off, on]
  source: 305-3 DATA09

- id: error_status
  type: bitmask
  description: 96-bit error field from command 009 (DATA01-12). Bits encode cover/fan/temp/power/lamp/ballast/iris/lens/interlock errors.
  source: 009

# UNRESOLVED: full response schema for queries 037, 037-3, 037-4, 037-6, 053-7, 060-1, 078-1/2/3, 084, 097-*, 305-* are documented in source but only the major observable states are enumerated above as feedbacks.
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Picture brightness (target 00h in 030-1). Range returned by 060-1.

- id: contrast
  type: integer
  description: Picture contrast (target 01h in 030-1).

- id: color
  type: integer
  description: Picture color (target 02h in 030-1).

- id: hue
  type: integer
  description: Picture hue (target 03h in 030-1).

- id: sharpness
  type: integer
  description: Picture sharpness (target 04h in 030-1).

- id: volume
  type: integer
  description: Sound volume (target 05h in 030-2).

- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust (target 96h/FFh in 030-15).

- id: lamp_usage_seconds
  type: integer
  description: Lamp usage time in seconds. Source 037 / 037-4.

- id: filter_usage_seconds
  type: integer
  description: Filter usage time in seconds. Source 037-3.

- id: lamp_remaining_life_percent
  type: integer
  description: Lamp remaining life %. Negative if past deadline. Source 037-4.

- id: eco_mode
  type: integer
  description: Eco/Light/Lamp mode value. Source 097-8 / 098-8.

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: Source 097-243-1 / 098-243-1.
```

## Events
```yaml
# Source documents no unsolicited notifications - projector only responds to commands.
# UNRESOLVED: none documented.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes:
# - Power On (015) blocks all other commands during power-on transition.
# - Power Off (016) blocks all other commands during cooling period.
# - Error field (009) reports interlock switch open (DATA09 Bit1) and lens-not-installed (DATA04 Bit7).
# <!-- UNRESOLVED: no explicit confirmation/interlock procedures documented in source. -->
```

## Notes
- All command bytes are hexadecimal, transmitted as raw bytes (not ASCII hex text).
- Checksum = low 8 bits of sum of all preceding bytes. Example: `20h 81h 01h 60h 01h 00h` → 103h → CKS=03h.
- Responses use leading nibble to indicate class: `2xh`/`3xh` = success reply mirroring command class; `Axh` = error reply (`<ERR1> <ERR2>` follow). ERR1/ERR2 codes documented in §2.4 (e.g. 00h/00h unrecognized, 02h/0Dh power off, 02h/0Fh no authority).
- For LAN/TCP, the same serial-style payload is used with `<ID1>` (control ID) and `<ID2>` (model code) inserted in responses; command payloads match serial form.
- Picture/Sound/Onscreen mute auto-clear on input/video switch (and volume adjust for sound mute).
- Lamp/filter usage updates at one-minute intervals even though stored in one-second units.

<!-- UNRESOLVED: (1) Appendix "Supplementary Information by Command" referenced for input terminal, aspect, eco mode, sub input, base model type values — not present in refined source. (2) Full DATA01 enumeration for LENS CONTROL (053) missing — only 06h Periphery Focus shown. (3) Model PN-HS501 not named verbatim in doc body — sourced from operator. (4) Baud rate multiple options, no default stated. (5) Flow control mode unstated despite RTS/CTS wiring. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:03:44.692Z
last_checked_at: 2026-06-18T09:07:08.282Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:07:08.282Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is generic \"Projector Control Command Reference Manual\" — model PN-HS501 supplied by operator, not stated verbatim in doc body. Firmware compat, voltage/power specs, exact full enumeration of LENS CONTROL DATA01 targets (only 06h Periphery Focus shown) not in source."
- "source lists multiple (115200/38400/19200/9600/4800) - no single value stated"
- "flow_control not stated (RTS/CTS pins wired per pin table, mode unstated)"
- "appendix not in source."
- "appendix not in source)."
- "other target values (zoom/focus/shift) not enumerated in source.\""
- "enumeration incomplete in source."
- "full response schema for queries 037, 037-3, 037-4, 037-6, 053-7, 060-1, 078-1/2/3, 084, 097-*, 305-* are documented in source but only the major observable states are enumerated above as feedbacks."
- "none documented."
- "source documents no multi-step command sequences."
- "no explicit confirmation/interlock procedures documented in source."
- "(1) Appendix \"Supplementary Information by Command\" referenced for input terminal, aspect, eco mode, sub input, base model type values — not present in refined source. (2) Full DATA01 enumeration for LENS CONTROL (053) missing — only 06h Periphery Focus shown. (3) Model PN-HS501 not named verbatim in doc body — sourced from operator. (4) Baud rate multiple options, no default stated. (5) Flow control mode unstated despite RTS/CTS wiring."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
