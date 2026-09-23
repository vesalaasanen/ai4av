---
spec_id: admin/sharp-lcc7500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCC7500 Series Control Spec"
manufacturer: Sharp
model_family: "Sharp LCC7500 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "Sharp LCC7500 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-09-02T17:40:03.542Z
last_checked_at: 2026-09-19T22:17:50.511Z
generated_at: 2026-09-19T22:17:50.511Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "chapter 8 OSD↔command map references features (e.g. schedules, network settings, signal info) marked N/A — those commands are not documented in this source and are intentionally omitted."
  - "source documents settable VCP parameters as Actions above; no separate"
  - "source describes NULL message semantics (timeout, busy, BCC error) but"
  - "source contains no explicit safety warnings, interlocks, or hazardous-"
  - "VCP set-parameter frames use ASCII-hex encoding throughout (4 hex chars per 16-bit value, 2 hex chars per byte). Commands that source-spec markers leave as straight numeric ranges (e.g. VCP-02-50 H.Resolution 0000h..FFFFh) were emitted as hex-string params; downstream code must split into 4 ASCII bytes."
verification:
  verdict: verified
  checked_at: 2026-09-19T22:17:50.511Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec actions trace to VCP/CTL commands documented in source §5.5, §7, and §8 OSD table; transport values match §3 verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Sharp LCC7500 Series Control Spec

## Summary
External-control specification for the Sharp LCC7500 Series LCD monitor. Covers two transports: RS-232C (9-pin D-Sub, 9600 baud, 8N1) and LAN (TCP port 7142). The protocol is a framed ASCII packet (`Header | Message | Check Code | Delimiter`) with two command families — VCP (get/set parameter, OP-code-page + OP-code) and CTL (system/utilities like power, save, MAC, model, serial, IR-passthrough).

<!-- UNRESOLVED: chapter 8 OSD↔command map references features (e.g. schedules, network settings, signal info) marked N/A — those commands are not documented in this source and are intentionally omitted. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
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
- powerable       # inferred: CTL-C203-D6 power on/off commands documented
- queryable       # inferred: get-parameter (VCP-*-??) commands documented across OSD table
- routable        # inferred: VCP-00-60 input select covers VGA/HDMI/AV/Tuner/MP
- levelable       # inferred: VCP-00-10 backlight, VCP-00-12 contrast, VCP-00-93 balance range controls documented
```

## Actions
```yaml
# Frame structure assumed in every command below:
#   01h 30h ID  TYPE LEN[2] 02h DATA 03h BCC 0Dh
#   TYPE = 'A'(41h) command | 'C'(43h) get-parameter | 'E'(45h) set-parameter
#   BCC = XOR of bytes D1..D16 (Header+Message inclusive of STX and ETX)
#   ID = 1..100 -> 'A'..(see §4.1.1 Monitor/Group ID table), or '*'(2Ah) for all
#
# The following actions enumerate each command/opcode pair found in the source,
# per §6 example, §7 CTL commands, and §8 VCP table.

- id: vcp_get_parameter
  label: VCP Get Parameter (read OP-code value)
  kind: query
  command: "01h 30h ID 43h 30h 36h 02h {OpPageHi} {OpPageLo} {OpCodeHi} {OpCodeLo} 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: string
      description: Destination monitor ID ('A'..) or '*' for broadcast per §4.1.1 table
    - name: op_code_page
      type: string
      description: Two ASCII hex digits, e.g. "00", "02", "10", "11"
    - name: op_code
      type: string
      description: Two ASCII hex digits identifying the VCP parameter

- id: vcp_set_parameter
  label: VCP Set Parameter (write OP-code value)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h {OpPageHi} {OpPageLo} {OpCodeHi} {OpCodeLo} {SetHi}{..}{SetLo} 03h BCC 0Dh"
  params:
    - name: monitor_id
      type: string
      description: Destination monitor ID or '*'
    - name: op_code_page
      type: string
      description: Two ASCII hex digits
    - name: op_code
      type: string
      description: Two ASCII hex digits
    - name: value
      type: string
      description: 4 ASCII-hex-digit 16-bit value

