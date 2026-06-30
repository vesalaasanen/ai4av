---
spec_id: admin/sharp-nec-p435-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P435 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "P435 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "P435 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:18:56.633Z
last_checked_at: 2026-06-18T08:59:03.681Z
generated_at: 2026-06-18T08:59:03.681Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for P435 Mpi4E not in source — varies by model"
  - "control ID (ID1) must be read from projector settings; broadcast 00h assumed"
  - "appendix \"Supplementary Information by Command\" tables (input terminal codes, aspect values, base model types, sub-input values) not present in source excerpt"
  - "source states \"Full duplex\" communication mode, flow control not specified"
  - "appendix not in source excerpt.\""
  - "target code list not stated beyond request frame.\""
  - "per-variable min/max/default ranges require GAIN PARAMETER REQUEST 3"
  - "not applicable per source."
  - "source contains no explicit safety warnings, power-sequencing"
  - "firmware version compatibility not stated"
  - "model code (ID2) for P435 Mpi4E not in source"
  - "control ID (ID1) default not stated"
  - "default baud rate not stated (5 supported: 115200/38400/19200/9600/4800)"
  - "appendix tables missing — input terminal codes, aspect values, base model types, sub-input setting values, eco mode values"
  - "serial flow control not specified (only \"Full duplex\" stated)"
  - "LENS CONTROL (053) DATA01 target codes beyond 06h (Periphery Focus) not enumerated"
  - "LENS CONTROL REQUEST (053-1) target code list not provided"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:59:03.681Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P435 Mpi4E Control Spec

## Summary
Sharp/NEC projector (BDT140013 Rev 7.1 control command reference). Binary hex protocol over RS-232C serial (cross cable, D-SUB 9P) and TCP LAN (port 7142). Commands are hex byte frames with broadcast ID1/ID2=00h and trailing checksum byte. Covers power, input switch, mutes, picture/volume/aspect/lens adjust, lens memory, status queries, eco/PIP/edge-blend/audio set.

<!-- UNRESOLVED: model code (ID2) value for P435 Mpi4E not in source — varies by model -->
<!-- UNRESOLVED: control ID (ID1) must be read from projector settings; broadcast 00h assumed -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" tables (input terminal codes, aspect values, base model types, sub-input values) not present in source excerpt -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default not stated - UNRESOLVED which default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode, flow control not specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable     (POWER ON / POWER OFF commands present)
# - routable      (INPUT SW CHANGE, AUDIO SELECT SET present)
# - queryable     (many *REQUEST commands returning status)
# - levelable     (VOLUME ADJUST, PICTURE ADJUST gains present)
# - shutterable   (SHUTTER CLOSE / OPEN present)  # inferred from shutter commands
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# All command payloads are VERBATIM hex bytes from the source. ID1/ID2 broadcast
# as 00h 00h (control ID + model code) per command frames as written. CKS = checksum
# byte = low byte of sum of all preceding bytes.
#
# Frame format: <header> <cmd> <ID1> <ID2> <len> <data...> <CKS>
# ACK format:   <header+20h> <cmd> <ID1> <ID2> <len> <data|err> <CKS>

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
  notes: During power-off incl. cooling time, no other command accepted.

