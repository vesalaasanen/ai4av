---
spec_id: admin/optoma-eh-w-wu-515-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma EH/W/WU 515 Series Control Spec"
manufacturer: Optoma
model_family: EH515
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - EH515
    - W515
    - WU515
    - EH515T
    - W515T
    - WU515T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optomaeurope.com
  - region-resource.optoma.com
  - optoma.com
source_urls:
  - https://www.optomaeurope.com/uploads/manuals/EH515-M-en.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optoma.com/us/support/product-downloads/
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
retrieved_at: 2026-07-25T21:15:35.275Z
last_checked_at: 2026-08-05T08:35:15.126Z
generated_at: 2026-08-05T08:35:15.126Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact voltage/power/lamp-wattage hardware spec not in excerpt (only control-state enumerations present)."
  - "none expected for this device class."
  - "no explicit multi-step sequences documented in source."
  - "source excerpt contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility ranges not stated."
  - "lamp wattage actual hardware spec (only control-state enum 365W/350W/330W/310W/300W/280W present)."
  - "voltage/current/power input spec absent from refined excerpt."
  - "INFOn codes 7/8/9 listed in range without labels."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:35:15.126Z
  matched_actions: 144
  action_count: 144
  confidence: medium
  summary: "All 144 spec actions map to literal source command rows; transport values verified; source RS-232 catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Optoma EH/W/WU 515 Series Control Spec

## Summary
Optoma EH515/W515/WU515(W/T) ProScene DLP projectors with RS-232C serial control, LAN/RJ45 with "RS232 by Telnet" tunnel (TCP/23), and integrated control-system bridges (Crestron/Extron/PJLink/AMX). All RS-232 ASCII command set documented verbatim; same command set carried over Telnet.

<!-- UNRESOLVED: exact voltage/power/lamp-wattage hardware spec not in excerpt (only control-state enumerations present). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UART16550 FIFO: Disable (stated in source)
addressing:
  port: 23  # Telnet (RS232-by-Telnet); HTTP=80, Crestron=41794, Extron=2023, PJLink=4352, AMX=9131 - also stated
auth:
  type: none  # inferred: RS232/Telnet command interface has no login procedure. Web UI uses admin/admin default (see Notes). Optional PIN guards power-on only.

# Notes on stated addressing defaults (Setup > Network > LAN Settings):
#   IP default 192.168.0.100, mask 255.255.255.0, gateway 192.168.0.254, DNS 192.168.0.1
# Telnet-Control limits stated verbatim:
#   - successive network payload < 50 bytes
#   - one complete RS232 command < 26 bytes
#   - minimum delay between RS232 commands > 200 ms
```

## Traits
```yaml
- powerable      # power on/off + standby/power-mode commands present
- queryable      # ~XX122..~XX358 query set returns state
- levelable      # brightness/contrast/volume/keystone/etc. continuous params
- routable       # ~XX12 / ~XX39 source-select commands
```

## Actions
```yaml
# Conventions (apply to every action below unless noted):
#   - Replace XX with target projector ID, 00-99. XX=00 broadcasts to all projectors.
#   - Every command ends with <CR> (HEX 0D); shown verbatim from source in `command`.
#   - Source response codes: pass='P', fail='F'.
#   - Hex payloads preserve source spacing verbatim. `a` denotes the parameter's hex byte(s).
#   - For parameterized hex payloads, the variable byte position is marked with {value} or `a`.

# === POWER ===
- id: power_set
  label: Power On/Off
  kind: action
  command: "~{pid}00 {state}\r"
  params:
    - name: pid
      type: string
      description: "Projector ID, 2-digit ASCII 00-99 (00 = all projectors). Substituted for XX."
    - name: state
      type: enum
      values: ["1", "0"]
      description: "1=Power ON, 0=Power OFF (0/2 backward-compatible per source)."

- id: power_on_with_pin
  label: Power On with Password
  kind: action
  command: "~{pid}00 1 ~{pin}\r"
  params:
    - name: pid
      type: string
      description: "Projector ID 00-99."
    - name: pin
      type: string
      description: "ASCII pin ~0000 (default) to ~9999. Hex payload `a` = 7E + 4 ASCII digits."

# === DISPLAY / SYNC ===
- id: resync
  label: Resync
  kind: action
  command: "~{pid}01 1\r"
  params: [{name: pid, type: string}]

- id: av_mute_set
  label: AV Mute
  kind: action
  command: "~{pid}02 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=AV Mute On, 0=Off"}

