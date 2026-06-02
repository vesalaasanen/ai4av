---
spec_id: admin/extron-xtpiicrosspointseries
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron XTP II CrossPoint Series Control Spec"
manufacturer: Extron
model_family: "XTP II CrossPoint 1600"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "XTP II CrossPoint 1600"
    - "XTP II CrossPoint 3200"
    - "XTP II CrossPoint 6400"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-1736-02_P_xtp_ii_crosspoint.pdf
  - https://media.extron.com/public/download/files/userman/68-1736-51_F_xtp_ii_cp.pdf
  - https://www.extron.com/download/files/userman/68-1736-50_E.pdf
  - https://www.extron.com
retrieved_at: 2026-05-27T18:49:54.609Z
last_checked_at: 2026-05-30T20:15:53.231Z
generated_at: 2026-05-30T20:15:53.231Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Matrix size (input × output) not explicitly stated; inferred from port numbering tables"
  - "password optional; source describes login flow but no default"
  - "matrix size (input × output count) not explicitly stated in source"
  - "model-specific port count not enumerated in source"
  - "firmware version ranges not stated in source"
  - "voltage/power specifications not in source"
  - "default password for 1600/3200 models not stated"
verification:
  verdict: verified
  checked_at: 2026-05-30T20:15:53.231Z
  matched_actions: 190
  action_count: 190
  confidence: medium
  summary: "All 190 semantic spec actions map one-to-one to SIS command table rows, with supported serial and TCP transport settings. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Extron XTP II CrossPoint Series Control Spec

## Summary
Extron XTP II CrossPoint Series are modular matrix switchers supporting video and audio routing. Control via SIS commands over RS-232/RS-422 (rear panel Remote port) or TCP/IP Telnet (port 23). Supports up to 64 inputs and 64 outputs depending on model. Password authentication optional.

<!-- UNRESOLVED: Matrix size (input × output) not explicitly stated; inferred from port numbering tables -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default Telnet port; stated in source
serial:
  baud_rate: 9600  # default; source lists 9600/19200/38400/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: null  # UNRESOLVED: password optional; source describes login flow but no default
```

## Traits
```yaml
- powerable       # power control commands present (POEC)
- routable        # tie/untie routing commands present
- queryable       # query commands (Q, I, S, etc.) present
- levelable       # volume and gain control present
```

## Actions
```yaml
# Ties (routing)
- id: tie_input_av
  label: Tie input to output (audio and video)
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01 to max)
    - name: output
      type: integer
      description: Output number (01 to max)

- id: tie_input_rgbhv
  label: Tie RGBHV input to output
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: tie_input_video
  label: Tie video input to output
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: tie_input_audio
  label: Tie audio input to output
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: tie_input_all
  label: Tie input to all outputs (audio and video)
  kind: action
  params:
    - name: input
      type: integer

- id: tie_input_all_rgbhv
  label: Tie input to all outputs (RGBHV only)
  kind: action
  params:
    - name: input
      type: integer

- id: tie_input_all_video
  label: Tie input to all outputs (video only)
  kind: action
  params:
    - name: input
      type: integer

- id: tie_input_all_audio
  label: Tie input to all outputs (audio only)
  kind: action
  params:
    - name: input
      type: integer

- id: untie_all
  label: Untie all outputs
  kind: action
  params: []

- id: untie_output
  label: Untie specific output
  kind: action
  params:
    - name: output
      type: integer

- id: untie_input
  label: Untie input
  kind: action
  params:
    - name: input
      type: integer

- id: quick_multiple_tie
  label: Quick multiple tie
  kind: action
  params:
    - name: ties
      type: string
      description: Multiple tie commands concatenated

- id: multi_input_tie
  label: Multi-input XTP transmitter tie
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer
    - name: output
      type: integer

- id: view_multi_input_tie
  label: View multi-input tie per input
  kind: action
  params:
    - name: input
      type: integer

- id: view_all_multi_input_tie
  label: View all multi-input tie
  kind: action
  params: []

