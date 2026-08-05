---
spec_id: admin/planar-qe-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar QE Series Control Spec"
manufacturer: Planar
model_family: "QE Series (all models)"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "QE Series (all models)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/p1wfdp10/020-1321-01a_qe-series-rs232-user-manual-wm.pdf
retrieved_at: 2026-07-17T17:20:56.388Z
last_checked_at: 2026-07-22T00:39:35.973Z
generated_at: 2026-07-22T00:39:35.973Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB-B and OPS serial paths not independently documented; commands appear identical to RS-232 set"
  - "events - device sends unsolicited email notifications per NETWORK.SMTP"
  - "full enum-valued variables (aspect, gamma, timezone, etc.) intentionally"
  - "device can send email notifications (NETWORK.SMTP) on the events"
  - "no multi-step macro sequences documented"
  - "no explicit safety warnings or interlock procedures in source."
  - "TCP/Telnet-specific behavior (keepalive, echo suppression) not documented"
  - "authentication for any networked control path not documented"
  - "firmware update packet payload format (PACKET operand) partial details only"
  - "KEY command numeric values 4, 7, 8, 10, 11, 16, 271-285 marked \"Not used\" in source"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:39:35.973Z
  matched_actions: 110
  action_count: 110
  confidence: medium
  summary: "All 110 spec actions map 1:1 to the source RS232 Codes table rows with exact numeric codes, opcodes, and matching enum/range shapes; transport values confirmed. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Planar QE Series Control Spec

## Summary
The Planar QE Series is a professional LCD display lineup supporting RS-232, TCP, and UDP control. All models accept ASCII command strings over a serial connection (19200 baud 8N1) or via TCP/UDP on port 57. The protocol uses a consistent `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` structure with named or numeric command codes. Termination may be `[CR]` (0x0D), `[LF]` (0x0A), or `;`.

<!-- UNRESOLVED: USB-B and OPS serial paths not independently documented; commands appear identical to RS-232 set -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 57  # TCP and UDP port 57; source does not state RS-232 port number
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence: DISPLAY.POWER commands present (powerable); AUDIO.VOLUME/BRIGHTNESS/BACKLIGHT (levelable);
# SOURCE.SELECT / SOURCE.NEXT (routable); broad ?-query support (queryable).
traits:
  - powerable   # inferred from DISPLAY.POWER, AUTO.ON, POWER.SAVE.MODE
  - levelable   # inferred from AUDIO.VOLUME, BRIGHTNESS, CONTRAST, BACKLIGHT.INTENSITY
  - routable    # inferred from SOURCE.SELECT, SOURCE.NEXT, AUDIO.ZONE
  - queryable   # inferred from broad ? operator support across the command set
# UNRESOLVED: events - device sends unsolicited email notifications per NETWORK.SMTP
# configuration but no event command structure for the control channel is documented
```

## Actions
```yaml
# Command structure: [OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]
# Operators: = (write), ? (read named), # (read numeric), + (increment), - (decrement),
#            : (response), !ERR (failure), @ACK / ^NAK (ack/nak for no-operator actions).
# Each entry below mirrors one row in the source RS232 Codes table. Named opcodes shown
# verbatim; numeric command code included where the source documents it. Modifiers and
# operands appear in `params`; ranges/enum values kept verbatim from source.
# Termination [CR] omitted from `command:` template - append at transport layer.

# --- Image Adjust (per-zone where modifiers indicate) ---
- id: brightness
  label: Brightness
  kind: set
  command: "BRIGHTNESS({zone})={value}"
  numeric_code: 200
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: contrast
  label: Contrast
  kind: set
  command: "CONTRAST({zone})={value}"
  numeric_code: 201
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: color
  label: Color
  kind: set
  command: "COLOR({zone})={value}"
  numeric_code: 202
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: tint
  label: Tint
  kind: set
  command: "TINT({zone})={value}"
  numeric_code: 203
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: sharpness
  label: Sharpness
  kind: set
  command: "SHARPNESS({zone})={value}"
  numeric_code: 204
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: noise_reduction
  label: Noise Reduction
  kind: set
  command: "NOISE.REDUCTION({zone})={value}"
  numeric_code: 205
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: enum
      values: [OFF, LOW, MEDIUM, HIGH]
  notes: "Operators: = # ? + -"

- id: diagnostic_color
  label: Diagnostic Color
  kind: set
  command: "DIAGNOSTIC.COLOR({zone})={value}"
  numeric_code: 206
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: enum
      values: [RED, GREEN, BLUE, OFF]
  notes: "Operators: = # ? + -"

- id: colorspace
  label: Color Space
  kind: set
  command: "COLORSPACE({zone}, {value_type})={value}"
  numeric_code: 207
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value_type
      type: enum
      values: [SETTING, ACTUAL]
    - name: value
      type: enum
      values: [REC601, REC709, RGB, RGB.VIDEO, AUTO]
  notes: "Operators: = # ? + -. ACTUAL is read-only and cannot return AUTO."

- id: color_temperature
  label: Color Temperature
  kind: set
  command: "COLOR.TEMPERATURE({zone})={value}"
  numeric_code: 208
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: enum
      values: [3200K, 5500K, 6500K, 7500K, 9300K, NATIVE]
  notes: "Operators: = # ? + -"

- id: gain
  label: Gain (RGB)
  kind: set
  command: "GAIN({zone}, {color})={value}"
  numeric_code: 209
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
      default: ALL
    - name: value
      type: integer
      range: 0-200  # when color=ALL, three operands Red Green Blue each 0-200
  notes: "Operators: = # ? + -. ALL modifier takes three operands."

- id: offset
  label: Offset (RGB)
  kind: set
  command: "OFFSET({zone}, {color})={value}"
  numeric_code: 210
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
      default: ALL
    - name: value
      type: integer
      range: 0-100  # when color=ALL, three operands each 0-100
  notes: "Operators: = # ? + -"