- id: mute_set
  label: Audio Mute
  kind: action
  command: "~{pid}03 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "2"], description: "1=Mute On; source lists Off as `~XX03 2` with HEX byte 30 (value '0'); 0/2 backward-compatible."}

- id: freeze_set
  label: Freeze
  kind: action
  command: "~{pid}04 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=Freeze, 0=Unfreeze (0/2 backward-compatible)"}

- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "~{pid}05 1\r"
  params: [{name: pid, type: string}]

- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "~{pid}06 1\r"
  params: [{name: pid, type: string}]

# === SOURCE SELECT (Direct Source Commands) ===
- id: direct_source_select
  label: Direct Source Select
  kind: action
  command: "~{pid}12 {source}\r"
  params:
    - {name: pid, type: string}
    - name: source
      type: enum
      values: ["1", "15", "20", "5", "8", "6", "13", "9", "10", "21"]
      description: "1=HDMI1, 15=HDMI2, 20=Displayport, 5=VGA1, 8=VGA1 Component, 6=VGA2, 13=VGA2 Component, 9=S-Video, 10=Video, 21=HDBaseT (only 'T' SKU)"

# === INPUT SOURCE (alt opcode) ===
- id: input_source_select
  label: Input Source Select
  kind: action
  command: "~{pid}39 {source}\r"
  params:
    - {name: pid, type: string}
    - name: source
      type: enum
      values: ["1", "7", "15", "5", "6", "9", "10"]
      description: "1=HDMI1, 7=HDMI2, 15=Displayport, 5=VGA1, 6=VGA2, 9=S-Video, 10=Video"

# === DISPLAY MODE ===
- id: display_mode_set
  label: Display Mode
  kind: action
  command: "~{pid}20 {mode}\r"
  params:
    - {name: pid, type: string}
    - name: mode
      type: enum
      values: ["1", "2", "3", "4", "5", "7", "13", "9"]
      description: "1=Presentation, 2=Bright, 3=Movie, 4=sRGB, 5=User, 7=Blackboard, 13=DICOM SIM., 9=3D"

# === IMAGE PARAMETERS (levelable) ===
- id: brightness_set
  label: Brightness
  kind: action
  command: "~{pid}21 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50. Hex `a` = 2D 35 30 (for -50) to 35 30 (for 50)."}

- id: contrast_set
  label: Contrast
  kind: action
  command: "~{pid}22 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "~{pid}23 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=1 to 15"}

- id: color_saturation_set
  label: Color (Saturation)
  kind: action
  command: "~{pid}45 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}

- id: tint_set
  label: Tint
  kind: action
  command: "~{pid}44 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}

- id: noise_reduction_set
  label: Noise Reduction
  kind: action
  command: "~{pid}196 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=1 to 10"}

- id: brilliantcolor_set
  label: BrilliantColor
  kind: action
  command: "~{pid}34 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=1 to 10"}

- id: dynamic_black_set
  label: Dynamic Black
  kind: action
  command: "~{pid}191 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=On, 0=Off (0/2 backward-compatible)"}

- id: gamma_set
  label: Gamma
  kind: action
  command: "~{pid}35 {value}\r"
  params:
    - {name: pid, type: string}
    - name: value
      type: enum
      values: ["1", "3", "7", "5", "6", "8", "10", "11"]
      description: "1=Film, 3=Graphics, 7=2.2, 5=1.8, 6=2.0, 8=2.6, 10=Blackboard, 11=DICOM"

- id: color_temp_set
  label: Color Temperature
  kind: action
  command: "~{pid}36 {value}\r"
  params:
    - {name: pid, type: string}
    - name: value
      type: enum
      values: ["4", "1", "2", "3"]
      description: "4=Warm, 1=Standard, 2=Cool, 3=Cold"

- id: color_space_set
  label: Color Space
  kind: action
  command: "~{pid}37 {value}\r"
  params:
    - {name: pid, type: string}
    - name: value
      type: enum
      values: ["1", "2", "3", "4"]
      description: "1=Auto, 2=RGB / RGB(0-255), 3=YUV, 4=RGB(16-235)"

# === RGB Gain/Bias ===
- id: rgb_red_gain
  label: RGB Red Gain
  kind: action
  command: "~{pid}24 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}
- id: rgb_green_gain
  label: RGB Green Gain
  kind: action
  command: "~{pid}25 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}
- id: rgb_blue_gain
  label: RGB Blue Gain
  kind: action
  command: "~{pid}26 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}
- id: rgb_red_bias
  label: RGB Red Bias
  kind: action
  command: "~{pid}27 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}
- id: rgb_green_bias
  label: RGB Green Bias
  kind: action
  command: "~{pid}28 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}
