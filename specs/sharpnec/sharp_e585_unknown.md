---
spec_id: admin/sharp-nec-e585
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E585 Control Spec"
manufacturer: Sharp/NEC
model_family: E585
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E585
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:10:03.828Z
last_checked_at: 2026-06-17T19:44:58.672Z
generated_at: 2026-06-17T19:44:58.672Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Sharp/NEC projector command manual; E585 model name supplied by operator, not stated verbatim in source text. Input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and sub-input values referenced as \"see Appendix Supplementary Information by Command\" — appendix not present in refined source."
  - "flow control not stated (full-duplex noted)"
  - "appendix not in refined source.\""
  - "appendix not in refined source)."
  - "appendix not in refined source).\""
  - "eco-mode value enumeration table not in refined source"
  - "bounds obtainable only at runtime via cmd_060_1 (name 05h)"
  - "bounds obtainable only at runtime via cmd_060_1 (name 00h)"
  - "source describes only command/response model. No unsolicited"
  - "no multi-step sequences described explicitly in source."
  - "source states power on/off block other commands during transition"
  - "model name \"E585\" supplied by operator, not stated verbatim in the generic source manual."
  - "several value tables referenced as \"Appendix Supplementary Information by Command\" are absent from the refined source: input-terminal values, aspect values, eco-mode values, base-model-type values, PIP/PbP sub-input values, full lens-control target list."
  - "firmware version compatibility, default baud rate, serial flow control, and full lens-control target enumeration not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:44:58.672Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec command hex sequences match verbatim in source; transport port/baud/serial params verified; bidirectional coverage complete. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC E585 Control Spec

## Summary
Sharp/NEC E585 projector control spec. Binary hex protocol over RS-232C serial and TCP/IP LAN (port 7142). Covers power, input switching, mute, picture/volume/aspect/lens adjustment, lens memory, shutter, freeze, eco mode, edge blending, PIP/PBP, and a full set of status/error queries. Source: "Projector Control Command Reference Manual" BDT140013 Rev 7.1.

<!-- UNRESOLVED: source is a generic Sharp/NEC projector command manual; E585 model name supplied by operator, not stated verbatim in source text. Input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and sub-input values referenced as "see Appendix Supplementary Information by Command" — appendix not present in refined source. -->

