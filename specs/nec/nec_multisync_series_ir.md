---
spec_id: admin/nec-multisync-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC MultiSync Series Control Spec"
manufacturer: NEC
model_family: "MultiSync Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "MultiSync Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - nec.com.au
  - sharpdisplays.eu
source_urls:
  - https://www.nec.com.au/application/files/3215/5047/0097/nec-external-control-v652.pdf
  - "https://www.sharpdisplays.eu/p/download/v/bfc291e11720db7b0e2587af7f7a1d8c/cp/Products/LargeFormatDisplays/Products/CurrentProducts/Shared/Command_Lists/External_Control_Rev.4.4.pdf?fn=External_Control_Rev.4.4.pdf"
retrieved_at: 2026-09-03T14:02:02.190Z
last_checked_at: 2026-09-14T22:18:09.999Z
generated_at: 2026-09-14T22:18:09.999Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific MultiSync model numbers and firmware version compatibility not stated in source. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub input values) is referenced by the source but not included in it."
  - "flow control not stated in source (RTS/CTS pins wired on PC CONTROL connector; communication mode is full duplex)"
  - "aspect values not in source"
  - "target values not stated in source"
  - "non-stop target values not stated in source"
  - "eco mode values not in source"
  - "sub input values not in source"
  - "input terminal values not in source"
  - "value meanings not in source"
  - "type values not in source"
  - "no unsolicited notifications documented in source; all responses are"
  - "no multi-step sequences documented in source."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "specific model list for the MultiSync series not stated in source."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values (018, 319-10), aspect values (030-12), eco mode values (097-8/098-8), base model type values (078-1/305-1), PIP/PbP sub input values (097-198/098-198), and selection signal type details (078-3) — not included in this source document."
  - "053-1 lens adjustment target values and non-stop 053-2 DATA01 target values not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-09-14T22:18:09.999Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands map one-to-one to source commands (009/015/016/018...319-10) with identical hex opcodes and parameter shapes; transport port/baud/data/parity values verbatim in source. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NEC MultiSync Series Control Spec

## Summary
NEC MultiSync series projector control spec derived from the "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). Covers RS-232C serial control (PC CONTROL port, D-SUB 9P) and LAN control (wired/wireless, TCP port 7142) using binary hexadecimal command frames with a checksum byte. Includes power, input switching, mute, picture/volume/aspect adjustment, lens control and memory, lamp/filter/carbon usage queries, and status/information requests.

<!-- UNRESOLVED: specific MultiSync model numbers and firmware version compatibility not stated in source. Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub input values) is referenced by the source but not included in it. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # one of 4800 / 9600 / 19200 / 38400 / 115200 bps (all listed as supported in source)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired on PC CONTROL connector; communication mode is full duplex)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (inferred from POWER ON / POWER OFF commands 015/016)
# - routable     (inferred from INPUT SW CHANGE command 018)
# - queryable    (inferred from extensive query command set: 009, 037, 078, 097, 305, etc.)
# - levelable    (inferred from VOLUME ADJUST 030-2 and PICTURE ADJUST 030-1)
traits:
  - powerable  # inferred from power command examples
  - routable   # inferred from routing command examples
  - queryable  # inferred from query command examples
  - levelable  # inferred from volume/gain command examples
