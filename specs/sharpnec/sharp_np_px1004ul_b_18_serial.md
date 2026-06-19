---
spec_id: admin/sharp-nec-np-px1004ul-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX1004UL-B Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PX1004UL-B
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PX1004UL-B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:48:54.144Z
last_checked_at: 2026-06-18T08:52:28.848Z
generated_at: 2026-06-18T08:52:28.848Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "base URL / HTTP path not applicable (binary protocol over serial/TCP). Default baud rate not stated (multiple supported)."
  - "RTS/CTS pins present on PC CONTROL D-SUB 9P but flow-control enable not stated"
  - "eco-mode enum values defined in Appendix not included in refined source"
  - "absolute limits model-specific; query 060-1 DATA02-05 returns per-device limits"
  - "per-device limits via 060-1"
  - "per-device limits via 060-1 (DATA01=05h)"
  - "per-device limits via 060-1 (DATA01=96h)"
  - "confirm no async event frames with device."
  - "populate if companion docs describe power-on/cooling sequences."
  - "no explicit safety warnings, power-on sequencing requirements, or"
  - "default baud rate not stated (5 options listed)."
  - "serial flow-control enable not stated (RTS/CTS pins wired but usage undocumented)."
  - "model name NP-PX1004UL-B supplied by operator; not restated in the refined source body."
  - "eco-mode enum values, aspect values, input-terminal byte values, base-model-type values, and sub-input values referenced as \"see Appendix 'Supplementary Information by Command'\" — Appendix not present in this refined source."
  - "firmware version compatibility not stated."
  - "ID2 model code value for this model not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:52:28.848Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX1004UL-B Control Spec

## Summary
Professional installation projector controlled via a binary RS-232C protocol (and an equivalent wired/wireless LAN transport over TCP). This spec covers the hex-frame command set documented in the Sharp/NEC Projector Control Command Reference Manual (BDT140013 Revision 7.1): power, input switching, mutes, picture/volume/aspect/gain adjustments, lens shift/zoom/focus and lens memory, shutter, freeze, eco mode, PIP/PbP, edge blending, and a broad set of status queries. All command payloads are byte sequences with a trailing checksum (low byte of the sum of preceding bytes).

<!-- UNRESOLVED: base URL / HTTP path not applicable (binary protocol over serial/TCP). Default baud rate not stated (multiple supported). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists supported set: 115200/38400/19200/9600/4800 bps; default not stated
  # supported_baud_rates: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present on PC CONTROL D-SUB 9P but flow-control enable not stated
addressing:
  port: 7142  # TCP port for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable      # inferred: large catalogue of status request commands (078-*, 037-*, etc.)
  - routable       # inferred: 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET present
  - levelable      # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST / 030-15 OTHER ADJUST present
```

## Actions
```yaml
# Hex frames verbatim from source. Trailing byte is checksum (low byte of sum of
# preceding bytes). <ID1>=Control ID, <ID2>=model code. "command:" shows literal
# frame; parameterized variable bytes shown as placeholders.

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: Input Switch Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (see Appendix 'Supplementary Information by Command'). Example: 06h = video port. Worked frame for video: 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video-signal switch."

- id: picture_mute_off
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input/video-signal switch or volume adjustment."

- id: sound_mute_off
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input/video-signal switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: data02
      type: string
      description: "Mode: 00h absolute, 01h relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10 example: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: data01
      type: string
      description: "Mode: 00h absolute, 01h relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Aspect value byte (see Appendix 'Supplementary Information by Command')."