- id: vcp_set_backlight
  label: VCP-00-10 Backlight / Brightness
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 31h 30h {00..00..64h} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100 (0000h..0064h), Dark..Bright

- id: vcp_set_contrast
  label: VCP-00-12 Contrast
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 31h 32h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100 (0000h..0064h), Low..High

- id: vcp_set_video_black_level
  label: VCP-00-92 Video Black Level
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 39h 32h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, To Dark..To Bright

- id: vcp_set_sharpness_primary
  label: VCP-00-87 Sharpness (primary)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 38h 37h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Dull..Sharp

- id: vcp_set_sharpness_secondary
  label: VCP-00-8C Sharpness (secondary)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 38h 43h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Dull..Sharp

- id: vcp_set_color
  label: VCP-00-8A Color
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 38h 41h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Pale..Deep

- id: vcp_set_color_alt
  label: VCP-02-1F Color (alt page)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 31h 46h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Pale..Deep

- id: vcp_set_tint
  label: VCP-00-90 Tint
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 39h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Purplish..Greenish

- id: vcp_set_color_temp_preset
  label: VCP-00-0C Color Temperature (preset)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 30h 43h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0023h Warm | 003Fh Normal | 005Ah Cool"

- id: vcp_set_color_temp_mode
  label: VCP-00-14 Color Temperature (mode)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 31h 34h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0002h Native | 000Bh Custom"

- id: vcp_set_color_red
  label: VCP-00-16 Color Temperature Red Gain
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 31h 36h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Dark..Bright

- id: vcp_set_color_green
  label: VCP-00-18 Color Temperature Green Gain
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 31h 38h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Dark..Bright

- id: vcp_set_color_blue
  label: VCP-00-1A Color Temperature Blue Gain
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 31h 41h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Dark..Bright

- id: vcp_set_clock
  label: VCP-00-0E Clock
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 30h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100

- id: vcp_set_phase
  label: VCP-00-3E Phase
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 33h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100

- id: vcp_set_h_position
  label: VCP-00-20 H.Position (VGA)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 32h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Left..Right

- id: vcp_set_v_position
  label: VCP-00-30 V.Position (VGA)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 33h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Bottom..Top

- id: vcp_set_h_resolution
  label: VCP-02-50 H.Resolution
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 35h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: 0000h..FFFFh 16-bit unsigned

- id: vcp_set_v_resolution
  label: VCP-02-51 V.Resolution
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 35h 31h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: 0000h..FFFFh 16-bit unsigned

- id: vcp_auto_adjust
  label: VCP-00-1E Auto Adjust (VGA)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 31h 45h 30h 30h 30h 31h 03h BCC 0Dh"

- id: vcp_select_input
  label: VCP-00-60 Input Select
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 36h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h VGA(RGB) | 0005h Video1(AV) | 0009h Tuner(US-only) | 000Ch DVD/HD1(VGA YPbPr) | 0011h HDMI1 | 0012h HDMI2 | 0082h HDMI3 | 0087h MP"

- id: vcp_select_input_auto_change
  label: VCP-02-40 Auto Input Change
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 34h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h First | 0002h None | 0004h Custom"

- id: vcp_set_input1_priority
  label: VCP-10-2E Auto Input1 priority
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 32h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h VGA | 0005h Video1(AV) | 000Ch DVD/HD1 | 0011h HDMI1 | 0012h HDMI2 | 0082h HDMI3"

- id: vcp_set_input2_priority
  label: VCP-10-2F Auto Input2 priority
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 32h 46h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: Same set as VCP-10-2E

- id: vcp_set_input3_priority
  label: VCP-10-30 Auto Input3 priority
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 33h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: Same set as VCP-10-2E

- id: vcp_set_picture_mode
  label: VCP-02-1A Picture Mode
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 31h 41h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0003h HighBright | 0004h Standard | 0008h Custom | 0017h Dynamic | 0018h Energy Savings | 001Bh HDR Video | 001Dh Conferencing"

- id: vcp_set_aspect_ratio
  label: VCP-02-70 Aspect Ratio
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 37h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h NORMAL | 0002h FULL | 0004h ZOOM | 0007h 1:1"

