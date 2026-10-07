---
spec_id: admin/extron-sharelink-pro-1000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron ShareLink Pro 1000 Control Spec"
manufacturer: Extron
model_family: "ShareLink Pro 1000"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "ShareLink Pro 1000"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - media.extron.com
  - support.displaymanager.net
source_urls:
  - https://www.extron.com/download/files/userman/68-3353-01_D_sharelink_pro_1000.pdf
  - https://media.extron.com/public/download/files/specs/sharelink_pro_1000_6142-D9.pdf
  - https://www.extron.com/product/sharelinkpro1000
  - https://www.extron.com/download/files/userman/ShareLink200N_68-2775-50_C.pdf
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
retrieved_at: 2026-07-26T07:13:04.002Z
last_checked_at: 2026-10-07T22:02:34.446Z
generated_at: 2026-10-07T22:02:34.446Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source. Voltage, current, power, and physical I/O counts were dropped during refined-source extraction and are not represented here. RS-232 port is used for downstream display control / RS-232-over-LAN pass-through, not for host control of the ShareLink Pro itself."
  - "none beyond the merged actions."
  - "no multi-step command sequences explicitly described in source."
  - "no explicit safety interlock procedures, power-on sequencing"
  - "firmware version compatibility range not stated. Exact model description string, part number, and build-version format beyond the examples shown are device-dependent and not fixed in source. Voltage / current / power specs and full physical I/O inventory were excluded from the refined source."
verification:
  verdict: verified
  checked_at: 2026-10-07T22:02:34.446Z
  matched_actions: 213
  action_count: 213
  confidence: medium
  summary: "All 213 action units have literal command matches in the source, transport (SSH, TCP 22023, password auth) is source-supported, and the command catalogue is fully covered. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Extron ShareLink Pro 1000 Control Spec

## Summary
The Extron ShareLink Pro 1000 is a wireless collaboration gateway and presentation switcher featuring an HDMI input, dual-gigabit Ethernet (LAN A / LAN B), four contact-closure inputs, four tally outputs, and a display-control captive-screw connector. This spec covers external control of the device using the Extron Simple Instruction Set (SIS) transported over SSH on TCP port 22023. The command catalogue spans HDMI input and EDID management, output rate / video-format / color-bit-depth control, HDCP, video and audio muting, analog audio volume, contact/tally ports, unit naming and diagnostics, access / confirmation-code / WebView-password modes, connected-user management, and — under a LinkLicense — Expo streaming playback, channel presets, network-share mounting, and RTSP multicast configuration.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. Voltage, current, power, and physical I/O counts were dropped during refined-source extraction and are not represented here. RS-232 port is used for downstream display control / RS-232-over-LAN pass-through, not for host control of the ShareLink Pro itself. -->

## Transport
```yaml
# Host control is SIS-over-SSH. The source's "Host Device Connection" section
# specifies an SSH client (e.g. PuTTY) on TCP port 22023. The on-board RS-232
# connector (configurable via the CP / LRPT commands) is for downstream display
# control or RS-232-over-LAN pass-through, NOT for commanding the ShareLink Pro
# itself, so it is not emitted as a host transport.
protocols:
  - tcp
addressing:
  port: 22023
auth:
  type: password
  # SSH login required: admin username + password.
  #   - Default password: "extron"
  #   - Factory-configured password for ALL accounts = device serial number
  #     (case sensitive).
  #   - A "Reset to Factory Defaults" / "Absolute system reset" (ZQQQ) or
  #     "Absolute reset, retaining IP settings" (ZY) resets the admin password
  #     back to "extron".
  #   - Passwords up to 128 chars, case-sensitive, set via the PSWD command
  #     (which requires hex 0D delimiters, not '|', so '|' may appear in a
  #     password). PSWD returns E35 if the named account does not exist.
```

## Traits
```yaml
# All entries inferred from command evidence in the source (Tier 2):
- queryable  # inferred: query commands return device state (Q, *Q, I, 1I, 2I, N, and many "View *" commands)
- levelable  # inferred: analog audio output volume set / increment / decrement (X2# V/v, +V, -V)
- routable   # inferred: HDMI window and HDMI pass-through input select / de-select (1PIPS / 0PIPS / 1LS / 0LS)
```

## Actions
```yaml
- id: x#=_hdmi_input_signal_detected_rate
  label: "X#= HDMI Input Signal Detected Rate"
  kind: action
  command: "(Ex:`1920x1080@60.00Hz`); no signal =`0x0@0Hz"
  params: []

- id: x$=_video_format
  label: "X$= Video format"
  kind: action
  command: "0`= No signal,`1`= DVI,`2`= HDMI"
  params: []

- id: x^=_native_resolution_&_refresh_rate
  label: "X^= Native resolution & refresh rate"
  kind: action
  command: "Ex: 1920x1080@60.00Hz"
  params: []

- id: set_output_rate
  label: "Set output rate"
  kind: action
  command: "E 1* X* RATE }"
  params: []

- id: view_output_rate
  label: "View output rate"
  kind: action
  command: "E 1RATE }"
  params: []

- id: set_output_sync_rate
  label: "Set output sync rate"
  kind: action
  command: "E M1* X( SSAV }"
  params: []

- id: view_output_sync_mode
  label: "View output sync mode"
  kind: action
  command: "E M1SSAV }"
  params: []

- id: set_time_out_duration
  label: "Set time out duration"
  kind: action
  command: "E T1* X1) SSAV }"
  params: []

- id: view_time_out_duration
  label: "View time out duration"
  kind: action
  command: "E T1SSAV }"
  params: []

- id: set_video_bit_depth
  label: "Set video bit depth"
  kind: action
  command: "E V1* X1@ BITD }"
  params: []

