---
spec_id: admin/lumens-vc-bc301p
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens VC-BC301P Control Spec"
manufacturer: Lumens
model_family: VC-BC301P
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - VC-BC301P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
  - lumens.cn
source_urls:
  - "https://www.mylumens.com/Download/RS150%20-%20VC-BC301P%20RS-232%20command%20set_1_1.pdf"
  - "https://www.lumens.cn/Download/RS150%20-%20VC-BC301P%20RS-232%20command%20set_1_1.pdf"
  - "https://www.mylumens.com/en/Downloads/4?id2=8&pageSize=50"
retrieved_at: 2026-07-14T06:32:39.013Z
last_checked_at: 2026-07-21T23:23:37.817Z
generated_at: 2026-07-21T23:23:37.817Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no safety warnings, electrical specs, or interlock procedures documented in the source."
  - "source contains no explicit safety warnings, electrical specs, or interlock procedures."
  - "firmware version compatibility ranges not stated in source."
  - "voltage, current, power consumption not stated in source."
  - "no fault behavior or error recovery sequence beyond the standard VISCA error packets."
  - "how to switch the RS-232 baud rate from the controller is not documented in this source."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:23:37.817Z
  matched_actions: 230
  action_count: 230
  confidence: medium
  summary: "All 230 spec action/query VISCA hex commands match verbatim rows in the source RS-232 command, inquiry, and block-inquiry tables; port 52381 and serial params confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Lumens VC-BC301P Control Spec

## Summary
The Lumens VC-BC301P is a box camera controllable via RS-232C (VISCA protocol) and also via RS-232 over IP (UDP) on a LAN. This spec covers the VISCA command set, inquiry commands, error messages, and packet structures used to operate the camera.

<!-- UNRESOLVED: no safety warnings, electrical specs, or interlock procedures documented in the source. -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 9600  # source lists "9600bps or 38400bps"; 9600 chosen as primary, 38400 and 115200 also supported per UartBaudRateInq
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 52381
auth:
  type: none  # inferred: no auth procedure in source
```

**Note on serial baud rate:** Source states "9600bps or 38400bps" — both are supported. The UartBaudRateInq also lists 115200 bps as a third option.

**Note on UDP port:** Source section 16.6 states port 52381 for RS-232 over IP.

## Traits
```yaml
- powerable       # inferred from CAM_Power on/off commands
- queryable       # inferred from RS232 Inquiry Command List
- routable        # inferred from CAM_IP/HDMI_Mode selection (HDMI / Stream / USB)
- levelable       # inferred from CAM_Audio_Volume, CAM_Bright, CAM_Aperture level commands
```

## Actions
```yaml
# Each VISCA command row is enumerated as a separate action per the source.

- id: address_set
  label: Address Set (Broadcast)
  kind: action
  command: "88 30 01 FF"
  params: []

- id: if_clear
  label: IF_Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"
  params: []

- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8x 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Socket number (1 or 2)

- id: cam_power_on
  label: CAM Power On
  kind: action
  command: "8x 01 04 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_power_off
  label: CAM Power Off (Standby)
  kind: action
  command: "8x 01 04 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_stop
  label: CAM Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_tele
  label: CAM Zoom Tele (Standard)
  kind: action
  command: "8x 01 04 07 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_wide
  label: CAM Zoom Wide (Standard)
  kind: action
  command: "8x 01 04 07 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_tele_variable
  label: CAM Zoom Tele (Variable)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Speed, p=0 (Low) to 7 (High)

- id: cam_zoom_wide_variable
  label: CAM Zoom Wide (Variable)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Speed, p=0 (Low) to 7 (High)

- id: cam_zoom_direct
  label: CAM Zoom Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs
      type: hex
      description: Zoom position; Min 4000h; Max 4000h (DZoom Off), 6000h (Pixel Zoom + FHD/HD), 7AC0h (DZoom On)

- id: cam_zoom_direct_speed_variable
  label: CAM Zoom Direct (Speed Variable)
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs
      type: hex
      description: Zoom position (same range as CAM_Zoom Direct)
    - name: t
      type: integer
      description: Zoom speed, t=0 (Low) to 7 (High)

- id: cam_dzoom_on
  label: CAM Digital Zoom On
  kind: action
  command: "8x 01 04 06 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_dzoom_pixel
  label: CAM Digital Zoom Pixel Zoom
  kind: action
  command: "8x 01 04 06 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: resolution_select
  label: Select Resolution
  kind: action
  command: "8x 01 06 35 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: 0x02:QFHD 4K 59.94p, 0x03:QFHD 4K 50p, 0x05:QFHD 4K 29.97p, 0x06:QFHD 4K 25p, 0x08:FHD 1080P 59.94p, 0x09:FHD 1080P 50p, 0x0B:FHD 1080P 29.97p, 0x0C:FHD 1080P 25p, 0x0E:HD 720P 59.94p, 0x0F:HD 720P 50p, 0x11:HD 720P 29.97p, 0x12:HD 720P 25p, 0x15:FHD 1080i 59.94i, 0x16:FHD 1080i 50i

- id: hdmi_format_rgb
  label: HDMI Format RGB
  kind: action
  command: "8x 01 06 36 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: hdmi_format_yuv420
  label: HDMI Format YUV420
  kind: action
  command: "8x 01 06 36 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: note
      type: string
      description: Only available on 4K59.94P/4K50P

- id: hdmi_format_yuv422
  label: HDMI Format YUV422
  kind: action
  command: "8x 01 06 36 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: hdmi_output_range_16_235
  label: HDMI Output Range 16-235
  kind: action
  command: "8x 01 06 37 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: hdmi_output_range_1_254
  label: HDMI Output Range 1-254
  kind: action
  command: "8x 01 06 37 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_auto
  label: CAM WB Auto
  kind: action
  command: "8x 01 04 35 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_indoor
  label: CAM WB Indoor
  kind: action
  command: "8x 01 04 35 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_outdoor
  label: CAM WB Outdoor
  kind: action
  command: "8x 01 04 35 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_one_push
  label: CAM WB One Push WB
  kind: action
  command: "8x 01 04 35 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_atw
  label: CAM WB ATW
  kind: action
  command: "8x 01 04 35 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_manual
  label: CAM WB Manual
  kind: action
  command: "8x 01 04 35 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_sodium
  label: CAM WB Sodium Lamp
  kind: action
  command: "8x 01 04 35 0C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_one_push_trigger
  label: CAM WB One Push Trigger
  kind: action
  command: "8x 01 04 10 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: note
      type: string
      description: Enabled during One Push WB Mode

