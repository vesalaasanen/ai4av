---
spec_id: admin/optoma-4k550-dahkuuz-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 4K550 DAHKUUZ Series Control Spec"
manufacturer: Optoma
model_family: "Optoma 4K550 DAHKUUZ Series"
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - "Optoma 4K550 DAHKUUZ Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - audiogeneral.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/0c4163dd-1197-4d40-abdf-16cbf8bb5ecd.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.audiogeneral.com/Optoma/w501_rs232.pdf
retrieved_at: 2026-06-17T20:27:37.044Z
last_checked_at: 2026-06-17T20:38:40.679Z
generated_at: 2026-06-17T20:38:40.679Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "~XX509"
  - "source is a cross-model generic RS232 table, not 4K550-specific; some enumerated source rows omit their hex payload and are marked below. Firmware version compatibility, voltage/power specs, and any 4K550-exclusive behaviour are not stated."
  - "full response payload schemas for ranged queries (brightness/contrast/etc.)"
  - "persistence/non-volatile behaviour of each setting not stated in source."
  - "no explicit multi-step sequences described in source."
  - "source is Optoma's generic cross-model RS232 table; no 4K550-specific document was located (EOL product). Firmware version compatibility ranges, electrical/power specifications, and any model-exclusive commands are not stated. Exact numeric response widths and string-termination rules for read replies are not fully specified. Baud/parity are stated (9600 8N1); no IP/TCP port applies (serial-only as documented)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:38:40.679Z
  matched_actions: 286
  action_count: 286
  confidence: medium
  summary: "All 286 spec opcodes confirmed verbatim in source; transport (9600 8N1) confirmed; only extra is ~XX509 Darbee Reset (1 command, below short threshold). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Optoma 4K550 DAHKUUZ Series Control Spec

## Summary
Optoma 4K550 DAHKUUZ Series DLP projector controlled via RS-232 serial. This spec is derived from Optoma's generic "RS232 Protocol Function List", which is shared across Optoma projector generations rather than being 4K550-specific. Commands are ASCII strings of the form `~<ID><CMD> <value><CR>` where `<ID>` is a 2-digit projector ID (default 00), `<CMD>` is a 2–3 digit command code, and every command is terminated with `<CR>` (0x0D). The device replies `P` (pass) or `F` (fail) to writes, and `Ok<n>` to read queries.

<!-- UNRESOLVED: source is a cross-model generic RS232 table, not 4K550-specific; some enumerated source rows omit their hex payload and are marked below. Firmware version compatibility, voltage/power specs, and any 4K550-exclusive behaviour are not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "UART16550 FIFO Disable"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: ~XX00 power on/off commands
- queryable  # inferred: ~XX1nn read/query commands returning values
- levelable  # inferred: brightness/contrast/volume ranged setters
- routable   # inferred: ~XX12 input source selection
```

## Actions
```yaml
# Command convention (from source):
#   ~<ID><CMD> <value><CR>    ASCII, <CR> = 0x0D
#   <ID> = 2-digit projector ID, default 00 (source writes it as "XX")
#   Write response: "P" (pass) / "F" (fail)
#   Read  response: "Ok<value>"
# Each entry below = one unique ~XX opcode. Enum/range values are parameterized.
# "command" holds the payload verbatim as the source documents it.

# --- Power / AV / Source (top-level) ---
- id: set_power
  label: Power On/Off
  kind: action
  command: "~XX00 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=Power Off, 1=Power On"
- id: set_power_with_password
  label: Power On With Password
  kind: action
  command: "~XX00 1~{nnnn}<CR>"
  params:
    - name: nnnn
      type: integer
      description: "4-digit password 0000~9999"
- id: resync
  label: Re-Sync
  kind: action
  command: "~XX01 1<CR>"
  params: []
- id: set_av_mute
  label: AV Mute
  kind: action
  command: "~XX02 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
- id: set_audio_mute_quick
  label: Mute (quick)
  kind: action
  command: "~XX03 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
- id: set_freeze
  label: Freeze
  kind: action
  command: "~XX04 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0=Unfreeze, 1=Freeze"
- id: zoom_plus_step
  label: Zoom Plus (step)
  kind: action
  command: "~XX05 1<CR>"
  params: []
- id: zoom_minus_step
  label: Zoom Minus (step)
  kind: action
  command: "~XX06 1<CR>"
  params: []
- id: set_input_source
  label: Input Source Select
  kind: action
  command: "~XX12 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=HDMI1/MHL, 2=DVI-D, 3=DVI-A, 4=BNC, 5=VGA/VGA1, 6=VGA2, 9=S-Video, 10=Video, 11=Wireless, 14=Component, 15=HDMI2/HDMI2-MHL, 16=HDMI3, 17=Flash Drive, 18=Network Display, 19=USB Display, 20=DisplayPort, 21=HDBaseT, 22=3G-SDI, 23=Multimedia, 24=Smart TV"
- id: set_remote_simulation
  label: Remote Control Simulation
  kind: action
  command: "~XX140 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "Button code 1~82 (1=Power,2=Power Off,3-7=Mouse Up/Left/Enter/Right/Down,8=Left Click,9=Right Click,10-14=Up/Left/Enter/Right/Down,15-16=V Keystone +/-,17-18=Volume +/-,19=Brightness,20=Menu,21=Zoom,22=DVI-D,23=VGA-1,24=AV Mute,25=S-Video,26=VGA-2,27=Video,28=Contrast,30=Freeze,31=Lens shift,32-33=Zoom +/-,34-35=Focus +/-,36=Mode,37=Aspect,38-39=12V trigger On/Off,40=Info,41=Re-sync,42-43=HDMI 1/2,44=BNC,45=Component,47=Source,51-60=Digits 1-0,61=Gamma,63=PIP,64-67=Lens H/V L/R,68-69=H Keystone +/-,70-72=HotKey F1/F2/F3,73=Pattern,74=Exit,75=HDMI3,76=DisplayPort,77=Mute,78=3D,79=DB,80=SleepTimer,81=Home,82=Return)"

# --- Display Mode ---
- id: set_display_mode
  label: Display Mode
  kind: action
  command: "~XX20 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=Presentation,2=Bright,3=Cinema,4=sRGB/Reference,5=User,6=User(3D),9=3D,10=DICOM SIM.,11=Film,12=Game,13=Cinema,14=Vivid,14=ISF Day,15=ISF Night,16=HDR,17=ISF 3D,18=2D High Speed,19=Blending,20=Sport,21=HDR"

# --- Image Settings (ranged) ---
- id: set_brightness
  label: Brightness
  kind: action
  command: "~XX21 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "-50 ~ 50"
- id: brightness_step
  label: Brightness +/- (step)
  kind: action
  command: "~XX46 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=-, 2=+"
