---
spec_id: admin/sharpnec-v864q-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC V864Q Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "V864Q Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "V864Q Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:04:41.155Z
last_checked_at: 2026-06-18T09:14:20.353Z
generated_at: 2026-06-18T09:14:20.353Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model-code (ID2) value for this projector not stated in source; varies by model."
  - "control ID (ID1) configurable value not stated; must match projector setting."
  - "firmware version compatibility not stated in source."
  - "input terminal hex codes (DATA01 of command 018 and others) deferred to \"Supplementary Information by Command\" appendix, which is not present in the refined source."
  - "eco_mode_value enum values deferred to source appendix not present in refined doc."
  - "source documents no unsolicited notifications; device responds only to commands."
  - "no multi-step sequences described in source."
  - "source notes power on/off and cooling periods reject other commands, but states no explicit safety interlock procedures. No voltage/current/power specs present in source."
  - "input-terminal / sub-input / aspect / eco-mode hex code tables live in source appendix \"Supplementary Information by Command\", not included in the refined document."
  - "model code (ID2) for V864Q Avt3 not stated."
  - "default baud rate among the five supported not stated."
  - "wireless LAN unit models and wireless port details not in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:14:20.353Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC V864Q Avt3 Control Spec

## Summary
Professional LCD projector (Sharp/NEC V864Q Avt3) controlled via binary hex frames over RS-232C serial (D-SUB 9P PC CONTROL port) or wired/wireless LAN (TCP). Covers power, input switching, mutes, picture/volume/aspect/gain adjustment, shutter, lens control and memory, status/error/lamp/filter queries, eco mode, PIP/PbP, edge blending, and audio select. Command reference BDT140013 Rev 7.1.

<!-- UNRESOLVED: specific model-code (ID2) value for this projector not stated in source; varies by model. -->
<!-- UNRESOLVED: control ID (ID1) configurable value not stated; must match projector setting. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: input terminal hex codes (DATA01 of command 018 and others) deferred to "Supplementary Information by Command" appendix, which is not present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
auth:
  type: none
```

<!-- Inference: auth.type none — source describes no login/password/auth procedure. -->
<!-- Inference: protocols tcp — source documents LAN connection and states TCP port 7142. -->
<!-- flow_control: UNRESOLVED — source states "Communication mode: Full duplex" (duplexing), not flow-control (hw/sw/none). -->
<!-- Serial cable is cross (null-modem); D-SUB 9P pinout: 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS. -->

## Traits
```yaml
traits:
  - powerable
  - queryable
  - levelable
  - mutable
```

<!-- Inference: powerable — POWER ON/OFF commands present. -->
<!-- Inference: queryable — many status/information request commands present. -->
<!-- Inference: levelable — VOLUME ADJUST and PICTURE ADJUST present. -->
<!-- mutable — picture/sound/onscreen mute and shutter commands present. -->

## Actions
```yaml
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
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal byte (e.g. 06h = video). Full code table in source appendix 'Supplementary Information by Command'."
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
      - name: target
        type: integer
        description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: mode
        type: integer
        description: "00h absolute, 01h relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (DATA03 low, DATA04 high)"
  - id: volume_adjust
    label: Volume Adjust (030-2)
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h absolute, 01h relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (DATA02 low, DATA03 high)"
  - id: aspect_adjust
    label: Aspect Adjust (030-12)
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value byte (code table in source appendix)"
  - id: other_adjust
    label: Other Adjust / Gain (030-15)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: integer
        description: "00h absolute, 01h relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (DATA04 low, DATA05 high)"
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
      - name: lamp
        type: integer
        description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
      - name: content
        type: integer
        description: "01h usage time (sec), 04h remaining life (%)"
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request (037-6)
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: content
        type: integer
        description: "00h total savings, 01h savings during operation"
  - id: remote_key_code
    label: Remote Key Code (050)
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "16-bit key code (DATA01 low, DATA02 high). See source key code list, e.g. 05h=00h AUTO."
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
      - name: target
        type: integer
        description: "06h Periphery Focus"
      - name: drive
        type: integer
        description: "00h stop; 01h/02h/03h drive +1s/+0.5s/+0.25s; 7Fh drive plus; 81h drive minus; FDh/FEh/FFh drive -0.25s/-0.5s/-1s"
  - id: lens_control_request
    label: Lens Control Request (053-1)
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: target
        type: integer
        description: "Lens axis to query"
  - id: lens_control_2
    label: Lens Control 2 (053-2)
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "FFh stop, else lens axis"
      - name: mode
        type: integer
        description: "00h absolute, 02h relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (DATA03 low, DATA04 high)"
  - id: lens_memory_control
    label: Lens Memory Control (053-3)
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control (053-4)
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET (acts on profile from LENS PROFILE SET)"
  - id: lens_memory_option_request
    label: Lens Memory Option Request (053-5)
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  - id: lens_memory_option_set
    label: Lens Memory Option Set (053-6)
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: value
        type: integer
        description: "00h OFF, 01h ON"
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
      - name: profile
        type: integer
        description: "00h Profile 1, 01h Profile 2"
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
      - name: target
        type: integer
        description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
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
      - name: state
        type: integer
        description: "01h freeze on, 02h freeze off"
  - id: information_string_request
    label: Information String Request (084)
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: info_type
        type: integer
        description: "03h horizontal sync frequency, 04h vertical sync frequency"
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
  - id: lan_mac_address_request
    label: LAN MAC Address Status Request 2 (097-155)
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
  - id: pip_pictbypict_request
    label: PIP/Picture by Picture Request (097-198)
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
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
      - name: value
        type: integer
        description: "Eco mode value (code table in source appendix)"
  - id: lan_projector_name_set
    label: LAN Projector Name Set (098-45)
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16)"
  - id: pip_pictbypict_set
    label: PIP/Picture by Picture Set (098-198)
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: value
        type: integer
        description: "Per-target setting value (see source for MODE/position/sub-input enums)"
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set (098-243-1)
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "00h OFF, 01h ON"
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
      - name: input_terminal
        type: integer
        description: "Input terminal byte (code table in source appendix)"
      - name: audio_source
        type: integer
        description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source_query: running_status_request
  - id: picture_mute_state
    type: enum
    values: [off, on]
    source_query: mute_status_request
  - id: sound_mute_state
    type: enum
    values: [off, on]
    source_query: mute_status_request
  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    source_query: mute_status_request
  - id: cover_status
    type: enum
    values: [normal_open, closed]
    source_query: cover_status_request
  - id: eco_mode_value
    type: enum
    values: []
    source_query: eco_mode_request
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source_query: edge_blending_mode_request
  - id: command_error
    type: object
    values: []
    description: "ERR1/ERR2 pair from response frames (see source error code list 2.4)"