- id: cam_wb_rgain_reset
  label: CAM WB R Gain Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_rgain_up
  label: CAM WB R Gain Up
  kind: action
  command: "8x 01 04 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_rgain_down
  label: CAM WB R Gain Down
  kind: action
  command: "8x 01 04 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_rgain_direct
  label: CAM WB R Gain Direct
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: R gain value, 0x00 to 0x80 (Enabled during WB Manual mode)

- id: cam_wb_bgain_reset
  label: CAM WB B Gain Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_bgain_up
  label: CAM WB B Gain Up
  kind: action
  command: "8x 01 04 04 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_bgain_down
  label: CAM WB B Gain Down
  kind: action
  command: "8x 01 04 04 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_bgain_direct
  label: CAM WB B Gain Direct
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: B gain value, 0x00 to 0x80 (Enabled during WB Manual mode)

- id: cam_ae_full_auto
  label: CAM AE Full Auto
  kind: action
  command: "8x 01 04 39 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ae_manual
  label: CAM AE Manual
  kind: action
  command: "8x 01 04 39 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ae_shutter_priority
  label: CAM AE Shutter Priority
  kind: action
  command: "8x 01 04 39 0A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_flickerless_off
  label: CAM Flickerless Off
  kind: action
  command: "8x 01 04 3C 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_flickerless_50hz
  label: CAM Flickerless 50Hz
  kind: action
  command: "8x 01 04 3C 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_flickerless_60hz
  label: CAM Flickerless 60Hz
  kind: action
  command: "8x 01 04 3C 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_reset
  label: CAM Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_up
  label: CAM Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_down
  label: CAM Shutter Down
  kind: action
  command: "8x 01 04 0A 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_direct
  label: CAM Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: Shutter position, 0x00 to 0x15 (1/1 to 1/10000)

- id: cam_gain_reset
  label: CAM Gain Reset
  kind: action
  command: "8x 01 04 0C 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gain_up
  label: CAM Gain Up
  kind: action
  command: "8x 01 04 0C 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gain_down
  label: CAM Gain Down
  kind: action
  command: "8x 01 04 0C 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gain_direct
  label: CAM Gain Direct
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: Gain position, 0x00 to 0x0F (0dB to +45dB); enabled during AE Manual mode

- id: cam_gain_limit
  label: CAM Gain Limit
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Gain limit position, p=3 to F (disabled during AE Manual mode)

- id: cam_bright_reset
  label: CAM Bright Reset
  kind: action
  command: "8x 01 04 0D 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_bright_up
  label: CAM Bright Up
  kind: action
  command: "8x 01 04 0D 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_bright_down
  label: CAM Bright Down
  kind: action
  command: "8x 01 04 0D 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_bright_direct
  label: CAM Bright Direct
  kind: action
  command: "8x 01 04 4D 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: Bright position, 0x00 to 0x0F (Enabled during Image Mode = Custom mode)

- id: cam_expcomp_on
  label: CAM Exposure Compensation On
  kind: action
  command: "8x 01 04 3E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_off
  label: CAM Exposure Compensation Off
  kind: action
  command: "8x 01 04 3E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_reset
  label: CAM Exposure Compensation Reset
  kind: action
  command: "8x 01 04 0E 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: note
      type: string
      description: Enabled during ExpComp On

- id: cam_expcomp_up
  label: CAM Exposure Compensation Up
  kind: action
  command: "8x 01 04 0E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_down
  label: CAM Exposure Compensation Down
  kind: action
  command: "8x 01 04 0E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_direct
  label: CAM Exposure Compensation Direct
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: ExpComp position, 0x00 to 0x0A (Enabled during ExpComp On)

- id: cam_backlight_on
  label: CAM BackLight On
  kind: action
  command: "8x 01 04 33 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_backlight_off
  label: CAM BackLight Off
  kind: action
  command: "8x 01 04 33 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: note
      type: string
      description: Enabled during AE Full Auto Mode

- id: cam_spotae_on
  label: CAM SpotAE On
  kind: action
  command: "8x 01 04 59 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_spotae_off
  label: CAM SpotAE Off
  kind: action
  command: "8x 01 04 59 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_spotae_position
  label: CAM SpotAE Position
  kind: action
  command: "8x 01 04 29 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: X-axis, 0x00 to 0x06 (center: 3)
    - name: rs
      type: hex
      description: Y-axis, 0x00 to 0x04 (center: 2)

- id: cam_wdr_set
  label: CAM WDR Set Parameter
  kind: action
  command: "8x 01 04 2D 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: WDR mode, p=0 to 3

- id: cam_aperture_reset
  label: CAM Aperture (Sharpness) Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_aperture_up
  label: CAM Aperture Up
  kind: action
  command: "8x 01 04 02 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_aperture_down
  label: CAM Aperture Down
  kind: action
  command: "8x 01 04 02 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_aperture_direct
  label: CAM Aperture Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: Aperture gain, 0x00 to 0x0E

- id: cam_2dnr_set
  label: CAM 2DNR Set Level
  kind: action
  command: "8x 01 04 53 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: NR level, p=0 to 3

- id: cam_3dnr_set
  label: CAM 3DNR Set Level
  kind: action
  command: "8x 01 04 54 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: 0:OFF, 1:Low, 2:Type, 3:Max

- id: cam_gamma_set
  label: CAM Gamma Setting
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Gamma, p=0 to 3 (Enabled during Image Mode = Custom mode)

