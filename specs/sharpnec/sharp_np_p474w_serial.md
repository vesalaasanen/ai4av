---
spec_id: admin/sharp-nec-np-p474w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP P474W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP P474W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP P474W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:30:52.714Z
last_checked_at: 2026-06-18T08:47:47.476Z
generated_at: 2026-06-18T08:47:47.476Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic projector command reference (model family manual), not a P474W-specific datasheet; exact feature subset supported by NP P474W (e.g. dual-lamp, lens memory) not confirmed per-model. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types) is referenced but not present in the refined source."
  - "flow control not stated; source lists \"Communication mode: Full duplex\" only"
  - "firmware version compatibility not stated in source"
  - "default baud rate / factory communication settings not stated"
  - "flow control setting not stated (only full-duplex communication mode stated)"
  - "P474W-specific supported feature subset (dual-lamp, lens memory count, PIP capability) not confirmed against a model-specific document"
  - "input terminal, aspect, eco mode, and base-model enum value tables live in a source appendix not included here"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:47:47.476Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP P474W Control Spec

## Summary
The Sharp/NEC NP P474W is an LCD projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mutes, picture/volume/aspect/gain adjustment, lens control and memory, status queries, eco/PIP/edge-blend setting, and identification requests. Commands are fixed-length hex frames with an additive low-byte checksum.

<!-- UNRESOLVED: source is a generic projector command reference (model family manual), not a P474W-specific datasheet; exact feature subset supported by NP P474W (e.g. dual-lamp, lens memory) not confirmed per-model. Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model types) is referenced but not present in the refined source. -->

## Transport
```yaml
# Both RS-232C serial and TCP LAN are explicitly documented.
protocols:
  - serial
  - tcp
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # all supported per source; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; source lists "Communication mode: Full duplex" only
  # communication_mode: full_duplex  (stated, not a standard spec field)
addressing:
  port: 7142  # TCP port for sending/receiving commands over LAN
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - routable     # inferred from INPUT SW CHANGE (input terminal switch)
  - queryable    # inferred from numerous REQUEST/status-query commands
  - levelable    # inferred from VOLUME ADJUST, PICTURE ADJUST, OTHER ADJUST
```

## Actions
```yaml
# All 53 distinct command-bearing entries from section 2/3 of the source.
# Hex payloads copied verbatim. {CKS} = additive low-byte checksum (computed).
# For parameterized commands the variable DATA bytes are shown in braces.

# --- Power ---
- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on, no other command can be accepted."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (including cooling time), no other command can be accepted."

# --- Input switching ---
- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full value list in source Appendix 'Supplementary Information by Command'."
  notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh"

# --- Mutes ---
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

# --- Adjustments ---
- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value (low byte DATA03, high byte DATA04)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02_DATA03
      type: integer
      description: "Adjustment value (low byte DATA02, high byte DATA03)"
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Full value list in source Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "Adjustment target: DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04_DATA05
      type: integer
      description: "Adjustment value (low byte DATA04, high byte DATA05)"

# --- Information / status queries ---
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

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
    - name: DATA01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- Remote key code (single opcode, many key codes) ---
- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01_DATA02
      type: integer
      description: "Key code (WORD). Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"

# --- Shutter ---
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

# --- Lens control ---
- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (e.g. 06h=Periphery Focus; other values per source)"
    - name: DATA02
      type: integer
      description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target to query"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03_DATA04
      type: integer
      description: "Adjustment value (low byte DATA03, high byte DATA04)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- Gain parameter query ---
- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

# --- Status requests (078.x) ---
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

# --- Freeze ---
- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- Information string ---
- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

# --- LAN / eco / PIP / edge-blend ---
- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

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
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
    - name: DATA01
      type: integer
      description: "Eco mode value. Full value list in source Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by target: MODE 00h=PIP/01h=PbP; START POSITION 00h=TL/01h=TR/02h=BL/03h=BR; sub input value per Appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

# --- Identification (305.x) ---
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

# --- Audio select ---
- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. Full value list in source Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by the query actions above. Response frames are
# success (Axh/2xh prefix) or error (A0h/A1h/A2h/A3h prefix + ERR1/ERR2).
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST (DATA03 power status, DATA06 operation status)"

- id: input_state
  type: string
  source: "078-3 INPUT STATUS REQUEST (signal type 1/2, signal list number)"

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA01"

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA02"

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA03"

- id: error_status
  type: bitmask
  source: "009 ERROR STATUS REQUEST (DATA01-DATA12 bitfield; cover/fan/temp/power/lamp/mirror-cover/interlock/etc.)"

- id: lamp_usage
  type: integer
  unit: seconds
  source: "037-4 LAMP INFORMATION REQUEST 3 (content 01h); updated at 1-minute intervals"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 LAMP INFORMATION REQUEST 3 (content 04h); negative if replacement deadline exceeded"

- id: filter_usage
  type: integer
  unit: seconds
  source: "037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04); -1 if undefined"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

# Full ERR1/ERR2 error code matrix documented in source section 2.4
# (e.g. 02h 0Dh = "command cannot be accepted because the power is off").
```

