---
spec_id: admin/extron-xtp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron XTP Series Control Spec"
manufacturer: Extron
model_family: "XTP CrossPoint 1600"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "XTP CrossPoint 1600"
    - "XTP CrossPoint 3200"
    - "XTP CrossPoint 6400"
    - "XTP II CrossPoint 1600"
    - "XTP II CrossPoint 3200"
    - "XTP II CrossPoint 6400"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - support.displaymanager.net
  - usermanual.wiki
  - mans.io
source_urls:
  - https://media.extron.com/public/download/files/userman/68-1736-02_P_xtp_ii_crosspoint.pdf
  - https://media.extron.com/public/download/files/userman/68-2716-01_D.pdf
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
  - https://usermanual.wiki/Document/68173650D.525539700.pdf
  - https://mans.io/files/viewer/2310439/52
retrieved_at: 2026-07-26T07:27:17.925Z
last_checked_at: 2026-10-07T20:45:06.508Z
generated_at: 2026-10-07T20:45:06.508Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state firmware compatibility ranges."
  - "source does not describe explicit multi-step command sequences."
  - "source states no additional command safety interlocks or sequencing requirements."
  - "model-specific command availability and firmware compatibility are not fully stated in refined source."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:45:06.508Z
  matched_actions: 195
  action_count: 195
  confidence: medium
  summary: "All 195 action units match source SIS commands and every transport value is stated in the source. The one open point is that the spec lists non-II XTP models while the source covers XTP II. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Extron XTP Series Control Spec

## Summary

Extron XTP CrossPoint and XTP II CrossPoint matrix switchers support SIS control through local RS-232 or RS-422 serial connections and TCP port 23. Commands cover matrix routing, presets, mutes, audio, endpoint configuration, signal and HDCP status, relay control, system administration, and resets.

<!-- UNRESOLVED: source does not state firmware compatibility ranges. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 9600
  supported_baud_rates:
    - 9600
    - 19200
    - 38400
    - 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED
  notes: Password protection is optional for TCP and Telnet connections. Administrator and user access levels are supported. Serial connections do not use the documented TCP password prompt.
```

## Traits

```yaml
- routable  # inferred from routing command examples
- queryable  # inferred from query command examples
- levelable  # inferred from gain and volume command examples
```

## Actions

```yaml
- id: tie_input_av_to_output
  label: Tie Input Audio and Video to Output
  kind: action
  command: "X30!*X30#!"
  params:
    - name: input
      type: integer
      description: X30!, input number
    - name: output
      type: integer
      description: X30#, output number

- id: tie_rgbhv_input_to_output
  label: Tie RGBHV Input to Output
  kind: action
  command: "X30!*X30#&"
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: tie_video_input_to_output
  label: Tie Video Input to Output
  kind: action
  command: "X30!*X30#%"
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: tie_audio_input_to_output
  label: Tie Audio Input to Output
  kind: action
  command: "X30!*X30#$"
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: tie_input_av_to_all_outputs
  label: Tie Input Audio and Video to All Outputs
  kind: action
  command: "X30!*!"
  params:
    - name: input
      type: integer

- id: tie_rgbhv_input_to_all_outputs
  label: Tie RGBHV Input to All Outputs
  kind: action
  command: "X30!*&"
  params:
    - name: input
      type: integer

- id: tie_video_input_to_all_outputs
  label: Tie Video Input to All Outputs
  kind: action
  command: "X30!*%"
  params:
    - name: input
      type: integer

- id: tie_audio_input_to_all_outputs
  label: Tie Audio Input to All Outputs
  kind: action
  command: "X30!*$"
  params:
    - name: input
      type: integer

- id: untie_all_outputs
  label: Untie All Outputs
  kind: action
  command: "0*!"
  params: []

- id: untie_output
  label: Untie Output
  kind: action
  command: "0*X30#!"
  params:
    - name: output
      type: integer

- id: untie_input
  label: Untie Input
  kind: action
  command: "X30!*0!"
  params:
    - name: input
      type: integer

- id: quick_multiple_tie
  label: Quick Multiple Tie
  kind: action
  command: "E+QX30!*X30#!}"
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: switch_multi_input_transmitter
  label: Switch Multi-input XTP Transmitter
  kind: action
  command: "EX30!*X32@*X32#Etie}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint
      type: integer
    - name: endpoint_input
      type: integer

- id: query_multi_input_tie
  label: View Multi-input Tie per Input
  kind: query
  command: "EX30!ETIE}"
  params:
    - name: input
      type: integer

- id: query_all_multi_input_ties
  label: View All Multi-input Ties
  kind: query
  command: "EETIE}"
  params: []

- id: recall_global_preset
  label: Recall Global Preset
  kind: action
  command: "ERX31!PRST}"
  params:
    - name: preset
      type: integer
      description: Global preset 01 through 32

