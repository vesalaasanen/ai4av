---
spec_id: admin/benq-mx520
schema_version: ai4av-public-spec-v1
revision: 1
title: "Benq MX520 Control Spec"
manufacturer: Benq
model_family: MX520
aliases: []
compatible_with:
  manufacturers:
    - Benq
  models:
    - MX520
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - benqimage.blob.core.windows.net
  - esupportdownload.benq.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PU9530/RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
retrieved_at: 2026-05-04T08:14:40.555Z
last_checked_at: 2026-05-04T16:13:58.153Z
generated_at: 2026-05-04T16:13:58.153Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T16:13:58.153Z
  matched_actions: 173
  action_count: 173
  confidence: high
  summary: "All 173 spec actions matched to explicit wire tokens in source command table; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Benq MX520 Control Spec

## Summary
BenQ MX520 DLP projector with RS-232 ASCII control protocol. Commands follow `*cmd=val#<CR>` format. Default baud 115200, configurable 2400–115200 via OSD or command. No authentication required. Full command set includes power, source routing, audio, picture settings, lamp control, 3D, network standby, and OSD navigation.

<!-- UNRESOLVED: LAN over RS232 function mentioned but not documented in detail -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; changeable via OSD or *baud=cmd
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # power on/off commands present
- queryable      # power status, lamp hours, source, mute, volume, brightness, contrast, color, sharpness, aspect, lamp mode, 3D, etc.
- routable       # source selection (RGB, RGB2, YPbPr, YPbPr2, DVI-A, DVI-D, HDMI, HDMI2, Video, S-Video, Network, USB)
- levelable      # volume, mic volume, brightness, contrast, color, sharpness, zoom
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: get_power_status
  label: Get Power Status
  kind: query
  params: []

# Source Selection
- id: source_rgb
  label: Select Computer 1 / YPbPr
  kind: action
  params: []
- id: source_rgb2
  label: Select Computer 2 / YPbPr2
  kind: action
  params: []
- id: source_ypbr
  label: Select Component
  kind: action
  params: []
- id: source_ypbr2
  label: Select Component2
  kind: action
  params: []
- id: source_dviA
  label: Select DVI-A
  kind: action
  params: []
- id: source_dvid
  label: Select DVI-D
  kind: action
  params: []
- id: source_hdmi
  label: Select HDMI
  kind: action
  params: []
- id: source_hdmi2
  label: Select HDMI 2
  kind: action
  params: []
- id: source_vid
  label: Select Composite Video
  kind: action
  params: []
- id: source_svid
  label: Select S-Video
  kind: action
  params: []
- id: source_network
  label: Select Network
  kind: action
  params: []
- id: source_usbdisplay
  label: Select USB Display
  kind: action
  params: []
- id: source_usbreader
  label: Select USB Reader
  kind: action
  params: []
- id: get_source
  label: Get Current Source
  kind: query
  params: []

# Audio
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: get_mute_status
  label: Get Mute Status
  kind: query
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: get_volume
  label: Get Volume Status
  kind: query
  params: []
- id: micvol_up
  label: Mic Volume Up
  kind: action
  params: []
- id: micvol_down
  label: Mic Volume Down
  kind: action
  params: []
- id: get_micvol
  label: Get Mic Volume Status
  kind: query
  params: []
- id: audiosour_off
  label: Audio Pass Through Off
  kind: action
  params: []
- id: audiosour_rgb
  label: Audio-Computer1
  kind: action
  params: []
- id: audiosour_rgb2
  label: Audio-Computer2
  kind: action
  params: []
- id: audiosour_vid
  label: Audio-Video/S-Video
  kind: action
  params: []
- id: audiosour_ypbr
  label: Audio-Component
  kind: action
  params: []
- id: audiosour_hdmi
  label: Audio-HDMI
  kind: action
  params: []
- id: audiosour_hdmi2
  label: Audio-HDMI2
  kind: action
  params: []
- id: get_audiosour
  label: Get Audio Pass Through Status
  kind: query
  params: []

# Picture Mode
- id: appmod_dynamic
  label: Picture Mode Dynamic
  kind: action
  params: []
