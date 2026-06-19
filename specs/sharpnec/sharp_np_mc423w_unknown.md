---
spec_id: admin/sharp-nec-np-mc423w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP MC423W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP MC423W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP MC423W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:51:53.260Z
last_checked_at: 2026-06-18T08:37:15.413Z
generated_at: 2026-06-18T08:37:15.413Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value list, eco mode value list, and aspect value list are referenced as \"see Appendix Supplementary Information by Command\" — appendix not included in source text."
  - "flow control not stated in source (RTS/CTS pins present on connector)"
  - "value list in appendix not in source"
  - "other target values not shown in source"
  - "other target values not shown"
  - "no explicit power-on sequencing or safety certification values stated in source."
  - "input terminal value list, aspect value list, eco mode value list, base model type list, sub input value list — all in missing appendix."
  - "default baud rate not stated (only options)."
  - "serial flow control not stated (RTS/CTS pins wired on connector but usage unspecified)."
  - "LENS CONTROL (053) and LENS CONTROL 2 (053-2) additional target values beyond those shown not documented in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:37:15.413Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP MC423W Control Spec

## Summary
Projector control spec for the Sharp/NEC NP MC423W. Supports both RS-232C serial control (PC CONTROL D-SUB 9P) and TCP/IP LAN control (wired/wireless, port 7142). Binary hex command protocol with checksum byte. Covers power, input switching, mute, picture/volume/aspect adjust, lens control/memory, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: input terminal value list, eco mode value list, and aspect value list are referenced as "see Appendix Supplementary Information by Command" — appendix not included in source text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists options 115200/38400/19200/9600/4800 bps; default not stated
  baud_rate_options: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins present on connector)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands (015/016)
  - queryable    # inferred from many status request commands
  - levelable    # inferred from PICTURE ADJUST / VOLUME ADJUST commands
  - routable     # inferred from INPUT SW CHANGE command (018)
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: While turning on power, no other command accepted.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While turning off (incl. cooling time), no other command accepted.

  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
    params:
      - name: input
        type: integer
        description: Input terminal value (DATA01). Example 06h = video port. See Appendix "Supplementary Information by Command" for full list.
    notes: "Checksum = low byte of sum of all preceding bytes. Response FFh = error (no signal switch)."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Turned off by input/video switch.

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: Turned off by input/video switch or volume adjustment.

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: Turned off by input/video switch.

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: enum
        description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: enum
        description: "DATA02 adjustment mode: 00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: DATA03 adjustment value low 8 bits
      - name: value_hi
        type: integer
        description: DATA04 adjustment value high 8 bits

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: enum
        description: "DATA01 adjustment mode: 00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: DATA02 adjustment value low 8 bits
      - name: value_hi
        type: integer
        description: DATA03 adjustment value high 8 bits

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
    params:
      - name: value
        type: integer
        description: "DATA01 aspect value. See Appendix Supplementary Information by Command."  # UNRESOLVED: value list in appendix not in source

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: enum
        description: "DATA03 adjustment mode: 00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: DATA04 adjustment value low 8 bits
      - name: value_hi
        type: integer
        description: DATA05 adjustment value high 8 bits
    notes: "DATA01=96h DATA02=FFh targets LAMP ADJUST / LIGHT ADJUST."

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated at 1-min intervals.

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time sec (DATA01-04), filter alarm start time sec (DATA05-08). -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: enum
        description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: enum
        description: "DATA02: 01h=usage time sec, 04h=remaining life %"
    notes: Eco mode values reflect eco mode. Negative remaining life if replacement deadline exceeded.

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {checksum}"
    params:
      - name: type
        type: enum
        description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999).

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
    params:
      - name: key_lo
        type: integer
        description: "DATA01 of WORD key code. Key list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: key_hi
        type: integer
        description: "DATA02 of WORD key code (always 00h in listed keys)."

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
    params:
      - name: target
        type: enum
        description: "DATA01: 06h=Periphery Focus"  # UNRESOLVED: other target values not shown in source
      - name: content
        type: enum
        description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: After 7Fh/81h send 00h to stop. Lens can be controlled without stop by re-issuing same command.

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
    params:
      - name: target
        type: integer
        description: DATA01 lens adjustment target.
    notes: Returns upper/lower range and current value (each as lo/hi 8 bits).

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: enum
        description: "DATA01: FFh=Stop"  # UNRESOLVED: other target values not shown
      - name: mode
        type: enum
        description: "DATA02: 00h=absolute, 02h=relative"
      - name: value_lo
        type: integer
        description: DATA03 adjustment value low 8 bits
      - name: value_hi
        type: integer
        description: DATA04 adjustment value high 8 bits
    notes: If DATA01=Stop(FFh), mode and value not referenced.

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls profile number specified by LENS PROFILE SET (053-10).

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {option} {checksum}"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: Returns setting value DATA02: 00h=OFF, 01h=ON.

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: enum
        description: "DATA02: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift H, bit4=Lens Shift V (0=Stop, 1=During operation).

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {checksum}"
    params:
      - name: profile
        type: enum
        description: "DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: Returns DATA01 profile: 00h=Profile 1, 01h=Profile 2.

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
    params:
      - name: name
        type: enum
        description: "DATA01 adjusted value: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: Returns status, range limits, default, current, wide/narrow adjustment widths.

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type (DATA01-03), sound function (DATA04), profile/clock function (DATA05).

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06).

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed.

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display states.

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: Returns model name string (DATA01-32, NUL-terminated).

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed.

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {state} {checksum}"
    params:
      - name: state
        type: enum
        description: "DATA01: 01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
    params:
      - name: type
        type: enum
        description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Returns Light mode or Lamp mode depending on projector.

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: Returns projector name string (DATA01-17, NUL-terminated).

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: Returns MAC address (DATA01-06).

  - id: pip_picture_by_picture_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
    params:
      - name: item
        type: enum
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: Returns DATA01: 00h=OFF, 01h=ON.

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "DATA01 eco mode value."  # UNRESOLVED: value list in appendix not in source

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_bytes_16} 00h {checksum}"
    params:
      - name: name_bytes_16
        type: string
        description: Projector name (DATA01-16, up to 16 bytes), NUL-padded.

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
    params:
      - name: item
        type: enum
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "DATA02 setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input per appendix)."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
    params:
      - name: value
        type: enum
        description: "DATA01: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11).

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: Returns serial number string (DATA01-16, NUL-terminated).

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
    params:
      - name: input
        type: integer
        description: "DATA01 input terminal. See Appendix Supplementary Information by Command."  # UNRESOLVED: value list in appendix not in source
      - name: value
        type: enum
        description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response
    type: enum
    description: Generic success/error response for all commands.
    success_pattern: "2Xh {cmd} {ID1} {ID2} {LEN} ... {CKS}"  # first byte top nibble 2/3 = success
    error_pattern: "AXh {cmd} {ID1} {ID2} 02h {ERR1} {ERR2} {CKS}"  # first byte top nibble A = error
    error_codes:
      - "ERR1=00h ERR2=00h: Command not recognized"
      - "ERR1=00h ERR2=01h: Command not supported by model"
      - "ERR1=01h ERR2=00h: Specified value invalid"
      - "ERR1=01h ERR2=01h: Specified input terminal invalid"
      - "ERR1=01h ERR2=02h: Specified language invalid"
      - "ERR1=02h ERR2=00h: Memory allocation error"
      - "ERR1=02h ERR2=02h: Memory in use"
      - "ERR1=02h ERR2=03h: Specified value cannot be set"
      - "ERR1=02h ERR2=04h: Forced onscreen mute on"
      - "ERR1=02h ERR2=06h: Viewer error"
      - "ERR1=02h ERR2=07h: No signal"
      - "ERR1=02h ERR2=08h: Test pattern or filter displayed"
      - "ERR1=02h ERR2=09h: No PC card inserted"
      - "ERR1=02h ERR2=0Ah: Memory operation error"
      - "ERR1=02h ERR2=0Ch: Entry list displayed"
      - "ERR1=02h ERR2=0Dh: Command cannot be accepted (power off)"
      - "ERR1=02h ERR2=0Eh: Command execution failed"
      - "ERR1=02h ERR2=0Fh: No authority for operation"
      - "ERR1=03h ERR2=00h: Specified gain number incorrect"
      - "ERR1=03h ERR2=01h: Specified gain invalid"
      - "ERR1=03h ERR2=02h: Adjustment failed"
  - id: error_status
    type: bitfield
    description: Error status bitfield (12 bytes) returned by ERROR STATUS REQUEST (009). Covers cover/fan/temp/power/lamp errors, mirror cover, interlock switch, system errors.