- id: advanced_color
  label: Advanced Color (CMS)
  kind: set
  command: "CMS({zone}, {gamut}, {color_point})={value}"
  numeric_code: 211
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
    - name: gamut
      type: enum
      values: [REC709, SMPTEC, EBU, USER, AUTO, CURRENT]
    - name: color_point
      type: enum
      values: [RED.X, RED.Y, GREEN.X, GREEN.Y, BLUE.X, BLUE.Y, CYAN.X, CYAN.Y, MAGENTA.X, MAGENTA.Y, YELLOW.X, YELLOW.Y, WHITE.X, WHITE.Y]
    - name: value
      type: integer
      range: 0-800
  notes: "Operators: = # ? + -. Omit color_point to set all 14 values (one operand per value)."

- id: cms_flag
  label: Advanced Color Flag (CMSFLAG)
  kind: query
  command: "CMSFLAG({zone}, {gamut}, {color_point})?"
  numeric_code: 212
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
    - name: gamut
      type: enum
      values: [REC709, SMPTEC, EBU, USER, AUTO, CURRENT]
    - name: color_point
      type: enum
      values: [RED.X, RED.Y, GREEN.X, GREEN.Y, BLUE.X, BLUE.Y, CYAN.X, CYAN.Y, MAGENTA.X, MAGENTA.Y, YELLOW.X, YELLOW.Y, WHITE.X, WHITE.Y]
  notes: "Returns '*' if target unachievable, else empty string."

- id: color_gamut
  label: Color Gamut
  kind: set
  command: "COLOR.GAMUT({zone}, {type}, {gamut})={value}"
  numeric_code: 214
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
      default: CURRENT
    - name: type
      type: enum
      values: [SETTING, ACTUAL, COPY, REVERT]
      default: SETTING
    - name: gamut
      type: enum
      values: [REC709, SMPTE.C, EBU, USER, AUTO, CURRENT]
    - name: value
      type: enum
      values: [REC709, SMPTE.C, EBU, USER, AUTO, DISABLE]
  notes: "SET/ACTUAL take = # ?; COPY/REVERT are execute actions (@ACK)."

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  command: "REVERT.IMAGE.SETTINGS({zone})"
  numeric_code: 215
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
      default: CURRENT

- id: aspect
  label: Aspect Ratio
  kind: set
  command: "ASPECT({zone})={value}"
  numeric_code: 500
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: enum
      values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]
  notes: "Operators: = # ? + -"

- id: overscan
  label: Overscan
  kind: set
  command: "OVERSCAN({zone})={value}"
  numeric_code: 501
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: integer
      range: 0-20
  notes: "Operators: = # ? + -"

- id: pan
  label: Image Position (Pan)
  kind: set
  command: "PAN({zone}, {direction})={value}"
  numeric_code: 502
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: direction
      type: enum
      values: [X, Y, ALL]
      default: ALL
    - name: value
      type: integer
      range: -1000 to 1000
  notes: "Operators: = # ? + -. ALL takes two operands (X then Y)."

- id: rotate
  label: Content Rotation
  kind: set
  command: "ROTATE({zone})={value}"
  numeric_code: 504
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: enum
      values: [NONE, 90, 180, 270]
  notes: "Operators: = # ? + -"

# --- Inputs and Views ---
- id: source_select
  label: Source Select
  kind: set
  command: "SOURCE.SELECT({zone})={source}"
  numeric_code: 101
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL, CURRENT]
      default: CURRENT
    - name: source
      type: enum
      values: [OPS, HDMI.1, HDMI.2, HDMI.3, HDMI.4, DP]
  notes: "Operators: = # ? + -"

- id: source_next
  label: Next Source
  kind: action
  command: "SOURCE.NEXT({zone})"
  numeric_code: 104
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL, CURRENT]
      default: CURRENT

- id: source_scan
  label: Auto Scan Sources
  kind: set
  command: "SOURCE.SCAN={value}"
  numeric_code: 105
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = # ? + -"

- id: multi_view
  label: Multi-Source View
  kind: set
  command: "MULTI.VIEW={value}"
  numeric_code: 102
  params:
    - name: value
      type: enum
      values: [SINGLE, QUAD]
  notes: "Operators: = # ? + -"

- id: layout
  label: Layout
  kind: set
  command: "LAYOUT({modifier})={value}"
  numeric_code: 103
  params:
    - name: modifier
      type: enum
      values: [SINGLE, DUAL, QUAD]
    - name: value
      type: enum
      values: [SINGLE, QUAD]
  notes: "Operators: = # ? + -"

- id: current_zone
  label: Current Zone
  kind: set
  command: "CURRENT.ZONE={zone}"
  numeric_code: 100
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
  notes: "Operators: = # ? + -"

- id: current_zone_layout
  label: Current Zone Layout
  kind: query
  command: "CURRENT.ZONE.LAYOUT?"
  numeric_code: 108
  params: []
  notes: "Returns S.1 / Q.1 / Q.2 / Q.3 / Q.4."

- id: source_message
  label: Source Message
  kind: query
  command: "SOURCE.MESSAGE({zone})?"
  numeric_code: 111
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
      default: CURRENT
  notes: "Returns input resolution + frame rate; 'Searching' / 'No Signal' when no signal."

- id: signal_info
  label: Image Information (Signal Info)
  kind: query
  command: "SIGNAL.INFO({zone}, {parameter})?"
  numeric_code: 300
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
      default: CURRENT
    - name: parameter
      type: enum
      values: [HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS, ALL]
      default: ALL

- id: color_subsampling
  label: Color Subsampling
  kind: query
  command: "COLOR.SUBSAMPLING({zone})?"
  numeric_code: 301
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
      default: CURRENT
  notes: "Returns e.g. \"4:4:4\" / \"4:2:0\"."

