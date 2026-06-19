---
spec_id: admin/sharp-nec-pn-lc652
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-LC652 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-LC652
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-LC652
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:24:19.836Z
last_checked_at: 2026-06-18T09:09:27.937Z
generated_at: 2026-06-18T09:09:27.937Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific appendix (\"Supplementary Information by Command\") values (input terminal codes, aspect codes, eco mode codes, base model type codes) are referenced by the source but not included in the refined excerpt. Firmware version compatibility unknown."
  - "flow control not stated (source lists \"Full duplex\" communication mode only)"
  - "full code list not in refined excerpt."
  - "other target codes referenced in appendix not present in refined excerpt.\""
  - "target code list not in refined excerpt."
  - "other target codes not in refined excerpt.\""
  - "value list not in refined excerpt."
  - "sub input code list not in refined excerpt.\""
  - "code list not in refined excerpt."
  - "enum value list referenced in appendix, not present in refined excerpt.\""
  - "no event mechanism described."
  - "none described in source."
  - "firmware version compatibility not stated."
  - "appendix code lists (input terminal, aspect, eco mode, base model type, sub input) not in refined source excerpt."
  - "serial flow_control not stated in source."
  - "full lens-control target code list (053 DATA01) not in refined excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:09:27.937Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-LC652 Control Spec

## Summary
Sharp/NEC PN-LC652 projector control spec covering the external control protocol described in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device supports RS-232C serial control and wired/wireless LAN (TCP) control. Commands use a binary hex-byte frame with a trailing checksum byte.

<!-- UNRESOLVED: model-specific appendix ("Supplementary Information by Command") values (input terminal codes, aspect codes, eco mode codes, base model type codes) are referenced by the source but not included in the refined excerpt. Firmware version compatibility unknown. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source: selectable baud rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (source lists "Full duplex" communication mode only)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands
  - queryable    # inferred: many status/information request commands
  - levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST commands
  - routable     # inferred: INPUT SW CHANGE command
```

## Actions
```yaml
# All command payloads are hex-byte frames copied verbatim from the source.
# Frame layout (per source §2.1): <B1> <B2> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID, ID2 = model code, CKS = checksum (low byte of sum of all preceding bytes).
# Fixed commands below show the literal payload as printed in the source (ID1/ID2 embedded as 00h).
# Parameterized commands show the template with the variable DATA bytes named.

# --- 009. ERROR STATUS REQUEST (query) ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal code (see source Appendix "Supplementary Information by Command"); e.g. 06h = video port. UNRESOLVED: full code list not in refined excerpt.
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

# --- 021. PICTURE MUTE OFF ---
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- 022. SOUND MUTE ON ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

# --- 023. SOUND MUTE OFF ---
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- 024. ONSCREEN MUTE ON ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

# --- 025. ONSCREEN MUTE OFF ---
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1. PICTURE ADJUST ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment target - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness
    - name: data02
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Aspect value (see source Appendix "Supplementary Information by Command"). UNRESOLVED: full code list not in refined excerpt.
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 030-15. OTHER ADJUST (LAMP ADJUST / LIGHT ADJUST) ---
- id: lamp_light_adjust
  label: Lamp/Light Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target - fixed 96h (LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Fixed FFh"
    - name: data03
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 037. INFORMATION REQUEST (query) ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# --- 037-3. FILTER USAGE INFORMATION REQUEST (query) ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 (query) ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Lamp selector - 00h Lamp 1, 01h Lamp 2 (two-lamp models only)
    - name: data02
      type: integer
      description: Content - 01h lamp usage time (seconds), 04h lamp remaining life (%)
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST (query) ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD). Examples from source key code list: POWER ON 02h, POWER OFF 03h, AUTO 05h, MENU 06h, UP 07h, DOWN 08h, RIGHT 09h, LEFT 0Ah, ENTER 0Bh, EXIT 0Ch, HELP 0Dh, MAGNIFY UP 0Fh, MAGNIFY DOWN 10h, MUTE 13h, PICTURE 29h, COMPUTER1 4Bh, COMPUTER2 4Ch, VIDEO1 4Fh, S-VIDEO1 51h, VOLUME UP 84h, VOLUME DOWN 85h, FREEZE 8Ah, ASPECT A3h, SOURCE D7h, LAMP MODE/ECO EEh."
    - name: data02
      type: integer
      description: Key code high byte (00h for all listed keys)
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 051. SHUTTER CLOSE ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# --- 052. SHUTTER OPEN ---
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053. LENS CONTROL ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target - source shows 06h = Periphery Focus. UNRESOLVED: other target codes referenced in appendix not present in refined excerpt."
    - name: data02
      type: integer
      description: "Content - 00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive plus, 81h drive minus, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 053-1. LENS CONTROL REQUEST (query) ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Lens adjustment target. UNRESOLVED: target code list not in refined excerpt.
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target - FFh = Stop (mode/value ignored). UNRESOLVED: other target codes not in refined excerpt."
    - name: data02
      type: integer
      description: Adjustment mode - 00h absolute, 02h relative
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 053-5. LENS MEMORY OPTION REQUEST (query) ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value - 00h OFF, 01h ON"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 053-7. LENS INFORMATION REQUEST (query) ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number - 00h Profile 1, 01h Profile 2"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 053-11. LENS PROFILE REQUEST (query) ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 (query) ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name - 00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 078-1. SETTING REQUEST (query) ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# --- 078-2. RUNNING STATUS REQUEST (query) ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# --- 078-3. INPUT STATUS REQUEST (query) ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4. MUTE STATUS REQUEST (query) ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

# --- 078-5. MODEL NAME REQUEST (query) ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6. COVER STATUS REQUEST (query) ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h freeze ON, 02h freeze OFF"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 084. INFORMATION STRING REQUEST (query) ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type - 03h horizontal sync frequency, 04h vertical sync frequency"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 097-8. ECO MODE REQUEST (query) ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# --- 097-45. LAN PROJECTOR NAME REQUEST (query) ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 (query) ---
- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP / PICTURE BY PICTURE REQUEST (query) ---
- id: pip_pbp_request
  label: PIP/Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 097-243-1. EDGE BLENDING MODE REQUEST (query) ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Eco mode value (see source Appendix "Supplementary Information by Command"). UNRESOLVED: value list not in refined excerpt.
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
  params:
    - name: name_bytes
      type: string
      description: Projector name (DATA01-DATA16, up to 16 bytes), NUL-terminated/padded.
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 098-198. PIP / PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value - for MODE: 00h PIP, 01h PBP; for START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; for SUB INPUT: see Appendix. UNRESOLVED: sub input code list not in refined excerpt."
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h OFF, 01h ON"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)

# --- 305-1. BASE MODEL TYPE REQUEST (query) ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# --- 305-2. SERIAL NUMBER REQUEST (query) ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST (query) ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal code (see source Appendix "Supplementary Information by Command"). UNRESOLVED: code list not in refined excerpt.
    - name: data02
      type: integer
      description: "Setting value - 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
    - name: cks
      type: integer
      description: Checksum (low byte of sum of all preceding bytes)
```

## Feedbacks
```yaml
# Responses share a uniform frame. Success response first byte mirrors command block (A0h/A1h/A2h/A3h),
# carries <ID1> <ID2> <LEN> <DATA...> <CKS>. Failure response carries <ERR1> <ERR2> <CKS>.
- id: command_response
  type: object
  description: >
    Generic acknowledgement. Success: no DATA part when command requests none;
    DATA part appended when command requests data. Failure: ERR1/ERR2 carry error codes.
- id: error_status
  type: bitmask
  description: >
    From 009. ERROR STATUS REQUEST - DATA01-DATA12 bitmask; bit=0 normal, bit=1 error.
    Covers cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/ballast/iris/lens errors.
- id: running_status
  type: enum
  description: >
    From 078-2 - DATA06 operation status: 00h Standby(Sleep), 04h Power on, 05h Cooling,
    06h Standby(error), 0Fh Standby(Power saving), 10h Network standby.
- id: power_status
  type: enum
  values: [standby, power_on]
  description: "From 078-2 DATA03 - 00h Standby, 01h Power on"
- id: mute_status
  type: object
  description: "From 078-4 - picture/sound/onscreen/forced-onscreen/onscreen-display mute states"
- id: input_status
  type: object
  description: "From 078-3 - signal switch process, signal list number, selection signal types, content displayed"
- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "From 078-6 - 00h Normal (cover opened), 01h Cover closed"
- id: error_code
  type: enum
  description: >
    ERR1/ERR2 combinations per source §2.4 - e.g. 00h/00h unrecognized, 00h/01h not supported,
    01h/00h invalid value, 02h/0Dh command rejected (power off), 02h/0Eh execution failed,
    02h/0Fh no authority, 03h/02h adjustment failed.
```

## Variables
```yaml
- id: lamp_usage_time
  type: integer
  unit: seconds
  description: From 037 / 037-4 - lamp usage time in seconds (updated at 1-minute intervals).
- id: filter_usage_time
  type: integer
  unit: seconds
  description: From 037-3 - filter usage time in seconds.
- id: filter_alarm_start_time
  type: integer
  unit: seconds
  description: From 037-3 DATA05-08 - filter alarm start time (-1 if undefined).
- id: lamp_remaining_life
  type: integer
  unit: percent
  description: From 037-4 (content 04h) - lamp remaining life %. Negative if replacement deadline exceeded.
- id: carbon_savings
  type: number
  unit: kilogram
  description: From 037-6 - total or during-operation carbon savings (kg + mg fractional).
- id: picture_brightness
  type: integer
  description: From 030-1 / 060-1 (target 00h).
- id: picture_contrast
  type: integer
  description: From 030-1 / 060-1 (target 01h).
- id: picture_color
  type: integer
  description: From 030-1 / 060-1 (target 02h).
- id: picture_hue
  type: integer
  description: From 030-1 / 060-1 (target 03h).
- id: picture_sharpness
  type: integer
  description: From 030-1 / 060-1 (target 04h).
- id: volume
  type: integer
  description: From 030-2 / 060-1 (target 05h).
- id: lamp_light_level
  type: integer
  description: From 030-15 / 060-1 (target 96h) - LAMP/LIGHT ADJUST.
- id: eco_mode
  type: enum
  description: "From 097-8 / 098-8. UNRESOLVED: enum value list referenced in appendix, not present in refined excerpt."
- id: projector_name
  type: string
  description: From 097-45 / 098-45 - LAN projector name (up to 16 bytes).
- id: mac_address
  type: string
  description: From 097-155 - 6-byte MAC address.
- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: From 097-243-1 / 098-243-1.
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: From 053-10 / 053-11.
- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: From 097-198 / 098-198.
- id: model_name
  type: string
  description: From 078-5 - model name string.
- id: serial_number
  type: string
  description: From 305-2 - serial number string.
```

## Events
```yaml
# Source documents no unsolicited notifications. Device only responds to commands.
# UNRESOLVED: no event mechanism described.
```

## Macros
```yaml
# Source documents no named multi-step macro sequences.
# UNRESOLVED: none described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >
      015. POWER ON - while powering on, no other command accepted (source §3.2).
  - description: >
      016. POWER OFF - while powering off (including cooling time), no other command accepted (source §3.3).
  - description: >
      053. LENS CONTROL - after sending 7Fh (drive plus) or 81h (drive minus) in DATA02, lens must be stopped by sending 00h (source §3.22).
  - description: >
      009. ERROR STATUS DATA09 Bit1 - interlock switch open is reported as an error condition (source §3.1).
# Note: source contains no explicit safety warnings beyond command-level interlock notes above.
```

## Notes
- Manual reference: "Projector Control Command Reference Manual", BDT140013 Revision 7.1.
- Command frame: `<B1> <B2> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1 = control ID set on projector; ID2 = model code; CKS = low-order byte of the sum of all preceding bytes.
- Response first byte encodes block: `20h/21h/22h/23h` (success, echoes command block high nibble) vs `A0h/A1h/A2h/A3h` (failure). Success responses with no requested data carry LEN=00h.
- Fixed commands shown above embed ID1=00h ID2=00h as printed in the source's representative payload; the checksum byte in each is computed over the preceding bytes (e.g. POWER ON `02h+00h+00h+00h+00h = 02h`).
- Several enum/code lists (input terminal codes, aspect values, eco mode values, base model type codes, sub-input codes) are referenced by the source as "Appendix — Supplementary Information by Command" but are absent from this refined excerpt.
- Serial baud is selectable across 4800/9600/19200/38400/115200 bps; data 8 bits, parity none, stop 1 bit, full-duplex. Flow control line is not specified.
- LAN control uses TCP port 7142 for command send/receive.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: appendix code lists (input terminal, aspect, eco mode, base model type, sub input) not in refined source excerpt. -->
<!-- UNRESOLVED: serial flow_control not stated in source. -->
<!-- UNRESOLVED: full lens-control target code list (053 DATA01) not in refined excerpt. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:24:19.836Z
last_checked_at: 2026-06-18T09:09:27.937Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:09:27.937Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific appendix (\"Supplementary Information by Command\") values (input terminal codes, aspect codes, eco mode codes, base model type codes) are referenced by the source but not included in the refined excerpt. Firmware version compatibility unknown."
- "flow control not stated (source lists \"Full duplex\" communication mode only)"
- "full code list not in refined excerpt."
- "other target codes referenced in appendix not present in refined excerpt.\""
- "target code list not in refined excerpt."
- "other target codes not in refined excerpt.\""
- "value list not in refined excerpt."
- "sub input code list not in refined excerpt.\""
- "code list not in refined excerpt."
- "enum value list referenced in appendix, not present in refined excerpt.\""
- "no event mechanism described."
- "none described in source."
- "firmware version compatibility not stated."
- "appendix code lists (input terminal, aspect, eco mode, base model type, sub input) not in refined source excerpt."
- "serial flow_control not stated in source."
- "full lens-control target code list (053 DATA01) not in refined excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
