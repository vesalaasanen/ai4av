---
spec_id: admin/extron-mgp460-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron MGP 460 Series Control Spec"
manufacturer: Extron
model_family: "MGP 464"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "MGP 464"
    - "MGP 464 DI"
    - "MGP 464 HD-SDI"
    - "MGP 462xi"
    - "MGP 462xi DI"
    - "MGP 462xi HD-SDI"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/MGP_Series_UserManual_68-1235-01_D.pdf
  - https://www.extron.com/download/files/userman/68-2469-01_C_MGP_Pro_UG.pdf
retrieved_at: 2026-05-14T16:30:35.586Z
last_checked_at: 2026-06-02T21:41:42.745Z
generated_at: 2026-06-02T21:41:42.745Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "no documented multi-step sequences in source"
  - "source documents no power-sequencing or hardware interlock procedures"
  - "power supply voltage, current, total power, operating temperature range, weight, dimensions, and EMI/safety certifications not extracted into refined doc"
  - "response timing budgets (per-command latency) not stated"
  - "maximum simultaneous Telnet sessions and connection rate limits not stated (error E26 implies a cap but value not given)"
  - "complete X1@/X1$/X1*/X1(/X1#/X#/X4!/X4(/X5#/X5@/X6^/X6*/X6( variable formats partially defined; some referenced placeholders (X3%, X3^, X3&, X3*, X3(, X4$, X4%, X4^, X4&, X7), X5$, X\\) lacked full value tables in the refined excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:42.745Z
  matched_actions: 245
  action_count: 245
  confidence: medium
  summary: "All 245 spec actions have verbatim wire-literal matches in the source command table; transport values confirmed; source catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Extron MGP 460 Series Control Spec

## Summary
Extron MGP 464 and MGP 462xi series Multi-Graphic Processors. Controlled via Simple Instruction Set (SIS) commands over RS-232/422 (rear 9-pin D), RS-232 front Config port (2.5 mm TRS), or Ethernet (Telnet port 23, HTTP port 80).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23
  base_url: ""  # HTTP control on port 80; no fixed REST base path stated in source
auth:
  type: password_optional  # source documents admin/user passwords; not required
  note: "Administrator and user passwords supported via CA/CU commands; passwords case sensitive, 4-12 alphanumeric characters, no special characters. Login is optional; anonymous access allowed when no password set."
```

## Traits
```yaml
- routable        # inferred from input-to-window selection commands
- queryable       # inferred from query commands (PW?, view variants, Q, N, etc.)
- levelable       # color/tint/contrast/brightness/detail level commands present
```

## Actions
```yaml
# ---------------- Input Selection ----------------
- id: select_input
  label: Select Input
  kind: action
  command: "{input}*{window}!"
  params:
    - { name: input, type: integer, description: "Input number 1-19 (X50))" }
    - { name: window, type: integer, description: "Window 0-4; 0 = all (X50@)" }

- id: view_input
  label: View Input
  kind: query
  command: "{window}!"
  params:
    - { name: window, type: integer, description: "Window 0-4" }

# ---------------- Input Video Type ----------------
- id: set_video_type
  label: Set Input Video Type
  kind: action
  command: "{input}*{type}\\"
  params:
    - { name: input, type: integer, description: "Input 1-19" }
    - { name: type, type: integer, description: "1=RGB, 2=YUV-HD, 3=RGBcvS, 4=YUVi, 5=S-video, 6=Composite, 7=DVI/HD-SDI" }

- id: view_video_type
  label: View Input Video Type
  kind: query
  command: "{input}\\"
  params:
    - { name: input, type: integer }

# ---------------- DVI Input EDID ----------------
- id: set_edid
  label: Set DVI Input EDID
  kind: action
  command: "41{resolution}*{rate}#"
  params:
    - { name: resolution, type: integer, description: "Scaler resolution code (X50*)" }
    - { name: rate, type: integer, description: "Refresh rate code (X51%)" }

- id: view_edid
  label: View DVI Input EDID
  kind: query
  command: "41#"
  params: []

# ---------------- Window Blanking ----------------
- id: mute_window
  label: Mute (Blank) Window
  kind: action
  command: "{window}*1B"
  params:
    - { name: window, type: integer, description: "0-4; 0 = all" }

- id: unmute_window
  label: Unmute Window
  kind: action
  command: "{window}*0B"
  params:
    - { name: window, type: integer }

- id: view_blanking_status
  label: View Blanking Status
  kind: query
  command: "{window}B"
  params:
    - { name: window, type: integer }

# ---------------- Window Priority ----------------
- id: set_window_priority
  label: Set Window Priority
  kind: action
  command: "{w1}*{w2}*{w3}*{w4}~"
  params:
    - { name: w1, type: integer, description: "Top priority window" }
    - { name: w2, type: integer }
    - { name: w3, type: integer }
    - { name: w4, type: integer, description: "Lowest priority window" }

- id: view_window_priority
  label: View Window Priority
  kind: query
  command: "~"
  params: []

# ---------------- Window Transition Effect ----------------
- id: set_transition_effect
  label: Set Window Transition Effect
  kind: action
  command: "4*{effect}#"
  params:
    - { name: effect, type: integer, description: "1=Cut..22=Hard wipe curtain out (X51!)" }

- id: view_transition_effect
  label: View Window Transition Effect
  kind: query
  command: "4#"
  params: []

# ---------------- Window Effect Duration ----------------
- id: set_effect_duration
  label: Set Window Effect Duration
  kind: action
  command: "5*{duration}#"
  params:
    - { name: duration, type: integer, description: "0-50 (0.1 sec increments, 0-5 sec)" }

- id: view_effect_duration
  label: View Window Effect Duration
  kind: query
  command: "5#"
  params: []

# ---------------- Window Preset Effect ----------------
- id: set_window_preset_effect
  label: Set Window Preset Effect
  kind: action
  command: "19*{mode}#"
  params:
    - { name: mode, type: integer, description: "0=Cut, 1=Real time motion" }

- id: view_window_preset_effect
  label: View Window Preset Effect
  kind: query
  command: "19#"
  params: []

# ---------------- Color ----------------
- id: set_color
  label: Set Color Level
  kind: action
  command: "{window}*{value}C"
  params:
    - { name: window, type: integer, description: "0-4" }
    - { name: value, type: integer, description: "0-127; default 64" }

- id: increment_color
  label: Increment Color
  kind: action
  command: "{window}+C"
  params:
    - { name: window, type: integer }

- id: decrement_color
  label: Decrement Color
  kind: action
  command: "{window}-C"
  params:
    - { name: window, type: integer }

- id: view_color
  label: View Color Level
  kind: query
  command: "{window}C"
  params:
    - { name: window, type: integer }

# ---------------- Tint ----------------
- id: set_tint
  label: Set Tint Level
  kind: action
  command: "{window}*{value}T"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer }

- id: increment_tint
  label: Increment Tint
  kind: action
  command: "{window}+T"
  params:
    - { name: window, type: integer }

- id: decrement_tint
  label: Decrement Tint
  kind: action
  command: "{window}-T"
  params:
    - { name: window, type: integer }

- id: view_tint
  label: View Tint Level
  kind: query
  command: "{window}T"
  params:
    - { name: window, type: integer }

# ---------------- Contrast ----------------
- id: set_contrast
  label: Set Contrast Level
  kind: action
  command: "{window}*{value}^"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer }

