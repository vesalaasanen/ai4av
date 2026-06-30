---
spec_id: admin/sharpnec-p435ir
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P435 Ir Control Spec"
manufacturer: Sharp/NEC
model_family: "P435 Ir"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "P435 Ir"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:23:52.465Z
last_checked_at: 2026-06-18T08:59:02.935Z
generated_at: 2026-06-18T08:59:02.935Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value map, aspect value map, eco-mode value map, base-model-type value map, and sub-input value map are referenced in an \"Appendix: Supplementary Information by Command\" that is NOT included in the provided source text."
  - "flow control not stated; \"Full duplex\" communication mode stated in source"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no multi-step command sequences."
  - "source contains no explicit safety warnings or interlock"
  - "Appendix value maps (input terminal, aspect, eco mode, base model type, sub-input) not in source."
  - "firmware version compatibility not stated in source."
  - "default serial baud rate not stated (5 rates supported)."
  - "serial flow control not stated (only \"full duplex\" comm mode stated)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:59:02.935Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P435 Ir Control Spec

## Summary
Sharp/NEC projector (P435 Ir) controlled via a binary command protocol over RS-232C serial or wired/wireless LAN (TCP). The manual documents 53 distinct control and query commands covering power, input switching, mute, picture/volume/aspect adjustment, lens control and memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/error information requests.

<!-- UNRESOLVED: input-terminal value map, aspect value map, eco-mode value map, base-model-type value map, and sub-input value map are referenced in an "Appendix: Supplementary Information by Command" that is NOT included in the provided source text. -->

## Transport
```yaml
# Source documents BOTH serial (RS-232C) and LAN (TCP) connection methods.
# All command payloads are identical binary frames regardless of transport.
protocols:
  - serial
  - tcp
serial:
  # Source lists five selectable rates; it does NOT state a default.
  baud_rate: null  # supported: 4800, 9600, 19200, 38400, 115200 bps (auto-switchable; default not stated in source)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; "Full duplex" communication mode stated in source
addressing:
  port: 7142  # "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (POWER ON / POWER OFF commands present)
# - routable        (INPUT SW CHANGE command present)
# - queryable       (extensive *REQUEST command set present)
# - levelable       (PICTURE ADJUST brightness/contrast/color/hue/sharpness + VOLUME ADJUST present)
traits:
  - powerable  # inferred from power on/off command examples
  - routable   # inferred from input switch command examples
  - queryable  # inferred from query command examples
  - levelable  # inferred from picture/volume adjustment command examples
```