```

## Actions
```yaml
# All command payloads are verbatim hex byte strings from the source.
# {CKS} = checksum byte: sum of all preceding bytes, low-order one byte (see Notes).
# Responses carry <ID1> (control ID) and <ID2> (model code); error responses use
# A0h-A3h prefix with <ERR1> <ERR2> (see Feedbacks: command_error).
actions:
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
    notes: While this command is turning on the power, no other command can be accepted.

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While turning off the power (including the cooling time), no other command can be accepted.

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "Input terminal byte. Values defined in source Appendix (not included). Example from source: 06h = Video."
    notes: "Example (switch to Video, DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means ended with an error (no signal switch made)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Picture mute is turned off by input terminal switch or video signal switch.

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
    notes: Sound mute is turned off by input terminal switch, video signal switch, or sound volume adjustment.

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
    notes: Onscreen mute is turned off by input terminal switch or video signal switch.

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h absolute value, 01h relative value"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example (brightness +10 absolute): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example (brightness -10): 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h absolute value, 01h relative value"
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example (volume to 10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: data01
        type: string
        description: "Value set for the aspect. Values defined in source Appendix (not included)."  # UNRESOLVED: aspect values not in source

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte: 96h (with DATA02=FFh) = LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: string
        description: "Adjustment target low byte: FFh = LAMP ADJUST / LIGHT ADJUST"
      - name: data03
        type: string
        description: "Adjustment mode: 00h absolute value, 01h relative value"
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "Lamp: 00h Lamp 1, 01h Lamp 2 (Lamp 2 only on two-lamp models)"
      - name: data02
        type: string
        description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"
    notes: "Example (lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch. When eco mode is enabled, values reflect eco mode."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "Key code (WORD type) low byte, see data02"
      - name: data02
        type: string
        description: "Key code high byte (always 00h in source list). Key codes (key / DATA01 / name): 2/02h POWER ON, 3/03h POWER OFF, 5/05h AUTO, 6/06h MENU, 7/07h UP, 8/08h DOWN, 9/09h RIGHT, 10/0Ah LEFT, 11/0Bh ENTER, 12/0Ch EXIT, 13/0Dh HELP, 15/0Fh MAGNIFY UP, 16/10h MAGNIFY DOWN, 19/13h MUTE, 41/29h PICTURE, 75/4Bh COMPUTER1, 76/4Ch COMPUTER2, 79/4Fh VIDEO1, 81/51h S-VIDEO1, 132/84h VOLUME UP, 133/85h VOLUME DOWN, 138/8Ah FREEZE, 163/A3h ASPECT, 215/D7h SOURCE, 238/EEh LAMP MODE/ECO"
    notes: "Example (AUTO key): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means ended with an error."

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
      - name: data01
        type: string
        description: "Adjustment target: 06h Periphery Focus"
      - name: data02
        type: string
        description: "00h Stop, 01h drive 1s plus, 02h drive 0.5s plus, 03h drive 0.25s plus, 7Fh drive plus (continuous), 81h drive minus (continuous), FDh drive 0.25s minus, FEh drive 0.5s minus, FFh drive 1s minus"
    notes: After 7Fh/81h continuous drive, stop by sending 00h. While the lens is being driven, the same command can be reissued without a stop.

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: data01
        type: string
        description: "Lens adjustment target (value meanings not enumerated in source)"  # UNRESOLVED: target values not stated in source

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: data01
        type: string
        description: "FFh Stop (other target values not enumerated in source)"  # UNRESOLVED: non-stop target values not stated in source
      - name: data02
        type: string
        description: "Adjustment mode: 00h absolute value, 02h relative value"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: If DATA01 is FFh (Stop), the adjustment mode and value are not referenced.

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h MOVE, 01h STORE, 02h RESET"
    notes: Controls the profile number specified by 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h OFF, 01h ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h Profile 1, 01h Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST"
    notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

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

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "01h freeze on, 02h freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h horizontal synchronous frequency, 04h vertical synchronous frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Depending on the projector, the value for "Light mode" or "Lamp mode" is returned.

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "Value set for the eco mode. Values defined in source Appendix (not included)."  # UNRESOLVED: eco mode values not in source
    notes: Depending on the projector, the "Light mode" or "Lamp mode" is set.

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} - {DATA16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: "Projector name, DATA01-DATA16 (up to 16 bytes)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: data02
        type: string
        description: "When DATA01=00h MODE: 00h PIP, 01h PICTURE BY PICTURE. When DATA01=01h START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT. When DATA01=02h/09h/0Ah: sub input setting value (values in source Appendix, not included)."  # UNRESOLVED: sub input values not in source

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h OFF, 01h ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

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

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: data01
        type: string
        description: "Input terminal. Values defined in source Appendix (not included)."  # UNRESOLVED: input terminal values not in source
      - name: data02
        type: string
        description: "Setting value: 00h audio from terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_error
    type: object
    description: >-
      Error response frame (prefix A0h/A1h/A2h/A3h matching command class) with <ERR1> <ERR2>.
      00h/00h command not recognized; 00h/01h not supported by model; 01h/00h specified value invalid;
      01h/01h specified input terminal invalid; 01h/02h specified language invalid; 02h/00h memory
      allocation error; 02h/02h memory in use; 02h/03h specified value cannot be set; 02h/04h forced
      onscreen mute on; 02h/06h viewer error; 02h/07h no signal; 02h/08h test pattern or filter displayed;
      02h/09h no PC card inserted; 02h/0Ah memory operation error; 02h/0Ch entry list displayed;
      02h/0Dh command not accepted because power is off; 02h/0Eh command execution failed;
      02h/0Fh no authority for the operation; 03h/00h specified gain number incorrect;
      03h/01h specified gain invalid; 03h/02h adjustment failed.

  - id: error_status
    type: bitmap
    description: >-
      Response to 009. DATA01-DATA12, bit=1 means error. DATA01: cover error, temperature error
      (bi-metallic strip), fan error, power error, lamp off/backlight off, lamp in replacement
      moratorium. DATA02: lamp usage time exceeded, formatter error, lamp 2 off, lamp 2 in
      replacement moratorium, lamp 2 usage time exceeded. DATA03: FPGA error, temperature error
      (sensor), lamp not present, lamp data error, mirror cover error, lamp 2 not present,
      lamp 2 data error, temperature error due to dust, foreign matter sensor error, ballast
      communication error, iris calibration error, lens not installed properly. DATA05-08 and
      DATA10-12 reserved. DATA09 extended: portrait cover side up, interlock switch open,
      system error (Slave CPU), system error (Formatter).

  - id: projector_information
    type: object
    description: "Response to 037. DATA01-49 projector name (NUL-terminated), DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds). Updated at one-minute intervals."

  - id: filter_usage_information
    type: object
    description: "Response to 037-3. DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time (seconds); -1 if no time defined."

  - id: lamp_information
    type: object
    description: "Response to 037-4. DATA01 lamp (00h Lamp 1 / 01h Lamp 2), DATA02 content (01h usage seconds / 04h remaining life %), DATA03-06 value. Negative remaining life if replacement deadline exceeded. Reflects eco mode when enabled."

  - id: carbon_savings
    type: object
    description: "Response to 037-6. DATA01 type (00h total / 01h during operation), DATA02-05 kilograms (max 99999 kg), DATA06-09 milligrams (max 999999 mg)."

  - id: lens_position
    type: object
    description: "Response to 053-1. DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (each 16-bit little-endian)."

  - id: lens_status
    type: bitmap
    description: "Response to 053-7. DATA01 operation bits: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift (H), Bit4 lens shift (V) - 0 stop / 1 during operation. Bits 5-7 reserved."

  - id: gain_parameter
    type: object
    description: "Response to 060-1. DATA01 status (00h display not possible, 01h adjustment not possible, 02h adjustment possible, FFh gain does not exist), DATA02-05 upper/lower limits, DATA06-07 default, DATA08-09 current value, DATA10-13 wide/narrow adjustment widths, DATA14 default validity (00h invalid / 01h valid)."

  - id: settings_information
    type: object
    description: "Response to 078-1. DATA01-03 base model type, DATA04 sound function (00h not available / 01h available), DATA05 profile (00h not available, 01h clock function, 02h sleep timer, 03h both)."

  - id: running_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "Response to 078-2. DATA06 operation status: 00h Standby (Sleep), 04h Power on, 05h Cooling, 06h Standby (error), 0Fh Standby (Power saving), 10h Network standby. Also DATA03 power status (00h standby / 01h power on), DATA04 cooling process, DATA05 power on/off process (00h not executed / 01h during execution / FFh not supported)."

  - id: input_status
    type: object
    description: "Response to 078-3. DATA01 signal switch process (00h not executed / 01h during execution / FFh not supported), DATA02 signal list number minus 1 (00h-C7h / FFh not supported), DATA03 selection signal type 1 (01h-05h = 1-5), DATA04 selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER(1-5), 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER(6-10), FFh Not Source Input), DATA05 signal list type (00h Default / 01h User), DATA06 test pattern display, DATA09 content displayed (00h video, 01h no signal, 02h viewer, 03h test pattern, 04h LAN, FFh not supported)."

  - id: mute_status
    type: object
    description: "Response to 078-4. DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display - each 00h off/not displayed, 01h on/displayed."

  - id: model_name
    type: string
    description: "Response to 078-5. DATA01-32 model name (NUL-terminated)."

  - id: cover_status
    type: enum
    values: [normal_cover_open, cover_closed]
    description: "Response to 078-6. 00h normal (cover opened), 01h cover closed (mirror cover or lens cover)."

  - id: information_string
    type: string
    description: "Response to 084. DATA01 information type (03h horizontal sync frequency / 04h vertical sync frequency), DATA02 string length, DATA03.. string (NUL-terminated)."

  - id: eco_mode_value
    type: string
    description: "Response to 097-8. DATA01 eco mode value. Value meanings defined in source Appendix (not included)."  # UNRESOLVED: value meanings not in source

  - id: lan_projector_name
    type: string
    description: "Response to 097-45. DATA01-17 projector name (NUL-terminated)."

  - id: mac_address
    type: string
    description: "Response to 097-155. DATA01-06 MAC address bytes."

  - id: pip_pbp_settings
    type: object
    description: "Response to 097-198. DATA01 target (00h MODE / 01h START POSITION / 02h SUB INPUT 1 / 09h SUB INPUT 2 / 0Ah SUB INPUT 3), DATA02 value. MODE: 00h PIP, 01h PICTURE BY PICTURE. START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT."

  - id: edge_blending_mode
    type: enum
    values: ["off", "on"]
    description: "Response to 097-243-1. DATA01: 00h OFF, 01h ON."

  - id: base_model_type
    type: object
    description: "Response to 305-1. DATA01-02 base model type, DATA03-11 model name (NUL-terminated), DATA12-13 base model type. Type value meanings defined in source Appendix (not included)."  # UNRESOLVED: type values not in source

  - id: serial_number
    type: string
    description: "Response to 305-2. DATA01-16 serial number (NUL-terminated)."

  - id: basic_information
    type: object
    description: "Response to 305-3. DATA01 operation status (00h Standby (Sleep), 04h Power on, 05h Cooling, 06h Standby (error), 0Fh Standby (Power saving), 10h Network standby), DATA02 content displayed (00h video, 01h no signal, 02h viewer, 03h test pattern, 04h LAN, 05h test pattern (user), 10h signal being switched), DATA03 selection signal type 1, DATA04 selection signal type 2, DATA05 display signal type (video formats NTSC3.58/NTSC4.43/PAL/PAL60/SECAM/etc.), DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status (00h off / 01h on)."
```

## Variables
```yaml
# All settable parameters in this source are discrete commands with explicit payloads
# and are represented as Actions (volume_adjust, picture_adjust, aspect_adjust,
# other_adjust, eco_mode_set, lan_projector_name_set, pip_picture_by_picture_set,
# edge_blending_mode_set, audio_select_set, lens_memory_option_set, lens_profile_set).
variables: []
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source; all responses are
# replies to commands.
events: []
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Note: 009 ERROR STATUS DATA09 Bit1 reports
# "The interlock switch is open" as an error status bit only - no procedure given.
```

## Notes
- Command/response frames are hexadecimal byte strings. Common parameters: `<ID1>` control ID set on projector, `<ID2>` model code (varies by model), `<CKS>` checksum, `<LEN>` data length in bytes following LEN, `<ERR1>/<ERR2>` response error codes.
- Checksum: add all preceding bytes, use the low-order one byte of the result. Source example: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- Successful responses are returned prefixed 20h/21h/22h/23h (matching the 00h/01h/02h/03h command class) with no data part when the command does not request data, or with data added when it does. Failed responses are prefixed A0h/A1h/A2h/A3h with `<ERR1> <ERR2> <CKS>`.
- POWER ON (015): no other command accepted while turning on. POWER OFF (016): no other command accepted while turning off, including the cooling time.
- Picture mute (020) and onscreen mute (024) are cleared by input terminal switch or video signal switch. Sound mute (022) is additionally cleared by volume adjustment.
- Lamp usage time (037, 037-4) and filter usage time are obtainable in one-second units but updated at one-minute intervals.
- Lamp remaining life (%) is negative if the lamp replacement deadline is exceeded (037-4).
- Serial cable is a cross cable to the PC CONTROL port (D-SUB 9P; pin 2 RxD, pin 3 TxD, pin 5 GND, pin 7 RTS, pin 8 CTS). LAN: wired RJ-45 (10/100 Mbps auto-switchable, IEEE802.3/802.3u) or optional wireless LAN unit; TCP port 7142 for command send/receive.
- Remote key codes (050) are WORD values; see action params for the full 24-key list.

<!-- UNRESOLVED: specific model list for the MultiSync series not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values (018, 319-10), aspect values (030-12), eco mode values (097-8/098-8), base model type values (078-1/305-1), PIP/PbP sub input values (097-198/098-198), and selection signal type details (078-3) — not included in this source document. -->
<!-- UNRESOLVED: 053-1 lens adjustment target values and non-stop 053-2 DATA01 target values not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - nec.com.au
  - sharpdisplays.eu
source_urls:
  - https://www.nec.com.au/application/files/3215/5047/0097/nec-external-control-v652.pdf
  - "https://www.sharpdisplays.eu/p/download/v/bfc291e11720db7b0e2587af7f7a1d8c/cp/Products/LargeFormatDisplays/Products/CurrentProducts/Shared/Command_Lists/External_Control_Rev.4.4.pdf?fn=External_Control_Rev.4.4.pdf"
retrieved_at: 2026-09-03T14:02:02.190Z
last_checked_at: 2026-09-14T22:18:09.999Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:18:09.999Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands map one-to-one to source commands (009/015/016/018...319-10) with identical hex opcodes and parameter shapes; transport port/baud/data/parity values verbatim in source. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific MultiSync model numbers and firmware version compatibility not stated in source. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model type values, PIP/PbP sub input values) is referenced by the source but not included in it."
- "flow control not stated in source (RTS/CTS pins wired on PC CONTROL connector; communication mode is full duplex)"
- "aspect values not in source"
- "target values not stated in source"
- "non-stop target values not stated in source"
- "eco mode values not in source"
- "sub input values not in source"
- "input terminal values not in source"
- "value meanings not in source"
- "type values not in source"
- "no unsolicited notifications documented in source; all responses are"
- "no multi-step sequences documented in source."
- "source contains no explicit safety warnings, interlock procedures, or"
- "specific model list for the MultiSync series not stated in source."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values (018, 319-10), aspect values (030-12), eco mode values (097-8/098-8), base model type values (078-1/305-1), PIP/PbP sub input values (097-198/098-198), and selection signal type details (078-3) — not included in this source document."
- "053-1 lens adjustment target values and non-stop 053-2 DATA01 target values not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