- id: video_mute_output
  label: Video Mute Output
  kind: action
  command: "X30#*1B/b"
  params:
    - name: output
      type: integer

- id: video_unmute_output
  label: Video Unmute Output
  kind: action
  command: "X30#*0B/b"
  params:
    - name: output
      type: integer

- id: query_video_mute_output
  label: View Video Mute
  kind: query
  command: "X30#B/b"
  params:
    - name: output
      type: integer

- id: video_mute_all
  label: Video Mute All Outputs
  kind: action
  command: "1*B/b"
  params: []

- id: video_unmute_all
  label: Video Unmute All Outputs
  kind: action
  command: "0*B/b"
  params: []

- id: set_endpoint_video_mute
  label: Set Endpoint Video Mute
  kind: action
  command: "ERX30#*1*X30(B/b}"
  params:
    - name: output
      type: integer
    - name: mute
      type: integer
      description: 0 unmuted, 1 muted

- id: query_endpoint_video_mute
  label: View Endpoint Video Mute
  kind: query
  command: "ERX30#*1B/b}"
  params:
    - name: output
      type: integer

- id: set_all_endpoint_video_mutes
  label: Set All Endpoint Video Mutes
  kind: action
  command: "ERX30(*B/b}"
  params:
    - name: mute
      type: integer
      description: 0 unmuted, 1 muted

- id: set_audio_mute_output
  label: Set Audio Mute per Output
  kind: action
  command: "X30#*X31)Z/z"
  params:
    - name: output
      type: integer
    - name: connector_type
      type: integer
      description: 0 off, 1 HDMI/SPDIF, 2 analog, 3 all

- id: audio_unmute_output
  label: Audio Unmute Output
  kind: action
  command: "X30#*0Z/z"
  params:
    - name: output
      type: integer

- id: query_audio_mute_output
  label: View Audio Mute
  kind: query
  command: "X30#Z/z"
  params:
    - name: output
      type: integer

- id: set_audio_mute_all
  label: Set Audio Mute for All Outputs
  kind: action
  command: "X31)*Z/z"
  params:
    - name: connector_type
      type: integer

- id: set_endpoint_audio_mute
  label: Set Endpoint Audio Mute
  kind: action
  command: "ERX30#*1*X31)Z/z}"
  params:
    - name: output
      type: integer
    - name: connector_type
      type: integer

- id: query_endpoint_audio_mute
  label: View Endpoint Audio Mute
  kind: query
  command: "ERX30#*1Z/z}"
  params:
    - name: output
      type: integer

- id: set_all_endpoint_audio_mutes
  label: Set All Endpoint Audio Mutes
  kind: action
  command: "ERX30#*Z/z}"
  params:
    - name: output
      type: integer

- id: query_local_output_mutes
  label: View Local Output Mutes
  kind: query
  command: "EVM}"
  params: []

- id: set_input_audio_switch_mode
  label: Set Input Audio Switch Mode
  kind: action
  command: "EIX30!*X34#AFMT}"
  params:
    - name: input
      type: integer
    - name: mode
      type: integer
      description: 0 auto, 1 digital two-channel, 2 local two-channel

- id: set_endpoint_input_audio_switch_mode
  label: Set Endpoint Input Audio Switch Mode
  kind: action
  command: "ETX30!*X30@*X34#AFMT}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer
    - name: mode
      type: integer

- id: query_input_audio_switch_mode
  label: View Input Audio Breakaway Selection
  kind: query
  command: "EIX30!AFMT}"
  params:
    - name: input
      type: integer

- id: query_all_input_audio_switch_modes
  label: View All Input Audio Breakaway Selections
  kind: query
  command: "EIAFMT}"
  params: []

- id: query_endpoint_input_audio_switch_mode
  label: View Endpoint Input Audio Selection
  kind: query
  command: "ETX30!*X30@AFMT}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: set_input_audio_gain
  label: Set Analog Input Audio Gain
  kind: action
  command: "X30!*X30$G"
  params:
    - name: input
      type: integer
    - name: gain_db
      type: integer
      description: Positive gain, within documented -18 to +24 dB range

- id: set_input_audio_attenuation
  label: Set Analog Input Audio Attenuation
  kind: action
  command: "X30!*X31%g"
  params:
    - name: input
      type: integer
    - name: attenuation_db
      type: integer

- id: increment_input_audio_gain
  label: Increment Analog Input Audio Gain
  kind: action
  command: "X30!+G"
  params:
    - name: input
      type: integer

- id: decrement_input_audio_gain
  label: Decrement Analog Input Audio Gain
  kind: action
  command: "X30!-G"
  params:
    - name: input
      type: integer

- id: set_endpoint_input_audio_gain
  label: Set Endpoint Analog Input Audio Gain
  kind: action
  command: "ETX30!*X30@*X30$G}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer
    - name: gain_db
      type: integer

