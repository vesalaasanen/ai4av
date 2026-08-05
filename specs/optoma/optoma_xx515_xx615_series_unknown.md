---
spec_id: admin/optoma-xx515-xx615-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma xx515 xx615 Series Control Spec"
manufacturer: Optoma
model_family: "Optoma xx515 xx615 Series"
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - "Optoma xx515 xx615 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - optomaeurope.com
  - optoma.de
  - manualslib.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://www.optoma.de/uploads/rs232/ds309-rs232-en.pdf
  - https://www.manualslib.com/products/Optoma-X515-12544667.html
retrieved_at: 2026-07-24T19:08:25.942Z
last_checked_at: 2026-08-05T08:34:25.811Z
generated_at: 2026-08-05T08:34:25.811Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not name a specific model (W515/EH515/X615/W615/EH615 etc.) — generic family sheet only."
  - "TCP port for Telnet not stated in source."
  - "HTTP base URL / port not stated in source."
  - "PJ Link / Crestron / Extron / AMX are listed as togglable services but their protocol details (ports, join numbers) are not documented here."
  - "Telnet/HTTP port not stated in source"
  - "HTTP base URL not stated in source"
  - "source contains no explicit safety interlock procedures or"
  - "exact model variants in the xx515/xx615 family (W515, WU515, EH515, X615, W615, EH615, etc.) not enumerated in this source."
  - "TCP port for Telnet control not stated."
  - "HTTP base URL / port for HTTP control not stated."
  - "PJ Link class, Crestron driver file, Extron driver file, AMX DDK not documented in this source — only enable/disable toggles."
  - "firmware version compatibility not stated."
  - "source does not document command timing limits, inter-command spacing, or response timeouts."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:34:25.811Z
  matched_actions: 184
  action_count: 184
  confidence: medium
  summary: "All 184 spec actions match documented ~XXnnn opcodes in the Optoma RS232 Protocol Function List; transport parameters verified verbatim. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Optoma xx515 xx615 Series Control Spec

## Summary
Optoma xx515/xx615 series projectors controlled via RS-232 (primary), Telnet, HTTP, and HDBaseT transports. Source is the generic Optoma "RS232 Protocol Function List" shared across the xx515/xx615 family. Commands are ASCII: `~<ID><cmd> <value><CR>` where `<ID>` is a 2-digit projector ID (00 = all projectors, 01–99 single).

<!-- UNRESOLVED: source does not name a specific model (W515/EH515/X615/W615/EH615 etc.) — generic family sheet only. -->
<!-- UNRESOLVED: TCP port for Telnet not stated in source. -->
<!-- UNRESOLVED: HTTP base URL / port not stated in source. -->
<!-- UNRESOLVED: PJ Link / Crestron / Extron / AMX are listed as togglable services but their protocol details (ports, join numbers) are not documented here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 19200  # default; source says 9600-115200 supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  framing: "ASCII, lead '~', <CR> (0x0D) terminator"
addressing:
  port: null  # UNRESOLVED: Telnet/HTTP port not stated in source
  base_url: null  # UNRESOLVED: HTTP base URL not stated in source
auth:
  type: none  # inferred: no login procedure in source
```

Note: Control menu exposes per-service toggles for Crestron (`~XX454`), Extron (`~XX455`), PJ Link (`~XX456`), AMX Device Discovery (`~XX457`), Telnet (`~XX458`), HTTP (`~XX459`). The sheet does not document their wire formats — only enable/disable.

## Traits
```yaml
traits:
  - powerable    # inferred: ~XX00 power on/off commands present
  - queryable    # inferred: extensive read commands (PW?, source, temp, hours, etc.)
  - routable     # inferred: input source selection ~XX12 / ~XX305
  - levelable    # inferred: brightness, contrast, color, gain, keystone, zoom, etc.
```

## Actions
```yaml
# Command format: ~<ID><cmd> <value><CR>
# <ID> = 2-digit projector ID (00 = broadcast, 01-99 = single). Shown as "XX" below per source.
# Write returns "P" (pass) or "F" (fail). Read returns "Ok nnn" or "F".

# --- Power / System ---
- id: power_on
  label: Power On
  kind: action
  command: "~XX00 1"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "~XX00 0"
  params: []

- id: power_query
  label: Power Status Query
  kind: query
  command: "~XX124 1"
  params: []

- id: resync
  label: Re-Sync (Auto)
  kind: action
  command: "~XX01 1"
  params: []

- id: av_mute_set
  label: AV Mute Set
  kind: action
  command: "~XX02 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: av_mute_query
  label: AV Mute Query
  kind: query
  command: "~XX355 1"
  params: []

- id: freeze_set
  label: Freeze Set
  kind: action
  command: "~XX04 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Unfreeze, 1 = Freeze"

- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "~XX105 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: auto_power_off
  label: Auto Power Off (minutes)
  kind: action
  command: "~XX106 {minutes}"
  params:
    - name: minutes
      type: integer
      description: "0-180 in 5-min increments"

