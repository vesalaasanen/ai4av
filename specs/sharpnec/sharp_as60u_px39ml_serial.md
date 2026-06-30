---
spec_id: admin/sharp-nec-as60u-px39ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC AS60U PX39ML Control Spec"
manufacturer: Sharp/NEC
model_family: "AS60U PX39ML"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "AS60U PX39ML"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:32:04.511Z
last_checked_at: 2026-06-17T19:34:36.534Z
generated_at: 2026-06-17T19:34:36.534Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific input terminal value map and several per-command value maps are referenced to an \"Appendix / Supplementary Information by Command\" that is not present in the source text. flow_control value not explicitly stated. firmware version compatibility not stated."
  - "source lists \"Full duplex\" communication mode and wires RTS/CTS pins but does not state a flow-control setting"
  - "detailed feedback schema for each query response not fully enumerated"
  - "numeric ranges for eco mode / aspect / input terminal value maps deferred to Appendix not present in source."
  - "no push/event mechanism stated in source"
  - "no multi-step sequences explicitly described in source"
  - "no safety-critical interlock procedures present in source"
  - "ID2 model code for AS60U PX39ML not stated. Appendix value maps (input terminal, aspect, eco mode, sub input, base model type) not present in source. flow_control not stated. firmware version compatibility not stated. protocol/binary spec revision (BDT140013 Rev 7.1) noted but per-model applicability unconfirmed."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:34:36.534Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source; each hex opcode matches verbatim with command details; transport parameters confirmed in source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC AS60U PX39ML Control Spec

## Summary
Control spec for the Sharp/NEC AS60U PX39ML projector over RS-232C serial and wired/wireless LAN (TCP). Binary command protocol using hex byte frames with a trailing additive checksum (low-order byte). Covers power, input switching, mute, picture/volume/aspect adjustment, lens control and memory, status queries, and eco/PIP/edge-blending settings.

<!-- UNRESOLVED: model-specific input terminal value map and several per-command value maps are referenced to an "Appendix / Supplementary Information by Command" that is not present in the source text. flow_control value not explicitly stated. firmware version compatibility not stated. -->

