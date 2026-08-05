---
spec_id: admin/elium-ird-2160
schema_version: ai4av-public-spec-v1
revision: 1
title: "Elium IRD 2160 Control Spec"
manufacturer: Elium
model_family: "IRD 2160"
aliases: []
compatible_with:
  manufacturers:
    - Elium
  models:
    - "IRD 2160"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - elium.de
source_urls:
  - https://elium.de/files/download/IRD_RS232_Protocol.pdf
retrieved_at: 2026-07-10T20:18:20.644Z
last_checked_at: 2026-07-12T08:59:04.004Z
generated_at: 2026-07-12T08:59:04.004Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Protocol document revision is 2.38 (dated 04.02.2016)."
  - "no multi-step command sequences described explicitly in source"
  - "firmware version compatibility range not stated in source"
  - "exact pinout of RS-232 connector (9-pin) not specified beyond RX/TX usage"
  - "whether RS-RC and NET-RC modes can operate simultaneously is not stated"
  - "TCP port is configurable on server side; default is 26 but configurable range not specified"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:59:04.004Z
  matched_actions: 154
  action_count: 154
  confidence: medium
  summary: "All 154 spec actions match verbatim command tokens in source; transport parameters fully verified; complete protocol coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Elium IRD 2160 Control Spec

## Summary
The Elium IRD 2160 is an Integrated Receiver Decoder (IRD) supporting DVB-S/S2, DVB-C, DVB-T reception. It can be controlled bidirectionally via RS-232 serial connection (RS-RC mode) or TCP network connection (NET-RC mode). Commands are sent as ASCII strings enclosed in angle brackets (`<COMMAND>`), with responses prefixed by `#`.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Protocol document revision is 2.38 (dated 04.02.2016). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 26
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from ON/OFF power commands
- queryable      # inferred from extensive query command set (GCS, GCM, GCC, etc.)
- levelable      # inferred from VOL, SBR, SCO, SSA, SSH, SHU, SBRD, SCOD, SSAD, SSHD commands
- routable       # inferred from PRT/PRR channel selection and CICAMTSROUTE routing
```

## Actions
```yaml
# ===== Section 7: Commands without additional return value =====

- id: power_on
  label: Power On
  kind: action
  command: "<ON>"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "<OFF>"
  params: []

- id: reboot
  label: Reboot Receiver
  kind: action
  command: "<REB>"
  params: []

- id: set_rs232_baud
  label: Set RS232 Baud Rate
  kind: action
  command: "<SSS {n}>"
  params:
    - name: n
      type: integer
      description: "Baud rate: 9600, 19200, 38400, or 115200"

- id: set_cooler_max_left
  label: Set Left Cooler Maximum Temperature
  kind: action
  command: "<CMX {n}>"
  params:
    - name: n
      type: integer
      description: "Temperature: 50, 55, 60, 65, 70, or 75"

- id: set_cooler_max_left_l
  label: Set Left Cooler Maximum Temperature (L variant)
  kind: action
  command: "<CMXL {n}>"
  params:
    - name: n
      type: integer
      description: "Temperature: 50, 55, 60, 65, 70, or 75"

- id: set_cooler_max_right
  label: Set Right Cooler Maximum Temperature
  kind: action
  command: "<CMXR {n}>"
  params:
    - name: n
      type: integer
      description: "Temperature: 50, 55, 60, 65, 70, or 75"

- id: set_cooler_min_left
  label: Set Left Cooler Minimum Temperature
  kind: action
  command: "<CMN {n}>"
  params:
    - name: n
      type: integer
      description: "Temperature: 20, 25, 30, 35, 40, or 45"

- id: set_cooler_min_left_l
  label: Set Left Cooler Minimum Temperature (L variant)
  kind: action
  command: "<CMNL {n}>"
  params:
    - name: n
      type: integer
      description: "Temperature: 20, 25, 30, 35, 40, or 45"

- id: set_cooler_min_right
  label: Set Right Cooler Minimum Temperature
  kind: action
  command: "<CMNR {n}>"
  params:
    - name: n
      type: integer
      description: "Temperature: 20, 25, 30, 35, 40, or 45"

- id: teletext_control
  label: Teletext Control
  kind: action
  command: "<TXT {param}>"
  params:
    - name: param
      type: string
      description: "1=on, 0=off, n=page number (100-999), R=Key RED, G=Key GREEN, Y=Key YELLOW, B=Key BLUE"

- id: epg_control
  label: EPG Control
  kind: action
  command: "<EPG {param}>"
  params:
    - name: param
      type: string
      description: "1=on, 0=off, R=move right, L=move left, U=move up, D=move down, I=get event information, E=leave event info"

- id: program_info_control
  label: Current Program Information Control
  kind: action
  command: "<CPI {param}>"
  params:
    - name: param
      type: string
      description: "1=on, 0=off, U=scroll up, D=scroll down"

- id: freeze_picture
  label: Freeze Current Picture
  kind: action
  command: "<FCP {param}>"
  params:
    - name: param
      type: string
      description: "1=on, 0=off"

