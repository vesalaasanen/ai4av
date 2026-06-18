---
spec_id: admin/sharp-nec-as60u-pa44ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC As60U Pa44Ml Control Spec"
manufacturer: Sharp/NEC
model_family: "As60U Pa44Ml"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "As60U Pa44Ml"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:15:28.941Z
last_checked_at: 2026-06-17T19:34:35.776Z
generated_at: 2026-06-17T19:34:35.776Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal code values, eco mode code values, base model type codes, and aspect values are referenced in an \"Appendix / Supplementary Information by Command\" that is not present in this source extract."
  - "flow control not stated in source"
  - "code list not in this source).\""
  - "source describes only request/response semantics; no unsolicited"
  - "source documents no multi-step command sequences."
  - "no explicit safety warnings, interlock procedures, or"
  - "input terminal code list (referenced by 018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), base model type codes (078-1/305-1), sub-input setting values (097-198/098-198), and selection signal type details live in an \"Appendix / Supplementary Information by Command\" not included in this source extract."
  - "default baud rate among the five supported options not stated."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:34:35.776Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action-units matched literally in the source with correct hex sequences and parameters. Transport settings verified. Complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC As60U Pa44Ml Control Spec

## Summary
Sharp/NEC projector (As60U Pa44Ml) control spec covering the binary command protocol documented in "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device supports RS-232C serial control (D-SUB 9P PC CONTROL port) and TCP/IP LAN control (wired RJ-45 or wireless, TCP port 7142). Commands are framed hex byte sequences with an additive low-byte checksum.

<!-- UNRESOLVED: input terminal code values, eco mode code values, base model type codes, and aspect values are referenced in an "Appendix / Supplementary Information by Command" that is not present in this source extract. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all supported by source; one selected/configured
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142  # TCP port for LAN command send/receive, stated verbatim in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: numerous status request commands returning values
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST commands present
  - routable     # inferred: INPUT SW CHANGE selects input terminal