- id: set_endpoint_input_audio_attenuation
  label: Set Endpoint Analog Input Audio Attenuation
  kind: action
  command: "ETX30!*X30@*X31%g}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer
    - name: attenuation_db
      type: integer

- id: increment_endpoint_input_audio
  label: Increment Endpoint Input Audio
  kind: action
  command: "ETX30!*X30@*+G}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: decrement_endpoint_input_audio
  label: Decrement Endpoint Input Audio
  kind: action
  command: "ETX30!*X30@*-G}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: increment_output_volume
  label: Increment Analog Output Volume
  kind: action
  command: "X30#+V/v"
  params:
    - name: output
      type: integer

- id: decrement_output_volume
  label: Decrement Analog Output Volume
  kind: action
  command: "X30#-V/v"
  params:
    - name: output
      type: integer

- id: set_output_volume
  label: Set Analog Output Volume
  kind: action
  command: "X30#*X30&V/v"
  params:
    - name: output
      type: integer
    - name: level
      type: integer
      description: 00 through 64, one dB per step

- id: increment_endpoint_output_volume
  label: Increment Endpoint Output Volume
  kind: action
  command: "ERX30#*1*+V/v}"
  params:
    - name: output
      type: integer

- id: decrement_endpoint_output_volume
  label: Decrement Endpoint Output Volume
  kind: action
  command: "ERX30#*1*-V/v}"
  params:
    - name: output
      type: integer

- id: set_endpoint_output_volume
  label: Set Endpoint Output Volume
  kind: action
  command: "ERX30#*1*X30&V/v}"
  params:
    - name: output
      type: integer
    - name: level
      type: integer

- id: query_endpoint_output_volume
  label: View Endpoint Output Volume
  kind: query
  command: "ERX30#*1V/v}"
  params:
    - name: output
      type: integer

- id: query_input_audio_gain
  label: View Input Audio Gain or Attenuation
  kind: query
  command: "X30!G"
  params:
    - name: input
      type: integer

- id: query_output_volume
  label: View Output Audio Volume
  kind: query
  command: "X30#V/v"
  params:
    - name: output
      type: integer

- id: select_sdi_audio_channel
  label: Select SDI AES Audio Channel
  kind: action
  command: "EIX30!*X31&AESC}"
  params:
    - name: input
      type: integer
    - name: channel_pair
      type: integer
      description: AES channel pair 1 or 2

- id: query_sdi_audio_channel
  label: View Selected SDI AES Audio Channel
  kind: query
  command: "EIX30!AESC}"
  params:
    - name: input
      type: integer

- id: select_sdi_audio_group
  label: Select SDI AES Audio Group
  kind: action
  command: "EIX30!*X31*AESG}"
  params:
    - name: input
      type: integer
    - name: group
      type: integer
      description: AES group 1 through 4

- id: query_sdi_audio_group
  label: View Selected SDI AES Audio Group
  kind: query
  command: "EIX30!AESG}"
  params:
    - name: input
      type: integer

- id: enable_input_hdcp_authorization
  label: Enable Input HDCP Authorization
  kind: action
  command: "EEX30!*1HDCP}"
  params:
    - name: input
      type: integer

- id: disable_input_hdcp_authorization
  label: Disable Input HDCP Authorization
  kind: action
  command: "EEX30!*0HDCP}"
  params:
    - name: input
      type: integer

- id: query_input_hdcp_authorization
  label: Query Input HDCP Authorization
  kind: query
  command: "EEX30!HDCP}"
  params:
    - name: input
      type: integer

- id: enable_endpoint_hdcp_authorization
  label: Enable Endpoint HDCP Authorization
  kind: action
  command: "ETEX30!*X30@*1HDCP}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: disable_endpoint_hdcp_authorization
  label: Disable Endpoint HDCP Authorization
  kind: action
  command: "ETEX30!*X30@*0HDCP}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: query_endpoint_hdcp_authorization
  label: Query Endpoint HDCP Authorization
  kind: query
  command: "ETEX30!*X30@HDCP}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: query_all_endpoint_hdcp_authorizations
  label: Query All Endpoint HDCP Authorizations
  kind: query
  command: "ETEHDCP}"
  params: []

- id: execute_input_image_reset
  label: Execute Input Image Reset
  kind: action
  command: "EIX30!*2AADJ}"
  params:
    - name: input
      type: integer

- id: recall_vga_input_preset
  label: Recall VGA Input Preset
  kind: action
  command: "X30!*1*X37@."
  params:
    - name: input
      type: integer
    - name: preset
      type: integer
      description: Preset 1 through 6

- id: save_vga_input_preset
  label: Save VGA Input Preset
  kind: action
  command: "X30!*1*X37@,"
  params:
    - name: input
      type: integer
    - name: preset
      type: integer

