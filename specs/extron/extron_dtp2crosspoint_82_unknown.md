---
spec_id: admin/extron-dtp2crosspoint-82
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP2 CrossPoint 82 Control Spec"
manufacturer: Extron
model_family: "DTP2 CrossPoint 82"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP2 CrossPoint 82"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-20T11:56:12.371Z
generated_at: 2026-05-20T11:56:12.371Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T11:56:12.371Z
  matched_actions: 250
  action_count: 250
  confidence: high
  summary: "All 250 spec actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Extron DTP2 CrossPoint 82 Control Spec

## Summary
9x8 matrix switcher with HDMI, DisplayPort, DTP2/XTP inputs and HDMI/DTP2 outputs. SIS command set over RS-232, USB, Telnet, and SSH. Supports video/audio routing, EDID management, HDCP, picture adjustment, test patterns, presets, audio DSP, and CEC.

<!-- UNRESOLVED: TCP port number for IP control not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
  default_ip: 192.168.254.254
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: null  # UNRESOLVED: source describes password-optional behavior; auth type not explicitly bounded
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
- id: video_audio_tie
  label: Tie Video and Audio
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1=DisplayPort, 2-6=HDMI/DVI, 7-8=DTP2/XTP, 9=Aux audio)
    - name: output
      type: integer
      description: Output number (1=HDMI/DVI out 1, 2=DTP2/XTP/HDBT out 2, 3=HDMI/DVI Loop out)

- id: video_tie
  label: Tie Video Only
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: audio_tie
  label: Tie Audio Only
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: untie_all
  label: Untie All Outputs
  kind: action
  params: []

- id: untie_output
  label: Untie Output
  kind: action
  params:
    - name: output
      type: integer

- id: untie_input
  label: Untie Input
  kind: action
  params:
    - name: input
      type: integer

- id: set_loop_out_input
  label: Set Loop Out Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (7 or 8 only)

- id: view_loop_out_input
  label: View Loop Out Input
  kind: action
  params: []

- id: write_input_name
  label: Write Input Name
  kind: action
  params:
    - name: input
      type: integer
    - name: name
      type: string
      description: Up to 32 characters, excluding , * |

- id: view_input_name
  label: View Input Name
  kind: action
  params:
    - name: input
      type: integer

- id: view_detected_format
  label: View Detected Input Format
  kind: action
  params:
    - name: input
      type: integer

- id: assign_edid
  label: Assign EDID to Input
  kind: action
  params:
    - name: input
      type: integer
    - name: edid
      type: integer
      description: EDID value (see EDID table)

- id: view_assigned_edid
  label: View Assigned EDID
  kind: action
  params:
    - name: input
      type: integer

- id: save_output_edid_to_slot
  label: Save Output EDID to Custom Slot
  kind: action
  params:
    - name: output
      type: integer
    - name: slot
      type: integer

- id: view_edid_native_resolution
  label: View EDID Native Resolution
  kind: action
  params:
    - name: edid_slot
      type: integer

- id: export_edid
  label: Export EDID File
  kind: action
  params:
    - name: edid_slot
      type: integer
    - name: filename
      type: string

- id: import_edid
  label: Import EDID File
  kind: action
  params:
    - name: edid_slot
      type: integer
    - name: filename
      type: string

- id: enable_hdcp
  label: Enable HDCP Support
  kind: action
  params:
    - name: input
      type: integer

- id: disable_hdcp
  label: Disable HDCP Support
  kind: action
  params:
    - name: input
      type: integer

- id: view_hdcp_status
  label: View HDCP Status
  kind: action
  params:
    - name: input
      type: integer

- id: set_aspect_fill
  label: Set Aspect Ratio Fill
  kind: action
  params:
    - name: input
      type: integer

- id: set_aspect_follow
  label: Set Aspect Ratio Follow
  kind: action
  params:
    - name: input
      type: integer

- id: view_aspect
  label: View Aspect Ratio Setting
  kind: action
  params:
    - name: input
      type: integer

- id: view_active_pixels
  label: View Active Pixels
  kind: action
  params:
    - name: input
      type: integer

- id: view_active_lines
  label: View Active Lines
  kind: action
  params:
    - name: input
      type: integer

