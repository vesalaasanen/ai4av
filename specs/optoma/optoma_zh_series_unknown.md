---
spec_id: admin/optoma-zh-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma ZH Series Control Spec"
manufacturer: Optoma
model_family: "Optoma ZH Series"
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - "Optoma ZH Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/ZH510T-RS232--.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/9e664e09-5b3f-4cba-a5c4-04c421e5916a.xlsx
  - https://region-resource.optoma.com/products/documents/iG7pWu60NqqiHxdGDQdHlG1kalgTCcKxIlWs9ORU.xlsx
retrieved_at: 2026-06-15T21:47:04.293Z
last_checked_at: 2026-06-16T07:10:02.052Z
generated_at: 2026-06-16T07:10:02.052Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN/Telnet control is referenced in related Optoma documentation (port 8088 per Optoma KB) but is NOT described in this source file; only RS-232 serial transport is documented here."
  - "exact ZH model coverage (ZH506, ZH510T, ZH350ST, ZH420, ZH460ST, ZH507, ZH520, ZH506T) not enumerated in the source protocol list."
  - "firmware version compatibility not stated in source."
  - "none identified beyond the Actions list."
  - "no multi-step sequences explicitly documented in source."
  - "no interlock sequencing or lockout procedures beyond the two"
  - "TCP/LAN transport parameters (port, framing differences) not documented in this source."
  - "exact model list covered by this protocol list (ZH506, ZH510T, ZH350ST, ZH420, ZH460ST, ZH507, ZH520, ZH506T) not stated in the source; source is a generic Optoma RS232 function list."
  - "firmware version compatibility ranges not stated."
  - "HDBaseT Control sub-menu values (\"Auto\"/\"HDBaseT\"), PIP-PBP Module (Version/HDMI EQ 0-7/USB Upgrade), Network Subnet Mask/Gateway/DNS/Store, Location/Contact, and 1080p@24 (96Hz/144Hz) fields appear in source menus without command payloads — payloads not documented."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:10:02.052Z
  matched_actions: 109
  action_count: 109
  confidence: medium
  summary: "All 109 spec actions match source commands exactly; transport parameters (9600 baud, 8N1) verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Optoma ZH Series Control Spec

## Summary
Optoma ZH Series projector controlled via RS-232 serial using an ASCII command protocol. Each command is framed as `~{ID}{CMD} {param}<CR>` where `ID` is a two-digit projector address (00 = all projectors, 00-99) and `CMD` is a three-digit mnemonic. The device acknowledges writes with `P` (pass) or `F` (fail) and answers reads with `OK{value}` (pass) or `F` (fail). The source also documents unsolicited `INFO{code}` status notifications.

<!-- UNRESOLVED: LAN/Telnet control is referenced in related Optoma documentation (port 8088 per Optoma KB) but is NOT described in this source file; only RS-232 serial transport is documented here. -->
<!-- UNRESOLVED: exact ZH model coverage (ZH506, ZH510T, ZH350ST, ZH420, ZH460ST, ZH507, ZH520, ZH506T) not enumerated in the source protocol list. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
# Source: "RS232 Protocol Function List" - Baud Rate: 9600, Data Bits: 8,
# Parity: None, Stop Bits: 1, Flow Control: None, UART16550 FIFO: Disable.
# Command frame: ~{ID}{CMD} {variable}<CR>  (0D hex = <CR>).
# ID = projector address 00-99 (00 = all projectors).
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
- powerable    # inferred from power on/off commands (cmd 00)
- queryable    # inferred from read/query commands (cmd 121, 122, 124, 125, etc.)
- levelable    # inferred from continuous-range set commands (brightness, contrast, volume, keystone)
- routable     # inferred from input source selection commands (cmd 12, 305)
```

## Actions
```yaml
# Command template: ~{id}{cmd} {value}<CR>
#   {id}   = two-digit projector address (00 = all, 00-99)
#   {cmd}  = three-digit mnemonic (verbatim from source)
#   {value}= parameter value or enum code from source
# <CR> = 0x0D appended to every command.
# Write response: P = pass, F = fail.
# Read  response: OK{value} = pass, F = fail.
# Enum values reproduce the source's "Set Para." column verbatim.
# "0 & 2" in source = Off (both 0 and 2 accepted); "1" = On.

