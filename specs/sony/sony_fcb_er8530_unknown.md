---
spec_id: admin/sony-fcb-er8530
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FCB-ER8530 Control Spec"
manufacturer: Sony
model_family: FCB-ER8530
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - FCB-ER8530
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.sony
  - manualslib.com
source_urls:
  - https://pro.sony/s3/2025/01/13124708/FCB-ER8530-ER8550_TM_D201100141.pdf
  - https://pro.sony/ue_US/product-resources/knowledge-panel/fcb-er8530-fcb-er8550-technical-manual
  - https://www.manualslib.com/manual/3850700/Sony-Fcb-Er8530.html
retrieved_at: 2026-08-11T05:17:55.387Z
last_checked_at: 2026-08-19T09:48:53.525Z
generated_at: 2026-08-19T09:48:53.525Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default VISCA baud rate at first power-on is 9600 bps per the Register Setting table, but the source does not state which baud a given shipped unit is configured to."
  - "firmware version compatibility range not stated in source."
  - "source document also describes the FCB-ER8550 (external sync, EXT_SYNC pins); those features are NOT available on the FCB-ER8530 and are excluded from this spec."
  - "USB (firmware update) and USB-PTP (control) transports are"
  - "numeric-value feedbacks (zoom/focus/iris/gain/shutter/bright position, R/B gain,"
  - "register values (CAM_RegisterValue mn 00h-7Fh, data 00h-FFh) are documented as a"
  - "no power-on/off sequencing requirements beyond RESET/boot timing are stated."
  - "exact default values for many registers beyond the documented initial settings."
  - "precise voltage/current limits for the DC IN rails (only the 6-12 V range is stated; no per-pin current rating)."
  - "maintenance-mode serial port is stated as 115200/8N1/none in source, but only applies"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:48:53.525Z
  matched_actions: 320
  action_count: 320
  confidence: medium
  summary: "All 320 spec actions map to verbatim VISCA opcodes in source command/inquiry lists; transport values are documented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sony FCB-ER8530 Control Spec

## Summary
The Sony FCB-ER8530 is a 4K (QFHD) block camera built around a 1/2.5-type Exmor R CMOS sensor with a 20× optical zoom lens. This spec covers VISCA camera control over a serial UART interface (CMOS 3.1V signaling on connector CN1701, VISCA protocol version 3.1V), including the full command and inquiry catalogue. USB is used only for firmware update; USB-PTP control is covered by a separate "FCB Remote Camera Control Specification for PTP" and is out of scope here.

<!-- UNRESOLVED: default VISCA baud rate at first power-on is 9600 bps per the Register Setting table, but the source does not state which baud a given shipped unit is configured to. -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: source document also describes the FCB-ER8550 (external sync, EXT_SYNC pins); those features are NOT available on the FCB-ER8530 and are excluded from this spec. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600          # stated default (Register No. 00 = 00 initial setting); supported: 9600/19200/38400/57600/115200
  data_bits: 8             # stated
  parity: none             # "Non parity" stated
  stop_bits: 1             # stated (Start bit 1, Stop bit 1)
  flow_control: none       # stated: XON/XOFF and RTS/CTS not supported
auth:
  type: none  # inferred: no auth/login procedure in source
# Physical layer note: VISCA_RxD/VISCA_TxD on CN1701 pins 24/25 are CMOS 3.1V,
# not RS-232C voltage levels. Framing is RS-232C-style async serial.
# UNRESOLVED: USB (firmware update) and USB-PTP (control) transports are
# documented separately and are not enumerated as a control transport here.
```

## Traits
```yaml
- powerable    # inferred: CAM_Power On/Off commands present
- queryable    # inferred: ~90 inquiry commands return current state
- levelable    # inferred: zoom/focus/iris/gain/shutter/bright/aperture/color gain/hue level controls
```

## Actions
```yaml
# VISCA command packets. Header byte 8X: X = camera address (1-7). Broadcast header 88h.
# Reply header Z0 where Z = camera address + 8. Terminator FFh. Literal payloads verbatim from source.

# --- System / Interface ---
- id: address_set_broadcast
  label: Address Set (Broadcast)
  kind: action
  command: "88 30 0p FF"
  params:
    - name: p
      type: integer
      description: "Address to assign (0-Fh)"

- id: if_clear
  label: IF Clear
  kind: action
  command: "8x 01 00 01 FF"
  params: []

- id: if_clear_broadcast
  label: IF Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"
  params: []

- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8x 2p FF"
  params:
    - name: p
      type: integer
      description: "Socket No. (1 or 2)"

# --- Power ---
- id: cam_power_on
  label: CAM_Power On
  kind: action
  command: "8x 01 04 00 02 FF"
  params: []

- id: cam_power_off
  label: CAM_Power Off (Standby)
  kind: action
  command: "8x 01 04 00 03 FF"
  params: []

# --- Zoom ---
- id: cam_zoom_stop
  label: CAM_Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params: []

- id: cam_zoom_tele_standard
  label: CAM_Zoom Tele (Standard)
  kind: action
  command: "8x 01 04 07 02 FF"
  params: []

- id: cam_zoom_wide_standard
  label: CAM_Zoom Wide (Standard)
  kind: action
  command: "8x 01 04 07 03 FF"
  params: []

- id: cam_zoom_tele_variable
  label: CAM_Zoom Tele (Variable)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) to 7 (High)"

- id: cam_zoom_wide_variable
  label: CAM_Zoom Wide (Variable)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) to 7 (High)"

- id: cam_zoom_direct
  label: CAM_Zoom Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: "Zoom position; Min 0000h; Max depends on mode (4000h/5556h/6000h/7AC0h)"

# --- Digital Zoom ---
- id: cam_dzoom_on
  label: CAM_DZoom On
  kind: action
  command: "8x 01 04 06 02 FF"
  params: []

- id: cam_dzoom_off
  label: CAM_DZoom Off
  kind: action
  command: "8x 01 04 06 03 FF"
  params: []

- id: cam_dzoom_super_resolution
  label: CAM_DZoom Super Resolution Zoom
  kind: action
  command: "8x 01 04 06 04 FF"
  params: []

- id: cam_dzoom_combine_mode
  label: CAM_DZoom Combine Mode
  kind: action
  command: "8x 01 04 36 00 FF"
  params: []

- id: cam_dzoom_separate_mode
  label: CAM_DZoom Separate Mode
  kind: action
  command: "8x 01 04 36 01 FF"
  params: []

- id: cam_dzoom_stop
  label: CAM_DZoom Stop
  kind: action
  command: "8x 01 04 06 00 FF"
  params: []

- id: cam_dzoom_tele_variable
  label: CAM_DZoom Tele (Variable)
  kind: action
  command: "8x 01 04 06 2p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) to 7 (High); Separate Mode only"

- id: cam_dzoom_wide_variable
  label: CAM_DZoom Wide (Variable)
  kind: action
  command: "8x 01 04 06 3p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) to 7 (High); Separate Mode only"

- id: cam_dzoom_x1_max
  label: CAM_DZoom x1/Max
  kind: action
  command: "8x 01 04 06 10 FF"
  params: []

- id: cam_dzoom_direct
  label: CAM_DZoom Direct
  kind: action
  command: "8x 01 04 46 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "D-Zoom position 00h to EBh; Separate Mode only"

# --- Focus ---
- id: cam_focus_mode_auto
  label: CAM_Focus Mode Auto Focus
  kind: action
  command: "8x 01 04 38 02 FF"
  params: []

- id: cam_focus_mode_manual
  label: CAM_Focus Mode Manual Focus
  kind: action
  command: "8x 01 04 38 03 FF"
  params: []

- id: cam_focus_mode_auto_manual
  label: CAM_Focus Mode Auto/Manual
  kind: action
  command: "8x 01 04 38 10 FF"
  params: []

- id: cam_focus_stop
  label: CAM_Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params: []

- id: cam_focus_far_standard
  label: CAM_Focus Far (Standard)
  kind: action
  command: "8x 01 04 08 02 FF"
  params: []

- id: cam_focus_near_standard
  label: CAM_Focus Near (Standard)
  kind: action
  command: "8x 01 04 08 03 FF"
  params: []

- id: cam_focus_far_variable
  label: CAM_Focus Far (Variable)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) to 7 (High)"

- id: cam_focus_near_variable
  label: CAM_Focus Near (Variable)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) to 7 (High)"

- id: cam_focus_direct
  label: CAM_Focus Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: "Focus position 0000h to F000h"

- id: cam_focus_one_push_trigger
  label: CAM_Focus One Push Trigger
  kind: action
  command: "8x 01 04 18 01 FF"
  params: []

- id: cam_focus_near_limit
  label: CAM_Focus Near Limit
  kind: action
  command: "8x 01 04 28 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: "Near limit position 1000h to F000h"

# --- AF Mode ---
- id: cam_afmode_normal
  label: CAM_AFMode Normal AF
  kind: action
  command: "8x 01 04 57 00 FF"
  params: []

- id: cam_afmode_interval
  label: CAM_AFMode Interval AF
  kind: action
  command: "8x 01 04 57 01 FF"
  params: []

- id: cam_afmode_zoom_trigger
  label: CAM_AFMode Zoom Trigger AF
  kind: action
  command: "8x 01 04 57 02 FF"
  params: []

- id: cam_afmode_active_interval_time
  label: CAM_AFMode Active/Interval Time
  kind: action
  command: "8x 01 04 27 0p 0q 0r 0s FF"
  params:
    - name: pq
      type: integer
      description: "Movement Time"
    - name: rs
      type: integer
      description: "Interval"

# --- Spot Focus ---
- id: cam_spotfocus_on
  label: CAM_SpotFocus On
  kind: action
  command: "8x 01 05 08 02 FF"
  params: []

