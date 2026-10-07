---
spec_id: admin/extron-sharelink-pro-2500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron ShareLink Pro 2500 Control Spec"
manufacturer: Extron
model_family: "ShareLink Pro 2500"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "ShareLink Pro 2500"
    - "ShareLink Pro Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - manuals.plus
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/slp_2500_68-3824-01_B.pdf
  - https://media.extron.com/public/download/files/userman/slp_network_ports_68-3656-01_F.pdf
  - https://manuals.plus/extron/pro-series-ip-link-pro-control-processors-manual.pdf
  - https://www.extron.com/download/
  - https://www.manua.ls/extron/sharelink-pro-500/manual
retrieved_at: 2026-05-14T16:20:42.130Z
last_checked_at: 2026-10-07T22:02:53.199Z
generated_at: 2026-10-07T22:02:53.199Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "E T1+TVPR }"
  - "E T1-TVPR }"
  - "broadcast/UDP control not documented in source"
  - "duration range and units are not stated; the command uses X@, defined as 0 = No input signal detected, 1 = Input signal detected\""
  - "no named macros in source document"
  - "no safety interlock procedures stated in source"
  - "UDP control protocol not documented in source"
  - "wireless/Bluetooth control commands beyond Bluetooth discovery mode not detailed in source"
  - "streaming port number not stated in source (CISG commands mention port 50000 for streaming)"
verification:
  verdict: verified
  checked_at: 2026-10-07T22:02:53.199Z
  matched_actions: 221
  action_count: 221
  confidence: medium
  summary: "All 221 action units match source SIS commands, transport (22023, 9600 8N1, password auth) is supported, and only about 2 channel-up/down preset commands are unrepresented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Extron ShareLink Pro 2500 Control Spec

## Summary
Extron ShareLink Pro 2500 is a wired/wireless presentation gateway supporting HDMI input selection, HDCP management, multi-user collaboration, and streaming input playback. Control is via SIS commands over SSH (TCP port 22023) or RS-232 serial (9600 baud). Supports dual LAN, mDNS hostname, network shares (CIFS/NFS), and Expo streaming with LinkLicense.

<!-- UNRESOLVED: broadcast/UDP control not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 22023
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # username/password required; factory default password = serial number, resets to "extron"
```

## Traits
```yaml
- powerable      # reboot command present
- routable       # HDMI input selection and PIP routing commands present
- queryable      # status queries (signal, HDCP, connections, temperature)
- levelable      # volume control with mute
```

## Actions
```yaml
- id: select_hdmi_window_input
  label: Select HDMI Window Input
  kind: action
  params:
    - name: window
      type: integer
      description: Window number (1 = HDMI window)
    - name: action
      type: enum
      values: [select, deselect, view]
  examples:
    - "E1PIPS}" → "Pips1]"
    - "E0PIPS}" → "Pips0]"
    - "EPIPS}" → X! response

- id: select_hdmi_passthrough_input
  label: Select HDMI Pass-Through Input
  kind: action
  params:
    - name: action
      type: enum
      values: [select, deselect, view]

- id: query_hdmi_input_signal
  label: Query HDMI Input Signal
  kind: query
  params: []

- id: query_hdmi_input_signal_rate
  label: Query HDMI Input Signal Rate
  kind: query
  params: []

- id: query_video_format
  label: Query Video Format
  kind: query
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1 (Primary), 1 = HDMI Output 2 (Secondary)"

- id: import_edid
  label: Import EDID to Input Slot
  kind: action
  params:
    - name: slot
      type: integer
      description: EDID table slot number
    - name: filename
      type: string
      description: Filename to import

- id: export_edid
  label: Export EDID from Input Slot
  kind: action
  params:
    - name: slot
      type: integer
      description: EDID table slot number
    - name: filename
      type: string
      description: Destination filename

- id: view_edid_native_resolution
  label: View EDID Native Resolution
  kind: query
  params:
    - name: slot
      type: integer
      description: EDID table slot number

- id: view_edid_hex
  label: View EDID in Hex Format
  kind: query
  params:
    - name: slot
      type: integer
      description: EDID table slot number

- id: set_output_rate
  label: Set Output Rate
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: rate_code
      type: integer
      description: Rate code per resolution table (e.g., 45 = 1080p60)

- id: view_output_rate
  label: View Output Rate
  kind: query
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"

- id: set_output_sync_mode
  label: Set Output Sync Mode
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: mode
      type: enum
      values: [sync_always_active, no_signal_timer, inactivity_timer]

- id: set_screen_saver_timeout
  label: Set Screen Saver Timeout Duration
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: duration
      type: integer
      description: "0-999999 seconds; 1000000 = never timeout; default = 30"

- id: view_screen_saver_status
  label: View Screen Saver Status
  kind: query
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"

- id: set_color_bit_depth
  label: Set Color Bit Depth
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: depth
      type: enum
      values: [auto, force_8bit]

- id: set_video_output_format
  label: Set Video Output Format
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: format
      type: enum
      values: [auto, dvi_rgb_444_full, hdmi_rgb_444_full, hdmi_rgb_444_limited, hdmi_yuv_444_limited, hdmi_yuv_422_limited, hdmi_yuv_420_limited]

- id: set_output_freeze
  label: Set Output Freeze
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: state
      type: enum
      values: [unfreeze, freeze]

- id: set_hdcp_mode
  label: Set HDCP Mode
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: mode
      type: enum
      values: [follow_input, always_encrypt, follow_input_dvi_trials, always_encrypt_dvi_trials, disable_authentication]

- id: set_hdcp_authorized
  label: Set HDCP Authorized Device
  kind: action
  params:
    - name: input
      type: integer
      description: "1 = HDMI"
    - name: authorized
      type: boolean
      description: "true = authorized, false = non-authorized"

