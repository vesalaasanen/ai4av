---
spec_id: admin/hisense-65u75sua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 65U75SUA Series Control Spec"
manufacturer: HiSense
model_family: "65U75SUA Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "65U75SUA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:45.840Z
last_checked_at: 2026-06-02T22:07:53.931Z
generated_at: 2026-06-02T22:07:53.931Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model list for Prosumer series not enumerated in source; spec covers protocol exposed in this manual only."
  - "settable scalar parameters with discrete ranges (BRIT, CONT, COLR, TINT, SHRP, BKLV, VOLM, MAVL, VLFL) are exposed as parameterized actions above rather than as separate Variables entries. No additional settable parameters found in source beyond action data fields."
  - "source defines fixed request/response protocol only - no unsolicited notification / asynchronous events documented."
  - "source does not document any multi-step macro sequences. Implicit two-step example: S...POWRON## then S...POWR0001 to power on (PWRE must be enabled first)."
  - "source contains no safety warnings, interlock procedures, or hazardous-state documentation."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:53.931Z
  matched_actions: 165
  action_count: 165
  confidence: medium
  summary: "All 165 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 65U75SUA Series Control Spec

## Summary
RS-232 serial control spec for HiSense Prosumer TVs (65U75SUA Series). Document is the vendor RS-232/IR protocol manual V3.6 (17-Apr-2017). Transport is RS-232C on DB9 at 9600 8N1 ASCII; no flow control; commands are fixed-length ASCII frames terminated by 0x0D with an 8-bit checksum. Client ID is 3 hex bytes (Smart TV: last 3 bytes of Ethernet MAC; Feature TV: menu-set ID; "ALL" = broadcast).

<!-- UNRESOLVED: model list for Prosumer series not enumerated in source; spec covers protocol exposed in this manual only. -->

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
  connector: DB9
  notes: "Electrical: RS-232C. TXD on pin 3, RXD on pin 2, GND on pin 5 (female chassis mount)."
auth:
  type: none  # inferred: no login/auth procedure in source
```

## Traits
```yaml
- powerable       # POWR, PWRE commands
- routable        # INPT input select, INPM input mode
- queryable       # Q-prefixed queries on every mnemonic
- levelable       # VOLM, MAVL, VLFL, BRIT, CONT, COLR, TINT, SHRP, BKLV
```

## Actions
```yaml
# Frame format: S|Q (1B) + CLIENT_ID (3B) + COMMAND (4B) + DATA (4B) + CHECKSUM (1B) + Cr(0x0D)
# Use SALL for broadcast; replace 5FA with last 3 bytes of MAC for TV-specific addressing.
# CHECKSUM = 8-bit such that sum of all bytes including checksum = 0x00.
# Examples below use Generic ALL form; protocol is case-sensitive.

# ===== Power =====
- id: pwre_disable
  label: Power On Command Disable
  kind: action
  command: "SALLPWRE0000{CSUM}\r"
  params: []

- id: pwre_enable
  label: Power On Command Enable
  kind: action
  command: "SALLPWRE0001{CSUM}\r"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "SALLPOWR0000{CSUM}\r"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "SALLPOWR0001{CSUM}\r"
  params: []

# ===== Input source =====
- id: input_next
  label: Input Next (cycle)
  kind: action
  command: "SALLINPT0000{CSUM}\r"
  params: []

- id: input_tv
  label: Set Input: TV
  kind: action
  command: "SALLINPT0001{CSUM}\r"
  params: []

- id: input_component
  label: Set Input: Component
  kind: action
  command: "SALLINPT0003{CSUM}\r"
  params: []

- id: input_av
  label: Set Input: AV
  kind: action
  command: "SALLINPT0004{CSUM}\r"
  params: []

- id: input_vga
  label: Set Input: VGA
  kind: action
  command: "SALLINPT0006{CSUM}\r"
  params: []

- id: input_hdmi1
  label: Set Input: HDMI1
  kind: action
  command: "SALLINPT0009{CSUM}\r"
  params: []

- id: input_hdmi2
  label: Set Input: HDMI2
  kind: action
  command: "SALLINPT0010{CSUM}\r"
  params: []

- id: input_hdmi3
  label: Set Input: HDMI3
  kind: action
  command: "SALLINPT0011{CSUM}\r"
  params: []