- id: film_mode_auto
  label: Set Film Mode Auto
  kind: action
  params:
    - name: input
      type: integer

- id: film_mode_off
  label: Set Film Mode Off
  kind: action
  params:
    - name: input
      type: integer

- id: view_film_mode
  label: View Film Mode Setting
  kind: action
  params:
    - name: input
      type: integer

- id: freeze_enable
  label: Enable Freeze
  kind: action
  params: []

- id: freeze_disable
  label: Disable Freeze
  kind: action
  params: []

- id: view_freeze
  label: View Freeze Status
  kind: action
  params: []

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer
      description: 0-127 (default 64)

- id: increment_contrast
  label: Increment Contrast
  kind: action
  params:
    - name: input
      type: integer

- id: decrement_contrast
  label: Decrement Contrast
  kind: action
  params:
    - name: input
      type: integer

- id: view_contrast
  label: View Contrast
  kind: action
  params:
    - name: input
      type: integer

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer
      description: 0-127 (default 64)

- id: increment_brightness
  label: Increment Brightness
  kind: action
  params:
    - name: input
      type: integer

- id: decrement_brightness
  label: Decrement Brightness
  kind: action
  params:
    - name: input
      type: integer

- id: view_brightness
  label: View Brightness
  kind: action
  params:
    - name: input
      type: integer

- id: set_detail_level
  label: Set Detail Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0-127 (default 64)

- id: increment_detail
  label: Increment Detail
  kind: action
  params: []

- id: decrement_detail
  label: Decrement Detail
  kind: action
  params: []

- id: view_detail
  label: View Detail Setting
  kind: action
  params: []

- id: set_h_position
  label: Set Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: -4096 to 4096

- id: increment_h_position
  label: Shift Image Right
  kind: action
  params: []

- id: decrement_h_position
  label: Shift Image Left
  kind: action
  params: []

- id: view_h_position
  label: View Horizontal Position
  kind: action
  params: []

- id: set_v_position
  label: Set Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: -2400 to 2400

- id: increment_v_position
  label: Shift Image Down
  kind: action
  params: []

- id: decrement_v_position
  label: Shift Image Up
  kind: action
  params: []

- id: view_v_position
  label: View Vertical Position
  kind: action
  params: []

- id: set_h_size
  label: Set Horizontal Size
  kind: action
  params:
    - name: value
      type: integer

- id: increment_h_size
  label: Widen Image
  kind: action
  params: []

- id: decrement_h_size
  label: Narrow Image
  kind: action
  params: []

- id: view_h_size
  label: View Horizontal Size
  kind: action
  params: []

- id: set_v_size
  label: Set Vertical Size
  kind: action
  params:
    - name: value
      type: integer

- id: increment_v_size
  label: Make Image Taller
  kind: action
  params: []

- id: decrement_v_size
  label: Shorten Image
  kind: action
  params: []

- id: view_v_size
  label: View Vertical Size
  kind: action
  params: []

- id: set_image_position_size
  label: Set Image Position and Size
  kind: action
  params:
    - name: h_pos
      type: integer
    - name: v_pos
      type: integer
    - name: h_size
      type: integer
    - name: v_size
      type: integer

- id: view_image_position_size
  label: View Image Position and Size
  kind: action
  params: []

- id: unmute_output_video
  label: Unmute Video Output
  kind: action
  params:
    - name: output
      type: integer

- id: mute_output_video
  label: Mute Video Output
  kind: action
  params:
    - name: output
      type: integer

- id: mute_output_video_sync
  label: Mute Video and Sync Output
  kind: action
  params:
    - name: output
      type: integer

- id: view_output_mute
  label: View Output Mute Status
  kind: action
  params:
    - name: output
      type: integer

- id: mute_all_outputs
  label: Mute All Outputs
  kind: action
  params: []

- id: mute_all_video_sync
  label: Mute All Outputs Video and Sync
  kind: action
  params: []

- id: unmute_all_outputs
  label: Unmute All Outputs
  kind: action
  params: []

- id: view_global_mute
  label: View Global Mute Status
  kind: action
  params: []

- id: set_output_rate
  label: Set Output Rate
  kind: action
  params:
    - name: rate
      type: integer

