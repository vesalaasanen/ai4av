---
spec_id: admin/sharp-nec-np-pa903x-41zl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP PA903X 41ZL Control Spec"
manufacturer: Sharp/NEC
model_family: "NP PA903X 41ZL"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP PA903X 41ZL"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:58:44.442Z
last_checked_at: 2026-06-18T08:49:59.310Z
generated_at: 2026-06-18T08:49:59.310Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Input terminal value list, base model type list, and several \"Supplementary Information by Command\" appendix tables are referenced by the source but not included in the refined extract."
  - "source states \"Full duplex\" communication mode but does not name an explicit flow-control protocol; RTS/CTS pins are present on the PC CONTROL D-SUB 9P connector"
  - "min/max range not stated in source extract (returned dynamically by 060-1)"
  - "min/max range returned dynamically by 060-1"
  - "enum values not in source extract"
  - "source documents no unsolicited push notifications. All device data is obtained"
  - "source documents no named multi-step macro sequences. Power on/off carry"
  - "source gives no voltage/current/power specs, no explicit external interlock wiring,"
  - "firmware version compatibility not stated in source."
  - "exact enum tables for input terminal, base model type, aspect, eco mode, and PIP/PBP sub-input not present in refined extract (live in source appendix)."
  - "explicit flow-control protocol for serial not named (only \"Full duplex\" stated)."
  - "wireless LAN unit model list / supported wireless standards not in this extract."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:49:59.310Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP PA903X 41ZL Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control of the NP PA903X 41ZL. Commands are binary hex frames framed with a header, control ID, model code, length, data, and a checksum (low-order byte of the sum of all preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated in source. Input terminal value list, base model type list, and several "Supplementary Information by Command" appendix tables are referenced by the source but not included in the refined extract. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists selectable: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not name an explicit flow-control protocol; RTS/CTS pins are present on the PC CONTROL D-SUB 9P connector
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON (015) / POWER OFF (016) commands present
  - routable      # inferred: INPUT SW CHANGE (018) input terminal switching present
  - queryable     # inferred: many *REQUEST status/info queries present
  - levelable     # inferred: VOLUME ADJUST / PICTURE ADJUST / OTHER ADJUST level commands present
```

## Actions
```yaml
# All payloads verbatim hex from source. Checksum byte (CKS) = low-order byte of sum of
# all preceding bytes. {DATAxx} = variable data byte documented per command. {CKS} = computed
# checksum; for commands where the source documents a complete fixed frame (no variable byte),
# the literal CKS value is emitted; for parameterized commands, {CKS} is left as a placeholder.
#
# Binary frame layout:  <HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   HDR: command header byte (00h/01h/02h/03h). Response ACK echoes HDR|20h. Error response uses HDR|80h.
#   ID1: control ID set on projector. ID2: model code (varies by model).
#   LEN: data length (bytes) following LEN.
#   CKS: checksum = low-order 8 bits of sum of all preceding bytes.

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
  notes: "While this command is turning on the power, no other command can be accepted."

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off (including cooling time), no other command can be accepted."

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal value (e.g. 06h = video port per source example). Full value list in source appendix 'Supplementary Information by Command'."
  notes: "Example (switch to video port DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Set brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Value set for the aspect (see source appendix 'Supplementary Information by Command')."

# --- 030-15. OTHER ADJUST ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target high byte: 96h (with DATA02=FFh = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: enum
      description: "Adjustment target low byte: FFh for LAMP/LIGHT ADJUST"
    - name: DATA03
      type: enum
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

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only valid on two-lamp models)"
    - name: DATA02
      type: enum
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
  notes: "Example get lamp usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD). Key list: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD) - 00h for all listed keys"
  notes: "Example send AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens target. Source documents 06h=Periphery Focus (other target codes in source appendix)."
    - name: DATA02
      type: enum
      description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "After 7Fh/81h, send 00h to stop. Lens can be re-targeted mid-drive by issuing the same command."

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens target (see LENS CONTROL DATA01)."

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens target. FFh=Stop (mode/value not referenced)."
    - name: DATA02
      type: enum
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
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number selected by 053-10 LENS PROFILE SET."

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: enum
      description: "Setting value: 00h=OFF, 01h=ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  notes: "Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "01h=Freeze on, 02h=Freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Value set for the eco mode (see source appendix 'Supplementary Information by Command')."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} - {DATA16} 00h {CKS}"
  params:
    - name: DATA01..DATA16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)."

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: enum
      description: "Setting value. MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values per source appendix."

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Setting value: 00h=OFF, 01h=ON"

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal (value list in source appendix 'Supplementary Information by Command')."
    - name: DATA02
      type: enum
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Every command yields a response frame. ACK response echoes command HDR with high bit cleared
# and bit5 set (e.g. 02h cmd -> 22h ack). Error response sets high bit (e.g. 02h -> A2h error)
# and carries ERR1/ERR2 codes. Query (data-requesting) responses add a DATA block of length LEN.

