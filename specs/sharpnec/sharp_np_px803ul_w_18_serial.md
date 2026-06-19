---
spec_id: admin/sharpnec-np-px803ul-w-18
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX803UL-W-18 Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PX803UL-W-18
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PX803UL-W-18
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:10:43.496Z
last_checked_at: 2026-06-18T08:55:16.425Z
generated_at: 2026-06-18T08:55:16.425Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "ID1 (control ID) and ID2 (model code) values are device-specific and must be supplied at runtime"
  - "no unsolicited notification mechanism described in source. All"
  - "no multi-step sequences described explicitly in source."
  - "source states no power-on sequencing procedure or voltage/current specs."
  - "default control ID (ID1) and model code (ID2) values not stated in source"
  - "Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source excerpt"
  - "exact value table for eco mode (097-8 / 098-8) not in source excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:55:16.425Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX803UL-W-18 Control Spec

## Summary
Sharp/NEC NP-PX803UL-W-18 professional LCD projector with RS-232C serial and TCP/IP LAN control. This spec covers the binary control protocol described in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/lens adjustments, lens memory, status queries, and PIP/edge-blend control.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) values are device-specific and must be supplied at runtime -->

## Transport
```yaml
# Source documents BOTH serial (RS-232C) and LAN (TCP). Protocol frame is identical
# across transports: binary hex commands with a trailing checksum byte.
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default per-device
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex  # source: "Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred from POWER ON / POWER OFF commands
  - routable    # inferred from INPUT SW CHANGE command
  - queryable   # inferred from numerous REQUEST (status query) commands
  - levelable   # inferred from VOLUME ADJUST / PICTURE ADJUST commands
```

