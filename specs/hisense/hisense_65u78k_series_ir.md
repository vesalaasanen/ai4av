---
spec_id: admin/hisense-65u78k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 65U78K Series Control Spec"
manufacturer: HiSense
model_family: "65U78K Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "65U78K Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T22:23:27.599Z
last_checked_at: 2026-06-02T22:07:55.458Z
generated_at: 2026-06-02T22:07:55.458Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not list specific 65U78K firmware support; documents \"Hisense Prosumer TV\" generically."
  - "source describes query/response model only, no unsolicited event/notification stream documented."
  - "no explicit safety warnings or interlock procedures in source beyond factory-reset caution."
  - "firmware version compatibility not stated in source; specific 65U78K model name not in source (applies generically to \"Prosumer TV\")."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:55.458Z
  matched_actions: 125
  action_count: 125
  confidence: medium
  summary: "All 125 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 65U78K Series Control Spec

## Summary
HiSense Prosumer TV (used here for 65U78K Series) exposes two parallel control surfaces: discrete IR (NEC/RC5-style Pronto CCF codes) and wired RS-232 (DB9 female, 9600 8N1, ASCII framing with 8-bit checksum). Wired serial protocol is fixed-length 14-byte frames: `S/Q [CLIENT ID 3B] [COMMAND 4B] [DATA 4B] [CHECKSUM 1B] CR`. CLIENT ID `ALL` is broadcast; MAC-last-3 form is per-TV. Source revision: V3.6 (2017-04-17).

<!-- UNRESOLVED: source does not list specific 65U78K firmware support; documents "Hisense Prosumer TV" generically. -->

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
  connector: DB9 female chassis mount
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable      # inferred from POWR0000/POWR0001 power on/off commands
- routable       # inferred from INPT input select commands
- queryable      # inferred from Q??? query commands
- levelable      # inferred from VOLM/BRIT/CONT range commands
```

## Actions
```yaml
# IR discrete commands (Pronto CCF / NEC 04FB prefix). Each IR button = one action.
# RS-232 commands are grouped by mnemonic; data field is a 4-digit numeric parameter.

# ===== IR: Power =====
- id: ir_power_toggle
  label: IR Power Toggle
  kind: action
  command: "04FB 708F"
  params: []
- id: ir_power_on
  label: IR Power On
  kind: action
  command: "04FB 718E"
  params: []
- id: ir_power_off
  label: IR Power Off
  kind: action
  command: "04FB 728D"
  params: []

# ===== IR: Input =====
- id: ir_input_toggle
  label: IR Input Toggle
  kind: action
  command: "04FB 738C"
  params: []
- id: ir_input_tv_tuner1
  label: IR TV Tuner 1
  kind: action
  command: "04FB 748B"
  params: []
- id: ir_input_hdmi1
  label: IR HDMI 1
  kind: action
  command: "04FB 7C83"
  params: []
- id: ir_input_hdmi2
  label: IR HDMI 2
  kind: action
  command: "04FB 7D82"
  params: []
- id: ir_input_hdmi3
  label: IR HDMI 3
  kind: action
  command: "04FB 7E81"
  params: []
- id: ir_input_hdmi4
  label: IR HDMI 4
  kind: action
  command: "04FB 7F80"
  params: []
- id: ir_input_hdmi5
  label: IR HDMI 5
  kind: action
  command: "04FB 807F"
  params: []
- id: ir_input_vga
  label: IR VGA
  kind: action
  command: "04FB 817E"
  params: []
- id: ir_input_usb
  label: IR USB
  kind: action
  command: "04FB 827D"
  params: []

# ===== IR: Picture/Sound/Aspect =====
- id: ir_picture_mode_toggle
  label: IR Picture Mode Toggle
  kind: action
  command: "04FB 837C"
  params: []
- id: ir_sound_mode_toggle
  label: IR Sound Mode Toggle
  kind: action
  command: "04FB 847B"
  params: []
- id: ir_aspect_wide_169
  label: IR Aspect Wide 16:9
  kind: action
  command: "04FB 857A"
  params: []
- id: ir_aspect_normal_43
  label: IR Aspect Normal 4:3
  kind: action
  command: "04FB 8679"
  params: []
- id: ir_aspect_cinema
  label: IR Aspect Cinema
  kind: action
  command: "04FB 8778"
  params: []
- id: ir_aspect_panorama
  label: IR Aspect Panorama
  kind: action
  command: "04FB 8877"
  params: []
- id: ir_aspect_zoom
  label: IR Aspect Zoom
  kind: action
  command: "04FB 8976"
  params: []