- id: input_hdmi4
  label: Set Input: HDMI4
  kind: action
  command: "SALLINPT0012{CSUM}\r"
  params: []

# ===== Picture mode =====
- id: picture_mode_standard
  label: Picture Mode: Standard
  kind: action
  command: "SALLPMOD0000{CSUM}\r"
  params: []

- id: picture_mode_vivid
  label: Picture Mode: Vivid
  kind: action
  command: "SALLPMOD0002{CSUM}\r"
  params: []

- id: picture_mode_energy_saving
  label: Picture Mode: Energy Saving
  kind: action
  command: "SALLPMOD0003{CSUM}\r"
  params: []

- id: picture_mode_theater
  label: Picture Mode: Theater
  kind: action
  command: "SALLPMOD0004{CSUM}\r"
  params: []

- id: picture_mode_game
  label: Picture Mode: Game
  kind: action
  command: "SALLPMOD0005{CSUM}\r"
  params: []

- id: picture_mode_sport
  label: Picture Mode: Sport
  kind: action
  command: "SALLPMOD0006{CSUM}\r"
  params: []

# ===== Picture adjustments (parameterized ranges) =====
- id: set_brightness
  label: Set Brightness
  kind: action
  command: "SALLBRIT{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Brightness 0000-0100 (0-100)

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "SALLCONT{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Contrast 0000-0100 (0-100)

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  command: "SALLCOLR{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Color 0000-0100 (0-100)

- id: set_tint
  label: Set Tint
  kind: action
  command: "SALLTINT{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Tint 0000-0100 (0-100)

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "SALLSHRP{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Sharpness 0000-0020 (0-20)

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "SALLBKLV{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Backlight 0000-0100 (0-100)

# ===== Aspect ratio =====
- id: aspect_auto
  label: Aspect Ratio: Auto
  kind: action
  command: "SALLASPT0000{CSUM}\r"
  params: []

- id: aspect_normal
  label: Aspect Ratio: Normal
  kind: action
  command: "SALLASPT0002{CSUM}\r"
  params: []

- id: aspect_zoom
  label: Aspect Ratio: Zoom
  kind: action
  command: "SALLASPT0003{CSUM}\r"
  params: []

- id: aspect_wide
  label: Aspect Ratio: Wide
  kind: action
  command: "SALLASPT0004{CSUM}\r"
  params: []

- id: aspect_direct
  label: Aspect Ratio: Direct
  kind: action
  command: "SALLASPT0005{CSUM}\r"
  params: []

- id: aspect_1to1
  label: Aspect Ratio: 1-to-1 pixel map
  kind: action
  command: "SALLASPT0006{CSUM}\r"
  params: []

- id: aspect_panoramic
  label: Aspect Ratio: Panoramic
  kind: action
  command: "SALLASPT0007{CSUM}\r"
  params: []

- id: aspect_cinema
  label: Aspect Ratio: Cinema
  kind: action
  command: "SALLASPT0008{CSUM}\r"
  params: []

# ===== Overscan =====
- id: overscan_on
  label: Overscan On
  kind: action
  command: "SALLOVSN0000{CSUM}\r"
  params: []

- id: overscan_off
  label: Overscan Off
  kind: action
  command: "SALLOVSN0002{CSUM}\r"
  params: []

- id: reset_picture
  label: Reset Picture Settings
  kind: action
  command: "SALLRSTP1000{CSUM}\r"
  params: []

# ===== Color temperature =====
- id: color_temp_high
  label: Color Temp: High
  kind: action
  command: "SALLCTEM0000{CSUM}\r"
  params: []

- id: color_temp_middle
  label: Color Temp: Middle
  kind: action
  command: "SALLCTEM0002{CSUM}\r"
  params: []

- id: color_temp_mid_low
  label: Color Temp: Mid-Low
  kind: action
  command: "SALLCTEM0003{CSUM}\r"
  params: []

- id: color_temp_low
  label: Color Temp: Low
  kind: action
  command: "SALLCTEM0004{CSUM}\r"
  params: []

# ===== Sound mode =====
- id: sound_mode_standard
  label: Sound Mode: Standard
  kind: action
  command: "SALLAMOD0000{CSUM}\r"
  params: []