- id: cam_spotfocus_off
  label: CAM_SpotFocus Off
  kind: action
  command: "8x 01 05 08 03 FF"
  params: []

- id: cam_spotfocus_position
  label: CAM_SpotFocus Position
  kind: action
  command: "8x 01 05 68 0p 0q 0r 0s FF"
  params:
    - name: pq
      type: integer
      description: "X (0h to Fh)"
    - name: rs
      type: integer
      description: "Y (0h to Fh)"

# --- AF Sensitivity / IR Correction ---
- id: cam_afsensitivity_normal
  label: CAM_AFSensitivity Normal
  kind: action
  command: "8x 01 04 58 02 FF"
  params: []

- id: cam_afsensitivity_low
  label: CAM_AFSensitivity Low
  kind: action
  command: "8x 01 04 58 03 FF"
  params: []

- id: cam_ircorrection_standard
  label: CAM_IRCorrection Standard
  kind: action
  command: "8x 01 04 11 00 FF"
  params: []

- id: cam_ircorrection_ir_light
  label: CAM_IRCorrection IR Light
  kind: action
  command: "8x 01 04 11 01 FF"
  params: []

# --- Zoom+Focus Direct / Initialize ---
- id: cam_zoomfocus_direct
  label: CAM_ZoomFocus Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF"
  params:
    - name: pqrs
      type: integer
      description: "Zoom Position"
    - name: tuvw
      type: integer
      description: "Focus Position"

- id: cam_initialize_lens
  label: CAM_Initialize Lens
  kind: action
  command: "8x 01 04 19 01 FF"
  params: []

- id: cam_initialize_camera
  label: CAM_Initialize Camera
  kind: action
  command: "8x 01 04 19 03 FF"
  params: []

# --- White Balance ---
- id: cam_wb_auto
  label: CAM_WB Auto
  kind: action
  command: "8x 01 04 35 00 FF"
  params: []

- id: cam_wb_indoor
  label: CAM_WB Indoor
  kind: action
  command: "8x 01 04 35 01 FF"
  params: []

- id: cam_wb_outdoor
  label: CAM_WB Outdoor
  kind: action
  command: "8x 01 04 35 02 FF"
  params: []

- id: cam_wb_one_push
  label: CAM_WB One Push WB
  kind: action
  command: "8x 01 04 35 03 FF"
  params: []

- id: cam_wb_atw
  label: CAM_WB ATW
  kind: action
  command: "8x 01 04 35 04 FF"
  params: []

- id: cam_wb_manual
  label: CAM_WB Manual
  kind: action
  command: "8x 01 04 35 05 FF"
  params: []

- id: cam_wb_outdoor_auto
  label: CAM_WB Outdoor Auto
  kind: action
  command: "8x 01 04 35 06 FF"
  params: []

- id: cam_wb_sodium_lamp_auto
  label: CAM_WB Sodium Lamp Auto
  kind: action
  command: "8x 01 04 35 07 FF"
  params: []

- id: cam_wb_sodium_lamp
  label: CAM_WB Sodium Lamp
  kind: action
  command: "8x 01 04 35 08 FF"
  params: []

- id: cam_wb_sodium_lamp_outdoor_auto
  label: CAM_WB Sodium Lamp Outdoor Auto
  kind: action
  command: "8x 01 04 35 09 FF"
  params: []

- id: cam_wbtrigger_one_push
  label: CAM_WBTrigger One Push Trigger
  kind: action
  command: "8x 01 04 10 05 FF"
  params: []

# --- R/B Gain ---
- id: cam_rgain_reset
  label: CAM_RGain Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params: []

- id: cam_rgain_up
  label: CAM_RGain Up
  kind: action
  command: "8x 01 04 03 02 FF"
  params: []

- id: cam_rgain_down
  label: CAM_RGain Down
  kind: action
  command: "8x 01 04 03 03 FF"
  params: []

- id: cam_rgain_direct
  label: CAM_RGain Direct
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "R Gain 00h to FFh"

- id: cam_bgain_reset
  label: CAM_BGain Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params: []

- id: cam_bgain_up
  label: CAM_BGain Up
  kind: action
  command: "8x 01 04 04 02 FF"
  params: []

- id: cam_bgain_down
  label: CAM_BGain Down
  kind: action
  command: "8x 01 04 04 03 FF"
  params: []

- id: cam_bgain_direct
  label: CAM_BGain Direct
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "B Gain 00h to FFh"

# --- AE Mode ---
- id: cam_ae_full_auto
  label: CAM_AE Full Auto
  kind: action
  command: "8x 01 04 39 00 FF"
  params: []

- id: cam_ae_manual
  label: CAM_AE Manual
  kind: action
  command: "8x 01 04 39 03 FF"
  params: []

- id: cam_ae_shutter_priority
  label: CAM_AE Shutter Priority
  kind: action
  command: "8x 01 04 39 0A FF"
  params: []

- id: cam_ae_iris_priority
  label: CAM_AE Iris Priority
  kind: action
  command: "8x 01 04 39 0B FF"
  params: []

- id: cam_ae_gain_priority
  label: CAM_AE Gain Priority
  kind: action
  command: "8x 01 04 39 0E FF"
  params: []

- id: cam_ae_bright
  label: CAM_AE Bright
  kind: action
  command: "8x 01 04 39 0D FF"
  params: []

# --- Low Light Basis Brightness ---
- id: cam_lowlight_basis_on
  label: CAM_LowLightBasisBrightness On
  kind: action
  command: "8x 01 05 39 02 FF"
  params: []

- id: cam_lowlight_basis_off
  label: CAM_LowLightBasisBrightness Off
  kind: action
  command: "8x 01 05 39 03 FF"
  params: []

- id: cam_lowlight_basis_position
  label: CAM_LowLightBasisBrightness Position
  kind: action
  command: "8x 01 05 49 0p FF"
  params:
    - name: p
      type: integer
      description: "Position"

# --- Shutter ---
- id: cam_shutter_reset
  label: CAM_Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params: []

- id: cam_shutter_up
  label: CAM_Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params: []

- id: cam_shutter_down
  label: CAM_Shutter Down
  kind: action
  command: "8x 01 04 0A 03 FF"
  params: []

- id: cam_shutter_direct
  label: CAM_Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Shutter Position"

- id: cam_maxshutter_limit
  label: CAM_MaxShutter Limit
  kind: action
  command: "8x 01 05 2A 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "High-speed shutter limit"

- id: cam_minshutter_limit
  label: CAM_MinShutter Limit
  kind: action
  command: "8x 01 05 2A 01 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Low-speed shutter limit"

# --- Slow Shutter ---
- id: cam_slowshutter_on
  label: CAM_SlowShutter On
  kind: action
  command: "8x 01 04 5A 02 FF"
  params: []

- id: cam_slowshutter_off
  label: CAM_SlowShutter Off
  kind: action
  command: "8x 01 04 5A 03 FF"
  params: []

- id: cam_slowshutter_limit
  label: CAM_SlowShutter Limit
  kind: action
  command: "8x 01 05 5A 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Slow Shutter Limit"

# --- Iris ---
- id: cam_iris_reset
  label: CAM_Iris Reset
  kind: action
  command: "8x 01 04 0B 00 FF"
  params: []

- id: cam_iris_up
  label: CAM_Iris Up
  kind: action
  command: "8x 01 04 0B 02 FF"
  params: []

- id: cam_iris_down
  label: CAM_Iris Down
  kind: action
  command: "8x 01 04 0B 03 FF"
  params: []

- id: cam_iris_direct
  label: CAM_Iris Direct
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Iris Position"

# --- Gain ---
- id: cam_gain_reset
  label: CAM_Gain Reset
  kind: action
  command: "8x 01 04 0C 00 FF"
  params: []

- id: cam_gain_up
  label: CAM_Gain Up
  kind: action
  command: "8x 01 04 0C 02 FF"
  params: []

- id: cam_gain_down
  label: CAM_Gain Down
  kind: action
  command: "8x 01 04 0C 03 FF"
  params: []

- id: cam_gain_direct
  label: CAM_Gain Direct
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Gain Position"

- id: cam_gain_limit
  label: CAM_Gain Gain Limit
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: p
      type: integer
      description: "Gain Limit"

- id: cam_gain_point_pos
  label: CAM_Gain Gain Point Pos
  kind: action
  command: "8x 01 05 4C 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Gain Point"

- id: cam_gain_point_on_off
  label: CAM_Gain Gain Point On/Off
  kind: action
  command: "8x 01 05 0C 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

# --- Bright ---
- id: cam_bright_reset
  label: CAM_Bright Reset
  kind: action
  command: "8x 01 04 0D 00 FF"
  params: []

- id: cam_bright_up
  label: CAM_Bright Up
  kind: action
  command: "8x 01 04 0D 02 FF"
  params: []

- id: cam_bright_down
  label: CAM_Bright Down
  kind: action
  command: "8x 01 04 0D 03 FF"
  params: []

- id: cam_bright_direct
  label: CAM_Bright Direct
  kind: action
  command: "8x 01 04 4D 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Bright Position"

# --- Exposure Compensation ---
- id: cam_expcomp_on
  label: CAM_ExpComp On
  kind: action
  command: "8x 01 04 3E 02 FF"
  params: []

- id: cam_expcomp_off
  label: CAM_ExpComp Off
  kind: action
  command: "8x 01 04 3E 03 FF"
  params: []

- id: cam_expcomp_reset
  label: CAM_ExpComp Reset
  kind: action
  command: "8x 01 04 0E 00 FF"
  params: []

- id: cam_expcomp_up
  label: CAM_ExpComp Up
  kind: action
  command: "8x 01 04 0E 02 FF"
  params: []