- id: set_format
  label: "Set format"
  kind: action
  command: "E 1* X1# VTPO }"
  params: []

- id: view_setting
  label: "View setting"
  kind: action
  command: "E 1VTPO }"
  params: []

- id: set_hdcp_mode
  label: "Set HDCP mode"
  kind: action
  command: "E S1* X1^ HDCP }"
  params: []

- id: hdcp_authorized_device_on
  label: "HDCP Authorized Device On"
  kind: action
  command: "E E1*1HDCP }"
  params: []

- id: hdcp_authorized_device_off
  label: "HDCP Authorized Device Off"
  kind: action
  command: "E E1*0HDCP }"
  params: []

- id: enable_hdcp_notification
  label: "Enable HDCP notification"
  kind: action
  command: "E N1*1HDCP }"
  params: []

- id: disable_hdcp_notification
  label: "Disable HDCP notification"
  kind: action
  command: "E N1*0HDCP }"
  params: []

- id: mute_video_to_black
  label: "Mute video to black"
  kind: action
  command: "1*1B/b"
  params: []

- id: mute_sync_and_video
  label: "Mute sync and video"
  kind: action
  command: "1*2B/b"
  params: []

- id: video_unmute
  label: "Video unmute"
  kind: action
  command: "1*0B/b"
  params: []

- id: view_video_mute
  label: "View video mute"
  kind: action
  command: "1B/b"
  params: []

- id: view_volume
  label: "View volume"
  kind: action
  command: "V"
  params: []

- id: set_unit_name_hostname
  label: "Set unit name/ hostname"
  kind: action
  command: "EX3) CN }"
  params: []

- id: set_unit_name_hostname_to_default
  label: "Set unit name/ hostname to default"
  kind: action
  command: "E• CN }"
  params: []

- id: view_unit_name_hostname
  label: "View unit name/ hostname"
  kind: action
  command: "E CN }"
  params: []

- id: set_access_mode
  label: "Set access mode"
  kind: action
  command: "E M X4@ SHAR }"
  params: []

- id: view_access_mode
  label: "View access mode"
  kind: action
  command: "E MSHAR }"
  params: []

- id: set_confirmation_code_mode
  label: "Set confirmation-code mode"
  kind: action
  command: "E M X4$ PINC }"
  params: []

- id: view_confirmation_code_mode
  label: "View confirmation-code mode"
  kind: action
  command: "E MPINC }"
  params: []

- id: set_fixed_login_key_code
  label: "Set fixed login key code"
  kind: action
  command: "E V X4% PINC }"
  params: []

- id: view_current_login_key_code
  label: "View current login key code"
  kind: action
  command: "E VPINC }"
  params: []

- id: set_random_code_interval
  label: "Set random code interval"
  kind: action
  command: "E I X4^ PINC }"
  params: []

- id: view_random_code_interval
  label: "View random code interval"
  kind: action
  command: "E IPINC }"
  params: []

- id: set_web_view_password_option
  label: "Set WebView password option"
  kind: action
  command: "E M X4& WBSH }"
  params: []

- id: view_web_view_password_option
  label: "View WebView password option"
  kind: action
  command: "E MWBSH }"
  params: []

- id: set_web_view_password
  label: "Set WebView password"
  kind: action
  command: "E P<password>WBSH }"
  params: []

- id: set_web_view_password_back_to_default
  label: "Set WebView password back to default"
  kind: action
  command: "E P • WBSH }"
  params: []

- id: view_web_view_password
  label: "View WebView password"
  kind: action
  command: "E PWBSH }"
  params: []

- id: set_label
  label: "Set label"
  kind: action
  command: "E L X4( * X5) OSDL }"
  params: []

- id: view_label
  label: "View label"
  kind: action
  command: "E L X4( OSDL }"
  params: []

- id: show_label_and_value
  label: "Show label and value"
  kind: action
  command: "E V X4( *1OSDL }"
  params: []

- id: hide_label_and_value
  label: "Hide label and value"
  kind: action
  command: "E V X4( *0OSDL }"
  params: []

- id: set_background_color
  label: "Set background color"
  kind: action
  command: "E K X7& OSDL }"
  params: []

- id: view_background_color
  label: "View background color"
  kind: action
  command: "E KOSDL }"
  params: []

- id: set_font_color
  label: "Set font color"
  kind: action
  command: "E C X7& OSDL }"
  params: []

- id: view_font_color
  label: "View font color"
  kind: action
  command: "E COSDL }"
  params: []

- id: set_still_image_transition_effect
  label: "Set still image transition effect"
  kind: action
  command: "E E X5# SSHW }"
  params: []

- id: view_still_image_transition_effect
  label: "View still image transition effect"
  kind: action
  command: "E`ESSHW`}"
  params: []

- id: set_still_image_transition_time
  label: "Set still image transition time"
  kind: action
  command: "E T X5$ SSHW }"
  params: []

- id: view_still_image_transition_time
  label: "View still image transition time"
  kind: action
  command: "E TSSHW }"
  params: []

- id: set_duration_between_still_image_sequences
  label: "Set duration between still image sequences"
  kind: action
  command: "E D X5% SSHW }"
  params: []

- id: view_duration_between_still_image_sequences
  label: "View duration between still image sequences"
  kind: action
  command: "E DSSHW }"
  params: []

- id: set_file_path_for_standby_connected_image_gallery
  label: "Set file path for Standby/Connected Image Gallery"
  kind: action
  command: "E P X5^ , <filepath>SSHW }"
  params: []

- id: set_file_path_back_to_default
  label: "Set file path back to default"
  kind: action
  command: "E P X5^ , • SSHW }"
  params: []

