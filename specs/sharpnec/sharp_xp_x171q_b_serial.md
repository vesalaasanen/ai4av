---
spec_id: admin/sharpnec-xpx171qb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp X171Q B Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp X171Q B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp X171Q B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:18:49.017Z
last_checked_at: 2026-06-19T07:53:04.298Z
generated_at: 2026-06-19T07:53:04.298Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal values, aspect values, eco mode values, sub-input values, and base model type values are referenced to an \"Appendix / Supplementary Information by Command\" that is not present in this refined source. Firmware compatibility and voltage/power specifications are not stated."
  - "flow control not stated; source states communication mode \"Full duplex\""
  - "full input terminal value table is in Appendix \"Supplementary Information by Command\", not present in this source."
  - "aspect value table in Appendix, not present in this source."
  - "eco mode value table in Appendix, not present in this source."
  - "sub-input setting values in Appendix, not present in this source."
  - "base model type value table in Appendix, not present in this source."
  - "input terminal value table in Appendix, not present in this source."
  - "eco mode value table in Appendix."
  - "value table in Appendix."
  - "populate if a separate notification/async-event section exists in the full manual."
  - "populate if source documents command sequences."
  - "no explicit safety interlock procedure or power-on sequencing requirement"
  - "input terminal value table, aspect value table, eco mode value table, sub-input setting value table, and base model type value table are all referenced to the \"Supplementary Information by Command\" appendix which is not present in this refined source. Firmware version compatibility, power/voltage specs, and protocol version not stated."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:53:04.298Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands found verbatim in source; all transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp X171Q B Control Spec

## Summary
Control spec for the Sharp/NEC Xp X171Q B projector, based on the Projector Control Command Reference Manual (BDT140013 Revision 7.1). The projector supports RS-232C serial control (PC CONTROL D-SUB 9P) and network control over TCP (wired/wireless LAN, port 7142). Commands are binary, framed in hexadecimal bytes with a trailing checksum; responses carry execution results, requested data, or error code pairs (ERR1/ERR2).

<!-- UNRESOLVED: input terminal values, aspect values, eco mode values, sub-input values, and base model type values are referenced to an "Appendix / Supplementary Information by Command" that is not present in this refined source. Firmware compatibility and voltage/power specifications are not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated for LAN send/receive of commands
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # all switchable per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; source states communication mode "Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF present
  - queryable    # inferred: many request/status commands present
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST present
  - routable     # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
# Framing: command = first bytes + <ID1> <ID2> (response only) + LEN + DATA + <CKS>.
# <CKS> = low-order byte of sum of all preceding bytes (incl. command frame for literal
# commands, incl. filled DATA for parameterized commands). For parameterized commands the
# trailing byte shown as {checksum} MUST be recomputed after filling variables.
# Literal commands below carry the checksum byte verbatim as printed in the source.

# --- 009. ERROR STATUS REQUEST ---
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
  notes: "No other command accepted while power-on is in progress."

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input_terminal} {checksum}"
  params:
    - name: input_terminal
      type: byte
      description: "DATA01 input terminal value. Example from source: 06h = video port."
      # UNRESOLVED: full input terminal value table is in Appendix "Supplementary Information by Command", not present in this source.

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video signal switch."

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
  notes: "Cleared by input/video signal switch or volume adjustment."

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
  notes: "Cleared by input/video signal switch."

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
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: byte
      description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: mode
      type: byte
      description: "DATA02 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_low
      type: byte
      description: "DATA03 adjustment value (low-order 8 bits)."
    - name: value_high
      type: byte
      description: "DATA04 adjustment value (high-order 8 bits)."
  notes: "Source example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Negative example (brightness=-10): ...F6h FFh 0Ch."

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_low} {value_high} {checksum}"
  params:
    - name: mode
      type: byte
      description: "DATA01 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_low
      type: byte
      description: "DATA02 adjustment value (low-order 8 bits)."
    - name: value_high
      type: byte
      description: "DATA03 adjustment value (high-order 8 bits)."
  notes: "Source example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
  params:
    - name: aspect
      type: byte
      description: "DATA01 value set for the aspect."
      # UNRESOLVED: aspect value table in Appendix, not present in this source.