## Actions
```yaml
# All commands share the binary frame format. ID1 = control ID (device-set),
# ID2 = model code (varies by model), CKS = checksum (sum of all preceding
# bytes, low-order one byte). Frame leader byte selects direction:
#   00h/01h/02h/03h = command, 20h/21h/22h/23h = success response,
#   A0h/A1h/A2h/A3h = error response.

- id: error_status_request_009
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-12 carry error bitfields (cover, fan, temp, lamp, mirror cover, interlock, etc.). See source error information list."

- id: power_on_015
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off_016
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (including cooling time)."

- id: input_sw_change_018
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
  params:
    - name: input
      type: string
      description: "Input terminal code (hex). e.g. 06h = video port. See source Appendix 'Supplementary Information by Command' for full value list."
  notes: "Example: 02h 03h 00h 00h 02h 01h 06h 0Eh selects video (DATA01=06h)."

- id: picture_mute_on_020
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input/video signal switch."

- id: picture_mute_off_021
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared on input/video signal switch or volume adjustment."

- id: sound_mute_off_023
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off_025
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: string
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: string
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_hi
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h sets brightness=10."

- id: volume_adjust_030_2
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: string
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_hi
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h sets volume=10."

- id: aspect_adjust_030_12
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
  params:
    - name: value
      type: string
      description: "Aspect value (hex). See source Appendix 'Supplementary Information by Command'."

- id: other_adjust_030_15
  label: Other Adjust / Lamp-Light Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target_lo
      type: string
      description: "96h (with target_hi FFh) = LAMP ADJUST / LIGHT ADJUST"
    - name: target_hi
      type: string
      description: "FFh for LAMP/LIGHT ADJUST"
    - name: mode
      type: string
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_hi
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request_037
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86, seconds), filter usage time (DATA87-90, seconds)."

- id: filter_usage_request_037_3
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time and filter alarm start time. -1 if undefined."

- id: lamp_info_request_037_4
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (dual-lamp models only)"
    - name: content
      type: string
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Reflects eco mode if enabled. Negative remaining-life when replacement deadline exceeded."

- id: carbon_savings_request_037_6
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code_050
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
  params:
    - name: key_lo
      type: string
      description: "Key code low byte. Values: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: key_hi
      type: string
      description: "Key code high byte (WORD type). 00h for all listed codes."
  notes: "Example: 02h 0Fh 00h 00h 02h 05h 00h 18h sends AUTO."

- id: shutter_close_051
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
  params:
    - name: target
      type: string
      description: "06h=Periphery Focus"
    - name: content
      type: string
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  notes: "Send 00h after 7Fh/81h to stop continuous drive."

- id: lens_control_request_053_1
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: string
      description: "Lens target code (same as 053 DATA01)"
  notes: "Returns adjustment range upper/lower limits and current value."

- id: lens_control_2_053_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: string
      description: "FFh=Stop"
    - name: mode
      type: string
      description: "00h=absolute, 02h=relative"
    - name: value_lo
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_hi
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "When target=FFh (Stop), mode/value ignored."

- id: lens_memory_control_053_3
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Acts on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns OFF (00h) or ON (01h)."

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_info_request_053_7
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns bitfield: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V); 0=Stop, 1=During operation."

- id: lens_profile_set_053_10
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request_053_11
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns profile number (00h=Profile 1, 01h=Profile 2)."

- id: gain_parameter_request_060_1
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: string
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Returns status, adjustment range limits, default, current value, wide/narrow adjustment width."

- id: setting_request_078_1
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type, sound function availability, profile/clock function."

- id: running_status_request_078_2
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: input_status_request_078_3
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, content displayed."

- id: mute_status_request_078_4
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display states."

- id: model_name_request_078_5
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns 32-byte model name string."

- id: cover_status_request_078_6
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control_079
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {value} {checksum}"
  params:
    - name: value
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request_084
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
  params:
    - name: type
      type: string
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
  notes: "Returns label/info string length and string."

- id: eco_mode_request_097_8
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value. See source Appendix for value table."

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name string (DATA01-17)."

- id: lan_mac_address_request_097_155
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address."

- id: pip_pbypicture_request_097_198
  label: PIP/Picture By Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
  params:
    - name: item
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Returns mode/position/sub-input setting value per item."

- id: edge_blending_mode_request_097_243_1
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns 00h=OFF, 01h=ON."

- id: eco_mode_set_098_8
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: string
      description: "Eco/Light/Lamp mode value. See source Appendix for value table."

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name01}-{name16} 00h {checksum}"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbypicture_set_098_198
  label: PIP/Picture By Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
  params:
    - name: item
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: string
      description: "MODE: 00h=PIP/01h=PBP. START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT. Sub-input values: see Appendix."

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: string
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request_305_1
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name (DATA03-11), secondary base model type (DATA12-13)."

- id: serial_number_request_305_2
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns 16-byte serial number string."

- id: basic_information_request_305_3
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal type, mute/freeze states."

- id: audio_select_set_319_10
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
  params:
    - name: input
      type: string
      description: "Input terminal code. See source Appendix for value list."
    - name: value
      type: string
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by the query commands above. Each maps to the
# corresponding *_request action's response payload.
feedbacks:
  - id: error_status
    type: bitfield
    source: error_status_request_009
    description: "12-byte error bitfield (cover, fan, temp, lamp, mirror cover, interlock, system errors)."

  - id: power_status
    type: enum
    values: [standby, power_on]
    source: running_status_request_078_2 DATA03
    description: "00h=Standby, 01h=Power on, FFh=Not supported."

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: running_status_request_078_2 DATA06
    description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

  - id: input_signal_status
    type: composite
    source: input_status_request_078_3
    description: "Signal switch process, list number, signal type 1/2, content displayed."

  - id: mute_status
    type: composite
    source: mute_status_request_078_4
    description: "Picture, sound, onscreen, forced onscreen mute; onscreen display."

  - id: model_name
    type: string
    source: model_name_request_078_5

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    source: cover_status_request_078_6 DATA01

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: [information_request_037, lamp_info_request_037_4]
    description: "Updated at one-minute intervals."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: lamp_info_request_037_4
    description: "Negative when replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    unit: seconds
    source: [information_request_037, filter_usage_request_037_3]

  - id: eco_mode
    type: enum
    source: eco_mode_request_097_8
    notes: "Value table in source Appendix; not enumerated here."

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: edge_blending_mode_request_097_243_1

  - id: lens_operation
    type: bitfield
    source: lens_info_request_053_7 DATA01
    description: "bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift H, bit4 Lens Shift V; 0=Stop, 1=Operating."

  - id: base_model_type
    type: composite
    source: base_model_type_request_305_1
    notes: "Value table in source Appendix."

  - id: serial_number
    type: string
    source: serial_number_request_305_2

  - id: projector_name
    type: string
    source: [lan_projector_name_request_097_45, information_request_037]

  - id: mac_address
    type: string
    source: lan_mac_address_request_097_155

  - id: gain_value
    type: composite
    source: gain_parameter_request_060_1
    description: "Range limits, default, current value for brightness/contrast/color/hue/sharpness/volume/lamp-light adjust."

  - id: hsync_frequency
    type: string
    source: information_string_request_084
    notes: "DATA01=03h."

  - id: vsync_frequency
    type: string
    source: information_string_request_084
    notes: "DATA01=04h."
```

