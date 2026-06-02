---
spec_id: admin/cisco-precisionhd-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco PrecisionHD Series Camera Control Spec"
manufacturer: Cisco
model_family: "PrecisionHD Camera 1080p12x"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "PrecisionHD Camera 1080p12x"
    - "PrecisionHD Camera 1080p4x"
    - "PrecisionHD Camera 1080p2.5x"
    - "Precision 40 Camera"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
  - manualshelf.com
  - tzmc.us
  - dekom.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/camera/precisionhd/user_guide/precisionhd_1080p-720p_camera_user_guide.pdf
  - https://www.manualshelf.com/manual/cisco/telepresence-precisionhd-1080p-12x/user-guide-english.html
  - http://tzmc.us/cisco/end_points/edge/precisionhd_1080p-720p_camera_user_guide.pdf
  - https://www.cisco.com/c/en/us/support/collaboration-endpoints/telepresence-precisionhd-cameras/products-user-guide-list.html
  - https://www.dekom.com/fileadmin/Vidowawi/precisionhd-1080p-720p_camera_user_guide_tc40_04_L01.pdf
retrieved_at: 2026-05-14T15:10:26.520Z
last_checked_at: 2026-06-02T00:53:56.289Z
generated_at: 2026-06-02T00:53:56.289Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model applicability of asterisk-marked commands is in the source but not encoded per action."
  - "no input routing commands in source"
  - "no volume/gain control in source"
  - "no discrete settable parameters beyond action commands; raw positions"
  - "no multi-step sequences described in source."
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "firmware version compatibility ranges not stated in source. Per-model applicability of asterisk-marked commands is not encoded per action (one source flag, many models)."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:53:56.289Z
  matched_actions: 94
  action_count: 94
  confidence: medium
  summary: "All 94 spec actions have literal matches in source; transport parameters verified; comprehensive coverage of command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Cisco PrecisionHD Series Camera Control Spec

## Summary
VISCA-protocol RS-232 control for Cisco PrecisionHD camera family (1080p12x, 1080p4x, 1080p2.5x, Precision 40). Binary packet protocol, codec as host on address 0x81, camera replies on 0x90. Default 9600 8N1 no flow control; speed switchable to 115200.

<!-- UNRESOLVED: per-model applicability of asterisk-marked commands is in the source but not encoded per action. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; 115200 also supported via CAM_Speed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from Power_On / Power_Off commands
- queryable  # inferred from inquiry commands
- routable   # UNRESOLVED: no input routing commands in source
- levelable  # UNRESOLVED: no volume/gain control in source
```

## Actions
```yaml
# Network and interface
- id: if_clear
  label: IF_Clear
  kind: action
  command: "8x 01 00 01 ff"
  params: []
- id: address_set
  label: Address_Set
  kind: action
  command: "8x 30 0p ff"
  params:
    - name: p
      type: integer
      description: New address for this device (broadcast x=8 increments p before sending)
- id: command_cancel
  label: Command_Cancel
  kind: action
  command: "8x 2p ff"
  params:
    - name: p
      type: integer
      description: Socket ID. Not supported on PrecisionHD 1080p 12x.

# Camera control
- id: power_on
  label: Power_On
  kind: action
  command: "8x 01 04 00 02 ff"
  params: []
- id: power_off
  label: Power_Off
  kind: action
  command: "8x 01 04 00 03 ff"
  params: []
- id: video_format
  label: Video_Format
  kind: action
  command: "8x 01 35 0p 0q 0r ff"
  params:
    - name: p
      type: integer
      description: Reserved
    - name: q
      type: integer
      description: Video mode (see DIP/Video mode table)
    - name: r
      type: integer
      description: Used in PrecisionHD 720p; recyclable
- id: wb_auto
  label: WB_Auto
  kind: action
  command: "8x 01 04 35 00 ff"
  params: []
- id: wb_table_manual
  label: WB_Table_Manual
  kind: action
  command: "8x 01 04 35 06 ff"
  params: []
