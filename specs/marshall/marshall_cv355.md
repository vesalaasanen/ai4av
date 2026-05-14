---
spec_id: admin/marshall-cv355-30x-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marshall CV355-30X-IP Control Spec"
manufacturer: Marshall
model_family: CV355-30X-IP
aliases: []
compatible_with:
  manufacturers:
    - Marshall
  models:
    - CV355-30X-IP
    - CV420-30X-IP
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - marshall-usa.com
source_urls:
  - https://www.marshall-usa.com/pdf/CV420-30X_RS232_Commands.pdf
  - https://www.marshall-usa.com/pdf/CV355-30X-IP_Manual_v1-2.pdf
  - https://www.marshall-usa.com/pdf/RS232-Commands.pdf
retrieved_at: 2026-04-30T14:24:28.133Z
last_checked_at: 2026-05-14T18:17:18.110Z
generated_at: 2026-05-14T18:17:18.110Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.110Z
  matched_actions: 130
  action_count: 166
  confidence: high
  summary: "All 130 spec actions matched VISCA and PelcoD source commands; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Marshall CV355-30X-IP Control Spec

## Summary
Marshall Electronics PTZ camera supporting RS-232 serial control and RS232 over IP (VISCA over UDP). Supports half-duplex async serial at 9600/38400 bps, and IP control via UDP on port 52381. No authentication required.

<!-- UNRESOLVED: PelcoD external command list may require separate protocol implementation; not clear if both VISCA and PelcoD can operate simultaneously or if切换 is required -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 9600  # also supported: 38400 bps (selectable via CAM_UART_Baud_Rate command)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 52381  # UDP port for RS232 over IP / VISCA over IP
auth:
  type: none  # inferred: no auth procedure in source
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
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []

- id: zoom_tele_standard
  label: Zoom Tele (Standard)
  kind: action
  params: []

- id: zoom_wide_standard
  label: Zoom Wide (Standard)
  kind: action
  params: []

- id: zoom_tele_variable
  label: Zoom Tele (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)

- id: zoom_wide_variable
  label: Zoom Wide (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)

- id: zoom_direct
  label: Zoom Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Zoom position 0x0000 to 0x4000

- id: zoom_direct_speed_variable
  label: Zoom Direct (Speed Variable)
  kind: action
  params:
    - name: position
      type: integer
      description: Zoom position 0x0000 to 0x4000
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)

- id: zoom_stop
  label: Zoom Stop
  kind: action
  params: []

- id: focus_stop
  label: Focus Stop
  kind: action
  params: []

- id: focus_far_standard
  label: Focus Far (Standard)
  kind: action
  params: []

- id: focus_near_standard
  label: Focus Near (Standard)
  kind: action
  params: []

- id: focus_far_variable
  label: Focus Far (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)

- id: focus_near_variable
  label: Focus Near (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)

- id: focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Focus position 0x00 to 0x47A

- id: focus_auto
  label: Auto Focus
  kind: action
  params: []

- id: focus_manual
  label: Manual Focus
  kind: action
  params: []

- id: focus_one_push_trigger
  label: One Push AF Trigger
  kind: action
  params: []

- id: cam_mirror_on
  label: Mirror Image On
  kind: action
  params: []

- id: cam_mirror_off
  label: Mirror Image Off
  kind: action
  params: []

- id: cam_flip_on
  label: Picture Flip On
  kind: action
  params: []

- id: cam_flip_off
  label: Picture Flip Off
  kind: action
  params: []

- id: cam_rotation_on
  label: Rotation 180° On
  kind: action
  params: []

- id: cam_rotation_off
  label: Rotation 180° Off
  kind: action
  params: []

- id: cam_power_standby
  label: Camera Standby
  kind: action
  params: []

- id: cam_icr_on
  label: ICR On
  kind: action
  params: []

- id: cam_icr_off
  label: ICR Off
  kind: action
  params: []

- id: cam_backlight_on
  label: Back Light Compensation On
  kind: action
  params: []

- id: cam_backlight_off
  label: Back Light Compensation Off
  kind: action
  params: []

- id: cam_wb_auto
  label: White Balance Auto
  kind: action
  params: []

- id: cam_wb_indoor
  label: White Balance Indoor
  kind: action
  params: []

- id: cam_wb_outdoor
  label: White Balance Outdoor
  kind: action
  params: []