- id: appmod_preset
  label: Picture Mode Presentation
  kind: action
  params: []
- id: appmod_srgb
  label: Picture Mode sRGB
  kind: action
  params: []
- id: appmod_bright
  label: Picture Mode Bright
  kind: action
  params: []
- id: appmod_livingroom
  label: Picture Mode LivingRoom
  kind: action
  params: []
- id: appmod_game
  label: Picture Mode Game
  kind: action
  params: []
- id: appmod_cine
  label: Picture Mode Cinema
  kind: action
  params: []
- id: appmod_std
  label: Picture Mode Standard
  kind: action
  params: []
- id: appmod_user1
  label: Picture Mode User1
  kind: action
  params: []
- id: appmod_user2
  label: Picture Mode User2
  kind: action
  params: []
- id: appmod_user3
  label: Picture Mode User3
  kind: action
  params: []
- id: appmod_isfday
  label: Picture Mode ISF Day
  kind: action
  params: []
- id: appmod_isfnight
  label: Picture Mode ISF Night
  kind: action
  params: []
- id: appmod_3d
  label: Picture Mode 3D
  kind: action
  params: []
- id: get_appmod
  label: Get Picture Mode
  kind: query
  params: []

# Picture Settings
- id: contrast_up
  label: Contrast Up
  kind: action
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  params: []
- id: get_contrast
  label: Get Contrast Value
  kind: query
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  params: []
- id: get_brightness
  label: Get Brightness Value
  kind: query
  params: []
- id: color_up
  label: Color Up
  kind: action
  params: []
- id: color_down
  label: Color Down
  kind: action
  params: []
- id: get_color
  label: Get Color Value
  kind: query
  params: []
- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []
- id: get_sharpness
  label: Get Sharpness Value
  kind: query
  params: []

# Color Temperature
- id: ct_warmer
  label: Color Temperature Warmer
  kind: action
  params: []
- id: ct_warm
  label: Color Temperature Warm
  kind: action
  params: []
- id: ct_normal
  label: Color Temperature Normal
  kind: action
  params: []
- id: ct_cool
  label: Color Temperature Cool
  kind: action
  params: []
- id: ct_cooler
  label: Color Temperature Cooler
  kind: action
  params: []
- id: ct_native
  label: Color Temperature Lamp Native
  kind: action
  params: []
- id: get_ct
  label: Get Color Temperature Status
  kind: query
  params: []

# Aspect Ratio
- id: asp_4_3
  label: Aspect Ratio 4:3
  kind: action
  params: []
- id: asp_16_9
  label: Aspect Ratio 16:9
  kind: action
  params: []
- id: asp_16_10
  label: Aspect Ratio 16:10
  kind: action
  params: []
- id: asp_auto
  label: Aspect Ratio Auto
  kind: action
  params: []
- id: asp_real
  label: Aspect Ratio Real
  kind: action
  params: []
- id: asp_lbox
  label: Aspect Ratio Letterbox
  kind: action
  params: []
- id: asp_wide
  label: Aspect Ratio Wide
  kind: action
  params: []
- id: asp_anam
  label: Aspect Ratio Anamorphic
  kind: action
  params: []
- id: get_asp
  label: Get Aspect Ratio Status
  kind: query
  params: []

# Zoom and Auto
- id: zoom_in
  label: Digital Zoom In
  kind: action
  params: []
- id: zoom_out
  label: Digital Zoom Out
  kind: action
  params: []
- id: auto
  label: Auto (Auto Sync)
  kind: action
  params: []

# Brilliant Color
- id: bc_on
  label: Brilliant Color On
  kind: action
  params: []
- id: bc_off
  label: Brilliant Color Off
  kind: action
  params: []
- id: get_bc
  label: Get Brilliant Color Status
  kind: query
  params: []

# Projector Position
- id: pp_ft
  label: Position Front Table
  kind: action
  params: []
- id: pp_re
  label: Position Rear Table
  kind: action
  params: []
- id: pp_rc
  label: Position Rear Ceiling
  kind: action
  params: []
- id: pp_fc
  label: Position Front Ceiling
  kind: action
  params: []