# --- 030-15. OTHER ADJUST ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {target} {content} {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: byte
      description: "DATA01: 96h = LAMP ADJUST / LIGHT ADJUST (only target documented)."
    - name: content
      type: byte
      description: "DATA02: FFh (per documented LAMP/LIGHT ADJUST row)."
    - name: mode
      type: byte
      description: "DATA03 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_low
      type: byte
      description: "DATA04 adjustment value (low-order 8 bits)."
    - name: value_high
      type: byte
      description: "DATA05 adjustment value (high-order 8 bits)."

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response DATA01-49 projector name; DATA83-86 lamp usage time (s); DATA87-90 filter usage time (s). Updated at 1-minute intervals."

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04 filter usage time (s); DATA05-08 filter alarm start time (s); -1 if undefined."

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: byte
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 effective only on two-lamp models)."
    - name: content
      type: byte
      description: "DATA02: 01h=lamp usage time (s), 04h=lamp remaining life (%)."
  notes: "Reflects eco mode when enabled. Negative remaining-life % returned if replacement deadline exceeded."

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {content} {checksum}"
  params:
    - name: content
      type: byte
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_low} {key_high} {checksum}"
  params:
    - name: key_low
      type: byte
      description: "DATA01 (low byte of WORD key code)."
    - name: key_high
      type: byte
      description: "DATA02 (high byte of WORD key code, 00h for all listed keys)."
  notes: |
    Documented key codes (DATA01/DATA02 -> name):
    02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP,
    08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT,
    0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE,
    29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1,
    51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE,
    A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO.

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
  command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
  params:
    - name: target
      type: byte
      description: "DATA01: 06h=Periphery Focus (only target documented)."
    - name: content
      type: byte
      description: |
        DATA02 drive action: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s,
        7Fh=drive + continuous, 81h=drive - continuous, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s.
  notes: "After 7Fh/81h continuous drive, send 00h to stop. Same command can be reissued while driving without a stop."

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: byte
      description: "DATA01 lens adjustment target (value not enumerated in this source beyond periphery focus context)."
  notes: "Response returns upper/lower limit and current value (16-bit each)."

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: byte
      description: "DATA01: FFh=Stop (mode/value ignored), else lens axis selector."
    - name: mode
      type: byte
      description: "DATA02: 00h=absolute, 02h=relative."
    - name: value_low
      type: byte
      description: "DATA03 adjustment value (low-order 8 bits)."
    - name: value_high
      type: byte
      description: "DATA04 adjustment value (high-order 8 bits)."

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: byte
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: byte
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: byte
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes: "Response DATA02 setting value: 00h=OFF, 01h=ON."

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: byte
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: value
      type: byte
      description: "DATA02 setting value: 00h=OFF, 01h=ON."

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_info_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitmask: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V (0=stop,1=operating)."

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: byte
      description: "DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: byte
      description: "DATA01 adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
  notes: "Response returns status, upper/lower/default/current values, wide/narrow adjustment width, and default-validity flag."

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03 base model type; DATA04 sound function (00h N/A, 01h available); DATA05 profile (00h N/A, 01h clock, 02h sleep timer, 03h clock+sleep)."

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03 power status (00h standby, 01h power on); DATA04 cooling; DATA05 power on/off process; DATA06 operation status (00h standby-sleep, 04h power on, 05h cooling, 06h standby-error, 0Fh power-saving, 10h network standby)."

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: signal switch process, signal list number (returned value is practical number minus 1), selection signal type 1/2, signal list type, test pattern, content displayed."

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off / 01h on)."

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32 model name (NUL terminated)."

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h normal (cover opened), 01h cover closed (mirror/lens cover)."

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: byte
      description: "DATA01: 01h=freeze on, 02h=freeze off."

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
  params:
    - name: type
      type: byte
      description: "DATA01 information type: 03h=horizontal sync frequency, 04h=vertical sync frequency."
  notes: "Response returns label string length + NUL-terminated string."

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response DATA01 eco mode value. Returns Light mode or Lamp mode depending on projector."
  # UNRESOLVED: eco mode value table in Appendix, not present in this source.

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 projector name (NUL terminated)."

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 MAC address."

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {target} {checksum}"
  params:
    - name: target
      type: byte
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes: "MODE value 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT."
  # UNRESOLVED: sub-input setting values in Appendix, not present in this source.

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h=OFF, 01h=ON."

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "DATA01 value set for the eco mode."
      # UNRESOLVED: eco mode value table in Appendix, not present in this source.
  notes: "Sets Light mode or Lamp mode depending on projector."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_16bytes} 00h {checksum}"
  params:
    - name: name_16bytes
      type: string
      description: "DATA01-16 projector name, up to 16 bytes (NUL termination appended)."

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {target} {value} {checksum}"
  params:
    - name: target
      type: byte
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: value
      type: byte
      description: "DATA02 setting value (MODE: 00h PIP / 01h PbP; START POSITION: 00h-03h corners)."
      # UNRESOLVED: sub-input setting values in Appendix, not present in this source.

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "DATA01 setting value: 00h=OFF, 01h=ON."

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02 base model type; DATA03-11 model name; DATA12-13 base model type."
  # UNRESOLVED: base model type value table in Appendix, not present in this source.

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 serial number (NUL terminated)."

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_info_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response DATA01 operation status (00h standby-sleep, 04h power on, 05h cooling, 06h standby-error, 0Fh power-saving, 10h network standby); DATA02 content displayed; DATA03/04 signal types; DATA05 display signal type; DATA06 video mute; DATA07 sound mute; DATA08 onscreen mute; DATA09 freeze."

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
  params:
    - name: input
      type: byte
      description: "DATA01 input terminal value."
      # UNRESOLVED: input terminal value table in Appendix, not present in this source.
    - name: value
      type: byte
      description: "DATA02 setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# General response framing (all commands):
