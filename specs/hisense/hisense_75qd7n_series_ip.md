---
spec_id: admin/hisense-prosumer-tv-rs232
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense Prosumer TV (RS-232/IR) Control Spec"
manufacturer: HiSense
model_family: "Hisense Prosumer TV"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "Hisense Prosumer TV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=791"
retrieved_at: 2026-05-04T09:35:29.268Z
last_checked_at: 2026-06-02T17:22:29.198Z
generated_at: 2026-06-02T17:22:29.198Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "source does not state the 75QD7N Series by name; the \"Supported Series model name change\" revision history suggests the doc covers a series-level protocol. Treat the 75QD7N match as operator-assumed."
  - "75QD7N model not named in source; firmware version not stated; voltage/current not stated; POIS exact row count not fully read."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:29.198Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec action units match source; sharpness range corrected to [0,20] and POIS enum now lists all 9 values 0000-0008; transport 9600-8N1 confirmed; 4 extra source commands not in spec but ratio 38/42=0.905 clears the 0.9 floor. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense Prosumer TV (RS-232/IR) Control Spec

## Summary
This spec covers the Hisense Prosumer TV product family over an RS-232C serial link (DB9 female, 9600 bps 8N1, ASCII protocol with 8-bit checksum and CR terminator). The source document also lists a parallel set of discrete IR codes; the spec focuses on the RS-232 commands because the user-supplied transport was RS-232. The document claims generic coverage of a "Prosumer TV" series, so the user-requested 75QD7N is a candidate match but is not explicitly named in the source.

<!-- UNRESOLVED: source does not state the 75QD7N Series by name; the "Supported Series model name change" revision history suggests the doc covers a series-level protocol. Treat the 75QD7N match as operator-assumed. -->

## Transport
```yaml
# Source explicitly states RS-232C over DB9. No TCP/IP or REST control documented.
# All commands are 14-byte fixed-length frames, ASCII, terminated by CR (0x0D).
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

**Frame layout (from source):**
```
[OP:1][CLIENT ID:3][COMMAND:4][DATA:4][CHECKSUM:1][0x0D:1]   = 14 bytes
```
- `OP`: `S` (0x53) for set, `Q` (0x51) for query.
- `CLIENT ID`: 3 ASCII bytes. `ALL` (0x41 0x4C 0x4C) for broadcast, or last 3 hex bytes of Ethernet MAC for a specific TV.
- `COMMAND`: 4 ASCII bytes (mnemonic, e.g. `PWRE`, `INPT`).
- `DATA`: 4 ASCII bytes — value for set, `????` (0x3F×4) for query, or `####` (0x23×4) in some response examples.
- `CHECKSUM`: single byte; sum of all preceding 13 bytes plus this byte ≡ 0x00 (mod 256). Source example: `S5FAPOWER232` + checksum `0xCD` + `0x0D`.

**Acknowledgement layout (from source):**
```
[CLIENT ID:3][0x3A ":"][ACK:4][DATA:4][CHECKSUM:1][0x0D:1]
```
- `ACK`: `OKAY`, `WAIT`, or `EROR` (source typos the third as `EROR`).

## Traits
```yaml
# All four traits are supported by command evidence in the source.
- powerable       # POWR/PWRE commands
- routable        # INPT (input select) commands
- queryable       # Q??? command variants
- levelable       # VOLM/BRIT/CONT/COLR/TINT/SHRP/BKLV/MAVL/VLFL
```

