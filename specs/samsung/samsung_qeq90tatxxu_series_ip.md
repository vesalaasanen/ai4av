---
spec_id: admin/samsung-qeq90tatxxu-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung QEQ90TATXXU Series Control Spec"
manufacturer: Samsung
model_family: "QEQ90TATXXU Series"
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - "QEQ90TATXXU Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
source_urls:
  - https://github.com/kdschlosser/samsungctl
  - https://github.com/jaruba/ha-samsungtv-tizen/blob/master/Key_codes.md
retrieved_at: 2026-08-30T16:39:18.370Z
last_checked_at: 2026-08-30T22:17:16.916Z
generated_at: 2026-08-30T22:17:16.916Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a community tool README, not Samsung protocol documentation; wire-level message framing (JSON payload structure, handshake bytes) not included in source"
  - "which of ports 8001/8002 applies to this exact model not disambiguated in source"
  - "token format and pairing PIN semantics not specified beyond usage notes"
  - "raw protocol response/acknowledgement strings not in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures found in source"
  - "wire-level message format (JSON payload structure, handshake, encoding) not in source"
  - "authentication token format and PIN entry message exchange not in source"
  - "response strings / acknowledgement payloads for key commands not in source"
verification:
  verdict: verified
  checked_at: 2026-08-30T22:17:16.916Z
  matched_actions: 256
  action_count: 256
  confidence: medium
  summary: "Every one of the 256 spec actions maps to a verbatim KEY_* token or samsungctl CLI option listed in the source's key-code and parameter tables; transport values (port 8001, token auth) appear verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - community_report
license: ODbL-1.0
created_at: 2026-08-30
---

# Samsung QEQ90TATXXU Series Control Spec

## Summary
Network control spec for Samsung QEQ90TATXXU Series TVs over TCP/IP, derived from the samsungctl community library documentation. Control is primarily via remote-control key codes (KEY_* mnemonics) sent over a TCP, websocket, or SSL-websocket connection, plus CLI-level set/query operations for volume, mute, brightness, contrast, sharpness, source, and app launch.

<!-- UNRESOLVED: source is a community tool README, not Samsung protocol documentation; wire-level message framing (JSON payload structure, handshake bytes) not included in source -->
<!-- UNRESOLVED: which of ports 8001/8002 applies to this exact model not disambiguated in source -->
<!-- UNRESOLVED: token format and pairing PIN semantics not specified beyond usage notes -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  # Stated in source: 55000 (<2014 models), 8080 (2014 & 2015), 8001 & 8002 (>=2016).
  # QEQ90TATXXU is a >=2016-era model; source lists both 8001 and 8002 without
  # distinguishing which applies. Auto-detection available when port is left None.
  port: 8001  # 8002 also valid for >=2016 TVs per source
auth:
  # Stated in source: on-TV acceptance prompt (30s window) on first connection;
  # 2014/2015 (H/J) models display a PIN on the TV that must be entered on the
  # controller; a token is used by 2014-2015 TVs and some 2016+ TVs.
  type: token  # token value/format not specified in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from KEY_POWER / KEY_POWERON / KEY_POWEROFF commands
  - routable  # inferred from KEY_SOURCE / KEY_HDMI1-4 / KEY_AV1-3 / KEY_TV etc.
  - queryable  # inferred from --volume -1 / --mute state print queries
  - levelable  # inferred from volume/brightness/contrast/sharpness set commands (0-100)
```

## Actions
```yaml
# NOTE: Key-code actions are verbatim KEY_* mnemonics from the samsungctl key
# code tables. Entries whose label equals the raw key name (e.g. AUTO_ARC_*,
# EXT*, panel keys) have a blank description column in the source.
# CLI-option actions (set_volume, select_source, ...) are samsungctl command
# line operations, not raw wire payloads.

# --- Power ---
- id: power_toggle
  label: PowerToggle
  kind: action
  command: "KEY_POWER"
  params: []
- id: power_on
  label: PowerOn
  kind: action
  command: "KEY_POWERON"
  params: []
- id: power_off
  label: PowerOFF
  kind: action
  command: "KEY_POWEROFF"
  params: []

# --- Input ---
- id: source
  label: Source
  kind: action
  command: "KEY_SOURCE"
  params: []
- id: component1
  label: Component1
  kind: action
  command: "KEY_COMPONENT1"
  params: []
- id: component2
  label: Component2
  kind: action
  command: "KEY_COMPONENT2"
  params: []
- id: av1
  label: AV1
  kind: action
  command: "KEY_AV1"
  params: []
- id: av2
  label: AV2
  kind: action
  command: "KEY_AV2"
  params: []
- id: av3
  label: AV3
  kind: action
  command: "KEY_AV3"
  params: []
- id: svideo1
  label: SVideo1
  kind: action
  command: "KEY_SVIDEO1"
  params: []
- id: svideo2
  label: SVideo2
  kind: action
  command: "KEY_SVIDEO2"
  params: []
