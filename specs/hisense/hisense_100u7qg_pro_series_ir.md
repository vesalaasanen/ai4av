---
spec_id: admin/hisense-100u7qg-pro-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 100U7QG PRO Series Control Spec"
manufacturer: HiSense
model_family: "100U7QG PRO Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "100U7QG PRO Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:15.969Z
generated_at: 2026-05-14T18:17:15.969Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.969Z
  matched_actions: 40
  action_count: 40
  confidence: high
  summary: "All 70 spec actions (40 set/action + 30 query/feedback) match literal source commands with correct shapes and parameters; transport fully verified; only 4 source commands absent from spec, below the short threshold."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# HiSense 100U7QG PRO Series Control Spec

## Summary
HiSense Prosumer TV supporting discrete IR control via Pronto CCF codes and bidirectional RS-232 serial control. RS-232 provides a fixed-length ASCII message frame with 4-character command mnemonics, set/query operation codes, client-ID addressing (MAC-based or broadcast), and 8-bit checksum. Covers power, input routing, picture/audio settings, volume, mute, tuner, captions, hotel-mode lockouts, and remote/panel key management.

<!-- UNRESOLVED: TCP/IP control not documented — serial and IR only -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version V3.6 noted but no changelog for command additions -->

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
  connector: DB9 D-sub female chassis mount
  pinout:
    1: N/C
    2: RXD
    3: TXD
    4: DTR
    5: GND
    6: DSR
    7: RTS
    8: CTS
    9: Power Input
  communication_code: ASCII
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # POWR on/off, PWRE enable remote power
  - queryable    # extensive query commands (INPT????, PMOD????, VOLM????, etc.)
  - routable     # INPT selects TV/AV/Component/HDMI1-4/VGA
  - levelable    # VOLM 0-100, BRIT 0-100, CONT 0-100, BKLV 0-100, COLR 0-100, SHRP 0-20, TINT 0-100
