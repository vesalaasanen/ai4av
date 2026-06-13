---
spec_id: admin/sony-kdx755-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX755 Series Control Spec"
manufacturer: Sony
model_family: "KDX755 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX755 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - raw.githubusercontent.com
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
  - https://pro.sony/
retrieved_at: 2026-06-12T10:33:25.229Z
last_checked_at: 2026-06-12T19:48:44.311Z
generated_at: 2026-06-12T19:48:44.311Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "KDX755-specific model coverage not explicitly stated in source — protocol described as \"BRAVIA 2014 models\". Firmware range not stated."
  - "no separate variable table in source."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
  - "KDX755-Series-specific model coverage not confirmed in source (described as \"BRAVIA 2014 models\")."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:48:44.311Z
  matched_actions: 121
  action_count: 121
  confidence: medium
  summary: "All 121 spec actions confirmed in source with correct Four-CC codes and IR parameter values; transport port 20060 and TCP protocol verified; all 7 notify events represented in spec Events section. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDX755 Series Control Spec

## Summary
Simple IP control protocol for Sony BRAVIA displays (2014 models, including the KDX755 Series) over TCP. 24-byte fixed-size messages carry Four-CC function codes for power, volume, mute, channel, input, picture-mute, PIP, and IR-emulation commands. Source: "Sony Simple IP Control Protocol for BRAVIA" v0.6.

<!-- UNRESOLVED: KDX755-specific model coverage not explicitly stated in source — protocol described as "BRAVIA 2014 models". Firmware range not stated. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus / getPowerStatus commands
- levelable       # inferred from setAudioVolume / getAudioVolume commands
- routable        # inferred from setInput / setInputSource commands
- queryable       # inferred from getPowerStatus, getAudioVolume, etc.
```

## Actions
```yaml
# Frame format: 24 bytes total
#   [0..1]  Header  = 0x2A 0x53  (fixed, "*S")
#   [2]     Type    = 0x43 'C' | 0x45 'E' | 0x41 'A' | 0x4E 'N'
#   [3..6]  Function = 4 ASCII bytes (Four-CC)
#   [7..22] Parameter = 16 bytes (each byte is an ASCII hex digit "0"-"9")
#   [23]    Footer  = 0x0A (LF)
#
# command: strings below show the literal 24-byte payload (hex-escaped) with
# the Four-CC function and parameter bytes copied verbatim from the source.
# A trailing LF (0x0A) and the leading 0x2A 0x53 header are part of every frame.

# --- IR (setIrccCode) ---------------------------------------------------------
# Single IRCC command; parameter byte values per Table 5.
- id: ircc_power_off
  label: IR Power Off
  kind: action
  command: "*SCIRCC0000000000000000\n"
  params: []
- id: ircc_input
  label: IR Input
  kind: action
  command: "*SCIRCC0000000000000001\n"
  params: []
- id: ircc_gguide
  label: IR GGuide
  kind: action
  command: "*SCIRCC0000000000000002\n"
  params: []
- id: ircc_epg
  label: IR EPG
  kind: action
  command: "*SCIRCC0000000000000003\n"
  params: []
- id: ircc_favorites
  label: IR Favorites
  kind: action
  command: "*SCIRCC0000000000000004\n"
  params: []
- id: ircc_display
  label: IR Display
  kind: action
  command: "*SCIRCC0000000000000005\n"
  params: []
- id: ircc_home
  label: IR Home
  kind: action
  command: "*SCIRCC0000000000000006\n"
  params: []
- id: ircc_options
  label: IR Options
  kind: action
  command: "*SCIRCC0000000000000007\n"
  params: []
- id: ircc_return
  label: IR Return
  kind: action
  command: "*SCIRCC0000000000000008\n"
  params: []
- id: ircc_up
  label: IR Up
  kind: action
  command: "*SCIRCC0000000000000009\n"
  params: []
- id: ircc_down
  label: IR Down
  kind: action
  command: "*SCIRCC0000000000000010\n"
  params: []