- id: view_hdcp_status
  label: View HDCP Status
  kind: query
  params:
    - name: port
      type: enum
      values: [input, output]
    - name: output
      type: integer
      description: Output index for output HDCP query

- id: set_hdcp_notification
  label: Set HDCP Notification
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: screen
      type: enum
      values: [black, green]

- id: set_video_mute
  label: Set Video Mute
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: mute_type
      type: enum
      values: [unmute, mute_video, mute_sync]

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1, 1 = HDMI Output 2"
    - name: muted
      type: boolean

- id: set_input_aspect_ratio
  label: Set Input Aspect Ratio
  kind: action
  params:
    - name: input
      type: integer
      description: "1 = HDMI"
    - name: ratio
      type: enum
      values: [fill, follow]

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: "-100 to 0 dB (default = -30 dB)

- id: adjust_volume
  label: Adjust Volume
  kind: action
  params:
    - name: direction
      type: enum
      values: [increment, decrement]

- id: set_front_panel_lockout
  label: Set Front Panel Executive Mode
  kind: action
  params:
    - name: locked
      type: boolean
      description: "true = lock, false = unlock"

- id: set_unit_name
  label: Set Unit Name
  kind: action
  params:
    - name: name
      type: string
      description: "Alphanumeric up to 63 chars; no blanks/spaces/special chars except hyphen"

- id: set_unit_name_default
  label: Reset Unit Name to Default
  kind: action
  params: []

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  params: []

- id: query_firmware_build_version
  label: Query Firmware and Build Version
  kind: query
  params: []

- id: query_internal_temperature
  label: Query Internal Temperature
  kind: query
  params: []

- id: query_unit_info
  label: Query Unit Information
  kind: query
  params: []

- id: query_model_name
  label: Query Model Name
  kind: query
  params: []

- id: query_model_description
  label: Query Model Description
  kind: query
  params: []

- id: query_part_number
  label: Query Part Number
  kind: query
  params: []

- id: set_verbose_mode
  label: Set Verbose Response Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [clear, verbose, tagged, verbose_tagged]

- id: set_dual_display_mode
  label: Set Dual Output Display Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [mirror, extend]

- id: set_display_layout_mode
  label: Set Display Layout Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1-11 = layout group number"

- id: set_extended_display_layout_mode
  label: Set Extended Display Layout Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "ShareLink Pro 2500 Extend Mode only; 1-11"

- id: set_auto_default_hdmi_input
  label: Set Auto-Default to HDMI Input
  kind: action
  params:
    - name: enabled
      type: boolean

- id: set_apple_screen_mirroring
  label: Set Apple Screen Mirroring
  kind: action
  params:
    - name: enabled
      type: boolean

- id: set_apple_screen_mirroring_discovery_proxy
  label: Set Apple Screen Mirroring Device Discovery Proxy
  kind: action
  params:
    - name: enabled
      type: boolean

- id: set_mdns_hostname
  label: Set mDNS Hostname
  kind: action
  params:
    - name: hostname
      type: string
      description: "Alphanumeric up to 63 chars; first char must be alphabetical, last must not be hyphen"

- id: clear_mdns_hostname
  label: Clear mDNS Hostname
  kind: action
  params: []

- id: enable_hdmi_input
  label: Enable HDMI Input
  kind: action
  params:
    - name: input
      type: integer
      description: "1 = HDMI"

- id: disable_hdmi_input
  label: Disable HDMI Input
  kind: action
  params:
    - name: input
      type: integer
      description: "1 = HDMI"

- id: set_hdmi_client_app_controls
  label: Show/Hide HDMI Client App Controls
  kind: action
  params:
    - name: visible
      type: boolean

- id: set_hdmi_client_app_controls_label
  label: Set HDMI Client App Controls Label
  kind: action
  params:
    - name: label
      type: string
      description: "UTF-8, max 16 characters"

- id: set_webshare_mode
  label: Set WebShare Mode
  kind: action
  params:
    - name: enabled
      type: boolean

- id: set_ip_address_visibility
  label: Set IP Address Visibility in Client Apps
  kind: action
  params:
    - name: masked
      type: boolean
      description: "true = masked, false = visible"

- id: set_access_mode
  label: Set Access Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [full_control, moderated, runtime]
    - name: runtime_mode
      type: enum
      values: [full_control, moderated]
      description: Runtime access mode

- id: set_confirmation_code_mode
  label: Set Confirmation Code Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [none, fixed, random]

- id: set_login_key_code
  label: Set Login Key Code
  kind: action
  params:
    - name: code
      type: string
      description: "Four digit value (default = 0000)"

- id: set_random_code_interval
  label: Set Random Code Interval
  kind: action
  params:
    - name: interval
      type: integer
      description: "1-9998 minutes; 9999 = after every session"

- id: set_webview_password_option
  label: Set WebView Password Option
  kind: action
  params:
    - name: option
      type: enum
      values: [no_access, no_prompt, custom_password, follow_confirmation_code]

- id: set_webview_password
  label: Set WebView Password
  kind: action
  params:
    - name: password
      type: string

- id: change_password
  label: Change Password
  kind: action
  params:
    - name: username
      type: string
    - name: current_password
      type: string
    - name: new_password
      type: string
      description: "Up to 128 characters; case-sensitive; cannot be single space"

- id: set_status_bar_mode
  label: Set Status Bar Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [always_shown, always_hidden, hide_when_content_shared, hide_when_one_or_more_shared]

- id: set_status_bar_popup
  label: Set Status Bar Pop-Up
  kind: action
  params:
    - name: enabled
      type: boolean

- id: set_status_bar_popup_timer
  label: Set Status Bar Pop-Up Timer
  kind: action
  params:
    - name: seconds
      type: integer
      description: "1-300 seconds; default = 20"

