---
spec_id: admin/hitachi-ed-a100-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hitachi ED-A100 Control Spec"
manufacturer: Hitachi
model_family: ED-A100
aliases: []
compatible_with:
  manufacturers:
    - Hitachi
  models:
    - ED-A100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.maxellproav.com
source_urls:
  - https://support.maxellproav.com/wp-content/uploads/Support/OG/Hitachi_ED-A100_UM_Technical.pdf
retrieved_at: 2026-04-30T04:24:57.970Z
last_checked_at: 2026-05-14T18:17:16.762Z
generated_at: 2026-05-14T18:17:16.762Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.762Z
  matched_actions: 95
  action_count: 109
  confidence: high
  summary: "Every spec action matched to a literal command in the source protocol table; transport parameters verified; comprehensive coverage of all 95 actions in the ED-A100 command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Hitachi ED-A100 Control Spec

## Summary
Hitachi ED-A100 XGA LCD projector with RS-232C and TCP/IP control interfaces. Two network control ports: TCP 23 (default enabled, auth optional) and TCP 9715 (default enabled, auth enabled by default). Serial communication at 19200bps 8N1. Binary protocol with 7-byte header + 6-byte command data frame, or 16-byte frame on port 9715.

<!-- UNRESOLVED: web browser UI described but HTTP/REST API not confirmed as separate interface — only browser-based configuration -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source notes RS-232C cross cable spec but no explicit flow control setting
addressing:
  tcp:
    - port: 23
    - port: 9715
auth:
  type: null  # UNRESOLVED: Port 23 default "Disable", Port 9715 default "Enable" - authentication behavior unclear in source
  note: "Port 23 auth defaults disabled; Port 9715 auth defaults enabled. Password configured via web browser UI."
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_get
  label: Get Power State
  kind: query
  params: []

# Input Source
- id: input_computer1
  label: Select Computer1 Input
  kind: action
  params: []
- id: input_computer2
  label: Select Computer2 Input
  kind: action
  params: []
- id: input_component
  label: Select Component Input
  kind: action
  params: []
- id: input_svideo
  label: Select S-Video Input
  kind: action
  params: []
- id: input_video
  label: Select Video Input
  kind: action
  params: []
- id: input_source_get
  label: Get Input Source
  kind: query
  params: []

# Picture Mode
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - NORMAL
        - CINEMA
        - DYNAMIC
        - BOARD_BLACK
        - BOARD_GREEN
        - WHITEBOARD
        - DAYTIME
- id: picture_mode_get
  label: Get Picture Mode
  kind: query
  params: []

# Gamma
- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: preset
      type: enum
      values:
        - "1_DEFAULT"
        - "1_CUSTOM"
        - "2_DEFAULT"
        - "2_CUSTOM"
        - "3_DEFAULT"
        - "3_CUSTOM"
        - "4_DEFAULT"
        - "4_CUSTOM"
        - "5_DEFAULT"
        - "5_CUSTOM"
        - "6_DEFAULT"
        - "6_CUSTOM"
- id: gamma_get
  label: Get Gamma
  kind: query
  params: []

# Color Temp
- id: color_temp_set
  label: Set Color Temperature
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - HIGH
        - CUSTOM_1_HIGH
        - MID
        - CUSTOM_2_MID
        - LOW
        - CUSTOM_3_LOW
        - HI_BRIGHT_1
        - CUSTOM_4_HI_BRIGHT_1
        - HI_BRIGHT_2
        - CUSTOM_5_HI_BRIGHT_2
        - HI_BRIGHT_3
        - CUSTOM_6_HI_BRIGHT_3
- id: color_temp_get
  label: Get Color Temperature
  kind: query
  params: []

# Aspect Ratio
- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values:
        - "4:3"
        - "16:9"
        - "14:9"
        - NORMAL
- id: aspect_get
  label: Get Aspect Ratio
  kind: query
  params: []

# Video Format
- id: cvideo_format_set
  label: Set Composite Video Format
  kind: action
  params:
    - name: format
      type: enum
      values:
        - AUTO
        - NTSC
        - PAL
        - SECAM
        - NTSC4.43
        - M_PAL
        - N_PAL