- id: set_contrast
  label: Contrast
  kind: action
  command: "~XX22 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "-50 ~ 50"
- id: contrast_step
  label: Contrast +/- (step)
  kind: action
  command: "~XX47 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=-, 2=+"
- id: set_sharpness
  label: Sharpness
  kind: action
  command: "~XX23 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1 ~ 15"
- id: set_color_level
  label: Color
  kind: action
  command: "~XX45 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "-50 ~ 50"
- id: set_tint
  label: Tint
  kind: action
  command: "~XX44 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "-50 ~ 50"
- id: set_brilliantcolor_level
  label: BrilliantColor Level
  kind: action
  command: "~XX34 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1 ~ 10"

# --- RGB Gain/Bias ---
- id: set_red_gain
  label: Red Gain
  kind: action
  command: "~XX24 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_green_gain
  label: Green Gain
  kind: action
  command: "~XX25 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_blue_gain
  label: Blue Gain
  kind: action
  command: "~XX26 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_red_bias
  label: Red Bias
  kind: action
  command: "~XX27 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_green_bias
  label: Green Bias
  kind: action
  command: "~XX28 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_blue_bias
  label: Blue Bias
  kind: action
  command: "~XX29 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: rgb_gain_bias_reset
  label: RGB Gain/Bias Reset
  kind: action
  command: "~XX517 1<CR>"
  params: []

# --- Gamma ---
- id: set_gamma
  label: Gamma Mode
  kind: action
  command: "~XX35 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=Film,2=Video,3=Graphics,4=Standard(2.2),5=1.8,6=2.0,8=2.6,9=3D,10=Blackboard,11=DICOM SIM.,12=Bright/2.4,13=CRT,14=User"
- id: set_gamma_curve_type
  label: Gamma Curve Type
  kind: action
  command: "~XX532 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=Film,2=Video,3=Standard(2.2),4=Graphic,5=1.8,6=2,7=2.4,8=2.6"
- id: set_gamma_film_curvetype
  label: Gamma Film CurveType
  kind: action
  command: "~XX182 {value}<CR>"
  params: [{name: value, type: integer, description: "0=CurveType"}]
- id: set_gamma_film_offset
  label: Gamma Film Offset
  kind: action
  command: "~XX183 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 5"}]
- id: set_gamma_video_curvetype
  label: Gamma Video CurveType
  kind: action
  command: "~XX184 {value}<CR>"
  params: [{name: value, type: integer, description: "1=CurveType"}]
- id: set_gamma_video_offset
  label: Gamma Video Offset
  kind: action
  command: "~XX185 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 5"}]
- id: set_gamma_graphics_curvetype
  label: Gamma Graphics CurveType
  kind: action
  command: "~XX186 {value}<CR>"
  params: [{name: value, type: integer, description: "1=CurveType"}]
- id: set_gamma_graphics_offset
  label: Gamma Graphics Offset
  kind: action
  command: "~XX187 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 5"}]
- id: set_gamma_pc_curvetype
  label: Gamma PC(Standard) CurveType
  kind: action
  command: "~XX188 {value}<CR>"
  params: [{name: value, type: integer, description: "1=CurveType"}]
- id: set_gamma_standard_offset
  label: Gamma Standard Offset
  kind: action
  command: "~XX189 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 5"}]
- id: set_gamma_18_offset
  label: Gamma 1.8 Offset
  kind: action
  command: "~XX533 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 5"}]
- id: set_gamma_20_offset
  label: Gamma 2.0 Offset
  kind: action
  command: "~XX534 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 5"}]
- id: set_gamma_24_offset
  label: Gamma 2.4 Offset
  kind: action
  command: "~XX535 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 5"}]
- id: set_gamma_26_offset
  label: Gamma Offset (general)
  kind: action
  command: "~XX536 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 5"}]
- id: gamma_film_reset
  label: Gamma Film Reset
  kind: action
  command: "~XX206 0<CR>"
  params: []
- id: gamma_video_reset
  label: Gamma Video Reset
  kind: action
  command: "~XX207 1<CR>"
  params: []
- id: gamma_graphics_reset
  label: Gamma Graphics Reset
  kind: action
  command: "~XX208 1<CR>"
  params: []
- id: gamma_pc_reset
  label: Gamma PC Reset
  kind: action
  command: "~XX209 1<CR>"
  params: []

# --- Color Temperature / Space / Gamut ---
- id: set_color_temperature
  label: Color Temperature
  kind: action
  command: "~XX36 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=Standard/D65,2=Cool/D75,3=Cold/D83,4=Warm/D55,5=Native(Bright),6=D93"
- id: color_temperature_reset
  label: Color Temperature Reset
  kind: action
  command: "~XX33 1<CR>"
  params: []
- id: set_color_space
  label: Color Space
  kind: action
  command: "~XX37 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=Auto,2=RGB/RGB(0~255),3=YUV,4=RGB(16~235),5=Rec.709,6=Rec.601"
- id: set_color_gamut
  label: Color Gamut
  kind: action
  command: "~XX211 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=Native,2=DLP-C,3=HDTV,4=EBU,5=SMPTE-C,6=ADOBE,7=REC2020,8=Presentation,9=Cinema,10=Game"
- id: set_rgb_channel
  label: RGB Channel
  kind: action
  command: "~XX508 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1=Normal,2=Red,3=Green,4=Blue"

# --- Color Matching (per-channel Hue/Saturation/Gain) ---
- id: set_cm_r_hue
  label: Color Matching (R) Hue
  kind: action
  command: "~XX327 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_g_hue
  label: Color Matching (G) Hue
  kind: action
  command: "~XX328 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_b_hue
  label: Color Matching (B) Hue
  kind: action
  command: "~XX329 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_c_hue
  label: Color Matching (C) Hue
  kind: action
  command: "~XX330 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_y_hue
  label: Color Matching (Y) Hue
  kind: action
  command: "~XX331 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_m_hue
  label: Color Matching (M) Hue
  kind: action
  command: "~XX332 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_r_saturation
  label: Color Matching (R) Saturation
  kind: action
  command: "~XX333 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_g_saturation
  label: Color Matching (G) Saturation
  kind: action
  command: "~XX334 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_b_saturation
  label: Color Matching (B) Saturation
  kind: action
  command: "~XX335 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_c_saturation
  label: Color Matching (C) Saturation
  kind: action
  command: "~XX336 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_y_saturation
  label: Color Matching (Y) Saturation
  kind: action
  command: "~XX337 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_m_saturation
  label: Color Matching (M) Saturation
  kind: action
  command: "~XX338 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_r_gain
  label: Color Matching (R) Gain
  kind: action
  command: "~XX339 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_g_gain
  label: Color Matching (G) Gain
  kind: action
  command: "~XX340 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_b_gain
  label: Color Matching (B) Gain
  kind: action
  command: "~XX341 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_c_gain
  label: Color Matching (C) Gain
  kind: action
  command: "~XX342 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_y_gain
  label: Color Matching (Y) Gain
  kind: action
  command: "~XX343 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_m_gain
  label: Color Matching (M) Gain
  kind: action
  command: "~XX344 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_w_red
  label: Color Matching (W) Red
  kind: action
  command: "~XX345 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_w_green
  label: Color Matching (W) Green
  kind: action
  command: "~XX346 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cm_w_blue
  label: Color Matching (W) Blue
  kind: action
  command: "~XX347 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  command: "~XX215 1<CR>"
  params: []