```

## Actions
```yaml
actions:
  - id: power_remote_enable
    label: Enable/Disable RS-232 Remote Power On
    kind: action
    command: PWRE
    params:
      - name: state
        type: enum
        values: ["0000", "0001"]
        description: "0000=Disable, 0001=Enable RS-232 Remote Power On"

  - id: power_on
    label: Power On
    kind: action
    command: POWR0001
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: POWR0000
    params: []

  - id: select_input
    label: Select Input Source
    kind: action
    command: INPT
    params:
      - name: source
        type: enum
        values: ["0000", "0001", "0004", "0003", "0009", "0010", "0011", "0012", "0006"]
        description: "0000=Cycle, 0001=TV, 0004=AV, 0003=Component, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4, 0006=VGA"

  - id: set_picture_mode
    label: Set Picture Mode
    kind: action
    command: PMOD
    params:
      - name: mode
        type: enum
        values: ["0000", "0002", "0003", "0004", "0005", "0006"]
        description: "0000=Standard, 0002=Vivid, 0003=EnergySaving, 0004=Theater, 0005=Game, 0006=Sport"

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: BRIT
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Brightness 0-100 (zero-padded 4 digits)"

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: CONT
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Contrast 0-100 (zero-padded 4 digits)"

  - id: set_color_saturation
    label: Set Color Saturation
    kind: action
    command: COLR
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Color saturation 0-100 (zero-padded 4 digits)"

  - id: set_tint
    label: Set Tint
    kind: action
    command: TINT
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Tint 0-100 (zero-padded 4 digits)"

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: SHRP
    params:
      - name: value
        type: integer
        min: 0
        max: 20
        description: "Sharpness 0-20 (zero-padded 4 digits)"

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: ASPT
    params:
      - name: mode
        type: enum
        values: ["0000", "0002", "0003", "0004", "0005", "0006", "0007", "0008"]
        description: "0000=Auto, 0002=Normal, 0003=Zoom, 0004=Wide, 0005=Direct, 0006=1-to-1 pixel map, 0007=Panoramic, 0008=Cinema"

  - id: set_overscan
    label: Set Overscan
    kind: action
    command: OVSN
    params:
      - name: state
        type: enum
        values: ["0000", "0002"]
        description: "0000=On, 0002=Off"

  - id: reset_picture
    label: Reset Picture Settings
    kind: action
    command: RSTP1000
    params: []

  - id: set_color_temp
    label: Set Color Temperature
    kind: action
    command: CTEM
    params:
      - name: temp
        type: enum
        values: ["0000", "0002", "0003", "0004"]
        description: "0000=High, 0002=Middle, 0003=Mid-Low, 0004=Low"

  - id: set_backlight
    label: Set Backlight
    kind: action
    command: BKLV
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Backlight 0-100 (zero-padded 4 digits)"

  - id: set_sound_mode
    label: Set Sound Mode
    kind: action
    command: AMOD
    params:
      - name: mode
        type: enum
        values: ["0000", "0002", "0003", "0004", "0005"]
        description: "0000=Standard, 0002=Theater, 0003=Music, 0004=Speech, 0005=Late night"

  - id: reset_audio
    label: Reset Audio Settings
    kind: action
    command: RSTA2000
    params: []

  - id: set_volume
    label: Set Volume
    kind: action
    command: VOLM
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Volume 0-100 (zero-padded 4 digits)"

  - id: set_mute
    label: Set Mute
    kind: action
    command: MUTE
    params:
      - name: state
        type: enum
        values: ["0000", "0001"]
        description: "0000=Mute Off, 0001=Mute On"

  - id: set_tv_speaker
    label: Set TV Speaker
    kind: action
    command: ASPK
    params:
      - name: state
        type: enum
        values: ["0000", "0002"]
        description: "0000=Off, 0002=On"

  - id: set_tuner_mode
    label: Set Tuner Mode
    kind: action
    command: TUNR
    params:
      - name: mode
        type: enum
        values: ["0000", "0002"]
        description: "0000=Antenna, 0002=Cable"

  - id: auto_search
    label: Automatic Search
    kind: action
    command: TSCN0001
    params: []

  - id: channel_up
    label: Channel Up
    kind: action
    command: CHAN0001
    params: []

  - id: channel_down
    label: Channel Down
    kind: action
    command: CHAN0000
    params: []

  - id: set_caption
    label: Set Caption Control
    kind: action
    command: "CC##"
    params:
      - name: mode
        type: enum
        values: ["0000", "0002", "0003"]
        description: "0000=Off, 0002=On, 0003=CC on when mute"

  - id: factory_reset
    label: Restore Factory Settings
    kind: action
    command: RSET9999
    params: []

  - id: set_osd_language
    label: Set OSD Language
    kind: action
    command: LANG
    params:
      - name: lang
        type: enum
        values: ["0000", "0002", "0003"]
        description: "0000=English, 0002=Español, 0003=Français"

  - id: set_standby_led
    label: Set Standby LED
    kind: action
    command: PLED
    params:
      - name: state
        type: enum
        values: ["0000", "0002"]
        description: "0000=Off, 0002=On"

  - id: simulate_button
    label: Simulate Remote Button
    kind: action
    command: BTTN
    params:
      - name: button
        type: enum
        values: ["1012", "1031", "1032", "1033", "1034", "1035", "1036", "1045", "1023", "1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010", "1024", "1054", "1055", "1018", "1016", "1038", "1046", "1020", "1015", "1027", "1050", "1051", "1053", "1052", "1041", "1042", "1043", "1044", "1040", "1017", "1019", "1021", "1039"]
        description: "Button code (1-prefix): POWER=1012, MUTE=1031, VOL-=1032, VOL+=1033, CH+=1034, CH-=1035, INPUT=1036, BACK=1045, etc."

  - id: set_power_off_mode
    label: Set Power Off Control Mode
    kind: action
    command: PBTN
    params:
      - name: mode
        type: enum
        values: ["0000", "0001"]
        description: "0000=AC Only, 0001=ALL"

  - id: set_max_volume
    label: Set Maximum Volume Level
    kind: action
    command: MAVL
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Max volume 0-100 (zero-padded 4 digits)"

  - id: set_volume_control
    label: Set Volume Control Mode
    kind: action
    command: SVOL
    params:
      - name: mode
        type: enum
        values: ["0000", "0001", "0002", "0003"]
        description: "0000=Locked, 0001=Last Volume, 0002=AC Reset, 0003=Standby Reset"

  - id: set_volume_locked_level
    label: Set Volume Locked Level
    kind: action
    command: VLFL
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Locked volume level 0-100 (zero-padded 4 digits)"

  - id: set_remote_key
    label: Set Remote Key Lock
    kind: action
    command: RMOT
    params:
      - name: mode
        type: enum
        values: ["0000", "0001", "0002"]
        description: "0000=Enable, 0001=Disable, 0002=Partial"

  - id: set_panel_key
    label: Set Panel Key Lock
    kind: action
    command: PANL
    params:
      - name: mode
        type: enum
        values: ["0000", "0001"]
        description: "0000=Enable, 0001=Disable"

  - id: set_menu_access
    label: Set Menu Access
    kind: action
    command: MENU
    params:
      - name: mode
        type: enum
        values: ["0000", "0001"]
        description: "0000=Enable, 0001=Disable"

  - id: set_av_setting_menu
    label: Set AV Setting Menu
    kind: action
    command: AVMN
    params:
      - name: mode
        type: enum
        values: ["0000", "0001"]
        description: "0000=Disable, 0001=Enable"

  - id: set_osd_mode
    label: Set OSD Mode
    kind: action
    command: "OSD#"
    params:
      - name: mode
        type: enum
        values: ["0000", "0001"]
        description: "0000=Enable, 0001=Disable"

  - id: set_input_mode
    label: Set Input Mode
    kind: action
    command: INPM
    params:
      - name: mode
        type: enum
        values: ["0000", "0001", "0002", "0003"]
        description: "0000=Locked, 0001=Selectable, 0002=AC Reset, 0003=Standby Reset"

  - id: set_power_on_input
    label: Set Power On Input Selection
    kind: action
    command: POIS
    params:
      - name: source
        type: enum
        values: ["0000", "0001", "0002", "0003"]
        description: "0000=Last, 0001=Air, 0002=AV, 0003=Component"