- id: svideo3
  label: SVideo3
  kind: action
  command: "KEY_SVIDEO3"
  params: []
- id: hdmi
  label: HDMI
  kind: action
  command: "KEY_HDMI"
  params: []
- id: hdmi1
  label: HDMI1
  kind: action
  command: "KEY_HDMI1"
  params: []
- id: hdmi2
  label: HDMI2
  kind: action
  command: "KEY_HDMI2"
  params: []
- id: hdmi3
  label: HDMI3
  kind: action
  command: "KEY_HDMI3"
  params: []
- id: hdmi4
  label: HDMI4
  kind: action
  command: "KEY_HDMI4"
  params: []
- id: fm_radio
  label: FMRadio
  kind: action
  command: "KEY_FM_RADIO"
  params: []
- id: dvi
  label: DVI
  kind: action
  command: "KEY_DVI"
  params: []
- id: dvr
  label: DVR
  kind: action
  command: "KEY_DVR"
  params: []
- id: tv
  label: TV
  kind: action
  command: "KEY_TV"
  params: []
- id: antenna_analog_tv
  label: AnalogTV
  kind: action
  command: "KEY_ANTENA"
  params: []
- id: dtv
  label: DigitalTV
  kind: action
  command: "KEY_DTV"
  params: []

# --- Number keys ---
- id: key_1
  label: Key1
  kind: action
  command: "KEY_1"
  params: []
- id: key_2
  label: Key2
  kind: action
  command: "KEY_2"
  params: []
- id: key_3
  label: Key3
  kind: action
  command: "KEY_3"
  params: []
- id: key_4
  label: Key4
  kind: action
  command: "KEY_4"
  params: []
- id: key_5
  label: Key5
  kind: action
  command: "KEY_5"
  params: []
- id: key_6
  label: Key6
  kind: action
  command: "KEY_6"
  params: []
- id: key_7
  label: Key7
  kind: action
  command: "KEY_7"
  params: []
- id: key_8
  label: Key8
  kind: action
  command: "KEY_8"
  params: []
- id: key_9
  label: Key9
  kind: action
  command: "KEY_9"
  params: []
- id: key_0
  label: Key0
  kind: action
  command: "KEY_0"
  params: []
- id: key_11
  label: Key11
  kind: action
  command: "KEY_11"
  params: []
- id: key_12
  label: Key12
  kind: action
  command: "KEY_12"
  params: []
- id: plus100
  label: Plus100
  kind: action
  command: "KEY_PLUS100"
  params: []

# --- Misc ---
- id: anynet
  label: AnyNet+
  kind: action
  command: "KEY_ANYNET"
  params: []
- id: energy_saving
  label: EnergySaving
  kind: action
  command: "KEY_ESAVING"
  params: []
- id: sleep_timer
  label: SleepTimer
  kind: action
  command: "KEY_SLEEP"
  params: []
- id: dtv_signal
  label: DTVSignal
  kind: action
  command: "KEY_DTV_SIGNAL"
  params: []

# --- Channel ---
- id: channel_up
  label: ChannelUp
  kind: action
  command: "KEY_CHUP"
  params: []
- id: channel_down
  label: ChannelDown
  kind: action
  command: "KEY_CHDOWN"
  params: []
- id: previous_channel
  label: PreviousChannel
  kind: action
  command: "KEY_PRECH"
  params: []
- id: favorite_channels
  label: FavoriteChannels
  kind: action
  command: "KEY_FAVCH"
  params: []
- id: channel_list
  label: ChannelList
  kind: action
  command: "KEY_CH_LIST"
  params: []
- id: auto_program
  label: AutoProgram
  kind: action
  command: "KEY_AUTO_PROGRAM"
  params: []
- id: magic_channel
  label: MagicChannel
  kind: action
  command: "KEY_MAGIC_CHANNEL"
  params: []

# --- Volume ---
- id: volume_up
  label: VolumeUp
  kind: action
  command: "KEY_VOLUP"
  params: []
- id: volume_down
  label: VolumeDown
  kind: action
  command: "KEY_VOLDOWN"
  params: []
- id: mute
  label: Mute
  kind: action
  command: "KEY_MUTE"
  params: []

# --- Direction ---
- id: nav_up
  label: NavigationUp
  kind: action
  command: "KEY_UP"
  params: []
- id: nav_down
  label: NavigationDown
  kind: action
  command: "KEY_DOWN"
  params: []
- id: nav_left
  label: NavigationLeft
  kind: action
  command: "KEY_LEFT"
  params: []
- id: nav_right
  label: NavigationRight
  kind: action
  command: "KEY_RIGHT"
  params: []
- id: nav_return
  label: NavigationReturn/Back
  kind: action
  command: "KEY_RETURN"
  params: []
- id: nav_enter
  label: NavigationEnter
  kind: action
  command: "KEY_ENTER"
  params: []

# --- Media ---
- id: rewind
  label: Rewind
  kind: action
  command: "KEY_REWIND"
  params: []
