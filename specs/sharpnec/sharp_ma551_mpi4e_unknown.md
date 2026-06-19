---
spec_id: admin/sharp-nec-ma551-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma551 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "Ma551 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ma551 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:12:39.604Z
last_checked_at: 2026-06-18T08:28:23.580Z
generated_at: 2026-06-18T08:28:23.580Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "document is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) not model-specific; the model name \"Ma551 Mpi4E\" is supplied out-of-band. Firmware compatibility, voltage/power specs, and exact supported input-terminal enum values (referenced to an \"Appendix\" not included in source) are not stated."
  - "source contains no explicit safety interlock procedures, power-on"
  - "model name \"Ma551 Mpi4E\" supplied out-of-band; source document (BDT140013 Rev 7.1) is a generic projector command reference and does not name this model explicitly."
  - "exact input-terminal enum values, aspect enum values, eco-mode enum values, and base-model-type values are referenced to a source \"Appendix: Supplementary Information by Command\" that is NOT included in the provided text."
  - "serial flow_control mode not stated (RTS/CTS pins wired but only \"Full duplex\" documented)."
  - "default baud rate not stated (five selectable rates listed)."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:28:23.580Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ma551 Mpi4E Control Spec

## Summary
Sharp/NEC projector (Ma551 Mpi4E) controlled via a binary command protocol over RS-232C serial or wired/wireless LAN (TCP). The protocol uses framed hex commands with a trailing checksum byte, command/response model, and an error-code scheme reported in ERR1/ERR2. This spec covers the full documented command catalogue: power, input switching, mute, picture/volume/aspect adjustment, lens and lens-memory control, shutter, freeze, eco mode, PIP/PbP, edge blending, audio select, and numerous status/information queries.

<!-- UNRESOLVED: document is a generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1) not model-specific; the model name "Ma551 Mpi4E" is supplied out-of-band. Firmware compatibility, voltage/power specs, and exact supported input-terminal enum values (referenced to an "Appendix" not included in source) are not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists selectable rates: 115200/38400/19200/9600/4800 bps; default not stated
  # alt baud rates documented: 38400, 19200, 9600, 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  # flow_control: UNRESOLVED - RTS/CTS pins wired cross on the PC CONTROL D-SUB 9P connector,
  #   but source states only "Communication mode: Full duplex" and does not name flow-control mode.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable   # inferred: many status/information request commands present
  - levelable   # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1) present
```

## Actions
```yaml
# All payloads verbatim from source (hex). <DATA##> = parameter byte(s); <CKS> = checksum
# (sum of all preceding bytes mod 256, low-order byte). <ID1>/<ID2> are response framing bytes
# (control ID / model code) added by the device, not part of the command payload.

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response returns DATA01-DATA12 bitmap of error flags (bit=1 = error). See error_information fields."

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command accepted."

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (incl. cooling time), no other command accepted."

# --- 018. INPUT SW CHANGE ---
- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full enum in source Appendix not included."
  notes: "Example in source: set video port -> 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Ex: brightness=10 -> 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h; brightness=-10 -> ...F6h FFh 0Ch"

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Ex: volume=10 -> 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value; enum in source Appendix not included."

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 96h=LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86, sec), filter usage time (DATA87-90, sec). Updated 1-min intervals."

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04, sec) and filter alarm start time (DATA05-08, sec). -1 if undefined."

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
  notes: "Eco mode reflected in values. Negative remaining-life % if replacement deadline exceeded."

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999)."

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD). Ex values: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD). Source lists all as 00h."
  notes: "Ex: AUTO -> 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target; source documents 06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  notes: "After 7Fh/81h, send 00h to stop. Lens can be controlled without stop during drive by re-issuing same command."

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target to query"
  notes: "Returns upper/lower limits and current value (DATA02-07)."

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target; FFh=Stop (mode/value not referenced)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile selected via LENS PROFILE SET (053-10)."

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "DATA02 returned: 00h=OFF, 01h=ON"

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h=OFF, 01h=ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmap: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift(H), bit4=Lens Shift(V); 0=Stop,1=During operation."

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01 profile: 00h=Profile 1, 01h=Profile 2."

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Returns status, upper/lower limits, default, current, wide/narrow widths. Ex: brightness -> 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock function (DATA05)."

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, test pattern display, content displayed."

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string (DATA01-32, NUL-terminated)."

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: "Returns label/info string (NUL-terminated)."

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value; enum in source Appendix not included."

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (DATA01-17, NUL-terminated)."

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address (DATA01-06)."

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco/light/lamp mode value; enum in source Appendix not included."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name (up to 16 bytes), followed by 00h terminator."

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value; depends on DATA01 (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; sub input value per Appendix)."

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13), model name (DATA03-11)."

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number string (DATA01-16, NUL-terminated)."

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value; enum in source Appendix not included."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All queries above return framed responses. Response framing per source:
#   Success (no data):  2Xh <cmd> <ID1> <ID2> <LEN> <CKS>
#   Success (with data): 2Xh <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   Failure:            AXh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1/ERR2 codes documented verbatim in Notes. Key enumerated feedback states:

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06"

- id: cooling_process_state
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: "078-2 DATA04"

- id: mute_state
  type: object
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  source: "078-4 MUTE STATUS REQUEST"

- id: cover_state
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 COVER STATUS REQUEST"

- id: edge_blending_state
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11 LENS PROFILE REQUEST"

- id: error_status
  type: bitmap
  description: "12-byte error bitmap from 009 ERROR STATUS REQUEST (DATA01-12). See Notes for bit definitions."