- id: cam_expcomp_down
  label: CAM_ExpComp Down
  kind: action
  command: "8x 01 04 0E 03 FF"
  params: []

- id: cam_expcomp_direct
  label: CAM_ExpComp Direct
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "ExpComp Position 00h to 0Eh"

# --- Backlight / Spot AE / AE Response ---
- id: cam_backlight_on
  label: CAM_Backlight On
  kind: action
  command: "8x 01 04 33 02 FF"
  params: []

- id: cam_backlight_off
  label: CAM_Backlight Off
  kind: action
  command: "8x 01 04 33 03 FF"
  params: []

- id: cam_spotae_on
  label: CAM_SpotAE On
  kind: action
  command: "8x 01 04 59 02 FF"
  params: []

- id: cam_spotae_off
  label: CAM_SpotAE Off
  kind: action
  command: "8x 01 04 59 03 FF"
  params: []

- id: cam_spotae_position
  label: CAM_SpotAE Position
  kind: action
  command: "8x 01 04 29 0p 0q 0r 0s FF"
  params:
    - name: pq
      type: integer
      description: "X (0h to Fh)"
    - name: rs
      type: integer
      description: "Y (0h to Fh)"

- id: cam_ae_response_direct
  label: CAM_AE_Response Direct
  kind: action
  command: "8x 01 04 5D pp FF"
  params:
    - name: pp
      type: integer
      description: "AE Response 01h to 30h (default 01h)"

# --- Visibility Enhancement (VE) ---
- id: cam_ve_off
  label: CAM_VE Off
  kind: action
  command: "8x 01 04 3D 03 FF"
  params: []

- id: cam_ve_on
  label: CAM_VE VE On
  kind: action
  command: "8x 01 04 3D 06 FF"
  params: []

- id: cam_ve_set_parameter
  label: CAM_VE Set Parameter
  kind: action
  command: "8x 01 04 2D 00 0q 0r 0s 00 00 00 00 FF"
  params:
    - name: q
      type: integer
      description: "Display brightness level (0 Dark to 6 Bright)"
    - name: r
      type: integer
      description: "Brightness compensation selection (0 Very dark, 1 Dark, 2 Standard, 3 Bright)"
    - name: s
      type: integer
      description: "Compensation level (0 Low, 1 Mid, 2 High)"

# --- Defog ---
- id: cam_defog_on
  label: CAM_Defog On
  kind: action
  command: "8x 01 04 37 02 0p FF"
  params:
    - name: p
      type: integer
      description: "Defog level (0 mid, 1 low, 2 mid, 3 high)"

- id: cam_defog_off
  label: CAM_Defog Off
  kind: action
  command: "8x 01 04 37 03 00 FF"
  params: []

# --- Aperture ---
- id: cam_aperture_reset
  label: CAM_Aperture Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params: []

- id: cam_aperture_up
  label: CAM_Aperture Up
  kind: action
  command: "8x 01 04 02 02 FF"
  params: []

- id: cam_aperture_down
  label: CAM_Aperture Down
  kind: action
  command: "8x 01 04 02 03 FF"
  params: []

- id: cam_aperture_level
  label: CAM_Aperture Level
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Aperture Gain 00h to 0Fh"

- id: cam_aperture_mode
  label: CAM_Aperture Mode
  kind: action
  command: "8x 01 05 42 01 0p FF"
  params:
    - name: p
      type: integer
      description: "0 Auto, 1 Manual"

- id: cam_aperture_bandwidth
  label: CAM_Aperture BandWidth
  kind: action
  command: "8x 01 05 42 02 0p FF"
  params:
    - name: p
      type: integer
      description: "0 default, 1 low, 2 mid, 3 wide, 4 broad"

- id: cam_aperture_crispening
  label: CAM_Aperture Crispening
  kind: action
  command: "8x 01 05 42 03 0p FF"
  params:
    - name: p
      type: integer
      description: "Crispening 0h to 7h"

- id: cam_aperture_hv_balance
  label: CAM_Aperture H/V balance
  kind: action
  command: "8x 01 05 42 04 0p FF"
  params:
    - name: p
      type: integer
      description: "H/V Balance 5h to 9h"

- id: cam_aperture_bw_balance
  label: CAM_Aperture B/W balance
  kind: action
  command: "8x 01 05 42 05 0p FF"
  params:
    - name: p
      type: integer
      description: "B/W Balance 0h to 4h"

- id: cam_aperture_limit
  label: CAM_Aperture Limit
  kind: action
  command: "8x 01 05 42 06 0p FF"
  params:
    - name: p
      type: integer
      description: "Limit 0h to 7h"

- id: cam_aperture_highlight_detail
  label: CAM_Aperture HighLightDetail
  kind: action
  command: "8x 01 05 42 07 0p FF"
  params:
    - name: p
      type: integer
      description: "High light detail 0h to 4h"

- id: cam_aperture_super_low
  label: CAM_Aperture SuperLow
  kind: action
  command: "8x 01 05 42 08 0p FF"
  params:
    - name: p
      type: integer
      description: "Super low emphasis 0h to 7h"

# --- High Resolution / NR / Stabilizer ---
- id: cam_hr_on
  label: CAM_HR On
  kind: action
  command: "8x 01 04 52 02 FF"
  params: []

- id: cam_hr_off
  label: CAM_HR Off
  kind: action
  command: "8x 01 04 52 03 FF"
  params: []

- id: cam_nr_noise_reduction
  label: CAM_NR Noise Reduction
  kind: action
  command: "8x 01 04 53 pp FF"
  params:
    - name: p
      type: integer
      description: "00h Off, 01h-05h level, 7Fh 2D/3D manual"

- id: cam_nr_2d_3d
  label: CAM_NR 2D NR/3D NR
  kind: action
  command: "8x 01 05 53 0p 0q FF"
  params:
    - name: p
      type: integer
      description: "2D NR level 0h to 5h"
    - name: q
      type: integer
      description: "3D NR level 0h to 5h"

- id: cam_stabilizer_on
  label: CAM_Stabilizer On
  kind: action
  command: "8x 01 04 34 02 FF"
  params: []

- id: cam_stabilizer_off
  label: CAM_Stabilizer Off
  kind: action
  command: "8x 01 04 34 03 FF"
  params: []

# --- Gamma ---
- id: cam_gamma
  label: CAM_Gamma
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: p
      type: integer
      description: "0 Standard, 1 Straight, 2 Pattern"

- id: cam_gamma_pattern
  label: CAM_Gamma Pattern
  kind: action
  command: "8x 01 05 5B 0p 0q 0r FF"
  params:
    - name: pqr
      type: integer
      description: "Selection pattern 001h to 200h"

- id: cam_gamma_offset
  label: CAM_Gamma Offset
  kind: action
  command: "8x 01 04 1E 00 00 00 0s 0t 0u FF"
  params:
    - name: s
      type: integer
      description: "Polarity offset (0 plus, 1 minus)"
    - name: tu
      type: integer
      description: "Offset 00h to 40h"

# --- High Sensitivity / LR Reverse / Freeze / Picture Effect / Flip ---
- id: cam_highsensitivity_on
  label: CAM_HighSensitivity On
  kind: action
  command: "8x 01 04 5E 02 FF"
  params: []

- id: cam_highsensitivity_off
  label: CAM_HighSensitivity Off
  kind: action
  command: "8x 01 04 5E 03 FF"
  params: []

- id: cam_lr_reverse_on
  label: CAM_LR_Reverse On
  kind: action
  command: "8x 01 04 61 02 FF"
  params: []

- id: cam_lr_reverse_off
  label: CAM_LR_Reverse Off
  kind: action
  command: "8x 01 04 61 03 FF"
  params: []

- id: cam_freeze_on
  label: CAM_Freeze On
  kind: action
  command: "8x 01 04 62 02 FF"
  params: []

- id: cam_freeze_off
  label: CAM_Freeze Off
  kind: action
  command: "8x 01 04 62 03 FF"
  params: []

- id: cam_picture_effect_off
  label: CAM_PictureEffect Off
  kind: action
  command: "8x 01 04 63 00 FF"
  params: []

- id: cam_picture_effect_bw
  label: CAM_PictureEffect Black & White
  kind: action
  command: "8x 01 04 63 04 FF"
  params: []

- id: cam_picture_flip_on
  label: CAM_PictureFlip On (E-Flip)
  kind: action
  command: "8x 01 04 66 02 FF"
  params: []

- id: cam_picture_flip_off
  label: CAM_PictureFlip Off
  kind: action
  command: "8x 01 04 66 03 FF"
  params: []

# --- ICR / Auto ICR ---
- id: cam_icr_on
  label: CAM_ICR On
  kind: action
  command: "8x 01 04 01 02 FF"
  params: []

- id: cam_icr_off
  label: CAM_ICR Off
  kind: action
  command: "8x 01 04 01 03 FF"
  params: []

- id: cam_autoicr_on
  label: CAM_AutoICR On
  kind: action
  command: "8x 01 04 51 02 FF"
  params: []

- id: cam_autoicr_off
  label: CAM_AutoICR Off
  kind: action
  command: "8x 01 04 51 03 FF"
  params: []

- id: cam_autoicr_threshold
  label: CAM_AutoICR Threshold
  kind: action
  command: "8x 01 04 21 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "ICR OnOff Threshold Level 00h to FFh"

- id: cam_autoicr_alarm_reply_on
  label: CAM_AutoICRAlarmReply On
  kind: action
  command: "8x 01 04 31 02 FF"
  params: []

- id: cam_autoicr_alarm_reply_off
  label: CAM_AutoICRAlarmReply Off
  kind: action
  command: "8x 01 04 31 03 FF"
  params: []