- id: stop
  label: Stop
  kind: action
  command: "KEY_STOP"
  params: []
- id: play
  label: Play
  kind: action
  command: "KEY_PLAY"
  params: []
- id: fast_forward
  label: FastForward
  kind: action
  command: "KEY_FF"
  params: []
- id: record
  label: Record
  kind: action
  command: "KEY_REC"
  params: []
- id: pause
  label: Pause
  kind: action
  command: "KEY_PAUSE"
  params: []
- id: live
  label: Live
  kind: action
  command: "KEY_LIVE"
  params: []
- id: quick_replay
  label: fnKEY_QUICK_REPLAY
  kind: action
  command: "KEY_QUICK_REPLAY"
  params: []
- id: still_picture
  label: fnKEY_STILL_PICTURE
  kind: action
  command: "KEY_STILL_PICTURE"
  params: []
- id: instant_replay
  label: fnKEY_INSTANT_REPLAY
  kind: action
  command: "KEY_INSTANT_REPLAY"
  params: []

# --- Picture in Picture ---
- id: pip_onoff
  label: PIPOn/Off
  kind: action
  command: "KEY_PIP_ONOFF"
  params: []
- id: pip_swap
  label: PIPSwap
  kind: action
  command: "KEY_PIP_SWAP"
  params: []
- id: pip_size
  label: PIPSize
  kind: action
  command: "KEY_PIP_SIZE"
  params: []
- id: pip_channel_up
  label: PIPChannelUp
  kind: action
  command: "KEY_PIP_CHUP"
  params: []
- id: pip_channel_down
  label: PIPChannelDown
  kind: action
  command: "KEY_PIP_CHDOWN"
  params: []
- id: pip_small
  label: PIPSmall
  kind: action
  command: "KEY_AUTO_ARC_PIP_SMALL"
  params: []
- id: pip_wide
  label: PIPWide
  kind: action
  command: "KEY_AUTO_ARC_PIP_WIDE"
  params: []
- id: pip_bottom_right
  label: PIPBottomRight
  kind: action
  command: "KEY_AUTO_ARC_PIP_RIGHT_BOTTOM"
  params: []
- id: pip_source_change
  label: PIPSourceChange
  kind: action
  command: "KEY_AUTO_ARC_PIP_SOURCE_CHANGE"
  params: []
- id: pip_scan
  label: PIPScan
  kind: action
  command: "KEY_PIP_SCAN"
  params: []

# --- Modes ---
- id: vcr_mode
  label: VCRMode
  kind: action
  command: "KEY_VCR_MODE"
  params: []
- id: catv_mode
  label: CATVMode
  kind: action
  command: "KEY_CATV_MODE"
  params: []
- id: dss_mode
  label: DSSMode
  kind: action
  command: "KEY_DSS_MODE"
  params: []
- id: tv_mode
  label: TVMode
  kind: action
  command: "KEY_TV_MODE"
  params: []
- id: dvd_mode
  label: DVDMode
  kind: action
  command: "KEY_DVD_MODE"
  params: []
- id: stb_mode
  label: STBMode
  kind: action
  command: "KEY_STB_MODE"
  params: []
- id: pc_mode
  label: PCMode
  kind: action
  command: "KEY_PCMODE"
  params: []

# --- Color keys ---
- id: green
  label: Green
  kind: action
  command: "KEY_GREEN"
  params: []
- id: yellow
  label: Yellow
  kind: action
  command: "KEY_YELLOW"
  params: []
- id: cyan
  label: Cyan
  kind: action
  command: "KEY_CYAN"
  params: []
- id: red
  label: Red
  kind: action
  command: "KEY_RED"
  params: []

# --- Teletext ---
- id: teletext_mix
  label: TeletextMix
  kind: action
  command: "KEY_TTX_MIX"
  params: []
- id: teletext_subface
  label: TeletextSubface
  kind: action
  command: "KEY_TTX_SUBFACE"
  params: []

# --- Aspect ratio ---
- id: aspect_ratio
  label: AspectRatio
  kind: action
  command: "KEY_ASPECT"
  params: []
- id: picture_size
  label: PictureSize
  kind: action
  command: "KEY_PICTURE_SIZE"
  params: []
- id: aspect_4_3
  label: AspectRatio4:3
  kind: action
  command: "KEY_4_3"
  params: []
- id: aspect_16_9
  label: AspectRatio16:9
  kind: action
  command: "KEY_16_9"
  params: []
- id: aspect_3_4_alt
  label: AspectRatio3:4(Alt)
  kind: action
  command: "KEY_EXT14"
  params: []
- id: aspect_16_9_alt
  label: AspectRatio16:9(Alt)
  kind: action
  command: "KEY_EXT15"
  params: []

# --- Picture mode ---
- id: picture_mode
  label: PictureMode
  kind: action
  command: "KEY_PMODE"
  params: []
- id: picture_mode_panorama
  label: PictureModePanorama
  kind: action
  command: "KEY_PANORAMA"
  params: []