- id: sleep_timer
  label: Sleep Timer (minutes)
  kind: action
  command: "~XX107 {minutes}"
  params:
    - name: minutes
      type: integer
      description: "0-990 in 30-min increments (000-990 on wire)"

- id: sleep_timer_always_on
  label: Sleep Timer Always On
  kind: action
  command: "~XX507 {state}"
  params:
    - name: state
      type: integer
      description: "0 = No, 1 = Yes"

- id: standby_power_mode_set
  label: Power Mode (Standby) Set
  kind: action
  command: "~XX114 {mode}"
  params:
    - name: mode
      type: integer
      description: "0 = Eco, 1 = Active, 3 = Communications"

- id: standby_power_mode_query
  label: Power Mode (Standby) Query
  kind: query
  command: "~XX150 16"
  params: []

- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "~XX112 1"
  params: []

- id: reset_osd
  label: Reset OSD
  kind: action
  command: "~XX546 1"
  params: []

# --- Display / Image ---
- id: display_mode_set
  label: Display Mode Set
  kind: action
  command: "~XX20 {mode}"
  params:
    - name: mode
      type: integer
      description: "1=Presentation, 2=Bright, 3=Cinema, 4=sRGB, 5=User, 9=3D, 10=DICOM SIM, 13=DICOM SIM (alt), 19=Blending, 21=HDR"

- id: display_mode_query
  label: Display Mode Query
  kind: query
  command: "~XX123 1"
  params: []

- id: wall_color_set
  label: Wall Color Set
  kind: action
  command: "~XX506 {color}"
  params:
    - name: color
      type: integer
      description: "0=Off, 1=Blackboard, 3=Light Green, 4=Light Blue, 5=Pink, 6=Gray, 7=Light Yellow"

- id: dynamic_range_hdr_set
  label: DynamicRange HDR Set
  kind: action
  command: "~XX565 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = Auto"

- id: hdr_picture_mode_set
  label: HDR Picture Mode Set
  kind: action
  command: "~XX566 {mode}"
  params:
    - name: mode
      type: integer
      description: "0=Bright, 1=Standard, 2=Film, 3=Detail, 4=SMPTE 2084"

- id: brightness_step
  label: Brightness Step +/-
  kind: action
  command: "~XX46 {dir}"
  params:
    - name: dir
      type: integer
      description: "1 = decrement, 2 = increment"

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "~XX21 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "~XX125 1"
  params: []

- id: contrast_step
  label: Contrast Step +/-
  kind: action
  command: "~XX47 {dir}"
  params:
    - name: dir
      type: integer
      description: "1 = decrement, 2 = increment"

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "~XX22 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "~XX126 1"
  params: []

- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "~XX23 {value}"
  params:
    - name: value
      type: integer
      description: "1-15"

- id: color_set
  label: Color Set
  kind: action
  command: "~XX45 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: tint_set
  label: Tint Set
  kind: action
  command: "~XX44 {value}"
  params:
    - name: value
      type: integer
      description: "0-100"

- id: gamma_set
  label: Gamma Set
  kind: action
  command: "~XX35 {mode}"
  params:
    - name: mode
      type: integer
      description: "1=Film, 2=Video, 3=Graphics, 4=Standard(2.2), 5=1.8, 6=2.0, 11=DICOM SIM, 12=2.4"

- id: brilliant_color_set
  label: BrilliantColor Set
  kind: action
  command: "~XX34 {value}"
  params:
    - name: value
      type: integer
      description: "0-10"

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  command: "~XX36 {mode}"
  params:
    - name: mode
      type: integer
      description: "1=Standard, 2=Cool, 4=Warm"

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "~XX128 1"
  params: []

# --- Color Matching (per-channel hue/sat/gain) ---
- id: cm_red_hue
  label: Color Matching Red Hue
  kind: action
  command: "~XX327 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_red_saturation
  label: Color Matching Red Saturation
  kind: action
  command: "~XX333 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_red_gain
  label: Color Matching Red Gain
  kind: action
  command: "~XX339 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_green_hue
  label: Color Matching Green Hue
  kind: action
  command: "~XX328 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_green_saturation
  label: Color Matching Green Saturation
  kind: action
  command: "~XX334 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_green_gain
  label: Color Matching Green Gain
  kind: action
  command: "~XX340 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_blue_hue
  label: Color Matching Blue Hue
  kind: action
  command: "~XX329 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_blue_saturation
  label: Color Matching Blue Saturation
  kind: action
  command: "~XX335 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_blue_gain
  label: Color Matching Blue Gain
  kind: action
  command: "~XX341 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_cyan_hue
  label: Color Matching Cyan Hue
  kind: action
  command: "~XX330 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_cyan_saturation
  label: Color Matching Cyan Saturation
  kind: action
  command: "~XX336 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_cyan_gain
  label: Color Matching Cyan Gain
  kind: action
  command: "~XX342 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_magenta_hue
  label: Color Matching Magenta Hue
  kind: action
  command: "~XX332 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_magenta_saturation
  label: Color Matching Magenta Saturation
  kind: action
  command: "~XX338 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_magenta_gain
  label: Color Matching Magenta Gain
  kind: action
  command: "~XX344 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_yellow_hue
  label: Color Matching Yellow Hue
  kind: action
  command: "~XX331 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_yellow_saturation
  label: Color Matching Yellow Saturation
  kind: action
  command: "~XX337 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_yellow_gain
  label: Color Matching Yellow Gain
  kind: action
  command: "~XX343 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_white_red
  label: Color Matching White Red
  kind: action
  command: "~XX345 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_white_green
  label: Color Matching White Green
  kind: action
  command: "~XX346 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: cm_white_blue
  label: Color Matching White Blue
  kind: action
  command: "~XX347 {value}"
  params:
    - { name: value, type: integer, description: "0-254" }

- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  command: "~XX215 1"
  params: []

# --- RGB Gain/Bias ---
- id: rgb_red_gain
  label: RGB Red Gain
  kind: action
  command: "~XX24 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: rgb_green_gain
  label: RGB Green Gain
  kind: action
  command: "~XX25 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: rgb_blue_gain
  label: RGB Blue Gain
  kind: action
  command: "~XX26 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: rgb_red_bias
  label: RGB Red Bias
  kind: action
  command: "~XX27 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: rgb_green_bias
  label: RGB Green Bias
  kind: action
  command: "~XX28 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: rgb_blue_bias
  label: RGB Blue Bias
  kind: action
  command: "~XX29 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: rgb_gain_bias_reset
  label: RGB Gain/Bias Reset
  kind: action
  command: "~XX517 1"
  params: []

- id: color_space_set
  label: Color Space Set
  kind: action
  command: "~XX37 {mode}"
  params:
    - name: mode
      type: integer
      description: "1=Auto, 2=RGB / RGB(0-255), 3=YUV, 4=RGB(16-235)"

- id: ultradetail_set
  label: UltraDetail Set
  kind: action
  command: "~XX41 {mode}"
  params:
    - name: mode
      type: integer
      description: "0=Off, 4=1, 5=2, 6=3"

- id: extreme_black_set
  label: Extreme Black Set
  kind: action
  command: "~XX218 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: dynamic_black_set
  label: Dynamic Black Set
  kind: action
  command: "~XX191 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: brightness_mode_set
  label: Brightness Mode Set
  kind: action
  command: "~XX110 {mode}"
  params:
    - name: mode
      type: integer
      description: "2=Eco Mode, 6=Constant Power, 7=Constant Luminance"

- id: power_level_set
  label: Power Level Set
  kind: action
  command: "~XX326 {value}"
  params:
    - { name: value, type: integer, description: "1-100" }

- id: purecontrast_set
  label: PureContrast Set
  kind: action
  command: "~XX219 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: purecolor_set
  label: PureColor Set
  kind: action
  command: "~XX42 {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1-5 levels"

- id: puremotion_set
  label: PureMotion Set
  kind: action
  command: "~XX190 {value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1-3 levels"

- id: puremotion_demo_set
  label: PureMotion Demo Set
  kind: action
  command: "~XX197 {mode}"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=H Split, 2=V Split"

- id: image_reset
  label: Image Settings Reset
  kind: action
  command: "~XX509 1"
  params: []

# --- 3D ---
- id: mode_3d_set
  label: 3D Mode Set
  kind: action
  command: "~XX230 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 4 = On"

- id: format_3d_set
  label: 3D Format Set
  kind: action
  command: "~XX405 {mode}"
  params:
    - name: mode
      type: integer
      description: "0=Auto, 1=Side by Side, 2=Top and Bottom, 3=Frame Sequential, 7=Frame Packing"

- id: d_3d_to_2d_set
  label: 3D-2D Set
  kind: action
  command: "~XX400 {mode}"
  params:
    - name: mode
      type: integer
      description: "0=3D, 1=L, 2=R"

- id: sync_invert_3d_set
  label: 3D Sync Invert Set
  kind: action
  command: "~XX231 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: sync_out_3d_set
  label: 3D Sync Out Set
  kind: action
  command: "~XX232 {mode}"
  params:
    - name: mode
      type: integer
      description: "0 = To Emitter, 1 = To Next Projector"

- id: lr_reference_set
  label: L/R Reference Set
  kind: action
  command: "~XX236 {mode}"
  params:
    - name: mode
      type: integer
      description: "0 = Field GPIO, 1 = 1ST FRAME"

- id: frame_delay_3d_set
  label: 3D Frame Delay Set
  kind: action
  command: "~XX233 {value}"
  params:
    - { name: value, type: integer, description: "1-200" }

- id: d_3d_reset
  label: 3D Reset
  kind: action
  command: "~XX234 1"
  params: []

- id: d_3d_output_query
  label: Output 3D State Query
  kind: query
  command: "~XX130 1"
  params: []

