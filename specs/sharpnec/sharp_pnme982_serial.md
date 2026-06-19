---
spec_id: admin/sharp-nec-pnme982
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pnme982 Control Spec"
manufacturer: Sharp/NEC
model_family: Pnme982
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Pnme982
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:36:52.150Z
last_checked_at: 2026-06-18T09:12:54.400Z
generated_at: 2026-06-18T09:12:54.400Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source = generic projector command ref, NOT model-specific Pnme982 datasheet. Verify all commands apply to Pnme982. Eco/aspect/input-terminal enum values reference \"Supplementary Information by Command\" appendix NOT present in source."
  - "many enum value sets (input terminal, eco mode, aspect, sub-input) reference appendix not present in source"
  - "confirm no async event push in source"
  - "no explicit safety warnings / power-on sequencing beyond command-lock noted in source"
  - "ID2 model code for Pnme982 not stated in source."
  - "input-terminal / aspect / eco-mode / sub-input enum value tables live in \"Supplementary Information by Command\" appendix NOT included in refined source."
  - "source = generic Sharp/NEC projector command ref (BDT140013 Rev 7.1). No Pnme982-specific confirmation; some commands may not apply to this large-format display model."
  - "default baud rate among the 5 supported not stated."
  - "voltage/power/fault-recovery specs not in this control doc."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:12:54.400Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pnme982 Control Spec

## Summary
Sharp/NEC projector control spec. RS-232C serial + wired/wireless LAN (TCP). Binary protocol, hex bytes, frame = header + ID1 + ID2 + LEN + DATA + checksum. Source = BDT140013 Rev 7.1 (Projector Control Command Reference). Covers power, input switch, mute, picture/volume/aspect adjust, lens control + memory, status queries, network/eco/edge-blend config.

<!-- UNRESOLVED: source = generic projector command ref, NOT model-specific Pnme982 datasheet. Verify all commands apply to Pnme982. Eco/aspect/input-terminal enum values reference "Supplementary Information by Command" appendix NOT present in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 4800/9600/19200/38400/115200; 9600 = common default but exact default UNRESOLVED
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "D-SUB 9P (PC CONTROL): 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS"
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # POWER ON/OFF cmds present
  - queryable      # many status REQUEST cmds present
  - routable       # INPUT SW CHANGE present
  - levelable      # PICTURE/VOLUME/OTHER ADJUST present
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
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
      type: string
      description: "Input terminal hex. Example: 06h=video port. Full enum in appendix not in source."
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
      type: string
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: string
      description: "00h=absolute, 01h=relative"
    - name: DATA03
      type: string
      description: "Adjustment value low 8 bits"
    - name: DATA04
      type: string
      description: "Adjustment value high 8 bits"
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=absolute, 01h=relative"
    - name: DATA02
      type: string
      description: "Value low 8 bits"
    - name: DATA03
      type: string
      description: "Value high 8 bits"
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Aspect value hex. Enum in appendix not in source."
- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "96h for LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: string
      description: "FFh (per source)"
    - name: DATA03
      type: string
      description: "00h=absolute, 01h=relative"
    - name: DATA04
      type: string
      description: "Value low 8 bits"
    - name: DATA05
      type: string
      description: "Value high 8 bits"
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
      type: string
      description: "00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: DATA02
      type: string
      description: "01h=usage time(sec), 04h=remaining life(%)"
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=Total, 01h=during operation"
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (WORD type)"
    - name: DATA02
      type: string
      description: "Key code high byte. See key code list in source."
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
      type: string
      description: "06h=Periphery Focus"
    - name: DATA02
      type: string
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+, 81h=-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens axis identifier"
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "FFh=Stop, else lens axis"
    - name: DATA02
      type: string
      description: "00h=absolute, 02h=relative"
    - name: DATA03
      type: string
      description: "Value low 8 bits"
    - name: DATA04
      type: string
      description: "Value high 8 bits"
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: string
      description: "00h=OFF, 01h=ON"
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"
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
      type: string
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light"
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
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "01h=ON, 02h=OFF"
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
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
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Eco mode value. Enum in appendix not in source."
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes"
- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (enum varies by DATA01; sub-input values in appendix not in source)"
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=OFF, 01h=ON"
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
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal. Enum in appendix not in source."
    - name: DATA02
      type: string
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "12-byte error info bitmap (DATA01-DATA12). Bit=1 => error."
- id: lamp_usage_time
  type: integer
  unit: seconds