- id: rgb_blue_bias
  label: RGB Blue Bias
  kind: action
  command: "~{pid}29 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=-50 to 50"}

# === Color Matching (7 colors × Hue/Saturation/Gain) ===
- id: cm_red_hue
  label: Color Matching Red Hue
  kind: action
  command: "~{pid}327 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_red_saturation
  label: Color Matching Red Saturation
  kind: action
  command: "~{pid}333 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_red_gain
  label: Color Matching Red Gain
  kind: action
  command: "~{pid}339 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_green_hue
  label: Color Matching Green Hue
  kind: action
  command: "~{pid}328 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_green_saturation
  label: Color Matching Green Saturation
  kind: action
  command: "~{pid}334 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_green_gain
  label: Color Matching Green Gain
  kind: action
  command: "~{pid}340 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_blue_hue
  label: Color Matching Blue Hue
  kind: action
  command: "~{pid}329 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_blue_saturation
  label: Color Matching Blue Saturation
  kind: action
  command: "~{pid}335 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_blue_gain
  label: Color Matching Blue Gain
  kind: action
  command: "~{pid}341 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_cyan_hue
  label: Color Matching Cyan Hue
  kind: action
  command: "~{pid}330 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_cyan_saturation
  label: Color Matching Cyan Saturation
  kind: action
  command: "~{pid}336 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_cyan_gain
  label: Color Matching Cyan Gain
  kind: action
  command: "~{pid}342 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_yellow_hue
  label: Color Matching Yellow Hue
  kind: action
  command: "~{pid}331 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_yellow_saturation
  label: Color Matching Yellow Saturation
  kind: action
  command: "~{pid}337 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_yellow_gain
  label: Color Matching Yellow Gain
  kind: action
  command: "~{pid}343 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_magenta_hue
  label: Color Matching Magenta Hue
  kind: action
  command: "~{pid}332 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_magenta_saturation
  label: Color Matching Magenta Saturation
  kind: action
  command: "~{pid}338 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: cm_magenta_gain
  label: Color Matching Magenta Gain
  kind: action
  command: "~{pid}344 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]

# === White Balance (CMY + White) ===
- id: white_red
  label: White Red
  kind: action
  command: "~{pid}345 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: white_green
  label: White Green
  kind: action
  command: "~{pid}346 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]
- id: white_blue
  label: White Blue
  kind: action
  command: "~{pid}347 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-50 to 50"}]

- id: reset
  label: Reset
  kind: action
  command: "~{pid}215 1\r"
  params: [{name: pid, type: string}]

# === Signal (RGB) ===
- id: signal_freq_set
  label: Signal (RGB) Frequency
  kind: action
  command: "~{pid}73 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-5 to 5 (by signal)"}]
- id: automatic_set
  label: Automatic
  kind: action
  command: "~{pid}91 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=On, 0=Off (0/2 backward-compatible)"}
- id: phase_set
  label: Phase
  kind: action
  command: "~{pid}74 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=0 to 31"}]
- id: h_position_set
  label: H. Position
  kind: action
  command: "~{pid}75 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-5 to 5 (by timing)"}]
- id: v_position_set
  label: V. Position
  kind: action
  command: "~{pid}76 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-5 to 5 (by timing)"}]

# === Signal (Video) ===
- id: video_white_level_set
  label: Signal (Video) White Level
  kind: action
  command: "~{pid}200 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=0 to 31"}]
- id: video_black_level_set
  label: Signal (Video) Black Level
  kind: action
  command: "~{pid}201 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-5 to 5"}]
- id: ire_set
  label: IRE Select
  kind: action
  command: "~{pid}204 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=0 IRE, 0=7.5 IRE"}

# === Format / Geometry ===
- id: format_set
  label: Format
  kind: action
  command: "~{pid}60 {value}\r"
  params:
    - {name: pid, type: string}
    - name: value
      type: enum
      values: ["1", "2", "3", "5", "6", "7"]
      description: "1=4:3, 2=16:9, 3=16:10 (WXGA/WUXGA), 5=LBX, 6=Native, 7=Auto"
- id: edge_mask_set
  label: Edge Mask
  kind: action
  command: "~{pid}61 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=0 to 10"}]
- id: zoom_set
  label: Zoom
  kind: action
  command: "~{pid}62 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-5 to 25"}]
- id: h_image_shift
  label: H Image Shift
  kind: action
  command: "~{pid}63 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-100 to 100"}]
- id: v_image_shift
  label: V Image Shift
  kind: action
  command: "~{pid}64 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-100 to 100"}]
- id: h_keystone_set
  label: H Keystone
  kind: action
  command: "~{pid}65 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-30 to 40"}]
