---
spec_id: admin/sharp-nec-np-px1004ul-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX1004UL-BK Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PX1004UL-BK
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PX1004UL-BK
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:27:41.851Z
last_checked_at: 2026-06-18T08:52:29.763Z
generated_at: 2026-06-18T08:52:29.763Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal value table referenced in Appendix not present in refined source"
  - "eco mode value table referenced in Appendix not present in refined source"
  - "sub input setting value table referenced in Appendix not present in refined source"
  - "base model type value table referenced in Appendix not present in refined source"
  - "flow control not stated in source (RTS/CTS pins present on D-SUB 9P, communication mode Full duplex)"
  - "no voltage/current/power specifications or interlock procedures stated in source"
  - "Appendix tables (input terminal values, eco mode values, sub input values, base model types, aspect values) referenced by source but not present in refined document"
  - "firmware version compatibility not stated"
  - "flow control type not stated (RTS/CTS pins wired but mode unspecified)"
  - "default baud rate not stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:52:29.763Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX1004UL-BK Control Spec

## Summary
The Sharp/NEC NP-PX1004UL-BK is a professional projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), enumerating all 53 documented commands spanning power, input switching, mute, picture/volume/aspect adjustment, lens control and memory, status queries, and system settings. Commands use a fixed-frame hex format with a trailing additive checksum byte.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value table referenced in Appendix not present in refined source -->
<!-- UNRESOLVED: eco mode value table referenced in Appendix not present in refined source -->
<!-- UNRESOLVED: sub input setting value table referenced in Appendix not present in refined source -->
<!-- UNRESOLVED: base model type value table referenced in Appendix not present in refined source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for sending/receiving commands over LAN (stated in source)
serial:
  baud_rate: null  # multiple supported: 115200 / 38400 / 19200 / 9600 / 4800 bps; default not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins present on D-SUB 9P, communication mode Full duplex)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from POWER ON / POWER OFF commands
  - queryable  # inferred from numerous status request commands
  - routable  # inferred from INPUT SW CHANGE command
  - levelable  # inferred from PICTURE ADJUST / VOLUME ADJUST commands
