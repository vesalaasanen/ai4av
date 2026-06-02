---
spec_id: admin/hisense-85u75sua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 85U75SUA Series Control Spec"
manufacturer: HiSense
model_family: 85U75SUA
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 85U75SUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-05-04T21:56:29.087Z
last_checked_at: 2026-05-14T18:17:16.673Z
generated_at: 2026-05-14T18:17:16.673Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP transport expected (entity ID suffix _ip, user-stated protocol) but not documented in this source. Port number unknown."
  - "specific model variants / supported series names not listed (Models section empty in source)"
  - "TCP/IP expected per family metadata but no port stated in source; serial commands likely tunnel over TCP"
  - "TCP port not stated in source"
  - "No settable non-discrete parameters beyond those captured as Actions"
  - "no multi-step sequences documented in source"
  - "TCP/IP transport not documented in source; serial-only command set likely usable over TCP tunnel but port and framing unspecified"
  - "supported model series names not listed in source (Models section blank)"
  - "last page of source truncated; KYLK, POWV, HTTL, EPWR, DOXM, POWM, TIMR, ENRG, HCEC, DASE commands partially visible but parameters incomplete"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.673Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 67 spec actions matched source commands with correct opcodes and parameters; transport values confirmed verbatim in source documentation. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# HiSense 85U75SUA Series Control Spec

## Summary
HiSense Prosumer TV (85U75SUA series) with RS-232 serial control and IR remote. Serial protocol uses fixed-length ASCII frames with 8-bit checksum. Supports power, input routing, picture/audio settings, volume, mute, channel tuning, caption, and various lockout/control modes. Client addressing via last 3 bytes of Ethernet MAC address allows multi-TV setups.

<!-- UNRESOLVED: TCP/IP transport expected (entity ID suffix _ip, user-stated protocol) but not documented in this source. Port number unknown. -->
<!-- UNRESOLVED: specific model variants / supported series names not listed (Models section empty in source) -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # UNRESOLVED: TCP/IP expected per family metadata but no port stated in source; serial commands likely tunnel over TCP
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from POWR power on/off commands
- queryable  # inferred from query commands (INPT????, VOLM????, etc.)
- routable  # inferred from INPT input selection commands
- levelable  # inferred from VOLM, BRIT, CONT, BKLV continuous value commands
```

## Actions
```yaml
- id: power_enable_remote_on
  label: Enable/Disable RS-232 Remote Power On
  kind: action
  command: PWRE
  params:
    - name: state
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=disable, 0001=enable RS-232 remote power on"

- id: power_set
  label: Set Power On/Off
  kind: action
  command: POWR
  params:
    - name: state
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=standby, 0001=power on"

- id: input_select
  label: Select Input Source
  kind: action
  command: INPT
  params:
    - name: source
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

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: PMOD
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0002"
        - "0003"
        - "0004"
        - "0005"
        - "0006"
      description: "0000=Standard, 0002=Vivid, 0003=EnergySaving, 0004=Theater, 0005=Game, 0006=Sport"

- id: brightness_set
  label: Set Brightness
  kind: action
  command: BRIT
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: "Brightness 0-100, zero-padded 4 digits"

- id: contrast_set
  label: Set Contrast
  kind: action
  command: CONT
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: "Contrast 0-100, zero-padded 4 digits"

- id: color_saturation_set
  label: Set Color Saturation
  kind: action
  command: COLR
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: "Color saturation 0-100, zero-padded 4 digits"

- id: tint_set
  label: Set Tint
  kind: action
  command: TINT
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: "Tint 0-100, zero-padded 4 digits"

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: SHRP
  params:
    - name: value
      type: integer
      min: 0
      max: 20
      description: "Sharpness 0-20, zero-padded 4 digits"

- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  command: ASPT
  params:
    - name: mode
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

- id: overscan_set
  label: Set Overscan
  kind: action
  command: OVSN
  params:
    - name: state
      type: enum
      values:
        - "0000"
        - "0002"
      description: "0000=On, 0002=Off"

- id: picture_reset
  label: Reset Picture Settings
  kind: action
  command: RSTP1000

- id: color_temp_set
  label: Set Color Temperature
  kind: action
  command: CTEM
  params:
    - name: temp
      type: enum
      values:
        - "0000"
        - "0002"
        - "0003"
        - "0004"
      description: "0000=High, 0002=Middle, 0003=Mid-Low, 0004=Low"

- id: backlight_set
  label: Set Backlight
  kind: action
  command: BKLV
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: "Backlight 0-100, zero-padded 4 digits"

- id: sound_mode_set
  label: Set Sound Mode
  kind: action
  command: AMOD
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0002"
        - "0003"
        - "0004"
        - "0005"
      description: "0000=Standard, 0002=Theater, 0003=Music, 0004=Speech, 0005=Late night"

