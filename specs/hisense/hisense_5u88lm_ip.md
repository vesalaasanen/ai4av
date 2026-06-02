---
spec_id: admin/hisense-5u88lm
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5U88LM Control Spec"
manufacturer: HiSense
model_family: 5U88LM
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U88LM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - ltb.no
  - avw.co.nz
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
  - https://ltb.no/media/multicase/documents/hisense/dm66d/hcd_rs232_control_guide_v2.0.pdf
  - https://www.avw.co.nz/images/hisense/HISENSE_RS232_DOC.pdf
retrieved_at: 2026-05-04T09:18:03.090Z
last_checked_at: 2026-06-02T17:22:25.508Z
generated_at: 2026-06-02T17:22:25.508Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control not documented in source — only RS-232"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "power-on sequencing via RS-232 requires RS-232 Remote Power On setting to be enabled in Custom Install menu; source does not specify voltage/current/power specs"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:25.508Z
  matched_actions: 118
  action_count: 118
  confidence: medium
  summary: "All 118 spec action units (87 set-commands + 31 query feedbacks) match verbatim mnemonics in the source RS-232 command table; transport parameters confirmed; source command catalogue fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# HiSense 5U88LM Control Spec

## Summary
Prosumer TV supporting RS-232 serial control at 9600 baud, 8N1, no flow control. ASCII command protocol with fixed-length frame format (CLIENT ID + COMMAND + DATA + CHECKSUM + CR). No authentication required. IR discrete codes also documented but excluded from this spec.

<!-- UNRESOLVED: TCP/IP control not documented in source — only RS-232 -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "S{id}POWR0001{checksum}{CR}"
  notes: "Set POWR data=0001 to power on. Frame: S + 3-byte client ID + POWR + 0001 + checksum + 0x0D. Example broadcast: S ALL POWR0001."
  params: []

- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "S{id}POWR0000{checksum}{CR}"
  notes: "Set POWR data=0000 for standby."
  params: []

- id: set_input
  label: Set Input Source
  kind: action
  command: "S{id}INPT{data}{checksum}{CR}"
  notes: "INPT data values: 0000=cycle, 0001=TV, 0004=AV, 0003=Component, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4, 0006=VGA."
  params:
    - name: source
      type: enum
      values:
        - tv
        - av
        - component
        - hdmi1
        - hdmi2
        - hdmi3
        - hdmi4
        - vga

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "S{id}PMOD{data}{checksum}{CR}"
  notes: "PMOD data values: 0000=Standard, 0002=Vivid, 0003=EnergySaving, 0004=Theater, 0005=Game, 0006=Sport."
  params:
    - name: mode
      type: enum
      values:
        - standard
        - vivid
        - energy_saving
        - theater
        - game
        - sport

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "S{id}BRIT{value}{checksum}{CR}"
  notes: "BRIT data 0000-0100 (zero-padded 4 digits)."
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "S{id}CONT{value}{checksum}{CR}"
  notes: "CONT data 0000-0100."
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  command: "S{id}COLR{value}{checksum}{CR}"
  notes: "COLR data 0000-0100."
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_tint
  label: Set Tint
  kind: action
  command: "S{id}TINT{value}{checksum}{CR}"
  notes: "TINT data 0000-0100."
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "S{id}SHRP{value}{checksum}{CR}"
  notes: "SHRP data 0000-0020."
  params:
    - name: value
      type: integer
      range: [0, 20]

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "S{id}ASPT{data}{checksum}{CR}"
  notes: "ASPT data values: 0000=Auto, 0002=Normal, 0003=Zoom, 0004=Wide, 0005=Direct, 0006=1-to-1 pixel, 0007=Panoramic, 0008=Cinema."
  params:
    - name: ratio
      type: enum
      values:
        - auto
        - normal
        - zoom
        - wide
        - direct
        - 1to1
        - panoramic
        - cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  command: "S{id}OVSN{data}{checksum}{CR}"
  notes: "OVSN data values: 0000=On, 0002=Off."
  params:
    - name: state
      type: enum
      values: [on, off]

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  command: "S{id}RSTP1000{checksum}{CR}"
  params: []

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "S{id}CTEM{data}{checksum}{CR}"
  notes: "CTEM data values: 0000=High, 0002=Middle, 0003=Mid-Low, 0004=Low."
  params:
    - name: temp
      type: enum
      values:
        - high
        - middle
        - mid_low
        - low

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "S{id}BKLV{value}{checksum}{CR}"
  notes: "BKLV data 0000-0100."
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "S{id}AMOD{data}{checksum}{CR}"
  notes: "AMOD data values: 0000=Standard, 0002=Theater, 0003=Music, 0004=Speech, 0005=Late night."
  params:
    - name: mode
      type: enum
      values:
        - standard
        - theater
        - music
        - speech
        - late_night

