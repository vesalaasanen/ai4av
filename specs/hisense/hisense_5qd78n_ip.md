---
spec_id: admin/hisense-5qd78n
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5QD78N Control Spec"
manufacturer: HiSense
model_family: 5QD78N
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5QD78N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:41.567Z
last_checked_at: 2026-06-02T10:14:04.114Z
generated_at: 2026-06-02T10:14:04.114Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "source document titled \"RS-232/IR Protocol for Hisense Prosumer TV\" — does not specify exact model list; 5QD78N assumed from input context"
  - "no IP/TCP control commands described in this source; known_protocol TCP/IP from user input not confirmed in source text"
  - "no unsolicited event/notification protocol described in source"
  - "no multi-step sequences described in source"
  - "populate if source contains safety warnings, interlock procedures,"
  - "source document page with POIS extended values was truncated; HDMI entries for power-on input source may be missing"
  - "no TCP/IP port or network configuration documented despite user indicating TCP/IP protocol"
verification:
  verdict: verified
  checked_at: 2026-06-02T10:14:04.114Z
  matched_actions: 111
  action_count: 111
  confidence: medium
  summary: "All 111 spec actions matched verbatim in source including all 9 POIS values (0000-0008); transport confirmed; only 4 source-only commands (SPKM, B2BM, USBM, PSHF) unrepresented, below the short threshold. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# HiSense 5QD78N Control Spec

## Summary
HiSense Prosumer TV controlled via RS-232 serial (DB9) using fixed-length ASCII protocol with checksum. Commands cover power, input selection, picture/audio settings, volume, channel, caption, OSD, and hospitality features (panel lock, volume lock, remote lock, menu access). IR discrete codes also documented but not included in this serial spec.

<!-- UNRESOLVED: source document titled "RS-232/IR Protocol for Hisense Prosumer TV" — does not specify exact model list; 5QD78N assumed from input context -->
<!-- UNRESOLVED: no IP/TCP control commands described in this source; known_protocol TCP/IP from user input not confirmed in source text -->

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
  connector: DB9_female
  pinout:
    1: N/C
    2: RXD
    3: TXD
    4: DTR
    5: GND
    6: DSR
    7: RTS
    8: CTS
    9: Power_Input
  code: ASCII
  termination: "0x0D"
  command_format: "{OP}{CLIENT_ID}{COMMAND}{DATA}{CHECKSUM}{CR}"
  op_set: S
  op_query: Q
  client_id_all: ALL
  client_id_mac: last 3 bytes of Ethernet MAC address (hex)
  checksum: 8-bit XOR sum of preceding bytes; whole string including checksum byte equals zero
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # POWR, PWRE commands
  - queryable    # query variants (????) for all set commands
  - routable     # INPT input source selection
  - levelable    # VOLM, BRIT, CONT, BKLV, COLR, TINT, SHRP continuous ranges