# Presets
- id: recall_global_preset
  label: Recall global preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-32

# Mutes - Video (local)
- id: video_mute
  label: Video mute
  kind: action
  params:
    - name: output
      type: integer

- id: video_unmute
  label: Video unmute
  kind: action
  params:
    - name: output
      type: integer

- id: view_video_mute
  label: View video mute status
  kind: query
  params:
    - name: output
      type: integer

- id: video_mute_all
  label: Mute video on all outputs
  kind: action
  params: []

- id: video_unmute_all
  label: Unmute video on all outputs
  kind: action
  params: []

# Mutes - Video (endpoint)
- id: video_mute_endpoint
  label: Video mute/unmute endpoint
  kind: action
  params:
    - name: output
      type: integer
    - name: input
      type: integer
    - name: mute
      type: integer
      description: 0 = unmute, 1 = mute

- id: view_video_mute_endpoint
  label: View video mute endpoint
  kind: query
  params:
    - name: output
      type: integer
    - name: input
      type: integer

- id: video_mute_all_endpoint
  label: Video mute/unmute all endpoints
  kind: action
  params:
    - name: input
      type: integer
    - name: mute
      type: integer

# Mutes - Audio (local)
- id: audio_mute
  label: Audio mute
  kind: action
  params:
    - name: output
      type: integer
    - name: connector
      type: integer
      description: "0=Off, 1=HDMI/SPDIF, 2=Analog, 3=All"

- id: audio_unmute
  label: Audio unmute
  kind: action
  params:
    - name: output
      type: integer
    - name: connector
      type: integer

- id: view_audio_mute
  label: View audio mute status
  kind: query
  params:
    - name: output
      type: integer

- id: audio_mute_all
  label: Mute/unmute audio on all outputs
  kind: action
  params:
    - name: connector
      type: integer

# Mutes - Audio (endpoint)
- id: audio_mute_endpoint
  label: Audio mute/unmute endpoint
  kind: action
  params:
    - name: output
      type: integer
    - name: input
      type: integer
    - name: connector
      type: integer

- id: view_audio_mute_endpoint
  label: View audio mute endpoint
  kind: query
  params:
    - name: output
      type: integer
    - name: input
      type: integer

- id: audio_mute_all_endpoint
  label: Audio mute/unmute all endpoints
  kind: action
  params:
    - name: output
      type: integer
    - name: connector
      type: integer

- id: view_local_output_mutes
  label: View local output mutes
  kind: query
  params: []

# Audio Configuration
- id: set_input_audio_switch_mode
  label: Input audio switch mode
  kind: action
  params:
    - name: input
      type: integer
    - name: mode
      type: integer
      description: "0=Auto, 1=Digital, 2=Analog"

- id: set_endpoint_input_audio_switch_mode
  label: Endpoint-input audio switch mode
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer
    - name: mode
      type: integer

- id: view_input_audio_breakaway
  label: View input audio breakaway selection
  kind: query
  params:
    - name: input
      type: integer

- id: view_all_input_audio_breakaway
  label: View all input audio breakaway selection
  kind: query
  params: []

- id: view_endpoint_input_audio_selection
  label: View input audio selection for endpoints
  kind: query
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: set_input_gain_positive
  label: Set analog input audio gain (+dB)
  kind: action
  params:
    - name: input
      type: integer
    - name: db
      type: integer
      description: -18 to +24 dB

- id: set_input_attenuation
  label: Set analog input audio attenuation (-dB)
  kind: action
  params:
    - name: input
      type: integer
    - name: db
      type: integer

- id: increment_input_gain
  label: Increment gain per analog audio input
  kind: action
  params:
    - name: input
      type: integer

- id: decrement_input_attenuation
  label: Decrement attenuation per analog audio input
  kind: action
  params:
    - name: input
      type: integer

- id: set_endpoint_input_gain_positive
  label: Set endpoint analog input audio gain (+dB)
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer
    - name: db
      type: integer

- id: set_endpoint_input_attenuation
  label: Set endpoint analog input audio attenuation (-dB)
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer
    - name: db
      type: integer

