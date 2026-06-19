---
spec_id: admin/sharp-nec-xp-v731u-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC XP V731U B Control Spec"
manufacturer: Sharp/NEC
model_family: "XP V731U B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "XP V731U B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:32:51.061Z
last_checked_at: 2026-06-19T07:51:20.043Z
generated_at: 2026-06-19T07:51:20.043Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal/aspect/eco-mode/base-model-type value tables are deferred to an Appendix (\"Supplementary Information by Command\") that is not present in this refined source; specific enum values for DATA01 of 018/030-12/097-8/098-8/305-1/319-10 are therefore not enumerated here."
  - "source does not state flow control explicitly; RTS/CTS pins are wired per pin table (pins 7/8)."
  - "specific enum values deferred to source Appendix"
  - "enum values deferred to source Appendix"
  - "source documents no unsolicited notifications. All data is returned only"
  - "source documents no multi-step command sequences."
  - "Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source — DATA01 enums left as \"see Appendix\" for 018, 030-12, 097-8, 098-8, 305-1, 319-10, 097-198/098-198 sub-input."
  - "flow_control not stated in source (RTS/CTS wired but no explicit handshake mode)."
  - "wireless LAN details deferred to a separate wireless-LAN-unit operation manual."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:51:20.043Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action hex payloads match source command definitions exactly; all transport parameters (serial: 115200/8/none/1, TCP port 7142) are verbatim in source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC XP V731U B Control Spec

## Summary
The Sharp/NEC XP V731U B is an LCD projector controllable via an RS-232C serial port (D-SUB 9P PC CONTROL) and a wired/wireless LAN (TCP). This spec covers the binary command set documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1): power, input switching, mute, picture/volume/aspect/gain adjustment, lens and lens-memory control, freeze, shutter, eco mode, edge blending, PIP/PbP, and a large set of status/error/information requests. Commands are fixed-length hex frames terminated by a checksum byte.

<!-- UNRESOLVED: input-terminal/aspect/eco-mode/base-model-type value tables are deferred to an Appendix ("Supplementary Information by Command") that is not present in this refined source; specific enum values for DATA01 of 018/030-12/097-8/098-8/305-1/319-10 are therefore not enumerated here. -->

## Transport
```yaml
# Source documents BOTH RS-232C serial and LAN (TCP port 7142). Both populated.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists supported rates 115200/38400/19200/9600/4800 bps
  # NOTE: projector auto-supports 115200, 38400, 19200, 9600, 4800 bps. 115200 shown as the highest listed rate.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source does not state flow control explicitly; RTS/CTS pins are wired per pin table (pins 7/8).
addressing:
  port: 7142  # "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable    # inferred: extensive status/error/information request commands present
  - levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST (brightness/contrast/etc.), LAMP ADJUST present
  - routable     # inferred: INPUT SW CHANGE (018) selects source input terminal
```

