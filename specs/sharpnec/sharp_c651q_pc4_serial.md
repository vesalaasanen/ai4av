---
spec_id: admin/sharp-nec-c651q-pc4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C651Q Pc4 Control Spec"
manufacturer: Sharp/NEC
model_family: "C651Q Pc4"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C651Q Pc4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:14:49.532Z
last_checked_at: 2026-06-17T19:36:23.161Z
generated_at: 2026-06-17T19:36:23.161Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value table, eco mode value table, base model type table, sub-input setting value table — all referenced to \"Supplementary Information by Command\" appendix not present in refined source. Model code (ID2) for C651Q Pc4 not stated. Control ID default not stated."
  - "flow control not stated in source (RS-232C full-duplex stated, RTS/CTS pins wired)"
  - "no explicit power-on sequencing procedure stated beyond the transition lockout."
  - "model code (ID2) for C651Q Pc4 not stated in source."
  - "control ID (ID1) default not stated in source."
  - "input terminal value table not in refined source."
  - "eco mode value table not in refined source."
  - "base model type value table not in refined source."
  - "sub-input setting value table (PIP/PbP) not in refined source."
  - "LENS CONTROL / LENS CONTROL 2 target tables truncated in source (only 06h / FFh documented)."
  - "firmware version compatibility not stated."
  - "flow control setting not stated (RTS/CTS pins wired but no sw flow-control field)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:36:23.161Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec command sequences matched verbatim in source; transport parameters verified; bidirectional 1:1 coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C651Q Pc4 Control Spec

## Summary
Sharp/NEC C651Q Pc4 projector. Binary control protocol over RS-232C serial and wired/wireless LAN (TCP port 7142). Spec covers power, input switch, mute, picture/volume/aspect adjust, lens control + memory, eco mode, edge blending, PIP/PbP, and status/error/info queries. Commands are hex-framed with checksum byte (low-order byte of sum of preceding bytes). Control ID + model code inserted into response frames. Interlock: power-on/off locks out all other commands during transition.

<!-- UNRESOLVED: input terminal value table, eco mode value table, base model type table, sub-input setting value table — all referenced to "Supplementary Information by Command" appendix not present in refined source. Model code (ID2) for C651Q Pc4 not stated. Control ID default not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all as switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RS-232C full-duplex stated, RTS/CTS pins wired)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - levelable       # inferred: VOLUME ADJUST, PICTURE ADJUST, LENS CONTROL present
  - queryable       # inferred: many *REQUEST commands returning values present
  - routable        # inferred: INPUT SW CHANGE present
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns 12 bytes of bitfield error info (cover/fan/temp/lamp/etc.). See error information list in source."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "During power-on no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling) no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal byte. Example: 06h = video port. Full value table in Appendix 'Supplementary Information by Command' (not in refined source)."
    notes: "CKS = checksum byte (computed). Response DATA01 FFh = ended with error (no switch)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video switch."

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
    notes: "Cleared by input/video switch or volume adjust."

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
    notes: "Cleared by input/video switch."

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
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data03
        type: string
        description: "Value low-order 8 bits"
      - name: data04
        type: string
        description: "Value high-order 8 bits"
    notes: "CKS computed. Example set brightness +10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data02
        type: string
        description: "Value low-order 8 bits"
      - name: data03
        type: string
        description: "Value high-order 8 bits"
    notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value - table in Appendix 'Supplementary Information by Command' (not in refined source)."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Target high byte - documented only 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: string
        description: "Target low byte - documented only FFh (paired with 96h)"
      - name: data03
        type: string
        description: "Mode: 00h=absolute, 01h=relative"
      - name: data04
        type: string
        description: "Value low-order 8 bits"
      - name: data05
        type: string
        description: "Value high-order 8 bits"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-min intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) + filter alarm start time (DATA05-08) in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
    notes: "Eco mode reflected. Negative remaining life if deadline exceeded. Example: 03h 96h 00h 00h 02h 00h 01h 9Ch."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kg (DATA02-05) + mg (DATA06-09). Max 99999 kg / 999999 mg."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD type)."
      - name: data02
        type: string
        description: "Key code high byte. See key code list in source (e.g. POWER ON=02h 00h, AUTO=05h 00h, VOLUME UP=84h 00h)."

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
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target - documented only 06h=Periphery Focus (table truncated in source)."
      - name: data02
        type: string
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive +, 81h=drive -, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: "Send 00h to stop after continuous 7Fh/81h drive. Same command re-issued during drive continues motion."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target (same values as 053 LENS CONTROL DATA01)."
    notes: "Returns upper/lower/current adjustment bounds (3x WORD)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target - documented only FFh=Stop (table truncated in source)."
      - name: data02
        type: string
        description: "Mode: 00h=absolute, 02h=relative"
      - name: data03
        type: string
        description: "Value low-order 8 bits"
      - name: data04
        type: string
        description: "Value high-order 8 bits"
    notes: "If DATA01=FFh (Stop), mode/value ignored."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile number selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns 1-byte bitfield: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns profile number (00h=Profile1, 01h=Profile2)."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status + upper/lower/default/current bounds + adjustment widths."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number incl. clock/sleep-timer (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling/power-on process flags, operation status (standby/power-on/cooling/error/etc.)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch flag, signal list number (value-1), signal type 1+2, content displayed, test pattern, viewer, etc."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display flags."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns 32-byte NUL-terminated model name."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Info type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Returns English label string (NUL-terminated)."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns 'Light mode' or 'Lamp mode' value depending on model. Value table in Appendix (not in refined source)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns 17-byte NUL-terminated projector name."

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address."

  - id: pip_pbypicture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "Sub-input value table in Appendix (not in refined source)."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Eco mode value - table in Appendix 'Supplementary Information by Command' (not in refined source)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01-data16} 00h {cks}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-16)."

  - id: pip_pbypicture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value (mode/position/sub-input per DATA01). Sub-input values in Appendix (not in refined source)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type (DATA12-13). Value table in Appendix (not in refined source)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns 16-byte NUL-terminated serial number."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal type 1+2, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal - value table in Appendix 'Supplementary Information by Command' (not in refined source)."
      - name: data02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06 + 305-3 BASIC INFORMATION REQUEST DATA01"

  - id: error_status
    type: bitfield
    description: "12-byte error bitfield from 009. ERROR STATUS REQUEST (cover/fan/temp/lamp/formatter/mirror cover/foreign matter/ballast/iris/lens/interlock/system)."

  - id: mute_state
    type: composite
    description: "078-4 MUTE STATUS REQUEST: picture/sound/onscreen/forced-onscreen/OSD-display."

  - id: lamp_info
    type: composite
    description: "037-4 LAMP INFORMATION REQUEST 3: usage time (sec) + remaining life (%)."

  - id: lens_operation_status
    type: bitfield
    description: "053-7 LENS INFORMATION REQUEST: lens-memory/zoom/focus/shift-H/shift-V stop-or-operating."

  - id: cover_state
    type: enum
    values: [normal_opened, closed]
    source: "078-6 COVER STATUS REQUEST DATA01"