## Transport
```yaml
# Source documents BOTH RS-232C serial (PC CONTROL port, D-SUB 9P) and LAN (TCP port 7142).
# Command frames are identical byte sequences across both transports.
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source: selectable baud rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source lists "Full duplex" communication mode and wires RTS/CTS pins but does not state a flow-control setting
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable       # inferred: many *REQUEST commands returning values present
  - levelable       # inferred: picture/volume/gain/lens adjustment commands present
  - routable        # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
# All 54 command-bearing entries from the source command list (section 2) are
# enumerated, each carrying its verbatim hex payload. Parameterized commands
# show the variable DATA bytes. CKS = checksum (low-order byte of the sum of all
# preceding bytes). ID1 = control ID set on projector; ID2 = model code.
actions:
  - id: error_status_request
    label: 009. ERROR STATUS REQUEST
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    # Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>; DATA01-12 carry bit-mapped error info.

  - id: power_on
    label: 015. POWER ON
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    # During power-on no other command accepted. Response: 22h 00h <ID1> <ID2> 00h <CKS>.

  - id: power_off
    label: 016. POWER OFF
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    # During power-off (incl. cooling) no other command accepted. Response: 22h 01h <ID1> <ID2> 00h <CKS>.

  - id: input_sw_change
    label: 018. INPUT SW CHANGE
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Input terminal value (see Appendix "Supplementary Information by Command"; example 06h = video port)
    # Response DATA01 FFh = ended with error (no signal switch).

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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
      - name: DATA02
        type: byte
        description: Adjustment mode (00h=absolute, 01h=relative)
      - name: DATA03
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: 030-2. VOLUME ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment mode (00h=absolute, 01h=relative)
      - name: DATA02
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: 030-12. ASPECT ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Value set for the aspect (see Appendix "Supplementary Information by Command")

  - id: other_adjust
    label: 030-15. OTHER ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment target high byte (96h with DATA02 FFh = LAMP ADJUST / LIGHT ADJUST)
      - name: DATA02
        type: byte
        description: Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)
      - name: DATA03
        type: byte
        description: Adjustment mode (00h=absolute, 01h=relative)
      - name: DATA04
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: 037. INFORMATION REQUEST
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    # Response DATA01-49 projector name; DATA83-86 lamp usage seconds; DATA87-90 filter usage seconds.

  - id: filter_usage_information_request
    label: 037-3. FILTER USAGE INFORMATION REQUEST
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    # Response DATA01-04 filter usage seconds; DATA05-08 filter alarm start seconds (-1 if undefined).

  - id: lamp_information_request_3
    label: 037-4. LAMP INFORMATION REQUEST 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Lamp selector (00h=Lamp 1, 01h=Lamp 2 [two-lamp models only])
      - name: DATA02
        type: byte
        description: Content (01h=lamp usage time seconds, 04h=lamp remaining life %)

  - id: carbon_savings_information_request
    label: 037-6. CARBON SAVINGS INFORMATION REQUEST
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Content (00h=Total Carbon Savings, 01h=Carbon Savings during operation)

  - id: remote_key_code
    label: 050. REMOTE KEY CODE
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Key code low byte (see key code list; e.g. 05h=AUTO, 29h=PICTURE, 4Bh=COMPUTER1)
      - name: DATA02
        type: byte
        description: Key code high byte (00h for all listed keys)

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment target (06h=Periphery Focus)
      - name: DATA02
        type: byte
        description: Content (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s)

  - id: lens_control_request
    label: 053-1. LENS CONTROL REQUEST
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjustment target
    # Response DATA02-07 carry upper/lower/current adjustment range values.

  - id: lens_control_2
    label: 053-2. LENS CONTROL 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Target (FFh=Stop, otherwise adjustment target)
      - name: DATA02
        type: byte
        description: Adjustment mode (00h=absolute, 02h=relative)
      - name: DATA03
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: 053-3. LENS MEMORY CONTROL
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

  - id: reference_lens_memory_control
    label: 053-4. REFERENCE LENS MEMORY CONTROL
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Operation (00h=MOVE, 01h=STORE, 02h=RESET); acts on profile set via 053-10

  - id: lens_memory_option_request
    label: 053-5. LENS MEMORY OPTION REQUEST
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    # Response DATA02 carries setting value (00h=OFF, 01h=ON).

  - id: lens_memory_option_set
    label: 053-6. LENS MEMORY OPTION SET
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
      - name: DATA02
        type: byte
        description: Setting value (00h=OFF, 01h=ON)

  - id: lens_information_request
    label: 053-7. LENS INFORMATION REQUEST
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    # Response DATA01 bit-mapped lens operation status (lens memory/zoom/focus/lens shift H/V).

  - id: lens_profile_set
    label: 053-10. LENS PROFILE SET
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Profile number (00h=Profile 1, 01h=Profile 2)

  - id: lens_profile_request
    label: 053-11. LENS PROFILE REQUEST
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: 060-1. GAIN PARAMETER REQUEST 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)

  - id: setting_request
    label: 078-1. SETTING REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    # Response DATA01-03 base model type; DATA04 sound function; DATA05 profile/timer function.

  - id: running_status_request
    label: 078-2. RUNNING STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    # Response DATA03 power status; DATA04 cooling; DATA05 power on/off process; DATA06 operation status.

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
    # Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display.

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
    # Response DATA01 (00h=Normal/cover opened, 01h=Cover closed).

  - id: freeze_control
    label: 079. FREEZE CONTROL
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: 01h=freeze on, 02h=freeze off

  - id: information_string_request
    label: 084. INFORMATION STRING REQUEST
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)

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
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)

  - id: edge_blending_mode_request
    label: 097-243-1. EDGE BLENDING MODE REQUEST
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: 098-8. ECO MODE SET
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Value set for the eco mode (see Appendix "Supplementary Information by Command")

  - id: lan_projector_name_set
    label: 098-45. LAN PROJECTOR NAME SET
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: DATA01-16
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated)

  - id: pip_picture_by_picture_set
    label: 098-198. PIP/PICTURE BY PICTURE SET
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
      - name: DATA02
        type: byte
        description: Setting value (mode: 00h=PIP, 01h=PICTURE BY PICTURE; start position: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub input values per Appendix)

  - id: edge_blending_mode_set
    label: 098-243-1. EDGE BLENDING MODE SET
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Setting value (00h=OFF, 01h=ON)

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
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Input terminal (see Appendix "Supplementary Information by Command")
      - name: DATA02
        type: byte
        description: Setting value (00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)
```