- id: get_pp
  label: Get Projector Position Status
  kind: query
  params: []

# Operation Settings
- id: qas_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: qas_off
  label: Quick Auto Search Off
  kind: action
  params: []
- id: get_qas
  label: Get Quick Auto Search Status
  kind: query
  params: []
- id: directpower_on
  label: Direct Power On On
  kind: action
  params: []
- id: directpower_off
  label: Direct Power On Off
  kind: action
  params: []
- id: get_directpower
  label: Get Direct Power On Status
  kind: query
  params: []
- id: autopower_on
  label: Signal Power On On
  kind: action
  params: []
- id: autopower_off
  label: Signal Power On Off
  kind: action
  params: []
- id: get_autopower
  label: Get Signal Power On Status
  kind: query
  params: []
- id: standbynet_on
  label: Standby Network On
  kind: action
  params: []
- id: standbynet_off
  label: Standby Network Off
  kind: action
  params: []
- id: get_standbynet
  label: Get Standby Network Status
  kind: query
  params: []
- id: standbymic_on
  label: Standby Microphone On
  kind: action
  params: []
- id: standbymic_off
  label: Standby Microphone Off
  kind: action
  params: []
- id: get_standbymic
  label: Get Standby Microphone Status
  kind: query
  params: []
- id: standbymnt_on
  label: Standby Monitor Out On
  kind: action
  params: []
- id: standbymnt_off
  label: Standby Monitor Out Off
  kind: action
  params: []
- id: get_standbymnt
  label: Get Standby Monitor Out Status
  kind: query
  params: []

# Baud Rate Configuration
- id: baud_2400
  label: Set Baud Rate 2400
  kind: action
  params: []
- id: baud_4800
  label: Set Baud Rate 4800
  kind: action
  params: []
- id: baud_9600
  label: Set Baud Rate 9600
  kind: action
  params: []
- id: baud_14400
  label: Set Baud Rate 14400
  kind: action
  params: []
- id: baud_19200
  label: Set Baud Rate 19200
  kind: action
  params: []
- id: baud_38400
  label: Set Baud Rate 38400
  kind: action
  params: []
- id: baud_57600
  label: Set Baud Rate 57600
  kind: action
  params: []
- id: baud_115200
  label: Set Baud Rate 115200
  kind: action
  params: []
- id: get_baud
  label: Get Current Baud Rate
  kind: query
  params: []

# Lamp Control
- id: get_ltim
  label: Get Lamp Hour
  kind: query
  params: []
- id: get_ltim2
  label: Get Lamp2 Hour
  kind: query
  params: []
- id: lampm_lnor
  label: Lamp Mode Normal
  kind: action
  params: []
- id: lampm_eco
  label: Lamp Mode Eco
  kind: action
  params: []
- id: lampm_seco
  label: Lamp Mode Smart Eco
  kind: action
  params: []
- id: lampm_dualbr
  label: Lamp Mode Dual Brightest
  kind: action
  params: []
- id: lampm_dualre
  label: Lamp Mode Dual Reliable
  kind: action
  params: []
- id: lampm_single
  label: Lamp Mode Single Alternative
  kind: action
  params: []
- id: lampm_singleeco
  label: Lamp Mode Single Alternative Eco
  kind: action
  params: []
- id: get_lampm
  label: Get Lamp Mode Status
  kind: query
  params: []

# Info
- id: get_modelname
  label: Get Model Name
  kind: query
  params: []

# Blank and Freeze
- id: blank_on
  label: Blank On
  kind: action
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  params: []
- id: get_blank
  label: Get Blank Status
  kind: query
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
- id: get_freeze
  label: Get Freeze Status
  kind: query
  params: []

# OSD Navigation
- id: menu_on
  label: Menu On
  kind: action
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  params: []
- id: nav_up
  label: Up
  kind: action
  params: []
- id: nav_down
  label: Down
  kind: action
  params: []
- id: nav_right
  label: Right
  kind: action
  params: []
- id: nav_left
  label: Left
  kind: action
  params: []
- id: nav_enter
  label: Enter
  kind: action
  params: []

# 3D
- id: d3_off
  label: 3D Sync Off
  kind: action
  params: []