- id: audio_multifeed_control
  label: Audio and Multifeed Option Control
  kind: action
  command: "<AVM {param}>"
  params:
    - name: param
      type: string
      description: "1=on, 0=off, U=move up, D=move down, L=move left, R=move right"

- id: return_last_channel
  label: Return to Last Channel
  kind: action
  command: "<RCL>"
  params: []

- id: menu
  label: Menu
  kind: action
  command: "<MNU>"
  params: []

- id: exit_menu
  label: Exit and Leave Menu
  kind: action
  command: "<EXT>"
  params: []

- id: confirm_option
  label: Confirm Selected Option
  kind: action
  command: "<CNF>"
  params: []

- id: start_mp3_player
  label: Start movieNET MP3 Audio Player
  kind: action
  command: "<MP3>"
  params: []

- id: start_internet_radio
  label: Start movieNET Internet Radio Player
  kind: action
  command: "<IRADIO>"
  params: []

- id: navigate
  label: Navigate
  kind: action
  command: "<NAV {direction}>"
  params:
    - name: direction
      type: string
      description: "U=up, D=down, L=left, R=right"

- id: info_osd
  label: Info OSD
  kind: action
  command: "<INF>"
  params: []

- id: program_list_osd
  label: Program List OSD
  kind: action
  command: "<TVL>"
  params: []

- id: page_navigation
  label: Page Navigation
  kind: action
  command: "<PAG {param}>"
  params:
    - name: param
      type: string
      description: "u=10 lines up, d=10 lines down, n=move cursor +-n lines"

- id: digit_input
  label: Digit Input
  kind: action
  command: "<DIG {n}>"
  params:
    - name: n
      type: integer
      description: "Digit 0-9"

- id: set_rgb_ypbpr_mode
  label: Set RGB/YPbPr Mode
  kind: action
  command: "<YAM {n}>"
  params:
    - name: n
      type: integer
      description: "0=RGB, 1=YPbPr"

- id: set_digital_video_resolution
  label: Set Digital Video Output Resolution
  kind: action
  command: "<YAR {n}>"
  params:
    - name: n
      type: integer
      description: "0=576p, 1=720p60, 2=720p50, 3=1080i50, 4=1080p60, 5=1080p24, 6=1080p25, 7=1080p30, 8=480p"

- id: set_analog_video_resolution
  label: Set Analog Video Output Resolution
  kind: action
  command: "<YARAN {n}>"
  params:
    - name: n
      type: integer
      description: "0=PAL, 1=SECAM, 2=NTSC"

- id: define_alive_message
  label: Define Alive Message
  kind: action
  command: "<ALM {msg}>"
  params:
    - name: msg
      type: string
      description: "Message text sent with leading and trailing CR/LF pair"

- id: control_alive_message
  label: Start/Stop Alive Message Sending
  kind: action
  command: "<ALT {n}>"
  params:
    - name: n
      type: integer
      description: "0=stop, 1..n=send every n seconds"

- id: define_standby_message
  label: Define In-Standby Message
  kind: action
  command: "<SBM {msg}>"
  params:
    - name: msg
      type: string
      description: "Message text sent during IRD Standby with leading and trailing CR/LF pair"

- id: control_standby_message
  label: Start/Stop In-Standby Message Sending
  kind: action
  command: "<SBT {n}>"
  params:
    - name: n
      type: integer
      description: "0=disable, 1..n=send every n seconds during Standby"

- id: define_power_fail_message
  label: Define Power-Fail Message
  kind: action
  command: "<PFM {msg}>"
  params:
    - name: msg
      type: string
      description: "Message text for power supply failure (only for IRD with redundant power supply)"

- id: control_power_fail_message
  label: Start/Stop Power-Fail Message Sending
  kind: action
  command: "<PFT {n}>"
  params:
    - name: n
      type: integer
      description: "0=disable, 1..n=send every n seconds during power failure (only for IRD with redundant power supply)"

- id: control_epg_notifications
  label: Enable/Disable EPG Event Notifications
  kind: action
  command: "<NPM {n}>"
  params:
    - name: n
      type: integer
      description: "0=disable, 1=enable"

- id: control_tv_radio_notifications
  label: Enable/Disable TV/Radio Mode Change Notifications
  kind: action
  command: "<TRM {n}>"
  params:
    - name: n
      type: integer
      description: "0=disable, 1=enable"

- id: control_volume_notifications
  label: Enable/Disable Volume/Mute State Change Notifications
  kind: action
  command: "<VLM {n}>"
  params:
    - name: n
      type: integer
      description: "0=disable, 1=enable"

- id: control_channel_notifications
  label: Enable/Disable Channel Change Notifications
  kind: action
  command: "<CPM {n}>"
  params:
    - name: n
      type: integer
      description: "0=disable, 1=enable"

- id: control_power_notifications
  label: Enable/Disable ON/OFF State Change Notifications
  kind: action
  command: "<PWM {n}>"
  params:
    - name: n
      type: integer
      description: "0=disable, 1=enable"

- id: show_osd_messagebox
  label: Show OSD Messagebox
  kind: action
  command: "<EXTMSG {msg}>"
  params:
    - name: msg
      type: string
      description: "Message text (UTF8)"