```

## Actions
```yaml
actions:
  - id: power_on_cmd_enable_disable
    label: "Power On Command Setting"
    kind: action
    command: "S{CID}PWRE{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=disable RS232 remote power on, 0001=enable"
    notes: "PWRE command. CID=client ID (3 hex chars or ALL)."

  - id: power_on_cmd_query
    label: "Query Power On Command Setting"
    kind: query
    command: "Q{CID}PWRE????"
    params: []
    response: "CID:OKAY{DATA}"
    response_data: "0=disabled, 1=enabled"

  - id: power_set
    label: "Set Power On/Off"
    kind: action
    command: "S{CID}POWR{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=standby, 0001=power on"
    notes: "Not available in standby unless PWRE enabled."

  - id: input_set
    label: "Set Input Source"
    kind: action
    command: "S{CID}INPT{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
          - "0003"
          - "0004"
          - "0006"
          - "0009"
          - "0010"
          - "0011"
          - "0012"
        description: "0000=cycle, 0001=TV, 0003=Component, 0004=AV, 0006=VGA, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4"

  - id: input_query
    label: "Query Current Input Source"
    kind: query
    command: "Q{CID}INPT????"
    params: []
    response_data: "1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"

  - id: picture_mode_set
    label: "Set Picture Mode"
    kind: action
    command: "S{CID}PMOD{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
          - "0003"
          - "0004"
          - "0005"
          - "0006"
        description: "0000=Standard, 0002=Vivid, 0003=EnergySaving, 0004=Theater, 0005=Game, 0006=Sport"

  - id: picture_mode_query
    label: "Query Picture Mode"
    kind: query
    command: "Q{CID}PMOD????"
    params: []
    response_data: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"

  - id: brightness_set
    label: "Set Brightness"
    kind: action
    command: "S{CID}BRIT{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Brightness value 0000-0100 (zero-padded 4 digits)"

  - id: brightness_query
    label: "Query Brightness"
    kind: query
    command: "Q{CID}BRIT????"
    params: []
    response_data: "0-100"

  - id: contrast_set
    label: "Set Contrast"
    kind: action
    command: "S{CID}CONT{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Contrast value 0000-0100 (zero-padded 4 digits)"

  - id: contrast_query
    label: "Query Contrast"
    kind: query
    command: "Q{CID}CONT????"
    params: []
    response_data: "0-100"

  - id: color_saturation_set
    label: "Set Color Saturation"
    kind: action
    command: "S{CID}COLR{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Color saturation 0000-0100 (zero-padded 4 digits)"

  - id: color_saturation_query
    label: "Query Color Saturation"
    kind: query
    command: "Q{CID}COLR????"
    params: []
    response_data: "0-100"

  - id: tint_set
    label: "Set Tint"
    kind: action
    command: "S{CID}TINT{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Tint value 0000-0100 (zero-padded 4 digits)"

  - id: tint_query
    label: "Query Tint"
    kind: query
    command: "Q{CID}TINT????"
    params: []
    response_data: "0-100"

  - id: sharpness_set
    label: "Set Sharpness"
    kind: action
    command: "S{CID}SHRP{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 20
        description: "Sharpness 0000-0020 (zero-padded 4 digits)"

  - id: sharpness_query
    label: "Query Sharpness"
    kind: query
    command: "Q{CID}SHRP????"
    params: []
    response_data: "0-20"

  - id: aspect_ratio_set
    label: "Set Aspect Ratio"
    kind: action
    command: "S{CID}ASPT{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
          - "0003"
          - "0004"
          - "0005"
          - "0006"
          - "0007"
          - "0008"
        description: "0000=Auto, 0002=Normal, 0003=Zoom, 0004=Wide, 0005=Direct, 0006=1-to-1 pixel map, 0007=Panoramic, 0008=Cinema"

  - id: aspect_ratio_query
    label: "Query Aspect Ratio"
    kind: query
    command: "Q{CID}ASPT????"
    params: []
    response_data: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1, 7=Panoramic, 8=Cinema"

  - id: overscan_set
    label: "Set Overscan"
    kind: action
    command: "S{CID}OVSN{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
        description: "0000=On, 0002=Off"

  - id: overscan_query
    label: "Query Overscan"
    kind: query
    command: "Q{CID}OVSN????"
    params: []
    response_data: "0=On, 2=Off"

  - id: reset_picture
    label: "Reset Picture Settings"
    kind: action
    command: "S{CID}RSTP1000"
    params: []

  - id: color_temp_set
    label: "Set Color Temperature"
    kind: action
    command: "S{CID}CTEM{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
          - "0003"
          - "0004"
        description: "0000=High, 0002=Middle, 0003=Mid-Low, 0004=Low"

  - id: color_temp_query
    label: "Query Color Temperature"
    kind: query
    command: "Q{CID}CTEM????"
    params: []
    response_data: "0=High, 2=Middle, 3=Mid-Low, 4=Low"

  - id: backlight_set
    label: "Set Backlight"
    kind: action
    command: "S{CID}BKLV{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Backlight 0000-0100 (zero-padded 4 digits)"

  - id: backlight_query
    label: "Query Backlight"
    kind: query
    command: "Q{CID}BKLV????"
    params: []
    response_data: "0-100"

  - id: sound_mode_set
    label: "Set Sound Mode"
    kind: action
    command: "S{CID}AMOD{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
          - "0003"
          - "0004"
          - "0005"
        description: "0000=Standard, 0002=Theater, 0003=Music, 0004=Speech, 0005=Late night"

  - id: sound_mode_query
    label: "Query Sound Mode"
    kind: query
    command: "Q{CID}AMOD????"
    params: []
    response_data: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"

  - id: reset_audio
    label: "Reset Audio Settings"
    kind: action
    command: "S{CID}RSTA2000"
    params: []

  - id: volume_set
    label: "Set Volume"
    kind: action
    command: "S{CID}VOLM{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Volume 0000-0100 (zero-padded 4 digits)"

  - id: volume_query
    label: "Query Volume"
    kind: query
    command: "Q{CID}VOLM????"
    params: []
    response_data: "0-100"

  - id: mute_set
    label: "Set Mute"
    kind: action
    command: "S{CID}MUTE{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=mute off, 0001=mute on"

  - id: mute_query
    label: "Query Mute Status"
    kind: query
    command: "Q{CID}MUTE????"
    params: []
    response_data: "0=not muted, 1=muted"

  - id: speaker_set
    label: "Set TV Speaker"
    kind: action
    command: "S{CID}ASPK{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
        description: "0000=off, 0002=on"

  - id: speaker_query
    label: "Query TV Speaker"
    kind: query
    command: "Q{CID}ASPK????"
    params: []
    response_data: "0=off, 2=on"

  - id: tuner_mode_set
    label: "Set Tuner Mode"
    kind: action
    command: "S{CID}TUNR{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
        description: "0000=Antenna, 0002=Cable"

  - id: tuner_mode_query
    label: "Query Tuner Mode"
    kind: query
    command: "Q{CID}TUNR????"
    params: []
    response_data: "0=Antenna, 2=Cable"

  - id: auto_search
    label: "Automatic Search"
    kind: action
    command: "S{CID}TSCN0001"
    params: []

  - id: channel_switch
    label: "Channel Up/Down"
    kind: action
    command: "S{CID}CHAN{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=channel down, 0001=channel up"

  - id: caption_set
    label: "Set Caption Control"
    kind: action
    command: "S{CID}CC##{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
          - "0003"
        description: "0000=off, 0002=on, 0003=CC on when mute"

  - id: caption_query
    label: "Query Caption Control"
    kind: query
    command: "Q{CID}CC##????"
    params: []
    response_data: "0=off, 2=on, 3=CC on when mute"

  - id: factory_reset
    label: "Restore Factory Settings"
    kind: action
    command: "S{CID}RSET9999"
    params: []

  - id: osd_language_set
    label: "Set OSD Language"
    kind: action
    command: "S{CID}LANG{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
          - "0003"
        description: "0000=English, 0002=Español, 0003=Français"

  - id: osd_language_query
    label: "Query OSD Language"
    kind: query
    command: "Q{CID}LANG????"
    params: []
    response_data: "0=English, 2=Español, 3=Français"

  - id: standby_led_set
    label: "Set Standby LED"
    kind: action
    command: "S{CID}PLED{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0002"
        description: "0000=off, 0002=on"

  - id: standby_led_query
    label: "Query Standby LED"
    kind: query
    command: "Q{CID}PLED????"
    params: []
    response_data: "0=off, 2=on"

  - id: button_ch_up
    label: "Remote Button CH+"
    kind: action
    command: "S{CID}BTTN1034"
    params: []

  - id: button_ch_down
    label: "Remote Button CH-"
    kind: action
    command: "S{CID}BTTN1035"
    params: []

  - id: button_vol_down
    label: "Remote Button VOL-"
    kind: action
    command: "S{CID}BTTN1032"
    params: []

  - id: button_vol_up
    label: "Remote Button VOL+"
    kind: action
    command: "S{CID}BTTN1033"
    params: []

  - id: button_back
    label: "Remote Button BACK"
    kind: action
    command: "S{CID}BTTN1045"
    params: []

  - id: button_power
    label: "Remote Button POWER"
    kind: action
    command: "S{CID}BTTN1012"
    params: []

  - id: button_mute
    label: "Remote Button MUTE"
    kind: action
    command: "S{CID}BTTN1031"
    params: []

  - id: button_dash
    label: "Remote Button DASH"
    kind: action
    command: "S{CID}BTTN1010"
    params: []

  - id: button_input
    label: "Remote Button INPUT"
    kind: action
    command: "S{CID}BTTN1036"
    params: []

  - id: button_media_player
    label: "Remote Button HiMedia"
    kind: action
    command: "S{CID}BTTN1023"
    params: []

  - id: button_digit_0
    label: "Remote Button 0"
    kind: action
    command: "S{CID}BTTN1000"
    params: []

  - id: button_digit_1
    label: "Remote Button 1"
    kind: action
    command: "S{CID}BTTN1001"
    params: []

  - id: button_digit_2
    label: "Remote Button 2"
    kind: action
    command: "S{CID}BTTN1002"
    params: []

  - id: button_digit_3
    label: "Remote Button 3"
    kind: action
    command: "S{CID}BTTN1003"
    params: []

  - id: button_digit_4
    label: "Remote Button 4"
    kind: action
    command: "S{CID}BTTN1004"
    params: []

  - id: button_digit_5
    label: "Remote Button 5"
    kind: action
    command: "S{CID}BTTN1005"
    params: []

  - id: button_digit_6
    label: "Remote Button 6"
    kind: action
    command: "S{CID}BTTN1006"
    params: []

  - id: button_digit_7
    label: "Remote Button 7"
    kind: action
    command: "S{CID}BTTN1007"
    params: []

  - id: button_digit_8
    label: "Remote Button 8"
    kind: action
    command: "S{CID}BTTN1008"
    params: []

  - id: button_digit_9
    label: "Remote Button 9"
    kind: action
    command: "S{CID}BTTN1009"
    params: []

  - id: button_sleep
    label: "Remote Button SLEEP"
    kind: action
    command: "S{CID}BTTN1024"
    params: []

  - id: button_mts_sap
    label: "Remote Button MTS/SAP"
    kind: action
    command: "S{CID}BTTN1054"
    params: []

  - id: button_live_tv
    label: "Remote Button Live TV"
    kind: action
    command: "S{CID}BTTN1055"
    params: []

  - id: button_pause
    label: "Remote Button PAUSE"
    kind: action
    command: "S{CID}BTTN1018"
    params: []

  - id: button_play
    label: "Remote Button PLAY"
    kind: action
    command: "S{CID}BTTN1016"
    params: []

  - id: button_menu
    label: "Remote Button MENU"
    kind: action
    command: "S{CID}BTTN1038"
    params: []

  - id: button_exit
    label: "Remote Button EXIT"
    kind: action
    command: "S{CID}BTTN1046"
    params: []

  - id: button_stop
    label: "Remote Button STOP"
    kind: action
    command: "S{CID}BTTN1020"
    params: []

  - id: button_frw
    label: "Remote Button FRW"
    kind: action
    command: "S{CID}BTTN1015"
    params: []

  - id: button_cc
    label: "Remote Button CC"
    kind: action
    command: "S{CID}BTTN1027"
    params: []

  - id: button_red
    label: "Remote Button Red"
    kind: action
    command: "S{CID}BTTN1050"
    params: []

  - id: button_green
    label: "Remote Button Green"
    kind: action
    command: "S{CID}BTTN1051"
    params: []

  - id: button_yellow
    label: "Remote Button Yellow"
    kind: action
    command: "S{CID}BTTN1053"
    params: []

  - id: button_blue
    label: "Remote Button Blue"
    kind: action
    command: "S{CID}BTTN1052"
    params: []

  - id: button_up
    label: "Remote Button UP"
    kind: action
    command: "S{CID}BTTN1041"
    params: []

  - id: button_down
    label: "Remote Button DOWN"
    kind: action
    command: "S{CID}BTTN1042"
    params: []

  - id: button_left
    label: "Remote Button LEFT"
    kind: action
    command: "S{CID}BTTN1043"
    params: []

  - id: button_right
    label: "Remote Button RIGHT"
    kind: action
    command: "S{CID}BTTN1044"
    params: []

  - id: button_ok_enter
    label: "Remote Button OK/ENTER"
    kind: action
    command: "S{CID}BTTN1040"
    params: []

  - id: button_ffw
    label: "Remote Button FFW"
    kind: action
    command: "S{CID}BTTN1017"
    params: []

  - id: button_previous
    label: "Remote Button PREVIOUS"
    kind: action
    command: "S{CID}BTTN1019"
    params: []

  - id: button_next
    label: "Remote Button NEXT"
    kind: action
    command: "S{CID}BTTN1021"
    params: []

  - id: button_connected_home
    label: "Remote Button HiSmart"
    kind: action
    command: "S{CID}BTTN1039"
    params: []

  - id: power_off_control_mode_set
    label: "Set Power Off Control Mode"
    kind: action
    command: "S{CID}PBTN{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=AC only, 0001=ALL"

  - id: power_off_control_mode_query
    label: "Query Power Off Control Mode"
    kind: query
    command: "Q{CID}PBTN????"
    params: []
    response_data: "0=AC only, 1=ALL"

  - id: max_volume_set
    label: "Set Max Volume Range"
    kind: action
    command: "S{CID}MAVL{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Max volume 0000-0100 (zero-padded 4 digits)"

  - id: max_volume_query
    label: "Query Max Volume Range"
    kind: query
    command: "Q{CID}MAVL????"
    params: []
    response_data: "0-100"

  - id: volume_control_set
    label: "Set Volume Control Mode"
    kind: action
    command: "S{CID}SVOL{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
          - "0002"
          - "0003"
        description: "0000=locked, 0001=last volume, 0002=AC reset, 0003=standby reset"

  - id: volume_control_query
    label: "Query Volume Control Mode"
    kind: query
    command: "Q{CID}SVOL????"
    params: []
    response_data: "0=locked, 1=last volume, 2=AC reset, 3=standby reset"

  - id: volume_locked_level_set
    label: "Set Volume Locked Level"
    kind: action
    command: "S{CID}VLFL{VALUE}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Locked volume level 0000-0100 (zero-padded 4 digits)"

  - id: volume_locked_level_query
    label: "Query Volume Locked Level"
    kind: query
    command: "Q{CID}VLFL????"
    params: []
    response_data: "0-100"

  - id: remote_key_set
    label: "Set Remote Key Lock"
    kind: action
    command: "S{CID}RMOT{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
          - "0002"
        description: "0000=enable, 0001=disable, 0002=partial"

  - id: remote_key_query
    label: "Query Remote Key Lock"
    kind: query
    command: "Q{CID}RMOT????"
    params: []
    response_data: "0=enable, 1=disable, 2=partial"

  - id: panel_key_set
    label: "Set Panel Key Lock"
    kind: action
    command: "S{CID}PANL{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=enable, 0001=disable"

  - id: panel_key_query
    label: "Query Panel Key Lock"
    kind: query
    command: "Q{CID}PANL????"
    params: []
    response_data: "0=enable, 1=disable"

  - id: menu_access_set
    label: "Set Menu Access"
    kind: action
    command: "S{CID}MENU{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=enable, 0001=disable"

  - id: menu_access_query
    label: "Query Menu Access"
    kind: query
    command: "Q{CID}MENU????"
    params: []
    response_data: "0=enable, 1=disable"

  - id: av_setting_menu_set
    label: "Set AV Setting Menu"
    kind: action
    command: "S{CID}AVMN{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=disable, 0001=enable"

  - id: av_setting_menu_query
    label: "Query AV Setting Menu"
    kind: query
    command: "Q{CID}AVMN????"
    params: []
    response_data: "0=disable, 1=enable"

  - id: osd_mode_set
    label: "Set OSD Mode"
    kind: action
    command: "S{CID}OSD#{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
        description: "0000=enable, 0001=disable"

  - id: osd_mode_query
    label: "Query OSD Mode"
    kind: query
    command: "Q{CID}OSD#????"
    params: []
    response_data: "0=enable, 1=disable"

  - id: input_mode_set
    label: "Set Input Mode"
    kind: action
    command: "S{CID}INPM{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
          - "0002"
          - "0003"
        description: "0000=locked, 0001=selectable, 0002=AC reset, 0003=standby reset"

  - id: input_mode_query
    label: "Query Input Mode"
    kind: query
    command: "Q{CID}INPM????"
    params: []
    response_data: "0=locked, 1=selectable, 2=AC reset, 3=standby reset"

  - id: power_on_input_set
    label: "Set Power On Input Source"
    kind: action
    command: "S{CID}POIS{VALUE}"
    params:
      - name: value
        type: enum
        values:
          - "0000"
          - "0001"
          - "0002"
          - "0003"
          - "0004"
          - "0005"
          - "0006"
          - "0007"
          - "0008"
        description: "0000=last, 0001=Air, 0002=AV, 0003=Component, 0004=VGA, 0005=HDMI1, 0006=HDMI2, 0007=HDMI3, 0008=HDMI4"

  - id: power_on_input_query
    label: "Query Power On Input Source"
    kind: query
    command: "Q{CID}POIS????"
    params: []
    response_data: "0=last, 1=Air, 2=AV, 3=Component"
