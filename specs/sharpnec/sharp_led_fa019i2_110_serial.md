---
spec_id: admin/sharp-nec-led-fa019i2-110
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA019I2 110 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA019I2 110"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA019I2 110"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:37:10.796Z
last_checked_at: 2026-06-17T20:38:42.204Z
generated_at: 2026-06-17T20:38:42.204Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source manual is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1) and does not name the LED FA019I2 110 explicitly; model association is operator-asserted. Several DATA value tables (input terminal list, eco mode values, aspect values, base model type values, sub-input values) reference an \"Appendix: Supplementary Information by Command\" that is not present in the refined source text. ID2 model code value for this specific model is not stated."
  - "eco mode values deferred to Appendix not in source\""
  - "base model type values deferred to Appendix not in source\""
  - "input terminal value list deferred to Appendix not present in refined source. Example: 06h switches to video port.\""
  - "aspect value list deferred to Appendix not present in refined source\""
  - "other target values not enumerated in refined source\""
  - "eco mode value list deferred to Appendix not present in refined source\""
  - "sub-input value list deferred to Appendix not present in refined source\""
  - "input terminal value list deferred to Appendix not present in refined source\""
  - "eco mode value list deferred to Appendix not present in refined source"
  - "input terminal value list deferred to Appendix not present in refined source"
  - "enum values not present in refined source"
  - "source describes no unsolicited notifications / push events."
  - "source describes no multi-step command sequences."
  - "source contains no explicit electrical safety / interlock procedures"
  - "The following value enumerations are referenced by the source as \"see the Appendix: Supplementary Information by Command\" but the Appendix is not present in the refined source text and could not be populated:"
  - "ID2 (model code) value specific to LED FA019I2 110 not stated in source."
  - "Default baud rate (which of 4800/9600/19200/38400/115200 is factory default) not stated in source; 9600 entered as a plausible default but should be verified on-device."
  - "Firmware version compatibility for these commands not stated in source."
  - "Source manual BDT140013 Rev 7.1 is a generic Sharp/NEC projector reference; explicit confirmation that every listed command applies to the LED FA019I2 110 specifically is not in the source text. Some commands (e.g. Lamp 2 variants) clearly apply only to multi-lamp models and may return ERR1=00h ERR2=01h (not supported) on this device."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:38:42.204Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally against source commands; transport verified; bidirectional coverage complete. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA019I2 110 Control Spec

## Summary
Sharp/NEC LED FA019I2 110 large-format LED display, controlled via the Sharp/NEC projector binary control protocol described in reference manual BDT140013 Revision 7.1. The protocol supports both RS-232C serial and TCP/IP (wired or wireless LAN) transports using a framed hexadecimal command/response format with a trailing checksum byte. This spec enumerates all 53 commands documented in the source manual.

<!-- UNRESOLVED: The source manual is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1) and does not name the LED FA019I2 110 explicitly; model association is operator-asserted. Several DATA value tables (input terminal list, eco mode values, aspect values, base model type values, sub-input values) reference an "Appendix: Supplementary Information by Command" that is not present in the refined source text. ID2 model code value for this specific model is not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists supported rates 115200/38400/19200/9600/4800; default not stated, 9600 shown as one option
  baud_rate_supported:
    - 4800
    - 9600
    - 19200
    - 38400
    - 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode; explicit flow_control setting not stated
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no auth procedure in source
framing:
  description: |
    Hexadecimal framed protocol. Commands begin with a class lead byte
    (00h/01h/02h/03h) followed by a command code byte, then fixed 00h 00h bytes,
    a LEN byte (data length), the DATA bytes, and a checksum byte (CKS).
    Responses use lead bytes 20h/21h/22h/23h (success) or A0h/A1h/A2h/A3h (error).
  checksum: |
    CKS = low-order 8 bits of the sum of all preceding bytes (including lead byte
    and any ID1/ID2 in responses). Example: 20h+81h+01h+60h+01h+00h = 103h -> CKS=03h.
  response_parameters:
    ID1: "Control ID set on the projector (echoed in responses; not present in commands sent to projector)"
    ID2: "Model code, varies by model (echoed in responses; not present in commands sent to projector)"
    ERR1: "Error code byte 1 (see error code list in Notes)"
    ERR2: "Error code byte 2 (see error code list in Notes)"