# --- Power / system ---
- id: power
  label: Power On/Off
  kind: action
  command: "~{id}00 {value}"
  params:
    - name: value
      type: enum
      description: "0 = power off (also accepts 2), 1 = power on"
      values: ["0", "1"]

- id: resync
  label: Re-Sync
  kind: action
  command: "~{id}01 1"
  params: []

- id: av_mute
  label: AV Mute
  kind: action
  command: "~{id}02 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: mute
  label: Mute
  kind: action
  command: "~{id}03 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: freeze
  label: Freeze
  kind: action
  command: "~{id}04 {value}"
  params:
    - name: value
      type: enum
      description: "0 = unfreeze (also accepts 2), 1 = freeze"
      values: ["0", "1"]

- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "~{id}05 1"
  params: []

- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "~{id}06 1"
  params: []

- id: input_source
  label: Input Source
  kind: action
  command: "~{id}12 {value}"
  params:
    - name: value
      type: enum
      description: "Source code: 1=HDMI1, 15=HDMI2, 16=Dongle(HDMI3), 5=VGA, 21=HDBaseT"
      values: ["1", "15", "16", "5", "21"]

# --- Display / Picture ---
- id: display_mode
  label: Display Mode
  kind: action
  command: "~{id}20 {value}"
  params:
    - name: value
      type: enum
      description: "1=Presentation, 2=Bright, 3=Movie, 4=sRGB, 5=User, 13=DICOM SIM, 19=Blending"
      values: ["1", "2", "3", "4", "5", "13", "19"]

- id: brightness
  label: Brightness
  kind: action
  command: "~{id}21 {value}"
  params:
    - name: value
      type: integer
      description: "0-100 (0-8 when Blending mode)"

- id: contrast
  label: Contrast
  kind: action
  command: "~{id}22 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: sharpness
  label: Sharpness
  kind: action
  command: "~{id}23 {value}"
  params:
    - name: value
      type: integer
      description: "0-10 (VGA/Video only)"

- id: gamma
  label: Gamma
  kind: action
  command: "~{id}35 {value}"
  params:
    - name: value
      type: enum
      description: "1=Film, 3=Graphics, 5=1.8, 6=2.0, 4=2.2, 8=2.6, 10=Blackboard, 11=DICOM SIM"
      values: ["1", "3", "4", "5", "6", "8", "10", "11"]

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "~{id}36 {value}"
  params:
    - name: value
      type: enum
      description: "4=5500K, 1=6500K, 2=7500K, 3=8500K, 6=9500K"
      values: ["4", "1", "2", "3", "6"]

- id: color_space
  label: Color Space
  kind: action
  command: "~{id}37 {value}"
  params:
    - name: value
      type: enum
      description: "1=Auto, 2=RGB, 3=YUV, 4=RGB(16-235)"
      values: ["1", "2", "3", "4"]

- id: hue
  label: Hue
  kind: action
  command: "~{id}44 {value}"
  params:
    - name: value
      type: integer
      description: "0-100 (VGA/Video only)"

- id: saturation
  label: Saturation
  kind: action
  command: "~{id}45 {value}"
  params:
    - name: value
      type: integer
      description: "0-100 (VGA/Video only)"

- id: wall_color
  label: Wall Color
  kind: action
  command: "~{id}506 {value}"
  params:
    - name: value
      type: enum
      description: "0=Off, 6=Light Yellow, 4=Light Blue, 5=Pink, 7=Dark Green, 8=White"
      values: ["0", "4", "5", "6", "7", "8"]

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "~{id}60 {value}"
  params:
    - name: value
      type: enum
      description: "1=4:3, 2=16:9, 3=16:10, 7=Auto"
      values: ["1", "2", "3", "7"]

- id: digital_zoom
  label: Digital Zoom
  kind: action
  command: "~{id}62 {value}"
  params:
    - name: value
      type: integer
      description: "0-10"

- id: h_keystone
  label: H Keystone
  kind: action
  command: "~{id}65 {value}"
  params:
    - name: value
      type: integer
      description: "-40 to 40"