# --- Memory / Custom Preset ---
- id: cam_memory_reset
  label: CAM_Memory Reset
  kind: action
  command: "8x 01 04 3F 00 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0h to 63h"

- id: cam_memory_set
  label: CAM_Memory Set
  kind: action
  command: "8x 01 04 3F 01 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0h to 63h"

- id: cam_memory_recall
  label: CAM_Memory Recall
  kind: action
  command: "8x 01 04 3F 02 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0h to 63h"

- id: cam_custom_reset
  label: CAM_Custom Reset
  kind: action
  command: "8x 01 04 3F 00 7F FF"
  params: []

- id: cam_custom_set
  label: CAM_Custom Set
  kind: action
  command: "8x 01 04 3F 01 7F FF"
  params: []

- id: cam_custom_recall
  label: CAM_Custom Recall
  kind: action
  command: "8x 01 04 3F 02 7F FF"
  params: []

- id: cam_memsave_write
  label: CAM_MemSave Write
  kind: action
  command: "8x 01 04 23 0X 0p 0q 0r 0s FF"
  params:
    - name: X
      type: integer
      description: "Address 00h to 07h (16 bytes each)"
    - name: pqrs
      type: integer
      description: "Data 0000h to FFFFh"

# --- Display / Title / Mute ---
- id: cam_display_on
  label: CAM_Display On
  kind: action
  command: "8x 01 04 15 02 FF"
  params: []

- id: cam_display_off
  label: CAM_Display Off
  kind: action
  command: "8x 01 04 15 03 FF"
  params: []

- id: cam_display_toggle
  label: CAM_Display On/Off
  kind: action
  command: "8x 01 04 15 10 FF"
  params: []

- id: cam_multiline_title_set1
  label: CAM_MultiLineTitle Title Set1
  kind: action
  command: "8x 01 04 73 1L 00 nn pp qq 00 00 00 00 00 00 FF"
  params:
    - name: L
      type: integer
      description: "Line Number"
    - name: nn
      type: integer
      description: "H-position"
    - name: pp
      type: integer
      description: "Color"
    - name: qq
      type: integer
      description: "Blink"

- id: cam_multiline_title_set2
  label: CAM_MultiLineTitle Title Set2
  kind: action
  command: "8x 01 04 73 2L mm nn pp qq rr ss tt uu vv ww FF"
  params:
    - name: L
      type: integer
      description: "Line Number"
    - name: "m n p q r s t u v w"
      type: integer
      description: "Characters 1 to 10"

- id: cam_multiline_title_set3
  label: CAM_MultiLineTitle Title Set3
  kind: action
  command: "8x 01 04 73 3L mm nn pp qq rr ss tt uu vv ww FF"
  params:
    - name: L
      type: integer
      description: "Line Number"
    - name: "m n p q r s t u v w"
      type: integer
      description: "Characters 11 to 20"

- id: cam_multiline_title_clear
  label: CAM_MultiLineTitle Title Clear
  kind: action
  command: "8x 01 04 74 1p FF"
  params:
    - name: p
      type: integer
      description: "0h to Ah, F = all lines"

- id: cam_multiline_title_on
  label: CAM_MultiLineTitle On
  kind: action
  command: "8x 01 04 74 2p FF"
  params:
    - name: p
      type: integer
      description: "0h to Ah, F = all lines"

- id: cam_multiline_title_off
  label: CAM_MultiLineTitle Off
  kind: action
  command: "8x 01 04 74 3p FF"
  params:
    - name: p
      type: integer
      description: "0h to Ah, F = all lines"

- id: cam_mute_on
  label: CAM_Mute On
  kind: action
  command: "8x 01 04 75 02 FF"
  params: []

- id: cam_mute_off
  label: CAM_Mute Off
  kind: action
  command: "8x 01 04 75 03 FF"
  params: []

- id: cam_mute_toggle
  label: CAM_Mute On/Off
  kind: action
  command: "8x 01 04 75 10 FF"
  params: []

# --- Privacy Zone / Mask ---
- id: cam_privacyzone_set_mask
  label: CAM_PrivacyZone SetMask
  kind: action
  command: "8x 01 04 76 mm nn 0r 0r 0s 0s FF"
  params:
    - name: mm
      type: integer
      description: "Mask Settings"
    - name: nn
      type: integer
      description: "00 Modify, 01 New"
    - name: rr
      type: integer
      description: "Width"
    - name: ss
      type: integer
      description: "Height"

- id: cam_privacyzone_set_mask_table
  label: CAM_PrivacyZone SetMaskTable
  kind: action
  command: "8x 01 05 70 0p FF"
  params:
    - name: p
      type: integer
      description: "Table 0h to 1h"

- id: cam_privacyzone_display
  label: CAM_PrivacyZone Display
  kind: action
  command: "8x 01 04 77 pp pp pp pp FF"
  params:
    - name: "pp pp pp pp"
      type: integer
      description: "Mask Display per-mask (0 Off, 1 On)"

- id: cam_privacyzone_set_mask_color
  label: CAM_PrivacyZone SetMaskColor
  kind: action
  command: "8x 01 04 78 pp pp pp pp qq rr FF"
  params:
    - name: "pp pp pp pp"
      type: integer
      description: "Mask Color Settings"
    - name: qq
      type: integer
      description: "Color when 0 selected"
    - name: rr
      type: integer
      description: "Color when 1 selected"

- id: cam_privacyzone_set_pantilt_angle
  label: CAM_PrivacyZone SetPanTiltAngle
  kind: action
  command: "8x 01 04 79 0p 0p 0p 0q 0q 0q FF"
  params:
    - name: ppp
      type: integer
      description: "Pan angle"
    - name: qqq
      type: integer
      description: "Tilt angle"

- id: cam_privacyzone_set_ptz_mask
  label: CAM_PrivacyZone SetPTZMask
  kind: action
  command: "8x 01 04 7B mm 0p 0p 0p 0q 0q 0q 0r 0r 0r 0r FF"
  params:
    - name: mm
      type: integer
      description: "Mask Settings"
    - name: ppp
      type: integer
      description: "Pan"
    - name: qqq
      type: integer
      description: "Tilt"
    - name: rrrr
      type: integer
      description: "Zoom"

- id: cam_privacyzone_non_interlock_mask
  label: CAM_PrivacyZone Non_InterlockMask
  kind: action
  command: "8x 01 04 6F mm 0p 0p 0q 0q 0r 0r 0s 0s FF"
  params:
    - name: mm
      type: integer
      description: "Non_Interlock Mask Settings"
    - name: pp
      type: integer
      description: "X"
    - name: qq
      type: integer
      description: "Y"
    - name: rr
      type: integer
      description: "W"
    - name: ss
      type: integer
      description: "H"

- id: cam_privacyzone_center_line_off
  label: CAM_PrivacyZone CenterLineOff
  kind: action
  command: "8x 01 04 7C 03 FF"
  params: []

- id: cam_privacyzone_center_line_on
  label: CAM_PrivacyZone CenterLineOn
  kind: action
  command: "8x 01 04 7C 04 FF"
  params: []

# --- ID / Continuous Reply / Intervals ---
- id: cam_id_write
  label: CAM_IDWrite
  kind: action
  command: "8x 01 04 22 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: "Camera ID 0000h to FFFFh"

- id: cam_continuous_zoom_pos_reply_on
  label: CAM_Continuous ZoomPosReply On
  kind: action
  command: "8x 01 04 69 02 FF"
  params: []

- id: cam_continuous_zoom_pos_reply_off
  label: CAM_Continuous ZoomPosReply Off
  kind: action
  command: "8x 01 04 69 03 FF"
  params: []

- id: cam_zoom_pos_reply_interval_time_set
  label: CAM_ZoomPosReplyIntervalTimeSet
  kind: action
  command: "8x 01 04 6A 00 00 0p 0p FF"
  params:
    - name: pp
      type: integer
      description: "Interval Time [V cycle] 01h to FFh"

- id: cam_continuous_focus_pos_reply_on
  label: CAM_Continuous FocusPosReply On
  kind: action
  command: "8x 01 04 16 02 FF"
  params: []

- id: cam_continuous_focus_pos_reply_off
  label: CAM_Continuous FocusPosReply Off
  kind: action
  command: "8x 01 04 16 03 FF"
  params: []

- id: cam_focus_pos_reply_interval_time_set
  label: CAM_FocusPosReplyIntervalTimeSet
  kind: action
  command: "8x 01 04 1A 00 00 0p 0p FF"
  params:
    - name: pp
      type: integer
      description: "Interval Time [V cycle] 01h to FFh"

# --- Register / Chroma / Color ---
- id: cam_register_value
  label: CAM_RegisterValue
  kind: action
  command: "8x 01 04 24 mn 0p 0q FF"
  params:
    - name: mn
      type: integer
      description: "Register No. 00h to 7Fh"
    - name: pq
      type: integer
      description: "Register Value 00h to FFh"

- id: cam_chroma_suppress
  label: CAM_ChromaSuppress
  kind: action
  command: "8x 01 04 5F 0p FF"
  params:
    - name: p
      type: integer
      description: "00 Off, 01h-03h On (3 levels)"

- id: cam_color_gain_direct
  label: CAM_ColorGain Direct
  kind: action
  command: "8x 01 04 49 00 00 00 0p FF"
  params:
    - name: p
      type: integer
      description: "Color Gain 0h (60%) to Eh (200%)"

- id: cam_color_hue_direct
  label: CAM_ColorHue Direct
  kind: action
  command: "8x 01 04 4F 00 00 00 0p FF"
  params:
    - name: p
      type: integer
      description: "Color Hue 0h (-14 deg) to Eh (+14 deg)"