# ===== IR: Channel/Navigation =====
- id: ir_channel_list
  label: IR Channel List
  kind: action
  command: "04FB 8A75"
  params: []
- id: ir_fav_channel
  label: IR Favorite Channel
  kind: action
  command: "04FB 8B74"
  params: []
- id: ir_sleep
  label: IR Sleep
  kind: action
  command: "04FB 8C73"
  params: []
- id: ir_tv_menu_toggle
  label: IR TV Menu Toggle
  kind: action
  command: "04FB 8D72"
  params: []
- id: ir_home
  label: IR Home
  kind: action
  command: "04FB 8E71"
  params: []
- id: ir_tools
  label: IR Tools (Second Menu)
  kind: action
  command: "04FB 8F70"
  params: []
- id: ir_digit_0
  label: IR Digit 0
  kind: action
  command: "04FB 906F"
  params: []
- id: ir_digit_1
  label: IR Digit 1
  kind: action
  command: "04FB 916E"
  params: []
- id: ir_digit_2
  label: IR Digit 2
  kind: action
  command: "04FB 926D"
  params: []
- id: ir_digit_3
  label: IR Digit 3
  kind: action
  command: "04FB 936C"
  params: []
- id: ir_digit_4
  label: IR Digit 4
  kind: action
  command: "04FB 946B"
  params: []
- id: ir_digit_5
  label: IR Digit 5
  kind: action
  command: "04FB 956A"
  params: []
- id: ir_digit_6
  label: IR Digit 6
  kind: action
  command: "04FB 9669"
  params: []
- id: ir_digit_7
  label: IR Digit 7
  kind: action
  command: "04FB 9768"
  params: []
- id: ir_digit_8
  label: IR Digit 8
  kind: action
  command: "04FB 9867"
  params: []
- id: ir_digit_9
  label: IR Digit 9
  kind: action
  command: "04FB 9966"
  params: []
- id: ir_dash
  label: IR Dash
  kind: action
  command: "04FB 9A65"
  params: []
- id: ir_previous_channel
  label: IR Previous Channel
  kind: action
  command: "04FB 9B64"
  params: []
- id: ir_arrow_up
  label: IR Up Arrow
  kind: action
  command: "04FB 9C63"
  params: []
- id: ir_arrow_down
  label: IR Down Arrow
  kind: action
  command: "04FB 9D62"
  params: []
- id: ir_arrow_left
  label: IR Left Arrow
  kind: action
  command: "04FB 9E61"
  params: []
- id: ir_arrow_right
  label: IR Right Arrow
  kind: action
  command: "04FB 9F60"
  params: []
- id: ir_enter
  label: IR Enter
  kind: action
  command: "04FB A05F"
  params: []
- id: ir_select_ok
  label: IR Select OK
  kind: action
  command: "04FB A15E"
  params: []
- id: ir_return
  label: IR Return
  kind: action
  command: "04FB A25D"
  params: []
- id: ir_exit
  label: IR Exit
  kind: action
  command: "04FB A35C"
  params: []
- id: ir_info_display_toggle
  label: IR Info/Display Toggle
  kind: action
  command: "04FB A45B"
  params: []
- id: ir_volume_down
  label: IR Volume Down
  kind: action
  command: "04FB A55A"
  params: []
- id: ir_volume_up
  label: IR Volume Up
  kind: action
  command: "04FB A659"
  params: []
- id: ir_channel_down
  label: IR Channel Down
  kind: action
  command: "04FB A758"
  params: []
- id: ir_channel_up
  label: IR Channel Up
  kind: action
  command: "04FB A857"
  params: []

# ===== IR: PIP / Guide / Freeze =====
- id: ir_pip_toggle
  label: IR PIP Toggle
  kind: action
  command: "04FB A956"
  params: []
- id: ir_pip_input
  label: IR PIP Input
  kind: action
  command: "04FB AA55"
  params: []
- id: ir_pip_swap
  label: IR PIP Swap
  kind: action
  command: "04FB AB54"
  params: []
- id: ir_pip_position
  label: IR PIP Position
  kind: action
  command: "04FB AC53"
  params: []
- id: ir_pip_size
  label: IR PIP Size
  kind: action
  command: "04FB AD52"
  params: []
- id: ir_guide_toggle
  label: IR Guide Toggle
  kind: action
  command: "04FB AE51"
  params: []
- id: ir_freeze_toggle
  label: IR Freeze Toggle
  kind: action
  command: "04FB AF50"
  params: []

