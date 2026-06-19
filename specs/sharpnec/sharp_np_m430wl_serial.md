---
spec_id: admin/sharp-nec-np-m430wl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP M430WL Control Spec"
manufacturer: Sharp/NEC
model_family: "NP M430WL"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP M430WL"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:37:48.654Z
last_checked_at: 2026-06-18T08:36:03.160Z
generated_at: 2026-06-18T08:36:03.160Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact NP M430WL model code (ID2) value not stated in this command reference"
  - "input terminal DATA01 value map referenced to an appendix not present in refined source"
  - "not listed in communication conditions table; RTS/CTS pins present in PC CONTROL pinout (pins 7/8 cross-wired), full-duplex mode stated"
  - "no async/event mechanism stated in source."
  - "no multi-step command sequences explicitly described in source."
  - "no explicit power-on sequencing or hardware interlock voltages stated."
  - "exact model code (ID2) for NP M430WL not stated in this command reference"
  - "serial flow_control setting not listed in communication conditions table (RTS/CTS pins present in pinout)"
  - "input terminal / aspect / eco mode / base model type enum maps referenced to absent appendix"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:36:03.160Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP M430WL Control Spec

## Summary
Sharp/NEC NP M430WL projector control spec covering the binary frame protocol documented in the Projector Control Command Reference (BDT140013 Rev 7.1). The device supports RS-232C serial control and wired/wireless LAN control using TCP port 7142. Commands are variable-length hex frames terminated with a checksum byte; responses echo with a success (2xh) or error (Axh) lead byte.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact NP M430WL model code (ID2) value not stated in this command reference -->
<!-- UNRESOLVED: input terminal DATA01 value map referenced to an appendix not present in refined source -->

## Transport
```yaml
# Source documents BOTH RS-232C serial and LAN (TCP). Both populated.
# User known_protocol: RS-232C; source explicitly adds TCP port 7142.
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all stated as supported; host selects one
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not listed in communication conditions table; RTS/CTS pins present in PC CONTROL pinout (pins 7/8 cross-wired), full-duplex mode stated
addressing:
  port: 7142  # TCP port for LAN command send/receive
auth:
  type: none  # inferred: no login/auth procedure described in source
```

## Traits
```yaml
# Inferred from documented command set:
- powerable  # inferred: POWER ON / POWER OFF commands present
- queryable  # inferred: extensive status/information request commands present
- levelable  # inferred: PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST gain commands present
- routable   # inferred: INPUT SW CHANGE input switching command present
```

## Actions
```yaml
# All frames are host→projector command bytes verbatim from source. Last byte of a
# fixed frame is the precomputed checksum (CKS). For parameterized frames the variable
# DATA byte(s) are shown as placeholders and CKS must be recomputed per the checksum
# rule (sum all preceding bytes, take low-order 8 bits). ID1=control ID set on
# projector; ID2=model code (both appear only in response frames).

- id: error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: 015. POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: 016. POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h = video port). Full map in appendix "Supplementary Information by Command" not present in refined source.
  notes: Example from source switches to video port -> "02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on
  label: 020. PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: 021. PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022. SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: 023. SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024. ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: 025. ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1. PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits
  notes: Example setting brightness to 10 -> "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA03
      type: integer
      description: Adjustment value high-order 8 bits
  notes: Example setting volume to 10 -> "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value; map in appendix "Supplementary Information by Command" not present in refined source.

- id: other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA05
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: Example (lamp 1 usage time) -> "03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_information_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list."
    - name: DATA02
      type: integer
      description: "Key code high byte. See key code list."
  notes: "Key code list (DATA01/DATA02 -> name): 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"

- id: shutter_close
  label: 051. SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052. SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053. LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (06h = Periphery Focus; other values referenced in appendix)"
    - name: DATA02
      type: integer
      description: "Content/drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target to query

- id: lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
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
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: Example (brightness) -> "03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: 078-3. INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: 078-4. MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: 078-5. MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: 078-6. COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: 079. FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: 084. INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: 097-8. ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: 097-45. LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value; map in appendix "Supplementary Information by Command" not present in refined source.

- id: lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: projector_name
      type: string
      description: Projector name, up to 16 bytes (DATA01..DATA16), NUL-terminated via trailing 00h.

- id: pip_picture_by_picture_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value. For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values in appendix."

- id: edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: 305-1. BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: 305-2. SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: 305-3. BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: 319-10. AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal; map in appendix not present in refined source.
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response framing: success responses use lead byte 2xh (matching command group);
# error responses use lead byte Axh with ERR1/ERR2/CKS. Response frames include
# ID1 (control ID) and ID2 (model code) set on the projector.
- id: command_result
  type: enum
  values: [success, error]
  description: >-
    Success response lead byte 2xh echoes the command group with a data part on
    data-requesting commands and no data part otherwise. Error response lead byte
    Axh carries ERR1/ERR2 cause codes.

- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]
  description: From RUNNING STATUS REQUEST (078-2) DATA03/DATA06. 00h=Standby, 01h=Power on, etc.

- id: error_status
  type: bitmask
  description: >-
    From ERROR STATUS REQUEST (009) DATA01-DATA12. Bit=0 normal, Bit=1 error. Covers
    cover/fan/temperature/power/lamp errors and extended system status (DATA09).
  values: []  # bit map documented in source (DATA01..DATA12); see Notes

- id: mute_status
  type: object
  description: From MUTE STATUS REQUEST (078-4). Picture/Sound/Onscreen/Forced-onscreen mute + OSD display flags.

- id: input_status
  type: object
  description: From INPUT STATUS REQUEST (078-3). Signal switch process, signal list number, selection signal type 1/2, content displayed.

- id: lamp_information
  type: object
  description: From LAMP INFORMATION REQUEST 3 (037-4). Lamp usage time (s) or remaining life (%); negative remaining life if replacement deadline exceeded.

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  description: From COVER STATUS REQUEST (078-6). 00h=Normal (cover opened), 01h=Cover closed.

# Error code map (ERR1/ERR2) returned in Axh error responses:
# 00h/00h=command not recognized; 00h/01h=not supported by model;
# 01h/00h=invalid value; 01h/01h=invalid input terminal; 01h/02h=invalid language;
# 02h/00h=memory allocation error; 02h/02h=memory in use; 02h/03h=value cannot be set;
# 02h/04h=forced onscreen mute on; 02h/06h=viewer error; 02h/07h=no signal;
# 02h/08h=test pattern/filter displayed; 02h/09h=no PC card; 02h/0Ah=memory op error;
# 02h/0Ch=entry list displayed; 02h/0Dh=power off (command not accepted);
# 02h/0Eh=execution failed; 02h/0Fh=no authority;
# 03h/00h=incorrect gain number; 03h/01h=invalid gain; 03h/02h=adjustment failed.
```