- id: increment_endpoint_input_gain
  label: Increment endpoint gain/attenuation
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: decrement_endpoint_input_attenuation
  label: Decrement endpoint attenuation
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: increment_output_volume
  label: Increment audio volume per output
  kind: action
  params:
    - name: output
      type: integer

- id: decrement_output_volume
  label: Decrement audio volume per output
  kind: action
  params:
    - name: output
      type: integer

- id: set_output_volume
  label: Set audio volume level per output
  kind: action
  params:
    - name: output
      type: integer
    - name: level
      type: integer
      description: "00-64 (1 dB per step)"

- id: increment_endpoint_output_volume
  label: Increment endpoint audio volume
  kind: action
  params:
    - name: output
      type: integer

- id: decrement_endpoint_output_volume
  label: Decrement endpoint audio volume
  kind: action
  params:
    - name: output
      type: integer

- id: set_endpoint_output_volume
  label: Set endpoint audio volume level
  kind: action
  params:
    - name: output
      type: integer
    - name: level
      type: integer

- id: view_endpoint_output_volume
  label: View endpoint output volume
  kind: query
  params:
    - name: output
      type: integer

- id: view_input_audio_gain
  label: View audio gain/attenuation for input
  kind: query
  params:
    - name: input
      type: integer

- id: view_output_volume
  label: View output volume level
  kind: query
  params:
    - name: output
      type: integer

# SDI Audio
- id: sdi_input_audio_breakaway
  label: SDI input audio breakaway selection
  kind: action
  params:
    - name: input
      type: integer
    - name: mode
      type: integer

- id: view_sdi_input_audio_breakaway
  label: View SDI input audio breakaway
  kind: query
  params:
    - name: input
      type: integer

- id: view_all_sdi_input_audio_breakaway
  label: View all SDI input audio breakaway
  kind: query
  params: []

- id: sdi_aes_channel_select
  label: Select SDI AES audio channel
  kind: action
  params:
    - name: input
      type: integer
    - name: channel
      type: integer
      description: AES channel pairs 1 or 2

- id: view_sdi_aes_channel
  label: View selected SDI AES channel
  kind: query
  params:
    - name: input
      type: integer

- id: sdi_aes_group_select
  label: Select SDI AES group
  kind: action
  params:
    - name: input
      type: integer
    - name: group
      type: integer
      description: AES channel group 1 to 4

- id: view_sdi_aes_group
  label: View selected SDI AES group
  kind: query
  params:
    - name: input
      type: integer

# HDMI Input Settings
- id: hdcp_authorized_on
  label: Enable HDCP authorized device
  kind: action
  params:
    - name: input
      type: integer

- id: hdcp_authorized_off
  label: Disable HDCP authorized device
  kind: action
  params:
    - name: input
      type: integer

- id: query_hdcp_authorized_status
  label: Query HDCP authorized device status
  kind: query
  params:
    - name: input
      type: integer

- id: hdcp_authorized_endpoint_on
  label: Enable endpoint HDCP authorized device
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: hdcp_authorized_endpoint_off
  label: Disable endpoint HDCP authorized device
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: query_hdcp_authorized_endpoint_status
  label: Query endpoint HDCP authorized device status
  kind: query
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: query_all_hdcp_endpoints
  label: Query all connected HDCP endpoints
  kind: query
  params: []

# VGA Input Configuration
- id: vga_execute_image_reset
  label: Execute VGA image reset
  kind: action
  params:
    - name: input
      type: integer

- id: vga_recall_preset
  label: Recall VGA input preset
  kind: action
  params:
    - name: input
      type: integer
    - name: preset
      type: integer
      description: Preset number 1-6

- id: vga_save_preset
  label: Save VGA input preset
  kind: action
  params:
    - name: input
      type: integer
    - name: preset
      type: integer

