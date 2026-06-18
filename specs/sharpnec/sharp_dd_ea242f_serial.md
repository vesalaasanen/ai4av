---
spec_id: admin/sharp-nec-dd-ea242f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Dd Ea242F Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Dd Ea242F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Dd Ea242F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:18:41.757Z
last_checked_at: 2026-06-17T19:42:01.618Z
generated_at: 2026-06-17T19:42:01.618Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the model name \"Dd Ea242F\" is taken from the input context; the source manual is a generic projector command reference and does not name a specific model. Firmware version compatibility not stated. Input-terminal value tables and several setting-value enumerations are deferred to an Appendix (\"Supplementary Information by Command\") not present in the refined source."
  - "flow control not stated in communication conditions table"
  - "numeric ranges not fixed in source (device-reported at runtime)."
  - "none applicable."
  - "source documents no explicit multi-step command sequences."
  - "no power-on sequencing voltage/current specs in source."
  - "firmware version compatibility not stated in source."
  - "model name \"Dd Ea242F\" not literally present in source manual (generic projector reference); confirm exact model string."
  - "flow_control for serial not stated in communication conditions table."
  - "Appendix value enumerations (input terminal, aspect, eco mode, base model type, sub input) not available in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:42:01.618Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source commands verbatim; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Dd Ea242F Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control. The source is the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands are binary hex-framed: `<b1> <b2> 00h 00h <LEN> [DATA...] <CKS>` for commands, with responses prefixed `2xh` (success) or `Axh` (error) and carrying `<ID1> <ID2>` plus `<ERR1> <ERR2>` on failure.

<!-- UNRESOLVED: the model name "Dd Ea242F" is taken from the input context; the source manual is a generic projector command reference and does not name a specific model. Firmware version compatibility not stated. Input-terminal value tables and several setting-value enumerations are deferred to an Appendix ("Supplementary Information by Command") not present in the refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for command send/receive (stated in source)
serial:
  baud_rate: 115200  # source lists selectable rates: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in communication conditions table
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable    # inferred: POWER ON / POWER OFF commands present
- queryable    # inferred: numerous status/information request commands present
- levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST (brightness/contrast/etc.), lens position adjust
```

## Actions
```yaml
# All command payloads are verbatim hex bytes from the source. CKS = low-order
# one byte of the sum of all preceding bytes (per source checksum rule).
# Response frames: success = 20h/21h/22h/23h <ID1> <ID2> <LEN> [DATA] <CKS>;
# error = A0h/A1h/A2h/A3h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.

- id: error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: 015. POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: 016. POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal value (e.g. 06h = video port; full list in Appendix 'Supplementary Information by Command')"

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Aspect value (see Appendix 'Supplementary Information by Command')"

- id: other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target high byte (with DATA02); source shows 96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: string
      description: "Adjustment target low byte (with DATA01); FFh for LAMP/LIGHT ADJUST"
    - name: DATA03
      type: string
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lamp: 00h Lamp 1, 01h Lamp 2 (Lamp 2 effective only on two-lamp models)"
    - name: DATA02
      type: string
      description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"

- id: carbon_savings_information_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (WORD type); see key code list (e.g. 02h=POWER ON, 05h=AUTO, 06h=MENU)"
    - name: DATA02
      type: string
      description: "Key code high byte (WORD type); 00h for all listed keys"

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target; 06h = Periphery Focus"
    - name: DATA02
      type: string
      description: "00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +, 81h drive -, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s"

- id: lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target (as in 053 LENS CONTROL)"

- id: lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lens target; FFh = Stop"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: string
      description: "Setting value: 00h OFF, 01h ON"

- id: lens_information_request
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"

- id: setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

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

- id: freeze_control
  label: 079. FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: 084. INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Information type: 03h Horizontal sync frequency, 04h Vertical sync frequency"

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

- id: lan_mac_address_status_request_2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Eco mode value (see Appendix 'Supplementary Information by Command')"

- id: lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} - {DATA16} 00h {CKS}"
  params:
    - name: DATA01-DATA16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (mode: 00h PIP/01h PbP; start position: 00h TOP-LEFT..03h BOTTOM-RIGHT; sub input value per Appendix)"

- id: edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h OFF, 01h ON"

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
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal (value list in Appendix 'Supplementary Information by Command')"
    - name: DATA02
      type: string
      description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Success response frame: <2xh> <ID1> <ID2> <LEN> [DATA...] <CKS>
# Error response frame:   <Axh> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1/ERR2 code pairs documented in source "2.4 Error code list".

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: 078-2 RUNNING STATUS REQUEST / 305-3 BASIC INFORMATION REQUEST (DATA03 / DATA01)

