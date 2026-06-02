---
spec_id: admin/extron-matrix-3200-6400-12800-switcher
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron Matrix 3200/6400/12800 Switcher Control Spec"
manufacturer: Extron
model_family: "Matrix 3200 Wideband"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "Matrix 3200 Wideband"
    - "Matrix 6400 Wideband"
    - "Matrix 6400 Lo Res"
    - "Matrix 3200 Lo Res"
    - "Matrix 6400 Sync"
    - "Matrix 3200 Sync"
    - "Matrix 12800"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - manualslib.com
  - portal.7thsense.one
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://www.extron.com/download/files/userman/Matrix_3200-6400_Audio.pdf
  - https://www.manualslib.com/manual/789689/Extron-Electronics-Matrix-3200-Series.html
  - https://www.extron.com/article/tech92
  - https://portal.7thsense.one/medialon-help/mxmExtron6400.html
retrieved_at: 2026-04-30T03:38:46.180Z
last_checked_at: 2026-04-30T14:44:40.236Z
generated_at: 2026-04-30T14:44:40.236Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control not documented — RS-232/RS-422 only"
  - "port number not stated in source"
  - "no explicit multi-step macros documented - device supports"
  - "no explicit safety warnings or interlock procedures in source"
  - "TCP/IP control capability — source documents RS-232/RS-422 only"
  - "firmware version compatibility ranges not stated"
  - "maximum virtual input/output counts vary by model (3200/6400/12800) — source shows up to 64x64 virtual"
verification:
  verdict: verified
  checked_at: 2026-04-30T14:44:40.236Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions matched the source semantically; transport parameters verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Extron Matrix 3200/6400/12800 Switcher Control Spec

## Summary
Extron Matrix Wideband Video/Sync Switcher supporting RS-232/RS-422 serial control. Supports both Simple Instruction Set (SIS) and Advanced Instruction Set (AIS) command modes. Controls video/audio routing, presets, RGB delay, and mute functions. Responses end with CR/LF. No authentication required.

<!-- UNRESOLVED: TCP/IP control not documented — RS-232/RS-422 only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: power state queryable via I command
- routable  # evidenced by output switching commands
- queryable  # evidenced by Q, N, I, V, list commands
- levelable  # evidenced by audio gain/attenuation commands
```

## Actions
```yaml
- id: output_switch_all
  label: Output Switch All
  kind: action
  params:
    - name: output
      type: integer
      description: Virtual output number (01-max)
    - name: input
      type: integer
      description: Virtual input number (00-64, 00=mute)
    - name: plane
      type: string
      const: All

- id: output_switch_rgb
  label: Output Switch RGB
  kind: action
  params:
    - name: output
      type: integer
    - name: input
      type: integer
    - name: plane
      type: string
      const: Vid

- id: output_switch_video
  label: Output Switch Video
  kind: action
  params:
    - name: output
      type: integer
    - name: input
      type: integer
    - name: plane
      type: string
      const: Vid

- id: output_switch_audio
  label: Output Switch Audio
  kind: action
  params:
    - name: output
      type: integer
    - name: input
      type: integer
    - name: plane
      type: string
      const: Aud

- id: output_switch_bme
  label: Output Switch Specific BME
  kind: action
  params:
    - name: output
      type: integer
    - name: input
      type: integer
    - name: bme
      type: integer
      description: BME number (0-5)

- id: preset_save_global
  label: Save Global Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-32, 0=current)

- id: preset_recall_global
  label: Recall Global Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-32)

- id: preset_save_room
  label: Save Room Preset
  kind: action
  params:
    - name: room
      type: integer
      description: Room number (1-10)
    - name: preset
      type: integer
      description: Preset number (0-10)

- id: preset_recall_room
  label: Recall Room Preset
  kind: action
  params:
    - name: room
      type: integer
      description: Room number (1-10)
    - name: preset
      type: integer

- id: rgb_mute
  label: RGB Mute
  kind: action
  params:
    - name: output
      type: integer
      description: Virtual output number (omit for global)

- id: rgb_unmute
  label: RGB Unmute
  kind: action
  params:
    - name: output
      type: integer
      description: Virtual output number (omit for global)

