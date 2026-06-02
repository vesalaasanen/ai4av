---
spec_id: admin/arcam-av860
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AV860 Control Spec"
manufacturer: Arcam
model_family: AV860
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - AV860
    - AVR390
    - AVR550
    - AVR850
    - SR250
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:47.446Z
last_checked_at: 2026-06-02T17:21:16.517Z
generated_at: 2026-06-02T17:21:16.517Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility not stated"
  - "variables are implicitly covered by parameterized actions above"
  - "no multi-step sequences explicitly documented in source"
  - "no explicit safety interlock procedures documented in source"
  - "firmware version compatibility not stated in source"
  - "maximum concurrent connection count not stated"
  - "DAB commands reference AVR450/750 models — applicability to AV860 unclear"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:16.517Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions matched to source command codes with correct opcodes; transport verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Arcam AV860 Control Spec

## Summary
Arcam AV860 and related AVR-series audio/video receivers with RS-232 and IP control. Binary protocol using `<St><Zn><Cc><Dl><Data><Et>` framing (start 0x21, end 0x0D). Supports two zones, power, volume, mute, source selection, decode mode queries, equalisation, tuner control, network playback status, and RC5 IR command simulation.

<!-- UNRESOLVED: exact firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 50000  # IP control port stated in source
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off/standby commands
- queryable    # extensive query commands for state
- levelable    # volume, treble, bass, balance, sub trim, lipsync
- routable     # source selection, video input selection
```

## Actions
```yaml
# === SYSTEM COMMANDS ===

- id: power_query
  label: Request Power State
  kind: query
  command: "0x21 {zone} 0x00 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number (0x01=Zone1, 0x02=Zone2)"

- id: display_brightness_query
  label: Request Display Brightness
  kind: query
  command: "0x21 {zone} 0x01 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: headphones_query
  label: Request Headphone Status
  kind: query
  command: "0x21 {zone} 0x02 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: fm_genre_query
  label: Request FM Genre
  kind: query
  command: "0x21 {zone} 0x03 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: software_version_query
  label: Request Software Version
  kind: query
  command: "0x21 0x01 0x04 0x01 {component} 0x0D"
  params:
    - name: component
      type: integer
      description: "0xF0=RS232 version, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP"

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []

- id: save_restore_settings
  label: Save/Restore Secure Settings Copy
  kind: action
  command: "0x21 0x01 0x06 0x07 {operation} 0x55 0x55 {pin1} {pin2} {pin3} {pin4} 0x0D"
  params:
    - name: operation
      type: integer
      description: "0x00=Save, 0x01=Restore"
    - name: pin1
      type: integer
      description: "Pin digit 1"
    - name: pin2
      type: integer
      description: "Pin digit 2"
    - name: pin3
      type: integer
      description: "Pin digit 3"
    - name: pin4
      type: integer
      description: "Pin digit 4"

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  command: "0x21 {zone} 0x08 0x02 {system_code} {command_code} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: system_code
      type: integer
      description: "RC5 system code"
    - name: command_code
      type: integer
      description: "RC5 command code"

- id: display_info_type_set
  label: Set Display Information Type
  kind: action
  command: "0x21 {zone} 0x09 0x01 {display_type} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: display_type
      type: integer
      description: "0x00=Processing mode, 0xE0=Cycle, 0xF0=Request current, 0x01-0x05 source-specific info"

- id: request_current_source
  label: Request Current Source
  kind: query
  command: "0x21 {zone} 0x1D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: headphone_override
  label: Headphone Override
  kind: action
  command: "0x21 {zone} 0x1F 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: state
      type: integer
      description: "0x00=Clear (speakers muted with headphones), 0x01=Set (speakers unmuted)"

# === INPUT COMMANDS ===

- id: video_selection_set
  label: Set Video Input
  kind: action
  command: "0x21 {zone} 0x0A 0x01 {source} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: source
      type: integer
      description: "0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=Request current"

- id: video_selection_query
  label: Request Video Input
  kind: query
  command: "0x21 {zone} 0x0A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: select_analogue_digital
  label: Select Analogue/Digital Audio
  kind: action
  command: "0x21 {zone} 0x0B 0x01 {audio_type} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: audio_type
      type: integer
      description: "0x00=Analogue, 0x01=Digital, 0x02=HDMI, 0xF0=Request current"