- id: increment_contrast
  label: Increment Contrast
  kind: action
  command: "{window}+^"
  params:
    - { name: window, type: integer }

- id: decrement_contrast
  label: Decrement Contrast
  kind: action
  command: "{window}-^"
  params:
    - { name: window, type: integer }

- id: view_contrast
  label: View Contrast Level
  kind: query
  command: "{window}^"
  params:
    - { name: window, type: integer }

# ---------------- Brightness ----------------
- id: set_brightness
  label: Set Brightness Level
  kind: action
  command: "{window}*{value}Y"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer }

- id: increment_brightness
  label: Increment Brightness
  kind: action
  command: "{window}+Y"
  params:
    - { name: window, type: integer }

- id: decrement_brightness
  label: Decrement Brightness
  kind: action
  command: "{window}-Y"
  params:
    - { name: window, type: integer }

- id: view_brightness
  label: View Brightness Level
  kind: query
  command: "{window}Y"
  params:
    - { name: window, type: integer }

# ---------------- Detail (Sharpness) ----------------
- id: set_detail
  label: Set Detail (Sharpness) Level
  kind: action
  command: "{window}*{value}D"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer, description: "0-127" }

- id: increment_detail
  label: Increment Detail
  kind: action
  command: "{window}+D"
  params:
    - { name: window, type: integer }

- id: decrement_detail
  label: Decrement Detail
  kind: action
  command: "{window}-D"
  params:
    - { name: window, type: integer }

- id: view_detail
  label: View Detail Level
  kind: query
  command: "{window}D"
  params:
    - { name: window, type: integer }

# ---------------- Horizontal Shift (Window) ----------------
- id: set_window_hshift
  label: Set Window Horizontal Shift
  kind: action
  command: "1*{window}*{value}H"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer, description: "0 = 2048; ± output resolution" }

- id: increment_window_hshift
  label: Increment Window Horizontal Shift
  kind: action
  command: "1*{window}+H"
  params:
    - { name: window, type: integer }

- id: decrement_window_hshift
  label: Decrement Window Horizontal Shift
  kind: action
  command: "1*{window}-H"
  params:
    - { name: window, type: integer }

- id: view_window_hshift
  label: View Window Horizontal Shift
  kind: query
  command: "1*{window}H"
  params:
    - { name: window, type: integer }

# ---------------- Vertical Shift (Window) ----------------
- id: set_window_vshift
  label: Set Window Vertical Shift
  kind: action
  command: "1*{window}*{value}/"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer }

- id: increment_window_vshift
  label: Increment Window Vertical Shift
  kind: action
  command: "1*{window}+/"
  params:
    - { name: window, type: integer }

- id: decrement_window_vshift
  label: Decrement Window Vertical Shift
  kind: action
  command: "1*{window}-/"
  params:
    - { name: window, type: integer }

- id: view_window_vshift
  label: View Window Vertical Shift
  kind: query
  command: "1*{window}/"
  params:
    - { name: window, type: integer }

# ---------------- Horizontal Shift (Image) ----------------
- id: set_image_hshift
  label: Set Image Horizontal Shift
  kind: action
  command: "2*{window}*{value}H"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer }

- id: increment_image_hshift
  label: Increment Image Horizontal Shift
  kind: action
  command: "2*{window}+H"
  params:
    - { name: window, type: integer }

- id: decrement_image_hshift
  label: Decrement Image Horizontal Shift
  kind: action
  command: "2*{window}-H"
  params:
    - { name: window, type: integer }

- id: view_image_hshift
  label: View Image Horizontal Shift
  kind: query
  command: "2*{window}H"
  params:
    - { name: window, type: integer }

# ---------------- Vertical Shift (Image) ----------------
- id: set_image_vshift
  label: Set Image Vertical Shift
  kind: action
  command: "2*{window}*{value}/"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer }

- id: increment_image_vshift
  label: Increment Image Vertical Shift
  kind: action
  command: "2*{window}+/"
  params:
    - { name: window, type: integer }

- id: decrement_image_vshift
  label: Decrement Image Vertical Shift
  kind: action
  command: "2*{window}-/"
  params:
    - { name: window, type: integer }

- id: view_image_vshift
  label: View Image Vertical Shift
  kind: query
  command: "2*{window}/"
  params:
    - { name: window, type: integer }

# ---------------- Horizontal Size (Window) ----------------
- id: set_window_hsize
  label: Set Window Width
  kind: action
  command: "1*{window}*{value}:"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer, description: "Min 1/16 of active output, max = active output area" }

- id: increase_window_hsize
  label: Increase Window Width
  kind: action
  command: "1*{window}+:"
  params:
    - { name: window, type: integer }

- id: decrease_window_hsize
  label: Decrease Window Width
  kind: action
  command: "1*{window}-:"
  params:
    - { name: window, type: integer }

- id: view_window_hsize
  label: View Window Width
  kind: query
  command: "1*{window}:"
  params:
    - { name: window, type: integer }

# ---------------- Vertical Size (Window) ----------------
- id: set_window_vsize
  label: Set Window Height
  kind: action
  command: "1*{window}*{value};"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer }

- id: increase_window_vsize
  label: Increase Window Height
  kind: action
  command: "1*{window}+;"
  params:
    - { name: window, type: integer }

- id: decrease_window_vsize
  label: Decrease Window Height
  kind: action
  command: "1*{window}-;"
  params:
    - { name: window, type: integer }

- id: view_window_vsize
  label: View Window Height
  kind: query
  command: "1*{window};"
  params:
    - { name: window, type: integer }

# ---------------- Horizontal Size (Image) ----------------
- id: set_image_hsize
  label: Set Image Width
  kind: action
  command: "2*{window}*{value}:"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer, description: "Min 1/16 of active input, max 2x active output" }

- id: increase_image_hsize
  label: Increase Image Width
  kind: action
  command: "2*{window}+:"
  params:
    - { name: window, type: integer }

- id: decrease_image_hsize
  label: Decrease Image Width
  kind: action
  command: "2*{window}-:"
  params:
    - { name: window, type: integer }

- id: view_image_hsize
  label: View Image Width
  kind: query
  command: "2*{window}:"
  params:
    - { name: window, type: integer }

# ---------------- Vertical Size (Image) ----------------
- id: set_image_vsize
  label: Set Image Height
  kind: action
  command: "2*{window}*{value};"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer }

- id: increase_image_vsize
  label: Increase Image Height
  kind: action
  command: "2*{window}+;"
  params:
    - { name: window, type: integer }

- id: decrease_image_vsize
  label: Decrease Image Height
  kind: action
  command: "2*{window}-;"
  params:
    - { name: window, type: integer }

- id: view_image_vsize
  label: View Image Height
  kind: query
  command: "2*{window};"
  params:
    - { name: window, type: integer }

# ---------------- Picture Control Copy ----------------
- id: copy_picture_controls
  label: Copy Picture Controls
  kind: action
  command: "21*{window}#Pcc"
  params:
    - { name: window, type: integer, description: "Destination window 0-4" }

# ---------------- Window Size and Position ----------------
- id: set_window_xy
  label: Set Window Position and Size
  kind: action
  command: "\x1B{window},{hpos}*{vpos}*{hsize}*{vsize}XY\r"
  params:
    - { name: window, type: integer }
    - { name: hpos, type: integer }
    - { name: vpos, type: integer }
    - { name: hsize, type: integer }
    - { name: vsize, type: integer }
  notes: "Source ASCII: `E X50@ , X52! * X52! * X52@ * X52@ X Y }`. E = Escape (hex 1B); } = CR (hex 0D)."