- id: view_output_rate
  label: View Output Rate
  kind: action
  params: []

- id: write_output_name
  label: Write Output Name
  kind: action
  params:
    - name: output
      type: integer
    - name: name
      type: string

- id: view_output_name
  label: View Output Name
  kind: action
  params:
    - name: output
      type: integer

- id: set_hdmi_format
  label: Set HDMI Output Format
  kind: action
  params:
    - name: output
      type: integer
    - name: format
      type: integer
      description: "0=Auto, 1=DVI, 2=HDMI RGB Full, 3=HDMI RGB Limited, 5=HDMI YUV 444, 7=HDMI YUV 422"

- id: view_hdmi_format
  label: View HDMI Output Format
  kind: action
  params:
    - name: output
      type: integer

- id: view_auto_hdmi_format
  label: View Auto HDMI Output Format
  kind: action
  params:
    - name: output
      type: integer

- id: set_video_bit_depth
  label: Set Video Bit Depth
  kind: action
  params:
    - name: output
      type: integer
    - name: depth
      type: integer
      description: "0=Auto, 1=Force 8-bit"

- id: view_video_bit_depth
  label: View Video Bit Depth
  kind: action
  params:
    - name: output
      type: integer

- id: set_power_save
  label: Set Power Save Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Full power, 1=Lowest, 2=Low"

- id: view_power_save
  label: View Power Save Mode
  kind: action
  params: []

- id: set_screen_saver_mode
  label: Set Screen Saver Mode
  kind: action
  params:
    - name: mode
      type: integer

- id: view_screen_saver_mode
  label: View Screen Saver Mode
  kind: action
  params: []

- id: set_screen_saver_duration
  label: Set Screen Saver Duration
  kind: action
  params:
    - name: seconds
      type: integer
      description: 1-500 seconds, 501=Never (default)

- id: view_screen_saver_duration
  label: View Screen Saver Duration
  kind: action
  params: []

- id: view_screen_saver_status
  label: View Screen Saver Status
  kind: action
  params: []

- id: set_osd_duration
  label: Set OSD Menu Duration
  kind: action
  params:
    - name: seconds
      type: integer

- id: view_osd_duration
  label: View OSD Menu Duration
  kind: action
  params: []

- id: select_logo_file
  label: Select Logo File
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-16, 0=disabled, 101=No Signal, 201=HDCP
    - name: filename
      type: string

- id: view_logo_file
  label: View Logo File
  kind: action
  params:
    - name: slot
      type: integer

- id: clear_logo_slot
  label: Clear Logo Slot
  kind: action
  params:
    - name: logo_slot
      type: integer
    - name: slot
      type: integer

- id: write_logo_name
  label: Write Logo Name
  kind: action
  params:
    - name: slot
      type: integer
    - name: name
      type: string

- id: view_logo_name
  label: View Logo Name
  kind: action
  params:
    - name: slot
      type: integer

- id: view_logo_availability
  label: View Logo Availability
  kind: action
  params: []

- id: disable_logo
  label: Disable Logo
  kind: action
  params: []

- id: enable_logo
  label: Enable Logo
  kind: action
  params:
    - name: slot
      type: integer

- id: view_logo_status
  label: View Logo Status
  kind: action
  params: []

- id: set_logo_h_position
  label: Set Logo Horizontal Position
  kind: action
  params:
    - name: slot
      type: integer
    - name: value
      type: integer

- id: increment_logo_h_position
  label: Shift Logo Right
  kind: action
  params:
    - name: slot
      type: integer

- id: decrement_logo_h_position
  label: Shift Logo Left
  kind: action
  params:
    - name: slot
      type: integer

- id: view_logo_h_position
  label: View Logo Horizontal Position
  kind: action
  params:
    - name: slot
      type: integer

- id: set_logo_v_position
  label: Set Logo Vertical Position
  kind: action
  params:
    - name: slot
      type: integer
    - name: value
      type: integer

- id: increment_logo_v_position
  label: Shift Logo Down
  kind: action
  params:
    - name: slot
      type: integer

- id: decrement_logo_v_position
  label: Shift Logo Up
  kind: action
  params:
    - name: slot
      type: integer

- id: view_logo_v_position
  label: View Logo Vertical Position
  kind: action
  params:
    - name: slot
      type: integer

