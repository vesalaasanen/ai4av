---
spec_id: admin/sony-kexh8096-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KE-XH8096 Series Control Spec"
manufacturer: Sony
model_family: "KE-XH8096 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KE-XH8096 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-10T01:42:40.577Z
last_checked_at: 2026-06-10T07:35:30.380Z
generated_at: 2026-06-10T07:35:30.380Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the generic Sony Simple IP Control Protocol v0.6 (BRAVIA 2014 baseline). KE-XH8096 Series (2020) is presumed to retain compatibility; not directly confirmed in source."
  - "source does not document any multi-step sequences"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility for KE-XH8096 Series not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-10T07:35:30.380Z
  matched_actions: 132
  action_count: 132
  confidence: medium
  summary: "Spec comprehensively covers all Sony Simple IP Control Protocol v0.6 commands documented in Table 4 and Table 5; every action and transport parameter verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KE-XH8096 Series Control Spec

## Summary
Sony KE-XH8096 Series BRAVIA Android TVs support the Sony Simple IP Control Protocol, a low-level 24-byte fixed-size TCP frame protocol on port 20060. This spec covers the control, enquiry, answer, and notify message types defined in Sony's Simple IP Control Protocol v0.6, including power, volume, mute, channel, input, picture mute, PIP, and a broad set of IR-like remote control codes.

<!-- UNRESOLVED: source document is the generic Sony Simple IP Control Protocol v0.6 (BRAVIA 2014 baseline). KE-XH8096 Series (2020) is presumed to retain compatibility; not directly confirmed in source. -->

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
- powerable    # inferred from setPowerStatus (POWR) command
- routable     # inferred from setInputSource / setInput commands
- queryable    # inferred from enquiry (E) message type and get* commands
- levelable    # inferred from setAudioVolume command
```

## Actions
```yaml
# Each entry corresponds to a row in the source's Table 4 / Table 5.
# command field shows the 24-byte payload template as documented:
#   bytes 0-1   : 0x2A 0x53 (header, fixed)
#   byte  2     : type code (0x43 Control, 0x45 Enquiry, 0x4E Notify)
#   bytes 3-6   : FourCC function name (ASCII)
#   bytes 7-22  : 16-byte parameter (ASCII hex digits or '#' pad)
#   byte  23    : 0x0A (LF footer, fixed)
# Variable fields are shown as {param}. Fixed header/footer omitted in templates
# to keep payloads readable; assemble full 24-byte frame per source §3.

# --- IR-like remote code send (Table 4: setIrccCode) ---
- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "0x43 IRCC {ircc_param_pad16}"  # type C, FourCC IRCC, 16-byte param per Table 5
  params:
    - name: ircc_param_pad16
      type: string
      description: 16-byte ASCII hex parameter from Table 5 (e.g. '0...0' for Power Off, '0...30' for Volume Up)

# --- Power (Table 4: POWR) ---
- id: set_power_standby
  label: Power Standby (Off)
  kind: action
  command: "0x43 POWR 0000000000000000"
- id: set_power_active
  label: Power Active (On)
  kind: action
  command: "0x43 POWR 0000000000000001"
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "0x45 POWR ################"
  feedback_ref: power_state

# --- Volume (Table 4: VOLU) ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "0x43 VOLU {volume_pad16}"
  params:
    - name: volume_pad16
      type: string
      description: 16-byte ASCII decimal volume value, zero-padded on the left (e.g. 0000000000000029 = 41)
- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "0x45 VOLU ################"
  feedback_ref: audio_volume

# --- Mute (Table 4: AMUT) ---
- id: set_audio_mute_off
  label: Audio Mute Off
  kind: action
  command: "0x43 AMUT 0000000000000000"
- id: set_audio_mute_on
  label: Audio Mute On
  kind: action
  command: "0x43 AMUT 0000000000000001"
- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "0x45 AMUT ################"
  feedback_ref: audio_mute

# --- Channel preset (Table 4: CHNN) ---
- id: set_channel
  label: Set Channel (Preset Number)
  kind: action
  command: "0x43 CHNN {preset_pad16}"
  params:
    - name: preset_pad16
      type: string
      description: 16-byte ASCII decimal; format MAJOR.MINOR with leading zeros, e.g. 00000050.1000000 = 50.1, 00000006.0000000 = 6
- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "0x45 CHNN ################"
  feedback_ref: channel

# --- Channel triplet (Table 4: TCHN) ---
- id: set_triplet_channel
  label: Set Channel (Triplet)
  kind: action
  command: "0x43 TCHN {triplet_pad16}"
  params:
    - name: triplet_pad16
      type: string
      description: 16-byte ASCII hex triplet, e.g. 7FE07FE00400 = 32736.32736.1024
- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "0x45 TCHN ################"
  feedback_ref: triplet_channel

# --- Input source (Table 4: ISRC) ---
- id: set_input_source
  label: Set Input Source
  kind: action
  command: "0x43 ISRC {source_pad16}"
  params:
    - name: source_pad16
      type: string
      description: 16-byte ASCII; right-padded with '#'. Values per source: dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt
- id: get_input_source
  label: Get Current Input Source
  kind: query
  command: "0x45 ISRC ################"
  feedback_ref: input_source

# --- Input (Table 4: INPT) ---
- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "0x43 INPT 0000000000000000"
- id: set_input_hdmi
  label: Set Input to HDMI
  kind: action
  command: "0x43 INPT 000000010000{n}"  # n = HDMI port number, 1-9999, ASCII digits
  params:
    - name: n
      type: integer
      description: HDMI port number 1-9999
- id: set_input_scart
  label: Set Input to SCART
  kind: action
  command: "0x43 INPT 000000020000{n}"  # n = SCART port number, 1-9999
  params:
    - name: n
      type: integer
      description: SCART port number 1-9999
- id: set_input_composite
  label: Set Input to Composite
  kind: action
  command: "0x43 INPT 000000030000{n}"  # n = Composite port number, 1-9999
  params:
    - name: n
      type: integer
      description: Composite port number 1-9999
- id: set_input_component
  label: Set Input to Component
  kind: action
  command: "0x43 INPT 000000040000{n}"  # n = Component port number, 1-9999
  params:
    - name: n
      type: integer
      description: Component port number 1-9999
- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring
  kind: action
  command: "0x43 INPT 000000050000{n}"  # n = Screen Mirroring port number, 1-9999
  params:
    - name: n
      type: integer
      description: Screen Mirroring port number 1-9999
- id: set_input_pc_rgb
  label: Set Input to PC RGB
  kind: action
  command: "0x43 INPT 000000060000{n}"  # n = PC RGB port number, 1-9999
  params:
    - name: n
      type: integer
      description: PC RGB port number 1-9999
- id: get_input
  label: Get Current Input
  kind: query
  command: "0x45 INPT ################"
  feedback_ref: input

# --- Picture mute (Table 4: PMUT) ---
- id: set_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "0x43 PMUT 0000000000000000"
- id: set_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "0x43 PMUT 0000000000000001"
- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "0x45 PMUT ################"
  feedback_ref: picture_mute
- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "0x43 TPMU ################"

# --- PIP (Table 4: PIPI) ---
- id: set_pip_off
  label: PIP Off
  kind: action
  command: "0x43 PIPI 0000000000000000"
- id: set_pip_on
  label: PIP On
  kind: action
  command: "0x43 PIPI 0000000000000001"
- id: get_pip
  label: Get PIP Status
  kind: query
  command: "0x45 PIPI ################"
  feedback_ref: pip
- id: toggle_pip
  label: Toggle PIP Status
  kind: action
  command: "0x43 TPIP ################"
- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "0x43 TPPP ################"

# --- Network info (Table 4: BADR / MADR) ---
- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "0x45 BADR eth0###########"  # 16-byte param, "eth0" then '#' pad
  params:
    - name: interface
      type: string
      description: Interface name (source example uses 'eth0')
  feedback_ref: broadcast_address
- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0x45 MADR eth0###########"
  params:
    - name: interface
      type: string
      description: Interface name (source example uses 'eth0')
  feedback_ref: mac_address