- id: enable_transmitter_image_reset
  label: Enable Transmitter Image Reset
  kind: action
  command: "ETX30!*X30@*1AADJ}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: disable_transmitter_image_reset
  label: Disable Transmitter Image Reset
  kind: action
  command: "ETX30!*X30@*0AADJ}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: execute_transmitter_image_reset
  label: Execute Transmitter Image Reset
  kind: action
  command: "ETX30!*X30@*2AADJ}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: query_transmitter_image_reset
  label: View Transmitter Image Reset
  kind: query
  command: "ETX30!*X30@AADJ}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: enable_receiver_image_reset
  label: Enable Receiver Image Reset
  kind: action
  command: "ERX30#*1*1AADJ}"
  params:
    - name: output
      type: integer

- id: disable_receiver_image_reset
  label: Disable Receiver Image Reset
  kind: action
  command: "ERX30#*1*0AADJ}"
  params:
    - name: output
      type: integer

- id: execute_receiver_image_reset
  label: Execute Receiver Image Reset
  kind: action
  command: "ERX30#*1*2AADJ}"
  params:
    - name: output
      type: integer

- id: query_receiver_image_reset
  label: View Receiver Image Reset
  kind: query
  command: "ERX30#*1AADJ}"
  params:
    - name: output
      type: integer

- id: freeze_receiver_output
  label: Freeze Receiver Output
  kind: action
  command: "ERX30#*1*1F}"
  params:
    - name: output
      type: integer

- id: unfreeze_receiver_output
  label: Unfreeze Receiver Output
  kind: action
  command: "ERX30#*1*0F}"
  params:
    - name: output
      type: integer

- id: query_receiver_freeze_status
  label: View Receiver Freeze Status
  kind: query
  command: "ERX30#*1F}"
  params:
    - name: output
      type: integer

- id: query_input_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "EIX30!HDCP}"
  params:
    - name: input
      type: integer

- id: query_all_input_hdcp_statuses
  label: View All Input HDCP Statuses
  kind: query
  command: "EIHDCP}"
  params: []

- id: query_endpoint_input_hdcp_status
  label: View Endpoint Input HDCP Status
  kind: query
  command: "ETX30!*X30@HDCP}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: query_all_endpoint_input_hdcp_statuses
  label: View All Endpoint Input HDCP Statuses
  kind: query
  command: "ETHDCP}"
  params: []

- id: query_all_input_sync
  label: List All Input Sync Status
  kind: query
  command: "0LS"
  params: []

- id: query_endpoint_input_signal
  label: View Endpoint Input Signal Status
  kind: query
  command: "ETX30!*X30@*LS}"
  params:
    - name: matrix_input
      type: integer
    - name: endpoint_input
      type: integer

- id: query_all_endpoint_sync
  label: List All Endpoint Sync Status
  kind: query
  command: "ETLS}"
  params: []

- id: recall_windowall_preset
  label: Recall WindoWall Preset
  kind: action
  command: "ERX1!CHOP}"
  params:
    - name: preset
      type: integer
      description: Preset 01 through 64

- id: set_window_video_mute
  label: Set Individual Window Video Mute
  kind: action
  command: "EBX1@*X30(CHOP}"
  params:
    - name: window
      type: integer
    - name: mute
      type: integer

- id: query_window_video_mute
  label: View Individual Window Video Mute
  kind: query
  command: "EBX1@CHOP}"
  params:
    - name: window
      type: integer

- id: set_window_audio_mute
  label: Set Individual Window Audio Mute
  kind: action
  command: "EZX1@*X32!CHOP}"
  params:
    - name: window
      type: integer
    - name: mute
      type: integer

- id: query_window_audio_mute
  label: View Individual Window Audio Mute
  kind: query
  command: "EZX1@CHOP}"
  params:
    - name: window
      type: integer

- id: tie_av_input_to_window
  label: Tie Audio and Video Input to Window
  kind: action
  command: "E!X1@*X30!CHOP}"
  params:
    - name: window
      type: integer
    - name: input
      type: integer

- id: tie_video_input_to_window
  label: Tie Video Input to Window
  kind: action
  command: "E%X1@*X30!CHOP}"
  params:
    - name: window
      type: integer
    - name: input
      type: integer

- id: tie_audio_input_to_window
  label: Tie Audio Input to Window
  kind: action
  command: "E$X1@*X30!CHOP}"
  params:
    - name: window
      type: integer
    - name: input
      type: integer

- id: query_window_av_input
  label: View Audio and Video Input to Window
  kind: query
  command: "E!X1@CHOP}"
  params:
    - name: window
      type: integer

- id: set_input_remote_power
  label: Set Input XTP Remote Power
  kind: action
  command: "EIX30!*X39!POEC}"
  params:
    - name: input
      type: integer
    - name: enabled
      type: integer
      description: 0 disabled, 1 enabled