- id: show_osd_popup
  label: Show OSD Popup Hintbox
  kind: action
  command: "<EXTPOPUP {msg}>"
  params:
    - name: msg
      type: string
      description: "Message text (UTF8)"

- id: set_osd_msgbox_x
  label: Set OSD Messagebox Horizontal Position
  kind: action
  command: "<SEXTMSGX {n}>"
  params:
    - name: n
      type: integer
      description: "-1=center, 0-100=relative position in percent of screen width"

- id: set_osd_msgbox_y
  label: Set OSD Messagebox Vertical Position
  kind: action
  command: "<SEXTMSGY {n}>"
  params:
    - name: n
      type: integer
      description: "-1=center, 0-100=relative position in percent of screen height"

- id: set_audio_channel
  label: Set Audio Channels
  kind: action
  command: "<SAC {args}>"
  params:
    - name: args
      type: string
      description: "Single output: n (0=audio1, 1=audio2, 1000=AC3 ch1, 1001=AC3 ch2). Dual output: m n (m=0 Audio1 out, m=1 Audio2 out)"

- id: lock_keys
  label: Lock/Unlock Frontpanel Keys
  kind: action
  command: "<LCK {n}>"
  params:
    - name: n
      type: integer
      description: "0=unlock, non-zero=lock"

- id: lock_remote
  label: Lock/Unlock IR Remote Control
  kind: action
  command: "<LCI {n}>"
  params:
    - name: n
      type: integer
      description: "0=unlock, non-zero=lock"

- id: simulate_remote
  label: Simulate Remote Control Input
  kind: action
  command: "<RMC {c}>"
  params:
    - name: c
      type: string
      description: "Remote key code: 0-9=digits, i=OK, m=EXIT, b=MENU, u=UP, j=DOWN, k=RIGHT, h=LEFT, e=TXT, d=EPG, f=REC/STOP, g=INFO, x=Yellow, c=Red, v=RADIO/TV, n=LAST, t=ON/OFF, a=MUTE, J=PIP, K=FREEZE, L=ZOOM, M=AUDIO VIDEO, A=MODE, B=Green, C=Blue, D=rew back, E=PLAY/PAUSE, F=rew forward, G=go prev, H=go next, I=TIMER"

- id: record_control
  label: Recording Control
  kind: action
  command: "<REC {param}>"
  params:
    - name: param
      type: string
      description: "1=start recording, 0=stop recording, D=stop and delete record file"

- id: timeshift_control
  label: Timeshift Control
  kind: action
  command: "<TSHFT {param}>"
  params:
    - name: param
      type: string
      description: "1=start timeshifting, 0=stop timeshifting"

- id: movie_browser_toggle
  label: movieNET Movie Browser Toggle
  kind: action
  command: "<MPLAY {param}>"
  params:
    - name: param
      type: string
      description: "1=movie browser on, 0=movie browser off / stop player"

- id: play_media_file
  label: Play Media File
  kind: action
  command: "<MPLAY ={s}>"
  params:
    - name: s
      type: string
      description: "Media file path in format container;filename (HDD1-2, NFS1-4, INET) or GRL/GML/GAL/GPL return format"

- id: play_movie_queue
  label: Play Movie Queue
  kind: action
  command: "<MPLAY list>"
  params: []

- id: control_movie_loop
  label: Movie Player Loop Control
  kind: action
  command: "<MPLAY LOOP {n}>"
  params:
    - name: n
      type: integer
      description: "0=disabled, 1=loop current file, 2=loop play queue"

- id: add_to_playlist
  label: Add to Play Queue
  kind: action
  command: "<MPLAYLIST +={s}>"
  params:
    - name: s
      type: string
      description: "Media file path in format container;filename (HDD1-2, NFS1-4)"

- id: clear_playlist
  label: Clear Play Queue
  kind: action
  command: "<MPLAYLIST clear>"
  params: []

- id: play_audio_queue
  label: Play Audio Queue
  kind: action
  command: "<APLAY list>"
  params: []

- id: control_audio_loop
  label: Audio Player Loop Control
  kind: action
  command: "<APLAY LOOP {n}>"
  params:
    - name: n
      type: integer
      description: "0=disabled, 1=loop current file, 2=loop play queue"

- id: playback_pause
  label: Playback Pause
  kind: action
  command: "<MPPAUSE>"
  params: []

- id: playback_play
  label: Playback Play
  kind: action
  command: "<MPPLAY>"
  params: []

- id: playback_stop
  label: Playback Stop
  kind: action
  command: "<MPSTOP>"
  params: []

- id: playback_fast_forward
  label: Playback Fast Forward
  kind: action
  command: "<MPFF {n}>"
  params:
    - name: n
      type: string
      description: "Empty=jump 2% forward, or n minutes (1, 5, or 10 only)"

- id: playback_rewind
  label: Playback Rewind
  kind: action
  command: "<MPRW {n}>"
  params:
    - name: n
      type: string
      description: "Empty=jump 2% backward, or n minutes (1, 5, or 10 only)"

