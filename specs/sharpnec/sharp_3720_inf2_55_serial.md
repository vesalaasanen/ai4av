---
spec_id: admin/sharp-nec-3720-inf2-55
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC 3720 Inf2 55 Control Spec"
manufacturer: Sharp/NEC
model_family: "3720 Inf2 55"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "3720 Inf2 55"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:17:07.320Z
last_checked_at: 2026-06-17T19:31:28.724Z
generated_at: 2026-06-17T19:31:28.724Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Control ID (ID1) default value not stated. Model code (ID2) value not stated. Input terminal code values and aspect/eco-mode value tables referenced to an \"Appendix\" not present in this excerpt."
  - "not in comm-conditions table; pin assignment shows RTS/CTS cross-wired, suggesting hardware flow control possible, but source does not state a setting"
  - "no event/notification model in source."
  - "no explicit power-on sequencing procedure or voltage interlock"
  - "firmware version compatibility not stated. ID1 control-ID default not stated. ID2 model code value not stated. Input terminal / aspect / eco-mode / sub-input value tables referenced to an Appendix not contained in this source excerpt. flow_control setting not in comm-conditions table. Power/voltage/current specs out of scope (no values invented)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:31:28.724Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 documented commands found verbatim in source with correct parameters and encoding. Transport fully verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC 3720 Inf2 55 Control Spec

## Summary
Sharp/NEC projector control spec covering the 3720 Inf2 55. The device supports RS-232C serial control and TCP/IP LAN control (wired and wireless). Communication uses a binary frame protocol with a trailing checksum byte. This spec enumerates all 53 documented commands spanning power, mute, input switching, picture/volume/aspect/lens adjustment, lens memory, status queries, freeze, remote key emulation, eco mode, PIP/PbP, edge blending, and projector identification.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Control ID (ID1) default value not stated. Model code (ID2) value not stated. Input terminal code values and aspect/eco-mode value tables referenced to an "Appendix" not present in this excerpt. -->

## Transport
```yaml
# Both RS-232C serial and TCP/IP LAN control are documented (section 1.1).
# Serial settings table (section 1.2, "Serial connection") and TCP port (section 1.2, "Port number").
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: not in comm-conditions table; pin assignment shows RTS/CTS cross-wired, suggesting hardware flow control possible, but source does not state a setting
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - queryable       # inferred: many request/status query commands present
  - routable        # inferred: INPUT SW CHANGE / audio select routing present
  - levelable       # inferred: volume, picture, lamp/light gain adjust commands present
```