- id: vga_transmitter_image_reset_enable
  label: Enable transmitter image reset
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: vga_transmitter_image_reset_disable
  label: Disable transmitter image reset
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: vga_transmitter_execute_image_reset
  label: Execute transmitter image reset
  kind: action
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: vga_transmitter_view_image_reset
  label: View transmitter image reset setting
  kind: query
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

# Scaler Adjustment
- id: scaler_image_reset_enable
  label: Enable scaler image reset
  kind: action
  params:
    - name: output
      type: integer

- id: scaler_image_reset_disable
  label: Disable scaler image reset
  kind: action
  params:
    - name: output
      type: integer

- id: scaler_execute_image_reset
  label: Execute scaler image reset
  kind: action
  params:
    - name: output
      type: integer

- id: scaler_view_image_reset
  label: View scaler image reset setting
  kind: query
  params:
    - name: output
      type: integer

- id: scaler_freeze_enable
  label: Enable scaler freeze
  kind: action
  params:
    - name: output
      type: integer

- id: scaler_freeze_disable
  label: Disable scaler freeze
  kind: action
  params:
    - name: output
      type: integer

- id: scaler_view_freeze_status
  label: View scaler freeze status
  kind: query
  params:
    - name: output
      type: integer

# HDCP Status
- id: view_input_hdcp_status
  label: View input HDCP status
  kind: query
  params:
    - name: input
      type: integer

- id: view_all_input_hdcp_status
  label: View all input HDCP status
  kind: query
  params: []

- id: view_endpoint_input_hdcp_status
  label: View endpoint input HDCP status
  kind: query
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: view_all_endpoint_input_hdcp_status
  label: View all endpoint input HDCP status
  kind: query
  params: []

# Signal Status
- id: list_all_inputs_sync
  label: List all inputs sync (DSVP)
  kind: query
  params: []

- id: input_signal_status_endpoint
  label: Input signal status for endpoint
  kind: query
  params:
    - name: input
      type: integer
    - name: sub_input
      type: integer

- id: list_all_sync_endpoints
  label: List all sync for endpoints
  kind: query
  params: []

# WindoWall
- id: windowall_preset_recall
  label: WindoWall preset recall
  kind: action
  params:
    - name: preset
      type: integer

- id: windowall_video_mute_window
  label: Video mute/unmute individual window
  kind: action
  params:
    - name: window
      type: integer
    - name: video_input
      type: integer
    - name: audio_input
      type: integer
    - name: mute
      type: integer

- id: windowall_view_video_mute
  label: View video mute window
  kind: query
  params:
    - name: window
      type: integer

- id: windowall_audio_mute_window
  label: Audio mute/unmute individual window
  kind: action
  params:
    - name: window
      type: integer
    - name: mute
      type: integer

- id: windowall_view_audio_mute
  label: View audio mute window
  kind: query
  params:
    - name: window
      type: integer

- id: windowall_tie_av
  label: Tie input (audio and video) to window
  kind: action
  params:
    - name: window
      type: integer
    - name: input
      type: integer

- id: windowall_tie_video
  label: Tie video input to window
  kind: action
  params:
    - name: window
      type: integer
    - name: input
      type: integer

- id: windowall_tie_audio
  label: Tie audio input to window
  kind: action
  params:
    - name: window
      type: integer
    - name: input
      type: integer

- id: windowall_view_input
  label: View input to window
  kind: query
  params:
    - name: window
      type: integer

# XTP Setup Parameters
- id: xtp_input_power_enable
  label: Enable XTP input power
  kind: action
  params:
    - name: input
      type: integer
    - name: enable
      type: integer

- id: xtp_input_power_all
  label: Enable/disable all XTP input power
  kind: action
  params:
    - name: enable
      type: integer

- id: xtp_output_power_enable
  label: Enable XTP output power
  kind: action
  params:
    - name: output
      type: integer
    - name: enable
      type: integer

- id: xtp_output_power_all
  label: Enable/disable all XTP output power
  kind: action
  params:
    - name: enable
      type: integer

- id: view_xtp_input_power
  label: View XTP input power settings
  kind: query
  params:
    - name: input
      type: integer

