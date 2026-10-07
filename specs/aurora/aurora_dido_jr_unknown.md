---
spec_id: admin/aurora-dido-jr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Multimedia DIDO Jr. Control Spec"
manufacturer: Aurora
model_family: "DIDO Jr."
aliases: []
compatible_with:
  manufacturers:
    - Aurora
    - "Aurora Multimedia"
  models:
    - "DIDO Jr."
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - markertek.com
source_urls:
  - https://www.markertek.com/Attachments/Manuals/AURORA/DIDOJR-Manual.pdf
retrieved_at: 2026-07-25T19:27:35.019Z
last_checked_at: 2026-10-07T13:35:08.599Z
generated_at: 2026-10-07T13:35:08.599Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the RS-232 protocol chapter only; no voltage/power specs, no mechanical drawings, no full firmware compatibility matrix. Marketing/connector specs beyond the control port are out of scope."
  - "allowed port range.\""
  - "filename constraints.\""
  - "per-field enum/value tables for each query response are not exhaustively tabulated in source beyond the INFO example."
  - "exact percent range bounds for OSDTRANS / PIPTRANS not stated (source: \"value in percent\")."
  - "source contains no asynchronous/event-push definitions."
  - "no macro sequences documented in source."
  - "discrete baud-rate steps within 2400–115200 not enumerated (only the range and 115200 default are stated)."
  - "exact percent bounds for OSDTRANS / PIPTRANS not stated."
  - "per-query response value tables (other than INFO) not exhaustively tabulated in source."
  - "flow control not explicitly stated by \"8N1\"."
  - "no firmware version compatibility range stated (single INFO sample reports v1.11 / Rev 8649 / 2005-08-29)."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:35:08.599Z
  matched_actions: 122
  action_count: 122
  confidence: medium
  summary: "All 122 action units match source commands, transport supported, source catalogue fully covered. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Aurora Multimedia DIDO Jr. Control Spec

## Summary
The DIDO Jr. is an Aurora Multimedia video-wall / multi-window image processor and scaler (DVI/RGB/S-Video inputs, scaled DVI/RGB output). This spec covers its RS-232 control protocol (also carried over RS-485 for unit chaining). The device is addressable (000–254, with 255/`***` as broadcast) so multiple units can share one serial bus. Commands use an ASCII `!`/`?`/`~` prefixed format terminated by `<CR>` (0x0D).

<!-- UNRESOLVED: source is the RS-232 protocol chapter only; no voltage/power specs, no mechanical drawings, no full firmware compatibility matrix. Marketing/connector specs beyond the control port are out of scope. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200      # source: "115k 8N1 (Default)"; selectable 2400-115k
  baud_rate_selectable: UNRESOLVED  # source states only the range 2400-115k, not the discrete steps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # flow control not explicitly stated by "8N1"
  connector: "9-pin to 6-pin mini-DIN RS-232 NULL cable (manufacturer-supplied)"
  pinout_rs232:
    1: Ground
    3: TX
    5: RX
  pinout_rs485:          # used for looping multiple units
    1: Ground
    4: "485+"
    6: "485-"
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no login/password/auth procedure in source)
```

**Command format (verbatim from source):** `[Prefix][Address][Command][n][m][<CR>]`
- Prefix: `!` = command, `?` = query, `~` = response
- Address: 3 ASCII digits `000`–`254`, or `***` / `255` for broadcast
- `<CR>` = `0x0D` (decimal 13)
- Responses are always UPPERCASE; commands/queries are not case-sensitive.
- `{addr}` in command templates below = the 3-digit target unit address (or `***` for broadcast).

## Traits
```yaml
traits:
  - powerable    # inferred: POWERON / POWEROFF / KEY_POWER commands present
  - routable     # inferred: WINDOW n m, input-select (KEY_A_DVI / KEY_A_RGB / KEY_A_VIDEO), SWAPIN / SWAPWIN
  - queryable    # inferred: 25 documented query commands
  - levelable    # inferred: BRIGHTNESS / CONTRAST / SATURATION / HUE / position / size continuous params (0-1000)