- id: view_file_path_for_standby_connected_image_gallery
  label: "View file path for Standby/Connected Image Gallery"
  kind: action
  command: "E P X5^ SSHW }"
  params: []

- id: set_rs_232_port_mode
  label: "Set RS-232 port mode"
  kind: action
  command: "E O1* X5& LRPT }"
  params: []

- id: view_rs_232_port_mode
  label: "View RS-232 port mode"
  kind: action
  command: "E O1LRPT }"
  params: []

- id: set_serial_port_parameters
  label: "Set serial port parameters"
  kind: action
  command: "E 1* X5* , X5( , X6) , X6! CP }"
  params: []

- id: view_serial_port_parameters
  label: "View serial port parameters"
  kind: action
  command: "E 1CP }"
  params: []

- id: set_uart_start_point
  label: "Set UART start point"
  kind: action
  command: "EX6# MD }"
  params: []

- id: view_uart_start_point
  label: "View UART start point"
  kind: action
  command: "E MD }"
  params: []

- id: force_user_to_stop_sharing
  label: "Force user to stop sharing"
  kind: action
  command: "E S X6$ SHAR }"
  params: []

- id: force_disconnect_user
  label: "Force disconnect user"
  kind: action
  command: "E D X6$ SHAR }"
  params: []

- id: enable_echo_default
  label: "Enable echo (default)"
  kind: action
  command: "E 1ECHO }"
  params: []

- id: disable_echo
  label: "Disable echo"
  kind: action
  command: "E 0ECHO }"
  params: []

- id: set_current_port_timeout
  label: "Set current port timeout"
  kind: action
  command: "E 0* X6@ TC }"
  params: []

- id: view_current_port_timeout
  label: "View current port timeout"
  kind: action
  command: "E 0TC }"
  params: []

- id: set_global_port_timeout
  label: "Set global port timeout"
  kind: action
  command: "E 1* X6@ TC }"
  params: []

- id: view_global_port_timeout
  label: "View global port timeout"
  kind: action
  command: "E 1TC }"
  params: []

- id: reboot_device
  label: "Reboot device"
  kind: action
  command: "E 1BOOT }"
  params: []

- id: reset_to_factory_defaults
  label: "Reset to factory defaults"
  kind: action
  command: "E ZXXX }"
  params: []

- id: erase_all_files_from_flash_memory
  label: "Erase all files from flash memory"
  kind: action
  command: "E ZFFF }"
  params: []

- id: absolute_reset,_retaining_ip_settings
  label: "Absolute reset, retaining IP settings"
  kind: action
  command: "E ZY }"
  params: []

- id: ip_system_reset
  label: "IP system reset"
  kind: action
  command: "E 1ZQQQ }"
  params: []

- id: absolute_system_reset
  label: "Absolute system reset"
  kind: action
  command: "E ZQQQ }"
  params: []

- id: start_playback
  label: "Start playback"
  kind: action
  command: "E S [X8@] [*] [X8#] [PLYR] [}]"
  params: []

- id: pause_playback
  label: "Pause playback"
  kind: action
  command: "E E [X8@] [PLYR] [}]"
  params: []

- id: stop_playback
  label: "Stop playback"
  kind: action
  command: "E O [X8@] [PLYR] [}]"
  params: []

- id: view_playback_state
  label: "View playback state"
  kind: action
  command: "E Y [X8@] [PLYR] [}]"
  params: []

- id: set_loop_play_on
  label: "Set loop play on"
  kind: action
  command: "E R [X8@] [*1PLYR] [}]"
  params: []

- id: set_loop_play_off
  label: "Set loop play off"
  kind: action
  command: "E R [X8@] [*0PLYR] [}]"
  params: []

- id: enable_subtitles
  label: "Enable subtitles"
  kind: action
  command: "E E [X8@] [*1SUBT] [}]"
  params: []

- id: disable_subtitles
  label: "Disable subtitles"
  kind: action
  command: "E E [X8@] [*0SUBT] [}]"
  params: []

- id: select_next_channel
  label: "Select next channel"
  kind: action
  command: "E N [X8@] [PLYR] [}]"
  params: []

- id: select_previous_channel
  label: "Select previous channel"
  kind: action
  command: "E P [X8@] [PLYR] [}]"
  params: []

- id: view_current_timecode
  label: "View current timecode"
  kind: action
  command: "E K X8@ PLYR }"
  params: []

- id: view_current_clip_length
  label: "View current clip length"
  kind: action
  command: "E Z [X8@] [PLYR] [}]"
  params: []

- id: seek_by_offset
  label: "Seek by offset"
  kind: action
  command: "E J [X8@] [*] [X8*] [PLYR] [}]"
  params: []

- id: seek_to_timecode
  label: "Seek to timecode"
  kind: action
  command: "E K [X8@] [*] [X8&] [PLYR] [}]"
  params: []

- id: view_current_timecode_2
  label: "View current timecode"
  kind: action
  command: "E K [X8@] [PLYR] [}]"
  params: []

- id: load_media_item_path
  label: "Load media item path"
  kind: action
  command: "E U [X8@] [*] [X8(] [PLYR] [}]"
  params: []

- id: view_current_media_path
  label: "View current media path"
  kind: action
  command: "E U [X8@] [PLYR] [}]"
  params: []

- id: view_current_preset
  label: "View current preset"
  kind: action
  command: "T"
  params: []

- id: recall_preset_by_reference
  label: "Recall preset by reference"
  kind: action
  command: "X9# T"
  params: []

- id: next_preset
  label: "Next preset"
  kind: action
  command: "+T"
  params: []

