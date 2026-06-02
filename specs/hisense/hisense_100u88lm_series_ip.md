---
spec_id: admin/hisense-100u88lm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 100U88LM Series Control Spec"
manufacturer: HiSense
model_family: "100U88LM Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "100U88LM Series"
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
retrieved_at: 2026-06-01T20:30:44.659Z
last_checked_at: 2026-06-02T22:07:39.323Z
generated_at: 2026-06-02T22:07:39.323Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP port number not stated in source; IP control guide referenced but not included in this document"
  - "firmware version compatibility not stated"
  - "all settable parameters are represented as actions with command fields above"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "source notes PWRE must be enabled before RS-232 power-on works; no explicit safety interlocks documented"
  - "TCP/IP control referenced in filename but no port or IP protocol details in this source document"
  - "IP control guide (hisense-b2b.com downloadId=784) not available for extraction"
  - "exact model list for 100U88LM compatibility not stated"
  - "power-on input source selection for HDMI inputs (POIS values for HDMI1-4) not documented in extracted portion"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:39.323Z
  matched_actions: 138
  action_count: 138
  confidence: medium
  summary: "All 138 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# HiSense 100U88LM Series Control Spec

## Summary
HiSense 100U88LM Series prosumer TV with RS-232 serial control and optional IP control. Serial protocol uses fixed-length ASCII frames with checksum. Commands cover power, input selection, picture/audio settings, volume, channel, and hospitality/lock features.

<!-- UNRESOLVED: TCP/IP port number not stated in source; IP control guide referenced but not included in this document -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

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
- powerable       # POWR command present
- queryable       # query commands (????) return state
- routable        # INPT input source selection present
- levelable       # VOLM, BRIT, CONT, BKLV range controls present
```

## Actions
```yaml
- id: power_on_remote_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: "S{client_id}PWRE0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID (last 3 bytes of MAC address, or ALL)"
  notes: "Generic: SALLPWRE0001 D5 0D"

- id: power_on_remote_disable
  label: Disable RS-232 Remote Power On
  kind: action
  command: "S{client_id}PWRE0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_power_on_remote
  label: Query RS-232 Remote Power On Setting
  kind: query
  command: "Q{client_id}PWRE????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Disabled, 1=Enabled"