- id: picture_mode_dynamic
  label: PictureModeDynamic
  kind: action
  command: "KEY_DYNAMIC"
  params: []
- id: picture_mode_standard
  label: PictureModeStandard
  kind: action
  command: "KEY_STANDARD"
  params: []
- id: picture_mode_movie
  label: PictureModeMovie
  kind: action
  command: "KEY_MOVIE1"
  params: []
- id: picture_mode_game
  label: PictureModeGame
  kind: action
  command: "KEY_GAME"
  params: []
- id: picture_mode_custom
  label: PictureModeCustom
  kind: action
  command: "KEY_CUSTOM"
  params: []
- id: picture_mode_movie_alt
  label: PictureModeMovie(Alt)
  kind: action
  command: "KEY_EXT9"
  params: []
- id: picture_mode_standard_alt
  label: PictureModeStandard(Alt)
  kind: action
  command: "KEY_EXT10"
  params: []

# --- Menus ---
- id: menu
  label: Menu
  kind: action
  command: "KEY_MENU"
  params: []
- id: top_menu
  label: TopMenu
  kind: action
  command: "KEY_TOPMENU"
  params: []
- id: tools
  label: Tools
  kind: action
  command: "KEY_TOOLS"
  params: []
- id: home
  label: Home
  kind: action
  command: "KEY_HOME"
  params: []
- id: contents
  label: Contents
  kind: action
  command: "KEY_CONTENTS"
  params: []
- id: guide
  label: Guide
  kind: action
  command: "KEY_GUIDE"
  params: []
- id: disc_menu
  label: DiscMenu
  kind: action
  command: "KEY_DISC_MENU"
  params: []
- id: dvr_menu
  label: DVRMenu
  kind: action
  command: "KEY_DVR_MENU"
  params: []
- id: help
  label: Help
  kind: action
  command: "KEY_HELP"
  params: []

# --- OSD ---
- id: info
  label: Info
  kind: action
  command: "KEY_INFO"
  params: []
- id: caption
  label: Caption
  kind: action
  command: "KEY_CAPTION"
  params: []
- id: clock_display
  label: ClockDisplay
  kind: action
  command: "KEY_CLOCK_DISPLAY"
  params: []
- id: setup_clock
  label: SetupClock
  kind: action
  command: "KEY_SETUP_CLOCK_TIMER"
  params: []
- id: subtitle
  label: Subtitle
  kind: action
  command: "KEY_SUB_TITLE"
  params: []

# --- Zoom ---
- id: zoom_move
  label: ZoomMove
  kind: action
  command: "KEY_ZOOM_MOVE"
  params: []
- id: zoom_in
  label: ZoomIn
  kind: action
  command: "KEY_ZOOM_IN"
  params: []
- id: zoom_out
  label: ZoomOut
  kind: action
  command: "KEY_ZOOM_OUT"
  params: []
- id: zoom1
  label: Zoom1
  kind: action
  command: "KEY_ZOOM1"
  params: []
- id: zoom2
  label: Zoom2
  kind: action
  command: "KEY_ZOOM2"
  params: []

# --- Other keys (descriptions from source where present) ---
- id: wheel_left
  label: WheelLeft
  kind: action
  command: "KEY_WHEEL_LEFT"
  params: []
- id: wheel_right
  label: WheelRight
  kind: action
  command: "KEY_WHEEL_RIGHT"
  params: []
- id: adddel
  label: Add/Del
  kind: action
  command: "KEY_ADDDEL"
  params: []
- id: ad
  label: AD
  kind: action
  command: "KEY_AD"
  params: []
- id: link
  label: Link
  kind: action
  command: "KEY_LINK"
  params: []
- id: turbo
  label: Turbo
  kind: action
  command: "KEY_TURBO"
  params: []
- id: convergence
  label: Convergence
  kind: action
  command: "KEY_CONVERGENCE"
  params: []
- id: device_connect
  label: DeviceConnect
  kind: action
  command: "KEY_DEVICE_CONNECT"
  params: []
- id: factory
  label: KeyFactory
  kind: action
  command: "KEY_FACTORY"
  params: []
- id: three_speed
  label: Key3SPEED
  kind: action
  command: "KEY_3SPEED"
  params: []
- id: rsurf
  label: KeyRSURF
  kind: action
  command: "KEY_RSURF"
  params: []
- id: ff_
  label: FF_
  kind: action
  command: "KEY_FF_"
  params: []
- id: rewind_
  label: REWIND_
  kind: action
  command: "KEY_REWIND_"
  params: []
- id: angle
  label: Angle
  kind: action
  command: "KEY_ANGLE"
  params: []
- id: reserved1
  label: Reserved1
  kind: action
  command: "KEY_RESERVED1"
  params: []
- id: program
  label: Program
  kind: action
  command: "KEY_PROGRAM"
  params: []
- id: bookmark
  label: Bookmark
  kind: action
  command: "KEY_BOOKMARK"
  params: []