- id: v_keystone
  label: V Keystone
  kind: action
  command: "~{id}66 {value}"
  params:
    - name: value
      type: integer
      description: "-40 to 40"

- id: projection
  label: Projection
  kind: action
  command: "~{id}71 {value}"
  params:
    - name: value
      type: enum
      description: "1=Front, 2=Rear, 3=Front Ceiling, 4=Rear Ceiling"
      values: ["1", "2", "3", "4"]

# --- Color Matching (per-channel W/R/G/B/C/Y/M) ---
- id: cm_w_red
  label: Color Matching (W) Red
  kind: action
  command: "~{id}345 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

- id: cm_w_green
  label: Color Matching (W) Green
  kind: action
  command: "~{id}346 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

- id: cm_w_blue
  label: Color Matching (W) Blue
  kind: action
  command: "~{id}347 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

- id: cm_r_saturation
  label: Color Matching (R) Saturation
  kind: action
  command: "~{id}333 {value}"
  params:
    - { name: value, type: integer, description: "0-199" }

- id: cm_r_hue
  label: Color Matching (R) Hue
  kind: action
  command: "~{id}327 {value}"
  params:
    - { name: value, type: integer, description: "-99 to 99" }

- id: cm_r_gain
  label: Color Matching (R) Gain
  kind: action
  command: "~{id}339 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

- id: cm_g_saturation
  label: Color Matching (G) Saturation
  kind: action
  command: "~{id}334 {value}"
  params:
    - { name: value, type: integer, description: "0-199" }

- id: cm_g_hue
  label: Color Matching (G) Hue
  kind: action
  command: "~{id}328 {value}"
  params:
    - { name: value, type: integer, description: "-99 to 99" }

- id: cm_g_gain
  label: Color Matching (G) Gain
  kind: action
  command: "~{id}340 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

- id: cm_b_saturation
  label: Color Matching (B) Saturation
  kind: action
  command: "~{id}335 {value}"
  params:
    - { name: value, type: integer, description: "0-199" }

- id: cm_b_hue
  label: Color Matching (B) Hue
  kind: action
  command: "~{id}329 {value}"
  params:
    - { name: value, type: integer, description: "-99 to 99" }

- id: cm_b_gain
  label: Color Matching (B) Gain
  kind: action
  command: "~{id}341 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

- id: cm_c_saturation
  label: Color Matching (C) Saturation
  kind: action
  command: "~{id}336 {value}"
  params:
    - { name: value, type: integer, description: "0-199" }

- id: cm_c_hue
  label: Color Matching (C) Hue
  kind: action
  command: "~{id}330 {value}"
  params:
    - { name: value, type: integer, description: "-99 to 99" }

- id: cm_c_gain
  label: Color Matching (C) Gain
  kind: action
  command: "~{id}342 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

- id: cm_y_saturation
  label: Color Matching (Y) Saturation
  kind: action
  command: "~{id}337 {value}"
  params:
    - { name: value, type: integer, description: "0-199" }

- id: cm_y_hue
  label: Color Matching (Y) Hue
  kind: action
  command: "~{id}331 {value}"
  params:
    - { name: value, type: integer, description: "-99 to 99" }

- id: cm_y_gain
  label: Color Matching (Y) Gain
  kind: action
  command: "~{id}343 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

- id: cm_m_saturation
  label: Color Matching (M) Saturation
  kind: action
  command: "~{id}338 {value}"
  params:
    - { name: value, type: integer, description: "0-199" }

- id: cm_m_hue
  label: Color Matching (M) Hue
  kind: action
  command: "~{id}332 {value}"
  params:
    - { name: value, type: integer, description: "-99 to 99" }

- id: cm_m_gain
  label: Color Matching (M) Gain
  kind: action
  command: "~{id}344 {value}"
  params:
    - { name: value, type: integer, description: "1-199" }

# --- PIP / PBP ---
- id: pip_pbp_function
  label: PIP/PBP Function
  kind: action
  command: "~{id}302 {value}"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=PIP, 2=PBP"
      values: ["0", "1", "2"]