- id: vcp_set_overscan
  label: VCP-02-E3 Overscan
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 45h 33h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h On | 0003h Auto"

- id: vcp_set_dimming
  label: VCP-11-4E Dimming Setting
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 34h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h OFF | 0002h Dynamic Backlight | 0003h Local Dimming (E328 not supported)"

- id: vcp_set_noise_reduction_p1
  label: VCP-02-20 Noise Reduction (page 1)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 32h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h OFF | 0001h Low | 0002h Mid | 0003h High"

- id: vcp_set_noise_reduction_p2
  label: VCP-02-26 Noise Reduction (page 2)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 32h 36h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h OFF | 0001h Low | 0002h Mid | 0003h High"

- id: vcp_set_adaptive_contrast
  label: VCP-02-8D Adaptive Contrast
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 38h 44h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h Low | 0003h Mid | 0004h High"

- id: vcp_set_gamma
  label: VCP-02-68 Gamma
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 36h 38h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Native | 0004h 2.2 | 0008h 2.4 | 0010h HDR-Hybrid Log | 0011h HDR-ST2084(PQ)"

- id: vcp_set_ambient_light
  label: VCP-10-C8 Ambient Light Sensing
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 43h 38h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h On"

- id: vcp_set_color_enhance
  label: VCP-11-EC Color Enhance
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 45h 43h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h Vivid | 0003h Wide"

- id: vcp_set_hdr_mode
  label: VCP-11-E5 HDR Mode
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 45h 35h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0004h Low | 0005h Mid | 0006h High"

- id: vcp_reset_video
  label: VCP-02-CB Reset (Picture/Adjust/Audio/Network/All)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 43h 42h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h All(=Factory Reset) | 0002h Picture | 0003h Adjust | 0004h Audio | 0010h Network"

- id: vcp_set_sound_mode
  label: VCP-10-B2 Sound Mode
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 42h 32h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Standard | 0002h Movie | 0003h Music | 0005h Custom"

- id: vcp_set_balance
  label: VCP-00-93 Balance
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 39h 33h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, To Left..To Right

- id: vcp_set_surround
  label: VCP-02-34 Surround
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 33h 34h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h On"

- id: vcp_set_internal_speakers
  label: VCP-11-BA Internal Speakers
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 42h 41h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h No mean | 0001h Off | 0002h On | 0003h Auto"

- id: vcp_set_audio_input
  label: VCP-02-2E Audio Input
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 32h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Audio1(Audio In) | 0002h Audio2(AV) | 0004h HDMI1 | 0006h TV(US-only) | 000Ah HDMI2 | 000Bh HDMI3 | 000Dh MP"

- id: vcp_set_audio_delay
  label: VCP-10-CB Audio Delay
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 43h 42h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 0..100, Small..Large

- id: vcp_set_audio_source_mts
  label: VCP-02-2C Audio Source (MTS) (US-only)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 32h 43h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h No mean | 0001h main | 0002h sub | 0003h main+sub | 0004h stereo | 0005h mono | 0006h dual | 0007h SAP"

- id: vcp_set_audio_language
  label: VCP-10-B3 Audio Language (US-only)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 42h 33h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0002h English | 0003h Français | 000Ah Español"

- id: vcp_reset_audio
  label: VCP-02-31 Reset Audio Settings
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 33h 31h 30h 30h 30h 31h 03h BCC 0Dh"

- id: vcp_set_language
  label: VCP-00-68 OSD Language
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 36h 38h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h English | 0002h Deutsch (US-tuner not supported) | 0003h Français | 0004h Español"

- id: vcp_set_osd_transparency
  label: VCP-02-B8 OSD Transparency
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 42h 38h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h 30% | 0003h 50% | 0004h 70%"

- id: vcp_set_information_osd
  label: VCP-02-3D Information OSD
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 33h 44h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h Off | 0005h On"

- id: vcp_set_caption_display
  label: VCP-10-84 Caption Display (CC) (US-only)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 38h 34h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h No mean | 0001h Off | 0002h CC1 | 0003h CC2 | 0004h CC3 | 0005h CC4 | 0006h Text1 | 0007h Text2 | 0008h Text3 | 0009h Text4"

