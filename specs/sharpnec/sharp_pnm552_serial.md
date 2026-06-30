---
spec_id: admin/sharp-nec-pnm552
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pnm552 Control Spec"
manufacturer: Sharp/NEC
model_family: Pnm552
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Pnm552
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:50:21.864Z
last_checked_at: 2026-06-18T09:10:33.408Z
generated_at: 2026-06-18T09:10:33.408Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ID1 (control ID) and ID2 (model code) values must be read from device; source documents no fixed defaults. Input terminal enumeration, eco-mode values, aspect values, signal-type values, and sub-input values live in an \"Appendix / Supplementary Information by Command\" not present in this source."
  - "not stated; source says \"Full duplex\" communication mode only"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "ID1 (control ID) and ID2 (model code) not fixed in source — must be read from device settings."
  - "flow_control not stated (only \"Full duplex\" mode stated)."
  - "firmware version compatibility not stated."
  - "wireless LAN data rates/standards deferred to \"operation manual of the wireless LAN unit\" — not in source."
  - "Appendix enums (input terminal, aspect, eco mode, sub-input, signal type, base model type) not present in source."
  - "053 LENS CONTROL target byte enumerates only 06h=Periphery Focus in source; other targets not listed."
  - "053-1 LENS CONTROL REQUEST target byte has no enum in source."
  - "053-2 LENS CONTROL 2 target byte lists only FFh=Stop in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:10:33.408Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pnm552 Control Spec

## Summary
Sharp/NEC Pnm552 projector. Control via RS-232C serial or TCP/IP LAN (port 7142). Binary framed command set: lead byte + ID1/ID2 + LEN + DATA + checksum. 53 documented commands covering power, input switching, mute, picture/volume/aspect adjust, lens control & memory, shutter, freeze, eco mode, PIP/PbP, edge blending, and status/error queries.

<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) values must be read from device; source documents no fixed defaults. Input terminal enumeration, eco-mode values, aspect values, signal-type values, and sub-input values live in an "Appendix / Supplementary Information by Command" not present in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: not stated; source says "Full duplex" communication mode only
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON, 016 POWER OFF present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST present
  - routable     # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
# All commands framed as: <lead> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector; ID2 = model code (model-specific).
# CKS = low byte of sum of all preceding bytes (incl. lead). See source §2.2.
# Lead bytes by command class: 00h=query(set-info), 01h=freeze, 02h=action,
# 03h=adjust/set/query3. Response lead = lead | 0x20 (e.g. 02h→22h ok, 0x80|lead on err).

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
  command: "02h 03h 00h 00h 02h 01h {input} {cks}"
  params:
    - name: input
      type: byte
      description: "Input terminal byte (DATA01). Example: 06h = video port. Full enumeration in Appendix 'Supplementary Information by Command' (not in source)."

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
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: byte
      enum: ["00h=Brightness", "01h=Contrast", "02h=Color", "03h=Hue", "04h=Sharpness"]
    - name: mode
      type: byte
      enum: ["00h=absolute", "01h=relative"]
    - name: value_lo
      type: byte
      description: "Adjustment value (low 8 bits). Signed (F6h FFh = -10)."
    - name: value_hi
      type: byte
      description: "Adjustment value (high 8 bits)."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: byte
      enum: ["00h=absolute", "01h=relative"]
    - name: value_lo
      type: byte
      description: "Adjustment value (low 8 bits)."
    - name: value_hi
      type: byte
      description: "Adjustment value (high 8 bits)."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {cks}"
  params:
    - name: value
      type: byte
      description: "Aspect value (DATA01). Enumeration in Appendix (not in source)."

