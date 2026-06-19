---
spec_id: admin/optoma-zu510-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma ZU510 Series Control Spec"
manufacturer: Optoma
model_family: "Optoma ZU510 Series"
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - "Optoma ZU510 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optoma.de
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://optoma.de/uploads/RS232/ZU510T-RS232--.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
retrieved_at: 2026-06-18T22:10:00.042Z
last_checked_at: 2026-06-19T07:42:21.150Z
generated_at: 2026-06-19T07:42:21.150Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/LAN port number not stated in source (LAN control only referenced in a remark). Source PDF is an OCR'd table; some command codes are ambiguous and noted inline."
  - "TCP/LAN port number not stated in source"
  - "source lists remote key codes but no opcode/prefix for the simulation command"
  - "several read responses return opaque numeric tokens (nnnnnn) whose"
  - "remove if not applicable."
  - "no multi-step sequences described explicitly in source."
  - "no explicit safety warnings or interlock procedures found in source."
  - "TCP/LAN port number not stated in source (LAN control only inferred from a remark)."
  - "Remote Control Simulation opcode/prefix undocumented in source; only key codes listed."
  - "Firmware version compatibility not stated in source."
  - "Several read-query responses return opaque numeric tokens (nnnnnn) whose decoding is not specified."
  - "Brightness \"+/-\" sub-commands (source rows reference codes 046/047) are ambiguous in the table and not included."
  - "Source is an OCR'd table; some command/value pairings (e.g. Model Name response values, Info String composite format) are partially garbled."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:42:21.150Z
  matched_actions: 122
  action_count: 122
  confidence: medium
  summary: "All 122 spec action commands matched literally against source table; transport parameters verified. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Optoma ZU510 Series Control Spec

## Summary
RS-232 (and LAN) control protocol for the Optoma ZU510 Series projector. Commands are ASCII strings framed as `~<ID><CMD> <param><CR>` where `<ID>` is a 2-digit projector selector (00 = all projectors, 00–99) and `<CMD>` is a 3-digit command code. Covers power, source routing, picture/colour adjustment, geometry, PIP/PBP, audio, 3D, network info queries, and unsolicited status events.

<!-- UNRESOLVED: TCP/LAN port number not stated in source (LAN control only referenced in a remark). Source PDF is an OCR'd table; some command codes are ambiguous and noted inline. -->

## Transport
```yaml
# Source documents RS-232 explicitly and references "LAN control commands" in a remark,
# so both serial and tcp are populated. TCP port is not stated.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Note: source also states "UART16550 FIFO: Disable"
addressing:
  port: null  # UNRESOLVED: TCP/LAN port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off commands present
  - routable     # inferred: input / main / sub source selection present
  - queryable    # inferred: extensive read (status query) command set
  - levelable    # inferred: volume, brightness, contrast, keystone ranges present
```