## Variables
```yaml
# Settable continuous parameters are driven by discrete adjust actions
# (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST, 053 LENS CONTROL).
# Current values are read back via 060-1 GAIN PARAMETER REQUEST 3 and 053-1 LENS CONTROL REQUEST.
# No separate variable registry is defined by the source.
```

## Events
```yaml
# None documented. All responses are solicited (returned after a command).
# Source section 2.3 describes only command/response semantics; no unsolicited notifications.
```

## Macros
```yaml
# None documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): while powering on, no other command can be accepted."
  - "POWER OFF (016): while powering off (including cooling time), no other command can be accepted."
  - "009 ERROR STATUS REQUEST DATA09 bit1: interlock switch open is reported as an error condition."
# Notes: source documents error recovery only via ERR1/ERR2 codes (section 2.4);
# no explicit power-on sequencing or warm-up/cooldown timing values stated.
```

## Notes
- Command frame format (section 2.1): `<MT> <OP> 00h 00h <LEN> <DATA...> <CKS>`. MT byte selects message type; the second byte is the opcode. Checksum = low byte of the sum of all preceding bytes (section 2.2). Worked example: `20h 81h 01h 60h 01h 00h` → sum 103h → CKS = 03h.
- Success response prefix differs by message type (2xh/2xh with data, or 2xh with LEN=00h for no-data commands); error responses use `Axh` prefix with `<ERR1> <ERR2> <CKS>`.
- ID1 = control ID set on projector; ID2 = model code (varies by model). Both appear in responses.
- Baud rate is selectable among 4800/9600/19200/38400/115200; default not stated in source.
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port (pinout in section 1.1).
- Lamp usage time is reported in one-second units but updated only at one-minute intervals.
- Source references an "Appendix: Supplementary Information by Command" for input terminal values, aspect values, eco mode values, selection signal types, and base model types; that appendix is not present in the refined source, so those enum tables are incomplete.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud rate / factory communication settings not stated -->
<!-- UNRESOLVED: flow control setting not stated (only full-duplex communication mode stated) -->
<!-- UNRESOLVED: P474W-specific supported feature subset (dual-lamp, lens memory count, PIP capability) not confirmed against a model-specific document -->
<!-- UNRESOLVED: input terminal, aspect, eco mode, and base-model enum value tables live in a source appendix not included here -->
````

Self-check done. 53 actions, all hex verbatim. No invented volts/ports/baud-default. `draft` + `low`. UNRESOLVED markers on gaps.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:30:52.714Z
last_checked_at: 2026-06-18T08:47:47.476Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:47:47.476Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic projector command reference (model family manual), not a P474W-specific datasheet; exact feature subset supported by NP P474W (e.g. dual-lamp, lens memory) not confirmed per-model. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types) is referenced but not present in the refined source."
- "flow control not stated; source lists \"Communication mode: Full duplex\" only"
- "firmware version compatibility not stated in source"
- "default baud rate / factory communication settings not stated"
- "flow control setting not stated (only full-duplex communication mode stated)"
- "P474W-specific supported feature subset (dual-lamp, lens memory count, PIP capability) not confirmed against a model-specific document"
- "input terminal, aspect, eco mode, and base-model enum value tables live in a source appendix not included here"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