- id: set_color_matching_enable
  label: Color Matching Enable
  kind: action
  command: "~XX410 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Disable, 1=Enable"}]
- id: set_auto_test_pattern
  label: Auto Test Pattern
  kind: action
  command: "~XX411 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]

# --- Color Matching matrix (color parts 0~1000) ---
- id: set_cm_red_of_red
  label: Red Part of Red
  kind: action
  command: "~XX412 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000 (source labels -50~50 in hex column)"}]
- id: set_cm_green_of_red
  label: Green Part of Red
  kind: action
  command: "~XX413 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_blue_of_red
  label: Blue Part of Red
  kind: action
  command: "~XX414 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_green_of_green
  label: Green Part of Green
  kind: action
  command: "~XX415 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_red_of_green
  label: Red Part of Green
  kind: action
  command: "~XX416 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_blue_of_green
  label: Blue Part of Green
  kind: action
  command: "~XX417 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_blue_of_blue
  label: Blue Part of Blue
  kind: action
  command: "~XX418 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_red_of_blue
  label: Red Part of Blue
  kind: action
  command: "~XX419 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_green_of_blue
  label: Green Part of Blue
  kind: action
  command: "~XX420 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_red_of_white
  label: Red Part of White
  kind: action
  command: "~XX421 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_green_of_white
  label: Green Part of White
  kind: action
  command: "~XX422 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]
- id: set_cm_blue_of_white
  label: Blue Part of White
  kind: action
  command: "~XX423 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 1000"}]

# --- CMS x/y/Brightness (color select + offset) ---
- id: set_cms_color_select
  label: CMS Color Select
  kind: action
  command: "~XX212 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Red,2=Green,3=Blue,4=Cyan,5=Yellow,6=Magenta,7=White"}]
- id: set_cms_x_offset
  label: CMS x Offset
  kind: action
  command: "~XX213 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cms_y_offset
  label: CMS y Offset
  kind: action
  command: "~XX214 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]
- id: set_cms_brightness
  label: CMS Brightness
  kind: action
  command: "~XX217 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50"}]

# --- Signal ---
- id: set_signal_auto
  label: Signal Automatic
  kind: action
  command: "~XX91 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_frequency
  label: Frequency
  kind: action
  command: "~XX73 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50 (depends on signal)"}]
- id: set_phase
  label: Phase
  kind: action
  command: "~XX74 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 31 (depends on signal)"}]
- id: set_h_position
  label: H Position
  kind: action
  command: "~XX75 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50 (depends on signal)"}]
- id: set_v_position
  label: V Position
  kind: action
  command: "~XX76 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50 (depends on signal)"}]
- id: set_white_level
  label: White Level
  kind: action
  command: "~XX200 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50 (depends on signal)"}]
- id: set_black_level
  label: Black Level
  kind: action
  command: "~XX201 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50 (depends on signal)"}]
- id: set_saturation
  label: Saturation
  kind: action
  command: "~XX202 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50 (depends on signal)"}]
- id: set_hue
  label: Hue
  kind: action
  command: "~XX203 {value}<CR>"
  params: [{name: value, type: integer, description: "-50 ~ 50 (depends on signal)"}]
- id: set_ire
  label: IRE
  kind: action
  command: "~XX204 {value}<CR>"
  params: [{name: value, type: integer, description: "0=7.5, 1=0"}]

# --- Brightness mode / PureEngine / Darbee ---
- id: set_brightness_mode
  label: Brightness Mode
  kind: action
  command: "~XX110 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Bright,2=Eco,3=Eco+,4=Dynamic,5=Power,6=Constant Power,7=Constant Luminance"}]
- id: set_brightness_power_pct
  label: Brightness Mode Power %
  kind: action
  command: "~XX326 {value}<CR>"
  params: [{name: value, type: integer, description: "0=100%,1=95%,2=90%,3=85%,4=80%,5=75%,6=70%,7=65%,8=60%,9=55%,10=50%"}]
- id: set_dynamicblack
  label: DynamicBlack
  kind: action
  command: "~XX191 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=1,2=2,3=3"}]
- id: set_ultradetail
  label: PureEngine UltraDetail
  kind: action
  command: "~XX41 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=On,2=HD+,3=User,4=1,5=2,6=3"}]
- id: set_ultradetail_user
  label: PureEngine UltraDetail User
  kind: action
  command: "~XX431 {value}<CR>"
  params: [{name: value, type: integer, description: "0=0%..15=150%"}]
- id: set_purecolor
  label: PureColor
  kind: action
  command: "~XX42 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=1,2=2,3=3,4=4,5=5"}]
- id: set_puremotion
  label: PureMotion
  kind: action
  command: "~XX190 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=1,2=2,3=3"}]
- id: set_puremotion_demo
  label: PureMotion Demo
  kind: action
  command: "~XX197 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=H Split,2=V Split"}]
- id: set_brilliantcolor_look
  label: BrilliantColor Look
  kind: action
  command: "~XX560 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Normal Look,1=Bright Look"}]
- id: set_image_ai
  label: Image AI
  kind: action
  command: "~XX194 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=On"}]
- id: set_noise_reduction
  label: Noise Reduction
  kind: action
  command: "~XX196 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 10"}]
- id: set_superwide
  label: SuperWide
  kind: action
  command: "~XX199 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=On(16:9),2=On(2.35:1),3=Auto"}]
- id: set_lens_iris
  label: Lens Iris
  kind: action
  command: "~XX216 {value}<CR>"
  params: [{name: value, type: integer, description: "1 ~ 12"}]
- id: set_constant_luminance
  label: Constant Luminance Settings
  kind: action
  command: "~XX522 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 10"}]

# --- Aspect / Zoom / Position / Geometry ---
- id: set_aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "~XX60 {value}<CR>"
  params: [{name: value, type: integer, description: "1=4:3,2=16:9,3=16:10,5=LBX,6=Native,7=Auto,8=Auto235,9=Superwide,11=Auto235_Subtitle,12=Auto 3D"}]
- id: set_edge_mask
  label: Edge Mask
  kind: action
  command: "~XX61 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 10"}]
- id: set_zoom
  label: Zoom
  kind: action
  command: "~XX62 {value}<CR>"
  params: [{name: value, type: integer, description: "-5 ~ 25"}]