- id: edid_timing
  label: EDID Timing
  kind: set
  command: "EDID.TIMING({input}, {param}){operator}{value}"
  numeric_code: 400
  params:
    - name: input
      type: enum
      values: [OPS, HDMI.1, HDMI.2, HDMI.3, HDMI.4, DP, ALL]
    - name: param
      type: enum
      values: [UPDATE, HACTIVE, VACTIVE, VREFRESH, FULL.SPEC, PCLK, HBLANK, HFP, HSYNC, VBLANK, VFP, VSYNC, FACTORY, TYPE]
    - name: operator
      type: enum
      values: ["=", "?"]
    - name: value
      type: integer
      range: "-3 to N (signed); -3=4K60, -2=4K30, -1=1080P"
  notes: "Operators: = ? !. UPDATE is execute-only (@ACK)."

- id: edid_selected_connector
  label: EDID Zone (Selected Connector)
  kind: set
  command: "EDID.SELECTEDCONNECTOR={value}"
  numeric_code: 401
  params:
    - name: value
      type: enum
      values: [OPS, HDMI.1, HDMI.2, HDMI.3, HDMI.4, DP, ALL]
  notes: "Operators: = # ? + -"

# --- Audio ---
- id: audio_balance
  label: Balance
  kind: set
  command: "AUDIO.BALANCE={value}"
  numeric_code: 1000
  params:
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: audio_bass
  label: Bass
  kind: set
  command: "AUDIO.BASS={value}"
  numeric_code: 1001
  params:
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: audio_mute
  label: Mute
  kind: set
  command: "AUDIO.MUTE={value}"
  numeric_code: 1002
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = # ? + -"

- id: audio_input
  label: Audio Input
  kind: query
  command: "AUDIO.INPUT?"
  numeric_code: 1003
  params: []
  notes: "Returns source for zone currently playing audio (per Audio Select)."

- id: audio_speakers
  label: Enable Internal Speakers
  kind: set
  command: "AUDIO.SPEAKERS={value}"
  numeric_code: 1004
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = # ? + -"

- id: audio_treble
  label: Treble
  kind: set
  command: "AUDIO.TREBLE={value}"
  numeric_code: 1005
  params:
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: audio_volume
  label: Volume
  kind: set
  command: "AUDIO.VOLUME={value}"
  numeric_code: 1006
  params:
    - name: value
      type: integer
      range: 0-100
  notes: "Operators: = # ? + -"

- id: audio_zone
  label: Audio Select
  kind: set
  command: "AUDIO.ZONE={zone}"
  numeric_code: 1007
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
  notes: "Operators: = # ? + -"

- id: audio_settings
  label: Audio Settings
  kind: set
  command: "AUDIO.SETTINGS={zone} {volume} {treble} {bass} {balance} {mute} {speakers}"
  numeric_code: 1009
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
    - name: volume
      type: integer
      range: 0-100
    - name: treble
      type: integer
      range: 0-100
    - name: bass
      type: integer
      range: 0-100
    - name: balance
      type: integer
      range: 0-100
    - name: mute
      type: enum
      values: ["0", "1"]
    - name: speakers
      type: enum
      values: ["0", "1"]
  notes: "Operators: = ?. Sets/returns all audio params in fixed order."

# --- OSD / Menus and Messages ---
- id: osd_position
  label: Menu Position
  kind: set
  command: "OSD.POSITION={value}"
  numeric_code: 1301
  params:
    - name: value
      type: enum
      values: [CENTER, UPPER.LEFT, UPPER.RIGHT, LOWER.LEFT, LOWER.RIGHT]
  notes: "Operators: = # ? + -"

- id: orientation
  label: OSD Rotation
  kind: set
  command: "ORIENTATION={value}"
  numeric_code: 1302
  params:
    - name: value
      type: enum
      values: [LANDSCAPE, PORTRAIT]
  notes: "Operators: = # ? + -"

- id: osd_transparency
  label: OSD Transparency
  kind: set
  command: "OSD.TRANSPARENCY={value}"
  numeric_code: 1303
  params:
    - name: value
      type: integer
      range: 0-5
  notes: "Operators: = # ? + -"

- id: osd_timeout
  label: OSD Timeout
  kind: set
  command: "OSD.TIMEOUT={value}"
  numeric_code: 1304
  params:
    - name: value
      type: integer
      range: 0,10,30,60,120,240  # seconds
  notes: "Operators: = # ? + -. Numeric value is seconds; arbitrary delay programmable."

- id: splash_screen
  label: Splash Screen
  kind: set
  command: "SPLASH.SCREEN={value}"
  numeric_code: 1305
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
  notes: "Operators: = # ? + -"

- id: blank_color
  label: Blank Screen Color
  kind: set
  command: "BLANK.COLOR={value}"
  numeric_code: 1306
  params:
    - name: value
      type: enum
      values: [RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, WHITE, BLACK]
  notes: "Operators: = # ? + -"

- id: pattern
  label: Test Pattern
  kind: action
  command: "PATTERN({pattern})"
  numeric_code: 1307
  params:
    - name: pattern
      type: enum
      values: [NONE, BLACK, WHITE, GRAY, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, GRAYBAR, REDBAR, GREENBAR, BLUEBAR, CHECKERBOARD, COLORBAR]

- id: osd_status
  label: OSD Status
  kind: query
  command: "OSD.STATUS?"
  numeric_code: 1308
  params: []
  notes: "Returns ENABLE if OSD currently shown."

- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: set
  command: "OSD.ALLOW.POPUP={value}"
  numeric_code: 1300
  params:
    - name: value
      type: enum
      values: [NO, YES]
  notes: "Operators: = # ? + -"