- id: previous_preset
  label: "Previous preset"
  kind: action
  command: "-T"
  params: []

- id: view_current_preset_2
  label: "View current preset"
  kind: action
  command: "E T X8@ TVPR }"
  params: []

- id: recall_preset_by_reference_2
  label: "Recall preset by reference"
  kind: action
  command: "E T X8@ * X9# TVPR }"
  params: []

- id: next_preset_2
  label: "Next preset"
  kind: action
  command: "E T X8@ +TVPR }"
  params: []

- id: previous_preset_2
  label: "Previous preset"
  kind: action
  command: "E T X8@ -TVPR }"
  params: []

- id: view_all_presets
  label: "View all presets"
  kind: action
  command: "E GTVPR }"
  params: []

- id: save_uri_to_preset
  label: "Save URI to preset"
  kind: action
  command: "E U [X9#] [*] [X9)] [TVPR] [}]"
  params: []

- id: save_current_uri_to_preset
  label: "Save current URI to preset"
  kind: action
  command: "E S [X8@] [*] [X9#] [TVPR] [}]"
  params: []

- id: import_channel_preset
  label: "Import channel preset"
  kind: action
  command: "E I* [X8(] [TVPR] [}]"
  params: []

- id: export_channel_preset
  label: "Export channel preset"
  kind: action
  command: "E E* [X8(] [TVPR] [}]"
  params: []

- id: delete_preset
  label: "Delete preset"
  kind: action
  command: "E X [X9#] [TVPR] [}]"
  params: []

- id: delete_all_presets
  label: "Delete all presets"
  kind: action
  command: "E X*0TVPR }"
  params: []

- id: add_a_network_share
  label: "Add a network share"
  kind: action
  command: "E A{\"service\":\" X10^ \", \"mountpoint\":\" X10& \", \"username\":\" X10* \", \"password\":\" X10( \", \"options\":\" X11) \", \"reconnect\":\" X11! \", \"extron_share\":\" X11@ \"} XNAS }"
  params: []

- id: unmount_remove_a_share
  label: "Unmount (remove) a share"
  kind: action
  command: "E X* [X10&] [XNAS] [}]"
  params: []

- id: unmount_remove_all_shares
  label: "Unmount (remove) all shares"
  kind: action
  command: "E X*0XNAS }"
  params: []

- id: view_all_mounted_shares
  label: "View all mounted shares"
  kind: action
  command: "E GXNAS }"
  params: []

- id: view_file_system_directory_structure
  label: "View file-system directory structure"
  kind: action
  command: "EX11# * X11$ TREE }"
  params: []

- id: view_list_of_discovered_streams
  label: "View list of discovered streams"
  kind: action
  command: "E XSAP }"
  params: []

- id: set_player_buffering
  label: "Set player buffering"
  kind: action
  command: "E E X8@ * X8% PBUF }"
  params: []

- id: set_initial_play_threshold
  label: "Set initial play threshold"
  kind: action
  command: "E I X8@ * X11^ PBUF }"
  params: []

- id: view_initial_play_threshold
  label: "View initial play threshold"
  kind: action
  command: "E I X8@ PBUF }"
  params: []

- id: set_rebuffering_play_threshold
  label: "Set rebuffering play threshold"
  kind: action
  command: "E R X8@ * X11& PBUF }"
  params: []

- id: view_rebuffering_play_threshold
  label: "View rebuffering play threshold"
  kind: action
  command: "E R X8@ PBUF }"
  params: []

- id: prefer_rtsp_multicast
  label: "Prefer RTSP Multicast"
  kind: action
  command: "E Q X8@ * X8% PLYR }"
  params: []

- id: view_rtsp_multicast_preference
  label: "View RTSP Multicast preference"
  kind: action
  command: "E Q X8@ PLYR }"
  params: []

- id: select_hdmi_window_input
  label: "Select HDMI Window Input"
  kind: action
  command: "E`1PIPS`}"
  params: []

- id: deselect_hdmi_window_input
  label: "De-Select HDMI Window Input"
  kind: action
  command: "E`0PIPS`}"
  params: []

- id: select_hdmi_pass_through_input
  label: "Select HDMI Pass-Through Input"
  kind: action
  command: "1!"
  params: []

- id: deselect_hdmi_pass_through_input
  label: "De-Select HDMI Pass-Through Input"
  kind: action
  command: "0!"
  params: []

- id: import_edid_to_input_slot
  label: "Import EDID To Input Slot"
  kind: action
  command: "E`I`X%`,<`_`filename`_`>`<br>`EDID`}"
  params: []
  # X% = EDID table slot; range: UNRESOLVED.
  # filename constraints: UNRESOLVED.

- id: export_edid_to_pc
  label: "Export EDID To PC"
  kind: action
  command: "E`E`X%`,<`_`filename`_`>`<br>`EDID`}"
  params: []
  # X% = EDID table slot; range: UNRESOLVED.
  # filename constraints: UNRESOLVED.

- id: mute_audio_output
  label: "Mute Audio Output"
  kind: action
  command: "1*1Z/z"
  params: []

- id: unmute_audio_output
  label: "Unmute Audio Output"
  kind: action
  command: "1*0Z/z"
  params: []

- id: set_input_aspect_ratio_to_fill
  label: "Set Input Aspect Ratio To Fill"
  kind: action
  command: "EX2!`*1ASPR`}"
  params: []
  # X2! = Input type `1` = HDMI `2` = Decoder (for all decoder streams)
  # `3` = Airplay streams `4` = Uploaded image/video content