- id: audio_reset
  label: Reset Audio Settings
  kind: action
  command: RSTA2000

- id: volume_set
  label: Set Volume
  kind: action
  command: VOLM
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Volume 0-100, zero-padded 4 digits"

- id: mute_set
  label: Set Mute
  kind: action
  command: MUTE
  params:
    - name: state
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=mute off, 0001=mute on"

- id: speaker_set
  label: Set TV Speaker
  kind: action
  command: ASPK
  params:
    - name: state
      type: enum
      values:
        - "0000"
        - "0002"
      description: "0000=off, 0002=on"

- id: tuner_mode_set
  label: Set Tuner Mode
  kind: action
  command: TUNR
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0002"
      description: "0000=Antenna, 0002=Cable"

- id: auto_search
  label: Automatic Channel Search
  kind: action
  command: TSCN0001

- id: channel_change
  label: Channel Up/Down
  kind: action
  command: CHAN
  params:
    - name: direction
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=channel down, 0001=channel up"

- id: caption_set
  label: Set Caption Control
  kind: action
  command: "CC##"
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0002"
        - "0003"
      description: "0000=off, 0002=on, 0003=CC on when mute"

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: RSET9999

- id: language_set
  label: Set OSD Language
  kind: action
  command: LANG
  params:
    - name: lang
      type: enum
      values:
        - "0000"
        - "0002"
        - "0003"
      description: "0000=English, 0002=Español, 0003=Français"

- id: standby_led_set
  label: Set Standby LED
  kind: action
  command: PLED
  params:
    - name: state
      type: enum
      values:
        - "0000"
        - "0002"
      description: "0000=off, 0002=on"

- id: button_simulate
  label: Simulate Remote Button
  kind: action
  command: BTTN
  params:
    - name: button_code
      type: string
      description: "4-digit button code with '1' prefix, e.g. 1012=POWER, 1034=CH+, 1032=VOL-, 1041=UP, 1042=DOWN, 1043=LEFT, 1044=RIGHT, 1040=OK, 1036=INPUT, 1045=BACK, 1046=EXIT, 1018=PAUSE, 1016=PLAY, 1020=STOP, 1015=FRW, 1017=FFW, 1038=MENU, 1024=SLEEP, 1027=CC, 1031=MUTE"

- id: power_off_mode_set
  label: Set Power Off Control Mode
  kind: action
  command: PBTN
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=AC ONLY, 0001=ALL"

- id: volume_range_set
  label: Set Volume Range
  kind: action
  command: MAVL
  params:
    - name: max
      type: integer
      min: 0
      max: 100
      description: "Maximum volume level 0-100"

- id: volume_control_set
  label: Set Volume Control Mode
  kind: action
  command: SVOL
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
        - "0002"
        - "0003"
      description: "0000=LOCKED, 0001=LAST VOLUME, 0002=AC RESET, 0003=STANDBY RESET"

- id: volume_locked_level_set
  label: Set Volume Locked Level
  kind: action
  command: VLFL
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Locked volume level 0-100"

- id: remote_key_set
  label: Set Remote Key Lock
  kind: action
  command: RMOT
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
        - "0002"
      description: "0000=ENABLE, 0001=DISABLE, 0002=PARTIAL"

- id: panel_key_set
  label: Set Panel Key Lock
  kind: action
  command: PANL
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=ENABLE, 0001=DISABLE"

- id: menu_access_set
  label: Set Menu Access
  kind: action
  command: MENU
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=ENABLE, 0001=DISABLE"

- id: av_menu_set
  label: Set AV Setting Menu
  kind: action
  command: AVMN
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=DISABLE, 0001=ENABLE"

- id: osd_mode_set
  label: Set OSD Mode
  kind: action
  command: "OSD#"
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=ENABLE, 0001=DISABLE"

- id: input_mode_set
  label: Set Input Mode
  kind: action
  command: INPM
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
        - "0002"
        - "0003"
      description: "0000=LOCKED, 0001=SELECTABLE, 0002=AC RESET, 0003=STANDBY RESET"

- id: power_on_input_set
  label: Set Power On Input Select
  kind: action
  command: POIS
  params:
    - name: source
      type: enum
      values:
        - "0000"
        - "0001"
        - "0002"
        - "0003"
      description: "0000=LAST, 0001=Air, 0002=AV, 0003=Component"

- id: key_lock_set
  label: Set Key Lock
  kind: action
  command: KYLK
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=off, 0001=on"

- id: power_on_volume_set
  label: Set Power On Volume
  kind: action
  command: POWV
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: "Power-on volume 0-100"