```

<!-- UNRESOLVED: eco_mode_value enum values deferred to source appendix not present in refined doc. -->

## Variables
```yaml
variables:
  - id: volume
    type: integer
    writable: true
    action: volume_adjust
  - id: brightness
    type: integer
    writable: true
    action: picture_adjust
  - id: contrast
    type: integer
    writable: true
    action: picture_adjust
  - id: color
    type: integer
    writable: true
    action: picture_adjust
  - id: hue
    type: integer
    writable: true
    action: picture_adjust
  - id: sharpness
    type: integer
    writable: true
    action: picture_adjust
  - id: lamp_usage_time_seconds
    type: integer
    writable: false
    source_query: lamp_information_request_3
  - id: lamp_remaining_life_percent
    type: integer
    writable: false
    source_query: lamp_information_request_3
  - id: filter_usage_time_seconds
    type: integer
    writable: false
    source_query: filter_usage_information_request
  - id: projector_name
    type: string
    writable: true
    action: lan_projector_name_set
```

## Events
```yaml
events: []
```

<!-- UNRESOLVED: source documents no unsolicited notifications; device responds only to commands. -->

## Macros
```yaml
macros: []
```

<!-- UNRESOLVED: no multi-step sequences described in source. -->

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: source notes power on/off and cooling periods reject other commands, but states no explicit safety interlock procedures. No voltage/current/power specs present in source. -->

## Notes
- Commands and responses are binary hex frames. Each frame begins with a header byte (00h-03h command direction, 20h/21h/22h/23h/A0h-A3h response direction) and ends with `<CKS>` checksum.
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **ID1** = control ID set on projector; **ID2** = model code (varies by model). Both appear in every response frame.
- **LEN** = byte length of the DATA part following LEN.
- During POWER ON/OFF (incl. cooling) the projector accepts no other command.
- LENS CONTROL plus/minus drive (`7Fh`/`81h`) must be stopped by sending `00h`; `01h/02h/03h` and `FFh/FEh/FDh` are timed (1s/0.5s/0.25s) and self-stop.
- Signal list numbers returned by INPUT STATUS REQUEST are 1 less than the practical value (add 1).
- Lamp/filter usage times are returned in seconds, updated at one-minute intervals.
- Response error format: `Axh <opcode> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`. Full ERR1/ERR2 table in source §2.4.

<!-- UNRESOLVED: input-terminal / sub-input / aspect / eco-mode hex code tables live in source appendix "Supplementary Information by Command", not included in the refined document. -->
<!-- UNRESOLVED: model code (ID2) for V864Q Avt3 not stated. -->
<!-- UNRESOLVED: default baud rate among the five supported not stated. -->
<!-- UNRESOLVED: wireless LAN unit models and wireless port details not in source. -->
````

Spec above. 53 actions, one per source command row, payloads verbatim. All YAML fences comment-free per format constraint; inferences moved to HTML comments outside fences. No port/baud/flow-control invented — flow_control left null.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:04:41.155Z
last_checked_at: 2026-06-18T09:14:20.353Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:14:20.353Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model-code (ID2) value for this projector not stated in source; varies by model."
- "control ID (ID1) configurable value not stated; must match projector setting."
- "firmware version compatibility not stated in source."
- "input terminal hex codes (DATA01 of command 018 and others) deferred to \"Supplementary Information by Command\" appendix, which is not present in the refined source."
- "eco_mode_value enum values deferred to source appendix not present in refined doc."
- "source documents no unsolicited notifications; device responds only to commands."
- "no multi-step sequences described in source."
- "source notes power on/off and cooling periods reject other commands, but states no explicit safety interlock procedures. No voltage/current/power specs present in source."
- "input-terminal / sub-input / aspect / eco-mode hex code tables live in source appendix \"Supplementary Information by Command\", not included in the refined document."
- "model code (ID2) for V864Q Avt3 not stated."
- "default baud rate among the five supported not stated."
- "wireless LAN unit models and wireless port details not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
