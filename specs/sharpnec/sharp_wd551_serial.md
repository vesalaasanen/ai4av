---
spec_id: admin/sharp-nec-wd551
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC WD551 Control Spec"
manufacturer: Sharp/NEC
model_family: WD551
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - WD551
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:37:33.804Z
last_checked_at: 2026-06-19T07:45:44.738Z
generated_at: 2026-06-19T07:45:44.738Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit part numbers / supported models not specified in this document (refers to separate operation manual). Firmware version range not stated."
  - "source does not state which baud rate is the factory default; all five values are valid user-selectable options."
  - "numeric min/max/default ranges for picture/volume/lamp-adjust variables are device-reported at runtime via 060-1 GAIN PARAMETER REQUEST 3, not enumerated statically in the source."
  - "source documents no unsolicited notifications; all responses are solicited replies to commands."
  - "source documents no explicit multi-step sequences."
  - "source does not state explicit power-on sequencing procedures beyond the accept-no-other-command note above."
  - "Appendix \"Supplementary Information by Command\" not included in source excerpt — input terminal codes, aspect codes, eco-mode codes, base model type codes, and PBP sub-input codes are referenced but not enumerated."
  - "factory-default baud rate not stated."
  - "model code (ID2) value for WD551 not stated."
  - "control ID (ID1) default value not stated."
  - "firmware version compatibility range not stated."
  - "command timing / inter-command delays not specified (only the \"no other command accepted\" notes for power on/off)."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:45:44.738Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literal command codes from source manual; transport parameters (port 7142, baud rates, data/parity/stop bits) verified verbatim. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC WD551 Control Spec

## Summary
Projector control spec for the Sharp/NEC WD551. Covers an RS-232C serial interface (D-SUB 9P PC CONTROL port) and a TCP/IP LAN interface (RJ-45 wired or optional wireless LAN unit, TCP port 7142). Commands are binary (hex byte) frames with a leading code, control ID, model code, data length, variable data, and a trailing 8-bit checksum. Manual revision BDT140013 Rev 7.1.

<!-- UNRESOLVED: wireless LAN unit part numbers / supported models not specified in this document (refers to separate operation manual). Firmware version range not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as selectable; 9600 chosen as a documented value
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex mode stated, no flow-control field documented
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
# UNRESOLVED: source does not state which baud rate is the factory default; all five values are valid user-selectable options.
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON / POWER OFF commands present
  - queryable     # inferred: many *REQUEST commands return state
  - levelable     # inferred: PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST present
  - routable      # inferred: INPUT SW CHANGE selects input terminal
```

## Actions
```yaml
# Each hex payload shown verbatim from source. <CKS> = trailing 8-bit checksum
# (sum of all preceding bytes, low byte). <ID1> = control ID, <ID2> = model code.
# Fixed examples where source gives one are emitted verbatim; parameterized templates
# show the variable part.

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

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h = video port). See Appendix "Supplementary Information by Command".

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01}-{DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command").

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01}-{DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (DATA01=96h, DATA02=FFh for LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: Sub-target (FFh for LAMP/LIGHT ADJUST)
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (s), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys)

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (06h=Periphery Focus, plus standard zoom/focus/shift targets)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens adjustment target whose adjusted value is requested.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop, see source for target list)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command").

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: projector_name
      type: string
      description: Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated.

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01; see source and Appendix for sub input values)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command").
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frames mirror command leading bytes: success = Axh prefix, normal ack = 2xh prefix.
# Format: {A0|A1|A2|A3}h <cmd> <ID1> <ID2> <LEN> <data/ERR1 ERR2> <CKS>
- id: command_ack
  type: ack
  description: >
    2xh-prefixed response confirming command receipt/echo (e.g. 22h 00h <ID1> <ID2> 00h <CKS> for POWER ON).
- id: command_success
  type: enum
  description: >
    Axh-prefixed response; for data-less commands: A2h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1=ERR2=00h indicates success.