- id: set_digital_zoom_h
  label: Digital Zoom H
  kind: action
  command: "~XX504 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 100"}]
- id: set_digital_zoom_v
  label: Digital Zoom V
  kind: action
  command: "~XX505 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 100"}]
- id: image_shift_h_step
  label: Image Shift H +/-
  kind: action
  command: "~XX540 {value}<CR>"
  params: [{name: value, type: integer, description: "1=H-, 2=H+"}]
- id: image_shift_v_step
  label: Image Shift V +/-
  kind: action
  command: "~XX541 {value}<CR>"
  params: [{name: value, type: integer, description: "1=V-, 2=V+"}]
- id: set_image_shift_h
  label: Image Shift H
  kind: action
  command: "~XX63 {value}<CR>"
  params: [{name: value, type: integer, description: "-100 ~ 100 (depends on model)"}]
- id: set_image_shift_v
  label: Image Shift V
  kind: action
  command: "~XX64 {value}<CR>"
  params: [{name: value, type: integer, description: "-100 ~ 100 (depends on model)"}]
- id: set_h_keystone
  label: H Keystone
  kind: action
  command: "~XX65 {value}<CR>"
  params: [{name: value, type: integer, description: "-40 ~ 40"}]
- id: set_v_keystone
  label: V Keystone
  kind: action
  command: "~XX66 {value}<CR>"
  params: [{name: value, type: integer, description: "-40 ~ 40"}]
- id: set_h_arc
  label: H Arc
  kind: action
  command: "~XX300 {value}<CR>"
  params: [{name: value, type: integer, description: "-10 ~ 10"}]
- id: set_v_arc
  label: V Arc
  kind: action
  command: "~XX301 {value}<CR>"
  params: [{name: value, type: integer, description: "-10 ~ 10"}]
- id: set_auto_keystone
  label: Auto Keystone
  kind: action
  command: "~XX69 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_four_corner
  label: Four Corners Position
  kind: action
  command: "~XX58 {value}<CR>"
  params: [{name: value, type: integer, description: "1=TL-H,2=TL-V,3=TR-H,4=TR-V,5=BL-H,6=BL-V,7=BR-H,8=BR-V (each 0~120 / 0~80)"}]
- id: four_corner_adjust
  label: Four Corners Adjust
  kind: action
  command: "~XX59 {value}<CR>"
  params: [{name: value, type: integer, description: "1-16 = per-corner right/left/up/down +1"}]
- id: four_corners_reset
  label: Four Corners Reset
  kind: action
  command: "~XX516 1<CR>"
  params: []
- id: geometric_correction_reset
  label: Geometric Correction Reset
  kind: action
  command: "~XX561 1<CR>"
  params: []
- id: set_overscan
  label: Overscan
  kind: action
  command: "~XX548 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=Zoom,2=Crop"}]
- id: set_pc_mode
  label: PC Mode (Geometric warping via PC APP)
  kind: action
  command: "~XX549 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]

# --- 3D ---
- id: set_3d_mode
  label: 3D Mode
  kind: action
  command: "~XX230 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=DLP-Link,3=IR/VESA"}]
- id: set_3d_2d
  label: 3D-2D
  kind: action
  command: "~XX400 {value}<CR>"
  params: [{name: value, type: integer, description: "0=3D,1=L,2=R"}]
- id: set_3d_format
  label: 3D Format
  kind: action
  command: "~XX405 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Auto,1=SBS,2=Top and Bottom,3=Frame Sequential,7=Frame Packing,8=Off"}]
- id: set_3d_sync_invert
  label: 3D Sync Invert
  kind: action
  command: "~XX231 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_2d_3d
  label: 2D-3D
  kind: action
  command: "~XX402 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=1,2=2,3=3"}]

# --- PIP / PBP ---
- id: set_pip_screen
  label: PIP-PBP Screen
  kind: action
  command: "~XX302 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=PIP,2=PBP"}]
- id: set_pip_location
  label: PIP-PBP Location
  kind: action
  command: "~XX303 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Top Left,2=Top Right,3=Bottom Left,4=Bottom Right,5=PBP Main Left,6=PBP Main Top,7=PBP Main Right,8=PBP Main Bottom"}]
- id: set_pip_size
  label: PIP-PBP Size
  kind: action
  command: "~XX304 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Large,2=Medium,3=Small"}]
- id: set_pip_sub_source
  label: PIP Sub Source
  kind: action
  command: "~XX305 {value}<CR>"
  params: [{name: value, type: integer, description: "1=HDMI1,2=VGA1,3=Component,4=HDMI2,5=VGA2,6=BNC,7=S-Video,8=Video,9=DVI-D,10=HDBaseT,11=3G-SDI,12=Network Display,13=HDMI3,14=Wireless,15=Flash Drive,16=USB Display,17=DisplayPort"}]
- id: pip_swap
  label: PIP Swap
  kind: action
  command: "~XX306 1<CR>"
  params: []
- id: set_point_blank
  label: Point Blank / Interactive
  kind: action
  command: "~XX312 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]

# --- Audio ---
- id: set_internal_speaker
  label: Internal Speaker
  kind: action
  command: "~XX310 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_audio_mute
  label: Audio Mute
  kind: action
  command: "~XX80 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_mic
  label: Mic
  kind: action
  command: "~XX562 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_volume
  label: Volume
  kind: action
  command: "~XX81 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 10"}]
- id: set_mic_volume
  label: Mic Volume
  kind: action
  command: "~XX93 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 10"}]
- id: set_audio_input
  label: Audio Input
  kind: action
  command: "~XX89 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Default,1=Audio 1(Mini-jack),2=RCA,3=Audio 2,4=Audio 3,5=Audio 4,6=HDMI 1,7=HDMI 2,8=Audio 5/DisplayPort,9=DisplayPort"}]
- id: set_audio_out_standby
  label: Audio Out (Standby)
  kind: action
  command: "~XX510 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_srs
  label: SRS
  kind: action
  command: "~XX94 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_treble
  label: Treble
  kind: action
  command: "~XX95 {value}<CR>"
  params: [{name: value, type: integer, description: "-10 ~ 10"}]
- id: set_bass
  label: Bass
  kind: action
  command: "~XX96 {value}<CR>"
  params: [{name: value, type: integer, description: "-10 ~ 10"}]

# --- Projection / Display orientation ---
- id: set_projection
  label: Projection
  kind: action
  command: "~XX71 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Front,2=Rear,3=Ceiling-top,4=Rear-top"}]
- id: set_ceiling_mount
  label: Ceiling Mount
  kind: action
  command: "~XX523 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Off,2=On,3=Auto"}]
- id: set_rear_projection
  label: Rear Projection
  kind: action
  command: "~XX524 {value}<CR>"
  params: [{name: value, type: integer, description: "4=Off, 4=On"}]