# ===== RS-232: Power =====
- id: pwre_set
  label: Set RS-232 Power-On Enable
  kind: action
  command: "S{CID}PWRE{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID, 3 hex chars (e.g. "465" for MAC last-3, or "ALL" for broadcast)
    - name: data
      type: string
      description: "0000 = disable, 0001 = enable RS-232 power-on"
    - name: cs
      type: string
      description: 8-bit checksum byte (low byte of sum so full frame = 0x00)
- id: pwre_query
  label: Query RS-232 Power-On Enable
  kind: query
  command: "Q{CID}PWRE????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: powr_set
  label: Set Power On/Off
  kind: action
  command: "S{CID}POWR{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = standby, 0001 = power on"
    - name: cs
      type: string
      description: 8-bit checksum byte

# ===== RS-232: Input =====
- id: inpt_set
  label: Set Input Source
  kind: action
  command: "S{CID}INPT{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = next input, 0001 = TV, 0003 = Component, 0004 = AV, 0006 = VGA, 0009 = HDMI1, 0010 = HDMI2, 0011 = HDMI3, 0012 = HDMI4"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: inpt_query
  label: Query Current Input
  kind: query
  command: "Q{CID}INPT????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte

# ===== RS-232: Picture =====
- id: pmod_set
  label: Set Picture Mode
  kind: action
  command: "S{CID}PMOD{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = Standard, 0002 = Vivid, 0003 = EnergySaving, 0004 = Theater, 0005 = Game, 0006 = Sport"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: pmod_query
  label: Query Picture Mode
  kind: query
  command: "Q{CID}PMOD????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: brit_set
  label: Set Brightness
  kind: action
  command: "S{CID}BRIT{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0100 (hex 0-100 decimal) brightness value"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: brit_query
  label: Query Brightness
  kind: query
  command: "Q{CID}BRIT????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: cont_set
  label: Set Contrast
  kind: action
  command: "S{CID}CONT{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0100 contrast value"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: cont_query
  label: Query Contrast
  kind: query
  command: "Q{CID}CONT????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: colr_set
  label: Set Color Saturation
  kind: action
  command: "S{CID}COLR{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0100 color saturation value"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: colr_query
  label: Query Color Saturation
  kind: query
  command: "Q{CID}COLR????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: tint_set
  label: Set Tint
  kind: action
  command: "S{CID}TINT{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0100 tint value"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: tint_query
  label: Query Tint
  kind: query
  command: "Q{CID}TINT????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: shrp_set
  label: Set Sharpness
  kind: action
  command: "S{CID}SHRP{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0020 sharpness value"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: shrp_query
  label: Query Sharpness
  kind: query
  command: "Q{CID}SHRP????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: aspt_set
  label: Set Aspect Ratio
  kind: action
  command: "S{CID}ASPT{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = Auto, 0002 = Normal, 0003 = Zoom, 0004 = Wide, 0005 = Direct, 0006 = 1-to-1 pixel map, 0007 = Panoramic, 0008 = Cinema"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: aspt_query
  label: Query Aspect Ratio
  kind: query
  command: "Q{CID}ASPT????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: ovsn_set
  label: Set Overscan
  kind: action
  command: "S{CID}OVSN{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = On, 0002 = Off"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: ovsn_query
  label: Query Overscan
  kind: query
  command: "Q{CID}OVSN????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: rstp_set
  label: Reset Picture Settings
  kind: action
  command: "S{CID}RSTP1000{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: ctem_set
  label: Set Color Temperature
  kind: action
  command: "S{CID}CTEM{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = High, 0002 = Middle, 0003 = Mid-Low, 0004 = Low"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: ctem_query
  label: Query Color Temperature
  kind: query
  command: "Q{CID}CTEM????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: bklv_set
  label: Set Backlight
  kind: action
  command: "S{CID}BKLV{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0100 backlight value"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: bklv_query
  label: Query Backlight
  kind: query
  command: "Q{CID}BKLV????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte

# ===== RS-232: Sound =====
- id: amod_set
  label: Set Sound Mode
  kind: action
  command: "S{CID}AMOD{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = Standard, 0002 = Theater, 0003 = Music, 0004 = Speech, 0005 = Late night"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: amod_query
  label: Query Sound Mode
  kind: query
  command: "Q{CID}AMOD????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: rsta_set
  label: Reset Audio Settings
  kind: action
  command: "S{CID}RSTA2000{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: volm_set
  label: Set Volume
  kind: action
  command: "S{CID}VOLM{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0100 volume value"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: volm_query
  label: Query Volume
  kind: query
  command: "Q{CID}VOLM????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: mute_set
  label: Set Mute
  kind: action
  command: "S{CID}MUTE{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = off, 0001 = on"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: mute_query
  label: Query Mute
  kind: query
  command: "Q{CID}MUTE????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: aspk_set
  label: Set TV Speaker
  kind: action
  command: "S{CID}ASPK{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = off, 0002 = on"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: aspk_query
  label: Query TV Speaker
  kind: query
  command: "Q{CID}ASPK????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte

# ===== RS-232: Tuner/Channel =====
- id: tunr_set
  label: Set Tuner Mode
  kind: action
  command: "S{CID}TUNR{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = Antenna, 0002 = Cable"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: tunr_query
  label: Query Tuner Mode
  kind: query
  command: "Q{CID}TUNR????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: tscn_set
  label: Automatic Channel Search
  kind: action
  command: "S{CID}TSCN0001{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: chan_set
  label: Channel Up/Down
  kind: action
  command: "S{CID}CHAN{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = channel down, 0001 = channel up"
    - name: cs
      type: string
      description: 8-bit checksum byte

# ===== RS-232: Closed Caption / Language =====
- id: cc_set
  label: Set Closed Caption
  kind: action
  command: "S{CID}CC##{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = off, 0002 = on, 0003 = on when mute"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: cc_query
  label: Query Closed Caption
  kind: query
  command: "Q{CID}CC##????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: lang_set
  label: Set OSD Language
  kind: action
  command: "S{CID}LANG{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = English, 0002 = Espanol, 0003 = Francais"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: lang_query
  label: Query OSD Language
  kind: query
  command: "Q{CID}LANG????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte

# ===== RS-232: System =====
- id: rset_set
  label: Restore Factory Settings
  kind: action
  command: "S{CID}RSET9999{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: pled_set
  label: Set Standby LED
  kind: action
  command: "S{CID}PLED{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = off, 0002 = on"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: pled_query
  label: Query Standby LED
  kind: query
  command: "Q{CID}PLED????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: pbtn_set
  label: Set Power Off Control Mode
  kind: action
  command: "S{CID}PBTN{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = AC only, 0001 = ALL"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: pbtn_query
  label: Query Power Off Control Mode
  kind: query
  command: "Q{CID}PBTN????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: mavl_set
  label: Set Volume Range
  kind: action
  command: "S{CID}MAVL{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0100 max volume"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: mavl_query
  label: Query Volume Range
  kind: query
  command: "Q{CID}MAVL????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: svol_set
  label: Set Volume Control Mode
  kind: action
  command: "S{CID}SVOL{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = locked, 0001 = last volume, 0002 = AC reset, 0003 = standby reset"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: svol_query
  label: Query Volume Control Mode
  kind: query
  command: "Q{CID}SVOL????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: "S{CID}VLFL{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000-0100 locked volume level"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: vlfl_query
  label: Query Volume Locked Level
  kind: query
  command: "Q{CID}VLFL????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: rmot_set
  label: Set Remote Key Lock
  kind: action
  command: "S{CID}RMOT{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = enable, 0001 = disable, 0002 = partial"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: rmot_query
  label: Query Remote Key Lock
  kind: query
  command: "Q{CID}RMOT????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: panl_set
  label: Set Panel Key Lock
  kind: action
  command: "S{CID}PANL{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = enable, 0001 = disable"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: panl_query
  label: Query Panel Key Lock
  kind: query
  command: "Q{CID}PANL????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: menu_set
  label: Set Menu Access
  kind: action
  command: "S{CID}MENU{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = enable, 0001 = disable"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: menu_query
  label: Query Menu Access
  kind: query
  command: "Q{CID}MENU????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: avmn_set
  label: Set AV Setting Menu
  kind: action
  command: "S{CID}AVMN{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = disable, 0001 = enable"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: avmn_query
  label: Query AV Setting Menu
  kind: query
  command: "Q{CID}AVMN????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: osd_set
  label: Set OSD Mode
  kind: action
  command: "S{CID}OSD#{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = enable, 0001 = disable"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: osd_query
  label: Query OSD Mode
  kind: query
  command: "Q{CID}OSD#????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: inpm_set
  label: Set Input Mode
  kind: action
  command: "S{CID}INPM{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = locked, 0001 = selectable, 0002 = AC reset, 0003 = standby reset"
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: inpm_query
  label: Query Input Mode
  kind: query
  command: "Q{CID}INPM????{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: cs
      type: string
      description: 8-bit checksum byte
- id: pois_set
  label: Set Power-On Input Source
  kind: action
  command: "S{CID}POIS{data}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: data
      type: string
      description: "0000 = last, 0001 = Air, 0002 = AV, 0003 = Component"
    - name: cs
      type: string
      description: 8-bit checksum byte

# ===== RS-232: Remote Button Simulator =====
- id: bttn_set
  label: Remote Button Simulator
  kind: action
  command: "S{CID}BTTN{code}{cs}\r"
  params:
    - name: CID
      type: string
      description: Client ID
    - name: code
      type: string
      description: "4-digit button code: 1000=0, 1001=1, 1002=2, 1003=3, 1004=4, 1005=5, 1006=6, 1007=7, 1008=8, 1009=9, 1010=dash, 1012=power, 1015=FRW, 1016=play, 1017=FFW, 1018=pause, 1019=previous, 1020=stop, 1021=next, 1023=HiMedia, 1024=sleep, 1027=CC, 1031=mute, 1032=vol-, 1033=vol+, 1034=ch+, 1035=ch-, 1036=input, 1038=menu, 1039=HiSmart, 1040=OK/enter, 1041=up, 1042=down, 1043=left, 1044=right, 1045=back, 1046=exit, 1050=red, 1051=green, 1052=blue, 1053=yellow, 1054=MTS/SAP, 1055=LiveTV"
    - name: cs
      type: string
      description: 8-bit checksum byte
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
- id: input_state
  type: enum
  values: [tv, av, component, vga, hdmi1, hdmi2, hdmi3, hdmi4]
- id: picture_mode
  type: enum
  values: [standard, vivid, energysaving, theater, game, sport]
- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]
- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, pixel_map, panoramic, cinema]
- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]
- id: overscan
  type: enum
  values: [on, off]
