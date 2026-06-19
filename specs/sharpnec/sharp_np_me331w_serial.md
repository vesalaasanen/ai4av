---
spec_id: admin/sharp-nec-np-me331w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP ME331W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP ME331W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP ME331W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:00:03.305Z
last_checked_at: 2026-06-18T08:37:18.410Z
generated_at: 2026-06-18T08:37:18.410Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for NP ME331W not stated in source"
  - "control ID (ID1) default value not stated in source"
  - "baud rate listed as 115200/38400/19200/9600/4800 (switchable) - no single default stated in source"
  - "flow_control not stated in source (full-duplex mode stated, RTS/CTS pins present)"
  - "many query responses have rich structured payloads (lamp usage,"
  - "valid range not stated in source (returned by 060-1 query)."
  - "enum values for eco mode not enumerated in source body - referenced to Appendix."
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no explicit multi-step sequences. Remove section if not applicable."
  - "no voltage/current/power specs in source. No explicit user-safety"
  - "Appendix \"Supplementary Information by Command\" not present in source — input terminal hex codes, aspect values, eco mode enums, base model types, and sub-input enums cannot be enumerated."
  - "ID1 control ID default and ID2 model code for NP ME331W not stated in source."
  - "Valid adjustment ranges for picture/volume/lamp-adjust not stated in source body (runtime-queryable via 060-1)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:37:18.410Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP ME331W Control Spec

## Summary
Sharp/NEC NP ME331W projector. Binary RS-232C serial control and TCP/IP LAN control on port 7142. 53 distinct command opcodes covering power, input switching, mute, lens/shutter, picture/volume adjust, status queries, and LAN settings.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for NP ME331W not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: baud rate listed as 115200/38400/19200/9600/4800 (switchable) - no single default stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not stated in source (full-duplex mode stated, RTS/CTS pins present)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF commands
  - routable        # inferred from INPUT SW CHANGE command
  - queryable       # inferred from extensive query commands (078-*, 097-*, 305-*, etc.)
  - levelable       # inferred from PICTURE ADJUST, VOLUME ADJUST commands
