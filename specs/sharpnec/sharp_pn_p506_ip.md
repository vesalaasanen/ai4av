---
spec_id: admin/sharp-nec-pn-p506
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pn P506 Control Spec"
manufacturer: Sharp/NEC
model_family: "Pn P506"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Pn P506"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:06:05.965Z
last_checked_at: 2026-06-18T09:09:29.449Z
generated_at: 2026-06-18T09:09:29.449Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source manual is a generic projector reference (BDT140013 Rev 7.1) describing projector features (lens, lamp, shutter); it does not explicitly name the Pn P506 model or confirm which commands that model supports. Appendix \"Supplementary Information by Command\" referenced for input terminal / aspect / eco mode / base model type enum values was not included in the refined source text, so several enum value tables are incomplete."
  - "source states \"Communication mode: Full duplex\" but does not specify flow control"
  - "source describes only request/response; no unsolicited notifications documented."
  - "no multi-step sequences described explicitly in source."
  - "no explicit safety interlock procedures or power-on sequencing requirements stated."
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, sub input values) was not present in the refined source text, so several enum tables are incomplete."
  - "firmware version compatibility not stated in source."
  - "wireless LAN unit details deferred to separate operation manual."
  - "exact Pn P506 model confirmation and ID2 model code not stated in this manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:09:29.449Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pn P506 Control Spec

## Summary
Projector control spec for the Sharp/NEC Pn P506, based on the "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). The device supports control over both RS-232C serial and TCP/IP (wired/wireless LAN) using a binary frame protocol with hex opcodes and a trailing checksum byte. This spec enumerates the full command catalogue (power, input switching, mutes, picture/volume/aspect adjust, lens control and memory, status queries, eco mode, PIP/PbP, edge blending, audio select, and information requests).

<!-- UNRESOLVED: source manual is a generic projector reference (BDT140013 Rev 7.1) describing projector features (lens, lamp, shutter); it does not explicitly name the Pn P506 model or confirm which commands that model supports. Appendix "Supplementary Information by Command" referenced for input terminal / aspect / eco mode / base model type enum values was not included in the refined source text, so several enum value tables are incomplete. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # source lists selectable rates 115200/38400/19200/9600/4800 bps; 115200 shown as first/highest option
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Communication mode: Full duplex" but does not specify flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable      # inferred: many status request commands present (009, 037, 060, 078, 084, 097, 305)
  - levelable      # inferred: PICTURE/VOLUME/LAMP adjust commands present (030-1, 030-2, 030-15)
  - routable       # inferred: INPUT SW CHANGE (018) and audio select (319-10) present
```

## Actions
```yaml
# Command frame format (hex): <Header> <ID1> <ID2> <LEN> <DATA...> <CKS>
# CKS (checksum) = low-order byte of the sum of all preceding bytes.
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# Each action below shows the literal command payload verbatim from the source.
# CKS in parameterized templates is computed at runtime.

- id: error_status_request
  label: 009. Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 error bit fields (cover, fan, temperature, lamp, etc.). Success response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"

- id: power_on
  label: 015. Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command accepted."

- id: power_off
  label: 016. Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off (incl. cooling time), no other command accepted."

- id: input_sw_change
  label: 018. Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input_terminal} {CKS}"
  params:
    - name: input_terminal
      type: byte
      description: "Input terminal value (DATA01). Example 06h = video port. See Appendix 'Supplementary Information by Command'."
  notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01 FFh = ended with error (no signal switch)."

- id: picture_mute_on
  label: 020. Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: 021. Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022. Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: 023. Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024. Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: 025. Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1. Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01 adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: mode
      type: byte
      description: "DATA02: 00h absolute value, 01h relative value"
    - name: value
      type: integer
      description: "DATA03 (low 8 bits) + DATA04 (high 8 bits) signed adjustment value"
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

- id: volume_adjust
  label: 030-2. Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: mode
      type: byte
      description: "DATA01: 00h absolute value, 01h relative value"
    - name: value
      type: integer
      description: "DATA02 (low 8 bits) + DATA03 (high 8 bits)"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: 030-12. Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect_value} 00h {CKS}"
  params:
    - name: aspect_value
      type: byte
      description: "DATA01 aspect value. See Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: 030-15. Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01=96h DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: byte
      description: "DATA03: 00h absolute value, 01h relative value"
    - name: value
      type: integer
      description: "DATA04 (low 8 bits) + DATA05 (high 8 bits)"

- id: information_request
  label: 037. Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: 037-3. Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