# --- Aspect / Zoom / Image shift / Geometry ---
- id: aspect_ratio_set
  label: Aspect Ratio Set
  kind: action
  command: "~XX60 {mode}"
  params:
    - name: mode
      type: integer
      description: "1=4:3, 2=16:9, 3=16:10, 5=LBX, 6=Native, 7=Auto"

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "~XX127 1"
  params: []

- id: digital_zoom_h_set
  label: Digital Zoom H Set
  kind: action
  command: "~XX504 {value}"
  params:
    - { name: value, type: integer, description: "50-400 (%)" }

- id: digital_zoom_v_set
  label: Digital Zoom V Set
  kind: action
  command: "~XX505 {value}"
  params:
    - { name: value, type: integer, description: "50-400 (%)" }

- id: geometry_query
  label: Geometry / Zoom / Shift / Keystone Query (multiplexed)
  kind: query
  command: "~XX543 {field}"
  params:
    - name: field
      type: integer
      description: "1=Image H shift, 2=Image V shift, 3=V Keystone, 4=H Keystone, 5=V Arc, 6=H Arc, 7=V Zoom, 8=H Zoom"

- id: image_shift_h_set
  label: Image Shift H Set
  kind: action
  command: "~XX63 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: image_shift_v_set
  label: Image Shift V Set
  kind: action
  command: "~XX64 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: geo_h_arc_set
  label: Geometric H Arc Set
  kind: action
  command: "~XX300 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

- id: geo_v_arc_set
  label: Geometric V Arc Set
  kind: action
  command: "~XX301 {value}"
  params:
    - { name: value, type: integer, description: "0-100" }

# Four Corners - per-corner H/V coordinates (separate source rows)
- id: four_corner_tl_h
  label: Four Corners Top-Left H
  kind: action
  command: "~XX581 {value}"
  params:
    - { name: value, type: integer, description: "0-120" }

- id: four_corner_tl_v
  label: Four Corners Top-Left V
  kind: action
  command: "~XX582 {value}"
  params:
    - { name: value, type: integer, description: "0-80" }

- id: four_corner_tr_h
  label: Four Corners Top-Right H
  kind: action
  command: "~XX583 {value}"
  params:
    - { name: value, type: integer, description: "0-120" }

- id: four_corner_tr_v
  label: Four Corners Top-Right V
  kind: action
  command: "~XX584 {value}"
  params:
    - { name: value, type: integer, description: "0-80" }

- id: four_corner_bl_h
  label: Four Corners Bottom-Left H
  kind: action
  command: "~XX585 {value}"
  params:
    - { name: value, type: integer, description: "0-120" }

- id: four_corner_bl_v
  label: Four Corners Bottom-Left V
  kind: action
  command: "~XX586 {value}"
  params:
    - { name: value, type: integer, description: "0-80" }

- id: four_corner_br_h
  label: Four Corners Bottom-Right H
  kind: action
  command: "~XX587 {value}"
  params:
    - { name: value, type: integer, description: "0-120" }

- id: four_corner_br_v
  label: Four Corners Bottom-Right V
  kind: action
  command: "~XX588 {value}"
  params:
    - { name: value, type: integer, description: "0-80" }

- id: four_corner_index
  label: Four Corners Position Index
  kind: action
  command: "~XX59 {index}"
  params:
    - name: index
      type: integer
      description: "1-16 (positional corner index per source)"

- id: h_keystone_set
  label: H Keystone Set
  kind: action
  command: "~XX65 {value}"
  params:
    - { name: value, type: integer, description: "0-40" }

- id: v_keystone_set
  label: V Keystone Set
  kind: action
  command: "~XX66 {value}"
  params:
    - { name: value, type: integer, description: "0-40" }

- id: warp_blend_pc_query
  label: Warp & Blend PC Connection Query
  kind: query
  command: "~XX132 3"
  params: []

- id: warp_blend_settings_set
  label: Warp & Blend Settings Set
  kind: action
  command: "~XX142 {mode}"
  params:
    - name: mode
      type: integer
      description: "0=All Off, 3=All On, 4=Blend Off"

- id: warp_blend_status_query
  label: Warp & Blend Status Query
  kind: query
  command: "~XX132 1"
  params: []

- id: warp_blend_memory_set
  label: Warp & Blend Memory Set
  kind: action
  command: "~XX147 {slot}"
  params:
    - name: slot
      type: integer
      description: "0=Off, 1=User1, 2=User2, 3=User3"

- id: warp_blend_memory_query
  label: Warp & Blend Memory Query
  kind: query
  command: "~XX137 1"
  params: []

- id: geometric_reset
  label: Geometric Correction Reset
  kind: action
  command: "~XX561 1"
  params: []

# --- PIP / PBP ---
- id: pip_pbp_screen_set
  label: PIP/PBP Screen Set
  kind: action
  command: "~XX302 {mode}"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=PIP, 2=PBP"