- id: set_all_input_remote_power
  label: Set All Input XTP Remote Power
  kind: action
  command: "EIX39!*POEC}"
  params:
    - name: enabled
      type: integer

- id: set_output_remote_power
  label: Set Output XTP Remote Power
  kind: action
  command: "EOX30#*X39!POEC}"
  params:
    - name: output
      type: integer
    - name: enabled
      type: integer

- id: set_all_output_remote_power
  label: Set All Output XTP Remote Power
  kind: action
  command: "EOX39!*POEC}"
  params:
    - name: enabled
      type: integer

- id: query_input_remote_power
  label: View Input XTP Remote Power
  kind: query
  command: "EIX30!POEC}"
  params:
    - name: input
      type: integer

- id: query_all_input_remote_power
  label: View All Input XTP Remote Power
  kind: query
  command: "EIPOEC}"
  params: []

- id: query_output_remote_power
  label: View Output XTP Remote Power
  kind: query
  command: "EOX30#POEC}"
  params:
    - name: output
      type: integer

- id: query_all_output_remote_power
  label: View All Output XTP Remote Power
  kind: query
  command: "EOPOEC}"
  params: []

- id: query_xtp_power_usage
  label: Query XTP Power Usage
  kind: query
  command: "ETPOEC}"
  params: []

- id: set_receiver_relay
  label: Turn Receiver Relay On, Off, or Toggle
  kind: action
  command: "EX30#*X39^*X39&RELY}"
  params:
    - name: output
      type: integer
    - name: relay
      type: integer
      description: Relay 1 or 2
    - name: state
      type: integer
      description: 0 off, 1 on, 2 toggle

- id: pulse_receiver_relay
  label: Pulse Receiver Relay
  kind: action
  command: "EX30#*X39^*3*X39*RELY}"
  params:
    - name: output
      type: integer
    - name: relay
      type: integer
    - name: pulse_time
      type: integer
      description: 1 through 65535 in 16 ms units

- id: query_receiver_relay
  label: View Receiver Relay
  kind: query
  command: "EX30#*X39^RELY}"
  params:
    - name: output
      type: integer
    - name: relay
      type: integer

- id: query_file_directory
  label: View File Directory
  kind: query
  command: "EDF}"
  params: []

- id: erase_user_file
  label: Erase User-supplied Web Page or File
  kind: action
  command: "EfilenameEF}"
  params:
    - name: filename
      type: string

- id: information_request
  label: Information Request
  kind: query
  command: "I"
  params: []

- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
  params: []

- id: request_board_configuration
  label: Request Input and Output Board Configuration
  kind: query
  command: "*N"
  params: []

- id: query_controller_firmware
  label: Query Controller Firmware Version
  kind: query
  command: "Q"
  params: []

- id: query_controller_firmware_verbose
  label: Query Controller Firmware Version Verbose
  kind: query
  command: "0Q"
  params: []

- id: request_system_status
  label: Request System Status
  kind: query
  command: "S"
  params: []

- id: set_test_pattern
  label: Set Output Test Pattern
  kind: action
  command: "EX4@TEST}"
  params:
    - name: pattern
      type: integer
      description: Documented test-pattern code

- id: disable_test_pattern
  label: Disable Output Test Pattern
  kind: action
  command: "E0TEST}"
  params: []

- id: query_test_pattern
  label: View Test Pattern Status
  kind: query
  command: "ETEST}"
  params: []

- id: set_front_panel_lock_basic
  label: Lock Front Panel to Basic Features
  kind: action
  command: "E2EXEC}"
  params: []

- id: set_front_panel_lock_view_only
  label: Lock Front Panel to View Only
  kind: action
  command: "E1EXEC}"
  params: []

- id: unlock_front_panel
  label: Unlock Front Panel
  kind: action
  command: "E0EXEC}"
  params: []

- id: query_front_panel_lock
  label: View Front Panel Lock Status
  kind: query
  command: "EEXEC}"
  params: []

- id: set_input_endpoint_lock
  label: Set Input Endpoint Front Panel Lock
  kind: action
  command: "ETX30!*X30(X/x}"
  params:
    - name: input
      type: integer
    - name: mode
      type: integer
      description: 0 unlocked, 1 view only, 2 basic features only

- id: set_all_input_endpoint_locks
  label: Set All Input Endpoint Front Panel Locks
  kind: action
  command: "ETX30(*X/x}"
  params:
    - name: mode
      type: integer

- id: query_input_endpoint_lock
  label: View Input Endpoint Front Panel Lock
  kind: query
  command: "ETX30!X/x}"
  params:
    - name: input
      type: integer

- id: set_output_endpoint_lock
  label: Set Output Endpoint Front Panel Lock
  kind: action
  command: "ERX30#*X30(X/x}"
  params:
    - name: output
      type: integer
    - name: mode
      type: integer

