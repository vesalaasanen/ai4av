---
spec_id: admin/sharp-nec-nc2041l
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC2041L Control Spec"
manufacturer: Sharp/NEC
model_family: NC2041L
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC2041L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-22T05:22:00.466Z
last_checked_at: 2026-07-22T07:46:31.743Z
generated_at: 2026-07-22T07:46:31.743Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value table referenced as \"Supplementary Information by Command\" but not present in source"
  - "full input terminal value table not in source)"
  - "value list in Appendix not in source)"
  - "other targets inferred cut off)"
  - "full enumeration not present in source excerpt)"
  - "full value table in Appendix not in source)"
  - "settable parameters that are not discrete actions beyond Actions list above."
  - "no unsolicited notification events described in the source."
  - "no multi-step macro sequences described in source."
  - "source contains no explicit safety warnings, interlock procedures, or power-on"
  - "baud rate variants: source lists 115200/38400/19200/9600/4800 bps; this spec selects 115200 as the documented maximum."
  - "full key code list for remote_key_code command contains keys not enumerated here in detail; see source for complete list."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:46:31.743Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match hex sequences verbatim in source; transport parameters verified; source command catalogue fully represented. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Sharp/NEC NC2041L Control Spec

## Summary
The Sharp/NEC NC2041L is a projector. This spec covers its external control protocol over RS-232C serial and TCP/IP wired LAN. Commands are binary, framed by header/footer bytes, parameterized by ID1 (control ID), ID2 (model code), CKS (checksum), and variable-length DATA fields, with command/response pairs returned for each operation.

<!-- UNRESOLVED: input terminal value table referenced as "Supplementary Information by Command" but not present in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; 115200 is the listed maximum
  data_bits: 8
  parity: none
  flow_control: none  # source lists Full Duplex; RTS/CTS handshaking present on connector
  stop_bits: 1
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # POWER ON / POWER OFF commands
- routable       # INPUT SW CHANGE, PIP/PICTURE BY PICTURE SET, AUDIO SELECT SET
- queryable      # Multiple status/information requests
- levelable      # VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), OTHER ADJUST (030-15)
```

## Actions
```yaml
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

- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []

- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Input terminal code (UNRESOLVED: full input terminal value table not in source)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []

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
  command: "03 10 00 00 05 {DATA01} FF {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Adjustment target. 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: DATA02
      type: byte
      description: Adjustment mode. 00h=absolute, 01h=relative
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Adjustment mode. 00h=absolute, 01h=relative
    - name: DATA02
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Aspect value (UNRESOLVED: value list in Appendix not in source)

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 96h (high byte)
    - name: DATA02
      type: byte
      description: FFh (low byte); together selects LAMP/LIGHT ADJUST
    - name: DATA03
      type: byte
      description: Adjustment mode. 00h=absolute, 01h=relative
    - name: DATA04
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03 96 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lamp. 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)
    - name: DATA02
      type: byte
      description: Content. 01h=usage time (seconds), 04h=remaining life (%)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=Total Carbon Savings, 01h=Carbon Savings during operation

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Key code high byte. Source lists POWER ON=02h, AUTO=05h, MENU=06h, ENTER=0Bh, MUTE=13h, COMPUTER1=29h..., see source key code list.
    - name: DATA02
      type: byte
      description: Key code low byte (00h for all listed keys)

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
  command: "02 18 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lens target. 06h=Periphery Focus (UNRESOLVED: other targets inferred cut off)
    - name: DATA02
      type: byte
      description: Drive. 00h=Stop, 01h/02h/03h/FFh=timed plus, 7Fh=continuous plus, 81h/FEh/FDh=minus

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lens parameter (UNRESOLVED: full enumeration not present in source excerpt)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: FFh=Stop
    - name: DATA02
      type: byte
      description: Adjustment mode. 00h=absolute, 02h=relative
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
    - name: DATA02
      type: byte
      description: 00h=OFF, 01h=ON

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Profile number. 00h=Profile 1, 01h=Profile 2

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {DATA01} 00 00 {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light

- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

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

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 01h=Freeze On, 02h=Freeze Off

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 03h=Horizontal sync frequency, 04h=Vertical sync frequency

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

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

- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Eco mode value (UNRESOLVED: value list in Appendix not in source)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {DATA01...DATA16} 00 {CKS}"
  params:
    - name: name_bytes
      type: bytes
      description: Projector name, up to 16 bytes, NUL-terminated

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: DATA02
      type: byte
      description: Setting value (depends on DATA01; see source)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: 00h=OFF, 01h=ON

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Input terminal (UNRESOLVED: full value table in Appendix not in source)
    - name: DATA02
      type: byte
      description: 00h=specified terminal, 01h=BNC, 02h=COMPUTER
```

## Feedbacks
```yaml
- id: error_information
  type: bytes
  description: 12-byte error status returned by ERROR STATUS REQUEST (DATA01-DATA12)
- id: running_status_power
  type: enum
  values: [standby, power_on, not_supported]
- id: mute_picture
  type: enum
  values: [off, on]
- id: mute_sound
  type: enum
  values: [off, on]
- id: mute_onscreen
  type: enum
  values: [off, on]
- id: cover_status
  type: enum
  values: [normal_open, closed]
- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]
```

## Variables
```yaml
# UNRESOLVED: settable parameters that are not discrete actions beyond Actions list above.
# Source treats each setting as a discrete command (e.g., eco_mode_set, edge_blending_mode_set),
# not as a settable variable.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in the source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements. NOTE: error code 02h/04h "Forced onscreen mute on" referenced but is
# not a safety interlock.
```

## Notes
All commands share a binary framing convention: a command opcode/parameter prefix followed by ID1, ID2, data length, DATA bytes, and a trailing CKS (checksum) byte computed as the low-order byte of the sum of all preceding bytes. The source uses hex notation without "0x" or "h" suffixes; this spec preserves byte groupings with spaces for readability but values are otherwise verbatim.

The document explicitly mentions POWER ON and POWER OFF as commands that cannot be interrupted ("While this command is turning on the power, no other command can be accepted.") and implies the same for POWER OFF ("including the cooling time"). Operators should wait for these to complete before issuing further commands.

RTS/CTS hardware flow control is wired through the PC CONTROL D-SUB-9P connector (pins 7 and 8) but the communication mode is described as "Full duplex" without explicit flow-control setting — treat hardware flow control as UNRESOLVED for any specific software setting.

The "Supplementary Information by Command" appendix referenced throughout (for input terminals, aspect values, eco mode values, sub input values) was not present in the source excerpt; enum values for those DATA?? fields are therefore left as UNRESOLVED placeholders.

<!-- UNRESOLVED: baud rate variants: source lists 115200/38400/19200/9600/4800 bps; this spec selects 115200 as the documented maximum. -->
<!-- UNRESOLVED: full key code list for remote_key_code command contains keys not enumerated here in detail; see source for complete list. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-22T05:22:00.466Z
last_checked_at: 2026-07-22T07:46:31.743Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:46:31.743Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match hex sequences verbatim in source; transport parameters verified; source command catalogue fully represented. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value table referenced as \"Supplementary Information by Command\" but not present in source"
- "full input terminal value table not in source)"
- "value list in Appendix not in source)"
- "other targets inferred cut off)"
- "full enumeration not present in source excerpt)"
- "full value table in Appendix not in source)"
- "settable parameters that are not discrete actions beyond Actions list above."
- "no unsolicited notification events described in the source."
- "no multi-step macro sequences described in source."
- "source contains no explicit safety warnings, interlock procedures, or power-on"
- "baud rate variants: source lists 115200/38400/19200/9600/4800 bps; this spec selects 115200 as the documented maximum."
- "full key code list for remote_key_code command contains keys not enumerated here in detail; see source for complete list."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