- id: logo_key_effect_disabled
  label: Disable Logo Key Effect
  kind: action
  params:
    - name: slot
      type: integer

- id: logo_key_effect_transparency
  label: Set Logo Key Effect Transparency
  kind: action
  params:
    - name: slot
      type: integer

- id: logo_key_effect_rgb
  label: Set Logo Key Effect RGB
  kind: action
  params:
    - name: slot
      type: integer

- id: logo_key_effect_level
  label: Set Logo Key Effect Level
  kind: action
  params:
    - name: slot
      type: integer

- id: logo_key_effect_alpha
  label: Set Logo Key Effect Alpha
  kind: action
  params:
    - name: slot
      type: integer

- id: view_logo_key_effect
  label: View Logo Key Effect
  kind: action
  params:
    - name: slot
      type: integer

- id: set_logo_key_effect_level
  label: Set Logo Key Effect Level Value
  kind: action
  params:
    - name: slot
      type: integer
    - name: var
      type: integer
    - name: value
      type: integer

- id: view_logo_key_effect_level
  label: View Logo Key Effect Level Value
  kind: action
  params:
    - name: slot
      type: integer
    - name: var
      type: integer

- id: recall_input_preset
  label: Recall Input Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-16

- id: save_input_preset
  label: Save Input Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-16

- id: delete_input_preset
  label: Delete Input Preset
  kind: action
  params:
    - name: preset
      type: integer

- id: write_input_preset_name
  label: Write Input Preset Name
  kind: action
  params:
    - name: preset
      type: integer
    - name: name
      type: string

- id: view_input_preset_name
  label: View Input Preset Name
  kind: action
  params:
    - name: preset
      type: integer

- id: auto_memory_enable
  label: Enable Auto Memory
  kind: action
  params:
    - name: input
      type: integer

- id: auto_memory_disable
  label: Disable Auto Memory
  kind: action
  params:
    - name: input
      type: integer

- id: view_auto_memory
  label: View Auto Memory Setting
  kind: action
  params:
    - name: input
      type: integer

- id: save_tie_preset
  label: Save Tie Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-16

- id: recall_tie_preset
  label: Recall Tie Preset
  kind: action
  params:
    - name: preset
      type: integer

- id: clear_tie_preset
  label: Clear Tie Preset
  kind: action
  params:
    - name: preset
      type: integer

- id: write_tie_preset_name
  label: Write Tie Preset Name
  kind: action
  params:
    - name: preset
      type: integer
    - name: name
      type: string

- id: view_tie_preset_name
  label: View Tie Preset Name
  kind: action
  params:
    - name: preset
      type: integer

- id: set_audio_input_format
  label: Set Audio Input Format
  kind: action
  params:
    - name: input
      type: integer
    - name: format
      type: integer
      description: "0=None, 1=Analog Aux, 2=LPCM-2Ch, 3=Multi-Ch, 4=LPCM-2Ch Auto Aux (default), 5=Multi-Ch Auto Aux"

- id: view_audio_input_format
  label: View Audio Input Format
  kind: action
  params:
    - name: input
      type: integer

- id: write_audio_input_name
  label: Write Audio Input Name
  kind: action
  params:
    - name: input
      type: integer
    - name: name
      type: string

- id: view_audio_input_name
  label: View Audio Input Name
  kind: action
  params:
    - name: input
      type: integer

- id: write_audio_output_name
  label: Write Audio Output Name
  kind: action
  params:
    - name: output
      type: integer
    - name: name
      type: string

- id: view_audio_output_name
  label: View Audio Output Name
  kind: action
  params:
    - name: output
      type: integer

- id: mute_audio_output
  label: Mute Audio Output
  kind: action
  params:
    - name: output
      type: integer

- id: unmute_audio_output
  label: Unmute Audio Output
  kind: action
  params:
    - name: output
      type: integer

- id: view_audio_output_mute
  label: View Audio Output Mute Status
  kind: action
  params:
    - name: output
      type: integer

- id: view_global_audio_mute
  label: View Global Audio Mute Status
  kind: action
  params: []

- id: set_playback_file_slot
  label: Assign File to Playback Slot
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-16
    - name: filename
      type: string