## Actions
```yaml
# All 53 documented commands enumerated. Each opcode = one action. Checksum (CKS) byte
# is computed: low-order byte of the sum of all preceding bytes. ID1/ID2 shown as 00h
# as written in the source send-examples (broadcast/default). Verbatim payloads below.

actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bitmap (009)."

  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on is in progress (015)."

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time (016)."

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal value (hex). Example 06h = video port. Full value list in source Appendix - UNRESOLVED."
    notes: "018. DATA01=06h example: 02h 03h 00h 00h 02h 01h 06h 0Eh."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "020. Cleared by input/video switch."

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []
    notes: "021."

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "022. Cleared by input/video switch or volume adjust."

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []
    notes: "023."

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "024. Cleared by input/video switch."

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []
    notes: "025."

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: data02
        type: string
        description: "Mode - 00h absolute, 01h relative."
      - name: data03
        type: integer
        description: "Adjustment value low-order 8 bits."
      - name: data04
        type: integer
        description: "Adjustment value high-order 8 bits."
    notes: "030-1. Example set brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Mode - 00h absolute, 01h relative."
      - name: data02
        type: integer
        description: "Adjustment value low-order 8 bits."
      - name: data03
        type: integer
        description: "Adjustment value high-order 8 bits."
    notes: "030-2. Example set volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value (hex). Value list in source Appendix - UNRESOLVED."
    notes: "030-12."

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Target - 96h LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: string
        description: "FFh (fixed per source row)."
      - name: data03
        type: string
        description: "Mode - 00h absolute, 01h relative."
      - name: data04
        type: integer
        description: "Adjustment value low-order 8 bits."
      - name: data05
        type: integer
        description: "Adjustment value high-order 8 bits."
    notes: "030-15."

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "037. Returns projector name, lamp/filter usage time."

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "037-3. Returns filter usage time + alarm start time (-1 if undefined)."

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp - 00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: data02
        type: string
        description: "Content - 01h usage time (s), 04h remaining life (%)."
    notes: "037-4. Remaining life is negative if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Content - 00h Total, 01h During operation."
    notes: "037-6. Returns kg (DATA02-05) + mg (DATA06-09)."

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte. See key code list (e.g. 05h AUTO, 06h MENU, 07h UP, 02h POWER ON)."
      - name: data02
        type: string
        description: "Key code high byte (00h for all listed keys)."
    notes: "050. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h."

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []
    notes: "051."

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []
    notes: "052."

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens axis (source shows 06h Periphery Focus as example)."
      - name: data02
        type: string
        description: "Content - 00h Stop, 01h/02h/03h drive +1s/0.5s/0.25s, 7Fh drive +, 81h drive -, FDh/FEh/FFh drive -0.25s/0.5s/1s."
    notes: "053. Send 00h to stop after 7Fh/81h."

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Lens axis."
    notes: "053-1. Returns upper/lower limits + current value."

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Target - FFh Stop (mode/value ignored)."
      - name: data02
        type: string
        description: "Mode - 00h absolute, 02h relative."
      - name: data03
        type: integer
        description: "Adjustment value low-order 8 bits."
      - name: data04
        type: integer
        description: "Adjustment value high-order 8 bits."
    notes: "053-2."

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Operation - 00h MOVE, 01h STORE, 02h RESET."
    notes: "053-3."

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Operation - 00h MOVE, 01h STORE, 02h RESET."
    notes: "053-4. Operates on profile selected by LENS PROFILE SET."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Option - 00h LOAD BY SIGNAL, 01h FORCED MUTE."
    notes: "053-5. Returns 00h OFF / 01h ON."

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Option - 00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: data02
        type: string
        description: "Setting - 00h OFF, 01h ON."
    notes: "053-6."

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "053-7. Returns DATA01 bitmap of lens axis motion state."

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Profile - 00h Profile 1, 01h Profile 2."
    notes: "053-10."

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "053-11. Returns 00h Profile 1 / 01h Profile 2."

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Name - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust."
    notes: "060-1. Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "078-1. Returns base model type, sound function, profile number."

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "078-2. Returns power/cooling/power-process/operation status."

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "078-3. Returns signal switch/signal list number/selection signal type/test pattern/content."

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "078-4. Returns picture/sound/onscreen/forced-onscreen mute + OSD state."

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "078-5. Returns model name string."

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "078-6. Returns 00h Normal (cover opened) / 01h Cover closed."

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h Freeze On, 02h Freeze Off."
    notes: "079."

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Type - 03h Horizontal sync frequency, 04h Vertical sync frequency."
    notes: "084."

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "097-8. Returns Light/Lamp mode value (value list in Appendix - UNRESOLVED)."

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "097-45. Returns 17-byte projector name."

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "097-155. Returns 6-byte MAC address."

  - id: pip_picture_by_picture_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Param - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
    notes: "097-198."

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "097-243-1. Returns 00h OFF / 01h ON."

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Eco/Light/Lamp mode value (value list in Appendix - UNRESOLVED)."
    notes: "098-8."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
    params:
      - name: data01_data16
        type: string
        description: "Projector name (up to 16 bytes)."
    notes: "098-45."

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Param - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: data02
        type: string
        description: "Setting value (varies by DATA01; sub-input values in Appendix - UNRESOLVED)."
    notes: "098-198."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting - 00h OFF, 01h ON."
    notes: "098-243-1."

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "305-1. Returns base model type + model name."

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "305-2. Returns 16-byte serial number."

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "305-3. Returns operation status, content, signal type, mute/freeze state."

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal (value list in Appendix - UNRESOLVED)."
      - name: data02
        type: string
        description: "Setting - 00h terminal in DATA01, 01h BNC, 02h COMPUTER."
    notes: "319-10."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06."

  - id: error_status
    type: bitmask
    description: "12-byte error bitmap (009). Bits encode cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/lens errors."
    source: "009 ERROR STATUS REQUEST DATA01-DATA12."

  - id: input_state
    type: composite
    description: "Signal switch status, signal list number, selection signal type, test pattern, content displayed."
    source: "078-3 INPUT STATUS REQUEST."

  - id: mute_state
    type: composite
    description: "Picture/sound/onscreen/forced-onscreen mute and OSD display state."
    source: "078-4 MUTE STATUS REQUEST DATA01-DATA05."

  - id: cover_state
    type: enum
    values: [normal_opened, closed]
    source: "078-6 COVER STATUS REQUEST DATA01."

  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "Lamp usage time (updated at 1-minute intervals)."
    source: "037-4 LAMP INFORMATION REQUEST 3 (DATA02=01h)."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "Lamp remaining life; negative if replacement deadline exceeded."
    source: "037-4 LAMP INFORMATION REQUEST 3 (DATA02=04h)."

  - id: filter_usage_time
    type: integer
    unit: seconds
    source: "037-3 FILTER USAGE INFORMATION REQUEST DATA01-04."

  - id: projector_name
    type: string
    source: "097-45 LAN PROJECTOR NAME REQUEST."

  - id: mac_address
    type: string
    source: "097-155 LAN MAC ADDRESS STATUS REQUEST 2."

  - id: serial_number
    type: string
    source: "305-2 SERIAL NUMBER REQUEST."

  - id: model_name
    type: string
    source: "078-5 MODEL NAME REQUEST."

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: "097-243-1 EDGE BLENDING MODE REQUEST."

  - id: eco_mode
    type: string  # UNRESOLVED: specific enum values deferred to source Appendix
    source: "097-8 ECO MODE REQUEST."

  - id: lens_motion_state
    type: bitmask
    description: "Lens memory/zoom/focus/lens-shift (H/V) motion status."
    source: "053-7 LENS INFORMATION REQUEST DATA01."
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    writable: true
    source: "030-2 VOLUME ADJUST; 060-1 (DATA01=05h) query."

  - id: brightness
    type: integer
    writable: true
    source: "030-1 PICTURE ADJUST (DATA01=00h); 060-1 (DATA01=00h)."

  - id: contrast
    type: integer
    writable: true
    source: "030-1 PICTURE ADJUST (DATA01=01h); 060-1 (DATA01=01h)."

  - id: color
    type: integer
    writable: true
    source: "030-1 PICTURE ADJUST (DATA01=02h); 060-1 (DATA01=02h)."

  - id: hue
    type: integer
    writable: true
    source: "030-1 PICTURE ADJUST (DATA01=03h); 060-1 (DATA01=03h)."

  - id: sharpness
    type: integer
    writable: true
    source: "030-1 PICTURE ADJUST (DATA01=04h); 060-1 (DATA01=04h)."

  - id: lamp_light_adjust
    type: integer
    writable: true
    source: "030-15 OTHER ADJUST (DATA01=96h); 060-1 (DATA01=96h)."

  - id: projector_name_var
    type: string
    max_length: 16
    writable: true
    source: "098-45 LAN PROJECTOR NAME SET."

  - id: eco_mode_var
    type: string  # UNRESOLVED: enum values deferred to source Appendix
    writable: true
    source: "098-8 ECO MODE SET."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All data is returned only
# in response to an explicit request command.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_off_command_lockout
    description: "During power-on and during power-off (including cooling time) no other command is accepted. Source: 015/016."
  - id: interlock_switch
    description: "Error bitmap DATA09 bit1 reports 'The interlock switch is open.' Source: 009. No reset procedure documented."
  - id: forced_onscreen_mute
    description: "Error code 02h/04h = Forced onscreen mute on (command blocked). Source: 2.4."
# No power-on sequencing procedure or explicit safety confirmation documented in source.
```