# --- Extended Commands (require Extended Mode register 5F on) ---
- id: cam_ex_expcomp_reset
  label: CAM_ExExpComp Reset (Extended)
  kind: action
  command: "8x 01 04 1F 0E 00 00 FF"
  params: []

- id: cam_ex_expcomp_up
  label: CAM_ExExpComp Up (Extended)
  kind: action
  command: "8x 01 04 1F 0E 02 pp FF"
  params:
    - name: pp
      type: integer
      description: "Step number 00h to 7Fh (00h same as 01h)"

- id: cam_ex_expcomp_down
  label: CAM_ExExpComp Down (Extended)
  kind: action
  command: "8x 01 04 1F 0E 03 pp FF"
  params:
    - name: pp
      type: integer
      description: "Step number 00h to 7Fh (00h same as 01h)"

- id: cam_ex_expcomp_direct
  label: CAM_ExExpComp Direct (Extended)
  kind: action
  command: "8x 01 04 1F 4E 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Level 00h to FFh"

- id: cam_ex_aperture_reset
  label: CAM_ExAperture Reset (Extended)
  kind: action
  command: "8x 01 04 1F 02 00 00 FF"
  params: []

- id: cam_ex_aperture_up
  label: CAM_ExAperture Up (Extended)
  kind: action
  command: "8x 01 04 1F 02 02 pp FF"
  params:
    - name: pp
      type: integer
      description: "Step number 00h to 7Fh (00h same as 01h)"

- id: cam_ex_aperture_down
  label: CAM_ExAperture Down (Extended)
  kind: action
  command: "8x 01 04 1F 02 03 pp FF"
  params:
    - name: pp
      type: integer
      description: "Step number 00h to 7Fh (00h same as 01h)"

- id: cam_ex_aperture_direct
  label: CAM_ExAperture Direct (Extended)
  kind: action
  command: "8x 01 04 1F 42 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Level 00h to FFh"

- id: cam_ex_autoicr_threshold_on_off
  label: CAM_ExAutoICR Threshold ON to OFF (Extended)
  kind: action
  command: "8x 01 04 1F 21 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "ICR ON to OFF threshold 00h to FFh"

- id: cam_ex_autoicr_on_level
  label: CAM_ExAutoICR On Level (Extended)
  kind: action
  command: "8x 01 04 1F 21 01 00 0r 0s FF"
  params:
    - name: rs
      type: integer
      description: "ICR OFF to ON threshold 00h to 16h"

- id: cam_ex_color_gain_direct
  label: CAM_ExColorGain Direct (Extended)
  kind: action
  command: "8x 01 04 1F 49 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Gain 00h (0%) to FFh (200%)"

- id: cam_ex_color_hue_direct
  label: CAM_ExColorHue Direct (Extended)
  kind: action
  command: "8x 01 04 1F 4F 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Phase 00h (-14 deg) to FFh (14 deg)"

# --- HLC / Color Bar ---
- id: cam_hlc_parameter_set
  label: CAM_HLC Parameter Set
  kind: action
  command: "8x 01 04 14 0p 0q FF"
  params:
    - name: p
      type: integer
      description: "HLC level (0 Off, 1 On)"
    - name: q
      type: integer
      description: "HLC mask level (0 Off, 1 On)"

- id: cam_color_bar_off
  label: CAM_ColorBar Off
  kind: action
  command: "8x 01 7E 04 7D 00 FF"
  params: []

- id: cam_color_bar_100_8
  label: CAM_ColorBar On (100% 8 colors)
  kind: action
  command: "8x 01 7E 04 7D 01 FF"
  params: []

- id: cam_color_bar_100_7
  label: CAM_ColorBar On (100% 7 colors)
  kind: action
  command: "8x 01 7E 04 7D 02 FF"
  params: []

- id: cam_color_bar_gray_scale
  label: CAM_ColorBar On (Gray scale)
  kind: action
  command: "8x 01 7E 04 7D 03 FF"
  params: []

# --- Electronic Pan/Tilt (ePT) ---
- id: cam_ept_on
  label: CAM_ePT On
  kind: action
  command: "8x 01 7E 06 00 02 FF"
  params: []

- id: cam_ept_off
  label: CAM_ePT Off
  kind: action
  command: "8x 01 7E 06 00 03 FF"
  params: []

- id: cam_ept_absolute_position
  label: CAM_ePT Absolute Position
  kind: action
  command: "8x 01 7E 06 20 00 00 0y 0y 0y 0y 0z 0z 0z 0z FF"
  params:
    - name: yyyy
      type: integer
      description: "Pan position (units of 6 pixels)"
    - name: zzzz
      type: integer
      description: "Tilt position (units of 4.5 pixels)"

# --- Maintenance Mode (firmware update; SAFETY-CRITICAL) ---
- id: cam_maintenance_mode_step1
  label: CAM_MaintenanceMode Step1
  kind: action
  command: "8x 01 04 00 0C FF"
  params: []

- id: cam_maintenance_mode_step2
  label: CAM_MaintenanceMode Step2
  kind: action
  command: "8x 01 04 00 0D FF"
  params: []

- id: cam_maintenance_mode_step3
  label: CAM_MaintenanceMode Step3
  kind: action
  command: "8x 01 04 00 13 FF"
  params: []

- id: cam_maintenance_mode_step4
  label: CAM_MaintenanceMode Step4
  kind: action
  command: "8x 01 04 00 04 FF"
  params: []

- id: cam_maintenance_mode_update
  label: CAM_MaintenanceMode Update
  kind: action
  command: "8x 01 04 00 20 FF"
  params: []

# --- Inquiry Commands (kind: query) ---
- id: cam_power_inq
  label: CAM_PowerInq
  kind: query
  command: "8x 09 04 00 FF"
  params: []

- id: cam_zoom_pos_inq
  label: CAM_ZoomPosInq
  kind: query
  command: "8x 09 04 47 FF"
  params: []

- id: cam_dzoom_mode_inq
  label: CAM_DZoomModeInq
  kind: query
  command: "8x 09 04 06 FF"
  params: []

- id: cam_dzoom_cs_mode_inq
  label: CAM_DZoomC/SModeInq
  kind: query
  command: "8x 09 04 36 FF"
  params: []

- id: cam_dzoom_pos_inq
  label: CAM_DZoomPosInq
  kind: query
  command: "8x 09 04 46 FF"
  params: []

- id: cam_focus_mode_inq
  label: CAM_FocusModeInq
  kind: query
  command: "8x 09 04 38 FF"
  params: []

- id: cam_focus_pos_inq
  label: CAM_FocusPosInq
  kind: query
  command: "8x 09 04 48 FF"
  params: []

- id: cam_focus_near_limit_inq
  label: CAM_FocusNearLimitInq
  kind: query
  command: "8x 09 04 28 FF"
  params: []

- id: cam_spot_focus_mode_inq
  label: CAM_SpotFocusModeInq
  kind: query
  command: "8x 09 05 08 FF"
  params: []

- id: cam_spot_focus_pos_inq
  label: CAM_SpotFocusPosInq
  kind: query
  command: "8x 09 05 68 FF"
  params: []

- id: cam_af_sensitivity_inq
  label: CAM_AFSensitivityInq
  kind: query
  command: "8x 09 04 58 FF"
  params: []

- id: cam_af_mode_inq
  label: CAM_AFModeInq
  kind: query
  command: "8x 09 04 57 FF"
  params: []

- id: cam_af_time_setting_inq
  label: CAM_AFTimeSettingInq
  kind: query
  command: "8x 09 04 27 FF"
  params: []

- id: cam_low_light_basis_brightness_inq
  label: CAM_LowLightBasisBrightnessInq
  kind: query
  command: "8x 09 05 39 FF"
  params: []

- id: cam_low_light_basis_brightness_pos_inq
  label: CAM_LowLightBasisBrightnessPosInq
  kind: query
  command: "8x 09 05 49 FF"
  params: []

- id: cam_ir_correction_inq
  label: CAM_IRCorrectionInq
  kind: query
  command: "8x 09 04 11 FF"
  params: []

- id: cam_wb_mode_inq
  label: CAM_WBModeInq
  kind: query
  command: "8x 09 04 35 FF"
  params: []

- id: cam_r_gain_inq
  label: CAM_RGainInq
  kind: query
  command: "8x 09 04 43 FF"
  params: []

- id: cam_b_gain_inq
  label: CAM_BGainInq
  kind: query
  command: "8x 09 04 44 FF"
  params: []

- id: cam_ae_mode_inq
  label: CAM_AEModeInq
  kind: query
  command: "8x 09 04 39 FF"
  params: []

- id: cam_shutter_pos_inq
  label: CAM_ShutterPosInq
  kind: query
  command: "8x 09 04 4A FF"
  params: []

- id: cam_max_shutter_inq
  label: CAM_MaxShutterInq
  kind: query
  command: "8x 09 05 2A 00 FF"
  params: []

- id: cam_min_shutter_inq
  label: CAM_MinShutterInq
  kind: query
  command: "8x 09 05 2A 01 FF"
  params: []

- id: cam_slow_shutter_inq
  label: CAM_SlowShutterInq
  kind: query
  command: "8x 09 04 5A FF"
  params: []

- id: cam_slow_shutter_limit_inq
  label: CAM_SlowShutterLimitInq
  kind: query
  command: "8x 09 05 5A FF"
  params: []

- id: cam_iris_pos_inq
  label: CAM_IrisPosInq
  kind: query
  command: "8x 09 04 4B FF"
  params: []

- id: cam_gain_pos_inq
  label: CAM_GainPosInq
  kind: query
  command: "8x 09 04 4C FF"
  params: []