- id: set_input_aspect_ratio_to_follow
  label: "Set Input Aspect Ratio To Follow"
  kind: action
  command: "EX2!`*2ASPR`}"
  params: []
  # X2! = Input type `1` = HDMI `2` = Decoder (for all decoder streams)
  # `3` = Airplay streams `4` = Uploaded image/video content

- id: specify_volume
  label: "Specify Volume"
  kind: action
  command: "X2#`V/v`"
  params: []
  # X2# = Volume adjustment range `-100` to `0` = (default is `-30dB`)

- id: increment_volume
  label: "Increment Volume"
  kind: action
  command: "+V"
  params: []

- id: decrement_volume
  label: "Decrement Volume"
  kind: action
  command: "-V"
  params: []

- id: set_tally_output
  label: "Set Tally Output"
  kind: action
  command: "EX2^`*`X2&`TALY`}"
  params: []
  # X2^ = Tally output `1` = Tally output 1 `2` = Tally output 2
  # `3` = Tally output 3 `4` = Tally output 4
  # X2& = Contact/tally state `0` = Off (open) `1` = On (closed)

- id: set_all_tally_outputs
  label: "Set All Tally Outputs"
  kind: action
  command: "EX2&`*TALY`}"
  params: []
  # X2& = Contact/tally state `0` = Off (open) `1` = On (closed)

- id: front_panel_executive_mode
  label: "Front Panel Executive Mode"
  kind: action
  command: "X2*`X`"
  params: []
  # X2* = Executive mode `0` = Off (default) `1` = On

- id: set_verbose_mode
  label: "Set Verbose Mode"
  kind: action
  command: "EX3%`CV`}"
  params: []
  # X3% = Verbose response mode `0` = Clear (none) (default), `1` = Verbose mode,
  # `2` = Tagged responses, `3` = Verbose + tagged responses

- id: set_display_layout_mode
  label: "Set Display Layout Mode"
  kind: action
  command: "EX3^`OMOD`}"
  params: []
  # X3^ = Layout mode `1` = Layout group #1 (default) `2` = Layout group #2
  # `3` = Layout group #3 `4` = Layout group #4 `5` = Layout group #5

- id: set_auto_default_to_hdmi_input_mode
  label: "Set Auto-Default To HDMI Input Mode"
  kind: action
  command: "EX3*`AUSW`}"
  params: []
  # X3* = HDMI input mode `0` = Disabled `1` = Enabled (default)

- id: set_apple_screen_mirroring
  label: "Set Apple Screen Mirroring"
  kind: action
  command: "E`A`X2(`*`X3(`SHAR`}"
  params: []
  # X2( = LAN Port `1` = LAN Port A `2` = LAN Port B
  # X3( = Apple screen mirroring mode `0` = Disabled `1` = Enabled (default)

- id: set_apple_screen_mirroring_device_discovery_proxy_service
  label: "Set Apple Screen Mirroring Device Discovery Proxy Service"
  kind: action
  command: "E`A`X2(`*`X39!`DVRY`}"
  params: []
  # X2( = LAN Port `1` = LAN Port A `2` = LAN Port B
  # X39! = Device discovery proxy service `0` = Disabled (default) `1` = Enabled

- id: set_mdns_hostname
  label: "Set mDNS Hostname"
  kind: action
  command: "E`H`X7*`ZCON`}"
  params: []
  # X7* = mDNS hostname (alpha-numeric up to 63 characters; no blanks, spaces, or special characters except hyphen (-).
  # The first character must be an alphabetical character, and the last character must not be a hyphen.

- id: clear_mdns_hostname
  label: "Clear mDNS Hostname"
  kind: action
  command: "E`H`•`ZCON`}"
  params: []

- id: enable_hdmi_input
  label: "Enable HDMI Input"
  kind: action
  command: "E`H1MODE`}"
  params: []

- id: disable_hdmi_input
  label: "Disable HDMI Input"
  kind: action
  command: "E`H0MODE`}"
  params: []

- id: show_hdmi_client_app_controls
  label: "Show HDMI Client App Controls"
  kind: action
  command: "E`V1APPC`}"
  params: []

- id: hide_hdmi_client_app_controls
  label: "Hide HDMI Client App Controls"
  kind: action
  command: "E`V0APPC`}"
  params: []

- id: set_client_app_hdmi_controls_label
  label: "Set Client App HDMI Controls Label"
  kind: action
  command: "E`1,`X4!`NI`}"
  params: []
  # X4! = Client app controls label UTF-8 characters permitted, maximum of 16 characters

- id: set_client_app_hdmi_controls_label_to_default
  label: "Set Client App HDMI Controls Label To Default"
  kind: action
  command: "E`1,`•`NI`}"
  params: []

- id: set_password
  label: "Set Password"
  kind: action
  command: "E PSWD*<username> }<br><current password> }<br><new password> }<br><new password> }"
  params: []
  # username constraints: UNRESOLVED.
  # Password can be up to 128 characters. All human-readable characters are permitted. The password cannot be a single space. Passwords are case-sensitive.
  # The PSWD command must use the carriage return character (hex 0D) and not the pipe character (|) as delimiters. This allows the pipe character to be part of a password, if desired.

- id: enable_disable_expo_feature
  label: "Enable/Disable Expo Feature"
  kind: action
  command: "E`P`<br> X10$`SHAR`}"
  params: []
  # X10$ = Expo feature `0` = Disabled (default) `1` = Continuous `2` = Temporary
```

## Feedbacks
```yaml
- id: x!=_input_window_status
  label: "X!= Input window status"
  kind: query
  query_command: "0`= HDMI window not displayed 1 = HDMI window displayed"

- id: view_screen_saver_status
  label: "View screen saver status"
  kind: query
  query_command: "E S1SSAV }"

