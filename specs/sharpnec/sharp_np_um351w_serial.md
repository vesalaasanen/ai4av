---
spec_id: admin/sharp-nec-np-um351w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP UM351W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP UM351W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP UM351W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:36:39.477Z
last_checked_at: 2026-06-18T08:55:19.028Z
generated_at: 2026-06-18T08:55:19.028Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Base-model-type / sub-input value tables referenced to an external \"Appendix: Supplementary Information by Command\" not included in this source."
  - "flow-control item not listed in the serial communication-conditions table; RTS/CTS pins are wired cross-connected in the pin assignment"
  - "base_url / IP acquisition scheme not stated (LAN cable type left to network admin)"
  - "source exposes settable parameters via per-command DATA bytes"
  - "source documents only request/response framing; no unsolicited"
  - "source documents no explicit multi-step macro sequences."
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "firmware version compatibility not stated in source."
  - "flow_control setting not in serial communication-conditions table."
  - "model code (ID2) value not stated in source."
  - "appendix value tables (input terminal / aspect / eco mode / sub-input / base model type) not included in this source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:55:19.028Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP UM351W Control Spec

## Summary
The Sharp/NEC NP UM351W is a projector controllable via an RS-232C serial port (D-SUB 9P PC CONTROL) or a wired/wireless LAN (TCP). This spec covers the binary, frame-based command protocol documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1), enumerating power, mute, input switching, picture/volume/lens adjustment, lens memory, status query, and LAN-setting commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Base-model-type / sub-input value tables referenced to an external "Appendix: Supplementary Information by Command" not included in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow-control item not listed in the serial communication-conditions table; RTS/CTS pins are wired cross-connected in the pin assignment
  communication_mode: full_duplex
addressing:
  port: 7142
  # UNRESOLVED: base_url / IP acquisition scheme not stated (LAN cable type left to network admin)
auth:
  type: none  # inferred: no auth procedure in source
```

Frame format (hex bytes, verbatim from source):
```
20h  88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>
```
- `ID1` = control ID set on the projector.
- `ID2` = model code (varies by model).
- `CKS` (checksum) = low-order one byte of the sum of all preceding bytes. Example: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → checksum `03h`.
- A leading byte classifies direction/type: `0xh` request, `2xh` success response, `Axh` error response.

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands
  - queryable    # inferred: many *REQUEST / status query commands
  - levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST, OTHER ADJUST, LENS CONTROL
  - routable     # inferred: INPUT SW CHANGE command
```