- id: cam_gain_limit_inq
  label: CAM_GainLimitInq
  kind: query
  command: "8x 09 04 2C FF"
  params: []

- id: cam_gain_point_inq
  label: CAM_GainPointInq
  kind: query
  command: "8x 09 05 4C FF"
  params: []

- id: cam_gain_point_on_off_inq
  label: Gain Point On/Off Inq
  kind: query
  command: "8x 09 05 0C FF"
  params: []

- id: cam_bright_pos_inq
  label: CAM_BrightPosInq
  kind: query
  command: "8x 09 04 4D FF"
  params: []

- id: cam_exp_comp_mode_inq
  label: CAM_ExpCompModeInq
  kind: query
  command: "8x 09 04 3E FF"
  params: []

- id: cam_exp_comp_pos_inq
  label: CAM_ExpCompPosInq
  kind: query
  command: "8x 09 04 4E FF"
  params: []

- id: cam_backlight_mode_inq
  label: CAM_BackLightModeInq
  kind: query
  command: "8x 09 04 33 FF"
  params: []

- id: cam_spot_ae_pos_inq
  label: CAM_SpotAEPosInq
  kind: query
  command: "8x 09 04 29 FF"
  params: []

- id: cam_spot_ae_mode_inq
  label: CAM_SpotAEModeInq
  kind: query
  command: "8x 09 04 59 FF"
  params: []

- id: cam_ve_mode_inq
  label: CAM_VEModeInq
  kind: query
  command: "8x 09 04 3D FF"
  params: []

- id: cam_ve_parameter_inq
  label: CAM_VEParameterInq
  kind: query
  command: "8x 09 04 2D FF"
  params: []

- id: cam_ae_response_inq
  label: CAM_AEResponseInq
  kind: query
  command: "8x 09 04 5D FF"
  params: []

- id: cam_defog_inq
  label: CAM_DefogInq
  kind: query
  command: "8x 09 04 37 FF"
  params: []

- id: cam_aperture_inq
  label: CAM_ApertureInq
  kind: query
  command: "8x 09 04 42 FF"
  params: []

- id: cam_aperture_mode_inq
  label: CAM_ApertureModeInq
  kind: query
  command: "8x 09 05 42 01 FF"
  params: []

- id: cam_aperture_bandwidth_inq
  label: CAM_ApertureBandwidthInq
  kind: query
  command: "8x 09 05 42 02 FF"
  params: []

- id: cam_aperture_crispening_inq
  label: CAM_ApertureCrispeningInq
  kind: query
  command: "8x 09 05 42 03 FF"
  params: []

- id: cam_aperture_hv_balance_inq
  label: CAM_ApertureH/VBalanceInq
  kind: query
  command: "8x 09 05 42 04 FF"
  params: []

- id: cam_aperture_bw_balance_inq
  label: CAM_ApertureB/WBalanceInq
  kind: query
  command: "8x 09 05 42 05 FF"
  params: []

- id: cam_aperture_limit_inq
  label: CAM_ApertureLimitInq
  kind: query
  command: "8x 09 05 42 06 FF"
  params: []

- id: cam_aperture_highlight_detail_inq
  label: CAM_ApertureHighLightDetailInq
  kind: query
  command: "8x 09 05 42 07 FF"
  params: []

- id: cam_aperture_super_low_inq
  label: CAM_ApertureSuperLowInq
  kind: query
  command: "8x 09 05 42 08 FF"
  params: []

- id: cam_hr_mode_inq
  label: CAM_HRModeInq
  kind: query
  command: "8x 09 04 52 FF"
  params: []

- id: cam_nr_inq
  label: CAM_NRInq
  kind: query
  command: "8x 09 04 53 FF"
  params: []

- id: cam_nr_2d_3d_inq
  label: CAM_NR2D3DInq
  kind: query
  command: "8x 09 05 53 FF"
  params: []

- id: cam_stabilizer_mode_inq
  label: CAM_StabilizerModeInq
  kind: query
  command: "8x 09 04 34 FF"
  params: []

- id: cam_gamma_inq
  label: CAM_GammaInq
  kind: query
  command: "8x 09 04 5B FF"
  params: []

- id: cam_gamma_pattern_inq
  label: CAM_GammaPatternInq
  kind: query
  command: "8x 09 05 5B FF"
  params: []

- id: cam_gamma_offset_inq
  label: CAM_GammaOffsetInq
  kind: query
  command: "8x 09 04 1E FF"
  params: []

- id: cam_high_sensitivity_inq
  label: CAM_HighSensitivityInq
  kind: query
  command: "8x 09 04 5E FF"
  params: []

- id: cam_lr_reverse_mode_inq
  label: CAM_LR_ReverseModeInq
  kind: query
  command: "8x 09 04 61 FF"
  params: []

- id: cam_freeze_mode_inq
  label: CAM_FreezeModeInq
  kind: query
  command: "8x 09 04 62 FF"
  params: []

- id: cam_picture_effect_mode_inq
  label: CAM_PictureEffectModeInq
  kind: query
  command: "8x 09 04 63 FF"
  params: []

- id: cam_picture_flip_mode_inq
  label: CAM_PictureFlipModeInq
  kind: query
  command: "8x 09 04 66 FF"
  params: []

- id: cam_icr_mode_inq
  label: CAM_ICRModeInq
  kind: query
  command: "8x 09 04 01 FF"
  params: []

- id: cam_auto_icr_mode_inq
  label: CAM_AutoICRModeInq
  kind: query
  command: "8x 09 04 51 FF"
  params: []

- id: cam_auto_icr_threshold_inq
  label: CAM_AutoICRThresholdInq
  kind: query
  command: "8x 09 04 21 FF"
  params: []

- id: cam_auto_icr_alarm_reply_inq
  label: CAM_AutoICRAlarmReplyInq
  kind: query
  command: "8x 09 04 31 FF"
  params: []

- id: cam_memory_inq
  label: CAM_MemoryInq
  kind: query
  command: "8x 09 04 3F FF"
  params: []

- id: cam_mem_save_inq
  label: CAM_MemSaveInq
  kind: query
  command: "8x 09 04 23 0X FF"
  params:
    - name: X
      type: integer
      description: "Address 00h to 07h"

- id: cam_display_mode_inq
  label: CAM_DisplayModeInq
  kind: query
  command: "8x 09 04 15 FF"
  params: []

- id: cam_mute_mode_inq
  label: CAM_MuteModeInq
  kind: query
  command: "8x 09 04 75 FF"
  params: []

- id: cam_set_mask_table_inq
  label: CAM_SetMaskTableInq
  kind: query
  command: "8x 09 05 70 FF"
  params: []

- id: cam_privacy_display_inq
  label: CAM_PrivacyDisplayInq
  kind: query
  command: "8x 09 04 77 FF"
  params: []

- id: cam_privacy_pan_tilt_inq
  label: CAM_PrivacyPanTiltInq
  kind: query
  command: "8x 09 04 79 FF"
  params: []

- id: cam_privacy_ptz_inq
  label: CAM_PrivacyPTZInq
  kind: query
  command: "8x 09 04 7B mm FF"
  params:
    - name: mm
      type: integer
      description: "Mask Settings"

- id: cam_privacy_monitor_inq
  label: CAM_PrivacyMonitorInq
  kind: query
  command: "8x 09 04 6F FF"
  params: []

- id: cam_id_inq
  label: CAM_IDInq
  kind: query
  command: "8x 09 04 22 FF"
  params: []

- id: cam_version_inq
  label: CAM_VersionInq
  kind: query
  command: "8x 09 00 02 FF"
  params: []
  # Reply: y0 50 00 20 mn pq rs tu vw FF - mnpq Model Code (0709 = FCB-ER8530, 070A = FCB-ER8550),
  # rstu ROM version, vw Socket Number (=02).

- id: cam_continuous_zoom_pos_reply_mode_inq
  label: CAM_ContinuousZoomPosReplyModeInq
  kind: query
  command: "8x 09 04 69 FF"
  params: []

- id: cam_zoom_pos_reply_interval_time_inq
  label: CAM_ZoomPosReplyIntervalTimeInq
  kind: query
  command: "8x 09 04 6A FF"
  params: []

- id: cam_continuous_focus_pos_reply_mode_inq
  label: CAM_ContinuousFocusPosReplyModeInq
  kind: query
  command: "8x 09 04 16 FF"
  params: []

- id: cam_ex_auto_icr_on_level_inq
  label: CAM_ExAutoICROnLevelInq (Extended)
  kind: query
  command: "8x 09 04 1F 21 01 FF"
  params: []

- id: cam_hlc_inq
  label: CAM_HLCInq
  kind: query
  command: "8x 09 04 14 FF"
  params: []

- id: cam_register_value_inq
  label: CAM_RegisterValueInq
  kind: query
  command: "8x 09 04 24 pp FF"
  params:
    - name: pp
      type: integer
      description: "Register No."

- id: cam_focus_pos_reply_interval_time_inq
  label: CAM_FocusPosReplyIntervalTimeInq
  kind: query
  command: "8x 09 04 1A FF"
  params: []

- id: cam_color_bar_inq
  label: CAM_ColorBarInq
  kind: query
  command: "8x 09 7E 04 7D FF"
  params: []

- id: cam_ept_mode_inq
  label: CAM_ePTModeInq
  kind: query
  command: "8x 09 7E 06 00 FF"
  params: []

- id: cam_ept_position_inq
  label: CAM_ePTPositionInq
  kind: query
  command: "8x 09 7E 06 20 FF"
  params: []

- id: cam_temp_inq
  label: CAM_TempInq
  kind: query
  command: "8x 09 04 68 FF"
  params: []
  # Reply pq = lens temperature (see Temperature Reading Conversion table).

