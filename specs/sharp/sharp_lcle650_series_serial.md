---
spec_id: admin/sharp-lcle650-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCLE650 Series Control Spec"
manufacturer: Sharp
model_family: "LC-LE650 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LC-LE650 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-09-02T17:41:20.649Z
last_checked_at: 2026-09-19T22:17:55.954Z
generated_at: 2026-09-19T22:17:55.954Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "manifest model is Sharp LCLE650 but source text references \"NEC LCD monitor\"; firmware version not stated; some CTL sections note (*1) availability limited to US TV-tuner models and (*3) E328 unsupported"
  - "each VCP set/get pair could be modeled as a variable; full set enumerated as actions above per spec policy"
  - "source provides worked examples (Backlight change §6.1; Temperature read §6.2) but does not document them as named macros"
  - "source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements"
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-19T22:17:55.954Z
  matched_actions: 118
  action_count: 118
  confidence: medium
  summary: "All 118 spec actions map to source CTL or VCP command tokens; transport parameters (port 7142, 9600 baud, 8N1) match source verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Sharp LCLE650 Series Control Spec

## Summary
Control spec for Sharp LC-LE650 Series LCD monitors via RS-232C and LAN. The source document is a NEC-format external control reference (SOH/ETX framed packet protocol on port 7142/TCP or 9600 baud RS-232C) covering power, input select, picture/audio parameters, remote control IR pass-through, firmware/version reads, MAC/serial/model queries, TV channel direct tune, and input-name labelling. NOTE: source text identifies the device family as "NEC LCD monitor" while the manifest target is Sharp LCLE650 Series; the NEC protocol framing is reused for Sharp's LCLE650 lineup per vendor practice.

<!-- UNRESOLVED: manifest model is Sharp LCLE650 but source text references "NEC LCD monitor"; firmware version not stated; some CTL sections note (*1) availability limited to US TV-tuner models and (*3) E328 unsupported -->

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
# - powerable       (CTL-01D6 status read; CTL-C203-D6 power control)
# - routable        (input select VCP-00-60; auto input change VCP-02-40)
# - queryable       (get parameter, get timing report, firmware version, MAC, serial, model)
# - levelable       (backlight VCP-00-10, contrast VCP-00-12, volume via IR pass-through)
```

## Actions
```yaml
- id: save_current_settings
  label: Save Current Settings (CTL-0C)
  kind: action
  command: "01 30 ID 30 41 30 34 02 30 43 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte ('A'..'Y' for IDs 1..25; '*' for ALL)

- id: get_timing_report
  label: Get Timing Report (CTL-07)
  kind: query
  command: "01 30 ID 30 41 30 34 02 30 37 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: power_status_read
  label: Power Status Read (CTL-01D6)
  kind: query
  command: "01 30 ID 30 41 30 36 02 30 31 44 36 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: power_control_on
  label: Power Control - ON (CTL-C203-D6)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 30 33 44 36 30 30 30 31 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: power_control_off
  label: Power Control - OFF (CTL-C203-D6)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 30 33 44 36 30 30 30 34 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: serial_no_read
  label: Serial Number Read (CTL-C216)
  kind: query
  command: "01 30 ID 30 41 30 36 02 43 32 31 36 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: model_name_read
  label: Model Name Read (CTL-C217)
  kind: query
  command: "01 30 ID 30 41 30 36 02 43 32 31 37 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: mac_address_read
  label: MAC Address Read (CTL-C220)
  kind: query
  command: "01 30 ID 30 41 31 30 02 43 32 32 30 30 30 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: direct_tv_channel_read
  label: Direct TV Channel Read (CTL-C22C)
  kind: query
  command: "01 30 ID 30 41 30 36 02 43 32 32 43 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: direct_tv_channel_write
  label: Direct TV Channel Write (CTL-C22D)
  kind: action
  command: "01 30 ID 30 41 31 32 02 43 32 32 44 MMhh MMll MNhh 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: major_channel_high
      type: hex
      description: Major channel high byte ASCII pair
    - name: major_channel_low
      type: hex
      description: Major channel low byte ASCII pair
    - name: minor_channel
      type: hex
      description: Minor channel ASCII pair