- id: set_status_bar_label
  label: Set Status Bar Label
  kind: action
  params:
    - name: label_type
      type: enum
      values: [hostname, ip_address_a, ip_address_b, login_code, custom_message, dynamic_notifications, clock]
    - name: value
      type: string
      description: Max 128 characters
    - name: visible
      type: boolean

- id: set_status_bar_background_color
  label: Set Status Bar Background Color
  kind: action
  params:
    - name: color
      type: string
      description: "RGB Hex triplet (RRGGBB)"

- id: set_status_bar_font_color
  label: Set Status Bar Font Color
  kind: action
  params:
    - name: color
      type: string
      description: "RGB Hex triplet (RRGGBB)"

- id: set_still_image_transition_effect
  label: Set Still Image Transition Effect
  kind: action
  params:
    - name: effect
      type: enum
      values: [cut, fade]

- id: set_still_image_transition_time
  label: Set Still Image Transition Time
  kind: action
  params:
    - name: ms
      type: integer
      description: "500-3000 ms; default = 1000 ms"

- id: set_still_image_interval
  label: Set Duration Between Still Image Sequences
  kind: action
  params:
    - name: ms
      type: integer
      description: "1000-60000 ms; default = 10000 ms"

- id: set_gallery_path
  label: Set Gallery File Path
  kind: action
  params:
    - name: gallery
      type: enum
      values: [standby, connected]
    - name: path
      type: string
      description: "File path or network path"

- id: query_connected_users
  label: Query List of Connected Users
  kind: query
  params:
    - name: connection_id
      type: integer
      description: "Specific connection ID; omit for all users (up to 64)"

- id: query_total_users_connected
  label: Query Total Users Connected
  kind: query
  params: []

- id: force_user_stop_sharing
  label: Force User to Stop Sharing
  kind: action
  params:
    - name: connection_id
      type: integer
      description: "0 = all users"

- id: force_disconnect_user
  label: Force Disconnect User
  kind: action
  params:
    - name: connection_id
      type: integer
      description: "0 = all users"

- id: swap_stream_positions
  label: Swap Positions of Two Streams
  kind: action
  params:
    - name: connection_id_1
      type: integer
    - name: connection_id_2
      type: integer

- id: set_full_screen
  label: Show Shared Content Full Screen
  kind: action
  params:
    - name: connection_id
      type: integer

- id: revert_full_screen
  label: Revert Full Screen to Quadrant View
  kind: action
  params: []

- id: approve_connection_request
  label: Approve User Connection Request
  kind: action
  params:
    - name: connection_id
      type: integer
      description: "Moderator mode only"

- id: reject_connection_request
  label: Reject User Connection Request
  kind: action
  params:
    - name: connection_id
      type: integer
      description: "Moderator mode only"

- id: approve_share_request
  label: Approve User Share Request
  kind: action
  params:
    - name: connection_id
      type: integer
      description: "Moderator mode only"

- id: reject_share_request
  label: Reject User Share Request
  kind: action
  params:
    - name: connection_id
      type: integer
      description: "Moderator mode only"

- id: set_echo
  label: Set Echo Mode
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "Control systems should disable echo after connecting"

- id: reboot_device
  label: Reboot Device
  kind: action
  params: []

- id: restart_network
  label: Restart Network
  kind: action
  params: []

- id: reset_to_factory_defaults
  label: Reset to Factory Defaults
  kind: action
  params: []
  description: "Resets all settings except IP and user-loaded files. Admin password resets to 'extron'."

- id: erase_all_files_from_flash
  label: Erase All Files from Flash Memory
  kind: action
  params: []
  description: "Removes user-created files including backups, config tools, captures, logos, HTML files."

- id: absolute_reset_retaining_ip
  label: Absolute Reset Retaining IP Settings
  kind: action
  params: []
  description: "Removes all settings and files, retains IP. Admin password resets to 'extron'. Recommended after firmware update."

- id: reset_network_settings
  label: Reset Network Settings Only
  kind: action
  params: []

- id: full_factory_reset
  label: Full Factory Reset
  kind: action
  params: []
  description: "Resets all device and IP settings, deletes user-loaded files. Admin password resets to 'extron'."

- id: add_network_share
  label: Add Network Share
  kind: action
  params:
    - name: service
      type: string
      description: "CIFS or NFS network path"
    - name: mountpoint
      type: string
    - name: username
      type: string
    - name: password
      type: string
    - name: options
      type: string
    - name: reconnect
      type: boolean
    - name: extron_share
      type: boolean

- id: unmount_network_share
  label: Unmount Network Share
  kind: action
  params:
    - name: mountpoint
      type: string

- id: unmount_all_network_shares
  label: Unmount All Network Shares
  kind: action
  params: []

- id: view_mounted_shares
  label: View All Mounted Shares
  kind: query
  params: []

- id: set_ip_settings
  label: Set IP Address Subnet Mask and Gateway
  kind: action
  params:
    - name: lan_port
      type: integer
      description: "1 = LAN A, 2 = LAN B"
    - name: ip_address
      type: string
      description: "Format nnn.nnn.nnn.nnn"
    - name: subnet_mask
      type: string
      description: "CIDR prefix (e.g., /24)"
    - name: gateway
      type: string
      description: "Format nnn.nnn.nnn.nnn"

- id: view_ip_settings
  label: View All IP Settings
  kind: query
  params: []

- id: view_file_tree
  label: View File-System Directory Structure
  kind: query
  params:
    - name: path
      type: string
      description: "Directory path (default = root)"
    - name: recursive
      type: boolean
      description: "true = recursive; default = true"

- id: view_discovered_streams
  label: View Discovered Streams via SAP
  kind: query
  params: []

- id: view_network_status
  label: View Network Status and Statistics
  kind: query
  params: []