- id: cam_lr_reverse_on
  label: CAM LR Reverse (Mirror) On
  kind: action
  command: "8x 01 04 61 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_lr_reverse_off
  label: CAM LR Reverse (Mirror) Off
  kind: action
  command: "8x 01 04 61 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_effect_off
  label: CAM PictureEffect Off
  kind: action
  command: "8x 01 04 63 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_effect_neg
  label: CAM PictureEffect Neg.Art
  kind: action
  command: "8x 01 04 63 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_effect_bw
  label: CAM PictureEffect B&W
  kind: action
  command: "8x 01 04 63 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_flip_on
  label: CAM PictureFlip On
  kind: action
  command: "8x 01 04 66 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_flip_off
  label: CAM PictureFlip Off
  kind: action
  command: "8x 01 04 66 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_rotation_on
  label: CAM Rotation (Mirror + Flip) On
  kind: action
  command: "8x 01 04 67 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_rotation_off
  label: CAM Rotation (Mirror + Flip) Off
  kind: action
  command: "8x 01 04 67 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_memory_reset_low
  label: CAM Memory Preset Reset (0-127)
  kind: action
  command: "8x 01 04 3F 00 pp FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pp
      type: hex
      description: Memory number, 0x00 to 0x7F (preset address 0-127)

- id: cam_memory_set_low
  label: CAM Memory Preset Set (0-127)
  kind: action
  command: "8x 01 04 3F 01 pp FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pp
      type: hex
      description: Memory number, 0x00 to 0x7F (preset address 0-127)

- id: cam_memory_recall_low
  label: CAM Memory Preset Recall (0-127)
  kind: action
  command: "8x 01 04 3F 02 pp FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pp
      type: hex
      description: Memory number, 0x00 to 0x7F (preset address 0-127)

- id: cam_memory_reset_high
  label: CAM Memory Preset Reset (128-255)
  kind: action
  command: "8x 01 04 3F 10 pp FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pp
      type: hex
      description: Memory number, 0x00 to 0x7F (preset address 128-255)

- id: cam_memory_set_high
  label: CAM Memory Preset Set (128-255)
  kind: action
  command: "8x 01 04 3F 11 pp FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pp
      type: hex
      description: Memory number, 0x00 to 0x7F (preset address 128-255)

- id: cam_memory_recall_high
  label: CAM Memory Preset Recall (128-255)
  kind: action
  command: "8x 01 04 3F 12 pp FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pp
      type: hex
      description: Memory number, 0x00 to 0x7F (preset address 128-255)

- id: cam_color_gain_direct
  label: CAM ColorGain (Saturation) Direct
  kind: action
  command: "8x 01 04 49 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: Color gain, 0x00 to 0x0F (Enabled during Image Mode = Custom mode)

- id: ir_receive_on
  label: IR Receive On
  kind: action
  command: "8x 01 06 08 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ir_receive_off
  label: IR Receive Off
  kind: action
  command: "8x 01 06 08 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ir_receive_toggle
  label: IR Receive On/Off
  kind: action
  command: "8x 01 06 08 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: pantilt_up
  label: PanTilt Up
  kind: action
  command: "8x 01 06 01 VV WW 03 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: VV
      type: hex
      description: Pan speed, 0x01 (low) to 0x18 (high)
    - name: WW
      type: hex
      description: Tilt speed, 0x01 (low) to 0x18 (high)

- id: pantilt_down
  label: PanTilt Down
  kind: action
  command: "8x 01 06 01 VV WW 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: VV
      type: hex
      description: Pan speed, 0x01 (low) to 0x18 (high)
    - name: WW
      type: hex
      description: Tilt speed, 0x01 (low) to 0x18 (high)

- id: pantilt_left
  label: PanTilt Left
  kind: action
  command: "8x 01 06 01 VV WW 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: VV
      type: hex
      description: Pan speed, 0x01 (low) to 0x18 (high)
    - name: WW
      type: hex
      description: Tilt speed, 0x01 (low) to 0x18 (high)

- id: pantilt_right
  label: PanTilt Right
  kind: action
  command: "8x 01 06 01 VV WW 02 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: VV
      type: hex
      description: Pan speed, 0x01 (low) to 0x18 (high)
    - name: WW
      type: hex
      description: Tilt speed, 0x01 (low) to 0x18 (high)

- id: pantilt_upleft
  label: PanTilt UpLeft
  kind: action
  command: "8x 01 06 01 VV WW 01 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: VV
      type: hex
      description: Pan speed, 0x01 (low) to 0x18 (high)
    - name: WW
      type: hex
      description: Tilt speed, 0x01 (low) to 0x18 (high)

- id: pantilt_upright
  label: PanTilt UpRight
  kind: action
  command: "8x 01 06 01 VV WW 02 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: VV
      type: hex
      description: Pan speed, 0x01 (low) to 0x18 (high)
    - name: WW
      type: hex
      description: Tilt speed, 0x01 (low) to 0x18 (high)

- id: pantilt_downleft
  label: PanTilt DownLeft
  kind: action
  command: "8x 01 06 01 VV WW 01 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: VV
      type: hex
      description: Pan speed, 0x01 (low) to 0x18 (high)
    - name: WW
      type: hex
      description: Tilt speed, 0x01 (low) to 0x18 (high)

- id: pantilt_downright
  label: PanTilt DownRight
  kind: action
  command: "8x 01 06 01 VV WW 02 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: VV
      type: hex
      description: Pan speed, 0x01 (low) to 0x18 (high)
    - name: WW
      type: hex
      description: Tilt speed, 0x01 (low) to 0x18 (high)

- id: pantilt_stop
  label: PanTilt Stop
  kind: action
  command: "8x 01 06 01 00 00 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: pantilt_absolute_position
  label: PanTilt Absolute Position
  kind: action
  command: "8x 01 7E 06 20 00 00 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: YYYY
      type: hex
      description: Pan position, 0x0000 to 0x0064 and 0xFF9C to 0xFFFF (center 0000)
    - name: ZZZZ
      type: hex
      description: Tilt position, 0x0000 to 0x0064 and 0xFF9C to 0xFFFF (center 0000)

- id: pantilt_home
  label: PanTilt Home
  kind: action
  command: "8x 01 06 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: pantilt_reset
  label: PanTilt Reset
  kind: action
  command: "8x 01 06 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: factory_reset_user
  label: Factory Reset User
  kind: action
  command: "8x 01 04 3F 03 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: factory_reset_hard
  label: Factory Reset Hard
  kind: action
  command: "8x 01 04 3F 03 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_image_mode_default
  label: CAM Image Mode Default
  kind: action
  command: "8x 01 04 3F 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_image_mode_custom
  label: CAM Image Mode Custom
  kind: action
  command: "8x 01 04 3F 04 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_image_load
  label: CAM Image Mode Load
  kind: action
  command: "8x 01 04 3F 05 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Load image mode (default to Custom, p=0)