```

## Variables
```yaml
# No settable parameters outside the action set - adjustments (picture/volume/aspect/lamp)
# are discrete parameterized actions, not free variables. Section left intentionally empty.
```

## Events
```yaml
# Source describes no unsolicited notifications - all device output is in response to a command.
```

## Macros
```yaml
# Source describes no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    rule: "While power-on transition in progress, no other command accepted."
  - command: "016. POWER OFF"
    rule: "While power-off (including cooling time) in progress, no other command accepted."
  - command: "053. LENS CONTROL"
    rule: "Continuous-drive (7Fh/81h) must be stopped by sending 00h."
  - bitfield: "009. ERROR STATUS REQUEST DATA09 bit1"
    rule: "Interlock switch open - reported as error."
# UNRESOLVED: no explicit power-on sequencing procedure stated beyond the transition lockout.
```

## Notes
- Binary protocol: all commands/responses hex-framed. Frame format `XXh <opcode> <ID1> <ID2> <LEN> <DATA...> <CKS>` — leading byte distinguishes direction/type (00h-03h request, 20h-23h success response, A0h-A3h error response).
- Checksum (CKS) = low-order one byte of sum of all preceding bytes. Must be computed at send time — not stored verbatim except where source gives a complete worked example.
- ID1 = control ID set on projector (value not stated in refined source). ID2 = model code (value not stated for C651Q Pc4).
- Baud rate switchable across 5 values; pick at config time.
- Error responses carry ERR1/ERR2 pair — full code table in source §2.4 (command-unrecognized, unsupported, invalid value, memory, forced mute, no signal, power-off rejection, no authority, gain errors, etc.).
- Several lookup tables (input terminal codes, eco mode values, base model type codes, sub-input setting values) referenced to an "Appendix — Supplementary Information by Command" that is NOT present in the refined source. Those enums are UNRESOLVED.

<!-- UNRESOLVED: model code (ID2) for C651Q Pc4 not stated in source. -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source. -->
<!-- UNRESOLVED: input terminal value table not in refined source. -->
<!-- UNRESOLVED: eco mode value table not in refined source. -->
<!-- UNRESOLVED: base model type value table not in refined source. -->
<!-- UNRESOLVED: sub-input setting value table (PIP/PbP) not in refined source. -->
<!-- UNRESOLVED: LENS CONTROL / LENS CONTROL 2 target tables truncated in source (only 06h / FFh documented). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow control setting not stated (RTS/CTS pins wired but no sw flow-control field). -->
````

Spec output above. 53 actions enumerated — one per source row. All hex payloads verbatim. UNRESOLVED markers on gaps (model code, control ID, appendix tables, flow control, firmware).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:14:49.532Z
last_checked_at: 2026-06-17T19:36:23.161Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:36:23.161Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec command sequences matched verbatim in source; transport parameters verified; bidirectional 1:1 coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value table, eco mode value table, base model type table, sub-input setting value table — all referenced to \"Supplementary Information by Command\" appendix not present in refined source. Model code (ID2) for C651Q Pc4 not stated. Control ID default not stated."
- "flow control not stated in source (RS-232C full-duplex stated, RTS/CTS pins wired)"
- "no explicit power-on sequencing procedure stated beyond the transition lockout."
- "model code (ID2) for C651Q Pc4 not stated in source."
- "control ID (ID1) default not stated in source."
- "input terminal value table not in refined source."
- "eco mode value table not in refined source."
- "base model type value table not in refined source."
- "sub-input setting value table (PIP/PbP) not in refined source."
- "LENS CONTROL / LENS CONTROL 2 target tables truncated in source (only 06h / FFh documented)."
- "firmware version compatibility not stated."
- "flow control setting not stated (RTS/CTS pins wired but no sw flow-control field)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