- id: print
  label: Print
  kind: action
  command: "KEY_PRINT"
  params: []
- id: clear
  label: Clear
  kind: action
  command: "KEY_CLEAR"
  params: []
- id: vchip
  label: VChip
  kind: action
  command: "KEY_VCHIP"
  params: []
- id: repeat
  label: Repeat
  kind: action
  command: "KEY_REPEAT"
  params: []
- id: door
  label: Door
  kind: action
  command: "KEY_DOOR"
  params: []
- id: open
  label: Open
  kind: action
  command: "KEY_OPEN"
  params: []
- id: dma
  label: DMA
  kind: action
  command: "KEY_DMA"
  params: []
- id: mts
  label: MTS
  kind: action
  command: "KEY_MTS"
  params: []
- id: dnie
  label: DNIe
  kind: action
  command: "KEY_DNIe"
  params: []
- id: srs
  label: SRS
  kind: action
  command: "KEY_SRS"
  params: []
- id: convert_audio_mainsub
  label: ConvertAudioMain/Sub
  kind: action
  command: "KEY_CONVERT_AUDIO_MAINSUB"
  params: []
- id: mdc
  label: MDC
  kind: action
  command: "KEY_MDC"
  params: []
- id: sound_effect
  label: SoundEffect
  kind: action
  command: "KEY_SEFFECT"
  params: []
- id: perpect_focus
  label: PERPECTFocus
  kind: action
  command: "KEY_PERPECT_FOCUS"
  params: []
- id: caller_id
  label: CallerID
  kind: action
  command: "KEY_CALLER_ID"
  params: []
- id: scale
  label: Scale
  kind: action
  command: "KEY_SCALE"
  params: []
- id: magic_bright
  label: MagicBright
  kind: action
  command: "KEY_MAGIC_BRIGHT"
  params: []
- id: w_link
  label: WLink
  kind: action
  command: "KEY_W_LINK"
  params: []
- id: dtv_link
  label: DTVLink
  kind: action
  command: "KEY_DTV_LINK"
  params: []
- id: app_list
  label: ApplicationList
  kind: action
  command: "KEY_APP_LIST"
  params: []
- id: back_mhp
  label: BackMHP
  kind: action
  command: "KEY_BACK_MHP"
  params: []
- id: alt_mhp
  label: AlternateMHP
  kind: action
  command: "KEY_ALT_MHP"
  params: []
- id: dnse
  label: DNSe
  kind: action
  command: "KEY_DNSe"
  params: []
- id: rss
  label: RSS
  kind: action
  command: "KEY_RSS"
  params: []
- id: entertainment
  label: Entertainment
  kind: action
  command: "KEY_ENTERTAINMENT"
  params: []
- id: id_input
  label: IDInput
  kind: action
  command: "KEY_ID_INPUT"
  params: []
- id: id_setup
  label: IDSetup
  kind: action
  command: "KEY_ID_SETUP"
  params: []
- id: anyview
  label: AnyView
  kind: action
  command: "KEY_ANYVIEW"
  params: []
- id: ms
  label: MS
  kind: action
  command: "KEY_MS"
  params: []
- id: more
  label: MORE
  kind: action
  command: "KEY_MORE"
  params: []  # description blank in source
- id: mic
  label: MIC
  kind: action
  command: "KEY_MIC"
  params: []  # description blank in source
- id: nine_seperate
  label: NINE_SEPERATE
  kind: action
  command: "KEY_NINE_SEPERATE"
  params: []  # description blank in source
- id: auto_format
  label: AutoFormat
  kind: action
  command: "KEY_AUTO_FORMAT"
  params: []
- id: dnet
  label: DNET
  kind: action
  command: "KEY_DNET"
  params: []

# --- Auto Arc keys (all descriptions blank in source) ---
- id: auto_arc_c_force_aging
  label: AUTO_ARC_C_FORCE_AGING
  kind: action
  command: "KEY_AUTO_ARC_C_FORCE_AGING"
  params: []
- id: auto_arc_caption_eng
  label: AUTO_ARC_CAPTION_ENG
  kind: action
  command: "KEY_AUTO_ARC_CAPTION_ENG"
  params: []
- id: auto_arc_usbjack_inspect
  label: AUTO_ARC_USBJACK_INSPECT
  kind: action
  command: "KEY_AUTO_ARC_USBJACK_INSPECT"
  params: []
- id: auto_arc_reset
  label: AUTO_ARC_RESET
  kind: action
  command: "KEY_AUTO_ARC_RESET"
  params: []
- id: auto_arc_lna_on
  label: AUTO_ARC_LNA_ON
  kind: action
  command: "KEY_AUTO_ARC_LNA_ON"
  params: []
- id: auto_arc_lna_off
  label: AUTO_ARC_LNA_OFF
  kind: action
  command: "KEY_AUTO_ARC_LNA_OFF"
  params: []