```

## Actions
```yaml
# All command payloads are hex byte sequences. Checksum (CKS) computed as low
# byte of sum of all preceding bytes (per source §2.2). ID1=control ID, ID2=
# model code - both projector-specific, not stated in source for this model.
# Response prefix A?h = error response, 2?h/3?h = success response.
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

  - id: power_off
    label: Power Off (016)
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change
    label: Input Switch Change (018)
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Input terminal hex code (e.g. 06h = video port). See Appendix "Supplementary Information by Command" in source.
      - name: cks
        type: string
        description: Checksum byte, low byte of sum of preceding bytes.

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
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness).
      - name: data02
        type: string
        description: Adjustment mode (00h=absolute, 01h=relative).
      - name: data03
        type: string
        description: Adjustment value low-order 8 bits.
      - name: data04
        type: string
        description: Adjustment value high-order 8 bits.
      - name: cks
        type: string
        description: Checksum byte.

  - id: volume_adjust
    label: Volume Adjust (030-2)
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: Adjustment mode (00h=absolute, 01h=relative).
      - name: data02
        type: string
        description: Adjustment value low-order 8 bits.
      - name: data03
        type: string
        description: Adjustment value high-order 8 bits.
      - name: cks
        type: string
        description: Checksum byte.

  - id: aspect_adjust
    label: Aspect Adjust (030-12)
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: Aspect value hex code. See Appendix "Supplementary Information by Command" in source.
      - name: cks
        type: string
        description: Checksum byte.

  - id: other_adjust
    label: Other Adjust (030-15)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST).
      - name: data02
        type: string
        description: Adjustment target low byte (FFh for LAMP/LIGHT ADJUST).
      - name: data03
        type: string
        description: Adjustment mode (00h=absolute, 01h=relative).
      - name: data04
        type: string
        description: Adjustment value low-order 8 bits.
      - name: data05
        type: string
        description: Adjustment value high-order 8 bits.
      - name: cks
        type: string
        description: Checksum byte.

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
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: Lamp selector (00h=Lamp 1, 01h=Lamp 2 [two-lamp models only]).
      - name: data02
        type: string
        description: Content (01h=usage time seconds, 04h=remaining life %).
      - name: cks
        type: string
        description: Checksum byte.

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request (037-6)
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Content (00h=Total, 01h=During operation).
      - name: cks
        type: string
        description: Checksum byte.

  - id: remote_key_code
    label: Remote Key Code (050)
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: Key code low byte (WORD type). See Key code list in source.
      - name: data02
        type: string
        description: Key code high byte (typically 00h).
      - name: cks
        type: string
        description: Checksum byte.

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
        description: Adjustment target (06h=Periphery Focus).
      - name: data02
        type: string
        description: Drive command (00h=Stop, 01h/02h/03h=plus pulse, 7Fh=plus continuous, 81h/FDh/FEh/FFh=minus variants).
      - name: cks
        type: string
        description: Checksum byte.

  - id: lens_control_request
    label: Lens Control Request (053-1)
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: Adjustment target hex code.
      - name: cks
        type: string
        description: Checksum byte.

  - id: lens_control_2
    label: Lens Control 2 (053-2)
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: Target/Stop (FFh=Stop).
      - name: data02
        type: string
        description: Adjustment mode (00h=absolute, 02h=relative).
      - name: data03
        type: string
        description: Adjustment value low-order 8 bits.
      - name: data04
        type: string
        description: Adjustment value high-order 8 bits.
      - name: cks
        type: string
        description: Checksum byte.

  - id: lens_memory_control
    label: Lens Memory Control (053-3)
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Operation (00h=MOVE, 01h=STORE, 02h=RESET).
      - name: cks
        type: string
        description: Checksum byte.

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control (053-4)
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Operation (00h=MOVE, 01h=STORE, 02h=RESET).
      - name: cks
        type: string
        description: Checksum byte.

  - id: lens_memory_option_request
    label: Lens Memory Option Request (053-5)
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE).
      - name: cks
        type: string
        description: Checksum byte.

  - id: lens_memory_option_set
    label: Lens Memory Option Set (053-6)
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE).
      - name: data02
        type: string
        description: Setting value (00h=OFF, 01h=ON).
      - name: cks
        type: string
        description: Checksum byte.

  - id: lens_information_request
    label: Lens Information Request (053-7)
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: Lens Profile Set (053-10)
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Profile number (00h=Profile 1, 01h=Profile 2).
      - name: cks
        type: string
        description: Checksum byte.

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
        description: Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST).
      - name: cks
        type: string
        description: Checksum byte.

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
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Freeze state (01h=ON, 02h=OFF).
      - name: cks
        type: string
        description: Checksum byte.

  - id: information_string_request
    label: Information String Request (084)
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: Information type (03h=Horizontal sync freq, 04h=Vertical sync freq).
      - name: cks
        type: string
        description: Checksum byte.

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
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3).
      - name: cks
        type: string
        description: Checksum byte.

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
        description: Eco mode value. See Appendix "Supplementary Information by Command" in source.
      - name: cks
        type: string
        description: Checksum byte.

  - id: lan_projector_name_set
    label: LAN Projector Name Set (098-45)
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
    params:
      - name: data01..data16
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated).
      - name: cks
        type: string
        description: Checksum byte.

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set (098-198)
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3).
      - name: data02
        type: string
        description: Setting value (MODE: 00h=PIP/01h=PBP; POSITION: 00h-03h; SUB INPUT: per appendix).
      - name: cks
        type: string
        description: Checksum byte.

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set (098-243-1)
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: Setting value (00h=OFF, 01h=ON).
      - name: cks
        type: string
        description: Checksum byte.

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
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: Input terminal hex code. See Appendix "Supplementary Information by Command" in source.
      - name: data02
        type: string
        description: Setting value (00h=specified terminal, 01h=BNC, 02h=COMPUTER).
      - name: cks
        type: string
        description: Checksum byte.
```

## Feedbacks
```yaml
# Query responses use prefix 20h/23h on success, A0h/A3h on error (with ERR1/ERR2).
# Source documents response structure but response parsing rules are command-specific.
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 DATA03 / 305-3 DATA01"

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 DATA06"

  - id: error_code
    type: composite
    description: "ERR1 + ERR2 byte pair per §2.4 error code list (e.g. 00h/00h=unrecognized, 02h/0Dh=power off rejects cmd)."
    source: "§2.4 Error code list"

  - id: execution_result
    type: enum
    values: [success, error]
    description: "Generic 0000h/non-0000h result returned by adjustment commands (030-*, 319-10)."
    source: "§3.11, §3.53"

  # UNRESOLVED: many query responses have rich structured payloads (lamp usage,
  # filter time, MAC address, model name, etc.) - enumerating all as discrete
  # feedbacks would duplicate the Actions query entries above. See source §3.