# === OUTPUT COMMANDS ===

- id: set_volume
  label: Set Volume
  kind: action
  command: "0x21 {zone} 0x0D 0x01 {level} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: level
      type: integer
      description: "0x00(0)-0x63(99) volume level, 0xF0=Request current"

- id: request_volume
  label: Request Volume
  kind: query
  command: "0x21 {zone} 0x0D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: request_mute_status
  label: Request Mute Status
  kind: query
  command: "0x21 {zone} 0x0E 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: request_direct_mode
  label: Request Direct Mode Status
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []

- id: request_decode_mode_2ch
  label: Request Decode Mode 2ch
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []

- id: request_decode_mode_mch
  label: Request Decode Mode MCH
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []

- id: request_rds_info
  label: Request RDS Information
  kind: query
  command: "0x21 {zone} 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: request_video_output_resolution
  label: Request Video Output Resolution
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  params: []

# === MENU COMMANDS ===

- id: request_menu_status
  label: Request Menu Status
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  params: []

- id: request_tuner_preset
  label: Request/Set Tuner Preset
  kind: action
  command: "0x21 {zone} 0x15 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) preset number, 0xF0=Request current"

- id: tune
  label: Tune Frequency
  kind: action
  command: "0x21 {zone} 0x16 0x01 {direction} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: direction
      type: integer
      description: "0x00=Decrement, 0x01=Increment, 0xF0=Request current frequency"

- id: request_dab_station
  label: Request DAB Station
  kind: query
  command: "0x21 {zone} 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: request_dab_genre
  label: Request DAB Programme Type
  kind: query
  command: "0x21 {zone} 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: request_dls_pdt
  label: Request DLS/PDT Info
  kind: query
  command: "0x21 {zone} 0x1A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: request_preset_details
  label: Request Preset Details
  kind: query
  command: "0x21 {zone} 0x1B 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) preset number"

- id: network_playback_status
  label: Request Network Playback Status
  kind: query
  command: "0x21 {zone} 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: imax_enhanced_set
  label: Set IMAX Enhanced
  kind: action
  command: "0x21 {zone} 0x0C 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: state
      type: integer
      description: "0xF0=Request, 0xF1=Auto, 0xF2=On, 0xF3=Off"

- id: imax_enhanced_query
  label: Request IMAX Enhanced State
  kind: query
  command: "0x21 {zone} 0x0C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

# === SETUP ADJUSTMENT COMMANDS ===

- id: treble_eq_set
  label: Set Treble Equalisation
  kind: action
  command: "0x21 {zone} 0x35 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00-0x0C=0 to +12dB, 0x81-0x8C=-1 to -12dB, 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: bass_eq_set
  label: Set Bass Equalisation
  kind: action
  command: "0x21 {zone} 0x36 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00-0x0C=0 to +12dB, 0x81-0x8C=-1 to -12dB, 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: room_eq_set
  label: Set Room Equalisation
  kind: action
  command: "0x21 {zone} 0x37 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: state
      type: integer
      description: "0xF0=Request, 0xF1=On, 0xF2=Off"

- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  command: "0x21 {zone} 0x38 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On, 0xF0=Request current"

- id: dolby_leveller_set
  label: Set Dolby Leveller
  kind: action
  command: "0x21 {zone} 0x39 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00-0x0A=0-10, 0xF0=Request, 0xF1=Increment, 0xF2=Decrement, 0xFF=Off"

- id: dolby_volume_calibration_offset_set
  label: Set Dolby Volume Calibration Offset
  kind: action
  command: "0x21 {zone} 0x3A 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00-0x0F=0-15dB, 0x80-0x8F=-1 to -15dB, 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: balance_set
  label: Set Balance
  kind: action
  command: "0x21 {zone} 0x3B 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00-0x06=0-6, 0x81-0x86=-1 to -6, 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: subwoofer_trim_set
  label: Set Subwoofer Trim
  kind: action
  command: "0x21 {zone} 0x3F 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00-0x14=positive in 0.5dB steps, 0x81-0x94=negative in 0.5dB steps, 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: lipsync_delay_set
  label: Set Lipsync Delay
  kind: action
  command: "0x21 {zone} 0x40 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00-0x32=delay in 5ms steps, 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: compression_set
  label: Set Dynamic Range Compression
  kind: action
  command: "0x21 {zone} 0x41 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00=Off, 0x01=Medium, 0x02=High, 0xF0=Request"