- id: auto_arc_anynet_mode_ok
  label: AUTO_ARC_ANYNET_MODE_OK
  kind: action
  command: "KEY_AUTO_ARC_ANYNET_MODE_OK"
  params: []
- id: auto_arc_anynet_auto_start
  label: AUTO_ARC_ANYNET_AUTO_START
  kind: action
  command: "KEY_AUTO_ARC_ANYNET_AUTO_START"
  params: []
- id: auto_arc_caption_on
  label: AUTO_ARC_CAPTION_ON
  kind: action
  command: "KEY_AUTO_ARC_CAPTION_ON"
  params: []
- id: auto_arc_caption_off
  label: AUTO_ARC_CAPTION_OFF
  kind: action
  command: "KEY_AUTO_ARC_CAPTION_OFF"
  params: []
- id: auto_arc_pip_double
  label: AUTO_ARC_PIP_DOUBLE
  kind: action
  command: "KEY_AUTO_ARC_PIP_DOUBLE"
  params: []
- id: auto_arc_pip_large
  label: AUTO_ARC_PIP_LARGE
  kind: action
  command: "KEY_AUTO_ARC_PIP_LARGE"
  params: []
- id: auto_arc_pip_left_top
  label: AUTO_ARC_PIP_LEFT_TOP
  kind: action
  command: "KEY_AUTO_ARC_PIP_LEFT_TOP"
  params: []
- id: auto_arc_pip_right_top
  label: AUTO_ARC_PIP_RIGHT_TOP
  kind: action
  command: "KEY_AUTO_ARC_PIP_RIGHT_TOP"
  params: []
- id: auto_arc_pip_left_bottom
  label: AUTO_ARC_PIP_LEFT_BOTTOM
  kind: action
  command: "KEY_AUTO_ARC_PIP_LEFT_BOTTOM"
  params: []
- id: auto_arc_pip_ch_change
  label: AUTO_ARC_PIP_CH_CHANGE
  kind: action
  command: "KEY_AUTO_ARC_PIP_CH_CHANGE"
  params: []
- id: auto_arc_autocolor_success
  label: AUTO_ARC_AUTOCOLOR_SUCCESS
  kind: action
  command: "KEY_AUTO_ARC_AUTOCOLOR_SUCCESS"
  params: []
- id: auto_arc_autocolor_fail
  label: AUTO_ARC_AUTOCOLOR_FAIL
  kind: action
  command: "KEY_AUTO_ARC_AUTOCOLOR_FAIL"
  params: []
- id: auto_arc_jack_ident
  label: AUTO_ARC_JACK_IDENT
  kind: action
  command: "KEY_AUTO_ARC_JACK_IDENT"
  params: []
- id: auto_arc_caption_kor
  label: AUTO_ARC_CAPTION_KOR
  kind: action
  command: "KEY_AUTO_ARC_CAPTION_KOR"
  params: []
- id: auto_arc_antenna_air
  label: AUTO_ARC_ANTENNA_AIR
  kind: action
  command: "KEY_AUTO_ARC_ANTENNA_AIR"
  params: []
- id: auto_arc_antenna_cable
  label: AUTO_ARC_ANTENNA_CABLE
  kind: action
  command: "KEY_AUTO_ARC_ANTENNA_CABLE"
  params: []
- id: auto_arc_antenna_satellite
  label: AUTO_ARC_ANTENNA_SATELLITE
  kind: action
  command: "KEY_AUTO_ARC_ANTENNA_SATELLITE"
  params: []

# --- Panel keys (descriptions blank in source) ---
- id: pannel_chdown_3d
  label: 3D  # listed under Misc Keys as "3D"; also appears under Panel Keys with blank description
  kind: action
  command: "KEY_PANNEL_CHDOWN"
  params: []
- id: pannel_power
  label: PANNEL_POWER
  kind: action
  command: "KEY_PANNEL_POWER"
  params: []
- id: pannel_chup
  label: PANNEL_CHUP
  kind: action
  command: "KEY_PANNEL_CHUP"
  params: []
- id: pannel_volup
  label: PANNEL_VOLUP
  kind: action
  command: "KEY_PANNEL_VOLUP"
  params: []
- id: pannel_voldown
  label: PANNEL_VOLDOW
  kind: action
  command: "KEY_PANNEL_VOLDOW"
  params: []
- id: pannel_enter
  label: PANNEL_ENTER
  kind: action
  command: "KEY_PANNEL_ENTER"
  params: []
- id: pannel_menu
  label: PANNEL_MENU
  kind: action
  command: "KEY_PANNEL_MENU"
  params: []
- id: pannel_source
  label: PANNEL_SOURCE
  kind: action
  command: "KEY_PANNEL_SOURCE"
  params: []

# --- Extended keys (descriptions blank in source) ---
- id: ext1
  label: EXT1
  kind: action
  command: "KEY_EXT1"
  params: []
- id: ext2
  label: EXT2
  kind: action
  command: "KEY_EXT2"
  params: []