- id: view_all_xtp_input_power
  label: View all XTP input power settings
  kind: query
  params: []

- id: view_xtp_output_power
  label: View XTP output power settings
  kind: query
  params:
    - name: output
      type: integer

- id: view_all_xtp_output_power
  label: View all XTP output power settings
  kind: query
  params: []

- id: query_xtp_power_usage
  label: Query XTP power usage
  kind: query
  params: []

# XTP Relay Control
- id: relay_on_off
  label: Turn relay on/off
  kind: action
  params:
    - name: output
      type: integer
    - name: relay
      type: integer
      description: Relay number 1 or 2
    - name: state
      type: integer
      description: "0=Off, 1=On, 2=Toggle"

- id: relay_pulse
  label: Pulse relay
  kind: action
  params:
    - name: output
      type: integer
    - name: relay
      type: integer
    - name: time
      type: integer
      description: Pulse time 1-65535 (1=16ms)

- id: view_relays
  label: View relay status
  kind: query
  params:
    - name: output
      type: integer
    - name: relay
      type: integer

# File Directory
- id: view_file_directory
  label: View file directory
  kind: query
  params: []

- id: erase_user_file
  label: Erase user-supplied web page/file
  kind: action
  params:
    - name: filename
      type: string

# Information Requests
- id: info_matrix_size
  label: Information request (matrix size)
  kind: query
  params: []

- id: request_part_number
  label: Request part number
  kind: query
  params: []

- id: request_io_board_config
  label: Request input/output board configuration
  kind: query
  params: []

- id: query_firmware_version
  label: Query controller firmware version
  kind: query
  params: []

- id: query_firmware_version_verbose
  label: Query controller firmware version (verbose)
  kind: query
  params: []

- id: request_system_status
  label: Request system status
  kind: query
  params: []

- id: view_all_input_connections
  label: View all input connections
  kind: query
  params: []

# Test Patterns
- id: output_test_pattern
  label: Output test pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: "00=Disable, 01-02=Color bars/Black, 03-04=720p50/60, 05-06=1080p60"

- id: disable_test_pattern
  label: Disable test pattern
  kind: action
  params: []

- id: view_test_pattern_status
  label: View test pattern status
  kind: query
  params: []

# Lockout Modes
- id: lock_panel_basic
  label: Front panel locked (basic feature only)
  kind: action
  params: []

- id: lock_panel_view_only
  label: Front panel locked (view only)
  kind: action
  params: []

- id: unlock_panel
  label: Front panel unlocked
  kind: action
  params: []

- id: view_lock_status
  label: View lock status
  kind: query
  params: []

- id: set_input_endpoint_lockout
  label: Set input endpoint front panel lockout mode
  kind: action
  params:
    - name: input
      type: integer
    - name: mode
      type: integer

- id: set_all_input_endpoint_lockout
  label: Set all input endpoint front panel lockout mode
  kind: action
  params:
    - name: mode
      type: integer

- id: view_input_endpoint_lockout
  label: View input endpoint front panel lockout mode
  kind: query
  params:
    - name: input
      type: integer

- id: set_output_endpoint_lockout
  label: Set output endpoint front panel lockout mode
  kind: action
  params:
    - name: output
      type: integer
    - name: mode
      type: integer

- id: set_all_output_endpoint_lockout
  label: Set all output endpoint front panel lockout mode
  kind: action
  params:
    - name: mode
      type: integer

- id: view_output_endpoint_lockout
  label: View output endpoint front panel lockout mode
  kind: query
  params:
    - name: output
      type: integer

# Resets
- id: reset_global_presets_names
  label: Reset global presets and names
  kind: action
  params: []

- id: reset_individual_global_preset
  label: Reset individual global preset
  kind: action
  params:
    - name: preset
      type: integer

- id: reset_all_audio_gains
  label: Reset all audio gains to 0dB
  kind: action
  params: []

- id: reset_all_audio_volume
  label: Reset all audio volume to 100%
  kind: action
  params: []