- id: cam_wb_one_push_wb
  label: White Balance One Push
  kind: action
  params: []

- id: cam_wb_atw
  label: White Balance ATW
  kind: action
  params: []

- id: cam_wb_manual
  label: White Balance Manual
  kind: action
  params: []

- id: cam_wb_sodium_lamp
  label: White Balance Sodium Lamp
  kind: action
  params: []

- id: cam_wb_one_push_trigger
  label: One Push WB Trigger
  kind: action
  params: []

- id: cam_rgain_up
  label: R Gain Up
  kind: action
  params: []

- id: cam_rgain_down
  label: R Gain Down
  kind: action
  params: []

- id: cam_rgain_direct
  label: R Gain Direct
  kind: action
  params:
    - name: value
      type: integer
      description: R gain 0x00 to 0x80

- id: cam_bgain_up
  label: B Gain Up
  kind: action
  params: []

- id: cam_bgain_down
  label: B Gain Down
  kind: action
  params: []

- id: cam_bgain_direct
  label: B Gain Direct
  kind: action
  params:
    - name: value
      type: integer
      description: B gain 0x00 to 0x80

- id: cam_ae_full_auto
  label: AE Full Auto
  kind: action
  params: []

- id: cam_ae_manual
  label: AE Manual
  kind: action
  params: []

- id: cam_ae_shutter_priority
  label: AE Shutter Priority
  kind: action
  params: []

- id: cam_ae_iris_priority
  label: AE Iris Priority
  kind: action
  params: []

- id: cam_ae_white_board
  label: AE White Board
  kind: action
  params: []

- id: cam_shutter_up
  label: Shutter Up
  kind: action
  params: []

- id: cam_shutter_down
  label: Shutter Down
  kind: action
  params: []

- id: cam_shutter_direct
  label: Shutter Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Shutter position index 0x00 to 0x15 (see AE_Shutter Table)

- id: cam_slowshutter_on
  label: Slow Shutter On
  kind: action
  params: []

- id: cam_slowshutter_off
  label: Slow Shutter Off
  kind: action
  params: []

- id: cam_iris_reset
  label: Iris Reset
  kind: action
  params: []

- id: cam_iris_up
  label: Iris Up
  kind: action
  params: []

- id: cam_iris_down
  label: Iris Down
  kind: action
  params: []

- id: cam_iris_direct
  label: Iris Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Iris position 0x00 to 0x0F (see AE_Iris Table)

- id: cam_iris_limit_min
  label: Iris Limit Min
  kind: action
  params:
    - name: f_number
      type: integer
      description: F number 3 to A

- id: cam_iris_limit_max
  label: Iris Limit Max
  kind: action
  params:
    - name: f_number
      type: integer
      description: F number 3 to A

- id: cam_gain_up
  label: Gain Up
  kind: action
  params: []

- id: cam_gain_down
  label: Gain Down
  kind: action
  params: []

- id: cam_gain_direct
  label: Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Gain position 0x00 to 0x0F (0dB to +45dB)

- id: cam_gain_limit
  label: Gain Limit
  kind: action
  params:
    - name: position
      type: integer
      description: Gain position 3 to F

- id: cam_bright_reset
  label: Bright Reset
  kind: action
  params: []

- id: cam_bright_up
  label: Bright Up
  kind: action
  params: []

- id: cam_bright_down
  label: Bright Down
  kind: action
  params: []

- id: cam_bright_direct
  label: Bright Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Bright position 0x00 to 0x0F

- id: cam_expcomp_on
  label: Exposure Compensation On
  kind: action
  params: []

- id: cam_expcomp_off
  label: Exposure Compensation Off
  kind: action
  params: []

- id: cam_expcomp_up
  label: Exposure Compensation Up
  kind: action
  params: []

- id: cam_expcomp_down
  label: Exposure Compensation Down
  kind: action
  params: []

- id: cam_expcomp_direct
  label: Exposure Compensation Direct
  kind: action
  params:
    - name: position
      type: integer
      description: ExpComp position 0x00 to 0x0A (-5dB to +5dB)

- id: cam_spot_ae_on
  label: Spot AE On
  kind: action
  params: []

- id: cam_spot_ae_off
  label: Spot AE Off
  kind: action
  params: []

- id: cam_spot_ae_position
  label: Spot AE Position
  kind: action
  params:
    - name: x
      type: integer
      description: X axis 0x00 to 0x06 (center 3)
    - name: y
      type: integer
      description: Y axis 0x00 to 0x04 (center 2)