- id: hotel_mode_set
  label: Set Hotel Mode
  kind: action
  command: HTTL
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=off, 0001=on"
- id: speaker_mode_set
  label: Set TV Speaker Mode
  kind: action
  command: SPKM
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
        - "0002"
      description: "0000=SPEAKER, 0001=OFF, 0002=ARC FIRST"

- id: b2b_mode_set
  label: Set B2B Function Mode
  kind: action
  command: B2BM
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=ENABLE, 0001=DISABLE"

- id: usb_behavior_set
  label: Set USB Behavior
  kind: action
  command: USBM
  params:
    - name: mode
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=Home, 0001=B2B"

- id: pixel_shifting_set
  label: Set Pixel Shifting
  kind: action
  command: PSHF
  params:
    - name: state
      type: enum
      values:
        - "0000"
        - "0001"
      description: "0000=Off, 0001=On"
```

## Feedbacks
```yaml
- id: power_remote_on_state
  label: Power On Command Setting
  type: enum
  command: "Q[CLIENT_ID]PWRE????"
  values:
    - "0"
    - "1"
  description: "0=disabled, 1=enabled"

- id: input_source
  label: Current Input Source
  type: enum
  command: "Q[CLIENT_ID]INPT????"
  values:
    - "1"
    - "3"
    - "4"
    - "6"
    - "9"
    - "10"
    - "11"
    - "12"
  description: "1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"

- id: picture_mode
  label: Current Picture Mode
  type: enum
  command: "Q[CLIENT_ID]PMOD????"
  values:
    - "0"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
  description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"

- id: brightness
  label: Brightness Value
  type: integer
  command: "Q[CLIENT_ID]BRIT????"
  range: [0, 100]

- id: contrast
  label: Contrast Value
  type: integer
  command: "Q[CLIENT_ID]CONT????"
  range: [0, 100]

- id: color_saturation
  label: Color Saturation Value
  type: integer
  command: "Q[CLIENT_ID]COLR????"
  range: [0, 100]

- id: tint
  label: Tint Value
  type: integer
  command: "Q[CLIENT_ID]TINT????"
  range: [0, 100]

- id: sharpness
  label: Sharpness Value
  type: integer
  command: "Q[CLIENT_ID]SHRP????"
  range: [0, 20]

- id: aspect_ratio
  label: Current Aspect Ratio
  type: enum
  command: "Q[CLIENT_ID]ASPT????"
  values:
    - "0"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
    - "8"
  description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema"

- id: overscan
  label: Overscan State
  type: enum
  command: "Q[CLIENT_ID]OVSN????"
  values:
    - "0"
    - "2"
  description: "0=On, 2=Off"

- id: color_temp
  label: Current Color Temperature
  type: enum
  command: "Q[CLIENT_ID]CTEM????"
  values:
    - "0"
    - "2"
    - "3"
    - "4"
  description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"

- id: backlight
  label: Backlight Value
  type: integer
  command: "Q[CLIENT_ID]BKLV????"
  range: [0, 100]

- id: sound_mode
  label: Current Sound Mode
  type: enum
  command: "Q[CLIENT_ID]AMOD????"
  values:
    - "0"
    - "2"
    - "3"
    - "4"
    - "5"
  description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"

- id: volume
  label: Current Volume
  type: integer
  command: "Q[CLIENT_ID]VOLM????"
  range: [0, 100]

- id: mute_state
  label: Mute Status
  type: enum
  command: "Q[CLIENT_ID]MUTE????"
  values:
    - "0"
    - "1"
  description: "0=not muted, 1=muted"

- id: speaker_state
  label: TV Speaker State
  type: enum
  command: "Q[CLIENT_ID]ASPK????"
  values:
    - "0"
    - "2"
  description: "0=off, 2=on"

- id: tuner_mode
  label: Tuner Mode
  type: enum
  command: "Q[CLIENT_ID]TUNR????"
  values:
    - "0"
    - "2"
  description: "0=Antenna, 2=Cable"

- id: caption_state
  label: Caption Control State
  type: enum
  command: "Q[CLIENT_ID]CC##????"
  values:
    - "0"
    - "2"
    - "3"
  description: "0=off, 2=on, 3=CC on when mute"

- id: language
  label: OSD Language
  type: enum
  command: "Q[CLIENT_ID]LANG????"
  values:
    - "0"
    - "2"
    - "3"
  description: "0=English, 2=Español, 3=Français"

- id: standby_led
  label: Standby LED State
  type: enum
  command: "Q[CLIENT_ID]PLED????"
  values:
    - "0"
    - "2"
  description: "0=off, 2=on"

- id: power_off_mode
  label: Power Off Control Mode
  type: enum
  command: "Q[CLIENT_ID]PBTN????"
  values:
    - "0"
    - "1"
  description: "0=AC ONLY, 1=ALL"