- id: vcp_set_digital_captions
  label: VCP-10-A1 Digital Captions (US-only)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 41h 31h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h No mean | 0001h Off | 0002h CS1..0007h CS6"

- id: vcp_set_quick_start
  label: VCP-11-EA Quick Start
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 45h 41h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h On"

- id: vcp_set_cec
  label: VCP-11-76 HDMI CEC
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 37h 36h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h On"

- id: vcp_set_cec_auto_turn_off
  label: VCP-11-77 CEC Auto Turn Off
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 37h 37h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Disable | 0002h Enable"

- id: vcp_set_cec_audio_receiver
  label: VCP-11-78 CEC Audio Receiver
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 37h 38h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Disable | 0002h Enable"

- id: vcp_set_cec_device_list
  label: VCP-11-79 CEC Device List
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 37h 39h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h NO | 0002h YES"

- id: vcp_set_edid
  label: VCP-10-AA EDID Mode
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 41h 41h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Mode 0 | 0002h Mode 1 | 0003h Mode 2"

- id: vcp_set_video_range
  label: VCP-10-40 Video Range (HDMI)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 34h 30h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Expanded Signal | 0002h Raw Signal | 0003h Auto"

- id: vcp_set_vga_mode
  label: VCP-10-8E VGA Mode
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 38h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h RGB | 0002h YPbPr"

- id: vcp_set_key_lock
  label: VCP-00-FB Key Lock Settings
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 30h 46h 42h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h Off | 0001h Mode2 | 0002h Mode1"

- id: vcp_set_ir_lock
  label: VCP-02-3F IR Lock Settings
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 33h 46h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0004h Mode2 | 0005h Mode1"

- id: vcp_set_power_supply
  label: VCP-11-75 Power supply
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 37h 35h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h ON | 0003h OFF"

- id: vcp_set_led_indicator
  label: VCP-02-BE LED Indicator
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 42h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h ON | 0002h OFF"

- id: vcp_set_mute
  label: VCP-11-E9 Mute Settings
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 45h 39h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Audio | 0002h Video | 0003h Audio & Video"

- id: vcp_set_thermal_warning
  label: VCP-11-ED Thermal Warning Message
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 31h 45h 44h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0000h No mean | 0001h Off | 0002h On"

- id: vcp_set_thermal_shutdown
  label: VCP-10-8A Thermal Shutdown
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 38h 41h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h Off | 0002h On"

- id: vcp_set_control_interface
  label: VCP-10-3E Control Interface
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 31h 30h 33h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: string
      description: "0001h RS-232C | 0002h LAN"

- id: vcp_set_monitor_id
  label: VCP-02-3E Monitor ID
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 33h 45h {value} 03h BCC 0Dh"
  params:
    - name: value
      type: integer
      description: 1..100 (0001h..0064h)

- id: vcp_select_temperature_sensor
  label: VCP-02-78 Select Temperature Sensor (set sensor index)
  kind: action
  command: "01h 30h ID 45h 30h 41h 02h 30h 32h 37h 38h 30h 30h 30h {sensor} 03h BCC 0Dh"
  params:
    - name: sensor
      type: string
      description: 'ASCII hex: e.g. "0001" = sensor #1, "0002" = sensor #2, "0003" = sensor #3'

- id: vcp_get_temperature
  label: VCP-02-79 Read Temperature Sensor Value
  kind: query
  command: "01h 30h ID 43h 30h 36h 02h 30h 32h 37h 39h 03h BCC 0Dh"

- id: ctl_save_current_settings
  label: CTL-0C Save Current Settings
  kind: action
  command: "01h 30h ID 41h 30h 34h 02h 30h 43h 03h BCC 0Dh"

- id: ctl_get_timing_report
  label: CTL-07 Get Timing Report
  kind: query
  command: "01h 30h ID 41h 30h 34h 02h 30h 37h 03h BCC 0Dh"

- id: ctl_get_power_status
  label: CTL-01D6 Power Status Read
  kind: query
  command: "01h 30h ID 41h 30h 36h 02h 30h 31h 44h 36h 03h BCC 0Dh"