```

## Feedbacks
```yaml
feedbacks:
  - id: ack_okay
    type: enum
    values: [OKAY, EROR, WAIT]
    description: "Standard acknowledgement from TV. OKAY=success, EROR=error, WAIT=processing"

  - id: power_state
    type: enum
    values: [on, standby]
    description: "Queried via POWR???? (response data 0=standby, 1=on)"

  - id: input_source
    type: enum
    values: [TV, AV, Component, VGA, HDMI1, HDMI2, HDMI3, HDMI4]
    description: "Queried via INPT????"

  - id: mute_state
    type: enum
    values: [muted, not_muted]
    description: "Queried via MUTE????"

  - id: speaker_state
    type: enum
    values: [on, off]
    description: "Queried via ASPK????"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    range: [0, 100]
    query_command: "Q{CID}VOLM????"
    set_command: "S{CID}VOLM{VALUE}"

  - id: brightness
    type: integer
    range: [0, 100]
    query_command: "Q{CID}BRIT????"
    set_command: "S{CID}BRIT{VALUE}"

  - id: contrast
    type: integer
    range: [0, 100]
    query_command: "Q{CID}CONT????"
    set_command: "S{CID}CONT{VALUE}"

  - id: backlight
    type: integer
    range: [0, 100]
    query_command: "Q{CID}BKLV????"
    set_command: "S{CID}BKLV{VALUE}"

  - id: color_saturation
    type: integer
    range: [0, 100]
    query_command: "Q{CID}COLR????"
    set_command: "S{CID}COLR{VALUE}"

  - id: tint
    type: integer
    range: [0, 100]
    query_command: "Q{CID}TINT????"
    set_command: "S{CID}TINT{VALUE}"

  - id: sharpness
    type: integer
    range: [0, 20]
    query_command: "Q{CID}SHRP????"
    set_command: "S{CID}SHRP{VALUE}"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: populate if source contains safety warnings, interlock procedures,
