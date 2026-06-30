---
spec_id: admin/sharp-nec-m651-pc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M651 Pc5 Control Spec"
manufacturer: Sharp/NEC
model_family: "M651 Pc5"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M651 Pc5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:42:04.047Z
last_checked_at: 2026-06-18T08:12:29.993Z
generated_at: 2026-06-18T08:12:29.993Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Wireless LAN unit details not in this manual. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model type values, eco mode values, sub input values) not present in refined source — several enum ranges therefore marked UNRESOLVED."
  - "default not stated; supported rates 4800/9600/19200/38400/115200 bps"
  - "RTS/CTS pins present in D-SUB 9P pinout (RTS→CTS, CTS→RTS) and \"Full duplex\" stated, but flow-control mode not explicitly named"
  - "appendix not in refined source."
  - "appendix not in refined source)."
  - "numeric min/max/default ranges per gain not enumerated here - source"
  - "none documented in source."
  - "none documented."
  - "source states that during POWER ON, POWER OFF (incl. cooling time), and"
  - "Appendix \"Supplementary Information by Command\" (referenced for input terminal values, aspect values, base model type values, eco mode values, sub input values) was not present in the refined source document. Several enum ranges above (input_sw_change DATA01, aspect_adjust DATA01, eco_mode_set DATA01, audio_select_set DATA01, PIP sub input values) therefore reference the appendix rather than listing concrete values."
  - "default baud rate among the five supported rates not stated."
  - "flow control mode not explicitly named (RTS/CTS pins wired, full-duplex stated)."
  - "firmware version compatibility not stated in source."
  - "wireless LAN unit support referenced but details deferred to a separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:12:29.993Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M651 Pc5 Control Spec

## Summary
Sharp/NEC M651 Pc5 large-venue projector controlled via RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN. Binary framing protocol (BDT140013 Rev 7.1): each command is a hex byte sequence with a trailing checksum byte (low-order byte of sum of all preceding bytes). This spec enumerates the full command catalogue (commands 009–319).

<!-- UNRESOLVED: firmware version compatibility not stated in source. Wireless LAN unit details not in this manual. Appendix "Supplementary Information by Command" (input terminal values, aspect values, base model type values, eco mode values, sub input values) not present in refined source — several enum ranges therefore marked UNRESOLVED. -->

## Transport
```yaml
# Both serial and LAN documented. TCP port 7142 stated for LAN.
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: default not stated; supported rates 4800/9600/19200/38400/115200 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present in D-SUB 9P pinout (RTS→CTS, CTS→RTS) and "Full duplex" stated, but flow-control mode not explicitly named
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (015 POWER ON / 016 POWER OFF present)
# - queryable       (many status/information request commands present)
# - levelable       (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST, 053 lens controls)
traits:
  - powerable  # inferred from power command examples
  - queryable  # inferred from query command examples
  - levelable  # inferred from picture/volume/lens adjust examples
```