- id: ctl_power_on
  label: CTL-C203-D6 Power ON
  kind: action
  command: "01h 30h ID 41h 30h 43h 02h 43h 32h 30h 33h 44h 36h 30h 30h 30h 31h 03h BCC 0Dh"

- id: ctl_power_off
  label: CTL-C203-D6 Power OFF
  kind: action
  command: "01h 30h ID 41h 30h 43h 02h 43h 32h 30h 33h 44h 36h 30h 30h 30h 34h 03h BCC 0Dh"

- id: ctl_read_serial_number
  label: CTL-C216 Serial No. Read
  kind: query
  command: "01h 30h ID 41h 30h 36h 02h 43h 32h 31h 36h 03h BCC 0Dh"

- id: ctl_read_model_name
  label: CTL-C217 Model Name Read
  kind: query
  command: "01h 30h ID 41h 30h 36h 02h 43h 32h 31h 37h 03h BCC 0Dh"

- id: ctl_read_mac_address
  label: CTL-C220 MAC Address Read
  kind: query
  command: "01h 30h ID 41h 31h 30h 02h 43h 32h 32h 30h 30h 30h 03h BCC 0Dh"

- id: ctl_read_tv_channel
  label: CTL-C22C Direct TV Channel Read (US-only)
  kind: query
  command: "01h 30h ID 41h 30h 36h 02h 43h 32h 32h 43h 03h BCC 0Dh"

- id: ctl_write_tv_channel
  label: CTL-C22D Direct TV Channel Write (US-only)
  kind: action
  command: "01h 30h ID 41h 31h 32h 02h 43h 32h 32h 44h {MajHi} {MajLo} {MajLHi} {MajLLo} {MinHi} {MinLo} 03h BCC 0Dh"
  params:
    - name: major_channel_high
      type: string
      description: Two ASCII hex digits
    - name: major_channel_low
      type: string
      description: Two ASCII hex digits
    - name: minor_channel
      type: string
      description: Two ASCII hex digits

- id: ctl_send_ir_code
  label: CTL-C210 Remote Control Data Code via RS-232C
  kind: action
  command: "01h 30h ID 41h 30h 43h 02h 43h 32h 31h 30h 30h 30h {CodeLo} {RepeatHi}{RepeatLo} 03h BCC 0Dh"
  params:
    - name: ir_code_lo
      type: string
      description: 'Two ASCII hex digits - see Notes for full code table'
    - name: repeat_count
      type: string
      description: Two ASCII hex digits (D09~10), repeat times

- id: ctl_read_firmware_version
  label: CTL-CA02 Firmware Version Read
  kind: query
  command: "01h 30h ID 41h 30h 38h 02h 43h 41h 30h 32h 30h 30h 03h BCC 0Dh"

- id: ctl_read_input_name
  label: CTL-CA04-03 Input Name of Designated Terminal Read
  kind: query
  command: "01h 30h ID 41h 30h 41h 02h 43h 41h 30h 34h 30h 33h {terminal} 03h BCC 0Dh"
  params:
    - name: terminal
      type: string
      description: 'Two ASCII hex digits - "01" VGA(RGB), "05" AV, "09" Tuner(US-only), "0C" VGA(YPbPr), "11" HDMI1, "12" HDMI2, "82" HDMI3, "87" MP'

- id: ctl_write_input_name
  label: CTL-CA04-04 Input Name of Designated Terminal Write
  kind: action
  command: "01h 30h ID 41h LEN LEN 02h 43h 41h 30h 34h 30h 34h {terminal} {nameBytes} 03h BCC 0Dh"
  params:
    - name: terminal
      type: string
      description: Two ASCII hex terminal ID per CTL-CA04-03
    - name: name
      type: string
      description: 'Up to 14 characters (max 37 bytes after hex encoding)'

- id: ctl_reset_input_name
  label: CTL-CA04-05 Input Name of Designated Terminal Reset
  kind: action
  command: "01h 30h ID 41h 30h 41h 02h 43h 41h 30h 34h 30h 35h {terminal} 03h BCC 0Dh"
  params:
    - name: terminal
      type: string
      description: 'Two ASCII hex digits - "00" ALL, or one of the per-input IDs'

