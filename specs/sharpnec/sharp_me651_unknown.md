---
spec_id: admin/sharp-nec-me651
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Me651 Control Spec"
manufacturer: Sharp/NEC
model_family: Me651
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Me651
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:09:56.793Z
last_checked_at: 2026-06-18T08:32:14.911Z
generated_at: 2026-06-18T08:32:14.911Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic \"Projector Control Command Reference Manual\" (BDT140013) and does not state the model name Me651; model mapping assumed by operator. Model code (ID2) value for this model not stated in source."
  - "default baud not stated; source lists supported set 115200/38400/19200/9600/4800 bps"
  - "flow control not stated (RTS/CTS pins present on connector)"
  - "source does not document any unsolicited (push) notifications."
  - "source does not describe any multi-step command sequences."
  - "no formal power-on sequencing procedure or safety interlock procedure is documented."
  - "default baud rate not stated (5 options listed)."
  - "serial flow control not stated (RTS/CTS pins wired on D-SUB 9P)."
  - "model code (ID2) value for Me651 not stated in source."
  - "default control ID (ID1) not stated."
  - "firmware version compatibility not stated."
  - "input terminal / aspect / eco-mode / sub-input enum value tables referenced but not included in this source excerpt."
  - "source document is a generic NEC projector command reference (BDT140013 Rev 7.1); it does not name Me651 explicitly — model association provided by operator."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:32:14.911Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Me651 Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C serial and TCP/IP (wired/wireless LAN) control. Uses a binary framed command protocol with checksummed hex payloads (BDT140013 Rev 7.1). Covers power, input switching, mute, picture/volume/lens adjustment, status queries, and lens memory control.

<!-- UNRESOLVED: source is a generic "Projector Control Command Reference Manual" (BDT140013) and does not state the model name Me651; model mapping assumed by operator. Model code (ID2) value for this model not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: default baud not stated; source lists supported set 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (RTS/CTS pins present on connector)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON / POWER OFF commands present
  - routable    # inferred: INPUT SW CHANGE command present
  - queryable   # inferred: many status/information request commands present
  - levelable   # inferred: PICTURE ADJUST / VOLUME ADJUST commands present
```

## Actions
```yaml
# Protocol framing: each command is a hex byte sequence. Framing bytes
# (first byte = message-type/op marker), ID1 (control ID), ID2 (model code),
# and CKS (checksum = low byte of sum of all preceding bytes) are part of the
# wire format. ID1/ID2 are runtime-substituted; CKS is computed. Payloads below
# are copied verbatim from the source.
# Model code ID2: UNRESOLVED (varies by model; not stated for Me651).

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

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h = video port); see Appendix "Supplementary Information by Command". Exact values UNRESOLVED - referenced but not listed in this excerpt.

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
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
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect; see Appendix "Supplementary Information by Command". Exact values UNRESOLVED - referenced but not listed in this excerpt.

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST when DATA02=FFh)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
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
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Source key codes include: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

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
    - name: DATA01
      type: integer
      description: "Lens axis: 06h=Periphery Focus (other axis values referenced via Appendix)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens axis selector (same values as 053 DATA01)

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens axis (FFh = Stop; if Stop, DATA02-04 not referenced)"
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
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (applies to profile set via 053-10)"

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
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
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

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

- id: pip_pbp_request
  label: PIP/Picture By Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
    - name: DATA01
      type: integer
      description: Value set for the eco mode; see Appendix "Supplementary Information by Command". Exact values UNRESOLVED - referenced but not listed in this excerpt.

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      description: Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated

- id: pip_pbp_set
  label: PIP/Picture By Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (interpretation depends on DATA01): MODE 00h=PIP/01h=PbP; START POSITION 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; sub-input values per Appendix"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
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

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value; see Appendix "Supplementary Information by Command". Exact values UNRESOLVED - referenced but not listed in this excerpt.
    - name: DATA02
      type: integer
      description: "Setting value: 00h=audio from terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: 12-byte error information (DATA01-DATA12) returned by 009 ERROR STATUS REQUEST; bits encode cover/fan/temp/power/lamp/formatter/mirror-cover/interlock errors. See source "Error information list" for full bit map.

- id: running_status
  type: object
  description: 16-byte running status (DATA01-DATA16) returned by 078-2. DATA03 power status (00h=Standby, 01h=Power on, FFh=Not supported); DATA04 cooling process; DATA05 power on/off process; DATA06 operation status (00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby).

- id: input_status
  type: object
  description: 16-byte input signal status (DATA01-DATA16) returned by 078-3, covering signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, and content displayed.

- id: mute_status
  type: object
  description: 16-byte mute status (DATA01-DATA16) returned by 078-4. DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (each 00h=Off, 01h=On).

