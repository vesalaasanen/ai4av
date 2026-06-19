---
spec_id: admin/sharp-nec-np-p554u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-P554U Control Spec"
manufacturer: Sharp/NEC
model_family: NP-P554U
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-P554U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:38:19.556Z
last_checked_at: 2026-06-18T08:49:00.817Z
generated_at: 2026-06-18T08:49:00.817Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for NP-P554U not stated in source"
  - "flow_control not stated in source"
  - "wireless LAN comm conditions not in this document"
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model type values, sub input values, eco mode values) not included in source text"
  - "full response payload decoding for queries not exhaustively enumerated."
  - "no separate variable model defined; settable state is action-driven per source."
  - "no async/event mechanism described in source."
  - "none documented."
  - "no dedicated safety/interlock section in source."
  - "ID2 model code value for NP-P554U not in source"
  - "flow_control setting not stated"
  - "Appendix \"Supplementary Information by Command\" (input terminal / aspect / base model type / sub input / eco mode value tables) not present in refined source"
  - "firmware version compatibility range not stated"
  - "wireless LAN comm conditions reference external operation manual"
  - "model code (ID2), flow_control, appendix value tables, firmware range."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:49:00.817Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-P554U Control Spec

## Summary
Sharp/NEC NP-P554U projector. Binary control protocol over RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP port 7142). Hex command frames with checksum. Covers power, input switching, mutes, lens/shutter, picture/volume adjust, status queries, and LAN/PIP/eco settings per the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for NP-P554U not stated in source -->
<!-- UNRESOLVED: flow_control not stated in source -->
<!-- UNRESOLVED: wireless LAN comm conditions not in this document -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, base model type values, sub input values, eco mode values) not included in source text -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 bps configurable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow_control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - routable     # inferred: INPUT SW CHANGE command present
  - queryable    # inferred: extensive status query commands present
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST present
```

## Actions
```yaml
# All command frames use hex bytes verbatim from source. ID1 = control ID set on
# projector (00h when unspecified), ID2 = model code (varies by model, 00h placeholder),
# CKS = checksum computed as low byte of sum of all preceding bytes.
# Command frame format: <DATA?>_<CKS> where CKS = low-order byte of sum of all preceding bytes.

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
  notes: During power-off (incl. cooling time), no other command accepted.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: Input terminal value (e.g. 06h = video port). See Appendix in source.
  notes: Response DATA01 FFh = ended with error (no signal switch made).

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off by input terminal switch or video signal switch.

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
  notes: Turned off by input terminal switch, video signal switch, or volume adjustment.

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
  notes: Turned off by input terminal switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: string
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: string
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: Value set for the aspect (see Appendix in source).

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target (DATA01=96h, DATA02=FFh for LAMP/LIGHT ADJUST)"
    - name: DATA02
      type: string
      description: Sub-target (FFh for LAMP/LIGHT ADJUST)
    - name: DATA03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: string
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name, lamp usage time (DATA83-86), filter usage time (DATA87-90).

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time and filter alarm start time (seconds). -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: string
      description: "01h=usage time (sec), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (WORD type). E.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: string
      description: Key code high byte (00h for listed codes).

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
      type: string
      description: Lens target (06h=Periphery Focus per source row; full target list not in excerpt).
    - name: DATA02
      type: string
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: After 7Fh/81h, send 00h to stop. Same command re-issued during drive controls lens without stop.

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: Lens target (same values as lens_control DATA01).

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Target (FFh=Stop, others per source)"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: string
      description: Adjustment value (high-order 8 bits)
  notes: If DATA01=FFh (Stop), DATA02-DATA04 not referenced.

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls profile number set via LENS PROFILE SET.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitmask of lens operation status (bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V; 0=stop, 1=operating).

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
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
      type: string
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile/clock info (DATA05).

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process, operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal types, content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute status and onscreen display status.

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
  notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco/light/lamp mode value (see Appendix in source).

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
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
      type: string
      description: Value set for eco mode (see Appendix in source).

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated). Encoded across DATA01-DATA16.

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (varies by DATA01). For MODE: 00h=PIP, 01h=PbP. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=OFF, 01h=ON"

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
  notes: Returns operation status, content displayed, signal types, mute/freeze status.

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: Input terminal (see Appendix in source).
    - name: DATA02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Query responses. All responses use frame: <resp opcode> <ID1> <ID2> <LEN> <DATA?> <CKS>
# Error responses: A?h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: error_status
  type: bitmask
  description: 12-byte error info (DATA01-12). Bit=0 normal, Bit=1 error. Covers cover/fan/temp/power/lamp errors.