# --- IR-like codes (Table 5) ---
# Each code sends the setIrccCode action with the 16-byte param from Table 5.
- id: ir_power_off
  label: IR Power Off
  kind: action
  command: "0x43 IRCC 0000000000000000"
- id: ir_input
  label: IR Input
  kind: action
  command: "0x43 IRCC 0000000000000001"
- id: ir_gguide
  label: IR GGuide
  kind: action
  command: "0x43 IRCC 0000000000000002"
- id: ir_epg
  label: IR EPG
  kind: action
  command: "0x43 IRCC 0000000000000003"
- id: ir_favorites
  label: IR Favorites
  kind: action
  command: "0x43 IRCC 0000000000000004"
- id: ir_display
  label: IR Display
  kind: action
  command: "0x43 IRCC 0000000000000005"
- id: ir_home
  label: IR Home
  kind: action
  command: "0x43 IRCC 0000000000000006"
- id: ir_options
  label: IR Options
  kind: action
  command: "0x43 IRCC 0000000000000007"
- id: ir_return
  label: IR Return
  kind: action
  command: "0x43 IRCC 0000000000000008"
- id: ir_up
  label: IR Up
  kind: action
  command: "0x43 IRCC 0000000000000009"
- id: ir_down
  label: IR Down
  kind: action
  command: "0x43 IRCC 0000000000000010"
- id: ir_right
  label: IR Right
  kind: action
  command: "0x43 IRCC 0000000000000011"
- id: ir_left
  label: IR Left
  kind: action
  command: "0x43 IRCC 0000000000000012"
- id: ir_confirm
  label: IR Confirm
  kind: action
  command: "0x43 IRCC 0000000000000013"
- id: ir_red
  label: IR Red
  kind: action
  command: "0x43 IRCC 0000000000000014"
- id: ir_green
  label: IR Green
  kind: action
  command: "0x43 IRCC 0000000000000015"
- id: ir_yellow
  label: IR Yellow
  kind: action
  command: "0x43 IRCC 0000000000000016"
- id: ir_blue
  label: IR Blue
  kind: action
  command: "0x43 IRCC 0000000000000017"
- id: ir_num1
  label: IR Num 1
  kind: action
  command: "0x43 IRCC 0000000000000018"
- id: ir_num2
  label: IR Num 2
  kind: action
  command: "0x43 IRCC 0000000000000019"
- id: ir_num3
  label: IR Num 3
  kind: action
  command: "0x43 IRCC 0000000000000020"
- id: ir_num4
  label: IR Num 4
  kind: action
  command: "0x43 IRCC 0000000000000021"
- id: ir_num5
  label: IR Num 5
  kind: action
  command: "0x43 IRCC 0000000000000022"
- id: ir_num6
  label: IR Num 6
  kind: action
  command: "0x43 IRCC 0000000000000023"
- id: ir_num7
  label: IR Num 7
  kind: action
  command: "0x43 IRCC 0000000000000024"
- id: ir_num8
  label: IR Num 8
  kind: action
  command: "0x43 IRCC 0000000000000025"
- id: ir_num9
  label: IR Num 9
  kind: action
  command: "0x43 IRCC 0000000000000026"
- id: ir_num0
  label: IR Num 0
  kind: action
  command: "0x43 IRCC 0000000000000027"
- id: ir_num11
  label: IR Num 11
  kind: action
  command: "0x43 IRCC 0000000000000028"
- id: ir_num12
  label: IR Num 12
  kind: action
  command: "0x43 IRCC 0000000000000029"
- id: ir_volume_up
  label: IR Volume Up
  kind: action
  command: "0x43 IRCC 0000000000000030"
- id: ir_volume_down
  label: IR Volume Down
  kind: action
  command: "0x43 IRCC 0000000000000031"
- id: ir_mute
  label: IR Mute
  kind: action
  command: "0x43 IRCC 0000000000000032"
- id: ir_channel_up
  label: IR Channel Up
  kind: action
  command: "0x43 IRCC 0000000000000033"
- id: ir_channel_down
  label: IR Channel Down
  kind: action
  command: "0x43 IRCC 0000000000000034"
- id: ir_subtitle
  label: IR Subtitle
  kind: action
  command: "0x43 IRCC 0000000000000035"
