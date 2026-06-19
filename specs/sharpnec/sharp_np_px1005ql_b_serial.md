---
spec_id: admin/sharp-nec-np-px1005ql-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX1005QL B Control Spec"
manufacturer: Sharp/NEC
model_family: "NP-PX1005QL B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP-PX1005QL B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:55:41.628Z
last_checked_at: 2026-06-18T08:53:43.318Z
generated_at: 2026-06-18T08:53:43.318Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value table (DATA01 values for 018/319-10) referenced in \"Appendix — Supplementary Information by Command\" but appendix not present in source."
  - "sub input setting value table referenced in appendix, not present."
  - "eco mode value table referenced in appendix, not present."
  - "base model type value table referenced in appendix, not present."
  - "aspect value table referenced in appendix, not present."
  - "source states \"Full duplex\" communication mode but does not specify flow control method"
  - "no async event/notification mechanism stated in source."
  - "none documented."
  - "power-on sequencing, interlock recovery, and safe-shutdown"
  - "Input terminal value table (used by 018, 319-10, PIP sub-input) referenced in \"Appendix — Supplementary Information by Command\" but appendix not present in this refined source."
  - "Eco mode value table referenced in Appendix, not present."
  - "Aspect value table referenced in Appendix, not present."
  - "Base model type value table referenced in Appendix, not present."
  - "Flow control method (RTS/CTS or XON/XOFF) not specified — \"Full duplex\" stated but flow_control policy unstated."
  - "Model code (ID2) value for NP-PX1005QL B not stated."
  - "Control ID (ID1) default/setting not stated in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:53:43.318Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX1005QL B Control Spec

## Summary
Projector control command reference (BDT140013 Rev 7.1) for the Sharp/NEC NP-PX1005QL B projector. Covers RS-232C serial control (D-SUB 9P PC CONTROL port) and TCP/IP LAN control (wired/wireless, port 7142). Binary frame protocol with checksum byte.

<!-- UNRESOLVED: input terminal value table (DATA01 values for 018/319-10) referenced in "Appendix — Supplementary Information by Command" but appendix not present in source. -->
<!-- UNRESOLVED: sub input setting value table referenced in appendix, not present. -->
<!-- UNRESOLVED: eco mode value table referenced in appendix, not present. -->
<!-- UNRESOLVED: base model type value table referenced in appendix, not present. -->
<!-- UNRESOLVED: aspect value table referenced in appendix, not present. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists supported rates: 115200/38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not specify flow control method
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from 015 POWER ON / 016 POWER OFF commands
  - queryable       # inferred from numerous status/setting request commands
  - levelable       # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - routable        # inferred from 018 INPUT SW CHANGE command
```

## Actions
```yaml
# All commands below use the binary frame format: the literal payload is the
# command frame WITHOUT the trailing checksum (CKS) unless the frame already
# shows a fixed checksum byte. For commands containing <ID1>/<ID2> or <DATA??>
# placeholders, the command template is shown with the variable parts in braces.
# Checksum rule (from source 2.2): sum all preceding bytes, take low byte.
# ID1 = projector control ID, ID2 = model code (both vary per unit).

