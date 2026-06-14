---
spec_id: admin/sony-fwx8501-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FWX8501 Series BRAVIA Simple IP Control Spec"
manufacturer: Sony
model_family: "FWX8501 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "FWX8501 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony
retrieved_at: 2026-06-13T18:47:33.923Z
last_checked_at: 2026-06-14T16:14:28.382Z
generated_at: 2026-06-14T16:14:28.382Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact FWX8501 firmware range supporting Simple IP Control not stated; no serial/RS-232 support described"
  - "settable parameters beyond the discrete actions above are not"
  - "source describes no multi-step sequences"
  - "source contains no safety warnings, interlock procedures, or"
  - "high-level HTTP/JSON-RPC WebAPI not detailed in source; firmware version range supporting Simple IP Control not stated; HTTP base URL/path not stated"
verification:
  verdict: verified
  checked_at: 2026-06-14T16:14:28.382Z
  matched_actions: 122
  action_count: 122
  confidence: medium
  summary: "All 122 spec actions confirmed in source; bidirectional FourCC/IR coverage complete; transport port verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-13
---

# Sony FWX8501 Series BRAVIA Simple IP Control Spec

## Summary
Sony BRAVIA Simple IP Control for FWX8501 series displays. TCP-based control protocol on port 20060 using a fixed 24-byte frame. Source also mentions a high-level HTTP/JSON-RPC layer that mirrors the low-level commands.

<!-- UNRESOLVED: exact FWX8501 firmware range supporting Simple IP Control not stated; no serial/RS-232 support described -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  framing:
    description: Fixed 24-byte message: 0x2A 0x53 header, type byte, 4-byte FourCC function, 16-byte parameter block, 0x0A footer
  idle_timeout_seconds: 30
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       # inferred from setPowerStatus
# - queryable       # inferred from get* enquiry commands
# - routable        # inferred from setInputSource / setInput
# - levelable       # inferred from setAudioVolume
```

## Actions
```yaml
# Low-level protocol: 24-byte frame.
# Header bytes 0-1: 0x2A 0x53 (fixed)
# Byte 2 (Type): 0x43 Control | 0x45 Enquiry | 0x41 Answer | 0x4E Notify
# Bytes 3-6 (Function): Four-CC ASCII
# Bytes 7-22 (Parameter): 16 bytes, ASCII hex/decimal digits or '#' pad
# Byte 23 (Footer): 0x0A (LF)
#
# "command" below shows the Four-CC function code. Param block uses literal
# source bytes (hex pairs for control rows, '#' for inquiry rows, "0...0" / "F...F"
# for answer success/error). Each action emits one 24-byte frame.

- id: set_ircc_code
  label: Set IRCC Code
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=<16-byte IR code from Table 5>"
  params:
    - name: ir_code
      type: string
      description: 16-byte ASCII hex param (e.g. "0...030" = Volume Up, see Table 5)
  notes: "Source command name: setIrccCode. IR code table is Table 5; IRCC header letters not stated in source (the function column shows 'IRCC' as Four-CC of setIrccCode)."

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "Type=0x43 FourCC=POWR Param=0000000000000000"
  params:
    - name: state
      type: enum
      values: [standby, active]
      description: "0 = Standby (Off), 1 = Active (On)"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "Type=0x45 FourCC=POWR Param=################"
  notes: "Answer: 0 = Standby, 1 = Active."

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "Type=0x43 FourCC=VOLU Param=<volume value, decimal digits, 16 chars>"
  params:
    - name: level
      type: string
      description: 16 ASCII decimal digits, left-padded with '0' (e.g. 41 -> "0000000000000029")
  notes: "Source example: 0000000000000029 = volume 41."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "Type=0x45 FourCC=VOLU Param=################"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "Type=0x43 FourCC=AMUT Param=<0|1>"
  params:
    - name: state
      type: enum
      values: [unmute, mute]

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "Type=0x45 FourCC=AMUT Param=################"

- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "Type=0x43 FourCC=CHNN Param=<NN.NNNN>"
  params:
    - name: preset
      type: string
      description: "Major.minor preset, ASCII decimal, 16 chars; e.g. 00000050.1000000 = ch 50.1"
  notes: "Answer 'NNNN...' = no such channel."