- id: other_adjust
  label: Other Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data01
      type: string
      description: "Adjustment target high byte (e.g. 96h)."
    - name: data02
      type: string
      description: "Adjustment target low byte (e.g. FFh for LAMP ADJUST / LIGHT ADJUST)."
    - name: data03
      type: string
      description: "Mode: 00h absolute, 01h relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Key code low byte (WORD key code split: DATA01=low, DATA02=high)."
    - name: data02
      type: string
      description: "Key code high byte (00h for all listed keys)."
  notes: "Key codes (key, DATA01, DATA02, name): 2/02h/00h POWER ON; 3/03h/00h POWER OFF; 5/05h/00h AUTO; 6/06h/00h MENU; 7/07h/00h UP; 8/08h/00h DOWN; 9/09h/00h RIGHT; 10/0Ah/00h LEFT; 11/0Bh/00h ENTER; 12/0Ch/00h EXIT; 13/0Dh/00h HELP; 15/0Fh/00h MAGNIFY UP; 16/10h/00h MAGNIFY DOWN; 19/13h/00h MUTE; 41/29h/00h PICTURE; 75/4Bh/00h COMPUTER1; 76/4Ch/00h COMPUTER2; 79/4Fh/00h VIDEO1; 81/51h/00h S-VIDEO1; 132/84h/00h VOLUME UP; 133/85h/00h VOLUME DOWN; 138/8Ah/00h FREEZE; 163/A3h/00h ASPECT; 215/D7h/00h SOURCE; 238/EEh/00h LAMP MODE/ECO. AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens target (e.g. 06h Periphery Focus)."
    - name: data02
      type: string
      description: "00h Stop; 01h drive +1s; 02h drive +0.5s; 03h drive +0.25s; 7Fh drive plus; 81h drive minus; FDh drive -0.25s; FEh drive -0.5s; FFh drive -1s."
  notes: "Send 00h to stop after 7Fh/81h. Same command can re-issue while driving."

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: string
      description: "Target (FFh = Stop)."
    - name: data02
      type: string
      description: "Mode: 00h absolute, 02h relative."
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "If DATA01=FFh (Stop), mode/value not referenced."

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: data02
      type: string
      description: "00h OFF, 01h ON"

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h Profile 1, 01h Profile 2"

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "01h Freeze ON, 02h Freeze OFF"

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "Eco mode value (see Appendix 'Supplementary Information by Command'). Sets 'Light mode' or 'Lamp mode' depending on projector."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name bytes DATA01-DATA16 (up to 16 bytes)."