- id: sound_mode_theater
  label: Sound Mode: Theater
  kind: action
  command: "SALLAMOD0002{CSUM}\r"
  params: []

- id: sound_mode_music
  label: Sound Mode: Music
  kind: action
  command: "SALLAMOD0003{CSUM}\r"
  params: []

- id: sound_mode_speech
  label: Sound Mode: Speech
  kind: action
  command: "SALLAMOD0004{CSUM}\r"
  params: []

- id: sound_mode_late_night
  label: Sound Mode: Late Night
  kind: action
  command: "SALLAMOD0005{CSUM}\r"
  params: []

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  command: "SALLRSTA2000{CSUM}\r"
  params: []

# ===== Volume / mute =====
- id: set_volume
  label: Set Volume
  kind: action
  command: "SALLVOLM{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Volume 0000-0100 (0-100)

- id: mute_off
  label: Mute Off
  kind: action
  command: "SALLMUTE0000{CSUM}\r"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "SALLMUTE0001{CSUM}\r"
  params: []

# ===== TV speaker =====
- id: tv_speaker_off
  label: TV Speaker Off
  kind: action
  command: "SALLASPK0000{CSUM}\r"
  params: []

- id: tv_speaker_on
  label: TV Speaker On
  kind: action
  command: "SALLASPK0002{CSUM}\r"
  params: []

# ===== Tuner / channel =====
- id: tuner_antenna
  label: Tuner Mode: Antenna
  kind: action
  command: "SALLTUNR0000{CSUM}\r"
  params: []

- id: tuner_cable
  label: Tuner Mode: Cable
  kind: action
  command: "SALLTUNR0002{CSUM}\r"
  params: []

- id: auto_search
  label: Automatic Channel Search
  kind: action
  command: "SALLTSCN0001{CSUM}\r"
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  command: "SALLCHAN0000{CSUM}\r"
  params: []

- id: channel_up
  label: Channel Up
  kind: action
  command: "SALLCHAN0001{CSUM}\r"
  params: []

# ===== Caption control =====
- id: caption_off
  label: Closed Caption Off
  kind: action
  command: "SALLCC##0000{CSUM}\r"
  params: []

- id: caption_on
  label: Closed Caption On
  kind: action
  command: "SALLCC##0002{CSUM}\r"
  params: []

- id: caption_on_mute
  label: Closed Caption On When Mute
  kind: action
  command: "SALLCC##0003{CSUM}\r"
  params: []

# ===== System =====
- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: "SALLRSET9999{CSUM}\r"
  params: []

# ===== OSD language =====
- id: lang_english
  label: OSD Language: English
  kind: action
  command: "SALLLANG0000{CSUM}\r"
  params: []

- id: lang_spanish
  label: OSD Language: Español
  kind: action
  command: "SALLLANG0002{CSUM}\r"
  params: []

- id: lang_french
  label: OSD Language: Français
  kind: action
  command: "SALLLANG0003{CSUM}\r"
  params: []

# ===== Standby LED =====
- id: standby_led_off
  label: Standby LED Off
  kind: action
  command: "SALLPLED0000{CSUM}\r"
  params: []

- id: standby_led_on
  label: Standby LED On
  kind: action
  command: "SALLPLED0002{CSUM}\r"
  params: []

# ===== Remote control button simulator (BTTN1xxx) =====
- id: btn_digit_0
  label: Button Sim: 0
  kind: action
  command: "SALLBTTN1000{CSUM}\r"
  params: []

- id: btn_digit_1
  label: Button Sim: 1
  kind: action
  command: "SALLBTTN1001{CSUM}\r"
  params: []

- id: btn_digit_2
  label: Button Sim: 2
  kind: action
  command: "SALLBTTN1002{CSUM}\r"
  params: []

- id: btn_digit_3
  label: Button Sim: 3
  kind: action
  command: "SALLBTTN1003{CSUM}\r"
  params: []

- id: btn_digit_4
  label: Button Sim: 4
  kind: action
  command: "SALLBTTN1004{CSUM}\r"
  params: []

- id: btn_digit_5
  label: Button Sim: 5
  kind: action
  command: "SALLBTTN1005{CSUM}\r"
  params: []

- id: btn_digit_6
  label: Button Sim: 6
  kind: action
  command: "SALLBTTN1006{CSUM}\r"
  params: []