- id: cam_wdr_set
  label: WDR Set
  kind: action
  params:
    - name: mode
      type: integer
      description: WDR mode 0 to 3

- id: cam_aperture_direct
  label: Aperture Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Aperture gain 0x00 to 0x0E

- id: cam_2dnr_mode
  label: 2D NR Mode
  kind: action
  params:
    - name: level
      type: integer
      description: NR level 0 to 3

- id: cam_3dnr_mode
  label: 3D NR Mode
  kind: action
  params:
    - name: level
      type: integer
      description: 0=OFF, 1=Low, 2=Type, 3=Max

- id: cam_gamma_set
  label: Gamma Set
  kind: action
  params:
    - name: value
      type: integer
      description: Gamma 0 to 3

- id: cam_picture_effect_off
  label: Picture Effect Off
  kind: action
  params: []

- id: cam_picture_effect_neg
  label: Picture Effect Neg.Art
  kind: action
  params: []

- id: cam_picture_effect_bw
  label: Picture Effect B&W
  kind: action
  params: []

- id: cam_autoicr_on
  label: Auto ICR On
  kind: action
  params: []

- id: cam_autoicr_off
  label: Auto ICR Off
  kind: action
  params: []

- id: cam_autoicr_threshold
  label: Auto ICR Threshold
  kind: action
  params:
    - name: level
      type: integer
      description: Threshold level 0x00 to 0xFF

- id: cam_memory_reset
  label: Memory Reset (Preset 0-127)
  kind: action
  params:
    - name: number
      type: integer
      description: Memory number 0x00 to 0x7F

- id: cam_memory_set
  label: Memory Set (Preset 0-127)
  kind: action
  params:
    - name: number
      type: integer
      description: Memory number 0x00 to 0x7F

- id: cam_memory_recall
  label: Memory Recall (Preset 0-127)
  kind: action
  params:
    - name: number
      type: integer
      description: Memory number 0x00 to 0x7F

- id: cam_memory_reset_hi
  label: Memory Reset (Preset 128-255)
  kind: action
  params:
    - name: number
      type: integer
      description: Memory number 0x00 to 0x7F (add 128)

- id: cam_memory_set_hi
  label: Memory Set (Preset 128-255)
  kind: action
  params:
    - name: number
      type: integer
      description: Memory number 0x00 to 0x7F (add 128)

- id: cam_memory_recall_hi
  label: Memory Recall (Preset 128-255)
  kind: action
  params:
    - name: number
      type: integer
      description: Memory number 0x00 to 0x7F (add 128)

- id: cam_colorgain_direct
  label: Color Gain Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Color gain 0x00 to 0x0F

- id: cam_colorhue_direct
  label: Color Hue Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Color hue 0x00 to 0x0F

- id: cam_factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: cam_default
  label: Default
  kind: action
  params: []

- id: cam_image_mode_default
  label: Image Mode Default
  kind: action
  params: []

- id: cam_image_mode_custom
  label: Image Mode Custom
  kind: action
  params: []

- id: cam_image_load
  label: Image Mode Load
  kind: action
  params:
    - name: mode
      type: integer
      description: Load image mode default to custom (p=0)

- id: cam_prompt_on
  label: OSD Prompt On
  kind: action
  params: []

- id: cam_prompt_off
  label: OSD Prompt Off
  kind: action
  params: []

- id: cam_flickerless_off
  label: Flickerless Off
  kind: action
  params: []

- id: cam_flickerless_50hz
  label: Flickerless 50Hz
  kind: action
  params: []

- id: cam_flickerless_60hz
  label: Flickerless 60Hz
  kind: action
  params: []

- id: sys_menu_on
  label: Menu On
  kind: action
  params: []

- id: sys_menu_off
  label: Menu Off
  kind: action
  params: []

- id: sys_menu_enter
  label: Menu Enter
  kind: action
  params: []

- id: sys_menu_up
  label: Menu Up
  kind: action
  params: []

- id: sys_menu_down
  label: Menu Down
  kind: action
  params: []