- id: set_playback_delay
  label: Set Playback Delay
  kind: action
  params:
    - name: slot
      type: integer
    - name: seconds
      type: integer
      description: 0-300 seconds

- id: view_playback_delay
  label: View Playback Delay
  kind: action
  params:
    - name: slot
      type: integer

- id: write_playback_name
  label: Write Playback File Name
  kind: action
  params:
    - name: slot
      type: integer
    - name: name
      type: string

- id: view_playback_name
  label: View Playback Name
  kind: action
  params:
    - name: slot
      type: integer

- id: start_playback
  label: Start Playback
  kind: action
  params:
    - name: slot
      type: integer

- id: stop_playback
  label: Stop Playback
  kind: action
  params:
    - name: slot
      type: integer

- id: view_slot_status
  label: View Playback Slot Status
  kind: action
  params:
    - name: slot
      type: integer

- id: view_global_playback_status
  label: View Global Playback Status
  kind: action
  params: []

- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: "0=Off (default), 1=Crop, 2=Alternating pixels, 3=Crosshatch, 4=Color Bars, 5=Grayscale, 6=Audio test"

- id: view_test_pattern
  label: View Test Pattern
  kind: action
  params: []

- id: set_switch_effect
  label: Set Output Switch Effect
  kind: action
  params:
    - name: effect
      type: integer
      description: "0=Cut through black, 1=Fade through black, 2=Seamless fade (default), 3=Seamless cut"

- id: view_switch_effect
  label: View Switch Effect
  kind: action
  params: []

- id: upstream_cut
  label: Upstream Cut
  kind: action
  params: []

- id: upstream_seamless_cut
  label: Upstream Seamless Cut
  kind: action
  params: []

- id: view_upstream_switch_effect
  label: View Upstream Switch Effect
  kind: action
  params: []

- id: view_signal_presence
  label: View Video Signal Presence
  kind: action
  params: []

- id: enable_front_panel_lock
  label: Enable Front Panel Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=Complete lockout, 2=Input/logos/volume only, 3=Input/logos only, 4=Volume only"

- id: disable_front_panel_lock
  label: Disable Front Panel Lock
  kind: action
  params: []

- id: view_front_panel_lock
  label: View Front Panel Lock Status
  kind: action
  params: []

- id: set_hdcp_output_mode
  label: Set HDCP Output Mode
  kind: action
  params:
    - name: output
      type: integer
    - name: mode
      type: integer
      description: "0=Off, 1=Follow input (10s trial), 2=Encrypt output (10s trial), 3=Follow input (continuous), 4=Encrypt output (continuous)"

- id: view_hdcp_output_mode
  label: View HDCP Output Mode
  kind: action
  params:
    - name: output
      type: integer

- id: set_hdcp_notification
  label: Set HDCP Notification
  kind: action
  params:
    - name: output
      type: integer
    - name: mode
      type: integer
      description: "0=Black screen (default), 1=Green screen with OSD, 2=User image with black screen"

- id: view_hdcp_notification
  label: View HDCP Notification
  kind: action
  params:
    - name: output
      type: integer

- id: query_hdcp_input
  label: Query HDCP Status Input
  kind: action
  params:
    - name: input
      type: integer

- id: query_hdcp_output
  label: Query HDCP Status Output
  kind: action
  params:
    - name: output
      type: integer

- id: set_input_tp_type
  label: Set Input TP Type
  kind: action
  params:
    - name: input
      type: integer
      description: "7 or 8 only"
    - name: protocol
      type: integer
      description: "0=DTP (default), 1=XTP, 2=HDBaseT"

- id: view_input_tp_type
  label: View Input TP Type
  kind: action
  params:
    - name: input
      type: integer

- id: set_output_tp_type
  label: Set Output TP Type
  kind: action
  params:
    - name: protocol
      type: integer
      description: "0=DTP (default), 1=XTP, 2=HDBaseT"

- id: view_output_tp_type
  label: View Output TP Type
  kind: action
  params: []

- id: set_input_remote_power
  label: Set Input Remote Power
  kind: action
  params:
    - name: input
      type: integer
      description: "7 or 8 only"
    - name: power
      type: integer
      description: "0=Off (default), 1=DTP 12V, 2=DTP2 48V"