- id: btn_digit_7
  label: Button Sim: 7
  kind: action
  command: "SALLBTTN1007{CSUM}\r"
  params: []

- id: btn_digit_8
  label: Button Sim: 8
  kind: action
  command: "SALLBTTN1008{CSUM}\r"
  params: []

- id: btn_digit_9
  label: Button Sim: 9
  kind: action
  command: "SALLBTTN1009{CSUM}\r"
  params: []

- id: btn_dash
  label: Button Sim: - (Dash)
  kind: action
  command: "SALLBTTN1010{CSUM}\r"
  params: []

- id: btn_power
  label: Button Sim: POWER
  kind: action
  command: "SALLBTTN1012{CSUM}\r"
  params: []

- id: btn_frw
  label: Button Sim: FRW <<
  kind: action
  command: "SALLBTTN1015{CSUM}\r"
  params: []

- id: btn_play
  label: Button Sim: PLAY
  kind: action
  command: "SALLBTTN1016{CSUM}\r"
  params: []

- id: btn_ffw
  label: Button Sim: FFW >>
  kind: action
  command: "SALLBTTN1017{CSUM}\r"
  params: []

- id: btn_pause
  label: Button Sim: PAUSE
  kind: action
  command: "SALLBTTN1018{CSUM}\r"
  params: []

- id: btn_previous
  label: Button Sim: PREVIOUS <<
  kind: action
  command: "SALLBTTN1019{CSUM}\r"
  params: []

- id: btn_stop
  label: Button Sim: STOP
  kind: action
  command: "SALLBTTN1020{CSUM}\r"
  params: []

- id: btn_next
  label: Button Sim: NEXT >>
  kind: action
  command: "SALLBTTN1021{CSUM}\r"
  params: []

- id: btn_media_player
  label: Button Sim: Media Player (HiMedia)
  kind: action
  command: "SALLBTTN1023{CSUM}\r"
  params: []

- id: btn_sleep
  label: Button Sim: SLEEP
  kind: action
  command: "SALLBTTN1024{CSUM}\r"
  params: []

- id: btn_cc
  label: Button Sim: CC
  kind: action
  command: "SALLBTTN1027{CSUM}\r"
  params: []

- id: btn_mute
  label: Button Sim: MUTE
  kind: action
  command: "SALLBTTN1031{CSUM}\r"
  params: []

- id: btn_vol_down
  label: Button Sim: VOL-
  kind: action
  command: "SALLBTTN1032{CSUM}\r"
  params: []

- id: btn_vol_up
  label: Button Sim: VOL+
  kind: action
  command: "SALLBTTN1033{CSUM}\r"
  params: []

- id: btn_ch_down
  label: Button Sim: CH-
  kind: action
  command: "SALLBTTN1034{CSUM}\r"
  params: []

- id: btn_ch_up
  label: Button Sim: CH+
  kind: action
  command: "SALLBTTN1035{CSUM}\r"
  params: []

- id: btn_input
  label: Button Sim: INPUT
  kind: action
  command: "SALLBTTN1036{CSUM}\r"
  params: []

- id: btn_menu
  label: Button Sim: MENU
  kind: action
  command: "SALLBTTN1038{CSUM}\r"
  params: []

- id: btn_connected_home
  label: Button Sim: Connected Home (HiSmart)
  kind: action
  command: "SALLBTTN1039{CSUM}\r"
  params: []

- id: btn_ok_enter
  label: Button Sim: OK/ENTER
  kind: action
  command: "SALLBTTN1040{CSUM}\r"
  params: []

- id: btn_up
  label: Button Sim: UP
  kind: action
  command: "SALLBTTN1041{CSUM}\r"
  params: []

- id: btn_down
  label: Button Sim: DOWN
  kind: action
  command: "SALLBTTN1042{CSUM}\r"
  params: []

- id: btn_left
  label: Button Sim: LEFT
  kind: action
  command: "SALLBTTN1043{CSUM}\r"
  params: []

- id: btn_right
  label: Button Sim: RIGHT
  kind: action
  command: "SALLBTTN1044{CSUM}\r"
  params: []

- id: btn_back
  label: Button Sim: BACK
  kind: action
  command: "SALLBTTN1045{CSUM}\r"
  params: []