- id: set_volume
  label: Set Volume
  kind: action
  command: "S{id}VOLM{value}{checksum}{CR}"
  notes: "VOLM data 0000-0100."
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_mute
  label: Set Mute
  kind: action
  command: "S{id}MUTE{data}{checksum}{CR}"
  notes: "MUTE data values: 0000=Off, 0001=On."
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  command: "S{id}ASPK{data}{checksum}{CR}"
  notes: "ASPK data values: 0000=Off, 0002=On."
  params:
    - name: state
      type: enum
      values: [on, off]

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  command: "S{id}RSTA2000{checksum}{CR}"
  params: []

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  command: "S{id}TUNR{data}{checksum}{CR}"
  notes: "TUNR data values: 0000=Antenna, 0002=Cable."
  params:
    - name: mode
      type: enum
      values: [antenna, cable]

- id: channel_up
  label: Channel Up
  kind: action
  command: "S{id}CHAN0001{checksum}{CR}"
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  command: "S{id}CHAN0000{checksum}{CR}"
  params: []

- id: auto_search
  label: Automatic Search
  kind: action
  command: "S{id}TSCN0001{checksum}{CR}"
  params: []

- id: set_caption_control
  label: Set Caption Control
  kind: action
  command: "S{id}CC##{data}{checksum}{CR}"
  notes: "CC## data values: 0000=Off, 0002=On, 0003=On when mute."
  params:
    - name: mode
      type: enum
      values: [off, on, on_when_mute]

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  command: "S{id}RSET9999{checksum}{CR}"
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "S{id}LANG{data}{checksum}{CR}"
  notes: "LANG data values: 0000=English, 0002=Español, 0003=Français."
  params:
    - name: lang
      type: enum
      values: [english, spanish, french]

- id: set_standby_led
  label: Set Standby LED
  kind: action
  command: "S{id}PLED{data}{checksum}{CR}"
  notes: "PLED data values: 0000=Off, 0002=On."
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_volume_lock
  label: Set Volume Control Lock
  kind: action
  command: "S{id}SVOL{data}{checksum}{CR}"
  notes: "SVOL data values: 0000=Locked, 0001=Last Volume, 0002=AC Reset, 0003=Standby Reset."
  params:
    - name: mode
      type: enum
      values: [locked, last_volume, ac_reset, standby_reset]

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  command: "S{id}VLFL{value}{checksum}{CR}"
  notes: "VLFL data 0000-0100."
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_remote_key
  label: Set Remote Key Mode
  kind: action
  command: "S{id}RMOT{data}{checksum}{CR}"
  notes: "RMOT data values: 0000=Enable, 0001=Disable, 0002=Partial."
  params:
    - name: mode
      type: enum
      values: [enable, disable, partial]

- id: set_panel_key
  label: Set Panel Key Mode
  kind: action
  command: "S{id}PANL{data}{checksum}{CR}"
  notes: "PANL data values: 0000=Enable, 0001=Disable."
  params:
    - name: mode
      type: enum
      values: [enable, disable]

- id: set_menu_access
  label: Set Menu Access
  kind: action
  command: "S{id}MENU{data}{checksum}{CR}"
  notes: "MENU data values: 0000=Enable, 0001=Disable."
  params:
    - name: state
      type: enum
      values: [enable, disable]

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  command: "S{id}AVMN{data}{checksum}{CR}"
  notes: "AVMN data values: 0000=Disable, 0001=Enable."
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  command: "S{id}OSD#{data}{checksum}{CR}"
  notes: "OSD# data values: 0000=Enable, 0001=Disable."
  params:
    - name: state
      type: enum
      values: [enable, disable]

