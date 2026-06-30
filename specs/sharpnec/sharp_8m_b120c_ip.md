---
spec_id: admin/sharp-nec-8m-b120c
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC 8M B120C Control Spec"
manufacturer: Sharp/NEC
model_family: "8M B120C"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "8M B120C"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:00:29.027Z
last_checked_at: 2026-06-17T19:31:31.692Z
generated_at: 2026-06-17T19:31:31.692Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model-name string returned by 078-5 MODEL NAME REQUEST not shown for this device. Firmware version compatibility and protocol version not stated. Voltage/power specs not covered by this command reference."
  - "flow control not stated in source (RTS/CTS pins wired on D-SUB 9P but software flow control policy not documented)"
  - "query device at runtime via gain_parameter_request_3"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no multi-step command sequences."
  - "full power-on sequencing / warmup timing not stated in source."
  - "firmware/protocol version not stated. Default baud rate not stated. Full input-terminal / eco-mode / aspect / base-model / sub-input enum tables live in an appendix absent from this excerpt. Wireless-LAN unit specifics deferred to the operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:31:31.692Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action-units matched verbatim to source hex payloads; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC 8M B120C Control Spec

## Summary
Control spec for the Sharp/NEC 8M B120C projector, covering the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device accepts control over RS-232C serial and TCP/IP LAN (port 7142). Commands are framed hex messages with a trailing checksum byte; responses return success data or an ERR1/ERR2 error code pair.

<!-- UNRESOLVED: exact model-name string returned by 078-5 MODEL NAME REQUEST not shown for this device. Firmware version compatibility and protocol version not stated. Voltage/power specs not covered by this command reference. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated in source (section "Port number")
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as configurable; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  communication_mode: full_duplex  # stated as "Full duplex"
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired on D-SUB 9P but software flow control policy not documented)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from 015 POWER ON / 016 POWER OFF commands
  - routable      # inferred from 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
  - queryable     # inferred from extensive status-request commands (009, 037, 078-*, 097-*, 305-*)
  - levelable     # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST
  - shutterable   # inferred from 051 SHUTTER CLOSE / 052 SHUTTER OPEN
```

## Actions
```yaml
# All payloads are hexadecimal byte sequences verbatim from source.
# <ID1> <ID2> <CKS> are framing parameters documented in section 2.2.
# Checksum (CKS) = low-order one byte of the sum of all preceding bytes (section 2.2).

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command accepted."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (including cooling time), no other command accepted."

# --- Input switching ---
- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value. Example: 06h = video port. Full value list in Appendix 'Supplementary Information by Command' (not present in this excerpt)."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (see Appendix)."
    - name: DATA02
      type: integer
      description: "Setting value. 00h = terminal specified in DATA01; 01h = BNC."

# --- Picture mute ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input terminal switch or video signal switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- Sound mute ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input terminal switch, video signal switch, or volume adjustment."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- Onscreen mute ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input terminal switch or video signal switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- Picture / volume / aspect / other adjust ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target. 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: DATA02
      type: integer
      description: "Adjustment mode. 00h=absolute, 01h=relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  examples:
    - "Brightness=10:  03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"
    - "Brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode. 00h=absolute, 01h=relative."
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  examples:
    - "Volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect. Full value list in Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target high byte (with DATA02). Source only documents 96h/FFh = LAMP ADJUST / LIGHT ADJUST."
    - name: DATA02
      type: integer
      description: "Target low byte (with DATA01)."
    - name: DATA03
      type: integer
      description: "Adjustment mode. 00h=absolute, 01h=relative."
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)."

# --- Remote key code ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD)."
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD)."
  notes: |
    Documented key codes (DATA01 DATA02 -> name):
    02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU,
    07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER,
    0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN,
    13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2,
    4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN,
    8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO.
  examples:
    - "AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

# --- Shutter ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- Lens control ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. Source documents 06h=Periphery Focus. Other drive targets (zoom/focus/shift) referenced by Appendix."
    - name: DATA02
      type: integer
      description: "Drive action. 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
  notes: "After 7Fh/81h continuous drive, send 00h to stop. Same command can be reissued during drive without stop."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop; otherwise lens drive target."
    - name: DATA02
      type: integer
      description: "Adjustment mode. 00h=absolute, 02h=relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."
  notes: "When DATA01=FFh (Stop), DATA02-DATA04 ignored."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Operates on the profile number selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: DATA02
      type: integer
      description: "Setting value. 00h=OFF, 01h=ON."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number. 00h=Profile 1, 01h=Profile 2."

# --- Freeze ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze On, 02h=Freeze Off."

# --- Eco mode ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Value set for eco mode. Full value list in Appendix 'Supplementary Information by Command' (sets Light mode or Lamp mode depending on projector)."

# --- LAN projector name ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)."

# --- PIP / Picture by Picture ---
- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: DATA02
      type: integer
      description: "Setting value. When MODE: 00h=PIP, 01h=PbP. When START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT*: sub input setting value (see Appendix)."

# --- Edge blending ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value. 00h=OFF, 01h=ON."