- id: playback_jump_start
  label: Playback Jump to Start
  kind: action
  command: "<MPSTA>"
  params: []

- id: playback_jump_middle
  label: Playback Jump to Middle
  kind: action
  command: "<MPMID>"
  params: []

- id: playback_jump_end
  label: Playback Jump to End
  kind: action
  command: "<MPEND>"
  params: []

- id: playback_timeline
  label: Show/Hide Playback Timeline
  kind: action
  command: "<MPTIME>"
  params: []

- id: playback_time_order
  label: Change Playback Timeline Time Order
  kind: action
  command: "<MPTMORD>"
  params: []

- id: set_subtitle
  label: Set Subtitle Stream
  kind: action
  command: "<SSU {n}>"
  params:
    - name: n
      type: integer
      description: "Subtitle stream number, 0=disable subtitling. Available streams from GSU command."

- id: picture_viewer_control
  label: pictureNET Image Viewer Control
  kind: action
  command: "<PICVIEW {param}>"
  params:
    - name: param
      type: string
      description: "1=on, 0=off, F=1 image fwd, FF=10 images fwd, FFF=last image, B=1 image back, BB=10 images back, BBB=first image, INF=show OSD infobar, MNU=config OSD menu, PLAY=start slideshow, STOP=stop slideshow, DELAY n=slideshow delay in seconds"

- id: set_fwupdate_ip
  label: Set Network Fileserver IP for Firmware Update
  kind: action
  command: "<SETUPDIP {ip}>"
  params:
    - name: ip
      type: string
      description: "Fileserver IP address in format xxx.xxx.xxx.xxx"

- id: set_fwupdate_dir
  label: Set Network Share Name for Firmware Update
  kind: action
  command: "<SETUPDDIR {dir}>"
  params:
    - name: dir
      type: string
      description: "Share name (CIFS) or shared path (NFS)"

- id: set_fwupdate_user
  label: Set Fileserver User Name for Firmware Update
  kind: action
  command: "<SETUPDUSER {usr}>"
  params:
    - name: usr
      type: string
      description: "User name string (must not be empty for CIFS; use 'guest' for Guest Access)"

- id: set_fwupdate_password
  label: Set Fileserver User Password for Firmware Update
  kind: action
  command: "<SETUPDPSWD {pwsd}>"
  params:
    - name: pwsd
      type: string
      description: "User password string"

- id: set_fwupdate_file
  label: Set Firmware Update Image Filename
  kind: action
  command: "<SETUPDFILE {file}>"
  params:
    - name: file
      type: string
      description: "Firmware image filename (elium_ird_v*.img) without full path"

- id: start_fwupdate
  label: Start Network Firmware Update
  kind: action
  command: "<FWUPDATE {method}>"
  params:
    - name: method
      type: string
      description: "CIFS=Windows share, NFS=Linux share"

- id: sync_logos_write
  label: Synchronize Channel Logos Write (IRD to Share)
  kind: action
  command: "<LOGOSYNCWR {method}>"
  params:
    - name: method
      type: string
      description: "CIFS=Windows share, NFS=Linux share"

- id: sync_logos_read
  label: Synchronize Channel Logos Read (Share to IRD)
  kind: action
  command: "<LOGOSYNCRD {method}>"
  params:
    - name: method
      type: string
      description: "CIFS=Windows share, NFS=Linux share"

- id: disable_bg_streaming
  label: Disable Background Streaming
  kind: action
  command: "<SET BG OFF>"
  params: []

# ===== Section 8: Commands with return value =====

- id: switch_to_tv
  label: Switch to TV Mode
  kind: action
  command: "<TTT>"
  params: []

- id: switch_to_radio
  label: Switch to Radio Mode
  kind: action
  command: "<TTR>"
  params: []

- id: change_tv_channel
  label: Change TV Channel
  kind: action
  command: "<PRT {param}>"
  params:
    - name: param
      type: string
      description: "n=channel number, u=up, d=down, =pn=exact name match, *pn=partial name match"

- id: change_radio_channel
  label: Change Radio Channel
  kind: action
  command: "<PRR {param}>"
  params:
    - name: param
      type: string
      description: "n=channel number, u=up, d=down, =pn=exact name match, *pn=partial name match"

- id: set_bg_tv_channel
  label: Set TV Channel for Background Streaming
  kind: action
  command: "<PRT BG {n}>"
  params:
    - name: n
      type: integer
      description: "Channel number (Dual Tuner IRD only)"

- id: set_bg_radio_channel
  label: Set Radio Channel for Background Streaming
  kind: action
  command: "<PRR BG {n}>"
  params:
    - name: n
      type: integer
      description: "Channel number (Dual Tuner IRD only)"

- id: cicam_ts_route
  label: Get/Set CI CAM Transport Stream Routing
  kind: action
  command: "<CICAMTSROUTE {n}>"
  params:
    - name: n
      type: string
      description: "?=get current routing, 0=Tuner1-CAM1/Tuner2-CAM2, 1=Tuner1-CAM2/Tuner2-CAM1, 2=Tuner1-CAM1-CAM2, 3=Tuner2-CAM1-CAM2 (Dual Tuner IRD only)"