- id: query_video_bit_depth
  label: "Query video bit depth"
  kind: query
  query_command: "E V1BITD }"

- id: query_hdcp_mode
  label: "Query HDCP mode"
  kind: query
  query_command: "E S1HDCP }"

- id: query_hdcp_authorized_device_status
  label: "Query HDCP Authorized Device Status"
  kind: query
  query_command: "E E1HDCP }"

- id: view_input_hdcp_status
  label: "View input HDCP status"
  kind: query
  query_command: "E I1HDCP }"

- id: view_output_hdcp_status
  label: "View output HDCP status"
  kind: query
  query_command: "E O1HDCP }"

- id: query_hdcp_notification
  label: "Query HDCP notification"
  kind: query
  query_command: "E N1HDCP }"

- id: information_request_view_unit_information
  label: "Information request (View unit information)"
  kind: query
  query_command: "I/i"

- id: query_firmware_version
  label: "Query firmware version"
  kind: query
  query_command: "Q/q"

- id: query_firmware_and_build_version
  label: "Query firmware and build version"
  kind: query
  query_command: "*Q/q"

- id: query_internal_temperature
  label: "Query internal temperature"
  kind: query
  query_command: "E 20STAT }"

- id: query_model_name
  label: "Query model name"
  kind: query
  query_command: "1I/i"

- id: query_model_description
  label: "Query model description"
  kind: query
  query_command: "2I/i"

- id: query_part_number
  label: "Query part number"
  kind: query
  query_command: "N/n"

- id: set_status_bar_mode
  label: "Set status bar mode"
  kind: query
  query_command: "E M [X4*] [OSDL] [}]"

- id: view_status_bar_mode
  label: "View status bar mode"
  kind: query
  query_command: "E MOSDL }"

- id: set_enable_disable_status_bar_pop_up
  label: "Set enable/disable status bar pop-up"
  kind: query
  query_command: "E P [X7(] [OSDL] [}]"

- id: view_status_bar_pop_up
  label: "View status bar pop-up"
  kind: query
  query_command: "E POSDL }"

- id: set_status_bar_pop_up_timer
  label: "Set status bar pop-up timer"
  kind: query
  query_command: "E T [X79!] [OSDL] [}]"

- id: view_status_bar_pop_up_timer
  label: "View status bar pop-up timer"
  kind: query
  query_command: "E TOSDL }"

- id: query_label_visibility
  label: "Query label visibility"
  kind: query
  query_command: "E V X4( OSDL }"

- id: query_list_of_connected_user_information_up_to_64_entries
  label: "Query list of connected user information (up to 64 entries)"
  kind: query
  query_command: "E L0SHAR }"

- id: query_specific_connected_user_information
  label: "Query specific connected user information"
  kind: query
  query_command: "E L X6$ SHAR }"

- id: query_total_number_of_users_connected
  label: "Query total number of users connected"
  kind: query
  query_command: "E KSHAR }"

- id: approve_user_connection_request_moderator_mode_only
  label: "Approve user connection request (moderator mode only)"
  kind: query
  query_command: "E C X6$ *1SHAR }"

- id: reject_user_connection_request_moderator_mode_only
  label: "Reject user connection request (moderator mode only)"
  kind: query
  query_command: "E C X6$ *0SHAR }"

- id: approve_user_share_request_moderator_mode_only
  label: "Approve user share request (moderator mode only)"
  kind: query
  query_command: "E R X6$ *1SHAR }"

- id: reject_user_share_request_moderator_mode_only
  label: "Reject user share request (moderator mode only)"
  kind: query
  query_command: "E R X6$ *0SHAR }"

- id: view_echo_status
  label: "View echo status"
  kind: query
  query_command: "E ECHO }"

- id: view_loop_play_status
  label: "View loop play status"
  kind: query
  query_command: "E R [X8@] [PLYR] [}]"

- id: view_subtitle_status
  label: "View subtitle status"
  kind: query
  query_command: "E E [X8@] [SUBT] [}]"

- id: view_network_status
  label: "View network status"
  kind: query
  query_command: "EX11% NWKS }"

- id: view_player_buffering_status
  label: "View player buffering status"
  kind: query
  query_command: "E E X8@ PBUF }"

- id: view_hdmi_window_input
  label: "View HDMI Window Input"
  kind: query
  query_command: "E`PIPS`}"

- id: view_hdmi_pass_through_input
  label: "View HDMI Pass-Through Input"
  kind: query
  query_command: "!"

- id: query_hdmi_input_signal_detected_rate
  label: "Query HDMI Input Signal Detected Rate"
  kind: query
  query_command: "E`1LS`}"

- id: view_detected_format
  label: "View Detected Format"
  kind: query
  query_command: '1*\'

- id: query_hdmi_input_signal_presence
  label: "Query HDMI Input Signal Presence"
  kind: query
  query_command: "E`0LS`}"

- id: view_edid_native_resolution
  label: "View EDID Native Resolution"
  kind: query
  query_command: "E`N`X%`EDID`}"
  # X% = EDID table slot; range: UNRESOLVED.

- id: read_edid_of_input_in_hex_format
  label: "Read EDID Of Input In Hex Format"
  kind: query
  query_command: "E`R1EDID`}"

- id: view_audio_output_mute
  label: "View Audio Output Mute"
  kind: query
  query_command: "1Z/z"

- id: view_aspect_ratio_setting
  label: "View Aspect Ratio Setting"
  kind: query
  query_command: "EX2!`ASPR`}"
  # X2! = Input type `1` = HDMI `2` = Decoder (for all decoder streams)
  # `3` = Airplay streams `4` = Uploaded image/video content