- id: set_all_output_endpoint_locks
  label: Set All Output Endpoint Front Panel Locks
  kind: action
  command: "ERX30(*X/x}"
  params:
    - name: mode
      type: integer

- id: query_output_endpoint_lock
  label: View Output Endpoint Front Panel Lock
  kind: query
  command: "ERX30#X/x}"
  params:
    - name: output
      type: integer

- id: reset_global_presets_and_names
  label: Reset Global Presets and Names
  kind: action
  command: "EZG}"
  params: []

- id: reset_individual_global_preset
  label: Reset Individual Global Preset
  kind: action
  command: "EX31!ZG}"
  params:
    - name: preset
      type: integer

- id: reset_all_audio_gains
  label: Reset All Audio Gains to 0 dB
  kind: action
  command: "EZA}"
  params: []

- id: reset_all_audio_volumes
  label: Reset All Audio Volumes to 100 Percent
  kind: action
  command: "EZV}"
  params: []

- id: unmute_all
  label: Unmute RGB and Audio
  kind: action
  command: "EZZ}"
  params: []

- id: factory_reset
  label: System Factory Reset
  kind: action
  command: "EZXXX}"
  params: []

- id: reset_flash
  label: Reset Flash
  kind: action
  command: "EZFFF}"
  params: []

- id: absolute_reset
  label: Absolute Reset Including IP Settings
  kind: action
  command: "EZQQQ}"
  params: []

- id: reset_settings_and_delete_files
  label: Reset All Settings and Delete Files
  kind: action
  command: "EZY}"
  params: []

- id: reset_input_endpoint
  label: Reset Input Endpoint
  kind: action
  command: "ETX30!ZXXX}"
  params:
    - name: input
      type: integer

- id: reset_all_input_endpoints
  label: Reset All Input Endpoints
  kind: action
  command: "ETZXXX}"
  params: []

- id: reset_output_endpoint
  label: Reset Output Endpoint
  kind: action
  command: "ERX30#ZXXX}"
  params:
    - name: output
      type: integer

- id: reset_all_output_endpoints
  label: Reset All Output Endpoints
  kind: action
  command: "ERZXXX}"
  params: []

- id: set_matrix_name
  label: Set Matrix Name
  kind: action
  command: "EX6!CN}"
  params:
    - name: name
      type: string
      description: Up to 24 alphanumeric characters

- id: query_matrix_name
  label: Read Matrix Name
  kind: query
  command: "ECN}"
  params: []

- id: reset_matrix_name
  label: Reset Matrix Name
  kind: action
  command: "E•CN}"
  params: []

- id: set_time_and_date
  label: Set Time and Date
  kind: action
  command: "EX6#CT}"
  params:
    - name: datetime
      type: string
      description: MM/DD/YY HH:mm:SS

- id: query_time_and_date
  label: Read Time and Date
  kind: query
  command: "ECT}"
  params: []

- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  command: "EX6%CZ}"
  params:
    - name: offset
      type: string
      description: -12.0 through +14.0

- id: query_gmt_offset
  label: Read GMT Offset
  kind: query
  command: "ECZ}"
  params: []

- id: set_daylight_savings
  label: Set Daylight Savings Time
  kind: action
  command: "EX6^CX}"
  params:
    - name: mode
      type: integer

- id: query_daylight_savings
  label: Read Daylight Savings Time
  kind: query
  command: "ECX}"
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "EX6&CI}"
  params:
    - name: address
      type: string

- id: query_ip_address
  label: Read IP Address
  kind: query
  command: "ECI}"
  params: []

- id: query_mac_address
  label: Read Hardware Address
  kind: query
  command: "ECH}"
  params: []

- id: query_open_connections
  label: Read Number of Open Connections
  kind: query
  command: "ECC}"
  params: []

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "EX6&CS}"
  params:
    - name: mask
      type: string

- id: query_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: "ECS}"
  params: []

- id: set_gateway_address
  label: Set Gateway IP Address
  kind: action
  command: "EX6&CG}"
  params:
    - name: address
      type: string

- id: query_gateway_address
  label: Read Gateway IP Address
  kind: query
  command: "ECG}"
  params: []

- id: set_administrator_password
  label: Set Administrator Password
  kind: action
  command: "EX7)CA}"
  params:
    - name: password
      type: string
      description: Up to 12 alphanumeric characters

- id: query_administrator_password
  label: Read Administrator Password Status
  kind: query
  command: "ECA}"
  params: []

- id: clear_administrator_password
  label: Clear Administrator Password
  kind: action
  command: "E•CA}"
  params: []

- id: set_user_password
  label: Set User Password
  kind: action
  command: "EX7)CU}"
  params:
    - name: password
      type: string