- id: pip_location
  label: PIP Location
  kind: action
  command: "~{id}303 {value}"
  params:
    - name: value
      type: enum
      description: "1=Top Left, 2=Top Right, 3=Bottom Left, 4=Bottom Right"
      values: ["1", "2", "3", "4"]

- id: pip_size
  label: PIP Size
  kind: action
  command: "~{id}304 {value}"
  params:
    - name: value
      type: enum
      description: "1=Large, 2=Medium, 3=Small"
      values: ["1", "2", "3"]

- id: sub_source
  label: Sub Source
  kind: action
  command: "~{id}305 {value}"
  params:
    - name: value
      type: enum
      description: "5=VGA, 15=HDMI2, 16=Dongle, 21=HDBaseT"
      values: ["5", "15", "16", "21"]

- id: pip_swap
  label: PIP Swap
  kind: action
  command: "~{id}306 1"
  params: []

# --- Settings ---
- id: language
  label: Language
  kind: action
  command: "~{id}70 {value}"
  params:
    - name: value
      type: integer
      description: "1-28 (1=English, 2=Deutsch, 3=Français, ... 28=Slovakian)"

- id: menu_location
  label: Menu Location
  kind: action
  command: "~{id}72 {value}"
  params:
    - name: value
      type: enum
      description: "1=Top Left, 2=Top Right, 3=Center, 4=Bottom Left, 5=Bottom Right"
      values: ["1", "2", "3", "4", "5"]

- id: vga_out_standby
  label: VGA Out (Standby)
  kind: action
  command: "~{id}309 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: lan_standby
  label: LAN (Standby)
  kind: action
  command: "~{id}450 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "~{id}195 {value}"
  params:
    - name: value
      type: enum
      description: "0=None, 2=White, 3=Grid"
      values: ["0", "2", "3"]

- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "~{id}105 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "~{id}112 1"
  params: []

- id: screen_reset
  label: Screen Reset
  kind: action
  command: "~{id}561 1"
  params: []

- id: auto_source
  label: Auto Source
  kind: action
  command: "~{id}563 0"
  params: []

- id: auto_power_off
  label: Auto Power Off (minutes)
  kind: action
  command: "~{id}106 {value}"
  params:
    - { name: value, type: integer, description: "0-120 (5 min increments)" }

- id: sleep_timer
  label: Sleep Timer (minutes)
  kind: action
  command: "~{id}107 {value}"
  params:
    - { name: value, type: integer, description: "0-990 (10 min increments)" }

- id: ssi_power_mode
  label: SSI Power Mode
  kind: action
  command: "~{id}110 {value}"
  params:
    - name: value
      type: enum
      description: "1=Normal, 2=Eco"
      values: ["1", "2"]

- id: high_altitude
  label: High Altitude
  kind: action
  command: "~{id}101 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: optional_filter_installed
  label: Optional Filter Installed
  kind: action
  command: "~{id}320 {value}"
  params:
    - name: value
      type: enum
      description: "0 = no (also accepts 2), 1 = yes"
      values: ["0", "1"]

- id: filter_reminder
  label: Filter Reminder (hours)
  kind: action
  command: "~{id}322 {value}"
  params:
    - { name: value, type: integer, description: "0-1000" }

- id: cleaning_up_reminder
  label: Cleaning Up Reminder
  kind: action
  command: "~{id}323 {value}"
  params:
    - name: value
      type: enum
      description: "0 = no (also accepts 2), 1 = yes"
      values: ["0", "1"]

- id: security_pin
  label: Security PIN
  kind: action
  command: "~{id}78 {value}"
  params:
    - name: value
      type: string
      description: "0~nnnnnn = security off, 1~nnnnnn = security on (PIN digits)"

- id: ir_filter
  label: IR Filter
  kind: action
  command: "~{id}11 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off, 1 = on"
      values: ["0", "1"]

- id: remote_code
  label: Remote Code
  kind: action
  command: "~{id}350 {value}"
  params:
    - { name: value, type: integer, description: "00-99" }