- id: set_screen_type
  label: Screen Type
  kind: action
  command: "~XX90 {value}<CR>"
  params: [{name: value, type: integer, description: "0=16:9, 1=16:10"}]

# --- Lamp ---
- id: set_lamp_mode
  label: Lamp Mode
  kind: action
  command: "~XX92 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Dual,2=Relay,3=Lamp1,4=Lamp2"}]
- id: set_lamp_reminder
  label: Lamp Reminder
  kind: action
  command: "~XX109 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: lamp_reset
  label: Lamp Reset
  kind: action
  command: "~XX111 {value}<CR>"
  params: [{name: value, type: integer, description: "1=LampReset,2=Lamp1 Reset,3=Reset Lamp1 and Lamp2"}]
- id: lamp2_reset
  label: Lamp2 Reset
  kind: action
  command: "~XX116 1<CR>"
  params: []
- id: set_auto_switch_lamp
  label: Auto Switch (Lamp)
  kind: action
  command: "~XX550 {value}<CR>"
  params: [{name: value, type: integer, description: "0=On Failure Only,1=At Power-Up,2=After X Hours"}]
- id: set_auto_switch_time
  label: Auto Switch Time
  kind: action
  command: "~XX551 {value}<CR>"
  params: [{name: value, type: integer, description: "5 ~ 3000"}]
- id: light_sensor_calibration
  label: Light Sensor Calibration
  kind: action
  command: "~XX552 1<CR>"
  params: []

# --- Filter ---
- id: set_optional_filter
  label: Optional Filter Installed
  kind: action
  command: "~XX320 {value}<CR>"
  params: [{name: value, type: integer, description: "0=No, 1=Yes"}]
- id: set_filter_reminder
  label: Filter Reminder
  kind: action
  command: "~XX322 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=300hr,2=500hr,3=800hr,4=1000hr"}]
- id: filter_reset
  label: Filter Reset
  kind: action
  command: "~XX323 1<CR>"
  params: []

# --- Lens ---
- id: set_lens_function_setup
  label: Lens Function (Setup)
  kind: action
  command: "~XX349 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Lock, 2=Unlock"}]
- id: set_lens_shift
  label: Lens Shift
  kind: action
  command: "~XX84 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Lock,2=Unlock,3=Up,4=Down,5=Left,6=Right"}]
- id: lens_calibration
  label: Lens Calibration
  kind: action
  command: "~XX525 1<CR>"
  params: []
- id: set_lens_function
  label: Lens Function
  kind: action
  command: "~XX85 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Lens Lock,2=Unlock,3=Zoom Lock,4=Zoom Unlock,5=Focus Lock,6=Focus Unlock"}]
- id: lens_zoom_step
  label: Lens Zoom +/-
  kind: action
  command: "~XX307 {value}<CR>"
  params: [{name: value, type: integer, description: "1=+, 2=-"}]
- id: lens_focus_step
  label: Lens Focus +/-
  kind: action
  command: "~XX308 {value}<CR>"
  params: [{name: value, type: integer, description: "1=+, 2=-"}]
- id: set_shutter
  label: Shutter
  kind: action
  command: "~XX325 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: lens_memory_apply
  label: Lens Memory Apply Position
  kind: action
  command: "~XX359 {value}<CR>"
  params: [{name: value, type: integer, description: "1 ~ 10"}]
- id: lens_memory_save
  label: Lens Memory Save Position
  kind: action
  command: "~XX360 {value}<CR>"
  params: [{name: value, type: integer, description: "1 ~ 10"}]

# --- Power Settings ---
- id: set_direct_power_on
  label: Direct Power On
  kind: action
  command: "~XX105 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_signal_power_on
  label: Signal Power On
  kind: action
  command: "~XX113 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_auto_power_off
  label: Auto Power Off (min)
  kind: action
  command: "~XX106 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 180 (5 min increments)"}]
- id: set_sleep_timer
  label: Sleep Timer (min)
  kind: action
  command: "~XX107 {value}<CR>"
  params: [{name: value, type: integer, description: "000 ~ 990 (30 min increments)"}]
- id: set_sleep_always_on
  label: Sleep Timer Always On
  kind: action
  command: "~XX507 {value}<CR>"
  params: [{name: value, type: integer, description: "0=No, 1=Yes"}]
- id: set_quick_resume
  label: Quick Resume
  kind: action
  command: "~XX115 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_power_mode_standby
  label: Power Mode (Standby)
  kind: action
  command: "~XX114 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Eco, 1=Active"}]
- id: set_usb_power
  label: USB Power
  kind: action
  command: "~XX520 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=On,3=Auto"}]
- id: set_wireless_power
  label: Wireless
  kind: action
  command: "~XX521 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]

# --- Security ---
- id: set_security
  label: Security
  kind: action
  command: "~XX78 {state}~{nnnn}<CR>"
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
    - name: nnnn
      type: integer
      description: "4-digit password 0000~9999"
- id: set_security_switch
  label: Security On/Off Switch
  kind: action
  command: "~XX527 {nnnn}<CR>"
  params: [{name: nnnn, type: integer, description: "0000 ~ 9999"}]
- id: set_security_timer_month
  label: Security Timer Month
  kind: action
  command: "~XX537 {value}<CR>"
  params: [{name: value, type: integer, description: "00 ~ 12"}]
- id: set_security_timer_day
  label: Security Timer Day
  kind: action
  command: "~XX538 {value}<CR>"
  params: [{name: value, type: integer, description: "00 ~ 30"}]
- id: set_security_timer_hour
  label: Security Timer Hour
  kind: action
  command: "~XX539 {value}<CR>"
  params: [{name: value, type: integer, description: "00 ~ 24"}]
- id: set_datetime
  label: Set Date/Time (MM/DD/HH)
  kind: action
  command: "~XX77 ~{MM}{DD}{HH}<CR>"
  params:
    - {name: MM, type: integer, description: "00 ~ 12"}
    - {name: DD, type: integer, description: "00 ~ 30"}
    - {name: HH, type: integer, description: "00 ~ 24"}

# --- HDMI Link ---
- id: set_hdmi_link
  label: HDMI Link
  kind: action
  command: "~XX511 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_inclusive_of_tv
  label: Inclusive of TV
  kind: action
  command: "~XX512 {value}<CR>"
  params: [{name: value, type: integer, description: "0=No, 1=Yes"}]
- id: set_power_on_link
  label: Power On Link
  kind: action
  command: "~XX513 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Mutual,2=PJ-->Device,3=Device-->PJ"}]
- id: set_power_off_link
  label: Power Off Link
  kind: action
  command: "~XX514 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]