- id: osd_close
  label: OSD Close
  kind: action
  command: "OSD.CLOSE"
  numeric_code: 1310
  params: []
  notes: "Forces any open menus/message boxes to close."

# --- Advanced Settings / Backlight ---
- id: backlight_intensity
  label: Backlight Intensity
  kind: set
  command: "BACKLIGHT.INTENSITY={value}"
  numeric_code: 1400
  params:
    - name: value
      type: integer
      range: 1-100
  notes: "Operators: = # ? + -"

- id: local_dimming
  label: Local Dimming
  kind: set
  command: "LOCAL.DIMMING={value}"
  numeric_code: 1415
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = # ? + -"

- id: memc_level
  label: MEMC
  kind: set
  command: "MEMC.LEVEL={value}"
  numeric_code: 1503
  params:
    - name: value
      type: enum
      values: [OFF, LOW, MEDIUM, HIGH]
  notes: "Operators: = # ? + -"

- id: gamma
  label: Gamma
  kind: set
  command: "GAMMA({zone})={value}"
  numeric_code: 1504
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
      default: CURRENT
    - name: value
      type: enum
      values: ["1.5", "1.55", "1.6", "1.65", "1.7", "1.75", "1.8", "1.85", "1.9", "1.95", "2.0", "2.05", "2.1", "2.15", "2.2", "2.25", "2.3", "2.35", "2.4", "2.45", "2.5", "2.55", "2.6", "2.65", "2.7", "2.75", "2.8"]
  notes: "Operators: = # ? + -"

# --- Advanced Settings / Power ---
- id: display_power
  label: Display Power
  kind: set
  command: "DISPLAY.POWER={value}"
  numeric_code: 1408
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = # ? + -. Mirrors IR remote ON/OFF."

- id: auto_on
  label: Auto Power On
  kind: set
  command: "AUTO.ON={value}"
  numeric_code: 1407
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = # ? + -"

- id: power_save_mode
  label: Power Saving Mode
  kind: set
  command: "POWER.SAVE.MODE={value}"
  numeric_code: 1405
  params:
    - name: value
      type: enum
      values: [DISABLED, LOW.POWER, WAKE.ON.SIGNAL]
  notes: "Operators: = # ? + -"

- id: power_save_delay
  label: Power Saving Delay
  kind: set
  command: "POWER.SAVE.DELAY={value}"
  numeric_code: 1406
  params:
    - name: value
      type: integer
      range: 60,300,900,1800,3600  # seconds
  notes: "Operators: = # ? + -. Numeric value is seconds."

- id: power_on_delay
  label: Power On Delay
  kind: set
  command: "POWER.ON.DELAY={value}"
  numeric_code: 1420
  params:
    - name: value
      type: number
      range: 0.0-10.0  # fixed-point seconds
  notes: "Operators: = # ? + -"

# --- Advanced Settings / System Settings ---
- id: dp_type
  label: DisplayPort Type
  kind: set
  command: "DP.TYPE={value}"
  numeric_code: 1904
  params:
    - name: value
      type: enum
      values: ["1.1", "1.2"]
  notes: "Operators: = # ? + -"

- id: pixel_orbit
  label: Pixel Orbit
  kind: set
  command: "PIXEL.ORBIT={value}"
  numeric_code: 1906
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = # ? + -"

- id: led_enable
  label: Enable Status LED
  kind: set
  command: "LED.ENABLE={value}"
  numeric_code: 1902
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
  notes: "Operators: = ? only (no +/-)."

- id: firmware_update
  label: Firmware Update
  kind: action
  command: "FIRMWARE.UPDATE({firmware}, {type}){operator}{value}"
  numeric_code: 2200
  params:
    - name: firmware
      type: enum
      values: [AUTO, VP.AP, HDMI]
    - name: type
      type: enum
      values: [START, PACKET, FINISH, URL]
    - name: operator
      type: enum
      values: ["=", "?", "!"]
    - name: value
      type: string
  notes: "Operators: = ? !. START is execute-only."

# --- Advanced Settings / Network ---
- id: ipv4_address
  label: IP Address
  kind: set
  command: "IPV4.ADDRESS(STATIC)=\"{value}\""
  numeric_code: 1205
  params:
    - name: value
      type: string
  notes: "Operators: = ?. STATIC modifier required for writes."

- id: ipv4_netmask
  label: Subnet Mask
  kind: set
  command: "IPV4.NETMASK(STATIC)=\"{value}\""
  numeric_code: 1205
  params:
    - name: value
      type: string
  notes: "Operators: = ?. STATIC modifier required for writes. Shares numeric code 1205 with IPV4.ADDRESS per source table."

- id: ipv4_gateway
  label: Default Gateway
  kind: set
  command: "IPV4.GATEWAY(STATIC)=\"{value}\""
  numeric_code: 1206
  params:
    - name: value
      type: string
  notes: "Operators: = ?. STATIC modifier required for writes."

- id: network_dhcp
  label: DHCP
  kind: set
  command: "NETWORK.DHCP={value}"
  numeric_code: 1207
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = ?"

- id: network_mac
  label: MAC Address
  kind: query
  command: "NETWORK.MAC?"
  numeric_code: 1203
  params: []

- id: network_dns1
  label: DNS Server 1
  kind: set
  command: "NETWORK.DNS1(STATIC)=\"{value}\""
  numeric_code: 1212
  params:
    - name: value
      type: string
  notes: "Operators: = ?. STATIC modifier required for writes."

- id: network_dns2
  label: DNS Server 2
  kind: set
  command: "NETWORK.DNS2(STATIC)=\"{value}\""
  numeric_code: 1213
  params:
    - name: value
      type: string
  notes: "Operators: = ?. STATIC modifier required for writes."

- id: network_ping
  label: Network Ping
  kind: set
  command: "NETWORK.PING=\"{host}\""
  numeric_code: 1211
  params:
    - name: host
      type: string
  notes: "Response string: SUCCESS or FAILED."