```

## Actions
```yaml
actions:
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (incl. cooling time), no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal code byte (e.g. 06h = video). Full code list in Appendix 'Supplementary Information by Command' - UNRESOLVED."
      - name: cks
        type: integer
        description: "Checksum byte = low-order byte of sum of all preceding bytes."
    notes: "Response DATA01=FFh means ended with error (no signal switch)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input terminal switch or video signal switch."

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
    notes: "Cleared by input switch, video signal switch, or volume adjustment."

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
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: integer
        description: "Checksum byte = low-order byte of sum of all preceding bytes."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value - see Appendix 'Supplementary Information by Command' (UNRESOLVED: code list not in this source)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target high byte: 96h = LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: integer
        description: "Target low byte: FFh (with data01=96h)."
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
      - name: data02
        type: integer
        description: "Key code high byte (00h for all listed keys)."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Response DATA01=FFh means ended with an error."

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
        type: integer
        description: "Lens target: 06h=Periphery Focus."
      - name: data02
        type: integer
        description: "Drive content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "After 7Fh/+ or 81h/- send 00h to stop. Lens can be re-driven without stop while moving."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens target (FFh=Stop - in that case mode/value ignored)."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Operates on the profile number selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h=freeze on, 02h=freeze off."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco mode value - see Appendix 'Supplementary Information by Command' (UNRESOLVED: code list not in this source)."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Sets 'Light mode' or 'Lamp mode' depending on projector."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..16} 00h {cks}"
    params:
      - name: data01_16
        type: string
        description: "Projector name, up to 16 bytes (NUL-terminated)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: pip_pictbypict_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: integer
        description: "Setting value. For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: value per Appendix (UNRESOLVED)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal - see Appendix 'Supplementary Information by Command' (UNRESOLVED)."
      - name: data02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
      - name: cks
        type: integer
        description: "Checksum byte."

  # --- Queries (kind: query) ---

  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-12 error bitmasks (cover/fan/temp/lamp/interlock/etc.)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage seconds (DATA01-04) and filter alarm start seconds (DATA05-08). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: data02
        type: integer
        description: "Content: 01h=lamp usage seconds, 04h=lamp remaining life (%)."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Reflects eco mode if enabled. Negative remaining life if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens target (matching 053 LENS CONTROL)."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns adjustment range upper/lower limits and current value."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns bitmask: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) - 0=Stop, 1=During operation."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected reference lens memory profile (00h=Profile 1, 01h=Profile 2)."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns status, range upper/lower, default, current, wide/narrow adjustment widths."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display flags."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h=Normal (cover opened), 01h=Cover closed."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns 'Light mode' or 'Lamp mode' value per Appendix (UNRESOLVED)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pictbypict_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, display signal type, video/sound/onscreen mute, freeze."
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response_success
    type: enum
    description: "Response frame prefix 2Xh/A0h/A1h/A2h/A3h indicates command accepted; data part returned for queries."
    values: [success]

  - id: command_response_error
    type: struct
    description: "Response frame A0h..A3h with ERR1/ERR2 codes per source error table."
    fields:
      - { name: err1, type: integer }
      - { name: err2, type: integer }
    notes: "ERR1/ERR2 combinations documented in source: 00h/00h=unrecognized, 00h/01h=not supported, 01h/00h=invalid value, 01h/01h=invalid input terminal, 01h/02h=invalid language, 02h/00h=memory alloc error, 02h/02h=memory in use, 02h/03h=value cannot be set, 02h/04h=forced onscreen mute on, 02h/06h=viewer error, 02h/07h=no signal, 02h/08h=test pattern/filter displayed, 02h/09h=no PC card, 02h/0Ah=memory operation error, 02h/0Ch=entry list displayed, 02h/0Dh=power off, 02h/0Eh=execution failed, 02h/0Fh=no authority, 03h/00h=incorrect gain number, 03h/01h=invalid gain, 03h/02h=adjustment failed."

  - id: error_status_bits
    type: struct
    description: "Bitmask error info from 009. ERROR STATUS REQUEST (DATA01-12)."
    notes: "DATA01: cover/fan/temp/power/lamp errors; DATA02: lamp usage limit/formatter/lamp2; DATA03: FPGA/temp-sensor/lamp-not-present/lamp-data/mirror-cover/lamp2-moratorium/lamp2-usage; DATA04: lamp2/temp-dust/foreign-matter/ballast/iris-cal/lens-not-installed; DATA09 extended: portrait-cover-up/interlock-open/system-error-slave/system-error-formatter."

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "From 078-2 RUNNING STATUS REQUEST DATA03 / DATA06."

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: picture_mute_state
    type: enum
    values: [off, on]

  - id: sound_mute_state
    type: enum
    values: [off, on]

  - id: onscreen_mute_state
    type: enum
    values: [off, on]

  - id: freeze_state
    type: enum
    values: [off, on]

  - id: cover_status
    type: enum
    values: [normal_opened, closed]

  - id: lens_operation_status
    type: struct
    description: "From 053-7 LENS INFORMATION REQUEST DATA01 bitmask."
    fields:
      - { name: lens_memory, type: enum, values: [stop, operating] }
      - { name: zoom, type: enum, values: [stop, operating] }
      - { name: focus, type: enum, values: [stop, operating] }
      - { name: lens_shift_h, type: enum, values: [stop, operating] }
      - { name: lens_shift_v, type: enum, values: [stop, operating] }
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "PICTURE/BRIGHTNESS adjusted via 030-1 (target 00h). Range queried via 060-1 (target 00h)."

  - id: contrast
    type: integer
    description: "PICTURE/CONTRAST adjusted via 030-1 (target 01h)."

  - id: color
    type: integer
    description: "PICTURE/COLOR adjusted via 030-1 (target 02h)."

  - id: hue
    type: integer
    description: "PICTURE/HUE adjusted via 030-1 (target 03h)."

  - id: sharpness
    type: integer
    description: "PICTURE/SHARPNESS adjusted via 030-1 (target 04h)."

  - id: volume
    type: integer
    description: "Sound volume adjusted via 030-2; queried via 060-1 (target 05h)."

  - id: lamp_light_adjust
    type: integer
    description: "LAMP/LIGHT ADJUST adjusted via 030-15 (target 96h FFh); queried via 060-1 (target 96h)."

  - id: aspect
    type: enum
    description: "Aspect ratio set via 030-12. Code list in Appendix (UNRESOLVED)."

  - id: eco_mode
    type: enum
    description: "Eco/Light/Lamp mode set via 098-8, queried via 097-8. Code list in Appendix (UNRESOLVED)."

  - id: projector_name
    type: string
    description: "LAN projector name (up to 16 bytes) set via 098-45, queried via 097-45."

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Reference lens memory profile selected via 053-10, queried via 053-11."

  - id: edge_blending_mode
    type: enum
    values: [off, on]

  - id: pip_pbyp_mode
    type: enum
    values: [pip, picture_by_picture]

  - id: pip_pbyp_start_position
    type: enum
    values: [top_left, top_right, bottom_left, bottom_right]
