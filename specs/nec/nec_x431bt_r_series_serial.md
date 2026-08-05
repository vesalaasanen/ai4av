---
spec_id: admin/nec-x431bt-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X431BT-R Series Control Spec"
manufacturer: NEC
model_family: "X431BT-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X431BT-R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-14T23:29:05.353Z
last_checked_at: 2026-07-21T23:36:10.677Z
generated_at: 2026-07-21T23:36:10.677Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact base model code (ID2) for X431BT-R not stated in this command reference; varies by model"
  - "no single default; source lists 115200/38400/19200/9600/4800 bps configurable"
  - "no unsolicited event/notification messages described in source."
  - "no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond general command timing notes"
  - "exact base model code (ID2) and model-specific Appendix variant selections for X431BT-R not pinned in this generic command reference."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:36:10.677Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source command table verbatim; every hex opcode, parameter, and transport value present in source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X431BT-R Series Control Spec

## Summary
NEC X431BT-R Series professional projector supporting both RS-232C serial and wired TCP/IP control. The projector accepts hexadecimal command packets with checksum validation and returns acknowledgements or data responses. Supported functions include power control, input routing, picture/sound muting, lens positioning, eco mode, and comprehensive status querying.

<!-- UNRESOLVED: exact base model code (ID2) for X431BT-R not stated in this command reference; varies by model -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: no single default; source lists 115200/38400/19200/9600/4800 bps configurable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full-duplex; RTS/CTS pins present but no flow-control setting stated
addressing:
  port: 7142  # stated for wired LAN send/receive
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable    # inferred from POWER ON / POWER OFF commands
- routable     # inferred from INPUT SW CHANGE command
- queryable    # inferred from many REQUEST commands
- levelable    # inferred from PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST
```

## Actions
```yaml
# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"
  params: []
  description: Turns on projector power. No other command accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []
  description: Turns off projector power. No other command accepted during cooling sequence.

# --- Input routing ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {input} {checksum}"
  params:
    - name: input
      type: integer
      description: "Input terminal hex code (e.g. 06h=VIDEO, 01h=COMPUTER, A1h=HDMI, 20h=LAN). See Appendix input terminal table."
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Switches input terminal or entry list. See Appendix for full input terminal code table.

# --- Mutes ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []
  description: Turns picture mute on. Cancelled by input switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"
  params: []
  description: Turns sound mute on. Cancelled by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"
  params: []
  description: Turns onscreen mute on. Cancelled by input switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"
  params: []