- id: request_video_params
  label: Request Incoming Video Parameters
  kind: query
  command: "0x21 {zone} 0x42 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: request_audio_format
  label: Request Incoming Audio Format
  kind: query
  command: "0x21 {zone} 0x43 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: request_audio_sample_rate
  label: Request Incoming Audio Sample Rate
  kind: query
  command: "0x21 {zone} 0x44 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"

- id: sub_stereo_trim_set
  label: Set Sub Stereo Trim
  kind: action
  command: "0x21 {zone} 0x45 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: value
      type: integer
      description: "0x00=0dB, 0x81-0x94=-0.5 to -10dB in 0.5dB steps, 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: zone1_osd_set
  label: Set Zone 1 OSD On/Off
  kind: action
  command: "0x21 0x01 0x4E 0x01 {state} 0x0D"
  params:
    - name: state
      type: integer
      description: "0xF0=Request, 0xF1=On, 0xF2=Off"

- id: video_output_switching_set
  label: Set HDMI Video Output
  kind: action
  command: "0x21 0x01 0x4F 0x01 {output} 0x0D"
  params:
    - name: output
      type: integer
      description: "0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1&2, 0xF0=Request current"

- id: set_input_name
  label: Set/Request Input Name
  kind: action
  command: "0x21 0x01 0x20 {length} {name_ascii} 0x0D"
  params:
    - name: length
      type: integer
      description: "0x01 for query, or character count (max 10) for setting"
    - name: name_ascii
      type: string
      description: "Input name in ASCII (max 10 chars), or 0xF0 for query"

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  command: "0x21 0x01 0x23 0x01 {direction} 0x0D"
  params:
    - name: direction
      type: integer
      description: "0x01=Scan up, 0x02=Scan down"

- id: dab_scan
  label: DAB Scan
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  params: []

- id: heartbeat
  label: Heartbeat
  kind: action
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  params: []

- id: reboot
  label: Reboot Unit
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []

- id: amx_device_discovery
  label: AMX Duet Device Discovery
  kind: query
  command: "AMX\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  description: "Response to power query (0x00). Data: 0x00=standby, 0x01=on"

- id: display_brightness
  type: enum
  values: [off, L1, L2]
  description: "Response to display brightness query (0x01). Data: 0x00=off, 0x01=L1, 0x02=L2"

- id: headphone_status
  type: enum
  values: [not_connected, connected]
  description: "Response to headphone query (0x02). Data: 0x00=not connected, 0x01=connected"

- id: answer_code
  type: enum
  values: [status_update, zone_invalid, command_not_recognised, parameter_not_recognised, command_invalid_now, invalid_data_length]
  description: "Answer codes in responses: 0x00=OK, 0x82-0x86 errors"

- id: source_state
  type: enum
  values: [follow_zone1, CD, BD, AV, SAT, PVR, VCR, AUX, DISPLAY, FM, DAB, NET, USB, STB, GAME]
  description: "Current source response (0x1D)"

- id: volume_level
  type: integer
  values: [0, 99]
  description: "Volume level 0-99 (0x00-0x63)"

- id: mute_state
  type: enum
  values: [muted, not_muted]
  description: "Mute status (0x0E). 0x00=muted, 0x01=not muted"

- id: direct_mode_state
  type: enum
  values: [off, on]
  description: "Direct mode status (0x0F). 0x00=off, 0x01=on"

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, 5_7ch_stereo, dts_neural_x, dts_virtual_x]
  description: "2ch decode mode (0x10)"

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, dts_virtual_x]
  description: "MCH decode mode (0x11)"

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
  description: "Video output resolution (0x13)"

- id: menu_status
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  description: "Open menu state (0x14)"

- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy]
  description: "Network playback status (0x1C). 0x00=navigating, 0x01=playing, 0x02=paused, 0xFF=busy"

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  description: "IMAX Enhanced state (0x0C). 0x00=off, 0x01=on, 0x02=auto"

- id: audio_format
  type: enum
  values: [PCM, analogue_direct, dolby_digital, dolby_digital_ex, dolby_digital_surround, dolby_digital_plus, dolby_digital_true_hd, DTS, DTS_96_24, DTS_ES_matrix, DTS_ES_discrete, DTS_ES_matrix_96_24, DTS_ES_discrete_96_24, DTS_HD_master_audio, DTS_HD_high_res, DTS_low_bitrate, DTS_core, PCM_zero, unsupported, undetected, dolby_atmos, DTS_X, IMAX_ENHANCED]
  description: "Incoming audio format (0x43)"

- id: audio_channel_config
  type: enum
  values: [dual_mono, centre_only, stereo_only, stereo_mono_surround, stereo_surround_LR, stereo_surround_LR_mono_back, stereo_surround_LR_back_LR, stereo_surround_LR_matrix_back_LR, stereo_centre, stereo_centre_mono_surround, stereo_centre_surround_LR, stereo_centre_surround_LR_mono_back, stereo_centre_surround_LR_back_LR, stereo_centre_surround_LR_matrix_back_LR, stereo_downmix_LtRt, stereo_only_LoRo]
  description: "Audio channel configuration (0x43 Data2)"

- id: audio_sample_rate
  type: enum
  values: [32kHz, 44_1kHz, 48kHz, 88_2kHz, 96kHz, 176_4kHz, 192kHz, unknown, undetected]
  description: "Incoming audio sample rate (0x44)"

- id: compression_state
  type: enum
  values: [off, medium, high]
  description: "Compression setting (0x41)"

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  description: "Room EQ state (0x37). 0x00=off, 0x01=on, 0x02=not calculated"

- id: dolby_volume_state
  type: enum
  values: [off, on]
  description: "Dolby Volume state (0x38)"

- id: zone1_osd_state
  type: enum
  values: [on, off]
  description: "Zone 1 OSD state (0x4E). 0x00=On, 0x01=Off"
```

## Variables
```yaml
# UNRESOLVED: variables are implicitly covered by parameterized actions above
```

## Events
```yaml
# Device sends unsolicited status updates when state changes from front panel or IR input.
# Any state change (volume, source, decode mode, display brightness) is relayed to RC.
# No explicit event subscription mechanism documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # requires 0xAA 0xAA confirmation pattern
  - save_restore_settings     # requires 0x55 0x55 confirmation + PIN
  - reboot                    # sends literal "REBOOT" ASCII as confirmation
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- Binary protocol: all commands use `<0x21><Zone><CC><Dl><Data><0x0D>` framing.
- Zone 1 = 0x01 (master), Zone 2 = 0x02.
- Commands 0xF0-0xFF reserved for test functions — must not be used.
- Response format includes answer code: `<0x21><Zone><CC><Ac><Dl><Data><0x0D>`.
- Answer codes: 0x00=OK, 0x82=zone invalid, 0x83=command not recognised, 0x84=parameter not recognised, 0x85=command invalid now (e.g. OSD showing), 0x86=invalid data length.
- AV responds within 3 seconds. RC may send further commands before response received.
- RC5 IR simulation (0x08) enables any IR function via serial/IP. Full RC5 code table documented.
- Control disabled by default — enable via front panel (hold DIRECT 4s) or OSD menu.
- IP control port 50000.
- AMX Duet discovery: send "AMX\r" to get device class/make/model/revision.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum concurrent connection count not stated -->
<!-- UNRESOLVED: DAB commands reference AVR450/750 models — applicability to AV860 unclear -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:47.446Z
last_checked_at: 2026-06-02T17:21:16.517Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:16.517Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions matched to source command codes with correct opcodes; transport verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility not stated"
- "variables are implicitly covered by parameterized actions above"
- "no multi-step sequences explicitly documented in source"
- "no explicit safety interlock procedures documented in source"
- "firmware version compatibility not stated in source"
- "maximum concurrent connection count not stated"
- "DAB commands reference AVR450/750 models — applicability to AV860 unclear"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