- id: ircc_right
  label: IR Right
  kind: action
  command: "*SCIRCC0000000000000011\n"
  params: []
- id: ircc_left
  label: IR Left
  kind: action
  command: "*SCIRCC0000000000000012\n"
  params: []
- id: ircc_confirm
  label: IR Confirm
  kind: action
  command: "*SCIRCC0000000000000013\n"
  params: []
- id: ircc_red
  label: IR Red
  kind: action
  command: "*SCIRCC0000000000000014\n"
  params: []
- id: ircc_green
  label: IR Green
  kind: action
  command: "*SCIRCC0000000000000015\n"
  params: []
- id: ircc_yellow
  label: IR Yellow
  kind: action
  command: "*SCIRCC0000000000000016\n"
  params: []
- id: ircc_blue
  label: IR Blue
  kind: action
  command: "*SCIRCC0000000000000017\n"
  params: []
- id: ircc_num1
  label: IR Num1
  kind: action
  command: "*SCIRCC0000000000000018\n"
  params: []
- id: ircc_num2
  label: IR Num2
  kind: action
  command: "*SCIRCC0000000000000019\n"
  params: []
- id: ircc_num3
  label: IR Num3
  kind: action
  command: "*SCIRCC0000000000000020\n"
  params: []
- id: ircc_num4
  label: IR Num4
  kind: action
  command: "*SCIRCC0000000000000021\n"
  params: []
- id: ircc_num5
  label: IR Num5
  kind: action
  command: "*SCIRCC0000000000000022\n"
  params: []
- id: ircc_num6
  label: IR Num6
  kind: action
  command: "*SCIRCC0000000000000023\n"
  params: []
- id: ircc_num7
  label: IR Num7
  kind: action
  command: "*SCIRCC0000000000000024\n"
  params: []
- id: ircc_num8
  label: IR Num8
  kind: action
  command: "*SCIRCC0000000000000025\n"
  params: []
- id: ircc_num9
  label: IR Num9
  kind: action
  command: "*SCIRCC0000000000000026\n"
  params: []
- id: ircc_num0
  label: IR Num0
  kind: action
  command: "*SCIRCC0000000000000027\n"
  params: []
- id: ircc_num11
  label: IR Num11
  kind: action
  command: "*SCIRCC0000000000000028\n"
  params: []
- id: ircc_num12
  label: IR Num12
  kind: action
  command: "*SCIRCC0000000000000029\n"
  params: []
- id: ircc_volume_up
  label: IR Volume Up
  kind: action
  command: "*SCIRCC0000000000000030\n"
  params: []
- id: ircc_volume_down
  label: IR Volume Down
  kind: action
  command: "*SCIRCC0000000000000031\n"
  params: []
- id: ircc_mute
  label: IR Mute
  kind: action
  command: "*SCIRCC0000000000000032\n"
  params: []
- id: ircc_channel_up
  label: IR Channel Up
  kind: action
  command: "*SCIRCC0000000000000033\n"
  params: []
- id: ircc_channel_down
  label: IR Channel Down
  kind: action
  command: "*SCIRCC0000000000000034\n"
  params: []
- id: ircc_subtitle
  label: IR Subtitle
  kind: action
  command: "*SCIRCC0000000000000035\n"
  params: []
- id: ircc_closed_caption
  label: IR Closed Caption
  kind: action
  command: "*SCIRCC0000000000000036\n"
  params: []
- id: ircc_enter
  label: IR Enter
  kind: action
  command: "*SCIRCC0000000000000037\n"
  params: []
- id: ircc_dot
  label: IR DOT
  kind: action
  command: "*SCIRCC0000000000000038\n"
  params: []
- id: ircc_analog
  label: IR Analog
  kind: action
  command: "*SCIRCC0000000000000039\n"
  params: []
- id: ircc_teletext
  label: IR Teletext
  kind: action
  command: "*SCIRCC0000000000000040\n"
  params: []