## Actions
```yaml
# ── Framing ──────────────────────────────────────────────────────────────────
# Write:  ~<ID><CMD> <param><CR>   Response Pass: P   Fail: F
# Read:   ~<ID><CMD> <sub><CR>     Response Pass: OK<sub><value>   Fail: F
# <ID> = 2-digit projector id, 00 = all projectors (00-99). Default 00.
# <CMD> = 3-digit code. The source table renders many codes with a leading zero
# dropped (e.g. "21"); they are zero-padded to 3 digits here per the protocol
# header ("000~999") and the worked HEX example (~00195 1 -> 7E 30 30 31 39 35...).
# <CR> = 0x0D. Space (0x20) separates command and parameter.
# Each action below uses {id} for the projector id parameter.
#
# Parameter token "0 & 2" in the source means the off-state accepts value 0 or 2;
# represented below as "0|2".

# ── Power & core system ──────────────────────────────────────────────────────
- id: power_off
  label: Power Off
  kind: action
  command: "~{id}000 0"
  params:
    - name: id
      type: string
      description: "2-digit projector id, 00-99 (00 = all). Default 00."
  notes: "off-state also accepts value 2 (source: '0 & 2')"

- id: power_on
  label: Power On
  kind: action
  command: "~{id}000 1"
  params:
    - name: id
      type: string
      description: "2-digit projector id, 00-99 (00 = all)."

- id: resync
  label: Re-Sync
  kind: action
  command: "~{id}001 1"
  params:
    - name: id
      type: string

- id: av_mute_off
  label: AV Mute Off
  kind: action
  command: "~{id}002 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: av_mute_on
  label: AV Mute On
  kind: action
  command: "~{id}002 1"
  params: [{name: id, type: string}]

- id: audio_mute_off
  label: Mute Off
  kind: action
  command: "~{id}003 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: audio_mute_on
  label: Mute On
  kind: action
  command: "~{id}003 1"
  params: [{name: id, type: string}]

- id: freeze_off
  label: Unfreeze
  kind: action
  command: "~{id}004 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: freeze_on
  label: Freeze
  kind: action
  command: "~{id}004 1"
  params: [{name: id, type: string}]

- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "~{id}005 1"
  params: [{name: id, type: string}]

- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "~{id}006 1"
  params: [{name: id, type: string}]

- id: direct_power_off
  label: Direct Power Off
  kind: action
  command: "~{id}105 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: high_altitude_off
  label: High Altitude Off
  kind: action
  command: "~{id}101 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: information_hide_off
  label: Information Hide Off
  kind: action
  command: "~{id}102 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: information_hide_on
  label: Information Hide On
  kind: action
  command: "~{id}102 1"
  params: [{name: id, type: string}]

- id: open_info_menu
  label: Open Info Menu
  kind: action
  command: "~{id}313 1"
  params: [{name: id, type: string}]

- id: close_info_menu
  label: Close Info Menu
  kind: action
  command: "~{id}313 0"
  params: [{name: id, type: string}]
  notes: "close also accepts value 2"

- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "~{id}112 1"
  params: [{name: id, type: string}]

- id: ir_filter_off
  label: IR Filter Off
  kind: action
  command: "~{id}011 0"
  params: [{name: id, type: string}]

- id: ir_filter_on
  label: IR Filter On
  kind: action
  command: "~{id}011 1"
  params: [{name: id, type: string}]

- id: optional_filter_no
  label: Optional Filter Installed No
  kind: action
  command: "~{id}320 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: optional_filter_yes
  label: Optional Filter Installed Yes
  kind: action
  command: "~{id}320 1"
  params: [{name: id, type: string}]

- id: cleaning_reminder_yes
  label: Cleaning Up Reminder Yes
  kind: action
  command: "~{id}323 1"
  params: [{name: id, type: string}]

- id: cleaning_reminder_no
  label: Cleaning Up Reminder No
  kind: action
  command: "~{id}323 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: filter_reminder
  label: Filter Reminder
  kind: action
  command: "~{id}322 {hours}"
  params:
    - name: id
      type: string
    - name: hours
      type: integer
      description: "0-1000 hours"

- id: vga_out_standby_off
  label: VGA Out (Standby) Off
  kind: action
  command: "~{id}309 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: vga_out_standby_on
  label: VGA Out (Standby) On
  kind: action
  command: "~{id}309 1"
  params: [{name: id, type: string}]

- id: lan_standby_off
  label: LAN (Standby) Off
  kind: action
  command: "~{id}450 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: lan_standby_on
  label: LAN (Standby) On
  kind: action
  command: "~{id}450 1"
  params: [{name: id, type: string}]

- id: security_off
  label: Security Off
  kind: action
  command: "~{id}078 0"
  params: [{name: id, type: string}]

- id: security_on
  label: Security On
  kind: action
  command: "~{id}078 1"
  params: [{name: id, type: string}]
  notes: "source shows PIN slot '0~nnnnnn' / '1~nnnnnn'"

- id: remote_code_set
  label: Remote Code
  kind: action
  command: "~{id}350 {code}"
  params:
    - name: id
      type: string
    - name: code
      type: string
      description: "remote code 00-99"

- id: ssi_power_mode
  label: SSI Power Mode
  kind: action
  command: "~{id}110 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["1=Normal", "2=Eco"]

- id: auto_power_off
  label: Auto Power Off (minutes)
  kind: action
  command: "~{id}106 {minutes}"
  params:
    - name: id
      type: string
    - name: minutes
      type: integer
      description: "0-120, 5 min increments"

- id: sleep_timer
  label: Sleep Timer (minutes)
  kind: action
  command: "~{id}107 {minutes}"
  params:
    - name: id
      type: string
    - name: minutes
      type: integer
      description: "000-990, 10 min increments"

- id: auto_source_off
  label: Auto Source Off
  kind: action
  command: "~{id}563 0"
  params: [{name: id, type: string}]

# ── Source / input routing ───────────────────────────────────────────────────
- id: select_input
  label: Select Input
  kind: action
  command: "~{id}012 {source}"
  params:
    - name: id
      type: string
    - name: source
      type: enum
      values: ["1=HDMI1", "15=HDMI2", "16=Dongle", "5=VGA", "21=HDBaseT"]

- id: select_sub_source
  label: Select Sub Source (PIP/PBP)
  kind: action
  command: "~{id}305 {source}"
  params:
    - name: id
      type: string
    - name: source
      type: enum
      values: ["16=Dongle", "5=VGA", "21=HDBaseT"]

# ── Picture / colour ─────────────────────────────────────────────────────────
- id: brightness
  label: Brightness
  kind: action
  command: "~{id}021 {level}"
  params:
    - name: id
      type: string
    - name: level
      type: integer
      description: "0-100 (0-8 for Blending mode)"

- id: contrast
  label: Contrast
  kind: action
  command: "~{id}022 {level}"
  params:
    - name: id
      type: string
    - name: level
      type: integer
      description: "0-100"

- id: sharpness
  label: Sharpness
  kind: action
  command: "~{id}023 {level}"
  params:
    - name: id
      type: string
    - name: level
      type: integer
      description: "0-10 (VGA/Video only)"

- id: saturation
  label: Saturation
  kind: action
  command: "~{id}045 {level}"
  params:
    - name: id
      type: string
    - name: level
      type: integer
      description: "0-100 (VGA/Video only)"

- id: hue
  label: Hue
  kind: action
  command: "~{id}044 {level}"
  params:
    - name: id
      type: string
    - name: level
      type: integer
      description: "0-100 (VGA/Video only)"

- id: gamma
  label: Gamma
  kind: action
  command: "~{id}035 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["1=Film", "3=Graphics", "5=1.8", "6=2.0", "4=2.2", "8=2.6", "10=Blackboard", "11=DICOM SIM."]

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "~{id}036 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["4=5500K", "1=6500K", "2=7500K", "3=8500K", "6=9500K"]

- id: color_space
  label: Color Space
  kind: action
  command: "~{id}037 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["1=Auto", "2=RGB", "3=YUV", "4=RGB(16-235)"]

- id: dynamic_black
  label: Dynamic Black
  kind: action
  command: "~{id}191 {state}"
  params:
    - name: id
      type: string
    - name: state
      type: enum
      values: ["0=Off", "1=On"]

- id: display_mode
  label: Display Mode
  kind: action
  command: "~{id}020 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["1=Presentation", "3=Movie", "4=sRGB", "19=Blending", "13=DICOM SIM.", "5=User"]

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "~{id}060 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["1=4:3", "2=16:9", "3=16:10", "7=Auto"]

- id: wall_color
  label: Wall Color
  kind: action
  command: "~{id}506 {color}"
  params:
    - name: id
      type: string
    - name: color
      type: enum
      values: ["0=White", "7=Light Yellow", "4=Light Blue", "5=Pink", "8=Dark Green"]

# ── Colour matching (7 channels x Saturation/Hue/Gain) ───────────────────────
- id: cm_w_red_gain
  label: Color Matching (W) Red Gain
  kind: action
  command: "~{id}345 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]
- id: cm_w_green_gain
  label: Color Matching (W) Green Gain
  kind: action
  command: "~{id}346 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]
- id: cm_w_blue_gain
  label: Color Matching (W) Blue Gain
  kind: action
  command: "~{id}347 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]

- id: cm_r_saturation
  label: Color Matching (R) Saturation
  kind: action
  command: "~{id}333 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-199"}]
- id: cm_r_hue
  label: Color Matching (R) Hue
  kind: action
  command: "~{id}327 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "-99-99"}]
- id: cm_r_gain
  label: Color Matching (R) Gain
  kind: action
  command: "~{id}339 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]

- id: cm_g_saturation
  label: Color Matching (G) Saturation
  kind: action
  command: "~{id}334 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-199"}]
- id: cm_g_hue
  label: Color Matching (G) Hue
  kind: action
  command: "~{id}328 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "-99-99"}]
- id: cm_g_gain
  label: Color Matching (G) Gain
  kind: action
  command: "~{id}340 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]

- id: cm_b_saturation
  label: Color Matching (B) Saturation
  kind: action
  command: "~{id}335 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-199"}]
- id: cm_b_hue
  label: Color Matching (B) Hue
  kind: action
  command: "~{id}329 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "-99-99"}]
- id: cm_b_gain
  label: Color Matching (B) Gain
  kind: action
  command: "~{id}341 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]

- id: cm_c_saturation
  label: Color Matching (C) Saturation
  kind: action
  command: "~{id}336 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-199"}]
- id: cm_c_hue
  label: Color Matching (C) Hue
  kind: action
  command: "~{id}330 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "-99-99"}]
- id: cm_c_gain
  label: Color Matching (C) Gain
  kind: action
  command: "~{id}342 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]

- id: cm_y_saturation
  label: Color Matching (Y) Saturation
  kind: action
  command: "~{id}337 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-199"}]
- id: cm_y_hue
  label: Color Matching (Y) Hue
  kind: action
  command: "~{id}331 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "-99-99"}]
- id: cm_y_gain
  label: Color Matching (Y) Gain
  kind: action
  command: "~{id}343 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]

- id: cm_m_saturation
  label: Color Matching (M) Saturation
  kind: action
  command: "~{id}338 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-199"}]
- id: cm_m_hue
  label: Color Matching (M) Hue
  kind: action
  command: "~{id}332 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "-99-99"}]
- id: cm_m_gain
  label: Color Matching (M) Gain
  kind: action
  command: "~{id}344 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "1-199"}]

# ── Projection / geometry ────────────────────────────────────────────────────
- id: projection
  label: Projection
  kind: action
  command: "~{id}071 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["1=Front", "2=Rear", "3=Front Ceiling", "4=Rear Ceiling"]

- id: h_keystone
  label: H Keystone
  kind: action
  command: "~{id}065 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "-40-40"}]

- id: v_keystone
  label: V Keystone
  kind: action
  command: "~{id}066 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "-40-40"}]

- id: digital_zoom
  label: Digital Zoom
  kind: action
  command: "~{id}062 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-10"}]

# ── PIP / PBP ────────────────────────────────────────────────────────────────
- id: screen_reset
  label: Screen Reset
  kind: action
  command: "~{id}561 1"
  params: [{name: id, type: string}]

- id: pip_pbp_function
  label: PIP/PBP Function
  kind: action
  command: "~{id}302 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["0=Off", "1=PIP", "2=PBP"]

- id: pip_location
  label: PIP Location
  kind: action
  command: "~{id}303 {location}"
  params:
    - name: id
      type: string
    - name: location
      type: enum
      values: ["1=Top Left", "2=Top Right", "3=Bottom Left", "4=Bottom Right"]

- id: pip_size
  label: PIP Size
  kind: action
  command: "~{id}304 {size}"
  params:
    - name: id
      type: string
    - name: size
      type: enum
      values: ["1=Large", "2=Medium", "3=Small"]

- id: pip_swap
  label: PIP Swap
  kind: action
  command: "~{id}306 1"
  params: [{name: id, type: string}]

# ── Settings ─────────────────────────────────────────────────────────────────
- id: language
  label: Language
  kind: action
  command: "~{id}070 {code}"
  params:
    - name: id
      type: string
    - name: code
      type: integer
      description: "1-28 (1=English, 2=Deutsch, 3=Français, 4=Italiano, 5=Español, 6=Português, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norwegian, 11=Suomi, 12=ελληνικά, 13=繁體中文, 14=簡体中文, 15=日本語, 16=한국어, 17=Русский, 18=Magyar, 19=Čeština, 20=عربي, 21=ไทย, 22=Türkçe, 23=فارسی, 24=Dansk, 25=Vietnamese, 26=Indonesia, 27=Romanian, 28=Slovakian)"

- id: menu_location
  label: Menu Location
  kind: action
  command: "~{id}072 {location}"
  params:
    - name: id
      type: string
    - name: location
      type: enum
      values: ["1=Top Left", "2=Top Right", "3=Center", "4=Bottom Left", "5=Bottom Right"]

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "~{id}195 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["0=None", "2=White", "3=Grid"]

- id: logo
  label: Logo
  kind: action
  command: "~{id}082 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["1=Default", "2=User"]

- id: logo_capture
  label: Logo Capture
  kind: action
  command: "~{id}083 1"
  params: [{name: id, type: string}]

# ── Volume / audio ───────────────────────────────────────────────────────────
- id: speaker_off
  label: Speaker Off
  kind: action
  command: "~{id}310 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: audio_out_off
  label: Audio Out Off
  kind: action
  command: "~{id}510 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: microphone_off
  label: Microphone Off
  kind: action
  command: "~{id}562 0"
  params: [{name: id, type: string}]
  notes: "off-state also accepts value 2"

- id: volume
  label: Volume
  kind: action
  command: "~{id}081 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-15"}]

- id: microphone_volume
  label: Microphone Volume
  kind: action
  command: "~{id}093 {level}"
  params: [{name: id, type: string}, {name: level, type: integer, description: "0-30"}]

# ── 3D ───────────────────────────────────────────────────────────────────────
- id: 3d_mode
  label: 3D Mode
  kind: action
  command: "~{id}230 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["4=Auto", "5=ON", "7=Frame Packing"]

- id: 3d_format
  label: 3D Format
  kind: action
  command: "~{id}405 {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: enum
      values: ["1=Side-by-Side (Half)", "2=Top and Bottom", "3=Frame Sequential"]

- id: 3d_invert_off
  label: 3D Invert Off
  kind: action
  command: "~{id}231 0"
  params: [{name: id, type: string}]

# ── Remote control simulation ────────────────────────────────────────────────
- id: remote_simulation
  label: Remote Control Simulation Key
  kind: action
  command: ""  # UNRESOLVED: source lists remote key codes but no opcode/prefix for the simulation command
  params:
    - name: id
      type: string
    - name: key
      type: enum
      values: ["1=Power", "50=Power Off", "10=Up", "11=Left", "12=Enter", "13=Right", "14=Down", "15=V Keystone+", "16=V Keystone-", "17=Volume-", "18=Volume+", "20=Menu", "32=Zoom+", "33=Zoom-", "23=VGA-1", "24=AV Mute", "30=Freeze", "36=Mode", "37=Format", "40=info", "41=Re-sync", "42=HDMI 1", "43=HDMI 2", "47=Source", "51=1", "52=2", "53=3", "54=4", "55=5", "56=6", "57=7", "58=8", "59=9", "60=0", "63=PIP/PBP", "68=Geometric Correction", "70=Hot Key (F1)", "71=Hot Key (F2)", "72=Hot Key (F3)", "74=Exit"]

# ── Queries (kind: query) ───────────────────────────────────────────────────
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "~{id}124 1"
  params: [{name: id, type: string}]

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "~{id}121 1"
  params: [{name: id, type: string}]

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "~{id}125 1"
  params: [{name: id, type: string}]

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "~{id}126 1"
  params: [{name: id, type: string}]

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "~{id}127 1"
  params: [{name: id, type: string}]

- id: color_temperature_query
  label: Color Temperature Query
  kind: query
  command: "~{id}128 1"
  params: [{name: id, type: string}]

- id: projection_query
  label: Projection Query
  kind: query
  command: "~{id}129 1"
  params: [{name: id, type: string}]

- id: sub_source_query
  label: Sub Source Query
  kind: query
  command: "~{id}131 1"
  params: [{name: id, type: string}]

- id: av_mute_query
  label: AV Mute Query
  kind: query
  command: "~{id}355 1"
  params: [{name: id, type: string}]

- id: mute_query
  label: Mute Query
  kind: query
  command: "~{id}356 1"
  params: [{name: id, type: string}]

- id: h_keystone_query
  label: H Keystone Query
  kind: query
  command: "~{id}543 4"
  params: [{name: id, type: string}]

- id: v_keystone_query
  label: V Keystone Query
  kind: query
  command: "~{id}543 3"
  params: [{name: id, type: string}]

- id: ssi_power_mode_query
  label: SSI Power Mode Query
  kind: query
  command: "~{id}150 15"
  params: [{name: id, type: string}]

- id: ssi_hours_normal_query
  label: SSI Hours Used (Normal) Query
  kind: query
  command: "~{id}108 3"
  params: [{name: id, type: string}]

- id: ssi_hours_eco_query
  label: SSI Hours Used (Eco) Query
  kind: query
  command: "~{id}108 4"
  params: [{name: id, type: string}]

- id: filter_usage_hours_query
  label: Filter Usage Hours Query
  kind: query
  command: "~{id}321 1"
  params: [{name: id, type: string}]

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "~{id}151 1"
  params: [{name: id, type: string}]

- id: snid_query
  label: SNID Query
  kind: query
  command: "~{id}353 1"
  params: [{name: id, type: string}]

- id: sw_version_query
  label: Software Version Query
  kind: query
  command: "~{id}122 1"
  params: [{name: id, type: string}]

- id: main_source_resolution_query
  label: Main Source Resolution Query
  kind: query
  command: "~{id}150 4"
  params: [{name: id, type: string}]

- id: sub_source_resolution_query
  label: Sub Source Resolution Query
  kind: query
  command: "~{id}150 10"
  params: [{name: id, type: string}]

- id: light_source_mode_query
  label: Light Source Mode Query
  kind: query
  command: "~{id}150 15"
  params: [{name: id, type: string}]

- id: standby_power_mode_query
  label: Standby Power Mode Query
  kind: query
  command: "~{id}150 16"
  params: [{name: id, type: string}]

- id: dhcp_client_query
  label: DHCP Client Query
  kind: query
  command: "~{id}150 17"
  params: [{name: id, type: string}]

- id: system_temperature_query
  label: System Temperature Query
  kind: query
  command: "~{id}150 18"
  params: [{name: id, type: string}]

- id: ip_address_query
  label: IP Address Query
  kind: query
  command: "~{id}087 3"
  params: [{name: id, type: string}]

- id: network_status_query
  label: Network Status Query
  kind: query
  command: "~{id}087 1"
  params: [{name: id, type: string}]

- id: mac_address_query
  label: MAC Address Query
  kind: query
  command: "~{id}555 1"
  params: [{name: id, type: string}]
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["off", "on"]
    source: power_status_query → OK1 0&2(off) / 1(on)
  - id: av_mute_state
    type: enum
    values: ["off", "on"]
    source: av_mute_query → 0(off) / 1(on)
  - id: mute_state
    type: enum
    values: ["off", "on"]
    source: mute_query → 0(off) / 1(on)
  - id: input_source
    type: enum
    values: ["HDMI1", "HDMI2", "Dongle", "VGA", "HDBaseT"]
    source: input_source_query
  - id: aspect_ratio
    type: enum
    values: ["4:3", "16:9", "16:10", "Auto"]
  - id: brightness_level
    type: integer
    source: brightness_query → nnnn
  - id: network_status
    type: enum
    values: ["connected", "disconnected"]
    source: network_status_query → 1 / 0
  # UNRESOLVED: several read responses return opaque numeric tokens (nnnnnn) whose
  # value-to-meaning mapping is not decoded in the source.
```