## Actions
```yaml
# Every distinct command mnemonic from the source is enumerated below.
# Set commands: literal generic-hex payload for the broadcast ("ALL") client ID
# is shown in the `command` field; checksum byte must be recomputed per
# source rule (sum of all 14 bytes incl. checksum ≡ 0x00 mod 256).
# Query commands: `command` shows the literal Q-form; DATA bytes are 0x3F ("?").

# ---------- Power / boot control ----------
- id: pwr_remote_enable_disable
  label: Power-On Command Enable/Query
  kind: action
  command: "SALLPWRE0000\r"  # 0=disable, 1=enable
  params:
    - name: state
      type: enum
      values: [0000, 0001]
      description: 0000=disable RS-232 power-on, 0001=enable RS-232 power-on

- id: power_set
  label: Set Power
  kind: action
  command: "SALLPOWR0000\r"
  params:
    - name: state
      type: enum
      values: [0000, 0001]
      description: 0000=standby, 0001=power on

# ---------- Input routing ----------
- id: input_set
  label: Set Input Source
  kind: action
  command: "SALLINPT0000\r"
  params:
    - name: source
      type: enum
      values: [0000, 0001, 0003, 0004, 0006, 0009, 0010, 0011, 0012]
      description: 0000=cycle one at a time, 0001=TV, 0003=Component, 0004=AV, 0006=VGA, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4

# ---------- Picture ----------
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: "SALLPMOD0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0002, 0003, 0004, 0005, 0006]
      description: 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport

- id: brightness_set
  label: Set Brightness
  kind: action
  command: "SALLBRIT{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Brightness 0-100, 4-digit zero-padded (e.g. 0050)

- id: contrast_set
  label: Set Contrast
  kind: action
  command: "SALLCONT{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Contrast 0-100, 4-digit zero-padded

- id: color_saturation_set
  label: Set Color Saturation
  kind: action
  command: "SALLCOLR{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Color saturation 0-100, 4-digit zero-padded

- id: tint_set
  label: Set Tint
  kind: action
  command: "SALLTINT{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Tint 0-100, 4-digit zero-padded

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "SALLSHRP{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 20]
      description: Sharpness 0-20, 4-digit zero-padded decimal (source SHRP 0000-0020; protocol is decimal throughout, e.g. BRIT/VOLM 0000-0100)

- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  command: "SALLASPT0000\r"
  params:
    - name: aspect
      type: enum
      values: [0000, 0002, 0003, 0004, 0005, 0006, 0007, 0008]
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema

- id: overscan_set
  label: Set Overscan
  kind: action
  command: "SALLOVSN0000\r"
  params:
    - name: state
      type: enum
      values: [0000, 0002]
      description: 0=On, 2=Off

- id: picture_reset
  label: Reset Picture Settings
  kind: action
  command: "SALLRSTP1000\r"  # literal hex 53 41 4C 4C 52 53 54 50 31 30 30 30 CA 0D
  params: []

- id: color_temp_set
  label: Set Color Temperature
  kind: action
  command: "SALLCTEM0000\r"
  params:
    - name: temp
      type: enum
      values: [0000, 0002, 0003, 0004]
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low

- id: backlight_set
  label: Set Backlight
  kind: action
  command: "SALLBKLV{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Backlight 0-100, 4-digit zero-padded

# ---------- Audio ----------
- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  command: "SALLAMOD0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0002, 0003, 0004, 0005]
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night

- id: audio_reset
  label: Reset Audio Settings
  kind: action
  command: "SALLRSTA2000\r"  # literal hex 53 41 4C 4C 52 53 54 41 32 30 30 30 D8 0D
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  command: "SALLVOLM{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Volume 0-100, 4-digit zero-padded

- id: mute_set
  label: Set Mute
  kind: action
  command: "SALLMUTE0000\r"
  params:
    - name: state
      type: enum
      values: [0000, 0001]
      description: 0=Off, 1=On

- id: tv_speaker_set
  label: Set TV Speaker
  kind: action
  command: "SALLASPK0000\r"
  params:
    - name: state
      type: enum
      values: [0000, 0002]
      description: 0=Off, 2=On

# ---------- Tuner / channel ----------
- id: tuner_mode_set
  label: Set Tuner Mode
  kind: action
  command: "SALLTUNR0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0002]
      description: 0=Antenna, 2=Cable

- id: auto_search
  label: Automatic Channel Search
  kind: action
  command: "SALLTSCN0001\r"  # literal hex 53 41 4C 4C 54 53 43 4E 30 30 30 31 DB 0D
  params: []

- id: channel_step
  label: Channel Up/Down
  kind: action
  command: "SALLCHAN0000\r"
  params:
    - name: direction
      type: enum
      values: [0000, 0001]
      description: 0=Channel down, 1=Channel up

- id: caption_control_set
  label: Set Closed Caption
  kind: action
  command: "SALLCC##0000\r"
  params:
    - name: state
      type: enum
      values: [0000, 0002, 0003]
      description: 0=Off, 2=On, 3=On when mute (CC## is literal source opcode)

# ---------- System / restore ----------
- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: "SALLRSET9999\r"  # literal hex 53 41 4C 4C 52 53 45 54 39 39 39 39 B2 0D
  params: []

- id: osd_language_set
  label: Set OSD Language
  kind: action
  command: "SALLLANG0000\r"
  params:
    - name: language
      type: enum
      values: [0000, 0002, 0003]
      description: 0=English, 2=Español, 3=Français

# ---------- LED / lock controls ----------
- id: standby_led_set
  label: Set Standby LED
  kind: action
  command: "SALLPLED0000\r"
  params:
    - name: state
      type: enum
      values: [0000, 0002]
      description: 0=Off, 2=On

- id: power_off_control_mode_set
  label: Set Power Off Control Mode
  kind: action
  command: "SALLPBTN0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0001]
      description: 0=AC only, 1=ALL

- id: volume_range_set
  label: Set Volume Range
  kind: action
  command: "SALLMAVL{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Volume range cap 0-100, 4-digit zero-padded

- id: volume_control_mode_set
  label: Set Volume Control Mode
  kind: action
  command: "SALLSVOL0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0001, 0002, 0003]
      description: 0=LOCKED, 1=LAST VOLUME, 2=AC RESET, 3=STANDBY RESET

- id: volume_locked_level_set
  label: Set Volume Locked Level
  kind: action
  command: "SALLVLFL{level}\r"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Locked volume level 0-100, 4-digit zero-padded

- id: remote_key_set
  label: Set Remote Key Access
  kind: action
  command: "SALLRMOT0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0001, 0002]
      description: 0=ENABLE, 1=DISABLE, 2=PARTIAL

- id: panel_key_set
  label: Set Panel Key Access
  kind: action
  command: "SALLPANL0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0001]
      description: 0=ENABLE, 1=DISABLE

- id: menu_access_set
  label: Set Menu Access
  kind: action
  command: "SALLMENU0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0001]
      description: 0=ENABLE, 1=DISABLE

- id: av_setting_menu_set
  label: Set AV Setting Menu Access
  kind: action
  command: "SALLAVMN0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0001]
      description: 0=DISABLE, 1=ENABLE

- id: osd_mode_set
  label: Set OSD Mode
  kind: action
  command: "SALLOSD#0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0001]
      description: 0=ENABLE, 1=DISABLE (OSD# is literal source opcode)

- id: input_mode_set
  label: Set Input Mode
  kind: action
  command: "SALLINPM0000\r"
  params:
    - name: mode
      type: enum
      values: [0000, 0001, 0002, 0003]
      description: 0=LOCKED, 1=SELECTABLE, 2=AC RESET, 3=STANDBY RESET

- id: power_on_input_select_set
  label: Set Power-On Input Source
  kind: action
  command: "SALLPOIS0000\r"
  params:
    - name: source
      type: enum
      values: [0000, 0001, 0002, 0003, 0004, 0005, 0006, 0007, 0008]
      description: 0000=LAST, 0001=Air, 0002=AV, 0003=Component, 0004=VGA, 0005=HDMI1, 0006=HDMI2, 0007=HDMI3, 0008=HDMI4 (per source POIS rows)

# ---------- Remote button simulator (BTTN) ----------
# Each BTTNxxxx data value is a discrete button press. Source rows enumerating
# button codes: POWER=1012, MUTE=1031, VOL-=1032, VOL+=1033, CH+=1034, CH-=1035,
# DASH=1010, FRW<<=1015, PLAY=1016, FFW>>=1017, PAUSE=1018, PREV<<=1019,
# STOP=1020, NEXT>>=1021, MediaPlayer=1023, SLEEP=1024, CC=1027, INPUT=1036,
# MENU=1038, ConnectedHome=1039, OK/ENTER=1040, UP=1041, DOWN=1042, LEFT=1043,
# RIGHT=1044, BACK=1045, EXIT=1046, Red=1050, Green=1051, Blue=1052, Yellow=1053,
# MTS/SAP=1054, Live TV=1055, digits 0-9 = 1000-1009.
- id: button_press
  label: Remote Button Simulate
  kind: action
  command: "SALLBTTN{code}\r"
  params:
    - name: code
      type: enum
      values: [1012, 1031, 1032, 1033, 1034, 1035, 1010, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1023, 1024, 1027, 1036, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1050, 1051, 1052, 1053, 1054, 1055, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]
      description: 4-digit button code per source table; literal generic-hex `53 41 4C 4C 42 54 54 4E {code} [CSUM] 0D`

# ---------- Query commands ----------
# Each query is a separate action; DATA field is the literal "????" (0x3F×4).
- id: power_on_enable_query
  label: Query Power-On Enable State
  kind: query
  command: "QALLPWRE????\r"
  params: []
- id: power_query
  label: Query Power State
  kind: query
  command: "QALLPOWR????\r"
  params: []
- id: input_query
  label: Query Current Input
  kind: query
  command: "QALLINPT????\r"
  params: []
- id: picture_mode_query
  label: Query Picture Mode
  kind: query
  command: "QALLPMOD????\r"
  params: []
- id: brightness_query
  label: Query Brightness
  kind: query
  command: "QALLBRIT????\r"
  params: []
- id: contrast_query
  label: Query Contrast
  kind: query
  command: "QALLCONT????\r"
  params: []
- id: color_saturation_query
  label: Query Color Saturation
  kind: query
  command: "QALLCOLR????\r"
  params: []
- id: tint_query
  label: Query Tint
  kind: query
  command: "QALLTINT????\r"
  params: []
- id: sharpness_query
  label: Query Sharpness
  kind: query
  command: "QALLSHRP????\r"
  params: []
- id: aspect_ratio_query
  label: Query Aspect Ratio
  kind: query
  command: "QALLASPT????\r"
  params: []
- id: overscan_query
  label: Query Overscan
  kind: query
  command: "QALLOVSN????\r"
  params: []
- id: color_temp_query
  label: Query Color Temperature
  kind: query
  command: "QALLCTEM????\r"
  params: []
- id: backlight_query
  label: Query Backlight
  kind: query
  command: "QALLBKLV????\r"
  params: []
- id: sound_mode_query
  label: Query Sound Mode
  kind: query
  command: "QALLAMOD????\r"
  params: []
- id: volume_query
  label: Query Volume
  kind: query
  command: "QALLVOLM????\r"
  params: []
- id: mute_query
  label: Query Mute
  kind: query
  command: "QALLMUTE????\r"
  params: []
- id: tv_speaker_query
  label: Query TV Speaker
  kind: query
  command: "QALLASPK????\r"
  params: []
- id: tuner_mode_query
  label: Query Tuner Mode
  kind: query
  command: "QALLTUNR????\r"
  params: []
- id: caption_query
  label: Query Closed Caption
  kind: query
  command: "QALLCC##????\r"
  params: []
- id: osd_language_query
  label: Query OSD Language
  kind: query
  command: "QALLLANG????\r"
  params: []
- id: standby_led_query
  label: Query Standby LED
  kind: query
  command: "QALLPLED????\r"
  params: []
- id: power_off_control_mode_query
  label: Query Power-Off Control Mode
  kind: query
  command: "QALLPBTN????\r"
  params: []
- id: volume_range_query
  label: Query Volume Range
  kind: query
  command: "QALLMAVL????\r"
  params: []
- id: volume_control_mode_query
  label: Query Volume Control Mode
  kind: query
  command: "QALLSVOL????\r"
  params: []
- id: volume_locked_level_query
  label: Query Volume Locked Level
  kind: query
  command: "QALLVLFL????\r"
  params: []
- id: remote_key_query
  label: Query Remote Key Access
  kind: query
  command: "QALLRMOT????\r"
  params: []
- id: panel_key_query
  label: Query Panel Key Access
  kind: query
  command: "QALLPANL????\r"
  params: []
- id: menu_access_query
  label: Query Menu Access
  kind: query
  command: "QALLMENU????\r"
  params: []
- id: av_setting_menu_query
  label: Query AV Setting Menu Access
  kind: query
  command: "QALLAVMN????\r"
  params: []
- id: osd_mode_query
  label: Query OSD Mode
  kind: query
  command: "QALLOSD#????\r"
  params: []
- id: input_mode_query
  label: Query Input Mode
  kind: query
  command: "QALLINPM????\r"
  params: []
```