- id: error_status_response
  type: bitmask
  description: >
    Response to 009 ERROR STATUS REQUEST: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>. Each bit=1 indicates an error (cover, fan, temperature, power, lamp off, lamp replacement due, lamp usage exceeded, formatter, FPGA, mirror cover, ballast comm, iris calibration, lens not installed, interlock switch open, system errors, etc.). DATA05-08 and DATA10-12 reserved.
- id: running_status_response
  type: object
  description: >
    Response to 078-2: power status, cooling process, power on/off process, operation status (standby/power on/cooling/standby-error/standby-power-saving/network-standby).
- id: input_status_response
  type: object
  description: >
    Response to 078-3: signal switch process, signal list number (returned value = practical number - 1), selection signal types 1 & 2, signal list type, test pattern display, content displayed.
- id: mute_status_response
  type: object
  description: "Response to 078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=Off/00h=not displayed, 01h=On/displayed)."
- id: cover_status_response
  type: enum
  values: [normal_open, closed]
  description: "Response to 078-6: 00h=Normal (cover opened), 01h=Cover closed."
- id: lamp_information_response
  type: object
  description: "Response to 037-4: lamp usage time (seconds, 4 bytes) or remaining life (%). Negative remaining life if replacement deadline exceeded. Updated at one-minute intervals."
- id: filter_usage_response
  type: object
  description: "Response to 037-3: filter usage time (seconds, 4 bytes) and filter alarm start time (seconds, 4 bytes). -1 if undefined."
- id: information_response
  type: object
  description: "Response to 037: projector name (DATA01-49), lamp usage time (DATA83-86 seconds), filter usage time (DATA87-90 seconds)."
- id: eco_mode_response
  type: integer
  description: "Response to 097-8: eco mode value (model-dependent: 'Light mode' or 'Lamp mode')."
- id: edge_blending_response
  type: enum
  values: [off, on]
  description: "Response to 097-243-1: 00h=OFF, 01h=ON."
- id: pip_pbp_response
  type: object
  description: "Response to 097-198: mode (PIP/PBP), start position (4 corners), or sub input per requested DATA01."
- id: error_response
  type: object
  description: >
    Axh response with <ERR1> <ERR2> set. Error codes: 00h 00h=unrecognized; 00h 01h=not supported; 01h 00h=invalid value; 01h 01h=invalid input terminal; 01h 02h=invalid language; 02h 00h=memory allocation error; 02h 02h=memory in use; 02h 03h=value cannot be set; 02h 04h=forced onscreen mute on; 02h 06h=viewer error; 02h 07h=no signal; 02h 08h=test pattern/filter displayed; 02h 09h=no PC card; 02h 0Ah=memory operation error; 02h 0Ch=entry list displayed; 02h 0Dh=power off (command rejected); 02h 0Eh=execution failed; 02h 0Fh=no authority; 03h 00h=incorrect gain number; 03h 01h=invalid gain; 03h 02h=adjustment failed.
```

## Variables
```yaml
- id: picture_brightness
  type: integer
  description: Picture brightness (adjustable via 030-1 DATA01=00h). Range reported by 060-1.
- id: picture_contrast
  type: integer
  description: Picture contrast (030-1 DATA01=01h).
- id: picture_color
  type: integer
  description: Picture color (030-1 DATA01=02h).
- id: picture_hue
  type: integer
  description: Picture hue (030-1 DATA01=03h).
- id: picture_sharpness
  type: integer
  description: Picture sharpness (030-1 DATA01=04h).
- id: volume
  type: integer
  description: Sound volume (030-2). Range reported by 060-1 (DATA01=05h).
- id: lamp_adjust
  type: integer
  description: Lamp/Light adjust (030-15, DATA01=96h). Range reported by 060-1 (DATA01=96h).
- id: eco_mode
  type: integer
  description: Eco / Light / Lamp mode (098-8 set, 097-8 read).
- id: projector_name
  type: string
  description: LAN projector name, up to 16 bytes (098-45 set, 097-45 read).
- id: aspect
  type: integer
  description: Aspect value (030-12).