## Variables
```yaml
# No discrete settable parameters beyond those represented as Actions above.
# UNRESOLVED: remove if not applicable.
```

## Events
```yaml
# Unsolicited notifications the projector sends automatically ("System Auto Send").
# Frame: INFO<code>  Fail: F
events:
  - id: standby_mode
    description: "Projector entered standby mode"
    command: "INFO0"
  - id: ld_fail
    description: "Light source (LD) failure"
    command: "INFO4"
  - id: fan_lock
    description: "Fan lock detected"
    command: "INFO6"
  - id: over_temperature
    description: "Over-temperature condition"
    command: "INFO7"
  - id: color_wheel_unexpected_stop
    description: "Color wheel unexpected stop"
    command: "INFO12"
  - id: power_good_error
    description: "Power good error"
    command: "INFO13"
  - id: ld_ntc_over_temperature
    description: "LD NTC over-temperature"
    command: "INFO21"
  - id: system_ready
    description: "System ready"
    command: "INFO24"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source.
# Note (operational, not safety): source remark states that when HDBaseT control
# is ON the 12V trigger output stays ON even in standby, and that RS232/LAN
# power-on has a 6-10 second feedback delay.
```

## Notes
- Command frame: `~<ID><CMD><space><param><CR>` where `<CR>` = 0x0D. HEX reference: `~00195 1` → `7E 30 30 31 39 35 20 31 0D`.
- Write response: `P` (pass) / `F` (fail). Read response: `OK<sub><value>` (pass) / `F` (fail).
- Projector ID 00 = all projectors on the bus (00–99), enabling multi-projector addressing.
- "0 & 2" off-state values in the source appear to accept either 0 or 2 for the off/disabled state; reason undocumented.
- Command codes zero-padded to 3 digits here (e.g. source "21" → `021`) to match the documented `000~999` command field and the worked HEX example.
- HDBaseT control ON forces the 12V trigger output ON even in standby.
- Power-on over RS232/LAN has a 6–10 second feedback delay.