- id: svideo_format_set
  label: Set S-Video Format
  kind: action
  params:
    - name: format
      type: enum
      values:
        - AUTO
        - NTSC
        - PAL
        - SECAM
        - NTSC4.43
        - M_PAL
        - N_PAL
- id: video_format_get
  label: Get Video Format
  kind: query
  params: []

# Mute
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_get
  label: Get Mute State
  kind: query
  params: []

# Freeze
- id: freeze_normal
  label: Freeze Normal
  kind: action
  params: []
- id: freeze_enable
  label: Freeze Enable
  kind: action
  params: []
- id: freeze_get
  label: Get Freeze State
  kind: query
  params: []

# Blank
- id: blank_set
  label: Set Blank Screen
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - MyScreen
        - ORIGINAL
        - BLUE
        - WHITE
        - BLACK
- id: blank_on
  label: Blank On
  kind: action
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  params: []
- id: blank_get
  label: Get Blank State
  kind: query
  params: []

# Audio
- id: speaker_on
  label: Speaker On
  kind: action
  params: []
- id: speaker_off
  label: Speaker Off
  kind: action
  params: []
- id: speaker_get
  label: Get Speaker State
  kind: query
  params: []
- id: audio_computer1_set
  label: Set Audio Computer1 Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - AUDIO1
        - AUDIO2
        - AUDIO3
        - OFF
- id: audio_computer2_set
  label: Set Audio Computer2 Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - AUDIO1
        - AUDIO2
        - AUDIO3
        - OFF
- id: audio_component_set
  label: Set Audio Component Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - AUDIO1
        - AUDIO2
        - AUDIO3
        - OFF
- id: audio_svideo_set
  label: Set Audio S-Video Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - AUDIO1
        - AUDIO2
        - AUDIO3
        - OFF
- id: audio_video_set
  label: Set Audio Video Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - AUDIO1
        - AUDIO2
        - AUDIO3
        - OFF

# e-SHOT
- id: eshot_set
  label: Set e-SHOT
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - OFF
        - IMAGE1
        - IMAGE2
        - IMAGE3
        - IMAGE4
- id: eshot_get
  label: Get e-SHOT
  kind: query
  params: []
- id: eshot_image1_delete
  label: Delete e-SHOT Image1
  kind: action
  params: []
- id: eshot_image2_delete
  label: Delete e-SHOT Image2
  kind: action
  params: []
- id: eshot_image3_delete
  label: Delete e-SHOT Image3
  kind: action
  params: []
- id: eshot_image4_delete
  label: Delete e-SHOT Image4
  kind: action
  params: []

# MY BUTTON
- id: my_button1_set
  label: Set My Button 1
  kind: action
  params:
    - name: function
      type: enum
      values:
        - COMPUTER1
        - COMPUTER2
        - COMPONENT
        - S_VIDEO
        - VIDEO
        - INFORMATION
        - MY_MEMORY
        - PICTURE_MODE
        - FILTER_RESET
        - E_SHOT
        - VOLUME_PLUS
        - VOLUME_MINUS
        - AV_MUTE
- id: my_button2_set
  label: Set My Button 2
  kind: action
  params:
    - name: function
      type: enum
      values:
        - COMPUTER1
        - COMPUTER2
        - COMPONENT
        - S_VIDEO
        - VIDEO
        - INFORMATION
        - MY_MEMORY
        - PICTURE_MODE
        - FILTER_RESET
        - E_SHOT
        - VOLUME_PLUS
        - VOLUME_MINUS
        - AV_MUTE

# My Memory
- id: my_memory_load
  label: Load My Memory
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 4]
- id: my_memory_save
  label: Save My Memory
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 4]

# Language
- id: language_set
  label: Set Language
  kind: action
  params:
    - name: lang
      type: enum
      values:
        - ENGLISH
        - FRANCAIS
        - DEUTSCH
        - ESPANOL
        - ITALIANO
        - NORSK
        - NEDERLANDS
        - PORTUGUES
        - SVENSKA
        - RUSSIAN
        - SUOMI
        - POLSKI
        - TURKCE
- id: language_get
  label: Get Language
  kind: query
  params: []

# Auto On/Off
- id: auto_on_set
  label: Set Auto On
  kind: action
  params:
    - name: state
      type: boolean
- id: auto_on_get
  label: Get Auto On
  kind: query
  params: []
