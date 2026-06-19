---
spec_id: admin/sharp-nec-led-fe009i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE009I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE009I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE009I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:07:15.138Z
last_checked_at: 2026-06-18T08:06:05.052Z
generated_at: 2026-06-18T08:06:05.052Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific input-terminal value table, aspect value table, eco-mode value table, and base-model-type value table live in an \"Appendix: Supplementary Information by Command\" that is NOT included in the provided source text."
  - "not stated in communication-conditions table; RTS/CTS pins present in PC CONTROL D-SUB 9P pinout"
  - "value table in Appendix not in source"
  - "exact min/max/default numeric ranges are returned dynamically by"
  - "no unsolicited notifications documented in source. Protocol is"
  - "no multi-step sequences described in source."
  - "Appendix \"Supplementary Information by Command\" not in source — missing concrete value tables for: input terminal (018/319-10), aspect (030-12), eco mode (097-8/098-8), PIP sub-input, base model type (305-1/078-1)."
  - "flow_control setting not stated (RTS/CTS pins wired in pinout)."
  - "firmware version compatibility not stated."
  - "wireless-LAN transport details deferred to separate wireless-LAN-unit manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:06:05.052Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE009I2 Control Spec

## Summary
Sharp/NEC LED FE009I2 projector, controlled via binary hex command frames over RS-232C serial or wired/wireless LAN (TCP). Spec covers the full Projector Control Command Reference (BDT140013 Rev 7.1): power, input switching, mutes, picture/volume/aspect/gain adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/information queries.

<!-- UNRESOLVED: model-specific input-terminal value table, aspect value table, eco-mode value table, and base-model-type value table live in an "Appendix: Supplementary Information by Command" that is NOT included in the provided source text. -->

## Transport
```yaml
# Source documents both RS-232C serial and LAN (TCP). Both emitted.
# Command frame is binary hex: [class] [opcode] <ID1> <ID2> [LEN] [DATA...] <CKS>
# ID1 = control ID, ID2 = model code, CKS = checksum (low byte of sum of all
# preceding bytes). These three are dynamic per-device/per-frame.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 4800|9600|19200|38400|115200  # all five stated, selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated in communication-conditions table; RTS/CTS pins present in PC CONTROL D-SUB 9P pinout
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON / POWER OFF commands present
  - queryable   # inferred: many status/information request commands present
  - levelable   # inferred: picture/volume/gain/lamp adjust commands present
  - routable    # inferred: input switch, audio select, PIP sub-input commands present
```

## Actions
```yaml
# All payloads verbatim from source. <ID1> <ID2> are control-ID/model-code bytes
# (sender-set); <CKS> is the checksum (low byte of sum of preceding bytes).
# Parameter DATA bytes documented per-command below.

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While powering on, no other command accepted.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (incl. cooling time), no other command accepted.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Input terminal selector (e.g. 06h = video port). Full value table in Appendix "Supplementary Information by Command" - NOT in source.

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

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Aspect value - full value table in Appendix "Supplementary Information by Command" - NOT in source.

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: byte
      description: "Adjustment target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA03
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: byte
      description: Key code high byte (00h for all listed keys)

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

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (e.g. 06h=Periphery Focus)"
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Lens target (FFh = Stop)
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (acts on profile set via LENS PROFILE SET)"
  notes: Controls the profile number specified by LENS PROFILE SET.

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze on, 02h=freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Eco mode value - full value table in Appendix "Supplementary Information by Command" - NOT in source.
  notes: Sets "Light mode" or "Lamp mode" depending on projector.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT; sub-input values in Appendix - NOT in source)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Input terminal - value table in Appendix "Supplementary Information by Command" - NOT in source.
    - name: DATA02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

# --- Queries (kind: query) ---

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: Returns DATA01-12, error-status bitmaps (cover, fan, temp, lamp, mirror-cover, interlock, system errors, etc.).

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90).

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time sec (DATA01-04), filter alarm start time sec (DATA05-08). -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: Lens target (e.g. 06h=Periphery Focus)
  notes: Returns adjustment range upper/lower limits and current value.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 lens operation bitmap (lens memory, zoom, focus, lens-shift H/V stop vs in-operation).

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns selected reference-lens-memory profile (00h=Profile 1, 01h=Profile 2).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: Returns status, range upper/lower limits, default, current value, wide/narrow adjustment widths.

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function availability, profile/clock/sleep-timer function.

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process, operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute and onscreen-display states.

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
  notes: Returns mirror/lens cover status (00h=normal/open, 01h=closed).

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco/light/lamp mode value - full value table in Appendix - NOT in source.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
  notes: Returns base model type and model name.

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
  notes: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.
```

