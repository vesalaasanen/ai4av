---
spec_id: admin/hisense-75u67kua
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 75U67KUA Control Spec"
manufacturer: HiSense
model_family: 75U67KUA
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 75U67KUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-06-02T22:08:01.933Z
last_checked_at: 2026-06-02T22:08:01.933Z
generated_at: 2026-06-02T22:08:01.933Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific command support matrix not stated in source"
  - "firmware version compatibility, network control (TCP/IP) interface, error recovery / fault behavior not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:01.933Z
  matched_actions: 165
  action_count: 165
  confidence: medium
  summary: "All 165 spec actions traced to source (dip-safe re-verify). (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 75U67KUA Control Spec

## Summary

Spec covers RS-232 (DB9, 9600/8N1, ASCII) and discrete IR (NEC-format, 04FB manufacturer code) control for the Hisense Prosumer TV line. The 75U67KUA shares the Prosumer protocol family documented in the source; per the manual, individual models may not implement every command — verify against the model User Manual. RS-232 must be enabled in the Custom Install menu (Quick Settings + "7 3 1 0" → Enable).

<!-- UNRESOLVED: model-specific command support matrix not stated in source -->

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

Frame format (ASCII mode, 14 bytes): `S` + `client_id(3 hex)` + `COMMAND(4)` + `DATA(4)` + `checksum(1)` + `Cr`. `client_id` is `ALL` for broadcast or last 3 bytes of MAC. Checksum is the 8-bit two's-complement such that the sum of all bytes (including checksum) equals zero. Termination is `0x0D`. Query: `Q` replaces `S`, DATA is `????`. Acknowledgement: `[client_id]:OKAY[DATA][checksum]\r` (or `EROR`, `WAIT`). Protocol is case-sensitive.

IR is also supported (separate link, no transport parameters) — IR codes listed in the IrCodes section.

## Traits

```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions

```yaml
- id: pwre_disable
  label: Disable RS-232 Remote Power On
  kind: action
  command: PWRE0000

- id: pwre_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: PWRE0001

- id: pwre_query
  label: Query Power On Command Setting
  kind: query
  command: PWRE????

- id: powr_standby
  label: Power Standby
  kind: action
  command: POWR0000

- id: powr_on
  label: Power On
  kind: action
  command: POWR0001

- id: inpt_cycle
  label: Change Input Signal (cycle)
  kind: action
  command: INPT0000

- id: inpt_tv
  label: Set Input TV
  kind: action
  command: INPT0001

- id: inpt_component
  label: Set Input Component
  kind: action
  command: INPT0003

- id: inpt_av
  label: Set Input AV
  kind: action
  command: INPT0004

- id: inpt_vga
  label: Set Input VGA
  kind: action
  command: INPT0006

- id: inpt_hdmi1
  label: Set Input HDMI1
  kind: action
  command: INPT0009

- id: inpt_hdmi2
  label: Set Input HDMI2
  kind: action
  command: INPT0010

- id: inpt_hdmi3
  label: Set Input HDMI3
  kind: action
  command: INPT0011

- id: inpt_hdmi4
  label: Set Input HDMI4
  kind: action
  command: INPT0012

- id: inpt_query
  label: Query Current Input Source
  kind: query
  command: INPT????

- id: pmod_standard
  label: Set Picture Mode Standard
  kind: action
  command: PMOD0000

- id: pmod_vivid
  label: Set Picture Mode Vivid
  kind: action
  command: PMOD0002

- id: pmod_energy
  label: Set Picture Mode EnergySaving
  kind: action
  command: PMOD0003

- id: pmod_theater
  label: Set Picture Mode Theater
  kind: action
  command: PMOD0004

- id: pmod_game
  label: Set Picture Mode Game
  kind: action
  command: PMOD0005

- id: pmod_sport
  label: Set Picture Mode Sport
  kind: action
  command: PMOD0006

- id: pmod_query
  label: Query Picture Mode
  kind: query
  command: PMOD????

- id: brit_set
  label: Set Brightness
  kind: action
  command: BRIT{value}
  params:
    - name: value
      type: integer
      description: Brightness value 0000-0100

- id: brit_query
  label: Query Brightness
  kind: query
  command: BRIT????

- id: cont_set
  label: Set Contrast
  kind: action
  command: CONT{value}
  params:
    - name: value
      type: integer
      description: Contrast value 0000-0100