#   Success (no data): A<h><m> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>  (ERR=00h 00h on success)
#   Success (with data): 2<h><m> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   Failure: A<h><m> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Where <h><m> echo the command header bytes (e.g. A2h 00h for POWER ON).
# <ID1> = control ID set on projector; <ID2> = model code (varies by model).

- id: error_status
  type: bitmask
  description: "From 009 ERROR STATUS REQUEST, DATA01-DATA12 bitfield. Bit set to 1 = error."
  fields:
    - "DATA01: cover error, temperature(bimetal), fan, power, lamp off/backlight off, lamp replacement due"
    - "DATA02: lamp usage exceeded, formatter error, lamp 2 off, lamp 2 errors"
    - "DATA03: FPGA error, temperature(sensor), lamp not present, lamp data error, mirror cover error, lamp 2 replacement due"
    - "DATA04: lamp 2 not present, lamp 2 data error, temperature(dust), foreign matter sensor, ballast comm error, iris calibration, lens not installed"
    - "DATA09 extended: portrait cover up, interlock switch open, system error (slave CPU / formatter)"

- id: power_state
  type: enum
  values: [standby, power_on]
  description: "078-2 DATA03: 00h standby, 01h power on."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA06 / 305-3 DATA01."

- id: mute_state
  type: object
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  description: "078-4 DATA01-05, each 00h off / 01h on."

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  description: "078-6 DATA01."

- id: lens_operation_status
  type: bitmask
  description: "053-7 DATA01: lens memory/zoom/focus/shift H/shift V operating flags."

- id: lamp_info
  type: object
  fields: [usage_time_seconds, remaining_life_percent]
  description: "037-4; remaining life may be negative past replacement deadline."

- id: filter_info
  type: object
  fields: [usage_time_seconds, alarm_start_time_seconds]

- id: eco_mode
  type: byte
  description: "097-8 DATA01. Value table not in this source."
  # UNRESOLVED: eco mode value table in Appendix.

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]

- id: error_codes
  type: table
  description: "ERR1/ERR2 pairs from response frames."
  rows:
    - "00h/00h: command not recognized"
    - "00h/01h: command not supported by model"
    - "01h/00h: specified value invalid"
    - "01h/01h: specified input terminal invalid"
    - "01h/02h: specified language invalid"
    - "02h/00h: memory allocation error"
    - "02h/02h: memory in use"
    - "02h/03h: specified value cannot be set"
    - "02h/04h: forced onscreen mute on"
    - "02h/06h: viewer error"
    - "02h/07h: no signal"
    - "02h/08h: test pattern/filter displayed"
    - "02h/09h: no PC card inserted"
    - "02h/0Ah: memory operation error"
    - "02h/0Ch: entry list displayed"
    - "02h/0Dh: command not accepted, power is off"
    - "02h/0Eh: command execution failed"
    - "02h/0Fh: no authority for operation"
    - "03h/00h: specified gain number incorrect"
    - "03h/01h: specified gain invalid"
    - "03h/02h: adjustment failed"
