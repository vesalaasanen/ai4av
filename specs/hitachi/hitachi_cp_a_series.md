---
spec_id: admin/hitachi-cp-a-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hitachi CP-A Series Control Spec"
manufacturer: Hitachi
model_family: CP-A100
aliases: []
compatible_with:
  manufacturers:
    - Hitachi
  models:
    - CP-A100
    - CP-A200
    - CP-A52
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.maxellproav.com
  - applicationmarket.crestron.com
source_urls:
  - https://support.maxellproav.com/wp-content/uploads/Support/OG/Hitachi_CP-A100_UM_Technical.pdf
  - https://applicationmarket.crestron.com/content/Help/Hitachi/hitachi_cp-a100_v1_0_help.pdf
retrieved_at: 2026-10-07T13:51:04.101Z
last_checked_at: 2026-10-07T13:51:04.101Z
generated_at: 2026-10-07T13:51:04.101Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "CP-A52 model family membership inferred from Crestron module; not directly confirmed in source"
  - "projector internal setup values readable via Get command;"
  - "projector sends test data when power is switched on and when"
  - "no explicit interlock or safety sequencing procedure in source."
  - "precise type code values for variables other than power/input/brightness/contrast — source provides hex command frames but no semantic type code mapping beyond examples shown in command table"
  - "Port1 (TCP #23) authentication procedure — the source says authentication can be enabled and is disabled by default, but does not specify its procedure."
  - "Lamp hour alarm threshold, filter replacement interval — not in source"
  - "CP-A52 model confirmed via Crestron module; source document does not confirm this model."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:51:04.101Z
  matched_actions: 161
  action_count: 161
  confidence: medium
  summary: "All 161 units map to source commands and transport supported; generic volume_* overlap volume_source_* (many-to-one). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Hitachi CP-A Series Control Spec

## Summary
Hitachi CP-A Series projectors support RS-232C serial and network control through TCP ports 23 and 9715. The documented command format for RS-232C and TCP #23 is a 7-byte header plus 6-byte command data. Serial uses 19200bps 8N1. TCP #9715 wraps the 13-byte network control command in its own frame and supports MD5 challenge-response authentication when authentication is enabled. The command table documents binary-encoded hex sequences for power, input selection, image adjustment, audio, and system settings.

<!-- UNRESOLVED: CP-A52 model family membership inferred from Crestron module; not directly confirmed in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  ports:
    - 23
    - 9715
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
auth:
  type: UNRESOLVED  # Port 1 authentication can be enabled; its authentication procedure is not specified.
tcp_auth:
  port2_auth_type: md5_challenge_response  # Authentication can be enabled; the default setting is enabled.
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
  kind: action
  params: []
- id: input_set
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: >
        Setting code: 0=COMPUTER1, 1=VIDEO, 2=S-VIDEO,
        4=COMPUTER2, 5=COMPONENT
- id: input_get
  label: Get Input Source
  kind: action
  params: []
- id: error_status_get
  label: Get Error Status
  kind: action
  params: []
- id: brightness_get
  label: Get Brightness
  kind: action
  params: []
- id: brightness_increment
  label: Brightness Increment
  kind: action
  params: []
- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  params: []
- id: contrast_get
  label: Get Contrast
  kind: action
  params: []
- id: contrast_increment
  label: Contrast Increment
  kind: action
  params: []
- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  params: []
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: >
        0=NORMAL, 1=CINEMA, 4=DYNAMIC, 0x20=BOARD(BLACK),
        0x21=BOARD(GREEN), 0x22=WHITEBOARD, 0x40=DAYTIME
- id: picture_mode_get
  label: Get Picture Mode
  kind: action
  params: []
- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: preset
      type: integer
      description: >
        #1-#6 DEFAULT: 0x20-0x25 respectively;
        #1-#6 CUSTOM: 0x10-0x15 respectively
- id: gamma_get
  label: Get Gamma
  kind: action
  params: []