- id: command_ack
  type: raw
  description: "Successful ACK for non-data command: <HDR|20h> <sub> <ID1> <ID2> <LEN> <CKS>"

- id: command_error
  type: raw
  description: "Error response: <HDR|80h> <sub> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA06"

- id: cooling_in_progress
  type: boolean
  source: "078-2 RUNNING STATUS REQUEST DATA04"

- id: power_onoff_in_progress
  type: boolean
  source: "078-2 RUNNING STATUS REQUEST DATA05"

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA01"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA02"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA03"

- id: freeze_status
  type: enum
  values: [off, on]
  source: "305-3 BASIC INFORMATION REQUEST DATA09"

- id: input_signal_type
  type: enum
  description: "Active selection signal type 2 (COMPUTER/VIDEO/S-VIDEO/COMPONENT/DVI-D/HDMI/DisplayPort/VIEWER)"
  source: "078-3 INPUT STATUS REQUEST DATA04 / 305-3 DATA04"

- id: error_status
  type: bitmask
  description: "12-byte error bitmap (DATA01-DATA12 of 009 response): cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/ballast/iris errors"
  source: "009 ERROR STATUS REQUEST"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: lamp_usage_time_seconds
  type: integer
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01 lamp select, content 01h)"

- id: lamp_remaining_life_percent
  type: integer
  source: "037-4 LAMP INFORMATION REQUEST 3 (content 04h); negative if replacement deadline exceeded"

- id: filter_usage_time_seconds
  type: integer
  source: "037-3 FILTER USAGE INFORMATION REQUEST DATA01-04 (-1 if undefined)"

- id: projector_name
  type: string
  source: "037 INFORMATION REQUEST DATA01-49 / 097-45 LAN PROJECTOR NAME REQUEST"

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST DATA01-32"

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST DATA01-16"

- id: mac_address
  type: string
  source: "097-155 LAN MAC ADDRESS STATUS REQUEST2 DATA01-06"

- id: eco_mode
  type: enum
  description: "Light mode / Lamp mode value (code list in source appendix)"
  source: "097-8 ECO MODE REQUEST"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST"

# Error codes (ERR1/ERR2) documented in source section 2.4:
# 00h/00h=unrecognized cmd, 00h/01h=unsupported by model, 01h/00h=invalid value,
# 01h/01h=invalid input terminal, 01h/02h=invalid language, 02h/00h=memory alloc error,
# 02h/02h=memory in use, 02h/03h=value cannot be set, 02h/04h=forced onscreen mute on,
# 02h/06h=viewer error, 02h/07h=no signal, 02h/08h=test pattern/filter displayed,
# 02h/09h=no PC card, 02h/0Ah=memory operation error, 02h/0Ch=entry list displayed,
# 02h/0Dh=command rejected (power off), 02h/0Eh=execution failed, 02h/0Fh=no authority,
# 03h/00h=incorrect gain number, 03h/01h=invalid gain, 03h/02h=adjustment failed
```

## Variables
```yaml
- id: volume_level
  type: integer
  description: "Audio volume level (set via 030-2 VOLUME ADJUST, read via 060-1 DATA01=05h)."
  # UNRESOLVED: min/max range not stated in source extract (returned dynamically by 060-1)

- id: brightness_level
  type: integer
  description: "Picture brightness (set via 030-1 DATA01=00h, read via 060-1 DATA01=00h)."
  # UNRESOLVED: min/max range returned dynamically by 060-1

- id: contrast_level
  type: integer
  description: "Picture contrast (set via 030-1 DATA01=01h, read via 060-1 DATA01=01h)."

- id: color_level
  type: integer
  description: "Picture color (set via 030-1 DATA01=02h, read via 060-1 DATA01=02h)."

- id: hue_level
  type: integer
  description: "Picture hue (set via 030-1 DATA01=03h, read via 060-1 DATA01=03h)."

- id: sharpness_level
  type: integer
  description: "Picture sharpness (set via 030-1 DATA01=04h, read via 060-1 DATA01=04h)."

- id: lamp_light_adjust
  type: integer
  description: "Lamp/Light adjust level (set via 030-15, read via 060-1 DATA01=96h)."

- id: aspect_mode
  type: enum
  description: "Aspect setting (set via 030-12). Value list in source appendix."
  # UNRESOLVED: enum values not in source extract

- id: eco_mode_value
  type: enum
  description: "Eco/Light/Lamp mode (set via 098-8, read via 097-8). Value list in source appendix."

- id: freeze_state
  type: enum
  values: [off, on]
  description: "Freeze on/off (set via 079)."

- id: edge_blending_mode_value
  type: enum
  values: [off, on]
  description: "Edge blending (set via 098-243-1, read via 097-243-1)."

- id: projector_name_value
  type: string
  description: "LAN projector name, up to 16 bytes (set via 098-45, read via 097-45)."

