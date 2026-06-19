---
spec_id: admin/sharp-nec-np-px803ul-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX803UL-B Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PX803UL-B
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PX803UL-B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:55:08.747Z
last_checked_at: 2026-06-18T08:55:15.468Z
generated_at: 2026-06-18T08:55:15.468Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Voltage/power specs not covered by this command manual."
  - "flow control not stated in communication conditions table (RTS/CTS pins present in pinout)"
  - "confirm device emits no async events (source shows none)."
  - "populate if companion docs describe macros."
  - "no explicit power-on sequencing procedure or voltage interlocks stated in this command manual."
  - "firmware version compatibility not stated in source."
  - "flow_control not stated in communication conditions (RTS/CTS pins wired in pinout but mode unconfirmed)."
  - "full input-terminal value table lives in source Appendix \"Supplementary Information by Command\", not included in this refined excerpt."
  - "eco mode / aspect / base-model-type enum value tables referenced to Appendix, not in excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:55:15.468Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX803UL-B Control Spec

## Summary
Sharp/NEC NP-PX803UL-B projector control spec. Covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device supports RS-232C serial control and TCP/IP LAN control (port 7142). Commands are framed binary hex sequences with a trailing checksum byte; responses echo an ack frame or return error codes.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Voltage/power specs not covered by this command manual. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; device auto-configurable, pick one
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in communication conditions table (RTS/CTS pins present in pinout)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: POWER ON / POWER OFF commands present
  - queryable  # inferred: many status request commands returning state
  - levelable  # inferred: VOLUME ADJUST, PICTURE ADJUST gain commands present
  - routable  # inferred: INPUT SW CHANGE selects input terminal
```

## Actions
```yaml
# All command payloads are hex byte sequences VERBATIM from the source.
# ID1/ID2 (control ID + model code) appear only in responses, not in command frames.
# CKS = checksum: low-order byte of the sum of all preceding bytes (see source 2.2).
# For parameterized commands, <DATA..> denotes the variable byte and the trailing
# CKS must be recomputed over the assembled frame.

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
    - name: data01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). See source Appendix 'Supplementary Information by Command' for full value list."

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

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Value set for the aspect. See source Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust / Lamp-Light Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
    - name: data02
      type: integer
      description: "Target sub-code (FFh for lamp/light adjust)"
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
    - name: data01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

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
      description: "Key code low byte. Enum (DATA01,DATA02): 02h,00h=POWER ON; 03h,00h=POWER OFF; 05h,00h=AUTO; 06h,00h=MENU; 07h,00h=UP; 08h,00h=DOWN; 09h,00h=RIGHT; 0Ah,00h=LEFT; 0Bh,00h=ENTER; 0Ch,00h=EXIT; 0Dh,00h=HELP; 0Fh,00h=MAGNIFY UP; 10h,00h=MAGNIFY DOWN; 13h,00h=MUTE; 29h,00h=PICTURE; 4Bh,00h=COMPUTER1; 4Ch,00h=COMPUTER2; 4Fh,00h=VIDEO1; 51h,00h=S-VIDEO1; 84h,00h=VOLUME UP; 85h,00h=VOLUME DOWN; 8Ah,00h=FREEZE; A3h,00h=ASPECT; D7h,00h=SOURCE; EEh,00h=LAMP MODE/ECO"
    - name: data02
      type: integer
      description: Key code high byte (00h for all listed keys)

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
      description: "Lens target: 06h=Periphery Focus (other targets per source)"
    - name: data02
      type: integer
      description: "Content: 00h=Stop; 01h=drive +1s; 02h=drive +0.5s; 03h=drive +0.25s; 7Fh=drive plus; 81h=drive minus; FDh=drive -0.25s; FEh=drive -0.5s; FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: Lens target selector (lens axis to read)

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lens target (FFh=Stop, ignores mode/value)"
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
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (applies to profile set by LENS PROFILE SET)"

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
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
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
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
    - name: data01
      type: integer
      description: "Eco mode value. See source Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (depends on DATA01): MODE 00h=PIP/01h=PICTURE BY PICTURE; START POSITION 00h-03h corners; sub input values per Appendix"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=OFF, 01h=ON"

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
    - name: data01
      type: integer
      description: "Input terminal. See source Appendix 'Supplementary Information by Command'."
    - name: data02
      type: integer
      description: "Setting value: 00h=audio from terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frames: success ack = 2xh/2Xh echo frame (no data) or 20h/22h/23h with DATA;
# failure = Axh frame with <ERR1> <ERR2>. Error code table in source 2.4.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
  source: running_status_request DATA03 / basic_information_request DATA01