- id: resolution_select
  label: Resolution Select
  kind: action
  params:
    - name: resolution
      type: integer
      description: |
        0x02: QFHD 4K 59.94p | 0x03: QFHD 4K 50p | 0x05: QFHD 4K 29.97p | 0x06: QFHD 4K 25p
        0x08: FHD 1080P 59.94p | 0x09: FHD 1080P 50p | 0x0B: FHD 1080P 29.97p | 0x0C: FHD 1080P 25p
        0x0E: HD 720P 59.94p | 0x0F: HD 720P 50p | 0x11: HD 720P 29.97p | 0x12: HD 720P 25p

- id: hdmi_format_yuv420
  label: HDMI Format YUV420
  kind: action
  params: []

- id: hdmi_format_yuv422
  label: HDMI Format YUV422
  kind: action
  params: []

- id: hdmi_output_range_16_235
  label: HDMI Output Range 16~235
  kind: action
  params: []

- id: hdmi_output_range_1_254
  label: HDMI Output Range 1~254
  kind: action
  params: []

- id: osd_cross_line_on
  label: OSD Cross Line On
  kind: action
  params: []

- id: osd_cross_line_off
  label: OSD Cross Line Off
  kind: action
  params: []

- id: ip_dhcp_on
  label: DHCP On
  kind: action
  params: []

- id: ip_dhcp_off
  label: DHCP Off
  kind: action
  params: []

- id: ip_address_set
  label: IP Address Set
  kind: action
  params:
    - name: ip
      type: string
      description: IPv4 address as 4 hex byte pairs (e.g. "0C 00 0A 08" for 192.168.10.8)

- id: ip_netmask_set
  label: IP Netmask Set
  kind: action
  params:
    - name: netmask
      type: string
      description: Netmask as 4 hex byte pairs

- id: ip_gateway_set
  label: IP Gateway Set
  kind: action
  params:
    - name: gateway
      type: string
      description: Gateway as 4 hex byte pairs

- id: ip_dns_set
  label: IP DNS Set
  kind: action
  params:
    - name: dns
      type: string
      description: DNS as 4 hex byte pairs

- id: cam_audio_on
  label: Audio On
  kind: action
  params: []

- id: cam_audio_off
  label: Audio Off
  kind: action
  params: []

- id: cam_audio_in_type_line
  label: Audio In Type Line
  kind: action
  params: []

- id: cam_audio_in_type_mic
  label: Audio In Type Mic
  kind: action
  params: []

- id: cam_audio_volume
  label: Audio Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume 0x00 to 0x0A

- id: cam_uart_baud_rate_9600
  label: UART Baud Rate 9600
  kind: action
  params: []

- id: cam_uart_baud_rate_38400
  label: UART Baud Rate 38400
  kind: action
  params: []

- id: cam_audio_encode_sample_rate
  label: Audio Encode Sample Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: 0=48KHz AAC, 1=44.1KHz AAC, 2=16KHz AAC, 3=16KHz G.711, 4=8KHz G.711

- id: cam_audio_delay_enable
  label: Audio Delay Enable
  kind: action
  params:
    - name: enable
      type: integer
      description: 2=ON, 3=OFF

- id: cam_audio_delay_time
  label: Audio Delay Time
  kind: action
  params:
    - name: time
      type: integer
      description: Delay time 1 to 500 (hex 0x001 to 0x1F4)

- id: cam_ip_hdmi_hdmi
  label: IP/HDMI Mode HDMI
  kind: action
  params: []

- id: cam_ip_hdmi_hdmi_stream
  label: IP/HDMI Mode HDMI+Stream
  kind: action
  params: []

- id: cam_ip_hdmi_stream
  label: IP/HDMI Mode Stream
  kind: action
  params: []

- id: af_sensitivity_high
  label: AF Sensitivity High
  kind: action
  params: []

- id: af_sensitivity_middle
  label: AF Sensitivity Middle
  kind: action
  params: []

- id: af_sensitivity_low
  label: AF Sensitivity Low
  kind: action
  params: []

- id: af_frame_auto
  label: AF Frame Auto
  kind: action
  params: []

- id: af_frame_full_frame
  label: AF Frame Full Frame
  kind: action
  params: []

- id: af_frame_center
  label: AF Frame Center
  kind: action
  params: []

- id: cam_initialize_lens
  label: Lens Initialization
  kind: action
  params: []

- id: cam_curve_tracking
  label: Curve Tracking
  kind: action
  params: []

- id: cam_curve_zoom_tracking
  label: Zoom Tracking
  kind: action
  params: []

- id: cam_illegal_iris_open_on
  label: Illegal Iris Open On
  kind: action
  params: []