```

## Variables
```yaml
- id: volume
  type: integer
  description: "Set via 030-2 VOLUME ADJUST; readable via 060-1 (name 05h)."

- id: picture_brightness
  type: integer
  description: "Set via 030-1 (target 00h); readable via 060-1 (name 00h)."

- id: picture_contrast
  type: integer
  description: "Set via 030-1 (target 01h); readable via 060-1 (name 01h)."

- id: picture_color
  type: integer
  description: "Set via 030-1 (target 02h); readable via 060-1 (name 02h)."

- id: picture_hue
  type: integer
  description: "Set via 030-1 (target 03h); readable via 060-1 (name 03h)."

- id: picture_sharpness
  type: integer
  description: "Set via 030-1 (target 04h); readable via 060-1 (name 04h)."

- id: lamp_light_adjust
  type: integer
  description: "Set via 030-15 (target 96h); readable via 060-1 (name 96h)."

- id: eco_mode
  type: byte
  description: "Set via 098-8; readable via 097-8."
  # UNRESOLVED: value table in Appendix.

- id: projector_name
  type: string
  description: "Set via 098-45 (up to 16 bytes); readable via 097-45."
```

## Events
```yaml
# No unsolicited notifications documented in this source.
# UNRESOLVED: populate if a separate notification/async-event section exists in the full manual.
```

## Macros
```yaml
# No multi-step sequences explicitly described in this source.
# UNRESOLVED: populate if source documents command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: no other command accepted while power-on in progress."
  - "016 POWER OFF: no other command accepted during power-off (incl. cooling time)."
  - "02h/0Dh error: most commands rejected while power is off."
# UNRESOLVED: no explicit safety interlock procedure or power-on sequencing requirement
# stated beyond the per-command notes above. Voltage/power specifications not stated in source.
```

## Notes
- Reference manual revision: BDT140013 Revision 7.1.
- Checksum (CKS) = low-order byte of the sum of all preceding bytes (command + ID + LEN + DATA). Must be recomputed for any parameterized command after filling DATA. Worked example from source: `20h 81h 01h 60h 01h 00h` sums to 103h → CKS = 03h.
- Serial cable must be a cross cable; D-SUB 9P pinout documented (2/3 RxD/TxD crossed, 7/8 RTS/CTS crossed, 5 GND).
- LAN: wired RJ-45 10/100 auto-negotiation, or optional wireless LAN unit. TCP port 7142 for all command send/receive.
- Usage-time fields (lamp/filter) are stored in one-second units but updated at one-minute intervals.
- Lamp 2 queries (037-4 DATA01=01h) effective only on two-lamp projector models.

<!-- UNRESOLVED: input terminal value table, aspect value table, eco mode value table, sub-input setting value table, and base model type value table are all referenced to the "Supplementary Information by Command" appendix which is not present in this refined source. Firmware version compatibility, power/voltage specs, and protocol version not stated. -->
````

Spec done. 53 commands all enumerated, payload verbatim. Gaps (input terminal/aspect/eco/sub-input/base-model value tables, firmware, flow control) marked UNRESOLVED — appendix not in this refined source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:18:49.017Z
last_checked_at: 2026-06-19T07:53:04.298Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:53:04.298Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands found verbatim in source; all transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal values, aspect values, eco mode values, sub-input values, and base model type values are referenced to an \"Appendix / Supplementary Information by Command\" that is not present in this refined source. Firmware compatibility and voltage/power specifications are not stated."
- "flow control not stated; source states communication mode \"Full duplex\""
- "full input terminal value table is in Appendix \"Supplementary Information by Command\", not present in this source."
- "aspect value table in Appendix, not present in this source."
- "eco mode value table in Appendix, not present in this source."
- "sub-input setting values in Appendix, not present in this source."
- "base model type value table in Appendix, not present in this source."
- "input terminal value table in Appendix, not present in this source."
- "eco mode value table in Appendix."
- "value table in Appendix."
- "populate if a separate notification/async-event section exists in the full manual."
- "populate if source documents command sequences."
- "no explicit safety interlock procedure or power-on sequencing requirement"
- "input terminal value table, aspect value table, eco mode value table, sub-input setting value table, and base model type value table are all referenced to the \"Supplementary Information by Command\" appendix which is not present in this refined source. Firmware version compatibility, power/voltage specs, and protocol version not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