## Actions
```yaml
# Binary frames. Every payload below is verbatim from the source.
# ID1 = control ID (projector setting); ID2 = model code; CKS = checksum
# (low-order byte of the sum of all preceding bytes). These three are computed
# at runtime, so command templates show them as <ID1> <ID2> <CKS> placeholders.
# Fixed (parameterless) commands carry their literal checksum verbatim.

# --- Power ---
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

# --- Input / routing ---
- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (DATA01). Example: 06h = video port. See Appendix 'Supplementary Information by Command' for full value table."
  notes: "Source example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: audio_select_set
  label: "319. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (DATA01). Values in Appendix."
    - name: data02
      type: integer
      description: "Setting value (DATA02): 00h = terminal specified in DATA01; 01h = BNC."

# --- Picture / sound / onscreen mute ---
- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input/video switch."

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
  notes: "Cleared on input/video switch or volume adjust."

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
  notes: "Cleared on input/video switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- Picture / volume / aspect / gain adjust ---
- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Brightness +10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness -10 example: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Volume 10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Aspect value (DATA01). Value table in Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target high byte. Source documents DATA01=96h (with DATA02=FFh) = LAMP ADJUST / LIGHT ADJUST."
    - name: data02
      type: integer
      description: "Adjustment target low byte. Source: FFh pairs with 96h."
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- Remote key code ---
- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type)."
    - name: data02
      type: integer
      description: "Key code high byte."
  notes: |
    Documented key codes (DATA01 DATA02 = key name):
    02h 00h=POWER ON; 03h 00h=POWER OFF; 05h 00h=AUTO; 06h 00h=MENU;
    07h 00h=UP; 08h 00h=DOWN; 09h 00h=RIGHT; 0Ah 00h=LEFT; 0Bh 00h=ENTER;
    0Ch 00h=EXIT; 0Dh 00h=HELP; 0Fh 00h=MAGNIFY UP; 10h 00h=MAGNIFY DOWN;
    13h 00h=MUTE; 29h 00h=PICTURE; 4Bh 00h=COMPUTER1; 4Ch 00h=COMPUTER2;
    4Fh 00h=VIDEO1; 51h 00h=S-VIDEO1; 84h 00h=VOLUME UP; 85h 00h=VOLUME DOWN;
    8Ah 00h=FREEZE; A3h 00h=ASPECT; D7h 00h=SOURCE; EEh 00h=LAMP MODE/ECO.
    AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h

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
  command: "02h 18h 00h 00h 02h {data01} {data02} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target. Source documents 06h = Periphery Focus."
    - name: data02
      type: integer
      description: "Content: 00h=Stop; 01h=+1s; 02h=+0.5s; 03h=+0.25s; 7Fh=+continuous; 81h=-continuous; FDh=-0.25s; FEh=-0.5s; FFh=-1s"
  notes: "After 7Fh/81h, send 00h to stop. Same command can be reissued during drive without a stop."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target. FFh = Stop (mode/value ignored)."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE; 01h=STORE; 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE; 01h=STORE; 02h=RESET. Acts on profile set via LENS PROFILE SET."
  notes: "Same DATA01 options as 053-3."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL; 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF; 01h=ON"

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1; 01h=Profile 2"

# --- Freeze ---
- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on; 02h=freeze off"

# --- Eco mode / name / PIP / edge blending (SET commands) ---
- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Eco mode value. Sets 'Light mode' or 'Lamp mode' depending on model. Value table in Appendix."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h <CKS>"
  params:
    - name: data01-16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE; 01h=START POSITION; 02h=SUB INPUT/SUB INPUT 1; 09h=SUB INPUT 2; 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value. MODE: 00h=PIP,01h=PbP. START POS: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. SUB INPUT values in Appendix."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF; 01h=ON"

# --- Queries (kind: query) ---
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns 12 bytes (DATA01-12) of error-status bitfields."

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated at 1-min intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time sec (DATA01-04) and filter alarm start time sec (DATA05-08). -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp 1; 01h=Lamp 2 (two-lamp models only)."
    - name: data02
      type: integer
      description: "Content: 01h=usage time sec; 04h=remaining life %."
  notes: "Lamp usage example: 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life may be negative if deadline exceeded."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings; 01h=Carbon Savings during operation."
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lens target (matches LENS CONTROL DATA01, e.g. 06h=Periphery Focus)."
  notes: "Returns adjustment range upper/lower limits and current value (DATA02-07)."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL; 01h=FORCED MUTE."
  notes: "Returns DATA02: 00h=OFF; 01h=ON."

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop,1=Operating)."

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01: 00h=Profile 1; 01h=Profile 2."

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST."
  notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status + range + default + current value (DATA01-16)."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile (DATA05)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling, power-on/off process, operation status (DATA03-06)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed (DATA01-16)."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute + onscreen display state (DATA01-05)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string (DATA01-32, NUL-terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened); 01h=Cover closed."

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency; 04h=Vertical sync frequency."
  notes: "Returns label/info string (NUL-terminated)."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (DATA01). Value table in Appendix."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name string (DATA01-17, NUL-terminated)."

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (DATA01-06)."

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3."
  notes: "Returns setting value (DATA02)."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF; 01h=ON."

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type (DATA12-13)."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number string (DATA01-16, NUL-terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, selection signal type, display signal type, video/sound/onscreen mute, freeze status (DATA01-15)."
```