- id: set_expo_feature
  label: Enable/Disable Expo Feature
  kind: action
  params:
    - name: mode
      type: enum
      values: [disabled, continuous, temporary]
  description: "Requires LinkLicense"

- id: view_stream_statistics
  label: View Current Stream Statistics
  kind: query
  params: []
  description: "Returns JSON with bitrate, packet, jitter stats"

- id: set_playback_speed
  label: Start Playback
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: speed
      type: integer
      description: "Playback speed multiplier"

- id: pause_playback
  label: Pause Playback
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"

- id: stop_playback
  label: Stop Playback
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"

- id: set_loop_play
  label: Set Loop Play
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: enabled
      type: boolean

- id: set_subtitles
  label: Enable/Disable Subtitles
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: enabled
      type: boolean

- id: select_channel_preset
  label: Select Next/Previous Channel Preset
  kind: action
  params:
    - name: direction
      type: enum
      values: [next, previous]
    - name: channel
      type: integer
      description: "Channel number"

- id: recall_channel_preset
  label: Recall Channel Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Channel number 1-999"

- id: view_all_channel_presets
  label: View All Channel Presets
  kind: query
  params: []

- id: save_uri_to_preset
  label: Save URI to Channel Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Channel number 1-999"
    - name: uri
      type: string
      description: "Media URI"

- id: import_channel_preset
  label: Import Channel Preset
  kind: action
  params:
    - name: uri
      type: string
      description: "File path or RTSP stream URI"

- id: export_channel_preset
  label: Export Channel Preset
  kind: action
  params:
    - name: uri
      type: string
      description: "File path for export"

- id: delete_channel_preset
  label: Delete Channel Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Channel number 1-999"

- id: delete_all_channel_presets
  label: Delete All Channel Presets
  kind: action
  params: []

- id: set_player_buffering
  label: Set Player Buffering
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: mode
      type: enum
      values: [enable, disable]

- id: set_initial_play_threshold
  label: Set Initial Play Threshold
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: threshold
      type: integer
      description: "Buffer threshold value"

- id: set_rebuffering_threshold
  label: Set Rebuffering Play Threshold
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: threshold
      type: integer
      description: "Rebuffer threshold value"

- id: prefer_rtsp_multicast
  label: Prefer RTSP Multicast
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: preferred
      type: boolean
      description: "Request multicast first, fallback to unicast"

- id: view_output_sync_mode
  label: View Output Sync Mode
  kind: query
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1 (Primary); 1 = HDMI Output 2 (Secondary)"
  examples:
    - 'E`M`X10!`SSAV`}'

- id: set_connection_attempt_timer_duration
  label: Set Connection Attempt Timer Duration
  kind: action
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1 (Primary); 1 = HDMI Output 2 (Secondary)"
    - name: duration
      type: integer
      description: "UNRESOLVED: duration range and units are not stated; the command uses X@, defined as 0 = No input signal detected, 1 = Input signal detected"
  examples:
    - 'E`K`X10!`*`X@`SSAV`}'

- id: view_connection_attempt_timer_duration
  label: View Connection Attempt Timer Duration
  kind: query
  params:
    - name: output
      type: integer
      description: "0 = HDMI Output 1 (Primary); 1 = HDMI Output 2 (Secondary)"
  examples:
    - 'E`K`X10!`SSAV`}'

- id: query_output_freeze
  label: Query Output Freeze
  kind: query
  params: []
  examples:
    - '1F/f'

- id: view_extended_display_layout_mode
  label: View Extended Display Layout Mode
  kind: query
  params: []
  examples:
    - 'E`EOMOD`}'
  description: "ShareLink Pro 2500 Extend Mode only"

- id: reset_hdmi_client_app_controls_label
  label: Reset HDMI Client App Controls Label
  kind: action
  params: []
  examples:
    - 'E`1,`•`NI`}'
  description: "Set label back to default (HDMI)"

- id: reset_webview_password
  label: Reset WebView Password
  kind: action
  params: []
  examples:
    - 'E P • WBSH }'
  description: "Default = WebView"

- id: view_webview_password
  label: View WebView Password
  kind: query
  params: []
  examples:
    - 'E PWBSH }'
  description: "Returns **** if password is not set to default; an empty response if password is set to default"

- id: query_status_bar_label_visibility
  label: Query Status Bar Label Visibility
  kind: query
  params:
    - name: label_type
      type: integer
      description: "1 = Hostname; 2 = IP address A; 3 = IP address B; 4 = Login code; 5 = Custom message; 6 = Dynamic notifications/messages; 7 = Clock"
  examples:
    - 'E V X4( OSDL }'

- id: reset_gallery_path
  label: Reset Gallery File Path
  kind: action
  params:
    - name: gallery
      type: integer
      description: "1 = Standby image gallery; 2 = Connected image gallery"
  examples:
    - 'E`P`X5^`,`•`SSHW`}'

- id: view_expo_feature
  label: View Expo Feature
  kind: query
  params: []
  examples:
    - 'E`PSHAR`}'
  description: "Requires LinkLicense"

- id: view_player_state
  label: View Player State
  kind: query
  params: []
  examples:
    - 'E`QSHAR`}'
  description: "1 = Standby; 2 = Connected; 3 = Expo; 4 = Expo Standby; 5 = Sharing. Requires LinkLicense."

- id: view_stream_mode
  label: View Current Stream Mode
  kind: query
  params: []
  examples:
    - 'E`SMOD`}'
  description: "0 = Disabled; 1 = Audio; 2 = Video; 3 = Audio and video (default)"

- id: view_source_audio_sample_rate
  label: View Current Source Audio Sample Rate
  kind: query
  params: []
  examples:
    - 'E`AUSR`}'
  description: "0 = Reserved; 1 = Reserved; 2 = 44.1 kHz; 3 = 48 kHz"