- id: ircc_exit
  label: IR Exit
  kind: action
  command: "*SCIRCC0000000000000041\n"
  params: []
- id: ircc_analog2
  label: IR Analog2
  kind: action
  command: "*SCIRCC0000000000000042\n"
  params: []
- id: ircc_ad
  label: IR *AD
  kind: action
  command: "*SCIRCC0000000000000043\n"
  params: []
- id: ircc_digital
  label: IR Digital
  kind: action
  command: "*SCIRCC0000000000000044\n"
  params: []
- id: ircc_analog_q
  label: IR Analog?
  kind: action
  command: "*SCIRCC0000000000000045\n"
  params: []
- id: ircc_bs
  label: IR BS
  kind: action
  command: "*SCIRCC0000000000000046\n"
  params: []
- id: ircc_cs
  label: IR CS
  kind: action
  command: "*SCIRCC0000000000000047\n"
  params: []
- id: ircc_bs_cs
  label: IR BS/CS
  kind: action
  command: "*SCIRCC0000000000000048\n"
  params: []
- id: ircc_ddata
  label: IR Ddata
  kind: action
  command: "*SCIRCC0000000000000049\n"
  params: []
- id: ircc_pic_off
  label: IR Pic Off
  kind: action
  command: "*SCIRCC0000000000000050\n"
  params: []
- id: ircc_tv_radio
  label: IR Tv_Radio
  kind: action
  command: "*SCIRCC0000000000000051\n"
  params: []
- id: ircc_theater
  label: IR Theater
  kind: action
  command: "*SCIRCC0000000000000052\n"
  params: []
- id: ircc_sen
  label: IR SEN
  kind: action
  command: "*SCIRCC0000000000000053\n"
  params: []
- id: ircc_internet_widgets
  label: IR Internet Widgets
  kind: action
  command: "*SCIRCC0000000000000054\n"
  params: []
- id: ircc_internet_video
  label: IR Internet Video
  kind: action
  command: "*SCIRCC0000000000000055\n"
  params: []
- id: ircc_netflix
  label: IR Netflix
  kind: action
  command: "*SCIRCC0000000000000056\n"
  params: []
- id: ircc_scene_select
  label: IR Scene Select
  kind: action
  command: "*SCIRCC0000000000000057\n"
  params: []
- id: ircc_mode3d
  label: IR Mode3D
  kind: action
  command: "*SCIRCC0000000000000058\n"
  params: []
- id: ircc_imanual
  label: IR iManual
  kind: action
  command: "*SCIRCC0000000000000059\n"
  params: []
- id: ircc_audio
  label: IR Audio
  kind: action
  command: "*SCIRCC0000000000000060\n"
  params: []
- id: ircc_wide
  label: IR Wide
  kind: action
  command: "*SCIRCC0000000000000061\n"
  params: []
- id: ircc_jump
  label: IR Jump
  kind: action
  command: "*SCIRCC0000000000000062\n"
  params: []
- id: ircc_pap
  label: IR PAP
  kind: action
  command: "*SCIRCC0000000000000063\n"
  params: []
- id: ircc_myepg
  label: IR MyEPG
  kind: action
  command: "*SCIRCC0000000000000064\n"
  params: []
- id: ircc_program_description
  label: IR Program Description
  kind: action
  command: "*SCIRCC0000000000000065\n"
  params: []
- id: ircc_write_chapter
  label: IR Write Chapter
  kind: action
  command: "*SCIRCC0000000000000066\n"
  params: []
- id: ircc_trackid
  label: IR TrackID
  kind: action
  command: "*SCIRCC0000000000000067\n"
  params: []
- id: ircc_ten_key
  label: IR Ten Key
  kind: action
  command: "*SCIRCC0000000000000068\n"
  params: []
- id: ircc_applicast
  label: IR AppliCast
  kind: action
  command: "*SCIRCC0000000000000069\n"
  params: []
