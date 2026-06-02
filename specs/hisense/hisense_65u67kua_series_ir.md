---
spec_id: admin/hisense-65u67kua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 65U67KUA Series Control Spec"
manufacturer: HiSense
model_family: "65U67KUA Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "65U67KUA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T22:19:29.083Z
last_checked_at: 2026-06-02T21:41:59.797Z
generated_at: 2026-06-02T21:41:59.797Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
  - "firmware version compatibility not stated in source; per-TV supported IR subset not enumerated in source (source defers to User Manual)"
  - "source describes a power-on sequence (enable PWRE then send POWR0001) as commentary, not as a defined macro. See Notes."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements beyond the Custom Install menu enablement note."
  - "firmware version compatibility not stated in source. UNRESOLVED: per-TV subset of supported IR codes not enumerated — source defers to User Manual. UNRESOLVED: voltage/current specs of DB9 Power Input pin 9 not stated (omitted as Tier-3 field). UNRESOLVED: full enumeration of Custom Install menu items beyond Custom Installation toggle and Power On Command setting not in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:59.797Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec action mnemonics verified verbatim in source; transport confirmed; 4 extra RS-232 commands in source (SPKM/B2BM/USBM/PSHF) fall below the 5-command short threshold and ratio 38/42=0.905 meets the 0.9 floor. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 65U67KUA Series Control Spec

## Summary
Prosumer TV controlled via RS-232C (DB9 D-sub) at 9600 8N1 ASCII with a fixed-length command/ACK frame, plus a full discrete IR remote code table. Spec covers ASCII set/query commands, parameter ranges, IR hex codes, and the Custom Install menu enablement required before RS-232 use.

<!-- UNRESOLVED: firmware version compatibility not stated in source; per-TV supported IR subset not enumerated in source (source defers to User Manual) -->

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
  electrical: RS-232C
  connector: DB9 D-sub female chassis mount
  communication_code: ASCII
  line_termination: "0x0D"  # CR
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from POWR/PWRE set commands
- routable        # inferred from INPT set commands
- queryable       # inferred from PWRE/INPT/PMOD/BRIT/CONT/COLR/TINT/SHRP/ASPT/OVSN/CTEM/BKLV/AMOD/VOLM/MUTE/ASPK/TUNR/CC/LANG/PLED/MAVL/SVOL/VLFL/RMOT/PANL/MENU/AVMN/OSD/INPM/POIS/PBTN query commands
- levelable       # inferred from BRIT/CONT/COLR/TINT/SHRP/BKLV/VOLM range commands
```

## Actions

```yaml
- id: power_on_command_enable
  label: Power On Command Enable
  kind: action
  command: "S{client_id}PWRE0000"  # 0=disable, 1=enable; see Notes for client_id/checksum
  params:
    - name: client_id
      type: string
      description: 3 hex chars (last 3 MAC bytes) or "ALL" for broadcast
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=Disable RS-232 Remote Power On, 1=Enable"
  notes: "Not available in STANDBY mode (per V3.1 revision note)."

- id: query_power_on_command_setting
  label: Query Power On Command Setting
  kind: query
  command: "Q{client_id}PWRE????"
  params:
    - name: client_id
      type: string

- id: set_power
  label: Set Power On/Off
  kind: action
  command: "S{client_id}POWR{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=Standby, 1=Power On"

- id: set_input
  label: Set Input Source
  kind: action
  command: "S{client_id}INPT{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001", "0004", "0003", "0009", "0010", "0011", "0012", "0006"]
      description: "0=Next, 1=TV, 4=AV, 3=Component, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA"

- id: query_input
  label: Query Current Input
  kind: query
  command: "Q{client_id}INPT????"
  params:
    - name: client_id
      type: string

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "S{client_id}PMOD{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002", "0003", "0004", "0005", "0006"]
      description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "Q{client_id}PMOD????"
  params:
    - name: client_id
      type: string

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "S{client_id}BRIT{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0100 (hex); example 0035=53 decimal, 0050=80, 0100=256"

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "Q{client_id}BRIT????"
  params:
    - name: client_id
      type: string

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "S{client_id}CONT{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0100 (hex)"

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "Q{client_id}CONT????"
  params:
    - name: client_id
      type: string

- id: set_color
  label: Set Color Saturation
  kind: action
  command: "S{client_id}COLR{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0100 (hex)"

- id: query_color
  label: Query Color Saturation
  kind: query
  command: "Q{client_id}COLR????"
  params:
    - name: client_id
      type: string