- id: view_playback_state
  label: View Playback State
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E Y [1PLYR] [}]'
  description: "0 = Stop, 1 = Play, 2 = Pause"

- id: view_loop_play_status
  label: View Loop Play Status
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E R1PLYR }'
  description: "0 = Off (disable); 1 = On (enable)"

- id: view_subtitle_status
  label: View Subtitle Status
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E E [1SUBT] [}]'
  description: "0 = Off (disable); 1 = On (enable)"

- id: view_timecode
  label: View Current Timecode
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E K1PLYR }'
  description: "HH:MM:SS:DD, where DD is decimal seconds up to nine digits"

- id: view_clip_length
  label: View Current Clip Length
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E Z [1PLYR] [}]'
  description: "HH:MM:SS:DD, where DD is decimal seconds up to nine digits"

- id: seek_playback
  label: Seek by Offset
  kind: action
  params:
    - name: channel
      type: integer
      description: "1"
    - name: offset
      type: integer
      description: "Time (in seconds); range UNRESOLVED"
  examples:
    - 'E J [1*] [X8*] [PLYR] [}]'

- id: seek_to_timecode
  label: Seek to Timecode
  kind: action
  params:
    - name: channel
      type: integer
      description: "1"
    - name: timecode
      type: string
      description: "HH:MM:SS:DD, where DD is decimal seconds up to nine digits"
  examples:
    - 'E K [1*] [X8&] [PLYR] [}]'

- id: load_media_path
  label: Load Media Item Path
  kind: action
  params:
    - name: channel
      type: integer
      description: "1"
    - name: path
      type: string
      description: "file:///folder/filename, network path, network port path or RTSP stream URI"
  examples:
    - 'E U [1*] [X8(] [PLYR] [}]'

- id: view_media_path
  label: View Current Media Path
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E U [1PLYR] [}]'

- id: view_current_preset
  label: View Current Channel Preset
  kind: query
  params: []
  examples:
    - 'E T1TVPR }'
  description: "Get current channel number. Response is 00 if no valid channel preset is loaded."

- id: save_current_uri_to_preset
  label: Save Current URI to Channel Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "1 – 999"
  examples:
    - 'E S [1*] [X9#] [TVPR] [}]'

- id: view_player_buffering_status
  label: View Player Buffering Status
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E E1PBUF }'
  description: "0 = Off/Disabled; 1 = On/Enabled"

- id: view_initial_play_threshold
  label: View Initial Play Threshold
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E I1PBUF }'
  description: "Initial play threshold (sec); range UNRESOLVED"

- id: view_rebuffering_play_threshold
  label: View Rebuffering Play Threshold
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E R1PBUF }'
  description: "Rebuffering play threshold (sec); range UNRESOLVED"

- id: view_rtsp_multicast_preference
  label: View RTSP Multicast Preference
  kind: query
  params:
    - name: channel
      type: integer
      description: "1"
  examples:
    - 'E Q1PLYR }'
  description: "0 = Off/Disabled; 1 = On/Enabled"

- id: enable_bluetooth
  label: Enable/Disable Bluetooth
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "0 = Disabled; 1 = Enabled (Default)"
  examples:
    - 'E E X13$ BLUE }'

- id: query_bluetooth
  label: Query Bluetooth
  kind: query
  params: []
  examples:
    - 'E EBLUE }'

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: discovery_setting
      type: enum
      values: [0, 1]
      description: "0 = ShareLink Pro App; 1 = Apple Screen Mirroring (AirPlay for iOS/macOS)"
    - name: enabled
      type: boolean
      description: "0 = Disabled; 1 = Enabled (Default)"
  examples:
    - 'E M X13# * X13$ BLUE }'

- id: query_bluetooth_mode
  label: Query Bluetooth Mode
  kind: query
  params:
    - name: discovery_setting
      type: enum
      values: [0, 1]
      description: "0 = ShareLink Pro App; 1 = Apple Screen Mirroring (AirPlay for iOS/macOS)"
  examples:
    - 'E M X13# BLUE }'

- id: set_airplay_bluetooth_nic
  label: Set Airplay Bluetooth NIC
  kind: action
  params:
    - name: nic
      type: integer
      description: "1 = eth0/LAN A (Default)"
  examples:
    - 'E W X13% BLUE }'

- id: query_airplay_bluetooth_nic
  label: Query Airplay Bluetooth NIC
  kind: query
  params: []
  examples:
    - 'E WBLUE }'

- id: set_cec_input_enable
  label: Enable/Disable Input CEC
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 4, 8, 20]
      description: "0 = Disable CEC operations for this IO port (default); 1 = Reserved – currently returns E13; 2 = Enable insertion (unidirectional); 4 = Enable insertion and publish received CEC messages (bidirectional); 8 = Enable insertion and publish all received CEC messages (bidirectional); 20 = Manual mode, similar to mode 8, but less automatic (for 3rd- party software)"
  examples:
    - 'E `I1* `X1^ `CCEC`}'

- id: view_cec_input_status
  label: View Input CEC Status
  kind: query
  params: []
  examples:
    - 'E `I1CCEC`}'
  description: "Returns CEC status, source logical address, and destination logical address"

- id: set_cec_output_enable
  label: Enable/Disable One Output CEC
  kind: action
  params:
    - name: output
      type: integer
      description: "1"
    - name: mode
      type: enum
      values: [0, 1, 2, 4, 8, 20]
      description: "0 = Disable CEC operations for this IO port (default); 1 = Reserved – currently returns E13; 2 = Enable insertion (unidirectional); 4 = Enable insertion and publish received CEC messages (bidirectional); 8 = Enable insertion and publish all received CEC messages (bidirectional); 20 = Manual mode, similar to mode 8, but less automatic (for 3rd- party software)"
  examples:
    - 'E O X!`*`X1^ `CCEC`}'

