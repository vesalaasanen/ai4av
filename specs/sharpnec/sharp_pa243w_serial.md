---
spec_id: admin/sharp-nec-pa243w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PA243W Control Spec"
manufacturer: Sharp/NEC
model_family: PA243W
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PA243W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:31:49.423Z
last_checked_at: 2026-06-18T09:02:52.055Z
generated_at: 2026-06-18T09:02:52.055Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command appendix \"Supplementary Information by Command\" (input terminal value map, aspect values, base-model-type codes, eco-mode values, sub-input values) is not in the refined source; per-command value enums for INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, AUDIO SELECT SET, PIP sub-input are therefore not enumerated."
  - "PA243W-specific command applicability not stated; source is a generic projector command reference. Projector-only commands (lens, lamp, shutter, filter) may not be supported on this monitor model."
  - "bounds returned dynamically by 060-1"
  - "source describes no unsolicited notifications. All responses are"
  - "source documents no explicit multi-step command sequences. Remove"
  - "firmware version compatibility not stated in source."
  - "default baud rate not stated (5 options listed)."
  - "explicit flow-control mode (RTS/CTS vs none) not named in source, only implied by pinout."
  - "Appendix \"Supplementary Information by Command\" value maps (input terminals, aspect, eco mode, sub-inputs, base-model types) not present in refined source."
  - "PA243W-specific command applicability not documented; source is a generic projector command reference shared across Sharp/NEC models."
  - "no unsolicited event / push mechanism documented."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:02:52.055Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PA243W Control Spec

## Summary
Sharp/NEC PA243W professional LCD monitor controlled via an external PC over an
RS-232C serial port (PC CONTROL D-SUB 9P) or a wired/wireless LAN (TCP). This spec
covers the binary frame protocol documented in the Projector Control Command
Reference Manual (BDT140013 Revision 7.1): 53 numbered commands covering power,
input switching, mute, picture/volume/aspect/gain adjust, lens and lens-memory
control, freeze, shutter, eco mode, PIP/PbP, edge blending, audio select, and a
broad set of status/error/information queries. The PA243W is a monitor, not a
projector; projector-specific commands (lens, lamp, shutter, filter) may return
"not supported" errors on this model — applicability is UNRESOLVED.

<!-- UNRESOLVED: command appendix "Supplementary Information by Command" (input terminal value map, aspect values, base-model-type codes, eco-mode values, sub-input values) is not in the refined source; per-command value enums for INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, AUDIO SELECT SET, PIP sub-input are therefore not enumerated. -->
<!-- UNRESOLVED: PA243W-specific command applicability not stated; source is a generic projector command reference. Projector-only commands (lens, lamp, shutter, filter) may not be supported on this monitor model. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists switchable 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: hardware  # RTS/CTS pins wired per pin table; source does not name flow-control mode explicitly
addressing:
  port: 7142  # TCP, stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred from POWER ON / POWER OFF (015/016)
  - queryable      # inferred from many *REQUEST commands (009, 037*, 053-*, 060-1, 078-*, 084, 097-*, 305-*)
  - levelable      # inferred from PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST (030-1/030-2/030-15) and lens control
  - routable       # inferred from INPUT SW CHANGE (018) and PIP/PbP sub-input selection (097/098-198)
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use the
# source's "NNh" notation. <ID1> = control ID (set to 00h in command frames per
# source examples), <ID2> = model code (00h in command frames). CKS = checksum
# = low-order byte of the sum of all preceding bytes (incl. the command's fixed
# header). For fixed commands the CKS value given in the source is shown verbatim;
# for parameterized commands CKS must be computed at send time.
# Frame format: [HEADER][ID1][ID2][LEN][DATA...][CKS]; responses echo HEADER|80h.

# --- Power / error status ---
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While turning on, no other command is accepted.

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: While turning off (incl. cooling time), no other command is accepted.

# --- Input switching ---
- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (hex). Example from source: 06h = Video port. Full value map is in the Appendix 'Supplementary Information by Command' which is UNRESOLVED here."
  notes: Response DATA01=FFh means ended with error (no signal switch made).