- id: view_window_xy
  label: View Window Position and Size
  kind: query
  command: "\x1B{window}XY\r"
  params:
    - { name: window, type: integer }
  notes: "Source ASCII: `E X50@ X Y }`."

# ---------------- Image Size and Position ----------------
- id: set_image_xy
  label: Set Image Position and Size
  kind: action
  command: "\x1B{window},{hpos}*{vpos}*{hsize}*{vsize}IY\r"
  params:
    - { name: window, type: integer }
    - { name: hpos, type: integer }
    - { name: vpos, type: integer }
    - { name: hsize, type: integer }
    - { name: vsize, type: integer }
  notes: "Source ASCII: `E X50@ , X52! * X52! * X52# * X52# I Y }`."

- id: view_image_xy
  label: View Image Position and Size
  kind: query
  command: "\x1B{window}IY\r"
  params:
    - { name: window, type: integer }
  notes: "Source ASCII: `E X50@ I Y }`."

# ---------------- Zoom Mode (Window) ----------------
- id: window_zoom_in
  label: Window Zoom In
  kind: action
  command: "1*{window}+{"
  params:
    - { name: window, type: integer }

- id: window_zoom_out
  label: Window Zoom Out
  kind: action
  command: "1*{window}-{"
  params:
    - { name: window, type: integer }

# ---------------- Zoom Mode (Image) ----------------
- id: image_zoom_in
  label: Image Zoom In
  kind: action
  command: "2*{window}+{"
  params:
    - { name: window, type: integer }

- id: image_zoom_out
  label: Image Zoom Out
  kind: action
  command: "2*{window}-{"
  params:
    - { name: window, type: integer }

# ---------------- Window Presets ----------------
- id: recall_window_preset_no_input
  label: Recall Window Preset (No Input)
  kind: action
  command: "1*{preset}."
  params:
    - { name: preset, type: integer, description: "Preset 1-128" }

- id: recall_window_preset_with_input
  label: Recall Window Preset (With Input)
  kind: action
  command: "2*{preset}."
  params:
    - { name: preset, type: integer }

- id: save_window_preset
  label: Save Window Preset
  kind: action
  command: "2*{preset},Spr"
  params:
    - { name: preset, type: integer }

# ---------------- Input Presets ----------------
- id: recall_input_preset
  label: Recall Input Preset
  kind: action
  command: "3*{window}*{preset}."
  params:
    - { name: window, type: integer }
    - { name: preset, type: integer, description: "1-128" }

- id: save_input_preset
  label: Save Input Preset
  kind: action
  command: "3*{window}*{preset},Spr"
  params:
    - { name: window, type: integer }
    - { name: preset, type: integer }

# ---------------- Input Naming ----------------
- id: write_input_name
  label: Write Input Name
  kind: action
  command: "\x1B{input},{name}NI\r"
  params:
    - { name: input, type: integer, description: "Input 1-19" }
    - { name: name, type: string, description: "Up to 16 characters" }
  notes: "Source ASCII: `E X50) , X50^ NI }`."

- id: read_input_name
  label: Read Input Name
  kind: query
  command: "\x1B{input}NI\r"
  params:
    - { name: input, type: integer }
  notes: "Source ASCII: `E X50) NI }`."

# ---------------- Window Preset Naming ----------------
- id: write_window_preset_name
  label: Write Window Preset Name
  kind: action
  command: "\x1B{preset},{name}NP\r"
  params:
    - { name: preset, type: integer }
    - { name: name, type: string }
  notes: "Source ASCII: `E X51# , X50^ NP }`."

- id: read_window_preset_name
  label: Read Window Preset Name
  kind: query
  command: "\x1B{preset}NP\r"
  params:
    - { name: preset, type: integer }
  notes: "Source ASCII: `E X51# NP }`."

# ---------------- Vertical Start ----------------
- id: set_vstart
  label: Set Vertical Start
  kind: action
  command: "{input}*{value}("
  params:
    - { name: input, type: integer }
    - { name: value, type: integer, description: "0-255; default 128" }

- id: increment_vstart
  label: Increment Vertical Start
  kind: action
  command: "{input}+("
  params:
    - { name: input, type: integer }

- id: decrement_vstart
  label: Decrement Vertical Start
  kind: action
  command: "{input}-("
  params:
    - { name: input, type: integer }

- id: view_vstart
  label: View Vertical Start
  kind: query
  command: "{input}("
  params:
    - { name: input, type: integer }

# ---------------- Horizontal Start ----------------
- id: set_hstart
  label: Set Horizontal Start
  kind: action
  command: "{input}*{value})"
  params:
    - { name: input, type: integer }
    - { name: value, type: integer, description: "0-255; default 128" }

- id: increment_hstart
  label: Increment Horizontal Start
  kind: action
  command: "{input}+)"
  params:
    - { name: input, type: integer }

- id: decrement_hstart
  label: Decrement Horizontal Start
  kind: action
  command: "{input}-)"
  params:
    - { name: input, type: integer }

- id: view_hstart
  label: View Horizontal Start
  kind: query
  command: "{input})"
  params:
    - { name: input, type: integer }

# ---------------- Pixel Phase ----------------
- id: set_pixel_phase
  label: Set Pixel Phase
  kind: action
  command: "{window}*{value}U"
  params:
    - { name: window, type: integer }
    - { name: value, type: integer, description: "0-31" }

- id: increment_pixel_phase
  label: Increment Pixel Phase
  kind: action
  command: "{window}+U"
  params:
    - { name: window, type: integer }

- id: decrement_pixel_phase
  label: Decrement Pixel Phase
  kind: action
  command: "{window}-U"
  params:
    - { name: window, type: integer }

- id: view_pixel_phase
  label: View Pixel Phase
  kind: query
  command: "{window}U"
  params:
    - { name: window, type: integer }

# ---------------- Total Pixels ----------------
- id: set_total_pixels
  label: Set Total Pixels
  kind: action
  command: "11*{input}*{value}#"
  params:
    - { name: input, type: integer }
    - { name: value, type: integer, description: "Auto-sensed ± 512" }

- id: increment_total_pixels
  label: Increment Total Pixels
  kind: action
  command: "11*{input}+#"
  params:
    - { name: input, type: integer }

- id: decrement_total_pixels
  label: Decrement Total Pixels
  kind: action
  command: "11*{input}-#"
  params:
    - { name: input, type: integer }

- id: view_total_pixels
  label: View Total Pixels
  kind: query
  command: "11*{input}#"
  params:
    - { name: input, type: integer }

# ---------------- Active Pixels ----------------
- id: set_active_pixels
  label: Set Active Pixels
  kind: action
  command: "12*{input}*{value}#"
  params:
    - { name: input, type: integer }
    - { name: value, type: integer }

- id: increment_active_pixels
  label: Increment Active Pixels
  kind: action
  command: "12*{input}+#"
  params:
    - { name: input, type: integer }

- id: decrement_active_pixels
  label: Decrement Active Pixels
  kind: action
  command: "12*{input}-#"
  params:
    - { name: input, type: integer }

- id: view_active_pixels
  label: View Active Pixels
  kind: query
  command: "12*{input}#"
  params:
    - { name: input, type: integer }

# ---------------- Active Lines ----------------
- id: set_active_lines
  label: Set Active Lines
  kind: action
  command: "13*{input}*{value}#"
  params:
    - { name: input, type: integer }
    - { name: value, type: integer }