## Variables
```yaml
# Settable parameters that are not discrete actions (covered by SET commands).
variables:
  - id: volume
    type: integer
    description: "Set via volume_adjust_030_2; range reported by gain_parameter_request_060_1 (name=05h)."

  - id: brightness
    type: integer
    description: "Set via picture_adjust_030_1 (target=00h); range via gain_parameter_request_060_1 (name=00h)."

  - id: contrast
    type: integer
    description: "Set via picture_adjust_030_1 (target=01h); range via gain_parameter_request_060_1 (name=01h)."

  - id: color
    type: integer
    description: "Set via picture_adjust_030_1 (target=02h); range via gain_parameter_request_060_1 (name=02h)."

  - id: hue
    type: integer
    description: "Set via picture_adjust_030_1 (target=03h); range via gain_parameter_request_060_1 (name=03h)."

  - id: sharpness
    type: integer
    description: "Set via picture_adjust_030_1 (target=04h); range via gain_parameter_request_060_1 (name=04h)."

  - id: lamp_light_adjust
    type: integer
    description: "Set via other_adjust_030_15; range via gain_parameter_request_060_1 (name=96h)."

  - id: aspect
    type: enum
    description: "Set via aspect_adjust_030_12; value table in source Appendix."

  - id: eco_mode
    type: enum
    description: "Set via eco_mode_set_098_8; value table in source Appendix."

  - id: projector_name
    type: string
    max_length: 16
    description: "Set via lan_projector_name_set_098_45."

  - id: edge_blending
    type: enum
    values: [off, on]
    description: "Set via edge_blending_mode_set_098_243_1."

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Set via lens_profile_set_053_10."

  - id: freeze
    type: enum
    values: [on, off]
    description: "Set via freeze_control_079."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source. All
# data is returned in response to explicit request commands.
events: []
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: "While POWER ON (015) is in progress, no other command is accepted."
    source: "015. POWER ON notes"
  - id: power_off_lockout
    description: "While POWER OFF (016) is in progress (including cooling time), no other command is accepted."
    source: "016. POWER OFF notes"
  - id: power_off_command_rejection
    description: "Commands may be rejected with ERR1=02h ERR2=0Dh ('cannot be accepted because the power is off')."
    source: "2.4 Error code list"
  - id: lens_drive_stop
    description: "After continuous lens drive (DATA02=7Fh or 81h in 053), send 00h to stop driving the lens."
    source: "053. LENS CONTROL notes"
  - id: mirror_cover_interlock
    description: "DATA09 bit1 of error status (009) indicates interlock switch open; bit0 indicates portrait cover side up."
    source: "009. ERROR STATUS REQUEST error information list"
# UNRESOLVED: source states no power-on sequencing procedure or voltage/current specs.
```

## Notes
- Protocol is binary framed hex with a trailing checksum byte (CKS = low-order byte of sum of all preceding bytes).
- Frame leader byte encodes direction and length-class: `02h`/`03h` = command, `22h`/`23h` = success response, `A2h`/`A3h` = error response (with ERR1/ERR2).
- ID1 (Control ID) and ID2 (Model code) are device-specific runtime parameters set on the projector; not fixed in this spec.
- Serial cable must be a cross (null-modem) cable; PC CONTROL port is D-SUB 9P with the pin assignment documented in source section 1.1.
- Baud rate is selectable among 115200/38400/19200/9600/4800 bps; must match the device-side setting.
- Several commands reference an "Appendix - Supplementary Information by Command" for full value enumerations (input terminal codes, aspect values, eco mode values, base model types, sub-input values) that are not reproduced in this refined source excerpt.
- Lamp usage time / filter usage time are updated at one-minute intervals despite one-second resolution.
- Error code list (section 2.4) defines ERR1/ERR2 combinations for command rejection, invalid values, memory errors, no-signal, forced mute, etc.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default control ID (ID1) and model code (ID2) values not stated in source -->
<!-- UNRESOLVED: Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source excerpt -->
<!-- UNRESOLVED: exact value table for eco mode (097-8 / 098-8) not in source excerpt -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:10:43.496Z
last_checked_at: 2026-06-18T08:55:16.425Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:55:16.425Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "ID1 (control ID) and ID2 (model code) values are device-specific and must be supplied at runtime"
- "no unsolicited notification mechanism described in source. All"
- "no multi-step sequences described explicitly in source."
- "source states no power-on sequencing procedure or voltage/current specs."
- "default control ID (ID1) and model code (ID2) values not stated in source"
- "Appendix value tables (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source excerpt"
- "exact value table for eco mode (097-8 / 098-8) not in source excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