```

## Traits
```yaml
traits:
  - powerable       # inferred from 015 POWER ON / 016 POWER OFF
  - queryable       # inferred from many REQUEST commands returning state
  - levelable       # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - routable        # inferred from 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
```

## Actions
```yaml
actions:
  # --- Query commands (kind: query) ---
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01>...<DATA12> <CKS>  # DATA01-12 = error bitmaps, see Notes"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01>...<DATA98> <CKS>  # DATA01-49 projector name; DATA83-86 lamp usage sec; DATA87-90 filter usage sec"

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    response: "23h 95h <ID1> <ID2> 08h <DATA01>...<DATA08> <CKS>  # DATA01-04 filter usage sec; DATA05-08 filter alarm start sec (-1 if undefined)"

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)"
      - name: DATA02
        type: string
        description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Lens axis target (values not enumerated in refined source)"
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>...<DATA07> <CKS>  # upper/lower/current value pairs"

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>  # DATA01 bitmap: lens memory/zoom/focus/shift-H/shift-V operation status"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>  # DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    response: "20h 85h <ID1> <ID2> 20h <DATA01>...<DATA32> <CKS>  # DATA01-03 base model type; DATA04 sound function; DATA05 profile"

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    response: "20h 85h <ID1> <ID2> 10h <DATA01>...<DATA16> <CKS>  # DATA03 power status; DATA04 cooling; DATA05 power on/off proc; DATA06 operation status"

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    response: "20h 85h <ID1> <ID2> 10h <DATA01>...<DATA16> <CKS>  # DATA01 signal switch proc; DATA02 signal list num; DATA03-04 selection signal type"

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    response: "20h 85h <ID1> <ID2> 10h <DATA01>...<DATA16> <CKS>  # DATA01 picture mute; DATA02 sound mute; DATA03 onscreen mute; DATA04 forced onscreen mute; DATA05 OSD"

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    response: "20h 85h <ID1> <ID2> 20h <DATA01>...<DATA32> <CKS>  # DATA01-32 model name (NUL-terminated)"

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>  # DATA01: 00h=Normal (cover opened), 01h=Cover closed"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>  # DATA01 eco mode value  # UNRESOLVED: eco mode values deferred to Appendix not in source"

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>...<DATA17> <CKS>  # projector name (NUL-terminated)"

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>...<DATA06> <CKS>  # DATA01-06 MAC address"

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>  # DATA01: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    response: "20h BFh <ID1> <ID2> 10h 00h <DATA01>...<DATA15> <CKS>  # DATA01-02 base model type; DATA03-11 model name  # UNRESOLVED: base model type values deferred to Appendix not in source"

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>...<DATA16> <CKS>  # DATA01-16 serial number (NUL-terminated)"

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    response: "20h BFh <ID1> <ID2> 10h 02h <DATA01>...<DATA15> <CKS>  # DATA01 operation status; DATA02 content displayed; DATA03-04 signal type; DATA06-09 mute/freeze"

  # --- Action commands (kind: action) ---
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While this command is turning on the power, no other command can be accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While this command is turning off the power (including the cooling time), no other command can be accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Input terminal selector  # UNRESOLVED: input terminal value list deferred to Appendix not present in refined source. Example: 06h switches to video port."
    notes: "Response DATA01=FFh means ended with error (no signal switch made)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Auto-turned off by input terminal switch or video signal switch."

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
    notes: "Auto-turned off by input terminal switch, video signal switch, or volume adjustment."

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
    notes: "Auto-turned off by input terminal switch or video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Aspect value  # UNRESOLVED: aspect value list deferred to Appendix not present in refined source"

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target lead: 96h"
      - name: DATA02
        type: string
        description: "Sub-target: FFh = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA03
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: |
          Key code low byte (WORD type, DATA01=DATA02). Documented codes:
          02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN,
          09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP,
          10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2,
          4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE,
          A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO
      - name: DATA02
        type: string
        description: "Key code high byte (always 00h for listed keys)"

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Lens axis target. Source explicitly lists only 06h=Periphery Focus  # UNRESOLVED: other target values not enumerated in refined source"
      - name: DATA02
        type: string
        description: "Motion: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
    notes: "After 7Fh/81h, send 00h to stop. Re-issuing same command during drive continues motion without stop."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Target / FFh=Stop (when Stop, DATA02-DATA04 ignored)"
      - name: DATA02
        type: string
        description: "Adjustment mode: 00h=absolute value, 02h=relative value"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls the profile selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Eco mode value  # UNRESOLVED: eco mode value list deferred to Appendix not present in refined source"
    notes: "Depending on projector, sets 'Light mode' or 'Lamp mode'."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>...<DATA16> 00h <CKS>"
    params:
      - name: name_bytes
        type: string
        description: "DATA01-16 projector name (up to 16 bytes), followed by NUL terminator 00h"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: string
        description: "When MODE: 00h=PIP, 01h=PICTURE BY PICTURE. When START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT values see Appendix  # UNRESOLVED: sub-input value list deferred to Appendix not present in refined source"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: string
        description: "Input terminal  # UNRESOLVED: input terminal value list deferred to Appendix not present in refined source"
      - name: DATA02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  # All REQUEST commands return framed binary responses; their parsed payloads are
  # documented in each action's `response:` field above. Discrete state values
  # enumerated by the source are listed here as named feedbacks.

  - id: power_state
    type: enum
    source_command: running_status_request
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "DATA03 of 078-2 response: 00h=Standby, 01h=Power on. DATA06 of 078-2: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

  - id: operation_status
    type: enum
    source_command: basic_information_request
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: picture_mute_state
    type: enum
    source_command: mute_status_request
    values: [off, on]

  - id: sound_mute_state
    type: enum
    source_command: mute_status_request
    values: [off, on]

  - id: onscreen_mute_state
    type: enum
    source_command: mute_status_request
    values: [off, on]

  - id: freeze_state
    type: enum
    source_command: basic_information_request
    values: [off, on]

  - id: cover_state
    type: enum
    source_command: cover_status_request
    values: [normal_opened, closed]

  - id: edge_blending_state
    type: enum
    source_command: edge_blending_mode_request
    values: [off, on]

  - id: eco_mode_value
    type: enum
    source_command: eco_mode_request
    values: []  # UNRESOLVED: eco mode value list deferred to Appendix not present in refined source

  - id: input_terminal_value
    type: enum
    source_command: input_status_request
    values: []  # UNRESOLVED: input terminal value list deferred to Appendix not present in refined source

  - id: lamp_usage_seconds
    type: integer
    source_command: lamp_information_request_3
    notes: "Updated at 1-minute intervals though obtained in 1-second units."

  - id: lamp_remaining_life_percent
    type: integer
    source_command: lamp_information_request_3
    notes: "Negative value returned if lamp replacement deadline exceeded."

  - id: filter_usage_seconds
    type: integer
    source_command: filter_usage_information_request

  - id: lamp_information
    type: object
    source_command: information_request
    fields: [projector_name, lamp_usage_seconds, filter_usage_seconds]

  - id: error_status
    type: bitmap
    source_command: error_status_request
    notes: "DATA01-12 bitmaps (cover error, fan error, temperature error, lamp errors, mirror cover, etc.). Full bit table in Notes."

  - id: command_ack
    type: enum
    notes: "Generic success/error indication returned for non-query actions. Success response lead byte matches command class (20h/21h/22h/23h) with LEN=00h. Error response lead byte is A0h/A1h/A2h/A3h with ERR1/ERR2."