- id: wb_table_direct
  label: WB_Table_Direct
  kind: action
  command: "8x 01 04 75 0p 0q 0r 0s ff"
  params:
    - name: pqrs
      type: integer
      description: WB table index
- id: ae_auto
  label: AE_Auto
  kind: action
  command: "8x 01 04 39 00 ff"
  params: []
- id: ae_manual
  label: AE_Manual
  kind: action
  command: "8x 01 04 39 03 ff"
  params: []
- id: iris_direct
  label: Iris_Direct
  kind: action
  command: "8x 01 04 4B 0p 0q 0r 0s ff"
  params:
    - name: pqrs
      type: integer
      description: Iris position 0..50 (requires AE=Manual)
- id: gain_direct
  label: Gain_Direct
  kind: action
  command: "8x 01 04 4c 0p 0q 0r 0s ff"
  params:
    - name: pqrs
      type: integer
      description: Gain position 12..21 dB (requires AE=Manual)
- id: backlight_on
  label: Backlight_On
  kind: action
  command: "8x 01 04 33 02 ff"
  params: []
- id: backlight_off
  label: Backlight_Off
  kind: action
  command: "8x 01 04 33 03 ff"
  params: []
- id: mirror_on
  label: Mirror_On
  kind: action
  command: "8x 01 04 61 02 ff"
  params: []
- id: mirror_off
  label: Mirror_Off
  kind: action
  command: "8x 01 04 61 03 ff"
  params: []
- id: flip_on
  label: Flip_On
  kind: action
  command: "8x 01 04 66 02 ff"
  params: []
- id: flip_off
  label: Flip_Off
  kind: action
  command: "8x 01 04 66 03 ff"
  params: []
- id: gamma_auto
  label: Gamma_Auto
  kind: action
  command: "8x 01 04 51 02 ff"
  params: []
- id: gamma_manual
  label: Gamma_Manual
  kind: action
  command: "8x 01 04 51 03 ff"
  params: []
- id: gamma_direct
  label: Gamma_Direct
  kind: action
  command: "8x 01 04 52 0p 0q 0r 0s ff"
  params:
    - name: pqrs
      type: integer
      description: Gamma table 0..7
- id: mm_detect_on
  label: MM_Detect_On
  kind: action
  command: "8x 01 50 30 01 ff"
  params: []
- id: mm_detect_off
  label: MM_Detect_Off
  kind: action
  command: "8x 01 50 30 00 ff"
  params: []
- id: call_led_on
  label: Call_LED_On
  kind: action
  command: "8x 01 33 01 01 ff"
  params: []
- id: call_led_off
  label: Call_LED_Off
  kind: action
  command: "8x 01 33 01 00 ff"
  params: []
- id: call_led_blink
  label: Call_LED_Blink
  kind: action
  command: "8x 01 33 01 02 ff"
  params: []
- id: power_led_on
  label: Power_LED_On
  kind: action
  command: "8x 01 33 02 01 ff"
  params: []
- id: power_led_off
  label: Power_LED_Off
  kind: action
  command: "8x 01 33 02 00 ff"
  params: []
- id: ir_output_on
  label: IR_Output_On
  kind: action
  command: "8x 01 06 08 02 ff"
  params: []
- id: ir_output_off
  label: IR_Output_Off
  kind: action
  command: "8x 01 06 08 03 ff"
  params: []
- id: ir_camera_control_on
  label: IR_CameraControl_On
  kind: action
  command: "8x 01 06 09 02 ff"
  params: []
- id: ir_camera_control_off
  label: IR_CameraControl_Off
  kind: action
  command: "8x 01 06 09 03 ff"
  params: []

# PTZF movement
- id: zoom_stop
  label: Zoom_Stop
  kind: action
  command: "8x 01 04 07 00 ff"
  params: []
- id: zoom_tele
  label: Zoom_Tele
  kind: action
  command: "8x 01 04 07 2p ff"
  params:
    - name: p
      type: string
      description: Speed, hex digit 0..F (a=low, b=high in source; full 0..F range assumed)
- id: zoom_wide
  label: Zoom_Wide
  kind: action
  command: "8x 01 04 07 3p ff"
  params:
    - name: p
      type: string
      description: Speed, hex digit 0..F