- id: color_temp_set
  label: Set Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: >
        1=LOW, 2=MID, 3=HIGH, 0x08=Hi-BRIGHT-1, 0x09=Hi-BRIGHT-2,
        0x0A=Hi-BRIGHT-3, 0x11=CUSTOM-3(LOW), 0x12=CUSTOM-2(MID),
        0x13=CUSTOM-1(HIGH), 0x18=CUSTOM-4(Hi-BRIGHT-1),
        0x19=CUSTOM-5(Hi-BRIGHT-2), 0x1A=CUSTOM-6(Hi-BRIGHT-3)
- id: color_temp_get
  label: Get Color Temperature
  kind: action
  params: []
- id: color_get
  label: Get Color
  kind: action
  params: []
- id: tint_get
  label: Get Tint
  kind: action
  params: []
- id: sharpness_get
  label: Get Sharpness
  kind: action
  params: []
- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=4:3, 1=16:9, 9=14:9, 0x10=NORMAL
- id: aspect_get
  label: Get Aspect Ratio
  kind: action
  params: []
- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
- id: mute_get
  label: Get Mute
  kind: action
  params: []
- id: volume_get
  label: Get Volume
  kind: action
  params: []
- id: volume_increment
  label: Volume Increment
  kind: action
  params: []
- id: volume_decrement
  label: Volume Decrement
  kind: action
  params: []
- id: auto_adjust_execute
  label: Auto Adjust
  kind: action
  params: []
- id: freeze_set
  label: Set Freeze
  kind: action
  params:
    - name: state
      type: integer
      description: 0=NORMAL, 1=FREEZE
- id: freeze_get
  label: Get Freeze
  kind: action
  params: []
- id: lamp_time_get
  label: Get Lamp Time
  kind: action
  params: []
- id: filter_time_get
  label: Get Filter Time
  kind: action
  params: []
- id: my_memory_load
  label: My Memory Load
  kind: action
  params:
    - name: slot
      type: integer
      description: 0-3 (memory slots 1-4)
- id: my_memory_save
  label: My Memory Save
  kind: action
  params:
    - name: slot
      type: integer
      description: 0-3 (memory slots 1-4)
- id: blank_set
  label: Set Blank Screen
  kind: action
  params:
    - name: screen
      type: integer
      description: 0x03=BLUE, 0x05=WHITE, 0x06=BLACK, 0x20=MyScreen, 0x40=ORIGINAL
- id: blank_get
  label: Get Blank Screen
  kind: action
  params: []
- id: auto_on_set
  label: Set Auto On
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
- id: auto_on_get
  label: Get Auto On
  kind: action
  params: []
- id: auto_off_get
  label: Get Auto Off Timer
  kind: action
  params: []
- id: speaker_set
  label: Set Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
- id: speaker_get
  label: Get Speaker
  kind: action
  params: []
- id: closed_caption_display_set
  label: Set Closed Caption Display
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON, 2=AUTO
- id: closed_caption_display_get
  label: Get Closed Caption Display
  kind: action
  params: []
- id: closed_caption_mode_set
  label: Set Closed Caption Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=CAPTIONS, 1=TEXT
- id: closed_caption_mode_get
  label: Get Closed Caption Mode
  kind: action
  params: []
- id: brightness_reset
  label: Brightness Reset
  kind: action
  params: []
- id: contrast_reset
  label: Contrast Reset
  kind: action
  params: []
- id: user_gamma_pattern_set
  label: Set User Gamma Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: Off, 9 steps grayscale, 15 steps grayscale, Ramp
- id: user_gamma_pattern_get
  label: Get User Gamma Pattern
  kind: action
  params: []
- id: user_gamma_point_get
  label: Get User Gamma Point
  kind: action
  params:
    - name: point
      type: integer
      description: 1-8
- id: user_gamma_point_increment
  label: User Gamma Point Increment
  kind: action
  params:
    - name: point
      type: integer
      description: 1-8
- id: user_gamma_point_decrement
  label: User Gamma Point Decrement
  kind: action
  params:
    - name: point
      type: integer
      description: 1-8
- id: color_temp_gain_get
  label: Get Color Temperature Gain
  kind: action
  params:
    - name: channel
      type: string
      description: R, G, B
- id: color_temp_gain_increment
  label: Color Temperature Gain Increment
  kind: action
  params:
    - name: channel
      type: string
      description: R, G, B