# --- Test Pattern ---
- id: set_test_pattern
  label: Test Pattern
  kind: action
  command: "~XX195 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=White Grid,2=White,3=Green Grid,4=Magenta Grid,5=Red,6=Green,7=Blue,8=Yellow,9=Magenta,10=Cyan,11=Black"}]

# --- IR / Remote ---
- id: set_ir_function
  label: IR Function
  kind: action
  command: "~XX11 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off All,1=On All,2=Front,3=Top,4=Front Off,5=Front On,6=Top Off,7=Top On,8=Back"}]
- id: remote_code_step
  label: Remote Code +/-
  kind: action
  command: "~XX48 {value}<CR>"
  params: [{name: value, type: integer, description: "1=-, 2=+"}]
- id: set_remote_code
  label: Remote Code
  kind: action
  command: "~XX350 {value}<CR>"
  params: [{name: value, type: integer, description: "00 ~ 99"}]
- id: set_user1_f1
  label: User1 (F1)
  kind: action
  command: "~XX117 {value}<CR>"
  params: [{name: value, type: integer, description: "1 ~ 20 (functions refer to user manual)"}]
- id: set_user2_f2
  label: User2 (F2)
  kind: action
  command: "~XX118 {value}<CR>"
  params: [{name: value, type: integer, description: "1 ~ 20"}]
- id: set_user3_f3
  label: User3 (F3)
  kind: action
  command: "~XX119 {value}<CR>"
  params: [{name: value, type: integer, description: "1 ~ 20"}]

# --- Setup: Projector ID / Triggers / HDBaseT ---
- id: set_projector_id
  label: Projector ID
  kind: action
  command: "~XX79 {value}<CR>"
  params: [{name: value, type: integer, description: "00 ~ 99"}]
- id: set_12v_trigger
  label: 12V Trigger
  kind: action
  command: "~XX192 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_12v_trigger_b
  label: 12V Trigger B
  kind: action
  command: "~XX193 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=On,2=Auto3D,3=Auto235,4=Auto235_Subtitle"}]
- id: set_12v_trigger_format
  label: 12V Trigger (On, triggered format)
  kind: action
  command: "~XX205 {value}<CR>"
  params: [{name: value, type: integer, description: "0=4:3 No,1=4:3 Yes,2=16:9 No,3=16:9 Yes,4=LBX No,5=LBX Yes,6=Native No,7=Native Yes"}]
- id: set_hdbaseT_ethernet
  label: HDBaseT Ethernet
  kind: action
  command: "~XX98 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_hdbaseT_rs232
  label: HDBaseT RS232
  kind: action
  command: "~XX97 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]

# --- Options: Language / CC / Menu / Source / Input Name ---
- id: set_language
  label: Language
  kind: action
  command: "~XX70 {value}<CR>"
  params: [{name: value, type: integer, description: "1=English,2=Deutsch,3=Francais,4=Italiano,5=Espanol,6=Portugues,7=Polski,8=Nederlands,9=Svenska,10=Norsk/Dansk,11=Suomi,12=Greek,13=Traditional Chinese,14=Simplified Chinese,15=Japanese,16=Korean,17=Russian,18=Magyar,19=Ceshtina,22=Turkce,26=Bahasa Indonesia,27=Romana,28=Slovakian"}]
- id: set_closed_captioning
  label: Closed Captioning
  kind: action
  command: "~XX88 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=CC1,2=CC2"}]
- id: set_menu_location
  label: Menu Location
  kind: action
  command: "~XX72 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Top left,2=Top right,3=Center,4=Bottom left,5=Bottom right"}]
- id: set_menu_timer
  label: Menu Timer
  kind: action
  command: "~XX515 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=5sec,3=10sec"}]
- id: set_menu_transparency
  label: Menu Transparency
  kind: action
  command: "~XX526 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 9"}]
- id: set_auto_source
  label: Auto Source
  kind: action
  command: "~XX563 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_input_name
  label: Input Name (custom)
  kind: action
  command: "~XX518 {index} {name}<CR>"
  params:
    - {name: index, type: integer, description: "0=HDMI,1=HDMI1,2=HDMI2,3=HDMI3,4=HDMI/MHL,5=HDMI1/MHL,6=HDMI2/MHL,7=DVI,8=VGA,9=VGA1,10=VGA2,11=Component,12=S-Video,13=Video,14=DisplayPort,15=HDBaseT,16=BNC,17=Wireless,18=Flash Drive,19=Network Display,20=USB Display,21=Multimedia,22=3G-SDI"}
    - {name: name, type: string, description: "up to 10 characters"}
- id: input_name_reset
  label: Input Name Reset
  kind: action
  command: "~XX519 1<CR>"
  params: []
- id: set_vga_out
  label: VGA Out
  kind: action
  command: "~XX309 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Auto,2=VGA1,3=VGA2"}]
- id: set_high_altitude
  label: High Altitude
  kind: action
  command: "~XX101 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_display_mode_lock
  label: Display Mode Lock
  kind: action
  command: "~XX348 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_keypad_lock
  label: Keypad Lock
  kind: action
  command: "~XX103 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_information_hide
  label: Information Hide
  kind: action
  command: "~XX102 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_logo
  label: Logo
  kind: action
  command: "~XX82 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Default,2=User,3=Neutral"}]
- id: logo_capture
  label: Logo Capture
  kind: action
  command: "~XX83 1<CR>"
  params: []
- id: set_beep
  label: Beep
  kind: action
  command: "~XX503 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_background_color
  label: Background Color
  kind: action
  command: "~XX104 {value}<CR>"
  params: [{name: value, type: integer, description: "0=None,1=Blue,3=Red,4=Green,6=Gray,7=Logo"}]
- id: reset_osd
  label: Reset OSD
  kind: action
  command: "~XX546 1<CR>"
  params: []
- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "~XX112 1<CR>"
  params: []
- id: reset_to_default_with_password
  label: Reset to Default With Password
  kind: action
  command: "~XX112 1~{nnnn}<CR>"
  params: [{name: nnnn, type: integer, description: "4-digit password 0000~9999"}]
- id: set_source_lock
  label: Source Lock
  kind: action
  command: "~XX100 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: display_message_osd
  label: Display Message on OSD
  kind: action
  command: "~XX210 {message}<CR>"
  params: [{name: message, type: string, description: "up to 30 characters"}]
- id: open_info_menu
  label: Open Info Menu
  kind: action
  command: "~XX313 1<CR>"
  params: []
- id: close_info_menu
  label: Close Info Menu
  kind: action
  command: "~XX313 0<CR>"
  params: []
- id: set_wall_color
  label: Wall Color
  kind: action
  command: "~XX506 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off,1=BlackBoard,3=Light Green,4=Light Blue,5=Pink,6=Gray,7=Light Yellow"}]
- id: set_color_wheel_index_mode
  label: Color Wheel Index Mode
  kind: action
  command: "~XX547 {value}<CR>"
  params: [{name: value, type: integer, description: "1=2x, 2=3x"}]