- id: lens_profile_number
  type: enum
  values: [profile_1, profile_2]
  description: "Reference lens memory profile (set via 053-10, read via 053-11)."

- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
  description: "Lens memory LOAD BY SIGNAL option (set/read 053-6/053-5)."

- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
  description: "Lens memory FORCED MUTE option (set/read 053-6/053-5)."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited push notifications. All device data is obtained
# by polling via the REQUEST commands. No event mechanism described.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences. Power on/off carry
# implicit cooldown/warmup exclusion windows (no other command accepted mid-transition) but
# these are device-enforced, not client-scripted macros.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off including cooling time, no other command accepted
  - shutter_close  # closes lens shutter; occludes projection
interlocks:
  - "Power transition lock: while POWER ON / POWER OFF (incl. cooling) is executing, the projector accepts no other command (source 3.2, 3.3)."
  - "Portrait cover / interlock switch: error status bit (009 DATA09 Bit1) indicates interlock switch open; portrait cover side up indicated by DATA09 Bit0."
  - "Mirror/lens cover: COVER STATUS REQUEST (078-6) reports cover open/closed; COVER error flagged in 009 DATA01 Bit0 / DATA03 Bit5."
  - "Lamp replacement moratorium: flagged in 009 DATA01 Bit7 (lamp 1) / DATA03 Bit6 (lamp 2); lamp usage time exceeded limit flagged in DATA02 Bit0 / Bit7."
  - "Command authority: ERR1=02h ERR2=0Fh returned when there is no authority for the operation (source 2.4)."
# UNRESOLVED: source gives no voltage/current/power specs, no explicit external interlock wiring,
# and no power-on sequencing procedure beyond the device-enforced transition lock.
```

## Notes
- Binary protocol: all payloads are hex byte sequences. `h` suffix denotes hexadecimal. `ID1` is the projector's configured control ID; `ID2` is the model code (varies per model — not enumerated in this extract).
- Checksum (CKS) = low-order byte (8 bits) of the sum of all preceding bytes in the frame. Worked example from source: `20h 81h 01h 60h 01h 00h` -> sum=103h -> CKS=03h.
- Response framing: successful ACK echoes the command header with bit5 set and bit7 cleared (e.g. cmd HDR 02h -> ack 22h). Data-bearing query responses include a DATA block whose length is given by LEN. Error responses set bit7 of the header (e.g. 02h -> A2h) and carry ERR1/ERR2.
- Serial: selectable baud 115200/38400/19200/9600/4800 bps, 8 data bits, no parity, 1 stop bit, full duplex. RS-232C cross cable on PC CONTROL D-SUB 9P (RxD/TxD/GND/RTS/CTS wired).
- LAN: wired RJ-45 (10/100 auto) or vendor wireless LAN unit; TCP port 7142 for command send/receive.
- Lamp 2 (DATA01=01h in 037-4) is only valid on two-lamp projector models.
- Signal list number returned by 078-3 is 1 less than the practical value; add 1 to obtain the human-readable list number.
- Lamp/filter usage time available in one-second units but updated at one-minute intervals.
- Several command parameter value lists (input terminal codes, base model type codes, aspect values, eco mode values, sub-input values) live in an appendix titled "Supplementary Information by Command" that is NOT included in the refined source extract; those enums are marked UNRESOLVED above.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact enum tables for input terminal, base model type, aspect, eco mode, and PIP/PBP sub-input not present in refined extract (live in source appendix). -->
<!-- UNRESOLVED: explicit flow-control protocol for serial not named (only "Full duplex" stated). -->
<!-- UNRESOLVED: wireless LAN unit model list / supported wireless standards not in this extract. -->
````

Spec done. 53 commands all covered verbatim hex. Both serial + TCP (port 7142) transport. No fabrication. UNRESOLVED markers where source appendix missing.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:58:44.442Z
last_checked_at: 2026-06-18T08:49:59.310Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:49:59.310Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Input terminal value list, base model type list, and several \"Supplementary Information by Command\" appendix tables are referenced by the source but not included in the refined extract."
- "source states \"Full duplex\" communication mode but does not name an explicit flow-control protocol; RTS/CTS pins are present on the PC CONTROL D-SUB 9P connector"
- "min/max range not stated in source extract (returned dynamically by 060-1)"
- "min/max range returned dynamically by 060-1"
- "enum values not in source extract"
- "source documents no unsolicited push notifications. All device data is obtained"
- "source documents no named multi-step macro sequences. Power on/off carry"
- "source gives no voltage/current/power specs, no explicit external interlock wiring,"
- "firmware version compatibility not stated in source."
- "exact enum tables for input terminal, base model type, aspect, eco mode, and PIP/PBP sub-input not present in refined extract (live in source appendix)."
- "explicit flow-control protocol for serial not named (only \"Full duplex\" stated)."
- "wireless LAN unit model list / supported wireless standards not in this extract."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