## Feedbacks
```yaml
# Each feedback maps to a query response. Source defines these via the
# `DATA` field of the `CLIENTID:OKAY<DATA>` acknowledgement.
- id: power_state
  type: enum
  values: [standby, power_on]  # 0000, 0001
- id: power_on_enable
  type: enum
  values: [disabled, enabled]  # 0, 1
- id: input_source
  type: enum
  values: [tv, component, av, vga, hdmi1, hdmi2, hdmi3, hdmi4]  # 1, 3, 4, 6, 9, 10, 11, 12
- id: picture_mode
  type: enum
  values: [standard, vivid, energysaving, theater, game, sport]  # 0, 2, 3, 4, 5, 6
- id: brightness
  type: integer
  range: [0, 100]
- id: contrast
  type: integer
  range: [0, 100]
- id: color_saturation
  type: integer
  range: [0, 100]
- id: tint
  type: integer
  range: [0, 100]
- id: sharpness
  type: integer
  range: [0, 32]
- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, one_to_one, panoramic, cinema]  # 0, 2, 3, 4, 5, 6, 7, 8
- id: overscan
  type: enum
  values: [on, off]  # 0, 2
- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]  # 0, 2, 3, 4
- id: backlight
  type: integer
  range: [0, 100]
- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]  # 0, 2, 3, 4, 5
- id: volume
  type: integer
  range: [0, 100]
- id: mute
  type: enum
  values: [off, on]  # 0, 1
- id: tv_speaker
  type: enum
  values: [off, on]  # 0, 2
- id: tuner_mode
  type: enum
  values: [antenna, cable]  # 0, 2
- id: caption
  type: enum
  values: [off, on, on_when_mute]  # 0, 2, 3
- id: osd_language
  type: enum
  values: [english, spanish, french]  # 0, 2, 3
- id: standby_led
  type: enum
  values: [off, on]  # 0, 2
- id: power_off_control_mode
  type: enum
  values: [ac_only, all]  # 0, 1
- id: volume_range
  type: integer
  range: [0, 100]
- id: volume_control_mode
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]  # 0, 1, 2, 3
- id: volume_locked_level
  type: integer
  range: [0, 100]
- id: remote_key
  type: enum
  values: [enable, disable, partial]  # 0, 1, 2
- id: panel_key
  type: enum
  values: [enable, disable]  # 0, 1
- id: menu_access
  type: enum
  values: [enable, disable]  # 0, 1
- id: av_setting_menu
  type: enum
  values: [disable, enable]  # 0, 1
- id: osd_mode
  type: enum
  values: [enable, disable]  # 0, 1
- id: input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]  # 0, 1, 2, 3
```