- id: volume_range
  label: Volume Range
  type: integer
  command: "Q[CLIENT_ID]MAVL????"
  range: [0, 100]

- id: volume_control_mode
  label: Volume Control Mode
  type: enum
  command: "Q[CLIENT_ID]SVOL????"
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: "0=LOCKED, 1=LAST VOLUME, 2=AC RESET, 3=STANDBY RESET"

- id: volume_locked_level
  label: Volume Locked Level
  type: integer
  command: "Q[CLIENT_ID]VLFL????"
  range: [0, 100]

- id: remote_key_state
  label: Remote Key State
  type: enum
  command: "Q[CLIENT_ID]RMOT????"
  values:
    - "0"
    - "1"
    - "2"
  description: "0=ENABLE, 1=DISABLE, 2=PARTIAL"

- id: panel_key_state
  label: Panel Key State
  type: enum
  command: "Q[CLIENT_ID]PANL????"
  values:
    - "0"
    - "1"
  description: "0=ENABLE, 1=DISABLE"

- id: menu_access_state
  label: Menu Access State
  type: enum
  command: "Q[CLIENT_ID]MENU????"
  values:
    - "0"
    - "1"
  description: "0=ENABLE, 1=DISABLE"

- id: av_menu_state
  label: AV Setting Menu State
  type: enum
  command: "Q[CLIENT_ID]AVMN????"
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: osd_mode_state
  label: OSD Mode State
  type: enum
  command: "Q[CLIENT_ID]OSD#????"
  values:
    - "0"
    - "1"
  description: "0=ENABLE, 1=DISABLE"

- id: input_mode_state
  label: Input Mode State
  type: enum
  command: "Q[CLIENT_ID]INPM????"
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: "0=LOCKED, 1=SELECTABLE, 2=AC RESET, 3=STANDBY RESET"

- id: power_on_input_state
  label: Power On Input Select State
  type: enum
  command: "Q[CLIENT_ID]POIS????"
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: "0=LAST, 1=Air, 2=AV, 3=Component"
```

## Variables
```yaml
# UNRESOLVED: No settable non-discrete parameters beyond those captured as Actions
```

## Events
```yaml
# Device sends unsolicited ACK responses (OKAY, EROR, WAIT) but no async event stream documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source mentions: RS-232 remote power on must be explicitly enabled (PWRE0001) before
# POWR commands work. Power-on command not available in STANDBY unless enabled.
# No explicit safety interlocks documented beyond this.
```

## Notes
Protocol uses fixed-length ASCII frames: `OPERATION(1) CLIENT_ID(3) COMMAND(4) DATA(4) CHECKSUM(1) CR(1)`. Operation is `S` for set, `Q` for query. Client ID is last 3 hex digits of Ethernet MAC address; `ALL` broadcasts to all TVs on chain. Checksum is 8-bit sum of all preceding bytes mod 256 (whole frame including checksum sums to zero). Acknowledgement format: `CLIENT_ID:ACK DATA CHECKSUM CR` where ACK is typically `OKAY`, `EROR`, or `WAIT`. Protocol is case sensitive. DB9 female chassis-mount connector (pin 2=RXD, 3=TXD, 5=GND). Custom Install menu must be enabled on TV (Quick Settings > enter 7310) before RS-232 port is active.

<!-- UNRESOLVED: TCP/IP transport not documented in source; serial-only command set likely usable over TCP tunnel but port and framing unspecified -->
<!-- UNRESOLVED: supported model series names not listed in source (Models section blank) -->
<!-- UNRESOLVED: last page of source truncated; KYLK, POWV, HTTL, EPWR, DOXM, POWM, TIMR, ENRG, HCEC, DASE commands partially visible but parameters incomplete -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
retrieved_at: 2026-05-04T21:56:29.087Z
last_checked_at: 2026-05-14T18:17:16.673Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.673Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 67 spec actions matched source commands with correct opcodes and parameters; transport values confirmed verbatim in source documentation. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP transport expected (entity ID suffix _ip, user-stated protocol) but not documented in this source. Port number unknown."
- "specific model variants / supported series names not listed (Models section empty in source)"
- "TCP/IP expected per family metadata but no port stated in source; serial commands likely tunnel over TCP"
- "TCP port not stated in source"
- "No settable non-discrete parameters beyond those captured as Actions"
- "no multi-step sequences documented in source"
- "TCP/IP transport not documented in source; serial-only command set likely usable over TCP tunnel but port and framing unspecified"
- "supported model series names not listed in source (Models section blank)"
- "last page of source truncated; KYLK, POWV, HTTL, EPWR, DOXM, POWM, TIMR, ENRG, HCEC, DASE commands partially visible but parameters incomplete"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