- id: input_switch_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {cks}"
  params:
    - name: input
      type: integer
      description: "Input terminal code (DATA01). Source example: 06h = Video port. Full code list in appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source excerpt."
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: "Example (Video port): 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Input terminal switch or video signal switch turns mute off.

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
  notes: Input switch, video signal switch, or volume adjust turns mute off.

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
  notes: Input terminal switch or video signal switch turns mute off.

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01 adjustment target. 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: mode
      type: integer
      description: "DATA02. 00h=absolute value, 01h=relative value. Source fixes FFh before mode byte."
    - name: value_lo
      type: integer
      description: DATA03 adjustment value low 8 bits.
    - name: value_hi
      type: integer
      description: DATA04 adjustment value high 8 bits.
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: integer
      description: "DATA01. 00h=absolute value, 01h=relative value."
    - name: value_lo
      type: integer
      description: DATA02 low 8 bits.
    - name: value_hi
      type: integer
      description: DATA03 high 8 bits.
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {cks}"
  params:
    - name: value
      type: integer
      description: "DATA01 aspect value. Full list in appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source excerpt."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: other_adjust_lamp_light
  label: Other Adjust / Lamp-Light Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: integer
      description: "DATA03. 00h=absolute value, 01h=relative value."
    - name: value_lo
      type: integer
      description: DATA04 low 8 bits.
    - name: value_hi
      type: integer
      description: DATA05 high 8 bits.
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: "Source documents only DATA01=96h DATA02=FFh target = LAMP ADJUST / LIGHT ADJUST."

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name, lamp usage time (sec), filter usage time (sec). Updated 1-min intervals.

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time + filter alarm start time (sec). -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {cks}"
  params:
    - name: lamp
      type: integer
      description: "DATA01. 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)."
    - name: content
      type: integer
      description: "DATA02. 01h=lamp usage time (sec), 04h=lamp remaining life (%). Negative if past replacement deadline."
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: "Example lamp1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {cks}"
  params:
    - name: type
      type: integer
      description: "DATA01. 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {cks}"
  params:
    - name: key_lo
      type: integer
      description: "DATA01 (low byte of WORD key code). Source key list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
    - name: key_hi
      type: integer
      description: "DATA02 (high byte). 00h for all listed codes."
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: "Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
  command: "02h 18h 00h 00h 02h {target} {content} {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01. Source documents 06h=Periphery Focus only."
    - name: content
      type: integer
      description: "DATA02. 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus."
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: After 7Fh/81h continuous drive, send 00h to stop. While driving, same command repeats without stop.

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01 lens target. UNRESOLVED: target code list not stated beyond request frame."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01. FFh=Stop (skips mode/value)."
    - name: mode
      type: integer
      description: "DATA02. 00h=absolute value, 02h=relative value."
    - name: value_lo
      type: integer
      description: DATA03 low 8 bits.
    - name: value_hi
      type: integer
      description: DATA04 high 8 bits.
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {cks}"
  params:
    - name: operation
      type: integer
      description: "DATA01. 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {cks}"
  params:
    - name: operation
      type: integer
      description: "DATA01. 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: Controls profile selected by LENS PROFILE SET (053-10).

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {option} {cks}"
  params:
    - name: option
      type: integer
      description: "DATA01. 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {cks}"
  params:
    - name: option
      type: integer
      description: "DATA01. 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: value
      type: integer
      description: "DATA02. 00h=OFF, 01h=ON."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns lens operation status bitmask (Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V; 0=stop, 1=operating).

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {cks}"
  params:
    - name: profile
      type: integer
      description: "DATA01. 00h=Profile 1, 01h=Profile 2."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {cks}"
  params:
    - name: name
      type: integer
      description: "DATA01 adjusted value name. 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    - name: cks
      type: integer
      description: Computed checksum byte.
  notes: "Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function availability, profile number.

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process, operation status.

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed.

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status.

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
  notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {state} {cks}"
  params:
    - name: state
      type: integer
      description: "DATA01. 01h=freeze on, 02h=freeze off."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {cks}"
  params:
    - name: type
      type: integer
      description: "DATA01 info type. 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns Light mode or Lamp mode value depending on projector.

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
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {cks}"
  params:
    - name: item
      type: integer
      description: "DATA01. 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {cks}"
  params:
    - name: value
      type: integer
      description: "DATA01 eco mode value. Full list in appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source excerpt."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01..16} 00h {cks}"
  params:
    - name: name_01..16
      type: string
      description: "DATA01-16 projector name, up to 16 bytes (NUL-terminated)."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {cks}"
  params:
    - name: item
      type: integer
      description: "DATA01. 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: value
      type: integer
      description: "DATA02 setting value. MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values per appendix - UNRESOLVED."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {cks}"
  params:
    - name: value
      type: integer
      description: "DATA01 setting value. 00h=OFF, 01h=ON."
    - name: cks
      type: integer
      description: Computed checksum byte.

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type, model name, secondary base model type.

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
  notes: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {cks}"
  params:
    - name: input
      type: integer
      description: "DATA01 input terminal. Code list in appendix - UNRESOLVED: appendix not in source excerpt."
    - name: value
      type: integer
      description: "DATA02 setting value. 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: cks
      type: integer
      description: Computed checksum byte.
