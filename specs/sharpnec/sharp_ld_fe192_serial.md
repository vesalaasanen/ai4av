---
spec_id: admin/sharp-nec-ld-fe192
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe192 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe192"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe192"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:53:45.947Z
last_checked_at: 2026-06-17T20:07:12.981Z
generated_at: 2026-06-17T20:07:12.981Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source defines adjustment ranges dynamically via GAIN PARAMETER REQUEST 3"
  - "source describes no unsolicited notifications. All responses are"
  - "source documents no explicit multi-step sequences."
  - "no power-on sequencing voltage/current spec in source."
  - "firmware version compatibility not stated in source"
  - "Appendix value tables (input terminal / aspect / eco mode / base model type) not in refined source"
  - "ID2 model code value not stated for Ld Fe192 specifically"
verification:
  verdict: verified
  checked_at: 2026-06-17T20:07:12.981Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched literally against source; 7142 TCP port and 115200 serial baud verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe192 Control Spec

## Summary
Projector control spec for the Sharp/NEC Ld Fe192. Supports RS-232C serial and wired/wireless LAN (TCP) control via a binary protocol using hex bytes with checksum. Covers power, input switching, mute, picture/volume/lamp adjustment, lens control and memory, status queries, and network settings.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex  # source: "Communication mode: Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status request commands present
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST / LAMP ADJUST present
  - routable     # inferred: INPUT SW CHANGE present
```

## Actions
```yaml
# All command bytes verbatim from source. ID1=control ID, ID2=model code,
# CKS=checksum (low byte of sum of all preceding bytes). See Notes for checksum rule.
actions:
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
        description: "Input terminal value (e.g. 06h=video port). See Appendix 'Supplementary Information by Command'."

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
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
      - name: DATA02
        type: integer
        description: "Adjustment mode (00h=absolute, 01h=relative)"
      - name: DATA03
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA04
        type: integer
        description: Adjustment value high-order 8 bits

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode (00h=absolute, 01h=relative)"
      - name: DATA02
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA03
        type: integer
        description: Adjustment value high-order 8 bits

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Value set for aspect. See Appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA03
        type: integer
        description: "Adjustment mode (00h=absolute, 01h=relative)"
      - name: DATA04
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA05
        type: integer
        description: Adjustment value high-order 8 bits

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD type). E.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: integer
        description: "Key code high byte (typically 00h)"

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
        description: "Lens target (06h=Periphery Focus)"
      - name: DATA02
        type: integer
        description: "Content (00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus continuous, 81h=drive minus continuous, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus)"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target (FFh=Stop)"
      - name: DATA02
        type: integer
        description: "Adjustment mode (00h=absolute, 02h=relative)"
      - name: DATA03
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA04
        type: integer
        description: Adjustment value high-order 8 bits

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"
      - name: DATA02
        type: integer
        description: "Setting value (00h=OFF, 01h=ON)"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number (00h=Profile 1, 01h=Profile 2)"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Value set for eco mode. See Appendix 'Supplementary Information by Command'."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: projector_name
        type: string
        description: "Projector name (DATA01-DATA16, up to 16 bytes, NUL-terminated)"

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"
      - name: DATA02
        type: integer
        description: "Setting value. For MODE: 00h=PIP, 01h=PBP. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: see Appendix."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Setting value (00h=OFF, 01h=ON)"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal. See Appendix 'Supplementary Information by Command'."
      - name: DATA02
        type: integer
        description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"

  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

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
        description: "Lamp (00h=Lamp 1, 01h=Lamp 2 - only two-lamp models)"
      - name: DATA02
        type: integer
        description: "Content (01h=usage time seconds, 04h=remaining life %)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Scope (00h=Total Carbon Savings, 01h=Carbon Savings during operation)"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target (see LENS CONTROL DATA01 values)

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

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
        description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)"

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

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"

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
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

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
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
    source: "RUNNING STATUS REQUEST DATA03 / BASIC INFORMATION REQUEST DATA01"
  - id: picture_mute_state
    type: enum
    values: [on, off]
    source: "MUTE STATUS REQUEST DATA01"
  - id: sound_mute_state
    type: enum
    values: [on, off]
    source: "MUTE STATUS REQUEST DATA02"
  - id: onscreen_mute_state
    type: enum
    values: [on, off]
    source: "MUTE STATUS REQUEST DATA03"
  - id: freeze_state
    type: enum
    values: [on, off]
    source: "BASIC INFORMATION REQUEST DATA09"
  - id: cover_state
    type: enum
    values: [opened, closed]
    source: "COVER STATUS REQUEST DATA01"
  - id: lens_operation_state
    type: bitmask
    description: "DATA01 bitmap: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=stop, 1=operation)"
    source: "LENS INFORMATION REQUEST"
  - id: error_status
    type: bitmask
    description: "DATA01-DATA04 + DATA09 extended status. Covers cover/fan/temp/power/lamp/formatter/mirror/foreign-matter/ballast/iris/lens errors and interlock-switch-open."
    source: "ERROR STATUS REQUEST"
  - id: command_ack
    type: enum
    values: [success, error]
    description: "Response prefix 2Xh=success, AXh=error (carries ERR1/ERR2)"