- id: color_temp_gain_decrement
  label: Color Temperature Gain Decrement
  kind: action
  params:
    - name: channel
      type: string
      description: R, G, B
- id: color_temp_offset_get
  label: Get Color Temperature Offset
  kind: action
  params:
    - name: channel
      type: string
      description: R, G, B
- id: color_temp_offset_increment
  label: Color Temperature Offset Increment
  kind: action
  params:
    - name: channel
      type: string
      description: R, G, B
- id: color_temp_offset_decrement
  label: Color Temperature Offset Decrement
  kind: action
  params:
    - name: channel
      type: string
      description: R, G, B
- id: color_increment
  label: Color Increment
  kind: action
  params: []
- id: color_decrement
  label: Color Decrement
  kind: action
  params: []
- id: color_reset
  label: Color Reset
  kind: action
  params: []
- id: tint_increment
  label: Tint Increment
  kind: action
  params: []
- id: tint_decrement
  label: Tint Decrement
  kind: action
  params: []
- id: tint_reset
  label: Tint Reset
  kind: action
  params: []
- id: sharpness_increment
  label: Sharpness Increment
  kind: action
  params: []
- id: sharpness_decrement
  label: Sharpness Decrement
  kind: action
  params: []
- id: sharpness_reset
  label: Sharpness Reset
  kind: action
  params: []
- id: progressive_set
  label: Set Progressive
  kind: action
  params:
    - name: mode
      type: integer
      description: TURN OFF, TV, FILM
- id: progressive_get
  label: Get Progressive
  kind: action
  params: []
- id: video_nr_set
  label: Set Video NR
  kind: action
  params:
    - name: level
      type: integer
      description: LOW, MID, HIGH
- id: video_nr_get
  label: Get Video NR
  kind: action
  params: []
- id: overscan_get
  label: Get Over Scan
  kind: action
  params: []
- id: overscan_increment
  label: Over Scan Increment
  kind: action
  params: []
- id: overscan_decrement
  label: Over Scan Decrement
  kind: action
  params: []
- id: overscan_reset
  label: Over Scan Reset
  kind: action
  params: []
- id: v_position_get
  label: Get V Position
  kind: action
  params: []
- id: v_position_increment
  label: V Position Increment
  kind: action
  params: []
- id: v_position_decrement
  label: V Position Decrement
  kind: action
  params: []
- id: v_position_reset
  label: V Position Reset
  kind: action
  params: []
- id: h_position_get
  label: Get H Position
  kind: action
  params: []
- id: h_position_increment
  label: H Position Increment
  kind: action
  params: []
- id: h_position_decrement
  label: H Position Decrement
  kind: action
  params: []
- id: h_position_reset
  label: H Position Reset
  kind: action
  params: []
- id: h_phase_get
  label: Get H Phase
  kind: action
  params: []
- id: h_phase_increment
  label: H Phase Increment
  kind: action
  params: []
- id: h_phase_decrement
  label: H Phase Decrement
  kind: action
  params: []
- id: h_size_get
  label: Get H Size
  kind: action
  params: []
- id: h_size_increment
  label: H Size Increment
  kind: action
  params: []
- id: h_size_decrement
  label: H Size Decrement
  kind: action
  params: []
- id: h_size_reset
  label: H Size Reset
  kind: action
  params: []
- id: color_space_set
  label: Set Color Space
  kind: action
  params:
    - name: mode
      type: integer
      description: AUTO, RGB, SMPTE240, REC709, REC601
- id: color_space_get
  label: Get Color Space
  kind: action
  params: []
- id: component_set
  label: Set Component
  kind: action
  params:
    - name: mode
      type: integer
      description: COMPONENT, SCART RGB
- id: component_get
  label: Get Component
  kind: action
  params: []
- id: c_video_format_set
  label: Set C-Video Format
  kind: action
  params:
    - name: format
      type: integer
      description: AUTO, NTSC, PAL, SECAM, NTSC4.43, M-PAL, N-PAL
- id: c_video_format_get
  label: Get C-Video Format
  kind: action
  params: []