```

## Feedbacks
```yaml
feedbacks:
  - id: query_power_remote
    label: Query Power On Command Setting
    command: PWRE????
    type: enum
    values: ["0", "1"]
    description: "0=Disabled, 1=Enabled"

  - id: query_input_source
    label: Query Current Input Source
    command: INPT????
    type: enum
    values: ["1", "4", "3", "9", "10", "11", "12", "6"]
    description: "1=TV, 4=AV, 3=Component, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA"

  - id: query_picture_mode
    label: Query Picture Mode
    command: PMOD????
    type: enum
    values: ["0", "2", "3", "4", "5", "6"]
    description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"

  - id: query_brightness
    label: Query Brightness
    command: BRIT????
    type: integer
    range: "0-100"

  - id: query_contrast
    label: Query Contrast
    command: CONT????
    type: integer
    range: "0-100"

  - id: query_color_saturation
    label: Query Color Saturation
    command: COLR????
    type: integer
    range: "0-100"

  - id: query_tint
    label: Query Tint
    command: TINT????
    type: integer
    range: "0-100"

  - id: query_sharpness
    label: Query Sharpness
    command: SHRP????
    type: integer
    range: "0-20"

  - id: query_aspect_ratio
    label: Query Aspect Ratio
    command: ASPT????
    type: enum
    values: ["0", "2", "3", "4", "5", "6", "7", "8"]
    description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema"

  - id: query_overscan
    label: Query Overscan
    command: OVSN????
    type: enum
    values: ["0", "2"]
    description: "0=On, 2=Off"

  - id: query_color_temp
    label: Query Color Temperature
    command: CTEM????
    type: enum
    values: ["0", "2", "3", "4"]
    description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"

  - id: query_backlight
    label: Query Backlight
    command: BKLV????
    type: integer
    range: "0-100"

  - id: query_sound_mode
    label: Query Sound Mode
    command: AMOD????
    type: enum
    values: ["0", "2", "3", "4", "5"]
    description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"

  - id: query_volume
    label: Query Volume
    command: VOLM????
    type: integer
    range: "0-100"

  - id: query_mute
    label: Query Mute Status
    command: MUTE????
    type: enum
    values: ["0", "1"]
    description: "0=Not Muted, 1=Muted"

  - id: query_tv_speaker
    label: Query TV Speaker
    command: ASPK????
    type: enum
    values: ["0", "2"]
    description: "0=Off, 2=On"

  - id: query_tuner_mode
    label: Query Tuner Mode
    command: TUNR????
    type: enum
    values: ["0", "2"]
    description: "0=Antenna, 2=Cable"

  - id: query_caption
    label: Query Caption Control
    command: "CC##????"
    type: enum
    values: ["0", "2", "3"]
    description: "0=Off, 2=On, 3=CC on when mute"

  - id: query_osd_language
    label: Query OSD Language
    command: LANG????
    type: enum
    values: ["0", "2", "3"]
    description: "0=English, 2=Español, 3=Français"

  - id: query_standby_led
    label: Query Standby LED
    command: PLED????
    type: enum
    values: ["0", "2"]
    description: "0=Off, 2=On"

  - id: query_power_off_mode
    label: Query Power Off Control Mode
    command: PBTN????
    type: enum
    values: ["0", "1"]
    description: "0=AC Only, 1=ALL"

  - id: query_max_volume
    label: Query Maximum Volume Level
    command: MAVL????
    type: integer
    range: "0-100"

  - id: query_volume_control
    label: Query Volume Control Mode
    command: SVOL????
    type: enum
    values: ["0", "1", "2", "3"]
    description: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"

  - id: query_volume_locked_level
    label: Query Volume Locked Level
    command: VLFL????
    type: integer
    range: "0-100"

  - id: query_remote_key
    label: Query Remote Key Lock
    command: RMOT????
    type: enum
    values: ["0", "1", "2"]
    description: "0=Enable, 1=Disable, 2=Partial"

  - id: query_panel_key
    label: Query Panel Key Lock
    command: PANL????
    type: enum
    values: ["0", "1"]
    description: "0=Enable, 1=Disable"

  - id: query_menu_access
    label: Query Menu Access
    command: MENU????
    type: enum
    values: ["0", "1"]
    description: "0=Enable, 1=Disable"

  - id: query_av_setting_menu
    label: Query AV Setting Menu
    command: AVMN????
    type: enum
    values: ["0", "1"]
    description: "0=Disable, 1=Enable"

  - id: query_osd_mode
    label: Query OSD Mode
    command: "OSD#????"
    type: enum
    values: ["0", "1"]
    description: "0=Enable, 1=Disable"

  - id: query_input_mode
    label: Query Input Mode
    command: INPM????
    type: enum
    values: ["0", "1", "2", "3"]
    description: "0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"