## Feedbacks
```yaml
# Observable query-response states. Each maps to a query action above.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request / basic_information_request

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution]
  source: running_status_request DATA04

- id: input_signal
  type: composite
  description: signal list number + selection signal type 1/2
  source: input_status_request

- id: mute_state
  type: composite
  description: picture/sound/onscreen/forced-onscreen mute + OSD display
  source: mute_status_request

- id: cover_state
  type: enum
  values: [normal_open, closed]
  source: cover_status_request

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: lamp_information_request_3 (DATA01=00h, DATA02=01h)

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 (DATA01=00h, DATA02=04h)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: filter_usage_information_request

- id: lens_operation
  type: bitmap
  description: lens memory / zoom / focus / lens-shift H/V stop vs in-operation
  source: lens_information_request

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: value table in Appendix not in source
  source: eco_mode_request

- id: error_status
  type: bitmap
  description: 12-byte error/status bitmap (cover, fan, temp, lamp, mirror-cover, interlock switch, system errors)
  source: error_status_request
```

## Variables
```yaml
# Settable continuous parameters. Already exposed as actions (picture/volume/
# lamp adjust); listed here as addressable variables for gain_parameter_request_3.
- id: brightness
  type: integer
  query: gain_parameter_request_3 (DATA01=00h)
  set: picture_adjust (DATA01=00h)
- id: contrast
  type: integer
  query: gain_parameter_request_3 (DATA01=01h)
  set: picture_adjust (DATA01=01h)
- id: color
  type: integer
  query: gain_parameter_request_3 (DATA01=02h)
  set: picture_adjust (DATA01=02h)
- id: hue
  type: integer
  query: gain_parameter_request_3 (DATA01=03h)
  set: picture_adjust (DATA01=03h)
- id: sharpness
  type: integer
  query: gain_parameter_request_3 (DATA01=04h)
  set: picture_adjust (DATA01=04h)
- id: volume
  type: integer
  query: gain_parameter_request_3 (DATA01=05h)
  set: volume_adjust
- id: lamp_light_adjust
  type: integer
  query: gain_parameter_request_3 (DATA01=96h)
  set: other_adjust
# UNRESOLVED: exact min/max/default numeric ranges are returned dynamically by
# the device per gain; not enumerated in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. Protocol is
# strictly request/response (command → response with A_ prefix on error).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while turning on, no other command can be accepted (source §3.2)."
  - "POWER OFF: during power-off incl. cooling time, no other command can be accepted (source §3.3)."
  - "PICTURE MUTE ON auto-clears on input-terminal switch or video-signal switch (§3.5)."
  - "SOUND MUTE ON auto-clears on input switch, signal switch, or volume adjustment (§3.7)."
  - "ONSCREEN MUTE ON auto-clears on input switch or signal switch (§3.9)."
  - "Interlock switch open / mirror cover / lens cover errors surfaced in error_status bitmap (DATA09 Bit1, DATA03 Bit5)."
# No power-on sequencing voltage/current specs in source - not inferred.
```

## Notes
- Protocol is binary hex frames. Frame layout: `[class_byte] [opcode] <ID1> <ID2> [LEN] [DATA...] <CKS>`. Success-response prefix = class_byte | 20h; error-response prefix = class_byte | 80h (A_xx).
- `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model). Sender must substitute real values; source shows `00h 00h` placeholders in command examples.
- `<CKS>` = checksum = low-order byte of the sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Lamp-usage / filter-usage info updates at 1-minute intervals despite 1-second resolution.
- Lamp remaining life returns negative if replacement deadline exceeded.
- Reference Lens Memory Control operates on the profile selected via LENS PROFILE SET (Profile 1/2).
- Serial cable is cross (null-modem); PC CONTROL port is D-SUB 9P. LAN port is RJ-45.
- Manual revision: BDT140013 Rev 7.1.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not in source — missing concrete value tables for: input terminal (018/319-10), aspect (030-12), eco mode (097-8/098-8), PIP sub-input, base model type (305-1/078-1). -->
<!-- UNRESOLVED: flow_control setting not stated (RTS/CTS pins wired in pinout). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: wireless-LAN transport details deferred to separate wireless-LAN-unit manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:07:15.138Z
last_checked_at: 2026-06-18T08:06:05.052Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:06:05.052Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific input-terminal value table, aspect value table, eco-mode value table, and base-model-type value table live in an \"Appendix: Supplementary Information by Command\" that is NOT included in the provided source text."
- "not stated in communication-conditions table; RTS/CTS pins present in PC CONTROL D-SUB 9P pinout"
- "value table in Appendix not in source"
- "exact min/max/default numeric ranges are returned dynamically by"
- "no unsolicited notifications documented in source. Protocol is"
- "no multi-step sequences described in source."
- "Appendix \"Supplementary Information by Command\" not in source — missing concrete value tables for: input terminal (018/319-10), aspect (030-12), eco mode (097-8/098-8), PIP sub-input, base model type (305-1/078-1)."
- "flow_control setting not stated (RTS/CTS pins wired in pinout)."
- "firmware version compatibility not stated."
- "wireless-LAN transport details deferred to separate wireless-LAN-unit manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