```

## Actions
```yaml
# Command template: "!{addr}<COMMAND>[ <n>][ <m>]<CR>" - see Transport for {addr} and <CR>.
# kind: action  = a `!` command;  kind: query = a `?` query (response is a `~` line, see Feedbacks).
# Entries marked "Not Available" are documented command rows the source explicitly flags as
# non-functional on the DIDO Jr.; the opcode is recognized by the protocol but performs no operation.

# --- IR-equivalent key commands (KEY_*) ---
- id: key_p1
  label: Preset 1
  kind: action
  command: "!{addr}KEY_P1<CR>"
  params: []
- id: key_p2
  label: Preset 2
  kind: action
  command: "!{addr}KEY_P2<CR>"
  params: []
- id: key_p3
  label: Preset 3
  kind: action
  command: "!{addr}KEY_P3<CR>"
  params: []
- id: key_p4
  label: Preset 4
  kind: action
  command: "!{addr}KEY_P4<CR>"
  params: []
- id: key_num0
  label: Number 0
  kind: action
  command: "!{addr}KEY_NUM0<CR>"
  params: []
- id: key_num1
  label: Number 1
  kind: action
  command: "!{addr}KEY_NUM1<CR>"
  params: []
- id: key_num2
  label: Number 2
  kind: action
  command: "!{addr}KEY_NUM2<CR>"
  params: []
- id: key_num3
  label: Number 3
  kind: action
  command: "!{addr}KEY_NUM3<CR>"
  params: []
- id: key_num4
  label: Number 4
  kind: action
  command: "!{addr}KEY_NUM4<CR>"
  params: []
- id: key_num5
  label: Number 5
  kind: action
  command: "!{addr}KEY_NUM5<CR>"
  params: []
- id: key_num6
  label: Number 6
  kind: action
  command: "!{addr}KEY_NUM6<CR>"
  params: []
- id: key_num7
  label: Number 7
  kind: action
  command: "!{addr}KEY_NUM7<CR>"
  params: []
- id: key_num8
  label: Number 8
  kind: action
  command: "!{addr}KEY_NUM8<CR>"
  params: []
- id: key_num9
  label: Number 9
  kind: action
  command: "!{addr}KEY_NUM9<CR>"
  params: []
- id: key_left
  label: Left Arrow
  kind: action
  command: "!{addr}KEY_LEFT<CR>"
  params: []
- id: key_right
  label: Right Arrow
  kind: action
  command: "!{addr}KEY_RIGHT<CR>"
  params: []
- id: key_up
  label: Up Arrow
  kind: action
  command: "!{addr}KEY_UP<CR>"
  params: []
- id: key_down
  label: Down Arrow
  kind: action
  command: "!{addr}KEY_DOWN<CR>"
  params: []
- id: key_sel
  label: Select
  kind: action
  command: "!{addr}KEY_SEL<CR>"
  params: []
- id: key_menu
  label: Menu
  kind: action
  command: "!{addr}KEY_MENU<CR>"
  params: []
- id: key_exit
  label: Exit
  kind: action
  command: "!{addr}KEY_EXIT<CR>"
  params: []
- id: key_power
  label: Power Toggle
  kind: action
  command: "!{addr}KEY_POWER<CR>"
  params: []
- id: key_mute
  label: Mute (Not Available)
  kind: action
  command: "!{addr}KEY_MUTE<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: key_info
  label: Information
  kind: action
  command: "!{addr}KEY_INFO<CR>"
  params: []
- id: key_rotate
  label: Rotate
  kind: action
  command: "!{addr}KEY_ROTATE<CR>"
  params: []
- id: key_zoom
  label: Zoom
  kind: action
  command: "!{addr}KEY_ZOOM<CR>"
  params: []
- id: key_crop
  label: Crop
  kind: action
  command: "!{addr}KEY_CROP<CR>"
  params: []
- id: key_pos
  label: Position
  kind: action
  command: "!{addr}KEY_POS<CR>"
  params: []
- id: key_size
  label: Size
  kind: action
  command: "!{addr}KEY_SIZE<CR>"
  params: []