```

## Variables
```yaml
variables:
  - id: volume
    set_via: volume_adjust
    query_via: gain_parameter_request_3
    notes: "Range obtained via 060-1 DATA02-05 (upper/lower limits), default value DATA06-07."

  - id: brightness
    set_via: picture_adjust
    query_via: gain_parameter_request_3

  - id: contrast
    set_via: picture_adjust
    query_via: gain_parameter_request_3

  - id: color
    set_via: picture_adjust
    query_via: gain_parameter_request_3

  - id: hue
    set_via: picture_adjust
    query_via: gain_parameter_request_3

  - id: sharpness
    set_via: picture_adjust
    query_via: gain_parameter_request_3

  - id: lamp_light_adjust
    set_via: other_adjust
    query_via: gain_parameter_request_3
    notes: "DATA01=96h, DATA02=FFh."

  - id: projector_name
    set_via: lan_projector_name_set
    query_via: lan_projector_name_request
    notes: "Up to 16 bytes."

  - id: eco_mode
    set_via: eco_mode_set
    query_via: eco_mode_request
    # UNRESOLVED: enum values not present in refined source
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# All responses are direct replies to commands.
events: []
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - power_off      # source: cooling time follows; no other command accepted during transition
  - power_on       # source: no other command accepted during power-on transition