- id: v_keystone_set
  label: V Keystone
  kind: action
  command: "~{pid}66 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=-30 to 40"}]
- id: auto_vkeystone_set
  label: Auto V. Keystone
  kind: action
  command: "~{pid}69 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=On, 0=Off"}
- id: four_corners_set
  label: Four Corners Adjustment
  kind: action
  command: "~{pid}59 {value}\r"
  params:
    - {name: pid, type: string}
    - name: value
      type: integer
      description: "1-16. 1-4=Top-Left (Right+/Left+/Up+/Down+), 5-8=Top-Right, 9-12=Bottom-Left, 13-16=Bottom-Right"

# === 3D ===
- id: three_d_mode_set
  label: 3D Mode
  kind: action
  command: "~{pid}230 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["1", "3", "0"], description: "1=DLP-Link, 3=VESA 3D, 0=Off (0/2 backward-compatible)"}
- id: three_d_to_2d_set
  label: 3D->2D
  kind: action
  command: "~{pid}400 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1", "2"], description: "0=3D, 1=L, 2=R"}
- id: three_d_format_set
  label: 3D Format
  kind: action
  command: "~{pid}405 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1", "2", "3"], description: "0=Auto, 1=SBS, 2=Top and Bottom, 3=Frame sequential"}
- id: three_d_sync_invert_set
  label: 3D Sync Invert
  kind: action
  command: "~{pid}231 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1"], description: "0=On, 1=Off (per source)"}

# === LANGUAGE / PROJECTION / OSD ===
- id: language_set
  label: Language
  kind: action
  command: "~{pid}70 {value}\r"
  params:
    - {name: pid, type: string}
    - name: value
      type: enum
      values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "25", "26", "27"]
      description: "1=English, 2=German, 3=French, 4=Italian, 5=Spanish, 6=Portuguese, 7=Polish, 8=Dutch, 9=Swedish, 10=Norwegian/Danish, 11=Finnish, 12=Greek, 13=Traditional Chinese, 14=Simplified Chinese, 15=Japanese, 16=Korean, 17=Russian, 18=Hungarian, 19=Czechoslovak, 20=Arabic, 21=Thai, 22=Turkish, 23=Farsi, 25=Vietnamese, 26=Indonesian, 27=Romanian. Note: source HEX shows values 25/26/27 share byte sequence '32 33' (likely source typo)."
- id: projection_set
  label: Projection
  kind: action
  command: "~{pid}71 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["1", "2", "3", "4"], description: "1=Front-Desktop, 2=Rear-Desktop, 3=Front-Ceiling, 4=Rear-Ceiling"}
- id: screen_type_set
  label: Screen Type (WXGA/WUXGA)
  kind: action
  command: "~{pid}90 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["1", "0"], description: "1=16:10, 0=16:9"}
- id: menu_location_set
  label: Menu Location
  kind: action
  command: "~{pid}72 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["1", "2", "3", "4", "5"], description: "1=Top Left, 2=Top Right, 3=Centre, 4=Bottom Left, 5=Bottom Right"}

# === SECURITY ===
- id: security_timer_set
  label: Security Timer
  kind: action
  command: "~{pid}77 {mm}{dd}{hh}\r"
  params:
    - {name: pid, type: string}
    - {name: mm, type: integer, description: "Month 00-12 (HEX aa = 30 30 to 31 32)"}
    - {name: dd, type: integer, description: "Day 00-30 (HEX bb = 30 30 to 33 30)"}
    - {name: hh, type: integer, description: "Hour 00-24 (HEX cc = 30 30 to 32 34)"}
- id: security_set
  label: Security On/Off
  kind: action
  command: "~{pid}78 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=On, 0=Off (0/2 backward-compatible). Source HEX row for Off lacks terminating 0D - preserved verbatim."}
- id: password_set
  label: Set PIN
  kind: action
  command: "~{pin}\r"
  params:
    - {name: pin, type: string, description: "ASCII pin ~0000 (HEX 7E 30 30 30 30) to ~9999 (HEX 7E 39 39 39 39)"}

# === SYSTEM ===
- id: projector_id_set
  label: Projector ID Set
  kind: action
  command: "~{pid}79 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: integer, description: "n=00 to 99 (HEX a = 30 30 to 39 39)"}
- id: internal_speaker_set
  label: Internal Speaker
  kind: action
  command: "~{pid}310 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On"}
- id: audio_mute_set
  label: Mute
  kind: action
  command: "~{pid}80 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=On, 0=Off (0/2 backward-compatible)"}
