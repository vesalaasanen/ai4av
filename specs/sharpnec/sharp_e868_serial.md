---
spec_id: admin/sharp-nec-e868
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E868 Control Spec"
manufacturer: Sharp/NEC
model_family: E868
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E868
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:09:40.370Z
last_checked_at: 2026-06-17T19:45:01.097Z
generated_at: 2026-06-17T19:45:01.097Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not specify E868 model-specific firmware compatibility or which appendix-listed values (input terminals, signal types, base model types) apply to E868"
  - "source states \"Full duplex\" communication mode but does not name a flow-control scheme"
  - "exact enum value set not in source body - referenced to Appendix"
  - "source Appendix tables (input terminal values, signal types, base"
  - "source states no formal interlock procedures, voltage/current"
  - "source Appendix \"Supplementary Information by Command\" referenced for input terminal values, signal type enums, eco mode values, and base model type codes — appendix not present in extracted text, so those enum value sets are incomplete in this spec."
  - "E868-specific ID2 model code not stated in source."
  - "firmware version compatibility not stated in source."
  - "flow_control scheme not named in source (only \"Full duplex\" communication mode stated)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:45:01.097Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally to source; transport parameters verified; source command catalogue fully represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E868 Control Spec

## Summary
The Sharp/NEC E868 is a projector controllable via RS-232C serial or wired/wireless LAN (TCP). Commands are framed binary payloads (hex bytes) with a trailing checksum byte. This spec covers the full command catalogue documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: source does not specify E868 model-specific firmware compatibility or which appendix-listed values (input terminals, signal types, base model types) apply to E868 -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated in source for LAN command send/receive
serial:
  baud_rate: 9600  # source lists supported rates: 115200 / 38400 / 19200 / 9600 / 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not name a flow-control scheme
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON (015) / POWER OFF (016) present
  - queryable     # inferred: many *REQUEST commands return device state
  - levelable     # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST present
  - routable      # inferred: INPUT SW CHANGE and AUDIO SELECT SET present
```

## Actions
```yaml
# All frames are hex bytes verbatim from source. <CKS> = checksum byte computed
# as low-order 8 bits of the sum of all preceding bytes. <ID1> = control ID,
# <ID2> = model code; both are inserted into the response framing by the device.
# Command frames below use the fixed header bytes documented in source (the
# <ID1> <ID2> placeholders appear only in the response frames in the source).

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: Response returns DATA01-DATA12 bitmap of error states.

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While powering on, no other command is accepted.

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off incl. cooling time, no other command is accepted.

- id: input_sw_change
  label: Input Switch Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal byte (e.g. 06h = video port). Values defined in source Appendix "Supplementary Information by Command".
  notes: Response DATA01 = FFh means ended with error (no switch made).

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Cleared on input/video signal switch.

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
  notes: Cleared on input/video signal switch or volume adjustment.

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
  notes: Cleared on input/video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data03
      type: string
      description: Adjustment value low-order 8 bits
    - name: data04
      type: string
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data02
      type: string
      description: Value low-order 8 bits
    - name: data03
      type: string
      description: Value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Aspect value byte. Values defined in source Appendix.

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Target high byte: 96h = LAMP ADJUST / LIGHT ADJUST (only target documented)"
    - name: data02
      type: string
      description: "Target low byte: FFh pairs with 96h per source table"
    - name: data03
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: Value low-order 8 bits
    - name: data05
      type: string
      description: Value high-order 8 bits

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (D01-49), lamp usage seconds (D83-86), filter usage seconds (D87-90). Updated at 1-minute intervals.

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage seconds (D01-04) and filter alarm start time seconds (D05-08). -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Key code low byte (see key code list - e.g. 05h=AUTO, 06h=MENU)
    - name: data02
      type: string
      description: Key code high byte (00h for all documented keys)
  notes: Response DATA01=FFh means ended with error.

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (source table shows 06h=Periphery Focus as documented row)"
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h/02h/03h=plus drive 1s/0.5s/0.25s, 7Fh=plus, 81h=minus, FDh/FEh/FFh=minus drive 0.25s/0.5s/1s"
  notes: Send 00h to stop after 7Fh/81h continuous drive.

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Lens adjustment target

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (FFh=Stop, then mode/value ignored)"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: Value low-order 8 bits
    - name: data04
      type: string
      description: Value high-order 8 bits

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls profile selected via 053-10 LENS PROFILE SET.

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns bitmap of lens operation state (Lens memory/Zoom/Focus/Shift-H/Shift-V).

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function availability, profile/timer capability.

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process, operation status.

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
  notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display state.

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
  notes: "Returns mirror/lens cover status: 00h=opened, 01h=closed"

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns Light mode or Lamp mode depending on projector.

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
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Eco mode value byte. Values defined in source Appendix.

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (e.g. MODE: 00h=PIP/01h=PbP; START POSITION: 00h-03h corners)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
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
  notes: Returns operation status, content displayed, signal types, mute/freeze states.

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal byte. Values in source Appendix.
    - name: data02
      type: string
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# One entry per observable state returned by query responses.