- id: error_status
  type: bitmap
  source: 009 ERROR STATUS REQUEST (DATA01-DATA12 bit fields: cover, fan, temperature, power, lamp off, lamp replacement, formatter, FPGA, mirror cover, interlock switch, system error, iris calibration, lens not installed, etc.)

- id: mute_status
  type: composite
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  source: 078-4 MUTE STATUS REQUEST

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: 078-6 COVER STATUS REQUEST

- id: lamp_info
  type: composite
  values: [lamp_usage_time_seconds, lamp_remaining_life_percent]
  source: 037-4 LAMP INFORMATION REQUEST 3

- id: input_status
  type: composite
  values: [signal_switch_process, signal_list_number, selection_signal_type, signal_list_type, test_pattern_display, content_displayed]
  source: 078-3 INPUT STATUS REQUEST

- id: lens_operation_status
  type: bitmap
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
  source: 053-7 LENS INFORMATION REQUEST
```

## Variables
```yaml
# Settable continuous/level parameters (set via the *_ADJUST and SET commands above):
# - picture_brightness / contrast / color / hue / sharpness  (030-1 PICTURE ADJUST)
# - sound_volume                                            (030-2 VOLUME ADJUST)
# - aspect                                                  (030-12 ASPECT ADJUST)
# - lamp_adjust / light_adjust                              (030-15 OTHER ADJUST)
# - lens_position                                           (053 / 053-2 LENS CONTROL)
# - eco_mode                                                (098-8 ECO MODE SET)
# - projector_name                                          (098-45 LAN PROJECTOR NAME SET)
# - pip_pbp_mode / start_position / sub_input               (098-198 PIP/PbP SET)
# - edge_blending_mode                                      (098-243-1 EDGE BLENDING MODE SET)
# Ranges/units returned dynamically via 060-1 GAIN PARAMETER REQUEST 3.
# UNRESOLVED: numeric ranges not fixed in source (device-reported at runtime).
```

## Events
```yaml
# Source documents no unsolicited notifications. Device only responds to commands.
# UNRESOLVED: none applicable.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command can be accepted."
  - "While POWER OFF is executing (including cooling time), no other command can be accepted."
  - "Picture/Sound/Onscreen mute auto-clear on input terminal switch or video signal switch (sound mute also clears on volume adjustment)."
  - "ERR2 0Dh: command rejected because power is off."
  - "ERR2 0Fh: no authority for the operation."
# UNRESOLVED: no power-on sequencing voltage/current specs in source.
```

## Notes
- Binary framing: command bytes use leading opcodes `00h-03h`; success responses use `20h-23h` (matching opcode + 20h); error responses use `A0h-A3h`. `ID1` = control ID of projector, `ID2` = model code (varies by model); commands send `00h 00h` for these.
- Checksum (CKS) = low-order one byte of the sum of all preceding bytes. Example: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- Serial cable is a cross (null-modem) cable wired to the PC CONTROL D-SUB 9P port (pinout in source). LAN: RJ-45 10/100 Mbps auto-sensing, TCP port 7142. Wireless LAN requires a separate wireless LAN unit (see its manual).
- Lamp/filter usage times update at one-minute intervals though reported in one-second units. Negative remaining-life % indicates lamp replacement deadline exceeded.
- Input-terminal values, aspect values, eco-mode values, base-model-type values, and sub-input values are defined in the source's Appendix "Supplementary Information by Command", which is not present in the refined source text.
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: model name "Dd Ea242F" not literally present in source manual (generic projector reference); confirm exact model string. -->
<!-- UNRESOLVED: flow_control for serial not stated in communication conditions table. -->
<!-- UNRESOLVED: Appendix value enumerations (input terminal, aspect, eco mode, base model type, sub input) not available in refined source. -->
````

Spec done. 53 actions, all rows covered. UNRESOLVED markers on gaps (flow control, firmware, appendix enums, model-name confirm).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:18:41.757Z
last_checked_at: 2026-06-17T19:42:01.618Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:42:01.618Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source commands verbatim; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the model name \"Dd Ea242F\" is taken from the input context; the source manual is a generic projector command reference and does not name a specific model. Firmware version compatibility not stated. Input-terminal value tables and several setting-value enumerations are deferred to an Appendix (\"Supplementary Information by Command\") not present in the refined source."
- "flow control not stated in communication conditions table"
- "numeric ranges not fixed in source (device-reported at runtime)."
- "none applicable."
- "source documents no explicit multi-step command sequences."
- "no power-on sequencing voltage/current specs in source."
- "firmware version compatibility not stated in source."
- "model name \"Dd Ea242F\" not literally present in source manual (generic projector reference); confirm exact model string."
- "flow_control for serial not stated in communication conditions table."
- "Appendix value enumerations (input terminal, aspect, eco mode, base model type, sub input) not available in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