- id: unmute_rgb_audio
  label: Unmute RGB/Audio (all mutes)
  kind: action
  params: []

- id: system_reset_factory
  label: System reset (factory default)
  kind: action
  params: []

- id: reset_flash
  label: Reset flash
  kind: action
  params: []

- id: absolute_reset_ip
  label: Absolute reset including IP settings
  kind: action
  params: []

- id: reset_all_device_delete_files
  label: Reset all device settings and delete files
  kind: action
  params: []

- id: reset_input_endpoint
  label: Reset input endpoint
  kind: action
  params:
    - name: input
      type: integer

- id: reset_all_input_endpoints
  label: Reset all input endpoints
  kind: action
  params: []

- id: reset_output_endpoint
  label: Reset output endpoint
  kind: action
  params:
    - name: output
      type: integer

- id: reset_all_output_endpoints
  label: Reset all output endpoints
  kind: action
  params: []

# IP Remote Port Commands
- id: set_matrix_name
  label: Set matrix name
  kind: action
  params:
    - name: name
      type: string
      description: Up to 24 alphanumeric characters

- id: read_matrix_name
  label: Read matrix name
  kind: query
  params: []

- id: reset_matrix_name
  label: Reset matrix name to factory default
  kind: action
  params: []

- id: set_time_date
  label: Set time and date
  kind: action
  params:
    - name: datetime
      type: string
      description: Format MM/DD/YY.HH:mm:SS

- id: read_time_date
  label: Read time and date
  kind: query
  params: []

- id: set_gmt_offset
  label: Set GMT offset
  kind: action
  params:
    - name: offset
      type: number
      description: "-12.0 to +14.0"

- id: read_gmt_offset
  label: Read GMT offset
  kind: query
  params: []

- id: set_daylight_savings
  label: Set Daylight Savings Time
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=NA, 2=Europe, 3=Brazil"

- id: read_daylight_savings
  label: Read Daylight Savings Time
  kind: query
  params: []

- id: set_ip_address
  label: Set IP address
  kind: action
  params:
    - name: ip
      type: string

- id: read_ip_address
  label: Read IP address
  kind: query
  params: []

- id: read_hardware_address
  label: Read hardware address (MAC)
  kind: query
  params: []

- id: read_open_connections
  label: Read number of open connections
  kind: query
  params: []

- id: set_subnet_mask
  label: Set subnet mask
  kind: action
  params:
    - name: mask
      type: string

- id: read_subnet_mask
  label: Read subnet mask
  kind: query
  params: []

- id: set_gateway_ip
  label: Set gateway IP address
  kind: action
  params:
    - name: ip
      type: string

- id: read_gateway_ip
  label: Read gateway IP address
  kind: query
  params: []

- id: set_admin_password
  label: Set administrator password
  kind: action
  params:
    - name: password
      type: string
      description: Up to 12 alphanumeric characters

- id: read_admin_password
  label: Read administrator password
  kind: query
  params: []

- id: clear_admin_password
  label: Clear administrator password
  kind: action
  params: []

- id: set_user_password
  label: Set user password
  kind: action
  params:
    - name: password
      type: string

- id: read_user_password
  label: Read user password
  kind: query
  params: []

- id: clear_user_password
  label: Clear user password
  kind: action
  params: []

- id: set_mail_server
  label: Set mail server and domain name
  kind: action
  params:
    - name: ip
      type: string
    - name: domain
      type: string
    - name: password
      type: string

- id: read_mail_server
  label: Read mail server and domain name
  kind: query
  params: []

- id: set_email_recipient
  label: Set e-mail recipient
  kind: action
  params:
    - name: account
      type: integer
      description: "65-72 (recipient 1-8)"
    - name: address
      type: string

- id: read_email_recipient
  label: Read e-mail recipient
  kind: query
  params:
    - name: account
      type: integer

- id: set_email_events
  label: Set e-mail events for recipient
  kind: action
  params:
    - name: selection1
      type: string
    - name: account
      type: integer
    - name: selection2
      type: integer
    - name: notify
      type: integer