- id: zoom_direct
  label: Zoom_Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s ff"
  params:
    - name: pqrs
      type: integer
      description: Zoom position
- id: zoom_focus_direct
  label: ZoomFocus_Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w ff"
  params:
    - name: pqrs
      type: integer
      description: Zoom position
    - name: tuvw
      type: integer
      description: Focus position
- id: focus_stop
  label: Focus_Stop
  kind: action
  command: "8x 01 04 08 00 ff"
  params: []
- id: focus_far
  label: Focus_Far
  kind: action
  command: "8x 01 04 08 2p ff"
  params:
    - name: p
      type: string
      description: Speed, hex digit 0..F
- id: focus_near
  label: Focus_Near
  kind: action
  command: "8x 01 04 08 3p ff"
  params:
    - name: p
      type: string
      description: Speed, hex digit 0..F
- id: focus_direct
  label: Focus_Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s ff"
  params:
    - name: pqrs
      type: integer
      description: Focus position
- id: focus_auto
  label: Focus_Auto
  kind: action
  command: "8x 01 04 38 02 ff"
  params: []
- id: focus_manual
  label: Focus_Manual
  kind: action
  command: "8x 01 04 38 03 ff"
  params: []
- id: pt_stop
  label: PT_Stop
  kind: action
  command: "8x 01 06 01 03 03 03 03 ff"
  params: []
- id: pt_reset
  label: PT_Reset
  kind: action
  command: "8x 01 06 05 ff"
  params: []
- id: pt_up
  label: PT_Up
  kind: action
  command: "8x 01 06 01 0p 0t 03 01 ff"
  params:
    - name: p
      type: string
      description: Pan speed, hex digit
    - name: t
      type: string
      description: Tilt speed, hex digit
- id: pt_down
  label: PT_Down
  kind: action
  command: "8x 01 06 01 0p 0t 03 02 ff"
  params:
    - name: p
      type: string
      description: Pan speed, hex digit
    - name: t
      type: string
      description: Tilt speed, hex digit
- id: pt_left
  label: PT_Left
  kind: action
  command: "8x 01 06 01 0p 0t 01 03 ff"
  params:
    - name: p
      type: string
      description: Pan speed, hex digit
    - name: t
      type: string
      description: Tilt speed, hex digit
- id: pt_right
  label: PT_Right
  kind: action
  command: "8x 01 06 01 0p 0t 02 03 ff"
  params:
    - name: p
      type: string
      description: Pan speed, hex digit
    - name: t
      type: string
      description: Tilt speed, hex digit
- id: pt_up_left
  label: PT_UpLeft
  kind: action
  command: "8x 01 06 01 0p 0t 01 01 ff"
  params:
    - name: p
      type: string
      description: Pan speed, hex digit
    - name: t
      type: string
      description: Tilt speed, hex digit
- id: pt_down_left
  label: PT_DownLeft
  kind: action
  command: "8x 01 06 01 0p 0t 01 02 ff"
  params:
    - name: p
      type: string
      description: Pan speed, hex digit
    - name: t
      type: string
      description: Tilt speed, hex digit
- id: pt_down_right
  label: PT_DownRight
  kind: action
  command: "8x 01 06 01 0p 0t 02 02 ff"
  params:
    - name: p
      type: string
      description: Pan speed, hex digit
    - name: t
      type: string
      description: Tilt speed, hex digit
- id: pt_up_right
  label: PT_UpRight
  kind: action
  command: "8x 01 06 01 0p 0t 02 01 ff"
  params:
    - name: p
      type: string
      description: Pan speed, hex digit
    - name: t
      type: string
      description: Tilt speed, hex digit
- id: pt_direct
  label: PT_Direct
  kind: action
  command: "8x 01 06 02 0p 0t 0q 0r 0s 0u 0v 0w 0x 0y ff"
  params:
    - name: p
      type: string
      description: Max pan speed, hex digit
    - name: t
      type: string
      description: Max tilt speed, hex digit
    - name: qrsu
      type: integer
      description: Pan position
    - name: vwxy
      type: integer
      description: Tilt position