- id: key_a_dvi
  label: DVI Input (Channel A)
  kind: action
  command: "!{addr}KEY_A_DVI<CR>"
  params: []
- id: key_a_rgb
  label: RGB Input (Channel A)
  kind: action
  command: "!{addr}KEY_A_RGB<CR>"
  params: []
- id: key_a_video
  label: Video/SVideo Input (Channel A)
  kind: action
  command: "!{addr}KEY_A_VIDEO<CR>"
  params: []
- id: key_b_dvi
  label: DVI Input (Channel B) - Not Available
  kind: action
  command: "!{addr}KEY_B_DVI<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: key_b_rgb
  label: RGB Input (Channel B) - Not Available
  kind: action
  command: "!{addr}KEY_B_RGB<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: key_b_video
  label: Video Input (Channel B) - Not Available
  kind: action
  command: "!{addr}KEY_B_VIDEO<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: key_single
  label: Single Mode
  kind: action
  command: "!{addr}KEY_SINGLE<CR>"
  params: []
- id: key_dual
  label: Dual Mode
  kind: action
  command: "!{addr}KEY_DUAL<CR>"
  params: []
- id: key_tri
  label: Triple Mode - Not Available
  kind: action
  command: "!{addr}KEY_TRI<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: key_quad
  label: Quad Mode - Not Available
  kind: action
  command: "!{addr}KEY_QUAD<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: key_freeze
  label: Freeze
  kind: action
  command: "!{addr}KEY_FREEZE<CR>"
  params: []
- id: key_swap
  label: Swap Window Sources
  kind: action
  command: "!{addr}KEY_SWAP<CR>"
  params: []

# --- Setup / system commands ---
- id: setdefault
  label: Factory Defaults
  kind: action
  command: "!{addr}SETDEFAULT<CR>"
  params: []
- id: preset_recall
  label: Recall Preset
  kind: action
  command: "!{addr}PRESET {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Preset slot, 00-99"
- id: preset_store
  label: Store Preset
  kind: action
  command: "!{addr}S_PRESET {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Preset slot, 00-99"
- id: rsaddr_set
  label: Set Unit Address
  kind: action
  command: "!{addr}RSADDR {n}<CR>"
  params:
    - name: n
      type: string
      description: "Unit address, 000-254 (or '***'/255 for broadcast)"
- id: window_select
  label: Select Window Input
  kind: action
  command: "!{addr}WINDOW {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: string
      description: "Input source - DVI_A, RGB_A, or SVIDEO_A"
- id: rotate_output
  label: Rotate Output
  kind: action
  command: "!{addr}ROTATE {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Rotation index 0-3; degrees = 90 × n"
- id: layout_set
  label: Set Layout
  kind: action
  command: "!{addr}LAYOUT {m}<CR>"
  params:
    - name: m
      type: string
      description: "Layout - single, dual, pip, or sbs"
- id: outformat_set
  label: Set Output Resolution
  kind: action
  command: "!{addr}OUTFORMAT {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Output resolution index 0-32 (see resolution table in Notes)"
- id: hposit_set
  label: Set Horizontal Position
  kind: action
  command: "!{addr}HPOSIT {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Position value, 0-1000"
- id: vposit_set
  label: Set Vertical Position
  kind: action
  command: "!{addr}VPOSIT {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Position value, 0-1000"
- id: hsize_set
  label: Set Horizontal Size
  kind: action
  command: "!{addr}HSIZE {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Size value, 0-1000"
- id: vsize_set
  label: Set Vertical Size
  kind: action
  command: "!{addr}VSIZE {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Size value, 0-1000"
- id: swapin
  label: Swap Inputs (Window 1 and 2)
  kind: action
  command: "!{addr}SWAPIN<CR>"
  params: []
- id: reconfig
  label: Reconfigure DIDO Jr.
  kind: action
  command: "!{addr}RECONFIG<CR>"
  params: []
- id: hpositpip_set
  label: Set PIP Horizontal Position
  kind: action
  command: "!{addr}HPOSITPIP {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Position value, 0-1000"