## Feedbacks
```yaml
# Binary response frames: success uses 20h/21h/22h/23h prefix (matches command
# block) + <ID1> <ID2> + LEN + data + <CKS>; failure uses A0h/A1h/A2h/A3h prefix
# + <ID1> <ID2> + 02h + <ERR1> <ERR2> <CKS>. Examples documented:

- id: command_ack
  type: ack
  description: "Success response (no data) - e.g. POWER ON: 22h 00h <ID1> <ID2> 00h <CKS>"

- id: command_error_response
  type: error
  description: "Error response - e.g. POWER ON error: A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: |
    ERR1/ERR2 code pairs (section 2.4):
    00h 00h=unrecognized command; 00h 01h=not supported by model;
    01h 00h=invalid value; 01h 01h=invalid input terminal; 01h 02h=invalid language;
    02h 00h=memory allocation error; 02h 02h=memory in use; 02h 03h=value cannot be set;
    02h 04h=forced onscreen mute on; 02h 06h=viewer error; 02h 07h=no signal;
    02h 08h=test pattern/filter displayed; 02h 09h=no PC card; 02h 0Ah=memory operation error;
    02h 0Ch=entry list displayed; 02h 0Dh=command rejected (power off); 02h 0Eh=execution failed;
    02h 0Fh=no authority; 03h 00h=incorrect gain number; 03h 01h=invalid gain; 03h 02h=adjustment failed.
```

## Variables
```yaml
# No separately modelled variables beyond the parameterized actions above.
# Picture/volume/aspect/gain/lens settings are driven via the Actions entries.
```

## Events
```yaml
# Source documents request/response only. No unsolicited notifications described.
# UNRESOLVED: no event/notification model in source.
```

## Macros
```yaml
# No multi-step command sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # blocks all other commands during cooling; source notes exclusivity
interlocks:
  - "Power ON/OFF commands accept no other command while in progress (incl. cooling)."
  - "02h 0Dh error: command rejected because power is off."
  - "Cover status (078-6) and error-status bitfields report interlock/cover/fan/temperature/lamp faults."
# UNRESOLVED: no explicit power-on sequencing procedure or voltage interlock
# specification in source beyond the error/fault reporting noted above.
```

## Notes
- **Frame format** (section 2.1): commands/responses are hex byte series in a frame: `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`.
- **Checksum** (CKS, section 2.2): sum all preceding bytes, take low-order 8 bits. Worked example: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- **Parameters**: ID1=control ID (projector setting), ID2=model code (varies by model), LEN=data length of bytes after LEN, DATA??=variable data, ERR1/ERR2=response error codes.
- **Serial cable**: D-SUB 9P cross cable, RXD↔TXD and RTS↔CTS crossed.
- **LAN**: RJ-45 wired or wireless LAN unit; TCP port 7142.
- **Cooling exclusion**: POWER OFF blocks all other commands during cooling time.
- **Response prefixes**: 20h/21h/22h/23h = success (0x-prefix block mirrors command block: 00h→20h, 01h→21h, 02h→22h, 03h→23h); A0h/A1h/A2h/A3h = error variant.
- Two-lamp projectors only: lamp 2 (DATA01=01h) valid for dual-lamp models.

<!-- UNRESOLVED: firmware version compatibility not stated. ID1 control-ID default not stated. ID2 model code value not stated. Input terminal / aspect / eco-mode / sub-input value tables referenced to an Appendix not contained in this source excerpt. flow_control setting not in comm-conditions table. Power/voltage/current specs out of scope (no values invented). -->
```

Spec built. 53 commands, all payloads verbatim. Serial+TCP both, port 7142, baud rates listed. Auth none inferred. Power/exclusivity + error codes in Safety/Feedbacks. Firmware/ID1/ID2/appendix value tables marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:17:07.320Z
last_checked_at: 2026-06-17T19:31:28.724Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:31:28.724Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 documented commands found verbatim in source with correct parameters and encoding. Transport fully verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Control ID (ID1) default value not stated. Model code (ID2) value not stated. Input terminal code values and aspect/eco-mode value tables referenced to an \"Appendix\" not present in this excerpt."
- "not in comm-conditions table; pin assignment shows RTS/CTS cross-wired, suggesting hardware flow control possible, but source does not state a setting"
- "no event/notification model in source."
- "no explicit power-on sequencing procedure or voltage interlock"
- "firmware version compatibility not stated. ID1 control-ID default not stated. ID2 model code value not stated. Input terminal / aspect / eco-mode / sub-input value tables referenced to an Appendix not contained in this source excerpt. flow_control setting not in comm-conditions table. Power/voltage/current specs out of scope (no values invented)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