- id: read_email_notifications
  label: Read e-mail notifications for account
  kind: query
  params:
    - name: account
      type: integer

- id: set_dhcp_on_off
  label: Set DHCP on or off
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=off, 1=on"

- id: read_dhcp_status
  label: Read DHCP on/off status
  kind: query
  params: []

- id: set_serial_port_params
  label: Set serial port parameters
  kind: action
  params:
    - name: port
      type: integer
      description: "01=Remote RS-232/RS-422, 03-130=UARTs"
    - name: baud
      type: integer
      description: "9600, 19200, 38400, 115200"
    - name: parity
      type: string
      description: "O=odd, E=even, N=none, M=mark, S=space"
    - name: databits
      type: integer
      description: "7 or 8"
    - name: stopbits
      type: integer
      description: "1 or 2"

- id: read_serial_port_params
  label: Read serial port parameters
  kind: query
  params:
    - name: port
      type: integer

- id: configure_flow_control
  label: Configure flow control
  kind: action
  params:
    - name: port
      type: integer
    - name: flow
      type: string
      description: "H=hardware, S=software, N=none"
    - name: pacing
      type: integer
      description: "0000-1000 (data pacing in ms)"

- id: read_flow_control
  label: Read flow control
  kind: query
  params:
    - name: port
      type: integer

- id: configure_receive_timeout
  label: Configure receive timeout
  kind: action
  params:
    - name: port
      type: integer
    - name: wait_time
      type: integer
      description: "10-32767 (10ms increments)"
    - name: char_time
      type: integer
      description: "2-32767 (10ms increments)"

- id: read_receive_timeout
  label: Read receive timeout
  kind: query
  params:
    - name: port
      type: integer

- id: set_port_mode
  label: Set port mode
  kind: action
  params:
    - name: port
      type: integer
    - name: mode
      type: integer
      description: "0=RS-232, 1=RS-422"

- id: read_port_mode
  label: Read port mode
  kind: query
  params:
    - name: port
      type: integer

# RS-232 Insertion Port Commands
- id: enable_input_captive_screw
  label: Enable input for captive screw insertion
  kind: action
  params:
    - name: input
      type: integer

- id: enable_input_ethernet
  label: Enable input for Ethernet insertion
  kind: action
  params:
    - name: input
      type: integer

- id: enable_output_captive_screw
  label: Enable output for captive screw insertion
  kind: action
  params:
    - name: output
      type: integer

- id: enable_output_ethernet
  label: Enable output for Ethernet insertion
  kind: action
  params:
    - name: output
      type: integer

- id: view_input_insert_setting
  label: View input insert setting
  kind: query
  params:
    - name: input
      type: integer

- id: view_output_insert_setting
  label: View output insert setting
  kind: query
  params:
    - name: output
      type: integer
```

## Feedbacks
```yaml
# Error responses
- id: error_invalid_input
  type: string
  values: ["E01"]

- id: error_invalid_command
  type: string
  values: ["E10"]

- id: error_invalid_preset
  type: string
  values: ["E11"]

- id: error_invalid_output
  type: string
  values: ["E12"]

- id: error_invalid_value
  type: string
  values: ["E13"]

- id: error_invalid_config
  type: string
  values: ["E14"]

- id: error_timeout
  type: string
  values: ["E17"]

- id: error_busy
  type: string
  values: ["E22"]

- id: error_privilege
  type: string
  values: ["E24"]

- id: error_device_not_present
  type: string
  values: ["E25"]

- id: error_max_connections
  type: string
  values: ["E26"]

- id: error_invalid_event
  type: string
  values: ["E27"]

- id: error_bad_filename
  type: string
  values: ["E28"]

# Unsolicited messages
- id: quick_tie_message
  type: string
  values: ["Qik"]

- id: preset_saved
  type: string
  description: "Format: PrstSnn (nn = preset number)"

- id: preset_recalled
  type: string
  description: "Format: PrstRnn (nn = preset number)"

- id: audio_input_level_changed
  type: string
  description: "Format: Innn.Audxx (nn = input, xx = dB level)"