- id: information_hide
  label: Information Hide
  kind: action
  command: "~{id}102 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: info_menu
  label: Info Menu Open/Close
  kind: action
  command: "~{id}313 {value}"
  params:
    - name: value
      type: enum
      description: "1 = open info menu, 0 = close (also accepts 2)"
      values: ["0", "1"]

# --- Audio ---
- id: speaker
  label: Speaker
  kind: action
  command: "~{id}310 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: audio_out
  label: Audio Out
  kind: action
  command: "~{id}510 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: microphone
  label: Microphone
  kind: action
  command: "~{id}562 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "~{id}80 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off (also accepts 2), 1 = on"
      values: ["0", "1"]

- id: volume
  label: Volume
  kind: action
  command: "~{id}81 {value}"
  params:
    - { name: value, type: integer, description: "0-15" }

- id: microphone_volume
  label: Microphone Volume
  kind: action
  command: "~{id}93 {value}"
  params:
    - { name: value, type: integer, description: "0-30" }

- id: logo
  label: Logo
  kind: action
  command: "~{id}82 {value}"
  params:
    - name: value
      type: enum
      description: "1=Default, 2=User"
      values: ["1", "2"]

- id: logo_capture
  label: Logo Capture
  kind: action
  command: "~{id}83 1"
  params: []

# --- 3D ---
- id: three_d_mode
  label: 3D
  kind: action
  command: "~{id}230 {value}"
  params:
    - name: value
      type: enum
      description: "4=Auto, 5=ON, 7=Frame Packing"
      values: ["4", "5", "7"]

- id: three_d_format
  label: 3D Format
  kind: action
  command: "~{id}405 {value}"
  params:
    - name: value
      type: enum
      description: "1=Side-by-Side (Half), 2=Top and Bottom, 3=Frame Sequential"
      values: ["1", "2", "3"]

- id: three_d_invert
  label: 3D Invert
  kind: action
  command: "~{id}231 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off, 1 = on"
      values: ["0", "1"]

- id: dynamic_black
  label: Dynamic Black
  kind: action
  command: "~{id}191 {value}"
  params:
    - name: value
      type: enum
      description: "0 = off, 1 = on"
      values: ["0", "1"]

# --- Remote Control Simulation (cmd 140, param = key code) ---
- id: remote_key
  label: Remote Control Simulation Key
  kind: action
  command: "~{id}140 {value}"
  params:
    - name: value
      type: enum
      description: >-
        Remote key code: 1=Power, 50=Power Off, 10=Up, 11=Left, 12=Enter,
        13=Right, 14=Down, 15=V Keystone+, 16=V Keystone-, 17=Volume-,
        18=Volume+, 20=Menu, 23=VGA-1, 24=AV Mute, 30=Freeze, 32=Zoom+,
        33=Zoom-, 36=Mode, 37=Format, 40=Info, 41=Re-sync, 42=HDMI1,
        43=HDMI2, 47=Source, 51-60=Keys 1-9 & 0, 63=PIP/PBP,
        68=Geometric Correction, 70=Hot Key F1, 71=F2, 72=F3, 74=Exit
      values: ["1", "50", "10", "11", "12", "13", "14", "15", "16", "17", "18", "20", "23", "24", "30", "32", "33", "36", "37", "40", "41", "42", "43", "47", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "63", "68", "70", "71", "72", "74"]

# --- Queries (kind: query) ---
- id: query_power_status
  label: Power Status Query
  kind: query
  command: "~{id}124 1"
  params: []
  # Response: OK0/OK2 = off/standby, OK1 = on

- id: query_main_source
  label: Main Source Query
  kind: query
  command: "~{id}121 1"
  params: []
  # Response: OK{code} (see input_source codes)

- id: query_sub_source
  label: Sub Source Query
  kind: query
  command: "~{id}131 1"
  params: []

- id: query_display_mode
  label: Display Mode Query
  kind: query
  command: "~{id}125 1"
  params: []

- id: query_brightness
  label: Brightness Query
  kind: query
  command: "~{id}126 1"
  params: []

- id: query_aspect_ratio
  label: Aspect Ratio Query
  kind: query
  command: "~{id}127 1"
  params: []

- id: query_color_temperature
  label: Color Temperature Query
  kind: query
  command: "~{id}128 1"
  params: []

