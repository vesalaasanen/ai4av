---
spec_id: admin/christie-suhd983-p
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie SUHD983 P Control Spec"
manufacturer: Christie
model_family: "SUHD983 P"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "SUHD983 P"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-001766-01-christie-lit-man-ref-api-suhd983-p.pdf
retrieved_at: 2026-05-14T13:55:21.144Z
last_checked_at: 2026-10-07T13:04:58.944Z
generated_at: 2026-10-07T13:04:58.944Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - PSC
  - "UDP response format for ASCII protocol not documented (only TCP stated)"
  - "multi-display / broadcast IDT addressing (01-19) examples only show IDT=01"
  - "HEX protocol variable mnemonics differ from ASCII"
  - "source documents no unsolicited event format."
  - "source documents no explicit macro or sequence behavior."
  - "source documents no safety warnings or interlock procedures."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:04:58.944Z
  matched_actions: 114
  action_count: 114
  confidence: medium
  summary: "All 114 action units match source ASCII and HEX command tables and transport values; the only uncovered item is the PSC example frame, with auth left UNRESOLVED. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie SUHD983 P Control Spec

## Summary
Christie SUHD983 P LCD professional display panel (98"). Supports RS-232 serial and TCP/IP (port 5000) / UDP (port 5001) Ethernet control. Two protocol variants are documented: an ASCII text protocol (`K:ALL[CMD][VALUE].` command, `ALL:CMD=VALUE` response, ACK=`A` / NAK=`N`) and a binary HEX protocol over RS-232 (`[STX=07][IDT][TYPE][CMD][VALUE][ETX=08][CR=0D]`, IDT 01-19).

<!-- UNRESOLVED: UDP response format for ASCII protocol not documented (only TCP stated) -->
<!-- UNRESOLVED: multi-display / broadcast IDT addressing (01-19) examples only show IDT=01 -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 115200  # default; source states 115200/38400/19200/9600 supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000  # TCP/IP stated in source
  udp_port: 5001  # UDP stated in source
auth:
  type: UNRESOLVED  # source does not state authentication
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# ============================================================================
# ASCII PROTOCOL - DIRECT CONTROL (kind: action)
# Format: K:ALL[CMD][VALUE].  Response: ALL:CMD=A (ACK) / ALL:CMD=N (NAK)
# ============================================================================

- id: power_on
  label: Power On
  kind: action
  command: "K:ALLPON."
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "K:ALLPOF."
  params: []

- id: source_dp1
  label: Source DP1
  kind: action
  command: "K:ALLSH0."
  params: []

- id: source_dp2
  label: Source DP2
  kind: action
  command: "K:ALLSH1."
  params: []

- id: source_hdmi1
  label: Source HDMI1
  kind: action
  command: "K:ALLSH2."
  params: []

- id: source_hdmi2
  label: Source HDMI2
  kind: action
  command: "K:ALLSH3."
  params: []

- id: source_hdmi3
  label: Source HDMI3
  kind: action
  command: "K:ALLSH4."
  params: []

- id: source_hdmi4
  label: Source HDMI4
  kind: action
  command: "K:ALLSH5."
  params: []

- id: source_dvi
  label: Source DVI
  kind: action
  command: "K:ALLSH6."
  params: []

- id: source_ops_hdmi
  label: Source OPS/HDMI
  kind: action
  command: "K:ALLSH7."
  params: []

- id: source_ops_dp
  label: Source OPS/DP
  kind: action
  command: "K:ALLSH8."
  params: []

- id: window_select
  label: Select Window
  kind: action
  command: "K:ALLWN{window}."
  params:
    - name: window
      type: integer
      description: Window number (1-4); multi-window mode must be on

- id: picture_mode
  label: Set Picture Mode
  kind: action
  command: "K:ALLPM{mode}."
  params:
    - name: mode
      type: integer
      description: "0=Standard, 1=Dynamic, 2=User"

- id: backlight_on
  label: Backlight On
  kind: action
  command: "K:ALLBLN."
  params: []

- id: backlight_off
  label: Backlight Off
  kind: action
  command: "K:ALLBLF."
  params: []

- id: backlight_up
  label: Backlight Up 1 Step
  kind: action
  command: "K:ALLBLU."
  params: []

- id: backlight_down
  label: Backlight Down 1 Step
  kind: action
  command: "K:ALLBLD."
  params: []

# Source labels BLU/BLD as brightness 1-step up/down in its direct-control table.
- id: brightness_up
  label: Brightness Up 1 Step
  kind: action
  command: "K:ALLBLU."
  params: []

- id: brightness_down
  label: Brightness Down 1 Step
  kind: action
  command: "K:ALLBLD."
  params: []

- id: contrast_up
  label: Contrast Up 1 Step
  kind: action
  command: "K:ALLCTU."
  params: []

- id: contrast_down
  label: Contrast Down 1 Step
  kind: action
  command: "K:ALLCTD."
  params: []

- id: black_level_up
  label: Black Level Up 1 Step
  kind: action
  command: "K:ALLBRU."
  params: []

- id: black_level_down
  label: Black Level Down 1 Step
  kind: action
  command: "K:ALLBRD."
  params: []

- id: color_up
  label: Color Up 1 Step
  kind: action
  command: "K:ALLSTU."
  params: []

- id: color_down
  label: Color Down 1 Step
  kind: action
  command: "K:ALLSTD."
  params: []

- id: sharpness_up
  label: Sharpness Up 1 Step
  kind: action
  command: "K:ALLSPU."
  params: []

- id: sharpness_down
  label: Sharpness Down 1 Step
  kind: action
  command: "K:ALLSPD."
  params: []

- id: red_gain_up
  label: Red Gain Up 1 Step
  kind: action
  command: "K:ALLRGU."
  params: []

- id: red_gain_down
  label: Red Gain Down 1 Step
  kind: action
  command: "K:ALLRGD."
  params: []

- id: green_gain_up
  label: Green Gain Up 1 Step
  kind: action
  command: "K:ALLGGU."
  params: []

- id: green_gain_down
  label: Green Gain Down 1 Step
  kind: action
  command: "K:ALLGGD."
  params: []

- id: blue_gain_up
  label: Blue Gain Up 1 Step
  kind: action
  command: "K:ALLBGU."
  params: []

- id: blue_gain_down
  label: Blue Gain Down 1 Step
  kind: action
  command: "K:ALLBGD."
  params: []

- id: audio_input
  label: Set Audio Input
  kind: action
  command: "K:ALLAI{source}."
  params:
    - name: source
      type: integer
      description: "0=DP1, 1=DP2, 2=HDMI1, 3=HDMI2, 4=HDMI3, 5=HDMI4, 6=DVI, 7=OPS-HDMI, 8=OPS-DP"

- id: volume_up
  label: Volume Up 1 Step
  kind: action
  command: "K:ALLVLU."
  params: []

- id: volume_down
  label: Volume Down 1 Step
  kind: action
  command: "K:ALLVLD."
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "K:ALLMON."
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "K:ALLMOF."
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "K:ALLFTR."
  params: []

- id: picture_reset
  label: Picture Reset
  kind: action
  command: "K:ALLPIR."
  params: []

- id: remote_key
  label: Remote Control Key
  kind: action
  command: "K:ALLR{key_code}."
  params:
    - name: key_code
      type: string
      enum: [MN, IF, UP, DN, RT, LT, EN, SO]
      description: "Key code: MN=menu, IF=info, UP=up, DN=down, LT=left, RT=right, EN=enter, SO=source"

- id: multi_window_mode
  label: Multi-Window Mode
  kind: action
  command: "K:ALL{wm_code}."
  params:
    - name: wm_code
      type: string
      enum: [WMF, WM0, WM1, WM2, WM3, WM4, WM5, WM6, WM7, WM8, WM9]
      description: "WMF=off, WM0=single, WM1- WM4=dual1-dual4, WM5-WM8=triple1-triple4, WM9=quad; preset mode must be selected first"

- id: window_input
  label: Set Window Input
  kind: action
  command: "K:ALLW{window}{source}."
  params:
    - name: window
      type: integer
      description: Window number (1-4)
    - name: source
      type: integer
      description: "0=DP1, 1=DP2, 2=HDMI1, 3=HDMI2, 4=HDMI3, 5=HDMI4, 6=DVI, 7=OPS-HDMI, 8=OPS-DP"

- id: color_temperature
  label: Set Color Temperature
  kind: action
  command: "K:ALLCT{mode}."
  params:
    - name: mode
      type: integer
      description: "0=Studio1, 1=Studio2, 2=Warm, 3=Normal, 4=Cool, 5=User"

- id: interface_select
  label: Interface Select
  kind: action
  command: "K:ALLUA{mode}."
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=RS232, 2=OPS/RS232"

- id: power_save
  label: Power Save
  kind: action
  command: "K:ALLPS{ps_code}."
  params:
    - name: ps_code
      type: string
      enum: [PSF, PSN]
      description: "PSF=off, PSN=on. Source direct-control prose also prints PSO for on; that command spelling is unresolved."

- id: movie_mode
  label: Movie Mode
  kind: action
  command: "K:ALLMM{level}."
  params:
    - name: level
      type: integer
      description: "0=Off, 1=Low, 2=Middle, 3=High"

- id: osd_language
  label: OSD Language
  kind: action
  command: "K:ALL{lang_code}."
  params:
    - name: lang_code
      type: string
      enum: [LES, LGE, LSP, LFR, LIT, LRU, LKR]
      description: "LES=English, LGE=German, LSP=Spanish, LFR=French, LIT=Italian, LRU=Russian, LKR=Korean"

- id: osd_timeout
  label: OSD Timeout
  kind: action
  command: "K:ALLOT{mode}."
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=5Sec, 2=10Sec, 3=20Sec"

- id: preset_select
  label: Preset Select
  kind: action
  command: "K:ALLRN{preset_code}."
  params:
    - name: preset_code
      type: integer
      description: "0=Preset10 (RN0); 1-9=Preset1-9 (RN1-RN9)"

- id: preset_select_10
  label: Preset Select 10
  kind: action
  command: "K:ALLRN0."
  params: []

- id: balance
  label: Balance
  kind: action
  command: "K:ALLBC{direction_code}."
  params:
    - name: direction_code
      type: string
      enum: [U, D]
      description: "U=up (BCU), D=down (BCD)"

# ============================================================================
# ASCII PROTOCOL - STATUS CHECK / QUERY (kind: query)
# Format: K:ALL[CMD]?  Response: ALL:CMD=[VALUE]
# ============================================================================
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "K:ALLPWR?"
  params: []

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "K:ALLSRC?"
  params: []

- id: selected_window_query
  label: Selected Window Query
  kind: query
  command: "K:ALLWIN?"
  params: []

- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "K:ALLPMT?"
  params: []

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "K:ALLBLT?"
  params: []

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "K:ALLCON?"
  params: []

- id: black_level_query
  label: Black Level Query
  kind: query
  command: "K:ALLBRT?"
  params: []

- id: saturation_query
  label: Saturation Query
  kind: query
  command: "K:ALLSAT?"
  params: []

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "K:ALLSHA?"
  params: []

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "K:ALLCTT?"
  params: []

- id: red_gain_query
  label: Red Gain Query
  kind: query
  command: "K:ALLRGN?"
  params: []

- id: green_gain_query
  label: Green Gain Query
  kind: query
  command: "K:ALLGGN?"
  params: []

- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  command: "K:ALLBGN?"
  params: []

- id: audio_input_query
  label: Audio Input Query
  kind: query
  command: "K:ALLAUT?"
  params: []

- id: volume_query
  label: Volume Query
  kind: query
  command: "K:ALLVOL?"
  params: []

- id: balance_query
  label: Balance Query
  kind: query
  command: "K:ALLBCT?"
  params: []

- id: osd_language_query
  label: OSD Language Query
  kind: query
  command: "K:ALLLAT?"
  params: []

- id: osd_timeout_query
  label: OSD Timeout Query
  kind: query
  command: "K:ALLOTT?"
  params: []

- id: power_save_query
  label: Power Save Query
  kind: query
  command: "K:ALLPST?"
  params: []

- id: preset_mode_query
  label: Preset Mode Query
  kind: query
  command: "K:ALLPRS?"
  params: []

- id: power_off_mode_query
  label: Power Off Mode Query
  kind: query
  command: "K:ALLPWM?"
  params: []

- id: movie_mode_query
  label: Movie Mode Query
  kind: query
  command: "K:ALLMMT?"
  params: []

- id: uart_status_query
  label: UART Status Query
  kind: query
  command: "K:ALLUAT?"
  params: []

- id: multi_window_mode_query
  label: Multi-Window Mode Query
  kind: query
  command: "K:ALLWMT?"
  params: []

- id: window1_source_query
  label: Window1 Source Query
  kind: query
  command: "K:ALLW1S?"
  params: []

- id: window2_source_query
  label: Window2 Source Query
  kind: query
  command: "K:ALLW2S?"
  params: []

- id: window3_source_query
  label: Window3 Source Query
  kind: query
  command: "K:ALLW3S?"
  params: []

- id: window4_source_query
  label: Window4 Source Query
  kind: query
  command: "K:ALLW4S?"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "K:ALLMUT?"
  params: []

# ============================================================================
# HEX (BINARY) PROTOCOL - RS-232 ONLY
# Frame: [STX=07][IDT][TYPE][CMD3][VALUE][ETX=08][CR=0D]
# IDT = display ID hex 01-19 (examples use 01); TYPE=00 response, 01 read/action, 02 write.
# The command fields below give the frame bytes through ETX; append the documented CR byte.
# CMD mnemonics below are distinct from ASCII mnemonics.
# ============================================================================
- id: hex_power_set
  label: HEX Power Set
  kind: action
  command: "07 01 02 50 4F 57 {value} 08"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on; value is one byte. IDT is 01 in this example frame. Append CR (0x0D) after ETX."

- id: hex_power_query
  label: HEX Power Query
  kind: query
  command: "07 01 01 50 4F 57 08"
  params: []

- id: hex_input_source_set
  label: HEX Input Source Set
  kind: action
  command: "07 01 02 4D 49 4E {value} 08"
  params:
    - name: value
      type: integer
      description: "1=DVI, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 13=DP1, 14=DP2, 15=OPS HDMI, 16=OPS DP; value is one byte"

- id: hex_input_source_query
  label: HEX Input Source Query
  kind: query
  command: "07 01 01 4D 49 4E 08"
  params: []

- id: hex_backlight_set
  label: HEX Backlight Set (OSD Brightness)
  kind: action
  command: "07 01 02 42 52 49 {value} 08"
  params:
    - name: value
      type: integer
      description: "0-100 (0x00-0x64); value is one byte"

- id: hex_backlight_query
  label: HEX Backlight Query
  kind: query
  command: "07 01 01 42 52 49 08"
  params: []

- id: hex_contrast_set
  label: HEX Contrast Set
  kind: action
  command: "07 01 02 43 4F 4E {value} 08"
  params:
    - name: value
      type: integer
      description: "0-100; source example uses COB bytes while the command table lists CON, so the command spelling is unresolved"

- id: hex_contrast_query
  label: HEX Contrast Query
  kind: query
  command: "07 01 01 43 4F 4E 08"
  params: []

- id: hex_brightness_blacklevel_set
  label: HEX Brightness Set (OSD Black Level)
  kind: action
  command: "07 01 02 42 52 4C {value} 08"
  params:
    - name: value
      type: integer
      description: "0-100 (BRL mnemonic; source labels it OSD black level in the detailed section)"

- id: hex_brightness_blacklevel_query
  label: HEX Brightness (Black Level) Query
  kind: query
  command: "07 01 01 42 52 4C 08"
  params: []

- id: hex_saturation_set
  label: HEX Saturation Set
  kind: action
  command: "07 01 02 53 41 54 {value} 08"
  params:
    - name: value
      type: integer
      description: "0-100; value is one byte"

- id: hex_saturation_query
  label: HEX Saturation Query
  kind: query
  command: "07 01 01 53 41 54 08"
  params: []

- id: hex_sharpness_set
  label: HEX Sharpness Set
  kind: action
  command: "07 01 02 53 48 41 {value} 08"
  params:
    - name: value
      type: integer
      description: "0-100; value is one byte"

- id: hex_sharpness_query
  label: HEX Sharpness Query
  kind: query
  command: "07 01 01 53 48 41 08"
  params: []

- id: hex_backlight_onoff_set
  label: HEX Backlight On/Off Set
  kind: action
  command: "07 01 02 42 4C 43 {value} 08"
  params:
    - name: value
      type: integer
      description: "0=off, 1=on"

- id: hex_backlight_onoff_query
  label: HEX Backlight On/Off Query
  kind: query
  command: "07 01 01 42 4C 43 08"
  params: []

- id: hex_color_temperature_set
  label: HEX Color Temperature Set
  kind: action
  command: "07 01 02 43 43 54 {value} 08"
  params:
    - name: value
      type: integer
      description: "0-12=Studio1, 13-31=Studio2, 32-53=Warm, 54-75=Normal, 76-90=Cool, 91-100=User; value is one byte"

- id: hex_color_temperature_query
  label: HEX Color Temperature Query
  kind: query
  command: "07 01 01 43 43 54 08"
  params: []

- id: hex_red_gain_set
  label: HEX Red Gain Set
  kind: action
  command: "07 01 02 55 53 52 {value} 08"
  params:
    - name: value
      type: integer
      description: "0-100 (USR mnemonic); value is one byte"

- id: hex_red_gain_query
  label: HEX Red Gain Query
  kind: query
  command: "07 01 01 55 53 52 08"
  params: []

- id: hex_green_gain_set
  label: HEX Green Gain Set
  kind: action
  command: "07 01 02 55 53 47 {value} 08"
  params:
    - name: value
      type: integer
      description: "0-100 (USG mnemonic); value is one byte"

- id: hex_green_gain_query
  label: HEX Green Gain Query
  kind: query
  command: "07 01 01 55 53 47 08"
  params: []

- id: hex_blue_gain_set
  label: HEX Blue Gain Set
  kind: action
  command: "07 01 02 55 53 42 {value} 08"
  params:
    - name: value
      type: integer
      description: "0-100 (USB mnemonic); value is one byte"

- id: hex_blue_gain_query
  label: HEX Blue Gain Query
  kind: query
  command: "07 01 01 55 53 42 08"
  params: []

- id: baud_rate_set
  label: Set Baud Rate (Binary BRA)
  kind: action
  command: "07 01 02 42 52 41 {rate} 08"
  params:
    - name: rate
      type: integer
      description: "0=115200, 1=38400, 2=19200, 3=9600; HEX protocol only (ASCII baud changes through the factory menu)"

- id: hex_baud_rate_query
  label: HEX Baud Rate Query
  kind: query
  command: "07 01 01 42 52 41 08"
  params: []

- id: hex_remote_key
  label: HEX Remote Control Key
  kind: action
  command: "07 01 02 52 43 55 {key} 08"
  params:
    - name: key
      type: integer
      description: "0=menu, 1=info, 2=up, 3=down, 4=left, 5=right, 6=enter"

- id: hex_factory_reset
  label: HEX Factory Reset (Reset All)
  kind: action
  command: "07 01 02 41 4C 4C 00 08"
  params: []

- id: hex_serial_number_read
  label: HEX Serial Number Read
  kind: query
  command: "07 01 01 53 45 52 08"
  params: []
  # Response: 07 01 00 53 45 52 S(0)..S(12) 08 (13 bytes ASCII)

- id: hex_model_name_read
  label: HEX Model Name Read
  kind: query
  command: "07 01 01 4D 4E 41 08"
  params: []
  # Response: 07 01 00 4D 4E 41 + 13 bytes ASCII 08

- id: hex_firmware_version_read
  label: HEX Firmware Version Read
  kind: query
  command: "07 01 01 47 56 45 08"
  params: []
  # Response contains 6 bytes ASCII firmware version.

- id: hex_scheme_select_set
  label: HEX Scheme Select (OSD Picture Mode) Set
  kind: action
  command: "07 01 02 53 43 4D {value} 08"
  params:
    - name: value
      type: integer
      description: "0=User, 1=Standard, 4=Dynamic"

- id: hex_scheme_select_query
  label: HEX Scheme Select Query
  kind: query
  command: "07 01 01 53 43 4D 08"
  params: []
```

## Feedbacks
```yaml
# ASCII status-check response enums (response: ALL:CMD=VALUE)
- id: power_state
  label: Power State
  type: enum
  values:
    - "000=on"
    - "001=off (power save)"
    - "002=off (RS232/remote off)"

- id: selected_window
  label: Selected Window
  type: enum
  values:
    - "001=Window1"
    - "002=Window2"
    - "003=Window3"
    - "004=Window4"

- id: picture_mode_status
  label: Picture Mode
  type: enum
  values:
    - "000=Standard"
    - "001=Dynamic"
    - "002=User"

- id: brightness_status
  label: Brightness
  type: range
  min: 0
  max: 100

- id: contrast_status
  label: Contrast
  type: range
  min: 0
  max: 100

- id: black_level_status
  label: Black Level
  type: range
  min: 0
  max: 100

- id: saturation_status
  label: Saturation
  type: range
  min: 0
  max: 100

- id: sharpness_status
  label: Sharpness
  type: range
  min: 0
  max: 100

- id: color_temperature_status
  label: Color Temperature
  type: enum
  values:
    - "000=Studio1"
    - "001=Studio2"
    - "002=Warm"
    - "003=Normal"
    - "004=Cool"
    - "005=User"

- id: red_gain_status
  label: Red Gain
  type: range
  min: 0
  max: 100

- id: green_gain_status
  label: Green Gain
  type: range
  min: 0
  max: 100

- id: blue_gain_status
  label: Blue Gain
  type: range
  min: 0
  max: 100

- id: audio_input_status
  label: Audio Input
  type: enum
  values:
    - "000=DP1"
    - "001=DP2"
    - "002=HDMI1"
    - "003=HDMI2"
    - "004=HDMI3"
    - "005=HDMI4"
    - "006=DVI"
    - "007=OPS-HDMI"
    - "008=OPS-DP"

- id: volume_status
  label: Volume
  type: range
  min: 0
  max: 100

- id: balance_status
  label: Balance
  type: range
  min: 0
  max: 100

- id: osd_language_status
  label: OSD Language
  type: enum
  values:
    - "000=English"
    - "001=German"
    - "002=Spanish"
    - "003=French"
    - "004=Italian"
    - "005=Russian"
    - "006=Korean"

- id: osd_timeout_status
  label: OSD Timeout
  type: enum
  values:
    - "000=Off"
    - "001=5Sec"
    - "002=10Sec"
    - "003=20Sec"

- id: power_save_status
  label: Power Save
  type: enum
  values:
    - "000=Off"
    - "001=On"

- id: power_off_mode_status
  label: Power Off Mode
  type: enum
  values:
    - "000=Standby"
    - "001=Sleep"
    - "002=Deep Sleep"

- id: movie_mode_status
  label: Movie Mode
  type: enum
  values:
    - "000=Off"
    - "001=Low"
    - "002=Middle"
    - "003=High"

- id: uart_status
  label: UART Status
  type: enum
  values:
    - "000=Off"
    - "001=RS232"
    - "002=OPS RS232"

- id: preset_mode_status
  label: Preset Mode
  type: enum
  values:
    - "000=Multi mode off"
    - "001=Preset1"
    - "002=Preset2"
    - "003=Preset3"
    - "004=Preset4"
    - "005=Preset5"
    - "006=Preset6"
    - "007=Preset7"
    - "008=Preset8"
    - "009=Preset9"
    - "010=Preset10"
    - "011=Preset11"
    - "012=Preset12"
    - "013=Preset13"
    - "014=Preset14"
    - "015=Preset15"
    - "016=Preset16"
    - "017=Preset17"
    - "018=Preset18"
    - "019=Preset19"
    - "020=Preset20"

- id: multi_window_mode_status
  label: Multi-Window Mode
  type: enum
  values:
    - "000=Single"
    - "001=Dual1"
    - "002=Dual2"
    - "003=Dual3"
    - "004=Dual4"
    - "005=Triple1"
    - "006=Triple2"
    - "007=Triple3"
    - "008=Triple4"
    - "009=Quad"

- id: window1_source_status
  label: Window1 Source
  type: enum
  values:
    - "000=DP1"
    - "001=DP2"
    - "002=HDMI1"
    - "003=HDMI2"
    - "004=HDMI3"
    - "005=HDMI4"
    - "006=DVI"
    - "007=OPS-HDMI"
    - "008=OPS-DP"

- id: window2_source_status
  label: Window2 Source
  type: enum
  values:
    - "000=DP1"
    - "001=DP2"
    - "002=HDMI1"
    - "003=HDMI2"
    - "004=HDMI3"
    - "005=HDMI4"
    - "006=DVI"
    - "007=OPS-HDMI"
    - "008=OPS-DP"

- id: window3_source_status
  label: Window3 Source
  type: enum
  values:
    - "000=DP1"
    - "001=DP2"
    - "002=HDMI1"
    - "003=HDMI2"
    - "004=HDMI3"
    - "005=HDMI4"
    - "006=DVI"
    - "007=OPS-HDMI"
    - "008=OPS-DP"

- id: window4_source_status
  label: Window4 Source
  type: enum
  values:
    - "000=DP1"
    - "001=DP2"
    - "002=HDMI1"
    - "003=HDMI2"
    - "004=HDMI3"
    - "005=HDMI4"
    - "006=DVI"
    - "007=OPS-HDMI"
    - "008=OPS-DP"

- id: current_source_status
  label: Current Source
  type: enum
  values:
    - "000=DP1"
    - "001=DP2"
    - "002=HDMI1"
    - "003=HDMI2"
    - "004=HDMI3"
    - "005=HDMI4"
    - "006=DVI"
    - "007=OPS-HDMI"
    - "008=OPS-DP"

- id: mute_status
  label: Mute Status
  type: enum
  values:
    - "000=Off"
    - "001=On"

# HEX protocol power response: 07 01 00 50 4F 57 XX 08 (XX=00 off, 01 on)
- id: hex_power_state
  label: HEX Power State
  type: enum
  values:
    - "00=off"
    - "01=on"
```

## Variables
```yaml
# ASCII value-adjust commands (value 000~100 zero-padded)
- id: brightness
  label: Brightness
  type: range
  min: 0
  max: 100
  set: K:ALLBLT{value}.

- id: contrast
  label: Contrast
  type: range
  min: 0
  max: 100
  set: K:ALLCON{value}.

- id: black_level
  label: Black Level
  type: range
  min: 0
  max: 100
  set: K:ALLBRT{value}.

- id: saturation
  label: Saturation
  type: range
  min: 0
  max: 100
  set: K:ALLSAT{value}.

- id: sharpness
  label: Sharpness
  type: range
  min: 0
  max: 100
  set: K:ALLSHA{value}.

- id: red_gain
  label: Red Gain
  type: range
  min: 0
  max: 100
  set: K:ALLRGN{value}.

- id: green_gain
  label: Green Gain
  type: range
  min: 0
  max: 100
  set: K:ALLGGN{value}.

- id: blue_gain
  label: Blue Gain
  type: range
  min: 0
  max: 100
  set: K:ALLBGN{value}.

- id: volume
  label: Volume
  type: range
  min: 0
  max: 100
  set: K:ALLVOL{value}.

- id: balance
  label: Balance
  type: range
  min: 0
  max: 100
  set: K:ALLBCT{value}.

- id: power_off_mode
  label: Power Off Mode
  type: enum
  values:
    - "0=Standby"
    - "1=Sleep"
    - "2=Deep Sleep"
  set: K:ALLPWM{value}.

- id: preset_mode
  label: Preset Mode
  type: range
  min: 0
  max: 20
  set: K:ALLPRS{value}.

# UNRESOLVED: HEX protocol variable mnemonics differ from ASCII
# (BRI=backlight, BRL=black-level, USR/USG/USB vs RGN/GGN/BGN,
# CCT range-mapped 0-100 vs ASCII CTT discrete 0-5, SCM scheme vs PMT).
# HEX set payloads are listed in Actions above.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event format.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit macro or sequence behavior.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents no safety warnings or interlock procedures.
```

## Notes
ASCII command format: `K:ALL[CMD][VALUE].` where `[HEAD]`=`K:`, `[SET ID]`=`ALL`, `[END]`=`.`.
Value-adjust format: `K:ALL[CMD]{value}.` (value zero-padded 000~100).
Query format: `K:ALL[CMD]?`.
Response format: `ALL:CMD=VALUE`.
ACK: `ALL:CMD=A`; NAK: `ALL:CMD=N` (source also describes the error reply as `N`).

HEX protocol frame: `[STX=07][IDT][TYPE][CMD][VALUE][ETX=08][CR=0D]`.
- STX is 0x07, ETX is 0x08, and a trailing ASCII carriage return 0x0D is required.
- IDT is display ID, hexadecimal 01-19 inclusive; examples use 01.
- TYPE: 00=response from panel, 01=read/action, 02=write.
- HEX protocol is documented for serial communication. The source does not clearly establish HEX protocol transport over Ethernet.

Source inconsistencies and unresolved details:
- The source's ASCII power-on table gives PON, while its worked power-on example says PFN. The power_on command follows the table value PON; the conflict remains unresolved.
- The power-save command table lists PSN for on, while the direct-control prose gives PSO. The action uses the table value PSN; the conflict remains unresolved.
- The source's ASCII contrast step example repeats CON for up and down, while its direct-control command table lists CTU and CTD. The actions use the table entries; the conflict remains unresolved.
- The black-level step table labels BLU/BLD, while its example uses BRU for up and the command table lists BRU/BRD. The actions use BRU/BRD; the conflict remains unresolved.
- The HEX contrast table lists CON, while its detailed example uses COB. The HEX contrast command spelling is unresolved.
- The source's OSD-language query command table prints BCT, while its example uses LAT. The query uses LAT, matching the status command list. The printed table conflict remains unresolved.
- The source's power-save query command table prints OTT, while its example uses PST. The query uses PST, matching the status command list. The printed table conflict remains unresolved.
- The source's baud-rate query example table labels the BRA query as “Get red gain”; the command is retained as the documented BRA query, but its response behavior is unresolved.
- ASCII is described over TCP/IP and serial; the source does not document the ASCII UDP response format.
- HEX examples show IDT 01 only; broadcast and multi-display addressing behavior is unresolved.
- Firmware compatibility is not specified. The HEX GVE command reads the firmware version.
- HEX serial-number and model-name reads return 13 bytes; firmware-version read returns 6 bytes ASCII.

Ethernet ports: TCP/IP 5000 and UDP 5001. ASCII protocol is documented over TCP; UDP response behavior is not documented.
```

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-001766-01-christie-lit-man-ref-api-suhd983-p.pdf
retrieved_at: 2026-05-14T13:55:21.144Z
last_checked_at: 2026-10-07T13:04:58.944Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:04:58.944Z
matched_actions: 114
action_count: 114
confidence: medium
summary: "All 114 action units match source ASCII and HEX command tables and transport values; the only uncovered item is the PSC example frame, with auth left UNRESOLVED. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- PSC
- "UDP response format for ASCII protocol not documented (only TCP stated)"
- "multi-display / broadcast IDT addressing (01-19) examples only show IDT=01"
- "HEX protocol variable mnemonics differ from ASCII"
- "source documents no unsolicited event format."
- "source documents no explicit macro or sequence behavior."
- "source documents no safety warnings or interlock procedures."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