- id: set_input_mode_lock
  label: Set Input Mode Lock
  kind: action
  command: "S{id}INPM{data}{checksum}{CR}"
  notes: "INPM data values: 0000=Locked, 0001=Selectable, 0002=AC Reset, 0003=Standby Reset."
  params:
    - name: mode
      type: enum
      values: [locked, selectable, ac_reset, standby_reset]

- id: set_power_on_input
  label: Set Power On Input
  kind: action
  command: "S{id}POIS{data}{checksum}{CR}"
  notes: "POIS data values: 0000=Last, 0001=Air, 0002=AV, 0003=Component, 0005=HDMI1, 0006=HDMI2, 0007=HDMI3, 0008=HDMI4, 0004=VGA."
  params:
    - name: source
      type: enum
      values:
        - last
        - air
        - av
        - component
        - hdmi1
        - hdmi2
        - hdmi3
        - hdmi4
        - vga

- id: enable_remote_power_on
  label: Enable RS-232 Remote Power On
  kind: action
  command: "S{id}PWRE0001{checksum}{CR}"
  params: []

- id: disable_remote_power_on
  label: Disable RS-232 Remote Power On
  kind: action
  command: "S{id}PWRE0000{checksum}{CR}"
  params: []

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  command: "S{id}PBTN{data}{checksum}{CR}"
  notes: "PBTN data values: 0000=AC Only, 0001=All."
  params:
    - name: mode
      type: enum
      values: [ac_only, all]

- id: bttn_digit_0
  label: Button Simulate BTTN1000 Digit 0
  kind: action
  command: "S{id}BTTN1000{checksum}{CR}"
  params: []

- id: bttn_digit_1
  label: Button Simulate BTTN1001 Digit 1
  kind: action
  command: "S{id}BTTN1001{checksum}{CR}"
  params: []

- id: bttn_digit_2
  label: Button Simulate BTTN1002 Digit 2
  kind: action
  command: "S{id}BTTN1002{checksum}{CR}"
  params: []

- id: bttn_digit_3
  label: Button Simulate BTTN1003 Digit 3
  kind: action
  command: "S{id}BTTN1003{checksum}{CR}"
  params: []

- id: bttn_digit_4
  label: Button Simulate BTTN1004 Digit 4
  kind: action
  command: "S{id}BTTN1004{checksum}{CR}"
  params: []

- id: bttn_digit_5
  label: Button Simulate BTTN1005 Digit 5
  kind: action
  command: "S{id}BTTN1005{checksum}{CR}"
  params: []

- id: bttn_digit_6
  label: Button Simulate BTTN1006 Digit 6
  kind: action
  command: "S{id}BTTN1006{checksum}{CR}"
  params: []

- id: bttn_digit_7
  label: Button Simulate BTTN1007 Digit 7
  kind: action
  command: "S{id}BTTN1007{checksum}{CR}"
  params: []

- id: bttn_digit_8
  label: Button Simulate BTTN1008 Digit 8
  kind: action
  command: "S{id}BTTN1008{checksum}{CR}"
  params: []

- id: bttn_digit_9
  label: Button Simulate BTTN1009 Digit 9
  kind: action
  command: "S{id}BTTN1009{checksum}{CR}"
  params: []

- id: bttn_dash
  label: Button Simulate BTTN1010 Dash
  kind: action
  command: "S{id}BTTN1010{checksum}{CR}"
  params: []

- id: bttn_power
  label: Button Simulate BTTN1012 Power
  kind: action
  command: "S{id}BTTN1012{checksum}{CR}"
  params: []

- id: bttn_frw
  label: Button Simulate BTTN1015 FRW
  kind: action
  command: "S{id}BTTN1015{checksum}{CR}"
  params: []

- id: bttn_play
  label: Button Simulate BTTN1016 Play
  kind: action
  command: "S{id}BTTN1016{checksum}{CR}"
  params: []

- id: bttn_ffw
  label: Button Simulate BTTN1017 FFW
  kind: action
  command: "S{id}BTTN1017{checksum}{CR}"
  params: []