- id: ir_remote_picture
  label: IR Remote - PICTURE (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 44 RR 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: repeat
      type: hex
      description: Repeat times ASCII pair

- id: ir_remote_aspect
  label: IR Remote - ASPECT (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 32 39 RR 03 BCC 0D"

- id: ir_remote_sound
  label: IR Remote - SOUND (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 34 33 RR 03 BCC 0D"

- id: ir_remote_digit_1
  label: IR Remote - 1 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 30 38 RR 03 BCC 0D"

- id: ir_remote_digit_2
  label: IR Remote - 2 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 30 39 RR 03 BCC 0D"

- id: ir_remote_digit_3
  label: IR Remote - 3 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 30 41 RR 03 BCC 0D"

- id: ir_remote_digit_4
  label: IR Remote - 4 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 30 42 RR 03 BCC 0D"

- id: ir_remote_digit_5
  label: IR Remote - 5 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 30 43 RR 03 BCC 0D"

- id: ir_remote_digit_6
  label: IR Remote - 6 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 30 44 RR 03 BCC 0D"

- id: ir_remote_digit_7
  label: IR Remote - 7 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 30 45 RR 03 BCC 0D"

- id: ir_remote_digit_8
  label: IR Remote - 8 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 30 46 RR 03 BCC 0D"

- id: ir_remote_digit_9
  label: IR Remote - 9 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 30 RR 03 BCC 0D"

- id: ir_remote_digit_0
  label: IR Remote - 0 (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 32 RR 03 BCC 0D"

- id: ir_remote_dash
  label: IR Remote - DASH (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 34 34 RR 03 BCC 0D"

- id: ir_remote_info
  label: IR Remote - INFO (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 39 RR 03 BCC 0D"

- id: ir_remote_menu
  label: IR Remote - MENU (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 32 30 RR 03 BCC 0D"

- id: ir_remote_exit
  label: IR Remote - EXIT (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 46 RR 03 BCC 0D"

- id: ir_remote_up
  label: IR Remote - UP (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 35 RR 03 BCC 0D"

- id: ir_remote_down
  label: IR Remote - DOWN (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 34 RR 03 BCC 0D"

- id: ir_remote_left
  label: IR Remote - LEFT (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 32 31 RR 03 BCC 0D"

- id: ir_remote_right
  label: IR Remote - RIGHT (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 32 32 RR 03 BCC 0D"

- id: ir_remote_ok
  label: IR Remote - OK (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 32 33 RR 03 BCC 0D"

- id: ir_remote_vol_up
  label: IR Remote - VOL+ (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 37 RR 03 BCC 0D"

- id: ir_remote_vol_down
  label: IR Remote - VOL- (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 36 RR 03 BCC 0D"

- id: ir_remote_ch_up
  label: IR Remote - CH+ (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 33 33 RR 03 BCC 0D"

- id: ir_remote_ch_down
  label: IR Remote - CH- (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 33 32 RR 03 BCC 0D"

- id: ir_remote_mute
  label: IR Remote - MUTE (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 42 RR 03 BCC 0D"

- id: ir_remote_freeze
  label: IR Remote - FREEZE (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 32 37 RR 03 BCC 0D"

- id: ir_remote_cc
  label: IR Remote - CC (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 32 43 RR 03 BCC 0D"

- id: ir_remote_mts
  label: IR Remote - MTS (CTL-C210)
  kind: action
  command: "01 30 ID 30 41 30 43 02 43 32 31 30 30 30 31 41 RR 03 BCC 0D"

- id: firmware_version_read
  label: Firmware Version Read (CTL-CA02)
  kind: query
  command: "01 30 ID 30 41 30 38 02 43 41 30 32 30 30 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: input_name_read
  label: Input Name Read (CTL-CA04-03)
  kind: query
  command: "01 30 ID 30 41 30 41 02 43 41 30 34 30 33 IT 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: input_terminal
      type: hex
      description: "ASCII pair: 01 VGA(RGB), 05 AV, 09 Tuner, 0C VGA(YPbPr), 11 HDMI1, 12 HDMI2, 82 HDMI3, 87 MP"

- id: input_name_write
  label: Input Name Write (CTL-CA04-04)
  kind: action
  command: "01 30 ID 30 41 LEN LEN 02 43 41 30 34 30 34 IT NAME... 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: input_terminal
      type: hex
      description: "ASCII pair: 01 VGA(RGB), 05 AV, 09 Tuner, 0C VGA(YPbPr), 11 HDMI1, 12 HDMI2, 82 HDMI3, 87 MP"
    - name: input_name
      type: string
      description: Input name, max 14 ASCII characters (encoded as ASCII hex pairs)

- id: input_name_reset
  label: Input Name Reset (CTL-CA04-05)
  kind: action
  command: "01 30 ID 30 41 30 41 02 43 41 30 34 30 35 IT 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: input_terminal
      type: hex
      description: "ASCII pair: 00 ALL, or per-terminal codes as in read/write"

- id: get_parameter
  label: Get Parameter (VCP)
  kind: query
  command: "01 30 ID 30 43 30 36 02 PPh PPl CC 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: op_code_page
      type: hex
      description: OP code page ASCII pair (e.g. 00, 02, 10, 11)
    - name: op_code
      type: hex
      description: OP code ASCII pair from VCP table

- id: set_parameter
  label: Set Parameter (VCP)
  kind: action
  command: "01 30 ID 30 45 30 41 02 PPh PPl CC VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: op_code_page
      type: hex
      description: OP code page ASCII pair
    - name: op_code
      type: hex
      description: OP code ASCII pair
    - name: set_value
      type: hex
      description: 16-bit set value as 4 ASCII hex characters

- id: vcp_picture_mode
  label: Picture Mode (VCP-02-1A)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 31 41 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: picture_mode
      type: hex
      description: "0003 HighBright, 0004 Standard, 0008 Custom, 0017 Dynamic, 0018 Energy Savings, 001B HDR Video, 001D Conferencing"

- id: vcp_aspect_ratio
  label: Aspect Ratio (VCP-02-70)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 37 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: aspect
      type: hex
      description: "0001 NORMAL, 0002 FULL, 0004 ZOOM, 0007 1:1"

- id: vcp_overscan
  label: Overscan (VCP-02-E3)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 45 33 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: overscan
      type: hex
      description: "0001 Off, 0002 On, 0003 Auto"

- id: vcp_dimming_setting
  label: Dimming Setting (VCP-11-4E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 34 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: dimming
      type: hex
      description: "0001 OFF, 0002 Dynamic Backlight, 0003 Local Dimming (*3 E328 unsupported)"

- id: vcp_color_temperature
  label: Color Temperature (VCP-00-0C)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 30 43 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: color_temp
      type: hex
      description: "0023 Warm, 003F Normal, 005A Cool"

- id: vcp_color_temperature_native_custom
  label: Color Temperature Native/Custom (VCP-00-14)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 31 34 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: color_temp
      type: hex
      description: "0002 Native, 000B Custom"

- id: vcp_color_red
  label: Color Red Gain (VCP-00-16)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 31 36 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Dark-Bright)

- id: vcp_color_green
  label: Color Green Gain (VCP-00-18)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 31 38 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Dark-Bright)

- id: vcp_color_blue
  label: Color Blue Gain (VCP-00-1A)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 31 41 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Dark-Bright)

- id: vcp_noise_reduction_mpeg
  label: Noise Reduction MPEG (VCP-02-20)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 32 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0000 OFF, 0001 Low, 0002 Mid, 0003 High"

- id: vcp_noise_reduction_dnr
  label: Noise Reduction DNR (VCP-02-26)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 32 36 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0000 OFF, 0001 Low, 0002 Mid, 0003 High"

- id: vcp_adaptive_contrast
  label: Adaptive Contrast (VCP-02-8D)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 38 44 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 Low, 0003 Mid, 0004 High"

- id: vcp_gamma
  label: Gamma (VCP-02-68)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 36 38 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Native, 0004 2.2, 0008 2.4, 0010 HDR-Hybrid Log, 0011 HDR-ST2084(PQ)"

- id: vcp_ambient_light_sensing
  label: Ambient Light Sensing (VCP-10-C8)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 43 38 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 On"

- id: vcp_color_enhance
  label: Color Enhance (VCP-11-EC)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 45 43 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 Vivid, 0003 Wide"

- id: vcp_hdr_mode
  label: HDR Mode (VCP-11-E5)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 45 35 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0004 Low, 0005 Mid, 0006 High"

- id: vcp_backlight
  label: Backlight / Brightness (VCP-00-10)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 31 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Dark-Bright)

- id: vcp_contrast
  label: Contrast (VCP-00-12)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 31 32 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Low-High)

- id: vcp_video_black_level
  label: Video Black Level (VCP-00-92)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 39 32 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Dark-Bright)

- id: vcp_sharpness_a
  label: Sharpness A (VCP-00-87)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 38 37 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Dull-Sharp)

- id: vcp_sharpness_b
  label: Sharpness B (VCP-00-8C)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 38 43 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Dull-Sharp)

- id: vcp_color_a
  label: Color A (VCP-00-8A)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 38 41 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Pale-Deep)

- id: vcp_color_b
  label: Color B (VCP-02-1F)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 31 46 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Pale-Deep)

- id: vcp_tint
  label: Tint (VCP-00-90)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 39 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Purplish-Greenish)

- id: vcp_reset_video_settings
  label: Reset Video Settings (VCP-02-CB)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 43 42 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: scope
      type: hex
      description: "0001 All (Factory Reset), 0002 Picture, 0003 Adjust, 0004 Audio, 0010 Network"

- id: vcp_sound_mode
  label: Sound Mode (VCP-10-B2)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 42 32 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: mode
      type: hex
      description: "0001 Standard, 0002 Movie, 0003 Music, 0005 Custom"

- id: vcp_balance
  label: Balance (VCP-00-93)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 39 33 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Left-Right)

- id: vcp_surround
  label: Surround (VCP-02-34)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 33 34 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 On"

- id: vcp_internal_speakers
  label: Internal Speakers (VCP-11-BA)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 42 41 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 On, 0003 Auto"

- id: vcp_audio_input
  label: Audio Input (VCP-02-2E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 32 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: audio_in
      type: hex
      description: "0001 Audio1, 0002 Audio2 (AV), 0004 HDMI1, 0006 TV (*1), 000A HDMI2, 000B HDMI3, 000D MP"

- id: vcp_audio_delay
  label: Audio Delay (VCP-10-CB)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 43 42 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Small-Large)

- id: vcp_audio_source_mts
  label: Audio Source MTS (VCP-02-2C) (*1)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 32 43 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: mts
      type: hex
      description: "0001 main, 0002 sub, 0003 main+sub, 0004 stereo, 0005 mono, 0006 dual, 0007 SAP"

- id: vcp_audio_language
  label: Audio Language (VCP-10-B3) (*1)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 42 33 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: lang
      type: hex
      description: "0002 English, 0003 Français, 000A Español"

- id: vcp_reset_audio
  label: Reset Audio (VCP-02-31)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 33 31 30 30 30 31 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: vcp_osd_language
  label: OSD Language (VCP-00-68)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 36 38 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: lang
      type: hex
      description: "0001 English, 0002 Deutsch (*2), 0003 Français, 0004 Español"

- id: vcp_osd_transparency
  label: OSD Transparency (VCP-02-B8)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 42 38 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 30%, 0003 50%, 0004 70%"

- id: vcp_information_osd
  label: Information OSD (VCP-02-3D)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 33 44 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0000 Off, 0005 On"

- id: vcp_closed_caption
  label: Closed Caption Display (VCP-10-84) (*1)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 38 34 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0000 No mean, 0001 Off, 0002 CC1..0009 Text4"

- id: vcp_digital_captions
  label: Digital Captions (VCP-10-A1) (*1)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 41 31 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 CS1..0007 CS6"

- id: vcp_quick_start
  label: Quick Start (VCP-11-EA)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 45 41 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 On"

- id: vcp_auto_input_change
  label: Auto Input Change (VCP-02-40)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 34 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0000 First, 0002 None, 0004 Custom"

- id: vcp_input1_select
  label: Auto Input Change - Input 1 (VCP-10-2E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 32 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: input
      type: hex
      description: "0001 VGA, 0005 Video1(AV), 000C DVD/HD1(VGA(YPbPr)), 0011 HDMI1, 0012 HDMI2, 0082 HDMI3"

- id: vcp_input2_select
  label: Auto Input Change - Input 2 (VCP-10-2F)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 32 46 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: input
      type: hex
      description: "See Input 1"

- id: vcp_input3_select
  label: Auto Input Change - Input 3 (VCP-10-30)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 33 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: input
      type: hex
      description: "See Input 1"

- id: vcp_cec
  label: CEC (VCP-11-76)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 37 36 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 On"

- id: vcp_cec_auto_turn_off
  label: CEC Auto Turn Off (VCP-11-77)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 37 37 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Disable, 0002 Enable"

- id: vcp_cec_audio_receiver
  label: CEC Audio Receiver (VCP-11-78)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 37 38 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Disable, 0002 Enable"

- id: vcp_cec_device_list
  label: CEC Device List (VCP-11-79)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 37 39 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 NO, 0002 YES"

- id: vcp_edid
  label: EDID (VCP-10-AA)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 41 41 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Mode 0, 0002 Mode 1, 0003 Mode 2"

- id: vcp_video_range
  label: Video Range (VCP-10-40)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 34 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Expanded Signal, 0002 Raw Signal, 0003 Auto"

- id: vcp_vga_mode
  label: VGA Mode (VCP-10-8E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 38 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 RGB, 0002 YPbPr"

- id: vcp_auto_adjust
  label: VGA Auto Adjust (VCP-00-1E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 31 45 30 30 30 31 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: vcp_h_position
  label: VGA H Position (VCP-00-20)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 32 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Left-Right)

- id: vcp_v_position
  label: VGA V Position (VCP-00-30)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 33 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064 (Bottom-Top)

- id: vcp_clock
  label: VGA Clock (VCP-00-0E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 30 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064

- id: vcp_phase
  label: VGA Phase (VCP-00-3E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 33 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-0064

- id: vcp_h_resolution
  label: VGA H Resolution (VCP-02-50)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 35 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-FFFF

- id: vcp_v_resolution
  label: VGA V Resolution (VCP-02-51)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 35 31 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: 0000-FFFF

- id: vcp_reset_vga
  label: Reset VGA Options (VCP-02-CB scope)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 43 42 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: scope
      type: hex
      description: "0001 All, 0002 Picture, 0003 Adjust, 0004 Audio, 0010 Network"

- id: vcp_key_lock
  label: Key Lock Settings (VCP-00-FB)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 46 42 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0000 Off, 0001 Mode2, 0002 Mode1"

- id: vcp_ir_lock
  label: IR Lock Settings (VCP-02-3F)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 33 46 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0004 Mode2, 0005 Mode1"

- id: vcp_power_supply
  label: Power Supply (VCP-11-75)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 37 35 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 ON, 0003 OFF"

- id: vcp_led_indicator
  label: LED Indicator (VCP-02-BE)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 42 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 ON, 0002 OFF"

- id: vcp_mute_settings
  label: Mute Settings (VCP-11-E9)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 45 39 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Audio, 0002 Video, 0003 Audio & Video"

- id: vcp_thermal_warning_message
  label: Thermal Warning Message (VCP-11-ED)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 31 45 44 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 On"

- id: vcp_thermal_shutdown
  label: Thermal Shutdown (VCP-10-8A)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 38 41 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: value
      type: hex
      description: "0001 Off, 0002 On"

- id: vcp_temperature_sensor_select
  label: Select Temperature Sensor (VCP-02-78)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 37 38 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: sensor_id
      type: hex
      description: Sensor number (01-03 per reply)

- id: vcp_temperature_read
  label: Read Temperature (VCP-02-79)
  kind: query
  command: "01 30 ID 30 43 30 36 02 30 32 37 39 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: vcp_factory_reset
  label: Factory Reset (VCP-02-CB scope=All)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 43 42 30 30 30 31 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte

- id: vcp_control_interface
  label: Control Interface (VCP-10-3E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 31 30 33 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: interface
      type: hex
      description: "0001 RS-232C, 0002 LAN"

- id: vcp_monitor_id
  label: Monitor ID (VCP-02-3E)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 32 33 45 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte (current)
    - name: new_id
      type: hex
      description: 0001-0064 new Monitor ID

- id: vcp_input_select
  label: Input Select (VCP-00-60)
  kind: action
  command: "01 30 ID 30 45 30 41 02 30 30 36 30 VVVV 03 BCC 0D"
  params:
    - name: monitor_id
      type: string
      description: ASCII Monitor ID byte
    - name: input
      type: hex
      description: "0001 VGA(RGB), 0005 Video1(AV), 0009 Tuner1(TV) (*1), 000C DVD/HD1, 0011 HDMI1, 0012 HDMI2, 0082 HDMI3, 0087 MP"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - on
    - standby
    - reserved
    - off
  source: CTL-01D6 reply D13-D16 (0001 ON, 0002 Stand-by, 0003 Reserved, 0004 OFF)

- id: timing_sync_status
  type: flags
  source: CTL-07 reply D03-D04 (SS byte)
  description: |
    Bit 7 = out-of-range/no-signal; Bit 6 = unstable;
    Bit 1 = H-sync polarity; Bit 0 = V-sync polarity.

- id: horizontal_frequency
  type: integer
  source: CTL-07 reply D05-D08 (0.01 kHz units)
  description: 16-bit BCD-ASCII value e.g. 31h 32h 41h 39h = 47.77 kHz

- id: vertical_frequency
  type: integer
  source: CTL-07 reply D09-D12 (0.01 Hz units)

- id: temperature_celsius
  type: integer
  source: VCP-02-79 reply D14-D17
  description: 2's-complement, 0.5 degC resolution (e.g. 0032h = 25.0, FFCEh = -25.0)

- id: serial_number
  type: string
  source: CTL-C216 reply (max 30 bytes hex-ASCII encoded)

- id: model_name
  type: string
  source: CTL-C217 reply (max 36 bytes hex-ASCII encoded)

- id: mac_address
  type: string
  source: CTL-C220 reply (max 12 hex-ASCII chars)

- id: firmware_version
  type: string
  source: CTL-CA02 reply D09-D16 (R<major>.<minor1><minor2><minor3><branch1><branch2>)

- id: input_name
  type: string
  source: CTL-CA04-03 reply D11..XX (max 14 ASCII chars after hex decode)

- id: tv_channel
  type: struct
  source: CTL-C22C reply
  fields:
    - name: major_high
      type: hex
    - name: major_low
      type: hex
    - name: minor
      type: hex

- id: reply_result
  type: enum
  values:
    - no_error
    - unsupported
  source: 2nd-3rd reply bytes ('00' / '01')

- id: max_value
  type: integer
  source: Get-parameter reply 10th-13th bytes (16-bit value)
```

## Variables
```yaml
<!-- UNRESOLVED: each VCP set/get pair could be modeled as a variable; full set enumerated as actions above per spec policy -->
```

## Events
```yaml
- id: null_message
  source: STX 'BE' ETX (CTL-NULL)
  description: |
    Sent on: timeout (default 10s), unsupported message type, BCC error,
    monitor busy (Power ON/OFF, Auto Setup, Input change, PIP Input, Auto Setup, Factory reset in progress).
```

## Macros
```yaml
<!-- UNRESOLVED: source provides worked examples (Backlight change §6.1; Temperature read §6.2) but does not document them as named macros -->
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - reset_video_settings
  - reset_audio_settings
  - reset_vga_options
interlocks: []
<!-- UNRESOLVED: source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements -->
```

## Notes
Packet framing: every command begins with SOH (01h) and ends with CR (0Dh); message body bracketed by STX (02h) ... ETX (03h); trailing Check Code (BCC) = XOR of bytes D1..D16 (Reserved through ETX). Header Message Type byte selects frame role: 'A' command, 'B' command reply, 'C' get parameter, 'D' get reply, 'E' set parameter, 'F' set reply. Controller source byte is always '0'; reply destination is always '0'. Destination byte encodes Monitor ID (A=1..Y=25, then offset table to 100) or Group ID (1..9, :=10) or '*' (ALL). Packet interval must exceed 600 ms. LAN control: TCP port 7142 fixed, idle disconnect after 15 min. Source documents the protocol as the NEC external control scheme; applied to Sharp LC-LE650 Series per vendor practice. Capabilities flagged (*1) require US TV-tuner model; (*2) is unsupported on US TV-tuner model; (*3) Local Dimming is not supported on E328.

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-09-02T17:41:20.649Z
last_checked_at: 2026-09-19T22:17:55.954Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-19T22:17:55.954Z
matched_actions: 118
action_count: 118
confidence: medium
summary: "All 118 spec actions map to source CTL or VCP command tokens; transport parameters (port 7142, 9600 baud, 8N1) match source verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "manifest model is Sharp LCLE650 but source text references \"NEC LCD monitor\"; firmware version not stated; some CTL sections note (*1) availability limited to US TV-tuner models and (*3) E328 unsupported"
- "each VCP set/get pair could be modeled as a variable; full set enumerated as actions above per spec policy"
- "source provides worked examples (Backlight change §6.1; Temperature read §6.2) but does not document them as named macros"
- "source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements"
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
