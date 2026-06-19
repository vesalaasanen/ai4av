---
spec_id: admin/sharp-nec-np-um351wi-tm
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP Um351Wi Tm Control Spec"
manufacturer: Sharp/NEC
model_family: "NP Um351Wi Tm"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP Um351Wi Tm"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:34:01.797Z
last_checked_at: 2026-06-18T08:56:39.163Z
generated_at: 2026-06-18T08:56:39.163Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "default baud rate among the supported set (115200/38400/19200/9600/4800) not stated"
  - "ID1 control ID default value not stated in source"
  - "ID2 model code for NP Um351Wi Tm not stated in source"
  - "flow control / duplex not stated (full-duplex noted in source)"
  - "range from source via GAIN PARAMETER REQUEST 3 DATA02-05, not enumerated in this manual"
  - "enumeration lives in Appendix \"Supplementary Information by Command\""
  - "no explicit power-on sequencing or interlock procedures stated beyond the per-command notes above."
  - "ID1 (control ID) and ID2 (model code) default/expected values for this model not stated in source"
  - "Appendix \"Supplementary Information by Command\" not included in refined source — input terminal enum, aspect enum, eco mode enum, sub input enum values are referenced but not enumerated here"
  - "firmware version compatibility not stated"
  - "flow_control value not stated in source (full-duplex noted but no RTS/CTS handshake rule)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:56:39.163Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP Um351Wi Tm Control Spec

## Summary
Control spec for the Sharp/NEC NP Um351Wi Tm projector, covering RS-232C serial control (PC CONTROL D-SUB 9P) and wired/wireless LAN control. Source: "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Commands use a binary hex protocol with frame header byte 20h/02h/03h/01h/00h, control ID + model code bytes, length byte, variable data, and a trailing checksum byte (low-order byte of sum of all preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud rate among the supported set (115200/38400/19200/9600/4800) not stated -->
<!-- UNRESOLVED: ID1 control ID default value not stated in source -->
<!-- UNRESOLVED: ID2 model code for NP Um351Wi Tm not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # one of supported rates: 115200 / 38400 / 19200 / 9600 / 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control / duplex not stated (full-duplex noted in source)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF commands (015, 016)
  - routable        # inferred from INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
  - queryable       # inferred from numerous REQUEST commands (009, 037, 037-3, 037-4, ...)
  - levelable       # inferred from PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL adjustments