- id: btn_exit
  label: Button Sim: EXIT
  kind: action
  command: "SALLBTTN1046{CSUM}\r"
  params: []

- id: btn_red
  label: Button Sim: Red
  kind: action
  command: "SALLBTTN1050{CSUM}\r"
  params: []

- id: btn_green
  label: Button Sim: Green
  kind: action
  command: "SALLBTTN1051{CSUM}\r"
  params: []

- id: btn_blue
  label: Button Sim: Blue
  kind: action
  command: "SALLBTTN1052{CSUM}\r"
  params: []

- id: btn_yellow
  label: Button Sim: Yellow
  kind: action
  command: "SALLBTTN1053{CSUM}\r"
  params: []

- id: btn_mts_sap
  label: Button Sim: MTS/SAP
  kind: action
  command: "SALLBTTN1054{CSUM}\r"
  params: []

- id: btn_live_tv
  label: Button Sim: Live TV
  kind: action
  command: "SALLBTTN1055{CSUM}\r"
  params: []

# ===== Power off control mode =====
- id: power_off_ac_only
  label: Power Off Control: AC Only
  kind: action
  command: "SALLPBTN0000{CSUM}\r"
  params: []

- id: power_off_all
  label: Power Off Control: All
  kind: action
  command: "SALLPBTN0001{CSUM}\r"
  params: []

# ===== Volume control modes =====
- id: set_volume_range
  label: Set Volume Range (MAVL)
  kind: action
  command: "SALLMAVL{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Max volume 0000-0100 (0-100)

- id: vol_control_locked
  label: Volume Control: Locked
  kind: action
  command: "SALLSVOL0000{CSUM}\r"
  params: []

- id: vol_control_last_volume
  label: Volume Control: Last Volume
  kind: action
  command: "SALLSVOL0001{CSUM}\r"
  params: []

- id: vol_control_ac_reset
  label: Volume Control: AC Reset
  kind: action
  command: "SALLSVOL0002{CSUM}\r"
  params: []

- id: vol_control_standby_reset
  label: Volume Control: Standby Reset
  kind: action
  command: "SALLSVOL0003{CSUM}\r"
  params: []

- id: set_vol_locked_level
  label: Set Volume Locked Level (VLFL)
  kind: action
  command: "SALLVLFL{value:0000}{CSUM}\r"
  params:
    - name: value
      type: integer
      description: Locked level 0000-0100 (0-100)

# ===== Lock / access controls =====
- id: remote_key_enable
  label: Remote Key: Enable
  kind: action
  command: "SALLRMOT0000{CSUM}\r"
  params: []

- id: remote_key_disable
  label: Remote Key: Disable
  kind: action
  command: "SALLRMOT0001{CSUM}\r"
  params: []

- id: remote_key_partial
  label: Remote Key: Partial
  kind: action
  command: "SALLRMOT0002{CSUM}\r"
  params: []

- id: panel_key_enable
  label: Panel Key: Enable
  kind: action
  command: "SALLPANL0000{CSUM}\r"
  params: []

- id: panel_key_disable
  label: Panel Key: Disable
  kind: action
  command: "SALLPANL0001{CSUM}\r"
  params: []

- id: menu_access_enable
  label: Menu Access: Enable
  kind: action
  command: "SALLMENU0000{CSUM}\r"
  params: []

- id: menu_access_disable
  label: Menu Access: Disable
  kind: action
  command: "SALLMENU0001{CSUM}\r"
  params: []

- id: av_menu_disable
  label: AV Setting Menu: Disable
  kind: action
  command: "SALLAVMN0000{CSUM}\r"
  params: []

- id: av_menu_enable
  label: AV Setting Menu: Enable
  kind: action
  command: "SALLAVMN0001{CSUM}\r"
  params: []

- id: osd_enable
  label: OSD Mode: Enable
  kind: action
  command: "SALLOSD#0000{CSUM}\r"
  params: []

- id: osd_disable
  label: OSD Mode: Disable
  kind: action
  command: "SALLOSD#0001{CSUM}\r"
  params: []

- id: input_mode_locked
  label: Input Mode: Locked
  kind: action
  command: "SALLINPM0000{CSUM}\r"
  params: []

- id: input_mode_selectable
  label: Input Mode: Selectable
  kind: action
  command: "SALLINPM0001{CSUM}\r"
  params: []