- id: set_all_cec_outputs_enable
  label: Enable/Disable All Outputs CEC
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 4, 8, 20]
      description: "0 = Disable CEC operations for this IO port (default); 1 = Reserved – currently returns E13; 2 = Enable insertion (unidirectional); 4 = Enable insertion and publish received CEC messages (bidirectional); 8 = Enable insertion and publish all received CEC messages (bidirectional); 20 = Manual mode, similar to mode 8, but less automatic (for 3rd- party software)"
  examples:
    - 'E O X1^`*CCEC`}'

- id: view_cec_output_status
  label: View Output CEC Status
  kind: query
  params:
    - name: output
      type: integer
      description: "1"
  examples:
    - 'E O X! `CCEC`}'
  description: "Returns CEC status, source logical address, and destination logical address"

- id: send_cec_input_data
  label: Send CEC Data to Input
  kind: action
  params:
    - name: data
      type: string
      description: 'Predefined actions as strings within double quotes: "PwrOn", "PwrOf", or "ShowMe"; alternatively, CEC data with user selected elements (0 to 15) in the form of percent sign followed by 2 hex digits'
  examples:
    - 'E `I1*`X2) `DCEC`}'
    - 'E `I1*`X2$ `DCEC`}'

- id: send_cec_output_data
  label: Send CEC Data to Output
  kind: action
  params:
    - name: output
      type: integer
      description: "1"
    - name: data
      type: string
      description: 'Predefined actions as strings within double quotes: "PwrOn", "PwrOf", or "ShowMe"; alternatively, CEC data with user selected elements (0 to 15) in the form of percent sign followed by 2 hex digits'
  examples:
    - 'E O X!`*`X2) `DCEC`}'
    - 'E O X!`*`X2$ `DCEC`}'

- id: send_cec_input_logical_address_data
  label: Send CEC Input Data With Specified Logical Addresses
  kind: action
  params:
    - name: source_logical_address
      type: integer
      description: "0 through 15 (-1 = not found or port not enabled)"
    - name: destination_logical_address
      type: integer
      description: "0 through 15 (-1 = not found or port not enabled)"
    - name: command
      type: enum
      values: ['"PwrOn"', '"PwrOf"', '"ShowMe"']
  examples:
    - 'E `I1*`X1*`*`X1(`*`X2) `DCEC`}'

- id: send_cec_output_logical_address_data
  label: Send CEC Output Data With Specified Logical Addresses
  kind: action
  params:
    - name: output
      type: integer
      description: "1"
    - name: source_logical_address
      type: integer
      description: "0 through 15 (-1 = not found or port not enabled)"
    - name: destination_logical_address
      type: integer
      description: "0 through 15 (-1 = not found or port not enabled)"
    - name: command
      type: enum
      values: ['"PwrOn"', '"PwrOf"', '"ShowMe"']
  examples:
    - 'E O X!`*`X1*`*`X1(`*`X2)  `DCEC`}'

- id: broadcast_cec_input_data
  label: Broadcast CEC Data to Input Devices
  kind: action
  params:
    - name: data
      type: string
      description: 'Predefined actions as strings within double quotes: "PwrOn", "PwrOf", or "ShowMe"; alternatively, CEC data with user selected elements (0 to 15) in the form of percent sign followed by 2 hex digits'
  examples:
    - 'E `I1*15*`X2) `DCEC`}'
    - 'E `I1*15*`X2$ `DCEC`}'

- id: broadcast_cec_output_data
  label: Broadcast CEC Data to Output Devices
  kind: action
  params:
    - name: output
      type: integer
      description: "1"
    - name: data
      type: string
      description: 'Predefined actions as strings within double quotes: "PwrOn", "PwrOf", or "ShowMe"; alternatively, CEC data with user selected elements (0 to 15) in the form of percent sign followed by 2 hex digits'
  examples:
    - 'E O X!`*15*`X2) `DCEC`}'
    - 'E O X!`*15*`X2$ `DCEC`}'

- id: set_logical_address_input
  label: Set Input Logical Address
  kind: action
  params:
    - name: logical_address
      type: integer
      description: "0 through 15 (-1 = not found or port not enabled)"
  examples:
    - 'E I1* X1* LCEC }'

- id: view_logical_address_input
  label: View Input Logical Address
  kind: query
  params: []
  examples:
    - 'E I1LCEC }'

- id: set_logical_address_output
  label: Set Output Logical Address
  kind: action
  params:
    - name: output
      type: integer
      description: "1"
    - name: logical_address
      type: integer
      description: "0 through 15 (-1 = not found or port not enabled)"
  examples:
    - 'E O X! * X1* LCEC }'

- id: view_logical_address_output
  label: View Output Logical Address
  kind: query
  params:
    - name: output
      type: integer
      description: "1"
  examples:
    - 'E O X! LCEC }'

- id: list_cec_devices
  label: List CEC Device Presence
  kind: query
  params: []
  examples:
    - 'E L Q CEC }'
  description: "0-F = Device address, X = Missing, — = CEC port is off"

- id: rediscover_cec_input
  label: Rediscover Device on Input
  kind: action
  params: []
  examples:
    - 'E I1 Q CEC }'

- id: rediscover_cec_output
  label: Rediscover Device on Output
  kind: action
  params:
    - name: output
      type: integer
      description: "1"
  examples:
    - 'E O X! Q CEC }'

- id: report_cec_output_physical_address
  label: Report Physical Address of Output Port
  kind: query
  params:
    - name: output
      type: integer
      description: "1"
  examples:
    - 'E O X! PCEC }'
  description: "4 hexadecimal digits (Example: %10%00 for 1000)"

- id: view_cec_engine_version
  label: View Extron CEC Engine Version
  kind: query
  params: []
  examples:
    - '39 Q'