- id: volume_audio_set
  label: Volume (Audio)
  kind: action
  command: "~{pid}81 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=0 to 10"}]
- id: volume_mic_set
  label: Volume (Mic)
  kind: action
  command: "~{pid}93 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=0 to 10"}]
- id: audio_input_set
  label: Audio Input
  kind: action
  command: "~{pid}89 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1", "3", "4"], description: "0=Default, 1=Audio1, 3=Audio2, 4=Audio3"}

# === LOGO ===
- id: logo_set
  label: Logo
  kind: action
  command: "~{pid}82 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["1", "2", "3"], description: "1=Default, 2=User, 3=Neutral"}
- id: logo_capture
  label: Logo Capture
  kind: action
  command: "~{pid}83 1\r"
  params: [{name: pid, type: string}]

# === CLOSED CAPTIONING ===
- id: closed_captioning_set
  label: Closed Captioning
  kind: action
  command: "~{pid}88 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1", "2"], description: "0=Off, 1=cc1, 2=cc2"}

# === NETWORK CONTROL TOGGLES ===
- id: crestron_net_set
  label: Crestron Network Toggle
  kind: action
  command: "~{pid}454 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On (port 41794)"}
- id: extron_net_set
  label: Extron Network Toggle
  kind: action
  command: "~{pid}455 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On (port 2023)"}
- id: pjlink_net_set
  label: PJLink Network Toggle
  kind: action
  command: "~{pid}456 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On (port 4352)"}
- id: amx_net_set
  label: AMX Device Discovery Network Toggle
  kind: action
  command: "~{pid}457 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On (port 9131; AMX section text states 1023 - discrepancy noted)"}
- id: telnet_net_set
  label: Telnet Network Toggle
  kind: action
  command: "~{pid}458 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On (port 23)"}
- id: http_net_set
  label: HTTP Network Toggle
  kind: action
  command: "~{pid}459 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On (port 80). NOTE: source HEX row for this entry duplicates opcode 458 (33 35 38) - appears to be source typo. ASCII mnemonic 459 preserved as listed."}

# === LOCKS / SYSTEM TOGGLES ===
- id: source_lock_set
  label: Source Lock
  kind: action
  command: "~{pid}100 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: high_altitude_set
  label: High Altitude
  kind: action
  command: "~{pid}101 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: information_hide_set
  label: Information Hide
  kind: action
  command: "~{pid}102 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: keypad_lock_set
  label: Keypad Lock
  kind: action
  command: "~{pid}103 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: display_mode_lock_set
  label: Display Mode Lock
  kind: action
  command: "~{pid}348 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]

# === TEST PATTERN / BACKGROUND ===
- id: test_pattern_set
  label: Test Pattern
  kind: action
  command: "~{pid}195 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1", "2"], description: "0=None, 1=Grid, 2=White Pattern"}
- id: background_color_set
  label: Background Color
  kind: action
  command: "~{pid}104 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["1", "2", "3", "4", "5"], description: "1=Blue, 2=Black, 3=Red, 4=Green, 5=White"}

# === IR / REMOTE ===
- id: ir_function_set
  label: IR Function
  kind: action
  command: "~{pid}11 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1", "2", "3"], description: "0=Off, 1=On, 2=Front, 3=Top"}
- id: remote_code_set
  label: Remote Code
  kind: action
  command: "~{pid}350 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=00 to 99"}]

# === TRIGGER / POWER MANAGEMENT ===
- id: trigger_12v_set
  label: 12V Trigger
  kind: action
  command: "~{pid}192 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On"}]
- id: direct_power_on_set
  label: Direct Power On
  kind: action
  command: "~{pid}105 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: signal_power_on_set
  label: Signal Power On
  kind: action
  command: "~{pid}113 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["0", "1"], description: "0=Off, 1=On"}]
- id: auto_power_off_set
  label: Auto Power Off (min)
  kind: action
  command: "~{pid}106 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=0 to 180, 5-min steps (HEX a=30 to 31 38 30)"}]
- id: sleep_timer_set
  label: Sleep Timer (min)
  kind: action
  command: "~{pid}107 {value}\r"
  params: [{name: pid, type: string}, {name: value, type: integer, description: "n=0 to 990, 10-min steps"}]
- id: sleep_timer_repeat_set
  label: Sleep Timer Repeat
  kind: action
  command: "~{pid}507 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: quick_resume_set
  label: Quick Resume
  kind: action
  command: "~{pid}115 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: power_mode_set
  label: Power Mode (Standby)
  kind: action
  command: "~{pid}114 {state}\r"
  params:
    - {name: pid, type: string}
    - {name: state, type: enum, values: ["1", "0"], description: "1=Eco (<=0.5W), 0=Active (0/2 backward-compatible)"}