- id: ptzf_direct
  label: PTZF_Direct
  kind: action
  command: "8x 01 06 20 0p 0q 0r 0s 0t 0u 0v 0w 0x 0y 0z 0g 0h 0i 0j 0k ff"
  params:
    - name: pqrs
      type: integer
      description: Pan position
    - name: tuvw
      type: integer
      description: Tilt position
    - name: xyzg
      type: integer
      description: Zoom position
    - name: hijk
      type: integer
      description: Focus position
- id: pt_limit_set
  label: PT_Limit_Set
  kind: action
  command: "8x 01 06 07 00 0x 0p 0q 0r 0s 0t 0u 0v 0w ff"
  params:
    - name: x
      type: integer
      description: 1=Up/Right, 0=Down/Left
    - name: pqrs
      type: integer
      description: Pan limit
    - name: tuvw
      type: integer
      description: Tilt limit
- id: pt_limit_clear
  label: PT_Limit_Clear
  kind: action
  command: "8x 01 06 07 01 0x ... ff"
  params:
    - name: x
      type: integer
      description: 1=Up/Right, 0=Down/Left
  notes: "Sony specifies several filler bytes after 0x; can be ignored."

# Software upload
- id: sw_start
  label: SW start
  kind: action
  command: "8x 01 50 a2 0p 0q 0r 0s 0t 0u 0v 0w ff"
  params:
    - name: pqrstuvw
      type: integer
      description: Size, pq=LSB
- id: sw_end
  label: SW end
  kind: action
  command: "8x 01 50 a1 ff"
  params: []
- id: sw_abort
  label: SW abort
  kind: action
  command: "8x 01 50 a3 ff"
  params: []
- id: sw_packet
  label: SW packet
  kind: action
  command: "8x a0 pp qq rr ss [256 bytes data] ff"
  params:
    - name: ppqq
      type: integer
      description: 16-bit packet id, pp=LSB. Starts at 0.
    - name: rrss
      type: integer
      description: 16-bit XModem CRC, rr=LSB
    - name: data
      type: string
      description: 256 bytes raw data; pad last packet with 0x00
- id: cam_pingpong_reset
  label: CAM_PingPong_Reset
  kind: action
  command: "8x ae ff"
  params: []
- id: cam_ping
  label: CAM_Ping
  kind: action
  command: "8x af 0p 0q 0r 0s [256 bytes data] ff"
  params:
    - name: pqrs
      type: integer
      description: Pingval
    - name: data
      type: string
      description: 256 bytes
- id: cam_stdin
  label: CAM_Stdin
  kind: action
  command: "8x a4 [0-256 bytes stdin] 00 ff"
  params:
    - name: stdin
      type: string
      description: 0..256 bytes for the command interpreter
- id: cam_debug_mode
  label: CAM_Debug_Mode
  kind: action
  command: "8x 01 39 0q ff"
  params:
    - name: q
      type: integer
      description: 0=off, 1=on

# Other
- id: cam_boot
  label: CAM_Boot
  kind: action
  command: "8x 01 42 ff"
  params: []
- id: cam_speed
  label: CAM_Speed
  kind: action
  command: "8x 01 34 0p ff"
  params:
    - name: p
      type: integer
      description: 0=9600 baud, 1=115200 baud

# Inquiries
- id: cam_id_inq
  label: CAM_ID_Inq
  kind: query
  command: "8x 09 04 22 ff"
  params: []
- id: cam_swid_inq
  label: CAM_SWID_Inq
  kind: query
  command: "8x 09 04 23 ff"
  params: []
- id: cam_hwid_inq
  label: CAM_HWID_Inq
  kind: query
  command: "8x 09 04 24 ff"
  params: []
- id: zoom_pos_inq
  label: Zoom_Pos_Inq
  kind: query
  command: "8x 09 04 47 ff"
  params: []
- id: focus_pos_inq
  label: Focus_Pos_Inq
  kind: query
  command: "8x 09 04 48 ff"
  params: []