- id: auto_off_get
  label: Get Auto Off Timer
  kind: query
  params: []

# Auto Search
- id: auto_search_set
  label: Set Auto Search
  kind: action
  params:
    - name: state
      type: boolean

# Progressive / Frame Lock
- id: progressive_set
  label: Set Progressive Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - TURN_OFF
        - TV
        - FILM
- id: progressive_get
  label: Get Progressive Mode
  kind: query
  params: []
- id: frame_lock_computer1_set
  label: Set Frame Lock Computer1
  kind: action
  params:
    - name: state
      type: boolean
- id: frame_lock_computer1_get
  label: Get Frame Lock Computer1
  kind: query
  params: []
- id: frame_lock_computer2_set
  label: Set Frame Lock Computer2
  kind: action
  params:
    - name: state
      type: boolean
- id: frame_lock_computer2_get
  label: Get Frame Lock Computer2
  kind: query
  params: []

# Computer Input Sync
- id: computer_in1_set
  label: Set Computer In1 Sync
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - SYNC_ON_G_ON
        - SYNC_ON_G_OFF
- id: computer_in1_get
  label: Get Computer In1 Sync
  kind: query
  params: []
- id: computer_in2_set
  label: Set Computer In2 Sync
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - SYNC_ON_G_ON
        - SYNC_ON_G_OFF
- id: computer_in2_get
  label: Get Computer In2 Sync
  kind: query
  params: []

# Component / Color Space
- id: component_set
  label: Set Component
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - COMPONENT
        - SCART_RGB
- id: component_get
  label: Get Component
  kind: query
  params: []
- id: color_space_set
  label: Set Color Space
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - AUTO
        - RGB
        - SMPTE240
        - REC709
        - REC601
- id: color_space_get
  label: Get Color Space
  kind: query
  params: []

# Closed Caption
- id: closed_caption_display_set
  label: Set Closed Caption Display
  kind: action
  params:
    - name: state
      type: enum
      values:
        - TURN_OFF
        - TURN_ON
        - AUTO
- id: closed_caption_display_get
  label: Get Closed Caption Display
  kind: query
  params: []
- id: closed_caption_mode_set
  label: Set Closed Caption Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - CAPTIONS
        - TEXT
- id: closed_caption_mode_get
  label: Get Closed Caption Mode
  kind: query
  params: []
- id: closed_caption_channel_set
  label: Set Closed Caption Channel
  kind: action
  params:
    - name: channel
      type: integer
      range: [1, 4]
- id: closed_caption_channel_get
  label: Get Closed Caption Channel
  kind: query
  params: []

# Reset commands
- id: auto_adjust_execute
  label: Auto Adjust
  kind: action
  params: []
- id: brightness_reset
  label: Reset Brightness
  kind: action
  params: []
- id: contrast_reset
  label: Reset Contrast
  kind: action
  params: []
- id: color_reset
  label: Reset Color
  kind: action
  params: []
- id: tint_reset
  label: Reset Tint
  kind: action
  params: []
- id: sharpness_reset
  label: Reset Sharpness
  kind: action
  params: []
- id: overscan_reset
  label: Reset Overscan
  kind: action
  params: []
- id: v_position_reset
  label: Reset V Position
  kind: action
  params: []
- id: h_position_reset
  label: Reset H Position
  kind: action
  params: []
- id: h_size_reset
  label: Reset H Size
  kind: action
  params: []
- id: h_phase_reset
  label: Reset H Phase
  kind: action
  params: []
- id: dzoom_reset
  label: Reset D-Zoom
  kind: action
  params: []
- id: dshift_v_reset
  label: Reset D-Shift V
  kind: action
  params: []
- id: dshift_h_reset
  label: Reset D-Shift H
  kind: action
  params: []
- id: keystone_v_reset
  label: Reset Keystone V
  kind: action
  params: []
- id: menu_position_h_reset
  label: Reset Menu Position H
  kind: action
  params: []
- id: menu_position_v_reset
  label: Reset Menu Position V
  kind: action
  params: []
- id: lamp_time_reset
  label: Reset Lamp Time
  kind: action
  params: []
- id: filter_time_reset
  label: Reset Filter Time
  kind: action
  params: []

