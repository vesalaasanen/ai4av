---
spec_id: admin/sharpnec-ma551-ir
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma551 Ir Control Spec"
manufacturer: Sharp/NEC
model_family: "Ma551 Ir"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ma551 Ir"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:07:01.080Z
last_checked_at: 2026-06-18T08:27:11.710Z
generated_at: 2026-06-18T08:27:11.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact model code (ID2) value for Ma551 Ir not stated in this excerpt"
  - "source states \"Full duplex\" communication mode but no flow_control value"
  - "response payload schemas for many requests are documented in source"
  - "bounds returned dynamically by 060-1 GAIN PARAMETER REQUEST 3"
  - "values per Appendix \"Supplementary Information by Command\" not in source excerpt"
  - "none expected from this source."
  - "model code (ID2) value for Ma551 Ir not present in this excerpt"
  - "Appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables — those enumeration tables are not in this refined source"
  - "factory-default baud rate not stated (multiple values supported)"
  - "firmware version compatibility not stated"
  - "gain adjustment bounds not statically defined (returned dynamically by 060-1)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:27:11.710Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ma551 Ir Control Spec

## Summary
Projector control spec for the Sharp/NEC Ma551 Ir, derived from the vendor "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device supports RS-232C serial control and TCP/IP LAN control (wired/wireless) on port 7142. Commands are binary hex frames with a control ID, model code, data length, data bytes, and a trailing additive checksum byte.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model code (ID2) value for Ma551 Ir not stated in this excerpt -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default unresolved
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but no flow_control value
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from 015 POWER ON / 016 POWER OFF commands
  - queryable     # inferred from many status request commands
  - levelable     # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - routable      # inferred from 018 INPUT SW CHANGE
```

## Actions
```yaml
# All command frames use the form:
#   <CMD1> <CMD2> <ID1> <ID2> <LEN> <DATA...> <CKS>
# where ID1 = control ID set on projector, ID2 = model code (varies by model),
# and CKS = additive checksum (low-order byte of sum of all preceding bytes).
# Each action's `command:` field shows the literal payload bytes verbatim from
# the source, with <ID1>/<ID2>/<CKS> left as placeholders to be computed at
# runtime, and variable DATA fields shown as placeholders.

- id: cmd_009_error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  response: "20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>"

- id: cmd_015_power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  response: "22h 00h <ID1> <ID2> 00h <CKS>"

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  response: "22h 01h <ID1> <ID2> 00h <CKS>"

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (see Appendix "Supplementary Information by Command"). Example 06h = video port.
  response: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: cmd_020_picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  response: "22h 10h <ID1> <ID2> 00h <CKS>"

- id: cmd_021_picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []
  response: "22h 11h <ID1> <ID2> 00h <CKS>"

- id: cmd_022_sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  response: "22h 12h <ID1> <ID2> 00h <CKS>"

- id: cmd_023_sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []
  response: "22h 13h <ID1> <ID2> 00h <CKS>"

- id: cmd_024_onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  response: "22h 14h <ID1> <ID2> 00h <CKS>"

- id: cmd_025_onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []
  response: "22h 15h <ID1> <ID2> 00h <CKS>"

- id: cmd_030_1_picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)
  response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)
  response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command")
  response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: FFh for LAMP/LIGHT ADJUST target
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)
  response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  response: "23h 8Ah <ID1> <ID2> 62h <DATA01> - <DATA98> <CKS>"

- id: cmd_037_3_filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  response: "23h 95h <ID1> <ID2> 08h <DATA01> - <DATA08> <CKS>"

- id: cmd_037_4_lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
  response: "23h 96h <ID1> <ID2> 06h <DATA01> - <DATA06> <CKS>"

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  response: "23h 9Ah <ID1> <ID2> 09h <DATA01> - <DATA09> <CKS>"

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See Key code list, e.g. 05h=AUTO, 06h=MENU, 07h=UP, 29h=PICTURE, 4Bh=COMPUTER1."
    - name: DATA02
      type: integer
      description: Key code high byte (typically 00h)
  response: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>"