# === LAMP / FILTER ===
- id: lamp_reminder_set
  label: Lamp Reminder
  kind: action
  command: "~{pid}109 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: lamp_mode_set
  label: LampMode
  kind: action
  command: "~{pid}110 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["1", "2", "5"], description: "1=Bright, 2=Eco, 5=Power"}
- id: power_wattage_set
  label: Power Wattage
  kind: action
  command: "~{pid}326 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1", "2", "3", "4", "5"], description: "0=365W, 1=350W, 2=330W, 3=310W, 4=300W, 5=280W"}
- id: lamp_reset_set
  label: Lamp Reset
  kind: action
  command: "~{pid}111 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"], description: "1=Yes, 0=No"}]
- id: optional_filter_set
  label: Optional Filter Installed
  kind: action
  command: "~{pid}320 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"], description: "1=Yes, 0=No"}]
- id: filter_reminder_set
  label: Filter Reminder
  kind: action
  command: "~{pid}322 {value}\r"
  params:
    - {name: pid, type: string}
    - {name: value, type: enum, values: ["0", "1", "2", "3", "4"], description: "0=Off, 1=300 hrs, 2=500 hrs, 3=800 hrs, 4=1000 hrs"}
- id: filter_reset_set
  label: Filter Reset
  kind: action
  command: "~{pid}323 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"], description: "1=Yes, 0=No"}]

# === OSD / RESET ===
- id: information_menu_set
  label: Information Menu
  kind: action
  command: "~{pid}313 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"]}]
- id: factory_reset_set
  label: Factory Reset
  kind: action
  command: "~{pid}112 {state}\r"
  params: [{name: pid, type: string}, {name: state, type: enum, values: ["1", "0"], description: "1=Yes, 0=No"}]
- id: osd_message_set
  label: Display Message on OSD
  kind: action
  command: "~{pid}210 {message}\r"
  params:
    - {name: pid, type: string}
    - {name: message, type: string, description: "1-30 characters (source HEX row shows literal `n` byte in opcode slot - preserved as listed)."}

# === REMOTE EMULATION (~XX140) ===
- id: remote_key
  label: Remote Key Emulation
  kind: action
  command: "~{pid}140 {key}\r"
  params:
    - {name: pid, type: string}
    - name: key
      type: enum
      values: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "20", "47"]
      description: "10=Up, 11=Left, 12=Enter, 13=Right, 14=Down, 15=V Keystone+, 16=V Keystone-, 17=Volume-, 18=Volume+, 20=Menu, 47=Source"

# === QUERIES (SEND from host, projector returns value) ===
- id: query_sw_version
  label: Software Version Query
  kind: query
  command: "~{pid}122 1\r"
  params: [{name: pid, type: string}]
- id: query_lan_fw
  label: LAN FW Version Query
  kind: query
  command: "~{pid}357 1\r"
  params: [{name: pid, type: string, description: "Source ASCII mnemonic 357; HEX row shows opcode 33 35 34 (=354). Discrepancy noted."}]
- id: query_display_mode
  label: Display Mode Query
  kind: query
  command: "~{pid}123 1\r"
  params: [{name: pid, type: string}]
- id: query_power_state
  label: Power State Query
  kind: query
  command: "~{pid}124 1\r"
  params: [{name: pid, type: string}]
- id: query_brightness
  label: Brightness Query
  kind: query
  command: "~{pid}125 1\r"
  params: [{name: pid, type: string}]
- id: query_contrast
  label: Contrast Query
  kind: query
  command: "~{pid}126 1\r"
  params: [{name: pid, type: string}]
- id: query_format
  label: Format Query
  kind: query
  command: "~{pid}127 1\r"
  params: [{name: pid, type: string}]
- id: query_color_temp
  label: Color Temperature Query
  kind: query
  command: "~{pid}128 1\r"
  params: [{name: pid, type: string}]
- id: query_projection
  label: Projection Mode Query
  kind: query
  command: "~{pid}129 1\r"
  params: [{name: pid, type: string}]
- id: query_information
  label: Information Query
  kind: query
  command: "~{pid}150 1\r"
  params: [{name: pid, type: string}]
- id: query_model_name
  label: Model Name Query
  kind: query
  command: "~{pid}151 1\r"
  params: [{name: pid, type: string}]
- id: query_lamp_hours
  label: Lamp Hours Query
  kind: query
  command: "~{pid}108 1\r"
  params: [{name: pid, type: string}]