- id: query_user_password
  label: Read User Password Status
  kind: query
  command: "ECU}"
  params: []

- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "E•CU}"
  params: []

- id: set_mail_server
  label: Set Mail Server and Domain
  kind: action
  command: "EX6&,X7!,X7)CM}"
  params:
    - name: server_address
      type: string
    - name: domain
      type: string
    - name: password
      type: string

- id: query_mail_server
  label: Read Mail Server and Domain
  kind: query
  command: "ECM}"
  params: []

- id: set_email_recipient
  label: Set Email Recipient
  kind: action
  command: "EX7#,X7$CR}"
  params:
    - name: recipient
      type: integer
    - name: address
      type: string

- id: query_email_recipient
  label: Read Email Recipient
  kind: query
  command: "EX7#CR}"
  params:
    - name: recipient
      type: integer

- id: set_email_events
  label: Set Email Events for Recipient
  kind: action
  command: "EX7%,X7#,X7^,X4%EM}"
  params:
    - name: category
      type: string
    - name: recipient
      type: integer
    - name: target
      type: integer
    - name: notify_mode
      type: integer

- id: query_email_notifications
  label: Read Email Notifications for Recipient
  kind: query
  command: "EX7#,X8$,X7&EM}"
  params:
    - name: recipient
      type: integer
    - name: port_type
      type: integer
    - name: notify_mode
      type: integer

- id: set_dhcp
  label: Set DHCP
  kind: action
  command: "EX7*DH}"
  params:
    - name: enabled
      type: integer
      description: 0 off, 1 on

- id: query_dhcp
  label: Read DHCP Status
  kind: query
  command: "EDH}"
  params: []

- id: set_serial_port_parameters
  label: Set Serial Port Parameters
  kind: action
  command: "EX7(*X8),X8!,X8@,X8#CP}"
  params:
    - name: port
      type: integer
    - name: baud_rate
      type: integer
    - name: parity
      type: string
    - name: data_bits
      type: integer
    - name: stop_bits
      type: integer

- id: query_serial_port_parameters
  label: Read Serial Port Parameters
  kind: query
  command: "EX7(CP}"
  params:
    - name: port
      type: integer

- id: set_serial_flow_control
  label: Configure Serial Flow Control
  kind: action
  command: "EX7(*X8^,X8&CF}"
  params:
    - name: port
      type: integer
    - name: flow_control
      type: string
    - name: pacing_ms
      type: integer

- id: query_serial_flow_control
  label: Read Serial Flow Control
  kind: query
  command: "EX7(CF}"
  params:
    - name: port
      type: integer

- id: set_receive_timeout
  label: Configure Receive Timeout
  kind: action
  command: "EX7(*X8*,X8(CE}"
  params:
    - name: port
      type: integer
    - name: wait_time
      type: integer
    - name: intercharacter_time
      type: integer

- id: query_receive_timeout
  label: Read Receive Timeout
  kind: query
  command: "EX7(CE}"
  params:
    - name: port
      type: integer

- id: set_serial_port_mode
  label: Set Serial Port Mode
  kind: action
  command: "EX7(*X8$CY}"
  params:
    - name: port
      type: integer
    - name: mode
      type: integer
      description: 0 RS-232, 1 RS-422

- id: query_serial_port_mode
  label: Read Serial Port Mode
  kind: query
  command: "EX7(CY}"
  params:
    - name: port
      type: integer

- id: enable_input_captive_screw_insertion
  label: Enable Input Captive Screw Insertion
  kind: action
  command: "EIX30!*0LRPT}"
  params:
    - name: input
      type: integer

- id: enable_input_ethernet_insertion
  label: Enable Input Ethernet Insertion
  kind: action
  command: "EIX30!*1LRPT}"
  params:
    - name: input
      type: integer

- id: enable_output_captive_screw_insertion
  label: Enable Output Captive Screw Insertion
  kind: action
  command: "EOX30#*0LRPT}"
  params:
    - name: output
      type: integer

- id: enable_output_ethernet_insertion
  label: Enable Output Ethernet Insertion
  kind: action
  command: "EOX30#*1LRPT}"
  params:
    - name: output
      type: integer

- id: query_input_insertion_mode
  label: View Input Insertion Port Setup
  kind: query
  command: "EIX30!LRPT}"
  params:
    - name: input
      type: integer

- id: query_output_insertion_mode
  label: View Output Insertion Port Setup
  kind: query
  command: "EOX30#LRPT}"
  params:
    - name: output
      type: integer
```

## Feedbacks

```yaml
- id: command_response
  type: string
  description: Valid SIS commands produce a response terminated by CR/LF.

- id: error
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
    - E26
    - E27
    - E28

- id: video_mute
  type: enum
  values:
    - unmuted
    - muted
  query_command: "X30#B/b"

- id: audio_mute
  type: enum
  values:
    - none
    - hdmi_spdif
    - analog
    - all
  query_command: "X30#Z/z"