- id: output_volume_changed
  type: string
  description: "Format: Outnn.Volxx (nn = output, xx = dB attenuation)"

- id: video_mute_changed
  type: string
  description: "Format: Vmtnn*x (nn = output, x = mute status 0/1)"

- id: audio_mute_changed
  type: string
  description: "Format: Amtnn*x (nn = output, x = mute status 0/1)"

- id: lockout_mode_changed
  type: string
  description: "Format: Execn (n = lockout mode 0/1/2)"
```

## Variables
```yaml
# No standalone variables; all parameters embedded in actions
```

## Events
```yaml
# Unsolicited notifications from device
- id: tie_created
  type: string
  description: Qik - occurs when front panel tie is created

- id: preset_saved_unsolicited
  type: string
  description: PrstSnn - occurs when preset saved from front panel

- id: preset_recalled_unsolicited
  type: string
  description: PrstRnn - occurs when preset recalled from front panel

- id: audio_input_level_change_unsolicited
  type: string
  description: Innn.Audxx - analog audio input level changed from front panel

- id: output_volume_change_unsolicited
  type: string
  description: Outnn.Volxx - output volume changed from front panel

- id: video_mute_change_unsolicited
  type: string
  description: Vmtnn*x - video output muted/unmuted from front panel

- id: audio_mute_change_unsolicited
  type: string
  description: Amtnn*x - audio output muted/unmuted from front panel

- id: lockout_mode_change_unsolicited
  type: string
  description: Execn - front panel lockout mode changed

- id: hdcp_status_change_unsolicited
  type: string
  description: HdcpI or HdcpT - HDCP status change detected

- id: signal_status_change_unsolicited
  type: string
  description: Frq00 - signal status change detected

- id: power_request_change_unsolicited
  type: string
  description: PoecI/PoecO - power request changed
```

## Macros
```yaml
# No explicit macros in source; use multi-action sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Do not connect a computer directly to a connected XTP device for configuration when it is part of an XTP System"
  - "RS-232 and IR data can be transmitted or received simultaneously"
  - "Extron recommends leaving default baud rate at 9600"
  - "Extron recommends leaving default timeout at 5 minutes and periodically issuing Query (Q) command to keep connection active"
  - "For XTP II CrossPoint 6400 only: factory set administrator password is the product serial number"
```

## Notes
Matrix switcher SIS command protocol. Supports simultaneous serial (RS-232/RS-422) and TCP/IP control. Default IP: 192.168.254.254, port 23. Up to 200 simultaneous TCP connections. Commands are not case-sensitive except audio gain/attenuation. All responses end with CR/LF. Password applies to TCP/Telnet only.

<!-- UNRESOLVED: matrix size (input × output count) not explicitly stated in source -->
<!-- UNRESOLVED: model-specific port count not enumerated in source -->
<!-- UNRESOLVED: firmware version ranges not stated in source -->
<!-- UNRESOLVED: voltage/power specifications not in source -->
<!-- UNRESOLVED: default password for 1600/3200 models not stated -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-1736-02_P_xtp_ii_crosspoint.pdf
  - https://media.extron.com/public/download/files/userman/68-1736-51_F_xtp_ii_cp.pdf
  - https://www.extron.com/download/files/userman/68-1736-50_E.pdf
  - https://www.extron.com
retrieved_at: 2026-05-27T18:49:54.609Z
last_checked_at: 2026-05-30T20:15:53.231Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-30T20:15:53.231Z
matched_actions: 190
action_count: 190
confidence: medium
summary: "All 190 semantic spec actions map one-to-one to SIS command table rows, with supported serial and TCP transport settings. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Matrix size (input × output) not explicitly stated; inferred from port numbering tables"
- "password optional; source describes login flow but no default"
- "matrix size (input × output count) not explicitly stated in source"
- "model-specific port count not enumerated in source"
- "firmware version ranges not stated in source"
- "voltage/power specifications not in source"
- "default password for 1600/3200 models not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