- id: pip_pbp_set
  label: PIP / Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Target: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (MODE: 00h PIP / 01h PICTURE BY PICTURE; START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; sub-input values see Appendix)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h OFF, 01h ON"

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "Input terminal byte (see Appendix 'Supplementary Information by Command')."
    - name: data02
      type: string
      description: "00h = terminal specified in DATA01, 01h BNC, 02h COMPUTER"

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-DATA12 bitmask error info (0=normal, 1=error). Covers cover/fan/temperature/power/lamp/formatter/FPGA/mirror-cover/foreign-matter/ballast/iris/lens-install/interlock-switch/system errors."

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response DATA01-49 projector name, DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds). Updated 1-min intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04 filter usage time (s), DATA05-08 filter alarm start time (s). -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "01h Lamp usage time (seconds), 04h Lamp remaining life (%)"
  notes: "Lamp usage example: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining-life % if replacement deadline exceeded. Eco mode reflected in values."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
  notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "Lens target byte."
  notes: "Response DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (16-bit signed)."

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  notes: "Response DATA02: 00h OFF, 01h ON."

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitmask: Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift (H), Bit4 lens shift (V) (0=stop, 1=operating)."

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h Profile 1, 01h Profile 2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: data01
      type: string
      description: "00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"
  notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response DATA01 status (00h display-N/A, 01h adjust-N/A, 02h adjustable, FFh no such gain), DATA02-09 limits/default/current, DATA10-13 wide/narrow adjustment width."

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03 base model type, DATA04 sound function (00h N/A, 01h available), DATA05 profile (00h N/A, 01h clock, 02h sleep timer, 03h clock+sleep)."

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03 power (00h standby, 01h on), DATA04 cooling, DATA05 power on/off process, DATA06 operation status (00h standby-sleep, 04h power on, 05h cooling, 06h standby-error, 0Fh power-saving, 10h network standby)."

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Response DATA01 signal-switch process, DATA02 signal list number (practical = returned+1), DATA03 selection signal type 1, DATA04 type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER6-10, 07h VIEWER1-5), DATA05 list type, DATA06 test pattern, DATA09 content displayed."

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off, 01h on each)."

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Response DATA01-32 model name (NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Response DATA01: 00h normal (cover opened), 01h cover closed."

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: string
      description: "03h Horizontal sync frequency, 04h Vertical sync frequency"
  notes: "Response DATA02 label length, DATA03-?? label string (NUL-terminated)."

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Response DATA01 eco mode value (see Appendix). Returns 'Light mode' or 'Lamp mode' depending on projector."

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Response DATA01-17 projector name (NUL-terminated)."

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Response DATA01-06 MAC address."

- id: pip_pbp_request
  label: PIP / Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  notes: "Response DATA02 setting value (MODE: 00h PIP, 01h PbP; START POSITION: 00h TL, 01h TR, 02h BL, 03h BR; sub-input values see Appendix)."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Response DATA01: 00h OFF, 01h ON."

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Response DATA01-02 and DATA12-13 base model type, DATA03-11 model name (NUL-terminated)."

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Response DATA01-16 serial number (NUL-terminated)."

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Response DATA01 operation status, DATA02 content displayed, DATA03-04 selection signal types, DATA05 display signal type (video standards), DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."
```

## Feedbacks
```yaml
# Each query response above is an observable state. Representative typed views:

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 / 305-3 DATA01"

- id: input_signal
  type: composite
  fields: [signal_list_number, selection_signal_type_1, selection_signal_type_2, signal_list_type]
  source: "078-3 / 305-3"

- id: mute_state
  type: composite
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  source: "078-4"

- id: error_status
  type: bitmask
  width: 96
  source: "009 DATA01-DATA12"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037-4 (DATA01=00h, DATA02=01h) / 037 DATA83-86"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 (DATA02=04h); negative if replacement deadline exceeded"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 DATA01-04 / 037 DATA87-90"

- id: lens_operation
  type: bitmask
  width: 8
  source: "053-7 DATA01 (lens memory, zoom, focus, lens-shift H/V)"

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: "078-6"

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: eco-mode enum values defined in Appendix not included in refined source
  source: "097-8"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1"

- id: model_name
  type: string
  source: "078-5"

- id: serial_number
  type: string
  source: "305-2"

- id: mac_address
  type: string
  source: "097-155"

- id: projector_name
  type: string
  source: "097-45"
```

## Variables
```yaml
# Settable parameters surfaced via adjust commands (also represented as actions above).

- id: brightness
  range: null  # UNRESOLVED: absolute limits model-specific; query 060-1 DATA02-05 returns per-device limits
  source: "030-1 (DATA01=00h) / 060-1"

- id: contrast
  range: null  # UNRESOLVED: per-device limits via 060-1
  source: "030-1 (DATA01=01h) / 060-1"

- id: color
  range: null  # UNRESOLVED: per-device limits via 060-1
  source: "030-1 (DATA01=02h) / 060-1"

- id: hue
  range: null  # UNRESOLVED: per-device limits via 060-1
  source: "030-1 (DATA01=03h) / 060-1"

- id: sharpness
  range: null  # UNRESOLVED: per-device limits via 060-1
  source: "030-1 (DATA01=04h) / 060-1"

- id: volume
  range: null  # UNRESOLVED: per-device limits via 060-1 (DATA01=05h)
  source: "030-2 / 060-1"

- id: lamp_light_adjust
  range: null  # UNRESOLVED: per-device limits via 060-1 (DATA01=96h)
  source: "030-15 / 060-1"
```

## Events
```yaml
# No unsolicited notifications documented. Device responds only to commands.
# UNRESOLVED: confirm no async event frames with device.
```

## Macros
```yaml
# No multi-step sequences explicitly documented.
# UNRESOLVED: populate if companion docs describe power-on/cooling sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational lockouts (not safety interlocks per se):
#   - POWER ON: no other command accepted while power-on in progress.
#   - POWER OFF: no other command accepted during power-off incl. cooling time.
#   - ERROR STATUS (009) reports interlock-switch-open bit (DATA09 Bit1) and
#     foreign-matter / mirror-cover / lens-install / temperature errors, but the
#     source does not document an interlock procedure or required confirmation.
# UNRESOLVED: no explicit safety warnings, power-on sequencing requirements, or
# confirmation procedures stated in this refined source.
```

## Notes
- **Frame format**: commands are hex byte sequences. Response prefix = command first byte + 20h (e.g. 02h→22h); error/NACK prefix = command first byte + A0h (e.g. 02h→A2h). `<ID1>` = Control ID set on projector; `<ID2>` = model code (varies by model); `<CKS>` = checksum = low-order byte of sum of all preceding bytes.
- **Checksum worked example** (source): `20h 81h 01h 60h 01h 00h` → 20+81+01+60+01+00 = 103h → CKS = 03h.
- **Error responses** carry `<ERR1> <ERR2>` codes; see source §2.4 (e.g. 00h/00h unrecognized command, 00h/01h not supported by model, 01h/00h invalid value, 02h/0Dh command rejected because power off, 02h/0Fh no authority).
- **Supported baud rates**: 115200/38400/19200/9600/4800 bps (default not stated). Serial is full-duplex, RS-232C, D-SUB 9P cross cable on PC CONTROL port (pins 2 RxD / 3 TxD / 5 GND / 7 RTS / 8 CTS).
- **LAN**: wired (RJ-45, 10/100 Mbps auto) or optional wireless LAN unit; TCP port 7142 for command send/receive.
- **Usage-time granularity**: lamp/filter usage returned in one-second units but updated at one-minute intervals.
- **Reference**: Projector Control Command Reference Manual, BDT140013 Revision 7.1.

<!-- UNRESOLVED: default baud rate not stated (5 options listed). -->
<!-- UNRESOLVED: serial flow-control enable not stated (RTS/CTS pins wired but usage undocumented). -->
<!-- UNRESOLVED: model name NP-PX1004UL-B supplied by operator; not restated in the refined source body. -->
<!-- UNRESOLVED: eco-mode enum values, aspect values, input-terminal byte values, base-model-type values, and sub-input values referenced as "see Appendix 'Supplementary Information by Command'" — Appendix not present in this refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: ID2 model code value for this model not stated. -->
```

Spec ready. 53 commands covered (all rows in §2 command list). Hex payloads verbatim, checksums kept. Caveman mode loaded — chat stays terse, spec written normal per skill boundaries.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:48:54.144Z
last_checked_at: 2026-06-18T08:52:28.848Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:52:28.848Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "base URL / HTTP path not applicable (binary protocol over serial/TCP). Default baud rate not stated (multiple supported)."
- "RTS/CTS pins present on PC CONTROL D-SUB 9P but flow-control enable not stated"
- "eco-mode enum values defined in Appendix not included in refined source"
- "absolute limits model-specific; query 060-1 DATA02-05 returns per-device limits"
- "per-device limits via 060-1"
- "per-device limits via 060-1 (DATA01=05h)"
- "per-device limits via 060-1 (DATA01=96h)"
- "confirm no async event frames with device."
- "populate if companion docs describe power-on/cooling sequences."
- "no explicit safety warnings, power-on sequencing requirements, or"
- "default baud rate not stated (5 options listed)."
- "serial flow-control enable not stated (RTS/CTS pins wired but usage undocumented)."
- "model name NP-PX1004UL-B supplied by operator; not restated in the refined source body."
- "eco-mode enum values, aspect values, input-terminal byte values, base-model-type values, and sub-input values referenced as \"see Appendix 'Supplementary Information by Command'\" — Appendix not present in this refined source."
- "firmware version compatibility not stated."
- "ID2 model code value for this model not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
