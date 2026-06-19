---
spec_id: admin/sharpnec-pn-c751h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pn C751H Control Spec"
manufacturer: Sharp/NEC
model_family: "Pn C751H"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Pn C751H"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:18:55.352Z
last_checked_at: 2026-06-18T09:04:27.727Z
generated_at: 2026-06-18T09:04:27.727Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model name \"Pn C751H\" supplied by operator; source manual is generic across the projector/display family and does not enumerate the specific supported model(s). Input-terminal code values, eco-mode values, and base-model-type values referenced as \"see the Appendix\" are not present in the refined source."
  - "no separate unsolicited-event feedbacks described in source."
  - "no enumerated list of settable runtime variables beyond those expressed as actions."
  - "source describes no unsolicited notifications / push events. All responses are replies to commands."
  - "source describes no multi-step command sequences."
  - "source contains no explicit safety interlock procedures, power-on sequencing requirements, or voltage/current ratings. Cover/temperature/fan error bits are reported via ERROR STATUS REQUEST but no required response procedure is documented."
  - "model name \"Pn C751H\" not confirmed in source; source is a generic projector/display control manual."
  - "Appendix code tables (input terminal, aspect, eco mode, base model type, sub input) not in refined source."
  - "firmware version compatibility not stated."
  - "LENS CONTROL DATA01 full function table truncated in refined source (only 06h=Periphery Focus shown)."
  - "no auth procedure documented; auth.type:none inferred, but ERR code 02h/0Fh implies authority state may exist."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:04:27.727Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC Pn C751H Control Spec

## Summary
Sharp/NEC Pn C751H large-format display/projector controlled via the binary command protocol documented in "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device supports both TCP/IP (LAN) and RS-232C serial control. Commands are fixed-format hex frames beginning with a command byte (00h–03h) and terminated by a checksum byte; responses mirror the frame with the high bit of the first byte set (e.g. 02h→22h ack, A2h error).

<!-- UNRESOLVED: exact model name "Pn C751H" supplied by operator; source manual is generic across the projector/display family and does not enumerate the specific supported model(s). Input-terminal code values, eco-mode values, and base-model-type values referenced as "see the Appendix" are not present in the refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # source lists options 115200/38400/19200/9600/4800 bps
  baud_rate_options: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex"; no hardware flow-control field documented
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST commands present
  - routable     # inferred: INPUT SW CHANGE command present
```

## Actions
```yaml
# Frame conventions (from source §2.1-2.2):
#   - All bytes hex; frames terminated by checksum <CKS>.
#   - <ID1> = control ID set on projector; <ID2> = model code.
#   - <CKS> = low-order byte of the sum of all preceding bytes.
#   - Ack response first byte = command byte + 20h (e.g. 02h→22h, 03h→23h).
#   - Error response first byte = command byte + A0h (e.g. 02h→A2h, 00h→A0h, 03h→A3h).
# Each `command:` below is the request payload verbatim from the source.
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response DATA01-DATA12 bitfield of error flags (cover/fan/temp/lamp/etc.)."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on is in progress."

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
        type: integer
        description: "Input terminal code (e.g. 06h = Video). Full code table in source Appendix 'Supplementary Information by Command', NOT included in refined source."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value code (table in source Appendix, NOT included in refined source)."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte (e.g. 96h for LAMP/LIGHT ADJUST, paired with DATA02=FFh)."
      - name: DATA02
        type: integer
        description: "Adjustment target low byte (e.g. FFh for LAMP/LIGHT ADJUST)."
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response DATA01-49 projector name; DATA83-86 lamp usage seconds; DATA87-90 filter usage seconds."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Response DATA01-04 filter usage seconds; DATA05-08 filter alarm start seconds (-1 if undefined)."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: DATA02
        type: integer
        description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (see source Key code list, e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)."
      - name: DATA02
        type: integer
        description: "Key code high byte (00h for all listed codes)."

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
        type: integer
        description: "Lens function (e.g. 06h=Periphery Focus; full table truncated in refined source)."
      - name: DATA02
        type: integer
        description: "Motion: 00h=Stop, 01h=drive +1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive +, 81h=drive -, FDh=-0.25s, FEh=-0.5s, FFh=-1s."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens function selector (mirrors LENS CONTROL DATA01)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens function (FFh=Stop)."
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile selected via LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitfield: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=stop, 1=operating)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Response DATA01-03 base model type; DATA04 sound function; DATA05 profile/timer capability."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Response DATA03 power status (00h=Standby,01h=On,FFh=unsupported); DATA06 operation status (00h=Standby Sleep,04h=Power on,05h=Cooling,06h=Standby error,0Fh=Power saving,10h=Network standby)."

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
    notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD (00h/01h each)."

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
    notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze ON, 02h=freeze OFF."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco/light/lamp mode value (code table in source Appendix, NOT in refined source)."

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
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

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
        type: integer
        description: "Eco/light/lamp mode value (code table in source Appendix, NOT in refined source)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: DATA01_16
        type: string
        description: "Projector name, up to 16 bytes."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: DATA02
        type: integer
        description: "Setting value (PIP/PICTURE BY PICTURE, position, or sub-input code per DATA01)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON."

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
    notes: "Response combines operation status, displayed content, signal types, mute and freeze flags."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (code table in source Appendix, NOT in refined source)."
      - name: DATA02
        type: integer
        description: "Setting value: 00h=the terminal in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: enum
    description: "Per-command success acknowledgement. First byte = request command byte + 20h; ERR/CKS absent on success."
  - id: command_error
    type: struct
    description: "Error response. First byte = request command byte + A0h, followed by <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 codes per source §2.4 (00h/00h=unrecognized, 00h/01h=unsupported by model, 01h/00h=invalid value, 01h/01h=invalid input terminal, 01h/02h=invalid language, 02h/00h=memory allocation, 02h/02h=memory in use, 02h/03h=value cannot be set, 02h/04h=forced onscreen mute on, 02h/06h=viewer error, 02h/07h=no signal, 02h/08h=test pattern/filter displayed, 02h/09h=no PC card, 02h/0Ah=memory operation error, 02h/0Ch=entry list displayed, 02h/0Dh=power off, 02h/0Eh=execution failed, 02h/0Fh=no authority, 03h/00h=incorrect gain number, 03h/01h=invalid gain, 03h/02h=adjustment failed)."
  # UNRESOLVED: no separate unsolicited-event feedbacks described in source.