- id: vpositpip_set
  label: Set PIP Vertical Position
  kind: action
  command: "!{addr}VPOSITPIP {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Position value, 0-1000"
- id: hsizepip_set
  label: Set PIP Horizontal Size
  kind: action
  command: "!{addr}HSIZEPIP {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Size value, 0-1000"
- id: vsizepip_set
  label: Set PIP Vertical Size
  kind: action
  command: "!{addr}VSIZEPIP {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Size value, 0-1000"
- id: rgbsync_set
  label: Set RGB/YPbPr Sync Type
  kind: action
  command: "!{addr}RGBSYNC {n} {m}<CR>"
  params:
    - name: n
      type: string
      description: "Channel - source documents only 'A'"
    - name: m
      type: string
      description: "Sync type - HV, SOG, or YPRPB"
- id: swapwin
  label: Swap Windows (sbs / pip only)
  kind: action
  command: "!{addr}SWAPWIN<CR>"
  params: []
- id: poweron
  label: Power On
  kind: action
  command: "!{addr}POWERON<CR>"
  params: []
- id: poweroff
  label: Power Off
  kind: action
  command: "!{addr}POWEROFF<CR>"
  params: []

# --- Audio commands (all flagged 'Not Available' in source for DIDO Jr.) ---
- id: muteon
  label: Mute On - Not Available
  kind: action
  command: "!{addr}MUTEON<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: muteoff
  label: Mute Off - Not Available
  kind: action
  command: "!{addr}MUTEOFF<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: volume_up
  label: Volume Up - Not Available
  kind: action
  command: "!{addr}VOLUME+<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: volume_down
  label: Volume Down - Not Available
  kind: action
  command: "!{addr}VOLUME-<CR>"
  params: []
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: volume_set
  label: Set Volume - Not Available
  kind: action
  command: "!{addr}VOLUME {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Value in percent"
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: audioinput_set
  label: Set Audio Input - Not Available
  kind: action
  command: "!{addr}AUDIOINPUT {n}<CR>"
  params:
    - name: n
      type: string
      description: "SOUND_A, SOUND_B, SPDIF_A, or SPDIF_B"
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: audiooutput_set
  label: Set Audio Output - Not Available
  kind: action
  command: "!{addr}AUDIOOUTPUT {n}<CR>"
  params:
    - name: n
      type: string
      description: "ANALOG or SPDIF"
  description: "Source marks this function 'Not Available' for DIDO Jr."
- id: audiodelay_set
  label: Set Audio Delay - Not Available
  kind: action
  command: "!{addr}AUDIODELAY {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Value in percent"
  description: "Source marks this function 'Not Available' for DIDO Jr."

# --- OSD / display / image commands ---
- id: osdtrans_set
  label: Set OSD Translucency
  kind: action
  command: "!{addr}OSDTRANS {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Value in percent"
- id: piptrans_set
  label: Set PIP Translucency
  kind: action
  command: "!{addr}PIPTRANS {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Value in percent"
- id: adccalibr
  label: A/D RGB Auto Calibration
  kind: action
  command: "!{addr}ADCCALIBR<CR>"
  params: []
- id: freeze_set
  label: Set Output Freeze
  kind: action
  command: "!{addr}FREEZE {n}<CR>"
  params:
    - name: n
      type: integer
      description: "0 = off, 1 = on"
- id: brightness_set
  label: Set Brightness
  kind: action
  command: "!{addr}BRIGHTNESS {n}<CR>"
  params:
    - name: n
      type: integer
      description: "0-1000"
- id: contrast_set
  label: Set Contrast
  kind: action
  command: "!{addr}CONTRAST {n}<CR>"
  params:
    - name: n
      type: integer
      description: "0-1000"
- id: saturation_set
  label: Set Saturation
  kind: action
  command: "!{addr}SATURATION {n}<CR>"
  params:
    - name: n
      type: integer
      description: "0-1000"
- id: hue_set
  label: Set Hue
  kind: action
  command: "!{addr}HUE {n}<CR>"
  params:
    - name: n
      type: integer
      description: "0-1000"