- id: ir_closed_caption
  label: IR Closed Caption
  kind: action
  command: "0x43 IRCC 0000000000000036"
- id: ir_enter
  label: IR Enter
  kind: action
  command: "0x43 IRCC 0000000000000037"
- id: ir_dot
  label: IR DOT
  kind: action
  command: "0x43 IRCC 0000000000000038"
- id: ir_analog
  label: IR Analog
  kind: action
  command: "0x43 IRCC 0000000000000039"
- id: ir_teletext
  label: IR Teletext
  kind: action
  command: "0x43 IRCC 0000000000000040"
- id: ir_exit
  label: IR Exit
  kind: action
  command: "0x43 IRCC 0000000000000041"
- id: ir_analog2
  label: IR Analog2
  kind: action
  command: "0x43 IRCC 0000000000000042"
- id: ir_audio_description
  label: IR *AD (Audio Description)
  kind: action
  command: "0x43 IRCC 0000000000000043"
- id: ir_digital
  label: IR Digital
  kind: action
  command: "0x43 IRCC 0000000000000044"
- id: ir_analog_q
  label: IR Analog?
  kind: action
  command: "0x43 IRCC 0000000000000045"
- id: ir_bs
  label: IR BS
  kind: action
  command: "0x43 IRCC 0000000000000046"
- id: ir_cs
  label: IR CS
  kind: action
  command: "0x43 IRCC 0000000000000047"
- id: ir_bs_cs
  label: IR BS/CS
  kind: action
  command: "0x43 IRCC 0000000000000048"
- id: ir_ddata
  label: IR Ddata
  kind: action
  command: "0x43 IRCC 0000000000000049"
- id: ir_pic_off
  label: IR Pic Off
  kind: action
  command: "0x43 IRCC 0000000000000050"
- id: ir_tv_radio
  label: IR TV/Radio
  kind: action
  command: "0x43 IRCC 0000000000000051"
- id: ir_theater
  label: IR Theater
  kind: action
  command: "0x43 IRCC 0000000000000052"
- id: ir_sen
  label: IR SEN
  kind: action
  command: "0x43 IRCC 0000000000000053"
- id: ir_internet_widgets
  label: IR Internet Widgets
  kind: action
  command: "0x43 IRCC 0000000000000054"
- id: ir_internet_video
  label: IR Internet Video
  kind: action
  command: "0x43 IRCC 0000000000000055"
- id: ir_netflix
  label: IR Netflix
  kind: action
  command: "0x43 IRCC 0000000000000056"
- id: ir_scene_select
  label: IR Scene Select
  kind: action
  command: "0x43 IRCC 0000000000000057"
- id: ir_mode3d
  label: IR Mode3D
  kind: action
  command: "0x43 IRCC 0000000000000058"
- id: ir_imanual
  label: IR iManual
  kind: action
  command: "0x43 IRCC 0000000000000059"
- id: ir_audio
  label: IR Audio
  kind: action
  command: "0x43 IRCC 0000000000000060"
- id: ir_wide
  label: IR Wide
  kind: action
  command: "0x43 IRCC 0000000000000061"
- id: ir_jump
  label: IR Jump
  kind: action
  command: "0x43 IRCC 0000000000000062"
- id: ir_pap
  label: IR PAP
  kind: action
  command: "0x43 IRCC 0000000000000063"
- id: ir_myepg
  label: IR MyEPG
  kind: action
  command: "0x43 IRCC 0000000000000064"
- id: ir_program_description
  label: IR Program Description
  kind: action
  command: "0x43 IRCC 0000000000000065"
- id: ir_write_chapter
  label: IR Write Chapter
  kind: action
  command: "0x43 IRCC 0000000000000066"
- id: ir_trackid
  label: IR TrackID
  kind: action
  command: "0x43 IRCC 0000000000000067"
- id: ir_ten_key
  label: IR Ten Key
  kind: action
  command: "0x43 IRCC 0000000000000068"
- id: ir_applicast
  label: IR AppliCast
  kind: action
  command: "0x43 IRCC 0000000000000069"