- id: cam_prompt_on
  label: CAM Prompt On
  kind: action
  command: "8x 01 04 07 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_prompt_off
  label: CAM Prompt Off
  kind: action
  command: "8x 01 04 07 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_color_hue_direct
  label: CAM ColorHue Direct
  kind: action
  command: "8x 01 04 4F 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: Color hue, 0x00 to 0x0F (Enabled during Image Mode = Custom mode)

- id: sys_menu_on
  label: SYS Menu On
  kind: action
  command: "8x 01 06 06 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sys_menu_off
  label: SYS Menu Off
  kind: action
  command: "8x 01 06 06 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sys_menu_toggle
  label: SYS Menu On/Off
  kind: action
  command: "8x 01 06 06 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sys_menu_enter
  label: SYS Menu Enter
  kind: action
  command: "8x 01 7E 01 02 00 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sys_menu_up
  label: SYS Menu Up
  kind: action
  command: "8x 01 06 01 01 01 03 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sys_menu_down
  label: SYS Menu Down
  kind: action
  command: "8x 01 06 01 01 01 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sys_menu_left
  label: SYS Menu Left
  kind: action
  command: "8x 01 06 01 01 01 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sys_menu_right
  label: SYS Menu Right
  kind: action
  command: "8x 01 06 01 01 01 02 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: tally_mode_set
  label: Set Tally Mode
  kind: action
  command: "8x 01 7E 01 0A 01 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: 0:Red OFF Green OFF, 4:Red Low light Green OFF, 5:Red Highlight Green OFF, 6:Red OFF Green Highlight, 7:Red Highlight Green Highlight (Tally Lamp must be Enabled)

- id: tally_lamp_on
  label: Tally Lamp On
  kind: action
  command: "8x 01 7E 01 0A 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: tally_lamp_off
  label: Tally Lamp Off
  kind: action
  command: "8x 01 7E 01 0A 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: tally_lamp_brightness
  label: Tally Lamp Brightness
  kind: action
  command: "8x 01 7E 01 0A 02 0A 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: hex
      description: Brightness, 0x00 to 0x64 (dark to bright)

- id: cam_ip_hdmi_mode_hdmi
  label: CAM IP/HDMI Mode HDMI
  kind: action
  command: "8x 01 CB 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ip_hdmi_mode_hdmi_stream
  label: CAM IP/HDMI Mode HDMI + Stream
  kind: action
  command: "8x 01 CB 08 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ip_hdmi_mode_stream
  label: CAM IP/HDMI Mode Stream
  kind: action
  command: "8x 01 CB 18 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ip_hdmi_mode_hdmi_usb
  label: CAM IP/HDMI Mode HDMI + USB
  kind: action
  command: "8x 01 CB 28 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: osd_cross_line_on
  label: OSD Cross Line On
  kind: action
  command: "8x 01 04 75 DD 04 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: osd_cross_line_off
  label: OSD Cross Line Off
  kind: action
  command: "8x 01 04 75 DD 04 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ip_dhcp_on
  label: IP DHCP On
  kind: action
  command: "8x 01 7C 01 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ip_dhcp_off
  label: IP DHCP Off
  kind: action
  command: "8x 01 7C 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ip_address_set
  label: Set IP Address IPv4
  kind: action
  command: "8x 01 7C 02 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs tuvx
      type: hex
      description: IPv4 address pq.rs.tu.vx, each octet 0-255 (e.g. 192.168.100.150 -> 0C 00 0A 08 06 04 09 06)

- id: ip_netmask_set
  label: Set Netmask
  kind: action
  command: "8x 01 7C 03 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs tuvx
      type: hex
      description: Netmask pq.rs.tu.vx (e.g. 255.255.255.0 -> 0F 0F 0F 0F 0F 0F 00 00)

- id: ip_gateway_set
  label: Set Gateway
  kind: action
  command: "8x 01 7C 04 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs tuvx
      type: hex
      description: Gateway pq.rs.tu.vx (e.g. 192.168.100.254 -> 0C 00 0A 08 06 04 0F 0E)

- id: ip_dns_set
  label: Set DNS
  kind: action
  command: "8x 01 7C 05 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs tuvx
      type: hex
      description: DNS pq.rs.tu.vx (e.g. 8.8.8.8 -> 00 08 00 08 00 08 00 08)

- id: cam_audio_on
  label: CAM Audio On
  kind: action
  command: "8x 01 04 68 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_off
  label: CAM Audio Off
  kind: action
  command: "8x 01 04 68 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_in_type_line
  label: CAM Audio In Type Line In
  kind: action
  command: "8x 01 04 6B 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_in_type_mic
  label: CAM Audio In Type Mic In
  kind: action
  command: "8x 01 04 6B 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_volume
  label: CAM Audio Volume
  kind: action
  command: "8x 01 04 6E 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: hex
      description: Volume, 0x00 to 0x0A

- id: cam_audio_encode_sample_rate
  label: CAM Audio Encode Sample Rate
  kind: action
  command: "8x 01 04 6D 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: 0:48KHz (AAC), 1:44.1KHz (AAC), 2:16KHz (AAC), 3:16KHz (G.711), 4:8KHz (G.711)

- id: cam_audio_delay_enable_on
  label: CAM Audio Delay Enable On (Internet Streaming)
  kind: action
  command: "8x 01 04 6F 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_delay_enable_off
  label: CAM Audio Delay Enable Off (Internet Streaming)
  kind: action
  command: "8x 01 04 6F 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_delay_time
  label: CAM Audio Delay Time (Internet Streaming)
  kind: action
  command: "8x 01 04 6A 0p 0q 0r FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqr
      type: hex
      description: Delay time, 0x001 to 0x1F4 (1 to 500 decimal)

