---
spec_id: admin/sharp-nec-nc1402l
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC1402L Control Spec"
manufacturer: Sharp/NEC
model_family: NC1402L
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC1402L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:26:52.435Z
last_checked_at: 2026-06-18T08:32:17.939Z
generated_at: 2026-06-18T08:32:17.939Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a shared command-reference manual; model-specific value tables (input terminal codes, aspect values, eco mode values, base model types, sub-input values) are referenced as an external \"Appendix: Supplementary Information by Command\" not present in the refined source."
  - "RTS/CTS pins present on D-SUB 9P but flow control mode not stated in source"
  - "enum values referenced to external Appendix, not in refined source"
  - "absolute min/max range referenced to GAIN PARAMETER REQUEST 3 response, not fixed in source"
  - "source contains no explicit power-on sequencing procedure, credential-gated"
  - "model-specific enum tables (input terminal codes, aspect values, eco mode values, base model types, sub-input values, signal type mappings) referenced as \"Appendix: Supplementary Information by Command\" — not present in the refined source document."
  - "firmware version compatibility not stated."
  - "serial flow_control mode not stated (RTS/CTS pins wired but config undisclosed)."
  - "exact min/max adjustment ranges for volume/picture levels are device-reported via GAIN PARAMETER REQUEST 3, not fixed in the manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:32:17.939Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC NC1402L Control Spec

## Summary
Sharp/NEC NC1402L laser projector control spec. Covers RS-232C serial and wired/wireless LAN (TCP) control per the Projector Control Command Reference Manual (BDT140013 Rev 7.1). 53 commands: power, input switch, picture/sound/onscreen mute, picture/volume/aspect/gain adjust, shutter, lens control & memory, freeze, eco mode, edge blending, PIP/PbP, and status/information queries. Binary framed protocol with per-frame checksum.

<!-- UNRESOLVED: source is a shared command-reference manual; model-specific value tables (input terminal codes, aspect values, eco mode values, base model types, sub-input values) are referenced as an external "Appendix: Supplementary Information by Command" not present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source: auto-selectable set
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present on D-SUB 9P but flow control mode not stated in source
addressing:
  port: 7142  # TCP port for command send/receive over LAN
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON (015) / POWER OFF (016)
  - queryable     # inferred: numerous status/information request commands
  - levelable     # inferred: PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST, LAMP/LIGHT ADJUST
```

## Actions
```yaml
# Framing: command frame = <HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>.
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# CKS (checksum) = low-order byte of sum of all preceding bytes.
# Commands below show literal payload bytes verbatim from source. Fixed commands
# carry the full frame incl. checksum; parameterized commands show the template
# with <DATAxx> placeholders (checksum to be computed by implementer).

actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bitfield (cover/fan/temp/lamp/ballast/interlock)."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal code (e.g. 06h = video). See Appendix Supplementary Information."
    notes: "Source example switches to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means error (no signal switch)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch."

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
    notes: "Cleared by input/video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)."
    notes: "Source ex (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. (brightness=-10): 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)."
    notes: "Source ex (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. See Appendix Supplementary Information."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target high byte: 96h = LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)."
      - name: DATA02
        type: byte
        description: "Target low byte (FFh for LAMP/LIGHT ADJUST)."
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated 1-min intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: DATA02
        type: byte
        description: "Content: 01h=usage time (sec), 04h=remaining life (%)."
    notes: "Source ex (lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD type). See key code list."
      - name: DATA02
        type: byte
        description: "Key code high byte."
    notes: "Key codes incl: POWER ON(02h,00h), POWER OFF(03h,00h), AUTO(05h,00h), MENU(06h,00h), UP(07h,00h), DOWN(08h,00h), RIGHT(09h,00h), LEFT(0Ah,00h), ENTER(0Bh,00h), EXIT(0Ch,00h), HELP(0Dh,00h), MAGNIFY UP(0Fh,00h), MAGNIFY DOWN(10h,00h), MUTE(13h,00h), PICTURE(29h,00h), COMPUTER1(4Bh,00h), COMPUTER2(4Ch,00h), VIDEO1(4Fh,00h), S-VIDEO1(51h,00h), VOLUME UP(84h,00h), VOLUME DOWN(85h,00h), FREEZE(8Ah,00h), ASPECT(A3h,00h), SOURCE(D7h,00h), LAMP MODE/ECO(EEh,00h)."

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
        type: byte
        description: "Target: 06h=Periphery Focus."
      - name: DATA02
        type: byte
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    notes: "After 7Fh/81h, send 00h to stop. Lens can be re-driven without stop while moving."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (periphery focus / etc.)."
    notes: "Returns upper/lower limit and current value (16-bit each)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target; FFh=Stop (mode/value ignored)."
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: DATA02
        type: byte
        description: "00h=OFF, 01h=ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: lens memory/zoom/focus/lens-shift(H/V) stop or in-operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Source ex (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower/default/current/wide/narrow widths."

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
    notes: "Returns signal switch process, signal list number (-1 of practical), signal type, test pattern, displayed content."

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
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode value per projector. See Appendix."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value. See Appendix Supplementary Information."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: DATA01_to_DATA16
        type: bytes
        description: "Projector name, up to 16 bytes (NUL-terminated)."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: DATA02
        type: byte
        description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; or sub-input value)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type and model name (DATA03-11)."

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
    notes: "Returns operation status, displayed content, signal types, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal. See Appendix Supplementary Information."
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# Observable states returned by query commands (solicited responses).
feedbacks:
  - id: error_status
    type: bitfield
    source_query: error_status_request
    description: "DATA01-12 error bitfield (cover, fan, temperature, lamp, ballast, interlock, mirror cover)."

  - id: power_state
    type: enum
    values: [standby, power_on, not_supported]
    source_query: running_status_request

  - id: cooling_process
    type: enum
    values: [not_executed, during_execution, not_supported]
    source_query: running_status_request

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source_query: running_status_request

  - id: mute_status
    type: composite
    source_query: mute_status_request
    fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]

  - id: input_status
    type: composite
    source_query: input_status_request
    fields: [signal_switch_process, signal_list_number, selection_signal_type_1, selection_signal_type_2, test_pattern_display, content_displayed]

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    source_query: cover_status_request

  - id: model_name
    type: string
    source_query: model_name_request

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source_query: [information_request, lamp_information_request_3]

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source_query: lamp_information_request_3

  - id: filter_usage_time
    type: integer
    unit: seconds
    source_query: [information_request, filter_usage_information_request]

  - id: eco_mode
    type: enum
    source_query: eco_mode_request
    # UNRESOLVED: enum values referenced to external Appendix, not in refined source

  - id: projector_name
    type: string
    source_query: [lan_projector_name_request, information_request]

  - id: mac_address
    type: string
    source_query: lan_mac_address_status_request2

  - id: pip_pbp_mode
    type: enum
    values: [PIP, PICTURE_BY_PICTURE]
    source_query: pip_picture_by_picture_request

  - id: edge_blending_mode
    type: enum
    values: [OFF, ON]
    source_query: edge_blending_mode_request

  - id: lens_profile
    type: enum
    values: [Profile_1, Profile_2]
    source_query: lens_profile_request

  - id: base_model_type
    type: composite
    source_query: [base_model_type_request, setting_request]

  - id: serial_number
    type: string
    source_query: serial_number_request

  - id: basic_information
    type: composite
    source_query: basic_information_request
    fields: [operation_status, content_displayed, selection_signal_type, display_signal_type, video_mute, sound_mute, onscreen_mute, freeze_status]