- id: set_tint
  label: Set Tint
  kind: action
  command: "S{client_id}TINT{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0100 (hex)"

- id: query_tint
  label: Query Tint
  kind: query
  command: "Q{client_id}TINT????"
  params:
    - name: client_id
      type: string

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "S{client_id}SHRP{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0020 (hex); max 0x20=32"

- id: query_sharpness
  label: Query Sharpness
  kind: query
  command: "Q{client_id}SHRP????"
  params:
    - name: client_id
      type: string

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "S{client_id}ASPT{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002", "0003", "0004", "0005", "0006", "0007", "0008"]
      description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema"

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "Q{client_id}ASPT????"
  params:
    - name: client_id
      type: string

- id: set_overscan
  label: Set Overscan
  kind: action
  command: "S{client_id}OVSN{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002"]
      description: "0=On, 2=Off"

- id: query_overscan
  label: Query Overscan
  kind: query
  command: "Q{client_id}OVSN????"
  params:
    - name: client_id
      type: string

- id: reset_picture
  label: Reset Picture Settings
  kind: action
  command: "S{client_id}RSTP1000"
  params:
    - name: client_id
      type: string

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "S{client_id}CTEM{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002", "0003", "0004"]
      description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"

- id: query_color_temp
  label: Query Color Temperature
  kind: query
  command: "Q{client_id}CTEM????"
  params:
    - name: client_id
      type: string

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "S{client_id}BKLV{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0100 (hex)"

- id: query_backlight
  label: Query Backlight
  kind: query
  command: "Q{client_id}BKLV????"
  params:
    - name: client_id
      type: string

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "S{client_id}AMOD{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002", "0003", "0004", "0005"]
      description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late Night"

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "Q{client_id}AMOD????"
  params:
    - name: client_id
      type: string

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  command: "S{client_id}RSTA2000"
  params:
    - name: client_id
      type: string

- id: set_volume
  label: Set Volume
  kind: action
  command: "S{client_id}VOLM{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0100 (hex)"

- id: query_volume
  label: Query Volume
  kind: query
  command: "Q{client_id}VOLM????"
  params:
    - name: client_id
      type: string

- id: set_mute
  label: Set Mute
  kind: action
  command: "S{client_id}MUTE{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=Off, 1=On"

- id: query_mute
  label: Query Mute
  kind: query
  command: "Q{client_id}MUTE????"
  params:
    - name: client_id
      type: string

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  command: "S{client_id}ASPK{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002"]
      description: "0=Off, 2=On"

- id: query_tv_speaker
  label: Query TV Speaker
  kind: query
  command: "Q{client_id}ASPK????"
  params:
    - name: client_id
      type: string

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  command: "S{client_id}TUNR{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002"]
      description: "0=Antenna, 2=Cable"

- id: query_tuner_mode
  label: Query Tuner Mode
  kind: query
  command: "Q{client_id}TUNR????"
  params:
    - name: client_id
      type: string

- id: auto_search
  label: Automatic Channel Search
  kind: action
  command: "S{client_id}TSCN0001"
  params:
    - name: client_id
      type: string

- id: set_channel
  label: Channel Up/Down
  kind: action
  command: "S{client_id}CHAN{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=Down, 1=Up"

- id: set_caption
  label: Set Closed Caption
  kind: action
  command: "S{client_id}CC##{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002", "0003"]
      description: "0=Off, 2=On, 3=On when mute"

- id: query_caption
  label: Query Closed Caption
  kind: query
  command: "Q{client_id}CC##????"
  params:
    - name: client_id
      type: string

- id: restore_factory
  label: Restore Factory Settings
  kind: action
  command: "S{client_id}RSET9999"
  params:
    - name: client_id
      type: string

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "S{client_id}LANG{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002", "0003"]
      description: "0=English, 2=Español, 3=Français"

- id: query_osd_language
  label: Query OSD Language
  kind: query
  command: "Q{client_id}LANG????"
  params:
    - name: client_id
      type: string

- id: set_standby_led
  label: Set Standby LED
  kind: action
  command: "S{client_id}PLED{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0002"]
      description: "0=Off, 2=On"

- id: query_standby_led
  label: Query Standby LED
  kind: query
  command: "Q{client_id}PLED????"
  params:
    - name: client_id
      type: string