```

## Events
```yaml
events: []
# UNRESOLVED: source describes only request/response semantics; no unsolicited
# notifications documented.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational (not safety) constraints:
#  - POWER ON / POWER OFF reject all other commands during the on/off ramp
#    (including cooling time).
#  - "02h 0Dh" error: command rejected because power is off.
#  - Error status (009) reports interlock switch open (DATA09 bit1) and
#    portrait-cover-side-up (DATA09 bit0) - treat as device health signals.
# UNRESOLVED: no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements stated in this source extract.
```

## Notes
- Frame format: commands begin with a leading byte (00h–03h for queries/commands, 01h for FREEZE), followed by command-specific bytes, an ID1 (control ID) / ID2 (model code) pair on responses, a LEN byte, variable DATA bytes, and a trailing CKS checksum.
- Checksum: low-order one byte of the sum of all preceding bytes. Worked example from source: `20h 81h 01h 60h 01h 00h → 103h → CKS=03h`.
- Response prefixes: `2Xh` = success (no error block), `A0h/A1h/A2h/A3h` = carries `<ERR1> <ERR2>` failure block. The leading digit of the response byte matches the command's leading digit (e.g. command `02h ...` → success `22h ...`, error `A2h ...`).
- Lamp/filter usage times update at one-minute intervals even though stored in one-second units.
- RS-232 cable is a cross cable wired to the PC CONTROL D-SUB 9P port (pin 2↔3 RxD/TxD, pin 7↔8 RTS/CTS, pin 5 GND).
- LAN: wired RJ-45 (10/100 Mbps auto) or optional wireless LAN unit; TCP port 7142 for command send/receive on both.

<!-- UNRESOLVED: input terminal code list (referenced by 018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), base model type codes (078-1/305-1), sub-input setting values (097-198/098-198), and selection signal type details live in an "Appendix / Supplementary Information by Command" not included in this source extract. -->
<!-- UNRESOLVED: default baud rate among the five supported options not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:15:28.941Z
last_checked_at: 2026-06-17T19:34:35.776Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:34:35.776Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action-units matched literally in the source with correct hex sequences and parameters. Transport settings verified. Complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal code values, eco mode code values, base model type codes, and aspect values are referenced in an \"Appendix / Supplementary Information by Command\" that is not present in this source extract."
- "flow control not stated in source"
- "code list not in this source).\""
- "source describes only request/response semantics; no unsolicited"
- "source documents no multi-step command sequences."
- "no explicit safety warnings, interlock procedures, or"
- "input terminal code list (referenced by 018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), base model type codes (078-1/305-1), sub-input setting values (097-198/098-198), and selection signal type details live in an \"Appendix / Supplementary Information by Command\" not included in this source extract."
- "default baud rate among the five supported options not stated."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