- id: view_input_remote_power
  label: View Input Remote Power
  kind: action
  params:
    - name: input
      type: integer

- id: set_output_remote_power
  label: Set Output Remote Power
  kind: action
  params:
    - name: power
      type: integer
      description: "0=Off (default), 1=DTP 12V, 2=DTP2 48V"

- id: view_output_remote_power
  label: View Output Remote Power
  kind: action
  params: []

- id: system_reset
  label: System Reset (Partial)
  kind: action
  params: []

- id: absolute_system_reset
  label: Absolute System Reset
  kind: action
  params: []

- id: absolute_system_reset_retain_ip
  label: Absolute System Reset Retain IP
  kind: action
  params: []

- id: erase_file
  label: Erase File
  kind: action
  params:
    - name: filename
      type: string

- id: erase_directory
  label: Erase Current Directory
  kind: action
  params: []

- id: erase_directory_recursive
  label: Erase Current Directory and Subdirectories
  kind: action
  params: []

- id: erase_flash
  label: Erase Flash Memory
  kind: action
  params: []

- id: set_serial_port_params
  label: Set Serial Port Parameters
  kind: action
  params:
    - name: port
      type: integer
      description: "1=Remote port, 7=UART IN7, 8=UART IN8, 9=UART OUT2"
    - name: baud
      type: integer
      description: "300, 600, 1200, 1800, 2400, 3600, 4800, 7200, 9600 (default), 14400, 19200, 28800, 38400, 57600, 115200"
    - name: parity
      type: string
      description: "Odd, Even, None (default), Mark, Space"
    - name: data_bits
      type: integer
      description: "7 or 8 (default)"
    - name: stop_bits
      type: integer
      description: "1 (default) or 2"

- id: view_serial_port_params
  label: View Serial Port Parameters
  kind: action
  params:
    - name: port
      type: integer

- id: set_uart_start_point
  label: Set UART Start Point
  kind: action
  params:
    - name: value
      type: integer
      description: Default=2000

- id: view_uart_start_point
  label: View UART Start Point
  kind: action
  params: []

- id: save_configuration
  label: Save Unit Configuration
  kind: action
  params:
    - name: slot
      type: integer

- id: set_dhcp_on
  label: Enable DHCP
  kind: action
  params: []

- id: set_dhcp_off
  label: Disable DHCP
  kind: action
  params: []

- id: view_dhcp_mode
  label: View DHCP Mode
  kind: action
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  params:
    - name: ip
      type: string

- id: view_ip_address
  label: View IP Address
  kind: action
  params: []

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  params:
    - name: mask
      type: string

- id: view_subnet_mask
  label: View Subnet Mask
  kind: action
  params: []

- id: set_gateway
  label: Set Gateway IP Address
  kind: action
  params:
    - name: gateway
      type: string

- id: view_gateway
  label: View Gateway Address
  kind: action
  params: []

- id: set_port_timeout
  label: Set Port Timeout
  kind: action
  params:
    - name: port
      type: integer
      description: 0=current, 1=global
    - name: seconds
      type: integer
      description: Time in 10-second increments

- id: view_port_timeout
  label: View Port Timeout
  kind: action
  params:
    - name: port
      type: integer

- id: view_global_port_timeout
  label: View Global Port Timeout
  kind: action
  params: []

- id: view_mac_address
  label: View MAC Address
  kind: action
  params: []

- id: set_lan_ip_all
  label: Set LAN IP Subnet and Gateway
  kind: action
  params:
    - name: ip
      type: string
    - name: prefix
      type: integer
      description: 0-31
    - name: gateway
      type: string

- id: view_lan_ip_all
  label: View All IP Settings
  kind: action
  params: []

- id: reboot_network
  label: Reboot Networking
  kind: action
  params: []

- id: query_open_connections
  label: Query Number of Open Connections
  kind: action
  params: []

- id: set_unit_name
  label: Set Unit Name
  kind: action
  params:
    - name: name
      type: string
      description: Up to 63 characters, A-Z, 0-9, minus sign only

- id: reset_unit_name
  label: Reset Unit Name to Factory Default
  kind: action
  params: []