- id: d3_auto
  label: 3D Auto
  kind: action
  params: []
- id: d3_tb
  label: 3D Sync Top/Bottom
  kind: action
  params: []
- id: d3_fs
  label: 3D Sync Frame Sequential
  kind: action
  params: []
- id: d3_fp
  label: 3D Frame Packing
  kind: action
  params: []
- id: d3_sbs
  label: 3D Side by Side
  kind: action
  params: []
- id: d3_da
  label: 3D Inverter Disable
  kind: action
  params: []
- id: d3_iv
  label: 3D Inverter Enable
  kind: action
  params: []
- id: d3_2d3d
  label: 2D to 3D
  kind: action
  params: []
- id: d3_nvidia
  label: 3D NVIDIA
  kind: action
  params: []
- id: get_d3
  label: Get 3D Sync Status
  kind: query
  params: []

# Remote Receiver
- id: rr_fr
  label: Remote Receiver Front+Rear
  kind: action
  params: []
- id: rr_f
  label: Remote Receiver Front
  kind: action
  params: []
- id: rr_r
  label: Remote Receiver Rear
  kind: action
  params: []
- id: get_rr
  label: Get Remote Receiver Status
  kind: query
  params: []

# Instant On
- id: ins_on
  label: Instant On On
  kind: action
  params: []
- id: ins_off
  label: Instant On Off
  kind: action
  params: []
- id: get_ins
  label: Get Instant On Status
  kind: query
  params: []

# Lamp Saver
- id: lpsaver_on
  label: Lamp Saver On
  kind: action
  params: []
- id: lpsaver_off
  label: Lamp Saver Off
  kind: action
  params: []
- id: get_lpsaver
  label: Get Lamp Saver Status
  kind: query
  params: []

# Projection Log In Code
- id: prjlogincode_on
  label: Projection Log In Code On
  kind: action
  params: []
- id: prjlogincode_off
  label: Projection Log In Code Off
  kind: action
  params: []
- id: get_prjlogincode
  label: Get Projection Log In Code Status
  kind: query
  params: []

# Broadcasting
- id: broadcasting_on
  label: Broadcasting On
  kind: action
  params: []
- id: broadcasting_off
  label: Broadcasting Off
  kind: action
  params: []
- id: get_broadcasting
  label: Get Broadcasting Status
  kind: query
  params: []

# AMX Device Discovery
- id: amxdd_on
  label: AMX Device Discovery On
  kind: action
  params: []
- id: amxdd_off
  label: AMX Device Discovery Off
  kind: action
  params: []
- id: get_amxdd
  label: Get AMX Device Discovery Status
  kind: query
  params: []

# Network
- id: get_macaddr
  label: Get MAC Address
  kind: query
  params: []

# High Altitude
- id: highaltitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: highaltitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
- id: get_highaltitude
  label: Get High Altitude Mode Status
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [on, off, standby, cooling]
  note: Read via *pow=?#
- id: source_status
  type: enum
  values: [RGB, RGB2, ypbr, ypbr2, dviA, dvid, hdmi, hdmi2, vid, svid, network, usbdisplay, usbreader]
  note: Read via *sour=?#
- id: mute_status
  type: enum
  values: [on, off]
- id: volume_status
  type: integer
  note: Read via *vol=?#
- id: micvol_status
  type: integer
  note: Read via *micvol=?#
- id: audiosour_status
  type: enum
  values: [off, RGB, RGB2, vid, ypbr, hdmi, hdmi2]
- id: appmod_status
  type: enum
  values: [dynamic, preset, srgb, bright, livingroom, game, cine, std, user1, user2, user3, isfday, isfnight, threed]
- id: contrast_status
  type: integer
  note: Read via *con=?#
- id: brightness_status
  type: integer
  note: Read via *bri=?#
- id: color_status
  type: integer
  note: Read via *color=?#
- id: sharpness_status
  type: integer
  note: Read via *sharp=?#
- id: ct_status
  type: enum
  values: [warmer, warm, normal, cool, cooler, native]