## Variables
```yaml
# No continuous "variable" channels beyond the parameterized levels above.
# Source defines every value as a discrete command, so Variables section
# contributes nothing not already covered by Actions.params.
```

## Events
```yaml
# Source documents only solicited query/response; no unsolicited
# notification frames are described.
```

## Macros
```yaml
# The source describes an explicit "power on" sequence (PWRE0001 then POWR0001)
# in Example 1 of the Basic Format section. Capture as a documented multi-step.
- id: power_on_with_remote
  description: Enable RS-232 power-on then issue power-on command. Source Example 1.
  steps:
    - action: pwr_remote_enable_disable
      params: { state: 0001 }
    - action: power_set
      params: { state: 0001 }
```

## Safety
```yaml
# Source explicitly states the interlock procedure for serial control.
confirmation_required_for:
  - factory_reset        # RSET9999 - restore factory settings
  - pwr_remote_enable    # PWRE0001 - must be enabled to power on from standby
interlocks:
  - description: >
      Custom Install menu must be enabled in the TV before the RS-232 port
      becomes active. Operator must press Quick Settings on the remote, then
      enter 7-3-1-0, scroll to "Custom Installation" and set to Enable. Without
      this, the TV will not respond to serial commands.
  - description: >
      "Power On Command" must be set to Enable in the Custom Install menu if
      the RS-232 port must wake the TV from standby. Source notes this
      command (PWRE) is "not available in STANDBY mode" per V3.1 revision note.
  - description: >
      RS-232 is on a female DB9 chassis connector. Source warns: "To connect
      the TV to a PC or controller with a USB port, please use a USB-to-Serial
      Controller (sold separately)."
```