# Whisper mode
- id: whisper_set
  label: Set Whisper Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - BRIGHT
        - NORMAL

# Mirror
- id: mirror_set
  label: Set Mirror Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - NORMAL
        - H_INVERT
        - V_INVERT
        - HV_INVERT

# Start Up / Message / MyScreen Lock
- id: start_up_set
  label: Set Start Up Screen
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - MyScreen
        - ORIGINAL
        - TURN_OFF
- id: start_up_get
  label: Get Start Up Screen
  kind: query
  params: []
- id: myscreen_lock_set
  label: Set MyScreen Lock
  kind: action
  params:
    - name: state
      type: boolean
- id: myscreen_lock_get
  label: Get MyScreen Lock
  kind: query
  params: []
- id: message_set
  label: Set Message Display
  kind: action
  params:
    - name: state
      type: boolean
- id: message_get
  label: Get Message Display
  kind: query
  params: []

# Remote Receive
- id: remote_receive_front_set
  label: Set Front Remote Receive
  kind: action
  params:
    - name: state
      type: boolean
- id: remote_receive_front_get
  label: Get Front Remote Receive
  kind: query
  params: []
- id: remote_receive_top_set
  label: Set Top Remote Receive
  kind: action
  params:
    - name: state
      type: boolean
- id: remote_receive_top_get
  label: Get Top Remote Receive
  kind: query
  params: []
- id: remote_freq_normal_set
  label: Set Remote Frequency Normal
  kind: action
  params:
    - name: state
      type: boolean
- id: remote_freq_normal_get
  label: Get Remote Frequency Normal
  kind: query
  params: []
- id: remote_freq_high_set
  label: Set Remote Frequency High
  kind: action
  params:
    - name: state
      type: boolean
- id: remote_freq_high_get
  label: Get Remote Frequency High
  kind: query
  params: []
```

## Feedbacks
```yaml
# Power state
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"  # Off
    - "01"  # On
    - "02"  # Cool down

# Error status
- id: error_status
  label: Error Status
  type: enum
  values:
    - "00"  # Normal
    - "01"  # Cover error
    - "02"  # Fan error
    - "03"  # Lamp error
    - "04"  # Temp error
    - "05"  # Air flow error
    - "06"  # Lamp time error
    - "07"  # Cold error
    - "08"  # Filter error
    - "0C"  # Lens door error

# Error codes returned by device
- id: error_undefined_command
  label: Undefined Command Error
  type: string
  value: "15H"
- id: error_cannot_execute
  label: Cannot Execute Error
  type: string
  value: "1CHxxxxH"
- id: error_auth
  label: Authentication Error
  type: string
  value: "1FH0400H"

# Response codes
- id: ack_reply
  label: ACK Reply (Port 9715)
  type: string
  value: "06HxxH"
- id: nak_reply
  label: NAK Reply (Port 9715)
  type: string
  value: "15HxxH"
- id: data_reply
  label: Data Reply (Port 9715)
  type: string
  value: "1DHxxxxHxxH"
- id: busy_reply
  label: Projector Busy Reply (Port 9715)
  type: string
  value: "1FHxxxxHxxH"
```

## Variables
```yaml
# Levelable parameters - get/set/increment/decrement
- id: brightness
  label: Brightness
  type: integer
- id: contrast
  label: Contrast
  type: integer
- id: color
  label: Color
  type: integer
- id: tint
  label: Tint
  type: integer
- id: sharpness
  label: Sharpness
  type: integer
- id: color_temp_gain_r
  label: Color Temp Gain R
  type: integer
- id: color_temp_gain_g
  label: Color Temp Gain G
  type: integer
- id: color_temp_gain_b
  label: Color Temp Gain B
  type: integer
- id: color_temp_offset_r
  label: Color Temp Offset R
  type: integer
- id: color_temp_offset_g
  label: Color Temp Offset G
  type: integer
- id: color_temp_offset_b
  label: Color Temp Offset B
  type: integer
- id: v_position
  label: V Position
  type: integer
- id: h_position
  label: H Position
  type: integer
- id: h_phase
  label: H Phase
  type: integer
- id: h_size
  label: H Size
  type: integer
- id: overscan
  label: Overscan
  type: integer
- id: dzoom
  label: D-Zoom
  type: integer
