---
spec_id: admin/hisense-85u8k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 85U8K Control Spec"
manufacturer: Hisense
model_family: 85U8K
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 85U8K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-02T01:53:02.818Z
last_checked_at: 2026-06-02T22:08:06.583Z
generated_at: 2026-06-02T22:08:06.583Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source 85U8K-specific model coverage not explicitly listed in extracted text (the \"Models\" section was blank in extraction); pulled model from operator input."
  - "TCP/IP / network control not described in source — only RS-232 and IR."
  - "additional POIS values (HDMI inputs, VGA, etc.) likely exist in"
  - "additional IR codes between TV TUNER1 (04FB748B) and HDMI.1"
  - "query mnemonic for power state not explicitly listed in extracted text; POWR is the set command."
  - "source does not describe unsolicited event notifications from"
  - "source does not describe multi-step macros."
  - "source contains no electrical, thermal, or installation safety"
  - "the worked source example uses the mnemonics POWER232 and POWRON, but the structured command table only documents PWRE (4-byte mnemonic) and POWR. These appear to be earlier-revision aliases; the table-form PWRE0001 + POWR0001 are the canonical set commands. The aliases are not enumerated as separate actions here because the source treats them as illustrative."
  - "TCP/IP control endpoint. Source mentions Ethernet MAC for client-ID purposes only; it does not describe a TCP or HTTP control endpoint."
  - "full POIS (power-on input) enum and any commands documented after the POIS section — the refined source file is truncated mid-table immediately after POIS0003."
  - "complete IR discrete-code list between TV TUNER1 (04FB748B) and HDMI.1 (04FB7C83) — refined source extraction shows a gap in this band of the discrete-IR table."
  - "firmware version compatibility, protocol revision applicability to the specific 85U8K model (source title is generic \"Hisense Prosumer TV\"; operator asserted 85U8K)."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:06.583Z
  matched_actions: 222
  action_count: 222
  confidence: medium
  summary: "All 222 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Hisense 85U8K Control Spec

## Summary
Hisense Prosumer TV (model 85U8K) supports both RS-232 ASCII command/query protocol and discrete IR remote control. RS-232 commands carry a per-TV MAC-suffix client ID (or ALL broadcast), fixed-length ASCII fields, an 8-bit checksum, and 0x0D termination. Source also documents Pronto CCF / hex IR codes for the same buttons.

<!-- UNRESOLVED: source 85U8K-specific model coverage not explicitly listed in extracted text (the "Models" section was blank in extraction); pulled model from operator input. -->
<!-- UNRESOLVED: TCP/IP / network control not described in source — only RS-232 and IR. -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # inferred from POWR / PWRE / BTTN1012 power commands
- queryable     # inferred from numerous ???? query commands returning values
- routable      # inferred from INPT input-source selection commands
- levelable     # inferred from BRIT / CONT / VOLM / BKLV range commands
```

## Actions
```yaml
# Wire framing (from source, "Basic Format for Control"):
#   Set:    S{CLIENT_ID 3B}{COMMAND 4B}{DATA 4B}{CHECKSUM 1B}{0x0D}
#   Query:  Q{CLIENT_ID 3B}{COMMAND 4B}????{CHECKSUM 1B}{0x0D}
# CLIENT_ID: last 3 bytes of TV Ethernet MAC (hex ASCII), or "ALL" broadcast.
# CHECKSUM: 8-bit sum of all preceding bytes (incl. checksum byte) equals 0x00.
# The `command:` field below holds the 8-byte ASCII mnemonic+data field verbatim
# from the vendor's "Command" column. Implementations must wrap with the
# framing above per source. See Notes for examples.

# ---- Power on command enable (RS-232 power-on must be enabled in standby) ----
- id: power_on_cmd_disable
  label: Disable RS-232 Remote Power On
  kind: action
  command: "PWRE0000"
  params: []
- id: power_on_cmd_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: "PWRE0001"
  params: []
- id: power_on_cmd_query
  label: Query Power On Command Setting
  kind: query
  command: "PWRE????"
  params: []

# ---- Power on/off ----
- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "POWR0000"
  params: []
- id: power_on
  label: Power On
  kind: action
  command: "POWR0001"
  params: []

# ---- Input source selection ----
- id: input_cycle
  label: Change Input Signal (cycle one at a time)
  kind: action
  command: "INPT0000"
  params: []
- id: input_tv
  label: Set Input: TV
  kind: action
  command: "INPT0001"
  params: []
- id: input_component
  label: "Set Input: Component"
  kind: action
  command: "INPT0003"
  params: []
- id: input_av
  label: "Set Input: AV"
  kind: action
  command: "INPT0004"
  params: []
- id: input_vga
  label: "Set Input: VGA"
  kind: action
  command: "INPT0006"
  params: []
- id: input_hdmi1
  label: "Set Input: HDMI1"
  kind: action
  command: "INPT0009"
  params: []
- id: input_hdmi2
  label: "Set Input: HDMI2"
  kind: action
  command: "INPT0010"
  params: []
- id: input_hdmi3
  label: "Set Input: HDMI3"
  kind: action
  command: "INPT0011"
  params: []
- id: input_hdmi4
  label: "Set Input: HDMI4"
  kind: action
  command: "INPT0012"
  params: []
- id: input_query
  label: Query Current Input Source
  kind: query
  command: "INPT????"
  params: []

# ---- Picture mode ----
- id: picture_mode_standard
  label: "Picture Mode: Standard"
  kind: action
  command: "PMOD0000"
  params: []
- id: picture_mode_vivid
  label: "Picture Mode: Vivid"
  kind: action
  command: "PMOD0002"
  params: []
- id: picture_mode_energysaving
  label: "Picture Mode: EnergySaving"
  kind: action
  command: "PMOD0003"
  params: []
- id: picture_mode_theater
  label: "Picture Mode: Theater"
  kind: action
  command: "PMOD0004"
  params: []
- id: picture_mode_game
  label: "Picture Mode: Game"
  kind: action
  command: "PMOD0005"
  params: []
- id: picture_mode_sport
  label: "Picture Mode: Sport"
  kind: action
  command: "PMOD0006"
  params: []
- id: picture_mode_query
  label: Query Picture Mode
  kind: query
  command: "PMOD????"
  params: []

# ---- Picture quality (parameterized 0000-0100 / 0000-0020) ----
- id: brightness_set
  label: Set Brightness
  kind: action
  command: "BRIT{value}"   # source: BRIT(0000-0100); value is 4-digit zero-padded ASCII
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Brightness 0-100, transmitted as 4 ASCII digits
- id: brightness_query
  label: Query Brightness
  kind: query
  command: "BRIT????"
  params: []
- id: contrast_set
  label: Set Contrast
  kind: action
  command: "CONT{value}"   # source: CONT(0000-0100)
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Contrast 0-100, transmitted as 4 ASCII digits
- id: contrast_query
  label: Query Contrast
  kind: query
  command: "CONT????"
  params: []
- id: color_saturation_set
  label: Set Color Saturation
  kind: action
  command: "COLR{value}"   # source: COLR(0000-0100)
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Color saturation 0-100, 4 ASCII digits
- id: color_saturation_query
  label: Query Color Saturation
  kind: query
  command: "COLR????"
  params: []
- id: tint_set
  label: Set Tint
  kind: action
  command: "TINT{value}"   # source: TINT(0000-0100)
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Tint 0-100, 4 ASCII digits
- id: tint_query
  label: Query Tint
  kind: query
  command: "TINT????"
  params: []
- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "SHRP{value}"   # source: SHRP(0000-0020)
  params:
    - name: value
      type: integer
      range: [0, 20]
      description: Sharpness 0-20, 4 ASCII digits
- id: sharpness_query
  label: Query Sharpness
  kind: query
  command: "SHRP????"
  params: []

# ---- Aspect ratio ----
- id: aspect_auto
  label: "Aspect Ratio: Auto"
  kind: action
  command: "ASPT0000"
  params: []
- id: aspect_normal
  label: "Aspect Ratio: Normal"
  kind: action
  command: "ASPT0002"
  params: []
- id: aspect_zoom
  label: "Aspect Ratio: Zoom"
  kind: action
  command: "ASPT0003"
  params: []
- id: aspect_wide
  label: "Aspect Ratio: Wide"
  kind: action
  command: "ASPT0004"
  params: []
- id: aspect_direct
  label: "Aspect Ratio: Direct"
  kind: action
  command: "ASPT0005"
  params: []
- id: aspect_one_to_one
  label: "Aspect Ratio: 1-to-1 pixel map"
  kind: action
  command: "ASPT0006"
  params: []
- id: aspect_panoramic
  label: "Aspect Ratio: Panoramic"
  kind: action
  command: "ASPT0007"
  params: []
- id: aspect_cinema
  label: "Aspect Ratio: Cinema"
  kind: action
  command: "ASPT0008"
  params: []
- id: aspect_query
  label: Query Aspect Ratio
  kind: query
  command: "ASPT????"
  params: []

# ---- Overscan ----
- id: overscan_on
  label: Overscan On
  kind: action
  command: "OVSN0000"
  params: []
- id: overscan_off
  label: Overscan Off
  kind: action
  command: "OVSN0002"
  params: []
- id: overscan_query
  label: Query Overscan
  kind: query
  command: "OVSN????"
  params: []

# ---- Picture reset ----
- id: picture_reset
  label: Reset Picture Settings
  kind: action
  command: "RSTP1000"
  params: []

# ---- Color temperature ----
- id: color_temp_high
  label: "Color Temp: High"
  kind: action
  command: "CTEM0000"
  params: []
- id: color_temp_middle
  label: "Color Temp: Middle"
  kind: action
  command: "CTEM0002"
  params: []
- id: color_temp_mid_low
  label: "Color Temp: Mid-Low"
  kind: action
  command: "CTEM0003"
  params: []
- id: color_temp_low
  label: "Color Temp: Low"
  kind: action
  command: "CTEM0004"
  params: []
- id: color_temp_query
  label: Query Color Temp
  kind: query
  command: "CTEM????"
  params: []

# ---- Backlight ----
- id: backlight_set
  label: Set Backlight
  kind: action
  command: "BKLV{value}"   # source: BKLV(0000-0100)
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Backlight 0-100, 4 ASCII digits
- id: backlight_query
  label: Query Backlight
  kind: query
  command: "BKLV????"
  params: []

# ---- Sound mode ----
- id: sound_mode_standard
  label: "Sound Mode: Standard"
  kind: action
  command: "AMOD0000"
  params: []
- id: sound_mode_theater
  label: "Sound Mode: Theater"
  kind: action
  command: "AMOD0002"
  params: []
- id: sound_mode_music
  label: "Sound Mode: Music"
  kind: action
  command: "AMOD0003"
  params: []
- id: sound_mode_speech
  label: "Sound Mode: Speech"
  kind: action
  command: "AMOD0004"
  params: []
- id: sound_mode_late_night
  label: "Sound Mode: Late Night"
  kind: action
  command: "AMOD0005"
  params: []
- id: sound_mode_query
  label: Query Sound Mode
  kind: query
  command: "AMOD????"
  params: []

# ---- Audio reset ----
- id: audio_reset
  label: Reset Audio Settings
  kind: action
  command: "RSTA2000"
  params: []

# ---- Volume + Mute ----
- id: volume_set
  label: Set Volume
  kind: action
  command: "VOLM{value}"   # source: VOLM(0000-0100)
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Volume 0-100, 4 ASCII digits
- id: volume_query
  label: Query Volume
  kind: query
  command: "VOLM????"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE0000"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE0001"
  params: []
- id: mute_query
  label: Query Mute Status
  kind: query
  command: "MUTE????"
  params: []

# ---- TV speaker ----
- id: tv_speaker_off
  label: TV Speaker Off
  kind: action
  command: "ASPK0000"
  params: []
- id: tv_speaker_on
  label: TV Speaker On
  kind: action
  command: "ASPK0002"
  params: []
- id: tv_speaker_query
  label: Query TV Speaker
  kind: query
  command: "ASPK????"
  params: []

# ---- Tuner mode ----
- id: tuner_antenna
  label: "Tuner: Antenna"
  kind: action
  command: "TUNR0000"
  params: []
- id: tuner_cable
  label: "Tuner: Cable"
  kind: action
  command: "TUNR0002"
  params: []
- id: tuner_query
  label: Query Tuner Mode
  kind: query
  command: "TUNR????"
  params: []

# ---- Channel scan / change ----
- id: channel_auto_scan
  label: Automatic Channel Search
  kind: action
  command: "TSCN0001"
  params: []
- id: channel_down
  label: Channel Down
  kind: action
  command: "CHAN0000"
  params: []
- id: channel_up
  label: Channel Up
  kind: action
  command: "CHAN0001"
  params: []

# ---- Closed caption ----
- id: cc_off
  label: "Caption: Off"
  kind: action
  command: "CC##0000"
  params: []
- id: cc_on
  label: "Caption: On"
  kind: action
  command: "CC##0002"
  params: []
- id: cc_on_when_mute
  label: "Caption: On When Mute"
  kind: action
  command: "CC##0003"
  params: []
- id: cc_query
  label: Query Caption Control
  kind: query
  command: "CC##????"
  params: []

# ---- Factory reset ----
- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: "RSET9999"
  params: []

# ---- OSD language ----
- id: osd_english
  label: "OSD Language: English"
  kind: action
  command: "LANG0000"
  params: []
- id: osd_spanish
  label: "OSD Language: Español"
  kind: action
  command: "LANG0002"
  params: []
- id: osd_french
  label: "OSD Language: Français"
  kind: action
  command: "LANG0003"
  params: []
- id: osd_language_query
  label: Query OSD Language
  kind: query
  command: "LANG????"
  params: []

# ---- Standby LED ----
- id: standby_led_off
  label: Standby LED Off
  kind: action
  command: "PLED0000"
  params: []
- id: standby_led_on
  label: Standby LED On
  kind: action
  command: "PLED0002"
  params: []
- id: standby_led_query
  label: Query Standby LED
  kind: query
  command: "PLED????"
  params: []

# ---- Power off control mode ----
- id: power_off_mode_ac_only
  label: "Power Off Control: AC Only"
  kind: action
  command: "PBTN0000"
  params: []
- id: power_off_mode_all
  label: "Power Off Control: ALL"
  kind: action
  command: "PBTN0001"
  params: []
- id: power_off_mode_query
  label: Query Power Off Control Mode
  kind: query
  command: "PBTN????"
  params: []

# ---- Volume range / control / lock ----
- id: volume_range_set
  label: Set Volume Range Max
  kind: action
  command: "MAVL{value}"   # source: MAVL(0000-0100)
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: volume_range_query
  label: Query Volume Range
  kind: query
  command: "MAVL????"
  params: []
- id: volume_control_locked
  label: "Volume Control: Locked"
  kind: action
  command: "SVOL0000"
  params: []
- id: volume_control_last_volume
  label: "Volume Control: Last Volume"
  kind: action
  command: "SVOL0001"
  params: []
- id: volume_control_ac_reset
  label: "Volume Control: AC Reset"
  kind: action
  command: "SVOL0002"
  params: []
- id: volume_control_standby_reset
  label: "Volume Control: Standby Reset"
  kind: action
  command: "SVOL0003"
  params: []
- id: volume_control_query
  label: Query Volume Control Mode
  kind: query
  command: "SVOL????"
  params: []
- id: volume_locked_level_set
  label: Set Volume Locked Level
  kind: action
  command: "VLFL{value}"   # source: VLFL(0000-0100)
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: volume_locked_level_query
  label: Query Volume Locked Level
  kind: query
  command: "VLFL????"
  params: []

# ---- Remote key / Panel key / Menu access ----
- id: remote_key_enable
  label: "Remote Key: Enable"
  kind: action
  command: "RMOT0000"
  params: []
- id: remote_key_disable
  label: "Remote Key: Disable"
  kind: action
  command: "RMOT0001"
  params: []
- id: remote_key_partial
  label: "Remote Key: Partial"
  kind: action
  command: "RMOT0002"
  params: []
- id: remote_key_query
  label: Query Remote Key Mode
  kind: query
  command: "RMOT????"
  params: []
- id: panel_key_enable
  label: "Panel Key: Enable"
  kind: action
  command: "PANL0000"
  params: []
- id: panel_key_disable
  label: "Panel Key: Disable"
  kind: action
  command: "PANL0001"
  params: []
- id: panel_key_query
  label: Query Panel Key Mode
  kind: query
  command: "PANL????"
  params: []
- id: menu_access_enable
  label: "Menu Access: Enable"
  kind: action
  command: "MENU0000"
  params: []
- id: menu_access_disable
  label: "Menu Access: Disable"
  kind: action
  command: "MENU0001"
  params: []
- id: menu_access_query
  label: Query Menu Access Mode
  kind: query
  command: "MENU????"
  params: []

# ---- AV setting menu fixed / OSD mode / Input mode ----
- id: av_setting_menu_disable
  label: "AV Setting Menu: Disable"
  kind: action
  command: "AVMN0000"
  params: []
- id: av_setting_menu_enable
  label: "AV Setting Menu: Enable"
  kind: action
  command: "AVMN0001"
  params: []
- id: av_setting_menu_query
  label: Query AV Setting Menu Fixed
  kind: query
  command: "AVMN????"
  params: []
- id: osd_mode_enable
  label: "OSD Mode: Enable"
  kind: action
  command: "OSD#0000"
  params: []
- id: osd_mode_disable
  label: "OSD Mode: Disable"
  kind: action
  command: "OSD#0001"
  params: []
- id: osd_mode_query
  label: Query OSD Mode
  kind: query
  command: "OSD#????"
  params: []
- id: input_mode_locked
  label: "Input Mode: Locked"
  kind: action
  command: "INPM0000"
  params: []
- id: input_mode_selectable
  label: "Input Mode: Selectable"
  kind: action
  command: "INPM0001"
  params: []
- id: input_mode_ac_reset
  label: "Input Mode: AC Reset"
  kind: action
  command: "INPM0002"
  params: []
- id: input_mode_standby_reset
  label: "Input Mode: Standby Reset"
  kind: action
  command: "INPM0003"
  params: []
- id: input_mode_query
  label: Query Input Mode
  kind: query
  command: "INPM????"
  params: []

# ---- Power-on input source ----
- id: power_on_input_last
  label: "Power-On Input: Last"
  kind: action
  command: "POIS0000"
  params: []
- id: power_on_input_air
  label: "Power-On Input: Air"
  kind: action
  command: "POIS0001"
  params: []
- id: power_on_input_av
  label: "Power-On Input: AV"
  kind: action
  command: "POIS0002"
  params: []
- id: power_on_input_component
  label: "Power-On Input: Component"
  kind: action
  command: "POIS0003"
  params: []
# UNRESOLVED: additional POIS values (HDMI inputs, VGA, etc.) likely exist in
# source but the extracted refined document is truncated immediately after POIS0003.

# ---- Remote button simulator (BTTN) ----
- id: btn_power
  label: "Button: POWER"
  kind: action
  command: "BTTN1012"
  params: []
- id: btn_dash
  label: "Button: Dash (-)"
  kind: action
  command: "BTTN1010"
  params: []
- id: btn_play
  label: "Button: PLAY"
  kind: action
  command: "BTTN1016"
  params: []
- id: btn_ffw
  label: "Button: FFW >>"
  kind: action
  command: "BTTN1017"
  params: []
- id: btn_pause
  label: "Button: PAUSE"
  kind: action
  command: "BTTN1018"
  params: []
- id: btn_previous
  label: "Button: PREVIOUS <<"
  kind: action
  command: "BTTN1019"
  params: []
- id: btn_stop
  label: "Button: STOP"
  kind: action
  command: "BTTN1020"
  params: []
- id: btn_next
  label: "Button: NEXT >>"
  kind: action
  command: "BTTN1021"
  params: []
- id: btn_media_player
  label: "Button: Media Player (HiMedia)"
  kind: action
  command: "BTTN1023"
  params: []
- id: btn_sleep
  label: "Button: SLEEP"
  kind: action
  command: "BTTN1024"
  params: []
- id: btn_cc
  label: "Button: CC"
  kind: action
  command: "BTTN1027"
  params: []
- id: btn_mute
  label: "Button: MUTE"
  kind: action
  command: "BTTN1031"
  params: []
- id: btn_vol_minus
  label: "Button: VOL-"
  kind: action
  command: "BTTN1032"
  params: []
- id: btn_vol_plus
  label: "Button: VOL+"
  kind: action
  command: "BTTN1033"
  params: []
- id: btn_ch_plus
  label: "Button: CH+"
  kind: action
  command: "BTTN1034"
  params: []
- id: btn_ch_minus
  label: "Button: CH-"
  kind: action
  command: "BTTN1035"
  params: []
- id: btn_input
  label: "Button: INPUT"
  kind: action
  command: "BTTN1036"
  params: []
- id: btn_menu
  label: "Button: MENU"
  kind: action
  command: "BTTN1038"
  params: []
- id: btn_connected_home
  label: "Button: Connected Home (HiSmart)"
  kind: action
  command: "BTTN1039"
  params: []
- id: btn_ok_enter
  label: "Button: OK/ENTER"
  kind: action
  command: "BTTN1040"
  params: []
- id: btn_up
  label: "Button: UP"
  kind: action
  command: "BTTN1041"
  params: []
- id: btn_down
  label: "Button: DOWN"
  kind: action
  command: "BTTN1042"
  params: []
- id: btn_left
  label: "Button: LEFT"
  kind: action
  command: "BTTN1043"
  params: []
- id: btn_right
  label: "Button: RIGHT"
  kind: action
  command: "BTTN1044"
  params: []
- id: btn_back
  label: "Button: BACK"
  kind: action
  command: "BTTN1045"
  params: []
- id: btn_exit
  label: "Button: EXIT"
  kind: action
  command: "BTTN1046"
  params: []
- id: btn_red
  label: "Button: Red"
  kind: action
  command: "BTTN1050"
  params: []
- id: btn_green
  label: "Button: Green"
  kind: action
  command: "BTTN1051"
  params: []
- id: btn_blue
  label: "Button: Blue"
  kind: action
  command: "BTTN1052"
  params: []
- id: btn_yellow
  label: "Button: Yellow"
  kind: action
  command: "BTTN1053"
  params: []
- id: btn_mts_sap
  label: "Button: MTS/SAP"
  kind: action
  command: "BTTN1054"
  params: []
- id: btn_live_tv
  label: "Button: Live TV"
  kind: action
  command: "BTTN1055"
  params: []
- id: btn_frw
  label: "Button: FRW <<"
  kind: action
  command: "BTTN1015"
  params: []
- id: btn_digit_0
  label: "Button: 0"
  kind: action
  command: "BTTN1000"
  params: []
- id: btn_digit_1
  label: "Button: 1"
  kind: action
  command: "BTTN1001"
  params: []
- id: btn_digit_2
  label: "Button: 2"
  kind: action
  command: "BTTN1002"
  params: []
- id: btn_digit_3
  label: "Button: 3"
  kind: action
  command: "BTTN1003"
  params: []
- id: btn_digit_4
  label: "Button: 4"
  kind: action
  command: "BTTN1004"
  params: []
- id: btn_digit_5
  label: "Button: 5"
  kind: action
  command: "BTTN1005"
  params: []
- id: btn_digit_6
  label: "Button: 6"
  kind: action
  command: "BTTN1006"
  params: []
- id: btn_digit_7
  label: "Button: 7"
  kind: action
  command: "BTTN1007"
  params: []
- id: btn_digit_8
  label: "Button: 8"
  kind: action
  command: "BTTN1008"
  params: []
- id: btn_digit_9
  label: "Button: 9"
  kind: action
  command: "BTTN1009"
  params: []

# ---- Discrete IR codes (NEC-style 32-bit hex, see source's Pronto CCF tables) ----
# Transport: IR (not RS-232). Stored here for completeness because the same
# manual documents these codes alongside the RS-232 catalogue. Each command:
# value is the COMPLETE HEX CODE column from source (4-byte hex word).
- id: ir_power_toggle
  label: "IR: POWER (toggle)"
  kind: action
  command: "04FB708F"
  params: []
- id: ir_power_on
  label: "IR: POWER ON (discrete)"
  kind: action
  command: "04FB718E"
  params: []
- id: ir_power_off
  label: "IR: POWER OFF (discrete)"
  kind: action
  command: "04FB728D"
  params: []
- id: ir_input_toggle
  label: "IR: INPUT (toggle)"
  kind: action
  command: "04FB738C"
  params: []
- id: ir_tv_tuner1
  label: "IR: TV TUNER1"
  kind: action
  command: "04FB748B"
  params: []
- id: ir_hdmi_1
  label: "IR: HDMI.1"
  kind: action
  command: "04FB7C83"
  params: []
- id: ir_hdmi_2
  label: "IR: HDMI.2"
  kind: action
  command: "04FB7D82"
  params: []
- id: ir_hdmi_3
  label: "IR: HDMI.3"
  kind: action
  command: "04FB7E81"
  params: []
- id: ir_hdmi_4
  label: "IR: HDMI.4"
  kind: action
  command: "04FB7F80"
  params: []
- id: ir_hdmi_5
  label: "IR: HDMI.5"
  kind: action
  command: "04FB807F"
  params: []
- id: ir_vga
  label: "IR: VGA"
  kind: action
  command: "04FB817E"
  params: []
- id: ir_usb
  label: "IR: USB"
  kind: action
  command: "04FB827D"
  params: []
- id: ir_picture_mode_toggle
  label: "IR: PICTURE MODE (toggle)"
  kind: action
  command: "04FB837C"
  params: []
- id: ir_sound_mode_toggle
  label: "IR: SOUND MODE (toggle)"
  kind: action
  command: "04FB847B"
  params: []
- id: ir_aspect_wide_16_9
  label: "IR: ASPECT RATIO Wide 16:9"
  kind: action
  command: "04FB857A"
  params: []
- id: ir_aspect_normal_4_3
  label: "IR: ASPECT RATIO Normal 4:3"
  kind: action
  command: "04FB8679"
  params: []
- id: ir_aspect_cinema
  label: "IR: ASPECT RATIO Cinema"
  kind: action
  command: "04FB8778"
  params: []
- id: ir_aspect_panorama
  label: "IR: ASPECT RATIO Panorama"
  kind: action
  command: "04FB8877"
  params: []
- id: ir_aspect_zoom
  label: "IR: ASPECT RATIO Zoom"
  kind: action
  command: "04FB8976"
  params: []
- id: ir_channel_list
  label: "IR: CHANNEL LIST"
  kind: action
  command: "04FB8A75"
  params: []
- id: ir_fav_channel
  label: "IR: FAV CHANNEL"
  kind: action
  command: "04FB8B74"
  params: []
- id: ir_sleep
  label: "IR: SLEEP"
  kind: action
  command: "04FB8C73"
  params: []
- id: ir_tv_menu_toggle
  label: "IR: TV MENU (toggle)"
  kind: action
  command: "04FB8D72"
  params: []
- id: ir_home
  label: "IR: HOME"
  kind: action
  command: "04FB8E71"
  params: []
- id: ir_tools
  label: "IR: TOOLS (Second Menu)"
  kind: action
  command: "04FB8F70"
  params: []
- id: ir_digit_0
  label: "IR: Digit 0"
  kind: action
  command: "04FB906F"
  params: []
- id: ir_digit_1
  label: "IR: Digit 1"
  kind: action
  command: "04FB916E"
  params: []
- id: ir_digit_2
  label: "IR: Digit 2"
  kind: action
  command: "04FB926D"
  params: []
- id: ir_digit_3
  label: "IR: Digit 3"
  kind: action
  command: "04FB936C"
  params: []
- id: ir_digit_4
  label: "IR: Digit 4"
  kind: action
  command: "04FB946B"
  params: []
- id: ir_digit_5
  label: "IR: Digit 5"
  kind: action
  command: "04FB956A"
  params: []
- id: ir_digit_6
  label: "IR: Digit 6"
  kind: action
  command: "04FB9669"
  params: []
- id: ir_digit_7
  label: "IR: Digit 7"
  kind: action
  command: "04FB9768"
  params: []
- id: ir_digit_8
  label: "IR: Digit 8"
  kind: action
  command: "04FB9867"
  params: []
- id: ir_digit_9
  label: "IR: Digit 9"
  kind: action
  command: "04FB9966"
  params: []
- id: ir_digit_dash
  label: "IR: Digit Dash (-)"
  kind: action
  command: "04FB9A65"
  params: []
- id: ir_previous_channel
  label: "IR: PREVIOUS CHANNEL"
  kind: action
  command: "04FB9B64"
  params: []
- id: ir_up_arrow
  label: "IR: UP ARROW"
  kind: action
  command: "04FB9C63"
  params: []
- id: ir_down_arrow
  label: "IR: DOWN ARROW"
  kind: action
  command: "04FB9D62"
  params: []
- id: ir_left_arrow
  label: "IR: LEFT ARROW"
  kind: action
  command: "04FB9E61"
  params: []
- id: ir_right_arrow
  label: "IR: RIGHT ARROW"
  kind: action
  command: "04FB9F60"
  params: []
- id: ir_enter
  label: "IR: ENTER"
  kind: action
  command: "04FBA05F"
  params: []
- id: ir_select_ok
  label: "IR: SELECT (OK)"
  kind: action
  command: "04FBA15E"
  params: []
- id: ir_return
  label: "IR: RETURN"
  kind: action
  command: "04FBA25D"
  params: []
- id: ir_exit
  label: "IR: EXIT"
  kind: action
  command: "04FBA35C"
  params: []
- id: ir_info_display_toggle
  label: "IR: INFO/DISPLAY (toggle)"
  kind: action
  command: "04FBA45B"
  params: []
- id: ir_volume_minus
  label: "IR: VOLUME -"
  kind: action
  command: "04FBA55A"
  params: []
- id: ir_volume_plus
  label: "IR: VOLUME +"
  kind: action
  command: "04FBA659"
  params: []
- id: ir_channel_minus
  label: "IR: CHANNEL -"
  kind: action
  command: "04FBA758"
  params: []
- id: ir_channel_plus
  label: "IR: CHANNEL +"
  kind: action
  command: "04FBA857"
  params: []
- id: ir_pip_toggle
  label: "IR: PIP (toggle)"
  kind: action
  command: "04FBA956"
  params: []
- id: ir_pip_input
  label: "IR: PIP INPUT"
  kind: action
  command: "04FBAA55"
  params: []
- id: ir_pip_swap
  label: "IR: PIP SWAP"
  kind: action
  command: "04FBAB54"
  params: []
- id: ir_pip_position
  label: "IR: PIP POSITION"
  kind: action
  command: "04FBAC53"
  params: []
- id: ir_pip_size
  label: "IR: PIP SIZE"
  kind: action
  command: "04FBAD52"
  params: []
- id: ir_guide_toggle
  label: "IR: Guide (toggle)"
  kind: action
  command: "04FBAE51"
  params: []
- id: ir_freeze_toggle
  label: "IR: Freeze (toggle)"
  kind: action
  command: "04FBAF50"
  params: []
# UNRESOLVED: additional IR codes between TV TUNER1 (04FB748B) and HDMI.1
# (04FB7C83) likely exist in source but the discrete-IR table extraction was
# truncated mid-row; not enumerated to avoid fabrication.
```

## Feedbacks
```yaml
- id: ack_okay
  label: Acknowledgement OKAY
  type: enum
  values: [OKAY]
  description: Returned in ACK DATA field when a Set command succeeded.
- id: ack_error
  label: Acknowledgement ERROR
  type: enum
  values: [EROR]
  description: Returned when the device cannot process the command.
- id: ack_wait
  label: Acknowledgement WAIT
  type: enum
  values: [WAIT]
  description: Returned during command processing before final ACK (e.g. power-on sequence emits WAIT then OKAY).
- id: power_state
  type: enum
  values: [0, 1]   # 0 = standby, 1 = power on
  source_command: "POWR????"   # UNRESOLVED: query mnemonic for power state not explicitly listed in extracted text; POWR is the set command.
- id: input_state
  type: enum
  values: [1, 3, 4, 6, 9, 10, 11, 12]   # TV, Component, AV, VGA, HDMI1..HDMI4
  source_command: "INPT????"
- id: picture_mode_state
  type: enum
  values: [0, 2, 3, 4, 5, 6]   # Standard, Vivid, EnergySaving, Theater, Game, Sport
  source_command: "PMOD????"
- id: brightness_state
  type: integer
  range: [0, 100]
  source_command: "BRIT????"
- id: contrast_state
  type: integer
  range: [0, 100]
  source_command: "CONT????"
- id: color_saturation_state
  type: integer
  range: [0, 100]
  source_command: "COLR????"
- id: tint_state
  type: integer
  range: [0, 100]
  source_command: "TINT????"
- id: sharpness_state
  type: integer
  range: [0, 20]
  source_command: "SHRP????"
- id: aspect_state
  type: enum
  values: [0, 2, 3, 4, 5, 6, 7, 8]
  source_command: "ASPT????"
- id: overscan_state
  type: enum
  values: [0, 2]
  source_command: "OVSN????"
- id: color_temp_state
  type: enum
  values: [0, 2, 3, 4]
  source_command: "CTEM????"
- id: backlight_state
  type: integer
  range: [0, 100]
  source_command: "BKLV????"
- id: sound_mode_state
  type: enum
  values: [0, 2, 3, 4, 5]
  source_command: "AMOD????"
- id: volume_state
  type: integer
  range: [0, 100]
  source_command: "VOLM????"
- id: mute_state
  type: enum
  values: [0, 1]
  source_command: "MUTE????"
- id: tv_speaker_state
  type: enum
  values: [0, 2]
  source_command: "ASPK????"
- id: tuner_state
  type: enum
  values: [0, 2]
  source_command: "TUNR????"
- id: caption_state
  type: enum
  values: [0, 2, 3]
  source_command: "CC##????"
- id: osd_language_state
  type: enum
  values: [0, 2, 3]
  source_command: "LANG????"
- id: standby_led_state
  type: enum
  values: [0, 2]
  source_command: "PLED????"
- id: power_off_mode_state
  type: enum
  values: [0, 1]
  source_command: "PBTN????"
- id: volume_range_state
  type: integer
  range: [0, 100]
  source_command: "MAVL????"
- id: volume_control_state
  type: enum
  values: [0, 1, 2, 3]
  source_command: "SVOL????"
- id: volume_locked_level_state
  type: integer
  range: [0, 100]
  source_command: "VLFL????"
- id: remote_key_state
  type: enum
  values: [0, 1, 2]
  source_command: "RMOT????"
- id: panel_key_state
  type: enum
  values: [0, 1]
  source_command: "PANL????"
- id: menu_access_state
  type: enum
  values: [0, 1]
  source_command: "MENU????"
- id: av_setting_menu_state
  type: enum
  values: [0, 1]
  source_command: "AVMN????"
- id: osd_mode_state
  type: enum
  values: [0, 1]
  source_command: "OSD#????"
- id: input_mode_state
  type: enum
  values: [0, 1, 2, 3]
  source_command: "INPM????"
- id: power_on_command_state
  type: enum
  values: [0, 1]
  source_command: "PWRE????"
```

## Variables
```yaml
# Settable scalar values that also expose a query response. Each maps to
# matching set/query action pairs above.
- id: brightness
  type: integer
  range: [0, 100]
  set: brightness_set
  query: brightness_query
- id: contrast
  type: integer
  range: [0, 100]
  set: contrast_set
  query: contrast_query
- id: color_saturation
  type: integer
  range: [0, 100]
  set: color_saturation_set
  query: color_saturation_query
- id: tint
  type: integer
  range: [0, 100]
  set: tint_set
  query: tint_query
- id: sharpness
  type: integer
  range: [0, 20]
  set: sharpness_set
  query: sharpness_query
- id: backlight
  type: integer
  range: [0, 100]
  set: backlight_set
  query: backlight_query
- id: volume
  type: integer
  range: [0, 100]
  set: volume_set
  query: volume_query
- id: volume_range_max
  type: integer
  range: [0, 100]
  set: volume_range_set
  query: volume_range_query
- id: volume_locked_level
  type: integer
  range: [0, 100]
  set: volume_locked_level_set
  query: volume_locked_level_query
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from
# the TV; all returns appear to be solicited ACK responses to Set/Query.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macros.
# (One semi-macro is documented in prose: enable RS-232 remote power-on by
# sending PWRE0001, THEN sending POWR0001 to actually power on from standby.
# Not formalized here because source does not present it as a structured macro.)
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset       # source labels RSET9999 as "Restore Factory Settings" - destructive
interlocks: []
# UNRESOLVED: source contains no electrical, thermal, or installation safety
# warnings beyond a note that RS-232 power-on in standby requires both
# Custom-Install "Power On Command = Enable" AND command PWRE0001 to be sent
# beforehand.
```

## Notes

**Custom Install setup (from source).** Before RS-232 control works, the operator must enter the Quick Settings menu and type the unlock sequence `7 3 1 0` to expose the Custom Install menu, then set `Custom Installation: Enable`. To allow power-on from standby over RS-232, also set `Power On Command: Enable` in the same menu (this is the persistent equivalent of sending PWRE0001).

**Wire-format details (from source).** All RS-232 commands use fixed-length ASCII fields wrapped as:

```
S{CLIENT_ID 3B}{COMMAND 4B}{DATA 4B}{CHECKSUM 1B}{0x0D}      (Set)
Q{CLIENT_ID 3B}{COMMAND 4B}????{CHECKSUM 1B}{0x0D}           (Query)
```

`CLIENT_ID` is the last 3 hex digits of the TV's Ethernet MAC, or `ALL` (broadcast to every TV on the bus). For a TV with MAC suffix `465`, "set power on" becomes `S465POWR0001` + 1-byte 8-bit checksum + `0x0D`. The checksum is chosen so the sum of all preceding bytes (including the checksum byte) equals `0x00 mod 256`. Protocol is case-sensitive. ACK strings include `OKAY`, `EROR`, and `WAIT`.

**Worked source examples (verbatim ASCII / HEX).**
- Enable RS-232 power-on: `S5FAPOWER232[0xCD][0x0D]` → `5FA:OKAY####[0x4A][0x0D]`
  - Then turn on TV 5FA: `S5FAPOWRON##[0xC6][0x0D]` → `5FA:WAIT####[0x49][0x0D]` then `5FA:OKAY####[0x4A][0x0D]`
- Query current input: `Q5FAINPT????[0xBC][0x0D]` → `5FA:OKAYHDM1[0xCB][0x0D]`

<!-- UNRESOLVED: the worked source example uses the mnemonics POWER232 and POWRON, but the structured command table only documents PWRE (4-byte mnemonic) and POWR. These appear to be earlier-revision aliases; the table-form PWRE0001 + POWR0001 are the canonical set commands. The aliases are not enumerated as separate actions here because the source treats them as illustrative. -->

**Connector & pinout (from source).** DB9 female chassis-mount on the TV. Female pinout: 1=RI, 2=TXD, 3=RXD, 4=DSR, 5=GND, 6=DTR, 7=CTS, 8=RTS, 9=Power Input/DCD. USB-to-Serial adapter required if controller has only USB.

**IR vs RS-232 coverage.** Source documents both transports. The IR-only commands above (`ir_*` prefix) are listed for completeness — the underlying transport is consumer IR (NEC-style), not RS-232. A controller wanting bidirectional control + feedback should use RS-232; IR is one-way and toggle-style on several commands (POWER, INPUT, PICTURE MODE, SOUND MODE, PIP, Guide, Freeze, TV MENU, INFO/DISPLAY).

**Multi-TV addressing.** The 3-byte CLIENT_ID lets a single RS-232 trunk address multiple TVs (each with a unique MAC suffix), with `ALL` broadcasting to every TV. Queries to `ALL` are not meaningful (no aggregate response).

<!-- UNRESOLVED: TCP/IP control endpoint. Source mentions Ethernet MAC for client-ID purposes only; it does not describe a TCP or HTTP control endpoint. -->
<!-- UNRESOLVED: full POIS (power-on input) enum and any commands documented after the POIS section — the refined source file is truncated mid-table immediately after POIS0003. -->
<!-- UNRESOLVED: complete IR discrete-code list between TV TUNER1 (04FB748B) and HDMI.1 (04FB7C83) — refined source extraction shows a gap in this band of the discrete-IR table. -->
<!-- UNRESOLVED: firmware version compatibility, protocol revision applicability to the specific 85U8K model (source title is generic "Hisense Prosumer TV"; operator asserted 85U8K). -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-02T01:53:02.818Z
last_checked_at: 2026-06-02T22:08:06.583Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:06.583Z
matched_actions: 222
action_count: 222
confidence: medium
summary: "All 222 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source 85U8K-specific model coverage not explicitly listed in extracted text (the \"Models\" section was blank in extraction); pulled model from operator input."
- "TCP/IP / network control not described in source — only RS-232 and IR."
- "additional POIS values (HDMI inputs, VGA, etc.) likely exist in"
- "additional IR codes between TV TUNER1 (04FB748B) and HDMI.1"
- "query mnemonic for power state not explicitly listed in extracted text; POWR is the set command."
- "source does not describe unsolicited event notifications from"
- "source does not describe multi-step macros."
- "source contains no electrical, thermal, or installation safety"
- "the worked source example uses the mnemonics POWER232 and POWRON, but the structured command table only documents PWRE (4-byte mnemonic) and POWR. These appear to be earlier-revision aliases; the table-form PWRE0001 + POWR0001 are the canonical set commands. The aliases are not enumerated as separate actions here because the source treats them as illustrative."
- "TCP/IP control endpoint. Source mentions Ethernet MAC for client-ID purposes only; it does not describe a TCP or HTTP control endpoint."
- "full POIS (power-on input) enum and any commands documented after the POIS section — the refined source file is truncated mid-table immediately after POIS0003."
- "complete IR discrete-code list between TV TUNER1 (04FB748B) and HDMI.1 (04FB7C83) — refined source extraction shows a gap in this band of the discrete-IR table."
- "firmware version compatibility, protocol revision applicability to the specific 85U8K model (source title is generic \"Hisense Prosumer TV\"; operator asserted 85U8K)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