- id: cmd_051_shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  response: "22h 16h <ID1> <ID2> 00h <CKS>"

- id: cmd_052_shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  response: "22h 17h <ID1> <ID2> 00h <CKS>"

- id: cmd_053_lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "06h=Periphery Focus (other values per Appendix)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  response: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens adjustment target identifier
  response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02> - <DATA07> <CKS>"

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop; otherwise adjustment target identifier"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)
  response: "22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  response: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  response: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
  response: "23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
  response: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_053_11_lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  response: "23h 05h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"

- id: cmd_078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  response: "20h 85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"

- id: cmd_078_2_running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"

- id: cmd_078_3_input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"

- id: cmd_078_4_mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  response: "20h 85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"

- id: cmd_078_5_model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  response: "20h 85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"

- id: cmd_078_6_cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: cmd_079_freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"
  response: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02> - <DATA??> <CKS>"

- id: cmd_097_8_eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01> - <DATA17> <CKS>"

- id: cmd_097_155_lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01> - <DATA06> <CKS>"

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"

- id: cmd_098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command")
  response: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA
      type: string
      description: Projector name bytes (up to 16 bytes)
  response: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01; e.g. MODE: 00h=PIP, 01h=PiP-by-PiP; START POSITION: 00h..03h corners; sub input values per Appendix)"
  response: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
  response: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"

- id: cmd_305_1_base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  response: "20h BFh <ID1> <ID2> 10h 00h <DATA01> - <DATA15> <CKS>"

- id: cmd_305_2_serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01> - <DATA16> <CKS>"

- id: cmd_305_3_basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  response: "20h BFh <ID1> <ID2> 10h 02h <DATA01> - <DATA15> <CKS>"

- id: cmd_319_10_audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command")
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  response: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"
```

## Feedbacks
```yaml
# Each query command above returns a structured response. Key state feedbacks:
- id: fb_power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA03/DATA06; 305-3 BASIC INFORMATION REQUEST DATA01
- id: fb_input_signal
  type: composite
  source: 078-3 INPUT STATUS REQUEST; 305-3 DATA03/DATA04
- id: fb_mute_state
  type: composite
  source: 078-4 MUTE STATUS REQUEST (picture/sound/onscreen/forced OSD)
- id: fb_error_status
  type: bitmask
  source: 009 ERROR STATUS REQUEST DATA01-DATA12
- id: fb_cover_status
  type: enum
  values: [normal_open, cover_closed]
  source: 078-6 COVER STATUS REQUEST
- id: fb_freeze_state
  type: enum
  values: [off, on]
  source: 305-3 BASIC INFORMATION REQUEST DATA09
- id: fb_lamp_info
  type: composite
  source: 037-4 LAMP INFORMATION REQUEST 3 (usage seconds, remaining life %)
- id: fb_filter_info
  type: composite
  source: 037-3 FILTER USAGE INFORMATION REQUEST (usage seconds, alarm start time)
- id: fb_lens_operation
  type: bitmask
  source: 053-7 LENS INFORMATION REQUEST DATA01 (lens memory/zoom/focus/shift status)
# UNRESOLVED: response payload schemas for many requests are documented in source
# but require runtime device values (e.g. model name, serial number strings).
```

## Variables
```yaml
# Settable parameters surfaced through non-discrete actions:
- id: var_brightness
  type: integer
  range: null  # UNRESOLVED: bounds returned dynamically by 060-1 GAIN PARAMETER REQUEST 3
  set_via: cmd_030_1_picture_adjust (DATA01=00h)
- id: var_contrast
  type: integer
  range: null  # UNRESOLVED
  set_via: cmd_030_1_picture_adjust (DATA01=01h)
- id: var_color
  type: integer
  range: null  # UNRESOLVED
  set_via: cmd_030_1_picture_adjust (DATA01=02h)