```

## Actions
```yaml
actions:
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
    notes: While turning on power, no other command accepted.

  - id: power_off
    label: Power Off (016)
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While turning off (including cooling time), no other command accepted.

  - id: input_sw_change
    label: Input SW Change (018)
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (e.g. 06h = Video port). See Appendix "Supplementary Information by Command".
    notes: Example for video input -> "02h 03h 00h 00h 02h 01h 06h 0Eh".

  - id: picture_mute_on
    label: Picture Mute On (020)
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Cleared by input/video signal switch.

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
    notes: Cleared by input/video signal switch or volume adjustment.

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
    notes: Cleared by input/video signal switch.

  - id: onscreen_mute_off
    label: Onscreen Mute Off (025)
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust (030-1)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
      - name: DATA02
        type: integer
        description: Adjustment mode (00h=absolute, 01h=relative)
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: Brightness=10 example -> "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h".

  - id: volume_adjust
    label: Volume Adjust (030-2)
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment mode (00h=absolute, 01h=relative)
      - name: DATA02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: Volume=10 example -> "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

  - id: aspect_adjust
    label: Aspect Adjust (030-12)
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Aspect value. See Appendix "Supplementary Information by Command".

  - id: other_adjust
    label: Other Adjust (030-15)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target high byte (96h=LAMP ADJUST/LIGHT ADJUST)
      - name: DATA02
        type: integer
        description: Adjustment target low byte (FFh)
      - name: DATA03
        type: integer
        description: Adjustment mode (00h=absolute, 01h=relative)
      - name: DATA04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: Information Request (037)
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90).

  - id: filter_usage_information_request
    label: Filter Usage Information Request (037-3)
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time seconds (DATA01-04), filter alarm start time seconds (DATA05-08). -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3 (037-4)
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Lamp selector (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only on two-lamp models)
      - name: DATA02
        type: integer
        description: Content (01h=usage time seconds, 04h=remaining life %)
    notes: Lamp 1 usage-time example -> "03h 96h 00h 00h 02h 00h 01h 9Ch".

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request (037-6)
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Scope (00h=Total, 01h=During operation)

  - id: remote_key_code
    label: Remote Key Code (050)
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Key code low byte (see key code list; e.g. 02h=POWER ON, 03h=POWER OFF, 06h=MENU, 4Bh=COMPUTER1)
      - name: DATA02
        type: integer
        description: Key code high byte (always 00h per listed codes)
    notes: AUTO example -> "02h 0Fh 00h 00h 02h 05h 00h 18h".

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target (06h=Periphery Focus)
      - name: DATA02
        type: integer
        description: Content (00h=Stop, 01h/02h/03h=drive + for 1s/0.5s/0.25s, 7Fh=drive+, FFh/FEh/FDh=drive- for 1s/0.5s/0.25s, 81h=drive-)
    notes: Continuous-drive via 7Fh/81h must be stopped by sending 00h.

  - id: lens_control_request
    label: Lens Control Request (053-1)
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target
    notes: Returns adjustment upper/lower limits and current value (DATA02-07).

  - id: lens_control_2
    label: Lens Control 2 (053-2)
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target (FFh=Stop)
      - name: DATA02
        type: integer
        description: Adjustment mode (00h=absolute, 02h=relative)
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: If DATA01=FFh (Stop), DATA02-04 are ignored.

  - id: lens_memory_control
    label: Lens Memory Control (053-3)
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control (053-4)
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)
    notes: Controls profile selected by LENS PROFILE SET (053-10).

  - id: lens_memory_option_request
    label: Lens Memory Option Request (053-5)
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)

  - id: lens_memory_option_set
    label: Lens Memory Option Set (053-6)
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
      - name: DATA02
        type: integer
        description: Setting value (00h=OFF, 01h=ON)

  - id: lens_information_request
    label: Lens Information Request (053-7)
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns bitfield DATA01 (Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V; 0=Stop, 1=During operation).

  - id: lens_profile_set
    label: Lens Profile Set (053-10)
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Profile number (00h=Profile 1, 01h=Profile 2)

  - id: lens_profile_request
    label: Lens Profile Request (053-11)
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3 (060-1)
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)
    notes: Brightness example -> "03h 05h 00h 00h 03h 00h 00h 00h 0Bh".

  - id: setting_request
    label: Setting Request (078-1)
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type (DATA01-03), sound function (DATA04), profile (DATA05).

  - id: running_status_request
    label: Running Status Request (078-2)
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power status, cooling/power-on process, operation status.

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
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: 01h=Freeze on, 02h=Freeze off

  - id: information_string_request
    label: Information String Request (084)
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)

  - id: eco_mode_request
    label: Eco Mode Request (097-8)
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Returns Light mode or Lamp mode depending on model.

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

  - id: pip_picture_by_picture_request
    label: PIP/Picture By Picture Request (097-198)
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request (097-243-1)
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set (098-8)
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Eco mode value. See Appendix "Supplementary Information by Command".

  - id: lan_projector_name_set
    label: LAN Projector Name Set (098-45)
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: Projector name (up to 16 bytes, mapped to DATA01-16)

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set (098-198)
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
      - name: DATA02
        type: integer
        description: Setting value per target (MODE: 00h=PIP/01h=PiP-by-PiP; START POSITION: 00h-03h corners; sub input value per Appendix)

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set (098-243-1)
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Setting value (00h=OFF, 01h=ON)

  - id: base_model_type_request
    label: Base Model Type Request (305-1)
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: Returns base model type (DATA01-02, DATA12-13) and model name string (DATA03-11).

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
    notes: Returns operation status, displayed content, signal types, mute/freeze status.

  - id: audio_select_set
    label: Audio Select Set (319-10)
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value per Appendix
      - name: DATA02
        type: integer
        description: Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    source: 078-2 RUNNING STATUS REQUEST DATA03/DATA06, 305-3 DATA01
  - id: lamp_usage_seconds
    type: integer
    source: 037 DATA83-86, 037-4 DATA03-06
  - id: lamp_remaining_life_percent
    type: integer
    source: 037-4 (content 04h) DATA03-06
  - id: filter_usage_seconds
    type: integer
    source: 037-3 DATA01-04
  - id: error_status_bitfield
    type: bytes
    length: 12
    source: 009 DATA01-12
  - id: input_terminal
    type: integer
    source: 078-3, 305-3
  - id: picture_mute
    type: enum
    values: [off, on]
    source: 078-4 DATA01
  - id: sound_mute
    type: enum
    values: [off, on]
    source: 078-4 DATA02
  - id: onscreen_mute
    type: enum
    values: [off, on]
    source: 078-4 DATA03
  - id: freeze_status
    type: enum
    values: [off, on]
    source: 305-3 DATA09
  - id: eco_mode
    type: integer
    source: 097-8 DATA01
  - id: cover_status
    type: enum
    values: [normal_open, closed]
    source: 078-6 DATA01
  - id: model_name
    type: string
    source: 078-5 DATA01-32
  - id: serial_number
    type: string
    source: 305-2 DATA01-16
  - id: mac_address
    type: bytes
    length: 6
    source: 097-155 DATA01-06
  - id: projector_name
    type: string
    source: 097-45 DATA01-17
  - id: lens_operation_bitfield
    type: byte
    source: 053-7 DATA01
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: 053-11 DATA01
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: 097-243-1 DATA01
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    range: null  # UNRESOLVED: range from source via GAIN PARAMETER REQUEST 3 DATA02-05, not enumerated in this manual
    set_via: picture_adjust (DATA01=00h)
    read_via: gain_parameter_request_3 (DATA01=00h)
  - id: contrast
    type: integer
    range: null  # UNRESOLVED
    set_via: picture_adjust (DATA01=01h)
    read_via: gain_parameter_request_3 (DATA01=01h)
  - id: color
    type: integer
    range: null  # UNRESOLVED
    set_via: picture_adjust (DATA01=02h)
    read_via: gain_parameter_request_3 (DATA01=02h)
  - id: hue
    type: integer
    range: null  # UNRESOLVED
    set_via: picture_adjust (DATA01=03h)
    read_via: gain_parameter_request_3 (DATA01=03h)
  - id: sharpness
    type: integer
    range: null  # UNRESOLVED
    set_via: picture_adjust (DATA01=04h)
    read_via: gain_parameter_request_3 (DATA01=04h)
  - id: volume
    type: integer
    range: null  # UNRESOLVED
    set_via: volume_adjust
    read_via: gain_parameter_request_3 (DATA01=05h)
  - id: lamp_light_adjust
    type: integer
    range: null  # UNRESOLVED
    set_via: other_adjust (DATA01=96h, DATA02=FFh)
    read_via: gain_parameter_request_3 (DATA01=96h)
  - id: aspect
    type: integer
    range: null  # UNRESOLVED: enumeration lives in Appendix "Supplementary Information by Command"
    set_via: aspect_adjust
  - id: eco_mode
    type: integer
    range: null  # UNRESOLVED: enumeration lives in Appendix "Supplementary Information by Command"
    set_via: eco_mode_set
    read_via: eco_mode_request