```

## Variables
```yaml
# Settable scalar parameters are captured as kind: action entries in Actions
# (volume, picture gains, aspect, eco mode, lamp/light adjust, projector name).
# No additional standalone variables documented outside those commands.
```

## Events
```yaml
# Source documents no unsolicited notifications; all device output is in
# response to a command (synchronous request/response model).
```

## Macros
```yaml
# Source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off (incl. cooling) no other command accepted; implies cooldown cycle
interlocks:
  - "Power on/off in progress blocks all other commands (source: 015/016)."
  - "Lens drive: after continuous drive (7Fh/81h) a Stop (00h) must be sent (source: 053)."
  - "Picture/Sound/Onscreen mute auto-clear on input or video-signal switch (source: 020/022/024)."
# UNRESOLVED: source contains no explicit safety interlock procedures, power-on
# sequencing, or voltage/current specs beyond the command-level notes above.
```

## Notes
**Protocol framing.** Commands and responses are hex byte frames. General response/error frame: `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`. `<ID1>` = control ID set on projector; `<ID2>` = model code (model-dependent). `<CKS>` = checksum = low-order byte of the sum of all preceding bytes. Example: `20h 81h 01h 60h 01h 00h <CKS>` → 20+81+01+60+01+00 = 103h → CKS = 03h.

**Command opcode layout.** Byte 0 is a command-class prefix (00h/01h/02h/03h), byte 1 the command code, bytes 2-3 fixed 00h, byte 4 = data length (LEN), then data bytes and checksum. Set commands use prefix 02h/03h; their success-response prefix is 22h/23h; query (request) commands use prefix 00h/03h with response prefix 20h/23h; failure-response prefix is A0h/A1h/A2h/A3h.

**Error codes (ERR1/ERR2) — verbatim from source §2.4:**
- 00h/00h = command not recognized
- 00h/01h = command not supported by model
- 01h/00h = specified value invalid
- 01h/01h = specified input terminal invalid
- 01h/02h = specified language invalid
- 02h/00h = memory allocation error
- 02h/02h = memory in use
- 02h/03h = specified value cannot be set
- 02h/04h = forced onscreen mute on
- 02h/06h = viewer error
- 02h/07h = no signal
- 02h/08h = test pattern or filter displayed
- 02h/09h = no PC card inserted
- 02h/0Ah = memory operation error
- 02h/0Ch = entry list displayed
- 02h/0Dh = command not accepted because power is off
- 02h/0Eh = command execution failed
- 02h/0Fh = no authority for operation
- 03h/00h = specified gain number incorrect
- 03h/01h = specified gain invalid
- 03h/02h = adjustment failed

**Error status bitmap (009 ERROR STATUS REQUEST) — DATA01-09 bit definitions verbatim from source.** DATA01: bit0 Cover error, bit1 Temperature error (bi-metallic strip), bit2 None(0), bit3 Fan error, bit4 Fan error, bit5 Power error, bit6 Lamp/lamp1 off or backlight off, bit7 Lamp/lamp1 replacement moratorium. DATA02: bit0 Lamp1 usage time exceeded, bit1 Formatter error, bit2 Lamp2 off, bit3 None(0), bit7 Refer to extend status. DATA03: bit1 FPGA error, bit2 Temperature error (sensor), bit3 Lamp1 not present, bit4 Lamp1 data error, bit5 Mirror cover error, bit6 Lamp2 replacement moratorium, bit7 Lamp2 usage time exceeded. DATA04: bit0 Lamp2 not present, bit1 Lamp2 data error, bit2 Temperature error due to dust, bit3 Foreign matter sensor error, bit5 Ballast comm error, bit6 Iris calibration error, bit7 Lens not installed properly. DATA09 (extended): bit0 Portrait cover side up, bit1 Interlock switch open, bit2 System error (Slave CPU), bit3 System error (Formatter). DATA05-08 and DATA10-12 reserved.

**Time-unit note.** Lamp/filter usage times returned in seconds, updated at 1-minute intervals (source §3.15, §3.17).

<!-- UNRESOLVED: model name "Ma551 Mpi4E" supplied out-of-band; source document (BDT140013 Rev 7.1) is a generic projector command reference and does not name this model explicitly. -->
<!-- UNRESOLVED: exact input-terminal enum values, aspect enum values, eco-mode enum values, and base-model-type values are referenced to a source "Appendix: Supplementary Information by Command" that is NOT included in the provided text. -->
<!-- UNRESOLVED: serial flow_control mode not stated (RTS/CTS pins wired but only "Full duplex" documented). -->
<!-- UNRESOLVED: default baud rate not stated (five selectable rates listed). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:12:39.604Z
last_checked_at: 2026-06-18T08:28:23.580Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:28:23.580Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "document is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) not model-specific; the model name \"Ma551 Mpi4E\" is supplied out-of-band. Firmware compatibility, voltage/power specs, and exact supported input-terminal enum values (referenced to an \"Appendix\" not included in source) are not stated."
- "source contains no explicit safety interlock procedures, power-on"
- "model name \"Ma551 Mpi4E\" supplied out-of-band; source document (BDT140013 Rev 7.1) is a generic projector command reference and does not name this model explicitly."
- "exact input-terminal enum values, aspect enum values, eco-mode enum values, and base-model-type values are referenced to a source \"Appendix: Supplementary Information by Command\" that is NOT included in the provided text."
- "serial flow_control mode not stated (RTS/CTS pins wired but only \"Full duplex\" documented)."
- "default baud rate not stated (five selectable rates listed)."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