```

## Variables
```yaml
variables:
  - id: brightness
    description: Picture brightness (adjustable via PICTURE ADJUST target 00h; queryable via GAIN PARAMETER REQUEST 3 name 00h)
  - id: contrast
    description: Picture contrast (target 01h)
  - id: color
    description: Picture color (target 02h)
  - id: hue
    description: Picture hue (target 03h)
  - id: sharpness
    description: Picture sharpness (target 04h)
  - id: volume
    description: Sound volume (VOLUME ADJUST; GAIN REQUEST name 05h)
  - id: lamp_light_adjust
    description: Lamp/Light adjust (OTHER ADJUST; GAIN REQUEST name 96h)
  - id: eco_mode
    description: Eco / Light / Lamp mode (set via 098-8, query via 097-8)
  - id: projector_name
    description: LAN projector name (set via 098-45, query via 097-45; up to 16 bytes)
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are replies to commands.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): while turning on, no other command accepted."
  - "POWER OFF (016): while turning off (incl. cooling time), no other command accepted."
  - "Error status DATA09 bit1: interlock switch open."
# UNRESOLVED: no explicit power-on sequencing or safety certification values stated in source.
```

## Notes
- Binary hex protocol. Command frame format: `{first_byte} {cmd_lo} {ID1} {ID2} {LEN} {DATA...} {CKS}`. First byte top nibble indicates direction/class: `0x` request, `2x`/`3x` success response, `Ax`/`Bx` error response.
- Checksum (CKS) = low-order one byte of sum of all preceding bytes.
- ID1 = projector control ID (configurable). ID2 = model code (model-specific).
- RS-232 uses cross (null-modem) cable on PC CONTROL D-SUB 9P. LAN uses RJ-45 (wired) or optional wireless LAN unit.
- Serial baud rate selectable: 115200 / 38400 / 19200 / 9600 / 4800 bps. Default not stated.
- Several commands reference an "Appendix: Supplementary Information by Command" for full value lists (input terminal, aspect, eco mode, base model type, sub input). That appendix is not present in the provided source text — affected fields marked UNRESOLVED.
- Lamp usage and filter usage times returned in seconds, updated at 1-minute intervals.
<!-- UNRESOLVED: input terminal value list, aspect value list, eco mode value list, base model type list, sub input value list — all in missing appendix. -->
<!-- UNRESOLVED: default baud rate not stated (only options). -->
<!-- UNRESOLVED: serial flow control not stated (RTS/CTS pins wired on connector but usage unspecified). -->
<!-- UNRESOLVED: LENS CONTROL (053) and LENS CONTROL 2 (053-2) additional target values beyond those shown not documented in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:51:53.260Z
last_checked_at: 2026-06-18T08:37:15.413Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:37:15.413Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value list, eco mode value list, and aspect value list are referenced as \"see Appendix Supplementary Information by Command\" — appendix not included in source text."
- "flow control not stated in source (RTS/CTS pins present on connector)"
- "value list in appendix not in source"
- "other target values not shown in source"
- "other target values not shown"
- "no explicit power-on sequencing or safety certification values stated in source."
- "input terminal value list, aspect value list, eco mode value list, base model type list, sub input value list — all in missing appendix."
- "default baud rate not stated (only options)."
- "serial flow control not stated (RTS/CTS pins wired on connector but usage unspecified)."
- "LENS CONTROL (053) and LENS CONTROL 2 (053-2) additional target values beyond those shown not documented in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