actions:
  # --- 009. ERROR STATUS REQUEST ---
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00 88 00 00 00 88"
    params: []
    notes: "Returns DATA01-12 error bit fields (see Feedbacks)."

  # --- 015. POWER ON ---
  - id: power_on
    label: Power On
    kind: action
    command: "02 00 00 00 00 02"
    params: []
    notes: "No other command accepted while power is turning on."

  # --- 016. POWER OFF ---
  - id: power_off
    label: Power Off
    kind: action
    command: "02 01 00 00 00 03"
    params: []
    notes: "No other command accepted during cooldown."

  # --- 018. INPUT SW CHANGE ---
  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02 03 00 00 02 01 {input} {checksum}"
    params:
      - name: input
        type: byte
        description: "Input terminal value (e.g. 06h = Video). Full table in Appendix, not present in source."
    notes: "Example: 02 03 00 00 02 01 06 0E selects video port."

  # --- 020. PICTURE MUTE ON ---
  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02 10 00 00 00 12"
    params: []
    notes: "Cleared on input/video switch."

  # --- 021. PICTURE MUTE OFF ---
  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02 11 00 00 00 13"
    params: []

  # --- 022. SOUND MUTE ON ---
  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02 12 00 00 00 14"
    params: []
    notes: "Cleared on input/video/volume change."

  # --- 023. SOUND MUTE OFF ---
  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02 13 00 00 00 15"
    params: []

  # --- 024. ONSCREEN MUTE ON ---
  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02 14 00 00 00 16"
    params: []
    notes: "Cleared on input/video switch."

  # --- 025. ONSCREEN MUTE OFF ---
  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02 15 00 00 00 17"
    params: []

  # --- 030-1. PICTURE ADJUST ---
  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03 10 00 00 05 {target} FF {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: byte
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: byte
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "Adjustment value low 8 bits (signed)"
      - name: value_hi
        type: byte
        description: "Adjustment value high 8 bits"
    notes: "Brightness=10 example: 03 10 00 00 05 00 FF 00 0A 00 21"

  # --- 030-2. VOLUME ADJUST ---
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: byte
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "Volume value low 8 bits"
      - name: value_hi
        type: byte
        description: "Volume value high 8 bits"
    notes: "Volume=10 example: 03 10 00 00 05 05 00 00 0A 00 27"

  # --- 030-12. ASPECT ADJUST ---
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03 10 00 00 05 18 00 00 {aspect_value} 00 {checksum}"
    params:
      - name: aspect_value
        type: byte
        description: "Aspect value; full table in Appendix (not present in source)"

  # --- 030-15. OTHER ADJUST (LAMP/LIGHT) ---
  - id: other_adjust_lamp_light
    label: Other Adjust (Lamp/Light)
    kind: action
    command: "03 10 00 00 05 {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target_lo
        type: byte
        description: "96h=LAMP ADJUST / LIGHT ADJUST"
      - name: target_hi
        type: byte
        description: "FFh"
      - name: mode
        type: byte
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "Adjustment value low 8 bits"
      - name: value_hi
        type: byte
        description: "Adjustment value high 8 bits"

  # --- 037. INFORMATION REQUEST ---
  - id: information_request
    label: Information Request
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: "Returns projector name, lamp usage (DATA83-86), filter usage (DATA87-90)."

  # --- 037-3. FILTER USAGE INFORMATION REQUEST ---
  - id: filter_usage_request
    label: Filter Usage Information Request
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: "Returns filter usage time + alarm start time (-1 if undefined)."

  # --- 037-4. LAMP INFORMATION REQUEST 3 ---
  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03 96 00 00 02 {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: byte
        description: "00h=Lamp1, 01h=Lamp2 (dual-lamp models only)"
      - name: content
        type: byte
        description: "01h=usage time (s), 04h=remaining life (%)"

  # --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
  - id: carbon_savings_request
    label: Carbon Savings Information Request
    kind: query
    command: "03 9A 00 00 01 {type} {checksum}"
    params:
      - name: type
        type: byte
        description: "00h=Total, 01h=During operation"

  # --- 050. REMOTE KEY CODE ---
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02 0F 00 00 02 {key_lo} {key_hi} {checksum}"
    params:
      - name: key_lo
        type: byte
        description: "Key code low byte from Key Code List"
      - name: key_hi
        type: byte
        description: "Key code high byte (00h for all listed keys)"
    notes: "AUTO example: 02 0F 00 00 02 05 00 18. Key list includes POWER ON(02h),POWER OFF(03h),AUTO(05h),MENU(06h),UP(07h),DOWN(08h),RIGHT(09h),LEFT(0Ah),ENTER(0Bh),EXIT(0Ch),HELP(0Dh),MAGNIFY UP(0Fh),MAGNIFY DOWN(10h),MUTE(13h),PICTURE(29h),COMPUTER1(4Bh),COMPUTER2(4Ch),VIDEO1(4Fh),S-VIDEO1(51h),VOLUME UP(84h),VOLUME DOWN(85h),FREEZE(8Ah),ASPECT(A3h),SOURCE(D7h),LAMP MODE/ECO(EEh)."

  # --- 051. SHUTTER CLOSE ---
  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02 16 00 00 00 18"
    params: []

  # --- 052. SHUTTER OPEN ---
  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02 17 00 00 00 19"
    params: []

  # --- 053. LENS CONTROL ---
  - id: lens_control
    label: Lens Control
    kind: action
    command: "02 18 00 00 02 {target} {action} {checksum}"
    params:
      - name: target
        type: byte
        description: "06h=Periphery Focus (other lens targets implied; source shows 06h example)"
      - name: action
        type: byte
        description: "00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=+continuous,81h=-continuous,FDh=-0.25s,FEh=-0.5s,FFh=-1s"

  # --- 053-1. LENS CONTROL REQUEST ---
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02 1C 00 00 02 {target} 00 {checksum}"
    params:
      - name: target
        type: byte
        description: "Lens target code (source lists DATA01 passed through)"
    notes: "Returns DATA02-07: upper/lower/current value ranges."

  # --- 053-2. LENS CONTROL 2 ---
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02 1D 00 00 04 {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: byte
        description: "FFh=Stop (mode/value ignored when Stop)"
      - name: mode
        type: byte
        description: "00h=absolute, 02h=relative"
      - name: value_lo
        type: byte
      - name: value_hi
        type: byte

  # --- 053-3. LENS MEMORY CONTROL ---
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02 1E 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  # --- 053-4. REFERENCE LENS MEMORY CONTROL ---
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02 1F 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile set via 053-10 LENS PROFILE SET."

  # --- 053-5. LENS MEMORY OPTION REQUEST ---
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02 20 00 00 01 {option} {checksum}"
    params:
      - name: option
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  # --- 053-6. LENS MEMORY OPTION SET ---
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02 21 00 00 02 {option} {value} {checksum}"
    params:
      - name: option
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: byte
        description: "00h=OFF, 01h=ON"

  # --- 053-7. LENS INFORMATION REQUEST ---
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory,Bit1=Zoom,Bit2=Focus,Bit3=Lens Shift(H),Bit4=Lens Shift(V) (0=Stop,1=Operating)."

  # --- 053-10. LENS PROFILE SET ---
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02 27 00 00 01 {profile} {checksum}"
    params:
      - name: profile
        type: byte
        description: "00h=Profile 1, 01h=Profile 2"

  # --- 053-11. LENS PROFILE REQUEST ---
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02 28 00 00 00 2A"
    params: []
    notes: "Returns selected reference lens memory profile number."

  # --- 060-1. GAIN PARAMETER REQUEST 3 ---
  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03 05 00 00 03 {gain_name} 00 00 {checksum}"
    params:
      - name: gain_name
        type: byte
        description: "00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"
    notes: "Brightness example: 03 05 00 00 03 00 00 00 0B. Returns DATA01-16 range/default/current/wide/narrow."

  # --- 078-1. SETTING REQUEST ---
  - id: setting_request
    label: Setting Request
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: "Returns base model type, sound function, profile/clock/sleep capability."

  # --- 078-2. RUNNING STATUS REQUEST ---
  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: "DATA03 power status, DATA04 cooling, DATA05 power process, DATA06 operation status."

  # --- 078-3. INPUT STATUS REQUEST ---
  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: "Returns signal switch, list number, signal types, test pattern, content displayed."

  # --- 078-4. MUTE STATUS REQUEST ---
  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: "Returns picture/sound/onscreen/forced mute + OSD state."

  # --- 078-5. MODEL NAME REQUEST ---
  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []

  # --- 078-6. COVER STATUS REQUEST ---
  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "DATA01: 00h=normal/open, 01h=cover closed."

  # --- 079. FREEZE CONTROL ---
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01 98 00 00 01 {state} {checksum}"
    params:
      - name: state
        type: byte
        description: "01h=freeze on, 02h=freeze off"

  # --- 084. INFORMATION STRING REQUEST ---
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00 D0 00 00 03 00 {info_type} 01 {checksum}"
    params:
      - name: info_type
        type: byte
        description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

  # --- 097-8. ECO MODE REQUEST ---
  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []
    notes: "Returns Light/Lamp mode value; full value table in Appendix (not present)."

  # --- 097-45. LAN PROJECTOR NAME REQUEST ---
  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []

  # --- 097-155. LAN MAC ADDRESS STATUS REQUEST 2 ---
  - id: lan_mac_address_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []

  # --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
  - id: pip_pbp_request
    label: PIP / Picture By Picture Request
    kind: query
    command: "03 B0 00 00 02 C5 {target} {checksum}"
    params:
      - name: target
        type: byte
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"

  # --- 097-243-1. EDGE BLENDING MODE REQUEST ---
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []
    notes: "DATA01: 00h=OFF, 01h=ON."

  # --- 098-8. ECO MODE SET ---
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03 B1 00 00 02 07 {value} {checksum}"
    params:
      - name: value
        type: byte
        description: "Eco/Light/Lamp mode value; full table in Appendix (not present)"

  # --- 098-45. LAN PROJECTOR NAME SET ---
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03 B1 00 00 12 2C {name_bytes_16} 00 {checksum}"
    params:
      - name: name_bytes_16
        type: bytes
        description: "Up to 16-byte projector name (NUL-terminated)"
    notes: "DATA01-16 = name up to 16 bytes; trailing 00h required."

  # --- 098-198. PIP/PICTURE BY PICTURE SET ---
  - id: pip_pbp_set
    label: PIP / Picture By Picture Set
    kind: action
    command: "03 B1 00 00 03 C5 {target} {value} {checksum}"
    params:
      - name: target
        type: byte
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
      - name: value
        type: byte
        description: "MODE: 00h=PIP,01h=PbP. POSITION: 00h=TL,01h=TR,02h=BL,03h=BR. Sub input: see Appendix."

  # --- 098-243-1. EDGE BLENDING MODE SET ---
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03 B1 00 00 03 DF 00 {value} {checksum}"
    params:
      - name: value
        type: byte
        description: "00h=OFF, 01h=ON"

  # --- 305-1. BASE MODEL TYPE REQUEST ---
  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []
    notes: "Returns model name string + base model type code (table in Appendix)."

  # --- 305-2. SERIAL NUMBER REQUEST ---
  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []

  # --- 305-3. BASIC INFORMATION REQUEST ---
  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze."

  # --- 319-10. AUDIO SELECT SET ---
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03 C9 00 00 03 09 {input_terminal} {value} {checksum}"
    params:
      - name: input_terminal
        type: byte
        description: "Input terminal code (table in Appendix, not present)"
      - name: value
        type: byte
        description: "00h=terminal's own audio, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_result
    type: struct
    description: "Generic ACK response. Frame prefix A2h/A0h/A1h/A3h indicates success; A?h with ERR1/ERR2 indicates failure. See Errors below."
  - id: error_code
    type: struct
    description: "ERR1/ERR2 byte pair. Full code list in Notes."
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "From 078-2 DATA03 (00h=Standby, 01h=PowerOn) and 305-3 DATA01 (00h/04h/05h/06h/0Fh/10h)."
  - id: mute_state
    type: struct
    description: "From 078-4: picture/sound/onscreen/forced-onscreen/OSD each on/off."
  - id: error_status_bits
    type: struct
    description: "From 009: DATA01-12 bitfield covering cover error, fan, temperature, lamp state, FPGA, ballast, lens install, interlock switch (DATA09 Bit1), system errors."
  - id: lamp_information
    type: struct
    description: "From 037-4: usage time (s) and remaining life (%)."
  - id: filter_information
    type: struct
    description: "From 037-3: filter usage time (s) and alarm start time (s)."
  - id: lens_information
    type: struct
    description: "From 053-7: operation state per lens axis (zoom/focus/shift-h/shift-v/memory)."
  - id: model_name
    type: string
    description: "From 078-5."
  - id: serial_number
    type: string
    description: "From 305-2."
  - id: mac_address
    type: bytes
    description: "From 097-155: 6-byte MAC."
  - id: projector_name
    type: string
    description: "From 097-45."
  - id: cover_status
    type: enum
    values: [normal_open, closed]
```

## Variables
```yaml
# No continuous settable parameter outside the actions above (PICTURE/VOLUME/LAMP
# adjust are discrete action frames). Enum-tunable settings (eco mode, edge
# blending, PIP mode) are covered as action parameters with UNRESOLVED appendix
# value tables - not promoted to Variables.
```

## Events
```yaml
# Source describes only solicited responses (request/reply). No unsolicited
# notification frames documented.
# UNRESOLVED: no async event/notification mechanism stated in source.
```

## Macros
```yaml
# No multi-step sequences explicitly defined in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes power-on/power-off commands block all other commands while
# in progress (incl. cooldown) - informational, not a user-confirmation gate.
# Error status (009) reports cover/fan/temperature/interlock-switch faults as
# bits, but no shutdown sequence or recovery procedure is documented.
# UNRESOLVED: power-on sequencing, interlock recovery, and safe-shutdown
# procedures are not described in this command reference.
```

## Notes
- **Frame format**: `20h 88h <ID1> <ID2> 0Ch <DATA01>..<DATA12> <CKS>`. ID1 = projector control ID; ID2 = model code (varies per unit). Checksum = low byte of sum of all preceding bytes.
- **Response prefixes**: `2xh` = success with same opcode byte index as command (`22h`=set, `23h`=set-with-result, `20h`=query, `21h`=control); `Axh` = error response with ERR1/ERR2/CKS.
- **Error codes** (ERR1/ERR2): 00/00 unrecognized, 00/01 unsupported on model, 01/00 invalid value, 01/01 invalid input terminal, 01/02 invalid language, 02/00 memory allocation, 02/02 memory in use, 02/03 value not settable, 02/04 forced onscreen mute on, 02/06 viewer error, 02/07 no signal, 02/08 test pattern/filter displayed, 02/09 no PC card, 02/0A memory operation error, 02/0C entry list displayed, 02/0D power off rejects command, 02/0E execution failed, 02/0F no authority, 03/00 invalid gain number, 03/01 invalid gain, 03/02 adjustment failed.
- **Pin assignment** for PC CONTROL port (D-SUB 9P, cross cable): 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- **Usage time resolution**: lamp/filter usage returned in seconds, updated at 1-minute intervals.
- **Dual-lamp models**: DATA01=01h (Lamp 2) only valid on two-lamp projectors.

<!-- UNRESOLVED: Input terminal value table (used by 018, 319-10, PIP sub-input) referenced in "Appendix — Supplementary Information by Command" but appendix not present in this refined source. -->
<!-- UNRESOLVED: Eco mode value table referenced in Appendix, not present. -->
<!-- UNRESOLVED: Aspect value table referenced in Appendix, not present. -->
<!-- UNRESOLVED: Base model type value table referenced in Appendix, not present. -->
<!-- UNRESOLVED: Flow control method (RTS/CTS or XON/XOFF) not specified — "Full duplex" stated but flow_control policy unstated. -->
<!-- UNRESOLVED: Model code (ID2) value for NP-PX1005QL B not stated. -->
<!-- UNRESOLVED: Control ID (ID1) default/setting not stated in this excerpt. -->
````

Spec ready. 53 actions enumerated (all source command rows). Both serial+TCP protocols included (port 7142 explicit). Baud rates listed as supported rates. Appendix value tables marked UNRESOLVED (referenced but not present in source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:55:41.628Z
last_checked_at: 2026-06-18T08:53:43.318Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:53:43.318Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value table (DATA01 values for 018/319-10) referenced in \"Appendix — Supplementary Information by Command\" but appendix not present in source."
- "sub input setting value table referenced in appendix, not present."
- "eco mode value table referenced in appendix, not present."
- "base model type value table referenced in appendix, not present."
- "aspect value table referenced in appendix, not present."
- "source states \"Full duplex\" communication mode but does not specify flow control method"
- "no async event/notification mechanism stated in source."
- "none documented."
- "power-on sequencing, interlock recovery, and safe-shutdown"
- "Input terminal value table (used by 018, 319-10, PIP sub-input) referenced in \"Appendix — Supplementary Information by Command\" but appendix not present in this refined source."
- "Eco mode value table referenced in Appendix, not present."
- "Aspect value table referenced in Appendix, not present."
- "Base model type value table referenced in Appendix, not present."
- "Flow control method (RTS/CTS or XON/XOFF) not specified — \"Full duplex\" stated but flow_control policy unstated."
- "Model code (ID2) value for NP-PX1005QL B not stated."
- "Control ID (ID1) default/setting not stated in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