- id: set_cw_index_2x
  label: Color Wheel Index 2x (Value)
  kind: action
  command: "~XX553 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 248"}]
- id: set_cw_index_3x
  label: Color Wheel Index 3x (Value)
  kind: action
  command: "~XX554 {value}<CR>"
  params: [{name: value, type: integer, description: "0 ~ 248"}]
- id: set_filter_wheel_index
  label: Filter Wheel Index
  kind: action
  command: "~XX528 {value}<CR>"
  params: [{name: value, type: integer, description: "0000 ~ 9999"}]
- id: set_phosphor_wheel_index
  label: Phosphor Wheel Index
  kind: action
  command: "~XX529 {value}<CR>"
  params: [{name: value, type: integer, description: "0000 ~ 9999"}]
- id: set_serial_port_echo
  label: Serial Port Echo
  kind: action
  command: "~XX556 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_serial_port_path
  label: Serial Port Path
  kind: action
  command: "~XX557 {value}<CR>"
  params: [{name: value, type: integer, description: "1=RS232, 2=HDBaseT"}]

# --- Network / Control protocol enables ---
- id: set_wlan
  label: WLAN
  kind: action
  command: "~XX450 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_crestron
  label: Crestron Control
  kind: action
  command: "~XX454 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_extron
  label: Extron Control
  kind: action
  command: "~XX455 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_pj_link
  label: PJ Link Control
  kind: action
  command: "~XX456 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_amx_discovery
  label: AMX Device Discovery
  kind: action
  command: "~XX457 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_telnet
  label: Telnet Control
  kind: action
  command: "~XX458 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]
- id: set_http
  label: HTTP Control
  kind: action
  command: "~XX459 {value}<CR>"
  params: [{name: value, type: integer, description: "0=Off, 1=On"}]

# --- READ / QUERY commands (kind: query) ---
- id: query_power
  label: Power Status Query
  kind: query
  command: "~XX124 1<CR>"
  params: []
- id: query_input_source
  label: Input Source Query
  kind: query
  command: "~XX121 1<CR>"
  params: []
- id: query_sub_source
  label: Sub Source Query
  kind: query
  command: "~XX131 1<CR>"
  params: []
- id: query_brightness
  label: Brightness Query
  kind: query
  command: "~XX125 1<CR>"
  params: []
- id: query_contrast
  label: Contrast Query
  kind: query
  command: "~XX126 1<CR>"
  params: []
- id: query_aspect_ratio
  label: Aspect Ratio Query
  kind: query
  command: "~XX127 1<CR>"
  params: []
- id: query_color_temperature
  label: Color Temperature Query
  kind: query
  command: "~XX128 1<CR>"
  params: []
- id: query_projection
  label: Projection Query
  kind: query
  command: "~XX129 1<CR>"
  params: []
- id: query_3d_state
  label: 3D State Query
  kind: query
  command: "~XX130 1<CR>"
  params: []
- id: query_display_mode
  label: Display Mode Query
  kind: query
  command: "~XX123 1<CR>"
  params: []
- id: query_av_mute
  label: AV Mute Query
  kind: query
  command: "~XX355 1<CR>"
  params: []
- id: query_audio_mute
  label: Audio Mute Query
  kind: query
  command: "~XX356 1<CR>"
  params: []
- id: query_closed_captioning
  label: Closed Captioning Query
  kind: query
  command: "~XX354 1<CR>"
  params: []
- id: query_ir_function
  label: IR Function Query
  kind: query
  command: "~XX542 1<CR>"
  params: []
- id: query_geometry
  label: Geometry Query
  kind: query
  command: "~XX543 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Image shift H,2=Image shift V,3=V Keystone,4=H Keystone,5=V Arc,6=H Arc,7=V Zoom,8=H Zoom"}]
- id: query_lens_function
  label: Lens Function Query
  kind: query
  command: "~XX545 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Zoom,2=Focus,3=Lens Shift,4=Lens Function"}]
- id: query_security_timer
  label: Security Timer Query
  kind: query
  command: "~XX544 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Month,2=Day,3=Hour"}]
- id: query_projector_id
  label: Projector ID Query
  kind: query
  command: "~XX558 1<CR>"
  params: []
- id: query_color_wheel_index
  label: Color Wheel Index Query
  kind: query
  command: "~XX559 {value}<CR>"
  params: [{name: value, type: integer, description: "2=2x, 3=3x"}]
- id: query_filter_wheel_index
  label: Filter Wheel Index Query
  kind: query
  command: "~XX530 1<CR>"
  params: []
- id: query_phosphor_wheel_index
  label: Phosphor Wheel Index Query
  kind: query
  command: "~XX531 1<CR>"
  params: []
- id: query_mac_address
  label: MAC Address Query
  kind: query
  command: "~XX555 {value}<CR>"
  params: [{name: value, type: integer, description: "1=LAN MAC, 2=WLAN MAC"}]
- id: query_network_status
  label: Network Status Query
  kind: query
  command: "~XX87 1<CR>"
  params: []
- id: query_ip_address
  label: IP Address Query
  kind: query
  command: "~XX87 3<CR>"
  params: []
- id: query_wlan_status
  label: WLAN Network Status Query
  kind: query
  command: "~XX451 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Status,2=IP Address,3=SSID"}]
- id: query_dhcp
  label: DHCP Query
  kind: query
  command: "~XX150 17<CR>"
  params: []
- id: query_standby_power_mode
  label: Standby Power Mode Query
  kind: query
  command: "~XX150 16<CR>"
  params: []
- id: query_software_version
  label: Software Version Query
  kind: query
  command: "~XX122 1<CR>"
  params: []
- id: query_rs232_version
  label: RS232 Version Query
  kind: query
  command: "~XX152 1<CR>"
  params: []
- id: query_lan_fw_version
  label: LAN FW Version Query
  kind: query
  command: "~XX357 1<CR>"
  params: []
- id: query_model_name
  label: Model Name Query
  kind: query
  command: "~XX151 1<CR>"
  params: []
- id: query_serial_number
  label: Serial Number Query
  kind: query
  command: "~XX353 1<CR>"
  params: []
- id: query_lamp_hours
  label: Lamp Hours Query
  kind: query
  command: "~XX108 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Lamp1 Hour/Total,2=Lamp2 Hour,3=Bright,4=Eco,5=Dynamic,6=Eco+"}]
- id: query_filter_usage_hours
  label: Filter Usage Hours Query
  kind: query
  command: "~XX321 1<CR>"
  params: []
- id: query_fan_speed
  label: Fan Speed Query
  kind: query
  command: "~XX351 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Fan 1,2=Fan 2,3=Fan 3,4=Fan 4"}]