- id: other_adjust_lamp_light
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: byte
      enum: ["00h=absolute", "01h=relative"]
    - name: value_lo
      type: byte
    - name: value_hi
      type: byte
  notes: "DATA01=96h DATA02=FFh = LAMP ADJUST / LIGHT ADJUST per source table."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated 1-min intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time + filter alarm start time (seconds). -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {cks}"
  params:
    - name: lamp
      type: byte
      enum: ["00h=Lamp 1", "01h=Lamp 2 (two-lamp models only)"]
    - name: content
      type: byte
      enum: ["01h=usage time (seconds)", "04h=remaining life (%)"]

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {cks}"
  params:
    - name: type
      type: byte
      enum: ["00h=Total Carbon Savings", "01h=Carbon Savings during operation"]

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {cks}"
  params:
    - name: key_lo
      type: byte
      description: "Key code low byte (WORD). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
    - name: key_hi
      type: byte
      description: "Key code high byte (WORD). Always 00h in source key code list."

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
  command: "02h 18h 00h 00h 02h {target} {content} {cks}"
  params:
    - name: target
      type: byte
      description: "Lens target. Source explicitly documents 06h=Periphery Focus."
    - name: content
      type: byte
      enum: ["00h=Stop", "01h=drive +1s", "02h=drive +0.5s", "03h=drive +0.25s", "7Fh=drive +", "81h=drive -", "FDh=drive -0.25s", "FEh=drive -0.5s", "FFh=drive -1s"]
  notes: "After 7Fh/81h, send 00h to stop. Re-issuing same command during drive continues without stop."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {cks}"
  params:
    - name: target
      type: byte
      description: "Lens target byte (DATA01). Value space UNRESOLVED (source gives no enum here)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: byte
      enum: ["FFh=Stop"]
      notes: "Source lists only FFh=Stop; other targets UNRESOLVED."
    - name: mode
      type: byte
      enum: ["00h=absolute", "02h=relative"]
    - name: value_lo
      type: byte
    - name: value_hi
      type: byte
  notes: "If DATA01=FFh (Stop), mode/value ignored."

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {op} {cks}"
  params:
    - name: op
      type: byte
      enum: ["00h=MOVE", "01h=STORE", "02h=RESET"]

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {op} {cks}"
  params:
    - name: op
      type: byte
      enum: ["00h=MOVE", "01h=STORE", "02h=RESET"]
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {option} {cks}"
  params:
    - name: option
      type: byte
      enum: ["00h=LOAD BY SIGNAL", "01h=FORCED MUTE"]

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {cks}"
  params:
    - name: option
      type: byte
      enum: ["00h=LOAD BY SIGNAL", "01h=FORCED MUTE"]
    - name: value
      type: byte
      enum: ["00h=OFF", "01h=ON"]

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns lens operation state bitmap (DATA01): bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V); 0=Stop, 1=During operation. Bits 5-7 reserved."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {cks}"
  params:
    - name: profile
      type: byte
      enum: ["00h=Profile 1", "01h=Profile 2"]

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {cks}"
  params:
    - name: name
      type: byte
      enum: ["00h=PICTURE/BRIGHTNESS", "01h=PICTURE/CONTRAST", "02h=PICTURE/COLOR", "03h=PICTURE/HUE", "04h=PICTURE/SHARPNESS", "05h=VOLUME", "96h=LAMP ADJUST/LIGHT ADJUST"]

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number incl. clock/sleep timer (DATA05)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, test pattern display, content displayed."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

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
  notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {state} {cks}"
  params:
    - name: state
      type: byte
      enum: ["01h=ON", "02h=OFF"]

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {cks}"
  params:
    - name: type
      type: byte
      enum: ["03h=Horizontal sync frequency", "04h=Vertical sync frequency"]

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returned value enum lives in Appendix (not in source). May reflect Light mode or Lamp mode depending on model."

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
  command: "03h B0h 00h 00h 02h C5h {target} {cks}"
  params:
    - name: target
      type: byte
      enum: ["00h=MODE", "01h=START POSITION", "02h=SUB INPUT / SUB INPUT 1", "09h=SUB INPUT 2", "0Ah=SUB INPUT 3"]
  notes: "Sub-input setting value enum lives in Appendix (not in source)."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {cks}"
  params:
    - name: value
      type: byte
      description: "Eco mode value (DATA01). Enum lives in Appendix (not in source)."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01..16} 00h {cks}"
  params:
    - name: name_01..16
      type: bytes
      description: "Projector name, up to 16 bytes (NUL-terminated)."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {target} {value} {cks}"
  params:
    - name: target
      type: byte
      enum: ["00h=MODE", "01h=START POSITION", "02h=SUB INPUT / SUB INPUT 1", "09h=SUB INPUT 2", "0Ah=SUB INPUT 3"]
    - name: value
      type: byte
      description: "For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: see Appendix (not in source)."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {cks}"
  params:
    - name: value
      type: byte
      enum: ["00h=OFF", "01h=ON"]

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13), model name string (DATA03-11). Type enum in Appendix (not in source)."

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
  notes: "Returns operation status (DATA01), content displayed (DATA02), signal type 1/2 (DATA03/04), display signal type (DATA05), video/sound/onscreen mute (DATA06-08), freeze status (DATA09)."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {cks}"
  params:
    - name: input
      type: byte
      description: "Input terminal byte (DATA01). Enum in Appendix (not in source)."
    - name: value
      type: byte
      enum: ["00h=terminal specified in DATA01", "01h=BNC", "02h=COMPUTER"]