- id: increment_active_lines
  label: Increment Active Lines
  kind: action
  command: "13*{input}+#"
  params:
    - { name: input, type: integer }

- id: decrement_active_lines
  label: Decrement Active Lines
  kind: action
  command: "13*{input}-#"
  params:
    - { name: input, type: integer }

- id: view_active_lines
  label: View Active Lines
  kind: query
  command: "13*{input}#"
  params:
    - { name: input, type: integer }

# ---------------- Output Scaler Resolution and Rate ----------------
- id: set_output_rate
  label: Set Output Resolution and Scan Rate
  kind: action
  command: "{resolution}*{rate}="
  params:
    - { name: resolution, type: integer, description: "Resolution code 1-26 (X50*)" }
    - { name: rate, type: integer, description: "Refresh rate code 1-9 (X51%)" }

- id: view_output_rate
  label: View Output Rate Settings
  kind: query
  command: "="
  params: []

- id: view_output_rate_details
  label: View Output Rate Details
  kind: query
  command: "0="
  params: []

# ---------------- Freeze ----------------
- id: enable_freeze
  label: Enable Freeze
  kind: action
  command: "{window}*1F"
  params:
    - { name: window, type: integer, description: "0-4" }

- id: disable_freeze
  label: Disable Freeze
  kind: action
  command: "{window}*0F"
  params:
    - { name: window, type: integer }

- id: view_freeze_status
  label: View Freeze Status
  kind: query
  command: "{window}F"
  params:
    - { name: window, type: integer }

# ---------------- Test Pattern ----------------
- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  command: "{pattern}J"
  params:
    - { name: pattern, type: integer, description: "0=Off..14=2.35 Aspect (X50$)" }

- id: view_test_pattern
  label: View Test Pattern
  kind: query
  command: "J"
  params: []

# ---------------- Executive Mode ----------------
- id: enable_executive_mode_1
  label: Enable Executive Mode 1
  kind: action
  command: "1X"
  params: []
  notes: "Lock front panel except input buttons; RS-232/422 and Ethernet still active."

- id: enable_executive_mode_2
  label: Enable Executive Mode 2
  kind: action
  command: "2X"
  params: []
  notes: "Lock all front panel including input buttons."

- id: disable_executive_mode
  label: Disable Executive Mode
  kind: action
  command: "0X"
  params: []

- id: view_executive_mode
  label: View Executive Mode Status
  kind: query
  command: "X"
  params: []

# ---------------- General Information ----------------
- id: general_information
  label: General Information for Window
  kind: query
  command: "{window}*I"
  params:
    - { name: window, type: integer }

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []
  notes: "Alternate form: 1Q (same response)."

- id: query_part_number
  label: Query Part Number
  kind: query
  command: "N"
  params: []

- id: view_internal_temperature
  label: View Internal Temperature
  kind: query
  command: "20S"
  params: []
  notes: "Returns Fahrenheit value."

# ---------------- Special Functions ----------------
- id: set_output_polarity
  label: Set Output Polarity
  kind: action
  command: "1*{polarity}#"
  params:
    - { name: polarity, type: integer, description: "0=H-/V-, 1=H-/V+, 2=H+/V-, 3=H+/V+" }

- id: view_output_polarity
  label: View Output Polarity
  kind: query
  command: "1#"
  params: []

- id: set_output_sync_format
  label: Set Output Sync Format
  kind: action
  command: "2*{format}#"
  params:
    - { name: format, type: integer, description: "1=RGBHV, 2=RGBS, 3=RGsB, 4=YUV bi-level, 5=YUV tri-level" }

- id: view_output_sync_format
  label: View Output Sync Format
  kind: query
  command: "2#"
  params: []

- id: set_blue_mode
  label: Set Blue Mode
  kind: action
  command: "3*{state}#"
  params:
    - { name: state, type: integer, description: "0=off, 1=on" }

- id: view_blue_mode
  label: View Blue Mode
  kind: query
  command: "3#"
  params: []

- id: set_text_position
  label: Set Text Position
  kind: action
  command: "6*{window}*{position}#"
  params:
    - { name: window, type: integer }
    - { name: position, type: integer, description: "0=None, 1=Btm L, 2=Btm C, 3=Btm R, 4=Top L, 5=Top C, 6=Top R" }

- id: view_text_position
  label: View Text Position
  kind: query
  command: "6*{window}#"
  params:
    - { name: window, type: integer }

- id: set_text_size
  label: Set Text Size
  kind: action
  command: "10*{size}#"
  params:
    - { name: size, type: integer, description: "1=Small, 2=Medium, 3=Large" }

- id: view_text_size
  label: View Text Size
  kind: query
  command: "10#"
  params: []

- id: set_text_border_color
  label: Set Text Border Color
  kind: action
  command: "14*{window}*{color}#"
  params:
    - { name: window, type: integer }
    - { name: color, type: integer, description: "0=Off..9=Translucent" }

- id: view_text_border_color
  label: View Text Border Color
  kind: query
  command: "14*{window}#"
  params:
    - { name: window, type: integer }

- id: set_text_color
  label: Set Text Color
  kind: action
  command: "16*{window}*{color}#"
  params:
    - { name: window, type: integer }
    - { name: color, type: integer, description: "1=Red..8=Black" }

- id: view_text_color
  label: View Text Color
  kind: query
  command: "16*{window}*#"
  params:
    - { name: window, type: integer }

- id: set_text_background_color
  label: Set Text Background Color
  kind: action
  command: "17*{window}*{color}#"
  params:
    - { name: window, type: integer }
    - { name: color, type: integer, description: "0=Off..9=Translucent" }

- id: view_text_background_color
  label: View Text Background Color
  kind: query
  command: "17*{window}#"
  params:
    - { name: window, type: integer }

- id: set_window_border_color
  label: Set Window Border Color
  kind: action
  command: "9*{window}*{color}#"
  params:
    - { name: window, type: integer }
    - { name: color, type: integer, description: "0=Off..8=Black" }

- id: view_window_border_color
  label: View Window Border Color
  kind: query
  command: "9*{window}#"
  params:
    - { name: window, type: integer }

- id: set_background_color
  label: Set Background Color
  kind: action
  command: "8*{color}#"
  params:
    - { name: color, type: integer, description: "0=Off..10=Custom" }

- id: view_background_color
  label: View Background Color
  kind: query
  command: "8#"
  params: []

- id: set_custom_color
  label: Set Custom Background Color (RGB)
  kind: action
  command: "22*{red}*{green}*{blue}#"
  params:
    - { name: red, type: integer, description: "0-255" }
    - { name: green, type: integer, description: "0-255" }
    - { name: blue, type: integer, description: "0-255" }

- id: view_custom_color
  label: View Custom Color
  kind: query
  command: "22#"
  params: []

- id: save_background_image
  label: Save Background Image
  kind: action
  command: "\x1B0,{filename}MF\r"
  params:
    - { name: filename, type: string }
  notes: "Source ASCII: `E 0 , filename MF }`."

- id: recall_background_image
  label: Recall Background Image
  kind: action
  command: "\x1B0,{filename}RF\r"
  params:
    - { name: filename, type: string }
  notes: "Source ASCII: `E 0 , filename RF }`."

- id: view_current_background_image
  label: View Current Background Image
  kind: query
  command: "\x1BRF\r"
  params: []
  notes: "Source ASCII: `E RF }`."