## Transport
```yaml
# Binary frame protocol. Command frames omit ID1/ID2; responses echo projector's
# Control ID (ID1) and Model code (ID2). Checksum (CKS) = low byte of sum of all
# preceding bytes. Response success prefix 2Xh, error prefix AXh (X = cmd group).
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # configurable; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (full-duplex noted)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable    # inferred: extensive status/error request commands present
  - levelable    # inferred: 030-1 PICTURE / 030-2 VOLUME / 030-15 gain adjust present
  - routable     # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
actions:
  - id: cmd_009_error_status_request
    label: "009. Error Status Request"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: cmd_015_power_on
    label: "015. Power On"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: While powering on, no other command accepted.

  - id: cmd_016_power_off
    label: "016. Power Off"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: During power-off incl. cooling, no other command accepted.

  - id: cmd_018_input_sw_change
    label: "018. Input SW Change"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input_terminal} {cks}"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal byte (DATA01). e.g. 06h = video. Full value table in source Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in refined source."
    notes: Example (video, DATA01=06h) -> "02h 03h 00h 00h 02h 01h 06h 0Eh".

  - id: cmd_020_picture_mute_on
    label: "020. Picture Mute On"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Cleared by input/video signal switch.

  - id: cmd_021_picture_mute_off
    label: "021. Picture Mute Off"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: "022. Sound Mute On"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: Cleared by input/video signal switch or volume adjustment.

  - id: cmd_023_sound_mute_off
    label: "023. Sound Mute Off"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: "024. Onscreen Mute On"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: Cleared by input/video signal switch.

  - id: cmd_025_onscreen_mute_off
    label: "025. Onscreen Mute Off"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: "030-1. Picture Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: integer
        description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: mode
        type: integer
        description: "DATA02: 00h=absolute, 01h=relative."
      - name: value
        type: integer
        description: "DATA03/04 (low/high 8 bits). e.g. brightness +10 -> 00h 0Ah 00h; -10 -> 00h F6h FFh."
    notes: Example set brightness=10 -> "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h".

  - id: cmd_030_2_volume_adjust
    label: "030-2. Volume Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: mode
        type: integer
        description: "DATA01: 00h=absolute, 01h=relative."
      - name: value
        type: integer
        description: "DATA02/03 (low/high 8 bits)."
    notes: Example set volume=10 -> "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

  - id: cmd_030_12_aspect_adjust
    label: "030-12. Aspect Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {cks}"
    params:
      - name: aspect
        type: integer
        description: "DATA01 aspect value. Full value table in source Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in refined source."

  - id: cmd_030_15_other_adjust
    label: "030-15. Other Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: integer
        description: "DATA01/DATA02 target: 96h/FFh = LAMP ADJUST / LIGHT ADJUST."
      - name: mode
        type: integer
        description: "DATA03: 00h=absolute, 01h=relative."
      - name: value
        type: integer
        description: "DATA04/05 (low/high 8 bits)."

  - id: cmd_037_information_request
    label: "037. Information Request"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name, lamp usage time (s), filter usage time (s). Updated 1-min intervals.

  - id: cmd_037_3_filter_usage_info_request
    label: "037-3. Filter Usage Information Request"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time (s) and filter alarm start time (s); -1 if undefined.

  - id: cmd_037_4_lamp_info_request_3
    label: "037-4. Lamp Information Request 3"
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {cks}"
    params:
      - name: lamp
        type: integer
        description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: content
        type: integer
        description: "DATA02: 01h=usage time (s), 04h=remaining life (%). Negative remaining life if past replacement deadline."
    notes: Example get lamp1 usage -> "03h 96h 00h 00h 02h 00h 01h 9Ch".

  - id: cmd_037_6_carbon_savings_info_request
    label: "037-6. Carbon Savings Information Request"
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {cks}"
    params:
      - name: type
        type: integer
        description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."

  - id: cmd_050_remote_key_code
    label: "050. Remote Key Code"
    kind: action
    command: "02h 0Fh 00h 00h 02h {keycode_lo} {keycode_hi} {cks}"
    params:
      - name: keycode
        type: integer
        description: "DATA01/DATA02 key code (WORD). Sample mappings: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO."
    notes: Example AUTO -> "02h 0Fh 00h 00h 02h 05h 00h 18h".

  - id: cmd_051_shutter_close
    label: "051. Shutter Close"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: cmd_052_shutter_open
    label: "052. Shutter Open"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: cmd_053_lens_control
    label: "053. Lens Control"
    kind: action
    command: "02h 18h 00h 00h 02h {target} {content} {cks}"
    params:
      - name: target
        type: integer
        description: "DATA01 target. e.g. 06h=Periphery Focus (other targets in Appendix - UNRESOLVED)."
      - name: content
        type: integer
        description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
    notes: After 7Fh/81h, send 00h to stop. Same command may be reissued during drive without stop.

  - id: cmd_053_1_lens_control_request
    label: "053-1. Lens Control Request"
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {cks}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens target (see 053 targets)."
    notes: Returns upper/lower limit + current value (low/high 8 bits each).

  - id: cmd_053_2_lens_control_2
    label: "053-2. Lens Control 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: integer
        description: "DATA01 target; FFh=Stop (mode/value ignored)."
      - name: mode
        type: integer
        description: "DATA02: 00h=absolute, 02h=relative."
      - name: value
        type: integer
        description: "DATA03/04 (low/high 8 bits)."

  - id: cmd_053_3_lens_memory_control
    label: "053-3. Lens Memory Control"
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {cks}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. Reference Lens Memory Control"
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {cks}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile selected via 053-10."

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. Lens Memory Option Request"
    kind: query
    command: "02h 20h 00h 00h 01h {option} {cks}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Returns setting 00h=OFF, 01h=ON."

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. Lens Memory Option Set"
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {cks}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: value
        type: integer
        description: "DATA02: 00h=OFF, 01h=ON."

  - id: cmd_053_7_lens_information_request
    label: "053-7. Lens Information Request"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V); 0=Stop, 1=During operation.

  - id: cmd_053_10_lens_profile_set
    label: "053-10. Lens Profile Set"
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {cks}"
    params:
      - name: profile
        type: integer
        description: "DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: cmd_053_11_lens_profile_request
    label: "053-11. Lens Profile Request"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: Returns DATA01: 00h=Profile 1, 01h=Profile 2.

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. Gain Parameter Request 3"
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {cks}"
    params:
      - name: name
        type: integer
        description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: Returns status, upper/lower limit, default, current, wide/narrow adjust width, default-validity flag. Example brightness -> "03h 05h 00h 00h 03h 00h 00h 00h 0Bh".

  - id: cmd_078_1_setting_request
    label: "078-1. Setting Request"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type, sound function (DATA04 00h/01h), profile/clock/sleep function (DATA05).

  - id: cmd_078_2_running_status_request
    label: "078-2. Running Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power status (DATA03: 00h=Standby, 01h=Power on), cooling process, power on/off process, operation status (DATA06: 00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Power saving, 10h=Network standby).

  - id: cmd_078_3_input_status_request
    label: "078-3. Input Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Returns signal switch process, signal list number (value-1), selection signal type 1/2, signal list type, test pattern display, content displayed.

  - id: cmd_078_4_mute_status_request
    label: "078-4. Mute Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Returns DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (each 00h=Off, 01h=On).

  - id: cmd_078_5_model_name_request
    label: "078-5. Model Name Request"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: Returns 32-byte NUL-terminated model name string.

  - id: cmd_078_6_cover_status_request
    label: "078-6. Cover Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed.

  - id: cmd_079_freeze_control
    label: "079. Freeze Control"
    kind: action
    command: "01h 98h 00h 00h 01h {state} {cks}"
    params:
      - name: state
        type: integer
        description: "DATA01: 01h=freeze on, 02h=freeze off."

  - id: cmd_084_information_string_request
    label: "084. Information String Request"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {cks}"
    params:
      - name: type
        type: integer
        description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
    notes: Returns label length + NUL-terminated info string.

  - id: cmd_097_8_eco_mode_request
    label: "097-8. Eco Mode Request"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Returns eco/light/lamp mode value (value table in Appendix - UNRESOLVED: appendix not in refined source).

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN Projector Name Request"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: Returns 17-byte NUL-terminated projector name.

  - id: cmd_097_155_lan_mac_address_request2
    label: "097-155. LAN MAC Address Status Request 2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: Returns 6-byte MAC address.

  - id: cmd_097_198_pip_pbp_request
    label: "097-198. PIP / Picture by Picture Request"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {target} {cks}"
    params:
      - name: target
        type: integer
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    notes: MODE value 00h=PIP, 01h=PbP. START POSITION 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input values in Appendix - UNRESOLVED.

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. Edge Blending Mode Request"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: Returns DATA01: 00h=OFF, 01h=ON.

  - id: cmd_098_8_eco_mode_set
    label: "098-8. Eco Mode Set"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {cks}"
    params:
      - name: value
        type: integer
        description: "DATA01 eco/light/lamp mode value (value table in Appendix - UNRESOLVED: appendix not in refined source)."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN Projector Name Set"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_16_bytes} 00h {cks}"
    params:
      - name: name
        type: string
        description: "DATA01-16 projector name (up to 16 bytes), NUL-padded."

  - id: cmd_098_198_pip_pbp_set
    label: "098-198. PIP / Picture by Picture Set"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {target} {value} {cks}"
    params:
      - name: target
        type: integer
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: value
        type: integer
        description: "DATA02. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input values in Appendix - UNRESOLVED."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. Edge Blending Mode Set"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {cks}"
    params:
      - name: value
        type: integer
        description: "DATA01: 00h=OFF, 01h=ON."

  - id: cmd_305_1_base_model_type_request
    label: "305-1. Base Model Type Request"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: Returns base model type + NUL-terminated model name. Value table in Appendix - UNRESOLVED.

  - id: cmd_305_2_serial_number_request
    label: "305-2. Serial Number Request"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: Returns 16-byte NUL-terminated serial number.

  - id: cmd_305_3_basic_information_request
    label: "305-3. Basic Information Request"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status.

  - id: cmd_319_10_audio_select_set
    label: "319-10. Audio Select Set"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input_terminal} {value} {cks}"
    params:
      - name: input_terminal
        type: integer
        description: "DATA01 input terminal (value table in Appendix - UNRESOLVED: appendix not in refined source)."
      - name: value
        type: integer
        description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on]
    source: cmd_078_2 DATA03 / cmd_305_3 DATA01
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: cmd_078_2 DATA06 / cmd_305_3 DATA01
  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: cmd_037 DATA83-86 / cmd_037_4 (content 01h)
  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: cmd_037_4 (content 04h)
  - id: filter_usage_time
    type: integer
    unit: seconds
    source: cmd_037_3 DATA01-04 / cmd_037 DATA87-90
  - id: error_status_bitfield
    type: bitfield
    source: cmd_009 DATA01-12
    notes: Cover/fan/temperature/power/lamp/mirror-cover/interlock/system errors.
  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    source: cmd_078_6 DATA01
  - id: mute_status
    type: object
    source: cmd_078_4
    notes: Picture/sound/onscreen/forced-onscreen mute + OSD display flags.
  - id: lens_status
    type: bitfield
    source: cmd_053_7 DATA01
    notes: Lens-memory/zoom/focus/lens-shift operation bits.
  - id: input_status
    type: object
    source: cmd_078_3 / cmd_305_3
  - id: eco_mode
    type: integer
    source: cmd_097_8 DATA01
    # UNRESOLVED: eco-mode value enumeration table not in refined source
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: cmd_097_243_1 DATA01
  - id: model_name
    type: string
    source: cmd_078_5 / cmd_305_1
  - id: serial_number
    type: string
    source: cmd_305_2
  - id: mac_address
    type: string
    source: cmd_097_155
  - id: projector_name
    type: string
    source: cmd_097_45
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    range: null  # UNRESOLVED: bounds obtainable only at runtime via cmd_060_1 (name 05h)
    source: cmd_030_2 / cmd_060_1 (name 05h)
  - id: brightness
    type: integer
    range: null  # UNRESOLVED: bounds obtainable only at runtime via cmd_060_1 (name 00h)
    source: cmd_030_1 (target 00h) / cmd_060_1 (name 00h)
  - id: contrast
    type: integer
    range: null
    source: cmd_030_1 (target 01h) / cmd_060_1 (name 01h)
  - id: color
    type: integer
    range: null
    source: cmd_030_1 (target 02h) / cmd_060_1 (name 02h)
  - id: hue
    type: integer
    range: null
    source: cmd_030_1 (target 03h) / cmd_060_1 (name 03h)
  - id: sharpness
    type: integer
    range: null
    source: cmd_030_1 (target 04h) / cmd_060_1 (name 04h)
  - id: lamp_light_adjust
    type: integer
    range: null
    source: cmd_030_15 (target 96h/FFh) / cmd_060_1 (name 96h)
  - id: lens_position
    type: object
    source: cmd_053_1 / cmd_053_2
    notes: Per-target upper/lower/current values.
```