- id: get_channel
  label: Get Channel (Preset)
  kind: query
  command: "Type=0x45 FourCC=CHNN Param=################"

- id: set_triplet_channel
  label: Set Triplet Channel
  kind: action
  command: "Type=0x43 FourCC=TCHN Param=<12-hex + '.' + 4-hex>"
  params:
    - name: triplet
      type: string
      description: "Hex triplet, 12 hex + '.' + 4 hex; e.g. 7FE07FE00400"
  notes: "Answer 'NNNN...' = no such channel."

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "Type=0x45 FourCC=TCHN Param=################"

- id: set_input_source
  label: Set Input Source (broadcast)
  kind: action
  command: "Type=0x43 FourCC=ISRC Param=<source-padded-#>"
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: "ASCII source name, right-padded with '#' to 16 chars"
  notes: "Answer 'NNNN...' = no such source (not tuned / no signal)."

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "Type=0x45 FourCC=ISRC Param=################"

- id: set_input
  label: Set Input
  kind: action
  command: "Type=0x43 FourCC=INPT Param=<kind|index>"
  params:
    - name: kind
      type: enum
      values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
    - name: index
      type: integer
      description: "1-9999 for non-TV kinds"
  notes: "Param bytes 11-12 select kind (0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB). Answer 'NNNN...' = Not Found."

- id: get_input
  label: Get Input
  kind: query
  command: "Type=0x45 FourCC=INPT Param=################"

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "Type=0x43 FourCC=PMUT Param=<0|1>"
  params:
    - name: state
      type: enum
      values: [off, on]
      description: "0 = disable, 1 = make screen black"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "Type=0x45 FourCC=PMUT Param=################"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "Type=0x43 FourCC=TPMU Param=################"
  notes: "Source row labeled 'togglePictureMute'; param row in source uses '#' (enquiry-style) for the control action. Treating as a no-param toggle action."

- id: set_pip
  label: Set PIP
  kind: action
  command: "Type=0x43 FourCC=PIPI Param=<0|1>"
  params:
    - name: state
      type: enum
      values: [disabled, enabled]

- id: get_pip
  label: Get PIP
  kind: query
  command: "Type=0x45 FourCC=PIPI Param=################"

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "Type=0x43 FourCC=TPIP Param=################"

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "Type=0x43 FourCC=TPPP Param=################"

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "Type=0x45 FourCC=BADR Param=eth0###########"
  notes: "Source row uses 'eth0' as ASCII bytes 0-3 of param. Answer returns IPv4 right-padded with '#'."

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "Type=0x45 FourCC=MADR Param=eth0###########"
  notes: "Source row uses 'eth0' as ASCII bytes 0-3 of param. Answer returns MAC right-padded with '#'."

# IR commands (setIrccCode dispatched with the param bytes below)
- id: ir_power_off
  label: IR Power Off
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000000"
  notes: "IR code 0x00 from Table 5."

- id: ir_input
  label: IR Input
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000001"
  notes: "IR code 0x01."

- id: ir_gguide
  label: IR GGuide
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000002"

- id: ir_epg
  label: IR EPG
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000003"

- id: ir_favorites
  label: IR Favorites
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000004"

- id: ir_display
  label: IR Display
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000005"

- id: ir_home
  label: IR Home
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000006"

- id: ir_options
  label: IR Options
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000007"

- id: ir_return
  label: IR Return
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000008"

- id: ir_up
  label: IR Up
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000009"

- id: ir_down
  label: IR Down
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000010"

- id: ir_right
  label: IR Right
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000011"

- id: ir_left
  label: IR Left
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000012"

- id: ir_confirm
  label: IR Confirm
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000013"

- id: ir_red
  label: IR Red
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000014"

- id: ir_green
  label: IR Green
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000015"

- id: ir_yellow
  label: IR Yellow
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000016"

- id: ir_blue
  label: IR Blue
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000017"

- id: ir_num1
  label: IR Num 1
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000018"

- id: ir_num2
  label: IR Num 2
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000019"

- id: ir_num3
  label: IR Num 3
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000020"