- id: network_ntp
  label: Use Network Time
  kind: set
  command: "NETWORK.NTP={value}"
  numeric_code: 1209
  params:
    - name: value
      type: enum
      values: [OFF, ON]
  notes: "Operators: = ?"

- id: network_ntpserver
  label: NTP Server
  kind: set
  command: "NETWORK.NTPSERVER=\"{value}\""
  numeric_code: 1214
  params:
    - name: value
      type: string
  notes: "Default = 0.pool.ntp.org. Operators: = ?"

- id: hostname
  label: Hostname
  kind: set
  command: "HOSTNAME=\"{value}\""
  numeric_code: 2403
  params:
    - name: value
      type: string
      max_length: 65
  notes: "Letters and numbers only (no spaces). Default = \"QE Series\"."

- id: display_name
  label: Display Name
  kind: set
  command: "DISPLAY.NAME=\"{value}\""
  numeric_code: 2404
  params:
    - name: value
      type: string

# --- SMTP / Notifications ---
- id: smtp_server
  label: SMTP Server
  kind: set
  command: "NETWORK.SMTP.SERVER=\"{value}\""
  numeric_code: 1215
  params:
    - name: value
      type: string
  notes: "Operators: = ?"

- id: smtp_port
  label: SMTP Port
  kind: set
  command: "NETWORK.SMTP.PORT={value}"
  numeric_code: 1223
  params:
    - name: value
      type: integer
  notes: "Operators: = ?"

- id: smtp_username
  label: SMTP Username
  kind: set
  command: "NETWORK.SMTP.USERNAME=\"{value}\""
  numeric_code: 1224
  params:
    - name: value
      type: string
  notes: "Operators: = ?"

- id: smtp_password
  label: SMTP Password
  kind: set
  command: "NETWORK.SMTP.PASSWORD=\"{value}\""
  numeric_code: 1225
  params:
    - name: value
      type: string
  notes: "Operators: = ?"

- id: smtp_encryption
  label: SMTP Connection Encryption
  kind: set
  command: "NETWORK.SMTP.ENCRYPTION={value}"
  numeric_code: 1226
  params:
    - name: value
      type: enum
      values: [NONE, TLS, START.TLS]
  notes: "Operators: = ?"

- id: smtp_authentication
  label: SMTP Authentication
  kind: set
  command: "NETWORK.SMTP.AUTHENTICATION={value}"
  numeric_code: 1227
  params:
    - name: value
      type: enum
      values: [NONE, AUTO, PLAIN, SCRAM_SHA1, CRAM_MD5, DIGEST_MD5, LOGIN, NTLM]
  notes: "Operators: = ?"

- id: smtp_from
  label: SMTP Email From Address
  kind: set
  command: "NETWORK.SMTP.FROM=\"{value}\""
  numeric_code: 1228
  params:
    - name: value
      type: string
  notes: "Operators: = ?"

- id: smtp_test
  label: Test Email
  kind: action
  command: "NETWORK.SMTP.TEST({event})"
  numeric_code: 1229
  params:
    - name: event
      type: enum
      values: [POWER.STATE.CHANGED, ERROR.OCCURRED, SOURCE.DETECTED, SOURCE.LOST, SOURCE.SELECTED]

- id: notification_email
  label: Notification Event
  kind: set
  command: "NOTIFICATION.EMAIL({event})={enable}, \"{recipients}\", \"{message}\""
  numeric_code: 1222
  params:
    - name: event
      type: enum
      values: [POWER.STATE.CHANGED, ERROR.OCCURRED, SOURCE.DETECTED, SOURCE.LOST, SOURCE.SELECTED]
    - name: enable
      type: enum
      values: [DISABLE, ENABLE]
    - name: recipients
      type: string
    - name: message
      type: string
  notes: "Operators: = ?"

# --- Locks / IR / Keys ---
- id: key
  label: Key
  kind: set
  command: "KEY={value}"
  numeric_code: 1200
  params:
    - name: value
      type: enum
      values: [UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT, KEY.1, KEY.2, KEY.3, KEY.4, KEY.5, KEY.6, KEY.7, KEY.8, KEY.9, MUTE, KEY.0, STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT, MENU.PREV, TOP, PRESETS, PRESET1, PRESET2, PRESET3, PRESET4, ZONE1, ZONE2, ZONE3, ZONE4, PIP.MODE, PIP.SWAP, HDMI1, HDMI2, HDMI3, HDMI4, DISPLAY.PORT, DVI, VGA, OPS, WALL, COLOR, MISC, ARROW.LEFT, ARROW.RIGHT, STAR.STAR]
  notes: "Operator: = only. See Key table in source for numeric codes."

- id: key_lock
  label: Keypad Lock
  kind: set
  command: "KEY.LOCK={value}"
  numeric_code: 1201
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
  notes: "Operators: = ?"

- id: ir_lock
  label: IR Remote Lock
  kind: set
  command: "IR.LOCK={value}"
  numeric_code: 1202
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
  notes: "Operators: = ?"

- id: ir_code
  label: IR Code
  kind: set
  command: "IR.CODE={value}"
  numeric_code: 1210
  params:
    - name: value
      type: integer
      range: 0-65535
  notes: "Operators: = # ? + -"