## Events
```yaml
events: []
# UNRESOLVED: source describes only command/response model. No unsolicited
# notification / push-event mechanism documented.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states power on/off block other commands during transition
# (incl. cooling), but no formal interlock procedure or safety sequencing is
# documented. Lens-drive continuous-motion semantics noted in cmd_053 (send 00h
# to stop after 7Fh/81h) - treat as operational guidance, not formal interlock.
```

## Notes
- Binary hex protocol. Every command frame ends in a checksum byte = low-order 8 bits of the sum of all preceding bytes (see source 2.2 checksum example).
- Command frames do NOT carry ID1/ID2; only responses echo the projector's Control ID (ID1) and Model code (ID2).
- Response prefixes: `2Xh` = success (X mirrors command group byte), `AXh` = error. Error responses carry ERR1/ERR2 per source 2.4 error code table (00h/00h unrecognized, 00h/01h unsupported by model, 01h/00h invalid value, 02h/0Dh power off, 02h/0Fh no authority, etc.).
- Multiple baud rates supported (115200/38400/19200/9600/4800); default rate not stated.
- Lamp/filter usage-time info updates at 1-minute intervals despite 1-second resolution.
- Wireless LAN via separately-specified wireless LAN unit (see operation manual of unit in use).
- Serial cable is cross (null-modem); pin assignment: 2↔3 (RxD/TxD), 7↔8 (RTS/CTS), 5=GND.