- id: sy_joystick_off
  label: SY_JOYSTICK Non-SY_Joystick
  kind: action
  command: "8x 01 04 11 03 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sy_joystick_on
  label: SY_JOYSTICK SY_Joystick
  kind: action
  command: "8x 01 04 11 03 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

# ---- Inquiry commands (kind: query) ----

- id: cam_power_inq
  label: CAM Power Inquiry
  kind: query
  command: "8x 09 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_system_status_inq
  label: CAM System Status Inquiry
  kind: query
  command: "8x 09 04 00 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_optical_zoom_pos_inq
  label: CAM Optical Zoom Position Inquiry
  kind: query
  command: "8x 09 04 47 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_memory_mode_inq
  label: CAM Zoom Memory Mode Inquiry
  kind: query
  command: "8x 09 04 47 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_dzoom_mode_inq
  label: CAM DZoom Mode Inquiry
  kind: query
  command: "8x 09 04 06 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: resolution_setting_inq
  label: Resolution Setting Inquiry
  kind: query
  command: "8x 09 06 23 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_hdmi_format_inq
  label: CAM HDMI Format Inquiry
  kind: query
  command: "8x 09 06 36 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_hdmi_output_range_inq
  label: CAM HDMI Output Range Inquiry
  kind: query
  command: "8x 09 06 37 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_mode_inq
  label: CAM WB Mode Inquiry
  kind: query
  command: "8x 09 04 35 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_rgain_inq
  label: CAM R Gain Inquiry
  kind: query
  command: "8x 09 04 43 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_bgain_inq
  label: CAM B Gain Inquiry
  kind: query
  command: "8x 09 04 44 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ae_mode_inq
  label: CAM AE Mode Inquiry
  kind: query
  command: "8x 09 04 39 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_flickerless_inq
  label: CAM Flickerless Inquiry
  kind: query
  command: "8x 09 04 3C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_pos_inq
  label: CAM Shutter Position Inquiry
  kind: query
  command: "8x 09 04 4A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gain_pos_inq
  label: CAM Gain Position Inquiry
  kind: query
  command: "8x 09 04 4C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gain_limit_inq
  label: CAM Gain Limit Inquiry
  kind: query
  command: "8x 09 04 2C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_bright_pos_inq
  label: CAM Bright Position Inquiry
  kind: query
  command: "8x 09 04 4D FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_mode_inq
  label: CAM Exposure Compensation Mode Inquiry
  kind: query
  command: "8x 09 04 3E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_pos_inq
  label: CAM Exposure Compensation Position Inquiry
  kind: query
  command: "8x 09 04 4E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_backlight_mode_inq
  label: CAM BackLight Mode Inquiry
  kind: query
  command: "8x 09 04 33 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_spotae_mode_inq
  label: CAM SpotAE Mode Inquiry
  kind: query
  command: "8x 09 04 59 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_spotae_pos_inq
  label: CAM SpotAE Position Inquiry
  kind: query
  command: "8x 09 04 29 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wd_parameter_inq
  label: CAM WDR Parameter Inquiry
  kind: query
  command: "8x 09 04 2D FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_aperture_inq
  label: CAM Aperture Inquiry
  kind: query
  command: "8x 09 04 42 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_2dnr_mode_inq
  label: CAM 2DNR Mode Inquiry
  kind: query
  command: "8x 09 04 53 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_3dnr_mode_inq
  label: CAM 3DNR Mode Inquiry
  kind: query
  command: "8x 09 04 54 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gamma_inq
  label: CAM Gamma Inquiry
  kind: query
  command: "8x 09 04 5B FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_lr_reverse_mode_inq
  label: CAM LR Reverse Mode Inquiry
  kind: query
  command: "8x 09 04 61 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_effect_mode_inq
  label: CAM PictureEffect Mode Inquiry
  kind: query
  command: "8x 09 04 63 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_flip_mode_inq
  label: CAM PictureFlip Mode Inquiry
  kind: query
  command: "8x 09 04 66 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_rotation_mode_inq
  label: CAM Rotation Mode Inquiry
  kind: query
  command: "8x 09 04 67 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_version_inq
  label: CAM Version Inquiry
  kind: query
  command: "8x 09 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_icr_inq
  label: CAM ICR Inquiry
  kind: query
  command: "8x 09 04 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_fw_version_boot_inq
  label: CAM FW Version Inquiry (Boot)
  kind: query
  command: "8x 09 00 02 00 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_fw_version_cm0_inq
  label: CAM FW Version Inquiry (CM0)
  kind: query
  command: "8x 09 00 02 00 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_fw_version_rtos_inq
  label: CAM FW Version Inquiry (RTOS)
  kind: query
  command: "8x 09 00 02 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_fw_version_linux_inq
  label: CAM FW Version Inquiry (Linux)
  kind: query
  command: "8x 09 00 02 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_fw_version_iq_inq
  label: CAM FW Version Inquiry (IQ)
  kind: query
  command: "8x 09 00 02 00 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sys_menu_mode_inq
  label: SYS Menu Mode Inquiry
  kind: query
  command: "8x 09 06 06 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ir_receive_inq
  label: IR Receive Inquiry
  kind: query
  command: "8x 09 06 08 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ept_pos_inq
  label: CAM ePT Position Inquiry
  kind: query
  command: "8x 09 7E 06 20 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: pantilt_pos_inq
  label: PanTilt Position Inquiry
  kind: query
  command: "8x 09 06 12 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_image_mode_inq
  label: CAM Image Mode Inquiry
  kind: query
  command: "8x 09 04 3F 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: prompt_inq
  label: Prompt Inquiry
  kind: query
  command: "8x 09 04 07 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_serial_inq
  label: CAM Serial Number Inquiry
  kind: query
  command: "8x 09 02 18 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: mac_address_read
  label: MAC Address Read
  kind: query
  command: "8x 09 04 78 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: tally_mode_inq
  label: Tally Mode Inquiry
  kind: query
  command: "8x 09 7E 01 0A 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: tally_lamp_inq
  label: Tally Lamp Inquiry
  kind: query
  command: "8x 09 7E 01 0A 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ip_hdmi_inq
  label: CAM IP/HDMI Inquiry
  kind: query
  command: "8x 09 7E CB FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_id_inq
  label: CAM ID Inquiry
  kind: query
  command: "8x 09 7E CE FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_color_gain_inq
  label: CAM ColorGain Inquiry
  kind: query
  command: "8x 09 04 49 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_color_hue_inq
  label: CAM ColorHue Inquiry
  kind: query
  command: "8x 09 04 4F FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_rom_01_10_inq
  label: CAM Error Code ROM 01-10 Inquiry
  kind: query
  command: "8x 09 00 02 02 00"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_rom_11_20_inq
  label: CAM Error Code ROM 11-20 Inquiry
  kind: query
  command: "8x 09 00 02 02 01"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_rom_21_30_inq
  label: CAM Error Code ROM 21-30 Inquiry
  kind: query
  command: "8x 09 00 02 02 02"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_rom_31_40_inq
  label: CAM Error Code ROM 31-40 Inquiry
  kind: query
  command: "8x 09 00 02 02 03"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_rom_41_50_inq
  label: CAM Error Code ROM 41-50 Inquiry
  kind: query
  command: "8x 09 00 02 02 04"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_current_01_10_inq
  label: CAM Error Code Current 01-10
  kind: query
  command: "8x 09 00 02 03 00"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_current_11_20_inq
  label: CAM Error Code Current 11-20
  kind: query
  command: "8x 09 00 02 03 01"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_current_21_30_inq
  label: CAM Error Code Current 21-30
  kind: query
  command: "8x 09 00 02 03 02"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_current_31_40_inq
  label: CAM Error Code Current 31-40
  kind: query
  command: "8x 09 00 02 03 03"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_errcode_current_41_50_inq
  label: CAM Error Code Current 41-50
  kind: query
  command: "8x 09 00 02 03 04"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ip_dhcp_onoff_inq
  label: IP DHCP On/Off Inquiry
  kind: query
  command: "8x 09 7C 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ip_address_ipv4_inq
  label: IP Address IPv4 Inquiry
  kind: query
  command: "8x 09 7C 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ip_netmask_inq
  label: IP Netmask Inquiry
  kind: query
  command: "8x 09 7C 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ip_gateway_inq
  label: IP Gateway Inquiry
  kind: query
  command: "8x 09 7C 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: ip_dns_inq
  label: IP DNS Inquiry
  kind: query
  command: "8x 09 7C 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_onoff_inq
  label: CAM Audio On/Off Inquiry
  kind: query
  command: "8x 09 04 68 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_in_type_inq
  label: CAM Audio In Type Inquiry
  kind: query
  command: "8x 09 04 6B FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_encode_type_inq
  label: CAM Audio Encode Type Inquiry
  kind: query
  command: "8x 09 04 6C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_volume_inq
  label: CAM Audio Volume Inquiry
  kind: query
  command: "8x 09 04 6E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_uart_baud_rate_inq
  label: CAM UART Baud Rate Inquiry
  kind: query
  command: "8x 09 04 24 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_sample_rate_inq
  label: CAM Audio Sample Rate Inquiry
  kind: query
  command: "8x 09 04 6D FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_delay_onoff_inq
  label: CAM Audio Delay On/Off Inquiry
  kind: query
  command: "8x 09 04 6F FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_audio_delay_time_inq
  label: CAM Audio Delay Time Inquiry
  kind: query
  command: "8x 09 04 6A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: sy_joystick_inq
  label: SY_JOYSTICK Inquiry
  kind: query
  command: "8x 09 06 11 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_lens_control_block_inq
  label: CAM Lens Control Block Inquiry
  kind: query
  command: "8x 09 7E 7E 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_camera_control_block_inq
  label: CAM Camera Control Block Inquiry
  kind: query
  command: "8x 09 7E 7E 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_other_block_inq
  label: CAM Other Block Inquiry
  kind: query
  command: "8x 09 7E 7E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_extended_1_block_inq
  label: CAM Extended 1 Block Inquiry
  kind: query
  command: "8x 09 7E 7E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_extended_2_block_inq
  label: CAM Extended 2 Block Inquiry
  kind: query
  command: "8x 09 7E 7E 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_extended_3_block_inq
  label: CAM Extended 3 Block Inquiry
  kind: query
  command: "8x 09 7E 7E 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]