# --- Mute ---
- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off by input/video-signal switch.

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Turned off by input/video-signal switch or volume adjustment.

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Turned off by input/video-signal switch.

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- Picture / volume / aspect / gain adjust ---
- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness)"
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute,01h=relative)"
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits
  notes: "Source example: brightness=10 -> 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode (00h=absolute,01h=relative)"
    - name: DATA02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA03
      type: integer
      description: Adjustment value high-order 8 bits
  notes: "Source example: volume=10 -> 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value (hex). Full value map is in the Appendix 'Supplementary Information by Command' which is UNRESOLVED here."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte. Source shows DATA01=96h for LAMP ADJUST / LIGHT ADJUST; DATA02=FFh accompanies it."
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh with 96h)."
    - name: DATA03
      type: integer
      description: "Adjustment mode (00h=absolute,01h=relative)"
    - name: DATA04
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA05
      type: integer
      description: Adjustment value high-order 8 bits

# --- Information requests ---
- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at one-minute intervals.

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), both in seconds. -1 if undefined.

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector (00h=Lamp1,01h=Lamp2). Lamp2 valid only on two-lamp models."
    - name: DATA02
      type: integer
      description: "Content (01h=usage time seconds,04h=remaining life %)."
  notes: Remaining life returns negative if replacement deadline exceeded. Reflects eco mode if enabled.

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999).

# --- Remote / shutter / lens ---
- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte. Source key-code list: 02h=POWER ON,03h=POWER OFF,05h=AUTO,06h=MENU,07h=UP,08h=DOWN,09h=RIGHT,0Ah=LEFT,0Bh=ENTER,0Ch=EXIT,0Dh=HELP,0Fh=MAGNIFY UP,10h=MAGNIFY DOWN,13h=MUTE,29h=PICTURE,4Bh=COMPUTER1,4Ch=COMPUTER2,4Fh=VIDEO1,51h=S-VIDEO1,84h=VOLUME UP,85h=VOLUME DOWN,8Ah=FREEZE,A3h=ASPECT,D7h=SOURCE,EEh=LAMP MODE/ECO."
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys).

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. Source example: 06h=Periphery Focus."
    - name: DATA02
      type: integer
      description: "Content (00h=Stop,01h=drive +1s,02h=drive +0.5s,03h=drive +0.25s,7Fh=drive +,81h=drive -,FDh=drive -0.25s,FEh=drive -0.5s,FFh=drive -1s)."
  notes: After 7Fh/81h, send 00h to stop. Same command can be re-issued while driving to change without stopping.

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target (matches LENS CONTROL DATA01).
  notes: Returns upper/lower bounds and current value (16-bit each).

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target (FFh=Stop). When Stop, DATA02-04 are ignored."
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute,02h=relative)."
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
  notes: Operates on the profile selected by LENS PROFILE SET (053-10).

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes: Response DATA02 is the setting (00h=OFF,01h=ON).

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: DATA02
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)."

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitmask - Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V); 0=Stop,1=During operation.

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number (00h=Profile 1, 01h=Profile 2)."

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns selected reference-lens-memory profile (00h=Profile1, 01h=Profile2).

# --- Gain / status requests ---
- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness,05h=Volume,96h=Lamp/Light Adjust)."
  notes: Returns status, upper/lower bounds, default, current value, wide/narrow adjustment widths, default-validity.

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05).

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns DATA03 power status (00h=Standby,01h=Power on,FFh=unsupported), DATA04 cooling, DATA05 power on/off process, DATA06 operation status.

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number (returned value+1), selection signal type 1/2, signal list type, test pattern, content displayed.

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display state.

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns 32-byte NUL-terminated model name.

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Returns DATA01 (00h=Normal cover opened, 01h=Cover closed).

# --- Freeze / info strings ---
- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off."

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)."
  notes: Returns label string length and NUL-terminated label string.

# --- Eco / LAN / PIP / edge-blending (097 query set) ---
- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco/light/lamp mode value. Value map is in the Appendix "Supplementary Information by Command" (UNRESOLVED here).

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns 17-byte NUL-terminated projector name.

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns 6-byte MAC address.

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes: Returns MODE (00h=PIP,01h=PbP), START POSITION (00h=TOP-LEFT..03h=BOTTOM-RIGHT), or sub-input setting.

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: Returns DATA01 (00h=OFF, 01h=ON).

# --- 098 set commands ---
- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco/light/lamp mode value. Value map is in the Appendix 'Supplementary Information by Command' (UNRESOLVED here)."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} - {DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: Projector name, up to 16 bytes.
  notes: Response DATA01 is the input terminal echo.

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: DATA02
      type: integer
      description: "Setting value for the DATA01 target (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub-input values per Appendix - UNRESOLVED here)."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)."