- id: cont_query
  label: Query Contrast
  kind: query
  command: CONT????

- id: colr_set
  label: Set Color Saturation
  kind: action
  command: COLR{value}
  params:
    - name: value
      type: integer
      description: Color saturation 0000-0100

- id: colr_query
  label: Query Color Saturation
  kind: query
  command: COLR????

- id: tint_set
  label: Set Tint
  kind: action
  command: TINT{value}
  params:
    - name: value
      type: integer
      description: Tint value 0000-0100

- id: tint_query
  label: Query Tint
  kind: query
  command: TINT????

- id: shrp_set
  label: Set Sharpness
  kind: action
  command: SHRP{value}
  params:
    - name: value
      type: integer
      description: Sharpness value 0000-0020

- id: shrp_query
  label: Query Sharpness
  kind: query
  command: SHRP????

- id: aspt_auto
  label: Set Aspect Ratio Auto
  kind: action
  command: ASPT0000

- id: aspt_normal
  label: Set Aspect Ratio Normal
  kind: action
  command: ASPT0002

- id: aspt_zoom
  label: Set Aspect Ratio Zoom
  kind: action
  command: ASPT0003

- id: aspt_wide
  label: Set Aspect Ratio Wide
  kind: action
  command: ASPT0004

- id: aspt_direct
  label: Set Aspect Ratio Direct
  kind: action
  command: ASPT0005

- id: aspt_1to1
  label: Set Aspect Ratio 1-to-1 pixel map
  kind: action
  command: ASPT0006

- id: aspt_panoramic
  label: Set Aspect Ratio Panoramic
  kind: action
  command: ASPT0007

- id: aspt_cinema
  label: Set Aspect Ratio Cinema
  kind: action
  command: ASPT0008

- id: aspt_query
  label: Query Aspect Ratio
  kind: query
  command: ASPT????

- id: ovsn_on
  label: Overscan On
  kind: action
  command: OVSN0000

- id: ovsn_off
  label: Overscan Off
  kind: action
  command: OVSN0002

- id: ovsn_query
  label: Query Overscan
  kind: query
  command: OVSN????

- id: rstp_picture
  label: Reset Picture Settings
  kind: action
  command: RSTP1000

- id: ctem_high
  label: Set Color Temp High
  kind: action
  command: CTEM0000

- id: ctem_middle
  label: Set Color Temp Middle
  kind: action
  command: CTEM0002

- id: ctem_midlow
  label: Set Color Temp Mid-Low
  kind: action
  command: CTEM0003

- id: ctem_low
  label: Set Color Temp Low
  kind: action
  command: CTEM0004

- id: ctem_query
  label: Query Color Temp
  kind: query
  command: CTEM????

- id: bklv_set
  label: Set Backlight
  kind: action
  command: BKLV{value}
  params:
    - name: value
      type: integer
      description: Backlight value 0000-0100

- id: bklv_query
  label: Query Backlight
  kind: query
  command: BKLV????

- id: amod_standard
  label: Set Sound Mode Standard
  kind: action
  command: AMOD0000

- id: amod_theater
  label: Set Sound Mode Theater
  kind: action
  command: AMOD0002

- id: amod_music
  label: Set Sound Mode Music
  kind: action
  command: AMOD0003

- id: amod_speech
  label: Set Sound Mode Speech
  kind: action
  command: AMOD0004

- id: amod_late
  label: Set Sound Mode Late night
  kind: action
  command: AMOD0005

- id: amod_query
  label: Query Sound Mode
  kind: query
  command: AMOD????

- id: rsta_audio
  label: Reset Audio Settings
  kind: action
  command: RSTA2000

- id: volm_set
  label: Set Volume
  kind: action
  command: VOLM{value}
  params:
    - name: value
      type: integer
      description: Volume 0000-0100

- id: volm_query
  label: Query Volume
  kind: query
  command: VOLM????

- id: mute_off
  label: Mute Off
  kind: action
  command: MUTE0000

- id: mute_on
  label: Mute On
  kind: action
  command: MUTE0001

- id: mute_query
  label: Query Mute Status
  kind: query
  command: MUTE????

- id: aspk_off
  label: Set TV Speaker Off
  kind: action
  command: ASPK0000