## Notes
- Manual reference: BDT140013 Revision 7.1.
- All commands are binary hex frames. Format: `[opcode_hi] [opcode_lo] [ID1] [ID2] [LEN] [DATA...] [CKS]`. ID1 is the projector control ID, ID2 is the model code; send-examples use 00h/00h. CKS = low-order byte of the sum of all preceding bytes.
- Command-direction leading byte groups: 00h = read/requests, 02h = simple actions, 03h = set/adjust, 01h = freeze control. Response leading bytes echo with high nibble 2 (e.g. 22h/23h/20h/21h); error responses use Axh (A2h/A3h/A0h/A1h) with ERR1/ERR2.
- Serial cable is a cross cable; pin 2↔3, 7↔8 crossed.
- Usage-time fields update at 1-minute intervals though reported in 1-second units.
- Several value enumerations (input terminals, aspect values, eco/light/lamp-mode values, base-model-type codes, sub-input settings) are defined in an Appendix ("Supplementary Information by Command") not included in this refined source.

<!-- UNRESOLVED: Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source — DATA01 enums left as "see Appendix" for 018, 030-12, 097-8, 098-8, 305-1, 319-10, 097-198/098-198 sub-input. -->
<!-- UNRESOLVED: flow_control not stated in source (RTS/CTS wired but no explicit handshake mode). -->
<!-- UNRESOLVED: wireless LAN details deferred to a separate wireless-LAN-unit operation manual. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
````

Spec done. 53 commands, all verbatim payloads. Serial+TCP both populated (port 7142 explicit). Appendix enum tables left UNRESOLVED — not in refined source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:32:51.061Z
last_checked_at: 2026-06-19T07:51:20.043Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:51:20.043Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action hex payloads match source command definitions exactly; all transport parameters (serial: 115200/8/none/1, TCP port 7142) are verbatim in source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal/aspect/eco-mode/base-model-type value tables are deferred to an Appendix (\"Supplementary Information by Command\") that is not present in this refined source; specific enum values for DATA01 of 018/030-12/097-8/098-8/305-1/319-10 are therefore not enumerated here."
- "source does not state flow control explicitly; RTS/CTS pins are wired per pin table (pins 7/8)."
- "specific enum values deferred to source Appendix"
- "enum values deferred to source Appendix"
- "source documents no unsolicited notifications. All data is returned only"
- "source documents no multi-step command sequences."
- "Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source — DATA01 enums left as \"see Appendix\" for 018, 030-12, 097-8, 098-8, 305-1, 319-10, 097-198/098-198 sub-input."
- "flow_control not stated in source (RTS/CTS wired but no explicit handshake mode)."
- "wireless LAN details deferred to a separate wireless-LAN-unit operation manual."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