# --- 305 identity requests ---
- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type (DATA01-02, DATA12-13) and model name string (DATA03-11). Value codes are in the Appendix (UNRESOLVED here).

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns 16-byte NUL-terminated serial number.

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status.

# --- Audio select ---
- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value. Full value map is in the Appendix 'Supplementary Information by Command' (UNRESOLVED here)."
    - name: DATA02
      type: integer
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)."
  notes: Response DATA02 is execution result (00h=success, 01h=error).
```

## Feedbacks
```yaml
- id: command_result
  type: enum
  description: Generic command execution result echoed in response frame.
  values: [success, error]

- id: error_status
  type: bitmask
  description: 12-byte error bitmap returned by 009 ERROR STATUS REQUEST (DATA01-12). Bit set to 1 = error.
  bits:
    DATA01_bit0: Cover error
    DATA01_bit3: Fan error
    DATA01_bit4: Fan error
    DATA01_bit5: Power error
    DATA01_bit6: "Lamp/lamp1 off or backlight off"
    DATA01_bit7: "Lamp/lamp1 in replacement moratorium"
    DATA02_bit0: "Lamp/lamp1 usage time exceeded limit"
    DATA02_bit1: Formatter error
    DATA02_bit2: Lamp 2 off
    DATA03_bit1: FPGA error
    DATA03_bit2: "Temperature error (sensor)"
    DATA03_bit3: "Lamp/lamp1 not present"
    DATA03_bit4: "Lamp/lamp1 data error"
    DATA03_bit5: Mirror cover error
    DATA03_bit6: "Lamp 2 in replacement moratorium"
    DATA03_bit7: Lamp 2 usage time exceeded the limit
    DATA04_bit0: Lamp 2 not present
    DATA04_bit1: Lamp 2 data error
    DATA04_bit2: Temperature error due to dust
    DATA04_bit3: Foreign matter sensor error
    DATA04_bit5: Ballast communication error
    DATA04_bit6: Iris calibration error
    DATA04_bit7: Lens not installed properly
    DATA09_bit0: Portrait cover side is up
    DATA09_bit1: Interlock switch is open
    DATA09_bit2: "System error (Slave CPU)"
    DATA09_bit3: "System error (Formatter)"

- id: power_status
  type: enum
  description: Power status from 078-2 RUNNING STATUS REQUEST DATA03.
  values: [standby, power_on, not_supported]

- id: operation_status
  type: enum
  description: Operation status from 078-2 DATA06.
  values:
    - standby_sleep
    - power_on
    - cooling
    - standby_error
    - standby_power_saving
    - network_standby

- id: cover_status
  type: enum
  description: Mirror/lens cover status from 078-6.
  values: [normal_cover_opened, cover_closed]

- id: lens_operation_status
  type: bitmask
  description: Lens operation bitmap from 053-7 LENS INFORMATION REQUEST DATA01.
  bits:
    bit0: Lens memory (0=Stop,1=During operation)
    bit1: Zoom
    bit2: Focus
    bit3: Lens Shift (H)
    bit4: Lens Shift (V)
```

## Variables
```yaml
- id: picture_brightness
  type: integer
  min: null  # UNRESOLVED: bounds returned dynamically by 060-1
  max: null
  description: Picture Brightness (PICTURE ADJUST target 00h).

- id: picture_contrast
  type: integer
  min: null
  max: null
  description: Picture Contrast (target 01h).

- id: picture_color
  type: integer
  min: null
  max: null
  description: Picture Color (target 02h).

- id: picture_hue
  type: integer
  min: null
  max: null
  description: Picture Hue (target 03h).

- id: picture_sharpness
  type: integer
  min: null
  max: null
  description: Picture Sharpness (target 04h).

- id: volume
  type: integer
  min: null
  max: null
  description: Sound volume (VOLUME ADJUST / GAIN target 05h).

- id: lamp_light_adjust
  type: integer
  min: null
  max: null
  description: Lamp/Light adjust (OTHER ADJUST target 96h / GAIN target 96h).

- id: lamp_usage_time_seconds
  type: integer
  description: Lamp usage time in seconds (from 037 / 037-4). Updated at one-minute intervals.

- id: filter_usage_time_seconds
  type: integer
  description: Filter usage time in seconds (from 037 / 037-3).