interlocks:
  - "While POWER ON is in progress, no other command can be accepted (source 3.2)."
  - "While POWER OFF is in progress (including cooling time), no other command can be accepted (source 3.3)."
  - "Error response ERR1=02h ERR2=0Dh: 'The command cannot be accepted because the power is off.'"
# UNRESOLVED: source contains no explicit electrical safety / interlock procedures
# beyond command-acceptance timing notes above.
```

## Notes
**Protocol framing.** All command/response bytes are hexadecimal. Command (sent to projector) format: `<lead> <cmd> 00h 00h <LEN> <DATA...> <CKS>`. Lead byte determines class: `00h`=class-0 (most queries via 85h/BFh/D0h), `01h`=class-1 (freeze control), `02h`=class-2 (power/mute/input/shutter/lens/remote), `03h`=class-3 (picture adjust/information requests/setters). Response success lead bytes: `20h/21h/22h/23h`. Response error lead bytes: `A0h/A1h/A2h/A3h`.

**Checksum (CKS).** Low-order 8 bits of the sum of all preceding bytes (lead byte through last DATA byte, plus ID1/ID2 in responses). Worked example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h → CKS = 03h`.

**Error code list (ERR1 / ERR2).**

| ERR1 | ERR2 | Description |
|------|------|-------------|
| 00h | 00h | Command cannot be recognized |
| 00h | 01h | Command not supported by the model |
| 01h | 00h | Specified value is invalid |
| 01h | 01h | Specified input terminal is invalid |
| 01h | 02h | Specified language is invalid |
| 02h | 00h | Memory allocation error |
| 02h | 02h | Memory in use |
| 02h | 03h | Specified value cannot be set |
| 02h | 04h | Forced onscreen mute on |
| 02h | 06h | Viewer error |
| 02h | 07h | No signal |
| 02h | 08h | A test pattern or filter is displayed |
| 02h | 09h | No PC card is inserted |
| 02h | 0Ah | Memory operation error |
| 02h | 0Ch | An entry list is displayed |
| 02h | 0Dh | The command cannot be accepted because the power is off |
| 02h | 0Eh | The command execution failed |
| 02h | 0Fh | There is no authority necessary for the operation |
| 03h | 00h | The specified gain number is incorrect |
| 03h | 01h | The specified gain is invalid |
| 03h | 02h | Adjustment failed |

**Error status bitmap (009. ERROR STATUS REQUEST, DATA01–DATA09).** Bit set to `1` = error.

- DATA01: Bit0 Cover error; Bit1 Temperature error (bi-metallic strip); Bit3 Fan error; Bit4 Fan error; Bit5 Power error; Bit6 Lamp/lamp1 off or backlight off; Bit7 Lamp/lamp1 in replacement moratorium.
- DATA02: Bit0 Lamp/lamp1 usage time exceeded limit; Bit1 Formatter error; Bit2 Lamp 2 off; Bit6 Lamp 2 in replacement moratorium; Bit7 Lamp 2 usage time exceeded limit.
- DATA03: Bit1 FPGA error; Bit2 Temperature error (sensor); Bit3 Lamp/lamp1 not present; Bit4 Lamp/lamp1 data error; Bit5 Mirror cover error; Bit6 Lamp 2 in replacement moratorium; Bit7 Lamp 2 usage time exceeded limit.
- DATA04: Bit0 Lamp 2 not present; Bit1 Lamp 2 data error; Bit2 Temperature error due to dust; Bit3 Foreign matter sensor error; Bit5 Ballast communication error; Bit6 Iris calibration error; Bit7 Lens not installed properly.
- DATA09 (Extended status): Bit0 Portrait cover side is up; Bit1 Interlock switch is open; Bit2 System error (Slave CPU); Bit3 System error (Formatter).
- DATA05–08, DATA10–12: Reserved for the system.