- id: aspk_on
  label: Set TV Speaker On
  kind: action
  command: ASPK0002

- id: aspk_query
  label: Query TV Speaker
  kind: query
  command: ASPK????

- id: tunr_antenna
  label: Set Tuner Mode Antenna
  kind: action
  command: TUNR0000

- id: tunr_cable
  label: Set Tuner Mode Cable
  kind: action
  command: TUNR0002

- id: tunr_query
  label: Query Tuner Mode
  kind: query
  command: TUNR????

- id: tscn_auto
  label: Automatic Channel Search
  kind: action
  command: TSCN0001

- id: chan_down
  label: Channel Down
  kind: action
  command: CHAN0000

- id: chan_up
  label: Channel Up
  kind: action
  command: CHAN0001

- id: cc_off
  label: Closed Caption Off
  kind: action
  command: "CC##0000"

- id: cc_on
  label: Closed Caption On
  kind: action
  command: "CC##0002"

- id: cc_on_mute
  label: Closed Caption On when Mute
  kind: action
  command: "CC##0003"

- id: cc_query
  label: Query Closed Caption
  kind: query
  command: "CC##????"

- id: rset_factory
  label: Restore Factory Settings
  kind: action
  command: RSET9999

- id: lang_english
  label: Set OSD Language English
  kind: action
  command: LANG0000

- id: lang_spanish
  label: Set OSD Language Espanol
  kind: action
  command: LANG0002

- id: lang_french
  label: Set OSD Language Francais
  kind: action
  command: LANG0003

- id: lang_query
  label: Query OSD Language
  kind: query
  command: LANG????

- id: pled_off
  label: Standby LED Off
  kind: action
  command: PLED0000

- id: pled_on
  label: Standby LED On
  kind: action
  command: PLED0002

- id: pled_query
  label: Query Standby LED
  kind: query
  command: PLED????

- id: pbtn_ac_only
  label: Power Off Control AC Only
  kind: action
  command: PBTN0000

- id: pbtn_all
  label: Power Off Control All
  kind: action
  command: PBTN0001

- id: pbtn_query
  label: Query Power Off Control Mode
  kind: query
  command: PBTN????

- id: mavl_set
  label: Set Volume Range
  kind: action
  command: MAVL{value}
  params:
    - name: value
      type: integer
      description: Volume range 0000-0100

- id: mavl_query
  label: Query Volume Range
  kind: query
  command: MAVL????

- id: svol_locked
  label: Set Volume Control Locked
  kind: action
  command: SVOL0000

- id: svol_last
  label: Set Volume Control Last Volume
  kind: action
  command: SVOL0001

- id: svol_ac_reset
  label: Set Volume Control AC Reset
  kind: action
  command: SVOL0002

- id: svol_standby_reset
  label: Set Volume Control Standby Reset
  kind: action
  command: SVOL0003

- id: svol_query
  label: Query Volume Control
  kind: query
  command: SVOL????

- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: VLFL{value}
  params:
    - name: value
      type: integer
      description: Volume locked level 0000-0100

- id: vlfl_query
  label: Query Volume Locked Level
  kind: query
  command: VLFL????

- id: rmot_enable
  label: Set Remote Key Enable
  kind: action
  command: RMOT0000

- id: rmot_disable
  label: Set Remote Key Disable
  kind: action
  command: RMOT0001

- id: rmot_partial
  label: Set Remote Key Partial
  kind: action
  command: RMOT0002

- id: rmot_query
  label: Query Remote Key
  kind: query
  command: RMOT????

- id: panl_enable
  label: Set Panel Key Enable
  kind: action
  command: PANL0000

- id: panl_disable
  label: Set Panel Key Disable
  kind: action
  command: PANL0001

- id: panl_query
  label: Query Panel Key
  kind: query
  command: PANL????

- id: menu_enable
  label: Set Menu Access Enable
  kind: action
  command: MENU0000

- id: menu_disable
  label: Set Menu Access Disable
  kind: action
  command: MENU0001

- id: menu_query
  label: Query Menu Access
  kind: query
  command: MENU????

- id: avmn_disable
  label: Set AV Setting Menu Disable
  kind: action
  command: AVMN0000

- id: avmn_enable
  label: Set AV Setting Menu Enable
  kind: action
  command: AVMN0001