- id: cover_status
  type: enum
  values: [normal_cover_open, cover_closed]
  description: Returned by 078-6. DATA01 00h=Normal (cover opened), 01h=Cover closed.

- id: lens_information
  type: bitmask
  description: Byte returned by 053-7 indicating lens operation state per axis (Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V; 0=Stop, 1=During operation).

- id: basic_information
  type: object
  description: 15-byte status (DATA01-DATA15) returned by 305-3 covering operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, and freeze status.
```

## Variables
```yaml
# Discrete settable parameters (already modeled as parameterized Actions above):
# - picture brightness/contrast/color/hue/sharpness  (030-1)
# - volume                                          (030-2)
# - aspect                                          (030-12)
# - lamp/light adjust                               (030-15)
# - eco mode                                        (098-8)
# - edge blending on/off                            (098-243-1)
# - freeze on/off                                   (079)
# - lens position per axis                          (053, 053-2)
# No additional scalar variables beyond the actions enumerated.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited (push) notifications.
# Protocol appears strictly request/response (ack/error frames only).
```

## Macros
```yaml
# UNRESOLVED: source does not describe any multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes (informational, not formal interlocks):
#   - While POWER ON is executing, no other command can be accepted.
#   - While POWER OFF is executing (including cooling time), no other command can be accepted.
#   - Error 02h 0Dh: "The command cannot be accepted because the power is off."
#   - Error 02h 0Fh: "There is no authority necessary for the operation."
#   - DATA09 Bit1 of error status: "The interlock switch is open."
# UNRESOLVED: no formal power-on sequencing procedure or safety interlock procedure is documented.
```

## Notes
- **Framing:** Commands use a fixed-format hex frame. The leading byte encodes message class (00h/01h/02h/03h are requests; 20h/21h/22h/23h are success responses; A0h/A1h/A2h/A3h are error responses). `<ID1>` = projector control ID; `<ID2>` = model code; `<CKS>` = checksum (low byte of the sum of all preceding bytes).
- **Checksum example (from source):** `20h + 81h + 01h + 60h + 01h + 00h = 103h → CKS = 03h`.
- **Power behavior:** POWER ON/OFF block all other commands during execution (incl. cooling). Implementers should poll 078-2 RUNNING STATUS REQUEST to determine readiness.
- **Default ID1/ID2:** Not stated in this excerpt; typically set per-projector.
- **Appendix references:** Several commands (018 INPUT SW CHANGE, 030-12 ASPECT ADJUST, 097-8 ECO MODE REQUEST, 098-8 ECO MODE SET, 098-198/097-198 sub-input values, 319-10 input terminal) defer value tables to an "Appendix: Supplementary Information by Command" that is not present in this refined source. Those enum tables are therefore UNRESOLVED.

<!-- UNRESOLVED: default baud rate not stated (5 options listed). -->
<!-- UNRESOLVED: serial flow control not stated (RTS/CTS pins wired on D-SUB 9P). -->
<!-- UNRESOLVED: model code (ID2) value for Me651 not stated in source. -->
<!-- UNRESOLVED: default control ID (ID1) not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: input terminal / aspect / eco-mode / sub-input enum value tables referenced but not included in this source excerpt. -->
<!-- UNRESOLVED: source document is a generic NEC projector command reference (BDT140013 Rev 7.1); it does not name Me651 explicitly — model association provided by operator. -->
```

Spec output above. 53 actions, all hex payloads verbatim. Source is generic NEC BDT140013 manual — does not name Me651 explicitly; flagged UNRESOLVED. Default baud/flow control/model-code/appendix enum tables all marked unresolved per policy.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:09:56.793Z
last_checked_at: 2026-06-18T08:32:14.911Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:32:14.911Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic \"Projector Control Command Reference Manual\" (BDT140013) and does not state the model name Me651; model mapping assumed by operator. Model code (ID2) value for this model not stated in source."
- "default baud not stated; source lists supported set 115200/38400/19200/9600/4800 bps"
- "flow control not stated (RTS/CTS pins present on connector)"
- "source does not document any unsolicited (push) notifications."
- "source does not describe any multi-step command sequences."
- "no formal power-on sequencing procedure or safety interlock procedure is documented."
- "default baud rate not stated (5 options listed)."
- "serial flow control not stated (RTS/CTS pins wired on D-SUB 9P)."
- "model code (ID2) value for Me651 not stated in source."
- "default control ID (ID1) not stated."
- "firmware version compatibility not stated."
- "input terminal / aspect / eco-mode / sub-input enum value tables referenced but not included in this source excerpt."
- "source document is a generic NEC projector command reference (BDT140013 Rev 7.1); it does not name Me651 explicitly — model association provided by operator."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