- id: get_current_status
  label: Get Current Status
  kind: query
  command: "<GCS>"
  params: []

- id: get_current_mode
  label: Get Current Mode
  kind: query
  command: "<GCM>"
  params: []

- id: get_tv_channel_count
  label: Get Number of TV Channels
  kind: query
  command: "<GNT {n}>"
  params:
    - name: n
      type: string
      description: "Empty=all channels, 1-2=by tuner (Dual Tuner IRD only)"

- id: get_radio_channel_count
  label: Get Number of Radio Channels
  kind: query
  command: "<GNR {n}>"
  params:
    - name: n
      type: string
      description: "Empty=all channels, 1-2=by tuner (Dual Tuner IRD only)"

- id: get_current_channel
  label: Get Current Channel Number
  kind: query
  command: "<GCC {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current, FG=foreground, BG=background (Dual Tuner IRD only)"

- id: get_current_program
  label: Get Current Program Name
  kind: query
  command: "<GCP {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current, FG=foreground, BG=background (Dual Tuner IRD only)"

- id: get_current_volume
  label: Get Current Volume
  kind: query
  command: "<GCV>"
  params: []

- id: get_current_time
  label: Get Current Time
  kind: query
  command: "<GCT>"
  params: []

- id: get_channel_list
  label: Get Channel List
  kind: query
  command: "<GCL {n}>"
  params:
    - name: n
      type: string
      description: "Empty=all channels, 1-2=by tuner (Dual Tuner IRD only)"

- id: get_tv_channel_list_part
  label: Get Part of TV Channels List
  kind: query
  command: "<GCLPT {n} {m}>"
  params:
    - name: n
      type: integer
      description: "Starting program number"
    - name: m
      type: integer
      description: "Number of programs to retrieve"

- id: get_radio_channel_list_part
  label: Get Part of Radio Channels List
  kind: query
  command: "<GCLPR {n} {m}>"
  params:
    - name: n
      type: integer
      description: "Starting program number"
    - name: m
      type: integer
      description: "Number of programs to retrieve"

- id: get_extended_channel_list
  label: Get Extended Channel List
  kind: query
  command: "<GCLEXT>"
  params: []

- id: get_extended_tv_list_part
  label: Get Part of Extended TV Channels List
  kind: query
  command: "<GCLEXTPT {n} {m}>"
  params:
    - name: n
      type: integer
      description: "Starting program number"
    - name: m
      type: integer
      description: "Number of programs to retrieve"

- id: get_extended_radio_list_part
  label: Get Part of Extended Radio Channels List
  kind: query
  command: "<GCLEXTPR {n} {m}>"
  params:
    - name: n
      type: integer
      description: "Starting program number"
    - name: m
      type: integer
      description: "Number of programs to retrieve"

- id: get_pvr_records_list
  label: Get movieNET PVR Records List
  kind: query
  command: "<GRL>"
  params: []

- id: get_movies_list
  label: Get movieNET Movies List
  kind: query
  command: "<GML>"
  params: []

- id: get_audio_list
  label: Get movieNET MP3 Audio Files List
  kind: query
  command: "<GAL>"
  params: []

- id: get_pictures_list
  label: Get movieNET JPEG Pictures List
  kind: query
  command: "<GPL>"
  params: []

- id: get_internet_radio_list
  label: Get Internet Radio Stations List
  kind: query
  command: "<GIRL>"
  params: []

- id: get_current_internet_radio
  label: Get Current Internet Radio Station
  kind: query
  command: "<GIRC>"
  params: []

- id: get_teletext_status
  label: Get Teletext Status
  kind: query
  command: "<GST>"
  params: []

- id: get_teletext_page
  label: Get Current Teletext Page
  kind: query
  command: "<GPT>"
  params: []

- id: get_signal_quality
  label: Get Signal Quality and Power
  kind: query
  command: "<GSQ {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current tuner, BG=background tuner (Dual Tuner only), 1-2=by tuner (Dual Tuner only)"

- id: get_signal_cnr
  label: Get Signal Carrier-to-Noise Ratio (dB)
  kind: query
  command: "<GSCNR {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current tuner, BG=background tuner (Dual Tuner only), 1-2=by tuner (Dual Tuner only)"

- id: get_signal_rssi
  label: Get Signal RSSI (dBm)
  kind: query
  command: "<GSRSSI {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current tuner, BG=background tuner (Dual Tuner only), 1-2=by tuner (Dual Tuner only)"

- id: get_signal_ber
  label: Get Signal Bit Error Rate (BER)
  kind: query
  command: "<GSBER {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current tuner, BG=background tuner (Dual Tuner only), 1-2=by tuner (Dual Tuner only)"

- id: get_signal_fec
  label: Get DVB-S/S2 FEC (Code Rate)
  kind: query
  command: "<GSFEC {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current tuner, BG=background tuner (Dual Tuner only), 1-2=by tuner (Dual Tuner only)"

- id: get_signal_constellation
  label: Get DVB-S/S2 Constellation
  kind: query
  command: "<GSPSK {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current tuner, BG=background tuner (Dual Tuner only), 1-2=by tuner (Dual Tuner only)"