- id: null_message
  label: NULL Message (response - timeout / unsupported / BCC error / busy)
  kind: query
  command: "01h 30h 30h ID 42h 30h 34h 02h 42h 45h 03h BCC 0Dh"
```

## Feedbacks
```yaml
- id: get_parameter_reply
  type: object
  description: VCP get-reply frame - STX(02h) Result(2B) OpPage(2B) OpCode(2B) Type(2B) MaxValue(4B) CurrentValue(4B) ETX(03h). Result '00'=OK, '01'=unsupported. Type '00'=Set-parameter, '01'=Momentary. 16-bit values encoded as 4 ASCII hex digits.
- id: set_parameter_reply
  type: object
  description: VCP set-reply echoes OpPage/OpCode/Type/MaxValue/RequestedSetting. Result '00'=OK, '01'=unsupported.
- id: power_mode
  type: enum
  values: ["on", "standby", "reserved", "off"]
  description: |
    Power status reply from CTL-01D6. Current value encoding:
    0001h ON, 0002h Stand-by (power save), 0003h Reserved, 0004h OFF.
- id: timing_report
  type: object
  description: CTL-07 reply - Command '4E', SS byte (bit7=out-of-range/no-signal, bit6=unstable, bit1=H-sync polarity, bit0=V-sync polarity), H Freq (0.01 kHz), V Freq (0.01 Hz). 4-digit 16-bit hex per value.
- id: serial_number
  type: string
  description: CTL-C216 reply - C316 + hex-encoded ASCII serial (max 30 bytes), no null terminator.
- id: model_name
  type: string
  description: CTL-C217 reply - C317 + hex-encoded ASCII model name (max 36 bytes), no null terminator.
- id: mac_address
  type: string
  description: CTL-C220 reply - C320 + hex-encoded ASCII MAC (max 12 bytes).
- id: tv_channel
  type: object
  description: CTL-C22C reply - C32C + Major High(2B) + Major Low(2B) + Minor(2B), all hex-encoded.
- id: firmware_version
  type: string
  description: CTL-CA02 reply - CB02 + Result(00=OK/01=Error) + Type(00=F/W revision) + 8-byte ASCII: R, Major, '.', Minor1, Minor2, Minor3, Branch1, Branch2 (e.g. "R1.001AA").
- id: input_name_terminal
  type: string
  description: CTL-CA04-03 reply - CB04/03 + Result + Terminal + hex-encoded ASCII input name (max 14 actual chars, 39 encoded bytes).
- id: input_name_write_status
  type: string
  description: CTL-CA04-04 reply - CB04/04 + Result '00'=OK or '01'=Error.
- id: input_name_reset_status
  type: string
  description: CTL-CA04-05 reply - CB04/05 + Result '00'=OK or '01'=Error.
- id: temperature_value
  type: integer
  description: VCP-02-79 reply - 16-bit 2's-complement reading, scale 0.5 degC/bit; range approx -55.0..+125.0 C (encoded FFFFh..00FAh).
- id: command_reply_generic
  type: object
  description: Generic CTL command-reply frame echoes the issued command code followed by command-specific data.
- id: null_message
  type: object
  description: NULL message (42h 45h) returned on timeout (default 10s), unsupported message type, BCC error, busy, or no-answer. Some operations (Power ON/OFF, Auto Setup, Input, PIP Input, Auto Setup, Factory Reset) return NULL when called while already executing.
```

## Variables
```yaml
# UNRESOLVED: source documents settable VCP parameters as Actions above; no separate
# "variable" abstraction beyond VCP get/set is defined. Leave section empty.
```

## Events
```yaml
# UNRESOLVED: source describes NULL message semantics (timeout, busy, BCC error) but
# does not define a separate unsolicited-event channel. NULL is a reply, not a push.
```

## Macros
```yaml
# Documented multi-step procedure (per §6.1): Get current value -> Set new value -> Save Current Settings.
- id: change_backlight
  label: Change and store Backlight setting (§6.1)
  steps:
    - "1. VCP get-parameter OpPage 00 / OpCode 10 (backlight) -> note returned MaxValue (typically 0064h) and CurrentValue."
    - "2. VCP set-parameter OpPage 00 / OpCode 10 with desired 16-bit value."
    - "3. Optionally re-query with step 1 to confirm."
    - "4. CTL-0C Save Current Settings to commit."