- id: focus_mode_inq
  label: Focus_Mode_Inq
  kind: query
  command: "8x 09 04 38 ff"
  params: []
- id: pan_tilt_pos_inq
  label: PanTilt_Pos_Inq
  kind: query
  command: "8x 09 06 12 ff"
  params: []
- id: power_inq
  label: Power_Inq
  kind: query
  command: "8x 09 04 00 ff"
  params: []
- id: wb_mode_inq
  label: WB_Mode_Inq
  kind: query
  command: "8x 09 04 35 ff"
  params: []
- id: wb_table_inq
  label: WB_Table_Inq
  kind: query
  command: "8x 09 04 75 ff"
  params: []
- id: ae_mode_inq
  label: AE_Mode_Inq
  kind: query
  command: "8x 09 04 39 ff"
  params: []
- id: backlight_mode_inq
  label: Backlight_Mode_Inq
  kind: query
  command: "8x 09 04 33 ff"
  params: []
- id: mirror_inq
  label: Mirror_Inq
  kind: query
  command: "8x 09 04 61 ff"
  params: []
- id: flip_inq
  label: Flip_Inq
  kind: query
  command: "8x 09 04 66 ff"
  params: []
- id: gamma_mode_inq
  label: Gamma_Mode_Inq
  kind: query
  command: "8x 09 04 51 ff"
  params: []
- id: gamma_table_inq
  label: Gamma_Table_Inq
  kind: query
  command: "8x 09 04 52 ff"
  params: []
- id: call_led_inq
  label: Call_LED_Inq
  kind: query
  command: "8x 09 01 33 01 ff"
  params: []
- id: power_led_inq
  label: Power_LED_Inq
  kind: query
  command: "8x 09 01 33 02 ff"
  params: []
- id: video_system_inq
  label: Video_System_Inq
  kind: query
  command: "8x 09 06 23 ff"
  params: []
- id: dip_switch_inq
  label: DIP_Switch_Inq
  kind: query
  command: "8x 09 06 24 ff"
  params: []
- id: ir_output_inq
  label: IR_Output_Inq
  kind: query
  command: "8x 09 06 08 ff"
  params: []
- id: als_rgain_inq
  label: ALS_RGain_Inq
  kind: query
  command: "8x 09 50 50 ff"
  params: []
- id: als_bgain_inq
  label: ALS_BGain_Inq
  kind: query
  command: "8x 09 50 51 ff"
  params: []
- id: als_ggain_inq
  label: ALS_GGain_Inq
  kind: query
  command: "8x 09 50 52 ff"
  params: []
- id: als_wgain_inq
  label: ALS_WGain_Inq
  kind: query
  command: "8x 09 50 53 ff"
  params: []
- id: up_side_down_inq
  label: Up side down_Inq
  kind: query
  command: "8x 09 50 70 ff"
  params: []
```

## Feedbacks
```yaml
- id: completion
  label: Completion
  type: enum
  values: [ok]
  packet: "90 5Y FF"  # Y = socket number; PrecisionHD 1080p Y always 0
- id: error_message_length
  label: Error - Message Length
  type: flag
  packet: "90 6Y 01 FF"
- id: error_syntax
  label: Error - Syntax
  type: flag
  packet: "90 6Y 02 FF"
- id: error_buffer_full
  label: Error - Command Buffer Full
  type: flag
  packet: "90 6Y 03 FF"
- id: error_cancelled
  label: Error - Command Cancelled
  type: flag
  packet: "90 6Y 04 FF"
- id: error_no_socket
  label: Error - No Socket
  type: flag
  packet: "90 6Y 05 FF"
- id: error_not_executable
  label: Error - Command Not Executable
  type: flag
  packet: "90 6Y 41 FF"
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  source: power_inq  # p=2: On, p=3: Off
- id: focus_mode
  label: Focus Mode
  type: enum
  values: [auto, manual]
  source: focus_mode_inq  # p=2: Auto, p=3: Manual
- id: wb_mode
  label: WB Mode
  type: enum
  values: [auto, table_manual]
  source: wb_mode_inq  # p=0: Auto, p=6: Table manual