- id: timezone
  label: Time Zone
  kind: set
  command: "TIMEZONE={value}"
  numeric_code: 1208
  params:
    - name: value
      type: enum
      values: [UTCM1200.INTERNATIONAL.DATE.LINE.WEST, UTCM1100.COORDINATED.UNIVERSAL.TIMEM11, UTCM1000.HAWAII, UTCM0900.ALASKA, UTCM0800.BAJA.CALIFORNIA, UTCM0800.PACIFIC.TIME.US.CANADA, UTCM0700.ARIZONA, UTCM0700.CHIHUAHUA.LA.PAZ.MAZATLAN, UTCM0700.MOUNTAIN.TIME.US.CANADA, UTCM0600.CENTRAL.AMERICA, UTCM0600.CENTRAL.TIME.US.CANADA, UTCM0600.GUADALAJARA.MEXICO.CITY.MONTERREY, UTCM0600.SASKATCHEWAN, UTCM0500.BOGOTA.LIMA.QUITO.RIO.BRANCO, UTCM0500.CHETUMAL, UTCM0500.EASTERN.TIME.US.CANADA, UTCM0500.INDIANA.EAST, UTCM0430.CARACAS, UTCM0400.ASUNCION, UTCM0400.ATLANTIC.TIME.CANADA, UTCM0400.CUIABA, UTCM0400.GEORGETOWN.LA.PAZ.MANAUS.SAN.JUAN, UTCM0330.NEWFOUNDLAND, UTCM0300.BRASILIA, UTCM0300.CAYENNE.FORTALEZA, UTCM0300.CITY.OF.BUENOS.AIRES, UTCM0300.GREENLAND, UTCM0300.MONTEVIDEO, UTCM0300.SALVADOR, UTCM0300.SANTIAGO, UTCM0200.COORDINATED.UNIVERSAL.TIMEM02, UTCM0100.AZORES, UTCM0100.CABO.VERDE.IS, UTC.CASABLANCA, UTC.COORDINATED.UNIVERSAL.TIME, UTC.DUBLIN.EDINBURGH.LISBON.LONDON, UTC.MONROVIA.REYKJAVIK, UTCP0100.AMSTERDAM.BERLIN.BERN.ROME.STOCKHOLM.VIENNA, UTCP0100.BELGRADE.BRATISLAVA.BUDAPEST.LJUBLJANA.PRAGUE, UTCP0100.BRUSSELS.COPENHAGEN.MADRID.PARIS, UTCP0100.SARAJEVO.SKOPJE.WARSAW.ZAGREB, UTCP0100.WEST.CENTRAL.AFRICA, UTCP0100.WINDHOEK, UTCP0200.AMMAN, UTCP0200.ATHENS.BUCHAREST, UTCP0200.BEIRUT, UTCP0200.CAIRO, UTCP0200.DAMASCUS, UTCP0200.HARARE.PRETORIA, UTCP0200.HELSINKI.KYIV.RIGA.SOFIA.TALLINN.VILNIUS, UTCP0200.ISTANBUL, UTCP0200.JERUSALEM, UTCP0200.KALININGRAD.RTZ.1, UTCP0200.TRIPOLI, UTCP0300.BAGHDAD, UTCP0300.KUWAIT.RIYADH, UTCP0300.MINSK, UTCP0300.MOSCOW.ST.PETERSBURG.VOLGOGRAD.RTZ.2, UTCP0300.NAIROBI, UTCP0330.TEHRAN, UTCP0400.ABU.DHABI.MUSCAT, UTCP0400.BAKU, UTCP0400.IZHEVSK.SAMARA.RTZ.3, UTCP0400.PORT.LOUIS, UTCP0400.TBILISI, UTCP0400.YEREVAN, UTCP0430.KABUL, UTCP0500.ASHGABAT.TASHKENT, UTCP0500.EKATERINBURG.RTZ.4, UTCP0500.ISLAMABAD.KARACHI, UTCP0530.CHENNAI.KOLKATA.MUMBAI.NEW.DELHI, UTCP0530.SRI.JAYAWARDENEPURA, UTCP0545.KATHMANDU, UTCP0600.ASTANA, UTCP0600.DHAKA, UTCP0600.NOVOSIBIRSK.RTZ.5, UTCP0630.YANGON.RANGOON, UTCP0700.BANGKOK.HANOI.JAKARTA, UTCP0700.KRASNOYARSK.RTZ.6, UTCP0800.BEIJING.CHONGQING.HONG.KONG.URUMQI, UTCP0800.IRKUTSK.RTZ.7, UTCP0800.KUALA.LUMPUR.SINGAPORE, UTCP0800.PERTH, UTCP0800.TAIPEI, UTCP0800.ULAANBAATAR, UTCP0900.OSAKA.SAPPORO.TOKYO, UTCP0900.SEOUL, UTCP0900.YAKUTSK.RTZ.8, UTCP0930.ADELAIDE, UTCP0930.DARWIN, UTCP1000.BRISBANE, UTCP1000.CANBERRA.MELBOURNE.SYDNEY, UTCP1000.GUAM.PORT.MORESBY, UTCP1000.HOBART, UTCP1000.MAGADAN, UTCP1000.VLADIVOSTOK.MAGADAN.RTZ.9, UTCP1100.CHOKURDAKH.RTZ.10, UTCP1100.SOLOMON.IS.NEW.CALEDONIA, UTCP1200.ANADYR.PETROPAVLOVSK.KAMCHATSKY.RTZ.11, UTCP1200.AUCKLAND.WELLINGTON, UTCP1200.COORDINATED.UNIVERSAL.TIMEP12, UTCP1200.FIJI, UTCP1300.NUKU.ALOFA, UTCP1300.SAMOA, UTCP1400.KIRITIMATI.ISLAND]
  notes: "Operators: = # ? + -"

- id: serial_device
  label: Serial Device
  kind: set
  command: "SERIAL.DEVICE({port}, {setting})=\"{value}\""
  numeric_code: 1220
  params:
    - name: port
      type: enum
      values: [DB9, USB, OPS]
    - name: setting
      type: enum
      values: [BAUD]
    - name: value
      type: string
  notes: "Operators: = ?"

# --- Time / Schedule ---
- id: time
  label: Time
  kind: set
  command: "TIME({field})={value}"
  numeric_code: 1100
  params:
    - name: field
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE, ALL]
      default: ALL
    - name: value
      type: integer
  notes: "Operators: = ?"