- id: error_status
  type: bitmap
  description: 12-byte error bitmap returned by 009. Bit set = error.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: Returned by 078-2 DATA03 and 305-3 DATA01.

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: Returned by 078-2 DATA06.

- id: input_signal
  type: composite
  description: Input terminal + signal list number + signal type returned by 078-3.

- id: mute_status
  type: composite
  description: Picture/sound/onscreen/forced-onscreen mute booleans returned by 078-4.

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: Returned by 078-6 DATA01.

- id: lens_operation_status
  type: bitmap
  description: Lens memory/zoom/focus/shift operation bits returned by 053-7.

- id: eco_mode
  type: enum
  description: Eco/Light/Lamp mode value returned by 097-8. Enum values defined in source Appendix.
  # UNRESOLVED: exact enum value set not in source body - referenced to Appendix

- id: edge_blending_mode
  type: enum
  values: [off, on]
```

## Variables
```yaml
# Settable parameters addressable via discrete set commands (covered by Actions).
# No additional free-standing variables beyond those action params.
# UNRESOLVED: source Appendix tables (input terminal values, signal types, base
# model types) not included in extracted text - enum ranges incomplete.
```

## Events
```yaml
# Source documents no unsolicited notifications - all responses are solicited
# replies to commands. No events to declare.
```

## Macros
```yaml
# Source documents no multi-step macro sequences. No macros to declare.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON command is executing, no other command is accepted."
  - "While POWER OFF is executing (including cooling time), no other command is accepted."
  - "Commands requiring power are rejected when projector is off (error code ERR1=02h ERR2=0Dh)."
# UNRESOLVED: source states no formal interlock procedures, voltage/current
# specs, or power-on sequencing requirements beyond the above notes.
```

## Notes
- Command/response framing: every frame is a hex byte sequence. Request frames use fixed leading bytes (00h/01h/02h/03h); response frames begin with the leading byte + 80h (e.g. 02h command → A2h error response, 22h success response).
- `<ID1>` = projector control ID, `<ID2>` = model code; both appear in response frames only and are set per-device.
- Checksum (`<CKS>`) = low-order 8 bits of the sum of all preceding bytes in the frame. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- Error responses carry `<ERR1> <ERR2>` per the 2.4 error code table (e.g. `00h/00h` = unrecognized command, `02h/0Dh` = command rejected because power is off).
- Communication is full-duplex RS-232C (D-SUB 9P cross cable) or 10/100 Mbps wired LAN (RJ-45); wireless LAN unit support is model-dependent.
- Lamp usage/filter usage are reported in seconds, updated at 1-minute granularity.

<!-- UNRESOLVED: source Appendix "Supplementary Information by Command" referenced for input terminal values, signal type enums, eco mode values, and base model type codes — appendix not present in extracted text, so those enum value sets are incomplete in this spec. -->
<!-- UNRESOLVED: E868-specific ID2 model code not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: flow_control scheme not named in source (only "Full duplex" communication mode stated). -->
````

Spec ready. 53 actions, all hex payloads verbatim. Serial + TCP both populated (port 7142 stated, baud rates listed). Auth none inferred. UNRESOLVED markers on appendix-referenced enums, ID2 model code, firmware, flow control.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:09:40.370Z
last_checked_at: 2026-06-17T19:45:01.097Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:45:01.097Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally to source; transport parameters verified; source command catalogue fully represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not specify E868 model-specific firmware compatibility or which appendix-listed values (input terminals, signal types, base model types) apply to E868"
- "source states \"Full duplex\" communication mode but does not name a flow-control scheme"
- "exact enum value set not in source body - referenced to Appendix"
- "source Appendix tables (input terminal values, signal types, base"
- "source states no formal interlock procedures, voltage/current"
- "source Appendix \"Supplementary Information by Command\" referenced for input terminal values, signal type enums, eco mode values, and base model type codes — appendix not present in extracted text, so those enum value sets are incomplete in this spec."
- "E868-specific ID2 model code not stated in source."
- "firmware version compatibility not stated in source."
- "flow_control scheme not named in source (only \"Full duplex\" communication mode stated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