- id: ir_num4
  label: IR Num 4
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000021"

- id: ir_num5
  label: IR Num 5
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000022"

- id: ir_num6
  label: IR Num 6
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000023"

- id: ir_num7
  label: IR Num 7
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000024"

- id: ir_num8
  label: IR Num 8
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000025"

- id: ir_num9
  label: IR Num 9
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000026"

- id: ir_num0
  label: IR Num 0
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000027"

- id: ir_num11
  label: IR Num 11
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000028"

- id: ir_num12
  label: IR Num 12
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000029"

- id: ir_volume_up
  label: IR Volume Up
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000030"

- id: ir_volume_down
  label: IR Volume Down
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000031"

- id: ir_mute
  label: IR Mute
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000032"

- id: ir_channel_up
  label: IR Channel Up
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000033"

- id: ir_channel_down
  label: IR Channel Down
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000034"

- id: ir_subtitle
  label: IR Subtitle
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000035"

- id: ir_closed_caption
  label: IR Closed Caption
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000036"

- id: ir_enter
  label: IR Enter
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000037"

- id: ir_dot
  label: IR DOT
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000038"

- id: ir_analog
  label: IR Analog
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000039"

- id: ir_teletext
  label: IR Teletext
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000040"

- id: ir_exit
  label: IR Exit
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000041"

- id: ir_analog2
  label: IR Analog 2
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000042"

- id: ir_ad
  label: IR *AD
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000043"

- id: ir_digital
  label: IR Digital
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000044"

- id: ir_analog_q
  label: IR Analog?
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000045"

- id: ir_bs
  label: IR BS
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000046"

- id: ir_cs
  label: IR CS
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000047"

- id: ir_bs_cs
  label: IR BS/CS
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000048"

- id: ir_ddata
  label: IR Ddata
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000049"

- id: ir_pic_off
  label: IR Pic Off
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000050"

- id: ir_tv_radio
  label: IR TV/Radio
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000051"

- id: ir_theater
  label: IR Theater
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000052"

- id: ir_sen
  label: IR SEN
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000053"

- id: ir_internet_widgets
  label: IR Internet Widgets
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000054"

- id: ir_internet_video
  label: IR Internet Video
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000055"

- id: ir_netflix
  label: IR Netflix
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000056"

- id: ir_scene_select
  label: IR Scene Select
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000057"

- id: ir_mode_3d
  label: IR Mode 3D
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000058"

- id: ir_imanual
  label: IR iManual
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000059"

- id: ir_audio
  label: IR Audio
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000060"

- id: ir_wide
  label: IR Wide
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000061"

- id: ir_jump
  label: IR Jump
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000062"

- id: ir_pap
  label: IR PAP
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000063"

- id: ir_my_epg
  label: IR MyEPG
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000064"

- id: ir_program_description
  label: IR Program Description
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000065"

- id: ir_write_chapter
  label: IR Write Chapter
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000066"

- id: ir_track_id
  label: IR TrackID
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000067"

- id: ir_ten_key
  label: IR Ten Key
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000068"

- id: ir_applicast
  label: IR AppliCast
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000069"

- id: ir_actvila
  label: IR acTVila
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000070"

- id: ir_delete_video
  label: IR Delete Video
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000071"

- id: ir_photo_frame
  label: IR Photo Frame
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000072"

- id: ir_tv_pause
  label: IR TV Pause
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000073"

- id: ir_keypad
  label: IR KeyPad
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000074"

- id: ir_media
  label: IR Media
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000075"

- id: ir_sync_menu
  label: IR Sync Menu
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000076"

- id: ir_forward
  label: IR Forward
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000077"

- id: ir_play
  label: IR Play
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000078"

- id: ir_rewind
  label: IR Rewind
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000079"

- id: ir_prev
  label: IR Prev
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000080"

- id: ir_stop
  label: IR Stop
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000081"

- id: ir_next
  label: IR Next
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000082"

- id: ir_rec
  label: IR Rec
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000083"

- id: ir_pause
  label: IR Pause
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000084"

- id: ir_eject
  label: IR Eject
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000085"