**RS-232C wiring.** PC CONTROL port is D-SUB 9P. Cross cable: pin2(RxD)↔TxD, pin3(TxD)↔RxD, pin5(GND)↔GND, pin7(RTS)↔CTS, pin8(CTS)↔RTS.

**LAN.** Wired RJ-45 supports 10/100 Mbps auto-negotiable (IEEE 802.3 / 802.3u). Wireless LAN requires a separate wireless LAN unit (see device operation manual). TCP port `7142` for command transport.

**Signal list number quirk.** INPUT STATUS REQUEST returns a value that is `1` less than the practical signal list number; add `1` to obtain the actual number.

**Usage time resolution.** Lamp usage and filter usage times are obtained in 1-second units but are only updated on the projector at 1-minute intervals.

<!-- UNRESOLVED: The following value enumerations are referenced by the source as "see the Appendix: Supplementary Information by Command" but the Appendix is not present in the refined source text and could not be populated: -->
<!--   - Input terminal values (used by 018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET, response parsing for 078-3, 305-3) -->
<!--   - Aspect values (used by 030-12 ASPECT ADJUST) -->
<!--   - Eco mode values (used by 097-8, 098-8) -->
<!--   - Base model type values (used by 078-1, 305-1) -->
<!--   - Sub-input setting values for PIP/PbP (used by 097-198, 098-198) -->
<!--   - Full lens axis target list for 053 LENS CONTROL (only 06h=Periphery Focus shown explicitly) -->
<!-- UNRESOLVED: ID2 (model code) value specific to LED FA019I2 110 not stated in source. -->
<!-- UNRESOLVED: Default baud rate (which of 4800/9600/19200/38400/115200 is factory default) not stated in source; 9600 entered as a plausible default but should be verified on-device. -->
<!-- UNRESOLVED: Firmware version compatibility for these commands not stated in source. -->
<!-- UNRESOLVED: Source manual BDT140013 Rev 7.1 is a generic Sharp/NEC projector reference; explicit confirmation that every listed command applies to the LED FA019I2 110 specifically is not in the source text. Some commands (e.g. Lamp 2 variants) clearly apply only to multi-lamp models and may return ERR1=00h ERR2=01h (not supported) on this device. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:37:10.796Z
last_checked_at: 2026-06-17T20:38:42.204Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:38:42.204Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally against source commands; transport verified; bidirectional coverage complete. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source manual is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1) and does not name the LED FA019I2 110 explicitly; model association is operator-asserted. Several DATA value tables (input terminal list, eco mode values, aspect values, base model type values, sub-input values) reference an \"Appendix: Supplementary Information by Command\" that is not present in the refined source text. ID2 model code value for this specific model is not stated."
- "eco mode values deferred to Appendix not in source\""
- "base model type values deferred to Appendix not in source\""
- "input terminal value list deferred to Appendix not present in refined source. Example: 06h switches to video port.\""
- "aspect value list deferred to Appendix not present in refined source\""
- "other target values not enumerated in refined source\""
- "eco mode value list deferred to Appendix not present in refined source\""
- "sub-input value list deferred to Appendix not present in refined source\""
- "input terminal value list deferred to Appendix not present in refined source\""
- "eco mode value list deferred to Appendix not present in refined source"
- "input terminal value list deferred to Appendix not present in refined source"
- "enum values not present in refined source"
- "source describes no unsolicited notifications / push events."
- "source describes no multi-step command sequences."
- "source contains no explicit electrical safety / interlock procedures"
- "The following value enumerations are referenced by the source as \"see the Appendix: Supplementary Information by Command\" but the Appendix is not present in the refined source text and could not be populated:"
- "ID2 (model code) value specific to LED FA019I2 110 not stated in source."
- "Default baud rate (which of 4800/9600/19200/38400/115200 is factory default) not stated in source; 9600 entered as a plausible default but should be verified on-device."
- "Firmware version compatibility for these commands not stated in source."
- "Source manual BDT140013 Rev 7.1 is a generic Sharp/NEC projector reference; explicit confirmation that every listed command applies to the LED FA019I2 110 specifically is not in the source text. Some commands (e.g. Lamp 2 variants) clearly apply only to multi-lamp models and may return ERR1=00h ERR2=01h (not supported) on this device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