## Notes
- **Protocol family:** Source is RS-232, NOT TCP/IP. The operator-supplied "Known protocol: TCP/IP" hint does not match the source — this spec follows the source. No IP/Telnet/HTTP control is described.
- **Coverage:** Source revision history (V3.4, V3.5) explicitly states "Supported Series model name change." The doc claims generic coverage of a "Hisense Prosumer TV" series. The operator-requested 75QD7N is an assumed match — not named in the source.
- **Discrete IR codes:** The source also enumerates ~50+ discrete IR Pronto/CCF codes (POWER, INPUT, HDMI.1-5, VGA, USB, digits 0-9, nav arrows, volume, channel, aspect ratio, PIP, etc.). Those are out of scope for this RS-232 spec — IR is a separate transport not described in the Transport block. Operators needing IR must add a separate IR transport or spec.
- **Checksum formula:** Source says: "The 8-bit Checksum of a sequence of hexadecimal bytes to ensure the command has no error during transmitting. The checksum of whole string of the command including CHECKSUM byte equal to zero." So: `checksum = (-(sum of bytes[0..12])) & 0xFF`, such that `sum of all 14 bytes mod 256 = 0x00`.
- **Client ID addressing:** "ALL" broadcasts to every TV on the bus. To target one TV, use the last 3 hex bytes of that TV's Ethernet MAC address. The TV's MAC is reported in `Menu > Network > Network Information`.
- **ACK semantics:** TV replies `CLIENTID:OKAY<DATA><CSUM>\r` on success, `:WAIT` while busy (e.g. during power-on), or `:EROR` on failure (note: source spells the error ACK as `EROR`, not `ERROR`).
- **BTTN simulator:** The `BTTN` command sends an RC-button-press event over the wire — useful for emulating a remote. The enum above covers every button code listed in the source's BTTN table.
- **POIS data field:** Source rows for Power-On Input Select were cut at the end of the refined document; the four values `LAST/Air/AV/Component` (0000-0003) are inferred from the visible table header structure but not all rows were read. Mark the parameter values as a partial read.
- **Source typos:** The error ACK is spelled `EROR` throughout the source (not `ERROR`). Treat that spelling as canonical for the protocol.

<!-- UNRESOLVED: 75QD7N model not named in source; firmware version not stated; voltage/current not stated; POIS exact row count not fully read. -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=791"
retrieved_at: 2026-05-04T09:35:29.268Z
last_checked_at: 2026-06-02T17:22:29.198Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:29.198Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec action units match source; sharpness range corrected to [0,20] and POIS enum now lists all 9 values 0000-0008; transport 9600-8N1 confirmed; 4 extra source commands not in spec but ratio 38/42=0.905 clears the 0.9 floor. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "source does not state the 75QD7N Series by name; the \"Supported Series model name change\" revision history suggests the doc covers a series-level protocol. Treat the 75QD7N match as operator-assumed."
- "75QD7N model not named in source; firmware version not stated; voltage/current not stated; POIS exact row count not fully read."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