- id: lamp_information_request_3
  label: 037-4. Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {CKS}"
  params:
    - name: lamp
      type: byte
      description: "DATA01: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: content
      type: byte
      description: "DATA02: 01h lamp usage time (seconds), 04h lamp remaining life (%)"
  notes: "Example (lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: 037-6. Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {CKS}"
  params:
    - name: type
      type: byte
      description: "DATA01: 00h Total Carbon Savings, 01h Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: 050. Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {CKS}"
  params:
    - name: key_code
      type: integer
      description: "WORD key code (DATA01 low + DATA02 high). Values: 2 POWER ON, 3 POWER OFF, 5 AUTO, 6 MENU, 7 UP, 8 DOWN, 9 RIGHT, 10 LEFT, 11 ENTER, 12 EXIT, 13 HELP, 15 MAGNIFY UP, 16 MAGNIFY DOWN, 19 MUTE, 41 PICTURE, 75 COMPUTER1, 76 COMPUTER2, 79 VIDEO1, 81 S-VIDEO1, 132 VOLUME UP, 133 VOLUME DOWN, 138 FREEZE, 163 ASPECT, 215 SOURCE, 238 LAMP MODE/ECO"
  notes: "Example (AUTO, key 5): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01 FFh = ended with error."

- id: shutter_close
  label: 051. Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052. Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053. Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {content} {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01 lens axis; 06h = Periphery Focus"
    - name: content
      type: byte
      description: "DATA02: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"
  notes: "After 7Fh/81h continuous drive, send 00h to stop. Lens can be re-controlled without stop while driving."

- id: lens_control_request
  label: 053-1. Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01 lens axis to query"
  notes: "Returns upper limit, lower limit, and current value (16-bit each)."

- id: lens_control_2
  label: 053-2. Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: target
      type: byte
      description: "DATA01 lens axis; FFh = Stop (mode/value ignored)"
    - name: mode
      type: byte
      description: "DATA02: 00h absolute value, 02h relative value"
    - name: value
      type: integer
      description: "DATA03 (low 8 bits) + DATA04 (high 8 bits)"

- id: lens_memory_control
  label: 053-3. Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {CKS}"
  params:
    - name: operation
      type: byte
      description: "DATA01: 00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: 053-4. Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {CKS}"
  params:
    - name: operation
      type: byte
      description: "DATA01: 00h MOVE, 01h STORE, 02h RESET"
  notes: "Controls the profile number selected by LENS PROFILE SET (053-10)."

- id: lens_memory_option_request
  label: 053-5. Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {CKS}"
  params:
    - name: option
      type: byte
      description: "DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
  notes: "Returns setting value DATA02: 00h OFF, 01h ON."

- id: lens_memory_option_set
  label: 053-6. Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {CKS}"
  params:
    - name: option
      type: byte
      description: "DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: value
      type: byte
      description: "DATA02: 00h OFF, 01h ON"

- id: lens_information_request
  label: 053-7. Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bit field: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: 053-10. Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {CKS}"
  params:
    - name: profile
      type: byte
      description: "DATA01: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: 053-11. Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01: 00h Profile 1, 01h Profile 2."

- id: gain_parameter_request_3
  label: 060-1. Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {CKS}"
  params:
    - name: name
      type: byte
      description: "DATA01: 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST"
  notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths. Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

- id: setting_request
  label: 078-1. Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

- id: running_status_request
  label: 078-2. Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: input_status_request
  label: 078-3. Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (practical = returned+1), selection signal type, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: 078-4. Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h Off / 01h On)."

- id: model_name_request
  label: 078-5. Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string DATA01-32 (NUL terminated)."

- id: cover_status_request
  label: 078-6. Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h Normal (cover opened), 01h Cover closed."

- id: freeze_control
  label: 079. Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {CKS}"
  params:
    - name: state
      type: byte
      description: "DATA01: 01h freeze on, 02h freeze off"

- id: information_string_request
  label: 084. Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {info_type} 01h {CKS}"
  params:
    - name: info_type
      type: byte
      description: "DATA01: 03h Horizontal synchronous frequency, 04h Vertical synchronous frequency"
  notes: "Returns label string with length."

- id: eco_mode_request
  label: 097-8. Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (or Light mode / Lamp mode depending on model). See Appendix for values."

- id: lan_projector_name_request
  label: 097-45. LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name DATA01-17 (NUL terminated)."

- id: lan_mac_address_status_request_2
  label: 097-155. LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address DATA01-06."

- id: pip_picture_by_picture_request
  label: 097-198. PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {CKS}"
  params:
    - name: item
      type: byte
      description: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: "Returns DATA02 setting value. MODE: 00h PIP, 01h PBP. START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT."

- id: edge_blending_mode_request
  label: 097-243-1. Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h OFF, 01h ON."