- id: avmn_query
  label: Query AV Setting Menu
  kind: query
  command: AVMN????

- id: osd_enable
  label: Set OSD Mode Enable
  kind: action
  command: "OSD#0000"

- id: osd_disable
  label: Set OSD Mode Disable
  kind: action
  command: "OSD#0001"

- id: osd_query
  label: Query OSD Mode
  kind: query
  command: "OSD#????"

- id: inpm_locked
  label: Set Input Mode Locked
  kind: action
  command: INPM0000

- id: inpm_selectable
  label: Set Input Mode Selectable
  kind: action
  command: INPM0001

- id: inpm_ac_reset
  label: Set Input Mode AC Reset
  kind: action
  command: INPM0002

- id: inpm_standby_reset
  label: Set Input Mode Standby Reset
  kind: action
  command: INPM0003

- id: inpm_query
  label: Query Input Mode
  kind: query
  command: INPM????

- id: pois_last
  label: Set Power On Input Last
  kind: action
  command: POIS0000

- id: pois_air
  label: Set Power On Input Air
  kind: action
  command: POIS0001

- id: pois_av
  label: Set Power On Input AV
  kind: action
  command: POIS0002

- id: pois_component
  label: Set Power On Input Component
  kind: action
  command: POIS0003

- id: bttn_ch_plus
  label: Simulate Remote CH+
  kind: action
  command: BTTN1034

- id: bttn_ch_minus
  label: Simulate Remote CH-
  kind: action
  command: BTTN1035

- id: bttn_vol_minus
  label: Simulate Remote VOL-
  kind: action
  command: BTTN1032

- id: bttn_vol_plus
  label: Simulate Remote VOL+
  kind: action
  command: BTTN1033

- id: bttn_back
  label: Simulate Remote BACK
  kind: action
  command: BTTN1045

- id: bttn_power
  label: Simulate Remote POWER
  kind: action
  command: BTTN1012

- id: bttn_mute
  label: Simulate Remote MUTE
  kind: action
  command: BTTN1031

- id: bttn_dash
  label: Simulate Remote DASH
  kind: action
  command: BTTN1010

- id: bttn_input
  label: Simulate Remote INPUT
  kind: action
  command: BTTN1036

- id: bttn_media
  label: Simulate Remote HiMedia
  kind: action
  command: BTTN1023

- id: bttn_digit_0
  label: Simulate Remote Digit 0
  kind: action
  command: BTTN1000

- id: bttn_digit_1
  label: Simulate Remote Digit 1
  kind: action
  command: BTTN1001

- id: bttn_digit_2
  label: Simulate Remote Digit 2
  kind: action
  command: BTTN1002

- id: bttn_digit_3
  label: Simulate Remote Digit 3
  kind: action
  command: BTTN1003

- id: bttn_digit_4
  label: Simulate Remote Digit 4
  kind: action
  command: BTTN1004

- id: bttn_digit_5
  label: Simulate Remote Digit 5
  kind: action
  command: BTTN1005

- id: bttn_digit_6
  label: Simulate Remote Digit 6
  kind: action
  command: BTTN1006

- id: bttn_digit_7
  label: Simulate Remote Digit 7
  kind: action
  command: BTTN1007

- id: bttn_digit_8
  label: Simulate Remote Digit 8
  kind: action
  command: BTTN1008

- id: bttn_digit_9
  label: Simulate Remote Digit 9
  kind: action
  command: BTTN1009

- id: bttn_sleep
  label: Simulate Remote SLEEP
  kind: action
  command: BTTN1024

- id: bttn_mts
  label: Simulate Remote MTS/SAP
  kind: action
  command: BTTN1054

- id: bttn_livetv
  label: Simulate Remote Live TV
  kind: action
  command: BTTN1055

- id: bttn_pause
  label: Simulate Remote PAUSE
  kind: action
  command: BTTN1018

- id: bttn_play
  label: Simulate Remote PLAY
  kind: action
  command: BTTN1016

- id: bttn_menu
  label: Simulate Remote MENU
  kind: action
  command: BTTN1038

- id: bttn_exit
  label: Simulate Remote EXIT
  kind: action
  command: BTTN1046

- id: bttn_stop
  label: Simulate Remote STOP
  kind: action
  command: BTTN1020