- id: ir_flash_plus
  label: IR Flash Plus
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000086"

- id: ir_flash_minus
  label: IR Flash Minus
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000087"

- id: ir_top_menu
  label: IR TopMenu
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000088"

- id: ir_popup_menu
  label: IR PopupMenu
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000089"

- id: ir_rakuraku_start
  label: IR Rakuraku Start
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000090"

- id: ir_one_touch_time_rec
  label: IR One Touch Time Rec
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000091"

- id: ir_one_touch_view
  label: IR One Touch View
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000092"

- id: ir_one_touch_rec
  label: IR One Touch Rec
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000093"

- id: ir_one_touch_stop
  label: IR One Touch Stop
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000094"

- id: ir_dux
  label: IR DUX
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000095"

- id: ir_football_mode
  label: IR Football Mode
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000096"

- id: ir_social
  label: IR Social
  kind: action
  command: "Type=0x43 FourCC=IRCC Param=0000000000000097"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: getPowerStatus answer byte 23

- id: audio_volume
  type: integer
  source: getAudioVolume answer (decimal digits in last param byte)

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  source: getAudioMute answer byte 23 (0=Not Muted, 1=Muted)

- id: channel_preset
  type: string
  source: getChannel answer (NN.NNNN)

- id: channel_triplet
  type: string
  source: getTripletChannel answer (hex)

- id: input_source
  type: string
  source: getInputSource answer (e.g. dvbt, hdmi, scart...)

- id: current_input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  source: getInput answer bytes 11-12

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]

- id: pip_state
  type: enum
  values: [disabled, enabled]

- id: broadcast_address
  type: string
  source: getBroadcastAddress answer (IPv4, right-padded '#')

- id: mac_address
  type: string
  source: getMacAddress answer (MAC, right-padded '#')
```

## Variables
```yaml
# UNRESOLVED: settable parameters beyond the discrete actions above are not
# enumerated separately in the source; volume level is set directly via
# setAudioVolume rather than as a continuous variable.
```

## Events
```yaml
- id: fire_power_change
  type: enum
  values: [standby, active]
  source: Notify POWR, byte 23 (0=powering off, 1=powering on)

- id: fire_channel_change
  type: string
  source: Notify CHNN, preset format NN.NNNN

- id: fire_input_change
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  source: Notify INPT, param bytes 11-12

- id: fire_volume_change
  type: string
  source: Notify VOLU, decimal value

- id: fire_mute_change
  type: enum
  values: [unmuted, muted]

- id: fire_pip_change
  type: enum
  values: [disabled, enabled]

- id: fire_picture_mute_change
  type: enum
  values: [disabled, enabled]
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements
```

## Notes
Low-level TCP frames are 24 bytes (header 0x2A 0x53, type, FourCC function, 16-byte param, footer 0x0A). Source describes a parallel high-level HTTP/JSON-RPC WebAPI where the same commands are exposed; that HTTP layer is not detailed in the source (no path, no method names, no JSON schema). TCP connections are kept across requests but server disconnects after 30 s of client silence — clients must send a keep-alive or reconnect. For TV/HDMI/SCART/Composite/Component/Screen Mirroring/PC RGB inputs, the param bytes 11-12 select kind and the trailing 4 bytes carry the 1-9999 index.

<!-- UNRESOLVED: high-level HTTP/JSON-RPC WebAPI not detailed in source; firmware version range supporting Simple IP Control not stated; HTTP base URL/path not stated -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony
retrieved_at: 2026-06-13T18:47:33.923Z
last_checked_at: 2026-06-14T16:14:28.382Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T16:14:28.382Z
matched_actions: 122
action_count: 122
confidence: medium
summary: "All 122 spec actions confirmed in source; bidirectional FourCC/IR coverage complete; transport port verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact FWX8501 firmware range supporting Simple IP Control not stated; no serial/RS-232 support described"
- "settable parameters beyond the discrete actions above are not"
- "source describes no multi-step sequences"
- "source contains no safety warnings, interlock procedures, or"
- "high-level HTTP/JSON-RPC WebAPI not detailed in source; firmware version range supporting Simple IP Control not stated; HTTP base URL/path not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