- id: query_contact_closure_state
  label: "Query Contact Closure State"
  kind: query
  query_command: "EX2%`CNTC`}"
  # X2% = Contact closure input `1` = Contact closure input 1 `2` = Contact closure input 2
  # `3` = Contact closure input 3 `4` = Contact closure input 4

- id: query_all_contact_closure_states
  label: "Query All Contact Closure States"
  kind: query
  query_command: "E`CNTC`}"

- id: query_tally_output
  label: "Query Tally Output"
  kind: query
  query_command: "EX2^`TALY`}"
  # X2^ = Tally output `1` = Tally output 1 `2` = Tally output 2
  # `3` = Tally output 3 `4` = Tally output 4

- id: query_all_tally_outputs
  label: "Query All Tally Outputs"
  kind: query
  query_command: "E`TALY`}"

- id: view_lockout_status
  label: "View Lockout Status"
  kind: query
  query_command: "X/x"

- id: view_verbose_mode
  label: "View Verbose Mode"
  kind: query
  query_command: "E`CV`}"

- id: view_display_layout_mode
  label: "View Display Layout Mode"
  kind: query
  query_command: "E`OMOD`}"

- id: view_auto_default_to_hdmi_input_mode
  label: "View Auto-Default To HDMI Input Mode"
  kind: query
  query_command: "E`AUSW`}"

- id: view_apple_screen_mirroring
  label: "View Apple Screen Mirroring"
  kind: query
  query_command: "E`A`X2(`SHAR`}"
  # X2( = LAN Port `1` = LAN Port A `2` = LAN Port B

- id: view_apple_screen_mirroring_device_discovery_proxy_service
  label: "View Apple Screen Mirroring Device Discovery Proxy Service"
  kind: query
  query_command: "E`A`X2(`DVRY`}"
  # X2( = LAN Port `1` = LAN Port A `2` = LAN Port B

- id: view_mdns_hostname
  label: "View mDNS Hostname"
  kind: query
  query_command: "E`HZCON`}"

- id: view_hdmi_input_setting
  label: "View HDMI Input Setting"
  kind: query
  query_command: "E`HMODE`}"

- id: view_hdmi_client_app_controls_setting
  label: "View HDMI Client App Controls Setting"
  kind: query
  query_command: "E`VAPPC`}"

- id: view_client_app_hdmi_controls_label
  label: "View Client App HDMI Controls Label"
  kind: query
  query_command: "E`1NI`}"

- id: view_expo_feature
  label: "View Expo Feature"
  kind: query
  query_command: "E`PSHAR`}"

- id: view_player_state
  label: "View Player State"
  kind: query
  query_command: "E`QSHAR`}"

- id: view_current_stream_statistics
  label: "View Current Stream Statistics"
  kind: query
  query_command: "E`JBITR`}"

- id: view_current_stream_mode
  label: "View Current Stream Mode"
  kind: query
  query_command: "E`SMOD`}"

- id: view_current_source_audio_sample_rate
  label: "View Current Source Audio Sample Rate"
  kind: query
  query_command: "E`AUSR`}"
```

## Variables
```yaml
# Settable parameters in the source (output rate, volume, bit depth, timeouts,
# transition times, serial parameters, thresholds, etc.) are represented as
# discrete set/view Actions by the deterministic extraction. No additional
# continuous variables to author.
# UNRESOLVED: none beyond the merged actions.
```

## Events
```yaml
# Unsolicited responses (device -> host), documented in the source's
# "Unsolicited Responses" section. These are emitted without a host query when
# the corresponding state changes. Each payload is shown verbatim using the
# source's symbol notation; "]" terminates a response (CR/LF).
- id: input_selection_changed
  description: "HDMI window / pass-through input selected or de-selected"
  payloads:
    - "Pips1]"        # HDMI window input selected
    - "Pips0]"        # HDMI window input de-selected
    - "In1]"          # HDMI pass-through input selected
    - "In0]"          # HDMI pass-through input de-selected

- id: input_signal_presence_changed
  description: "HDMI input signal presence changed"
  payload: "In00*X@]"  # X@ = 0 (no signal) / 1 (signal detected)

- id: input_frequency_changed
  description: "Change of the input frequency (reconfiguration)"
  payload: "Reconfig]"

- id: detected_video_format_changed
  description: "Detected video format on the HDMI input changed"
  payload: "Vtyp1*X$]"  # X$ = 0 no signal / 1 DVI / 2 HDMI

- id: hdcp_input_status_changed
  description: "HDCP status of the HDMI input changed"
  payload: "HdcpI X1$]"  # X1$ = 0 not connected / 1 not HDCP encrypted / 2 HDCP encrypted

- id: hdcp_output_status_changed
  description: "HDCP status of the HDMI output changed"
  payload: "HdcpO X1$]"

- id: hot_plug_output
  description: "Hot plug occurs on the local HDMI output"
  payload: "HplgO]"

- id: contact_closure_changed
  description: "State of a contact closure input (X2%) changed"
  payload: "Cntc X2%*X2&]"  # X2% = input 1-4; X2& = 0 open / 1 closed

- id: user_count_changed
  description: "A user connected to or disconnected from the ShareLink Pro"
  payload: "SharK X7$]"  # X7$ = total connected users (max 64)