- id: query_system_temperature
  label: System Temperature Query
  kind: query
  command: "~XX352 1<CR>"
  params: []
- id: query_current_watt
  label: Current Watt Query
  kind: query
  command: "~XX358 1<CR>"
  params: []
- id: query_info_string
  label: Information Block Query
  kind: query
  command: "~XX150 {value}<CR>"
  params: [{name: value, type: integer, description: "1=Info String(abbbbbccddddee),2=Native Resolution,3=Main Source,4=Resolution,5=Signal Format,6=Pixel Clock,7=Horz refresh,8=Vert refresh,9=Sub Source,10=Sub Resolution,11=Sub Signal Format,12=Sub Pixel Clock,13=Sub Horz refresh,14=Sub Vert refresh,15=Light Source Mode,16=Standby Power Mode,17=DHCP,18=System Temperature,19=Refresh rate,20=Current Lamp Source"}]
```

## Feedbacks
```yaml
# Query responses: device returns "Ok<value>" for reads, "P"/"F" for writes.
- id: power_state
  type: enum
  values: [off, on]
  query_action: query_power
- id: input_source
  type: enum
  values: [none, hdmi1, hdmi2, hdmi3, dvi, vga, component, svideo, video, displayport, hdbaset, bnc, wireless, flash_drive, network_display, usb_display, multimedia, 3g_sdi, smart_tv]
  query_action: query_input_source
- id: av_mute_state
  type: enum
  values: [off, on]
  query_action: query_av_mute
- id: audio_mute_state
  type: enum
  values: [off, on]
  query_action: query_audio_mute
- id: aspect_ratio
  type: enum
  values: [4:3, 16:9, 16:10, LBX, native, auto, auto235, superwide]
  query_action: query_aspect_ratio
- id: lamp_hours
  type: integer
  query_action: query_lamp_hours
- id: filter_usage_hours
  type: integer
  query_action: query_filter_usage_hours
- id: system_temperature
  type: integer
  query_action: query_system_temperature
- id: network_status
  type: enum
  values: [disconnected, connected]
  query_action: query_network_status
- id: mac_address
  type: string
  query_action: query_mac_address
- id: ip_address
  type: string
  query_action: query_ip_address
- id: serial_number
  type: string
  query_action: query_serial_number
- id: software_version
  type: string
  query_action: query_software_version
# UNRESOLVED: full response payload schemas for ranged queries (brightness/contrast/etc.)
# return "Ok<value>" with the numeric value; exact encoding width not specified per-query.
```

## Variables
```yaml
# Settable ranged/level parameters are represented as parameterized Actions above
# (e.g. set_brightness, set_volume, set_contrast). No separate variable table
# is needed beyond those action entries.
# UNRESOLVED: persistence/non-volatile behaviour of each setting not stated in source.
```

## Events
```yaml
# Unsolicited "System Auto Send" notifications. Device emits "INFO<n>" codes.
- id: system_status
  description: "Unsolicited status/error notification emitted by the projector."
  payload_format: "INFO{code}"
  codes:
    0: StandbyMode
    1: Warming up
    2: Cooling down
    3: Out of Range
    4: Lamp Fail (LED Fail)
    5: Thermal Switch Error
    6: Fan Lock
    7: Over Temperature
    8: Lamp Hours Running Out
    9: Cover Open
    10: Lamp Ignite Fail
    11: Format Board Power On Fail
    12: Color Wheel Unexpected Stop
    13: Over Temperature
    14: FAN 1 Lock
    15: FAN 2 Lock
    16: FAN 3 Lock
    17: FAN 4 Lock
    18: FAN 5 Lock
    19: LAN fail then restart
    20: LD lower than 60%
    21: LD NTC(1) Over Temperature
    22: LD NTC(2) Over Temperature
    23: High Ambient Temperature
    24: System Ready
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Command frame: `~` + 2-digit projector ID + 2–3 digit command + space + value + `<CR>` (0x0D). The source uses `~XX` as a literal placeholder where `XX` is the 2-digit projector ID (default `00`). Example: power on with default ID is ASCII `~0000 1<CR>` = HEX `7E 30 30 30 30 20 31 0D`.
- Serial line: 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control, UART16550 with FIFO disabled.
- Write acknowledgement: `P` = pass, `F` = fail. Read acknowledgement: `Ok<value>`.
- A handful of source rows (Darbee Settings mode/level/demo, Anamorphic Lens, Audio Delay values, Lens Type WT1/WT2/ST1/TZ1/TZ2, several Info-submenu items, Subnet Mask/Gateway/DNS/Reset under LAN) are documented as menu items only and carry NO command code or payload in the source — they are omitted from Actions rather than fabricated.
- `~XX140` Remote Control Simulation collapses 82 distinct button rows into one parameterized action because they share a single opcode (only the trailing value differs).
- Gaming mode and Dynamic Contrast rows in the source list labels only with no command code; not emitted.

<!-- UNRESOLVED: source is Optoma's generic cross-model RS232 table; no 4K550-specific document was located (EOL product). Firmware version compatibility ranges, electrical/power specifications, and any model-exclusive commands are not stated. Exact numeric response widths and string-termination rules for read replies are not fully specified. Baud/parity are stated (9600 8N1); no IP/TCP port applies (serial-only as documented). -->
````

Spec above. Generic Optoma RS232 table → serial-only, 9600 8N1. ~200 unique opcodes enumerated (write + query), INFO0–24 events, empty Safety array per constraint. Darbee/Lens-Type/Audio-Delay rows omitted — source lists them label-only, no payload (not fabricated).

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - audiogeneral.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/0c4163dd-1197-4d40-abdf-16cbf8bb5ecd.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.audiogeneral.com/Optoma/w501_rs232.pdf
retrieved_at: 2026-06-17T20:27:37.044Z
last_checked_at: 2026-06-17T20:38:40.679Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:38:40.679Z
matched_actions: 286
action_count: 286
confidence: medium
summary: "All 286 spec opcodes confirmed verbatim in source; transport (9600 8N1) confirmed; only extra is ~XX509 Darbee Reset (1 command, below short threshold). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "~XX509"
- "source is a cross-model generic RS232 table, not 4K550-specific; some enumerated source rows omit their hex payload and are marked below. Firmware version compatibility, voltage/power specs, and any 4K550-exclusive behaviour are not stated."
- "full response payload schemas for ranged queries (brightness/contrast/etc.)"
- "persistence/non-volatile behaviour of each setting not stated in source."
- "no explicit multi-step sequences described in source."
- "source is Optoma's generic cross-model RS232 table; no 4K550-specific document was located (EOL product). Firmware version compatibility ranges, electrical/power specifications, and any model-exclusive commands are not stated. Exact numeric response widths and string-termination rules for read replies are not fully specified. Baud/parity are stated (9600 8N1); no IP/TCP port applies (serial-only as documented)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