## Actions
```yaml
# All 53 documented command rows. Hex payloads verbatim from source.
# ID1=00h (control ID) and ID2=00h (model code) shown as literal 00h per source
# default framing; set per projector. CKS = low byte of sum of all preceding bytes.
# Format byte legend: prefix cmd ID1 ID2 LEN [DATA...] CKS.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- Input switching ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Input terminal selector (e.g. 06h = video port). Full value list in Appendix "Supplementary Information by Command" - UNRESOLVED: appendix not in refined source.

# --- Mute ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- Adjustments ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)
    - name: DATA02
      type: byte
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA02
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Aspect value - full list in Appendix "Supplementary Information by Command" (UNRESOLVED: appendix not in refined source).

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST per source table)
    - name: DATA02
      type: byte
      description: Adjustment target low byte (FFh per source table)
    - name: DATA03
      type: byte
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA04
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: byte
      description: Adjustment value (high-order 8 bits)

# --- Information queries ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lamp selector (00h Lamp 1, 01h Lamp 2 - two-lamp models only)
    - name: DATA02
      type: byte
      description: Content (01h lamp usage time seconds, 04h lamp remaining life %)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Content (00h Total Carbon Savings, 01h Carbon Savings during operation)

# --- Remote key code ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Key code low byte (WORD type key code; e.g. 05h=AUTO, 29h=PICTURE, 4Bh=COMPUTER1, D7h=SOURCE, EEh=LAMP MODE/ECO). See source key code list.
    - name: DATA02
      type: byte
      description: Key code high byte (00h for all listed keys)

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lens target (06h Periphery Focus per source)
    - name: DATA02
      type: byte
      description: Drive command (00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h −continuous, FDh −0.25s, FEh −0.5s, FFh −1s)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lens target (matches DATA01 of lens_control)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lens target (FFh = Stop; otherwise lens axis selector per source)
    - name: DATA02
      type: byte
      description: Adjustment mode (00h absolute, 02h relative); ignored if DATA01=FFh
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)
    - name: DATA02
      type: byte
      description: Setting value (00h OFF, 01h ON)

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Profile number (00h Profile 1, 01h Profile 2)

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- Gain parameter ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Adjusted value name (00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST)

# --- Status requests (078 family) ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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

# --- Freeze ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Freeze state (01h ON, 02h OFF)

# --- Info string ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Information type (03h horizontal sync frequency, 04h vertical sync frequency)

# --- 097 request family ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

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

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Target (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098 set family ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Eco mode value - full list in Appendix "Supplementary Information by Command" (UNRESOLVED: appendix not in refined source).

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01_16
      type: bytes
      description: Projector name, up to 16 bytes (NUL terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Target (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
    - name: DATA02
      type: byte
      description: Setting value (MODE: 00h PIP / 01h PbP; START POSITION: 00h TOP-LEFT / 01h TOP-RIGHT / 02h BOTTOM-LEFT / 03h BOTTOM-RIGHT; sub input values per Appendix - UNRESOLVED)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Setting value (00h OFF, 01h ON)

# --- 305 family ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

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

# --- 319 ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Input terminal - full list in Appendix "Supplementary Information by Command" (UNRESOLVED: appendix not in refined source).
    - name: DATA02
      type: byte
      description: Setting value (00h = the terminal specified in DATA01, 01h BNC, 02h COMPUTER)
```

## Feedbacks
```yaml
# Response frames: A-prefix = error (carries ERR1/ERR2), 2x-prefix = ack with data.
# Key observable states returned by query responses.
- id: error_status
  type: bitmask
  description: 12-byte error bitmap (DATA01-DATA12) from 009 response. Bit=0 normal, bit=1 error. Covers cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/system errors. See source error information list.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: DATA03 of 078-2 RUNNING STATUS / DATA01 of 305-3 BASIC INFORMATION.

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: DATA06 of 078-2 RUNNING STATUS REQUEST.

- id: input_signal_status
  type: composite
  description: Multi-field from 078-3 INPUT STATUS REQUEST (signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed).

- id: mute_status
  type: composite
  description: From 078-4 - picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each on/off).

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  description: DATA01 of 078-6 COVER STATUS REQUEST.

- id: lamp_info
  type: composite
  description: From 037-4 - lamp usage time (seconds) and remaining life (%).

- id: filter_info
  type: composite
  description: From 037-3 - filter usage time (seconds) and filter alarm start time (seconds).

- id: lens_status
  type: bitmask
  description: DATA01 of 053-7 - per-axis operation flags (lens memory, zoom, focus, lens shift H/V: stop vs during operation).

- id: error_response
  type: composite
  description: A-prefix error frame ERR1/ERR2 pair. Full code table in source §2.4 (e.g. 00h/00h unrecognized, 01h/00h invalid value, 02h/0Dh power off, 02h/0Fh no authority, 03h/02h adjustment failed).
```