```

## Feedbacks
```yaml
# Query responses documented in source - listed as feedback shapes:
- id: error_status
  type: bitmap
  description: "009 response: DATA01-12 error bitmap (bit=1 → error). Includes cover/fan/temp/lamp/lamp-off/mirror-cover errors, extended status (interlock switch open, system errors)."
- id: information
  type: object
  fields: [projector_name, lamp_usage_seconds, filter_usage_seconds]
- id: filter_usage
  type: object
  fields: [filter_usage_seconds, filter_alarm_start_seconds]
- id: lamp_information
  type: object
  fields: [lamp_usage_seconds, lamp_remaining_life_percent]
- id: carbon_savings
  type: object
  fields: [kilograms, milligrams]
- id: lens_control_values
  type: object
  fields: [upper_limit, lower_limit, current_value]
- id: lens_information
  type: bitmap
  description: "DATA01: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V); 0=Stop, 1=Operating."
- id: lens_profile
  type: enum
  values: ["00h=Profile 1", "01h=Profile 2"]
- id: gain_parameter
  type: object
  fields: [status, upper_limit, lower_limit, default, current, wide_width, narrow_width]
- id: setting_info
  type: object
  fields: [base_model_type, sound_function, profile_number]
- id: running_status
  type: object
  fields: [power_status, cooling_process, power_on_off_process, operation_status]
- id: input_status
  type: object
  fields: [signal_switch_process, signal_list_number, selection_signal_type_1, selection_signal_type_2, test_pattern_display, content_displayed]
- id: mute_status
  type: object
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
- id: model_name
  type: string
- id: cover_status
  type: enum
  values: ["00h=Normal (cover opened)", "01h=Cover closed"]
- id: information_string
  type: string
  description: "Horizontal or vertical sync frequency string."
- id: eco_mode
  type: byte
- id: lan_projector_name
  type: string
- id: lan_mac_address
  type: bytes
- id: pip_pbp
  type: object
- id: edge_blending_mode
  type: enum
  values: ["00h=OFF", "01h=ON"]
- id: base_model_type
  type: object
  fields: [base_model_type, model_name]
- id: serial_number
  type: string
- id: basic_information
  type: object
  fields: [operation_status, content_displayed, selection_signal_type_1, selection_signal_type_2, display_signal_type, video_mute, sound_mute, onscreen_mute, freeze_status]