- id: user_content_changed
  description: >-
    A connected user started or stopped sharing content, or (moderator mode
    only) a user is requesting to connect or to share content.
  payload: "UserChg]"
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# The source documents several destructive SIS reset commands. No explicit
# confirmation prompt or interlock procedure is described for them, so none is
# inferred here - listed only as a hazard inventory:
#   - 1BOOT  : reboot device
#   - ZXXX   : reset all settings to defaults; retain user files & IP settings
#              (does NOT affect passwords); equivalent to rear-panel Reset mode 3
#   - ZFFF   : erase all user files from flash memory (user space only)
#   - ZY     : absolute reset retaining IP settings; deletes user files;
#              admin password resets to "extron"; recommended after firmware update
#   - 1ZQQQ  : IP settings reset only
#   - ZQQQ   : absolute system reset; all device + IP settings to default;
#              deletes user files; admin password resets to "extron";
#              equivalent to rear-panel Reset mode 5
# Physical rear-panel Reset modes (1 / 3 / 4 / 5) mirror the firmware / defaults
# / IP / factory resets above but are not themselves SIS commands.
# UNRESOLVED: no explicit safety interlock procedures, power-on sequencing
# requirements, or fault-recovery sequences stated in the refined source.
```

## Notes
- **Protocol.** Extron SIS (Simple Instruction Set) over SSH. Commands are one-or-more ASCII characters with no required start character; a command is terminated by `}` (pipe `|` is interchangeable with `}` as a terminator, except inside the PSWD command, which must use hex `0D`).
- **Response framing.** All device-to-host responses end with CR/LF, written `]` in the source. `}` = CR (no LF) used as a command terminator; `E` / `W` = Escape. Verbose-mode 2/3 responses are prefixed with a tagged mnemonic (e.g. `Vmt1*X1*]`).
- **Case.** Upper- and lowercase are interchangeable unless otherwise stated. Passwords are case-sensitive.
- **Echo.** Echo defaults ON (`E 1ECHO}` → `Echo1]`). With echo on, typed characters are echoed back before the response and extra CRs may appear. **Control systems should turn echo OFF after connecting** (`E 0ECHO}`). Echo applies only to the current connection, not globally.
- **Port timeout.** Current and global connection timeouts are configurable (`0*` / `1*` TC). Range 1 (=10 s) to 65000 (=650,000 s); default 30 (=300 s = 5 min).
- **Verbose mode (X3%).** `0`=clear/none (default), `1`=verbose, `2`=tagged responses, `3`=verbose+tagged. Many response tables show the tagged Verbose-mode 2/3 variant.
- **Error codes.** `E10` invalid command · `E11` invalid preset number · `E13` invalid parameter · `E14` not valid for this configuration · `E17` invalid command for signal type · `E22` busy · `E24` privilege violation · `E35` (PSWD) account does not exist.
- **Default networking.** LAN A default IP 192.168.253.254 (DHCP on); LAN B default IP 192.168.254.254 (DHCP off); subnet 255.255.255.0; gateway 0.0.0.0; link speed/duplex autodetected.
- **Default output rate.** Output rate `45` = 1080p @ 60 Hz. Output sync mode `0` = always active (default).
- **Default credentials / unit name.** Default admin password `extron`; factory password = device serial number. Default unit name `ShareLink-Pro-xx-xx-xx` (last six digits of MAC).
- **mDNS hostname (X7*).** Alpha-numeric, up to 63 chars; no blanks/spaces/special chars except hyphen; first char must be alphabetical; last char must not be a hyphen.
- **LinkLicense gating.** The Expo feature and streaming-input SIS commands (BITR, SMOD, AUSR, PLYR family, TVPR presets, XNAS shares, PBUF buffering, RTSP-multicast PLYR) require a LinkLicense.
- **Firewall / required inbound control port.** TCP 22023 (SIS-over-SSH). Other required/optional ports (DNS 53, HTTP 80, HTTPS 443, NTP 123, PCS 4522/4523, Apple Screen Mirroring 5353/7000/7100, discovery 1230/1231, streaming UDP 1000-65384) are listed in the source for application traffic, not for host SIS control.
- **Dual LAN.** Several commands take a LAN selector `X2(` (`1`=LAN A, `2`=LAN B), e.g. Apple Screen Mirroring and device-discovery proxy enable/disable.

<!-- UNRESOLVED: firmware version compatibility range not stated. Exact model description string, part number, and build-version format beyond the examples shown are device-dependent and not fixed in source. Voltage / current / power specs and full physical I/O inventory were excluded from the refined source. -->

## Provenance

```yaml
source_domains:
  - extron.com
  - media.extron.com
  - support.displaymanager.net
source_urls:
  - https://www.extron.com/download/files/userman/68-3353-01_D_sharelink_pro_1000.pdf
  - https://media.extron.com/public/download/files/specs/sharelink_pro_1000_6142-D9.pdf
  - https://www.extron.com/product/sharelinkpro1000
  - https://www.extron.com/download/files/userman/ShareLink200N_68-2775-50_C.pdf
  - https://support.displaymanager.net/hc/en-gb/articles/22750870424733-Troubleshooting-Guide-for-Extron-Control-Systems
retrieved_at: 2026-07-26T07:13:04.002Z
last_checked_at: 2026-10-07T22:02:34.446Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:02:34.446Z
matched_actions: 213
action_count: 213
confidence: medium
summary: "All 213 action units have literal command matches in the source, transport (SSH, TCP 22023, password auth) is source-supported, and the command catalogue is fully covered. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source. Voltage, current, power, and physical I/O counts were dropped during refined-source extraction and are not represented here. RS-232 port is used for downstream display control / RS-232-over-LAN pass-through, not for host control of the ShareLink Pro itself."
- "none beyond the merged actions."
- "no multi-step command sequences explicitly described in source."
- "no explicit safety interlock procedures, power-on sequencing"
- "firmware version compatibility range not stated. Exact model description string, part number, and build-version format beyond the examples shown are device-dependent and not fixed in source. Voltage / current / power specs and full physical I/O inventory were excluded from the refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