- id: ircc_activila
  label: IR acTVila
  kind: action
  command: "*SCIRCC0000000000000070\n"
  params: []
- id: ircc_delete_video
  label: IR Delete Video
  kind: action
  command: "*SCIRCC0000000000000071\n"
  params: []
- id: ircc_photo_frame
  label: IR Photo Frame
  kind: action
  command: "*SCIRCC0000000000000072\n"
  params: []
- id: ircc_tv_pause
  label: IR TV Pause
  kind: action
  command: "*SCIRCC0000000000000073\n"
  params: []
- id: ircc_keypad
  label: IR KeyPad
  kind: action
  command: "*SCIRCC0000000000000074\n"
  params: []
- id: ircc_media
  label: IR Media
  kind: action
  command: "*SCIRCC0000000000000075\n"
  params: []
- id: ircc_sync_menu
  label: IR Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076\n"
  params: []
- id: ircc_forward
  label: IR Forward
  kind: action
  command: "*SCIRCC0000000000000077\n"
  params: []
- id: ircc_play
  label: IR Play
  kind: action
  command: "*SCIRCC0000000000000078\n"
  params: []
- id: ircc_rewind
  label: IR Rewind
  kind: action
  command: "*SCIRCC0000000000000079\n"
  params: []
- id: ircc_prev
  label: IR Prev
  kind: action
  command: "*SCIRCC0000000000000080\n"
  params: []
- id: ircc_stop
  label: IR Stop
  kind: action
  command: "*SCIRCC0000000000000081\n"
  params: []
- id: ircc_next
  label: IR Next
  kind: action
  command: "*SCIRCC0000000000000082\n"
  params: []
- id: ircc_rec
  label: IR Rec
  kind: action
  command: "*SCIRCC0000000000000083\n"
  params: []
- id: ircc_pause
  label: IR Pause
  kind: action
  command: "*SCIRCC0000000000000084\n"
  params: []
- id: ircc_eject
  label: IR Eject
  kind: action
  command: "*SCIRCC0000000000000085\n"
  params: []
- id: ircc_flash_plus
  label: IR Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086\n"
  params: []
- id: ircc_flash_minus
  label: IR Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087\n"
  params: []
- id: ircc_topmenu
  label: IR TopMenu
  kind: action
  command: "*SCIRCC0000000000000088\n"
  params: []
- id: ircc_popupmenu
  label: IR PopupMenu
  kind: action
  command: "*SCIRCC0000000000000089\n"
  params: []
- id: ircc_rakuraku_start
  label: IR Rakuraku Start
  kind: action
  command: "*SCIRCC0000000000000090\n"
  params: []
- id: ircc_one_touch_time_rec
  label: IR One Touch Time Rec
  kind: action
  command: "*SCIRCC0000000000000091\n"
  params: []
- id: ircc_one_touch_view
  label: IR One Touch View
  kind: action
  command: "*SCIRCC0000000000000092\n"
  params: []
- id: ircc_one_touch_rec
  label: IR One Touch Rec
  kind: action
  command: "*SCIRCC0000000000000093\n"
  params: []
- id: ircc_one_touch_stop
  label: IR One Touch Stop
  kind: action
  command: "*SCIRCC0000000000000094\n"
  params: []
- id: ircc_dux
  label: IR DUX
  kind: action
  command: "*SCIRCC0000000000000095\n"
  params: []
- id: ircc_football_mode
  label: IR Football Mode
  kind: action
  command: "*SCIRCC0000000000000096\n"
  params: []
- id: ircc_social
  label: IR Social
  kind: action
  command: "*SCIRCC0000000000000097\n"
  params: []

# --- Power (POWR) ------------------------------------------------------------
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR0000000000000000\n"  # 0 = Standby (Off); last byte 1 = Active (On)
  params:
    - name: state
      type: integer
      description: 0 = Standby (Off), 1 = Active (On)
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