```

## Variables
```yaml
# Settable continuous/parameter values (binding targets for the adjust actions).
variables:
  - id: volume_level
    type: integer
    set_action: volume_adjust
    # UNRESOLVED: absolute min/max range referenced to GAIN PARAMETER REQUEST 3 response, not fixed in source

  - id: picture_brightness
    type: integer
    set_action: picture_adjust
    target_code: 00h

  - id: picture_contrast
    type: integer
    set_action: picture_adjust
    target_code: 01h

  - id: picture_color
    type: integer
    set_action: picture_adjust
    target_code: 02h

  - id: picture_hue
    type: integer
    set_action: picture_adjust
    target_code: 03h

  - id: picture_sharpness
    type: integer
    set_action: picture_adjust
    target_code: 04h

  - id: lamp_light_adjust
    type: integer
    set_action: other_adjust
    target_code: 96h-FFh
```

## Events
```yaml
# No unsolicited notifications documented; all responses are solicited replies to commands.
events: []
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_transition_lockout
    description: "During POWER ON and POWER OFF (incl. cooling time) no other command is accepted by the projector."
    source: [015_POWER_ON, 016_POWER_OFF]
  - id: interlock_switch_status
    description: "Interlock switch open state is reported as a bit in extended error status (command 009, DATA09 Bit1) - observable indicator, not a command-side interlock procedure."
    source: [009_ERROR_STATUS_REQUEST]
  - id: cover_error_status
    description: "Cover error, mirror cover error, and lens-not-installed-properly are reported via command 009 error bitfield."
    source: [009_ERROR_STATUS_REQUEST]
# UNRESOLVED: source contains no explicit power-on sequencing procedure, credential-gated
# operations, or operator-confirmation requirements. Only error-status observables above.
```

## Notes
- Protocol: binary framed, full-duplex. Frame = `<HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>`. HDR distinguishes command (00h-03h), success response (20h-23h), error response (A0h-A3h); low nibble matches command opcode group.
- Checksum (CKS) = low-order byte (8 bits) of the sum of all preceding bytes in the frame. Must be computed per-frame by implementer; fixed commands above include the source's precomputed CKS.
- ID1 = projector control ID; ID2 = model code (varies by model) — both populated by device, not documented as fixed values.
- Usage-time fields (lamp/filter) are 1-second resolution but updated by the projector at 1-minute intervals.
- Signal list number returned is practical value minus 1.
- Error responses carry ERR1/ERR2 code pairs (see source §2.4): e.g. 02h/0Dh = "command cannot be accepted because the power is off"; 00h/01h = "command not supported by model".
- Both RS-232C (D-SUB 9P cross cable, PC CONTROL port) and LAN (RJ-45 wired, optional wireless LAN unit) supported. TCP port 7142 for LAN command traffic.

<!-- UNRESOLVED: model-specific enum tables (input terminal codes, aspect values, eco mode values, base model types, sub-input values, signal type mappings) referenced as "Appendix: Supplementary Information by Command" — not present in the refined source document. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control mode not stated (RTS/CTS pins wired but config undisclosed). -->
<!-- UNRESOLVED: exact min/max adjustment ranges for volume/picture levels are device-reported via GAIN PARAMETER REQUEST 3, not fixed in the manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:26:52.435Z
last_checked_at: 2026-06-18T08:32:17.939Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:32:17.939Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a shared command-reference manual; model-specific value tables (input terminal codes, aspect values, eco mode values, base model types, sub-input values) are referenced as an external \"Appendix: Supplementary Information by Command\" not present in the refined source."
- "RTS/CTS pins present on D-SUB 9P but flow control mode not stated in source"
- "enum values referenced to external Appendix, not in refined source"
- "absolute min/max range referenced to GAIN PARAMETER REQUEST 3 response, not fixed in source"
- "source contains no explicit power-on sequencing procedure, credential-gated"
- "model-specific enum tables (input terminal codes, aspect values, eco mode values, base model types, sub-input values, signal type mappings) referenced as \"Appendix: Supplementary Information by Command\" — not present in the refined source document."
- "firmware version compatibility not stated."
- "serial flow_control mode not stated (RTS/CTS pins wired but config undisclosed)."
- "exact min/max adjustment ranges for volume/picture levels are device-reported via GAIN PARAMETER REQUEST 3, not fixed in the manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