## Actions
```yaml
# ── Framing & checksum (applies to EVERY action below) ────────────────────────
# Commands are sent as a hex byte frame. The trailing <CKS> byte is a checksum
# computed as the low-order one byte of the sum of ALL preceding bytes in the
# frame (see source "Example of checksum calculation"). Variable fields are
# shown as <DATA##>. <ID1> = control ID, <ID2> = model code (appear in responses,
# not in command bytes). Each entry below carries the VERBATIM command template
# from the source. Computed <CKS> fields are noted in params/notes.
#
# Successful response prefix byte encodes the group: 22h/23h/21h = success for
# command groups 02h/03h/01h respectively; A2h/A3h/A1h/A0h = error response with
# <ERR1> <ERR2>. See Feedbacks for response/error detail.

# ── 0xx system / power / input ────────────────────────────────────────────────
- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command can be accepted."

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off power (incl. cooling time), no other command can be accepted."

- id: cmd_018_input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video). Full value list in Appendix 'Supplementary Information by Command' - not included in provided source."
  notes: "Response DATA01 FFh = ended with error (no signal switch made)."

# ── 02x mute ──────────────────────────────────────────────────────────────────
- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input terminal switch or video signal switch."

- id: cmd_021_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input terminal switch, video signal switch, or volume adjustment."

- id: cmd_023_sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input terminal switch or video signal switch."

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# ── 030-x adjust ──────────────────────────────────────────────────────────────
- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Result DATA01+DATA02: 0000h=success, else=error."

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect. Full value list in Appendix 'Supplementary Information by Command' - not included in provided source."

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte: 96h (with DATA02=FFh) = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte: FFh (with DATA01=96h) = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# ── 037-x information requests ────────────────────────────────────────────────
- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

- id: cmd_037_3_filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), in seconds. -1 if undefined."

- id: cmd_037_4_lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
  notes: "Example (Lamp 1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if replacement deadline exceeded."

- id: cmd_037_6_carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# ── 05x remote / shutter / lens ───────────────────────────────────────────────
- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Key list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed keys)"
  notes: "Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01 FFh = error."

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=Drive 1s plus, 02h=Drive 0.5s plus, 03h=Drive 0.25s plus, 7Fh=Drive plus, 81h=Drive minus, FDh=Drive 0.25s minus, FEh=Drive 0.5s minus, FFh=Drive 1s minus"
  notes: "Send 00h to stop after 7Fh/81h. Lens can be controlled without stop by reissuing same command while driving."

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target (see LENS CONTROL target values)"
  notes: "Returns upper/lower limit and current value (16-bit each)."

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: FFh=Stop"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "If DATA01=FFh (Stop), mode and value are not referenced."

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile number set via LENS PROFILE SET (053-10)."

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) - each 0=Stop, 1=During operation."

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# ── 06x-07x gain / status requests ────────────────────────────────────────────
- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, limits, default, current, adjustment widths."

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function, profile/clock/sleep-timer function."

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and onscreen display states."

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns mirror/lens cover status: 00h=Normal (opened), 01h=Cover closed."

# ── 07x-09x control / requests ────────────────────────────────────────────────
- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (or Light mode / Lamp mode depending on model). Value map in Appendix - not in provided source."

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_pbyp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Value set for eco mode. Value map in Appendix 'Supplementary Information by Command' - not included in provided source."

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01-DATA16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated by trailing 00h)"

- id: cmd_098_198_pip_pbyp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value. MODE: 00h=PIP,01h=PbP. POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. Sub-input values in Appendix - not in provided source."

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

# ── 3xx base info / audio ─────────────────────────────────────────────────────
- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type and model name. Type value map in Appendix - not in provided source."

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status."

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. Value list in Appendix 'Supplementary Information by Command' - not included in provided source."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Every command returns a framed response. Success responses carry prefix byte
# 20h/21h/22h/23h; error responses carry prefix A0h/A1h/A2h/A3h followed by
# <ERR1> <ERR2> codes. A CKS trailer closes every frame.
- id: command_ack
  type: framed_response
  description: "Success response with optional DATA block (prefix 20h/21h/22h/23h + ID1 + ID2 + LEN + DATA + CKS)"

- id: command_error
  type: framed_response
  description: "Error response (prefix A0h/A1h/A2h/A3h + ID1 + ID2 + 02h + ERR1 + ERR2 + CKS)"
  values:
    - "ERR1=00h,ERR2=00h: command not recognized"
    - "ERR1=00h,ERR2=01h: command not supported by model"
    - "ERR1=01h,ERR2=00h: specified value invalid"
    - "ERR1=01h,ERR2=01h: specified input terminal invalid"
    - "ERR1=01h,ERR2=02h: specified language invalid"
    - "ERR1=02h,ERR2=00h: memory allocation error"
    - "ERR1=02h,ERR2=02h: memory in use"
    - "ERR1=02h,ERR2=03h: specified value cannot be set"
    - "ERR1=02h,ERR2=04h: forced onscreen mute on"
    - "ERR1=02h,ERR2=06h: viewer error"
    - "ERR1=02h,ERR2=07h: no signal"
    - "ERR1=02h,ERR2=08h: test pattern or filter displayed"
    - "ERR1=02h,ERR2=09h: no PC card inserted"
    - "ERR1=02h,ERR2=0Ah: memory operation error"
    - "ERR1=02h,ERR2=0Ch: entry list displayed"
    - "ERR1=02h,ERR2=0Dh: command not accepted because power is off"
    - "ERR1=02h,ERR2=0Eh: command execution failed"
    - "ERR1=02h,ERR2=0Fh: no authority for operation"
    - "ERR1=03h,ERR2=00h: specified gain number incorrect"
    - "ERR1=03h,ERR2=01h: specified gain invalid"
    - "ERR1=03h,ERR2=02h: adjustment failed"

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From RUNNING STATUS REQUEST DATA06 / BASIC INFORMATION REQUEST DATA01"

- id: input_signal_state
  type: enum
  description: "From INPUT STATUS REQUEST / BASIC INFORMATION REQUEST signal-type fields"

- id: mute_state
  type: composite
  description: "From MUTE STATUS REQUEST: picture/sound/onscreen/forced-onscreen mute + onscreen display"

- id: error_status
  type: bitmask
  description: "From ERROR STATUS REQUEST DATA01-12: cover, fan, temperature, power, lamp, formatter, mirror-cover, iris, foreign-matter, interlock-switch and system errors."
```