- id: filter_usage_time
  type: integer
  unit: seconds
- id: lamp_remaining_life
  type: integer
  unit: percent
- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_sleep_power_saving, network_standby]
- id: picture_mute
  type: enum
  values: [off, on]
- id: sound_mute
  type: enum
  values: [off, on]
- id: onscreen_mute
  type: enum
  values: [off, on]
- id: forced_onscreen_mute
  type: enum
  values: [off, on]
- id: freeze_status
  type: enum
  values: [off, on]
- id: cover_status
  type: enum
  values: [normal_opened, closed]
- id: lens_operation_status
  type: bitmask
  description: "Lens memory, zoom, focus, lens shift H/V operation bits"
- id: eco_mode_value
  type: string
  description: "Enum in appendix not in source"
- id: edge_blending_mode
  type: enum
  values: [off, on]
- id: response_ack
  type: enum
  description: "Per-command response: 2xh header (success) or Axh header (error w/ ERR1+ERR2)"
# UNRESOLVED: many enum value sets (input terminal, eco mode, aspect, sub-input) reference appendix not present in source
```

## Variables
```yaml
- id: projector_name
  type: string
  max_length: 16
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
- id: picture_brightness
  type: integer
  description: "Range via GAIN PARAMETER REQUEST 3"
- id: picture_contrast
  type: integer
- id: picture_color
  type: integer
- id: picture_hue
  type: integer
- id: picture_sharpness
  type: integer
- id: volume
  type: integer
- id: lamp_light_adjust
  type: integer
```

## Events
```yaml
# No unsolicited notifications documented. Device replies only to commands.
# UNRESOLVED: confirm no async event push in source
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while turning on, no other command accepted"
  - "POWER OFF: while turning off (incl cooling time), no other command accepted"
# UNRESOLVED: no explicit safety warnings / power-on sequencing beyond command-lock noted in source
```

## Notes
Binary protocol. Frame layout: `[Header] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Header byte encodes direction + cmd group: `0xh`=request/get, `2xh`=ack-success, `3xh`=set-success-extended, `Axh`=error response. ID1=control ID set on projector; ID2=model code (varies by model). Checksum = low byte of sum of all preceding bytes.

Power + cooling lock commands — do not flood during transitions. Lamp/filter usage updated at 1-minute intervals though stored in 1-second units. Lamp remaining life goes negative past replacement deadline.

`{CKS}` placeholders = computed checksum byte (must be calculated by implementer per formula above). `{ID1}`/`{ID2}` = device-set identifiers, not fixed.

<!-- UNRESOLVED: ID2 model code for Pnme982 not stated in source. -->
<!-- UNRESOLVED: input-terminal / aspect / eco-mode / sub-input enum value tables live in "Supplementary Information by Command" appendix NOT included in refined source. -->
<!-- UNRESOLVED: source = generic Sharp/NEC projector command ref (BDT140013 Rev 7.1). No Pnme982-specific confirmation; some commands may not apply to this large-format display model. -->
<!-- UNRESOLVED: default baud rate among the 5 supported not stated. -->
<!-- UNRESOLVED: voltage/power/fault-recovery specs not in this control doc. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:36:52.150Z
last_checked_at: 2026-06-18T09:12:54.400Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:12:54.400Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source = generic projector command ref, NOT model-specific Pnme982 datasheet. Verify all commands apply to Pnme982. Eco/aspect/input-terminal enum values reference \"Supplementary Information by Command\" appendix NOT present in source."
- "many enum value sets (input terminal, eco mode, aspect, sub-input) reference appendix not present in source"
- "confirm no async event push in source"
- "no explicit safety warnings / power-on sequencing beyond command-lock noted in source"
- "ID2 model code for Pnme982 not stated in source."
- "input-terminal / aspect / eco-mode / sub-input enum value tables live in \"Supplementary Information by Command\" appendix NOT included in refined source."
- "source = generic Sharp/NEC projector command ref (BDT140013 Rev 7.1). No Pnme982-specific confirmation; some commands may not apply to this large-format display model."
- "default baud rate among the 5 supported not stated."
- "voltage/power/fault-recovery specs not in this control doc."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