- id: query_lamp_hours_total
  label: Cumulative Lamp Hours Query
  kind: query
  command: "~{pid}108 2\r"
  params: [{name: pid, type: string}]
- id: query_filter_hours
  label: Filter Usage Hours Query
  kind: query
  command: "~{pid}321 1\r"
  params: [{name: pid, type: string}]
- id: query_network_status
  label: Network Status Query
  kind: query
  command: "~{pid}87 1\r"
  params: [{name: pid, type: string}]
- id: query_ip_address
  label: IP Address Query
  kind: query
  command: "~{pid}87 3\r"
  params: [{name: pid, type: string}]
- id: query_fan1_speed
  label: Fan1 Speed (Blower) Query
  kind: query
  command: "~{pid}351 0\r"
  params: [{name: pid, type: string, description: "Source ASCII mnemonic 351 with value 0; HEX row shows opcode 33 35 31 (=351). Preserved as listed."}]
- id: query_system_temp
  label: System Temperature Query
  kind: query
  command: "~{pid}352 1\r"
  params: [{name: pid, type: string}]
- id: query_serial_number
  label: Serial Number Query
  kind: query
  command: "~{pid}353 1\r"
  params: [{name: pid, type: string}]
- id: query_cc
  label: Closed Captioning Query
  kind: query
  command: "~{pid}354 1\r"
  params: [{name: pid, type: string}]
- id: query_av_mute
  label: AV Mute Query
  kind: query
  command: "~{pid}355 1\r"
  params: [{name: pid, type: string}]
- id: query_mute
  label: Mute Query
  kind: query
  command: "~{pid}356 1\r"
  params: [{name: pid, type: string}]
- id: query_lamp_watt
  label: Current Lamp Wattage Query
  kind: query
  command: "~{pid}358 1\r"
  params: [{name: pid, type: string}]
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source_query: query_power_state
  response_format: "OKn  (n=0 Off, n=1 On)"

- id: display_mode
  type: enum
  values: [none, presentation, bright, movie, srgb, user, blackboard, dicom_sim, "3d"]
  source_query: query_display_mode
  response_format: "Okn  (n=0 None, 1 Presentation, 2 Bright, 3 Movie, 4 sRGB, 5 User, 7 Blackboard, 12 DICOM SIM., 9 3D)"

- id: format
  type: enum
  values: ["4:3", "16:9", "16:10", LBX, Native, Auto]
  source_query: query_format

- id: color_temperature
  type: enum
  values: [standard, cool, cold, warm]
  source_query: query_color_temp

- id: projection_mode
  type: enum
  values: [front_desktop, rear_desktop, front_ceiling, rear_ceiling]
  source_query: query_projection

- id: model_name
  type: enum
  values: [WXGA, "1080p", WUXGA]
  source_query: query_model_name

- id: lamp_hours
  type: integer
  source_query: query_lamp_hours

- id: lamp_hours_cumulative
  type: integer
  source_query: query_lamp_hours_total

- id: filter_hours
  type: integer
  source_query: query_filter_hours

- id: network_status
  type: enum
  values: [disconnected, connected]
  source_query: query_network_status

- id: ip_address
  type: string
  source_query: query_ip_address

- id: fan1_speed
  type: integer
  source_query: query_fan1_speed
  response_format: "Okaaaa  (a=0000~9999)"

- id: system_temperature
  type: integer
  source_query: query_system_temp

- id: serial_number
  type: string
  source_query: query_serial_number

- id: closed_captioning_state
  type: enum
  values: [off, cc1, cc2]
  source_query: query_cc

- id: av_mute_state
  type: enum
  values: [off, on]
  source_query: query_av_mute

- id: mute_state
  type: enum
  values: [off, on]
  source_query: query_mute

- id: lamp_wattage
  type: integer
  source_query: query_lamp_watt

- id: software_version
  type: string
  source_query: query_sw_version

- id: lan_fw_version
  type: string
  source_query: query_lan_fw

- id: information_bundle
  type: object
  source_query: query_information
  response_format: "Okabbbbbccddde"
  fields:
    power_status: {position: a, values: {0: off, 1: on}}
    lamp_hours: {position: bbbbb, type: integer}
    source: {position: cc, values: {00: None, 02: VGA1, 03: VGA2, 04: S-Video, 05: Video, 07: HDMI1, 08: HDMI2, 15: Displayport, 16: HDBaseT}}
    firmware_version: {position: dddd, type: string}
    display_mode: {position: ee, values: {00: None, 01: Presentation, 02: Bright, 03: Movie, 04: sRGB, 05: User, 07: Blackboard, 09: 3D, 12: DICOM SIM.}}