- id: bttn_pause
  label: Button Simulate BTTN1018 Pause
  kind: action
  command: "S{id}BTTN1018{checksum}{CR}"
  params: []

- id: bttn_previous
  label: Button Simulate BTTN1019 Previous
  kind: action
  command: "S{id}BTTN1019{checksum}{CR}"
  params: []

- id: bttn_stop
  label: Button Simulate BTTN1020 Stop
  kind: action
  command: "S{id}BTTN1020{checksum}{CR}"
  params: []

- id: bttn_next
  label: Button Simulate BTTN1021 Next
  kind: action
  command: "S{id}BTTN1021{checksum}{CR}"
  params: []

- id: bttn_himedia
  label: Button Simulate BTTN1023 HiMedia Media Player
  kind: action
  command: "S{id}BTTN1023{checksum}{CR}"
  params: []

- id: bttn_sleep
  label: Button Simulate BTTN1024 Sleep
  kind: action
  command: "S{id}BTTN1024{checksum}{CR}"
  params: []

- id: bttn_cc
  label: Button Simulate BTTN1027 CC
  kind: action
  command: "S{id}BTTN1027{checksum}{CR}"
  params: []

- id: bttn_mute
  label: Button Simulate BTTN1031 Mute
  kind: action
  command: "S{id}BTTN1031{checksum}{CR}"
  params: []

- id: bttn_vol_down
  label: Button Simulate BTTN1032 Volume Down
  kind: action
  command: "S{id}BTTN1032{checksum}{CR}"
  params: []

- id: bttn_vol_up
  label: Button Simulate BTTN1033 Volume Up
  kind: action
  command: "S{id}BTTN1033{checksum}{CR}"
  params: []

- id: bttn_ch_up
  label: Button Simulate BTTN1034 Channel Up
  kind: action
  command: "S{id}BTTN1034{checksum}{CR}"
  params: []

- id: bttn_ch_down
  label: Button Simulate BTTN1035 Channel Down
  kind: action
  command: "S{id}BTTN1035{checksum}{CR}"
  params: []

- id: bttn_input
  label: Button Simulate BTTN1036 Input
  kind: action
  command: "S{id}BTTN1036{checksum}{CR}"
  params: []

- id: bttn_menu
  label: Button Simulate BTTN1038 Menu
  kind: action
  command: "S{id}BTTN1038{checksum}{CR}"
  params: []

- id: bttn_hismart
  label: Button Simulate BTTN1039 Connected Home HiSmart
  kind: action
  command: "S{id}BTTN1039{checksum}{CR}"
  params: []

- id: bttn_ok
  label: Button Simulate BTTN1040 OK Enter
  kind: action
  command: "S{id}BTTN1040{checksum}{CR}"
  params: []

- id: bttn_up
  label: Button Simulate BTTN1041 Up Arrow
  kind: action
  command: "S{id}BTTN1041{checksum}{CR}"
  params: []

- id: bttn_down
  label: Button Simulate BTTN1042 Down Arrow
  kind: action
  command: "S{id}BTTN1042{checksum}{CR}"
  params: []

- id: bttn_left
  label: Button Simulate BTTN1043 Left Arrow
  kind: action
  command: "S{id}BTTN1043{checksum}{CR}"
  params: []

- id: bttn_right
  label: Button Simulate BTTN1044 Right Arrow
  kind: action
  command: "S{id}BTTN1044{checksum}{CR}"
  params: []

- id: bttn_back
  label: Button Simulate BTTN1045 Back
  kind: action
  command: "S{id}BTTN1045{checksum}{CR}"
  params: []

- id: bttn_exit
  label: Button Simulate BTTN1046 Exit
  kind: action
  command: "S{id}BTTN1046{checksum}{CR}"
  params: []

- id: bttn_red
  label: Button Simulate BTTN1050 Red Button
  kind: action
  command: "S{id}BTTN1050{checksum}{CR}"
  params: []

- id: bttn_green
  label: Button Simulate BTTN1051 Green Button
  kind: action
  command: "S{id}BTTN1051{checksum}{CR}"
  params: []

- id: bttn_blue
  label: Button Simulate BTTN1052 Blue Button
  kind: action
  command: "S{id}BTTN1052{checksum}{CR}"
  params: []