## Actions
```yaml
# Every command payload is verbatim hex from the source. {placeholders} mark
# DATA bytes documented as parameters; {checksum} is the CKS byte computed as
# the low byte of the sum of all preceding bytes.

actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00 88 00 00 00 88"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "02 00 00 00 00 02"
    params: []
    notes: No other command accepted while power is turning on.

  - id: power_off
    label: Power Off
    kind: action
    command: "02 01 00 00 00 03"
    params: []
    notes: No other command accepted during power-off (including cooling time).

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02 03 00 00 02 01 {input} {checksum}"
    params:
      - name: input
        type: integer
        description: Input terminal DATA01 byte (e.g. 06h = video). Full value list in source Appendix.
    notes: Example (video) "02 03 00 00 02 01 06 0E".

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02 10 00 00 00 12"
    params: []
    notes: Cleared by input/video-signal switch.

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
    notes: Cleared by input/video-signal switch or volume adjustment.

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

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02 15 00 00 00 17"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03 10 00 00 05 {target} FF {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: 16-bit adjustment value (DATA03 low / DATA04 high)
    notes: Brightness=10 example "03 10 00 00 05 00 FF 00 0A 00 21"; brightness=-10 example "...00 F6 FF 0C".

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: 16-bit volume value (DATA02 low / DATA03 high)
    notes: Volume=10 example "03 10 00 00 05 05 00 00 0A 00 27".

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03 10 00 00 05 18 00 00 {value} 00 {checksum}"
    params:
      - name: value
        type: integer
        description: Aspect value (DATA01); full list in source Appendix.

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03 10 00 00 05 {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "LAMP/LIGHT ADJUST target = DATA01 96h, DATA02 FFh"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: 16-bit adjustment value (DATA04 low / DATA05 high)

  - id: information_request
    label: Information Request
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-minute intervals.

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: Returns filter usage seconds (DATA01-04), filter alarm start seconds (DATA05-08); -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03 96 00 00 02 {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: integer
        description: "01h=usage time (seconds), 04h=remaining life (%)"
    notes: Usage-time example (Lamp1) "03 96 00 00 02 00 01 9C". Negative remaining-life % returned if replacement deadline exceeded.

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03 9A 00 00 01 {type} {checksum}"
    params:
      - name: type
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: Returns kg (DATA02-05) and mg (DATA06-09).

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02 0F 00 00 02 {key_lo} {key_hi} {checksum}"
    params:
      - name: key_code
        type: integer
        description: "WORD key code (DATA01=lo, DATA02=hi). Examples: POWER ON 02 00, POWER OFF 03 00, AUTO 05 00, MENU 06 00, UP 07 00, DOWN 08 00, ENTER 0B 00, EXIT 0C 00, MUTE 13 00, COMPUTER1 4B 00, VIDEO1 4F 00, VOLUME UP 84 00, VOLUME DOWN 85 00, FREEZE 8A 00, ASPECT A3 00, SOURCE D7 00, LAMP MODE/ECO EE 00."
    notes: AUTO example "02 0F 00 00 02 05 00 18".

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02 16 00 00 00 18"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02 17 00 00 00 19"
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02 18 00 00 02 {target} {content} {checksum}"
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus"
      - name: content
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: Send 00h to stop continuous drive.

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02 1C 00 00 02 {target} 00 {checksum}"
    params:
      - name: target
        type: integer
        description: Lens adjustment target (DATA01).
    notes: Returns upper/lower limit and current value (16-bit each).

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02 1D 00 00 04 {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "FFh=Stop (skips mode/value); otherwise lens axis target"
      - name: mode
        type: integer
        description: "00h=absolute, 02h=relative"
      - name: value
        type: integer
        description: 16-bit adjustment value (DATA03 low / DATA04 high)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02 1E 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02 1F 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Operates on the profile selected via LENS PROFILE SET.

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02 20 00 00 01 {option} {checksum}"
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: Returns setting value 00h=OFF / 01h=ON.

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02 21 00 00 02 {option} {value} {checksum}"
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) (0=stop, 1=operating).

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02 27 00 00 01 {profile} {checksum}"
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02 28 00 00 00 2A"
    params: []
    notes: Returns selected profile (00h=Profile 1, 01h=Profile 2).

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03 05 00 00 03 {name} 00 00 {checksum}"
    params:
      - name: name
        type: integer
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: Returns status, min/max/default/current 16-bit values and wide/narrow step widths. Brightness example "03 05 00 00 03 00 00 00 0B".

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: Returns base model type (DATA01-03), sound function, clock/sleep-timer profile.

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: Returns power status, cooling/power process flags, operation status.

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: Returns signal switch process, signal list number (value-1), selection signal types, test pattern, displayed content.

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display flags.

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01 98 00 00 01 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00 D0 00 00 03 00 {type} 01 {checksum}"
    params:
      - name: type
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: Returns label + value string (NUL-terminated).

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []
    notes: Returns Light/Lamp mode value (value list in source Appendix).

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []
    notes: Example response (MAC 01-23-45-67-89-AB) "23 B0 <ID1> <ID2> 08 9A 00 01 23 45 67 89 AB <CKS>".

  - id: pip_picture_by_picture_request
    label: PIP / Picture by Picture Request
    kind: query
    command: "03 B0 00 00 02 C5 {item} {checksum}"
    params:
      - name: item
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: Sub-input value list in source Appendix.

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []
    notes: "DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03 B1 00 00 02 07 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: Eco/Light/Lamp mode value (value list in source Appendix).

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03 B1 00 00 12 2C {name_01} {name_16} 00 {checksum}"
    params:
      - name: name
        type: string
        description: Projector name, up to 16 bytes (DATA01-16), NUL-terminated.

  - id: pip_picture_by_picture_set
    label: PIP / Picture by Picture Set
    kind: action
    command: "03 B1 00 00 03 C5 {item} {value} {checksum}"
    params:
      - name: item
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PBP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Otherwise sub-input value (Appendix)."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03 B1 00 00 03 DF 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []
    notes: Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11).

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []
    notes: Returns serial number string DATA01-16 (NUL-terminated).

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: Returns operation status, displayed content, selection signal types, display signal type, video/sound/onscreen mute, freeze status.

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03 C9 00 00 03 09 {input} {value} {checksum}"
    params:
      - name: input
        type: integer
        description: Input terminal (value list in source Appendix).
      - name: value
        type: integer
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: success_ack
    type: frame
    format: "2Xh <op> <ID1> <ID2> <LEN> <DATA...> <CKS>"
    description: Success response; leading 2xh byte mirrors the request op group. DATA omitted when no data requested.

  - id: error_response
    type: frame
    format: "AXh <op> <ID1> <ID2> 02 <ERR1> <ERR2> <CKS>"
    description: |
      Failure response. ERR1/ERR2 code pairs (verbatim from source):
      00 00 = command not recognized; 00 01 = not supported by model;
      01 00 = invalid value; 01 01 = invalid input terminal; 01 02 = invalid language;
      02 00 = memory allocation error; 02 02 = memory in use; 02 03 = value cannot be set;
      02 04 = forced onscreen mute on; 02 06 = viewer error; 02 07 = no signal;
      02 08 = test pattern/filter displayed; 02 09 = no PC card inserted; 02 0A = memory operation error;
      02 0C = entry list displayed; 02 0D = power is off; 02 0E = command execution failed; 02 0F = no authority;
      03 00 = incorrect gain number; 03 01 = invalid gain; 03 02 = adjustment failed.

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
    description: From RUNNING STATUS REQUEST DATA03 / BASIC INFORMATION REQUEST DATA01.

  - id: error_status_bitfield
    type: bitfield
    description: 12-byte (DATA01-12) bitfield from ERROR STATUS REQUEST; bit=1 = error.
```