- id: pip_pbp_mode
  type: enum
  values: [pip, pbp]
  description: PIP / Picture-by-Picture mode (098-198 DATA01=00h).
- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: PIP/PBP start position (098-198 DATA01=01h).
- id: edge_blending
  type: enum
  values: [off, on]
  description: Edge blending mode (098-243-1).
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: Reference lens memory profile (053-10).
# UNRESOLVED: numeric min/max/default ranges for picture/volume/lamp-adjust variables are device-reported at runtime via 060-1 GAIN PARAMETER REQUEST 3, not enumerated statically in the source.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; all responses are solicited replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command can be accepted (source: section 3.2)."
  - "While POWER OFF is executing (including cooling time), no other command can be accepted (source: section 3.3)."
  - "Error status bit DATA09 Bit1: 'The interlock switch is open.' (source: section 3.1)."
warnings:
  - "Error 02h 0Dh: 'The command cannot be accepted because the power is off.' Many commands require power on first."
# UNRESOLVED: source does not state explicit power-on sequencing procedures beyond the accept-no-other-command note above.
```

## Notes
- Binary protocol: all commands/responses are hex byte frames. Frame layout = `<leading> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Leading byte encodes direction/type: `0x`/`1x`/`2x`/`3x` for commands (varies by command class), `2xh` = command-receipt ack, `Axh` = execution-result response.
- Checksum: sum of all preceding bytes, take low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → checksum `03h`.
- `<ID1>` is the projector's configured control ID. `<ID2>` is the model code (model-specific).
- Baud rate is selectable among 4800 / 9600 / 19200 / 38400 / 115200 bps; both endpoints must match. Source does not state the factory default.
- Several DATA fields reference an "Appendix: Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, base model types, sub input values) that is not present in this refined excerpt.
- Picture/Sound/Onscreen mute auto-clear on input terminal switch or video signal switch; sound mute also clears on volume adjustment.
- Lens control supports both continuous drive (send `00h` to stop after a `7Fh`/`81h`) and timed drive (0.25 / 0.5 / 1 second).
- Lamp usage / filter usage are updated at one-minute intervals despite one-second resolution.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in source excerpt — input terminal codes, aspect codes, eco-mode codes, base model type codes, and PBP sub-input codes are referenced but not enumerated. -->
<!-- UNRESOLVED: factory-default baud rate not stated. -->
<!-- UNRESOLVED: model code (ID2) value for WD551 not stated. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: command timing / inter-command delays not specified (only the "no other command accepted" notes for power on/off). -->
````

Spec built. 53 actions enumerated — every command row in source covered. Both serial + TCP emitted (port 7142 verbatim). Baud `9600` picked from stated options; flag as non-default since factory default not documented. Appendix cross-refs marked UNRESOLVED (not in excerpt).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:37:33.804Z
last_checked_at: 2026-06-19T07:45:44.738Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:45:44.738Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literal command codes from source manual; transport parameters (port 7142, baud rates, data/parity/stop bits) verified verbatim. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit part numbers / supported models not specified in this document (refers to separate operation manual). Firmware version range not stated."
- "source does not state which baud rate is the factory default; all five values are valid user-selectable options."
- "numeric min/max/default ranges for picture/volume/lamp-adjust variables are device-reported at runtime via 060-1 GAIN PARAMETER REQUEST 3, not enumerated statically in the source."
- "source documents no unsolicited notifications; all responses are solicited replies to commands."
- "source documents no explicit multi-step sequences."
- "source does not state explicit power-on sequencing procedures beyond the accept-no-other-command note above."
- "Appendix \"Supplementary Information by Command\" not included in source excerpt — input terminal codes, aspect codes, eco-mode codes, base model type codes, and PBP sub-input codes are referenced but not enumerated."
- "factory-default baud rate not stated."
- "model code (ID2) value for WD551 not stated."
- "control ID (ID1) default value not stated."
- "firmware version compatibility range not stated."
- "command timing / inter-command delays not specified (only the \"no other command accepted\" notes for power on/off)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