- id: bttn_frw
  label: Simulate Remote FRW
  kind: action
  command: BTTN1015

- id: bttn_cc
  label: Simulate Remote CC
  kind: action
  command: BTTN1027

- id: bttn_red
  label: Simulate Remote Red button
  kind: action
  command: BTTN1050

- id: bttn_green
  label: Simulate Remote Green button
  kind: action
  command: BTTN1051

- id: bttn_yellow
  label: Simulate Remote Yellow button
  kind: action
  command: BTTN1053

- id: bttn_blue
  label: Simulate Remote Blue button
  kind: action
  command: BTTN1052

- id: bttn_up
  label: Simulate Remote UP
  kind: action
  command: BTTN1041

- id: bttn_down
  label: Simulate Remote DOWN
  kind: action
  command: BTTN1042

- id: bttn_left
  label: Simulate Remote LEFT
  kind: action
  command: BTTN1043

- id: bttn_right
  label: Simulate Remote RIGHT
  kind: action
  command: BTTN1044

- id: bttn_ok
  label: Simulate Remote OK/ENTER
  kind: action
  command: BTTN1040

- id: bttn_ffw
  label: Simulate Remote FFW
  kind: action
  command: BTTN1017

- id: bttn_previous
  label: Simulate Remote PREVIOUS
  kind: action
  command: BTTN1019

- id: bttn_next
  label: Simulate Remote NEXT
  kind: action
  command: BTTN1021

- id: bttn_connected_home
  label: Simulate Remote HiSmart
  kind: action
  command: BTTN1039
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  values: [on, standby]
  source: POWR query

- id: input_source
  type: enum
  values: [tv, component, av, vga, hdmi1, hdmi2, hdmi3, hdmi4]
  source: INPT query

- id: picture_mode
  type: enum
  values: [standard, vivid, energy_saving, theater, game, sport]
  source: PMOD query

- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, 1to1, panoramic, cinema]
  source: ASPT query

- id: overscan
  type: enum
  values: [on, off]
  source: OVSN query

- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]
  source: CTEM query

- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]
  source: AMOD query

- id: mute
  type: enum
  values: [on, off]
  source: MUTE query

- id: tv_speaker
  type: enum
  values: [on, off]
  source: ASPK query

- id: tuner_mode
  type: enum
  values: [antenna, cable]
  source: TUNR query

- id: closed_caption
  type: enum
  values: [off, on, on_when_mute]
  source: CC query

- id: osd_language
  type: enum
  values: [english, spanish, french]
  source: LANG query

- id: standby_led
  type: enum
  values: [off, on]
  source: PLED query

- id: power_off_mode
  type: enum
  values: [ac_only, all]
  source: PBTN query

- id: remote_key
  type: enum
  values: [enable, disable, partial]
  source: RMOT query

- id: panel_key
  type: enum
  values: [enable, disable]
  source: PANL query

- id: menu_access
  type: enum
  values: [enable, disable]
  source: MENU query

- id: av_menu
  type: enum
  values: [disable, enable]
  source: AVMN query

- id: osd_mode
  type: enum
  values: [enable, disable]
  source: OSD query

- id: input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
  source: INPM query
```

## Variables

```yaml
- id: brightness
  type: integer
  range: 0-100
  command: BRIT

- id: contrast
  type: integer
  range: 0-100
  command: CONT

- id: color_saturation
  type: integer
  range: 0-100
  command: COLR

- id: tint
  type: integer
  range: 0-100
  command: TINT

- id: sharpness
  type: integer
  range: 0-20
  command: SHRP

- id: volume
  type: integer
  range: 0-100
  command: VOLM

- id: backlight
  type: integer
  range: 0-100
  command: BKLV

- id: volume_range_max
  type: integer
  range: 0-100
  command: MAVL

- id: volume_locked_level
  type: integer
  range: 0-100
  command: VLFL
```

## Events

```yaml
[]
```

## Macros

```yaml
[]
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
```

## IrCodes

Discrete IR codes from the source. Format: NEC protocol, manufacturer code 04FB. Each entry is a single command-bearing row from the source's IR function table.

```yaml
- id: ir_power_toggle
  label: Power (toggle)
  kind: action
  transport: ir
  command: "04FB 708F"

- id: ir_power_on
  label: Power On
  kind: action
  transport: ir
  command: "04FB 718E"