<!-- UNRESOLVED: TCP/LAN port number not stated in source (LAN control only inferred from a remark). -->
<!-- UNRESOLVED: Remote Control Simulation opcode/prefix undocumented in source; only key codes listed. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Several read-query responses return opaque numeric tokens (nnnnnn) whose decoding is not specified. -->
<!-- UNRESOLVED: Brightness "+/-" sub-commands (source rows reference codes 046/047) are ambiguous in the table and not included. -->
<!-- UNRESOLVED: Source is an OCR'd table; some command/value pairings (e.g. Model Name response values, Info String composite format) are partially garbled. -->

## Provenance

```yaml
source_domains:
  - optoma.de
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://optoma.de/uploads/RS232/ZU510T-RS232--.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
retrieved_at: 2026-06-18T22:10:00.042Z
last_checked_at: 2026-06-19T07:42:21.150Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:42:21.150Z
matched_actions: 122
action_count: 122
confidence: medium
summary: "All 122 spec action commands matched literally against source table; transport parameters verified. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/LAN port number not stated in source (LAN control only referenced in a remark). Source PDF is an OCR'd table; some command codes are ambiguous and noted inline."
- "TCP/LAN port number not stated in source"
- "source lists remote key codes but no opcode/prefix for the simulation command"
- "several read responses return opaque numeric tokens (nnnnnn) whose"
- "remove if not applicable."
- "no multi-step sequences described explicitly in source."
- "no explicit safety warnings or interlock procedures found in source."
- "TCP/LAN port number not stated in source (LAN control only inferred from a remark)."
- "Remote Control Simulation opcode/prefix undocumented in source; only key codes listed."
- "Firmware version compatibility not stated in source."
- "Several read-query responses return opaque numeric tokens (nnnnnn) whose decoding is not specified."
- "Brightness \"+/-\" sub-commands (source rows reference codes 046/047) are ambiguous in the table and not included."
- "Source is an OCR'd table; some command/value pairings (e.g. Model Name response values, Info String composite format) are partially garbled."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