- id: cam_illegal_iris_open_off
  label: Illegal Iris Open Off
  kind: action
  params: []

- id: if_clear
  label: IF Clear
  kind: action
  params: []

- id: address_set
  label: Address Set (Broadcast)
  kind: action
  params: []

- id: command_cancel
  label: Command Cancel
  kind: action
  params:
    - name: socket
      type: integer
      description: Socket number 1 or 2

- id: pelcod_set_preset
  label: PelcoD Set Preset
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF
    - name: preset
      type: integer
      description: Preset number 0x00 to 0xFF

- id: pelcod_clear_preset
  label: PelcoD Clear Preset
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF
    - name: preset
      type: integer
      description: Preset number 0x00 to 0xFF

- id: pelcod_goto_preset
  label: PelcoD Goto Preset
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF
    - name: preset
      type: integer
      description: Preset number 0x00 to 0xFF

- id: pelcod_power_on
  label: PelcoD Power On
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_power_off
  label: PelcoD Power Off
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_menu_on
  label: PelcoD Menu On
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_menu_off
  label: PelcoD Menu Off
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_enter
  label: PelcoD Menu Enter
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_backlight_on
  label: PelcoD Backlight On
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_backlight_off
  label: PelcoD Backlight Off
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_mirror
  label: PelcoD Mirror
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF
    - name: mode
      type: integer
      description: 0x01=Normal, 0x02=Mirror, 0x03=Flip, 0x04=Mirror+Flip

- id: pelcod_freeze_on
  label: PelcoD Freeze On
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_freeze_off
  label: PelcoD Freeze Off
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_af_on
  label: PelcoD Auto Focus On
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_mf_on
  label: PelcoD Manual Focus On
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_bright_up
  label: PelcoD Bright Control Up
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF

- id: pelcod_bright_down
  label: PelcoD Bright Control Down
  kind: action
  params:
    - name: address
      type: integer
      description: Device address 0x00 to 0xFF
```

## Feedbacks
```yaml
- id: cam_power_inq
  label: Power Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_systemstatus_inq
  label: System Status Inq
  kind: feedback
  values:
    - ready
    - processing

- id: cam_opticalzoompos_inq
  label: Optical Zoom Pos Inq
  kind: feedback
  returns:
    type: integer
    description: Zoom position 0x0000 to 0x4000

- id: cam_focusmode_inq
  label: Focus Mode Inq
  kind: feedback
  values:
    - auto_focus
    - manual_focus

- id: cam_focuspos_inq
  label: Focus Pos Inq
  kind: feedback
  returns:
    type: integer
    description: Focus position 0x000 to 0x47A

- id: cam_wbmode_inq
  label: WB Mode Inq
  kind: feedback
  values:
    - auto
    - indoor
    - outdoor
    - one_push_wb
    - atw
    - manual
    - sodium_lamp

- id: cam_aemode_inq
  label: AE Mode Inq
  kind: feedback
  values:
    - full_auto
    - manual
    - shutter_priority
    - iris_priority
    - white_board

- id: cam_shutterpos_inq
  label: Shutter Pos Inq
  kind: feedback
  returns:
    type: integer
    description: Shutter position index 0x00 to 0x15

- id: cam_irispos_inq
  label: Iris Pos Inq
  kind: feedback
  returns:
    type: integer
    description: Iris position 0x00 to 0x0F

- id: cam_gainpos_inq
  label: Gain Pos Inq
  kind: feedback
  returns:
    type: integer
    description: Gain position 0x00 to 0x0F

- id: cam_brightpos_inq
  label: Bright Pos Inq
  kind: feedback
  returns:
    type: integer
    description: Bright position 0x00 to 0x0F

- id: cam_expcomppos_inq
  label: Exp Comp Pos Inq
  kind: feedback
  returns:
    type: integer
    description: ExpComp position 0x00 to 0x0A

- id: cam_backlightmode_inq
  label: Back Light Mode Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_spotmode_inq
  label: Spot AE Mode Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_spotpos_inq
  label: Spot AE Pos Inq
  kind: feedback
  returns:
    type: object
    description: X (0x00-0x06) and Y (0x00-0x04)

- id: cam_wdparameter_inq
  label: WDR Parameter Inq
  kind: feedback
  returns:
    type: integer
    description: WDR mode 0 to 3

- id: cam_aperture_inq
  label: Aperture Inq
  kind: feedback
  returns:
    type: integer
    description: Aperture gain 0x00 to 0x0E