- id: bttn_yellow
  label: Button Simulate BTTN1053 Yellow Button
  kind: action
  command: "S{id}BTTN1053{checksum}{CR}"
  params: []

- id: bttn_mts_sap
  label: Button Simulate BTTN1054 MTS SAP
  kind: action
  command: "S{id}BTTN1054{checksum}{CR}"
  params: []

- id: bttn_live_tv
  label: Button Simulate BTTN1055 Live TV
  kind: action
  command: "S{id}BTTN1055{checksum}{CR}"
  params: []

- id: set_tv_speaker_mode
  label: Set TV Speaker Mode SPKM
  kind: action
  command: "S{id}SPKM{data}{checksum}{CR}"
  notes: "SPKM data values: 0000=Speaker, 0001=Off, 0002=ARC First."
  params:
    - name: mode
      type: enum
      values: [speaker, off, arc_first]

- id: set_b2b_mode
  label: Set B2B Function Mode B2BM
  kind: action
  command: "S{id}B2BM{data}{checksum}{CR}"
  notes: "B2BM data values: 0000=Enable, 0001=Disable."
  params:
    - name: state
      type: enum
      values: [enable, disable]

- id: set_usb_behavior
  label: Set USB Behavior USBM
  kind: action
  command: "S{id}USBM{data}{checksum}{CR}"
  notes: "USBM data values: 0000=Home, 0001=B2B."
  params:
    - name: mode
      type: enum
      values: [home, b2b]

- id: set_pixel_shifting
  label: Set Pixel Shifting PSHF
  kind: action
  command: "S{id}PSHF{data}{checksum}{CR}"
  notes: "PSHF data values: 0000=Off, 0001=On."
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_max_volume_level
  label: Set Volume Range MAVL
  kind: action
  command: "S{id}MAVL{value}{checksum}{CR}"
  notes: "MAVL data 0000-0100."
  params:
    - name: value
      type: integer
      range: [0, 100]
```

## Feedbacks
```yaml
- id: power_state
  query_command: "Q{id}POWR????{checksum}{CR}"
  type: enum
  values: [on, standby]

- id: current_input
  query_command: "Q{id}INPT????{checksum}{CR}"
  type: enum
  values:
    - tv
    - av
    - component
    - hdmi1
    - hdmi2
    - hdmi3
    - hdmi4
    - vga

- id: current_picture_mode
  query_command: "Q{id}PMOD????{checksum}{CR}"
  type: enum
  values:
    - standard
    - vivid
    - energy_saving
    - theater
    - game
    - sport

- id: brightness_value
  query_command: "Q{id}BRIT????{checksum}{CR}"
  type: integer
  range: [0, 100]

- id: contrast_value
  query_command: "Q{id}CONT????{checksum}{CR}"
  type: integer
  range: [0, 100]

- id: color_saturation_value
  query_command: "Q{id}COLR????{checksum}{CR}"
  type: integer
  range: [0, 100]

- id: tint_value
  query_command: "Q{id}TINT????{checksum}{CR}"
  type: integer
  range: [0, 100]

- id: sharpness_value
  query_command: "Q{id}SHRP????{checksum}{CR}"
  type: integer
  range: [0, 20]

- id: current_aspect_ratio
  query_command: "Q{id}ASPT????{checksum}{CR}"
  type: enum
  values:
    - auto
    - normal
    - zoom
    - wide
    - direct
    - 1to1
    - panoramic
    - cinema

- id: overscan_state
  query_command: "Q{id}OVSN????{checksum}{CR}"
  type: enum
  values: [on, off]

- id: current_color_temp
  query_command: "Q{id}CTEM????{checksum}{CR}"
  type: enum
  values:
    - high
    - middle
    - mid_low
    - low

- id: backlight_value
  query_command: "Q{id}BKLV????{checksum}{CR}"
  type: integer
  range: [0, 100]

- id: current_sound_mode
  query_command: "Q{id}AMOD????{checksum}{CR}"
  type: enum
  values:
    - standard
    - theater
    - music
    - speech
    - late_night

- id: volume_value
  query_command: "Q{id}VOLM????{checksum}{CR}"
  type: integer
  range: [0, 100]