```

## Events
```yaml
# No unsolicited notifications described in source. All responses are solicited (returned after a command).
events: []
```

## Macros
```yaml
# No explicit multi-step sequences described in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: While power-on is in progress, no other command accepted.
  - command: power_off
    note: While power-off (including cooling time) is in progress, no other command accepted.
  - command: lens_control
    note: Continuous-drive values (7Fh, 81h) must be explicitly stopped by sending DATA02=00h.
# UNRESOLVED: no explicit power-on sequencing or interlock procedures stated beyond the per-command notes above.
```

## Notes
- Checksum (CKS): low-order one byte of the sum of all preceding bytes. Verified worked example: 20h+81h+01h+60h+01h+00h = 103h -> CKS=03h.
- Command framing: header byte (00h-03h for commands; 20h/21h/22h/23h/A0h-A3h for responses) followed by command code, `<ID1> <ID2>`, length byte, data, `<CKS>`.
- Responses are prefixed A0h/A1h/A2h/A3h (acknowledgement) or 20h/21h/22h/23h (data response) depending on command class.
- Error codes: returned in `<ERR1> <ERR2>` on failure (see section 2.4 of source for full table; e.g. 02h 0Dh = "command cannot be accepted because the power is off", 02h 0Fh = "no authority for the operation").
- Both serial and LAN control use the same binary command framing. TCP port 7142 stated for LAN. Default baud rate among the five supported rates is not specified.
- Lens control: continuous drive values must be explicitly stopped; otherwise the lens keeps moving.

<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default/expected values for this model not stated in source -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in refined source — input terminal enum, aspect enum, eco mode enum, sub input enum values are referenced but not enumerated here -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: flow_control value not stated in source (full-duplex noted but no RTS/CTS handshake rule) -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:34:01.797Z
last_checked_at: 2026-06-18T08:56:39.163Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:56:39.163Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "default baud rate among the supported set (115200/38400/19200/9600/4800) not stated"
- "ID1 control ID default value not stated in source"
- "ID2 model code for NP Um351Wi Tm not stated in source"
- "flow control / duplex not stated (full-duplex noted in source)"
- "range from source via GAIN PARAMETER REQUEST 3 DATA02-05, not enumerated in this manual"
- "enumeration lives in Appendix \"Supplementary Information by Command\""
- "no explicit power-on sequencing or interlock procedures stated beyond the per-command notes above."
- "ID1 (control ID) and ID2 (model code) default/expected values for this model not stated in source"
- "Appendix \"Supplementary Information by Command\" not included in refined source — input terminal enum, aspect enum, eco mode enum, sub input enum values are referenced but not enumerated here"
- "firmware version compatibility not stated"
- "flow_control value not stated in source (full-duplex noted but no RTS/CTS handshake rule)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