- id: cam_2dnr_inq
  label: 2D NR Mode Inq
  kind: feedback
  returns:
    type: integer
    description: NR level 0 to 3

- id: cam_3dnr_inq
  label: 3D NR Mode Inq
  kind: feedback
  returns:
    type: integer
    description: 0=OFF, 1=Low, 2=Type, 3=Max

- id: cam_gamma_inq
  label: Gamma Inq
  kind: feedback
  returns:
    type: integer
    description: Gamma 0 to 3

- id: cam_lr_reverse_inq
  label: LR Reverse Mode Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_pictureeffect_inq
  label: Picture Effect Inq
  kind: feedback
  values:
    - off
    - neg_art
    - bw

- id: cam_pictureflip_inq
  label: Picture Flip Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_rotation_inq
  label: Rotation Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_icr_inq
  label: ICR Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_flickerless_inq
  label: Flickerless Inq
  kind: feedback
  values:
    - off
    - 50hz
    - 60hz

- id: cam_slowshutter_inq
  label: Slow Shutter Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_mirror_inq
  label: Mirror Image Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_flip_inq
  label: Picture Flip Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_expcomp_mode_inq
  label: Exp Comp Mode Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_wb_rgain_inq
  label: R Gain Inq
  kind: feedback
  returns:
    type: integer
    description: R gain 0x00 to 0x80

- id: cam_wb_bgain_inq
  label: B Gain Inq
  kind: feedback
  returns:
    type: integer
    description: B gain 0x00 to 0x80

- id: cam_rgain_inq
  label: R Gain Inq
  kind: feedback
  returns:
    type: integer
    description: R gain 0x00 to 0x80

- id: cam_bgain_inq
  label: B Gain Inq
  kind: feedback
  returns:
    type: integer
    description: B gain 0x00 to 0x80

- id: cam_colorgain_inq
  label: Color Gain Inq
  kind: feedback
  returns:
    type: integer
    description: Color gain 0x00 to 0x0F

- id: cam_colorhue_inq
  label: Color Hue Inq
  kind: feedback
  returns:
    type: integer
    description: Color hue 0x00 to 0x0F

- id: cam_zoom_memory_mode_inq
  label: Zoom Memory Mode Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_curvemode_inq
  label: Curve Mode Inq
  kind: feedback
  values:
    - curve_tracking
    - zoom_tracking

- id: cam_af_sensitivity_inq
  label: AF Sensitivity Inq
  kind: feedback
  values:
    - high
    - middle
    - low

- id: cam_af_frame_inq
  label: AF Frame Inq
  kind: feedback
  values:
    - auto
    - full_frame
    - center

- id: resolution_inq
  label: Resolution Inq
  kind: feedback
  returns:
    type: integer
    description: Resolution code

- id: cam_hdmiformat_inq
  label: HDMI Format Inq
  kind: feedback
  values:
    - yuv420
    - yuv422

- id: cam_hdmioutputrange_inq
  label: HDMI Output Range Inq
  kind: feedback
  values:
    - 16_235
    - 1_254

- id: cam_image_mode_inq
  label: Image Mode Inq
  kind: feedback
  values:
    - default
    - custom

- id: prompt_inq
  label: OSD Prompt Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_menumode_inq
  label: Menu Mode Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_ip_hdmi_inq
  label: IP/HDMI Mode Inq
  kind: feedback
  values:
    - hdmi
    - hdmi_stream
    - stream

- id: cam_audio_onoff_inq
  label: Audio On/Off Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_audio_intype_inq
  label: Audio In Type Inq
  kind: feedback
  values:
    - line_in
    - mic_in

- id: cam_audiovolume_inq
  label: Audio Volume Inq
  kind: feedback
  returns:
    type: integer
    description: Volume 0x00 to 0x0A

- id: cam_uart_baud_rate_inq
  label: UART Baud Rate Inq
  kind: feedback
  values:
    - 9600
    - 38400
    - 115200

- id: cam_audio_sample_rate_inq
  label: Audio Sample Rate Inq
  kind: feedback
  values:
    - 48khz_aac
    - 44_1khz_aac
    - 16khz_aac
    - 16khz_g711
    - 8khz_g711

- id: cam_audio_delay_onoff_inq
  label: Audio Delay On/Off Inq
  kind: feedback
  values:
    - on
    - off