- id: ext3
  label: EXT3
  kind: action
  command: "KEY_EXT3"
  params: []
- id: ext4
  label: EXT4
  kind: action
  command: "KEY_EXT4"
  params: []
- id: ext5
  label: EXT5
  kind: action
  command: "KEY_EXT5"
  params: []
- id: ext6
  label: EXT6
  kind: action
  command: "KEY_EXT6"
  params: []
- id: ext7
  label: EXT7
  kind: action
  command: "KEY_EXT7"
  params: []
- id: ext8
  label: EXT8
  kind: action
  command: "KEY_EXT8"
  params: []
- id: ext11
  label: EXT11
  kind: action
  command: "KEY_EXT11"
  params: []
- id: ext12
  label: EXT12
  kind: action
  command: "KEY_EXT12"
  params: []
- id: ext13
  label: EXT13
  kind: action
  command: "KEY_EXT13"
  params: []
- id: ext16
  label: EXT16
  kind: action
  command: "KEY_EXT16"
  params: []
- id: ext17
  label: EXT17
  kind: action
  command: "KEY_EXT17"
  params: []
- id: ext18
  label: EXT18
  kind: action
  command: "KEY_EXT18"
  params: []
- id: ext19
  label: EXT19
  kind: action
  command: "KEY_EXT19"
  params: []
- id: ext20
  label: EXT20
  kind: action
  command: "KEY_EXT20"
  params: []
- id: ext21
  label: EXT21
  kind: action
  command: "KEY_EXT21"
  params: []
- id: ext22
  label: EXT22
  kind: action
  command: "KEY_EXT22"
  params: []
- id: ext23
  label: EXT23
  kind: action
  command: "KEY_EXT23"
  params: []
- id: ext24
  label: EXT24
  kind: action
  command: "KEY_EXT24"
  params: []
- id: ext25
  label: EXT25
  kind: action
  command: "KEY_EXT25"
  params: []
- id: ext26
  label: EXT26
  kind: action
  command: "KEY_EXT26"
  params: []
- id: ext27
  label: EXT27
  kind: action
  command: "KEY_EXT27"
  params: []
- id: ext28
  label: EXT28
  kind: action
  command: "KEY_EXT28"
  params: []
- id: ext29
  label: EXT29
  kind: action
  command: "KEY_EXT29"
  params: []
- id: ext30
  label: EXT30
  kind: action
  command: "KEY_EXT30"
  params: []
- id: ext31
  label: EXT31
  kind: action
  command: "KEY_EXT31"
  params: []
- id: ext32
  label: EXT32
  kind: action
  command: "KEY_EXT32"
  params: []
- id: ext33
  label: EXT33
  kind: action
  command: "KEY_EXT33"
  params: []
- id: ext34
  label: EXT34
  kind: action
  command: "KEY_EXT34"
  params: []
- id: ext35
  label: EXT35
  kind: action
  command: "KEY_EXT35"
  params: []
- id: ext36
  label: EXT36
  kind: action
  command: "KEY_EXT36"
  params: []
- id: ext37
  label: EXT37
  kind: action
  command: "KEY_EXT37"
  params: []
- id: ext38
  label: EXT38
  kind: action
  command: "KEY_EXT38"
  params: []
- id: ext39
  label: EXT39
  kind: action
  command: "KEY_EXT39"
  params: []
- id: ext40
  label: EXT40
  kind: action
  command: "KEY_EXT40"
  params: []
- id: ext41
  label: EXT41
  kind: action
  command: "KEY_EXT41"
  params: []

# --- samsungctl CLI operations (documented CLI options, not raw wire payloads) ---
- id: set_volume
  label: Set Volume
  kind: action
  command: "--volume {level}"
  params:
    - name: level
      type: integer
      description: Volume level, allowed values 0-100
- id: volume_query
  label: Volume Query
  kind: query
  command: "--volume -1"
  params: []
- id: set_mute
  label: Set Mute
  kind: action
  command: "--mute {state}"
  params:
    - name: state
      type: enum
      description: "on or off"
- id: mute_query
  label: Mute State Query
  kind: query
  command: "--mute state"
  params: []
- id: set_brightness
  label: Set Brightness
  kind: action
  command: "--brightness {level}"
  params:
    - name: level
      type: integer
      description: Brightness level, allowed values 0-100
- id: brightness_query
  label: Brightness Query
  kind: query
  command: "--brightness -1"
  params: []
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "--contrast {level}"
  params:
    - name: level
      type: integer
      description: Contrast level, allowed values 0-100
- id: contrast_query
  label: Contrast Query
  kind: query
  command: "--contrast -1"
  params: []
- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "--sharpness {level}"
  params:
    - name: level
      type: integer
      description: Sharpness level, allowed values 0-100
- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "--sharpness -1"
  params: []
- id: set_source
  label: Set Source
  kind: action
  command: "--source {source}"
  params:
    - name: source
      type: string
      description: TV-defined source name (HDMI1, HDMI2, PC, USB...) or the programmed OSD label
