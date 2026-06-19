---
spec_id: admin/sharp-nec-fe015i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC FE015I2 Control Spec"
manufacturer: Sharp/NEC
model_family: FE015I2
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - FE015I2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:27:37.393Z
last_checked_at: 2026-06-18T08:06:07.356Z
generated_at: 2026-06-18T08:06:07.356Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic projector command reference; exact model-specific support of each command not confirmed against the FE015I2 unit. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base model types) is not included in the provided text."
  - "flow control not stated; full-duplex communication mode stated"
  - "source does not document unsolicited notifications; all responses are command-driven."
  - "source does not document explicit multi-step sequences."
  - "no explicit safety interlock procedure or power-on sequencing beyond the command-acceptance notes above."
  - "Appendix \"Supplementary Information by Command\" not in provided source — exact input terminal bytes, aspect enum values, eco-mode values, base model type codes, and sub-input values unspecified."
  - "firmware version compatibility not stated."
  - "flow_control not stated in source."
  - "ID2 model code value for FE015I2 not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:06:07.356Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC FE015I2 Control Spec

## Summary
Control spec for the Sharp/NEC FE015I2 LED projector, based on the Projector Control Command Reference Manual (BDT140013 Revision 7.1). The device is controllable over RS-232C serial and wired/wireless LAN (TCP). All commands are binary hex frames using a header / ID1 / ID2 / LEN / DATA / checksum structure, with success responses prefixed `2xh` and error responses prefixed `Axh` carrying ERR1/ERR2 codes.

<!-- UNRESOLVED: source is a generic projector command reference; exact model-specific support of each command not confirmed against the FE015I2 unit. Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, base model types) is not included in the provided text. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists supported set: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex communication mode stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/information REQUEST commands present
  - routable     # inferred: INPUT SW CHANGE command present
  - levelable    # inferred: VOLUME ADJUST / PICTURE ADJUST present
```

## Actions
```yaml
# Frame legend (from source §2.1-2.2):
#   Command:  <HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>   (some simple commands are fixed 6-byte frames w/o ID/CKS)
#   ID1 = control ID set on projector; ID2 = model code
#   CKS = checksum: sum all preceding bytes, take low-order 8 bits
#   Success response header begins 2xh; error response header begins Axh and carries ERR1/ERR2
#   Parameter bytes shown as <DATAxx> are variable; copy verbatim template, fill variable part.

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
    notes: While turning off (incl. cooling time), no other command accepted.

  - id: input_sw_change
    label: Input SW Change (018)
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: Input terminal byte (e.g. 06h = video port). Full list in Appendix "Supplementary Information by Command".
    notes: Example to video port -> 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01 FFh = ended with error (no switch made).

  - id: picture_mute_on
    label: Picture Mute On (020)
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Turned off by input/video signal switch.

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
    notes: Turned off by input/video signal switch or volume adjustment.

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
    notes: Turned off by input/video signal switch.

  - id: onscreen_mute_off
    label: Onscreen Mute Off (025)
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust (030-1)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: Example brightness=10 -> 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Response DATA01-02 = 0000h success.

  - id: volume_adjust
    label: Volume Adjust (030-2)
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: Example volume=10 -> 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h.

  - id: aspect_adjust
    label: Aspect Adjust (030-12)
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: Value set for the aspect (see Appendix "Supplementary Information by Command").

  - id: other_adjust
    label: Other Adjust / Lamp-Light Adjust (030-15)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment target (high byte): 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: integer
        description: "Adjustment target (low byte): FFh (per source)"
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: Information Request (037)
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals.

  - id: filter_usage_information_request
    label: Filter Usage Information Request (037-3)
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: DATA01-04 filter usage time (s); DATA05-08 filter alarm start time (s). -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3 (037-4)
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: integer
        description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"
    notes: Example lamp1 usage -> 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if replacement deadline exceeded.

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request (037-6)
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code (050)
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: Key code low byte (see key code list in source §3.19).
      - name: data02
        type: integer
        description: Key code high byte (WORD type; typically 00h).
    notes: "Key code list (DATA01/DATA02): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Example AUTO -> 02h 0Fh 00h 00h 02h 05h 00h 18h."

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
      - name: data01
        type: integer
        description: "Lens target: 06h = Periphery Focus"
      - name: data02
        type: integer
        description: "Content: 00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +continuous, 81h drive -continuous, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s"
    notes: Send 00h after 7Fh/81h to stop. Lens can be re-controlled without stop while driving.

  - id: lens_control_request
    label: Lens Control Request (053-1)
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: Lens target byte (e.g. 06h Periphery Focus).
    notes: Returns adjustment range upper/lower limits and current value.

  - id: lens_control_2
    label: Lens Control 2 (053-2)
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "FFh = Stop (mode/value ignored)"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: Lens Memory Control (053-3)
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control (053-4)
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls profile number set via 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: Lens Memory Option Request (053-5)
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set (053-6)
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request (053-7)
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns DATA01 bitfield (Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift H, Bit4 Lens Shift V; 0=Stop,1=During operation).

  - id: lens_profile_set
    label: Lens Profile Set (053-10)
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
      - name: data01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: Example brightness -> 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, range limits, default, current, wide/narrow widths.

  - id: setting_request
    label: Setting Request (078-1)
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type (DATA01-03), sound function (DATA04), profile function (DATA05).

  - id: running_status_request
    label: Running Status Request (078-2)
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: DATA03 power status, DATA04 cooling, DATA05 power on/off process, DATA06 operation status.

  - id: input_status_request
    label: Input Status Request (078-3)
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Returns signal switch process, signal list number, selection signal type 1/2, test pattern, content displayed.

  - id: mute_status_request
    label: Mute Status Request (078-4)
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display.

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
    notes: DATA01 00h=Normal (cover opened), 01h=Cover closed.

  - id: freeze_control
    label: Freeze Control (079)
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request (084)
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode Request (097-8)
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

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
    label: PIP / Picture-by-Picture Request (097-198)
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      - name: data01
        type: integer
        description: Value set for eco mode (see Appendix "Supplementary Information by Command").

  - id: lan_projector_name_set
    label: LAN Projector Name Set (098-45)
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: Projector name (DATA01-16, up to 16 bytes, NUL terminated).

  - id: pip_picture_by_picture_set
    label: PIP / Picture-by-Picture Set (098-198)
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: integer
        description: Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input values per Appendix).

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set (098-243-1)
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request (305-1)
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

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
    notes: Returns operation status, content displayed, signal types, display signal type, video/sound/onscreen mute, freeze status.

  - id: audio_select_set
    label: Audio Select Set (319-10)
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: Input terminal (see Appendix "Supplementary Information by Command").
      - name: data02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitfield
    description: Error Status Request (009) response. DATA01-12 bitfield; bit=0 normal, bit=1 error. Covers cover/fan/temperature/power/lamp/ formatter/mirror-cover/interlock/system errors (see source §3.1 list).
  - id: command_result
    type: enum
    values: [success, error]
    description: Every command returns a response; success headers begin 2xh, error headers begin Axh with ERR1/ERR2 codes.
  - id: error_code
    type: table
    description: "ERR1/ERR2 combinations per source §2.4 (e.g. 00h/00h unrecognized, 00h/01h not supported, 01h/00h invalid value, 01h/01h invalid input terminal, 02h/0Dh power off, 02h/0Eh execution failed, 02h/0Fh no authority)."
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: Sound volume (VOLUME ADJUST 030-2; query via 060-1 data01=05h).
  - id: brightness
    type: integer
    description: Picture brightness (PICTURE ADJUST 030-1 data01=00h; query via 060-1 data01=00h).
  - id: contrast
    type: integer
    description: Picture contrast (030-1 data01=01h; query 060-1 data01=01h).
  - id: color
    type: integer
    description: Picture color (030-1 data01=02h; query 060-1 data01=02h).
  - id: hue
    type: integer
    description: Picture hue (030-1 data01=03h; query 060-1 data01=03h).
  - id: sharpness
    type: integer
    description: Picture sharpness (030-1 data01=04h; query 060-1 data01=04h).
  - id: lamp_light_adjust
    type: integer
    description: Lamp/Light adjust (030-15 data01=96h; query 060-1 data01=96h).
  - id: aspect
    type: integer
    description: Aspect value (030-12; values per Appendix).
  - id: eco_mode
    type: integer
    description: Eco/Light/Lamp mode (098-8 set / 097-8 request; values per Appendix).
  - id: lan_projector_name
    type: string
    description: Projector name over LAN (098-45 set / 097-45 request, up to 16 bytes).
  - id: edge_blending
    type: enum
    values: [off, on]
    description: Edge blending mode (098-243-1 set / 097-243-1 request).
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications; all responses are command-driven.
events: []
```

## Macros
```yaml
# UNRESOLVED: source does not document explicit multi-step sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: While power-on is in progress, no other command is accepted.
  - command: power_off
    note: While power-off (including cooling time) is in progress, no other command is accepted.