- id: eco_mode_set
  label: 098-8. Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {CKS}"
  params:
    - name: value
      type: byte
      description: "DATA01 eco mode value. See Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: 098-45. LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01}-{name_16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: "DATA01-16 projector name (up to 16 bytes)"

- id: pip_picture_by_picture_set
  label: 098-198. PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {CKS}"
  params:
    - name: item
      type: byte
      description: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: value
      type: byte
      description: "DATA02 setting value. MODE: 00h PIP, 01h PBP. START POSITION: 00h TL, 01h TR, 02h BL, 03h BR. Sub input values in Appendix."

- id: edge_blending_mode_set
  label: 098-243-1. Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {CKS}"
  params:
    - name: value
      type: byte
      description: "DATA01: 00h OFF, 01h ON"

- id: base_model_type_request
  label: 305-1. Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name string (DATA03-11)."

- id: serial_number_request
  label: 305-2. Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number DATA01-16 (NUL terminated)."

- id: basic_information_request
  label: 305-3. Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, selection signal type, video mute, sound mute, onscreen mute, freeze status."

- id: audio_select_set
  label: 319-10. Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input_terminal} {audio_source} {CKS}"
  params:
    - name: input_terminal
      type: byte
      description: "DATA01 input terminal. See Appendix 'Supplementary Information by Command'."
    - name: audio_source
      type: byte
      description: "DATA02: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Query responses are binary-framed; observable states derivable from source:
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06"
- id: error_status
  type: bitmask
  description: "12-byte error bit field from 009 ERROR STATUS REQUEST (cover, fan, temperature, lamp, etc.)"
- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037-4 LAMP INFORMATION REQUEST 3"
- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 LAMP INFORMATION REQUEST 3"
- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 FILTER USAGE INFORMATION REQUEST"
- id: mute_status
  type: composite
  description: "Picture/sound/onscreen/forced-onscreen mute flags from 078-4"
- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST"
```

## Variables
```yaml
# Settable parameters already represented as parameterized Actions (volume, picture gains,
# aspect, eco mode, lens position, lens memory options, edge blending, PIP/PbP, projector name).
# No additional standalone variables beyond those action parameters.
```

## Events
```yaml
# UNRESOLVED: source describes only request/response; no unsolicited notifications documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes relevant operational constraints (not safety interlocks per se):
# - POWER ON (015): while powering on, no other command accepted.
# - POWER OFF (016): during power-off incl. cooling time, no other command accepted.
# - 009 ERROR STATUS includes interlock switch open bit (DATA09 Bit1) and cover/lens errors.
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing requirements stated.
```

## Notes
- Binary frame protocol: `<Header> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Header byte encodes message category: `0xh` = info/read, `1xh`/`2xh`/`3xh` = write variants; response frames prefix with `2xh` (success) or `Axh` (error) mirroring the command's low nibble.
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes. Documented example: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **ID1** = control ID set on the projector; **ID2** = model code (varies by model) — both must be filled per device at runtime.
- Serial config selectable rates: 115200 / 38400 / 19200 / 9600 / 4800 bps; 8N1; full duplex. Baud shown as 115200 (first listed option) — configure to match projector setting.
- Lamp/filter usage times update at 1-minute intervals despite 1-second resolution.
- Remote key code command (050) sends virtual remote keys; useful for UI navigation (UP/DOWN/ENTER/EXIT/MENU).
- The source is a shared NEC/Sharp projector reference manual (BDT140013 Rev 7.1); exact Pn P506 feature support should be confirmed against the device.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model type values, sub input values) was not present in the refined source text, so several enum tables are incomplete. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: wireless LAN unit details deferred to separate operation manual. -->
<!-- UNRESOLVED: exact Pn P506 model confirmation and ID2 model code not stated in this manual. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:06:05.965Z
last_checked_at: 2026-06-18T09:09:29.449Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:09:29.449Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source manual is a generic projector reference (BDT140013 Rev 7.1) describing projector features (lens, lamp, shutter); it does not explicitly name the Pn P506 model or confirm which commands that model supports. Appendix \"Supplementary Information by Command\" referenced for input terminal / aspect / eco mode / base model type enum values was not included in the refined source text, so several enum value tables are incomplete."
- "source states \"Communication mode: Full duplex\" but does not specify flow control"
- "source describes only request/response; no unsolicited notifications documented."
- "no multi-step sequences described explicitly in source."
- "no explicit safety interlock procedures or power-on sequencing requirements stated."
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, sub input values) was not present in the refined source text, so several enum tables are incomplete."
- "firmware version compatibility not stated in source."
- "wireless LAN unit details deferred to separate operation manual."
- "exact Pn P506 model confirmation and ID2 model code not stated in this manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