- id: remote_button
  label: Remote Control Button Simulator
  kind: action
  command: "S{client_id}BTTN{code}"
  params:
    - name: client_id
      type: string
    - name: code
      type: string
      description: "4-digit button code with '1' prefix. Examples: 1000=0, 1001=1, 1002=2, 1003=3, 1004=4, 1005=5, 1006=6, 1007=7, 1008=8, 1009=9, 1010=Dash, 1012=Power, 1015=FRW, 1016=Play, 1017=FFW, 1018=Pause, 1019=Prev, 1020=Stop, 1021=Next, 1023=HiMedia, 1024=Sleep, 1027=CC, 1031=Mute, 1032=Vol-, 1033=Vol+, 1034=Ch+, 1035=Ch-, 1036=Input, 1038=Menu, 1039=HiSmart, 1040=OK, 1041=Up, 1042=Down, 1043=Left, 1044=Right, 1045=Back, 1046=Exit, 1050=Red, 1051=Green, 1052=Blue, 1053=Yellow, 1054=MTS/SAP, 1055=Live TV"

- id: set_power_off_control
  label: Set Power Off Control Mode
  kind: action
  command: "S{client_id}PBTN{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=AC Only, 1=All"

- id: query_power_off_control
  label: Query Power Off Control Mode
  kind: query
  command: "Q{client_id}PBTN????"
  params:
    - name: client_id
      type: string

- id: set_volume_range
  label: Set Volume Range
  kind: action
  command: "S{client_id}MAVL{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0100 (hex); defines max volume scale 0-100"

- id: query_volume_range
  label: Query Volume Range
  kind: query
  command: "Q{client_id}MAVL????"
  params:
    - name: client_id
      type: string

- id: set_volume_control
  label: Set Volume Control Mode
  kind: action
  command: "S{client_id}SVOL{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001", "0002", "0003"]
      description: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"

- id: query_volume_control
  label: Query Volume Control Mode
  kind: query
  command: "Q{client_id}SVOL????"
  params:
    - name: client_id
      type: string

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  command: "S{client_id}VLFL{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      description: "0000-0100 (hex); 0-100 when SVOL=Locked"

- id: query_volume_locked_level
  label: Query Volume Locked Level
  kind: query
  command: "Q{client_id}VLFL????"
  params:
    - name: client_id
      type: string

- id: set_remote_key
  label: Set Remote Key Lock
  kind: action
  command: "S{client_id}RMOT{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001", "0002"]
      description: "0=Enable, 1=Disable, 2=Partial"

- id: query_remote_key
  label: Query Remote Key Lock
  kind: query
  command: "Q{client_id}RMOT????"
  params:
    - name: client_id
      type: string

- id: set_panel_key
  label: Set Panel Key Lock
  kind: action
  command: "S{client_id}PANL{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=Enable, 1=Disable"

- id: query_panel_key
  label: Query Panel Key Lock
  kind: query
  command: "Q{client_id}PANL????"
  params:
    - name: client_id
      type: string

- id: set_menu_access
  label: Set Menu Access
  kind: action
  command: "S{client_id}MENU{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=Enable, 1=Disable"

- id: query_menu_access
  label: Query Menu Access
  kind: query
  command: "Q{client_id}MENU????"
  params:
    - name: client_id
      type: string

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  command: "S{client_id}AVMN{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=Disable, 1=Enable"

- id: query_av_setting_menu
  label: Query AV Setting Menu
  kind: query
  command: "Q{client_id}AVMN????"
  params:
    - name: client_id
      type: string

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  command: "S{client_id}OSD#{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001"]
      description: "0=Enable, 1=Disable"

- id: query_osd_mode
  label: Query OSD Mode
  kind: query
  command: "Q{client_id}OSD#????"
  params:
    - name: client_id
      type: string

- id: set_input_mode
  label: Set Input Mode
  kind: action
  command: "S{client_id}INPM{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001", "0002", "0003"]
      description: "0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"

- id: query_input_mode
  label: Query Input Mode
  kind: query
  command: "Q{client_id}INPM????"
  params:
    - name: client_id
      type: string

- id: set_power_on_input
  label: Set Power On Input
  kind: action
  command: "S{client_id}POIS{data}"
  params:
    - name: client_id
      type: string
    - name: data
      type: string
      enum: ["0000", "0001", "0002", "0003"]
      description: "0=Last, 1=Air, 2=AV, 3=Component"
```

## Feedbacks
```yaml
- id: power_on_command_setting
  type: enum
  values: ["0", "1"]  # 0=Disable, 1=Enable