- id: s_video_format_set
  label: Set S-Video Format
  kind: action
  params:
    - name: format
      type: integer
      description: AUTO, NTSC, PAL, SECAM, NTSC4.43, M-PAL, N-PAL
- id: s_video_format_get
  label: Get S-Video Format
  kind: action
  params: []
- id: frame_lock_set
  label: Set Frame Lock
  kind: action
  params:
    - name: channel
      type: string
      description: COMPUTER1, COMPUTER2
    - name: state
      type: integer
      description: TURN OFF, TURN ON
- id: frame_lock_get
  label: Get Frame Lock
  kind: action
  params:
    - name: channel
      type: string
      description: COMPUTER1, COMPUTER2
- id: computer_in_sync_set
  label: Set Computer Input Sync
  kind: action
  params:
    - name: channel
      type: string
      description: COMPUTER IN1, COMPUTER IN2
    - name: mode
      type: integer
      description: SYNC ON G ON, SYNC ON G OFF
- id: computer_in_sync_get
  label: Get Computer Input Sync
  kind: action
  params:
    - name: channel
      type: string
      description: COMPUTER IN1, COMPUTER IN2
- id: d_zoom_get
  label: Get D-ZOOM
  kind: action
  params: []
- id: d_zoom_increment
  label: D-ZOOM Increment
  kind: action
  params: []
- id: d_zoom_decrement
  label: D-ZOOM Decrement
  kind: action
  params: []
- id: d_zoom_reset
  label: D-ZOOM Reset
  kind: action
  params: []
- id: d_shift_get
  label: Get D-SHIFT
  kind: action
  params:
    - name: direction
      type: string
      description: V, H
- id: d_shift_increment
  label: D-SHIFT Increment
  kind: action
  params:
    - name: direction
      type: string
      description: V, H
- id: d_shift_decrement
  label: D-SHIFT Decrement
  kind: action
  params:
    - name: direction
      type: string
      description: V, H
- id: d_shift_reset
  label: D-SHIFT Reset
  kind: action
  params:
    - name: direction
      type: string
      description: V, H
- id: keystone_v_get
  label: Get Keystone V
  kind: action
  params: []
- id: keystone_v_increment
  label: Keystone V Increment
  kind: action
  params: []
- id: keystone_v_decrement
  label: Keystone V Decrement
  kind: action
  params: []
- id: keystone_v_reset
  label: Keystone V Reset
  kind: action
  params: []
- id: whisper_set
  label: Set Whisper
  kind: action
  params:
    - name: mode
      type: integer
      description: NORMAL, WHISPER
- id: whisper_get
  label: Get Whisper
  kind: action
  params: []
- id: mirror_set
  label: Set Mirror
  kind: action
  params:
    - name: mode
      type: integer
      description: NORMAL, H:INVERT, V:INVERT, H&V:INVERT
- id: mirror_get
  label: Get Mirror
  kind: action
  params: []
- id: volume_source_get
  label: Get Volume Source
  kind: action
  params:
    - name: source
      type: string
      description: COMPUTER1, COMPUTER2, COMPONENT, S-VIDEO, VIDEO
- id: volume_source_increment
  label: Volume Source Increment
  kind: action
  params:
    - name: source
      type: string
      description: COMPUTER1, COMPUTER2, COMPONENT, S-VIDEO, VIDEO
- id: volume_source_decrement
  label: Volume Source Decrement
  kind: action
  params:
    - name: source
      type: string
      description: COMPUTER1, COMPUTER2, COMPONENT, S-VIDEO, VIDEO
- id: audio_source_set
  label: Set Audio Source
  kind: action
  params:
    - name: source
      type: string
      description: COMPUTER1, COMPUTER2, COMPONENT, S-VIDEO, VIDEO
    - name: input
      type: integer
      description: AUDIO1, AUDIO2, AUDIO3, Turn off
- id: audio_source_get
  label: Get Audio Source
  kind: action
  params:
    - name: source
      type: string
      description: COMPUTER1, COMPUTER2, COMPONENT, S-VIDEO, VIDEO
- id: remote_receive_set
  label: Set Remote Receive
  kind: action
  params:
    - name: location
      type: string
      description: FRONT, TOP
    - name: state
      type: integer
      description: Off, On