# --- Volume (VOLU) ------------------------------------------------------------
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU000000000000XXXX\n"  # parameter bytes = decimal volume zero-padded left, e.g. 41 = "0000000000000029"
  params:
    - name: level
      type: integer
      description: Volume value (decimal, written into 16 parameter bytes as ASCII digits, right-aligned, left-padded with "0")
- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

# --- Mute (AMUT) --------------------------------------------------------------
- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000X\n"  # last byte 0 = Unmute, 1 = Mute
  params:
    - name: state
      type: integer
      description: 0 = Unmute, 1 = Mute
- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

# --- Channel preset (CHNN) ----------------------------------------------------
- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "*SCCHNNXXXXXXXX.XXXXXXX\n"  # e.g. "00000050.1000000" = channel 50.1; "00000006.0000000" = channel 6
  params:
    - name: channel
      type: string
      description: Preset channel as "XXXXXXXX.XXXXXXX" (16 ASCII digit bytes, "." in byte 8)
- id: get_channel
  label: Get Channel (preset)
  kind: query
  command: "*SECHNN################\n"
  params: []

# --- Channel triplet (TCHN) ---------------------------------------------------
- id: set_triplet_channel
  label: Set Channel (triplet)
  kind: action
  command: "*SCTCHNXXXXXXXXXXXX####\n"  # last 4 bytes of parameter reserved; e.g. "7FE07FE00400" = 32736.32736.1024
  params:
    - name: triplet
      type: string
      description: 12 hex digits for the triplet (16 param bytes; bytes 0-7 = main, 8-11 = sub, 12-15 reserved "#")
- id: get_triplet_channel
  label: Get Channel (triplet)
  kind: query
  command: "*SETCHN################\n"
  params: []

# --- Input source label (ISRC) ------------------------------------------------
- id: set_input_source
  label: Set Input Source
  kind: action
  command: "*SCISRCXXXXXXXXXXXXXXXX\n"  # right-padded with "#"; e.g. "dvbt############"
  params:
    - name: source
      type: string
      description: One of dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt (right-padded with "#" to 16 bytes)
- id: get_input_source
  label: Get Input Source
  kind: query
  command: "*SEISRC################\n"
  params: []

# --- Input (INPT) -------------------------------------------------------------
- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000XXXXXX\n"  # byte 8 = kind (0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB); bytes 12-15 = number 1-9999
  params:
    - name: kind
      type: integer
      description: Input kind (0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB)
    - name: number
      type: integer
      description: Input number 1-9999 (0 when kind=TV)
- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################\n"
  params: []

# --- Picture mute (PMUT) ------------------------------------------------------
- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000X\n"  # last byte 0 = Disable, 1 = Enable
  params:
    - name: state
      type: integer
      description: 0 = Disable, 1 = Enable
- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"
  params: []
- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

# --- PIP (PIPI) ---------------------------------------------------------------
- id: set_pip
  label: Set PIP
  kind: action
  command: "*SCPIPI000000000000000X\n"  # last byte 0 = Disable, 1 = Enable
  params:
    - name: state
      type: integer
      description: 0 = Disable, 1 = Enable
- id: get_pip
  label: Get PIP
  kind: query
  command: "*SEPIPI################\n"
  params: []
- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "*SCTPIP################\n"
  params: []
- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "*SCTPPP################\n"
  params: []

# --- Network info (BADR / MADR) -----------------------------------------------
- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0###########\n"  # parameter 0-3 = "eth0", padded to 16 with "#"
  params: []
- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0###########\n"  # parameter 0-3 = "eth0", padded to 16 with "#"
  params: []
```

## Feedbacks
```yaml
# All feedback is carried in 24-byte Answer (0x41) frames with the same
# Four-CC as the originating Control/Enquiry and an "0000000000000000" body
# (success) or "FFFFFFFFFFFFFFFF" body (error). Bodies are decoded per command.
- id: power_state
  type: enum
  values: [standby, active]