- id: ir_power_off
  label: Power Off
  kind: action
  transport: ir
  command: "04FB 728D"

- id: ir_input_toggle
  label: Input (toggle)
  kind: action
  transport: ir
  command: "04FB 738C"

- id: ir_tv_tuner1
  label: TV Tuner 1
  kind: action
  transport: ir
  command: "04FB 748B"

- id: ir_hdmi1
  label: HDMI.1
  kind: action
  transport: ir
  command: "04FB 7C83"

- id: ir_hdmi2
  label: HDMI.2
  kind: action
  transport: ir
  command: "04FB 7D82"

- id: ir_hdmi3
  label: HDMI.3
  kind: action
  transport: ir
  command: "04FB 7E81"

- id: ir_hdmi4
  label: HDMI.4
  kind: action
  transport: ir
  command: "04FB 7F80"

- id: ir_hdmi5
  label: HDMI.5
  kind: action
  transport: ir
  command: "04FB 807F"

- id: ir_vga
  label: VGA
  kind: action
  transport: ir
  command: "04FB 817E"

- id: ir_usb
  label: USB
  kind: action
  transport: ir
  command: "04FB 827D"

- id: ir_picture_mode_toggle
  label: Picture Mode (toggle)
  kind: action
  transport: ir
  command: "04FB 837C"

- id: ir_sound_mode_toggle
  label: Sound Mode (toggle)
  kind: action
  transport: ir
  command: "04FB 847B"

- id: ir_aspect_wide
  label: Aspect Ratio Wide 16:9
  kind: action
  transport: ir
  command: "04FB 857A"

- id: ir_aspect_normal
  label: Aspect Ratio Normal 4:3
  kind: action
  transport: ir
  command: "04FB 8679"

- id: ir_aspect_cinema
  label: Aspect Ratio Cinema
  kind: action
  transport: ir
  command: "04FB 8778"

- id: ir_aspect_panorama
  label: Aspect Ratio Panorama
  kind: action
  transport: ir
  command: "04FB 8877"

- id: ir_aspect_zoom
  label: Aspect Ratio Zoom
  kind: action
  transport: ir
  command: "04FB 8976"

- id: ir_channel_list
  label: Channel List
  kind: action
  transport: ir
  command: "04FB 8A75"

- id: ir_fav_channel
  label: Fav Channel
  kind: action
  transport: ir
  command: "04FB 8B74"

- id: ir_sleep
  label: Sleep
  kind: action
  transport: ir
  command: "04FB 8C73"

- id: ir_tv_menu
  label: TV Menu (toggle)
  kind: action
  transport: ir
  command: "04FB 8D72"

- id: ir_home
  label: Home
  kind: action
  transport: ir
  command: "04FB 8E71"

- id: ir_tools
  label: Tools (Second Menu)
  kind: action
  transport: ir
  command: "04FB 8F70"

- id: ir_digit_0
  label: Digit 0
  kind: action
  transport: ir
  command: "04FB 906F"

- id: ir_digit_1
  label: Digit 1
  kind: action
  transport: ir
  command: "04FB 916E"

- id: ir_digit_2
  label: Digit 2
  kind: action
  transport: ir
  command: "04FB 926D"

- id: ir_digit_3
  label: Digit 3
  kind: action
  transport: ir
  command: "04FB 936C"

- id: ir_digit_4
  label: Digit 4
  kind: action
  transport: ir
  command: "04FB 946B"

- id: ir_digit_5
  label: Digit 5
  kind: action
  transport: ir
  command: "04FB 956A"

- id: ir_digit_6
  label: Digit 6
  kind: action
  transport: ir
  command: "04FB 9669"

- id: ir_digit_7
  label: Digit 7
  kind: action
  transport: ir
  command: "04FB 9768"

- id: ir_digit_8
  label: Digit 8
  kind: action
  transport: ir
  command: "04FB 9867"

- id: ir_digit_9
  label: Digit 9
  kind: action
  transport: ir
  command: "04FB 9966"

- id: ir_dash
  label: Digit dash
  kind: action
  transport: ir
  command: "04FB 9A65"

- id: ir_previous_channel
  label: Previous Channel
  kind: action
  transport: ir
  command: "04FB 9B64"

- id: ir_up_arrow
  label: Up Arrow
  kind: action
  transport: ir
  command: "04FB 9C63"