- id: query_projection
  label: Projection Query
  kind: query
  command: "~{id}129 1"
  params: []

- id: query_h_keystone
  label: H Keystone Query
  kind: query
  command: "~{id}543 4"
  params: []

- id: query_v_keystone
  label: V Keystone Query
  kind: query
  command: "~{id}543 3"
  params: []

- id: query_av_mute
  label: AV Mute Query
  kind: query
  command: "~{id}355 1"
  params: []

- id: query_mute
  label: Mute Query
  kind: query
  command: "~{id}356 1"
  params: []

- id: query_model_name
  label: Model Name Query
  kind: query
  command: "~{id}151 1"
  params: []
  # Response: OK1=SVGA, OK2=XGA, OK3=WXGA, OK4=1080P, OK5=WUXGA

- id: query_snid
  label: SNID Query
  kind: query
  command: "~{id}353 1"
  params: []

- id: query_software_version
  label: Software Version Query
  kind: query
  command: "~{id}122 1"
  params: []

- id: query_main_source_resolution
  label: Main Source Resolution Query
  kind: query
  command: "~{id}150 4"
  params: []

- id: query_sub_source_resolution
  label: Sub Source Resolution Query
  kind: query
  command: "~{id}150 10"
  params: []

- id: query_ssi_power_mode
  label: SSI Power Mode Query
  kind: query
  command: "~{id}150 15"
  params: []

- id: query_standby_power_mode
  label: Standby Power Mode Query
  kind: query
  command: "~{id}150 16"
  params: []

- id: query_dhcp
  label: DHCP Client Query
  kind: query
  command: "~{id}150 17"
  params: []

- id: query_ssi_hours_normal
  label: SSI Hours Used (Normal) Query
  kind: query
  command: "~{id}108 3"
  params: []

- id: query_ssi_hours_eco
  label: SSI Hours Used (Eco) Query
  kind: query
  command: "~{id}108 4"
  params: []

- id: query_filter_usage_hours
  label: Filter Usage Hours Query
  kind: query
  command: "~{id}321 1"
  params: []

- id: query_ip_address
  label: IP Address Query
  kind: query
  command: "~{id}87 3"
  params: []

- id: query_network_status
  label: Network Status Query
  kind: query
  command: "~{id}87 1"
  params: []
  # Response: OK0 = disconnected, OK1 = connected

- id: query_mac_address
  label: MAC Address Query
  kind: query
  command: "~{id}555 1"
  params: []
```

## Feedbacks
```yaml
# Write command acknowledgement.
- id: write_ack
  type: enum
  values: ["P", "F"]
  description: "P = pass, F = fail"

# Read command acknowledgement.
- id: read_ack
  type: enum
  values: ["OK", "F"]
  description: "OK{value} = pass with value, F = fail"

- id: power_state
  type: enum
  values: ["0", "1", "2"]
  description: "Returned by power status query (cmd 124): 0/2 = off/standby, 1 = on"

- id: network_state
  type: enum
  values: ["0", "1"]
  description: "0 = disconnected, 1 = connected"

- id: model_name
  type: enum
  values: ["1", "2", "3", "4", "5"]
  description: "1=SVGA, 2=XGA, 3=WXGA, 4=1080P, 5=WUXGA"
```

## Variables
```yaml
# Continuous settable parameters are represented as parameterized Actions
# (brightness, contrast, volume, keystone, color-matching channels, etc.).
# No additional settable Variables beyond those Actions are documented.
# UNRESOLVED: none identified beyond the Actions list.
```

## Events
```yaml
# Unsolicited "System Auto Send" notifications: device emits INFO{code}<CR>
# when the corresponding condition occurs. Format: I N F O {code} <CR>.
- id: info_standby_mode
  code: "INFO0"
  description: "Projector entered standby mode"

- id: info_ld_fail
  code: "INFO4"
  description: "Light source (LD) failure"

- id: info_fan_lock
  code: "INFO6"
  description: "Fan lock detected"

- id: info_over_temperature
  code: "INFO7"
  description: "Over temperature"

- id: info_color_wheel_stop
  code: "INFO12"
  description: "Color wheel unexpected stop"