- id: ir_activila
  label: IR acTVila
  kind: action
  command: "0x43 IRCC 0000000000000070"
- id: ir_delete_video
  label: IR Delete Video
  kind: action
  command: "0x43 IRCC 0000000000000071"
- id: ir_photo_frame
  label: IR Photo Frame
  kind: action
  command: "0x43 IRCC 0000000000000072"
- id: ir_tv_pause
  label: IR TV Pause
  kind: action
  command: "0x43 IRCC 0000000000000073"
- id: ir_keypad
  label: IR KeyPad
  kind: action
  command: "0x43 IRCC 0000000000000074"
- id: ir_media
  label: IR Media
  kind: action
  command: "0x43 IRCC 0000000000000075"
- id: ir_sync_menu
  label: IR Sync Menu
  kind: action
  command: "0x43 IRCC 0000000000000076"
- id: ir_forward
  label: IR Forward
  kind: action
  command: "0x43 IRCC 0000000000000077"
- id: ir_play
  label: IR Play
  kind: action
  command: "0x43 IRCC 0000000000000078"
- id: ir_rewind
  label: IR Rewind
  kind: action
  command: "0x43 IRCC 0000000000000079"
- id: ir_prev
  label: IR Prev
  kind: action
  command: "0x43 IRCC 0000000000000080"
- id: ir_stop
  label: IR Stop
  kind: action
  command: "0x43 IRCC 0000000000000081"
- id: ir_next
  label: IR Next
  kind: action
  command: "0x43 IRCC 0000000000000082"
- id: ir_rec
  label: IR Rec
  kind: action
  command: "0x43 IRCC 0000000000000083"
- id: ir_pause
  label: IR Pause
  kind: action
  command: "0x43 IRCC 0000000000000084"
- id: ir_eject
  label: IR Eject
  kind: action
  command: "0x43 IRCC 0000000000000085"
- id: ir_flash_plus
  label: IR Flash Plus
  kind: action
  command: "0x43 IRCC 0000000000000086"
- id: ir_flash_minus
  label: IR Flash Minus
  kind: action
  command: "0x43 IRCC 0000000000000087"
- id: ir_topmenu
  label: IR TopMenu
  kind: action
  command: "0x43 IRCC 0000000000000088"
- id: ir_popupmenu
  label: IR PopupMenu
  kind: action
  command: "0x43 IRCC 0000000000000089"
- id: ir_rakuraku_start
  label: IR Rakuraku Start
  kind: action
  command: "0x43 IRCC 0000000000000090"
- id: ir_one_touch_time_rec
  label: IR One Touch Time Rec
  kind: action
  command: "0x43 IRCC 0000000000000091"
- id: ir_one_touch_view
  label: IR One Touch View
  kind: action
  command: "0x43 IRCC 0000000000000092"
- id: ir_one_touch_rec
  label: IR One Touch Rec
  kind: action
  command: "0x43 IRCC 0000000000000093"
- id: ir_one_touch_stop
  label: IR One Touch Stop
  kind: action
  command: "0x43 IRCC 0000000000000094"
- id: ir_dux
  label: IR DUX
  kind: action
  command: "0x43 IRCC 0000000000000095"
- id: ir_football_mode
  label: IR Football Mode
  kind: action
  command: "0x43 IRCC 0000000000000096"
- id: ir_social
  label: IR Social
  kind: action
  command: "0x43 IRCC 0000000000000097"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: Table 4 POWR answer (0=Standby, 1=Active)
- id: audio_volume
  type: integer
  source: Table 4 VOLU answer; 16-byte ASCII decimal
- id: audio_mute
  type: enum
  values: [not_muted, muted]
  source: Table 4 AMUT answer (0=Not Muted, 1=Muted)
- id: channel
  type: string
  source: Table 4 CHNN answer; 16-byte MAJOR.MINOR preset
- id: triplet_channel
  type: string
  source: Table 4 TCHN answer; 16-byte hex triplet
- id: input_source
  type: string
  source: Table 4 ISRC answer; 16-byte source name (dvbt/dvbc/...)
- id: input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  source: Table 4 INPT answer
- id: picture_mute
  type: enum
  values: [disabled, enabled]
  source: Table 4 PMUT answer (0=Disabled, 1=Enabled)