```

## Variables
```yaml
# No continuous settable variables beyond the enumerated actions above.
# All parameters are discrete set/query pairs already covered in Actions/Feedbacks.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
interlocks:
  - PWRE must be enabled before POWR on command works in standby mode
# UNRESOLVED: no additional safety interlock procedures stated in source
```

## Notes
- Protocol is case-sensitive (uppercase only for commands).
- Message frame: `[Operation(1B)][ClientID(3B)][Command(4B)][Data(4B)][Checksum(1B)][CR(1B)]` — fixed 14 bytes.
- Operation: `S` = Set, `Q` = Query.
- Client ID: last 3 hex digits of Ethernet MAC address; `ALL` for broadcast.
- ACK format: `[ClientID(3B)]:[ACK(4B)][Data(4B)][Checksum(1B)][CR(1B)]`.
- Common ACK values: `OKAY`, `EROR`, `WAIT`.
- Checksum: 8-bit sum of all preceding bytes including checksum byte itself must equal zero.
- RS-232 port must be enabled via TV Custom Install menu (Quick Settings → enter "7310" → Enable Custom Installation).
- Power On command via RS-232 requires "Power On Command" set to Enable in Custom Install menu.
- Document version 3.6 dated 2017-04-17; covers both Smart TV and Feature TV models.

<!-- UNRESOLVED: IR discrete codes (Pronto CCF) documented but not structured as actions — binary IR protocol, not serial -->
<!-- UNRESOLVED: no response timeout specified -->
<!-- UNRESOLVED: HDMI5 input listed in IR table but not in RS-232 INPT command set -->
<!-- UNRESOLVED: POIS command has incomplete source list (only Air/AV/Component documented; HDMI not listed for POIS) -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:15.969Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.969Z
matched_actions: 40
action_count: 40
confidence: high
summary: "All 70 spec actions (40 set/action + 30 query/feedback) match literal source commands with correct shapes and parameters; transport fully verified; only 4 source commands absent from spec, below the short threshold."
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