- id: audio_gain_set
  label: Set Audio Gain
  kind: action
  params:
    - name: input
      type: integer
      description: Virtual input number (1-max)
    - name: gain
      type: integer
      description: Gain in dB (0 thru +9)

- id: audio_attenuation_set
  label: Set Audio Attenuation
  kind: action
  params:
    - name: input
      type: integer
    - name: attenuation
      type: integer
      description: Attenuation in dB (1 thru 15)

- id: audio_level_increment
  label: Increment Audio Level
  kind: action
  params:
    - name: input
      type: integer

- id: audio_level_decrement
  label: Decrement Audio Level
  kind: action
  params:
    - name: input
      type: integer

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: output
      type: integer
      description: Virtual output number (omit for global)

- id: audio_unmute
  label: Audio Unmute
  kind: action
  params:
    - name: output
      type: integer
      description: Virtual output number (omit for global)

- id: rgb_delay_set
  label: Set RGB Delay
  kind: action
  params:
    - name: output
      type: integer
    - name: delay
      type: integer
      description: Delay in 0.5 second increments (0-10, max 5.0 seconds)

- id: preset_write_start
  label: Start Write Preset Mode
  kind: action

- id: preset_write_end
  label: End Write Preset Mode
  kind: action

- id: zap_global_presets
  label: Zap All Global Presets and Names
  kind: action

- id: zap_individual_global
  label: Zap Individual Global Preset
  kind: action
  params:
    - name: preset
      type: integer

- id: zap_room_presets
  label: Zap All Room Presets and Names
  kind: action

- id: zap_individual_room
  label: Zap Individual Room Preset
  kind: action
  params:
    - name: room
      type: integer
    - name: preset
      type: integer

- id: zap_rgb_delays
  label: Zap All RGB Delays to 0
  kind: action

- id: zap_audio_gains
  label: Zap All Audio Gains to 0 dB
  kind: action

- id: zap_all_mutes
  label: Unmute RGB/Audio All
  kind: action

- id: factory_master_reset
  label: Factory Master Reset
  kind: action

- id: write_global_preset_name
  label: Write Global Preset Name
  kind: action
  params:
    - name: preset
      type: integer
    - name: name
      type: string
      description: Max 12 alphanumeric chars including "+/-:=" and space

- id: write_room_preset_name
  label: Write Room Preset Name
  kind: action
  params:
    - name: room
      type: integer
    - name: preset
      type: integer
    - name: name
      type: string

- id: write_room_name
  label: Write Room Name
  kind: action
  params:
    - name: room
      type: integer
    - name: name
      type: string

- id: write_virtual_input_name
  label: Write Virtual Input Name
  kind: action
  params:
    - name: input
      type: integer
    - name: name
      type: string

- id: write_virtual_output_name
  label: Write Virtual Output Name
  kind: action
  params:
    - name: output
      type: integer
    - name: name
      type: string
- id: list_room_config
  label: List Room Configuration
  kind: query
  params: []
- id: list_virtual_inputs
  label: List Virtual Inputs
  kind: query
  params: []
- id: list_virtual_outputs
  label: List Virtual Outputs
  kind: query
  params: []
- id: list_remote_keypad
  label: List Remote Keypad
  kind: query
  params: []
- id: list_presets
  label: List Presets
  kind: query
  params: []
- id: query_software_version
  label: Query Software Version
  kind: query
  params:
    - name: bme
      type: integer
- id: request_part_number
  label: Request Part Number
  kind: query
  params:
    - name: bme
      type: integer
- id: request_information
  label: Request Information
  kind: query
  params:
    - name: bme
      type: integer
- id: view_audio_gain
  label: View Audio Gain
  kind: query
  params:
    - name: input
      type: integer
- id: read_rgb_delay
  label: Read RGB Delay
  kind: query
  params:
    - name: output
      type: integer
- id: read_global_preset_name
  label: Read Global Preset Name
  kind: query
  params: []
- id: read_room_preset_name
  label: Read Room Preset Name
  kind: query
  params:
    - name: room
      type: integer
    - name: preset
      type: integer
- id: read_room_name
  label: Read Room Name
  kind: query
  params: []
- id: read_virtual_input_name
  label: Read Virtual Input Name
  kind: query
  params: []
- id: read_virtual_output_name
  label: Read Virtual Output Name
  kind: query
  params: []