# ---------------- Film Mode ----------------
- id: enable_film_mode
  label: Enable Film Mode
  kind: action
  command: "18*{input}*1#"
  params:
    - { name: input, type: integer, description: "Input 1-19" }

- id: disable_film_mode
  label: Disable Film Mode
  kind: action
  command: "18*{input}*0#"
  params:
    - { name: input, type: integer }

- id: view_film_mode
  label: View Film Mode Status
  kind: query
  command: "18*{input}#"
  params:
    - { name: input, type: integer }

# ---------------- Auto Image ----------------
- id: run_auto_image
  label: Run Auto Image
  kind: action
  command: "55*{window}#"
  params:
    - { name: window, type: integer, description: "1-4 (MGP 464); 1-2 (MGP 462xi)" }

# ---------------- Bi-directional Serial Data Port ----------------
- id: send_serial_data_string
  label: Send Serial Data String
  kind: action
  command: "\x1B{port}*{init_timeout}*{char_timeout}*{rxspec}RS\r{data}"
  params:
    - { name: port, type: string, description: "Port 01-99 (01=rear RS-232/422, 02=front Config)" }
    - { name: init_timeout, type: integer, description: "Tens of ms before first response; default 10" }
    - { name: char_timeout, type: integer, description: "Tens of ms between chars; default 20" }
    - { name: rxspec, type: string, description: "#L (length) or #D (delimiter); default 0" }
    - { name: data, type: string, description: "Raw payload to transmit" }
  notes: "Source ASCII: `E X! * X1& * X2) * X2! RS } X@`."

- id: configure_serial_port
  label: Configure Serial Port Parameters
  kind: action
  command: "\x1B{port}*{baud},{parity},{data_bits},{stop_bits}CP\r"
  params:
    - { name: port, type: string }
    - { name: baud, type: integer, description: "2400, 4800, 9600, 19200, 38400, 115200" }
    - { name: parity, type: string, description: "O=Odd, E=Even, N=None, M=Mark, S=Space" }
    - { name: data_bits, type: integer, description: "7 or 8" }
    - { name: stop_bits, type: integer, description: "1 or 2" }
  notes: "Source ASCII: `E X! * X2% , X2^ , X2& , X2* CP }`."

- id: configure_serial_mode
  label: Configure Serial Mode (RS-232 vs RS-422)
  kind: action
  command: "\x1B1*{mode}CY\r"
  params:
    - { name: mode, type: integer, description: "0=RS-232, 1=RS-422" }
  notes: "Only rear panel RS-232/422 port configurable. Source ASCII: `E 1 * X2( CY }`."

- id: view_serial_mode
  label: View Serial Mode
  kind: query
  command: "\x1B{port}CY\r"
  params:
    - { name: port, type: string }
  notes: "Source ASCII: `E X! CY }`."

- id: configure_flow_control
  label: Configure Flow Control
  kind: action
  command: "\x1B{port}*{type},{delay_ms}CF\r"
  params:
    - { name: port, type: string }
    - { name: type, type: string, description: "H=Hardware, S=Software, N=None" }
    - { name: delay_ms, type: integer, description: "Inter-byte delay 0-1 ms" }
  notes: "Source ASCII: `E X! * X3) , X3! CF }`."

- id: view_flow_control
  label: View Flow Control
  kind: query
  command: "\x1B{port}CF\r"
  params:
    - { name: port, type: string }
  notes: "Source ASCII: `E X! CF }`."

- id: configure_receive_timeout
  label: Configure Receive Timeout
  kind: action
  command: "\x1B{port}*{init_timeout}*{char_timeout}*{size}*{rxspec}CE\r"
  params:
    - { name: port, type: string }
    - { name: init_timeout, type: integer }
    - { name: char_timeout, type: integer }
    - { name: size, type: integer }
    - { name: rxspec, type: string }
  notes: "Source ASCII: `E X! * X1& * X2) * X2# * X2! CE }`."

# ---------------- Ethernet Data Port ----------------
- id: set_current_port_timeout
  label: Set Current Connection Port Timeout
  kind: action
  command: "\x1B0*{timeout}TC\r"
  params:
    - { name: timeout, type: integer, description: "Tens of seconds; 1-65000" }
  notes: "Source ASCII: `E 0 * X6( TC }`."

- id: view_current_port_timeout
  label: View Current Connection Port Timeout
  kind: query
  command: "\x1B0TC\r"
  params: []
  notes: "Source ASCII: `E 0TC }`."

- id: set_global_port_timeout
  label: Set Global IP Port Timeout
  kind: action
  command: "\x1B1*{timeout}TC\r"
  params:
    - { name: timeout, type: integer }
  notes: "Source ASCII: `E 1 * X6( TC }`."

- id: view_global_port_timeout
  label: View Global IP Port Timeout
  kind: query
  command: "\x1B1TC\r"
  params: []
  notes: "Source ASCII: `E 1TC }`."

# ---------------- Firmware Version Requests ----------------
- id: query_verbose_version
  label: Query Verbose Version Information
  kind: query
  command: "0Q"
  params: []
  notes: "Returns sum of responses from 2Q, 3Q, 4Q."

- id: query_bootstrap_version
  label: Query Bootstrap Version
  kind: query
  command: "2Q"
  params: []

- id: query_factory_firmware_version
  label: Query Factory Firmware Version
  kind: query
  command: "3Q"
  params: []

- id: query_updated_firmware_version
  label: Query Updated Firmware Version
  kind: query
  command: "4Q"
  params: []

# ---------------- Information Requests (extended) ----------------
- id: request_model_name
  label: Request Model Name
  kind: query
  command: "1I"
  params: []

- id: request_model_description
  label: Request Model Description
  kind: query
  command: "2I"
  params: []

- id: request_system_memory_usage
  label: Request System Memory Usage
  kind: query
  command: "3I"
  params: []

- id: request_user_memory_usage
  label: Request User Memory Usage
  kind: query
  command: "4I"
  params: []

# ---------------- Event Control ----------------
- id: read_event_buffer
  label: Read Event Buffer Memory
  kind: query
  command: "\x1B{event},{buffer},{offset},{size}E\r"
  params:
    - { name: event, type: integer, description: "1-99" }
    - { name: buffer, type: integer, description: "0=receive, 1=user, 2=NVRAM" }
    - { name: offset, type: integer }
    - { name: size, type: string, description: "b=bit, B=byte, S=short, L=long" }
  notes: "Source ASCII: `E X3% , X3^ , X3& , X3* E }`."

- id: write_event_buffer
  label: Write Event Buffer Memory
  kind: action
  command: "\x1B{event},{buffer},{offset},{data},{size}E\r"
  params:
    - { name: event, type: integer }
    - { name: buffer, type: integer }
    - { name: offset, type: integer }
    - { name: data, type: string }
    - { name: size, type: string }
  notes: "Source ASCII: `E X3% , X3^ , X3& , X3( , X3* E }`."

- id: read_string_event_buffer
  label: Read String from Event Buffer
  kind: query
  command: "\x1B{event},{buffer},{offset},{bytes}FE\r"
  params:
    - { name: event, type: integer }
    - { name: buffer, type: integer }
    - { name: offset, type: integer }
    - { name: bytes, type: integer, description: "Number of bytes to read" }
  notes: "Source ASCII: `E X3% , X3^ , X3& , X4$ FE }`."

