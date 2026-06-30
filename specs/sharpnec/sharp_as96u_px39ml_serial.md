---
spec_id: admin/sharp-nec-as96u-px39ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC As96U Px39Ml Control Spec"
manufacturer: Sharp/NEC
model_family: "As96U Px39Ml"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "As96U Px39Ml"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:31:58.326Z
last_checked_at: 2026-06-23T07:49:51.818Z
generated_at: 2026-06-23T07:49:51.818Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name spelled as given in input (\"As96U Px39Ml\"); exact marketing model string not confirmed inside the refined source text. Firmware compatibility range, flow_control mode, and ID1/ID2 default values not stated."
  - "flow control mode not stated in source (RTS/CTS pins present in pinout but no flow_control value documented)"
  - "source documents no asynchronous/push event mechanism."
  - "populate from source if vendor documents macros; none found."
  - "no power-on sequencing requirements or explicit safety warnings beyond command lockouts documented in this refined source."
  - "firmware version compatibility not stated in source."
  - "serial flow_control mode not stated (RTS/CTS pins wired but no flow-control setting documented)."
  - "ID1 (control ID) and ID2 (model code) default/valid values not stated."
  - "Appendix \"Supplementary Information by Command\" not present in refined source — enum value tables for input terminal, aspect, base model type, eco mode, sub-input not captured."
  - "exact marketing model string for \"As96U Px39Ml\" not corroborated inside refined text (manual is generic projector command reference)."
verification:
  verdict: verified
  checked_at: 2026-06-23T07:49:51.818Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to BDT140013 source; transport verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC As96U Px39Ml Control Spec

## Summary
Sharp/NEC projector (As96U Px39Ml) control spec covering RS-232C serial and wired/wireless LAN (TCP) control per the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands are binary hex frames; each command/response is bracketed and uses a trailing checksum byte (CKS = low-order byte of the sum of all preceding bytes).

<!-- UNRESOLVED: model name spelled as given in input ("As96U Px39Ml"); exact marketing model string not confirmed inside the refined source text. Firmware compatibility range, flow_control mode, and ID1/ID2 default values not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable rates: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control mode not stated in source (RTS/CTS pins present in pinout but no flow_control value documented)
addressing:
  port: 7142  # TCP port for command send/receive (stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: numerous status/information request commands present
  - levelable      # inferred: VOLUME ADJUST, PICTURE ADJUST, LAMP/LIGHT ADJUST present
  - routable       # inferred: INPUT SW CHANGE (input terminal switching) present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: No other command accepted while power-on is in progress.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: No other command accepted during power-off (incl. cooling time).

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (e.g. 06h = video port). Full list in Appendix "Supplementary Information by Command".
    notes: Response DATA01 FFh = ended with error (no signal switch made).

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
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
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
        description: Aspect value. See Appendix "Supplementary Information by Command".

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target high byte: 96h (with DATA02 FFh = LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Target low byte: FFh = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
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
        description: "Lens target: 06h = Periphery Focus (other values in Appendix)"
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "FFh = Stop (when Stop, DATA02-04 not referenced); otherwise lens target"
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
    notes: Controls the profile number selected via LENS PROFILE SET (053-10).

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=Freeze ON, 02h=Freeze OFF"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Eco mode value. See Appendix "Supplementary Information by Command". Sets Light mode or Lamp mode depending on projector.

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: Projector name bytes (DATA01 - DATA16, up to 16 bytes, NUL-terminated)

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (MODE: 00h=PIP,01h=PBP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub input values per Appendix)"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value. See Appendix "Supplementary Information by Command".
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: Response DATA01-DATA12 contain bit-field error status; bit=1 indicates error.

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Response DATA01-49 projector name; DATA83-86 lamp usage time (seconds); DATA87-90 filter usage time (seconds).

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Response DATA01-04 filter usage time (seconds); DATA05-08 filter alarm start time (seconds).

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp number: 00h=Lamp 1, 01h=Lamp 2"
      - name: DATA02
        type: integer
        description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target (e.g. 06h = Periphery Focus).

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

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

  - id: lan_mac_address_request
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
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
  - id: command_ack
    type: enum
    values: [success, error]
    notes: Success response frame begins 2xh/3xh (mirror of command op with high bit set) and carries ERR1=ERR2=00h-equivalent success result; error response begins Axh and carries ERR1/ERR2 per error code list.

  - id: error_code
    type: struct
    values:
      - err1_err2: "00h 00h"
        meaning: Command cannot be recognized
      - err1_err2: "00h 01h"
        meaning: Command not supported by model
      - err1_err2: "01h 00h"
        meaning: Specified value invalid
      - err1_err2: "01h 01h"
        meaning: Specified input terminal invalid
      - err1_err2: "01h 02h"
        meaning: Specified language invalid
      - err1_err2: "02h 00h"
        meaning: Memory allocation error
      - err1_err2: "02h 02h"
        meaning: Memory in use
      - err1_err2: "02h 03h"
        meaning: Specified value cannot be set
      - err1_err2: "02h 04h"
        meaning: Forced onscreen mute on
      - err1_err2: "02h 06h"
        meaning: Viewer error
      - err1_err2: "02h 07h"
        meaning: No signal
      - err1_err2: "02h 08h"
        meaning: A test pattern or filter is displayed
      - err1_err2: "02h 09h"
        meaning: No PC card inserted
      - err1_err2: "02h 0Ah"
        meaning: Memory operation error
      - err1_err2: "02h 0Ch"
        meaning: An entry list is displayed
      - err1_err2: "02h 0Dh"
        meaning: Command cannot be accepted because power is off
      - err1_err2: "02h 0Eh"
        meaning: Command execution failed
      - err1_err2: "02h 0Fh"
        meaning: No authority for operation
      - err1_err2: "03h 00h"
        meaning: Specified gain number incorrect
      - err1_err2: "03h 01h"
        meaning: Specified gain invalid
      - err1_err2: "03h 02h"
        meaning: Adjustment failed

  - id: input_sw_result
    type: enum
    values: [switched, error]
    notes: Response DATA01 FFh = ended with error (no signal switch made).
```

## Variables
```yaml
variables:
  - id: power_status
    label: Power Status
    query_action: error_status_request  # status available via RUNNING STATUS REQUEST / BASIC INFORMATION REQUEST
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]

  - id: lamp_usage_time_seconds
    label: Lamp Usage Time (seconds)
    type: integer
    notes: Updated at one-minute intervals.

  - id: filter_usage_time_seconds
    label: Filter Usage Time (seconds)
    type: integer

  - id: lamp_remaining_life_percent
    label: Lamp Remaining Life (%)
    type: integer
    notes: Negative value returned if lamp replacement deadline exceeded.

  - id: eco_mode
    label: Eco Mode
    type: integer
    notes: Value set for eco mode (Light mode / Lamp mode). See Appendix.

  - id: edge_blending_mode
    label: Edge Blending Mode
    type: enum
    values: [off, on]
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited command replies.
# UNRESOLVED: source documents no asynchronous/push event mechanism.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate from source if vendor documents macros; none found.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: While POWER ON is executing, no other command can be accepted.
    source: "Section 3.2 [015. POWER ON]"
  - id: power_off_lockout
    description: While POWER OFF is executing (including cooling time), no other command can be accepted.
    source: "Section 3.3 [016. POWER OFF]"
  - id: interlock_switch_error
    description: Error status DATA09 Bit1 reports interlock switch open.
    source: "Section 3.1 Error information list (DATA09)"
# UNRESOLVED: no power-on sequencing requirements or explicit safety warnings beyond command lockouts documented in this refined source.
```

## Notes
- Command/response frames are hexadecimal byte sequences. Frame layout: `{cmdByte} {opByte} {ID1} {ID2} {LEN} {DATA..} {CKS}`. Request frames replace `{ID1} {ID2}` with `00h 00h` and embed the control ID/model code implicitly; the device echoes `{ID1} {ID2}` in responses.
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes in the frame. Example: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- **ID1** = control ID set on projector; **ID2** = model code (varies by model). Default values not stated in source.
- Lens continuous drive (`7Fh` / `81h` in 053 LENS CONTROL DATA02) must be stopped by sending `00h`; while driving, re-issuing the same command moves without stop.
- Volume/picture gain parameter ranges, aspect values, base model type values, eco mode values, input terminal values, and sub-input values are referenced to an Appendix ("Supplementary Information by Command") not included in this refined source.
- Serial cable is a cross (null-modem) cable on the PC CONTROL D-SUB 9P port; LAN uses RJ-45 (10/100 Mbps auto-switchable, IEEE 802.3 / 802.3u). Wireless LAN details deferred to the wireless LAN unit operation manual.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow_control mode not stated (RTS/CTS pins wired but no flow-control setting documented). -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default/valid values not stated. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in refined source — enum value tables for input terminal, aspect, base model type, eco mode, sub-input not captured. -->
<!-- UNRESOLVED: exact marketing model string for "As96U Px39Ml" not corroborated inside refined text (manual is generic projector command reference). -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:31:58.326Z
last_checked_at: 2026-06-23T07:49:51.818Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T07:49:51.818Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to BDT140013 source; transport verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name spelled as given in input (\"As96U Px39Ml\"); exact marketing model string not confirmed inside the refined source text. Firmware compatibility range, flow_control mode, and ID1/ID2 default values not stated."
- "flow control mode not stated in source (RTS/CTS pins present in pinout but no flow_control value documented)"
- "source documents no asynchronous/push event mechanism."
- "populate from source if vendor documents macros; none found."
- "no power-on sequencing requirements or explicit safety warnings beyond command lockouts documented in this refined source."
- "firmware version compatibility not stated in source."
- "serial flow_control mode not stated (RTS/CTS pins wired but no flow-control setting documented)."
- "ID1 (control ID) and ID2 (model code) default/valid values not stated."
- "Appendix \"Supplementary Information by Command\" not present in refined source — enum value tables for input terminal, aspect, base model type, eco mode, sub-input not captured."
- "exact marketing model string for \"As96U Px39Ml\" not corroborated inside refined text (manual is generic projector command reference)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