- id: zoom_set
  label: Set Zoom
  kind: action
  command: "!{addr}ZOOM {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Zoom value, 0-1000"
- id: cropleft_set
  label: Set Crop Left
  kind: action
  command: "!{addr}CROPLEFT {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Pixels"
- id: cropright_set
  label: Set Crop Right
  kind: action
  command: "!{addr}CROPRIGHT {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Pixels"
- id: croptop_set
  label: Set Crop Top
  kind: action
  command: "!{addr}CROPTOP {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Pixels"
- id: cropbottom_set
  label: Set Crop Bottom
  kind: action
  command: "!{addr}CROPBOTTOM {n} {m}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
    - name: m
      type: integer
      description: "Pixels"
- id: cropsave
  label: Save Crop Settings
  kind: action
  command: "!{addr}CROPSAVE {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: cropreset
  label: Reset Crop Settings
  kind: action
  command: "!{addr}CROPRESET {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: osdon
  label: OSD On
  kind: action
  command: "!{addr}OSDON<CR>"
  params: []
- id: osdoff
  label: OSD Off
  kind: action
  command: "!{addr}OSDOFF<CR>"
  params: []
- id: verflipon
  label: Vertical Flip On
  kind: action
  command: "!{addr}VERFLIPON<CR>"
  params: []
- id: verflipoff
  label: Vertical Flip Off
  kind: action
  command: "!{addr}VERFLIPOFF<CR>"
  params: []
- id: horflipon
  label: Horizontal Flip On
  kind: action
  command: "!{addr}HORFLIPON<CR>"
  params: []
- id: horflipoff
  label: Horizontal Flip Off
  kind: action
  command: "!{addr}HORFLIPOFF<CR>"
  params: []
  description: "Source function-column has a typo ('HORIZONTAL FLIP ON'); mnemonic HORFLIPOFF = flip off."
- id: stack_set
  label: Set Stack Direction
  kind: action
  command: "!{addr}STACK {n}<CR>"
  params:
    - name: n
      type: string
      description: "UD (up/down) or LR (left/right)"

# --- Query commands (kind: query). Send with '?' prefix; response '~' line (see Feedbacks). ---
- id: rsaddr_query
  label: Query Address
  kind: query
  command: "?{addr}RSADDR<CR>"
  params: []
- id: outformat_query
  label: Query Output Format
  kind: query
  command: "?{addr}OUTFORMAT<CR>"
  params: []
- id: hposit_query
  label: Query Horizontal Position
  kind: query
  command: "?{addr}HPOSIT {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: vposit_query
  label: Query Vertical Position
  kind: query
  command: "?{addr}VPOSIT {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: hsize_query
  label: Query Horizontal Size
  kind: query
  command: "?{addr}HSIZE {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: vsize_query
  label: Query Vertical Size
  kind: query
  command: "?{addr}VSIZE {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: hpositpip_query
  label: Query PIP Horizontal Position
  kind: query
  command: "?{addr}HPOSITPIP<CR>"
  params: []
- id: vpositpip_query
  label: Query PIP Vertical Position
  kind: query
  command: "?{addr}VPOSITPIP<CR>"
  params: []
- id: hsizepip_query
  label: Query PIP Horizontal Size
  kind: query
  command: "?{addr}HSIZEPIP<CR>"
  params: []
- id: vsizepip_query
  label: Query PIP Vertical Size
  kind: query
  command: "?{addr}VSIZEPIP<CR>"
  params: []
- id: ver_query
  label: Query Firmware Version
  kind: query
  command: "?{addr}VER<CR>"
  params: []
- id: preset_query
  label: Query Current Preset
  kind: query
  command: "?{addr}PRESET<CR>"
  params: []
- id: volume_query
  label: Query Volume - Not Available
  kind: query
  command: "?{addr}VOLUME<CR>"
  params: []
  description: "Source marks this query 'Not available'."
- id: brightness_query
  label: Query Brightness
  kind: query
  command: "?{addr}BRIGHTNESS<CR>"
  params: []