- id: write_string_event_buffer
  label: Write String to Event Buffer
  kind: action
  command: "\x1B{data},{event},{buffer},{offset}FE\r"
  params:
    - { name: data, type: string }
    - { name: event, type: integer }
    - { name: buffer, type: integer }
    - { name: offset, type: integer }
  notes: "Source ASCII: `E X3( , X3% , X3^ , X3& FE }`."

- id: start_events
  label: Start Events
  kind: action
  command: "\x1B1AE\r"
  params: []
  notes: "Source ASCII: `E 1AE }`."

- id: stop_events
  label: Stop Events
  kind: action
  command: "\x1B0AE\r"
  params: []
  notes: "Source ASCII: `E 0AE }`."

- id: read_events_running
  label: Read Number of Events Running
  kind: query
  command: "\x1BAE\r"
  params: []
  notes: "Source ASCII: `E AE }`."

# ---------------- E-mail ----------------
- id: configure_email_event
  label: Configure E-mail Event
  kind: action
  command: "{event},{address},{file}CR\r"
  params:
    - { name: event, type: integer, description: "1-64" }
    - { name: address, type: string, description: "E-mail recipient" }
    - { name: file, type: string, description: "E-mail file name" }
  notes: "Source ASCII: `X4% , X4^ , X4& CR }`."

- id: view_email_event
  label: View E-mail Event
  kind: query
  command: "{event}CR\r"
  params:
    - { name: event, type: integer }
  notes: "Source ASCII: `X4% CR }`."

- id: send_email_mailbox
  label: Send E-mail from Mailbox
  kind: action
  command: "\x1B{event}SM\r"
  params:
    - { name: event, type: integer }
  notes: "Source ASCII: `E X4% SM }`."

- id: send_email_different_file
  label: Send E-mail with Different File
  kind: action
  command: "\x1B{event},{number},{file}SM\r"
  params:
    - { name: event, type: integer }
    - { name: number, type: integer, description: "Embedded number for .eml E } command" }
    - { name: file, type: string }
  notes: "Source ASCII: `E X4% , X7) , X4& SM }`."

# ---------------- Web Browser Specific ----------------
- id: read_url_response
  label: Read Response from Last URL Command
  kind: query
  command: "\x1BUB\r"
  params: []
  notes: "Web form: `W UB |`."

# ---------------- IP Setup ----------------
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "\x1B{name}CN\r"
  params:
    - { name: name, type: string, description: "Up to 24 alphanumeric chars; first must be letter; no spaces" }
  notes: "Source ASCII: `E X1@ CN }`."

- id: set_unit_name_default
  label: Reset Unit Name to Factory Default
  kind: action
  command: "\x1B CN\r"
  params: []
  notes: "Source ASCII: `E (space) CN }`. Web encoding: `%20`."

- id: read_unit_name
  label: Read Unit Name
  kind: query
  command: "\x1BCN\r"
  params: []
  notes: "Source ASCII: `E CN }`."

- id: set_time_date
  label: Set Time/Date
  kind: action
  command: "\x1B{datetime}CT\r"
  params:
    - { name: datetime, type: string, description: "MM/DD/YY-HH:MM:SS" }
  notes: "Source ASCII: `E X1# CT }`."

- id: read_time_date
  label: Read Time/Date
  kind: query
  command: "\x1BCT\r"
  params: []
  notes: "Source ASCII: `E CT }`."

- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  command: "\x1B{offset}CZ\r"
  params:
    - { name: offset, type: string, description: "± hh:mm relative to GMT (-12:00 to +14:00)" }
  notes: "Source ASCII: `E X# CZ }`."

- id: read_gmt_offset
  label: Read GMT Offset
  kind: query
  command: "\x1BCZ\r"
  params: []
  notes: "Source ASCII: `E CZ }`."

- id: set_daylight_saving_time
  label: Set Daylight Saving Time
  kind: action
  command: "\x1B{mode}CX\r"
  params:
    - { name: mode, type: integer, description: "0=off, 1=northern hemisphere, 2=Europe, 3=Brazil" }
  notes: "Source ASCII: `E X3$ CX }`."

- id: read_daylight_saving_time
  label: Read Daylight Saving Time
  kind: query
  command: "\x1BCX\r"
  params: []
  notes: "Source ASCII: `E CX }`."

- id: enable_dhcp
  label: Enable DHCP
  kind: action
  command: "\x1B1DH\r"
  params: []
  notes: "Source ASCII: `E 1DH }`."

- id: disable_dhcp
  label: Disable DHCP
  kind: action
  command: "\x1B0DH\r"
  params: []
  notes: "Source ASCII: `E 0DH }`."

- id: view_dhcp_mode
  label: View DHCP Mode
  kind: query
  command: "\x1BDH\r"
  params: []
  notes: "Source ASCII: `E DH }`."

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "\x1B{ip}CI\r"
  params:
    - { name: ip, type: string, description: "xxx.xxx.xxx.xxx" }
  notes: "Source ASCII: `E X1$ CI }`."

- id: read_ip_address
  label: Read IP Address
  kind: query
  command: "\x1BCI\r"
  params: []
  notes: "Source ASCII: `E CI }`."

- id: read_mac_address
  label: Read Hardware (MAC) Address
  kind: query
  command: "\x1BCH\r"
  params: []
  notes: "Source ASCII: `E CH }`."

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "\x1B{mask}CS\r"
  params:
    - { name: mask, type: string, description: "xxx.xxx.xxx.xxx" }
  notes: "Source ASCII: `E X1( CS }`."

- id: read_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: "\x1BCS\r"
  params: []
  notes: "Source ASCII: `E CS }`."

- id: set_gateway_address
  label: Set Gateway Address
  kind: action
  command: "\x1B{gateway}CG\r"
  params:
    - { name: gateway, type: string }
  notes: "Source ASCII: `E X1$ CG }`."

- id: read_gateway_address
  label: Read Gateway Address
  kind: query
  command: "\x1BCG\r"
  params: []
  notes: "Source ASCII: `E CG }`."

- id: set_administrator_password
  label: Set Administrator Password
  kind: action
  command: "\x1B{password}CA\r"
  params:
    - { name: password, type: string, description: "4-12 alphanumeric, case sensitive, no special chars" }
  notes: "Source ASCII: `E X3# CA }`."

- id: clear_administrator_password
  label: Clear Administrator Password
  kind: action
  command: "\x1B CA\r"
  params: []
  notes: "Source ASCII: `E (space) CA }`. Clears both admin and user passwords."

- id: view_administrator_password
  label: View Administrator Password
  kind: query
  command: "\x1BCA\r"
  params: []
  notes: "Source ASCII: `E CA }`. IP connection responds with **** if set."

- id: set_user_password
  label: Set User Password
  kind: action
  command: "\x1B{password}CU\r"
  params:
    - { name: password, type: string }
  notes: "Source ASCII: `E X3# CU }`. Requires admin password to exist first."

- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "\x1B CU\r"
  params: []
  notes: "Source ASCII: `E (space) CU }`."

- id: view_user_password
  label: View User Password
  kind: query
  command: "\x1BCU\r"
  params: []
  notes: "Source ASCII: `E CU }`."

- id: view_security_level_support
  label: View Read-Only Security Level Support
  kind: query
  command: "\x1BEP\r"
  params: []
  notes: "Source ASCII: `E EP }`."