- id: set_source_label
  label: Set Source Label
  kind: action
  command: "--source-label {label}"
  params:
    - name: label
      type: string
      description: Source label that appears on the OSD
- id: start_app
  label: Start Application
  kind: action
  command: "--start-app {app}"
  params:
    - name: app
      type: string
      description: Application name or ID
- id: set_app_metadata
  label: Set App Metadata
  kind: action
  command: "--app-metadata {metadata}"
  params:
    - name: metadata
      type: string
      description: String of information the application can use when it starts up
```

## Feedbacks
```yaml
# Query responses documented via samsungctl CLI print operations.
# Wire-level response strings NOT documented in source.
- id: volume
  type: integer
  values: null  # range 0-100 per CLI docs; response format not stated in source
- id: mute_state
  type: enum
  values: [on, off]
- id: brightness
  type: integer
  values: null  # range 0-100 per CLI docs; response format not stated in source
- id: contrast
  type: integer
  values: null  # range 0-100 per CLI docs; response format not stated in source
- id: sharpness
  type: integer
  values: null  # range 0-100 per CLI docs; response format not stated in source
# UNRESOLVED: raw protocol response/acknowledgement strings not in source
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  max: 100
  description: Volume level (--volume)
- id: mute
  type: enum
  values: [on, off]
  description: Mute state (--mute)
- id: brightness
  type: integer
  min: 0
  max: 100
  description: Brightness (--brightness)
- id: contrast
  type: integer
  min: 0
  max: 100
  description: Contrast (--contrast)
- id: sharpness
  type: integer
  min: 0
  max: 100
  description: Sharpness (--sharpness)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Source is the samsungctl community library README, not Samsung official protocol documentation. Protocol references cited in source: sc0ty.pl Samsung TV network remote control protocol writeup, danielfaust gist 998441, Bntdumas/SamsungIPRemote, kyleaa/homebridge-samsungtv2016, eclair4151/SmartCrypto.
- Connection methods: "legacy" (raw TCP, pre-2014 TVs), "websocket" (2014/2015), "encrypted" (SSL-based websocket, latest firmware). If port and method are both left None, samsungctl auto-detects connection type and port.
- Port by model year (stated): 55000 (<2014), 8080 (2014 & 2015), 8001 & 8002 (>=2016). QEQ90TATXXU falls in the >=2016 group.
- Pairing: on all TVs a connection-acceptance prompt is displayed ON THE TV with a 30-second window. On 2014/2015 (H and J) TVs a PIN is displayed on the TV and must be entered on the controller.
- 2016+ key differences: some codes differ — source example: `KEY_POWEROFF` is `KEY_POWER` on newer TVs.
- TVs older than 2014 cannot be powered on via this protocol. For 2014+ TVs, power-on requires the TV MAC address to be configured (used for wake-on-LAN); without it the power-on feature does not work.
- Config parameters: name (default "samsungctl", shown on TV), description (legacy connection only, defaults to local hostname), host, port, method, id (leave out for "encrypted" method), timeout (legacy method only, 0 = no timeout), token, mac.
- Client-side exceptions documented: SamsungTVError (base), AccessDenied, ConnectionClosed, UnhandledResponse, NoTVFound, plus ConfigError family (ConfigUnknownMethod, ConfigParseError, ConfigLoadError, ConfigSavePathError, ConfigSaveError, ConfigSavePathNotSpecified, ConfigParameterError).
- KEY_PANNEL_CHDOWN is listed twice in source: under Misc Keys with description "3D" and under Panel Keys with a blank description.
<!-- UNRESOLVED: wire-level message format (JSON payload structure, handshake, encoding) not in source -->
<!-- UNRESOLVED: authentication token format and PIN entry message exchange not in source -->
<!-- UNRESOLVED: response strings / acknowledgement payloads for key commands not in source -->

## Provenance

```yaml
source_domains:
  - github.com
source_urls:
  - https://github.com/kdschlosser/samsungctl
  - https://github.com/jaruba/ha-samsungtv-tizen/blob/master/Key_codes.md
retrieved_at: 2026-08-30T16:39:18.370Z
last_checked_at: 2026-08-30T22:17:16.916Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:17:16.916Z
matched_actions: 256
action_count: 256
confidence: medium
summary: "Every one of the 256 spec actions maps to a verbatim KEY_* token or samsungctl CLI option listed in the source's key-code and parameter tables; transport values (port 8001, token auth) appear verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a community tool README, not Samsung protocol documentation; wire-level message framing (JSON payload structure, handshake bytes) not included in source"
- "which of ports 8001/8002 applies to this exact model not disambiguated in source"
- "token format and pairing PIN semantics not specified beyond usage notes"
- "raw protocol response/acknowledgement strings not in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures found in source"
- "wire-level message format (JSON payload structure, handshake, encoding) not in source"
- "authentication token format and PIN entry message exchange not in source"
- "response strings / acknowledgement payloads for key commands not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