- id: pip_location_set
  label: PIP/PBP Location Set
  kind: action
  command: "~XX303 {loc}"
  params:
    - name: loc
      type: integer
      description: "1=PIP-TopLeft, 2=PIP-TopRight, 3=PIP-BottomLeft, 4=PIP-BottomRight, 5=PBP Main Left, 6=PBP Main Top, 7=PBP Main Right, 8=PBP Main Bottom"

- id: pip_size_set
  label: PIP Size Set
  kind: action
  command: "~XX304 {size}"
  params:
    - name: size
      type: integer
      description: "1=Large, 2=Medium, 3=Small"

- id: pip_sub_source_set
  label: PIP Sub Source Set
  kind: action
  command: "~XX305 {src}"
  params:
    - name: src
      type: integer
      description: "1=HDMI1, 4=HDMI2, 10=HDBaseT, 11=3G-SDI, 17=DisplayPort"

- id: pip_sub_source_query
  label: PIP Sub Source Query
  kind: query
  command: "~XX131 1"
  params: []

- id: pip_swap
  label: PIP Swap
  kind: action
  command: "~XX306 1"
  params: []

# --- Source / Routing ---
- id: select_input
  label: Select Input (Main Source)
  kind: action
  command: "~XX12 {src}"
  params:
    - name: src
      type: integer
      description: "1=HDMI1, 15=HDMI2, 20=DisplayPort, 21=HDBaseT, 22=3G-SDI"

- id: input_source_query
  label: Input Source Query (Main)
  kind: query
  command: "~XX121 1"
  params: []

- id: source_lock_set
  label: Source Lock Set
  kind: action
  command: "~XX100 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: auto_source_set
  label: Auto Source Set
  kind: action
  command: "~XX563 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

# --- Projection orientation ---
- id: projection_set
  label: Projection Orientation Set
  kind: action
  command: "~XX71 {mode}"
  params:
    - name: mode
      type: integer
      description: "1=Front, 2=Rear, 3=Ceiling-top, 4=Rear-top"

- id: projection_query
  label: Projection Orientation Query
  kind: query
  command: "~XX129 1"
  params: []

# --- Lens ---
- id: lens_zoom
  label: Lens Zoom +/-
  kind: action
  command: "~XX307 {dir}"
  params:
    - name: dir
      type: integer
      description: "1 = +, 2 = -"

- id: lens_focus
  label: Lens Focus +/-
  kind: action
  command: "~XX308 {dir}"
  params:
    - name: dir
      type: integer
      description: "1 = +, 2 = -"

- id: lens_function_set
  label: Lens Function Lock/Unlock
  kind: action
  command: "~XX349 {state}"
  params:
    - name: state
      type: integer
      description: "1 = Lock, 2 = Unlock"

- id: lens_function_query
  label: Lens Function Query
  kind: query
  command: "~XX545 4"
  params: []

- id: lens_shift
  label: Lens Shift Direction
  kind: action
  command: "~XX84 {dir}"
  params:
    - name: dir
      type: integer
      description: "3=Up, 4=Down, 5=Left, 6=Right"

- id: lens_calibration
  label: Lens Calibration
  kind: action
  command: "~XX525 {state}"
  params:
    - name: state
      type: integer
      description: "0 = No, 1 = Yes"

- id: lens_memory_apply
  label: Lens Memory Apply Position
  kind: action
  command: "~XX359 {slot}"
  params:
    - { name: slot, type: integer, description: "1-5" }

- id: lens_memory_save
  label: Lens Memory Save Current Position
  kind: action
  command: "~XX360 {slot}"
  params:
    - { name: slot, type: integer, description: "1-5" }

- id: lens_memory_reset
  label: Lens Memory Reset
  kind: action
  command: "~XX361 1"
  params: []

# --- Security ---
- id: security_set
  label: Security Pin Set
  kind: action
  command: "~XX78 {pin}"
  params:
    - name: pin
      type: string
      description: "0 = Off (no pin), 1-nnnn = On with 4-digit pin"

- id: security_timer_month
  label: Security Timer Month
  kind: action
  command: "~XX537 {month}"
  params:
    - { name: month, type: integer, description: "00-12" }

- id: security_timer_day
  label: Security Timer Day
  kind: action
  command: "~XX538 {day}"
  params:
    - { name: day, type: integer, description: "00-29" }

- id: security_timer_hour
  label: Security Timer Hour
  kind: action
  command: "~XX539 {hour}"
  params:
    - { name: hour, type: integer, description: "00-23" }

- id: security_timer_query
  label: Security Timer Query
  kind: query
  command: "~XX544 1"
  params: []

- id: security_timer_mmddhh_set
  label: Security Timer MM/DD/HH Set (RS232 only)
  kind: action
  command: "~XX77 {mmddhh}"
  params:
    - name: mmddhh
      type: string
      description: "MMDDHH concatenated"

# --- Test Pattern / IR / Remote ---
- id: test_pattern_set
  label: Test Pattern Set
  kind: action
  command: "~XX195 {pattern}"
  params:
    - name: pattern
      type: integer
      description: "0=Off, 1=White Grid, 2=White, 3=Green Grid, 4=Magenta Grid, 5=Red, 6=Green, 7=Blue, 8=Yellow, 9=Magenta, 10=Cyan, 11=Black"