```

## Feedbacks
```yaml
# Each *REQUEST command above returns a structured response frame. Response frame
# format: <header+20h> <cmd> <ID1> <ID2> <len> <data...> <CKS>
# Error frame format: <header+20h> <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: error_status
  type: bitmask
  description: "Error Status Request (009) response. DATA01-12 bitmasks. Bit set = error."
  fields:
    - DATA01 Bit0: Cover error
    - DATA01 Bit3: Fan error
    - DATA01 Bit4: Fan error
    - DATA01 Bit5: Power error
    - DATA01 Bit6: Lamp/backlight off
    - DATA01 Bit7: Lamp replacement moratorium
    - DATA01 Bit1: Temperature error (bi-metallic strip)
    - DATA02 Bit0: Lamp usage time exceeded
    - DATA02 Bit1: Formatter error
    - DATA02 Bit2: Lamp 2 off
    - DATA02 Bit7: Extended status reference
    - DATA03 Bit1: FPGA error
    - DATA03 Bit2: Temperature error (sensor)
    - DATA03 Bit3: Lamp not present
    - DATA03 Bit4: Lamp data error
    - DATA03 Bit5: Mirror cover error
    - DATA03 Bit6: Lamp 2 replacement moratorium
    - DATA03 Bit7: Lamp 2 usage exceeded
    - DATA04 Bit0: Lamp 2 not present
    - DATA04 Bit1: Lamp 2 data error
    - DATA04 Bit2: Temperature error (dust)
    - DATA04 Bit3: Foreign matter sensor error
    - DATA04 Bit5: Ballast comm error
    - DATA04 Bit6: Iris calibration error
    - DATA04 Bit7: Lens not installed properly
    - DATA09 Bit0: Portrait cover side up
    - DATA09 Bit1: Interlock switch open
    - DATA09 Bit2: System error (Slave CPU)
    - DATA09 Bit3: System error (Formatter)

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: "From RUNNING STATUS REQUEST (078-2) DATA03 / BASIC INFORMATION REQUEST (305-3) DATA01."

- id: mute_state
  type: bitmask
  description: "From MUTE STATUS REQUEST (078-4). Picture, sound, onscreen, forced onscreen, OSD display."

- id: cover_state
  type: enum
  values: [normal_opened, closed]

- id: lens_operation_state
  type: bitmask
  description: "From LENS INFORMATION REQUEST (053-7) DATA01. Lens memory, zoom, focus, lens shift H/V operation bits."

- id: error_codes
  type: enum
  description: "ERR1/ERR2 combinations per source error code list."
  values:
    - "00h 00h: command not recognized"
    - "00h 01h: command not supported by model"
    - "01h 00h: specified value invalid"
    - "01h 01h: specified input terminal invalid"
    - "01h 02h: specified language invalid"
    - "02h 00h: memory allocation error"
    - "02h 02h: memory in use"
    - "02h 03h: specified value cannot be set"
    - "02h 04h: forced onscreen mute on"
    - "02h 06h: viewer error"
    - "02h 07h: no signal"
    - "02h 08h: test pattern or filter displayed"
    - "02h 09h: no PC card inserted"
    - "02h 0Ah: memory operation error"
    - "02h 0Ch: entry list displayed"
    - "02h 0Dh: command not accepted because power is off"
    - "02h 0Eh: command execution failed"
    - "02h 0Fh: no authority for operation"
    - "03h 00h: specified gain number incorrect"
    - "03h 01h: specified gain invalid"
    - "03h 02h: adjustment failed"
```

## Variables
```yaml
# Settable continuous parameters (covered by adjust actions above):
- id: brightness
  type: integer
  unit: ""
  description: PICTURE ADJUST target 00h.
- id: contrast
  type: integer
  description: PICTURE ADJUST target 01h.
- id: color
  type: integer
  description: PICTURE ADJUST target 02h.
- id: hue
  type: integer
  description: PICTURE ADJUST target 03h.
- id: sharpness
  type: integer
  description: PICTURE ADJUST target 04h.
- id: volume
  type: integer
  description: VOLUME ADJUST (030-2).