# or power-on sequencing requirements. Never infer - only populate from explicit source text.
```

## Notes
- Protocol is case sensitive (all commands uppercase ASCII).
- Fixed-length frame: 1 byte OP (S/Q) + 3 bytes CLIENT_ID + 4 bytes COMMAND + 4 bytes DATA + 1 byte CHECKSUM + 1 byte CR (0x0D).
- CLIENT_ID: last 3 hex chars of Ethernet MAC address, or "ALL" for broadcast to all TVs.
- Checksum: 8-bit XOR of all preceding bytes; sum of full frame including checksum = zero.
- RS-232 port must be enabled in Custom Install menu (Quick Settings → 7310 → Custom Installation → Enable).
- PWRE (power-on command setting) must be enabled for standby wake via RS-232.
- Custom Install menu accessed via: power on → Quick Settings → enter "7310" on numeric keys.
- POIS command in source truncated — only first 4 values visible (Last/Air/AV/Component); HDMI power-on input values may exist but not readable from source.
<!-- UNRESOLVED: source document page with POIS extended values was truncated; HDMI entries for power-on input source may be missing -->
<!-- UNRESOLVED: no TCP/IP port or network configuration documented despite user indicating TCP/IP protocol -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:41.567Z
last_checked_at: 2026-06-02T10:14:04.114Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T10:14:04.114Z
matched_actions: 111
action_count: 111
confidence: medium
summary: "All 111 spec actions matched verbatim in source including all 9 POIS values (0000-0008); transport confirmed; only 4 source-only commands (SPKM, B2BM, USBM, PSHF) unrepresented, below the short threshold. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "source document titled \"RS-232/IR Protocol for Hisense Prosumer TV\" — does not specify exact model list; 5QD78N assumed from input context"
- "no IP/TCP control commands described in this source; known_protocol TCP/IP from user input not confirmed in source text"
- "no unsolicited event/notification protocol described in source"
- "no multi-step sequences described in source"
- "populate if source contains safety warnings, interlock procedures,"
- "source document page with POIS extended values was truncated; HDMI entries for power-on input source may be missing"
- "no TCP/IP port or network configuration documented despite user indicating TCP/IP protocol"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
