---
spec_id: admin/sharp-nec-pnme552
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pnme552 Control Spec"
manufacturer: Sharp/NEC
model_family: Pnme552
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Pnme552
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:48:41.583Z
last_checked_at: 2026-06-18T09:11:48.329Z
generated_at: 2026-06-18T09:11:48.329Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model name string returned by 078-5 MODEL NAME REQUEST is device-dependent; specific input-terminal value table is referenced to an Appendix (\"Supplementary Information by Command\") not present in this source."
  - "flow control not stated (RTS/CTS pins wired; \"Full duplex\" mode stated only)"
  - "no independent continuous settable variables documented beyond the"
  - "source describes no unsolicited notifications; all responses are"
  - "source describes no explicit multi-step command sequences."
  - "no explicit power-on sequencing requirements or safety warnings"
  - "input-terminal value tables, eco-mode value table, base-model-type values, and sub-input setting values are referenced to an Appendix (\"Supplementary Information by Command\") that is not present in this source file."
  - "firmware version compatibility not stated in source."
  - "flow_control not stated (RTS/CTS pins wired but handshaking use unspecified)."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:11:48.329Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pnme552 Control Spec

## Summary
Sharp/NEC projector controlled via a binary framing protocol over RS-232C serial or TCP/IP LAN (PC CONTROL port / RJ-45). Frames are hex byte sequences terminated by a one-byte checksum (low-order byte of the sum of all preceding bytes). This spec enumerates all 53 commands documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: exact model name string returned by 078-5 MODEL NAME REQUEST is device-dependent; specific input-terminal value table is referenced to an Appendix ("Supplementary Information by Command") not present in this source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (RTS/CTS pins wired; "Full duplex" mode stated only)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON / POWER OFF commands present
  - queryable     # inferred: many REQUEST/STATUS query commands present
  - levelable     # inferred: PICTURE/VOLUME/LAMP adjust commands present
```

## Actions
```yaml
# All frames verbatim from source. Last byte is checksum (CKS) = low byte of sum
# of all preceding bytes. Parameterized bytes shown as {name}.
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
  command: "02h 03h 00h 00h 02h 01h {input_terminal} {checksum}"
  params:
    - name: input_terminal
      type: string
      description: "Input terminal byte (e.g. 06h = video). Full value table in source Appendix 'Supplementary Information by Command'."
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

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
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: string
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: string
      description: "00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_high
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_low} {value_high} {checksum}"
  params:
    - name: mode
      type: string
      description: "00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_high
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect_value} 00h {checksum}"
  params:
    - name: aspect_value
      type: string
      description: "Value set for the aspect (see source Appendix 'Supplementary Information by Command')."
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {target} {data02} {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: string
      description: "DATA01; combined with DATA02 to select adjustment target (e.g. 96h/FFh = LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: string
      description: "DATA02 target sub-selector."
    - name: mode
      type: string
      description: "00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_high
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

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
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (Lamp 2 effective only on two-lamp models)"
    - name: content
      type: string
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {scope} {checksum}"
  params:
    - name: scope
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_low} {key_high} {checksum}"
  params:
    - name: key_low
      type: string
      description: "DATA01 of WORD key code (see key code list, e.g. 05h/00h=AUTO, 06h/00h=MENU)"
    - name: key_high
      type: string
      description: "DATA02 of WORD key code"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

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
  command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
  params:
    - name: target
      type: string
      description: "Lens target (e.g. 06h=Periphery Focus)"
    - name: action
      type: string
      description: "00h=Stop, 01h/02h/03h=drive plus 1s/0.5s/0.25s, 7Fh=drive plus, 81h=drive minus, FDh/FEh/FFh=drive minus 0.25s/0.5s/1s"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: string
      description: "Lens adjustment target byte."
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: string
      description: "Lens target (FFh=Stop)"
    - name: mode
      type: string
      description: "00h=absolute, 02h=relative"
    - name: value_low
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: value_high
      type: integer
      description: "Adjustment value (high-order 8 bits)"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: string
      description: "00h=OFF, 01h=ON"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: string
      description: "00h=Profile 1, 01h=Profile 2"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: string
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

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
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: string
      description: "01h=freeze on, 02h=freeze off"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {info_type} 01h {checksum}"
  params:
    - name: info_type
      type: string
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

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
  command: "03h B0h 00h 00h 02h C5h {target} {checksum}"
  params:
    - name: target
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: string
      description: "Value set for eco mode (see source Appendix 'Supplementary Information by Command')."
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01-16} 00h {checksum}"
  params:
    - name: name_01-16
      type: string
      description: "Projector name bytes DATA01-DATA16 (up to 16 bytes)."
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: pip_pbp_set
  label: PIP/Picture By Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {target} {value} {checksum}"
  params:
    - name: target
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: string
      description: "Setting value (MODE: 00h=PIP, 01h=PBP; START POSITION: 00h-03h corners; sub-input values per Appendix)."
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: string
      description: "00h=OFF, 01h=ON"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."

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
  command: "03h C9h 00h 00h 03h 09h {input_terminal} {value} {checksum}"
  params:
    - name: input_terminal
      type: string
      description: "Input terminal byte (see source Appendix 'Supplementary Information by Command')."
    - name: value
      type: string
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: checksum
      type: string
      description: "CKS = low byte of sum of all preceding bytes."
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "12-byte error bitfield (DATA01-DATA12) returned by 009. Bit=1 indicates error (cover, fan, temperature, lamp, etc.)."