- id: mute_state
  type: enum
  values: [on, off]
- id: tv_speaker
  type: enum
  values: [on, off]
- id: tuner_mode
  type: enum
  values: [antenna, cable]
- id: closed_caption
  type: enum
  values: [off, on, on_when_mute]
- id: osd_language
  type: enum
  values: [english, espanol, francais]
- id: standby_led
  type: enum
  values: [on, off]
- id: ack_status
  type: enum
  values: [OKAY, WAIT, EROR]
```

## Variables
```yaml
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
- id: backlight
  type: integer
  range: [0, 100]
- id: volume
  type: integer
  range: [0, 100]
- id: max_volume
  type: integer
  range: [0, 100]
- id: locked_volume
  type: integer
  range: [0, 100]
```

## Events
```yaml
# UNRESOLVED: source describes query/response model only, no unsolicited event/notification stream documented.
```

## Macros
```yaml
# Source describes Custom Install menu entries (PWRE enable required for standby power-on)
# and the TV setup procedure but not as named multi-step macros.
- id: enable_rs232_standby_power
  label: Enable RS-232 Power-On from Standby
  steps:
    - id: pwre_set
      args: { data: "0001" }
  notes: Custom Install menu must also have "Custom Installation = Enable" (TV menu, code 7 3 1 0).
```

## Safety
```yaml
confirmation_required_for:
  - rset_set  # Restore Factory Settings
  - tscn_set  # Automatic Channel Search (re-scans, clears tuned channels)
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source beyond factory-reset caution.
```

## Notes
- Protocol is case-sensitive (per source note 1).
- Two CLIENT ID forms: MAC-last-3 hex (per-TV addressing) or `ALL` (broadcast).
- Checksum = low byte of 8-bit sum so total frame (including checksum byte) = 0x00.
- Each command uses ASCII framing; byte count per field: 1 (S/Q) + 3 (CID) + 4 (CMD) + 4 (DATA) + 1 (CS) + 1 (CR) = 14 bytes.
- IR carrier: NEC-style 38 kHz (Pronto CCF code `0000 006C` = frequency word 0x006C = 108 = 38000 Hz / 1000 / 0.241246).
- DB9 pinout: TV female DCE-style with TXD on pin 3, RXD on pin 2.
- Source is dated 2017 (V3.6) and targets "Hisense Prosumer TV" generically; specific 65U78K firmware support not stated.

<!-- UNRESOLVED: firmware version compatibility not stated in source; specific 65U78K model name not in source (applies generically to "Prosumer TV"). -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-01T22:23:27.599Z
last_checked_at: 2026-06-02T22:07:55.458Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:55.458Z
matched_actions: 125
action_count: 125
confidence: medium
summary: "All 125 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not list specific 65U78K firmware support; documents \"Hisense Prosumer TV\" generically."
- "source describes query/response model only, no unsolicited event/notification stream documented."
- "no explicit safety warnings or interlock procedures in source beyond factory-reset caution."
- "firmware version compatibility not stated in source; specific 65U78K model name not in source (applies generically to \"Prosumer TV\")."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