- id: contrast_query
  label: Query Contrast
  kind: query
  command: "?{addr}CONTRAST<CR>"
  params: []
- id: saturation_query
  label: Query Saturation
  kind: query
  command: "?{addr}SATURATION<CR>"
  params: []
- id: hue_query
  label: Query Hue
  kind: query
  command: "?{addr}HUE<CR>"
  params: []
- id: zoom_query
  label: Query Zoom
  kind: query
  command: "?{addr}ZOOM {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: info_query
  label: Query Full Info
  kind: query
  command: "?{addr}INFO<CR>"
  params: []
- id: cropleft_query
  label: Query Crop Left Pixels
  kind: query
  command: "?{addr}CROPLEFT {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: cropright_query
  label: Query Crop Right Pixels
  kind: query
  command: "?{addr}CROPRIGHT {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: croptop_query
  label: Query Crop Top Pixels
  kind: query
  command: "?{addr}CROPTOP {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: cropbottom_query
  label: Query Crop Bottom Pixels
  kind: query
  command: "?{addr}CROPBOTTOM {n}<CR>"
  params:
    - name: n
      type: integer
      description: "Window number, 1 or 2"
- id: flip_query
  label: Query Flip Mode
  kind: query
  command: "?{addr}FLIP<CR>"
  params: []
- id: stack_query
  label: Query Stack Mode
  kind: query
  command: "?{addr}STACK<CR>"
  params: []

# --- Documented PC utility commands; run on the PC, not as ASCII device commands. ---
- id: firmware_update
  label: Update Firmware
  kind: action
  command: "DIDOldr.exe {port} {firmware_file}"
  params:
    - name: port
      type: integer
      description: "COM port used to program the DIDO Jr.; source examples use 1 and 2. UNRESOLVED: allowed port range."
    - name: firmware_file
      type: string
      description: "Source: 'firmware (this file name can be anything such as DIDOJr040916.did)'."
  description: "PC firmware loader. Source examples: 'DIDOldr.exe 1 DIDO.did' and 'DIDOldr.exe 1 DIDOJr.did'. Requires baud rate 115k, unit address 0, settings backup, and firmware compatible with the hardware revision."
- id: clone_learn
  label: Download Clone Settings
  kind: action
  command: "CloneLdr.exe COM{port} /l {file_name}"
  params:
    - name: port
      type: integer
      description: "Source: 'COM[Port#]: serial port (such as 1 or 2) that is used for cloning.' UNRESOLVED: allowed port range."
    - name: file_name
      type: string
      description: "Source: 'File_Name.par: name of the file that will be used to store data from DIDO Jr.' UNRESOLVED: filename constraints."
  description: "PC clone utility. Source command: 'CloneLdr.exe COM[Port#] /l File_Name.par'. '/l: loading data from DIDO Jr. to the computer.'"
- id: clone_teach
  label: Upload Clone Settings
  kind: action
  command: "CloneLdr.exe COM{port} /s {file_name}"
  params:
    - name: port
      type: integer
      description: "Source: 'COM[Port#]: serial port (such as 1 or 2) that is used for cloning.' UNRESOLVED: allowed port range."
    - name: file_name
      type: string
      description: "Source: 'File_Name.par: name of the file that will be used to store data from DIDO Jr.' UNRESOLVED: filename constraints."
  description: "PC clone utility. Source command: 'CloneLdr.exe COM[Port#] /s File_Name.par'. '/s: sending data from computer to the DIDO Jr.'"
```

## Feedbacks
```yaml
# All responses are UPPERCASE, prefixed '~', terminated by <CR>.
- id: command_ack
  type: string
  description: "Acknowledgement returned after each command before the next may be sent."
  format: "~{addr} OK {string}<CR>"
- id: error
  type: string
  description: "Invalid-command reply. Source: emitted only when address is zero."
  format: "~ERROR<CR>"
- id: query_response
  type: string
  description: "Generic query echo/response - command mnemonic echoed with its variable value(s)."
  format: "~{addr}{COMMAND} {value}<CR>"