- id: query_session_security_level
  label: Query Session Security Level
  kind: query
  command: "\x1BCK\r"
  params: []
  notes: "Source ASCII: `E CK }`."

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "\x1B{mode}CV\r"
  params:
    - { name: mode, type: integer, description: "0=clear, 1=verbose, 2=tagged, 3=both" }
  notes: "Source ASCII: `E X2@ CV }`."

- id: read_verbose_mode
  label: Read Verbose Mode
  kind: query
  command: "\x1BCV\r"
  params: []
  notes: "Source ASCII: `E CV }`."

- id: set_telnet_port_map
  label: Set Telnet Port Map
  kind: action
  command: "\x1B{port}MT\r"
  params:
    - { name: port, type: integer }
  notes: "Source ASCII: `{ port# } MT }`."

- id: reset_telnet_port_map
  label: Reset Telnet Port Map
  kind: action
  command: "\x1B23MT\r"
  params: []
  notes: "Source ASCII: `E 23MT }`."

- id: disable_telnet_port_map
  label: Disable Telnet Port Map
  kind: action
  command: "\x1B0MT\r"
  params: []
  notes: "Source ASCII: `E 0MT }`."

- id: read_telnet_port_map
  label: Read Telnet Port Map
  kind: query
  command: "\x1BMT\r"
  params: []
  notes: "Source ASCII: `E MT }`."

- id: set_web_port_map
  label: Set Web Port Map
  kind: action
  command: "\x1B{port}MH\r"
  params:
    - { name: port, type: integer }
  notes: "Source ASCII: `{ port# } MH }`."

- id: reset_web_port_map
  label: Reset Web Port Map
  kind: action
  command: "\x1B80MH\r"
  params: []
  notes: "Source ASCII: `E 80MH }`."

- id: disable_web_port_map
  label: Disable Web Port Map
  kind: action
  command: "\x1B0MH\r"
  params: []
  notes: "Source ASCII: `E 0MH }`."

- id: read_web_port_map
  label: Read Web Port Map
  kind: query
  command: "\x1BMH\r"
  params: []
  notes: "Source ASCII: `E MH }`."

- id: set_direct_access_port_map
  label: Set Direct Access Port Map
  kind: action
  command: "\x1B{port}MD\r"
  params:
    - { name: port, type: integer }
  notes: "Source ASCII: `{ port# } MD }`."

- id: reset_direct_access_port_map
  label: Reset Direct Access Port Map
  kind: action
  command: "\x1B2001MD\r"
  params: []
  notes: "Source ASCII: `E 2001MD }`."

- id: disable_direct_access_port_map
  label: Disable Direct Access Port Map
  kind: action
  command: "\x1B0MD\r"
  params: []
  notes: "Source ASCII: `E 0MD }`."

- id: read_direct_access_port_map
  label: Read Direct Access Port Map
  kind: query
  command: "\x1BMD\r"
  params: []
  notes: "Source ASCII: `E MD }`."

# ---------------- File Commands ----------------
- id: list_files_current
  label: List Files in Current Directory
  kind: query
  command: "\x1BDF\r"
  params: []
  notes: "Source ASCII: `E DF }`."

- id: list_files_recursive
  label: List Files (Current Directory and Below)
  kind: query
  command: "\x1BLF\r"
  params: []
  notes: "Source ASCII: `E LF }`."

- id: load_file
  label: Load File to User Flash Memory
  kind: action
  command: "\x1B+UF{filesize},{filename}\r{data}"
  params:
    - { name: filesize, type: integer }
    - { name: filename, type: string }
    - { name: data, type: string, description: "Raw unprocessed file data" }
  notes: "Source ASCII: `E + UF filesize , filename } {data}`."

- id: retrieve_file
  label: Retrieve File from User Flash Memory
  kind: query
  command: "\x1B{filename}SF\r"
  params:
    - { name: filename, type: string }
  notes: "Source ASCII: `E filename SF }`. Response includes file size header plus raw data."

# ---------------- Mail Server Setup ----------------
- id: set_mail_server
  label: Set Mail Server IP and Domain
  kind: action
  command: "\x1B{ip},{domain}CM\r"
  params:
    - { name: ip, type: string, description: "Mail server IP" }
    - { name: domain, type: string, description: "Unit domain name" }
  notes: "Source ASCII: `E X1$ , X1% CM }`."

- id: read_mail_server
  label: Read Mail Server IP and Domain
  kind: query
  command: "\x1BCM\r"
  params: []
  notes: "Source ASCII: `E CM }`."

# ---------------- Directory Commands ----------------
- id: change_directory
  label: Change/Create Directory
  kind: action
  command: "\x1B{path}CJ\r"
  params:
    - { name: path, type: string, description: "Full path / directory /" }
  notes: "Source ASCII: `E { path } / { directory } / CJ }`."

- id: root_directory
  label: Move to Root Directory
  kind: action
  command: "\x1B/CJ\r"
  params: []
  notes: "Source ASCII: `E / CJ }`."

- id: up_directory
  label: Move Up One Directory
  kind: action
  command: "\x1B..CJ\r"
  params: []
  notes: "Source ASCII: `E .. CJ }`."

- id: view_current_directory
  label: View Current Directory
  kind: query
  command: "\x1BCJ\r"
  params: []
  notes: "Source ASCII: `E CJ }`."

# ---------------- Reset / Erase Commands ----------------
- id: erase_file
  label: Erase File
  kind: action
  command: "\x1B{filename}EF\r"
  params:
    - { name: filename, type: string }
  notes: "Source ASCII: `E { filename } EF }`."

- id: erase_current_directory
  label: Erase Current Directory and Files
  kind: action
  command: "\x1B/EF\r"
  params: []
  notes: "Source ASCII: `E / EF }`."

- id: erase_directory_recursive
  label: Erase Current Directory and Subdirectories
  kind: action
  command: "\x1B//EF\r"
  params: []
  notes: "Source ASCII: `E // EF }`."

- id: erase_flash_memory
  label: Erase Flash Memory
  kind: action
  command: "\x1BZFFF\r"
  params: []
  notes: "Source ASCII: `E ZFFF }`."

- id: reset_factory_default
  label: Reset All Device Settings to Factory Default
  kind: action
  command: "\x1BZXXX\r"
  params: []
  notes: "Source ASCII: `E ZXXX }`. IP-related settings preserved."

- id: absolute_system_reset
  label: Absolute System Reset
  kind: action
  command: "\x1BZQQQ\r"
  params: []
  notes: "Source ASCII: `E ZQQQ }`. Resets EVERYTHING including IP to 192.168.254.254 and subnet to 255.255.0.0."

- id: absolute_reset_retain_ip
  label: Absolute Reset Retaining IP Settings
  kind: action
  command: "\x1BZY\r"
  params: []
  notes: "Source ASCII: `E ZY }`. Recommended after firmware update. Preserves IP settings."
```

## Feedbacks
```yaml
- id: input_channel_per_window
  type: integer
  description: "Current input channel for a window (1-19)"
  query_action: view_input

- id: video_type_per_input
  type: enum
  values: [RGB, YUV-HD, RGBcvS, YUVi, S-video, Composite, DVI-or-HD-SDI]
  description: "Video format of an input"
  query_action: view_video_type

- id: blanking_state_per_window
  type: enum
  values: [on, off]
  description: "Window mute/blank state (1 = on, 0 = off)"
  query_action: view_blanking_status

- id: freeze_state_per_window
  type: enum
  values: [frozen, not_frozen]
  description: "Window freeze state (1 = frozen, 0 = not frozen)"
  query_action: view_freeze_status