- id: get_signal_modulation
  label: Get Signal Modulation
  kind: query
  command: "<GSSTD {scope}>"
  params:
    - name: scope
      type: string
      description: "Empty=current tuner, BG=background tuner (Dual Tuner only), 1-2=by tuner (Dual Tuner only)"

- id: get_temperature
  label: Get Temperature from Cooler Sensors
  kind: query
  command: "<GTC {sensor}>"
  params:
    - name: sensor
      type: string
      description: "Empty or C=CPU cooler, L=left board cooler, R=right cooler"

- id: set_volume
  label: Set/Change Volume
  kind: action
  command: "<VOL {n}>"
  params:
    - name: n
      type: string
      description: "[+/-][0-100]=set/adjust absolute/relative volume, ON=mute on, OFF=mute off, ?=query current volume"

- id: set_analog_brightness
  label: Set Analog Video Brightness
  kind: action
  command: "<SBR {n}>"
  params:
    - name: n
      type: integer
      description: "Brightness 0-100"

- id: set_analog_contrast
  label: Set Analog Video Contrast
  kind: action
  command: "<SCO {n}>"
  params:
    - name: n
      type: integer
      description: "Contrast 0-100"

- id: set_analog_saturation
  label: Set Analog Video Saturation
  kind: action
  command: "<SSA {n}>"
  params:
    - name: n
      type: integer
      description: "Saturation 0-100"

- id: set_analog_sharpness
  label: Set Analog Video Sharpness
  kind: action
  command: "<SSH {n}>"
  params:
    - name: n
      type: integer
      description: "Sharpness 0-100"

- id: set_analog_hue
  label: Set Analog Video Hue
  kind: action
  command: "<SHU {n}>"
  params:
    - name: n
      type: integer
      description: "Hue 0-100"

- id: set_digital_brightness
  label: Set Digital Video Brightness
  kind: action
  command: "<SBRD {n}>"
  params:
    - name: n
      type: integer
      description: "Brightness 0-100"

- id: set_digital_contrast
  label: Set Digital Video Contrast
  kind: action
  command: "<SCOD {n}>"
  params:
    - name: n
      type: integer
      description: "Contrast 0-100"

- id: set_digital_saturation
  label: Set Digital Video Saturation
  kind: action
  command: "<SSAD {n}>"
  params:
    - name: n
      type: integer
      description: "Saturation 0-100"

- id: set_digital_sharpness
  label: Set Digital Video Sharpness
  kind: action
  command: "<SSHD {n}>"
  params:
    - name: n
      type: integer
      description: "Sharpness 0-100"

- id: get_digital_resolution
  label: Get Digital Video Output Resolution
  kind: query
  command: "<GYAR>"
  params: []

- id: get_analog_resolution
  label: Get Analog Video Output Resolution
  kind: query
  command: "<GYARAN>"
  params: []

- id: get_program_info
  label: Get Program Info
  kind: query
  command: "<GPI>"
  params: []

- id: get_transponder_info
  label: Get Current Multiplex (Transponder) Info
  kind: query
  command: "<GTI>"
  params: []

- id: get_version
  label: Get Device Firmware Version and Serial Number
  kind: query
  command: "<VER>"
  params: []

- id: get_ip_config
  label: Get IP Configuration
  kind: query
  command: "<IPC>"
  params: []

- id: get_audio_channels
  label: Get Available Audio Channels
  kind: query
  command: "<GAC>"
  params: []

- id: get_tv_epg
  label: Get EPG Events for TV Channel
  kind: query
  command: "<EVT {n}>"
  params:
    - name: n
      type: integer
      description: "TV channel number"

- id: get_radio_epg
  label: Get EPG Events for Radio Channel
  kind: query
  command: "<EVR {n}>"
  params:
    - name: n
      type: integer
      description: "Radio channel number"

- id: get_epg_description
  label: Get EPG Event Description
  kind: query
  command: "<EVDESC {n}>"
  params:
    - name: n
      type: string
      description: "Event ID from EVT or EVR command response"

- id: get_subtitles_available
  label: Get Available Subtitle Streams
  kind: query
  command: "<GSU>"
  params: []

- id: get_subtitle_selected
  label: Get Selected Subtitle Stream
  kind: query
  command: "<SUBT>"
  params: []

- id: get_osd_msgbox_x
  label: Get OSD Messagebox Horizontal Position
  kind: query
  command: "<GEXTMSGX {n}>"
  params:
    - name: n
      type: string
      description: "Query parameter (refer to SEXTMSGX command)"

- id: get_osd_msgbox_y
  label: Get OSD Messagebox Vertical Position
  kind: query
  command: "<GEXTMSGY {n}>"
  params:
    - name: n
      type: string
      description: "Query parameter (refer to SEXTMSGY command)"

- id: get_power_supply_status
  label: Get Power Supply Status
  kind: query
  command: "<GPS>"
  params: []

- id: get_set_infobar_timeout
  label: Get/Set OSD Infobar Timeout
  kind: action
  command: "<INFBTM {n}>"
  params:
    - name: n
      type: string
      description: "?=get current timeout, 0-10=set timeout in seconds"