- id: info_response
  type: string
  description: "Multi-field status line returned by INFO query; '#'-prefixed fields, content varies by windows/sources/resolutions."
  example: "# Window: 1 # Input : DVI_B, SXGA 60Hz, 1280x1024 # Window: 2 # Input : RGB+HV, no signal # Mode : SbS # Rotate: No # Output: XGA 60Hz, 1024x768, DVI/RGB+HV, # DIDO Jr. address : 0 # Version: 1.11, Rev: 8649, Date: 29-Aug-2005"
  query_command: "?{addr}INFO<CR>"
# UNRESOLVED: per-field enum/value tables for each query response are not exhaustively tabulated in source beyond the INFO example.
```

## Variables
```yaml
# Settable continuous parameters. Each is written via a corresponding action above
# (e.g. brightness_set) and read via its query (e.g. brightness_query). Ranges from source:
- id: brightness
  type: integer
  range: [0, 1000]
- id: contrast
  type: integer
  range: [0, 1000]
- id: saturation
  type: integer
  range: [0, 1000]
- id: hue
  type: integer
  range: [0, 1000]
- id: window_position      # applies to HPOSIT/VPOSIT/HSIZE/VSIZE per window 1..2
  type: integer
  range: [0, 1000]
- id: pip_geometry         # applies to HPOSITPIP/VPOSITPIP/HSIZEPIP/VSIZEPIP
  type: integer
  range: [0, 1000]
- id: osd_translucency
  type: integer
  unit: percent
- id: pip_translucency
  type: integer
  unit: percent
# UNRESOLVED: exact percent range bounds for OSDTRANS / PIPTRANS not stated (source: "value in percent").
```

## Events
```yaml
# No unsolicited notifications documented; the device only responds to commands.
# UNRESOLVED: source contains no asynchronous/event-push definitions.
```

## Macros
```yaml
# No device-side command sequences documented. Firmware update and unit cloning are
# PC-side utilities (DIDOldr.exe / CloneLdr.exe), not DIDO Jr. command macros.
# UNRESOLVED: no macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - setdefault        # factory defaults reset
  - rsaddr_set        # changes bus addressing; can desync multi-unit control
  - preset_store      # overwrites a stored preset slot
interlocks:
  - id: rs485_termination
    description: "When chaining multiple units over RS-485, the LAST unit in the chain must have RS-485 Termination enabled."
  - id: firmware_update_preconditions
    description: "Firmware update requires baud rate 115200 and unit address 0; back up settings before updating."
  - id: firmware_update_recovery
    description: "If a firmware transfer is interrupted, cycle power on the DIDO Jr. and wait 30 seconds after re-applying power before restarting the transfer. A blank LCD during this state is normal."
  - id: command_pacing
    description: "Do not send the next command until the '~{addr} OK' acknowledgement is received. Preset load/save and source changes are the slowest operations and may cause subsequent commands to be ignored if sent too early."
  - id: usb_rs232_warning
    description: "Source advises against using a USB-to-RS-232 adapter for firmware update or cloning (may not work properly)."