- id: power_state
  type: enum
  values: [standby, power_on]
  description: From running_status_request DATA03 (00h=Standby, 01h=Power on).

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: From running_status_request DATA06.

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: From information_request DATA83-86 or lamp_information_request DATA03-06.

- id: filter_usage_time
  type: integer
  unit: seconds
  description: From filter_usage_information_request DATA01-04.

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: From lamp_information_request_3 (DATA02=04h). Negative if replacement deadline exceeded.

- id: mute_status
  type: object
  description: From mute_status_request - picture/sound/onscreen/forced-onscreen mute (each Off/On).

- id: cover_status
  type: enum
  values: [normal_opened, closed]

- id: model_name
  type: string

- id: serial_number
  type: string

- id: mac_address
  type: string

- id: projector_name
  type: string

- id: eco_mode
  type: string
  description: Value per Appendix (eco/light/lamp mode).

- id: error_codes
  type: object
  description: "ERR1/ERR2 pair. 00h/00h=unrecognized, 00h/01h=unsupported by model, 01h/00h=invalid value, 01h/01h=invalid input terminal, 01h/02h=invalid language, 02h/00h=memory alloc error, 02h/02h=memory in use, 02h/03h=value cannot be set, 02h/04h=forced onscreen mute on, 02h/06h=viewer error, 02h/07h=no signal, 02h/08h=test pattern/filter displayed, 02h/09h=no PC card, 02h/0Ah=memory operation error, 02h/0Ch=entry list displayed, 02h/0Dh=power off (cmd rejected), 02h/0Eh=execution failed, 02h/0Fh=no authority, 03h/00h=incorrect gain number, 03h/01h=invalid gain, 03h/02h=adjustment failed."

# UNRESOLVED: full response payload decoding for queries not exhaustively enumerated.
```

## Variables
```yaml
# Picture adjust values (brightness/contrast/color/hue/sharpness) and volume are
# settable via dedicated action commands (picture_adjust, volume_adjust) and
# readable via gain_parameter_request_3. Treat as action-driven, not free variables.

# UNRESOLVED: no separate variable model defined; settable state is action-driven per source.
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are solicited
# (returned after a command is sent).
# UNRESOLVED: no async/event mechanism described in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes power-state interlocks (no command accepted during power-on/off
# transition or cooling), but no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond command rejection (ERR 02h/0Dh).
# UNRESOLVED: no dedicated safety/interlock section in source.
```

## Notes
- Command frame format: hex bytes. Host fills ID1 (control ID set on projector, 00h if unset) and ID2 (model code, varies by model). CKS = low-order byte of sum of all preceding bytes.
- Baud rate configurable: 115200 / 38400 / 19200 / 9600 / 4800 bps. Spec lists 115200 as the default-shown value; matching device setting required.
- Serial cable: cross cable, D-SUB 9P, PC CONTROL port. Pinout: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN: wired RJ-45 (10/100 Mbps auto) or wireless LAN unit. TCP port 7142 for command send/receive.
- Response success for no-data commands: `2?h <ID1> <ID2> 00h <CKS>`. For data commands, LEN and DATA appended.
- Usage times update at one-minute intervals despite one-second resolution.
- Lamp remaining life (%) returns negative value if replacement deadline exceeded.

<!-- UNRESOLVED: ID2 model code value for NP-P554U not in source -->
<!-- UNRESOLVED: flow_control setting not stated -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal / aspect / base model type / sub input / eco mode value tables) not present in refined source -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: wireless LAN comm conditions reference external operation manual -->
````

Spec output complete. 53 commands enumerated (sections 3.1–3.53), all hex payloads verbatim. Gaps marked UNRESOLVED: model code (ID2), flow_control, appendix value tables, firmware range.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:38:19.556Z
last_checked_at: 2026-06-18T08:49:00.817Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:49:00.817Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for NP-P554U not stated in source"
- "flow_control not stated in source"
- "wireless LAN comm conditions not in this document"
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model type values, sub input values, eco mode values) not included in source text"
- "full response payload decoding for queries not exhaustively enumerated."
- "no separate variable model defined; settable state is action-driven per source."
- "no async/event mechanism described in source."
- "none documented."
- "no dedicated safety/interlock section in source."
- "ID2 model code value for NP-P554U not in source"
- "flow_control setting not stated"
- "Appendix \"Supplementary Information by Command\" (input terminal / aspect / base model type / sub input / eco mode value tables) not present in refined source"
- "firmware version compatibility range not stated"
- "wireless LAN comm conditions reference external operation manual"
- "model code (ID2), flow_control, appendix value tables, firmware range."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