```

## Variables
```yaml
# UNRESOLVED: source defines adjustment ranges dynamically via GAIN PARAMETER REQUEST 3
# (upper/lower/default/current/wide/narrow widths per gain). No static variable table
# in source. See gain_parameter_request_3 query.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are
# command/response (synchronous).
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while turning on, no other command accepted (source 3.2)"
  - "POWER OFF: while turning off (incl. cooling time), no other command accepted (source 3.3)"
  - "DATA09 Bit1 of ERROR STATUS: interlock switch open error (source 3.1)"
# UNRESOLVED: no power-on sequencing voltage/current spec in source.
```

## Notes
- Binary protocol. Command frames start with leading byte indicating command class (00h/01h/02h/03h); responses echo with high bit set on first byte (20h/21h/22h/23h = success, A0h/A1h/A2h/A3h = error).
- **Checksum (CKS):** sum all preceding bytes, take low-order one byte (8 bits). Example: `20h+81h+01h+60h+01h+00h = 103h` → CKS=`03h`.
- **Parameters:** ID1 = projector control ID; ID2 = model code (varies by model); DATA?? = variable-length data; LEN = data length following LEN byte.
- **Error responses:** carry ERR1/ERR2 pair. See source §2.4 for full error code list (00h/00h=unrecognized, 00h/01h=unsupported model, 01h/00h=invalid value, 02h/0Dh=power off, etc.).
- Serial baud is selectable: 115200 / 38400 / 19200 / 9600 / 4800 bps. Spec lists highest as default representative; device must be configured to match.
- TCP port 7142 for both send and receive (source §1.2).
- Many input-terminal, aspect, eco-mode, and base-model-type value tables live in an external "Appendix: Supplementary Information by Command" not included in this refined source — those enum values are UNRESOLVED.
- LAMP INFORMATION remaining life returns negative % if replacement deadline exceeded.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Appendix value tables (input terminal / aspect / eco mode / base model type) not in refined source -->
<!-- UNRESOLVED: ID2 model code value not stated for Ld Fe192 specifically -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:53:45.947Z
last_checked_at: 2026-06-17T20:07:12.981Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:07:12.981Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched literally against source; 7142 TCP port and 115200 serial baud verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source defines adjustment ranges dynamically via GAIN PARAMETER REQUEST 3"
- "source describes no unsolicited notifications. All responses are"
- "source documents no explicit multi-step sequences."
- "no power-on sequencing voltage/current spec in source."
- "firmware version compatibility not stated in source"
- "Appendix value tables (input terminal / aspect / eco mode / base model type) not in refined source"
- "ID2 model code value not stated for Ld Fe192 specifically"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