- id: system_status
  type: enum
  values: [ready, processing]

- id: dzoom_mode
  type: enum
  values: [dzoom_on, pixel_zoom]

- id: hdmi_format
  type: enum
  values: [rgb, yuv420, yuv422]

- id: hdmi_output_range
  type: enum
  values: [16_235, 1_254]

- id: wb_mode
  type: enum
  values: [auto, indoor, outdoor, one_push_wb, atw, manual, sodium_lamp]

- id: ae_mode
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority]

- id: flickerless_mode
  type: enum
  values: [off, 50hz, 60hz]

- id: backlight_mode
  type: enum
  values: [on, off]

- id: spotae_mode
  type: enum
  values: [on, off]

- id: lr_reverse_mode
  type: enum
  values: [on, off]

- id: picture_effect_mode
  type: enum
  values: [off, neg_art, bw]

- id: picture_flip_mode
  type: enum
  values: [on, off]

- id: rotation_mode
  type: enum
  values: [on, off]

- id: image_mode
  type: enum
  values: [default, custom]

- id: ip_hdmi_mode
  type: enum
  values: [hdmi, hdmi_stream, stream, hdmi_usb]

- id: audio_in_type
  type: enum
  values: [line_in, mic_in]

- id: audio_encode_type
  type: enum
  values: [aac, g711]

- id: audio_sample_rate
  type: enum
  values: [48khz_aac, 44_1khz_aac, 16khz_aac, 16khz_g711, 8khz_g711]

- id: audio_delay_onoff
  type: enum
  values: [on, off]

- id: audio_volume
  type: integer
  range: [0, 10]

- id: audio_delay_time
  type: integer
  range: [1, 500]

- id: rgain_value
  type: integer
  range: [0, 128]

- id: bgain_value
  type: integer
  range: [0, 128]

- id: shutter_position
  type: integer
  range: [0, 21]

- id: gain_position
  type: integer
  range: [0, 15]

- id: gain_limit
  type: integer
  range: [3, 15]