- id: input_hdcp_status
  type: enum
  values:
    - no_source
    - compliant
    - not_compliant
  query_command: "EIX30!HDCP}"

- id: input_signal_status
  type: enum
  values:
    - no_signal
    - signal_present
  query_command: "0LS"

- id: relay_state
  type: enum
  values:
    - off
    - on
  query_command: "EX30#*X39^RELY}"

- id: endpoint_power_status
  type: string
  query_command: "EIX30!POEC}"

- id: endpoint_power_usage
  type: integer
  description: Power usage percentage
  query_command: "ETPOEC}"

- id: front_panel_lock
  type: enum
  values:
    - unlocked
    - view_only
    - basic_features_only
  query_command: "EEXEC}"

- id: insertion_mode
  type: enum
  values:
    - captive_screw
    - ethernet
  query_command: "EIX30!LRPT}"
```

## Variables

```yaml
- id: input_audio_gain
  type: integer
  range:
    min: -18
    max: 24
  unit: dB
  default: 0

- id: output_volume
  type: integer
  range:
    min: 0
    max: 64
  unit: dB_attenuation_step

- id: relay_pulse_time
  type: integer
  range:
    min: 1
    max: 65535
  unit: 16_ms

- id: tcp_idle_timeout
  type: integer
  default: 5
  unit: minutes

- id: verbose_mode
  type: enum
  values:
    - 0
    - 1
    - 2
    - 3

- id: dhcp
  type: boolean
  default: false
```

## Events

```yaml
- id: quick_tie
  response: "Qik]"

- id: preset_saved
  response: "PrstSnn]"

- id: preset_recalled
  response: "PrstRnn]"

- id: input_audio_level_changed
  response: "Innn•Audxx]"

- id: output_volume_changed
  response: "Outnn•Volxx]"

- id: video_mute_changed
  response: "Vmtnn*x]"

- id: audio_mute_changed
  response: "Amtnn*x]"

- id: front_panel_lock_changed
  response: "Execn]"

- id: input_hdcp_status_changed
  response: "HdcpIX30!*X34)]"

- id: endpoint_input_hdcp_status_changed
  response: "HdcpTX30!*X30@*X34)]"

- id: input_signal_status_changed
  response: "Frq00*X31(1X31(2...X31(n]"

- id: endpoint_signal_status_changed
  response: "LsTX30!*X30@*X31(]"

- id: input_remote_power_changed
  response: "PoecIX30!*X39!*X39@*X39$]"

- id: output_remote_power_changed
  response: "PoecOX30#*X39!*X39@*X39$]"
```

## Macros

```yaml
# UNRESOLVED: source does not describe explicit multi-step command sequences.
```

## Safety

```yaml
confirmation_required_for:
  - factory_reset
  - reset_flash
  - absolute_reset
  - reset_settings_and_delete_files
  - reset_input_endpoint
  - reset_all_input_endpoints
  - reset_output_endpoint
  - reset_all_output_endpoints
interlocks: []
# UNRESOLVED: source states no additional command safety interlocks or sequencing requirements.
```

## Notes

SIS commands are case-insensitive except for audio input gain and attenuation commands. Device responses end with carriage return and line feed. Ethernet sessions default to a five-minute inactivity timeout; source recommends periodically issuing `Q` or reopening idle sockets. Device accepts up to 200 simultaneous TCP connections.

`E` represents Escape. `}` represents carriage return without line feed; `|` may be used interchangeably. Source extraction renders space separators as `•` and response terminators as `]`.

Front and rear serial interfaces can operate simultaneously; first command reaching processor is handled first. Do not connect a computer directly to a connected XTP endpoint for configuration while endpoint belongs to an XTP system.

<!-- UNRESOLVED: model-specific command availability and firmware compatibility are not fully stated in refined source. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - support.displaymanager.net
  - usermanual.wiki
  - mans.io
source_urls:
  - https://media.extron.com/public/download/files/userman/68-1736-02_P_xtp_ii_crosspoint.pdf
  - https://media.extron.com/public/download/files/userman/68-2716-01_D.pdf
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
  - https://usermanual.wiki/Document/68173650D.525539700.pdf
  - https://mans.io/files/viewer/2310439/52
retrieved_at: 2026-07-26T07:27:17.925Z
last_checked_at: 2026-10-07T20:45:06.508Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:45:06.508Z
matched_actions: 195
action_count: 195
confidence: medium
summary: "All 195 action units match source SIS commands and every transport value is stated in the source. The one open point is that the spec lists non-II XTP models while the source covers XTP II. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state firmware compatibility ranges."
- "source does not describe explicit multi-step command sequences."
- "source states no additional command safety interlocks or sequencing requirements."
- "model-specific command availability and firmware compatibility are not fully stated in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