- id: pip
  type: enum
  values: [disabled, enabled]
  source: Table 4 PIPI answer (0=Disabled, 1=Enabled)
- id: broadcast_address
  type: string
  source: Table 4 BADR answer; IPv4 address, '#' right-padded
- id: mac_address
  type: string
  source: Table 4 MADR answer; MAC address, '#' right-padded
```

## Events
```yaml
# Type 0x4E [N] Notify messages (Table 4)
- id: fire_power_change
  type: notify
  fourcc: POWR
  param: 0=powering off, 1=powering on
  source: Table 4 POWR notify
- id: fire_channel_change
  type: notify
  fourcc: CHNN
  param: 16-byte MAJOR.MINOR
  source: Table 4 CHNN notify
- id: fire_input_change
  type: notify
  fourcc: INPT
  param: input code (0=TV, 1=HDMI{n}, 2=SCART{n}, 3=Composite{n}, 4=Component{n}, 5=Screen Mirroring{n}, 6=PC RGB{n})
  source: Table 4 INPT notify
- id: fire_volume_change
  type: notify
  fourcc: VOLU
  param: 16-byte volume value
  source: Table 4 VOLU notify
- id: fire_mute_change
  type: notify
  fourcc: AMUT
  param: 0=unmuting, 1=muting
  source: Table 4 AMUT notify
- id: fire_pip_change
  type: notify
  fourcc: PIPI
  param: 0=PIP disabled, 1=PIP enabled
  source: Table 4 PIPI notify
- id: fire_picture_mute_change
  type: notify
  fourcc: PMUT
  param: 0=picture mute disabled, 1=enabled
  source: Table 4 PMUT notify
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- **Frame format:** All messages are exactly 24 bytes: header `0x2A 0x53` (2 B), type (1 B), Four-CC function (4 B ASCII), parameter (16 B), footer `0x0A` (LF, 1 B). Unused parameter bytes are filled with `'#'` (0x23) per source examples.
- **Connection lifecycle:** TCP connections are kept across requests but server disconnects after 30 s of client silence (source §2).
- **Enabling the protocol:** Per source §1, must enable `Settings > Network > Home Network Setup > IP Control > Simple IP Control` (Normal Mode) or `Hotel/Pro Mode > IP Control > Simple IP Control` (Pro Mode).
- **IRCC codes:** Table 5 defines 153 IR-like codes (0x00–0x97). Each is sent via the `setIrccCode` action with the corresponding 16-byte zero-padded ASCII hex parameter. Spec enumerates the 153 codes listed in source; codes outside the source's Table 5 range are not defined.
- **Channel format:** `setChannel` accepts MAJOR.MINOR preset in decimal ASCII; `setTripletChannel` accepts a hex triplet (transport stream / service / original network ID). Use the appropriate command for the available channel identifier.
- **Source caveat:** Source document is the generic Sony "Simple IP Control Protocol" v0.6 authored for BRAVIA 2014 models. The KE-XH8096 Series is presumed to retain this protocol based on its position in the same BRAVIA IP-control lineage and the family-sibling KD-XH8096 already using these commands. Direct KE-XH8096 protocol confirmation was not found in the source.
- **Connection-mode settings:** TV-side enable path and any required pre-shared key are not in this source; see Sony Pro BRAVIA Knowledge Center for Hotel/Pro Mode authentication if needed.

<!-- UNRESOLVED: firmware version compatibility for KE-XH8096 Series not stated in source. -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-10T01:42:40.577Z
last_checked_at: 2026-06-10T07:35:30.380Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:35:30.380Z
matched_actions: 132
action_count: 132
confidence: medium
summary: "Spec comprehensively covers all Sony Simple IP Control Protocol v0.6 commands documented in Table 4 and Table 5; every action and transport parameter verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the generic Sony Simple IP Control Protocol v0.6 (BRAVIA 2014 baseline). KE-XH8096 Series (2020) is presumed to retain compatibility; not directly confirmed in source."
- "source does not document any multi-step sequences"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility for KE-XH8096 Series not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