- id: cam_ex_exp_comp_pos_inq
  label: CAM_ExExpCompPosInq (Extended)
  kind: query
  command: "8x 09 04 1F 4E FF"
  params: []

- id: cam_ex_auto_icr_threshold_inq
  label: CAM_ExAutoICRThresholdInq (Extended)
  kind: query
  command: "8x 09 04 1F 21 00 FF"
  params: []

- id: cam_ex_detail_inq
  label: CAM_ExDetailInq (Extended)
  kind: query
  command: "8x 09 04 1F 42 FF"
  params: []

- id: cam_chroma_suppress_inq
  label: CAM_ChromaSuppressInq
  kind: query
  command: "8x 09 04 5F FF"
  params: []

- id: cam_color_gain_inq
  label: CAM_ColorGainInq (Saturation)
  kind: query
  command: "8x 09 04 49 FF"
  params: []

- id: cam_ex_color_gain_inq
  label: CAM_ExColorGainInq (Extended)
  kind: query
  command: "8x 09 04 1F 49 00 FF"
  params: []

- id: cam_color_hue_inq
  label: CAM_ColorHueInq
  kind: query
  command: "8x 09 04 4F FF"
  params: []

- id: cam_ex_color_hue_inq
  label: CAM_ExColorHueInq (Extended)
  kind: query
  command: "8x 09 04 1F 4F 00 FF"
  params: []

- id: cam_center_line_inq
  label: CenterLineInq
  kind: query
  command: "8x 09 04 7C FF"
  params: []

# --- Block Inquiry Commands (packed multi-byte status) ---
- id: block_inq_lens_control
  label: Lens Control System Inquiry
  kind: query
  command: "8x 09 7E 7E 00 FF"
  params: []
  # Returns 16-byte packed block: zoom position, focus position, near limit, DZoom mode/state,
  # AF mode/sensitivity, memory recall & focus/zoom command executing flags.

- id: block_inq_camera_control
  label: Camera Control System Inquiry
  kind: query
  command: "8x 09 7E 7E 01 FF"
  params: []
  # Returns 16-byte packed block: WB mode, R/B gain, aperture gain, shutter/iris/gain/bright position,
  # exposure mode, HR, VE, spot AE, backlight, exp comp, slow shutter.

- id: block_inq_other
  label: Other Inquiry Commands
  kind: query
  command: "8x 09 7E 7E 02 FF"
  params: []
  # Returns 16-byte packed block: power, ICR, auto ICR, stabilizer, freeze, LR reverse, mute,
  # display, title, privacy zone, picture effect, camera ID, memory/ICR/stabilizer provision flags, system.

- id: block_inq_extended_function1
  label: Extended Function1 Query
  kind: query
  command: "8x 09 7E 7E 03 FF"
  params: []
  # Returns packed block: DZoom position, AF activation/interval time, advanced privacy, e-Flip,
  # AE response, gamma, spot AE X/Y, high sensitivity, NR level, chroma suppress, gain limit, color gain.

- id: block_inq_extended_function2
  label: Extended Function2 Query
  kind: query
  command: "8x 09 7E 7E 04 FF"
  params: []
  # Returns packed block: VE state, defog state/level, display brightness, brightness compensation, level.

- id: block_inq_extended_function3
  label: Extended Function3 Query
  kind: query
  command: "8x 09 7E 7E 05 FF"
  params: []
  # Returns packed block: color hue plus reserved bytes.
```

## Feedbacks
```yaml
# VISCA replies are framed as Acknowledge (z0 4y FF) and Completion (z0 5y FF),
# where z = device address + 8 and y = socket number. Inquiries return data after byte 3 of Completion.
# The states below are the discrete enumerated values observable via the inquiry commands above.

- id: power_state
  type: enum
  values: [on, off_standby]
  query: cam_power_inq

- id: dzoom_mode
  type: enum
  values: [on, off, super_resolution_zoom]
  query: cam_dzoom_mode_inq

- id: dzoom_cs_mode
  type: enum
  values: [combine, separate]
  query: cam_dzoom_cs_mode_inq

- id: focus_mode
  type: enum
  values: [auto, manual]
  query: cam_focus_mode_inq

- id: af_sensitivity
  type: enum
  values: [normal, low]
  query: cam_af_sensitivity_inq

- id: af_mode
  type: enum
  values: [normal, interval, zoom_trigger]
  query: cam_af_mode_inq

- id: ir_correction
  type: enum
  values: [standard, ir_light]
  query: cam_ir_correction_inq

- id: wb_mode
  type: enum
  values: [auto, indoor, outdoor, one_push_wb, atw, manual, outdoor_auto, sodium_lamp_auto, sodium_lamp, sodium_lamp_outdoor_auto]
  query: cam_wb_mode_inq

- id: ae_mode
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority, bright]
  query: cam_ae_mode_inq

- id: slow_shutter
  type: enum
  values: [on, off]
  query: cam_slow_shutter_inq

- id: exp_comp_mode
  type: enum
  values: [on, off]
  query: cam_exp_comp_mode_inq

- id: backlight_mode
  type: enum
  values: [on, off]
  query: cam_backlight_mode_inq

- id: spot_ae_mode
  type: enum
  values: [on, off]
  query: cam_spot_ae_mode_inq

- id: ve_mode
  type: enum
  values: [off, on]
  query: cam_ve_mode_inq

- id: hr_mode
  type: enum
  values: [on, off]
  query: cam_hr_mode_inq

- id: stabilizer_mode
  type: enum
  values: [on, off]
  query: cam_stabilizer_mode_inq

- id: high_sensitivity
  type: enum
  values: [on, off]
  query: cam_high_sensitivity_inq

- id: lr_reverse_mode
  type: enum
  values: [on, off]
  query: cam_lr_reverse_mode_inq

- id: freeze_mode
  type: enum
  values: [on, off]
  query: cam_freeze_mode_inq

- id: picture_effect_mode
  type: enum
  values: [off, black_and_white]
  query: cam_picture_effect_mode_inq

- id: picture_flip_mode
  type: enum
  values: [on, off]
  query: cam_picture_flip_mode_inq

- id: icr_mode
  type: enum
  values: [on, off]
  query: cam_icr_mode_inq

- id: auto_icr_mode
  type: enum
  values: [on, off]
  query: cam_auto_icr_mode_inq

- id: auto_icr_alarm_reply
  type: enum
  values: [on, off]
  query: cam_auto_icr_alarm_reply_inq

- id: display_mode
  type: enum
  values: [on, off]
  query: cam_display_mode_inq

- id: mute_mode
  type: enum
  values: [on, off]
  query: cam_mute_mode_inq

- id: color_bar
  type: enum
  values: [off, color_bar_100_8, color_bar_100_7, gray_scale]
  query: cam_color_bar_inq

- id: ept_mode
  type: enum
  values: [on, off]
  query: cam_ept_mode_inq

- id: center_line
  type: enum
  values: [off, on]
  query: cam_center_line_inq

# UNRESOLVED: numeric-value feedbacks (zoom/focus/iris/gain/shutter/bright position, R/B gain,
# gamma, NR level, chroma suppress, gain limit, AE response, color gain/hue, lens temperature,
# camera ID, version/ROM) are returned by their respective inquiry commands but their exact
# scaling/units are only partially documented (see VISCA Command Setting Values tables in source).
```

## Variables
```yaml
# Settable parameters with continuous/enum ranges exposed via Direct/Set commands.
# Ranges documented in source (see "VISCA Command Setting Values" tables).

- id: zoom_position
  type: integer
  range: "0000h to 7AC0h (mode-dependent max)"
  unit: hex_position

- id: focus_position
  type: integer
  range: "1000h to F000h"
  unit: hex_position

- id: focus_near_limit
  type: integer
  range: "1000h to F000h (1000h=Inf, B000h=35cm initial, F000h=8cm)"
  unit: hex_position

- id: dzoom_position
  type: integer
  range: "00h to EBh"
  unit: hex_position

- id: r_gain
  type: integer
  range: "00h to FFh"

- id: b_gain
  type: integer
  range: "00h to FFh"

- id: shutter_position
  type: integer
  range: "see source Shutter Speed table (06h to 21h, mode-dependent)"

- id: max_shutter_limit
  type: integer
  range: "see source High-speed shutter limit table"

- id: min_shutter_limit
  type: integer
  range: "see source Low-speed shutter limit table"

- id: slow_shutter_limit
  type: integer
  range: "see source Slow Shutter Limit table"

- id: iris_position
  type: integer
  range: "00h (CLOSE) to 19h (F2.0)"

- id: gain_position
  type: integer
  range: "01h (0 dB) to 11h (48 dB)"

- id: gain_limit
  type: integer
  range: "4h to Dh (mode-dependent under High Sensitivity)"

- id: bright_position
  type: integer
  range: "00h to 29h"

- id: exp_comp_position
  type: integer
  range: "00h to 0Eh"

- id: ae_response
  type: integer
  range: "01h to 30h"
  default: 01h

- id: aperture_gain
  type: integer
  range: "00h to 0Fh"

- id: nr_level
  type: integer
  range: "00h Off, 01h-05h level, 7Fh 2D/3D manual"

- id: chroma_suppress
  type: integer
  range: "00h Off, 01h-03h"

- id: color_gain
  type: integer
  range: "0h (60%) to Eh (200%); extended 00h (0%) to FFh (200%)"

- id: color_hue
  type: integer
  range: "0h (-14 deg) to Eh (+14 deg); extended 00h to FFh"

- id: camera_id
  type: integer
  range: "0000h to FFFFh"

- id: auto_icr_threshold
  type: integer
  range: "00h to FFh"