```

## Feedbacks
```yaml
- id: input_window_status
  type: enum
  values: [not_displayed, displayed]
  description: "Reports HDMI window display state"
  query_command: 'E`PIPS`}'

- id: input_signal_presence
  type: enum
  values: [no_signal, signal_detected]
  query_command: 'E`0LS`}'

- id: hdmi_input_signal_rate
  type: string
  description: "Format: WxH@Hz (e.g. 1920x1080@60.00Hz); no signal = 0000x0000@00.00Hz"
  query_command: 'E`1LS`}'

- id: video_format
  type: enum
  values: [no_signal, dvi, hdmi]
  query_command: '1*\'

- id: output_sync_status
  type: enum
  values: [active_input_timer_not_running, no_active_input_timer_running, no_active_input_timer_expired]
  query_command: 'E`S`X10!`SSAV`}'

- id: screen_saver_timeout_duration
  type: integer
  description: "Seconds; 1000000 = never times out"
  query_command: 'E`T`X10!`SSAV`}'

- id: color_bit_depth
  type: enum
  values: [auto, force_8bit]
  query_command: 'E`V`X10!`BITD`}'

- id: output_video_format
  type: enum
  values: [auto, dvi_rgb_444_full, hdmi_rgb_444_full, hdmi_rgb_444_limited, hdmi_yuv_444_limited, hdmi_yuv_422_limited, hdmi_yuv_420_limited]
  query_command: 'EX10!`VTPO`}'

- id: hdcp_status
  type: enum
  values: [not_connected, not_hdcp_encrypted, hdcp_encrypted]
  query_command: 'E I1HDCP }'

- id: hdcp_authorized_status
  type: enum
  values: [hdcp_not_authorized, hdcp_authorized]
  query_command: 'E E1HDCP }'

- id: hdcp_mode
  type: enum
  values: [follow_input, always_encrypt, follow_input_dvi_trials, always_encrypt_dvi_trials, disable_authentication]
  query_command: 'E S X10! HDCP }'

- id: hdcp_notification
  type: enum
  values: [black_screen, green_screen]
  query_command: 'E N X10! HDCP }'

- id: video_mute_status
  type: enum
  values: [unmute, mute_video, mute_sync]
  query_command: 'X10! B/b'

- id: audio_mute_status
  type: enum
  values: [unmute, muted]
  query_command: 'X10! Z/z'

- id: volume_level
  type: integer
  description: "-100 to 0 dB"
  query_command: 'V'

- id: input_aspect_ratio
  type: enum
  values: [fill, follow]
  query_command: 'E 1ASPR }'

- id: front_panel_lockout_status
  type: enum
  values: [off, on]
  query_command: 'X/x'

- id: unit_name
  type: string
  query_command: 'E`CN`}'

- id: firmware_version
  type: string
  description: "Example: 1.00"
  query_command: 'Q/q'

- id: firmware_build_version
  type: string
  description: "Example: 1.00.0010"
  query_command: '*Q/q'

- id: internal_temperature
  type: integer
  description: "Degrees Celsius"
  query_command: 'E`20STAT`}'

- id: verbose_mode
  type: enum
  values: [clear, verbose, tagged, verbose_tagged]
  query_command: 'E`CV`}'

- id: dual_display_mode
  type: enum
  values: [mirror, extend]
  query_command: 'E`D OMOD`}'

- id: display_layout_mode
  type: object
  description: "mode (1-11) and current layout number (1-25)"
  query_command: 'E`OMOD`}'

- id: auto_default_hdmi_input
  type: boolean
  query_command: 'E`AUSW`}'

- id: apple_screen_mirroring_status
  type: boolean
  query_command: 'E`A1SHAR`}'

- id: apple_screen_mirroring_discovery_proxy
  type: enum
  values: [disabled, enabled]
  query_command: 'E`A1DVRY`}'

- id: mdns_hostname
  type: string
  query_command: 'E`HZCON`}'

- id: hdmi_input_enabled
  type: boolean
  query_command: 'E`HMODE`}'

- id: hdmi_client_app_controls_visible
  type: boolean
  query_command: 'E`VAPPC`}'

- id: hdmi_client_app_controls_label
  type: string
  description: "UTF-8, max 16 characters"
  query_command: 'E`1NI`}'

- id: webshare_mode
  type: boolean
  query_command: 'E`XSHAR`}'

- id: ip_address_visibility
  type: enum
  values: [visible, masked]
  query_command: 'E`IAPPC`}'

- id: access_mode
  type: object
  description: "mode and runtime_access_mode"
  query_command: 'E MSHAR }'

- id: confirmation_code_mode
  type: enum
  values: [none, fixed, random]
  query_command: 'E MPINC }'

- id: login_key_code
  type: string
  description: "Four digit value"
  query_command: 'E VPINC }'

- id: random_code_interval
  type: integer
  description: "Minutes; 9999 = after every session"
  query_command: 'E IPINC }'

- id: webview_password_option
  type: enum
  values: [no_access, no_prompt, custom_password, follow_confirmation_code]
  query_command: 'E MWBSH }'

- id: status_bar_mode
  type: enum
  values: [always_shown, always_hidden, hide_when_content_shared, hide_when_one_or_more_shared]
  query_command: 'E MOSDL }'

- id: status_bar_popup_enabled
  type: boolean
  query_command: 'E POSDL }'

- id: status_bar_popup_timer
  type: integer
  description: "Seconds; default = 20"
  query_command: 'E TOSDL }'

- id: status_bar_label
  type: object
  description: "label_type, value, and visibility"
  query_command: 'E L X4( OSDL }'

- id: status_bar_background_color
  type: string
  description: "RGB Hex (RRGGBB)"
  query_command: 'E KOSDL }'