## Feedbacks
```yaml
# Responses to query commands above (ack frames use Axh lead byte; success frames 2xh).
# Common error response shape: A{x}h {cmd} <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
feedbacks:
  - id: command_error
    type: enum
    description: Error response returned when command execution fails; ERR1/ERR2 encode the cause (see error code list, e.g. 00h/00h=unrecognized, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Eh=execution failed)
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]  # from 078-2 DATA03/DATA06 and 305-3 DATA01
  - id: mute_state
    type: object
    description: Picture/sound/onscreen/forced-onscreen mute flags from 078-4 response
  # UNRESOLVED: detailed feedback schema for each query response not fully enumerated
```

## Variables
```yaml
# Settable parameters exposed via dedicated SET / ADJUST actions (not discrete actions).
# See Actions: eco_mode_set, lan_projector_name_set, pip_picture_by_picture_set,
# edge_blending_mode_set, audio_select_set, volume_adjust, picture_adjust,
# aspect_adjust, other_adjust, lens_profile_set, lens_memory_option_set.
# UNRESOLVED: numeric ranges for eco mode / aspect / input terminal value maps deferred to Appendix not present in source.
```

## Events
```yaml
# Source documents request/response only; no unsolicited notification frames described.
# UNRESOLVED: no push/event mechanism stated in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: POWER ON / POWER OFF block all other commands during the transition
# (including cooling time). This is a behavioral constraint, not an interlock sequence.
# No explicit safety warnings, interlock procedures, or power-on sequencing
# requirements are documented in the source text.
# UNRESOLVED: no safety-critical interlock procedures present in source
```

## Notes
- Command frame format: lead byte (00h-03h request / 20h-23h success response / A0h-A3h error response), command byte, ID1 (control ID), ID2 (model code), LEN, DATA bytes, CKS. Example checksum: `20h 81h 01h 60h 01h 00h` → sum = 103h → CKS = 03h.
- ID1 uses the projector's configured control ID; ID2 varies by model and is not stated for the AS60U PX39ML in this source.
- Many value maps (input terminal values, aspect values, eco mode values, sub input values, base model types) are deferred by the source to an Appendix ("Supplementary Information by Command") that is not included in this refined document.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port; LAN uses RJ-45 (10/100 Mbps auto-sensing, IEEE 802.3 / 802.3u). Wireless LAN requires a separate wireless LAN unit (see its operation manual).

<!-- UNRESOLVED: ID2 model code for AS60U PX39ML not stated. Appendix value maps (input terminal, aspect, eco mode, sub input, base model type) not present in source. flow_control not stated. firmware version compatibility not stated. protocol/binary spec revision (BDT140013 Rev 7.1) noted but per-model applicability unconfirmed. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:32:04.511Z
last_checked_at: 2026-06-17T19:34:36.534Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:34:36.534Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source; each hex opcode matches verbatim with command details; transport parameters confirmed in source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific input terminal value map and several per-command value maps are referenced to an \"Appendix / Supplementary Information by Command\" that is not present in the source text. flow_control value not explicitly stated. firmware version compatibility not stated."
- "source lists \"Full duplex\" communication mode and wires RTS/CTS pins but does not state a flow-control setting"
- "detailed feedback schema for each query response not fully enumerated"
- "numeric ranges for eco mode / aspect / input terminal value maps deferred to Appendix not present in source."
- "no push/event mechanism stated in source"
- "no multi-step sequences explicitly described in source"
- "no safety-critical interlock procedures present in source"
- "ID2 model code for AS60U PX39ML not stated. Appendix value maps (input terminal, aspect, eco mode, sub input, base model type) not present in source. flow_control not stated. firmware version compatibility not stated. protocol/binary spec revision (BDT140013 Rev 7.1) noted but per-model applicability unconfirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