- id: ae_mode
  label: AE Mode
  type: enum
  values: [auto, manual]
  source: ae_mode_inq  # p=0: Auto, p=3: Manual
- id: backlight_mode
  label: Backlight Mode
  type: enum
  values: [on, off, auto]
  source: backlight_mode_inq  # p=2: On, p=3: Off, p=4: Auto
- id: gamma_mode
  label: Gamma Mode
  type: enum
  values: [auto, manual]
  source: gamma_mode_inq
- id: call_led_state
  label: Call LED State
  type: enum
  values: [on, off, blink]
  source: call_led_inq
- id: orientation
  label: Up side down
  type: enum
  values: [upright, upside_down]
  source: up_side_down_inq
- id: network_change_push
  label: Network_Change Push
  type: flag
  packet: "y0 38 FF"  # y = 9 (camera->host)
- id: ir_push
  label: IR_Push
  type: object
  packet: "y0 07 7d 02 gg hh FF"
  fields:
    - name: gg
      description: IR ID
    - name: hh
      description: keycode
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands; raw positions
# (zoom, focus, pan, tilt) are queryable but are typically treated as actions.
```

## Events
```yaml
# Push messages are listed under Feedbacks (network_change_push, ir_push).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements in source. PT_Limit_Set is described as session-only
# (clears on reboot) but that is operational, not safety-critical.
```

## Notes
- Codec (host) sends on address byte 0x81; camera replies on 0x90. Single-camera use typically address 0x81, broadcast 0x88.
- PrecisionHD 1080p supports a single socket only (Y=0 in 0x5Y/0x6Y replies). Command_Cancel should not be used on that model.
- CAM_Speed reply is sent before the baud switch; wait 20 s after OK before sending new commands.
- CAM_Boot resets serial speed back to 9600.
- SW_packet and CAM_PingPong_Reset / CAM_Ping / CAM_Stdin messages must never be routed through Sony cameras (exceed 16 bytes or violate VISCA length).
- PTZF_Direct, CAM_SWID_Inq, SW packet, SW start, SW end, SW abort also exceed 16 bytes and must be placed first in daisy chain.
- Commands marked with `*` in source do not apply to PrecisionHD 1080p4x, 1080p2.5x, or Precision 40.
- PrecisionHD 720p commands are documented in a separate MXP Reference User Guide for System Integrators.
- Wait 9 s after receiving Network_Change push before full reconfigure.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source. Per-model applicability of asterisk-marked commands is not encoded per action (one source flag, many models). -->

## Provenance

```yaml
source_domains:
  - cisco.com
  - manualshelf.com
  - tzmc.us
  - dekom.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/camera/precisionhd/user_guide/precisionhd_1080p-720p_camera_user_guide.pdf
  - https://www.manualshelf.com/manual/cisco/telepresence-precisionhd-1080p-12x/user-guide-english.html
  - http://tzmc.us/cisco/end_points/edge/precisionhd_1080p-720p_camera_user_guide.pdf
  - https://www.cisco.com/c/en/us/support/collaboration-endpoints/telepresence-precisionhd-cameras/products-user-guide-list.html
  - https://www.dekom.com/fileadmin/Vidowawi/precisionhd-1080p-720p_camera_user_guide_tc40_04_L01.pdf
retrieved_at: 2026-05-14T15:10:26.520Z
last_checked_at: 2026-06-02T00:53:56.289Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:53:56.289Z
matched_actions: 94
action_count: 94
confidence: medium
summary: "All 94 spec actions have literal matches in source; transport parameters verified; comprehensive coverage of command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model applicability of asterisk-marked commands is in the source but not encoded per action."
- "no input routing commands in source"
- "no volume/gain control in source"
- "no discrete settable parameters beyond action commands; raw positions"
- "no multi-step sequences described in source."
- "no explicit safety warnings, interlock procedures, or power-on"
- "firmware version compatibility ranges not stated in source. Per-model applicability of asterisk-marked commands is not encoded per action (one source flag, many models)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