- id: bright_position
  type: integer
  range: [0, 15]

- id: expcomp_position
  type: integer
  range: [0, 10]

- id: spotae_position
  type: object
  description: |
    X-axis 0x00 to 0x06 (center 3), Y-axis 0x00 to 0x04 (center 2)

- id: wdr_parameter
  type: integer
  range: [0, 3]

- id: aperture_gain
  type: integer
  range: [0, 14]

- id: nr_2d_level
  type: integer
  range: [0, 3]

- id: nr_3d_level
  type: integer
  range: [0, 3]

- id: gamma
  type: integer
  range: [0, 3]

- id: color_gain
  type: integer
  range: [0, 15]

- id: color_hue
  type: integer
  range: [0, 15]

- id: optical_zoom_position
  type: integer
  range: [0, 16384]

- id: pantilt_position
  type: object
  description: |
    Pan and Tilt position (each 0x0000 to 0x0064 and 0xFF9C to 0xFFFF, center 0000)

- id: ept_position
  type: object
  description: |
    Pan and Tilt position (each 0x0000 to 0x0064 and 0xFF9C to 0xFFFF, center 0000)

- id: uart_baud_rate
  type: enum
  values: [9600, 38400, 115200]

- id: dhcp_onoff
  type: enum
  values: [on, off]

- id: ipv4_address
  type: string
  description: IPv4 address as pq.rs.tu.vx hex octets

- id: netmask
  type: string

- id: gateway
  type: string

- id: dns
  type: string

- id: mac_address
  type: string
  description: MAC address ab:cd:ef:gh:ij:kl

- id: camera_serial_number
  type: string

- id: camera_id
  type: string

- id: camera_version
  type: object
  description: |
    Vendor ID, Model ID, Rom revision, Max socket

- id: fw_version_boot
  type: string
  description: VIR + xxxx

- id: fw_version_cm0
  type: string
  description: VIS + xxxx

- id: fw_version_rtos
  type: string
  description: VIU + xxxx

- id: fw_version_linux
  type: string
  description: VIW + xxxx

- id: fw_version_iq
  type: string
  description: VIY + xxxx

- id: tally_mode
  type: enum
  values: [red_off_green_off, red_low_green_off, red_high_green_off, red_off_green_high, red_high_green_high]

- id: tally_lamp
  type: enum
  values: [on, off]

- id: tally_lamp_brightness
  type: integer
  range: [0, 100]

- id: resolution
  type: enum
  values:
    - qfhd_4k_59_94p
    - qfhd_4k_50p
    - qfhd_4k_29_97p
    - qfhd_4k_25p
    - fhd_1080p_59_94p
    - fhd_1080p_50p
    - fhd_1080p_29_97p
    - fhd_1080p_25p
    - hd_720p_59_94p
    - hd_720p_50p
    - hd_720p_29_97p
    - hd_720p_25p
    - fhd_1080i_59_94i
    - fhd_1080i_50i

- id: ir_receive_state
  type: enum
  values: [on, off]

- id: menu_state
  type: enum
  values: [on, off]

- id: prompt_state
  type: enum
  values: [on, off]

- id: icr_state
  type: enum
  values: [on, off]

- id: sy_joystick_state
  type: enum
  values: [non_sy_joystick, sy_joystick]

- id: errcode_rom_01_10
  type: string

- id: errcode_rom_11_20
  type: string

- id: errcode_rom_21_30
  type: string

- id: errcode_rom_31_40
  type: string

- id: errcode_rom_41_50
  type: string

- id: errcode_current_01_10
  type: string

- id: errcode_current_11_20
  type: string

- id: errcode_current_21_30
  type: string

- id: errcode_current_31_40
  type: string

- id: errcode_current_41_50
  type: string

- id: expcomp_mode
  type: enum
  values: [on, off]

- id: ack_packet
  type: string
  description: |
    Format: X0 4Y FF, X = 9 to F (camera address + 8), Y = socket number

- id: completion_command_packet
  type: string
  description: |
    Format: X0 5Y FF, X = 9 to F (camera address + 8), Y = socket number

- id: completion_inquiry_packet
  type: string
  description: |
    Format: X0 50 ... FF

- id: syntax_error_packet
  type: string
  description: |
    Format: X0 6Y 02 FF (Syntax Error)

- id: buffer_full_packet
  type: string
  description: |
    Format: X0 6Y 03 FF (Command buffer full)

- id: command_cancelled_packet
  type: string
  description: |
    Format: X0 6Y 04 FF (Command cancelled)

- id: no_socket_packet
  type: string
  description: |
    Format: X0 6Y 05 FF (No socket to be cancelled)

- id: not_executable_packet
  type: string
  description: |
    Format: X0 6Y 41 FF (Command not executable)

- id: cancel_packet
  type: string
  description: |
    Format: 8X 2Y FF, X = 1 to 7 (camera address), Y = socket number
```

## Variables
```yaml
# Settable parameters that have a "Direct" command form rather than discrete presets.
# These are derived from the source's parameterized command entries.

- id: zoom_position
  type: integer
  range: [16384, 31424]  # 0x4000 to 0x7AC0 (DZoom On); see source for full range table
  description: Zoom position pqrs, 0x4000 minimum; max varies by DZoom mode

- id: zoom_speed
  type: integer
  range: [0, 7]
  description: 0 = Low, 7 = High

- id: pantilt_pan_speed
  type: integer
  range: [1, 24]  # 0x01 to 0x18

- id: pantilt_tilt_speed
  type: integer
  range: [1, 24]

- id: pantilt_pan_position_absolute
  type: integer
  description: YYYY pan position (0x0000 to 0x0064 and 0xFF9C to 0xFFFF, center 0000)

- id: pantilt_tilt_position_absolute
  type: integer
  description: ZZZZ tilt position (0x0000 to 0x0064 and 0xFF9C to 0xFFFF, center 0000)

- id: rgain_value_direct
  type: integer
  range: [0, 128]

- id: bgain_value_direct
  type: integer
  range: [0, 128]

- id: shutter_position_direct
  type: integer
  range: [0, 21]
  description: 0x00 to 0x15, mapped via AE_Shutter Table