- id: mute_state
  query_command: "Q{id}MUTE????{checksum}{CR}"
  type: enum
  values: [on, off]

- id: tv_speaker_state
  query_command: "Q{id}ASPK????{checksum}{CR}"
  type: enum
  values: [on, off]

- id: tuner_mode
  query_command: "Q{id}TUNR????{checksum}{CR}"
  type: enum
  values: [antenna, cable]

- id: caption_control_mode
  query_command: "Q{id}CC##????{checksum}{CR}"
  type: enum
  values: [off, on, on_when_mute]

- id: osd_language
  query_command: "Q{id}LANG????{checksum}{CR}"
  type: enum
  values: [english, spanish, french]

- id: standby_led_state
  query_command: "Q{id}PLED????{checksum}{CR}"
  type: enum
  values: [on, off]

- id: volume_control_mode
  query_command: "Q{id}SVOL????{checksum}{CR}"
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]

- id: volume_locked_level
  query_command: "Q{id}VLFL????{checksum}{CR}"
  type: integer
  range: [0, 100]

- id: remote_key_mode
  query_command: "Q{id}RMOT????{checksum}{CR}"
  type: enum
  values: [enable, disable, partial]

- id: panel_key_mode
  query_command: "Q{id}PANL????{checksum}{CR}"
  type: enum
  values: [enable, disable]

- id: menu_access_state
  query_command: "Q{id}MENU????{checksum}{CR}"
  type: enum
  values: [enable, disable]

- id: av_setting_menu_state
  query_command: "Q{id}AVMN????{checksum}{CR}"
  type: enum
  values: [disable, enable]

- id: osd_mode_state
  query_command: "Q{id}OSD#????{checksum}{CR}"
  type: enum
  values: [enable, disable]

- id: input_mode_lock_mode
  query_command: "Q{id}INPM????{checksum}{CR}"
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]

- id: power_on_input_source
  query_command: "Q{id}POIS????{checksum}{CR}"
  type: enum
  values:
    - last
    - air
    - av
    - component
    - hdmi1
    - hdmi2
    - hdmi3
    - hdmi4
    - vga

- id: remote_power_on_enabled
  query_command: "Q{id}PWRE????{checksum}{CR}"
  type: boolean

- id: power_off_control_mode
  query_command: "Q{id}PBTN????{checksum}{CR}"
  type: enum
  values: [ac_only, all]
```

## Variables
```yaml
volume_range:
  type: integer
  range: [0, 100]
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```
<!-- UNRESOLVED: power-on sequencing via RS-232 requires RS-232 Remote Power On setting to be enabled in Custom Install menu; source does not specify voltage/current/power specs -->

## Notes
Protocol is case-sensitive ASCII. Command frame: `S{CLIENT ID(3)}{COMMAND(4)}{DATA(4)}{CHECKSUM(1)}{CR}`. Query frame: `Q{CLIENT ID(3)}{COMMAND(4)}????{CHECKSUM(1)}{CR}`. Client ID for Smart TV is last 3 bytes of Ethernet MAC address; broadcast uses `ALL`. Acknowledgements: `OKAY`, `EROR`, `WAIT`. Checksum is 8-bit ensuring full frame sums to zero. RS-232 port must be enabled via Custom Install menu (7-3-1-0 remote code sequence) before serial control works. Power-on via RS-232 requires `Power On Command` setting enabled in the same menu. No authentication, no login required.

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - ltb.no
  - avw.co.nz
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
  - https://ltb.no/media/multicase/documents/hisense/dm66d/hcd_rs232_control_guide_v2.0.pdf
  - https://www.avw.co.nz/images/hisense/HISENSE_RS232_DOC.pdf
retrieved_at: 2026-05-04T09:18:03.090Z
last_checked_at: 2026-06-02T17:22:25.508Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:25.508Z
matched_actions: 118
action_count: 118
confidence: medium
summary: "All 118 spec action units (87 set-commands + 31 query feedbacks) match verbatim mnemonics in the source RS-232 command table; transport parameters confirmed; source command catalogue fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control not documented in source — only RS-232"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "power-on sequencing via RS-232 requires RS-232 Remote Power On setting to be enabled in Custom Install menu; source does not specify voltage/current/power specs"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