- id: power_on
  label: Power On
  kind: action
  command: "S{client_id}POWR0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: power_off
  label: Standby
  kind: action
  command: "S{client_id}POWR0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "S{client_id}INPT{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000=Toggle, 0001=TV, 0004=AV, 0003=Component, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4, 0006=VGA"

- id: query_input_source
  label: Query Current Input Source
  kind: query
  command: "Q{client_id}INPT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "1=TV, 4=AV, 3=Component, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "S{client_id}PMOD{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000=Standard, 0002=Vivid, 0003=EnergySaving, 0004=Theater, 0005=Game, 0006=Sport"

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "Q{client_id}PMOD????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "S{client_id}BRIT{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0100 (0-100)"

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "Q{client_id}BRIT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-100"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "S{client_id}CONT{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0100 (0-100)"

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "Q{client_id}CONT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-100"

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  command: "S{client_id}COLR{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0100 (0-100)"

- id: query_color_saturation
  label: Query Color Saturation
  kind: query
  command: "Q{client_id}COLR????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-100"

- id: set_tint
  label: Set Tint
  kind: action
  command: "S{client_id}TINT{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0100 (0-100)"

- id: query_tint
  label: Query Tint
  kind: query
  command: "Q{client_id}TINT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-100"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "S{client_id}SHRP{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0020 (0-20)"

- id: query_sharpness
  label: Query Sharpness
  kind: query
  command: "Q{client_id}SHRP????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-20"

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "S{client_id}ASPT{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000=Auto, 0002=Normal, 0003=Zoom, 0004=Wide, 0005=Direct, 0006=1-to-1pixel, 0007=Panoramic, 0008=Cinema"

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "Q{client_id}ASPT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1pixel, 7=Panoramic, 8=Cinema"

- id: set_overscan_on
  label: Set Overscan On
  kind: action
  command: "S{client_id}OVSN0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_overscan_off
  label: Set Overscan Off
  kind: action
  command: "S{client_id}OVSN0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_overscan
  label: Query Overscan
  kind: query
  command: "Q{client_id}OVSN????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=On, 2=Off"

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  command: "S{client_id}RSTP1000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "S{client_id}CTEM{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000=High, 0002=Middle, 0003=Mid-Low, 0004=Low"

- id: query_color_temp
  label: Query Color Temperature
  kind: query
  command: "Q{client_id}CTEM????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=High, 2=Middle, 3=Mid-Low, 4=Low"

- id: set_backlight
  label: Set Backlight Value
  kind: action
  command: "S{client_id}BKLV{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0100 (0-100)"

- id: query_backlight
  label: Query Backlight Value
  kind: query
  command: "Q{client_id}BKLV????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-100"

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "S{client_id}AMOD{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000=Standard, 0002=Theater, 0003=Music, 0004=Speech, 0005=Late night"

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "Q{client_id}AMOD????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  command: "S{client_id}RSTA2000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_volume
  label: Set Volume
  kind: action
  command: "S{client_id}VOLM{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0100 (0-100)"

- id: query_volume
  label: Query Volume
  kind: query
  command: "Q{client_id}VOLM????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-100"

- id: mute_on
  label: Mute On
  kind: action
  command: "S{client_id}MUTE0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: mute_off
  label: Mute Off
  kind: action
  command: "S{client_id}MUTE0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_mute
  label: Query Mute Status
  kind: query
  command: "Q{client_id}MUTE????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Not Mute, 1=Mute"

- id: set_tv_speaker_on
  label: Set TV Speaker On
  kind: action
  command: "S{client_id}ASPK0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_tv_speaker_off
  label: Set TV Speaker Off
  kind: action
  command: "S{client_id}ASPK0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_tv_speaker
  label: Query TV Speaker
  kind: query
  command: "Q{client_id}ASPK????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Off, 2=On"

- id: set_tuner_antenna
  label: Set Tuner Mode Antenna
  kind: action
  command: "S{client_id}TUNR0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_tuner_cable
  label: Set Tuner Mode Cable
  kind: action
  command: "S{client_id}TUNR0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_tuner_mode
  label: Query Tuner Mode
  kind: query
  command: "Q{client_id}TUNR????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Antenna, 2=Cable"

- id: automatic_search
  label: Automatic Search
  kind: action
  command: "S{client_id}TSCN0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: channel_down
  label: Channel Down
  kind: action
  command: "S{client_id}CHAN0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: channel_up
  label: Channel Up
  kind: action
  command: "S{client_id}CHAN0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_cc_off
  label: Set Caption Off
  kind: action
  command: "S{client_id}CC##0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_cc_on
  label: Set Caption On
  kind: action
  command: "S{client_id}CC##0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_cc_on_mute
  label: Set Caption On When Mute
  kind: action
  command: "S{client_id}CC##0003{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_caption
  label: Query Caption Control
  kind: query
  command: "Q{client_id}CC##????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Off, 2=On, 3=CC on when mute"

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: "S{client_id}RSET9999{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_lang_english
  label: Set OSD Language English
  kind: action
  command: "S{client_id}LANG0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_lang_spanish
  label: Set OSD Language Spanish
  kind: action
  command: "S{client_id}LANG0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_lang_french
  label: Set OSD Language French
  kind: action
  command: "S{client_id}LANG0003{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_lang
  label: Query OSD Language
  kind: query
  command: "Q{client_id}LANG????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=English, 2=Spanish, 3=French"

- id: set_standby_led_off
  label: Set Standby LED Off
  kind: action
  command: "S{client_id}PLED0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_standby_led_on
  label: Set Standby LED On
  kind: action
  command: "S{client_id}PLED0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_standby_led
  label: Query Standby LED
  kind: query
  command: "Q{client_id}PLED????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Off, 2=On"

- id: button_ch_plus
  label: Remote Button CH+
  kind: action
  command: "S{client_id}BTTN1034{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_ch_minus
  label: Remote Button CH-
  kind: action
  command: "S{client_id}BTTN1035{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_vol_minus
  label: Remote Button VOL-
  kind: action
  command: "S{client_id}BTTN1032{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_vol_plus
  label: Remote Button VOL+
  kind: action
  command: "S{client_id}BTTN1033{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_back
  label: Remote Button BACK
  kind: action
  command: "S{client_id}BTTN1045{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_power
  label: Remote Button POWER
  kind: action
  command: "S{client_id}BTTN1012{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_mute
  label: Remote Button MUTE
  kind: action
  command: "S{client_id}BTTN1031{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_dash
  label: Remote Button DASH
  kind: action
  command: "S{client_id}BTTN1010{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_input
  label: Remote Button INPUT
  kind: action
  command: "S{client_id}BTTN1036{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_media_player
  label: Remote Button HiMedia
  kind: action
  command: "S{client_id}BTTN1023{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_0
  label: Remote Button 0
  kind: action
  command: "S{client_id}BTTN1000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_1
  label: Remote Button 1
  kind: action
  command: "S{client_id}BTTN1001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_2
  label: Remote Button 2
  kind: action
  command: "S{client_id}BTTN1002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_3
  label: Remote Button 3
  kind: action
  command: "S{client_id}BTTN1003{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_4
  label: Remote Button 4
  kind: action
  command: "S{client_id}BTTN1004{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_5
  label: Remote Button 5
  kind: action
  command: "S{client_id}BTTN1005{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_6
  label: Remote Button 6
  kind: action
  command: "S{client_id}BTTN1006{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_7
  label: Remote Button 7
  kind: action
  command: "S{client_id}BTTN1007{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_8
  label: Remote Button 8
  kind: action
  command: "S{client_id}BTTN1008{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_digit_9
  label: Remote Button 9
  kind: action
  command: "S{client_id}BTTN1009{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_sleep
  label: Remote Button SLEEP
  kind: action
  command: "S{client_id}BTTN1024{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_mts_sap
  label: Remote Button MTS/SAP
  kind: action
  command: "S{client_id}BTTN1054{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_live_tv
  label: Remote Button Live TV
  kind: action
  command: "S{client_id}BTTN1055{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_pause
  label: Remote Button PAUSE
  kind: action
  command: "S{client_id}BTTN1018{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_play
  label: Remote Button PLAY
  kind: action
  command: "S{client_id}BTTN1016{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_menu
  label: Remote Button MENU
  kind: action
  command: "S{client_id}BTTN1038{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_exit
  label: Remote Button EXIT
  kind: action
  command: "S{client_id}BTTN1046{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_stop
  label: Remote Button STOP
  kind: action
  command: "S{client_id}BTTN1020{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_frw
  label: Remote Button FRW
  kind: action
  command: "S{client_id}BTTN1015{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_cc
  label: Remote Button CC
  kind: action
  command: "S{client_id}BTTN1027{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_red
  label: Remote Button Red
  kind: action
  command: "S{client_id}BTTN1050{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_green
  label: Remote Button Green
  kind: action
  command: "S{client_id}BTTN1051{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_yellow
  label: Remote Button Yellow
  kind: action
  command: "S{client_id}BTTN1053{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_blue
  label: Remote Button Blue
  kind: action
  command: "S{client_id}BTTN1052{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_up
  label: Remote Button UP
  kind: action
  command: "S{client_id}BTTN1041{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_down
  label: Remote Button DOWN
  kind: action
  command: "S{client_id}BTTN1042{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_left
  label: Remote Button LEFT
  kind: action
  command: "S{client_id}BTTN1043{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_right
  label: Remote Button RIGHT
  kind: action
  command: "S{client_id}BTTN1044{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_ok_enter
  label: Remote Button OK/ENTER
  kind: action
  command: "S{client_id}BTTN1040{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_ffw
  label: Remote Button FFW
  kind: action
  command: "S{client_id}BTTN1017{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_previous
  label: Remote Button PREVIOUS
  kind: action
  command: "S{client_id}BTTN1019{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_next
  label: Remote Button NEXT
  kind: action
  command: "S{client_id}BTTN1021{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: button_connected_home
  label: Remote Button HiSmart
  kind: action
  command: "S{client_id}BTTN1039{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_power_off_mode_ac
  label: Set Power Off Control AC Only
  kind: action
  command: "S{client_id}PBTN0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_power_off_mode_all
  label: Set Power Off Control All
  kind: action
  command: "S{client_id}PBTN0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_power_off_mode
  label: Query Power Off Control Mode
  kind: query
  command: "Q{client_id}PBTN????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=AC Only, 1=All"

- id: set_max_volume
  label: Set Volume Range
  kind: action
  command: "S{client_id}MAVL{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0100 (0-100)"

- id: query_max_volume
  label: Query Volume Range
  kind: query
  command: "Q{client_id}MAVL????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-100"

- id: set_volume_control_locked
  label: Set Volume Control Locked
  kind: action
  command: "S{client_id}SVOL0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_volume_control_last
  label: Set Volume Control Last Volume
  kind: action
  command: "S{client_id}SVOL0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_volume_control_ac_reset
  label: Set Volume Control AC Reset
  kind: action
  command: "S{client_id}SVOL0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_volume_control_standby_reset
  label: Set Volume Control Standby Reset
  kind: action
  command: "S{client_id}SVOL0003{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_volume_control
  label: Query Volume Control
  kind: query
  command: "Q{client_id}SVOL????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  command: "S{client_id}VLFL{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
    - name: value
      type: string
      description: "0000-0100 (0-100)"

- id: query_volume_locked_level
  label: Query Volume Locked Level
  kind: query
  command: "Q{client_id}VLFL????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0-100"

- id: set_remote_enable
  label: Set Remote Key Enable
  kind: action
  command: "S{client_id}RMOT0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_remote_disable
  label: Set Remote Key Disable
  kind: action
  command: "S{client_id}RMOT0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_remote_partial
  label: Set Remote Key Partial
  kind: action
  command: "S{client_id}RMOT0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_remote_key
  label: Query Remote Key
  kind: query
  command: "Q{client_id}RMOT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Enable, 1=Disable, 2=Partial"

- id: set_panel_enable
  label: Set Panel Key Enable
  kind: action
  command: "S{client_id}PANL0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_panel_disable
  label: Set Panel Key Disable
  kind: action
  command: "S{client_id}PANL0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_panel_key
  label: Query Panel Key
  kind: query
  command: "Q{client_id}PANL????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Enable, 1=Disable"

- id: set_menu_enable
  label: Set Menu Access Enable
  kind: action
  command: "S{client_id}MENU0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_menu_disable
  label: Set Menu Access Disable
  kind: action
  command: "S{client_id}MENU0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_menu_access
  label: Query Menu Access
  kind: query
  command: "Q{client_id}MENU????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Enable, 1=Disable"

- id: set_av_menu_disable
  label: Set AV Setting Menu Disable
  kind: action
  command: "S{client_id}AVMN0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_av_menu_enable
  label: Set AV Setting Menu Enable
  kind: action
  command: "S{client_id}AVMN0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_av_menu
  label: Query AV Setting Menu
  kind: query
  command: "Q{client_id}AVMN????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Disable, 1=Enable"

- id: set_osd_enable
  label: Set OSD Mode Enable
  kind: action
  command: "S{client_id}OSD#0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_osd_disable
  label: Set OSD Mode Disable
  kind: action
  command: "S{client_id}OSD#0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_osd_mode
  label: Query OSD Mode
  kind: query
  command: "Q{client_id}OSD#????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Enable, 1=Disable"

- id: set_input_mode_locked
  label: Set Input Mode Locked
  kind: action
  command: "S{client_id}INPM0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_input_mode_selectable
  label: Set Input Mode Selectable
  kind: action
  command: "S{client_id}INPM0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_input_mode_ac_reset
  label: Set Input Mode AC Reset
  kind: action
  command: "S{client_id}INPM0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_input_mode_standby_reset
  label: Set Input Mode Standby Reset
  kind: action
  command: "S{client_id}INPM0003{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: query_input_mode
  label: Query Input Mode
  kind: query
  command: "Q{client_id}INPM????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
  returns: "0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"

- id: set_power_on_input_last
  label: Set Power On Input Last
  kind: action
  command: "S{client_id}POIS0000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_power_on_input_tv
  label: Set Power On Input TV
  kind: action
  command: "S{client_id}POIS0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_power_on_input_av
  label: Set Power On Input AV
  kind: action
  command: "S{client_id}POIS0002{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"

- id: set_power_on_input_component
  label: Set Power On Input Component
  kind: action
  command: "S{client_id}POIS0003{checksum}\r"
  params:
    - name: client_id
      type: string
      description: "3-byte client ID"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  description: "POWR query returns 0=Standby, 1=On"

- id: input_source
  type: enum
  values: [tv, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]
  description: "INPT query returns numeric code for current input"

- id: mute_state
  type: enum
  values: [off, on]
  description: "MUTE query returns 0=Not Mute, 1=Mute"

- id: volume_level
  type: integer
  min: 0
  max: 100
  description: "VOLM query returns current volume 0-100"

- id: brightness_level
  type: integer
  min: 0
  max: 100

- id: contrast_level
  type: integer
  min: 0
  max: 100

- id: backlight_level
  type: integer
  min: 0
  max: 100

- id: picture_mode
  type: enum
  values: [standard, vivid, energy_saving, theater, game, sport]

- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]

- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, 1to1pixel, panoramic, cinema]

- id: color_temperature
  type: enum
  values: [high, middle, mid_low, low]
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are represented as actions with command fields above
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes PWRE must be enabled before RS-232 power-on works; no explicit safety interlocks documented
```

## Notes
- Protocol is case sensitive (stated in source).
- Command format: `{OPERATION}{CLIENT_ID}{COMMAND(4 bytes)}{DATA(4 bytes)}{CHECKSUM}{CR}` where OPERATION is S (Set) or Q (Query).
- CLIENT ID: last 3 bytes of Ethernet MAC address for Smart TV; or ALL for broadcast.
- Checksum: 8-bit XOR of all preceding bytes such that full string including checksum sums to zero.
- Termination: 0x0D (carriage return).
- ACK format: `{CLIENT_ID}:OKAY{DATA}{CHECKSUM}{CR}` or `{CLIENT_ID}:WAIT{DATA}{CHECKSUM}{CR}` or `{CLIENT_ID}:EROR{DATA}{CHECKSUM}{CR}`.
- RS-232 must be enabled in Custom Install menu (accessed via Quick Settings + code "7310").
- DB9 female connector on TV: pin 2=RXD, pin 3=TXD, pin 5=GND.
<!-- UNRESOLVED: TCP/IP control referenced in filename but no port or IP protocol details in this source document -->
<!-- UNRESOLVED: IP control guide (hisense-b2b.com downloadId=784) not available for extraction -->
<!-- UNRESOLVED: exact model list for 100U88LM compatibility not stated -->
<!-- UNRESOLVED: power-on input source selection for HDMI inputs (POIS values for HDMI1-4) not documented in extracted portion -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-06-01T20:30:44.659Z
last_checked_at: 2026-06-02T22:07:39.323Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:39.323Z
matched_actions: 138
action_count: 138
confidence: medium
summary: "All 138 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP port number not stated in source; IP control guide referenced but not included in this document"
- "firmware version compatibility not stated"
- "all settable parameters are represented as actions with command fields above"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "source notes PWRE must be enabled before RS-232 power-on works; no explicit safety interlocks documented"
- "TCP/IP control referenced in filename but no port or IP protocol details in this source document"
- "IP control guide (hisense-b2b.com downloadId=784) not available for extraction"
- "exact model list for 100U88LM compatibility not stated"
- "power-on input source selection for HDMI inputs (POIS values for HDMI1-4) not documented in extracted portion"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