- id: executive_mode
  type: enum
  values: [off, mode_1, mode_2]
  description: "Front panel lock state (0/1/2)"
  query_action: view_executive_mode

- id: window_priority_order
  type: array
  description: "Four window numbers from highest to lowest priority"
  query_action: view_window_priority

- id: film_mode_per_input
  type: enum
  values: [enabled, disabled]
  query_action: view_film_mode

- id: internal_temperature_f
  type: integer
  description: "Internal temperature in degrees Fahrenheit"
  query_action: view_internal_temperature

- id: firmware_version
  type: string
  description: "Two decimal places (e.g. x.xx)"
  query_action: query_firmware_version

- id: part_number
  type: string
  description: "60-771-xx (MGP 464) or 60-1023-xx (MGP 462xi)"
  query_action: query_part_number

- id: model_name
  type: string
  description: "MGP 464, MGP 464 DI, MGP 464 HD-SDI, MGP 462xi, MGP 462xi DI, or MGP 462xi HD-SDI"
  query_action: request_model_name

- id: dhcp_state
  type: enum
  values: [on, off]
  query_action: view_dhcp_mode

- id: ip_address
  type: string
  query_action: read_ip_address

- id: mac_address
  type: string
  query_action: read_mac_address

- id: subnet_mask
  type: string
  query_action: read_subnet_mask

- id: gateway_address
  type: string
  query_action: read_gateway_address

- id: unit_name
  type: string
  query_action: read_unit_name

- id: session_security_level
  type: enum
  values: [anonymous, ext_1, ext_2, ext_3, ext_4, ext_5, ext_6, ext_7, ext_8, ext_9, ext_10, user, administrator]
  query_action: query_session_security_level
```

## Variables
```yaml
# Configuration parameters set via dedicated actions (see Actions section).
# - unit_name (set_unit_name / read_unit_name)
# - ip_address (set_ip_address / read_ip_address)
# - subnet_mask, gateway_address, dhcp_state
# - admin_password, user_password
# - time_date, gmt_offset, daylight_saving_time
# - verbose_mode, mail_server, telnet/web/direct port maps
# - serial port baud/parity/data/stop bits, flow control, mode (RS-232 vs RS-422)
# - global and per-connection IP port timeouts
```

## Events
```yaml
- id: power_up_datetime
  description: "Date and time emitted at power-up when connected via Internet"
  format: "Www, DD Mmm yyyy hh:mm:ss"

- id: reconfig_notice
  description: "Sent as each of the four windows is configured at startup"
  format: "Reconfig"

- id: input_switched
  description: "Sent when an input is switched"
  format: "Out_n_ In_nn_"
  fields:
    - { name: window, description: "n = window number" }
    - { name: input, description: "nn = input number" }
```

## Macros
```yaml
# UNRESOLVED: no documented multi-step sequences in source
```

## Safety
```yaml
confirmation_required_for:
  - absolute_system_reset            # E ZQQQ } - wipes IP, subnet, all settings
  - absolute_reset_retain_ip         # E ZY }   - wipes everything except IP block
  - reset_factory_default            # E ZXXX } - all device settings to defaults
  - erase_flash_memory               # E ZFFF }
  - erase_current_directory          # E / EF }
  - erase_directory_recursive        # E // EF }
  - erase_file                       # E filename EF }
  - clear_administrator_password     # also clears user password
  - enable_executive_mode_2          # locks all front panel control
interlocks: []
# UNRESOLVED: source documents no power-sequencing or hardware interlock procedures
```

## Notes
- Symbol legend from source (preserve when building literal frames):
  - `]` = CR + LF (hex 0D 0A); marks end of every response.
  - `}` = CR only (hex 0D) on RS-232/Telnet; replaced by `|` (pipe) for Web (HTTP) commands.
  - `E` = Escape (hex 1B) prefix for many commands; replaced by `W` for Web commands.
  - Spaces in Web URLs encode as `%2B` (per source — note unusual mapping); plus encodes as `%2B` too.
- Error response codes appear inline in responses:
  - E01 invalid input channel, E09 invalid function, E10 invalid command, E11 invalid preset, E12 invalid output/window, E13 value out of range, E14 invalid for this configuration, E17 invalid command for signal type, E24 privilege violation, E26 too many users, E27 invalid event number, E28 bad filename / file not found.
- Default IP 192.168.254.254 / subnet 255.255.0.0 / DHCP off.
- Telnet port 23; HTTP port 80; both remappable via MT / MH commands (and a Direct Access port via MD, default 2001).
- Default RS-232 config: 9600 baud, 8 data bits, 1 stop bit, no parity, no flow control. Range 2400-115200 baud; data bits 7 or 8; stop bits 1 or 2; parity O/E/N/M/S; flow H/S/N.
- Window selector `X50@`: 0 = all windows (allowed only for input selection, Freeze, and window muting); 1-4 = specific window (MGP 462xi only supports windows 1-2; MGP 464 supports 1-4).
- Input selector `X50)`: 1-19.
- Test patterns 10 (Quad Split) and 11 (Pip Images) are not available on MGP 462xi models per source.
- Two RS-232 channels exist: rear 9-pin D (port `01`, also configurable as RS-422) and front Config 2.5 mm TRS (port `02`, RS-232 only).
- Verbose mode default differs by transport: 0 for Telnet, 1 for RS-232/422 connections.
- Send-data-string (`RS`) command on bi-directional port allows the MGP to act as a serial relay for downstream devices.

<!-- UNRESOLVED: power supply voltage, current, total power, operating temperature range, weight, dimensions, and EMI/safety certifications not extracted into refined doc -->
<!-- UNRESOLVED: response timing budgets (per-command latency) not stated -->
<!-- UNRESOLVED: maximum simultaneous Telnet sessions and connection rate limits not stated (error E26 implies a cap but value not given) -->
<!-- UNRESOLVED: complete X1@/X1$/X1*/X1(/X1#/X#/X4!/X4(/X5#/X5@/X6^/X6*/X6( variable formats partially defined; some referenced placeholders (X3%, X3^, X3&, X3*, X3(, X4$, X4%, X4^, X4&, X7), X5$, X\) lacked full value tables in the refined excerpt -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/MGP_Series_UserManual_68-1235-01_D.pdf
  - https://www.extron.com/download/files/userman/68-2469-01_C_MGP_Pro_UG.pdf
retrieved_at: 2026-05-14T16:30:35.586Z
last_checked_at: 2026-06-02T21:41:42.745Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:42.745Z
matched_actions: 245
action_count: 245
confidence: medium
summary: "All 245 spec actions have verbatim wire-literal matches in the source command table; transport values confirmed; source catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "no documented multi-step sequences in source"
- "source documents no power-sequencing or hardware interlock procedures"
- "power supply voltage, current, total power, operating temperature range, weight, dimensions, and EMI/safety certifications not extracted into refined doc"
- "response timing budgets (per-command latency) not stated"
- "maximum simultaneous Telnet sessions and connection rate limits not stated (error E26 implies a cap but value not given)"
- "complete X1@/X1$/X1*/X1(/X1#/X#/X4!/X4(/X5#/X5@/X6^/X6*/X6( variable formats partially defined; some referenced placeholders (X3%, X3^, X3&, X3*, X3(, X4$, X4%, X4^, X4&, X7), X5$, X\\) lacked full value tables in the refined excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