- id: var_hue
  type: integer
  range: null  # UNRESOLVED
  set_via: cmd_030_1_picture_adjust (DATA01=03h)
- id: var_sharpness
  type: integer
  range: null  # UNRESOLVED
  set_via: cmd_030_1_picture_adjust (DATA01=04h)
- id: var_volume
  type: integer
  range: null  # UNRESOLVED
  set_via: cmd_030_2_volume_adjust
- id: var_lamp_adjust
  type: integer
  range: null  # UNRESOLVED
  set_via: cmd_030_15_other_adjust (DATA01=96h, DATA02=FFh)
- id: var_eco_mode
  type: enum
  values: null  # UNRESOLVED: values per Appendix "Supplementary Information by Command" not in source excerpt
  set_via: cmd_098_8_eco_mode_set
- id: var_projector_name
  type: string
  max_length: 16
  set_via: cmd_098_45_lan_projector_name_set
```

## Events
```yaml
# Source documents no unsolicited notifications - all data is request/response.
# UNRESOLVED: none expected from this source.
```

## Macros
```yaml
# Source documents no explicit multi-step sequences.
# UNRESOLVED: none expected from this source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    note: "While POWER ON is executing, no other command can be accepted (source §3.2)."
  - command: cmd_016_power_off
    note: "While POWER OFF is executing (including cooling time), no other command can be accepted (source §3.3)."
  - command: cmd_053_lens_control
    note: "To stop continuous lens drive (DATA02=7Fh/81h), send DATA02=00h (source §3.22)."
  - bit: extended_status_interlock
    note: "Error status DATA09 Bit1 indicates interlock switch open (source §3.1)."
# No explicit power-on sequencing warnings or safety voltages stated in excerpt.
```

## Notes
- **Checksum**: For every frame, CKS = low-order byte of the sum of all preceding bytes (source §2.2). Example given: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- **Frame structure**: `CMD1 CMD2 ID1 ID2 LEN DATA… CKS`. CMD1 high nibble identifies direction (`0`=request group prefix, `2`=success response, `A`=error response). ID1 is the projector's configured control ID; ID2 is the model code (model-specific, value not stated in this excerpt).
- **Error responses**: Format `A{cmd1}h {cmd2}h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`. Full ERR1/ERR2 code table in source §2.4 (e.g. `02h 0Dh` = command rejected because power is off; `02h 0Fh` = no authority for operation).
- **Lamp/filter usage** is reported in seconds but updated at one-minute intervals (§3.15, §3.17).
- **Two-lamp models only**: `01h` (Lamp 2) selector in 037-4 is effective only on two-lamp projectors.
- **Timing**: baud rate is selectable among 4800/9600/19200/38400/115200 bps; the source does not state a factory default, so `baud_rate: 115200` above is one valid value, not the canonical default.

<!-- UNRESOLVED: model code (ID2) value for Ma551 Ir not present in this excerpt -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables — those enumeration tables are not in this refined source -->
<!-- UNRESOLVED: factory-default baud rate not stated (multiple values supported) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: gain adjustment bounds not statically defined (returned dynamically by 060-1) -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:07:01.080Z
last_checked_at: 2026-06-18T08:27:11.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:27:11.710Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact model code (ID2) value for Ma551 Ir not stated in this excerpt"
- "source states \"Full duplex\" communication mode but no flow_control value"
- "response payload schemas for many requests are documented in source"
- "bounds returned dynamically by 060-1 GAIN PARAMETER REQUEST 3"
- "values per Appendix \"Supplementary Information by Command\" not in source excerpt"
- "none expected from this source."
- "model code (ID2) value for Ma551 Ir not present in this excerpt"
- "Appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input value tables — those enumeration tables are not in this refined source"
- "factory-default baud rate not stated (multiple values supported)"
- "firmware version compatibility not stated"
- "gain adjustment bounds not statically defined (returned dynamically by 060-1)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