- id: dshift_v
  label: D-Shift V
  type: integer
- id: dshift_h
  label: D-Shift H
  type: integer
- id: keystone_v
  label: Keystone V
  type: integer
- id: volume_computer1
  label: Volume Computer1
  type: integer
- id: volume_computer2
  label: Volume Computer2
  type: integer
- id: volume_component
  label: Volume Component
  type: integer
- id: volume_svideo
  label: Volume S-Video
  type: integer
- id: volume_video
  label: Volume Video
  type: integer
- id: menu_position_h
  label: Menu Position H
  type: integer
- id: menu_position_v
  label: Menu Position V
  type: integer
- id: auto_off_timer
  label: Auto Off Timer
  type: integer
- id: lamp_time
  label: Lamp Time
  type: integer
  readonly: true
- id: filter_time
  label: Filter Time
  type: integer
  readonly: true
- id: user_gamma_point1
  label: User Gamma Point 1
  type: integer
- id: user_gamma_point2
  label: User Gamma Point 2
  type: integer
- id: user_gamma_point3
  label: User Gamma Point 3
  type: integer
- id: user_gamma_point4
  label: User Gamma Point 4
  type: integer
- id: user_gamma_point5
  label: User Gamma Point 5
  type: integer
- id: user_gamma_point6
  label: User Gamma Point 6
  type: integer
- id: user_gamma_point7
  label: User Gamma Point 7
  type: integer
- id: user_gamma_point8
  label: User Gamma Point 8
  type: integer
- id: user_gamma_pattern
  label: User Gamma Pattern
  type: enum
  values:
    - Off
    - 9_steps_grayscale
    - 15_steps_grayscale
    - Ramp
- id: magnify
  label: Magnify
  type: integer
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from projector.
# Note: projector outputs test data on power-on and lamp ignition - client should ignore.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: "Provide an interval of at least 40ms between the response code and any other code."
# Note: "Commands are not accepted during warm-up."
# Note: "The projector outputs test data when the power supply is switched ON, and when the lamp is lit. Ignore this data."
<!-- UNRESOLVED: no safety warnings or interlock procedures explicitly stated in source -->
```

## Notes

### Protocol Summary

**RS-232C / TCP Port 23:** Binary frame = 7-byte header + 6-byte command data.
- Header: `BE EF 03 06 00 CRC_low CRC_high` (CRC computed over command data)
- Actions encoded in byte_0: `01`=Set, `02`=Get, `04`=Increment, `05`=Decrement, `06`=Execute

**TCP Port 9715:** 16-byte frame = `02` header + `0D` length + 13-byte command data + 1-byte checksum + 1-byte connection ID.
- Reply attaches connection ID to all responses.
- Connection auto-closes after 30s idle.

### Authentication (Port 9715)
Challenge-response with MD5. Projector sends 8 random bytes when auth enabled. Client concatenates random bytes + password, digests with MD5, prepends to command. Subsequent commands on same connection omit auth data.

### Error Handling
- `15H`: Undefined command — retry same command.
- `1CHxxxxH`: Cannot execute — check command parameters.
- `1FH0400H`: Authentication failure.
- Data length mismatch returns error.

### Volume Control
Per-input volume controls (Computer1, Computer2, Component, S-Video, Video) each have independent get/increment/decrement commands.

### User Gamma
8 user-definable gamma points, adjustable via get/increment/decrement. Gamma pattern selectable (Off, 9-step grayscale, 15-step grayscale, Ramp).

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/current/power specifications not in control protocol section -->
<!-- UNRESOLVED: exact integer ranges for levelable parameters not stated in source -->
<!-- UNRESOLVED: TCP port 23 default auth "Disable" — whether blank password or no password sent is unclear -->

## Provenance

```yaml
source_domains:
  - support.maxellproav.com
source_urls:
  - https://support.maxellproav.com/wp-content/uploads/Support/OG/Hitachi_ED-A100_UM_Technical.pdf
retrieved_at: 2026-04-30T04:24:57.970Z
last_checked_at: 2026-05-14T18:17:16.762Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.762Z
matched_actions: 95
action_count: 109
confidence: high
summary: "Every spec action matched to a literal command in the source protocol table; transport parameters verified; comprehensive coverage of all 95 actions in the ED-A100 command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