- id: remote_receive_get
  label: Get Remote Receive
  kind: action
  params:
    - name: location
      type: string
      description: FRONT, TOP
- id: remote_frequency_set
  label: Set Remote Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: NORMAL, HIGH
    - name: state
      type: integer
      description: Off, On
- id: remote_frequency_get
  label: Get Remote Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: NORMAL, HIGH
- id: language_set
  label: Set Language
  kind: action
  params:
    - name: language
      type: integer
      description: ENGLISH, FRANÇAIS, DEUTSCH, ESPAÑOL, ITALIANO, NORSK, NEDERLANDS, PORTUGUÊS, SVENSKA, PУCCKИЙ, SUOMI, POLSKI, TÜRKÇE
- id: language_get
  label: Get Language
  kind: action
  params: []
- id: menu_position_get
  label: Get Menu Position
  kind: action
  params:
    - name: direction
      type: string
      description: H, V
- id: menu_position_increment
  label: Menu Position Increment
  kind: action
  params:
    - name: direction
      type: string
      description: H, V
- id: menu_position_decrement
  label: Menu Position Decrement
  kind: action
  params:
    - name: direction
      type: string
      description: H, V
- id: menu_position_reset
  label: Menu Position Reset
  kind: action
  params:
    - name: direction
      type: string
      description: H, V
- id: blank_on_off_set
  label: Set Blank On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: TURN OFF, TURN ON
- id: blank_on_off_get
  label: Get Blank On/Off
  kind: action
  params: []
- id: start_up_set
  label: Set Start Up
  kind: action
  params:
    - name: mode
      type: integer
      description: MyScreen, ORIGINAL, TURN OFF
- id: start_up_get
  label: Get Start Up
  kind: action
  params: []
- id: myscreen_lock_set
  label: Set MyScreen LOCK
  kind: action
  params:
    - name: state
      type: integer
      description: TURN OFF, TURN ON
- id: myscreen_lock_get
  label: Get MyScreen LOCK
  kind: action
  params: []
- id: message_set
  label: Set Message
  kind: action
  params:
    - name: state
      type: integer
      description: TURN OFF, TURN ON
- id: message_get
  label: Get Message
  kind: action
  params: []
- id: auto_search_set
  label: Set Auto Search
  kind: action
  params:
    - name: state
      type: integer
      description: TURN OFF, TURN ON
- id: auto_search_get
  label: Get Auto Search
  kind: action
  params: []
- id: auto_off_increment
  label: Auto Off Increment
  kind: action
  params: []
- id: auto_off_decrement
  label: Auto Off Decrement
  kind: action
  params: []
- id: lamp_time_reset
  label: Lamp Time Reset
  kind: action
  params: []
- id: filter_time_reset
  label: Filter Time Reset
  kind: action
  params: []
- id: my_button_set
  label: Set My Button
  kind: action
  params:
    - name: button
      type: integer
      description: MY BUTTON-1, MY BUTTON-2
    - name: function
      type: string
      description: COMPUTER1, COMPUTER2, COMPONENT, S-VIDEO, VIDEO, INFORMATION, MY MEMORY, PICTURE MODE, FILTER RESET, e-SHOT, VOLUME +, VOLUME -, AV MUTE
- id: my_button_get
  label: Get My Button
  kind: action
  params:
    - name: button
      type: integer
      description: MY BUTTON-1, MY BUTTON-2
- id: magnify_get
  label: Get Magnify
  kind: action
  params: []
- id: magnify_increment
  label: Magnify Increment
  kind: action
  params: []
- id: magnify_decrement
  label: Magnify Decrement
  kind: action
  params: []
- id: e_shot_set
  label: Set e-SHOT
  kind: action
  params:
    - name: image
      type: string
      description: OFF, IMAGE1, IMAGE2, IMAGE3, IMAGE4
- id: e_shot_get
  label: Get e-SHOT
  kind: action
  params: []
- id: e_shot_image_delete
  label: e-SHOT Image Delete
  kind: action
  params:
    - name: image
      type: integer
      description: IMAGE1, IMAGE2, IMAGE3, IMAGE4