- id: input_source
  type: enum
  values: ["1", "3", "4", "6", "9", "10", "11", "12"]  # TV, Component, AV, VGA, HDMI1-4
- id: picture_mode
  type: enum
  values: ["0", "2", "3", "4", "5", "6"]  # Standard, Vivid, EnergySaving, Theater, Game, Sport
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
  range: [0, 20]
- id: aspect_ratio
  type: enum
  values: ["0", "2", "3", "4", "5", "6", "7", "8"]  # Auto, Normal, Zoom, Wide, Direct, 1-to-1, Panoramic, Cinema
- id: overscan
  type: enum
  values: ["0", "2"]  # On, Off
- id: color_temp
  type: enum
  values: ["0", "2", "3", "4"]  # High, Middle, Mid-Low, Low
- id: backlight
  type: integer
  range: [0, 100]
- id: sound_mode
  type: enum
  values: ["0", "2", "3", "4", "5"]  # Standard, Theater, Music, Speech, Late Night
- id: volume
  type: integer
  range: [0, 100]
- id: mute
  type: enum
  values: ["0", "1"]  # Off, On
- id: tv_speaker
  type: enum
  values: ["0", "2"]  # Off, On
- id: tuner_mode
  type: enum
  values: ["0", "2"]  # Antenna, Cable
- id: caption
  type: enum
  values: ["0", "2", "3"]  # Off, On, On-when-mute
- id: osd_language
  type: enum
  values: ["0", "2", "3"]  # English, Español, Français
- id: standby_led
  type: enum
  values: ["0", "2"]  # Off, On
- id: volume_range
  type: integer
  range: [0, 100]
- id: volume_control_mode
  type: enum
  values: ["0", "1", "2", "3"]  # Locked, Last, AC Reset, Standby Reset
- id: volume_locked_level
  type: integer
  range: [0, 100]
- id: remote_key
  type: enum
  values: ["0", "1", "2"]  # Enable, Disable, Partial
- id: panel_key
  type: enum
  values: ["0", "1"]  # Enable, Disable
- id: menu_access
  type: enum
  values: ["0", "1"]  # Enable, Disable
- id: av_setting_menu
  type: enum
  values: ["0", "1"]  # Disable, Enable
- id: osd_mode
  type: enum
  values: ["0", "1"]  # Enable, Disable
- id: input_mode
  type: enum
  values: ["0", "1", "2", "3"]  # Locked, Selectable, AC Reset, Standby Reset
- id: power_off_control
  type: enum
  values: ["0", "1"]  # AC Only, All
```

## Variables
```yaml
# None - all settable parameters are exposed as discrete set/query commands in Actions.
```

## Events
```yaml
# Source documents no unsolicited event/notification mechanism.
```

## Macros
```yaml
# UNRESOLVED: source describes a power-on sequence (enable PWRE then send POWR0001) as commentary, not as a defined macro. See Notes.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements beyond the Custom Install menu enablement note.
```

## Notes

**RS-232 enablement (Custom Install menu).** Per source V3.1+ note: access menu by pressing Quick Settings key on the remote, then entering `7 3 1 0`. Scroll to `Custom Installation` and set to `Enable`. For RS-232 to be active in standby, also set `Power On Command` to `Enable` before exiting the menu.

**Frame format.** Fixed-length 14-byte ASCII frame:
- Position 1 (1B): operation direction — `S` (set) or `Q` (query)
- Position 2-4 (3B): client_id — `ALL` for broadcast, or last 3 ASCII hex bytes of TV's MAC address (e.g. `5FA`, `465`)
- Position 5-8 (4B): command mnemonic (A-Z, e.g. `POWR`, `INPT`)
- Position 9-12 (4B): data — `0-9`, `A-Z`, `#`, `?` (e.g. `0000`, `0001`, `????` for query placeholder)
- Position 13 (1B): checksum — 8-bit sum so that total of all preceding ASCII bytes plus this byte = `0x00` modulo 256
- Position 14 (1B): termination — `0x0D` (carriage return)

**ACK format.** `{client_id}:{ACK}{data}{checksum}{0x0D}`. Common ACK tokens: `OKAY`, `EROR`, `WAIT`. Example (per source Example 1): command `S5FAPOWR232` returns `5FA:OKAY####[checksum][0x0D]`. Source notes that `POWR232` and `POWRON##` are aliases of `POWR0001` (both turn TV on).