- id: error_status
  type: bitmask
  description: 12-byte error bitmap (DATA01-DATA12); bit=1 means error. See source 3.1 error information list.
  source: error_status_request

- id: input_signal_status
  type: composite
  description: Signal switch process, signal list number, selection signal type 1/2, content displayed.
  source: input_status_request

- id: mute_status
  type: composite
  description: picture/sound/onscreen/forced-onscreen mute + OSD display flags.
  source: mute_status_request

- id: lamp_info
  type: composite
  description: Lamp usage time (seconds) or remaining life (%). Negative remaining life when deadline exceeded.
  source: lamp_information_request_3

- id: lens_position
  type: composite
  description: Upper/lower limit + current value (16-bit) for requested lens axis.
  source: lens_control_request

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: cover_status_request

- id: eco_mode_value
  type: enum
  description: Light mode / Lamp mode value. Specific enum per Appendix.
  source: eco_mode_request

- id: mac_address
  type: string
  description: 6-byte MAC address.
  source: lan_mac_address_status_request_2
```

## Variables
```yaml
# Settable non-discrete parameters (backed by ADJUST actions above):
- id: brightness
  type: integer
  description: Picture brightness (030-1 target 00h). Range per gain_parameter_request_3.
- id: contrast
  type: integer
  description: Picture contrast (030-1 target 01h).
- id: color
  type: integer
  description: Picture color (030-1 target 02h).
- id: hue
  type: integer
  description: Picture hue (030-1 target 03h).
- id: sharpness
  type: integer
  description: Picture sharpness (030-1 target 04h).
- id: volume
  type: integer
  description: Sound volume (030-2).
- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust gain (030-15 target 96h).
- id: projector_name
  type: string
  description: LAN projector name, up to 16 bytes (098-45).
```

## Events
```yaml
# No unsolicited notifications documented; protocol is request/response only.
# UNRESOLVED: confirm device emits no async events (source shows none).
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
# UNRESOLVED: populate if companion docs describe macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While power-on is in progress, no other command can be accepted."
  - command: power_off
    note: "While power-off (incl. cooling time) is in progress, no other command can be accepted."
  - command: error_status_request
    note: "DATA09 Bit1 = interlock switch open is a reported error condition."
# UNRESOLVED: no explicit power-on sequencing procedure or voltage interlocks stated in this command manual.
```

## Notes
- Command frame structure: `[group] [opcode] 00h 00h [LEN] [DATA...] [CKS]`. Group byte indicates class: `00h`=setting/status requests, `01h`=freeze, `02h`=power/input/mute/shutter/lens, `03h`=adjust/information/LAN set+request.
- Responses: success echoes with leading nibble `2xh` (ack) or `2Xh` with data; failure uses `Axh` with `<ERR1> <ERR2>`. ID1=control ID, ID2=model code appear only in responses.
- Checksum (CKS): low-order byte of the sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h=103h` → CKS=`03h`.
- Lamp/filter usage time returned in seconds, updated at one-minute intervals.
- Baud rate is selectable among 115200/38400/19200/9600/4800 bps; pick one to match projector config.
- Serial cable is cross (null-modem); D-SUB 9P PC CONTROL port. LAN port is RJ-45.
- Key code list (050) collapses to one parameterized action; 25 key entries are enum values of DATA01/DATA02, not separate commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: flow_control not stated in communication conditions (RTS/CTS pins wired in pinout but mode unconfirmed). -->
<!-- UNRESOLVED: full input-terminal value table lives in source Appendix "Supplementary Information by Command", not included in this refined excerpt. -->
<!-- UNRESOLVED: eco mode / aspect / base-model-type enum value tables referenced to Appendix, not in excerpt. -->
````

Spec done. 53 commands, all verbatim. Serial + TCP. Payloads literal.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:55:08.747Z
last_checked_at: 2026-06-18T08:55:15.468Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:55:15.468Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Voltage/power specs not covered by this command manual."
- "flow control not stated in communication conditions table (RTS/CTS pins present in pinout)"
- "confirm device emits no async events (source shows none)."
- "populate if companion docs describe macros."
- "no explicit power-on sequencing procedure or voltage interlocks stated in this command manual."
- "firmware version compatibility not stated in source."
- "flow_control not stated in communication conditions (RTS/CTS pins wired in pinout but mode unconfirmed)."
- "full input-terminal value table lives in source Appendix \"Supplementary Information by Command\", not included in this refined excerpt."
- "eco mode / aspect / base-model-type enum value tables referenced to Appendix, not in excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