## Variables
```yaml
# Settable parameters exposed as adjustment targets (absolute or relative):
- id: brightness
  description: PICTURE ADJUST target 00h; absolute/relative via DATA02
  unit: int16
- id: contrast
  description: PICTURE ADJUST target 01h
  unit: int16
- id: color
  description: PICTURE ADJUST target 02h
  unit: int16
- id: hue
  description: PICTURE ADJUST target 03h
  unit: int16
- id: sharpness
  description: PICTURE ADJUST target 04h
  unit: int16
- id: volume
  description: VOLUME ADJUST (030-2)
  unit: int16
- id: lamp_light_adjust
  description: OTHER ADJUST (030-15) target 96h/FFh
  unit: int16
```

## Events
```yaml
# No unsolicited notification protocol described in source. All responses are
# solicited (returned after a command). 
# UNRESOLVED: no async/event mechanism stated in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While POWER ON is executing, no other command can be accepted."
  - command: power_off
    note: "While POWER OFF is executing (including cooling time), no other command can be accepted."
  - command: any
    note: "Error 02h/0Dh returned when a command cannot be accepted because the power is off."
# UNRESOLVED: no explicit power-on sequencing or hardware interlock voltages stated.
```

## Notes
- Checksum rule: sum all bytes preceding CKS, take the low-order 8 bits. Example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- Frame lead bytes indicate command group and direction: `0xh`/`1xh`/`2xh`/`3xh` are request/success-response groups; `Axh` lead bytes (A0h–A3h) denote error responses carrying ERR1/ERR2.
- ID1 = control ID configured on the projector; ID2 = model code (varies by model). Both appear in response frames only, not in the host-sent command frames.
- Usage-time fields (lamp/filter) are obtainable in one-second units but updated at one-minute intervals.
- For LAMP INFORMATION REQUEST 3, if the lamp replacement deadline is exceeded, remaining life (%) is returned as a negative value.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port (RxD/TxD/GND/RTS/CTS cross-connected).
- Input terminal DATA01 value map, aspect value map, eco mode value map, and base model type value map are referenced to an appendix ("Supplementary Information by Command") that is not present in this refined source.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model code (ID2) for NP M430WL not stated in this command reference -->
<!-- UNRESOLVED: serial flow_control setting not listed in communication conditions table (RTS/CTS pins present in pinout) -->
<!-- UNRESOLVED: input terminal / aspect / eco mode / base model type enum maps referenced to absent appendix -->
````

Spec done. 53 actions, all verbatim hex. Both serial+TCP populated (port 7142 stated). Flow_control + appendix enum maps marked UNRESOLVED. Drafts.jsonl path next if want ingest.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:37:48.654Z
last_checked_at: 2026-06-18T08:36:03.160Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:36:03.160Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact NP M430WL model code (ID2) value not stated in this command reference"
- "input terminal DATA01 value map referenced to an appendix not present in refined source"
- "not listed in communication conditions table; RTS/CTS pins present in PC CONTROL pinout (pins 7/8 cross-wired), full-duplex mode stated"
- "no async/event mechanism stated in source."
- "no multi-step command sequences explicitly described in source."
- "no explicit power-on sequencing or hardware interlock voltages stated."
- "exact model code (ID2) for NP M430WL not stated in this command reference"
- "serial flow_control setting not listed in communication conditions table (RTS/CTS pins present in pinout)"
- "input terminal / aspect / eco mode / base model type enum maps referenced to absent appendix"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