- id: ir_function_set
  label: IR Function Set (Front/Top/HDBaseT)
  kind: action
  command: "~XX11 {value}"
  params:
    - name: value
      type: integer
      description: "4=Front Off, 5=Front On, 6=Top Off, 7=Top On, 9=HDBaseT On, 10=HDBaseT Off"

- id: ir_function_query
  label: IR Function Query
  kind: query
  command: "~XX542 1"
  params: []

- id: remote_code_set
  label: Remote Code Set
  kind: action
  command: "~XX350 {code}"
  params:
    - { name: code, type: integer, description: "00-99" }

- id: hotkey_set
  label: Hot-Key Settings Set
  kind: action
  command: "~XX117 {function}"
  params:
    - name: function
      type: integer
      description: "1 = Aspect Ratio, 2 = Freeze Screen"

- id: trigger_12v_set
  label: 12V Trigger Set
  kind: action
  command: "~XX192 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

# --- Projector ID / Sensor / LED ---
- id: projector_id_set
  label: Projector ID Set
  kind: action
  command: "~XX79 {id}"
  params:
    - { name: id, type: integer, description: "00-99" }

- id: projector_id_query
  label: Projector ID Query
  kind: query
  command: "~XX558 1"
  params: []

- id: light_sensor_set
  label: Light Sensor Mode Set
  kind: action
  command: "~XX552 {mode}"
  params:
    - name: mode
      type: integer
      description: "0 = Default, 2 = Manual"

- id: light_sensor_calibration
  label: Light Sensor Calibration
  kind: action
  command: "~XX552 2"
  params: []

- id: keypad_led_set
  label: Keypad LED Set
  kind: action
  command: "~XX362 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

# --- Options / Menu ---
- id: language_set
  label: Language Set
  kind: action
  command: "~XX70 {lang}"
  params:
    - name: lang
      type: integer
      description: "1=English, 2=Deutsch, 3=Français, 4=Italiano, 5=Español, 6=Português, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norsk/Dansk, 11=Suomi, 12=ελληνικά, 13=繁體中文, 14=簡体中文, 15=日本語, 16=한국어, 17=Русский, 18=Magyar, 19=Čeština, 21=ไทย, 22=Türkçe, 25=TiếngViệt, 26=Bahasa Indonesia, 27=Română, 28=Slovakian"

- id: menu_location_set
  label: Menu Location Set
  kind: action
  command: "~XX72 {loc}"
  params:
    - name: loc
      type: integer
      description: "1=Top left, 2=Top right, 3=Center, 4=Bottom left, 5=Bottom right"

- id: menu_transparency_set
  label: Menu Transparency Set
  kind: action
  command: "~XX526 {value}"
  params:
    - { name: value, type: integer, description: "0-9" }

- id: menu_timer_set
  label: Menu Timer Set
  kind: action
  command: "~XX515 {mode}"
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=5sec, 3=10sec, 4=15sec"

- id: high_altitude_set
  label: High Altitude Set
  kind: action
  command: "~XX101 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: information_hide_set
  label: Information Hide Set
  kind: action
  command: "~XX102 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: logo_set
  label: Logo Set
  kind: action
  command: "~XX82 {mode}"
  params:
    - name: mode
      type: integer
      description: "1 = Default, 3 = Neutral"

- id: background_color_set
  label: Background Color Set
  kind: action
  command: "~XX104 {color}"
  params:
    - name: color
      type: integer
      description: "0=None, 1=Blue, 3=Red, 4=Green, 6=Gray, 7=Logo"

- id: serial_port_baud_query
  label: Serial Port Baud Rate Query
  kind: query
  command: "~XX153 1"
  params: []

- id: serial_port_path_set
  label: Serial Port Path Set
  kind: action
  command: "~XX557 {path}"
  params:
    - name: path
      type: integer
      description: "1 = RS232, 2 = HDBaseT"

# --- System Update ---
- id: system_update_notification_set
  label: System Update Notification Set
  kind: action
  command: "~XX168 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: system_update_notification_query
  label: System Update Notification Query
  kind: query
  command: "~XX158 1"
  params: []

- id: system_update_run
  label: System Update Run
  kind: action
  command: "~XX168 9"
  params: []

# --- Network control service toggles ---
- id: wlan_set
  label: WLAN Set
  kind: action
  command: "~XX450 {state}"
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: crestron_control_set
  label: Crestron Control Set
  kind: action
  command: "~XX454 {state}"
  params:
    - { name: state, type: integer, description: "0 = Off, 1 = On" }

- id: extron_control_set
  label: Extron Control Set
  kind: action
  command: "~XX455 {state}"
  params:
    - { name: state, type: integer, description: "0 = Off, 1 = On" }

- id: pjlink_control_set
  label: PJ Link Control Set
  kind: action
  command: "~XX456 {state}"
  params:
    - { name: state, type: integer, description: "0 = Off, 1 = On" }