- id: status_bar_font_color
  type: string
  description: "RGB Hex (RRGGBB)"
  query_command: 'E COSDL }'

- id: still_image_transition_effect
  type: enum
  values: [cut, fade]
  query_command: 'E ESSHW }'

- id: still_image_transition_time
  type: integer
  description: "Milliseconds; default = 1000"
  query_command: 'E`TSSHW`}'

- id: still_image_interval
  type: integer
  description: "Milliseconds; default = 10000"
  query_command: 'E`DSSHW`}'

- id: gallery_path
  type: object
  description: "gallery type and file path"
  query_command: 'E`P`X5^`SSHW`}'

- id: connected_user_list
  type: array
  description: "Array of connected user info including connection_id, username, stream_id, platform/client/type, position, approval status"
  query_command: 'E L0SHAR }'

- id: total_users_connected
  type: integer
  description: "Max 64"
  query_command: 'E KSHAR }'

- id: full_screen_state
  type: boolean
  query_command: 'E FSHAR }'

- id: echo_status
  type: boolean

- id: reboot_response
  type: enum
  values: [boot1, boot2]
  description: "1 = device reboot, 2 = network restart"

- id: error_response
  type: enum
  values: [E10, E11, E13, E14, E17, E22, E24, E35]
  description: "Invalid command / invalid preset / invalid parameter / not valid for config / invalid for signal type / busy / privilege violation / account does not exist"
```

## Variables
```yaml
- id: connection_timeout
  type: integer
  description: "Port timeout: 1 (10 seconds) to 65000 (650,000 seconds); default = 30 (300 seconds)"
  default: 30

- id: echo_mode
  type: boolean
  description: "Echo on/off for current connection; default = enabled"
  default: true
```

## Events
```yaml
- id: input_selection_changed
  description: "Unsolicited response when HDMI window or pass-through input is selected or deselected"
  params:
    - name: selection_type
      type: enum
      values: [hdmi_window_selected, hdmi_window_deselected, hdmi_passthrough_selected, hdmi_passthrough_deselected]

- id: detected_format_changed
  description: "Input signal presence changed or input frequency changed"
  params:
    - name: signal_presence
      type: enum
      values: [no_signal, signal_detected]
    - name: video_format
      type: enum
      values: [no_signal, dvi, hdmi]

- id: hdcp_status_changed
  description: "HDCP status change on HDMI input or output"
  params:
    - name: port
      type: enum
      values: [input, output]
    - name: output_index
      type: integer
    - name: status
      type: enum
      values: [not_connected, not_hdcp_encrypted, hdcp_encrypted]

- id: hotplug_detected
  description: "Hot plug occurs on local HDMI output"
  params:
    - name: output
      type: integer

- id: total_users_changed
  description: "User connected or disconnected"
  params:
    - name: total
      type: integer

- id: user_changed
  description: "User started/stopped sharing or requested to connect/share (moderator mode)"
  params:
    - name: event_type
      type: enum
      values: [started_sharing, stopped_sharing, connection_request, share_request]
```

## Macros
```yaml
# No explicit multi-step macros defined in source
# UNRESOLVED: no named macros in source document
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # "Reset to Factory Defaults" is a destructive operation
  - absolute_reset  # Removes all settings including passwords
  - full_factory_reset  # Complete reset; admin password resets to "extron"
  - erase_all_files  # Removes all user-loaded files
interlocks: []
# UNRESOLVED: no safety interlock procedures stated in source
```

## Notes
- SSH connection on port 22023 requires admin username and password. Factory default password = device serial number (case-sensitive). After factory reset, password = `extron`.
- SIS commands are ASCII text terminated with CR/LF. Responses terminate with `]` (CR/LF).
- Verbose modes (1, 2, 3) provide additional response detail; control systems typically use mode 2 or 3.
- PSWD command must use carriage return (hex 0D) as delimiter, not pipe character.
- Echo should be disabled by control systems after connecting via SSH.
- Port timeout default is 30 (300 seconds = 5 minutes).
- Dual LAN supported: LAN A default 192.168.253.254, LAN B default 192.168.254.254.
- Network share supports CIFS and NFS protocols.
- Expo streaming feature requires LinkLicense.
- Maximum 64 users can connect simultaneously.
<!-- UNRESOLVED: UDP control protocol not documented in source -->
<!-- UNRESOLVED: wireless/Bluetooth control commands beyond Bluetooth discovery mode not detailed in source -->
<!-- UNRESOLVED: streaming port number not stated in source (CISG commands mention port 50000 for streaming) -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - manuals.plus
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/slp_2500_68-3824-01_B.pdf
  - https://media.extron.com/public/download/files/userman/slp_network_ports_68-3656-01_F.pdf
  - https://manuals.plus/extron/pro-series-ip-link-pro-control-processors-manual.pdf
  - https://www.extron.com/download/
  - https://www.manua.ls/extron/sharelink-pro-500/manual
retrieved_at: 2026-05-14T16:20:42.130Z
last_checked_at: 2026-10-07T22:02:53.199Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:02:53.199Z
matched_actions: 221
action_count: 221
confidence: medium
summary: "All 221 action units match source SIS commands, transport (22023, 9600 8N1, password auth) is supported, and only about 2 channel-up/down preset commands are unrepresented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "E T1+TVPR }"
- "E T1-TVPR }"
- "broadcast/UDP control not documented in source"
- "duration range and units are not stated; the command uses X@, defined as 0 = No input signal detected, 1 = Input signal detected\""
- "no named macros in source document"
- "no safety interlock procedures stated in source"
- "UDP control protocol not documented in source"
- "wireless/Bluetooth control commands beyond Bluetooth discovery mode not detailed in source"
- "streaming port number not stated in source (CISG commands mention port 50000 for streaming)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