## Variables
```yaml
# UNRESOLVED: source exposes settable parameters via per-command DATA bytes
# (volume level, picture gains, aspect, lens position, eco mode). These are
# modelled as parameterized Actions above rather than discrete Variables.
```

## Events
```yaml
# UNRESOLVED: source documents only request/response framing; no unsolicited
# notification mechanism stated.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (not formal interlocks):
#   - During POWER ON / POWER OFF (incl. cooling), no other command is accepted.
#   - Forced onscreen mute (ERR 02 04) can block commands.
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements stated in the source.
```

## Notes
- All commands are binary hex frames; the final byte is a checksum (CKS) = low byte of the sum of all preceding bytes. Responses begin `2xh` (success) or `Axh` (error).
- `ID1` (control ID) and `ID2` (model code) are per-device values substituted into every frame.
- Serial pinout: D-SUB 9P — 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS (cross cable to host).
- LAN: RJ-45, data rate auto 10/100 Mbps, TCP port 7142 for command send/receive. Wireless LAN requires a separate wireless LAN unit (see device operation manual).
- Lamp/filter usage times update at 1-minute intervals despite 1-second resolution.
- Several value tables (base model type, input terminal, aspect, eco mode, sub-input) are referenced to an external "Appendix: Supplementary Information by Command" not present in this source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: flow_control setting not in serial communication-conditions table. -->
<!-- UNRESOLVED: model code (ID2) value not stated in source. -->
<!-- UNRESOLVED: appendix value tables (input terminal / aspect / eco mode / sub-input / base model type) not included in this source. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:36:39.477Z
last_checked_at: 2026-06-18T08:55:19.028Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:55:19.028Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Base-model-type / sub-input value tables referenced to an external \"Appendix: Supplementary Information by Command\" not included in this source."
- "flow-control item not listed in the serial communication-conditions table; RTS/CTS pins are wired cross-connected in the pin assignment"
- "base_url / IP acquisition scheme not stated (LAN cable type left to network admin)"
- "source exposes settable parameters via per-command DATA bytes"
- "source documents only request/response framing; no unsolicited"
- "source documents no explicit multi-step macro sequences."
- "no explicit safety warnings, interlock procedures, or power-on"
- "firmware version compatibility not stated in source."
- "flow_control setting not in serial communication-conditions table."
- "model code (ID2) value not stated in source."
- "appendix value tables (input terminal / aspect / eco mode / sub-input / base model type) not included in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