<!-- UNRESOLVED: model name "E585" supplied by operator, not stated verbatim in the generic source manual. -->
<!-- UNRESOLVED: several value tables referenced as "Appendix Supplementary Information by Command" are absent from the refined source: input-terminal values, aspect values, eco-mode values, base-model-type values, PIP/PbP sub-input values, full lens-control target list. -->
<!-- UNRESOLVED: firmware version compatibility, default baud rate, serial flow control, and full lens-control target enumeration not stated in source. -->
````

Spec done. 53 actions, all literal hex verbatim. Gaps marked `UNRESOLVED` (value tables in missing appendix, model name from operator not source text).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:10:03.828Z
last_checked_at: 2026-06-17T19:44:58.672Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:44:58.672Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec command hex sequences match verbatim in source; transport port/baud/serial params verified; bidirectional coverage complete. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Sharp/NEC projector command manual; E585 model name supplied by operator, not stated verbatim in source text. Input-terminal value table, aspect value table, eco-mode value table, base-model-type values, and sub-input values referenced as \"see Appendix Supplementary Information by Command\" — appendix not present in refined source."
- "flow control not stated (full-duplex noted)"
- "appendix not in refined source.\""
- "appendix not in refined source)."
- "appendix not in refined source).\""
- "eco-mode value enumeration table not in refined source"
- "bounds obtainable only at runtime via cmd_060_1 (name 05h)"
- "bounds obtainable only at runtime via cmd_060_1 (name 00h)"
- "source describes only command/response model. No unsolicited"
- "no multi-step sequences described explicitly in source."
- "source states power on/off block other commands during transition"
- "model name \"E585\" supplied by operator, not stated verbatim in the generic source manual."
- "several value tables referenced as \"Appendix Supplementary Information by Command\" are absent from the refined source: input-terminal values, aspect values, eco-mode values, base-model-type values, PIP/PbP sub-input values, full lens-control target list."
- "firmware version compatibility, default baud rate, serial flow control, and full lens-control target enumeration not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