- id: query_virtual_output_mutes
  label: Query Virtual Output Mutes
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: output_switch_response
  type: string
  description: Response format for output switching commands

- id: preset_save_response
  type: string
  values: [Spr]

- id: preset_recall_response
  type: string
  values: [Rpr]

- id: rgb_mute_response
  type: string
  values: [Vmt]

- id: audio_mute_response
  type: string
  values: [Amt]

- id: audio_gain_response
  type: string
  description: Format InXX•Aud±XX

- id: error_response
  type: enum
  values:
    - E01  # Invalid input channel
    - E05  # Device off
    - E10  # Invalid command
    - E11  # Invalid preset
    - E12  # Invalid output
    - E13  # Value too large
    - E14  # Command not available for matrix config
    - E17  # Timeout
    - E20  # Invalid BME number
    - E21  # Invalid room number
    - E22  # Busy
    - E23  # Checksum error
```

## Variables
```yaml
- id: firmware_version
  type: string
  description: Firmware version queried via Q/q command
  writable: false

- id: part_number
  type: string
  description: BME part number queried via N/n command
  writable: false

- id: system_info
  type: object
  description: System info queried via I/i command
  properties:
    - name: physical_size
      type: string
      description: Physical input x output (e.g. 64X64)
    - name: switcher_type
      type: integer
      description: 1=Wideband, 2=LoRes, 3=Sync, 4=Audio, 0=BME not present
    - name: bme_count
      type: integer
    - name: virtual_size
      type: string
      description: Virtual input x output
    - name: video_mute
      type: integer
      description: 0=not muted, 1=muted
    - name: audio_mute
      type: integer
      description: 0=not muted, 1=muted
    - name: system_status
      type: integer
      description: Power supply status
    - name: diagnostics
      type: string
      description: Two-digit diagnostics code

- id: audio_gain
  type: integer
  description: Audio gain in dB for a virtual input
  writable: true
  range: [-15, 9]

- id: rgb_delay
  type: number
  description: RGB delay in seconds for a virtual output
  writable: true
  range: [0, 5.0]
  resolution: 0.5

- id: virtual_output_mutes
  type: object
  description: Video and audio mute state per virtual output

- id: global_preset_ties
  type: object
  description: Current routing configuration for global presets

- id: room_preset_ties
  type: object
  description: Current routing configuration for room presets

- id: global_preset_name
  type: string
  writable: true

- id: room_preset_name
  type: string
  writable: true

- id: room_name
  type: string
  writable: true

- id: virtual_input_name
  type: string
  writable: true

- id: virtual_output_name
  type: string
  writable: true
```

## Events
```yaml
- id: reconfig_audio_level_change
  code: RECONFIG00
  description: Audio level change occurred

- id: reconfig_room_preset_change_1
  code: RECONFIG02
  description: Room #1 or room #1 preset name changed

- id: reconfig_room_preset_change_2
  code: RECONFIG03
  description: Room #2 or room #2 preset name changed

- id: reconfig_room_preset_change_3
  code: RECONFIG04
  description: Room #3 or room #3 preset name changed

- id: reconfig_room_preset_change_4
  code: RECONFIG05
  description: Room #4 or room #4 preset name changed

- id: reconfig_room_preset_change_5
  code: RECONFIG06
  description: Room #5 or room #5 preset name changed

- id: reconfig_room_preset_change_6
  code: RECONFIG07
  description: Room #6 or room #6 preset name changed

- id: reconfig_room_preset_change_7
  code: RECONFIG08
  description: Room #7 or room #7 preset name changed

- id: reconfig_room_preset_change_8
  code: RECONFIG09
  description: Room #8 or room #8 preset name changed

- id: reconfig_room_preset_change_9
  code: RECONFIG10
  description: Room #9 or room #9 preset name changed

- id: reconfig_room_preset_change_10
  code: RECONFIG11
  description: Room #10 or room #10 preset name changed

- id: reconfig_global_preset_name_1_16
  code: RECONFIG12
  description: Name changed for global preset #1-16

- id: reconfig_global_preset_name_17_32
  code: RECONFIG13
  description: Name changed for global preset #17-32

- id: reconfig_current_connection
  code: RECONFIG14
  description: Current connection changed

- id: reconfig_virtual_input_name_1_16
  code: RECONFIG17
  description: Name changed for virtual input #1-16