- id: read_temperature_sensor
  label: Read built-in temperature sensor (§6.2)
  steps:
    - "1. Set-parameter OpPage 02 / OpCode 78 to select temperature sensor (01h..03h)."
    - "2. Set-parameter reply returns the sensor-count Max and the selected sensor index."
    - "3. Get-parameter OpPage 02 / OpCode 79 to request current temperature."
    - "4. Decode 16-bit 2's-complement value; scale 0.5 degC/bit."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or hazardous-
# voltage/electrical-hazard procedures. Section remains empty.
```

## Notes
- Frame anatomy (each request/reply): `01h 30h DestId Src 30h 30h MsgLen [STX Msg ETX] BCC 0Dh`. Source-of-controller side sets Src=`0` (30h). Replies swap the two IDs.
- ID encoding: Monitor IDs 1..100 map to ASCII chars per §4.1.1 table (e.g. ID 1 -> 'A'=41h). Group IDs A..J map to '1'..':'. Use `*` (2Ah) as broadcast.
- BCC = XOR of bytes from D1 through the last byte before BCC (the inclusive range that spans Reserved, Dest, Src, Type, Len, STX, payload, ETX). See §4.3.1 worked example resulting in 77h for the Set Backlight=80 packet.
- Inter-command spacing: ≥ 600 ms on both RS-232C and LAN.
- LAN idle disconnect: monitor drops the TCP socket after 15 minutes of no traffic; controller must reconnect.
- Default LAN addressing: DHCP-on; static requires the monitor's Network Settings menu. Port 7142 is fixed.
- IR-passthrough codes for CTL-C210 (`D05~06=D07~08`, low byte): 1D=PICTURE, 29=ASPECT, 43=SOUND, 08..12,0C..10,44=0..9/DASH, 19=INFO, 20=MENU, 1F=EXIT, 15/14/21/22/23=UP/DOWN/LEFT/RIGHT/OK, 17/16=VOL+/-, 33/32=CH+/-, 1B=MUTE, 27=FREEZE, 2C=CC, 1A=MTS. High byte D05~06=00.
- VCP/CTL coverage rule: the §8 OSD↔command map lists several commands marked N/A for this model (Schedule, Sleep Timer, Network settings, USB media, Signal Info, 120Hz/500Hz/1.5kHz/5kHz/10kHz EQ, Visually Impaired, TTS, Parental Controls, RRT5, Digital CC style options, HPD Delay). Those are intentionally not enumerated above.
- Power-mode reply notes: code 0002h is "Stand-by (power save)" — distinct from IR power off (0004h). Sending 0002h or 0003h via C203-D6 is documented as "Do not set".
<!-- UNRESOLVED: VCP set-parameter frames use ASCII-hex encoding throughout (4 hex chars per 16-bit value, 2 hex chars per byte). Commands that source-spec markers leave as straight numeric ranges (e.g. VCP-02-50 H.Resolution 0000h..FFFFh) were emitted as hex-string params; downstream code must split into 4 ASCII bytes. -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-09-02T17:40:03.542Z
last_checked_at: 2026-09-19T22:17:50.511Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-19T22:17:50.511Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec actions trace to VCP/CTL commands documented in source §5.5, §7, and §8 OSD table; transport values match §3 verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "chapter 8 OSD↔command map references features (e.g. schedules, network settings, signal info) marked N/A — those commands are not documented in this source and are intentionally omitted."
- "source documents settable VCP parameters as Actions above; no separate"
- "source describes NULL message semantics (timeout, busy, BCC error) but"
- "source contains no explicit safety warnings, interlocks, or hazardous-"
- "VCP set-parameter frames use ASCII-hex encoding throughout (4 hex chars per 16-bit value, 2 hex chars per byte). Commands that source-spec markers leave as straight numeric ranges (e.g. VCP-02-50 H.Resolution 0000h..FFFFh) were emitted as hex-string params; downstream code must split into 4 ASCII bytes."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