- id: asp_status
  type: enum
  values: ["4:3", "16:9", "16:10", AUTO, REAL, LBOX, WIDE, ANAM]
- id: bc_status
  type: enum
  values: [on, off]
- id: pp_status
  type: enum
  values: [FT, RE, RC, FC]
- id: qas_status
  type: enum
  values: [on, off]
- id: directpower_status
  type: enum
  values: [on, off]
- id: autopower_status
  type: enum
  values: [on, off]
- id: standbynet_status
  type: enum
  values: [on, off]
- id: standbymic_status
  type: enum
  values: [on, off]
- id: standbymnt_status
  type: enum
  values: [on, off]
- id: baud_status
  type: integer
  note: Read via *baud=?#; possible values 2400/4800/9600/14400/19200/38400/57600/115200
- id: ltim_status
  type: integer
  note: Lamp hours; read via *ltim=?#
- id: ltim2_status
  type: integer
  note: Lamp2 hours; read via *ltim2=?#
- id: lampm_status
  type: enum
  values: [lnor, eco, seco, dualbr, dualre, single, singleeco]
- id: modelname_status
  type: string
  note: Read via *modelname=?#
- id: blank_status
  type: enum
  values: [on, off]
- id: freeze_status
  type: enum
  values: [on, off]
- id: d3_status
  type: enum
  values: [off, auto, tb, fs, fp, sbs, da, iv, "2d3d", nvidia]
- id: rr_status
  type: enum
  values: [fr, f, r]
- id: ins_status
  type: enum
  values: [on, off]
- id: lpsaver_status
  type: enum
  values: [on, off]
- id: prjlogincode_status
  type: enum
  values: [on, off]
- id: broadcasting_status
  type: enum
  values: [on, off]
- id: amxdd_status
  type: enum
  values: [on, off]
- id: macaddr_status
  type: string
  note: MAC address; read via *macaddr=?#
- id: highaltitude_status
  type: enum
  values: [on, off]
- id: error_illegal_format
  type: string
  note: Device echoes "Illegal format" when command structure is invalid
- id: error_unsupported_item
  type: string
  note: Device echoes "Unsupported item" when command valid but not supported by this model
- id: error_block_item
  type: string
  note: Device echoes "Block item" when command valid but cannot execute under current condition
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands; all settable values are action-based
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - note: Commands "*pow=on#" and all status queries remain active in low power standby mode (<0.5W)
  - note: Lamp hours query (*ltim=?#) and power on command (*pow=on#) active during low power mode (<0.5W)
  - note: "Unsupported item" and "Block item" responses not supported in power saving mode (standby power <1W)
```

## Notes
Command format: `*cmd=val#<CR>` — all commands preceded by carriage return and suffixed with `#`. Case-insensitive (upper/lower case both accepted). Each input character is echoed; query commands echo the uppercase response.

Echo behavior:
- Valid write command echoes: `> *cmd=val#*CMD=VAL#` + `<CR><LF>`
- Enter (ASCII 13) alone echoes: `3E 00` — projector ready for command
- No command for 5 seconds echoes: `0D 0A 00` — timeout
- Illegal format: `"Illegal format"`
- Unsupported item: `"Unsupported item"`
- Blocked item: `"Block item"`

Baud rate configurable via `*baud=val#` command or OSD menu. Default 115200.

Power states: on, off, standby, cooling. Power-on command active in low power mode (<0.5W).

Source note: function availability varies by model (source, audio settings, aspect ratio etc.).

<!-- UNRESOLVED: LAN over RS232 function mentioned but not fully documented -->
<!-- UNRESOLVED: USB reader / USB display protocol details not specified -->
<!-- UNRESOLVED: dual-lamp commands (dualbr, dualre, single, singleeco) — device may be single-lamp variant -->

## Provenance

```yaml
source_domains:
  - benqimage.blob.core.windows.net
  - esupportdownload.benq.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PU9530/RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
retrieved_at: 2026-05-04T08:14:40.555Z
last_checked_at: 2026-05-04T16:13:58.153Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T16:13:58.153Z
matched_actions: 173
action_count: 173
confidence: high
summary: "All 173 spec actions matched to explicit wire tokens in source command table; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