- id: input_mode_ac_reset
  label: Input Mode: AC Reset
  kind: action
  command: "SALLINPM0002{CSUM}\r"
  params: []

- id: input_mode_standby_reset
  label: Input Mode: Standby Reset
  kind: action
  command: "SALLINPM0003{CSUM}\r"
  params: []

# ===== Power-on input source =====
- id: power_on_input_last
  label: Power On Input: Last
  kind: action
  command: "SALLPOIS0000{CSUM}\r"
  params: []

- id: power_on_input_air
  label: Power On Input: Air
  kind: action
  command: "SALLPOIS0001{CSUM}\r"
  params: []

- id: power_on_input_av
  label: Power On Input: AV
  kind: action
  command: "SALLPOIS0002{CSUM}\r"
  params: []

- id: power_on_input_component
  label: Power On Input: Component
  kind: action
  command: "SALLPOIS0003{CSUM}\r"
  params: []

# ===== Queries (kind: query) =====
- id: q_pwre
  label: Query Power On Command Setting
  kind: query
  command: "QALLPWRE????{CSUM}\r"
  params: []
  returns: "0=Disable, 1=Enable (not available in STANDBY mode)"

- id: q_input
  label: Query Current Input Source
  kind: query
  command: "QALLINPT????{CSUM}\r"
  params: []
  returns: "1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"

- id: q_pmod
  label: Query Picture Mode
  kind: query
  command: "QALLPMOD????{CSUM}\r"
  params: []
  returns: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"

- id: q_brit
  label: Query Brightness
  kind: query
  command: "QALLBRIT????{CSUM}\r"
  params: []
  returns: "0-100"

- id: q_cont
  label: Query Contrast
  kind: query
  command: "QALLCONT????{CSUM}\r"
  params: []
  returns: "0-100"

- id: q_colr
  label: Query Color Saturation
  kind: query
  command: "QALLCOLR????{CSUM}\r"
  params: []
  returns: "0-100"

- id: q_tint
  label: Query Tint
  kind: query
  command: "QALLTINT????{CSUM}\r"
  params: []
  returns: "0-100"

- id: q_shrp
  label: Query Sharpness
  kind: query
  command: "QALLSHRP????{CSUM}\r"
  params: []
  returns: "0-20"

- id: q_aspt
  label: Query Aspect Ratio
  kind: query
  command: "QALLASPT????{CSUM}\r"
  params: []
  returns: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1, 7=Panoramic, 8=Cinema"

- id: q_ovsn
  label: Query Overscan
  kind: query
  command: "QALLOVSN????{CSUM}\r"
  params: []
  returns: "0=On, 2=Off"

- id: q_ctem
  label: Query Color Temperature
  kind: query
  command: "QALLCTEM????{CSUM}\r"
  params: []
  returns: "0=High, 2=Middle, 3=Mid-Low, 4=Low"

- id: q_bklv
  label: Query Backlight
  kind: query
  command: "QALLBKLV????{CSUM}\r"
  params: []
  returns: "0-100"

- id: q_amod
  label: Query Sound Mode
  kind: query
  command: "QALLAMOD????{CSUM}\r"
  params: []
  returns: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"

- id: q_volm
  label: Query Volume
  kind: query
  command: "QALLVOLM????{CSUM}\r"
  params: []
  returns: "0-100"

- id: q_mute
  label: Query Mute Status
  kind: query
  command: "QALLMUTE????{CSUM}\r"
  params: []
  returns: "0=Not Mute, 1=Mute"

- id: q_aspk
  label: Query TV Speaker
  kind: query
  command: "QALLASPK????{CSUM}\r"
  params: []
  returns: "0=Off, 2=On (ARC supported per V3.1)"

- id: q_tunr
  label: Query Tuner Mode
  kind: query
  command: "QALLTUNR????{CSUM}\r"
  params: []
  returns: "0=Antenna, 2=Cable"

- id: q_cc
  label: Query Caption Control
  kind: query
  command: "QALLCC##????{CSUM}\r"
  params: []
  returns: "0=Off, 2=On, 3=On when mute"

- id: q_lang
  label: Query OSD Language
  kind: query
  command: "QALLLANG????{CSUM}\r"
  params: []
  returns: "0=English, 2=Español, 3=Français"