```

## Variables
```yaml
variables:
  - id: control_id
    description: "ID1 - projector control ID used in every frame."
  - id: model_code
    description: "ID2 - model-dependent code used in every frame."
  # UNRESOLVED: no enumerated list of settable runtime variables beyond those expressed as actions.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events. All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "POWER ON blocks all other commands while power-on is in progress (source §3.2)."
  - "POWER OFF blocks all other commands during power-off including cooling time (source §3.3)."
  - "Error code 02h/0Fh 'no authority necessary for the operation' implies some access-control state exists, but no auth procedure is documented (see Transport.auth)."
  - "Lens drive can be stopped mid-motion by sending DATA02=00h after a continuous drive (7Fh/81h) (source §3.22)."
# UNRESOLVED: source contains no explicit safety interlock procedures, power-on sequencing requirements, or voltage/current ratings. Cover/temperature/fan error bits are reported via ERROR STATUS REQUEST but no required response procedure is documented.
```

## Notes
- Document revision: BDT140013 Rev 7.1.
- Command frames are binary; the hex notation (`NNh`) and angle-bracket placeholders (`<ID1>`, `<DATA01>`, `<CKS>`) are reproduced verbatim from the source. Implementers must substitute real byte values and compute the checksum (low byte of the sum of all preceding bytes).
- Usage-time counters (lamp/filter) update at one-minute intervals even though reported in one-second units (source §3.15, §3.17).
- Serial cable must be a cross cable wired to the PC CONTROL D-SUB 9P port per the source pin table.
- Several commands reference an "Appendix: Supplementary Information by Command" for input-terminal, aspect, eco-mode, base-model-type, and sub-input code tables. That appendix is **not** present in the refined source document and those code tables are therefore UNRESOLVED.

<!-- UNRESOLVED: model name "Pn C751H" not confirmed in source; source is a generic projector/display control manual. -->
<!-- UNRESOLVED: Appendix code tables (input terminal, aspect, eco mode, base model type, sub input) not in refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: LENS CONTROL DATA01 full function table truncated in refined source (only 06h=Periphery Focus shown). -->
<!-- UNRESOLVED: no auth procedure documented; auth.type:none inferred, but ERR code 02h/0Fh implies authority state may exist. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:18:55.352Z
last_checked_at: 2026-06-18T09:04:27.727Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:04:27.727Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model name \"Pn C751H\" supplied by operator; source manual is generic across the projector/display family and does not enumerate the specific supported model(s). Input-terminal code values, eco-mode values, and base-model-type values referenced as \"see the Appendix\" are not present in the refined source."
- "no separate unsolicited-event feedbacks described in source."
- "no enumerated list of settable runtime variables beyond those expressed as actions."
- "source describes no unsolicited notifications / push events. All responses are replies to commands."
- "source describes no multi-step command sequences."
- "source contains no explicit safety interlock procedures, power-on sequencing requirements, or voltage/current ratings. Cover/temperature/fan error bits are reported via ERROR STATUS REQUEST but no required response procedure is documented."
- "model name \"Pn C751H\" not confirmed in source; source is a generic projector/display control manual."
- "Appendix code tables (input terminal, aspect, eco mode, base model type, sub input) not in refined source."
- "firmware version compatibility not stated."
- "LENS CONTROL DATA01 full function table truncated in refined source (only 06h=Periphery Focus shown)."
- "no auth procedure documented; auth.type:none inferred, but ERR code 02h/0Fh implies authority state may exist."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
