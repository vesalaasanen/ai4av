---
spec_id: admin/elium-dvb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Elium IRD Receiver Control Spec"
manufacturer: Elium
model_family: "Elium DVB Series"
aliases: []
compatible_with:
  manufacturers:
    - Elium
  models:
    - "Elium DVB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - elium.de
source_urls:
  - https://elium.de/files/download/IRD_RS232_Protocol.pdf
retrieved_at: 2026-04-30T04:35:07.855Z
last_checked_at: 2026-10-07T13:16:25.424Z
generated_at: 2026-10-07T13:16:25.424Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "GTC L"
  - "GTC R"
  - "specific model variant names not stated in source"
  - "video level parameters (brightness, contrast, saturation, sharpness, hue)"
  - "no explicit multi-step macros described in source"
  - "firmware version compatibility ranges not stated"
  - "electrical specifications (voltage, current, power consumption) not stated"
  - "specific product model variants / product family members not enumerated"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:16:25.424Z
  matched_actions: 240
  action_count: 240
  confidence: medium
  summary: "All 240 action units map to source commands and transport supported; only GTC L/GTC R unrepresented, coverage above 0.9. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Elium IRD Receiver Control Spec

## Summary
IRD receiver supporting RS-232 (RS-RC mode) and TCP/IP (NET-RC mode) control via bidirectional text-based command protocol. Commands wrapped in `<>` delimiters; responses prefixed with `#`. Default TCP port is 26. Default serial baud 115200.