- id: reconfig_virtual_input_name_17_32
  code: RECONFIG18
  description: Name changed for virtual input #17-32

- id: reconfig_virtual_input_name_33_48
  code: RECONFIG19
  description: Name changed for virtual input #33-48

- id: reconfig_virtual_input_name_49_64
  code: RECONFIG20
  description: Name changed for virtual input #49-64

- id: reconfig_virtual_output_name_1_16
  code: RECONFIG21
  description: Name changed for virtual output #1-16

- id: reconfig_virtual_output_name_17_32
  code: RECONFIG22
  description: Name changed for virtual output #17-32

- id: reconfig_virtual_output_name_33_48
  code: RECONFIG23
  description: Name changed for virtual output #33-48

- id: reconfig_virtual_output_name_49_64
  code: RECONFIG24
  description: Name changed for virtual output #49-64

- id: reconfig_individual_mute_change
  code: RECONFIG25
  description: Individual mute changed

- id: reconfig_rgb_sync_delay_change
  code: RECONFIG26
  description: RGB sync delay changed

- id: reconfig_global_preset_saved
  code: RECONFIG34
  description: A global preset was saved

- id: reconfig_room_preset_saved
  code: RECONFIG35
  description: A room preset was saved

- id: reconfig_rgb_delays_initialized
  code: RECONFIG36
  description: All RGB sync delays initialized (zapped to 0)

- id: reconfig_audio_levels_initialized
  code: RECONFIG37
  description: All audio levels initialized (zapped to 0 dB)

- id: reconfig_mutes_initialized
  code: RECONFIG38
  description: All mutes initialized (unmuted)

- id: reconfig_global_mute_change
  code: RECONFIG40
  description: Global mute changed

- id: reconfig_power_supply_status
  code: RECONFIG41
  description: Power supply status changed

- id: reconfig_system_initialized
  code: RECONFIG99
  description: Entire system initialized (master reset)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented - device supports
# Direct Write Mode (P...p) for multi-output preset writes, timing constraints apply:
#   - Write mode: 5 second timeout without activity → error E17
#   - Complete backplane switch: ~60ms after command receipt
#   - Recall after End Write: must wait 100ms minimum
#   - No front panel switching allowed during Start/End write commands
```

## Safety
```yaml
confirmation_required_for:
  - factory_master_reset  # zXXX command performs factory master reset
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
Serial connector: 9-pin D female supporting both RS-232 and RS-422 (pin assignments documented). Default serial config: 9600 baud, 8N1, no flow control.

Two command modes: SIS (Simple Instruction Set) — single/multicharacter commands, no delimiters required; AIS (Advanced Instruction Set) — Escape-prefixed, CR-terminated. All SIS responses end with CR/LF.

Error code E14 indicates command not available for matrix configuration — certain commands require specific input/output matrix sizes.

Power supply status queryable via I command: 0=Off/Dead, 1=No Redundant/Main, 2=Redundant, 3=Has Redundant/Main.

<!-- UNRESOLVED: TCP/IP control capability — source documents RS-232/RS-422 only -->
<!-- UNRESOLVED: port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: maximum virtual input/output counts vary by model (3200/6400/12800) — source shows up to 64x64 virtual -->

## Provenance

```yaml
source_domains:
  - extron.com
  - manualslib.com
  - portal.7thsense.one
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://www.extron.com/download/files/userman/Matrix_3200-6400_Audio.pdf
  - https://www.manualslib.com/manual/789689/Extron-Electronics-Matrix-3200-Series.html
  - https://www.extron.com/article/tech92
  - https://portal.7thsense.one/medialon-help/mxmExtron6400.html
retrieved_at: 2026-04-30T03:38:46.180Z
last_checked_at: 2026-04-30T14:44:40.236Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T14:44:40.236Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions matched the source semantically; transport parameters verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control not documented — RS-232/RS-422 only"
- "port number not stated in source"
- "no explicit multi-step macros documented - device supports"
- "no explicit safety warnings or interlock procedures in source"
- "TCP/IP control capability — source documents RS-232/RS-422 only"
- "firmware version compatibility ranges not stated"
- "maximum virtual input/output counts vary by model (3200/6400/12800) — source shows up to 64x64 virtual"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