- id: time_day
  label: Time - Day
  kind: query
  command: "TIME.DAY?"
  numeric_code: 1101
  params: []
  notes: "Returns MON-SUN."

- id: time_month
  label: Time - Month
  kind: set
  command: "TIME.MONTH={value}"
  numeric_code: 1102
  params:
    - name: value
      type: enum
      values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]
  notes: "Operators: = ?"

- id: time_string
  label: Time - String
  kind: query
  command: "TIME.STRING?"
  numeric_code: 1103
  params: []
  notes: "Returns e.g. \"2015-09-01 13:21\"."

- id: schedule
  label: Schedule
  kind: set
  command: "SCHEDULE({slot}, {parameter})={value}"
  numeric_code: 2100
  params:
    - name: slot
      type: integer
      range: 1-20
    - name: parameter
      type: enum
      values: [FREQ, MINUTE, HOUR, DAY, ACTION, DATA, ENABLE, ALL]
      default: ALL
    - name: value
      type: integer
  notes: "Operators: = ?"

- id: schedule_day
  label: Schedule Day
  kind: set
  command: "SCHEDULE.DAY({slot})={value}"
  numeric_code: 2101
  params:
    - name: slot
      type: integer
      range: 1-20
    - name: value
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]
  notes: "Operators: = ?"

- id: schedule_action
  label: Schedule Action
  kind: set
  command: "SCHEDULE.ACTION({slot})={value}"
  numeric_code: 2102
  params:
    - name: slot
      type: integer
      range: 1-20
    - name: value
      type: enum
      values: [TURN.ON, TURN.OFF, PANEL.BRIGHTNESS]
  notes: "Operators: = ?"

- id: schedule_frequency
  label: Schedule Frequency
  kind: set
  command: "SCHEDULE.FREQUENCY({slot})={value}"
  numeric_code: 2103
  params:
    - name: slot
      type: integer
      range: 1-20
    - name: value
      type: enum
      values: [DAILY, WEEKLY, WEEKDAYS, WEEKENDS]
  notes: "Operators: = ?"

- id: schedule_description
  label: Schedule Description
  kind: query
  command: "SCHEDULE.DESCRIPTION({slot})?"
  numeric_code: 2104
  params:
    - name: slot
      type: integer
      range: 1-20

# --- System / Diagnostics / Reset ---
- id: error_log
  label: Error Log
  kind: query
  command: "ERROR.LOG({entry})?"
  numeric_code: 2311
  params:
    - name: entry
      type: integer
      range: 1-65535
  notes: "Entry #1 is most recent. Empty string = no more entries."

- id: build_info
  label: Version Info (Build Info)
  kind: query
  command: "BUILD.INFO({field})?"
  numeric_code: 2302
  params:
    - name: field
      type: enum
      values: [DATE.SCP, VERSION.SCP, DATE.VP, VERSION.VP, SRC.INFO.VP, VERSION.HDMI, VERSION.FRC, PKG.DATE, PKG.VERSION]

- id: serial_number
  label: Serial Number
  kind: query
  command: "SERIAL.NUMBER?"
  numeric_code: 2303
  params: []

- id: model_id
  label: Model ID
  kind: query
  command: "MODEL.ID?"
  numeric_code: 2306
  params: []
  notes: "Returns e.g. \"QE4050\"."

- id: model_series
  label: Model Series
  kind: query
  command: "MODEL.SERIES?"
  numeric_code: 2316
  params: []
  notes: "Always returns \"QE Series\" for this product."

- id: help
  label: Help
  kind: query
  command: "HELP({mode})?"
  numeric_code: 2300
  params:
    - name: mode
      type: enum
      values: [FIRST, NEXT]
      description: "Or pass a command name to get help on that command."
  notes: "HELP(FIRST)? to start; HELP(NEXT)? until ^NAK. Or HELP(\"OSD.STATUS\")? for single command."

- id: system_state
  label: System State
  kind: query
  command: "SYSTEM.STATE?"
  numeric_code: 2310
  params: []
  notes: "Returns STANDBY / POWERING.ON / ON / POWERING.DOWN / BACKLIGHT.OFF / FAULT."

- id: save_diagnostics
  label: Save Diagnostics
  kind: action
  command: "SAVE.DIAGNOSTICS({location})"
  numeric_code: 2314
  params:
    - name: location
      type: enum
      values: [USB]

- id: clone_settings
  label: Save and Restore Settings
  kind: action
  command: "CLONE.SETTINGS({operation}, {location})"
  numeric_code: 2315
  params:
    - name: operation
      type: enum
      values: [COPY, PASTE]
    - name: location
      type: enum
      values: [USB]

- id: reset
  label: Factory Reset
  kind: action
  command: "RESET({level})"
  numeric_code: 2400
  params:
    - name: level
      type: enum
      values: [USER, FACTORY1]
  notes: "FACTORY1 also resets EDID customizations, network settings, presets."

- id: system_reboot
  label: Reboot
  kind: action
  command: "SYSTEM.REBOOT"
  numeric_code: 2402
  params: []
  notes: "Forces system restart."
```

## Feedbacks
```yaml
# Response syntax: OPCODE[(modifiers)]:VALUE [TERM]   (':' operator = response to =?# + -)
# Error responses: OPCODE!ERR N   where N = 1..6
#   1 = Invalid syntax
#   2 = Reserved for future use
#   3 = Command not recognized
#   4 = Invalid modifier
#   5 = Invalid operands
#   6 = Invalid operator
# ACK/NAK for execute actions: OPCODE[(modifiers)]@ACK | OPCODE[(modifiers)]^NAK
# Termination matches the request terminator ([CR], [LF], or ';').
# Responses are always UPPERCASE regardless of request case; whitespace normalized to single space.