# UNRESOLVED: register values (CAM_RegisterValue mn 00h-7Fh, data 00h-FFh) are documented as a
# raw register map but only selected registers (baud, VISCA/PTP, digital output, monitoring mode,
# zoom limit, DZoom max, StableZoom, APR, focus offset, extended mode) are explained in source.
```

## Events
```yaml
# Unsolicited camera-issued messages (no inquiry needed):

- id: acknowledge
  packet: "z0 4y FF"
  description: "Returned when a command is accepted. z = address+8, y = socket no."

- id: completion
  packet: "z0 5y FF"
  description: "Returned when command/inquiry execution finishes. Inquiry replies carry data after byte 3."

- id: network_change
  packet: "z0 38 FF"
  description: "Issued when power is being routed (e.g. after CAM_Power or reset boot-up)."

- id: auto_icr_alarm
  packet: "y0 07 04 31 02 FF"
  description: "Auto ICR Off to On transition alarm (when CAM_AutoICRAlarmReply On)."

- id: auto_icr_alarm_on_to_off
  packet: "y0 07 04 31 03 FF"
  description: "Auto ICR On to Off transition alarm."

- id: continuous_zoom_pos_reply
  packet: "y0 07 04 69 0p 0p 0q 0q 0q 0q FF"
  description: "Unsolicited zoom-position data when CAM_ContinuousZoomPosReply On. pp=D-Zoom pos (00 when Combine), qqqq=Zoom Position."

- id: continuous_focus_pos_reply
  packet: "y0 07 04 16 00 00 0p 0p 0p 0p FF"
  description: "Unsolicited focus-position data when CAM_ContinuousFocusPosReply On. pppp=Focus Position."

# Error events:
- id: error_message_length
  packet: "z0 6y 01 FF"
  description: "Message length error (>14 bytes)."

- id: error_syntax
  packet: "z0 6y 02 FF"
  description: "Syntax error."

- id: error_command_buffer_full
  packet: "z0 6y 03 FF"
  description: "Command buffer full (two sockets in use)."

- id: error_command_cancelled
  packet: "z0 6y 04 FF"
  description: "Command cancelled."

- id: error_no_socket
  packet: "z0 6y 05 FF"
  description: "No socket (to be cancelled)."

- id: error_command_not_executable
  packet: "z0 6y 41 FF"
  description: "Command not executable in current mode."
```

## Macros
```yaml
# The source documents explicit multi-step sequences (no parameterized macro language).

- id: maintenance_mode_entry
  description: "Firmware-update maintenance-mode entry sequence (UART)."
  steps:
    - "CAM_Power Off: 8x 01 04 00 03 FF  (expect ACK + COMP)"
    - "Step1: 8x 01 04 00 0C FF  (expect ACK + COMP)"
    - "Step2: 8x 01 04 00 0D FF  (expect ACK + COMP)"
    - "Step3: 8x 01 04 00 13 FF  (expect ACK + COMP, ~14 sec transition)"
    - "Step4: 8x 01 04 00 04 FF  (expect ACK + COMP)"
    - "Update: 8x 01 04 00 20 FF  (expect ACK + COMP)"
  notes: "After 'ready', send 'reprogram' then firmware binary via XMODEM/SUM; camera replies 'recieve' then 'reboot'."

- id: boot_up_sequence
  description: "Boot timing after CAM_RESET / power application."
  steps:
    - "ACK to CAM_RESET: max 2 sec"
    - "Boot up to Network Change: max 10 sec"
    - "Then issue Address Set"

- id: hardware_reset
  description: "Hardware reset via RESET pin (CN1701 pin 26)."
  steps:
    - "Drive RESET low (GND) for Treset > 10 ms"
    - "Camera reset completes > 10 ms later"
    - "Camera starts; issues Network Change within max 10 sec"
```

## Safety
```yaml
confirmation_required_for:
  - cam_power_off
  - cam_initialize_camera
  - cam_maintenance_mode_step1
  - cam_maintenance_mode_step2
  - cam_maintenance_mode_step3
  - cam_maintenance_mode_step4
  - cam_maintenance_mode_update
  - cam_id_write
  - cam_register_value
interlocks:
  - "Firmware write (maintenance mode): Power MUST remain on during the entire write phase. Source states verbatim: 'When power is off during this period, camera will be broken.' (warned twice in Update Procedure section.)"
  - "Maintenance-mode transition takes approximately 14 seconds; do not issue other commands during transition."
  - "Hardware RESET (CN1701 pin 26): low-level GND pulse width must be >= 10 ms; camera reset completes >= 10 ms after pulse release."
  - "Extended commands return CMD_NOT_EXEC when Extended Mode (register 5F) is Off; conversely normal commands return CMD_NOT_EXEC when Extended Mode is On."
  - "Number of writes to non-volatile memory via Custom Preset is limited (source: Notes on Initial Settings)."
  - "Privacy Zone Setting while digital zooming is NOT preserved by Custom Preset."
  - "After CAM_Initialize Camera (8x 01 04 19 03 FF), wait for Network Change (max 10 sec) before issuing further commands."
warnings:
  - "External synchronization function described in source applies ONLY to FCB-ER8550. Do NOT input external sync signals to an FCB-ER8530 (EXT_SYNC pin is unused; CN1701 pins 14-17 are FCB-ER8550-only)."
  - "Switching to USB_PTP disables further VISCA communication; switching back requires PTP control (separate spec)."
# UNRESOLVED: no power-on/off sequencing requirements beyond RESET/boot timing are stated.
```

## Notes
- **Physical interface:** VISCA UART on CN1701 pins 24 (VISCA_RxD, input) and 25 (VISCA_TxD, output) at CMOS 3.1V levels — NOT RS-232C voltage levels, despite the source framing the protocol as "RS-232C". Do not connect directly to a true RS-232C transceiver without level shifting. RxD: High min 2.3V / Low max 1.0V; TxD: High min 2.7V / Low max 0.4V.
- **Addressing:** Up to 7 FCB cameras per controller. Header `8X` where X = camera address 1-7; broadcast header `88h`. Reply header `Z0` where Z = address + 8 (so address 1 replies `90h`). Only Address Set and IF_Clear are accepted as broadcast.
- **Sockets:** Two command buffers; socket number `y` (1 or 2) identifies which buffer an ACK/COMP/error refers to. Some commands return only a socket-0 completion (no ACK).
- **Default baud rate:** 9600 bps (Register No. 00, value 00 initial setting). Selectable via register write: 01=19200, 02=38400, 03=57600, 04=115200. Register changes take effect after power cycle.
- **Model code (CAM_VersionInq reply):** `0709` = FCB-ER8530, `070A` = FCB-ER8550. ROM version follows; socket number `vw = 02`.
- **Zoom-position maxima vary by mode** (Combine vs Separate, DZoom On/Off, Super Resolution Zoom, monitoring mode QFHD vs FHD-or-less) — see CAM_Zoom Direct param comment.
- **Extended Mode** (register `5F` bitfield) gates the ExExpComp / ExAperture / ExColorGain / ExColorHue / ExAutoICR commands; bit 0 = ExpComp extended 256 levels, bit 1 = Aperture extended 256 levels, bit 2 = Color Gain/Hue extended 256 levels, bit 3 = Auto ICR Off/On setting.
- **Image-stabilizer angle-of-view trade-off:** Wide end approx. 70.2° (stabilizer off) vs 60.0° (on); tele end approx. 4.1° (off) vs 3.5° (on).
- **Power consumption:** 3.0 W typical, 4.0 W during motor operation. Supply 6-12 V DC on CN1701 pins 27-30.
- **USB** (CN1701 pins 19/21/22) is for firmware update only; requires VBUS (5V) on pin 19. USB-PTP control exists but is documented in a separate specification.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: exact default values for many registers beyond the documented initial settings. -->
<!-- UNRESOLVED: precise voltage/current limits for the DC IN rails (only the 6-12 V range is stated; no per-pin current rating). -->
<!-- UNRESOLVED: maintenance-mode serial port is stated as 115200/8N1/none in source, but only applies

## Provenance

```yaml
source_domains:
  - pro.sony
  - manualslib.com
source_urls:
  - https://pro.sony/s3/2025/01/13124708/FCB-ER8530-ER8550_TM_D201100141.pdf
  - https://pro.sony/ue_US/product-resources/knowledge-panel/fcb-er8530-fcb-er8550-technical-manual
  - https://www.manualslib.com/manual/3850700/Sony-Fcb-Er8530.html
retrieved_at: 2026-08-11T05:17:55.387Z
last_checked_at: 2026-08-19T09:48:53.525Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:48:53.525Z
matched_actions: 320
action_count: 320
confidence: medium
summary: "All 320 spec actions map to verbatim VISCA opcodes in source command/inquiry lists; transport values are documented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default VISCA baud rate at first power-on is 9600 bps per the Register Setting table, but the source does not state which baud a given shipped unit is configured to."
- "firmware version compatibility range not stated in source."
- "source document also describes the FCB-ER8550 (external sync, EXT_SYNC pins); those features are NOT available on the FCB-ER8530 and are excluded from this spec."
- "USB (firmware update) and USB-PTP (control) transports are"
- "numeric-value feedbacks (zoom/focus/iris/gain/shutter/bright position, R/B gain,"
- "register values (CAM_RegisterValue mn 00h-7Fh, data 00h-FFh) are documented as a"
- "no power-on/off sequencing requirements beyond RESET/boot timing are stated."
- "exact default values for many registers beyond the documented initial settings."
- "precise voltage/current limits for the DC IN rails (only the 6-12 V range is stated; no per-pin current rating)."
- "maintenance-mode serial port is stated as 115200/8N1/none in source, but only applies"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