- id: get_recording_status
  label: Get Current Recording Status
  kind: query
  command: "<REC ?>"
  params: []

- id: get_streaming_params
  label: Get IPTV Streaming Settings
  kind: query
  command: "<STREAM GET PARAM>"
  params: []

- id: get_streaming_state
  label: Get IPTV Streaming State
  kind: query
  command: "<STREAM GET STATE>"
  params: []

- id: get_streaming_channels
  label: Get IPTV Stream Programs
  kind: query
  command: "<STREAM GET CHANNELS>"
  params: []

- id: get_mux_list
  label: Get Multiplex (Transponder) List
  kind: query
  command: "<MUX LIST>"
  params: []

- id: get_mux_channels
  label: Get Channel List for Multiplex
  kind: query
  command: "<MUX GCL {s}>"
  params:
    - name: s
      type: string
      description: "Multiplex parameters string from MUX LIST command"

- id: set_mux
  label: Switch to Multiplex (Transponder)
  kind: action
  command: "<MUX SET {s}>"
  params:
    - name: s
      type: string
      description: "Multiplex parameters string from MUX LIST command"

- id: get_nfs_config
  label: Get NFS Network Drive Configuration
  kind: query
  command: "<NFS GET CONFIG {n}>"
  params:
    - name: n
      type: integer
      description: "Network Drive number 1-4"

- id: set_nfs_config
  label: Set NFS Network Drive Configuration
  kind: action
  command: "<NFS SET CONFIG {n};{s}>"
  params:
    - name: n
      type: integer
      description: "Network Drive number 1-4"
    - name: s
      type: string
      description: "Config string: type;ip;share;automount;user;pwd;mount"

- id: nfs_drive_status
  label: Get/Set NFS Network Drive Status
  kind: action
  command: "<NFS {c} {n}>"
  params:
    - name: c
      type: string
      description: "?=get status, ON=enable, OFF=disable"
    - name: n
      type: integer
      description: "Network Drive number 1-4"

- id: nfs_storage_status
  label: Get/Set NFS-Storage as PVR Default
  kind: action
  command: "<NFS DEF STORAGE {c}>"
  params:
    - name: c
      type: string
      description: "?=get status, ON=NFS-Storage PVR default, OFF=HDD-Storage PVR default"

# ===== Section 9: Special Commands =====

- id: hardware_reset
  label: Hardware Reset
  kind: action
  command: "<CR>"
  params: []
```

## Feedbacks
```yaml
# Command acknowledgment responses
- id: command_received
  type: string
  description: "#COMMAND: <CMD> - indicates the command string was received by the Receiver"

- id: command_ok
  type: string
  description: "#OK - command was performed successfully"

- id: command_error
  type: string
  description: "#ERROR: <message> - command not supported or failed"

- id: command_return_value
  type: string
  description: "#RET: <value> - return value for query commands"

- id: transmission_end
  type: string
  description: "#END - end of multi-line transmission (e.g. channel lists, EPG data)"

# Query response states
- id: power_state
  type: enum
  values: [On, Off]
  description: "From GCS query: #RET: On or #RET: Off"

- id: mode_state
  type: enum
  values: [TV, Radio]
  description: "From GCM query"

- id: teletext_status
  type: enum
  values: [On, Off]
  description: "From GST query"

- id: power_supply_status
  type: enum
  values: [on, fail]
  description: "From GPS query (redundant power supply devices only)"

- id: streaming_state
  type: enum
  values: [streaming, idle]
  description: "From STREAM GET STATE query"
```

## Variables
```yaml
- id: volume
  type: integer
  range: [0, 100]
  description: "Current volume level, set via VOL command"

- id: mute_state
  type: enum
  values: [On, Off]
  description: "Mute state, controlled via VOL ON/OFF"

- id: osd_msgbox_x
  type: integer
  range: [-1, 100]
  description: "OSD messagebox horizontal position (-1=center), set via SEXTMSGX"

- id: osd_msgbox_y
  type: integer
  range: [-1, 100]
  description: "OSD messagebox vertical position (-1=center), set via SEXTMSGY"

- id: infobar_timeout
  type: integer
  range: [0, 10]
  description: "OSD Infobar timeout in seconds, set via INFBTM"

- id: analog_brightness
  type: integer
  range: [0, 100]
  description: "Analog video brightness, set via SBR"

- id: analog_contrast
  type: integer
  range: [0, 100]
  description: "Analog video contrast, set via SCO"

- id: analog_saturation
  type: integer
  range: [0, 100]
  description: "Analog video saturation, set via SSA"

- id: analog_sharpness
  type: integer
  range: [0, 100]
  description: "Analog video sharpness, set via SSH"

- id: analog_hue
  type: integer
  range: [0, 100]
  description: "Analog video hue, set via SHU"

- id: digital_brightness
  type: integer
  range: [0, 100]
  description: "Digital video brightness, set via SBRD"

- id: digital_contrast
  type: integer
  range: [0, 100]
  description: "Digital video contrast, set via SCOD"