- id: command_ack
  type: enum
  values: [pass, fail]
  description: "Synchronous per-command return. 'P' = pass, 'F' = fail."
```

## Variables
```yaml
# Settable continuous parameters already exposed as Actions (brightness, contrast,
# volume, keystone, etc.). No additional Variables beyond those action parameters.
# UNRESOLVED: none expected for this device class.
```

## Events
```yaml
- id: status_notification
  description: "Unsolicited status broadcast from projector when entering Standby / Cooling / Out of Range / Lamp fail / Fan Lock / Over Temperature."
  payload_format: "INFOn n"
  payload_map:
    "0": Standby
    "1": Cooling
    "2": Out of Range
    "3": Lamp fail
    "4": Fan Lock
    "6": Over Temperature
    "7": UNRESOLVED  # source lists '7'/'8'/'9' in INFOn range without labels
    "8": UNRESOLVED
    "9": UNRESOLVED
  direction: device_to_host
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source excerpt contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Full user manual (lamp replacement, ceiling mount,
# High Altitude mode rationale) not present in refined excerpt.
```

## Notes
- **Models in family:** EH515, W515, WU515 base; EH515T, W515T, WU515T add HDBaseT input (`~XX12 21` source only valid on T SKU).
- **Projector ID (`XX`):** settable 00-99 via OSD or `~XX79`. `XX=00` broadcasts to every projector on the bus. Per-command.
- **All commands terminate with `<CR>`** (HEX 0D). Hex payloads in source show this byte explicitly.
- **Return codes:** synchronous `P` = pass, `F` = fail. Status changes emit unsolicited `INFOn` (see Events).
- **Telnet control limits (stated verbatim):** successive network payload < 50 bytes; one complete RS232 command < 26 bytes; min delay between commands > 200 ms.
- **Web UI auth (separate from command interface):** default username/password `admin`/`admin`. Not used by RS-232 or Telnet command channels.
- **Power-on PIN:** optional `~nnnn` suffix on `~XX00 1`. Default `~0000`; configurable `~0000`-`~9999`.
- **Network defaults (Setup > Network > LAN Settings):** DHCP Off; IP 192.168.0.100; mask 255.255.255.0; gateway 192.168.0.254; DNS 192.168.0.1.
- **Control bridges (on-device toggles via `~XX454`-`~XX459`):** Crestron (41794), Extron (2023), PJLink (4352, Class 1 v1.00), AMX Device Discovery (9131 — body text says 1023), Telnet (23), HTTP (80). Toggle via RS-232; bridges' own protocols not documented in this excerpt.
- **Source typos preserved verbatim, not silently corrected:**
  - `~XX459` (HTTP toggle) row HEX repeats opcode `33 35 38` (=458/Telnet).
  - `~XX357` (LAN FW query) row HEX shows opcode `33 35 34` (=354).
  - `~XX03` Off row lists ASCII value `2` with HEX byte `30` (=0).
  - `~XX78 0` (Security Off) row HEX missing terminating `0D`.
  - Language codes 25 (Vietnamese), 26 (Indonesian), 27 (Romanian) all share HEX bytes `32 33` (=23).
  - AMX port: control-settings table says 9131; prose body says 1023.

<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: lamp wattage actual hardware spec (only control-state enum 365W/350W/330W/310W/300W/280W present). -->
<!-- UNRESOLVED: voltage/current/power input spec absent from refined excerpt. -->
<!-- UNRESOLVED: INFOn codes 7/8/9 listed in range without labels. -->

## Provenance

```yaml
source_domains:
  - optomaeurope.com
  - region-resource.optoma.com
  - optoma.com
source_urls:
  - https://www.optomaeurope.com/uploads/manuals/EH515-M-en.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optoma.com/us/support/product-downloads/
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
retrieved_at: 2026-07-25T21:15:35.275Z
last_checked_at: 2026-08-05T08:35:15.126Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:35:15.126Z
matched_actions: 144
action_count: 144
confidence: medium
summary: "All 144 spec actions map to literal source command rows; transport values verified; source RS-232 catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact voltage/power/lamp-wattage hardware spec not in excerpt (only control-state enumerations present)."
- "none expected for this device class."
- "no explicit multi-step sequences documented in source."
- "source excerpt contains no safety warnings, interlock procedures, or"
- "firmware version compatibility ranges not stated."
- "lamp wattage actual hardware spec (only control-state enum 365W/350W/330W/310W/300W/280W present)."
- "voltage/current/power input spec absent from refined excerpt."
- "INFOn codes 7/8/9 listed in range without labels."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