- id: power_status
  type: enum
  values: [standby, power_on]
  description: "DATA03 of 078-2 RUNNING STATUS (00h=Standby, 01h=Power on)."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "DATA06 of 078-2 (00h/04h/05h/06h/0Fh/10h)."

- id: mute_status
  type: composite
  description: "078-4 returns picture/sound/onscreen mute + onscreen display flags (DATA01-DATA05)."

- id: input_signal_status
  type: composite
  description: "078-3 returns signal list number, selection signal type, content displayed."

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "078-6 (00h=Normal/open, 01h=Closed)."

- id: lamp_info
  type: composite
  description: "037-4 returns lamp usage time (s) and remaining life (%)."

- id: filter_info
  type: composite
  description: "037-3 returns filter usage time (s) and filter alarm start time (s)."

- id: eco_mode
  type: raw
  description: "097-8 returns eco/light/lamp mode value (see source Appendix)."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "097-243-1 (00h=OFF, 01h=ON)."

- id: command_ack
  type: enum
  values: [success, error]
  description: "Adjustment commands (030-*) return 0000h=success / other=error in DATA01-DATA02."
```

## Variables
```yaml
# UNRESOLVED: no independent continuous settable variables documented beyond the
# parameterized adjust actions in Actions. Volume/picture/lamp levels are set
# via the 030-* adjust actions, not standalone variables.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are
# command-acknowledgement replies.
```

## Macros
```yaml
# UNRESOLVED: source describes no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: while powering on, no other command is accepted."
  - "016 POWER OFF: while powering off (including cooling time), no other command is accepted."
  - "009 ERROR STATUS: interlock switch open (DATA09 Bit1) reported as extended status error."
# UNRESOLVED: no explicit power-on sequencing requirements or safety warnings
# beyond command-acceptance interlocks stated in source.
```

## Notes
- Protocol is binary hex frames; final byte is always the checksum (CKS) computed as the low-order byte of the sum of all preceding bytes (per source §2.2). Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Response framing: success replies begin with `2Xh` (echo of command MSB + 20h), errors begin with `AXh` and carry ERR1/ERR2 codes (source §2.3, §2.4).
- Lamp/filter usage times are returned in one-second units but updated at one-minute intervals.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port; LAN uses TCP port 7142 over wired or wireless LAN.

<!-- UNRESOLVED: input-terminal value tables, eco-mode value table, base-model-type values, and sub-input setting values are referenced to an Appendix ("Supplementary Information by Command") that is not present in this source file. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: flow_control not stated (RTS/CTS pins wired but handshaking use unspecified). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:48:41.583Z
last_checked_at: 2026-06-18T09:11:48.329Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:11:48.329Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model name string returned by 078-5 MODEL NAME REQUEST is device-dependent; specific input-terminal value table is referenced to an Appendix (\"Supplementary Information by Command\") not present in this source."
- "flow control not stated (RTS/CTS pins wired; \"Full duplex\" mode stated only)"
- "no independent continuous settable variables documented beyond the"
- "source describes no unsolicited notifications; all responses are"
- "source describes no explicit multi-step command sequences."
- "no explicit power-on sequencing requirements or safety warnings"
- "input-terminal value tables, eco-mode value table, base-model-type values, and sub-input setting values are referenced to an Appendix (\"Supplementary Information by Command\") that is not present in this source file."
- "firmware version compatibility not stated in source."
- "flow_control not stated (RTS/CTS pins wired but handshaking use unspecified)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