- id: closed_caption_channel_set
  label: Set Closed Caption Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: 1, 2, 3, 4
- id: closed_caption_channel_get
  label: Get Closed Caption Channel
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  query_command: Get
- id: input_state
  label: Input Source
  type: enum
  values:
    - VIDEO
    - S-VIDEO
    - COMPUTER1
    - COMPUTER2
    - COMPONENT
  query_command: Get
- id: error_reply
  label: Error Reply Code
  type: string
  description: >
    '15H' = command not understood, '1CH'+'xxxxH' = cannot execute,
    '1FH'+'0400H' = authentication error
- id: data_reply
  label: Data Reply
  type: string
  description: "'1DH' + 2 bytes data returned in response to Get commands"
  query_command: Get
```

## Variables
```yaml
# UNRESOLVED: projector internal setup values readable via Get command;
# full variable list not enumerated in source - only representative
# commands from the command table are documented above in Actions
```

## Events
```yaml
# UNRESOLVED: projector sends test data when power is switched on and when
# the lamp is lit; source does not document a systematic event taxonomy.
```

## Macros
```yaml
# None documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit interlock or safety sequencing procedure in source.
# Note: command not accepted during warm-up period (per source).
# Note: provide >=40ms interval between response code and any other code.
# Note: projector outputs test data on power-on and lamp-lit; ignore.
```

## Notes
TCP #9715 uses MD5 challenge-response authentication when authentication is enabled. The default authentication setting for Port2 is enabled. The projector returns a random 8-byte challenge; the client concatenates the challenge and password, computes MD5, and prepends the digest to commands. Subsequent commands on the same connection may omit the authentication data. Port1 (TCP #23) authentication is disabled by default, but can be enabled; its authentication procedure is not specified in the source. The authentication password is shared between Port1 and Port2, and its default setting is blank. The RS-232C and TCP #23 command formats both use a 7-byte header and 6-byte command data. TCP #9715 uses a distinct frame: 1-byte header 02, 1-byte length 0D, 13-byte command, 1-byte checksum, and 1-byte connection ID. The connection ID is attached to reply data. TCP #9715 auto-disconnects after 30 seconds without communication. Commands are rejected during projector warm-up.

<!-- UNRESOLVED: precise type code values for variables other than power/input/brightness/contrast — source provides hex command frames but no semantic type code mapping beyond examples shown in command table -->
<!-- UNRESOLVED: Port1 (TCP #23) authentication procedure — the source says authentication can be enabled and is disabled by default, but does not specify its procedure. -->
<!-- UNRESOLVED: Lamp hour alarm threshold, filter replacement interval — not in source -->
<!-- UNRESOLVED: CP-A52 model confirmed via Crestron module; source document does not confirm this model. -->

## Provenance

```yaml
source_domains:
  - support.maxellproav.com
  - applicationmarket.crestron.com
source_urls:
  - https://support.maxellproav.com/wp-content/uploads/Support/OG/Hitachi_CP-A100_UM_Technical.pdf
  - https://applicationmarket.crestron.com/content/Help/Hitachi/hitachi_cp-a100_v1_0_help.pdf
retrieved_at: 2026-10-07T13:51:04.101Z
last_checked_at: 2026-10-07T13:51:04.101Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:51:04.101Z
matched_actions: 161
action_count: 161
confidence: medium
summary: "All 161 units map to source commands and transport supported; generic volume_* overlap volume_source_* (many-to-one). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "CP-A52 model family membership inferred from Crestron module; not directly confirmed in source"
- "projector internal setup values readable via Get command;"
- "projector sends test data when power is switched on and when"
- "no explicit interlock or safety sequencing procedure in source."
- "precise type code values for variables other than power/input/brightness/contrast — source provides hex command frames but no semantic type code mapping beyond examples shown in command table"
- "Port1 (TCP #23) authentication procedure — the source says authentication can be enabled and is disabled by default, but does not specify its procedure."
- "Lamp hour alarm threshold, filter replacement interval — not in source"
- "CP-A52 model confirmed via Crestron module; source document does not confirm this model."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