# No electrical/voltage interlocks documented in this source excerpt.
```

## Notes
- **Device class:** multi-window video processor / scaler / video-wall controller. Inputs: 1× DVI-I (DVI-D + RGBHV/YPbPr) and 1× S-Video (4-pin mini-DIN). Output: scaled DVI/RGB.
- **Addressing:** every command embeds a 3-digit address (`000`–`254`, or `***`/`255` broadcast). `{addr}` in the command templates above is this 3-digit field. Set a unit's address with `RSADDR n` or via the on-device System Settings; the IR remote is also addressable to limit cross-talk between co-located DIDO Jr. units.
- **Wire format:** `<CR>` = `0x0D`. Responses are UPPERCASE; `!`/`?` are not case-sensitive.
- **Multi-unit chaining:** first unit talks RS-232 to the controller; its RS-485 (+/−/GND) loops in parallel to all other units' RS-485 ports. Aurora sells a "DIDO LOOP KIT" for this. Each chained unit needs a unique address (0, 1, 2, …) and the last unit needs termination enabled.
- **Output resolution table (`OUTFORMAT n`)** — verbatim from source:

  | n | resolution | n | resolution | n | resolution |
  |---|---|---|---|---|---|
  | 0 | VGA 60Hz | 11 | SXGA 60Hz | 22 | USER 02 |
  | 1 | VGA 72Hz | 12 | SXGA 75Hz | 23 | USER 03 |
  | 2 | VGA 75Hz | 13 | SXGA 85Hz | 24 | USER 04 |
  | 3 | SVGA 60Hz | 14 | WXGA 60Hz | 25 | USER 05 |
  | 4 | SVGA 72Hz | 15 | UXGA 60Hz | 26 | USER 06 |
  | 5 | SVGA 75Hz | 16 | WVGA 60Hz | 27 | USER 07 |
  | 6 | XGA 60Hz (806 px) | 17 | 480P | 28 | USER 08 |
  | 7 | XGA 60Hz (807 px) | 18 | 576P | 29 | USER 09 |
  | 8 | XGA 70Hz | 19 | 720P | 30 | USER 10 |
  | 9 | XGA 75Hz | 20 | 1080P | 31 | (unused) |
  | 10 | XGA 85Hz | 21 | USER 01 | 32 | (unused) |

- **`WINDOW n m` valid inputs (`m`):** `DVI_A`, `RGB_A`, `SVIDEO_A` (channel B inputs are documented but flagged Not Available on this model).
- **"Not Available" rows:** the source command table lists audio (MUTE/VOLUME/AUDIOINPUT/AUDIOOUTPUT/AUDIODELAY) and channel-B input commands and explicitly marks them "Not Available" for the DIDO Jr. They are retained here as documented protocol opcodes; treat as no-ops on this hardware.
- **Numeric responses:** source notes that multi-digit ASCII decimal responses must be converted to a true hexadecimal value for bit-field decoding (e.g. ASCII `13` → `0x0D`).
- **Firmware compatibility:** check the serial-number batch prefix (`bbbb-SNxxxx`) against the firmware's supported hardware revision before flashing; some features depend on model/batch.

<!-- UNRESOLVED: discrete baud-rate steps within 2400–115200 not enumerated (only the range and 115200 default are stated). -->
<!-- UNRESOLVED: exact percent bounds for OSDTRANS / PIPTRANS not stated. -->
<!-- UNRESOLVED: per-query response value tables (other than INFO) not exhaustively tabulated in source. -->
<!-- UNRESOLVED: flow control not explicitly stated by "8N1". -->
<!-- UNRESOLVED: no firmware version compatibility range stated (single INFO sample reports v1.11 / Rev 8649 / 2005-08-29). -->

## Provenance

```yaml
source_domains:
  - markertek.com
source_urls:
  - https://www.markertek.com/Attachments/Manuals/AURORA/DIDOJR-Manual.pdf
retrieved_at: 2026-07-25T19:27:35.019Z
last_checked_at: 2026-10-07T13:35:08.599Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:35:08.599Z
matched_actions: 122
action_count: 122
confidence: medium
summary: "All 122 action units match source commands, transport supported, source catalogue fully covered. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the RS-232 protocol chapter only; no voltage/power specs, no mechanical drawings, no full firmware compatibility matrix. Marketing/connector specs beyond the control port are out of scope."
- "allowed port range.\""
- "filename constraints.\""
- "per-field enum/value tables for each query response are not exhaustively tabulated in source beyond the INFO example."
- "exact percent range bounds for OSDTRANS / PIPTRANS not stated (source: \"value in percent\")."
- "source contains no asynchronous/event-push definitions."
- "no macro sequences documented in source."
- "discrete baud-rate steps within 2400–115200 not enumerated (only the range and 115200 default are stated)."
- "exact percent bounds for OSDTRANS / PIPTRANS not stated."
- "per-query response value tables (other than INFO) not exhaustively tabulated in source."
- "flow control not explicitly stated by \"8N1\"."
- "no firmware version compatibility range stated (single INFO sample reports v1.11 / Rev 8649 / 2005-08-29)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