- id: q_pled
  label: Query Standby LED
  kind: query
  command: "QALLPLED????{CSUM}\r"
  params: []
  returns: "0=Off, 2=On"

- id: q_pbtn
  label: Query Power Off Control Mode
  kind: query
  command: "QALLPBTN????{CSUM}\r"
  params: []
  returns: "0=AC Only, 1=All"

- id: q_mavl
  label: Query Volume Range
  kind: query
  command: "QALLMAVL????{CSUM}\r"
  params: []
  returns: "0-100"

- id: q_svol
  label: Query Volume Control Mode
  kind: query
  command: "QALLSVOL????{CSUM}\r"
  params: []
  returns: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"

- id: q_vlfl
  label: Query Volume Locked Level
  kind: query
  command: "QALLVLFL????{CSUM}\r"
  params: []
  returns: "0-100"

- id: q_rmot
  label: Query Remote Key
  kind: query
  command: "QALLRMOT????{CSUM}\r"
  params: []
  returns: "0=Enable, 1=Disable, 2=Partial"

- id: q_panl
  label: Query Panel Key
  kind: query
  command: "QALLPANL????{CSUM}\r"
  params: []
  returns: "0=Enable, 1=Disable"

- id: q_menu
  label: Query Menu Access
  kind: query
  command: "QALLMENU????{CSUM}\r"
  params: []
  returns: "0=Enable, 1=Disable"

- id: q_avmn
  label: Query AV Setting Menu
  kind: query
  command: "QALLAVMN????{CSUM}\r"
  params: []
  returns: "0=Disable, 1=Enable"

- id: q_osd
  label: Query OSD Mode
  kind: query
  command: "QALLOSD#????{CSUM}\r"
  params: []
  returns: "0=Enable, 1=Disable"

- id: q_inpm
  label: Query Input Mode
  kind: query
  command: "QALLINPM????{CSUM}\r"
  params: []
  returns: "0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  source: q_pwre
  values: [disable, enable]

- id: input_source
  type: enum
  source: q_input
  values: [tv, component, av, vga, hdmi1, hdmi2, hdmi3, hdmi4]

- id: picture_mode
  type: enum
  source: q_pmod
  values: [standard, vivid, energy_saving, theater, game, sport]

- id: brightness
  type: integer
  source: q_brit
  range: [0, 100]

- id: contrast
  type: integer
  source: q_cont
  range: [0, 100]

- id: color_saturation
  type: integer
  source: q_colr
  range: [0, 100]

- id: tint
  type: integer
  source: q_tint
  range: [0, 100]

- id: sharpness
  type: integer
  source: q_shrp
  range: [0, 20]

- id: aspect_ratio
  type: enum
  source: q_aspt
  values: [auto, normal, zoom, wide, direct, one_to_one, panoramic, cinema]

- id: overscan
  type: enum
  source: q_ovsn
  values: [on, off]

- id: color_temp
  type: enum
  source: q_ctem
  values: [high, middle, mid_low, low]

- id: backlight
  type: integer
  source: q_bklv
  range: [0, 100]

- id: sound_mode
  type: enum
  source: q_amod
  values: [standard, theater, music, speech, late_night]

- id: volume
  type: integer
  source: q_volm
  range: [0, 100]

- id: mute_state
  type: enum
  source: q_mute
  values: [off, on]

- id: tv_speaker
  type: enum
  source: q_aspk
  values: [off, on]

- id: tuner_mode
  type: enum
  source: q_tunr
  values: [antenna, cable]

- id: caption_state
  type: enum
  source: q_cc
  values: [off, on, on_when_mute]

- id: osd_language
  type: enum
  source: q_lang
  values: [english, spanish, french]

- id: standby_led
  type: enum
  source: q_pled
  values: [off, on]