- id: lamp_light_adjust
  type: integer
  description: OTHER ADJUST (030-15), DATA01=96h.
# UNRESOLVED: per-variable min/max/default ranges require GAIN PARAMETER REQUEST 3
# response per device; source documents response layout but not static values.
```

## Events
```yaml
# Source documents no unsolicited notifications - projector only responds to commands.
# UNRESOLVED: not applicable per source.
```

## Macros
```yaml
# Source documents no named multi-step sequences.
# UNRESOLVED: not applicable per source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while turning on, no other command accepted."
  - "POWER OFF: during power-off including cooling time, no other command accepted."
  - "02h 0Dh error: command rejected when power is off."
  - "Error status DATA09 Bit1: interlock switch open (safety interlock reported)."
# UNRESOLVED: source contains no explicit safety warnings, power-sequencing
# procedures, or voltage/interlock specifications beyond error-bit reporting.
```

## Notes
- Protocol = binary hex frames, NOT ASCII. All bytes literal from source. Checksum = low byte of sum of all preceding bytes (verified against source example: 20h+81h+01h+60h+01h+00h = 103h → CKS=03h).
- Frame fields: `<header> <cmd> <ID1> <ID2> <len> <data...> <CKS>`. ID1=control ID (per-projector setting), ID2=model code. Commands shown use broadcast ID1=ID2=00h exactly as written in source.
- ACK header = command header + 20h (e.g. cmd 02h → ack 22h; cmd 03h → ack 23h; cmd 00h → ack 20h). Error ACK header = command header + A0h offset (e.g. 02h → A2h, 03h → A3h, 00h → A0h, 01h → A1h).
- Lamp/filter usage time returned in seconds, updated at 1-minute intervals.
- Lamp remaining life (%) returns negative value if past replacement deadline.
- RS-232 cross cable required (PC CONTROL D-SUB 9P: pin2=RxD, pin3=TxD, pin5=GND, pin7=RTS, pin8=CTS).
- LAN: 10/100 Mbps auto-sensing, IEEE802.3 / 802.3u. Wireless LAN via separate wireless LAN unit.
- Source is generic "Projector Control Command Reference Manual BDT140013 Rev 7.1" — applies across Sharp/NEC projector lineup; P435 Mpi4E is the target model per operator.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: model code (ID2) for P435 Mpi4E not in source -->
<!-- UNRESOLVED: control ID (ID1) default not stated -->
<!-- UNRESOLVED: default baud rate not stated (5 supported: 115200/38400/19200/9600/4800) -->
<!-- UNRESOLVED: appendix tables missing — input terminal codes, aspect values, base model types, sub-input setting values, eco mode values -->
<!-- UNRESOLVED: serial flow control not specified (only "Full duplex" stated) -->
<!-- UNRESOLVED: LENS CONTROL (053) DATA01 target codes beyond 06h (Periphery Focus) not enumerated -->
<!-- UNRESOLVED: LENS CONTROL REQUEST (053-1) target code list not provided -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:18:56.633Z
last_checked_at: 2026-06-18T08:59:03.681Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:59:03.681Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for P435 Mpi4E not in source — varies by model"
- "control ID (ID1) must be read from projector settings; broadcast 00h assumed"
- "appendix \"Supplementary Information by Command\" tables (input terminal codes, aspect values, base model types, sub-input values) not present in source excerpt"
- "source states \"Full duplex\" communication mode, flow control not specified"
- "appendix not in source excerpt.\""
- "target code list not stated beyond request frame.\""
- "per-variable min/max/default ranges require GAIN PARAMETER REQUEST 3"
- "not applicable per source."
- "source contains no explicit safety warnings, power-sequencing"
- "firmware version compatibility not stated"
- "model code (ID2) for P435 Mpi4E not in source"
- "control ID (ID1) default not stated"
- "default baud rate not stated (5 supported: 115200/38400/19200/9600/4800)"
- "appendix tables missing — input terminal codes, aspect values, base model types, sub-input setting values, eco mode values"
- "serial flow control not specified (only \"Full duplex\" stated)"
- "LENS CONTROL (053) DATA01 target codes beyond 06h (Periphery Focus) not enumerated"
- "LENS CONTROL REQUEST (053-1) target code list not provided"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