```

## Variables
```yaml
# Settable parameters already modelled as actions (030-1/030-2/030-12/030-15/098-8/
# 098-45/098-198/098-243-1/319-10). No additional standalone variables identified.
```

## Events
```yaml
# Source documents no unsolicited notifications - all responses are request/reply.
```

## Macros
```yaml
# Source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (informational, not formal interlocks):
#   - 015 POWER ON / 016 POWER OFF reject all other commands while in progress
#     (incl. cooling). Not a configurable interlock, just device behaviour.
#   - 053 LENS CONTROL: after continuous drive (7Fh/81h) must send 00h to stop,
#     otherwise lens drives indefinitely.
#   - Error code 02h 0Dh: "command cannot be accepted because the power is off."
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the above behavioural notes.
```

## Notes
- Framing: lead byte encodes command class. Response lead = `lead | 0x20` on success; `0x80 | lead` on error (e.g. command `02h` → ack `22h`, err `A2h`; command `00h` → ack `20h`, err `A0h`).
- Checksum: sum of all preceding bytes including lead; take low byte. Worked example in source §2.2: `20h 81h 01h 60h 01h 00h` → sum 103h → CKS = 03h.
- Error codes (ERR1/ERR2) enumerated in source §2.4: 00h/00h unrecognized, 00h/01h unsupported by model, 01h/00h invalid value, 01h/01h invalid input terminal, 02h/0Dh power off, 02h/0Eh execution failed, 02h/0Fh no authority, 03h/00h invalid gain number, etc.
- Lamp information, information request, and basic information refresh at 1-minute intervals despite 1-second resolution.
- Lamp remaining life can be negative if replacement deadline exceeded.
- 037-4 DATA01=01h (Lamp 2) only valid on two-lamp models.
- Source referenced but did not include an "Appendix / Supplementary Information by Command" containing input-terminal byte values, aspect values, eco-mode values, sub-input values, signal-type values, and base-model-type codes. These enums are therefore UNRESOLVED.

<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) not fixed in source — must be read from device settings.
<!-- UNRESOLVED: flow_control not stated (only "Full duplex" mode stated).
<!-- UNRESOLVED: firmware version compatibility not stated.
<!-- UNRESOLVED: wireless LAN data rates/standards deferred to "operation manual of the wireless LAN unit" — not in source.
<!-- UNRESOLVED: Appendix enums (input terminal, aspect, eco mode, sub-input, signal type, base model type) not present in source.
<!-- UNRESOLVED: 053 LENS CONTROL target byte enumerates only 06h=Periphery Focus in source; other targets not listed.
<!-- UNRESOLVED: 053-1 LENS CONTROL REQUEST target byte has no enum in source.
<!-- UNRESOLVED: 053-2 LENS CONTROL 2 target byte lists only FFh=Stop in source.
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:50:21.864Z
last_checked_at: 2026-06-18T09:10:33.408Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:10:33.408Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ID1 (control ID) and ID2 (model code) values must be read from device; source documents no fixed defaults. Input terminal enumeration, eco-mode values, aspect values, signal-type values, and sub-input values live in an \"Appendix / Supplementary Information by Command\" not present in this source."
- "not stated; source says \"Full duplex\" communication mode only"
- "source contains no explicit safety warnings, interlock procedures,"
- "ID1 (control ID) and ID2 (model code) not fixed in source — must be read from device settings."
- "flow_control not stated (only \"Full duplex\" mode stated)."
- "firmware version compatibility not stated."
- "wireless LAN data rates/standards deferred to \"operation manual of the wireless LAN unit\" — not in source."
- "Appendix enums (input terminal, aspect, eco mode, sub-input, signal type, base model type) not present in source."
- "053 LENS CONTROL target byte enumerates only 06h=Periphery Focus in source; other targets not listed."
- "053-1 LENS CONTROL REQUEST target byte has no enum in source."
- "053-2 LENS CONTROL 2 target byte lists only FFh=Stop in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