```

## Variables
```yaml
# UNRESOLVED: settable scalar parameters with discrete ranges (BRIT, CONT, COLR, TINT, SHRP, BKLV, VOLM, MAVL, VLFL) are exposed as parameterized actions above rather than as separate Variables entries. No additional settable parameters found in source beyond action data fields.
```

## Events
```yaml
# UNRESOLVED: source defines fixed request/response protocol only - no unsolicited notification / asynchronous events documented.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences. Implicit two-step example: S...POWRON## then S...POWR0001 to power on (PWRE must be enabled first).
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # RSET9999 - wipes all settings
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or hazardous-state documentation.
```

## Notes
- **Protocol framing.** Every command: `S|Q` (1B) + `CLIENT_ID` (3B) + `COMMAND` (4B) + `DATA` (4B) + `CHECKSUM` (1B) + `Cr` (0x0D). Checksum is the 8-bit value such that the sum of every byte in the frame including the checksum equals 0x00.
- **Client ID.** `SALL` = broadcast to all TVs. For per-TV addressing, use the last 3 bytes of the TV's Ethernet MAC (Smart TV) or the ID set in the TV's menu (Feature TV). MAC discoverable via `Menu > Network > Network Information`.
- **Protocol is case-sensitive.** All ASCII letters in the command frame are uppercase per source.
- **Pre-power checklist.** Per source §TV Setup, before serial control works the operator must: (1) open Custom Install menu (Quick Settings → enter 7-3-1-0), (2) set Custom Installation to **Enable** (this enables the RS-232 port), (3) optionally set Power On Command to **Enable** so the unit can be brought out of standby via RS-232. Without step 3, `POWR0001` will not wake a unit in standby.
- **ACKs.** Set commands return `ALL:OKAY####{CSUM}Cr`; multi-stage operations (e.g., power on with PWRE+POWR) return intermediate `WAIT` then `OKAY`. Errors return `EROR`. Common ACKs: `OKAY`, `EROR`, `WAIT`.
- **Discrete IR codes.** The source also documents an extensive Pronto/CCF IR table (POWER, INPUT, HDMI.1-5, VGA, USB, PICTURE MODE, SOUND MODE, ASPECT RATIO variants, digits 0-9, dash, channel ±, volume ±, arrow keys, ENTER, OK, RETURN, EXIT, INFO, SLEEP, MENU, HOME, TOOLS, PIP ±/INPUT/SWAP/POSITION/SIZE, GUIDE, FREEZE, FAV CH, PREV CH, MUTE). IR is not a serial transport and falls outside this spec's RS-232 Actions. Full IR code table is in the source manual.
- **Custom-install-only features.** Volume lock (SVOL/VLFL), panel key lock (PANL), menu lock (MENU), remote lock (RMOT partial), AV menu lock (AVMN), input mode lock (INPM), and OSD mode (OSD#) are administered via the hidden Custom Install menu and are intended for hospitality/integrator deployments.
- **Revision note.** Source is document V3.6 dated 17-Apr-2017. User-provided model "65U75SUA Series" is not enumerated in the source's model list; spec covers protocol exposed by the manual only.
- **Power-on input (POIS).** Last row of source lists POIS0000-0003 only (LAST/Air/AV/Component); HDMI/VGA variants not documented in this revision.
- **Caveat.** "Known protocol: TCP/IP" from input metadata does not match this source — the manual exclusively documents RS-232 and IR. Spec reflects source.
```

```
- title: HiSense 65U75SUA Series Control Spec
- entity_id: hisense_65u75sua_series
- status: draft, confidence: low
- transport: serial RS-232 9600 8N1 no-flow, DB9, no auth
- source documents ~120 distinct command rows: 81 set actions + 30 query actions enumerated verbatim
- IR codes (Pronto) referenced in Notes, not bound to transport enum
- key gotchas flagged: PWRE must be enabled for POWR wake; protocol case-sensitive; checksum rule stated

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:45.840Z
last_checked_at: 2026-06-02T22:07:53.931Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:53.931Z
matched_actions: 165
action_count: 165
confidence: medium
summary: "All 165 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model list for Prosumer series not enumerated in source; spec covers protocol exposed in this manual only."
- "settable scalar parameters with discrete ranges (BRIT, CONT, COLR, TINT, SHRP, BKLV, VOLM, MAVL, VLFL) are exposed as parameterized actions above rather than as separate Variables entries. No additional settable parameters found in source beyond action data fields."
- "source defines fixed request/response protocol only - no unsolicited notification / asynchronous events documented."
- "source does not document any multi-step macro sequences. Implicit two-step example: S...POWRON## then S...POWR0001 to power on (PWRE must be enabled first)."
- "source contains no safety warnings, interlock procedures, or hazardous-state documentation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