- id: gain_position_direct
  type: integer
  range: [0, 15]
  description: 0x00 to 0x0F, mapped via AE_Gain Table

- id: bright_position_direct
  type: integer
  range: [0, 15]

- id: expcomp_position_direct
  type: integer
  range: [0, 10]

- id: aperture_gain_direct
  type: integer
  range: [0, 14]

- id: color_gain_direct
  type: integer
  range: [0, 15]

- id: color_hue_direct
  type: integer
  range: [0, 15]

- id: preset_memory_low
  type: integer
  range: [0, 127]
  description: Preset address 0-127

- id: preset_memory_high
  type: integer
  range: [128, 255]
  description: Preset address 128-255

- id: ipv4_address_octet
  type: integer
  range: [0, 255]

- id: audio_volume
  type: integer
  range: [0, 10]

- id: audio_delay_time_ms
  type: integer
  range: [1, 500]

- id: tally_lamp_brightness
  type: integer
  range: [0, 100]
```

## Events
```yaml
- id: network_change
  type: notification
  description: |
    Network change packet sent by the device when the network configuration changes.
    Packet: X0 38 FF (X = 9 to F, camera address + 8)

- id: address_set_reply
  type: notification
  description: |
    Reply to broadcast address-set command.
    Packet: 88 30 0w FF (w = 1 + Address)
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.

- id: one_push_wb_trigger
  description: |
    One Push WB Trigger sequence (must be in One Push WB mode first):
    1. Set WB mode to One Push WB: 8x 01 04 35 03 FF
    2. Trigger WB: 8x 01 04 10 05 FF

- id: factory_reset_user
  description: |
    Send: 8x 01 04 3F 03 00 FF

- id: factory_reset_hard
  description: |
    Send: 8x 01 04 3F 03 01 FF

- id: pan_tilt_home
  description: |
    Send: 8x 01 06 04 FF (returns camera to home position)

- id: pan_tilt_reset
  description: |
    Send: 8x 01 06 05 FF (resets pan-tilt mechanism)

- id: ip_dhcp_setup
  description: |
    Enable DHCP: 8x 01 7C 01 02 FF
    To disable and set static IP: 8x 01 7C 01 03 FF then use IP_Address_IPv4 / IP_Netmask / IP_Getway / IP_Dns commands

- id: block_inquiry_lens
  description: |
    Send: 8x 09 7E 7E 00 FF (returns 16-byte lens control block)

- id: block_inquiry_camera
  description: |
    Send: 8x 09 7E 7E 01 FF (returns 16-byte camera control block)

- id: block_inquiry_other
  description: |
    Send: 8x 09 7E 7E 02 FF (returns 16-byte other state block)

- id: block_inquiry_extended_1
  description: |
    Send: 8x 09 7E 7E 03 FF (returns 16-byte extended 1 block)

- id: block_inquiry_extended_2
  description: |
    Send: 8x 09 7E 7E 04 FF (returns 16-byte extended 2 block)

- id: block_inquiry_extended_3
  description: |
    Send: 8x 09 7E 7E 05 FF (returns 16-byte extended 3 block)
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset_hard
  - factory_reset_user
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, electrical specs, or interlock procedures.
```

## Notes
The Lumens VC-BC301P uses the VISCA protocol over RS-232C (serial) and also supports VISCA over IP via UDP on port 52381 (limited to same LAN segment). On RS-232 over IP the camera and controller addresses are locked (controller=0, peripheral=1) since multiple controllers may be present.

The serial default baud rate is 9600 bps, with 38400 bps and 115200 bps also available (selectable via CAM_UartBaudRateInq reply: 0=9600, 1=38400, 2=115200). The source does not specify how to change the baud rate from the controller side; this is presumably done via the on-device menu.

Camera addresses 1-7 are used on the wire (the source writes `8x` where x is the address byte; reply packets add 8, so address 1 = 0x81 command / 0x90 reply). Broadcast packets use 0x88 header.

YUV420 HDMI format is only available on 4K59.94P and 4K50P resolutions.

Tally modes 4-7 require the Tally Lamp to be Enabled.

Some commands (e.g. CAM_WB_RGain Up/Down/Direct) are only enabled in specific WB modes (Manual mode for direct R/B gain).

Some commands (e.g. CAM_Shutter, CAM_Gain Direct) are only enabled in AE Shutter Priority or Manual modes.

CAM_Aperture (Sharpness) and CAM_Bright Direct commands are only enabled in Image Mode = Custom.

The VISCA over IP packet structure wraps the VISCA payload with an 8-byte header (payload type, payload length, sequence number) followed by 1-16 bytes of payload. Delivery is not guaranteed over UDP; controllers must implement timeout/retry.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source. -->
<!-- UNRESOLVED: voltage, current, power consumption not stated in source. -->
<!-- UNRESOLVED: no fault behavior or error recovery sequence beyond the standard VISCA error packets. -->
<!-- UNRESOLVED: how to switch the RS-232 baud rate from the controller is not documented in this source. -->

## Provenance

```yaml
source_domains:
  - mylumens.com
  - lumens.cn
source_urls:
  - "https://www.mylumens.com/Download/RS150%20-%20VC-BC301P%20RS-232%20command%20set_1_1.pdf"
  - "https://www.lumens.cn/Download/RS150%20-%20VC-BC301P%20RS-232%20command%20set_1_1.pdf"
  - "https://www.mylumens.com/en/Downloads/4?id2=8&pageSize=50"
retrieved_at: 2026-07-14T06:32:39.013Z
last_checked_at: 2026-07-21T23:23:37.817Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:23:37.817Z
matched_actions: 230
action_count: 230
confidence: medium
summary: "All 230 spec action/query VISCA hex commands match verbatim rows in the source RS-232 command, inquiry, and block-inquiry tables; port 52381 and serial params confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no safety warnings, electrical specs, or interlock procedures documented in the source."
- "source contains no explicit safety warnings, electrical specs, or interlock procedures."
- "firmware version compatibility ranges not stated in source."
- "voltage, current, power consumption not stated in source."
- "no fault behavior or error recovery sequence beyond the standard VISCA error packets."
- "how to switch the RS-232 baud rate from the controller is not documented in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