# UNRESOLVED: no explicit safety interlock procedure or power-on sequencing beyond the command-acceptance notes above.
```

## Notes
- All commands are binary hex frames. ID1 = control ID configured on the projector; ID2 = model code (varies by model). CKS checksum = low-order byte of the sum of all preceding bytes (source §2.2 worked example: 20h+81h+01h+60h+01h+00h = 103h -> CKS = 03h).
- Simple commands (e.g. POWER ON `02h 00h 00h 00h 00h 02h`) are fixed 6-byte frames without ID/CKS; parameterized commands include `<DATAxx>` and `<CKS>` placeholders to fill at runtime.
- Serial: RS-232C cross cable to PC CONTROL (D-SUB 9P). Supported baud 115200/38400/19200/9600/4800, 8 data bits, no parity, 1 stop bit, full duplex.
- LAN: wired RJ-45 (10/100 auto) or optional wireless LAN unit; TCP port 7142 for command send/receive.
- Success responses share the command's high nibble shifted to `2xh`; errors return `Axh` with ERR1/ERR2 per the §2.4 table.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not in provided source — exact input terminal bytes, aspect enum values, eco-mode values, base model type codes, and sub-input values unspecified. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: ID2 model code value for FE015I2 not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:27:37.393Z
last_checked_at: 2026-06-18T08:06:07.356Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:06:07.356Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic projector command reference; exact model-specific support of each command not confirmed against the FE015I2 unit. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base model types) is not included in the provided text."
- "flow control not stated; full-duplex communication mode stated"
- "source does not document unsolicited notifications; all responses are command-driven."
- "source does not document explicit multi-step sequences."
- "no explicit safety interlock procedure or power-on sequencing beyond the command-acceptance notes above."
- "Appendix \"Supplementary Information by Command\" not in provided source — exact input terminal bytes, aspect enum values, eco-mode values, base model type codes, and sub-input values unspecified."
- "firmware version compatibility not stated."
- "flow_control not stated in source."
- "ID2 model code value for FE015I2 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