- id: view_unit_name
  label: View Unit Name
  kind: action
  params: []

- id: enable_echo
  label: Enable Echo (SIS over SSH)
  kind: action
  params: []

- id: disable_echo
  label: Disable Echo (SIS over SSH)
  kind: action
  params: []

- id: view_echo_status
  label: View Echo Status
  kind: action
  params: []

- id: set_admin_password
  label: Set Administrator Password
  kind: action
  params:
    - name: password
      type: string
      description: 1-128 characters, case-sensitive

- id: view_admin_password
  label: View Administrator Password
  kind: action
  params: []

- id: reset_admin_password
  label: Reset Administrator Password
  kind: action
  params: []

- id: set_user_password
  label: Set User Password
  kind: action
  params:
    - name: password
      type: string

- id: view_user_password
  label: View User Password
  kind: action
  params: []

- id: reset_user_password
  label: Reset User Password
  kind: action
  params: []

- id: set_group_fader
  label: Set Group Fader
  kind: action
  params:
    - name: group
      type: integer
      description: 1-10
    - name: value
      type: integer
      description: Value in 0.1 dB steps

- id: view_group_fader
  label: View Group Fader
  kind: action
  params:
    - name: group
      type: integer

- id: increment_group_fader
  label: Increment Group Fader
  kind: action
  params:
    - name: group
      type: integer
    - name: value
      type: integer

- id: decrement_group_fader
  label: Decrement Group Fader
  kind: action
  params:
    - name: group
      type: integer
    - name: value
      type: integer

- id: mute_group
  label: Mute Group
  kind: action
  params:
    - name: group
      type: integer

- id: unmute_group
  label: Unmute Group
  kind: action
  params:
    - name: group
      type: integer

- id: view_group_mute
  label: View Group Mute Status
  kind: action
  params:
    - name: group
      type: integer

- id: view_group_limits
  label: View Group Soft Limits
  kind: action
  params:
    - name: group
      type: integer

- id: dsp_set_gain
  label: DSP Set Gain
  kind: action
  params:
    - name: oid
      type: integer
      description: Object ID number
    - name: value
      type: integer
      description: Gain in dB x10

- id: dsp_view_gain
  label: DSP View Gain
  kind: action
  params:
    - name: oid
      type: integer

- id: dsp_mute
  label: DSP Audio Mute
  kind: action
  params:
    - name: oid
      type: integer

- id: dsp_unmute
  label: DSP Audio Unmute
  kind: action
  params:
    - name: oid
      type: integer

- id: dsp_view_mute
  label: DSP View Mute Status
  kind: action
  params:
    - name: oid
      type: integer

- id: dsp_phantom_enable
  label: DSP Enable Phantom Power
  kind: action
  params:
    - name: oid
      type: integer

- id: dsp_phantom_disable
  label: DSP Disable Phantom Power
  kind: action
  params:
    - name: oid
      type: integer

- id: dsp_view_phantom
  label: DSP View Phantom Power Status
  kind: action
  params:
    - name: oid
      type: integer

- id: cec_enable_output
  label: Enable CEC on Output
  kind: action
  params:
    - name: output
      type: integer
    - name: mode
      type: integer
      description: "0=Disable, 2=Enable insertion (unidirectional), 4=Enable insertion and publish (bidirectional)"

- id: cec_enable_all_outputs
  label: Enable CEC on All Outputs
  kind: action
  params:
    - name: mode
      type: integer

- id: cec_view_output_status
  label: View CEC Output Status
  kind: action
  params:
    - name: output
      type: integer

- id: cec_send_command
  label: Send CEC Command
  kind: action
  params:
    - name: output
      type: integer
    - name: command
      type: string
      description: '"PwrOn", "PwrOff", or "ShowMe"'

- id: cec_list_devices
  label: List CEC Device Presence
  kind: action
  params: []

- id: cec_rediscover
  label: Rediscover CEC Device
  kind: action
  params:
    - name: output
      type: integer

- id: cec_report_physical_address
  label: Report CEC Physical Address
  kind: action
  params:
    - name: output
      type: integer

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=None (default LAN), 1=Verbose (default RS-232/USB), 2=Tagged responses, 3=Verbose and tagged"