# --- Queries (kind: query) ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response carries DATA01-DATA12 error bitfields. See error information list (DATA01 Bit0=Cover error ... DATA09 Bit1=interlock switch open)."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response DATA01-49 projector name, DATA83-86 lamp usage seconds, DATA87-90 filter usage seconds."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04 filter usage seconds, DATA05-08 filter alarm start seconds (-1 if undefined)."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: DATA02
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)."
  examples:
    - "Lamp 1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Response DATA02-05 kilograms (max 99999 kg), DATA06-09 milligrams (max 999999 mg)."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target to query (matches 053 LENS CONTROL DATA01)."
  notes: "Response DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop,1=During operation)."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
  examples:
    - "Brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"
  notes: "Response carries status, upper/lower limit, default, current value, wide/narrow adjustment width, default-validity flag."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03 base model type, DATA04 sound function, DATA05 profile number (clock/sleep timer)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03 power status, DATA04 cooling process, DATA05 power on/off process, DATA06 operation status."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response: signal switch process, signal list number (returned value = practical - 1), selection signal type, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode or Lamp mode value depending on projector."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  examples:
    - "MAC 01-23-45-67-89-AB -> response: 23h B0h <ID1> <ID2> 08h 9Ah 00h 01h 23h 45h 67h 89h ABh <CKS>"

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02 and DATA12-13 base model type, DATA03-11 model name."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response: operation status, content displayed, selection signal type, display signal type, video/sound/onscreen mute, freeze status."
```

## Feedbacks
```yaml
# The device returns framed responses to every command (success: 20h/21h/22h/23h prefixes,
# error: A0h/A1h/A2h/A3h prefixes carrying ERR1/ERR2). Discrete observable states surfaced
# by the query commands above:
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request DATA03 / basic_information_request DATA01
- id: error_status
  type: bitfield
  source: error_status_request DATA01-DATA12
- id: input_signal
  type: composite
  source: input_status_request DATA01-DATA16
- id: mute_state
  type: composite
  source: mute_status_request DATA01-DATA05
- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: cover_status_request DATA01
```

## Variables
```yaml
# Settable numeric parameters driven via the adjust actions above (030-1/030-2/030-12/030-15).
# Bounds are device-discovered at runtime via 060-1 GAIN PARAMETER REQUEST 3 (returns
# upper/lower limit, default, current). Ranges not hardcoded here to avoid fabrication.
- id: brightness
  type: integer
  unit: native
  set_via: picture_adjust (DATA01=00h)
  range: null  # UNRESOLVED: query device at runtime via gain_parameter_request_3
- id: contrast
  type: integer
  set_via: picture_adjust (DATA01=01h)
  range: null
- id: color
  type: integer
  set_via: picture_adjust (DATA01=02h)
  range: null
- id: hue
  type: integer
  set_via: picture_adjust (DATA01=03h)
  range: null
- id: sharpness
  type: integer
  set_via: picture_adjust (DATA01=04h)
  range: null
- id: volume
  type: integer
  set_via: volume_adjust
  range: null
- id: lamp_adjust
  type: integer
  set_via: other_adjust (DATA01/02 = 96h/FFh)
  range: null
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited replies to commands (success or ERR1/ERR2 error frame).
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # initiates cooling cycle; no other command accepted during cooldown
interlocks:
  - "Power On: while turning on, no other command accepted (section 3.2)."
  - "Power Off: during turn-off including cooling time, no other command accepted (section 3.3)."
  - "Error status bitfield (command 009) reports interlock switch open (DATA09 Bit1) and cover errors."
  # UNRESOLVED: full power-on sequencing / warmup timing not stated in source.
```

## Notes
- **Checksum algorithm (section 2.2):** CKS = low-order one byte (8 bits) of the sum of all preceding bytes. Worked example: `20h+81h+01h+60h+01h+00h = 103h -> CKS=03h`.
- **Message framing:** commands begin with a type byte (00h-03h); success responses echo with bit5 set (20h/21h/22h/23h); error responses use Axh prefix (A0h/A1h/A2h/A3h) followed by `<ID1> <ID2>` and a 02h-length `ERR1 ERR2 CKS` body.
- **ID1 (Control ID)** and **ID2 (Model code)** are per-device framing parameters; ID2 varies by model. `<CKS>` is always the trailing checksum byte.
- **Error codes (section 2.4)** are an ERR1/ERR2 pair (e.g. 00h/00h = command unrecognized; 02h/0Dh = command rejected because power is off; 02h/0Fh = no authority for operation). Full table in source.
- **Signal list number** returned by input status is offset by -1 (add 1 for practical value).
- **Usage-time fields** (lamp/filter) are in seconds, updated at one-minute intervals; lamp remaining life (%) is negative once the replacement deadline is exceeded.
- **Baud rate** is configurable across 115200/38400/19200/9600/4800 bps; default not stated.
- **Input-terminal value tables, eco-mode values, aspect values, base-model-type values, and sub-input setting values** are referenced to an Appendix ("Supplementary Information by Command") not present in this refined excerpt — marked UNRESOLVED where they affect a payload byte.

<!-- UNRESOLVED: firmware/protocol version not stated. Default baud rate not stated. Full input-terminal / eco-mode / aspect / base-model / sub-input enum tables live in an appendix absent from this excerpt. Wireless-LAN unit specifics deferred to the operation manual. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:00:29.027Z
last_checked_at: 2026-06-17T19:31:31.692Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:31:31.692Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action-units matched verbatim to source hex payloads; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model-name string returned by 078-5 MODEL NAME REQUEST not shown for this device. Firmware version compatibility and protocol version not stated. Voltage/power specs not covered by this command reference."
- "flow control not stated in source (RTS/CTS pins wired on D-SUB 9P but software flow control policy not documented)"
- "query device at runtime via gain_parameter_request_3"
- "source documents no unsolicited notifications. All responses are"
- "source documents no multi-step command sequences."
- "full power-on sequencing / warmup timing not stated in source."
- "firmware/protocol version not stated. Default baud rate not stated. Full input-terminal / eco-mode / aspect / base-model / sub-input enum tables live in an appendix absent from this excerpt. Wireless-LAN unit specifics deferred to the operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