- id: lamp_remaining_life_percent
  type: integer
  description: Lamp remaining life % (from 037-4, content 04h). Negative if replacement deadline exceeded.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are
# solicited (returned after a command). Populate only if a later source documents
# push events.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step command sequences. Remove
# if not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: While turning on, no other command can be accepted.
  - command: power_off
    note: While turning off (including cooling time), no other command can be accepted.
  - signal: error_status DATA09_bit1
    note: Interlock switch is open - surfaces as an error-status bit, not a command gate.
# Source lists no explicit high-voltage interlock procedures or power-on
# sequencing requirements beyond the "no other command accepted" notes above.
```

## Notes
- Manual: "Projector Control Command Reference Manual", BDT140013 Revision 7.1. Generic Sharp/NEC projector/display command set applied to the PA243W model.
- The PA243W is a professional LCD monitor; projector-specific commands (lens control 053*, shutter 051/052, lamp information 037-4, filter usage 037-3) may return "not supported by the model" (ERR1=00h, ERR2=01h) on this device.
- Frame format: command frames use header byte + ID1 + ID2 + LEN + DATA + CKS. Responses set the high bit of the header (e.g. command header 02h -> response A2h; 03h -> A3h; 00h -> A0h). ID1 is the projector's Control ID; ID2 is the model code. In command examples the source writes ID1=ID2=00h.
- Checksum (CKS): low-order one byte of the sum of all preceding bytes. Source example: `20h+81h+01h+60h+01h+00h = 103h -> CKS=03h`.
- For fixed commands the CKS value shown is verbatim from the source and is valid only with ID1=ID2=00h; if a non-zero Control ID is used, recompute CKS.
- Error responses carry ERR1/ERR2 codes; see source "2.4 Error code list" (e.g. 02h/0Dh = "command cannot be accepted because the power is off"; 02h/0Fh = "no authority for the operation"; 00h/01h = "command not supported by the model").
- Usage-time fields return seconds but are updated at one-minute intervals.
- LAMP INFORMATION REQUEST 3 DATA01=01h (Lamp 2) is only valid on two-lamp models.
- Input-terminal value maps (018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET), aspect values (030-12), eco-mode values (097-8 / 098-8), PIP sub-input values, and base-model-type codes are defined in the manual's Appendix "Supplementary Information by Command", which is NOT present in the refined source text. These enums are therefore UNRESOLVED.
- Serial supports switchable baud rates 115200 / 38400 / 19200 / 9600 / 4800 bps; the source does not state a default, so 115200 is listed as one of the documented options and is not asserted as the default. Flow control is marked hardware because the PC CONTROL D-SUB 9P pinout wires RTS<->CTS, but the source does not explicitly name the flow-control mode.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (5 options listed). -->
<!-- UNRESOLVED: explicit flow-control mode (RTS/CTS vs none) not named in source, only implied by pinout. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" value maps (input terminals, aspect, eco mode, sub-inputs, base-model types) not present in refined source. -->
<!-- UNRESOLVED: PA243W-specific command applicability not documented; source is a generic projector command reference shared across Sharp/NEC models. -->
<!-- UNRESOLVED: no unsolicited event / push mechanism documented. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:31:49.423Z
last_checked_at: 2026-06-18T09:02:52.055Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:02:52.055Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command appendix \"Supplementary Information by Command\" (input terminal value map, aspect values, base-model-type codes, eco-mode values, sub-input values) is not in the refined source; per-command value enums for INPUT SW CHANGE, ASPECT ADJUST, ECO MODE, AUDIO SELECT SET, PIP sub-input are therefore not enumerated."
- "PA243W-specific command applicability not stated; source is a generic projector command reference. Projector-only commands (lens, lamp, shutter, filter) may not be supported on this monitor model."
- "bounds returned dynamically by 060-1"
- "source describes no unsolicited notifications. All responses are"
- "source documents no explicit multi-step command sequences. Remove"
- "firmware version compatibility not stated in source."
- "default baud rate not stated (5 options listed)."
- "explicit flow-control mode (RTS/CTS vs none) not named in source, only implied by pinout."
- "Appendix \"Supplementary Information by Command\" value maps (input terminals, aspect, eco mode, sub-inputs, base-model types) not present in refined source."
- "PA243W-specific command applicability not documented; source is a generic projector command reference shared across Sharp/NEC models."
- "no unsolicited event / push mechanism documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