- id: info_power_good_error
  code: "INFO13"
  description: "Power good error"

- id: info_ld_ntc_over_temperature
  code: "INFO21"
  description: "LD NTC(1) over temperature"

- id: info_system_ready
  code: "INFO24"
  description: "System ready"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - condition: "When HDBaseT control is ON, 12V trigger output signal stays ON even in standby."
    source_note: "Source Remark 1."
  - condition: "Power-on via RS232/LAN has a feedback delay of 6 to 10 seconds."
    source_note: "Source Remark 2."
# UNRESOLVED: no interlock sequencing or lockout procedures beyond the two
# source remarks above.
```

## Notes
- Command frame is pure ASCII terminated by `<CR>` (0x0D). Lead code is `~` (0x7E).
- `{id}` is the projector address, two ASCII digits `00`-`99`; `00` addresses all projectors on the bus (default `00`).
- Write response is a single byte: `P` (pass) or `F` (fail). Read response is `OK{value}` (pass) or `F` (fail). Some reads return `nnnn` / `nnnnnn` numeric strings (hours, serial, resolution).
- The source lists "0 & 2" as the Off value for many toggle commands — both `0` and `2` are accepted for Off; `1` is On.
- Info String read returns a packed field `abbbbbccddddee` (Note *1): `a`=power, `bbbbb`=light source life per mode, `cc`=input source code, `ddd`=firmware version, `ee`=display mode code. Decoding map is in the source Note *1 table.
- LAN/Telnet transport is referenced in related Optoma documentation (port 8088 per Optoma KB) but is NOT present in this source file.
<!-- UNRESOLVED: TCP/LAN transport parameters (port, framing differences) not documented in this source. -->
<!-- UNRESOLVED: exact model list covered by this protocol list (ZH506, ZH510T, ZH350ST, ZH420, ZH460ST, ZH507, ZH520, ZH506T) not stated in the source; source is a generic Optoma RS232 function list. -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: HDBaseT Control sub-menu values ("Auto"/"HDBaseT"), PIP-PBP Module (Version/HDMI EQ 0-7/USB Upgrade), Network Subnet Mask/Gateway/DNS/Store, Location/Contact, and 1080p@24 (96Hz/144Hz) fields appear in source menus without command payloads — payloads not documented. -->

## Provenance

```yaml
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/ZH510T-RS232--.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/9e664e09-5b3f-4cba-a5c4-04c421e5916a.xlsx
  - https://region-resource.optoma.com/products/documents/iG7pWu60NqqiHxdGDQdHlG1kalgTCcKxIlWs9ORU.xlsx
retrieved_at: 2026-06-15T21:47:04.293Z
last_checked_at: 2026-06-16T07:10:02.052Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:10:02.052Z
matched_actions: 109
action_count: 109
confidence: medium
summary: "All 109 spec actions match source commands exactly; transport parameters (9600 baud, 8N1) verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN/Telnet control is referenced in related Optoma documentation (port 8088 per Optoma KB) but is NOT described in this source file; only RS-232 serial transport is documented here."
- "exact ZH model coverage (ZH506, ZH510T, ZH350ST, ZH420, ZH460ST, ZH507, ZH520, ZH506T) not enumerated in the source protocol list."
- "firmware version compatibility not stated in source."
- "none identified beyond the Actions list."
- "no multi-step sequences explicitly documented in source."
- "no interlock sequencing or lockout procedures beyond the two"
- "TCP/LAN transport parameters (port, framing differences) not documented in this source."
- "exact model list covered by this protocol list (ZH506, ZH510T, ZH350ST, ZH420, ZH460ST, ZH507, ZH520, ZH506T) not stated in the source; source is a generic Optoma RS232 function list."
- "firmware version compatibility ranges not stated."
- "HDBaseT Control sub-menu values (\"Auto\"/\"HDBaseT\"), PIP-PBP Module (Version/HDMI EQ 0-7/USB Upgrade), Network Subnet Mask/Gateway/DNS/Store, Location/Contact, and 1080p@24 (96Hz/144Hz) fields appear in source menus without command payloads — payloads not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