- id: ack
  type: literal
  syntax: "{OPCODE}@ACK"
  meaning: "Execute command accepted"

- id: nak
  type: literal
  syntax: "{OPCODE}^NAK"
  meaning: "Execute command received but cannot be processed at this time"

- id: err
  type: enum
  syntax: "{OPCODE}!ERR {code}"
  values: [1, 2, 3, 4, 5, 6]
  meaning: "Failure response with error code"

- id: value_response
  type: literal
  syntax: "{OPCODE}[(modifiers)]:{value}"
  meaning: "Response to = ? # + - operators"
```

## Variables
```yaml
# Settable parameters exposed via the = operator and readable via ? or #.
# One entry per stateful parameter that is not a discrete action.
# Full operand/range details live on each Action entry above; this section
# lists the canonical writable variables.

variables:
  - name: brightness
    type: integer
    range: 0-100
  - name: contrast
    type: integer
    range: 0-100
  - name: color
    type: integer
    range: 0-100
  - name: tint
    type: integer
    range: 0-100
  - name: sharpness
    type: integer
    range: 0-100
  - name: audio_volume
    type: integer
    range: 0-100
  - name: audio_balance
    type: integer
    range: 0-100
  - name: audio_bass
    type: integer
    range: 0-100
  - name: audio_treble
    type: integer
    range: 0-100
  - name: backlight_intensity
    type: integer
    range: 1-100
  - name: overscan
    type: integer
    range: 0-20
  - name: pan_x
    type: integer
    range: -1000 to 1000
  - name: pan_y
    type: integer
    range: -1000 to 1000
  - name: power_on_delay
    type: number
    range: 0.0-10.0
  - name: ir_code
    type: integer
    range: 0-65535
# UNRESOLVED: full enum-valued variables (aspect, gamma, timezone, etc.) intentionally
# listed as Action params rather than duplicated here; see Actions section.
```

## Events
```yaml
# UNRESOLVED: device can send email notifications (NETWORK.SMTP) on the events
# POWER.STATE.CHANGED, ERROR.OCCURRED, SOURCE.DETECTED, SOURCE.LOST, SOURCE.SELECTED,
# but a protocol for receiving unsolicited events over the RS-232/TCP/UDP control
# channel is NOT documented in the source. Notifications are SMTP-only.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for:
  - reset                   # FACTORY1 wipes EDID, network, presets
  - system_reboot           # forces restart
  - firmware_update         # START triggers firmware flow
  - display_power           # power state change
  - edid_timing             # UPDATE modifier applies EDID changes
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Available-in-Standby column in source table lists which commands are accepted
# while the display is in STANDBY; see Notes.
```

## Notes
The command set is shared across RS-232, USB-B, LAN (TCP), and LAN (UDP) — all use the same ASCII protocol on port 57 for IP paths. Termination characters are [CR] (0x0D), [LF] (0x0A), or `;`. Numeric command codes (e.g. 200=BRIGHTNESS) are documented alongside named codes — either form may be sent. Multiple modifiers/operands are separated by commas, spaces, or both; responses always use single spaces. Commands are case-insensitive; responses are always uppercase.

The device supports 4 zones (ZONE.1–ZONE.4) with CURRENT/ALL.INPUT/ALL/ALL.ZONE modifiers on most image/audio commands. Several commands (NETWORK params) accept the STATIC modifier for writes only and omit it for reads.

UDP note from source: most UDP terminal programs won't auto-append [CR], so hex-encoded commands (e.g. `444953504C41592E504F5745523D310D` for `DISPLAY.POWER=1[CR]`) are commonly used. Tera Term used for TCP testing ("Other" service = raw TCP, no Telnet/SSH). Hercules used for UDP testing.

Standby availability: source "Available in Standby" column marks which commands are accepted in STANDBY — power/network/schedule/IR/SMTP/hostname commands are; most image/audio commands are not.

<!-- UNRESOLVED: TCP/Telnet-specific behavior (keepalive, echo suppression) not documented -->
<!-- UNRESOLVED: authentication for any networked control path not documented -->
<!-- UNRESOLVED: firmware update packet payload format (PACKET operand) partial details only -->
<!-- UNRESOLVED: KEY command numeric values 4, 7, 8, 10, 11, 16, 271-285 marked "Not used" in source -->
```

Source have 110 command rows. Spec now enumerate all of them verbatim with `command:` payloads, modifiers as params, operators in notes. Preserved transport/summary/traits structure; extended Actions from empty placeholder to full coverage. Marked STANDBY-availability + safety items. Events still UNRESOLVED (control-channel event protocol not documented — only SMTP).

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/p1wfdp10/020-1321-01a_qe-series-rs232-user-manual-wm.pdf
retrieved_at: 2026-07-17T17:20:56.388Z
last_checked_at: 2026-07-22T00:39:35.973Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:39:35.973Z
matched_actions: 110
action_count: 110
confidence: medium
summary: "All 110 spec actions map 1:1 to the source RS232 Codes table rows with exact numeric codes, opcodes, and matching enum/range shapes; transport values confirmed. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB-B and OPS serial paths not independently documented; commands appear identical to RS-232 set"
- "events - device sends unsolicited email notifications per NETWORK.SMTP"
- "full enum-valued variables (aspect, gamma, timezone, etc.) intentionally"
- "device can send email notifications (NETWORK.SMTP) on the events"
- "no multi-step macro sequences documented"
- "no explicit safety warnings or interlock procedures in source."
- "TCP/Telnet-specific behavior (keepalive, echo suppression) not documented"
- "authentication for any networked control path not documented"
- "firmware update packet payload format (PACKET operand) partial details only"
- "KEY command numeric values 4, 7, 8, 10, 11, 16, 271-285 marked \"Not used\" in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