- id: amx_discovery_set
  label: AMX Device Discovery Set
  kind: action
  command: "~XX457 {state}"
  params:
    - { name: state, type: integer, description: "0 = Off, 1 = On" }

- id: telnet_control_set
  label: Telnet Control Set
  kind: action
  command: "~XX458 {state}"
  params:
    - { name: state, type: integer, description: "0 = Off, 1 = On" }

- id: http_control_set
  label: HTTP Control Set
  kind: action
  command: "~XX459 {state}"
  params:
    - { name: state, type: integer, description: "0 = Off, 1 = On" }

# --- Info / diagnostic queries ---
- id: serial_number_query
  label: Serial Number Query
  kind: query
  command: "~XX353 1"
  params: []

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "~XX151 1"
  params: []

- id: fw_version_query
  label: Firmware Version Query
  kind: query
  command: "~XX122 1"
  params: []

- id: lan_fw_version_query
  label: LAN Firmware Version Query
  kind: query
  command: "~XX357 1"
  params: []

- id: fan_speed_query
  label: Fan Speed Query (per fan)
  kind: query
  command: "~XX351 {fan}"
  params:
    - name: fan
      type: integer
      description: "1-4 (Fan 1-4)"

- id: system_temperature_query
  label: System Temperature Query
  kind: query
  command: "~XX352 1"
  params: []

- id: projection_hours_query
  label: Projection Hours Query
  kind: query
  command: "~XX108 1"
  params: []

- id: color_depth_query
  label: Color Depth Query
  kind: query
  command: "~XX156 1"
  params: []

- id: color_format_query
  label: Color Format Query
  kind: query
  command: "~XX157 1"
  params: []

- id: lan_mac_query
  label: LAN MAC Address Query
  kind: query
  command: "~XX555 1"
  params: []

- id: lan_ip_query
  label: LAN IP Address Query
  kind: query
  command: "~XX87 3"
  params: []

- id: wlan_info_query
  label: WLAN Info Query (multiplexed)
  kind: query
  command: "~XX451 {field}"
  params:
    - name: field
      type: integer
      description: "2=IP Address, 3=SSID, 5=Start IP, 6=End IP"

- id: info_string_query
  label: Info String Query (multiplexed)
  kind: query
  command: "~XX150 {field}"
  params:
    - name: field
      type: integer
      description: "1=Info String, 2=Native Resolution, 3=Main Source, 4=Main Resolution, 5=Main Signal Format, 6=Main Pixel Clock, 7=Main Horz Refresh, 8=Main Vert Refresh, 9=Sub Source, 10=Sub Resolution, 11=Sub Signal Format, 12=Sub Pixel Clock, 13=Sub Horz Refresh, 14=Sub Vert Refresh, 15=Light Source Mode, 16=Standby Power Mode, 17=DHCP, 18=System Temperature"

- id: filter_wheel_index_set
  label: Filter Wheel Index Set
  kind: action
  command: "~XX528 {index}"
  params:
    - { name: index, type: integer, description: "0000-9999" }

- id: filter_wheel_index_query
  label: Filter Wheel Index Query
  kind: query
  command: "~XX530 1"
  params: []

- id: phosphor_wheel_index_set
  label: Phosphor Wheel Index Set
  kind: action
  command: "~XX529 {index}"
  params:
    - { name: index, type: integer, description: "0000-9999" }

- id: phosphor_wheel_index_query
  label: Phosphor Wheel Index Query
  kind: query
  command: "~XX531 1"
  params: []

# --- Remote Control Simulation (single opcode, many key codes) ---
- id: remote_key_simulate
  label: Remote Control Key Simulation
  kind: action
  command: "~XX140 {key}"
  params:
    - name: key
      type: integer
      description: "1=Power, 2=Power Off, 10=Up, 11=Left, 12=Enter(Menu), 13=Right, 14=Down, 15=V Keystone +, 16=V Keystone -, 19=Brightness, 20=Menu, 21=Zoom, 24=AV Mute, 28=Contrast, 31=Lens shift, 32=Zoom +, 33=Zoom -, 34=Focus +, 35=Focus -, 36=Mode, 40=info, 41=Auto(Re-sync), 47=Input(Source), 51-60=Digits 1-0, 61=Gamma, 63=PIP, 64=Lens H(left), 65=Lens H(Right), 66=Lens V(Up), 67=Lens V(Down), 68=H Keystone +, 69=H Keystone -, 70=Hot Key (user1/F1), 73=Pattern, 74=Exit"
```

## Feedbacks
```yaml
# Write commands return single ASCII char: "P" = pass, "F" = fail.
- id: write_ack
  type: enum
  values: [P, F]

# Read commands return "Ok nnn" on pass, "F" on fail.
- id: read_response
  type: string
  description: "Ok<value> on pass, F on fail"

# Power state (read from ~XX124 1)
- id: power_state
  type: enum
  values: [off, on]