```

## Actions
```yaml
# Command frame format (hex): <class> <code> 00h 00h <LEN> <DATA...> <CKS>
# Checksum (CKS): sum of all preceding bytes, low-order one byte.
# ID1 = control ID, ID2 = model code appear in responses only (not in commands sent to projector).
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bitfields (bit=1 means error). Covers cover/fan/temp/power/lamp errors across 4 status bytes + extended status."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power is turning on."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off (including cooling time)."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal value (see Appendix). Example: 06h = video port."
    notes: "Response DATA01 FFh = ended with error (no signal switch made). Full input terminal value table in Appendix not present in refined source."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Picture mute turns off on input terminal switch or video signal switch."

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
    notes: "Sound mute turns off on input switch, video signal switch, or volume adjustment."

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
    notes: "Onscreen mute turns off on input switch or video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute value, 01h=relative value."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example set brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example set brightness to -10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h=absolute value, 01h=relative value."
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example set volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Value set for the aspect (see Appendix)."
    notes: "Aspect value table in Appendix not present in refined source."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target high byte; DATA01=96h with DATA02=FFh => LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: integer
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)."
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute value, 01h=relative value."
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Adjusts various gains (e.g. LAMP ADJUST / LIGHT ADJUST)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04, seconds) and filter alarm start time (DATA05-08, seconds). -1 returned if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: data02
        type: integer
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
    notes: "Values reflect eco mode when enabled. Remaining life is negative if replacement deadline exceeded. Updated at 1-minute intervals."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type)."
      - name: data02
        type: integer
        description: "Key code high byte."
    notes: "Key code list (DATA01/DATA02): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Response DATA01 FFh = error."

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []
    notes: "Closes the lens shutter."

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []
    notes: "Opens the lens shutter."

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens target: 06h=Periphery Focus."
      - name: data02
        type: integer
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
    notes: "After 7Fh/81h, send 00h to stop driving. Lens can be re-driven without stop by re-issuing same command during motion. Response DATA01 FFh = error."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens target (same values as 053 LENS CONTROL DATA01)."
    notes: "Returns adjustment range upper/lower limits and current value (16-bit each)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens target; FFh=Stop (mode/value ignored when Stop)."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute value, 02h=relative value."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
    notes: "Adjusts the lens position."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Controls lens memory. Use 053-4 for reference lens memory."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Controls the reference lens memory for profile selected in 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    notes: "Returns setting value: 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."
    notes: "Sets the lens memory."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation). Bits 5-7 reserved."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."
    notes: "Selects reference lens memory profile number."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected profile number: 00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower limits, default, current value, wide/narrow adjustment widths."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04: 00h=NA, 01h=available), profile/clock/sleep info (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status (DATA03: 00h=Standby, 01h=Power on), cooling process, power on/off process, operation status (DATA06)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (value-1), selection signal types, signal list type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=Off/00h=not displayed, 01h=On/displayed)."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name (DATA01-32, NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns mirror/lens cover status: 00h=Normal (opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h=freeze on, 02h=freeze off."
    notes: "Turns freeze function on or off."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
    notes: "Returns label/information string (NUL-terminated)."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode value (Light mode or Lamp mode depending on model). Value table in Appendix not present in refined source."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17, NUL-terminated)."

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns MAC address (DATA01-06)."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    notes: "MODE values: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION values: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values in Appendix."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns setting value: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Value set for the eco mode (see Appendix)."
    notes: "Sets Light mode or Lamp mode depending on model. Value table in Appendix not present in refined source."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
    params:
      - name: data01_to_data16
        type: string
        description: "Projector name (up to 16 bytes)."
    notes: "Sets the projector name."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: integer
        description: "Setting value (MODE: 00h=PIP, 01h=PBP; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub input values in Appendix)."
    notes: "Sets picture in picture or picture by picture."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."
    notes: "Sets the edge blending."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type 2 (DATA12-13). Value tables in Appendix not present in refined source."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number (DATA01-16, NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, selection signal types, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal (see Appendix)."
      - name: data02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    notes: "Sets the audio select. Input terminal value table in Appendix not present in refined source."
```

## Feedbacks
```yaml
# Response frame format: <resp-class> <code> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Success response class = command class + 20h (e.g. 02h -> 22h, 03h -> 23h, 00h -> 20h, 01h -> 21h).
# Error response class = command class + A0h (e.g. 02h -> A2h, 03h -> A3h, 00h -> A0h, 01h -> A1h).
# Error responses carry <ERR1> <ERR2> per error code list below.
feedbacks:
  - id: power_state
    type: enum
    source_query: running_status_request
    values: [standby, power_on]
    notes: "DATA03 of 078-2 response: 00h=Standby, 01h=Power on."

  - id: operation_status
    type: enum
    source_query: running_status_request
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "DATA06 of 078-2 response: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

  - id: picture_mute_state
    type: enum
    source_query: mute_status_request
    values: [off, on]

  - id: sound_mute_state
    type: enum
    source_query: mute_status_request
    values: [off, on]

  - id: onscreen_mute_state
    type: enum
    source_query: mute_status_request
    values: [off, on]

  - id: freeze_state
    type: enum
    source_query: basic_information_request
    values: [off, on]

  - id: cover_status
    type: enum
    source_query: cover_status_request
    values: [normal_opened, cover_closed]

  - id: error_status
    type: bitmask
    source_query: error_status_request
    notes: "12-byte error bitfield; bit=1 indicates error. Covers cover/fan/temperature/power/lamp/formatter/mirror-cover/iris/lens errors."

  - id: lamp_usage_time
    type: integer
    source_query: [information_request, lamp_information_request_3]
    notes: "Lamp usage time in seconds (updated 1-minute intervals)."

  - id: lamp_remaining_life
    type: integer
    source_query: lamp_information_request_3
    notes: "Remaining life %. Negative if replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    source_query: [information_request, filter_usage_information_request]
    notes: "Filter usage time in seconds."

  - id: projector_name
    type: string
    source_query: [lan_projector_name_request, information_request]

  - id: mac_address
    type: string
    source_query: lan_mac_address_status_request2

  - id: model_name
    type: string
    source_query: model_name_request

  - id: serial_number
    type: string
    source_query: serial_number_request

  - id: edge_blending_mode
    type: enum
    source_query: edge_blending_mode_request
    values: [off, on]

  - id: eco_mode
    type: enum
    source_query: eco_mode_request
    notes: "Value table in Appendix not present in refined source."

  - id: lens_operation_status
    type: bitmask
    source_query: lens_information_request
    notes: "Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V)."

  - id: lens_profile
    type: enum
    source_query: lens_profile_request
    values: [profile_1, profile_2]

  - id: error_response
    type: enum
    notes: "ERR1/ERR2 error code combinations. See error code list in Notes."
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    set_via: picture_adjust
    query_via: gain_parameter_request_3
    notes: "DATA01=00h. Range returned by gain request."

  - id: contrast
    type: integer
    set_via: picture_adjust
    query_via: gain_parameter_request_3
    notes: "DATA01=01h."

  - id: color
    type: integer
    set_via: picture_adjust
    query_via: gain_parameter_request_3
    notes: "DATA01=02h."

  - id: hue
    type: integer
    set_via: picture_adjust
    query_via: gain_parameter_request_3
    notes: "DATA01=03h."

  - id: sharpness
    type: integer
    set_via: picture_adjust
    query_via: gain_parameter_request_3
    notes: "DATA01=04h."

  - id: volume
    type: integer
    set_via: volume_adjust
    query_via: gain_parameter_request_3
    notes: "DATA01=05h."

  - id: lamp_light_adjust
    type: integer
    set_via: other_adjust
    query_via: gain_parameter_request_3
    notes: "DATA01=96h, DATA02=FFh."

  - id: aspect
    type: enum
    set_via: aspect_adjust
    notes: "Value table in Appendix not present in refined source."

  - id: eco_mode_setting
    type: enum
    set_via: eco_mode_set
    query_via: eco_mode_request
    notes: "Value table in Appendix not present in refined source."

  - id: projector_name_setting
    type: string
    set_via: lan_projector_name_set
    query_via: lan_projector_name_request
    notes: "Up to 16 bytes."

  - id: edge_blending_setting
    type: enum
    values: [off, on]
    set_via: edge_blending_mode_set
    query_via: edge_blending_mode_request
```

## Events
```yaml
# No unsolicited notifications documented in source. Device responds only to commands.
events: []
```

## Macros
```yaml
# No multi-step sequences documented explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: "Source notes that POWER ON accepts no other command while turning on, and POWER OFF accepts no other command during power-off including cooling time. No explicit safety interlock procedures documented."
# UNRESOLVED: no voltage/current/power specifications or interlock procedures stated in source
```

## Notes
- Protocol is binary hex frames. Command classes: 00h (info queries), 01h (freeze), 02h (basic actions), 03h (adjust/settings). Success response class = command class + 20h; error response class = command class + A0h.
- Checksum (CKS): add all preceding bytes, take low-order one byte. Example: `20h 81h 01h 60h 01h 00h` sums to 103h → CKS = 03h.
- Commands sent to projector do NOT include ID1 (control ID) / ID2 (model code); these appear only in responses.
- Serial cable is cross cable to PC CONTROL port (D-SUB 9P). Pin assignment documented: pins 2/3 = RxD/TxD crossed, pin 5 = GND, pins 7/8 = RTS/CTS crossed.
- LAN: wired (10/100 Mbps auto-switchable, IEEE 802.3/802.3u) or wireless via wireless LAN unit. TCP port 7142 for command send/receive.
- Lamp remaining life returns negative value if replacement deadline exceeded.
- Lamp/filter usage times updated at 1-minute intervals though obtainable in 1-second units.
- ERR1/ERR2 error code list: 00h/00h=command unrecognized; 00h/01h=not supported by model; 01h/00h=invalid value; 01h/01h=invalid input terminal; 01h/02h=invalid language; 02h/00h=memory allocation error; 02h/02h=memory in use; 02h/03h=value cannot be set; 02h/04h=forced onscreen mute on; 02h/06h=viewer error; 02h/07h=no signal; 02h/08h=test pattern/filter displayed; 02h/09h=no PC card inserted; 02h/0Ah=memory operation error; 02h/0Ch=entry list displayed; 02h/0Dh=command not accepted (power off); 02h/0Eh=execution failed; 02h/0Fh=no authority; 03h/00h=incorrect gain number; 03h/01h=invalid gain; 03h/02h=adjustment failed.
- Default baud rate not stated; device supports 4800/9600/19200/38400/115200. Configure software to match.
<!-- UNRESOLVED: Appendix tables (input terminal values, eco mode values, sub input values, base model types, aspect values) referenced by source but not present in refined document -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: flow control type not stated (RTS/CTS pins wired but mode unspecified) -->
<!-- UNRESOLVED: default baud rate not stated -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:27:41.851Z
last_checked_at: 2026-06-18T08:52:29.763Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:52:29.763Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal value table referenced in Appendix not present in refined source"
- "eco mode value table referenced in Appendix not present in refined source"
- "sub input setting value table referenced in Appendix not present in refined source"
- "base model type value table referenced in Appendix not present in refined source"
- "flow control not stated in source (RTS/CTS pins present on D-SUB 9P, communication mode Full duplex)"
- "no voltage/current/power specifications or interlock procedures stated in source"
- "Appendix tables (input terminal values, eco mode values, sub input values, base model types, aspect values) referenced by source but not present in refined document"
- "firmware version compatibility not stated"
- "flow control type not stated (RTS/CTS pins wired but mode unspecified)"
- "default baud rate not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