```

## Variables
```yaml
variables:
  - id: picture_brightness
    description: Picture brightness (030-1 DATA01=00h).
    # UNRESOLVED: valid range not stated in source (returned by 060-1 query).
  - id: picture_contrast
    description: Picture contrast (030-1 DATA01=01h).
  - id: picture_color
    description: Picture color (030-1 DATA01=02h).
  - id: picture_hue
    description: Picture hue (030-1 DATA01=03h).
  - id: picture_sharpness
    description: Picture sharpness (030-1 DATA01=04h).
  - id: volume
    description: Sound volume (030-2).
  - id: lamp_adjust
    description: Lamp/Light adjust (030-15 DATA01=96h).
  - id: eco_mode
    description: Eco/Light/Lamp mode (098-8 / 097-8).
    # UNRESOLVED: enum values for eco mode not enumerated in source body - referenced to Appendix.
  - id: projector_name
    description: LAN projector name (098-45, up to 16 bytes).
  - id: edge_blending_mode
    description: Edge blending on/off (098-243-1).
  - id: pip_pbp_mode
    description: PIP vs PBP mode (098-198 DATA01=00h).
  - id: freeze_state
    description: Freeze on/off (079).
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# replies to commands. Remove section if not applicable.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences. Remove section if not applicable.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While power-on is in progress, no other command can be accepted (source §3.2)."
  - command: power_off
    note: "During power-off including cooling time, no other command can be accepted (source §3.3)."
  - command: "*"
    note: "Many commands return ERR 02h/0Dh when power is off (source §2.4)."
# UNRESOLVED: no voltage/current/power specs in source. No explicit user-safety
# interlock procedures beyond command-acceptance locks above.
```

## Notes
- Binary protocol: all commands/responses hex bytes. Frame markers — `20h/21h/22h/23h` success-response prefixes by command class; `A0h/A1h/A2h/A3h` error-response prefixes.
- Checksum rule (§2.2): sum all preceding bytes, take low-order 8 bits.
- `ID1` (control ID) and `ID2` (model code) are projector-specific — not stated in source for NP ME331W; must be read from device or appendix.
- Baud rate switchable: 4800/9600/19200/38400/115200 — no single default documented.
- LAN pinout (RJ-45) and serial pinout (D-SUB 9P cross cable) documented in §1.1.
- Input terminal hex codes, aspect values, eco mode values, base model types, sub-input values are referenced to an "Appendix: Supplementary Information by Command" that is NOT included in the refined source text.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in source — input terminal hex codes, aspect values, eco mode enums, base model types, and sub-input enums cannot be enumerated. -->
<!-- UNRESOLVED: ID1 control ID default and ID2 model code for NP ME331W not stated in source. -->
<!-- UNRESOLVED: Valid adjustment ranges for picture/volume/lamp-adjust not stated in source body (runtime-queryable via 060-1). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

Spec built. 53 actions, all 53 source commands covered verbatim. Checksum rule noted. Source mentions both RS-232C + TCP port 7142 — both populated per Tier 1. Baud left UNRESOLVED (source lists 5 switchable values, no single default). Appendix enums (input codes, eco modes, etc.) absent from refined text — marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:00:03.305Z
last_checked_at: 2026-06-18T08:37:18.410Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:37:18.410Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for NP ME331W not stated in source"
- "control ID (ID1) default value not stated in source"
- "baud rate listed as 115200/38400/19200/9600/4800 (switchable) - no single default stated in source"
- "flow_control not stated in source (full-duplex mode stated, RTS/CTS pins present)"
- "many query responses have rich structured payloads (lamp usage,"
- "valid range not stated in source (returned by 060-1 query)."
- "enum values for eco mode not enumerated in source body - referenced to Appendix."
- "source documents no unsolicited notifications. All responses are"
- "source documents no explicit multi-step sequences. Remove section if not applicable."
- "no voltage/current/power specs in source. No explicit user-safety"
- "Appendix \"Supplementary Information by Command\" not present in source — input terminal hex codes, aspect values, eco mode enums, base model types, and sub-input enums cannot be enumerated."
- "ID1 control ID default and ID2 model code for NP ME331W not stated in source."
- "Valid adjustment ranges for picture/volume/lamp-adjust not stated in source body (runtime-queryable via 060-1)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