- id: digital_saturation
  type: integer
  range: [0, 100]
  description: "Digital video saturation, set via SSAD"

- id: digital_sharpness
  type: integer
  range: [0, 100]
  description: "Digital video sharpness, set via SSHD"
```

## Events
```yaml
# Unsolicited notifications sent by the device

- id: system_ready
  description: "#SYSTEM READY - sent when the unit has finished starting up; safe to send commands after this"
  trigger: "Power-on startup complete"

- id: boot_info
  description: "#?/text/?# - boot/application version info lines; should NOT be taken into account as command responses"
  trigger: "During boot procedure and certain moments"

- id: epg_event_notification
  description: "#EPG: <program title> - sent after current program change when enabled via NPM"
  trigger: "Program change (requires NPM 1)"

- id: tv_radio_mode_notification
  description: "#TVR: TV or #TVR: Radio - sent after TV/Radio mode change when enabled via TRM"
  trigger: "Mode change (requires TRM 1)"

- id: volume_mute_notification
  description: "#VOL: <On|Off>;<volume> - sent after volume/mute change when enabled via VLM"
  trigger: "Volume or mute state change (requires VLM 1)"

- id: channel_change_notification
  description: "#CHN: <TV|Radio>;<channel_number>;<channel_title> - sent after channel change when enabled via CPM"
  trigger: "Channel change (requires CPM 1)"

- id: power_state_notification
  description: "#PWR: On or #PWR: Off - sent after ON/OFF (Standby) state change when enabled via PWM"
  trigger: "Power state change (requires PWM 1)"

- id: alive_message
  description: "Alive message text (defined by ALM) sent with leading/trailing CR/LF pair at interval set by ALT"
  trigger: "Periodic (when ALT n > 0)"

- id: standby_message
  description: "In-standby message text (defined by SBM) sent during IRD Standby at interval set by SBT"
  trigger: "During Standby (when SBT n > 0)"

- id: power_fail_message
  description: "Power-fail message text (defined by PFM) sent during power supply failure at interval set by PFT"
  trigger: "Power supply failure (when PFT n > 0, requires redundant power supply)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for:
  - hardware_reset        # <CR> causes immediate hardware-level reset via watchdog processor
  - reboot                # <REB> reboots the receiver
  - fwupdate              # <FWUPDATE CIFS/NFS> starts firmware update
interlocks:
  - description: "After switching on via Power Switch, do NOT send any commands during startup procedure. Sending data during startup can trigger Firmware update procedure. Wait until '#SYSTEM READY' is received before sending commands."
  - description: "For commands with return values (TTT, TTR, PRT, PRR, PRT BG, PRR BG, CICAMTSROUTE), no other commands should be sent until the answer (#RET: ... #OK) is received."
  - description: "Hardware-Reset command <CR> must be enclosed by carriage return characters. It is interpreted by the watchdog processor and causes an immediate reset on hardware level."
```

## Notes
- Protocol document revision 2.38, dated 04.02.2016.
- Commands are ASCII strings enclosed in angle brackets: `<COMMAND>`. Each command starts with `<` and ends with `>`. The command is performed immediately after `>` is received.
- Response protocol: the first character sent back from the Receiver is always `#`. The next letter indicates result: `#C` (command echo), `#E` (error), or `#O` (OK).
- Unknown commands return: `#COMMAND: <ABC>` followed by `#ERROR: Command not supported`.
- Successful commands return: `#COMMAND: <ON>` followed by `#OK`.
- For RS-RC mode, only two of nine RS-232 pins are used (RX and TX).
- Boot Loader always uses 115200 baud; only the application uses the baud rate set via SSS.
- Certain commands are marked "Only for Dual Tuner IRD devices" — these apply only to dual-tuner hardware variants.
- Remote simulation via `<RMC c>` uses single-character codes for each remote key (see params description).
- Media file paths for MPLAY/MPLAYLIST use format `<container>;<filename>` where container is HDD1-2, NFS1-4, or INET.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: exact pinout of RS-232 connector (9-pin) not specified beyond RX/TX usage -->
<!-- UNRESOLVED: whether RS-RC and NET-RC modes can operate simultaneously is not stated -->
<!-- UNRESOLVED: TCP port is configurable on server side; default is 26 but configurable range not specified -->

## Provenance

```yaml
source_domains:
  - elium.de
source_urls:
  - https://elium.de/files/download/IRD_RS232_Protocol.pdf
retrieved_at: 2026-07-10T20:18:20.644Z
last_checked_at: 2026-07-12T08:59:04.004Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:59:04.004Z
matched_actions: 154
action_count: 154
confidence: medium
summary: "All 154 spec actions match verbatim command tokens in source; transport parameters fully verified; complete protocol coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Protocol document revision is 2.38 (dated 04.02.2016)."
- "no multi-step command sequences described explicitly in source"
- "firmware version compatibility range not stated in source"
- "exact pinout of RS-232 connector (9-pin) not specified beyond RX/TX usage"
- "whether RS-RC and NET-RC modes can operate simultaneously is not stated"
- "TCP port is configurable on server side; default is 26 but configurable range not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