# --- Adjustments (030 group) ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 {target} FF {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
    - name: mode
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: value_lo
      type: integer
      description: "Adjustment value low-order byte (16-bit signed)"
    - name: value_hi
      type: integer
      description: "Adjustment value high-order byte (16-bit signed; negative = two's complement)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Adjusts picture parameters. Value is 16-bit signed; negative values represented in two's complement. DATA02 mode byte hardcoded FFh in source.

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: value_lo
      type: integer
      description: "Adjustment value low-order byte (16-bit signed)"
    - name: value_hi
      type: integer
      description: "Adjustment value high-order byte (16-bit signed)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {value} 00 {checksum}"
  params:
    - name: value
      type: integer
      description: "Aspect mode hex code (00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX/ZOOM, 08h=ZOOM, 09h/10h=FULL). See Appendix."
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Adjusts aspect ratio. See Appendix for full aspect code table.

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03 10 00 00 05 {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target_lo
      type: integer
      description: "Target low byte (96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: target_hi
      type: integer
      description: "Target high byte (FFh for LAMP ADJUST / LIGHT ADJUST)"
    - name: mode
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: value_lo
      type: integer
      description: "Adjustment value low-order byte (16-bit signed)"
    - name: value_hi
      type: integer
      description: "Adjustment value high-order byte (16-bit signed)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."

# --- Remote key ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {key_lo} {key_hi} {checksum}"
  params:
    - name: key_lo
      type: integer
      description: "Key code low byte (DATA01). Key codes: POWER ON=02h, POWER OFF=03h, AUTO=05h, MENU=06h, UP=07h, DOWN=08h, RIGHT=09h, LEFT=0Ah, ENTER=0Bh, EXIT=0Ch, HELP=0Dh, MAGNIFY UP=0Fh, MAGNIFY DOWN=10h, MUTE=13h, PICTURE=29h, COMPUTER1=4Bh, COMPUTER2=4Ch, VIDEO1=4Fh, S-VIDEO1=51h, VOLUME UP=84h, VOLUME DOWN=85h, FREEZE=8Ah, ASPECT=A3h, SOURCE=D7h, LAMP MODE/ECO=EEh."
    - name: key_hi
      type: integer
      description: "Key code high byte (DATA02, typically 00h)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Sends remote control key code to projector.

# --- Shutter ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"
  params: []
  description: Closes the lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"
  params: []
  description: Opens the lens shutter.

# --- Lens ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02 18 00 00 02 {target} {direction} {checksum}"
  params:
    - name: target
      type: integer
      description: "Target (06h=Periphery Focus)"
    - name: direction
      type: integer
      description: "Direction/stop (00h=Stop, 01h=Drive+1s, 02h=Drive+0.5s, 03h=Drive+0.25s, 7Fh=Drive continuous+, 81h=Drive continuous-, FDh=Drive-0.25s, FEh=Drive-0.5s, FFh=Drive-1s)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Adjusts lens position. Sending 7Fh or 81h while lens is moving stops it with 00h.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {control} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: control
      type: integer
      description: "Control (FFh=Stop, otherwise drive)"
    - name: mode
      type: integer
      description: "Mode (00h=absolute, 02h=relative)"
    - name: value_lo
      type: integer
      description: "16-bit adjustment value low-order byte"
    - name: value_hi
      type: integer
      description: "16-bit adjustment value high-order byte"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Fine lens position adjustment with absolute or relative mode.

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Controls lens memory (MOVE, STORE, RESET).

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Controls reference lens memory by profile number set via LENS PROFILE SET.

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {option} {value} {checksum}"
  params:
    - name: option
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"
    - name: value
      type: integer
      description: "Setting (00h=OFF, 01h=ON)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {profile} {checksum}"
  params:
    - name: profile
      type: integer
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Selects profile number for reference lens memory.

# --- Freeze ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 {action} {checksum}"
  params:
    - name: action
      type: integer
      description: "Action (01h=Freeze ON, 02h=Freeze OFF)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."

# --- Eco mode ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "Eco mode hex code (00h=OFF/Normal, 01h=Normal/AUTO ECO/ON, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT). Values vary by model; see Appendix."
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Sets eco mode (Light mode or Lamp mode depending on projector).

# --- LAN name ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {name_16_bytes} 00 {checksum}"
  params:
    - name: name_16_bytes
      type: string
      description: "Projector name (up to 16 bytes), followed by NUL terminator"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Sets the projector name over LAN.

# --- PIP / Picture by Picture ---
- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {target} {value} {checksum}"
  params:
    - name: target
      type: integer
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"
    - name: value
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PICTURE BY PICTURE; POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Sets picture-in-picture or picture-by-picture mode and position.

# --- Edge blending ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "Mode (00h=OFF, 01h=ON)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."

# --- Audio select ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 {input} {value} {checksum}"
  params:
    - name: input
      type: integer
      description: "Input terminal hex code for audio source. See Appendix input terminal table."
    - name: value
      type: integer
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: Sets audio input source. See Appendix for full input terminal codes.

# ====================================================================
# QUERY COMMANDS (REQUEST family) - request payload commands.
# Response shape documented in corresponding Feedback entry.
# ====================================================================

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"
  params: []
  description: "Gets error information (12 bytes). See Feedback error_status."

- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []
  description: "Gets projector info (name, lamp usage, filter usage). See Feedback projector_info."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []
  description: "Gets filter usage time and alarm start time. See Feedback filter_usage."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03 96 00 00 02 {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: integer
      description: "Lamp number (00h=Lamp1, 01h=Lamp2)"
    - name: content
      type: integer
      description: "Content (01h=usage time seconds, 04h=remaining life percent)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: "Gets lamp usage time / remaining life. See Feedback lamp_info."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {type} {checksum}"
  params:
    - name: type
      type: integer
      description: "Type (00h=Total, 01h=Operation)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: "Gets carbon savings values. See Feedback carbon_savings."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {target} 00 {checksum}"
  params:
    - name: target
      type: integer
      description: "Lens target to query"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: "Gets adjusted lens position values (limits + current). See Feedback lens_position."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {option} {checksum}"
  params:
    - name: option
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: "Gets lens memory option setting. See Feedback lens_memory_option."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []
  description: "Gets lens movement status bitfield. See Feedback lens_info."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []
  description: "Gets selected reference lens memory profile number. See Feedback lens_profile."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {target} 00 00 {checksum}"
  params:
    - name: target
      type: integer
      description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: "Gets gain parameter ranges + current value. See Feedback gain_parameter."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []
  description: "Gets projector setting info (base model, sound, profile/clock). See Feedback setting_info."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []
  description: "Gets operation status (power, cooling, on/off process). See Feedback running_status and power_state."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []
  description: "Gets input signal status. See Feedback input_status."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []
  description: "Gets picture/sound/onscreen mute status. See Feedback mute_status."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []
  description: "Gets model name string. See Feedback model_name."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []
  description: "Gets mirror/lens cover status. See Feedback cover_status."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {type} 01 {checksum}"
  params:
    - name: type
      type: integer
      description: "Information type (03h=Horizontal sync freq, 04h=Vertical sync freq)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: "Gets information strings (English) e.g. sync frequencies. See Feedback info_string."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []
  description: "Gets eco mode setting. See Feedback eco_mode."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []
  description: "Gets projector name (LAN). See Feedback lan_projector_name."

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []
  description: "Gets MAC address. See Feedback mac_address."

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {target} {checksum}"
  params:
    - name: target
      type: integer
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"
    - name: checksum
      type: string
      description: "Low-order byte of sum of all preceding bytes."
  description: "Gets PIP/PbP setting. See Feedback pip_status."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []
  description: "Gets edge blending setting. See Feedback edge_blending_mode."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []
  description: "Gets base model type and model name. See Feedback base_model_type."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []
  description: "Gets serial number string. See Feedback serial_number."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []
  description: "Gets basic operation status. See Feedback basic_info."
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitfield
  description: Returns 12 bytes of error information. Bit=0 normal, Bit=1 error. DATA01: Cover error(Bit0), Temp error(Bit1), Fan error(Bit3), Fan error(Bit4), Power error(Bit5), Lamp off(Bit6), Lamp moratorium(Bit7). DATA02: Lamp time exceeded(Bit0), Formatter error(Bit1), Lamp2 off(Bit2). DATA03: FPGA error(Bit1), Temp sensor error(Bit2), Lamp data error(Bit4), Mirror cover error(Bit5), Lamp2 moratorium(Bit6), Lamp2 time exceeded(Bit7). DATA04: Lamp2 not present(Bit0), Lamp2 data error(Bit1), Dust temp error(Bit2), Foreign matter sensor(Bit3), Ballast comm error(Bit5), Iris cal error(Bit6), Lens not installed(Bit7). DATA09: Portrait cover side up(Bit0), Interlock switch open(Bit1), Slave CPU error(Bit2), Formatter error(Bit3).

- id: power_state
  label: Power State
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "04h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"
    - "FFh: Not supported"
  description: From RUNNING STATUS REQUEST (DATA03/DATA06) and BASIC INFORMATION REQUEST (DATA01).

- id: running_status
  label: Running Status
  type: object
  description: "DATA01-02: Reserved. DATA03: Power status. DATA04: Cooling process (00h=not executed, 01h=during execution, FFh=not supported). DATA05: Power On/Off process. DATA06: Operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Standby Power saving, 10h=Network standby, FFh=not supported)."

- id: input_status
  label: Input Status
  type: object
  description: "DATA01: Signal switch process. DATA02: Signal list number (returned value+1=practical). DATA03: Selection signal type 1 (01h=1, 02h=2, 03h=3, 04h=4, 05h=5). DATA04: Selection signal type 2 (01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER1-5, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER6-10, FFh=Not Source Input). DATA05: Signal list type. DATA06: Test pattern display. DATA09: Content displayed (00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN, FFh=Not supported)."

- id: mute_status
  label: Mute Status
  type: object
  description: "DATA01: Picture mute (00h=Off, 01h=On). DATA02: Sound mute (00h=Off, 01h=On). DATA03: Onscreen mute (00h=Off, 01h=On). DATA04: Forced onscreen mute (00h=Off, 01h=On). DATA05: Onscreen display (00h=Not displayed, 01h=Displayed)."

- id: model_name
  label: Model Name
  type: string
  description: Returns model name string (up to 32 bytes, NUL-terminated) from MODEL NAME REQUEST.

- id: cover_status
  label: Cover Status
  type: enum
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"
  description: Status of mirror cover or lens cover from COVER STATUS REQUEST.

- id: projector_info
  label: Projector Info
  type: object
  description: "DATA01-49: Projector name. DATA83-86: Lamp usage time (seconds, updated 1min). DATA87-90: Filter usage time (seconds). From INFORMATION REQUEST."

- id: filter_usage
  label: Filter Usage Info
  type: object
  description: "DATA01-04: Filter usage time (seconds). DATA05-08: Filter alarm start time (seconds). Returns -1 if undefined. From FILTER USAGE INFORMATION REQUEST."

- id: lamp_info
  label: Lamp Information
  type: object
  description: "DATA01: Lamp number (00h=Lamp1, 01h=Lamp2). DATA02: Content (01h=usage time seconds, 04h=remaining life percent). DATA03-06: Obtained value. Eco mode affects returned values. Remaining life returns negative if deadline exceeded. From LAMP INFORMATION REQUEST 3."

- id: carbon_savings
  label: Carbon Savings Info
  type: object
  description: "DATA01: Type (00h=Total, 01h=Operation). DATA02-05: Carbon Savings in kg (max 99999). DATA06-09: Carbon Savings in mg (max 999999). From CARBON SAVINGS INFORMATION REQUEST."

- id: lens_position
  label: Lens Position
  type: object
  description: "DATA02-03: Upper limit (16-bit). DATA04-05: Lower limit (16-bit). DATA06-07: Current value (16-bit). From LENS CONTROL REQUEST."

- id: lens_info
  label: Lens Information
  type: bitfield
  description: "DATA01 bitfield: Bit0=Lens memory(0=Stop,1=Moving), Bit1=Zoom(0=Stop,1=Moving), Bit2=Focus(0=Stop,1=Moving), Bit3=Lens Shift H(0=Stop,1=Moving), Bit4=Lens Shift V(0=Stop,1=Moving). From LENS INFORMATION REQUEST."

- id: gain_parameter
  label: Gain Parameter
  type: object
  description: "DATA01: Status (00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Gain does not exist). DATA02-03: Upper limit. DATA04-05: Lower limit. DATA06-07: Default. DATA08-09: Current value. DATA10-11: Wide width. DATA12-13: Narrow width. DATA14: Default valid flag (00h=invalid, 01h=valid). Targets: 00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT. From GAIN PARAMETER REQUEST 3."

- id: setting_info
  label: Setting Info
  type: object
  description: "DATA01-03: Base model type. DATA04: Sound function (00h=Not available, 01h=Available). DATA05: Profile number / Clock function / Sleep timer. From SETTING REQUEST."

- id: eco_mode
  label: Eco Mode
  type: integer
  description: Returns eco mode hex code (00h=OFF, 01h=Normal/AUTO, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT). Values vary by model. From ECO MODE REQUEST.

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  description: "DATA01: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE). DATA02: Setting (00h=OFF, 01h=ON). From LENS MEMORY OPTION REQUEST."

- id: lens_profile
  label: Lens Profile
  type: enum
  values:
    - "00h: Profile 1"
    - "01h: Profile 2"
  description: Selected profile number from LENS PROFILE REQUEST.

- id: lan_projector_name
  label: LAN Projector Name
  type: string
  description: Projector name string (up to 17 bytes, NUL-terminated) from LAN PROJECTOR NAME REQUEST.

- id: mac_address
  label: MAC Address
  type: string
  description: MAC address (6 bytes) from LAN MAC ADDRESS STATUS REQUEST2.

- id: pip_status
  label: PIP/Picture by Picture Status
  type: object
  description: "DATA01: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT). DATA02: Setting value (MODE: 00h=PIP, 01h=PICTURE BY PICTURE; POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT). From PIP/PICTURE BY PICTURE REQUEST."

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"
  description: Edge blending setting from EDGE BLENDING MODE REQUEST.

- id: serial_number
  label: Serial Number
  type: string
  description: Serial number string (up to 16 bytes, NUL-terminated) from SERIAL NUMBER REQUEST.

- id: base_model_type
  label: Base Model Type
  type: object
  description: "DATA01-02 and DATA12-13: Base model type codes. DATA03-11: Model name. From BASE MODEL TYPE REQUEST."

- id: basic_info
  label: Basic Information
  type: object
  description: "DATA01: Operation status. DATA02: Content displayed. DATA03: Selection signal type 1. DATA04: Selection signal type 2. DATA05: Display signal type. DATA06: Video mute. DATA07: Sound mute. DATA08: Onscreen mute. DATA09: Freeze status. From BASIC INFORMATION REQUEST."

- id: info_string
  label: Information String
  type: string
  description: "DATA01: Info type (03h=Horizontal sync freq, 04h=Vertical sync freq). DATA02: String length. DATA03-??: NUL-terminated string. From INFORMATION STRING REQUEST."

- id: audio_select
  label: Audio Select Status
  type: object
  description: "DATA01: Input terminal. DATA02: Execution result (00h=success, 01h=error). From AUDIO SELECT SET response."

- id: error_codes
  label: Error Codes (ERR1/ERR2)
  type: object
  description: "Response error code pairs. ERR1/ERR2: 00h/00h=unrecognized command; 00h/01h=not supported by model; 01h/00h=invalid value; 01h/01h=invalid input terminal; 01h/02h=invalid language; 02h/00h=memory allocation error; 02h/02h=memory in use; 02h/03h=value cannot be set; 02h/04h=forced onscreen mute on; 02h/06h=viewer error; 02h/07h=no signal; 02h/08h=test pattern/filter displayed; 02h/09h=no PC card; 02h/0Ah=memory operation error; 02h/0Ch=entry list displayed; 02h/0Dh=power off; 02h/0Eh=command execution failed; 02h/0Fh=no authority; 03h/00h=incorrect gain number; 03h/01h=invalid gain; 03h/02h=adjustment failed."
```

## Variables
```yaml
# No standalone settable parameter commands separate from Actions.
# Volume is adjusted via volume_adjust action.
# Eco mode is set via eco_mode_set action.
# Projector name is set via lan_projector_name_set action.
# Edge blending is set via edge_blending_mode_set action.
# PIP/PbP is set via pip_picture_by_picture_set action.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification messages described in source.
# All communication is command-response; device does not initiate.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Interlock switch open state reported in error status (DATA09 Bit1). Projector may not accept commands when interlock is open.
  - description: Some models require specific standby modes to receive commands via serial or LAN. Supported standby modes vary by model (Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON for serial; Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON for wired LAN). Serial and LAN standby mode support differs on some models. Some models only support certain standby modes for LAN vs serial control.
  source: Standby Mode settings section
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond general command timing notes
```

## Notes
- Commands use 6-byte header packet format: `[HEADER1] [HEADER2] [ID1] [ID2] [LEN] [DATA...]` followed by checksum byte. Header1 varies (00h/01h/02h/03h for queries/actions). Response prefixes: A0h/A1h/A2h/A3h.
- Checksum is low-order byte of sum of all preceding bytes.
- ID1 is the control ID set on the projector. ID2 is the model code (varies by model).
- Commands 015 (POWER ON) and 016 (POWER OFF) block all other commands during execution.
- Power on and power off commands cannot be accepted during cooling/power-off sequences.
- Lamp usage time, filter usage time, and lamp remaining life are updated at 1-minute intervals despite 1-second resolution.
- Lamp remaining life returns negative value when lamp replacement deadline is exceeded.
- Signal list number returned is 1 less than practical value (add 1 to get actual).
- Portrait cover orientation and HDBaseT standby mode are model-dependent features indicated in extended status.
- The Appendix "Supplementary Information by Command" IS included in this source and covers input terminal codes, aspect codes, eco mode codes, selection signal type codes, and audio select codes. Per-input/per-model hex variations noted in Appendix tables.
<!-- UNRESOLVED: exact base model code (ID2) and model-specific Appendix variant selections for X431BT-R not pinned in this generic command reference. -->
````

Upgrade done. Summary of changes:

- **`command:` injected on all 27 existing actions** (verbatim hex w/ parameterized braces + checksum note).
- **25 query actions added** (`kind: query`) — every `*.REQUEST` command now mirrored in Actions, cross-ref'd to its Feedback.
- **`port: 7142` fixed** (was wrongly `null`; source states it explicitly).
- **`flow_control: none` note** added (full-duplex stated, no flow-control setting).
- **Traits annotated** w/ inference rationale.
- **Appendix UNRESOLVED resolved** — source now includes Appendix tables.
- **`error_codes` Feedback added** (full ERR1/ERR2 table from §2.4).
- All existing IDs/shapes preserved; nothing deleted.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-14T23:29:05.353Z
last_checked_at: 2026-07-21T23:36:10.677Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:36:10.677Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source command table verbatim; every hex opcode, parameter, and transport value present in source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact base model code (ID2) for X431BT-R not stated in this command reference; varies by model"
- "no single default; source lists 115200/38400/19200/9600/4800 bps configurable"
- "no unsolicited event/notification messages described in source."
- "no explicit safety warnings, interlock procedures, or power-on sequencing requirements beyond general command timing notes"
- "exact base model code (ID2) and model-specific Appendix variant selections for X431BT-R not pinned in this generic command reference."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