- id: cam_audio_delay_time_inq
  label: Audio Delay Time Inq
  kind: feedback
  returns:
    type: integer
    description: Delay time 1 to 500

- id: cam_serial_inq
  label: Serial Number Inq
  kind: feedback
  returns:
    type: string
    description: Serial number (ASCII)

- id: mac_address_inq
  label: MAC Address Inq
  kind: feedback
  returns:
    type: string
    description: MAC address (hex pairs with colons)

- id: cam_id_inq
  label: Camera ID Inq
  kind: feedback
  returns:
    type: string
    description: Camera ID (ASCII)

- id: fw_version_boot_inq
  label: FW Version Boot Inq
  kind: feedback
  returns:
    type: object
    description: VIR firmware version

- id: fw_version_cm0_inq
  label: FW Version CM0 Inq
  kind: feedback
  returns:
    type: object
    description: VIS firmware version

- id: fw_version_rtos_inq
  label: FW Version RTOS Inq
  kind: feedback
  returns:
    type: object
    description: VIU firmware version

- id: fw_version_linux_inq
  label: FW Version Linux Inq
  kind: feedback
  returns:
    type: object
    description: VIW firmware version

- id: fw_version_mcu_inq
  label: FW Version MCU Inq
  kind: feedback
  returns:
    type: object
    description: VIP firmware version

- id: fw_version_iq_inq
  label: FW Version IQ Inq
  kind: feedback
  returns:
    type: object
    description: VIY firmware version

- id: tally_mode_inq
  label: Tally Mode Inq
  kind: feedback
  values:
    - red_off_green_off
    - red_low_light_green_off
    - red_highlight_green_off

- id: tally_lamp_inq
  label: Tally Lamp Inq
  kind: feedback
  values:
    - enable
    - disable

- id: ip_dhcp_onoff_inq
  label: DHCP On/Off Inq
  kind: feedback
  values:
    - on
    - off

- id: ip_address_ipv4_inq
  label: IP Address IPv4 Inq
  kind: feedback
  returns:
    type: string
    description: IPv4 address (hex byte pairs)

- id: ip_netmask_inq
  label: IP Netmask Inq
  kind: feedback
  returns:
    type: string
    description: Netmask (hex byte pairs)

- id: ip_gateway_inq
  label: IP Gateway Inq
  kind: feedback
  returns:
    type: string
    description: Gateway (hex byte pairs)

- id: ip_dns_inq
  label: IP DNS Inq
  kind: feedback
  returns:
    type: string
    description: DNS (hex byte pairs)
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are represented as Actions with direct commands
# No separate Variables section needed - parameters exposed via direct set commands
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited notifications; VISCA supports event-like replies
# but source does not document event subscription mechanism
```

## Macros
```yaml
# UNRESOLVED: source describes no named multi-step macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Camera address in VISCA packets: X = 9 to F (camera address + 8), controller address is 0 (broadcast header 88h)
- VISCA over IP uses UDP port 52381; delivery confirmation is application-level responsibility
- RS232 over IP supports up to 5 simultaneous controllers on same LAN segment
- Broadcast function not available for VISCA over IP
- PelcoD protocol: checksum = Mod(Byte2+Byte3+Byte4+Byte5+Byte6, 0x100); internal and external command lists provided
- Source also covers CV420-30X-IP; this spec covers CV355-30X-IP specifically
- Audio delay range: 1 to 500ms (hex 0x001 to 0x1F4)
- HDMI YUV422 format only available at 4K60P/4K59.94P/4K50P
- <!-- UNRESOLVED: whether both VISCA and PelcoD can operate simultaneously on different interfaces not stated -->
- <!-- UNRESOLVED: port 52381 stated for RS232 over IP; whether VISCA over IP uses same port or different port not explicitly separated in source -->

## Provenance

```yaml
source_domains:
  - marshall-usa.com
source_urls:
  - https://www.marshall-usa.com/pdf/CV420-30X_RS232_Commands.pdf
  - https://www.marshall-usa.com/pdf/CV355-30X-IP_Manual_v1-2.pdf
  - https://www.marshall-usa.com/pdf/RS232-Commands.pdf
retrieved_at: 2026-04-30T14:24:28.133Z
last_checked_at: 2026-05-14T18:17:18.110Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.110Z
matched_actions: 130
action_count: 166
confidence: high
summary: "All 130 spec actions matched VISCA and PelcoD source commands; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