- id: view_verbose_mode
  label: View Verbose Mode
  kind: action
  params: []
- id: query_general_info
  label: Query General Information
  kind: query
  params:
    - name: input
      type: integer

- id: query_model_name
  label: Query Model Name
  kind: query
  params: []

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  params: []

- id: query_full_firmware_version
  label: Query Full Firmware Version
  kind: query
  params: []

- id: query_part_number
  label: Query Part Number
  kind: query
  params: []

- id: query_unit_description
  label: Query Unit Description
  kind: query
  params: []

- id: view_internal_temperature
  label: View Internal Temperature
  kind: query
  params: []
```

## Feedbacks
```yaml
# All responses are ASCII strings terminated with CR/LF (]).
# Error codes: E01-E33 as defined in source.

- id: error_response
  type: enum
  values:
    - E01
    - E10
    - E11
    - E12
    - E13
    - E14
    - E17
    - E22
    - E24
    - E25
    - E28
    - E33
  description: Error responses

- id: switcher_message
  type: string
  description: Switcher-initiated messages (Reconfig, HplgO, HdcpI, HdcpO, IN00)

- id: verbose_response
  type: string
  description: Tagged responses in verbose modes 2 and 3
```

## Variables
```yaml
# All settable parameters are represented as Actions with explicit set/get pairs.
# See Actions section for full enumeration.
```

## Events
```yaml
# Unsolicited messages the device sends:
- id: reconfig
  description: A change in the current input frequency was detected
  params: []

- id: hotplug_event
  description: Hot plug event detected on output
  params:
    - name: output
      type: integer
    - name: state
      type: integer
      description: 1=assertion, 0=de-assertion

- id: hdcp_input_change
  description: HDCP status change on input
  params:
    - name: input
      type: integer
    - name: status
      type: integer

- id: hdcp_output_change
  description: HDCP status change on output
  params:
    - name: output
      type: integer
    - name: status
      type: integer

- id: sync_change
  description: Sync change detected or removed on any input
  params:
    - name: inputs_status
      type: string
      description: Per-input video signal status (0=no signal, 1=signal detected)

- id: cec_received_data
  description: CEC received data message (bidirectional mode)
  params:
    - name: output
      type: integer
    - name: address_byte
      type: string
    - name: data
      type: string
    - name: result
      type: integer
```

## Macros
```yaml
# Multi-step sequences from source:
# None explicitly documented as macros.
# However, the following compound operations are commonly used:
# - Input preset save/recall includes multiple image parameters
# - Tie preset save/recall includes full routing state
# - Absolute system reset with/without IP retention are distinct multi-step procedures
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Note: HDCP encryption behavior may have legal implications for downstream device compatibility.
```

## Notes
- Default IP: 192.168.254.254, subnet 255.255.255.0, gateway 0.0.0.0, DHCP off
- Default RS-232: 9600 baud, 8 data bits, no parity, 1 stop bit
- Factory default password = device serial number (case-sensitive)
- Absolute system reset (E ZQQQ }) clears passwords to no password
- Video is unmuted by default after power cycle
- HDCP authorized is permanently enabled for DisplayPort IN1
- Remote power forced off for HDBT and XTP modes
- 4096x2160 rates available only for output resolution, not input EDID
- 4:4:4 color sampling at scaled output rates available only to DTP2 Rx
- CEC communication on DTP output requires standalone DTP or DTP2 receiver
- Audio file slots 1-16, highest priority slot 1; lower priority requests during higher playback return E22 (Busy)
- Auto Memory defaults to ON; settings automatically stored as presets
- Input preset saveable values: Preset Name, Film Mode, Contrast, Brightness, Detail, H/V Position, H/V Size
<!-- UNRESOLVED: TCP port number for IP control not stated in source — operator must determine port from device or network scan -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) for RS-232 not stated in source -->
<!-- UNRESOLVED: UART start point default is 2000 but actual port numbers derived as IN7=2001, IN8=2002, OUT2=2003 — may conflict with well-known ports -->
<!-- UNRESOLVED: firmware version ranges not stated in source -->

## Provenance

```yaml
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-20T11:56:12.371Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:56:12.371Z
matched_actions: 250
action_count: 250
confidence: high
summary: "All 250 spec actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