<!-- UNRESOLVED: specific model variant names not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 26  # default TCP port per source
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth/login procedure in source)
```

## Traits
```yaml
- powerable  # ON/OFF commands present
- routable   # TV/Radio channel change commands present
- queryable  # GCS, GCM, GNT, GNR, GCC, GCP, GCV etc. present
- levelable  # VOL, SBR, SCO, SSA, SSH etc. present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turn on Receiver (doesn't work in normal mode)

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turn off Receiver (doesn't work in Standby mode)

- id: reboot
  label: Reboot Receiver
  kind: action
  params: []
  description: Reboot Receiver. Parameters are not erased.

- id: set_rs232_baud_rate
  label: Set RS232 Baud Rate
  kind: action
  params:
    - name: baud
      type: integer
      description: Baud rate; supported values 9600, 19200, 38400, 115200

- id: set_left_cooler_max_temp
  label: Set Left Cooler Maximum Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: Temperature value (50, 55, 60, 65, 70, 75)

- id: set_left_cooler_min_temp
  label: Set Left Cooler Minimum Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: Temperature value (20, 25, 30, 35, 40, 45)

- id: set_right_cooler_max_temp
  label: Set Right Cooler Maximum Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: Temperature value (50, 55, 60, 65, 70, 75)

- id: set_right_cooler_min_temp
  label: Set Right Cooler Minimum Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: Temperature value (20, 25, 30, 35, 40, 45)

- id: teletext_on
  label: Teletext On
  kind: action
  params: []

- id: teletext_off
  label: Teletext Off
  kind: action
  params: []

- id: teletext_page
  label: Select Teletext Page
  kind: action
  params:
    - name: page
      type: integer
      description: Page number (100..999)

- id: teletext_nav
  label: Teletext Navigation Key
  kind: action
  params:
    - name: key
      type: enum
      values: [R, G, Y, B]
      description: Color key (RED/GREEN/YELLOW/BLUE)

- id: epg_on
  label: EPG On
  kind: action
  params: []

- id: epg_off
  label: EPG Off
  kind: action
  params: []

- id: epg_nav
  label: EPG Navigation
  kind: action
  params:
    - name: direction
      type: enum
      values: [R, L, U, D, I, E]
      description: Right/Left/Up/Down/Info/Exit

- id: current_program_info_on
  label: Current Program Info On
  kind: action
  params: []

- id: current_program_info_off
  label: Current Program Info Off
  kind: action
  params: []

- id: current_program_info_nav
  label: Current Program Info Navigation
  kind: action
  params:
    - name: direction
      type: enum
      values: [U, D]
      description: Up/Down

- id: freeze_picture_on
  label: Freeze Picture On
  kind: action
  params: []

- id: freeze_picture_off
  label: Freeze Picture Off
  kind: action
  params: []

- id: audio_multifeed_on
  label: Audio Multifeed Option On
  kind: action
  params: []

- id: audio_multifeed_off
  label: Audio Multifeed Option Off
  kind: action
  params: []

- id: audio_multifeed_nav
  label: Audio Multifeed Navigation
  kind: action
  params:
    - name: direction
      type: enum
      values: [U, D, L, R]
      description: Up/Down/Left/Right

- id: return_to_last_channel
  label: Return to Last Channel
  kind: action
  params: []

- id: menu
  label: Menu
  kind: action
  params: []

- id: exit_menu
  label: Exit Menu
  kind: action
  params: []

- id: confirm
  label: Confirm Selection
  kind: action
  params: []

- id: start_mp3_player
  label: Start movieNET MP3 Audio Player
  kind: action
  params: []

- id: start_internet_radio
  label: Start movieNET Internet Radio Player
  kind: action
  params: []

- id: nav_up
  label: Navigate Up
  kind: action
  params: []

- id: nav_down
  label: Navigate Down
  kind: action
  params: []

- id: nav_left
  label: Navigate Left
  kind: action
  params: []

- id: nav_right
  label: Navigate Right
  kind: action
  params: []

- id: info
  label: Info
  kind: action
  params: []
  description: Activates OSD menu with program informations

- id: tvl
  label: TV List
  kind: action
  params: []
  description: Activates OSD menu with list of available programs

- id: pag_up
  label: Page Up
  kind: action
  params: []
  description: Moves cursor 10 lines up in program list; in normal mode switches to current program + 10

- id: pag_down
  label: Page Down
  kind: action
  params: []
  description: Moves cursor 10 lines down in program list; in normal mode switches to current program - 10

- id: pag_relative
  label: Page Relative
  kind: action
  params:
    - name: offset
      type: integer
      description: Lines to move (+/- n)

- id: digit_input
  label: Digit Input
  kind: action
  params:
    - name: digit
      type: integer
      description: Digit 0..9

- id: set_rgb_ypbpr_mode
  label: Set RGB/YPbPr Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=RGB, 1=YPbPr

- id: set_digital_video_resolution
  label: Set Digital Video Output Resolution
  kind: action
  params:
    - name: res
      type: integer
      description: "0=576p, 1=720p 60Hz, 2=720p 50Hz, 3=1080i 50Hz, 4=1080p 60Hz, 5=1080p 24Hz, 6=1080p 25Hz, 7=1080p 30Hz, 8=480p"

- id: set_analog_video_resolution
  label: Set Analog Video Output Resolution
  kind: action
  params:
    - name: res
      type: integer
      description: "0=PAL, 1=SECAM, 2=NTSC"

- id: define_alive_message
  label: Define Alive Message
  kind: action
  params:
    - name: msg
      type: string
      description: Message text with leading/trailing CR/LF

- id: set_alive_message_interval
  label: Set Alive Message Interval
  kind: action
  params:
    - name: interval
      type: integer
      description: "0=stop, 1..n=send interval in seconds"

- id: define_standby_message
  label: Define In-Standby Message
  kind: action
  params:
    - name: msg
      type: string
      description: Message text sent during IRD Standby

- id: set_standby_message
  label: Enable/Disable In-Standby Message
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disable, 1..n=send interval in seconds"

- id: define_power_fail_message
  label: Define Power Fail Message
  kind: action
  params:
    - name: msg
      type: string
      description: Message text sent during power supply failure

- id: set_power_fail_message
  label: Enable/Disable Power Fail Message
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disable, 1..n=send interval in seconds"

- id: set_epg_notifications
  label: Enable/Disable EPG Event Notifications
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=disable, 1=enable"

- id: set_tv_radio_notifications
  label: Enable/Disable TV/Radio Mode Change Notifications
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=disable, 1=enable"

- id: set_volume_notifications
  label: Enable/Disable Volume/Mute Notifications
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=disable, 1=enable"

- id: set_channel_notifications
  label: Enable/Disable Channel Change Notifications
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=disable, 1=enable"

- id: set_power_state_notifications
  label: Enable/Disable ON/OFF State Notifications
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=disable, 1=enable"

- id: show_osd_message
  label: Show OSD Message Box
  kind: action
  params:
    - name: msg
      type: string
      description: Message text (UTF8)

- id: show_osd_popup
  label: Show OSD Popup Hintbox
  kind: action
  params:
    - name: msg
      type: string
      description: Message text (UTF8)

- id: set_osd_message_x
  label: Set OSD Message Horizontal Position
  kind: action
  params:
    - name: pos
      type: integer
      description: "-1=center, 0..100=percent of screen width"

- id: set_osd_message_y
  label: Set OSD Message Vertical Position
  kind: action
  params:
    - name: pos
      type: integer
      description: "-1=center, 0..100=percent of screen height"

- id: set_audio_channel_single
  label: Set Audio Channel (Audio1)
  kind: action
  params:
    - name: channel
      type: integer
      description: "Audio channel 0..1001 (1000+ = Dolby AC3)"

- id: set_audio_channel_dual
  label: Set Audio Channels (Audio1/Audio2)
  kind: action
  params:
    - name: output
      type: integer
      description: "0=Audio1, 1=Audio2"
    - name: channel
      type: integer
      description: "Audio channel 0..1001 (1000+ = Dolby AC3)"

- id: lock_frontpanel_keys
  label: Lock/Unlock Front Panel Keys
  kind: action
  params:
    - name: lock
      type: integer
      description: "0=unlock, non-zero=lock"

- id: lock_ir_remote
  label: Lock/Unlock IR Remote Control
  kind: action
  params:
    - name: lock
      type: integer
      description: "0=unlock, non-zero=lock"

- id: remote_control_input
  label: Simulate Remote Control Input
  kind: action
  params:
    - name: code
      type: string
      description: Key code character

- id: recording_start
  label: Start Recording
  kind: action
  params: []

- id: recording_stop
  label: Stop Recording
  kind: action
  params: []

- id: recording_stop_delete
  label: Stop Recording and Delete File
  kind: action
  params: []

- id: timeshift_start
  label: Start Timeshifting
  kind: action
  params: []

- id: timeshift_stop
  label: Stop Timeshifting
  kind: action
  params: []

- id: movie_browser_on
  label: movieNET Movie Browser On
  kind: action
  params: []

- id: movie_browser_off
  label: movieNET Movie Browser Off
  kind: action
  params: []

- id: play_media
  label: Play Media File
  kind: action
  params:
    - name: path
      type: string
      description: Media file path or container;filename format

- id: add_to_playlist
  label: Add to Play Queue
  kind: action
  params:
    - name: path
      type: string
      description: Media file path

- id: clear_playlist
  label: Clear Play Queue
  kind: action
  params: []

- id: play_playlist_movie
  label: Play Movie Playlist
  kind: action
  params: []

- id: play_playlist_audio
  label: Play Audio Playlist
  kind: action
  params: []

- id: set_movie_loop
  label: Set Movie Playback Loop
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disabled, 1=current file, 2=play queue"

- id: set_audio_loop
  label: Set Audio Playback Loop
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disabled, 1=current file, 2=play queue"

- id: media_pause
  label: Pause Playback
  kind: action
  params: []

- id: media_play
  label: Play/Resume
  kind: action
  params: []

- id: media_stop
  label: Stop Playback
  kind: action
  params: []

- id: media_ff
  label: Fast Forward
  kind: action
  params:
    - name: minutes
      type: integer
      description: "Optional; 1, 5, or 10 minutes"

- id: media_rw
  label: Rewind
  kind: action
  params:
    - name: minutes
      type: integer
      description: "Optional; 1, 5, or 10 minutes"

- id: media_jump_start
  label: Jump to Start
  kind: action
  params: []

- id: media_jump_middle
  label: Jump to Middle
  kind: action
  params: []

- id: media_jump_end
  label: Jump to End / Next Track
  kind: action
  params: []

- id: media_timeline
  label: Show/Hide Timeline
  kind: action
  params: []

- id: media_timeline_order
  label: Change Timeline Order
  kind: action
  params: []

- id: set_subtitle_stream
  label: Set Subtitle Stream
  kind: action
  params:
    - name: stream
      type: integer
      description: "Subtitle number; 0=disable"

- id: picture_viewer_on
  label: pictureNET Image Viewer On
  kind: action
  params: []

- id: picture_viewer_off
  label: pictureNET Image Viewer Off
  kind: action
  params: []

- id: picture_nav
  label: pictureNET Navigation
  kind: action
  params:
    - name: action
      type: string
      description: "F/FF/FFF/B/BB/BBB/INF/MNU/PLAY/STOP/DELAY n"

- id: set_slideshow_delay
  label: Set Slideshow Delay
  kind: action
  params:
    - name: seconds
      type: integer
      description: Slideshow switching delay in seconds

- id: set_network_ip
  label: Set Network Fileserver IP
  kind: action
  params:
    - name: ip
      type: string
      description: Fileserver IP address

- id: set_network_dir
  label: Set Network Share Name
  kind: action
  params:
    - name: dir
      type: string
      description: Share name or NFS path

- id: set_network_user
  label: Set Fileserver User Name
  kind: action
  params:
    - name: user
      type: string
      description: Username string

- id: set_network_password
  label: Set Fileserver Password
  kind: action
  params:
    - name: pwd
      type: string
      description: Password string

- id: set_firmware_filename
  label: Set Firmware Update Filename
  kind: action
  params:
    - name: file
      type: string
      description: Firmware image filename (elium_ird_v*.img)

- id: firmware_update_cifs
  label: Firmware Update via CIFS
  kind: action
  params: []

- id: firmware_update_nfs
  label: Firmware Update via NFS
  kind: action
  params: []

- id: logo_sync_write_cifs
  label: Sync Logos to CIFS
  kind: action
  params: []

- id: logo_sync_write_nfs
  label: Sync Logos to NFS
  kind: action
  params: []

- id: logo_sync_read_cifs
  label: Sync Logos from CIFS
  kind: action
  params: []

- id: logo_sync_read_nfs
  label: Sync Logos from NFS
  kind: action
  params: []

- id: background_streaming_off
  label: Disable Background Streaming
  kind: action
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: string
      description: "+/-0..100, ON, OFF, or ? for current

- id: set_analog_brightness
  label: Set Analog Video Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: set_analog_contrast
  label: Set Analog Video Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: set_analog_saturation
  label: Set Analog Video Saturation
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: set_analog_sharpness
  label: Set Analog Video Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: set_analog_hue
  label: Set Analog Video Hue
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: set_digital_brightness
  label: Set Digital Video Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: set_digital_contrast
  label: Set Digital Video Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: set_digital_saturation
  label: Set Digital Video Saturation
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: set_digital_sharpness
  label: Set Digital Video Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "0..100"

- id: turn_to_tv_mode
  label: Turn to TV Mode
  kind: action
  params: []

- id: turn_to_radio_mode
  label: Turn to Radio Mode
  kind: action
  params: []

- id: change_tv_channel
  label: Change TV Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number

- id: change_radio_channel
  label: Change Radio Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number

- id: switch_tv_channel_up
  label: Switch TV Channel Up
  kind: action
  params: []

- id: switch_tv_channel_down
  label: Switch TV Channel Down
  kind: action
  params: []

- id: switch_tv_channel_by_name_exact
  label: Switch to TV Channel by Exact Name
  kind: action
  params:
    - name: name
      type: string
      description: Channel name

- id: switch_tv_channel_by_name_partial
  label: Switch to TV Channel by Partial Name
  kind: action
  params:
    - name: name
      type: string
      description: Partial channel name

- id: switch_radio_channel_up
  label: Switch Radio Channel Up
  kind: action
  params: []

- id: switch_radio_channel_down
  label: Switch Radio Channel Down
  kind: action
  params: []

- id: switch_radio_channel_by_name_exact
  label: Switch to Radio Channel by Exact Name
  kind: action
  params:
    - name: name
      type: string
      description: Channel name

- id: switch_radio_channel_by_name_partial
  label: Switch to Radio Channel by Partial Name
  kind: action
  params:
    - name: name
      type: string
      description: Partial channel name

- id: set_tv_channel_background
  label: Set TV Channel for Background Streaming
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number

- id: set_radio_channel_background
  label: Set Radio Channel for Background Streaming
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number

- id: set_ci_cam_routing
  label: Set CI CAM Transport Stream Routing
  kind: action
  params:
    - name: routing
      type: integer
      description: "0..3; 0=Tuner1-CAM1/Tuner2-CAM2, 1=Tuner1-CAM2/Tuner2-CAM1, 2=Tuner1-CAM1-CAM2, 3=Tuner2-CAM1-CAM2"

- id: hardware_reset
  label: Hardware Reset
  kind: action
  params: []
  description: Enclosed by CR; performed by watchdog processor
- id: GCS
  label: Get Current Status
  kind: query
  params: []

- id: GCM
  label: Get Current Mode
  kind: query
  params: []

- id: GNT
  label: Get Number of TV Channels
  kind: query
  params: []

- id: GNR
  label: Get Number of Radio Channels
  kind: query
  params: []

- id: GCC
  label: Get Current Channel Number
  kind: query
  params: []

- id: GCP
  label: Get Current Program Name
  kind: query
  params: []

- id: GCV
  label: Get Current Volume
  kind: query
  params: []

- id: GCT
  label: Get Current Time
  kind: query
  params: []

- id: GCL
  label: Get Channel List
  kind: query
  params: []

- id: GCLPT
  label: Get Part of TV Channel List
  kind: query
  params:
    - name: start
      type: integer
      description: Program number to start from
    - name: count
      type: integer
      description: Total number of programs to get

- id: GCLPR
  label: Get Part of Radio Channel List
  kind: query
  params:
    - name: start
      type: integer
      description: Program number to start from
    - name: count
      type: integer
      description: Total number of programs to get

- id: GCLEXT
  label: Get Extended Channel List
  kind: query
  params: []

- id: GRL
  label: Get PVR Records List
  kind: query
  params: []

- id: GML
  label: Get Movies List
  kind: query
  params: []

- id: GAL
  label: Get Audio Files List
  kind: query
  params: []

- id: GPL
  label: Get Pictures List
  kind: query
  params: []

- id: GIRL
  label: Get Internet Radio Stations List
  kind: query
  params: []

- id: GIRC
  label: Get Current Internet Radio Station
  kind: query
  params: []

- id: GST
  label: Get Teletext Status
  kind: query
  params: []

- id: GPT
  label: Get Current Teletext Page
  kind: query
  params: []

- id: GSQ
  label: Get Signal Quality and Power
  kind: query
  params: []

- id: GSCNR
  label: Get Signal CNR
  kind: query
  params: []

- id: GSRSSI
  label: Get Signal RSSI
  kind: query
  params: []

- id: GSBER
  label: Get Signal BER
  kind: query
  params: []

- id: GSFEC
  label: Get Signal FEC
  kind: query
  params: []

- id: GSPSK
  label: Get Signal Constellation
  kind: query
  params: []

- id: GSSTD
  label: Get Signal Modulation Standard
  kind: query
  params: []

- id: GTC
  label: Get CPU Cooler Temperature
  kind: query
  params: []

- id: GYAR
  label: Get Digital Video Output Resolution
  kind: query
  params: []

- id: GYARAN
  label: Get Analog Video Output Resolution
  kind: query
  params: []

- id: GPI
  label: Get Program Info
  kind: query
  params: []

- id: GTI
  label: Get Transponder Info
  kind: query
  params: []

- id: VER
  label: Get Firmware Version
  kind: query
  params: []

- id: IPC
  label: Get IP Configuration
  kind: query
  params: []

- id: GAC
  label: Get Audio Channels
  kind: query
  params: []

- id: EVT
  label: Get EPG Events for TV Channel
  kind: query
  params:
    - name: channel
      type: integer
      description: TV channel number

- id: EVR
  label: Get EPG Events for Radio Channel
  kind: query
  params:
    - name: channel
      type: integer
      description: Radio channel number

- id: EVDESC
  label: Get EPG Event Description
  kind: query
  params:
    - name: event_id
      type: string
      description: Event ID from EVT or EVR response

- id: GSU
  label: Get Available Subtitle Streams
  kind: query
  params: []

- id: SUBT
  label: Get Selected Subtitle Stream
  kind: query
  params: []

- id: GEXTMSGX
  label: Get OSD Message Horizontal Position
  kind: query
  params: []

- id: GEXTMSGY
  label: Get OSD Message Vertical Position
  kind: query
  params: []

- id: GPS
  label: Get Power Supply Status
  kind: query
  params: []

- id: INFBTM
  label: Get/Set OSD Infobar Timeout
  kind: action
  params:
    - name: value
      type: string
      description: "? to get current value; 0..10 to set timeout in seconds"

- id: get_recording_status
  label: Get Recording Status
  kind: query
  params: []

- id: STREAM_GET_PARAM
  label: Get IPTV Streaming Settings
  kind: query
  params: []

- id: STREAM_GET_STATE
  label: Get IPTV Streaming State
  kind: query
  params: []

- id: STREAM_GET_CHANNELS
  label: Get IPTV Stream Programs
  kind: query
  params: []

- id: mux_list
  label: Get Multiplex List
  kind: query
  params: []
  description: Get Multiplex (Transponder) List; each row sent after '#RET: '; ends with #END and #OK

- id: mux_gcl
  label: Get Channel List for Multiplex
  kind: query
  params:
    - name: s
      type: string
      description: Multiplex parameters string as returned by MUX LIST
  description: Get Channel List for the given Multiplex including numbering and SID

- id: mux_set
  label: Switch to Multiplex
  kind: action
  params:
    - name: s
      type: string
      description: Multiplex parameters string as returned by MUX LIST
  description: Switch to the given Multiplex (transponder); returns current program after change

- id: nfs_get_config
  label: Get NFS Network Drive Configuration
  kind: query
  params:
    - name: n
      type: integer
      description: Network Drive number (1..4)
  description: "Returns config string: <type>;<ip>;<share>;<automount>;<user>;<pwd>;<status>"

- id: nfs_set_config
  label: Set NFS Network Drive Configuration
  kind: action
  params:
    - name: n
      type: integer
      description: Network Drive number (1..4)
    - name: s
      type: string
      description: "Config string: <type>;<ip>;<share>;<automount>;<user>;<pwd>;<mount>"
  description: Set NFS Network Drive configuration; returns updated config string

- id: nfs_drive_control
  label: Get/Enable/Disable NFS Network Drive
  kind: action
  params:
    - name: c
      type: string
      description: "? = get status; ON = enable; OFF = disable"
    - name: n
      type: integer
      description: Network Drive number (1..4)
  description: Get status or enable/disable NFS Network Drive

- id: nfs_def_storage
  label: Get/Set NFS Default Storage
  kind: action
  params:
    - name: c
      type: string
      description: "? = get status; ON = enable NFS as PVR default; OFF = use HDD as PVR default"
  description: Get or set NFS-Storage as PVR default recording destination

- id: gnt_by_tuner
  label: Get Number of TV Channels by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GNT n>"

- id: gnr_by_tuner
  label: Get Number of Radio Channels by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GNR n>"

- id: gcc_foreground_background
  label: Get Current Channel by Foreground or Background
  kind: query
  params:
    - name: tuner_mode
      type: enum
      values: [FG, BG]
      description: "FG = Foreground (Viewing); BG = Background Streaming"
  description: "Source commands: <GCC FG>, <GCC BG>"

- id: gcp_foreground_background
  label: Get Current Program by Foreground or Background
  kind: query
  params:
    - name: tuner_mode
      type: enum
      values: [FG, BG]
      description: "FG = Foreground (Viewing); BG = Background Streaming"
  description: "Source commands: <GCP FG>, <GCP BG>"

- id: gclextpt
  label: Get Part of Extended TV Channel List
  kind: query
  params:
    - name: start
      type: integer
      description: n = the program number to start from
    - name: count
      type: integer
      description: m = the total number of programs to get from start
  description: "Source command: <GCLEXTPT n m>"

- id: gclextpr
  label: Get Part of Extended Radio Channel List
  kind: query
  params:
    - name: start
      type: integer
      description: n = the program number to start from
    - name: count
      type: integer
      description: m = the total number of programs to get from start
  description: "Source command: <GCLEXTPR n m>"

- id: gcl_by_tuner
  label: Get Channel List by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GCL n>"

- id: gsq_background
  label: Get Background Tuner Signal Quality and Power
  kind: query
  params: []
  description: "Source command: <GSQ BG>"

- id: gscnr_background
  label: Get Background Tuner Signal CNR
  kind: query
  params: []
  description: "Source command: <GSCNR BG>"

- id: gsrssi_background
  label: Get Background Tuner Signal RSSI
  kind: query
  params: []
  description: "Source command: <GSRSSI BG>"

- id: gsber_background
  label: Get Background Tuner Signal BER
  kind: query
  params: []
  description: "Source command: <GSBER BG>"

- id: gsfec_background
  label: Get Background Tuner Signal FEC
  kind: query
  params: []
  description: "Source command: <GSFEC BG>"

- id: gspsk_background
  label: Get Background Tuner Signal Constellation
  kind: query
  params: []
  description: "Source command: <GSPSK BG>"

- id: gsstd_background
  label: Get Background Tuner Signal Modulation
  kind: query
  params: []
  description: "Source command: <GSSTD BG>"

- id: gsq_by_tuner
  label: Get Signal Quality and Power by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GSQ n>"

- id: gscnr_by_tuner
  label: Get Signal CNR by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GSCNR n>"

- id: gsrssi_by_tuner
  label: Get Signal RSSI by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GSRSSI n>"

- id: gsber_by_tuner
  label: Get Signal BER by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GSBER n>"

- id: gsfec_by_tuner
  label: Get Signal FEC by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GSFEC n>"

- id: gspsk_by_tuner
  label: Get Signal Constellation by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GSPSK n>"

- id: gsstd_by_tuner
  label: Get Signal Modulation by Tuner
  kind: query
  params:
    - name: tuner
      type: integer
      description: "n = 1..2"
  description: "Source command: <GSSTD n>"
```

## Feedbacks
```yaml
- id: command_response
  type: enum
  values: [OK, ERROR]
  description: "#OK = command performed; #ERROR: error message"

- id: channel_change_response
  type: string
  description: "#RET: TV;number;name or Radio;number;name"

- id: power_state_feedback
  type: enum
  values: [On, Off]
  query_command: GCS

- id: mode_feedback
  type: enum
  values: [TV, Radio]
  query_command: GCM

- id: channel_count
  type: integer
  description: Number of TV or Radio channels
  query_command: [GNT, GNR]

- id: current_channel_number
  type: integer
  query_command: GCC

- id: current_program_name
  type: string
  query_command: GCP

- id: volume_level
  type: integer
  description: "0..100"
  query_command: GCV

- id: mute_state
  type: enum
  values: [On, Off, OFF]
  query_command: VOL

- id: teletext_state
  type: enum
  values: [On, Off]
  query_command: GST

- id: teletext_page
  type: integer
  description: Current page number or Off
  query_command: GPT

- id: signal_quality
  type: string
  description: "#RET: quality;power"
  query_command: GSQ

- id: signal_cnr
  type: string
  description: CNR in dB or N/A
  query_command: GSCNR

- id: signal_rssi
  type: string
  description: RSSI in dBm
  query_command: GSRSSI

- id: signal_ber
  type: string
  description: Bit error rate
  query_command: GSBER

- id: signal_fec
  type: string
  description: Code rate or N/A
  query_command: GSFEC

- id: signal_constellation
  type: string
  description: Modulation type (QPSK, 8PSK, etc.) or N/A
  query_command: GSPSK

- id: signal_modulation
  type: string
  description: DVB-C, DVB-S, DVB-S2, DVB-T
  query_command: GSSTD

- id: temperature
  type: integer
  description: Cooler sensor temperature in Celsius
  query_command: GTC

- id: channel_list
  type: string
  description: List of TV/Radio channels; ends with #END and #OK
  query_command: GCL

- id: extended_channel_list
  type: string
  description: "#RET: mode;number;name;SID;tuner"
  query_command: GCLEXT

- id: media_list
  type: string
  description: "#RET: PVR/MOVIE/MUSIC/PIC;container;filename"
  query_command: [GRL, GML, GAL, GPL]

- id: audio_channels
  type: string
  description: Available audio channel list
  query_command: GAC

- id: program_info
  type: string
  description: "#RET: mode;channel;name;event;duration;remaining"
  query_command: GPI

- id: transponder_info
  type: string
  description: "#RET: standard satellite frequency symbol_rate"
  query_command: GTI

- id: firmware_version
  type: string
  description: "#RET: version and S/N"
  query_command: VER

- id: ip_config
  type: string
  description: ETH1/ETH2 IP configuration; DHCP or static
  query_command: IPC

- id: subtitle_streams
  type: string
  description: Available subtitle streams
  query_command: GSU

- id: selected_subtitle
  type: string
  description: Selected subtitle or off
  query_command: SUBT

- id: osd_position
  type: integer
  description: OSD message position
  query_command: [GEXTMSGX, GEXTMSGY]

- id: power_supply_status
  type: enum
  values: [on, fail]
  query_command: GPS

- id: infobar_timeout
  type: integer
  description: OSD Infobar timeout value in seconds
  query_command: INFBTM

- id: recording_status
  type: string
  description: "#RET: on;container;filename or off"
  query_command: "REC ?"

- id: ip_streaming_params
  type: string
  description: "#RET: status;mode;url"
  query_command: "STREAM GET PARAM"

- id: ip_streaming_state
  type: enum
  values: [streaming, idle]
  query_command: "STREAM GET STATE"

- id: ip_streaming_channels
  type: string
  description: Current IPTV stream programs
  query_command: "STREAM GET CHANNELS"

- id: mux_list
  type: string
  description: Available multiplex/transponders
  query_command: "MUX LIST"

- id: nfs_config
  type: string
  description: NFS/CIFS network drive configuration
  query_command: "NFS GET CONFIG"

- id: nfs_status
  type: enum
  values: [on, off]
  query_command: "NFS c n"

- id: nfs_storage_status
  type: enum
  values: [ON, OFF]
  query_command: "NFS DEF STORAGE c"
```

## Variables
```yaml
# UNRESOLVED: video level parameters (brightness, contrast, saturation, sharpness, hue)
# are settable via action commands with immediate return; they could be Variables
# but source treats them as one-shot set commands. Marking as UNRESOLVED per policy
# since no explicit variable model stated.
```

## Events
```yaml
- id: system_ready
  type: string
  description: "#SYSTEM READY" sent after startup; do not send commands before this

- id: system_status_line
  type: string
  description: "#?/text/?# lines for boot/version info; ignore

- id: command_echo
  type: string
  description: "#COMMAND: <cmd>" echoed before execution

- id: epg_notification
  type: string
  description: "#EPG: current event title" when EPG notifications enabled

- id: tvr_notification
  type: string
  description: "#TVR: TV or #TVR: Radio" when TV/Radio notifications enabled

- id: vol_notification
  type: string
  description: "#VOL: On;100" with mute state and volume when volume notifications enabled

- id: chn_notification
  type: string
  description: "#CHN: TV;number;name or Radio;number;name" when channel notifications enabled

- id: pwr_notification
  type: string
  description: "#PWR: On or #PWR: Off" when power state notifications enabled
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Do not send commands during startup. Wait for "#SYSTEM READY" before sending any command. Sending data during boot can trigger firmware update mode.
    reference: "Section 5: startup procedure warning"
  - description: For background streaming commands (PRT BG n / PRR BG n), Tuner availability is checked; returns error if requested channel belongs to same Tuner already used for foreground.
    reference: "Background streaming dual-tuner restriction"
  - description: Power fail messaging (PFM/PFT) only for IRD devices with redundant power supply.
    reference: "Section 7: power fail message commands"
```

## Notes
IRD receiver with extensive media playback and recording capabilities. Command syntax: `<CMD>` for actions, `#COMMAND:` echoed before execution, `#OK` after completion, `#ERROR:` on failure. Query commands return `#RET:` followed by value(s) then `#OK`. Protocol document dated 04.02.2016 revision 2.38. Boot loader baud rate always 115200 regardless of application baud rate setting.
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: electrical specifications (voltage, current, power consumption) not stated -->
<!-- UNRESOLVED: specific product model variants / product family members not enumerated -->

## Provenance

```yaml
source_domains:
  - elium.de
source_urls:
  - https://elium.de/files/download/IRD_RS232_Protocol.pdf
retrieved_at: 2026-04-30T04:35:07.855Z
last_checked_at: 2026-10-07T13:16:25.424Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:16:25.424Z
matched_actions: 240
action_count: 240
confidence: medium
summary: "All 240 action units map to source commands and transport supported; only GTC L/GTC R unrepresented, coverage above 0.9. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "GTC L"
- "GTC R"
- "specific model variant names not stated in source"
- "video level parameters (brightness, contrast, saturation, sharpness, hue)"
- "no explicit multi-step macros described in source"
- "firmware version compatibility ranges not stated"
- "electrical specifications (voltage, current, power consumption) not stated"
- "specific product model variants / product family members not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