## Variables
```yaml
# Settable continuous parameters (adjustable via dedicated commands; current
# values readable via GAIN PARAMETER REQUEST 3 / status requests).
- id: brightness
  type: integer
  description: "PICTURE ADJUST target 00h; absolute or relative. Limits from GAIN PARAMETER REQUEST 3."
- id: contrast
  type: integer
  description: "PICTURE ADJUST target 01h."
- id: color
  type: integer
  description: "PICTURE ADJUST target 02h."
- id: hue
  type: integer
  description: "PICTURE ADJUST target 03h."
- id: sharpness
  type: integer
  description: "PICTURE ADJUST target 04h."
- id: volume
  type: integer
  description: "VOLUME ADJUST (030-2)."
- id: lamp_adjust
  type: integer
  description: "OTHER ADJUST (030-15) target DATA01=96h/DATA02=FFh."
- id: lens_position
  type: integer
  description: "LENS CONTROL 2 (053-2) absolute/relative lens position."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited (reply to a sent command).
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock
# procedures. Note only operational constraints from command descriptions:
# POWER ON/OFF reject all other commands during the on/off (incl. cooling)
# transition. No power-on sequencing requirement stated.
```

## Notes
- Binary frame protocol; every command byte sequence ends with a checksum (CKS) = low byte of the sum of all preceding bytes.
- `<ID1>` (control ID) and `<ID2>` (model code) appear in RESPONSE frames, not in the command bytes sent to the projector.
- LAN (TCP port 7142) and RS-232C share the identical command set; only the transport differs.
- Several value maps (input terminal, aspect, eco mode, base model type, sub-input) are defined in an "Appendix: Supplementary Information by Command" that is absent from the provided source text.

<!-- UNRESOLVED: Appendix value maps (input terminal, aspect, eco mode, base model type, sub-input) not in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default serial baud rate not stated (5 rates supported). -->
<!-- UNRESOLVED: serial flow control not stated (only "full duplex" comm mode stated). -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:23:52.465Z
last_checked_at: 2026-06-18T08:59:02.935Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:59:02.935Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value map, aspect value map, eco-mode value map, base-model-type value map, and sub-input value map are referenced in an \"Appendix: Supplementary Information by Command\" that is NOT included in the provided source text."
- "flow control not stated; \"Full duplex\" communication mode stated in source"
- "source documents no unsolicited notifications. All responses are"
- "source documents no multi-step command sequences."
- "source contains no explicit safety warnings or interlock"
- "Appendix value maps (input terminal, aspect, eco mode, base model type, sub-input) not in source."
- "firmware version compatibility not stated in source."
- "default serial baud rate not stated (5 rates supported)."
- "serial flow control not stated (only \"full duplex\" comm mode stated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