- id: audio_mute_state
  type: enum
  values: [not_muted, muted]
- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
- id: pip_state
  type: enum
  values: [disabled, enabled]
- id: audio_volume
  type: integer
  description: Decimal volume, right-aligned ASCII digits in 16 parameter bytes
- id: channel_preset
  type: string
  description: Preset channel "XXXXXXXX.XXXXXXX"
- id: channel_triplet
  type: string
  description: 12 hex digits
- id: input_source_label
  type: string
  description: One of dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt
- id: input_kind
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
- id: broadcast_address
  type: string
- id: mac_address
  type: string
- id: control_result
  type: enum
  values: [success, error]
- id: channel_error
  type: string
  description: "FFFFFFFFFFFFFFFF" error body for setChannel/setTripletChannel (no such channel)
- id: input_error
  type: string
  description: "FFFFFFFFFFFFFFFF" error body for setInput (Not Found)
- id: source_error
  type: string
  description: "FFFFFFFFFFFFFFFF" error body for setInputSource (no such source / not tuned / no signal)
```

## Variables
```yaml
# No discrete settable parameters beyond the command parameters above.
# UNRESOLVED: no separate variable table in source.
```

## Events
```yaml
# Notify (0x4E) messages the TV sends unsolicited. Same 24-byte frame.
- id: fire_power_change
  type: enum
  values: [standby, active]
  notes: FourCC "POWR"; last parameter byte 0=powering off, 1=powering on
- id: fire_channel_change
  type: string
  notes: FourCC "CHNN"; "XXXXXXXX.XXXXXXX" preset
- id: fire_input_change
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  notes: FourCC "INPT"; same body encoding as setInput Answer
- id: fire_volume_change
  type: integer
  notes: FourCC "VOLU"
- id: fire_mute_change
  type: enum
  values: [not_muted, muted]
  notes: FourCC "AMUT"; last byte 0=unmuting, 1=muting
- id: fire_pip_change
  type: enum
  values: [disabled, enabled]
  notes: FourCC "PIPI"; last byte 0=disabled, 1=enabled
- id: fire_picture_mute_change
  type: enum
  values: [disabled, enabled]
  notes: FourCC "PMUT"; last byte 0=disabled, 1=enabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Every TCP frame is exactly 24 bytes: 0x2A 0x53 header, 1-byte type (C/E/A/N), 4-byte Four-CC function, 16-byte parameter (each byte is one ASCII hex digit or ASCII alphanumeric), 0x0A footer.
- Server listens on TCP port 20060; idle connections dropped by server after 30 s with no command from client.
- "Simple IP Control" must be enabled in TV settings: Network > Home Network Setup > IP Control > Simple IP Control (Normal Mode) or Hotel/Pro Mode > IP Control > Simple IP Control.
- "Low Level Protocol is designed as a protocol bridge to High Level Protocol" — same commands are reachable via JSON-RPC over HTTP (WebAPI); this spec covers only the Low Level TCP frame format.
- Source doc identifies coverage as "BRAVIA 2014 models"; KDX755-Series-specific confirmation not stated in the source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: KDX755-Series-specific model coverage not confirmed in source (described as "BRAVIA 2014 models"). -->

## Provenance

```yaml
source_domains:
  - aca.im
  - raw.githubusercontent.com
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
  - https://pro.sony/
retrieved_at: 2026-06-12T10:33:25.229Z
last_checked_at: 2026-06-12T19:48:44.311Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:48:44.311Z
matched_actions: 121
action_count: 121
confidence: medium
summary: "All 121 spec actions confirmed in source with correct Four-CC codes and IR parameter values; transport port 20060 and TCP protocol verified; all 7 notify events represented in spec Events section. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "KDX755-specific model coverage not explicitly stated in source — protocol described as \"BRAVIA 2014 models\". Firmware range not stated."
- "no separate variable table in source."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
- "KDX755-Series-specific model coverage not confirmed in source (described as \"BRAVIA 2014 models\")."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