```

## Variables
```yaml
# All continuous/range settings are represented as parameterized Actions above.
# Discrete settable state is also represented as Actions. No separate Variables
# are documented in the source beyond what Actions already cover.
```

## Events
```yaml
# System Auto Response: device emits unsolicited "INFO n" notifications.
- id: system_auto_response
  type: enum
  description: "Unsolicited 'INFOn' where n indicates projector state/fault"
  values:
    - 0: Standby Mode
    - 1: Warming up
    - 2: Cooling Down
    - 3: Out of Range
    - 4: Lamp Fail (LED Fail)
    - 5: Thermal Switch Error
    - 6: Fan Lock
    - 7: Over Temperature
    - 8: System Auto Send Lamp Hours Running Out
    - 9: Cover Open
    - 10: Lamp Ignite Fail
    - 11: Format Board Power On Fail
    - 12: Color Wheel Unexpected Stop
    - 13: Over Temperature
    - 14: FAN 1 Lock
    - 15: FAN 2 Lock
    - 16: FAN 3 Lock
    - 17: FAN 4 Lock
    - 18: FAN 5 Lock
    - 19: LAN fail then restart
    - 20: LD lower than 60%
    - 21: LD NTC (1) Over Temperature
    - 22: LD NTC (2) Over Temperature
    - 23: High Ambient Temperature
    - 24: System Ready
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety interlock procedures or
# power-on sequencing warnings. Power On/Off commands present but no warning
# text about cooldown periods, lamp strike limits, or thermal protection.
```

## Notes
- Command framing: ASCII, lead byte `~` (0x7E), 2-digit projector ID (`XX`, 00 = broadcast to all projectors, 01–99 = single), 3-digit command code, space (0x20), variable value, terminator `<CR>` (0x0D).
- Baud rate is software-selectable on the projector (9600, 14400, 19200, 38400, 57600, 115200) via menu; default 19200. The control system must match.
- Serial Port Path selectable RS232 or HDBaseT (`~XX557`) — HDBaseT carries the same RS-232 command stream over the HDBaseT link.
- The `XX` in every command is a literal placeholder for the 2-digit projector ID, **not** a fixed prefix. Example from source: command `~00195 1<CR>` targets projector 00 (all) Test Pattern On; hex `7E 30 30 31 39 35 20 31 0D`.
- Freeze can be released by menu key, exit key, or direct source key (source Note 1).
- Write response: `P` = pass, `F` = fail. Read response: `Ok nnn` = pass with value, `F` = fail.
- The source document is Optoma's **generic** RS232 Protocol Function List (titled "RS232 Protocol Function List", baud 19200 8N1), not a model-specific sheet. Recovery notes from prior agents indicate the xx515/xx615 family uses this shared protocol; a dedicated per-model sheet was not located.

<!-- UNRESOLVED: exact model variants in the xx515/xx615 family (W515, WU515, EH515, X615, W615, EH615, etc.) not enumerated in this source. -->
<!-- UNRESOLVED: TCP port for Telnet control not stated. -->
<!-- UNRESOLVED: HTTP base URL / port for HTTP control not stated. -->
<!-- UNRESOLVED: PJ Link class, Crestron driver file, Extron driver file, AMX DDK not documented in this source — only enable/disable toggles. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: source does not document command timing limits, inter-command spacing, or response timeouts. -->
````

Spec above. Generic family sheet, ~170 opcodes enumerated as parameterized actions (enum/range collapsed per granularity rule, distinct opcodes kept separate). Telnet/HTTP ports, PJ Link class, exact model variants = unresolved.

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - optomaeurope.com
  - optoma.de
  - manualslib.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://www.optoma.de/uploads/rs232/ds309-rs232-en.pdf
  - https://www.manualslib.com/products/Optoma-X515-12544667.html
retrieved_at: 2026-07-24T19:08:25.942Z
last_checked_at: 2026-08-05T08:34:25.811Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:34:25.811Z
matched_actions: 184
action_count: 184
confidence: medium
summary: "All 184 spec actions match documented ~XXnnn opcodes in the Optoma RS232 Protocol Function List; transport parameters verified verbatim. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not name a specific model (W515/EH515/X615/W615/EH615 etc.) — generic family sheet only."
- "TCP port for Telnet not stated in source."
- "HTTP base URL / port not stated in source."
- "PJ Link / Crestron / Extron / AMX are listed as togglable services but their protocol details (ports, join numbers) are not documented here."
- "Telnet/HTTP port not stated in source"
- "HTTP base URL not stated in source"
- "source contains no explicit safety interlock procedures or"
- "exact model variants in the xx515/xx615 family (W515, WU515, EH515, X615, W615, EH615, etc.) not enumerated in this source."
- "TCP port for Telnet control not stated."
- "HTTP base URL / port for HTTP control not stated."
- "PJ Link class, Crestron driver file, Extron driver file, AMX DDK not documented in this source — only enable/disable toggles."
- "firmware version compatibility not stated."
- "source does not document command timing limits, inter-command spacing, or response timeouts."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