## Variables
```yaml
# Settable parameters surfaced via dedicated adjust/set actions (not repeated here as
# separate variables to avoid duplication). Represented by: volume_adjust,
# picture_adjust (brightness/contrast/color/hue/sharpness), other_adjust (lamp/light),
# lens_control / lens_control_2, eco_mode_set, edge_blending_mode_set,
# lens_profile_set, lan_projector_name_set, audio_select_set.
# Queryable current values via gain_parameter_request_3 and the 078/305 request family.
# UNRESOLVED: numeric min/max/default ranges per gain not enumerated here - source
# exposes them dynamically via 060-1 GAIN PARAMETER REQUEST 3 response fields
# (upper/lower/default/current/wide/narrow widths). Caller should read at runtime.
```

## Events
```yaml
# No unsolicited notifications documented. Device responds only to commands.
# UNRESOLVED: none documented in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states that during POWER ON, POWER OFF (incl. cooling time), and
# LENS drive no other command can be accepted - these are timing/acceptance constraints,
# not interlock procedures. No explicit safety warnings, confirmation requirements, or
# power-on sequencing interlocks documented in this command reference.
# Note: 009 ERROR STATUS includes an "interlock switch is open" bit (DATA09 Bit1) and a
# "the lens is not installed properly" error (DATA04 Bit7), indicating hardware-level
# safety sensing, but no operator-facing interlock procedure is described.
```

## Notes
- Framing: commands/responses are hex byte series. Every frame ends in a checksum byte `CKS` = low-order byte of the sum of all preceding bytes. Worked example from source: `20h 81h 01h 60h 01h 00h` sums to `103h`, so `CKS = 03h`.
- `ID1` = control ID configured on the projector; `ID2` = model code. Source documents commands with `ID1=00h ID2=00h` (default). Implementations must substitute the projector's configured values and recompute `CKS`.
- `LEN` = byte length of the DATA portion following LEN.
- Power ON blocks all other commands while turning on; POWER OFF blocks during cooling. Lens drive can be updated mid-motion by re-issuing the same lens command without a stop.
- Picture/Sound/Onscreen mute auto-clear on input terminal switch or video signal switch; sound mute also clears on volume adjustment.
- Usage-time fields (lamp, filter) are reported in one-second units but refreshed at one-minute intervals.
- Lamp remaining life (%) returns negative once the replacement deadline is exceeded.
- Error code `02h 0Dh` ("command cannot be accepted because the power is off") is common when sending adjust/lens commands while in standby.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (referenced for input terminal values, aspect values, base model type values, eco mode values, sub input values) was not present in the refined source document. Several enum ranges above (input_sw_change DATA01, aspect_adjust DATA01, eco_mode_set DATA01, audio_select_set DATA01, PIP sub input values) therefore reference the appendix rather than listing concrete values. -->
<!-- UNRESOLVED: default baud rate among the five supported rates not stated. -->
<!-- UNRESOLVED: flow control mode not explicitly named (RTS/CTS pins wired, full-duplex stated). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: wireless LAN unit support referenced but details deferred to a separate operation manual. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:42:04.047Z
last_checked_at: 2026-06-18T08:12:29.993Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:12:29.993Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Wireless LAN unit details not in this manual. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model type values, eco mode values, sub input values) not present in refined source — several enum ranges therefore marked UNRESOLVED."
- "default not stated; supported rates 4800/9600/19200/38400/115200 bps"
- "RTS/CTS pins present in D-SUB 9P pinout (RTS→CTS, CTS→RTS) and \"Full duplex\" stated, but flow-control mode not explicitly named"
- "appendix not in refined source."
- "appendix not in refined source)."
- "numeric min/max/default ranges per gain not enumerated here - source"
- "none documented in source."
- "none documented."
- "source states that during POWER ON, POWER OFF (incl. cooling time), and"
- "Appendix \"Supplementary Information by Command\" (referenced for input terminal values, aspect values, base model type values, eco mode values, sub input values) was not present in the refined source document. Several enum ranges above (input_sw_change DATA01, aspect_adjust DATA01, eco_mode_set DATA01, audio_select_set DATA01, PIP sub input values) therefore reference the appendix rather than listing concrete values."
- "default baud rate among the five supported rates not stated."
- "flow control mode not explicitly named (RTS/CTS pins wired, full-duplex stated)."
- "firmware version compatibility not stated in source."
- "wireless LAN unit support referenced but details deferred to a separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