**Checksum rule.** Sum of all ASCII bytes including the checksum byte (positions 1-13) modulo 256 = `0x00`. Generic `ALL` forms (e.g. `SALLPOWR0000` = `0x53 0x41 0x4C 0x4C 0x50 0x4F 0x57 0x52 0x30 0x30 0x30 0x30 0xCC 0x0D`) have checksum `0xCC`. MAC-specific forms replace `ALL` (3 bytes) with the last-3 hex of MAC; checksum differs.

**TV-specific vs Generic.** Source provides two hex columns: TV-Specific (client_id = last 3 MAC hex) and Generic (client_id = `ALL`). Both target the same logical command.

**Discrete IR codes (not mapped to `serial` transport).** Source contains 50+ Pronto/CCF IR codes per function. Protocol `ir` not in standard enum; treat as secondary pathway. Sample (from source): Power Toggle `04 FB 70 8F`, Power On `04 FB 71 8E`, Power Off `04 FB 72 8D`, HDMI.1 `04 FB 7C 83`, HDMI.2 `04 FB 7D 82`, HDMI.3 `04 FB 7E 81`, HDMI.4 `04 FB 7F 80`, HDMI.5 `04 FB 80 7F`, VGA `04 FB 81 7E`, USB `04 FB 82 7D`, Picture Mode `04 FB 83 7C`, Sound Mode `04 FB 84 7B`, Aspect Wide 16:9 `04 FB 85 7A`, Normal 4:3 `04 FB 86 79`, Cinema `04 FB 87 78`, Panorama `04 FB 88 77`, Zoom `04 FB 89 76`, Channel List `04 FB 8A 75`, Fav Channel `04 FB 8B 74`, Sleep `04 FB 8C 73`, TV Menu `04 FB 8D 72`, Home `04 FB 8E 71`, Tools `04 FB 8F 70`, Digits 0-9 `04 FB 90 6F` through `04 FB 99 66`, Dash `04 FB 9A 65`, Previous Channel `04 FB 9B 64`, Up/Down/Left/Right `04 FB 9C 63` through `04 FB 9F 60`, Enter `04 FB A0 5F`, OK `04 FB A1 5E`, Return `04 FB A2 5D`, Exit `04 FB A3 5C`, Info `04 FB A4 5B`, Vol-/Vol+ `04 FB A5 5A` / `04 FB A6 59`, Ch-/Ch+ `04 FB A7 58` / `04 FB A8 57`, PIP toggle/input/swap/position/size `04 FB A9 56` through `04 FB AD 52`, Guide `04 FB AE 51`, Freeze `04 FB AF 50`. Source notes per-model IR coverage varies — consult User Manual for your specific model.

**Power-on remote sequence (commentary, not a defined macro).** Source Example 1 shows: send `S5FAPOWRON##` (enable RS-232 remote power) then `S5FAPOWER232` (turn on). The `WAIT` ACK is observed between command and `OKAY` during state transition.

**Custom Install menu notes.** Step 1 entry code is `7 3 1 0`. After connecting TV to a network, MAC address available via `Menu > Network > Network Information` and is used as the 3-byte client_id in TV-specific commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source. UNRESOLVED: per-TV subset of supported IR codes not enumerated — source defers to User Manual. UNRESOLVED: voltage/current specs of DB9 Power Input pin 9 not stated (omitted as Tier-3 field). UNRESOLVED: full enumeration of Custom Install menu items beyond Custom Installation toggle and Power On Command setting not in source. -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T22:19:29.083Z
last_checked_at: 2026-06-02T21:41:59.797Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:59.797Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec action mnemonics verified verbatim in source; transport confirmed; 4 extra RS-232 commands in source (SPKM/B2BM/USBM/PSHF) fall below the 5-command short threshold and ratio 38/42=0.905 meets the 0.9 floor. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
- "firmware version compatibility not stated in source; per-TV supported IR subset not enumerated in source (source defers to User Manual)"
- "source describes a power-on sequence (enable PWRE then send POWR0001) as commentary, not as a defined macro. See Notes."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements beyond the Custom Install menu enablement note."
- "firmware version compatibility not stated in source. UNRESOLVED: per-TV subset of supported IR codes not enumerated — source defers to User Manual. UNRESOLVED: voltage/current specs of DB9 Power Input pin 9 not stated (omitted as Tier-3 field). UNRESOLVED: full enumeration of Custom Install menu items beyond Custom Installation toggle and Power On Command setting not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