- id: ir_down_arrow
  label: Down Arrow
  kind: action
  transport: ir
  command: "04FB 9D62"

- id: ir_left_arrow
  label: Left Arrow
  kind: action
  transport: ir
  command: "04FB 9E61"

- id: ir_right_arrow
  label: Right Arrow
  kind: action
  transport: ir
  command: "04FB 9F60"

- id: ir_enter
  label: Enter
  kind: action
  transport: ir
  command: "04FB A05F"

- id: ir_select_ok
  label: Select (OK)
  kind: action
  transport: ir
  command: "04FB A15E"

- id: ir_return
  label: Return
  kind: action
  transport: ir
  command: "04FB A25D"

- id: ir_exit
  label: Exit
  kind: action
  transport: ir
  command: "04FB A35C"

- id: ir_info_display
  label: Info/Display (toggle)
  kind: action
  transport: ir
  command: "04FB A45B"

- id: ir_volume_down
  label: Volume -
  kind: action
  transport: ir
  command: "04FB A55A"

- id: ir_volume_up
  label: Volume +
  kind: action
  transport: ir
  command: "04FB A659"

- id: ir_channel_down
  label: Channel -
  kind: action
  transport: ir
  command: "04FB A758"

- id: ir_channel_up
  label: Channel +
  kind: action
  transport: ir
  command: "04FB A857"

- id: ir_pip_toggle
  label: PIP (toggle)
  kind: action
  transport: ir
  command: "04FB A956"

- id: ir_pip_input
  label: PIP Input
  kind: action
  transport: ir
  command: "04FB AA55"

- id: ir_pip_swap
  label: PIP Swap
  kind: action
  transport: ir
  command: "04FB AB54"

- id: ir_pip_position
  label: PIP Position
  kind: action
  transport: ir
  command: "04FB AC53"

- id: ir_pip_size
  label: PIP Size
  kind: action
  transport: ir
  command: "04FB AD52"

- id: ir_guide_toggle
  label: Guide (toggle)
  kind: action
  transport: ir
  command: "04FB AE51"

- id: ir_freeze_toggle
  label: Freeze (toggle)
  kind: action
  transport: ir
  command: "04FB AF50"
```

## Notes

- RS-232 port must be enabled in TV menu: Quick Settings → enter "7 3 1 0" on remote → Custom Install → Custom Installation = Enable. "Power On Command" must also be set to Enable to allow serial control while TV is in standby.
- All serial commands are case-sensitive. Frame format: `S` (or `Q`) + 3-byte client ID + 4-byte command + 4-byte data + 1-byte checksum + 0x0D. Checksum is the 8-bit value such that the sum of all 14 bytes (including checksum) equals zero. Client ID is `ALL` (broadcast) or the last 3 hex digits of the TV's MAC address.
- Two acknowledgement patterns are shown in source: `WAIT` then `OKAY` for power-on (e.g. POWRON takes longer). The TV may also return `EROR` on protocol violations.
- Document revision history: V1.0 (2014-04-02) initial discrete IR; V2.0 (2014-07-02) added CCF codes; V3.0 (2016-05-13) initial RS-232; V3.1 (2016-07-26) added SPKM-ARC, changed PANL; V3.2 (2017-01-25) added per-MAC commands; V3.3 (2017-03-10) error checking; V3.4/V3.5 series name changes; V3.6 (2017-04-17) model and IR corrections.
- Per source note: "Check User Manual for your specific TV to identify supported IR commands by model." 75U67KUA support matrix not enumerated in this document.
- For connection to a PC with USB, source notes a USB-to-Serial adapter is required (sold separately).
- DB9 pinout (TV-side, female): pin 2 TXD, pin 3 RXD, pin 5 GND. Pin 9 is power input/DCD.

<!-- UNRESOLVED: firmware version compatibility, network control (TCP/IP) interface, error recovery / fault behavior not stated in source -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-06-02T22:08:01.933Z
last_checked_at: 2026-06-02T22:08:01.933Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:01.933Z
matched_actions: 165
action_count: 165
confidence: medium
summary: "All 165 spec actions traced to source (dip-safe re-verify). (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific command support matrix not stated in source"
- "firmware version compatibility, network control (TCP/IP) interface, error recovery / fault behavior not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
